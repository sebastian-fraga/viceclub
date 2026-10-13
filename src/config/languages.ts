export const languages = {
    es: "Español",
    en: "English",
    fr: "Français",
    pt: "Português",
} as const;

export type Language = keyof typeof languages;

export const LOCALES = ["es", "en", "fr", "pt-br"] as const;
export type LocaleSlug = (typeof LOCALES)[number];

export const LOCALE_TO_LANG: Record<LocaleSlug, Language> = {
    es: "es",
    en: "en",
    fr: "fr",
    "pt-br": "pt",
};

export const LANG_TO_LOCALE: Record<Language, LocaleSlug> = {
    es: "es",
    en: "en",
    fr: "fr",
    pt: "pt-br",
};

export const HTML_LANG: Record<Language, string> = {
    es: "es",
    en: "en",
    fr: "fr",
    pt: "pt-BR",
};

export const languageOptions = Object.entries(languages).map(
    ([value, label]) => ({
        value: value as Language,
        label,
    }),
);

export const defaultLanguage: Language = "es";

export const detectBrowserLanguage = (): Language | null => {
    if (typeof navigator === "undefined") return null;

    const language = navigator.language.split("-")[0];

    return language in languages ? (language as Language) : null;
};
