import { useMemo } from "react";
import type { ChecklistSectionData } from "../types/checklist";

export interface ChecklistProgress {
    total: number;
    count: number;
    pct: number;
}

export function useChecklistProgress(
    sections: ChecklistSectionData[],
    checked: Record<string, boolean>,
): ChecklistProgress {
    return useMemo(() => {
        const allIds = sections.flatMap((s) => s.items.map((i) => i.id));
        const total = allIds.length;
        const count = allIds.filter((id) => checked[id]).length;
        const rawPct = total ? (count / total) * 100 : 0;
        const pct = Number.isInteger(rawPct)
            ? rawPct
            : Number(rawPct.toFixed(2));

        return { total, count, pct };
    }, [sections, checked]);
}
