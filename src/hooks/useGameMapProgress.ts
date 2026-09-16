import { useEffect, useState } from "react";

export function useGameMapProgress(gameId: string) {
    const storageKey = `completed_collectibles_${gameId}`;

    const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
        if (typeof window === "undefined") return new Set();

        try {
            const saved = localStorage.getItem(storageKey);

            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    useEffect(() => {
        const handleMapReset = (e: Event) => {
            const detail = (e as CustomEvent<{ games: string[] }>).detail;

            if (!detail?.games?.includes(gameId)) return;

            setCompletedIds(new Set());
        };

        window.addEventListener("map-progress-reset", handleMapReset);

        return () =>
            window.removeEventListener("map-progress-reset", handleMapReset);
    }, [gameId]);

    return completedIds;
}
