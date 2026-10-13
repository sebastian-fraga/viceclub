import { useTranslation } from "react-i18next";

export default function useLocale(): string {
    const { i18n } = useTranslation();

    return i18n.language;
}
