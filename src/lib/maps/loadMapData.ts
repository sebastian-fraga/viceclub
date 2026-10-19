import type { GameMapData } from "@/components/maps/types";
import { createDataLoader } from "@/lib/data/createDataLoader";

const modules = import.meta.glob<GameMapData>("/src/data/maps/*.json", {
    eager: true,
    import: "default",
});

const loadMap = createDataLoader(modules, {
    key: (_path, map) => map.gameId,
});

/**
 * Devuelve los datos del mapa de un juego, con la variante aplicada si se
 * indica (por ejemplo `TLAD` o `TBOGT` dentro de GTA IV).
 */
export function getGameMapData(
    gameId: string,
    variantId?: string,
): GameMapData | undefined {
    const gameMap = loadMap(gameId);

    if (!gameMap) return undefined;

    if (variantId && gameMap.variants?.[variantId]) {
        return {
            gameId,
            ...gameMap.variants[variantId],
        };
    }

    return gameMap;
}
