
import type { ChecklistData } from "../types/checklist";

export interface ChecklistProgress {
    total: number;
    count: number;
    pct: number;
}

export function getChecklistProgress(
    game: string,
    data: ChecklistData,
): ChecklistProgress {
    const tabs = data.tabs?.length
        ? data.tabs
        : [{ id: "default", sections: data.sections ?? [] }];

    let total = 0;
    let count = 0;

    tabs.forEach((tab) => {
        let checked: Record<string, boolean> = {};
        try {
            const raw = localStorage.getItem(
                `viceclub_checklist_${game}_${tab.id}`,
            );
            checked = raw ? JSON.parse(raw) : {};
        } catch {
            checked = {};
        }

        tab.sections.forEach((section) => {
            section.items.forEach((item) => {
                total += 1;
                if (checked[item.id]) count += 1;
            });
        });
    });

    const rawPct = total ? (count / total) * 100 : 0;
    const pct = Number.isInteger(rawPct) ? rawPct : Number(rawPct.toFixed(2));

    return { total, count, pct };
}
