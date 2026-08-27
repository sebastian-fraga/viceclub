import { useEffect, useState } from "react";
import { getChecklistData } from "@/utils/checklistData";
import {
    getChecklistProgress,
    type ChecklistProgress,
} from "@/utils/getChecklistProgress";

export function useGameChecklistProgress(
    game: string,
): ChecklistProgress | null {
    const [progress, setProgress] = useState<ChecklistProgress | null>(null);

    useEffect(() => {
        const data = getChecklistData(game);
        if (!data) return;
        const p = getChecklistProgress(game, data);
        setProgress(p);
    }, [game]);

    return progress;
}
