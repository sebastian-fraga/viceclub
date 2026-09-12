import { useCallback, useEffect, useState } from "react";

function getStorageKey(game: string, tabId: string) {
    return `viceclub_checklist_${game}_${tabId}`;
}

function loadChecked(game: string, tabId: string): Record<string, boolean> {
    try {
        const raw = localStorage.getItem(getStorageKey(game, tabId));
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

export function useChecklistState(game: string, tabId: string) {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        setChecked(loadChecked(game, tabId));
        setLoaded(true);
    }, [game, tabId]);

    useEffect(() => {
        const handleReset = (event: Event) => {
            const { games } = (event as CustomEvent<{ games: string[] }>)
                .detail;

            if (games.includes(game)) {
                setChecked({});
            }
        };

        window.addEventListener("checklist-progress-reset", handleReset);

        return () => {
            window.removeEventListener("checklist-progress-reset", handleReset);
        };
    }, [game]);

    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem(
            getStorageKey(game, tabId),
            JSON.stringify(checked),
        );
    }, [checked, game, tabId, loaded]);

    const toggleItem = useCallback((id: string) => {
        setChecked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }, []);

    const toggleMany = useCallback((ids: string[], value: boolean) => {
        setChecked((prev) => {
            const next = { ...prev };

            ids.forEach((id) => {
                next[id] = value;
            });

            return next;
        });
    }, []);

    return { checked, toggleItem, toggleMany, loaded };
}
