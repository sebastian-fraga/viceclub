import type { MaybeLocalizedText, LocalizedText } from "@/types/localizedText";

function normalizeLang(lang: string): keyof LocalizedText {
    const short = lang.split("-")[0].toLowerCase();

    if (short === "pt") return "pt";
    if (short === "en") return "en";
    if (short === "fr") return "fr";

    return "es";
}

export function getLocalizedText(
    value: MaybeLocalizedText,
    lang: string,
): string {
    if (typeof value === "string") return value;

    const language = normalizeLang(lang);

    return (
        value[language] ??
        value[language.toUpperCase() as keyof typeof value] ??
        value.es ??
        ""
    );
}
