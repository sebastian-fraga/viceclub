/**
 * Generates and uploads thumbnails for map images stored in S3.
 *
 * Original:  {gameId}/maps/{variant?}/{type}/{id}.webp
 * Thumbnail: {gameId}/maps/thumbs/{variant?}/{type}/{id}-{width}.webp
 *
 * Also sets `Cache-Control: public, max-age=31536000, immutable` on the
 * original images (they currently have no cache headers, so the browser
 * downloads them again on every visit).
 *
 * The script is incremental: thumbnails that already exist in S3 are skipped,
 * so it can be run once per category while uploading, or once at the end.
 *
 * Usage:
 *   pnpm run thumbs                // generates missing thumbnails
 *   pnpm run thumbs -- --dry-run   // shows the execution plan
 *   pnpm run thumbs -- --widths=640,1280
 *   pnpm run thumbs -- --skip-cache-headers
 *   pnpm run thumbs -- --prefix=SA/maps/assets   // only one category
 *   pnpm run thumbs -- --cache-headers-only       // only applies Cache-Control
 *   pnpm run thumbs -- --cache-control="public, max-age=2592000"
 *
 * The default widths come from `src/data/map-thumb-widths.json`, which is also
 * what the frontend uses to build the `srcset`.
 */

import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const BUCKET = process.env.S3_BUCKET ?? "viceclub";
const CONCURRENCY = 6;
const THUMB_WIDTHS_FILE = new URL(
    "../src/data/map-thumb-widths.json",
    import.meta.url,
);

const { widths: THUMB_WIDTHS } = JSON.parse(
    readFileSync(THUMB_WIDTHS_FILE, "utf8"),
);

if (!Array.isArray(THUMB_WIDTHS) || THUMB_WIDTHS.length === 0) {
    throw new Error(
        `Invalid thumbnail widths in ${THUMB_WIDTHS_FILE.pathname}: ${JSON.stringify(THUMB_WIDTHS)}`,
    );
}

const DEFAULT_WIDTHS = THUMB_WIDTHS;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const skipCacheHeaders = args.includes("--skip-cache-headers");
const cacheHeadersOnly = args.includes("--cache-headers-only");
const widthsArg = args.find((arg) => arg.startsWith("--widths="));
const prefixArg = args.find((arg) => arg.startsWith("--prefix="));
const cacheControlArg = args.find((arg) => arg.startsWith("--cache-control="));

const prefix = prefixArg ? prefixArg.split("=")[1].replace(/\/+$/, "") : "";

const cacheControl = cacheControlArg ? cacheControlArg.split("=")[1] : null;

const widths = widthsArg
    ? widthsArg
          .split("=")[1]
          .split(",")
          .map((value) => Number.parseInt(value.trim(), 10))
          .filter(Boolean)
    : DEFAULT_WIDTHS;

if (
    widthsArg &&
    JSON.stringify([...widths].sort((a, b) => a - b)) !==
        JSON.stringify([...THUMB_WIDTHS].sort((a, b) => a - b))
) {
    console.warn(
        `Warning: --widths=${widths.join(",")} does not match the frontend widths (${THUMB_WIDTHS.join(",")}). ` +
            "The browser will pick candidates that do not exist in S3.",
    );
}

const isOriginal = (key) =>
    /^[A-Za-z0-9_-]+\/maps\/(?!thumbs\/).+\.webp$/.test(key);

const isMapThumb = (key) => /^[A-Za-z0-9_-]+\/maps\/thumbs\/.+\.webp$/.test(key);

const isJson = (key) => key.endsWith(".json");

const isImage = (key) => /\.(webp|png|jpe?g|gif|avif|svg)$/i.test(key);

const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";
const IMAGE_CACHE_CONTROL = "public, max-age=2592000";
const JSON_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=86400";

const resolveCacheControl = (key) => {
    if (cacheControl) return cacheControl;
    if (isOriginal(key) || isMapThumb(key)) return IMMUTABLE_CACHE_CONTROL;
    if (isJson(key)) return JSON_CACHE_CONTROL;
    if (isImage(key)) return IMAGE_CACHE_CONTROL;

    return null;
};

const toThumbKey = (key, width) => {
    const [gameId, rest] = key.split("/maps/");
    const name = rest.replace(/\.webp$/, "");

    return `${gameId}/maps/thumbs/${name}-${width}.webp`;
};

const aws = async (command, commandArgs) => {
    const { stdout } = await execFileAsync("aws", [command, ...commandArgs]);

    return stdout;
};

const listObjects = async (pathPrefix = "") => {
    const output = await aws("s3", [
        "ls",
        pathPrefix ? `s3://${BUCKET}/${pathPrefix}` : `s3://${BUCKET}`,
        "--recursive",
    ]);

    return output
        .split("\n")
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((key) => key && !key.endsWith("/"));
};

const objectExists = async (key) => {
    try {
        await aws("s3api", ["head-object", "--bucket", BUCKET, "--key", key]);

        return true;
    } catch {
        return false;
    }
};

const upload = async (file, key) => {
    await aws("s3", [
        "cp",
        file,
        `s3://${BUCKET}/${key}`,
        "--cache-control",
        cacheControl ?? IMMUTABLE_CACHE_CONTROL,
        "--content-type",
        "image/webp",
        "--acl",
        "public-read",
        "--no-progress",
    ]);
};

const headObject = async (key) => {
    const { stdout } = await execFileAsync("aws", [
        "s3api",
        "head-object",
        "--bucket",
        BUCKET,
        "--key",
        key,
        "--output",
        "json",
    ]);

    const data = JSON.parse(stdout);

    return {
        cacheControl: data.CacheControl ?? null,
        contentType: data.ContentType || "application/octet-stream",
    };
};

const setCacheHeaders = async (key) => {
    const desired = resolveCacheControl(key);
    if (!desired) return false;

    const current = await headObject(key);
    if (current.cacheControl === desired) return false;

    await aws("s3api", [
        "copy-object",
        "--bucket",
        BUCKET,
        "--copy-source",
        `${BUCKET}/${key}`,
        "--key",
        key,
        "--metadata-directive",
        "REPLACE",
        "--cache-control",
        desired,
        "--content-type",
        current.contentType,
        "--acl",
        "public-read",
    ]);

    return true;
};

const processKey = async (key, workdir) => {
    const pending = [];

    for (const width of widths) {
        const thumbKey = toThumbKey(key, width);

        if (await objectExists(thumbKey)) continue;

        pending.push({ thumbKey, width });
    }

    if (pending.length === 0) return { key, created: [] };

    if (dryRun) {
        return {
            key,
            created: pending.map((item) => item.thumbKey),
        };
    }

    const dir = path.join(workdir, key.replace(/[^\w.-]+/g, "_"));
    await mkdir(dir, { recursive: true });

    const source = path.join(dir, "source.webp");
    await aws("s3", ["cp", `s3://${BUCKET}/${key}`, source, "--no-progress"]);

    const buffer = await readFile(source);
    const created = [];

    for (const { thumbKey, width } of pending) {
        const output = await sharp(buffer)
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 72 })
            .toBuffer();

        const target = path.join(dir, path.basename(thumbKey));

        await writeFile(target, output);
        await upload(target, thumbKey);
        created.push(thumbKey);
    }

    return { key, created };
};

const runPool = async (items, worker, limit) => {
    const queue = [...items];
    const results = [];

    const runners = Array.from({ length: limit }, async () => {
        while (queue.length > 0) {
            const item = queue.shift();
            results.push(await worker(item));
        }
    });

    await Promise.all(runners);

    return results;
};

const applyCacheHeaders = async (targets) => {
    console.log(`\nApplying Cache-Control to ${targets.length} object(s)...`);

    let changed = 0;

    await runPool(
        targets,
        async (key) => {
            if (await setCacheHeaders(key)) {
                changed++;
                console.log(`  ${key}`);
            }
        },
        CONCURRENCY,
    );

    console.log(`Objects updated: ${changed}`);
};

const main = async () => {
    const objects = await listObjects(prefix);
    const keys = objects.filter((key) => isOriginal(key));

    console.log(
        `Bucket: ${BUCKET} | prefix: ${prefix || "(todas)"} | originals: ${keys.length} | widths: ${widths.join(", ")}`,
    );

    if (cacheHeadersOnly) {
        if (dryRun) {
            console.log(`\nCache-Control a aplicar:`);
            objects.forEach((key) => {
                const value = resolveCacheControl(key);
                if (value) console.log(`  ${key} -> ${value}`);
            });

            return;
        }

        await applyCacheHeaders(objects);

        return;
    }

    if (keys.length === 0) return;

    const workdir = await mkdtemp(path.join(tmpdir(), "map-thumbs-"));

    try {
        let totalCreated = 0;

        const results = await runPool(
            keys,
            async (key) => {
                const result = await processKey(key, workdir);

                if (result.created.length > 0) {
                    totalCreated += result.created.length;
                    console.log(
                        `  ${result.key} -> ${result.created.length} thumbnail(s)`,
                    );
                }

                return result;
            },
            CONCURRENCY,
        );

        console.log(`\nThumbnails created: ${totalCreated}`);

        if (skipCacheHeaders || dryRun) {
            console.log("Original Cache-Control headers: skipped.");
            return;
        }

        const targets = objects.filter(
            (key) => isOriginal(key) || isMapThumb(key),
        );

        await applyCacheHeaders(targets);
    } finally {
        await rm(workdir, { recursive: true, force: true });
    }
};

await main();
