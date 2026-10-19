import type { LocalizedText, MaybeLocalizedText } from "@/types/localizedText";

const DEFAULT_LANG: keyof LocalizedText = "es";

/**
 * Normaliza un codigo de idioma ("pt-BR" -> "pt") al que usan los datos.
 */
export function normalizeLanguage(lang: string): keyof LocalizedText {
    const short = lang.split("-")[0].toLowerCase();

    if (short === "pt" || short === "en" || short === "fr") return short;

    return DEFAULT_LANG;
}

/**
 * Resuelve un texto localizado al idioma actual, con fallback a español.
 * Es la unica implementacion: antes existian cuatro versiones distintas
 * (utils/getLocalizedText, lib/localizedText, hooks/useLocalizedText y
 * artworks/mediaUtils.getCaption).
 *
 * La busqueda no distingue mayusculas porque los datos no son coherentes:
 * `data/cheats` usa claves en mayusculas ("ES") y el resto en minusculas
 * ("es").
 */
export function resolveLocalizedText(
    value: MaybeLocalizedText | string | Record<string, string>,
    lang: string,
): string {
    if (typeof value === "string") return value;

    const language = normalizeLanguage(lang);
    const record = value as Record<string, string>;

    return (
        record[language] ??
        record[language.toUpperCase()] ??
        record[DEFAULT_LANG] ??
        record[DEFAULT_LANG.toUpperCase()] ??
        ""
    );
}
