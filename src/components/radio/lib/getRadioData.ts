import type { RawRadioData } from "../types/types";

const radioModules = import.meta.glob("@/data/radio/*.json", {
    eager: true,
    import: "default",
}) as Record<string, RawRadioData>;

export function getRadioData(game: string): RawRadioData | null {
    const entry = Object.entries(radioModules).find(([path]) =>
        path.endsWith(`/radio/${game}.json`),
    );

    return entry?.[1] ?? null;
}
