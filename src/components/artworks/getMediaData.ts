import type { GameMediaIndex } from "@/components/artworks/types";

const modules = import.meta.glob<{ default: GameMediaIndex }>(
    "/src/data/artworks/*.json",
    { eager: true },
);

export function getMediaData(gameId: string): GameMediaIndex | null {
    const entry = Object.entries(modules).find(([path]) =>
        path.endsWith(`/${gameId}.json`),
    );
    return entry ? entry[1].default : null;
}
