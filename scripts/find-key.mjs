import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";

const term = process.argv[2];
if (!term) {
    process.exit(1);
}

const ROOTS = ["src", "public"];
const EXTENSIONS = new Set([
    ".ts",
    ".tsx",
    ".astro",
    ".js",
    ".jsx",
    ".mjs",
    ".json",
]);
const LANG_DIR = join("src", "data", "lang");

for (const root of ROOTS) {
    for (const rel of readdirSync(root, { recursive: true })) {
        const file = join(root, rel);
        if (file.startsWith(LANG_DIR)) continue;
        if (!EXTENSIONS.has(extname(file))) continue;
        const lines = readFileSync(file, "utf8").split("\n");
        lines.forEach((line, i) => {
            if (line.includes(term))
                console.log(`${file}:${i + 1}  ${line.trim()}`);
        });
    }
}
