import { useEffect, useState } from "react";

export function useGameMapProgress(gameId: string, variantId: string) {
    const storageKey = `completed_collectibles_${gameId}_${variantId}`;

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
        try {
            const saved = localStorage.getItem(storageKey);

            setCompletedIds(saved ? new Set(JSON.parse(saved)) : new Set());
        } catch {
            setCompletedIds(new Set());
        }
    }, [storageKey]);

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
