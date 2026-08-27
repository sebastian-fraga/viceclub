import type { MaybeLocalizedText, LocalizedText } from "@/types/localizedText";

import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/utils/getLocalizedText";

export function useLocalizedText() {
    const { i18n } = useTranslation();

    return (value: MaybeLocalizedText) =>
        getLocalizedText(value, i18n.language);
}
