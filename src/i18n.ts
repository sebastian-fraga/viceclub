import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
    defaultLanguage,
    detectBrowserLanguage,
    languages,
    type Language,
} from "@/config/languages";
import { resources } from "@/data/lang";

const storedLanguage =
    typeof localStorage !== "undefined"
        ? localStorage.getItem("language")
        : null;

const initialLanguage: Language =
    storedLanguage && storedLanguage in languages
        ? (storedLanguage as Language)
        : (detectBrowserLanguage() ?? defaultLanguage);

i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
