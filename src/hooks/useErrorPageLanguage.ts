import { useEffect } from "react";

import {
    HTML_LANG,
    LOCALE_TO_LANG,
    detectBrowserLanguage,
    languages,
    type Language,
} from "@/config/languages";
import i18n from "@/i18n";
import { getLocaleFromPathname } from "@/utils/locale";

function readCookieLanguage(): Language | null {
    const match = document.cookie.match(/(?:^|;\s*)language=([^;]+)/);
    const value = match?.[1];

    return value && value in languages ? (value as Language) : null;
}

export default function useErrorPageLanguage() {
    useEffect(() => {
        const slug = getLocaleFromPathname(window.location.pathname);

        const language: Language =
            (slug ? LOCALE_TO_LANG[slug] : null) ??
            readCookieLanguage() ??
            detectBrowserLanguage() ??
            "en";

        if (language === i18n.language) return;

        i18n.changeLanguage(language);
        document.documentElement.lang = HTML_LANG[language];
        document.title = `${i18n.t("404.title")} | Vice Club`;
    }, []);
}
