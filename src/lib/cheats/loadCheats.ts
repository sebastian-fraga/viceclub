import type { CheatsFile } from "@/types/cheats";
import type { GameId } from "@/config/games";

const cheatsFiles = import.meta.glob<CheatsFile>("/src/data/cheats/*.json", {
    eager: true,
    import: "default",
});

export function loadCheats(game: GameId): CheatsFile | null {
    if (!game) return null;

    const targetName = game.toLowerCase();

    const matchedPath = Object.keys(cheatsFiles).find((path) => {
        const fileName = path
            .split("/")
            .pop()
            ?.replace(".json", "")
            .toLowerCase();

        return fileName === targetName;
    });

    if (!matchedPath) {
        console.error(`No se encontraron cheats para el juego: ${game}`);
        return null;
    }

    return cheatsFiles[matchedPath];
}
