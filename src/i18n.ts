import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage } from "@/config/languages";
import { resources } from "@/data/lang";

i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
