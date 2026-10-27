import type { MaybeLocalizedText } from "@/types/localizedText";

export interface NewsItem {
    slug: string;
    title: MaybeLocalizedText;
    subtitle: MaybeLocalizedText;
    date: MaybeLocalizedText;
    paragraphs: MaybeLocalizedText[];
    footerText: MaybeLocalizedText;
    link: string;
    linkText?: MaybeLocalizedText;
    image: string;
    author: string;
}