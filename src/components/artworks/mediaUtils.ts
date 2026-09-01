import type {
    Caption,
    FlatImageEntry,
    GameMediaIndex,
    MediaCategory,
} from "@/components/artworks/types";

import { sectionLabels } from "@/components/artworks/sectionLabels";

const S3_BASE = "https://viceclub.s3.us-east-1.amazonaws.com";

export function getImageUrl(
    gameId: string,
    category: MediaCategory,
    section: string,
    id: string,
) {
    return `${S3_BASE}/${gameId}/images/${category}/${section}/${id}.webp`;
}

export function getCaption(caption: Caption, lang: string): string {
    return typeof caption === "string"
        ? caption
        : (caption[lang] ?? caption["es"]);
}

export function flattenCategory(
    data: GameMediaIndex,
    category: MediaCategory,
): FlatImageEntry[] {
    return Object.entries(data[category]).flatMap(([section, images]) =>
        images.map((image) => ({ ...image, section })),
    );
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function getSectionLabel(section: string, lang: string): string {
    const label = sectionLabels[section];
    return label ? getCaption(label, lang) : section;
}