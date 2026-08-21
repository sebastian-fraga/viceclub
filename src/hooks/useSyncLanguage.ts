import { useEffect } from "react";

import i18n from "@/i18n";
import { resources } from "@/data/lang";
import { detectBrowserLanguage } from "@/config/languages";

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

        if (targetLanguage && targetLanguage !== i18n.language) {
            i18n.changeLanguage(targetLanguage);
        }
    }, []);
}
