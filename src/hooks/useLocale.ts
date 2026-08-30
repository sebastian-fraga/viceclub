import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { defaultLanguage } from "@/config/languages";

export default function useLocale(): string {
    const { i18n } = useTranslation();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return hydrated ? i18n.language : defaultLanguage;
}
