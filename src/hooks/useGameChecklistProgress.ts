import { getChecklistData } from "@/utils/checklistData";
import {
    getChecklistProgress,
    type ChecklistProgress,
} from "@/utils/getChecklistProgress";
import { useCallback, useEffect, useState } from "react";

export function useGameChecklistProgress(
    game: string,
    variantId?: string,
): ChecklistProgress | null {
    const [progress, setProgress] = useState<ChecklistProgress | null>(null);

    const recalculate = useCallback(() => {
        const data = getChecklistData(game);
        if (!data) return;

        setProgress(getChecklistProgress(game, data, variantId));
    }, [game, variantId]);

    useEffect(() => {
        recalculate();

        const handleReset = (event: Event) => {
            const { games } = (event as CustomEvent<{ games: string[] }>)
                .detail;

            if (games.includes(game)) {
                recalculate();
            }
        };

        window.addEventListener("checklist-progress-reset", handleReset);

        return () => {
            window.removeEventListener("checklist-progress-reset", handleReset);
        };
    }, [game, recalculate]);

    return progress;
}
