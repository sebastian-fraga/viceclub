import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

export default function useT(): TFunction {
    const { t } = useTranslation();

    return t;
}
