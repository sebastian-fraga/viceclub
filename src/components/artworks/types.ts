export type Caption = string | Record<string, string>;

export interface ImageEntry {
    id: string;
    caption: Caption;
}

export type MediaCategory = "artworks" | "screenshots";

export interface GameMediaIndex {
    artworks: Record<string, ImageEntry[]>;
    screenshots: Record<string, ImageEntry[]>;
}

export interface FlatImageEntry extends ImageEntry {
    section: string
}