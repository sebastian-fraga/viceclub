import es from "./es.ts";
import en from "./en.ts";
import fr from "./fr.ts";
import pt from "./pt.ts";

type Translation = typeof es;

export const resources = {
    es: {
        translation: es,
    },
    en: {
        translation: en satisfies Translation,
    },
    fr: {
        translation: fr satisfies Translation,
    },
    pt: {
        translation: pt satisfies Translation,
    },
} as const;
