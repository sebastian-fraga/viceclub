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
 * Usage:
 *   pnpm run thumbs                // generates missing thumbnails
 *   pnpm run thumbs -- --dry-run   // shows the execution plan
 *   pnpm run thumbs -- --widths=640,1280
 *   pnpm run thumbs -- --skip-cache-headers
 */

import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const BUCKET = process.env.S3_BUCKET ?? "viceclub";
const CACHE_CONTROL = "public, max-age=31536000, immutable";
const DEFAULT_WIDTHS = [640, 1280];
const CONCURRENCY = 6;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const skipCacheHeaders = args.includes("--skip-cache-headers");
const widthsArg = args.find((arg) => arg.startsWith("--widths="));
const widths = widthsArg
    ? widthsArg
          .split("=")[1]
          .split(",")
          .map((value) => Number.parseInt(value.trim(), 10))
          .filter(Boolean)
    : DEFAULT_WIDTHS;

const isOriginal = (key) =>
    /^[A-Za-z0-9_-]+\/maps\/(?!thumbs\/).+\.webp$/.test(key);

const toThumbKey = (key, width) => {
    const [prefix, rest] = key.split("/maps/");
    const name = rest.replace(/\.webp$/, "");

    return `${prefix}/maps/thumbs/${name}-${width}.webp`;
};

const aws = async (command, commandArgs) => {
    const { stdout } = await execFileAsync("aws", [command, ...commandArgs]);

    return stdout;
};

const listOriginals = async () => {
    const output = await aws("s3", ["ls", `s3://${BUCKET}`, "--recursive"]);

    return output
        .split("\n")
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((key) => key && isOriginal(key));
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
        CACHE_CONTROL,
        "--content-type",
        "image/webp",
        "--acl",
        "public-read",
        "--no-progress",
    ]);
};

const setCacheHeaders = async (key) => {
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
        CACHE_CONTROL,
        "--content-type",
        "image/webp",
        "--acl",
        "public-read",
    ]);
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

const main = async () => {
    const keys = await listOriginals();

    console.log(
        `Bucket: ${BUCKET} | originals: ${keys.length} | widths: ${widths.join(", ")}`,
    );

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

        const pending = results.map((result) => result.key);

        console.log(
            `\nApplying Cache-Control to ${pending.length} originals...`,
        );

        await runPool(
            pending,
            async (key) => {
                await setCacheHeaders(key);
            },
            CONCURRENCY,
        );

        console.log("Done.");
    } finally {
        await rm(workdir, { recursive: true, force: true });
    }
};

await main();
