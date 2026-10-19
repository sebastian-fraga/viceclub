import { resolveLocalizedText } from "@/lib/localizedText";
import type { MaybeLocalizedText } from "@/types/localizedText";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { defaultLanguage } from "@/config/languages";

export function useLocalizedText() {
    const { i18n } = useTranslation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const language = hydrated ? i18n.language : defaultLanguage;

    return (value: MaybeLocalizedText) => resolveLocalizedText(value, language);
}
