import { useEffect, useState } from "react";

export function useCompletedCollectibles(gameId: string, variantId?: string) {
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

    const persist = (ids: Set<string>) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)));
        } catch {
        }
    };

    const toggleCollectible = (id: string) => {
        setCompletedIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            persist(next);

            return next;
        });
    };

    const setCompleted = (ids: string[], completed: boolean) => {
        setCompletedIds((prev) => {
            const next = new Set(prev);

            for (const id of ids) {
                if (completed) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
            }

            persist(next);

            return next;
        });
    };

    return { completedIds, toggleCollectible, setCompleted };
}
