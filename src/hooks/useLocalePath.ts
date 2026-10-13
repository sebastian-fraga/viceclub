import { useTranslation } from "react-i18next";

import type { Language } from "@/config/languages";
import { localePath } from "@/utils/locale";

export default function useLocalePath() {
    const { i18n } = useTranslation();

    return (path: string) => localePath(path, i18n.language as Language);
}
