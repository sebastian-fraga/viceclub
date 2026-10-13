import {
    HTML_LANG,
    LANG_TO_LOCALE,
    LOCALES,
    defaultLanguage,
    type Language,
    type LocaleSlug,
} from "@/config/languages";

export function isLocaleSlug(value: string | undefined): value is LocaleSlug {
    return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): LocaleSlug | null {
    const first = pathname.split("/")[1];
    return isLocaleSlug(first) ? first : null;
}

export function stripLocale(pathname: string): string {
    const slug = getLocaleFromPathname(pathname);
    if (!slug) return pathname || "/";

    const rest = pathname.slice(slug.length + 1);
    return rest === "" ? "/" : rest;
}

export function localePath(path: string, language: Language): string {
    const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
    return `/${LANG_TO_LOCALE[language]}${clean}`;
}

export function switchLocalePath(pathname: string, language: Language): string {
    return localePath(stripLocale(pathname), language);
}

export function getLanguageFromHtmlLang(htmlLang: string): Language {
    const found = (Object.keys(HTML_LANG) as Language[]).find(
        (language) =>
            HTML_LANG[language].toLowerCase() === htmlLang.toLowerCase(),
    );

    return found ?? defaultLanguage;
}
