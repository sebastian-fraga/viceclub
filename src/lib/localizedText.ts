import type { LocalizedText, MaybeLocalizedText } from "@/types/localizedText";

const DEFAULT_LANG: keyof LocalizedText = "es";

export function resolveLocalized(
    value: MaybeLocalizedText,
    language: string,
): string {
    if (typeof value === "string") return value;

    const lang = language.split("-")[0] as keyof LocalizedText;
    return value[lang] ?? value[DEFAULT_LANG] ?? "";
}
