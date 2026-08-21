import es from "./es.ts";
import en from "./en.ts";
import fr from "./fr.ts";
import pt from "./pt.ts";

export const resources = {
    es: {
        translation: es,
    },
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
    },
    pt: {
        translation: pt,
    },
} as const;
