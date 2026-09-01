import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLanguage, detectBrowserLanguage } from "@/config/languages";
import { resources } from "@/data/lang";

function resolveInitialLanguage(): string {
    if (typeof localStorage === "undefined") return defaultLanguage;

    try {
        const stored = localStorage.getItem("viceclub-settings");

        if (stored) {
            const settings = JSON.parse(stored);

            if (
                typeof settings.language === "string" &&
                settings.language in resources
            ) {
                return settings.language;
            }
        }
    } catch {}

    return detectBrowserLanguage() ?? defaultLanguage;
}

const initialLanguage = resolveInitialLanguage();

export const i18nReady = i18n.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

function applyUserLanguage() {
    const stored = localStorage.getItem("viceclub-settings");
    let targetLanguage: string | null = null;

    if (stored) {
        try {
            const settings = JSON.parse(stored);
            if (
                typeof settings.language === "string" &&
                settings.language in resources
            ) {
                targetLanguage = settings.language;
            }
        } catch {}
    }

    if (!targetLanguage) {
        targetLanguage = detectBrowserLanguage();
    }

    if (targetLanguage) {
        document.cookie = `language=${targetLanguage}; path=/; max-age=31536000; samesite=lax`;

        if (targetLanguage !== i18n.language) {
            i18n.changeLanguage(targetLanguage);
        }

        window.dispatchEvent(
            new CustomEvent("settings-change", {
                detail: { language: targetLanguage },
            }),
        );
    }
}

if (typeof document !== "undefined") {
    document.addEventListener("astro:page-load", applyUserLanguage);
}

export default i18n;
