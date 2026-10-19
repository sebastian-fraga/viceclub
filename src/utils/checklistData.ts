import { createDataLoader } from "@/lib/data/createDataLoader";
import type { ChecklistData } from "@/types/checklist";

const modules = import.meta.glob<ChecklistData>("../data/checklists/*.json", {
    eager: true,
    import: "default",
});

const loadChecklist = createDataLoader(modules);

export function getChecklistData(game: string): ChecklistData | null {
    return loadChecklist(game);
}
