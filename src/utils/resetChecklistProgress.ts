export function resetChecklistProgress(games: string[]): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;

        const matchesGame = games.some((game) =>
            key.startsWith(`viceclub_checklist_${game}_`),
        );

        if (matchesGame) keysToRemove.push(key);
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    window.dispatchEvent(
        new CustomEvent("checklist-progress-reset", {
            detail: { games },
        }),
    );
}
