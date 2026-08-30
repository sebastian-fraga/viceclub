import { useEffect } from "react";

import { detectBrowserLanguage } from "@/config/languages";
import { resources } from "@/data/lang";
import i18n from "@/i18n";

export default function useSyncLanguage() {
    useEffect(() => {
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
    }, []);
}
