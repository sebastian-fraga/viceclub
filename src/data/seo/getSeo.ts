import type { GameId } from "@/config/games";
import type { Language } from "@/config/languages";
import { seo as seoEs, type PageSeo, type SeoMap } from "@/data/seo/seo";
import { seoEn } from "@/data/seo/seo.en";
import { seoFr } from "@/data/seo/seo.fr";
import { seoPt } from "@/data/seo/seo.pt";

const sources: Record<Language, SeoMap> = {
    es: seoEs,
    en: seoEn,
    fr: seoFr,
    pt: seoPt,
};

function fallbackChain(language: Language): Language[] {
    if (language === "es") return ["es"];
    if (language === "en") return ["en", "es"];
    return [language, "en", "es"];
}

export function getPageSeo(
    game: GameId,
    section: string,
    language: Language,
): PageSeo | undefined {
    for (const lang of fallbackChain(language)) {
        const entry = sources[lang]?.[game]?.[section];
        if (entry) return entry;
    }

    return undefined;
}
