
function resetProgressByMatcher(
    games: string[],
    eventName: string,
    matchesKey: (key: string, game: string) => boolean,
): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const matchesGame = games.some((game) => matchesKey(key, game));
        if (matchesGame) keysToRemove.push(key);
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    window.dispatchEvent(
        new CustomEvent(eventName, {
            detail: {
                games,
            },
        }),
    );
}

export function resetChecklistProgress(games: string[]): void {
    resetProgressByMatcher(games, "checklist-progress-reset", (key, game) =>
        key.startsWith(`viceclub_checklist_${game}_`),
    );
}
export function resetMapProgress(games: string[]): void {
    resetProgressByMatcher(
        games,
        "map-progress-reset",
        (key, game) => key === `completed_collectibles_${game}`,
    );
}

