import { useEffect, useState } from "react";
import type { MaybeLocalizedText, LocalizedText } from "@/types/localizedText";

import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/utils/getLocalizedText";
import { defaultLanguage } from "@/config/languages";

export function useLocalizedText() {
    const { i18n } = useTranslation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const language = hydrated ? i18n.language : defaultLanguage;

    return (value: MaybeLocalizedText) => getLocalizedText(value, language);
}
