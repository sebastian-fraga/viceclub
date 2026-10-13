import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage, type Language } from "@/config/languages";
import { resources } from "@/data/lang";
import { getLanguageFromHtmlLang } from "@/utils/locale";

function readPageLanguage(): Language {
    if (typeof document === "undefined") return defaultLanguage;
    return getLanguageFromHtmlLang(document.documentElement.lang);
}

export const i18nReady = i18n.use(initReactI18next).init({
    resources,
    lng: readPageLanguage(),
    fallbackLng: {
        fr: ["en", "es"],
        pt: ["en", "es"],
        en: ["es"],
        default: ["es"],
    },
    interpolation: {
        escapeValue: false,
    },
});

if (typeof document !== "undefined") {
    document.addEventListener("astro:after-swap", () => {
        const language = readPageLanguage();

        if (language !== i18n.language) {
            i18n.changeLanguage(language);
        }
    });
}

export default i18n;
