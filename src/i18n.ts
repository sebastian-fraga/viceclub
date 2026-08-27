import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage } from "@/config/languages";
import { resources } from "@/data/lang";

declare global {
    interface Window {
        __INITIAL_LANG__?: string;
    }
}

const initialLanguage =
    typeof window !== "undefined"
        ? (window.__INITIAL_LANG__ ?? defaultLanguage)
        : defaultLanguage;

i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
