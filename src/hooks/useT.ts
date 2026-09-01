import type { TFunction } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultLanguage } from "@/config/languages";
import i18n from "@/i18n";

export default function useT(): TFunction {
    const { t } = useTranslation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return i18n.getFixedT(defaultLanguage);
    }

    return t;
}
