export const languages = {
    es: "Español",
    en: "English",
    fr: "Français",
    pt: "Português",
} as const;

export type Language = keyof typeof languages;

export const languageOptions = Object.entries(languages).map(
    ([value, label]) => ({
        value: value as Language,
        label,
    }),
);

export const defaultLanguage: Language = "en";

export const detectBrowserLanguage = (): Language | null => {
    if (typeof navigator === "undefined") return null;

    const language = navigator.language.split("-")[0];

    return language in languages ? (language as Language) : null;
};
