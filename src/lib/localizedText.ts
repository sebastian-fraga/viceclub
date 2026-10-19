import type { LocalizedText, MaybeLocalizedText } from "@/types/localizedText";

const DEFAULT_LANG: keyof LocalizedText = "es";

export function normalizeLanguage(lang: string): keyof LocalizedText {
    const short = lang.split("-")[0].toLowerCase();

    if (short === "pt" || short === "en" || short === "fr") return short;

    return DEFAULT_LANG;
}

export function resolveLocalizedText(
    value: MaybeLocalizedText | string | Record<string, string>,
    lang: string,
): string {
    if (typeof value === "string") return value;

    const language = normalizeLanguage(lang);
    const record = value as Record<string, string>;

    return record[language] ?? record[DEFAULT_LANG] ?? "";
}
