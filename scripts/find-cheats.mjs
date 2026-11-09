/**
 * Shows on which platforms a cheat (or all cheats of a game) is available.
 *
 * Platforms are read from the keys of the `codes` object of each cheat in
 * `src/data/cheats/[gameId].json`.
 *
 * Usage:
 *   node scripts/find-cheats.mjs [gameId] [cheatId] [lang] [--codes] [--notes]
 *
 * Arguments:
 *   gameId  Game ID (e.g. III, VC, SA, IV, V, LCS, VCS). Case-insensitive.
 *   cheatId Cheat ID (optional). Case-insensitive. If omitted, all cheats
 *           of the game are listed.
 *   lang    Language code for the title and notes (optional). Defaults to 'en'.
 *
 * Options:
 *   --codes, -c  Show the button codes of a specific cheat per platform.
 *                Only applies when a cheatId is provided.
 *   --notes, -n  Show the platform notes of a specific cheat.
 *                Only applies when a cheatId is provided.
 *
 * Examples:
 *   node scripts/find-cheats.mjs SA player_10
 *   node scripts/find-cheats.mjs SA
 *   node scripts/find-cheats.mjs SA player_10 es
 *   node scripts/find-cheats.mjs SA player_10 --codes
 *   node scripts/find-cheats.mjs SA player_10 --notes
 *   node scripts/find-cheats.mjs SA player_10 pt --codes --notes
 *   node scripts/find-cheats.mjs
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const CHEATS_DIR = join(SCRIPT_DIR, "..", "src", "data", "cheats");
const DEFAULT_LANG = "en";

const PLATFORM_LABELS = {
    pc: "PC",
    ps2: "PlayStation 2",
    ps3: "PlayStation 3",
    ps4: "PlayStation 4",
    ps5: "PlayStation 5",
    psp: "PlayStation Portable",
    xbox: "Xbox",
    xbox360: "Xbox 360",
    xboxOne: "Xbox One",
    xboxSeries: "Xbox Series X|S",
    switch: "Nintendo Switch",
};

function parseArgs(rawArgs) {
    const flags = new Set();
    const positionals = [];
    for (const arg of rawArgs) {
        if (arg === "--codes" || arg === "-c") {
            flags.add("codes");
        } else if (arg === "--notes" || arg === "-n") {
            flags.add("notes");
        } else if (arg.startsWith("--")) {
            // Unknown long flag: ignore.
        } else {
            positionals.push(arg);
        }
    }
    return { flags, positionals };
}

const { flags, positionals } = parseArgs(process.argv.slice(2));
const [gameId, cheatId, langArg] = positionals;
const lang = langArg || DEFAULT_LANG;
const showCodes = flags.has("codes");
const showNotes = flags.has("notes");

function listGameIds() {
    try {
        return readdirSync(CHEATS_DIR, { withFileTypes: true })
            .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
            .map((entry) => entry.name.replace(/\.json$/, ""))
            .sort();
    } catch {
        return [];
    }
}

function loadCheats(game) {
    const path = join(CHEATS_DIR, `${game}.json`);
    let raw;
    try {
        raw = readFileSync(path, "utf8");
    } catch {
        console.error(`Couldn't read the cheats file for "${game}": ${path}`);
        process.exit(1);
    }
    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error(`Invalid JSON in ${path}: ${err.message}`);
        process.exit(1);
    }
}

function platformsOf(cheat) {
    return Object.keys(cheat.codes || {}).sort();
}

function cheatsOf(categoryValue) {
    if (Array.isArray(categoryValue)) return categoryValue;
    if (categoryValue && Array.isArray(categoryValue.cheats))
        return categoryValue.cheats;
    return [];
}

function collectCheats(data) {
    return Object.values(data).flatMap(cheatsOf);
}

function getTitle(cheat, language) {
    const titles = cheat.title || {};
    return titles[language] || titles[DEFAULT_LANG] || titles.es || cheat.id;
}

function formatPlatforms(platforms) {
    if (platforms.length === 0) return "undefined";
    return platforms.map((p) => PLATFORM_LABELS[p] || p).join(", ");
}

function formatCodes(cheat, platforms) {
    return platforms
        .map((platform) => {
            const label = PLATFORM_LABELS[platform] || platform;
            const codes = cheat.codes?.[platform];
            return !codes || codes.length === 0
                ? `    - ${label}: (without code)`
                : `    - ${label}: ${codes.join(", ")}`;
        })
        .join("\n");
}

function formatNotes(cheat, language) {
    const notes = cheat.platformNotes || [];
    if (notes.length === 0) return null;

    return notes
        .map((note) => {
            const platforms = note.platforms || [];
            const noteText =
                note.note?.[language] ||
                note.note?.[DEFAULT_LANG] ||
                note.note?.es ||
                "";
            const noteType = note.noteType ? ` [${note.noteType}]` : "";
            const platformsLabel = formatPlatforms(platforms);
            return `    - Platforms: ${platformsLabel}${noteType}\n        ${noteText}`;
        })
        .join("\n");
}

function printCheatPlatforms(cheat, language) {
    console.log(`  - ${cheat.id} — ${getTitle(cheat, language)} [${language}]`);
    console.log(`    Platforms: ${formatPlatforms(platformsOf(cheat))}`);
}

function printAllCheatsOfGame(game, language) {
    const cheats = collectCheats(loadCheats(game));
    console.log(`"${game}" cheats (language: ${language}):\n`);
    for (const cheat of cheats) {
        printCheatPlatforms(cheat, language);
    }
    console.log(`\nTotal: ${cheats.length} cheat(s).\n`);
}

function printSpecificCheat(game, id, language, codes, notes) {
    const cheats = collectCheats(loadCheats(game));
    const found = cheats.find(
        (cheat) => String(cheat.id).toLowerCase() === id.toLowerCase(),
    );

    if (!found) {
        console.error(`Couldn't find "${id}" for "${game}".`);
        if (cheats.length) {
            console.error(
                `Available cheats: ${cheats.map((c) => c.id).join(", ")}`,
            );
        }
        process.exit(1);
    }

    const platforms = platformsOf(found);
    console.log(`\nGame: ${game}`);
    console.log(`Cheat: ${found.id}`);
    console.log(`Title (${language}): ${getTitle(found, language)}`);
    console.log(`Platforms: ${formatPlatforms(platforms)}`);

    if (codes) {
        console.log("\nCodes per platform:");
        console.log(
            platforms.length === 0
                ? "  (undefined)"
                : formatCodes(found, platforms),
        );
    }

    if (notes) {
        const notesOutput = formatNotes(found, language);
        if (notesOutput) {
            console.log("\nPlatform notes:");
            console.log(notesOutput);
        } else {
            console.log("\nPlatform notes: (none)");
        }
    }

    console.log("");
}

function printUsage() {
    console.log(`
Usage: 
    node scripts/find-cheats.mjs [gameId] [cheatId] [lang] [--codes] [--notes]

Arguments:
    [gameId]:  Game ID (e.g. III, VC, SA, IV, V, LCS, VCS). Case-insensitive.
    [cheatId]: Cheat ID (optional). Case-insensitive. If omitted, all cheats of the game are listed.
    [lang]:    Language code for the title and notes (optional). Defaults to 'en'.

Options:
    --codes, -c  Show the button codes of a specific cheat per platform. Only applies when a cheatId is provided.
    --notes, -n  Show the platform notes of a specific cheat. Only applies when a cheatId is provided.

Examples:
    node scripts/find-cheats.mjs SA player_10
    node scripts/find-cheats.mjs SA
    node scripts/find-cheats.mjs SA player_10 es
    node scripts/find-cheats.mjs SA player_10 --codes
    node scripts/find-cheats.mjs SA player_10 --notes
    node scripts/find-cheats.mjs SA player_10 pt --codes --notes
`);
}

if (!gameId) {
    printUsage();
    process.exit(0);
}

const games = listGameIds();
const matchedGame = games.find((g) => g.toUpperCase() === gameId.toUpperCase());

if (!matchedGame) {
    console.error(`Couldn't find "${gameId}".`);
    if (games.length) {
        console.error(`Available games: ${games.join(", ")}`);
    }
    process.exit(1);
}

if (!cheatId) {
    printAllCheatsOfGame(matchedGame, lang);
} else {
    printSpecificCheat(matchedGame, cheatId, lang, showCodes, showNotes);
}
