import type { ChecklistData } from "@/types/checklist";

const modules = import.meta.glob("../data/checklists/*.json", {
    eager: true,
}) as Record<string, { default: ChecklistData }>;

export function getChecklistData(game: string): ChecklistData | null {
    const entry = Object.entries(modules).find(([path]) =>
        path.endsWith(`/checklists/${game}.json`),
    );
    return entry ? entry[1].default : null;
}
