import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import es from "../src/data/lang/es.ts";
import en from "../src/data/lang/en.ts";
import fr from "../src/data/lang/fr.ts";
import pt from "../src/data/lang/pt.ts";

const LANGS = { es, en, fr, pt };

const ROOTS = ["src"];
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

function flatten(node, path = []) {
    if (node === null || typeof node !== "object") return [path.join(".")];
    return Object.entries(node).flatMap(([k, v]) => flatten(v, [...path, k]));
}

const keysByLang = Object.fromEntries(
    Object.entries(LANGS).map(([lang, dict]) => [lang, new Set(flatten(dict))]),
);

const allKeys = [
    ...new Set(Object.values(keysByLang).flatMap((set) => [...set])),
];

const langsOf = (key) =>
    Object.keys(LANGS).filter((l) => keysByLang[l].has(key));
const label = (key) => `[${langsOf(key).join(" ")}]`;

function readSources() {
    let text = "";
    for (const root of ROOTS) {
        for (const rel of readdirSync(root, { recursive: true })) {
            const file = join(root, rel);
            if (file.startsWith(LANG_DIR)) continue;
            if (!EXTENSIONS.has(extname(file))) continue;
            text += readFileSync(file, "utf8") + "\n";
        }
    }
    return text;
}

const source = readSources();

const isQuoted = (key) =>
    ['"', "'", "`"].some((q) => source.includes(q + key + q));

function isUsed(key) {
    if (isQuoted(key)) return true;
    const parts = key.split(".");
    for (let i = parts.length - 1; i >= 2; i--) {
        if (isQuoted(parts.slice(0, i).join("."))) return true;
    }
    return false;
}

const dynamicPrefixes = [...source.matchAll(/`([\w.-]+)\.\$\{/g)].map(
    (m) => m[1],
);

const unused = [];
const maybeDynamic = [];

for (const key of allKeys) {
    if (isUsed(key)) continue;
    const dynamic = dynamicPrefixes.some((p) => key.startsWith(p + "."));
    (dynamic ? maybeDynamic : unused).push(key);
}

const partial = allKeys.filter(
    (k) => langsOf(k).length < Object.keys(LANGS).length,
);

console.log(`\nNot added (${partial.length}):`);
partial.forEach((k) => console.log(`  ${k}  ${label(k)}`));

console.log(`\Unused (${unused.length}):`);
unused.forEach((k) => console.log(`  ${k}  ${label(k)}`));

console.log(`\Dynamic keys (possibly) (${maybeDynamic.length}):`);
maybeDynamic.forEach((k) => console.log(`  ${k}  ${label(k)}`));


