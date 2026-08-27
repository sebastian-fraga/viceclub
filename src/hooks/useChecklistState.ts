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

    useEffect(() => {
        setChecked(loadChecked(game, tabId));
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

    const toggleItem = useCallback(
        (id: string) => {
            setChecked((prev) => {
                const next = { ...prev, [id]: !prev[id] };
                localStorage.setItem(
                    getStorageKey(game, tabId),
                    JSON.stringify(next),
                );
                return next;
            });
        },
        [game, tabId],
    );

    const toggleMany = useCallback(
        (ids: string[], value: boolean) => {
            setChecked((prev) => {
                const next = { ...prev };
                ids.forEach((id) => (next[id] = value));
                localStorage.setItem(
                    getStorageKey(game, tabId),
                    JSON.stringify(next),
                );
                return next;
            });
        },
        [game, tabId],
    );

    return { checked, toggleItem, toggleMany };
}
