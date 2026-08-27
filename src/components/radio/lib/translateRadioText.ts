import type { TFunction } from "i18next";

function translateSetName(text: string, t: TFunction): string {
    const match = text.match(/^Set de (.+?)(?: \((.+)\))?$/);

    if (!match) return text;

    const [, name, tag] = match;

    return t("radio.common.set", {
        name,
        tag: tag ? ` (${t(`radio.common.tags.${tag.toLowerCase()}`)})` : "",
    });
}

export function translateRadioText(text: string, t: TFunction): string {
    const translatedSet = translateSetName(text, t);

    if (translatedSet !== text) return translatedSet;

    return text
        .replace(/\bAdelanto\b/g, t("radio.common.preview"))
        .replace(/\bSegmento\b/g, t("radio.common.segment"))
        .replace(/\bNoticia\b/g, t("radio.common.news"))
        .replace(/\bEpisodio\b/g, t("radio.common.episode"));
}
