import { createDataLoader } from "@/lib/data/createDataLoader";
import type { RawRadioData } from "../types/types";

const modules = import.meta.glob<RawRadioData>("@/data/radio/*.json", {
    eager: true,
    import: "default",
});

const loadRadio = createDataLoader(modules);

export function getRadioData(game: string): RawRadioData | null {
    return loadRadio(game);
}
