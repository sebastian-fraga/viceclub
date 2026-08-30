import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage } from "@/config/languages";
import { resources } from "@/data/lang";

function getCookieLanguage(): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(/(?:^|;\s*)language=([^;]+)/);
    if (!match) return null;

    const lang = decodeURIComponent(match[1]);
    return lang in resources ? lang : null;
}

const initialLanguage = getCookieLanguage() ?? defaultLanguage;

i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
