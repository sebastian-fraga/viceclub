import type { GameId } from "@/config/games";
import { createDataLoader } from "@/lib/data/createDataLoader";
import type { CheatsFile } from "@/types/cheats";

const modules = import.meta.glob<CheatsFile>("/src/data/cheats/*.json", {
    eager: true,
    import: "default",
});

const loadCheatFile = createDataLoader(modules);

export function loadCheats(game: GameId): CheatsFile | null {
    if (!game) return null;

    const cheats = loadCheatFile(game);

    if (!cheats) {
        console.error(`No se encontraron cheats para el juego: ${game}`);
    }

    return cheats;
}
