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
 * Las claves de idioma son siempre en minusculas en todos los datasets
 * (data/artworks, data/cheats, data/checklists, data/maps y los ficheros
 * remotos de news y timeline).
 */
export function resolveLocalizedText(
    value: MaybeLocalizedText | string | Record<string, string>,
    lang: string,
): string {
    if (typeof value === "string") return value;

    const language = normalizeLanguage(lang);
    const record = value as Record<string, string>;

    return record[language] ?? record[DEFAULT_LANG] ?? "";
}
