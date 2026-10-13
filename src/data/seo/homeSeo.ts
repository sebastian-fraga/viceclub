import type { Language } from "@/config/languages";
import type { PageSeo } from "@/data/seo/seo";

export const homeSeo: Record<Language, PageSeo> = {
    es: {
        title: "Vice Club | La página definitiva de la saga GTA",
        description:
            "Guías completas de GTA, checklists para el 100%, mapas interactivos, mods, trucos y radios de GTA San Andreas, GTA 5, GTA 6 y más",
    },
    en: {
        title: "Vice Club | The Ultimate Site for the GTA Series",
        description:
            "Complete GTA guides, 100% checklists, interactive maps, mods, cheats and radio stations for GTA San Andreas, GTA 5, GTA 6 and more",
    },
    fr: {
        title: "Vice Club | Le site de référence sur la saga GTA",
        description:
            "Guides complets de GTA, checklists pour le 100 %, cartes interactives, mods, codes de triche et radios de GTA San Andreas, GTA 5, GTA 6 et plus encore",
    },
    pt: {
        title: "Vice Club | O site definitivo da saga GTA",
        description:
            "Guias completos de GTA, checklists para o 100%, mapas interativos, mods, cheats e rádios de GTA San Andreas, GTA 5, GTA 6 e mais",
    },
};
