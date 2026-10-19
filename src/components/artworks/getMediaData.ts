import type { GameMediaIndex } from "@/components/artworks/types";
import { createDataLoader } from "@/lib/data/createDataLoader";

const modules = import.meta.glob<GameMediaIndex>(
    "/src/data/artworks/*.json",
    { eager: true, import: "default" },
);

const loadMedia = createDataLoader(modules);

export function getMediaData(gameId: string): GameMediaIndex | null {
    return loadMedia(gameId);
}
