export interface LocalizedText {
    es: string;
    en: string;
    fr: string;
    pt: string;
}

export type MaybeLocalizedText = string | LocalizedText;
