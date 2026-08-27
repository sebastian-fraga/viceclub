import type { LocalizedText, MaybeLocalizedText } from "@/types/localizedText";

import type { Platform, PlatformFamily } from "@/config/platforms";

export type PlatformId = Platform;
export type { PlatformFamily };

export type CheatNoteType = "info" | "warning";

export interface PlatformNotes {
    platforms: PlatformId[];
    note: LocalizedText;
    noteType?: CheatNoteType;
}

export interface Cheat {
    id: string;
    title: MaybeLocalizedText;
    codes: Partial<Record<PlatformId, string[]>>;
    notes?: PlatformNotes[];
    platformNotes?: PlatformNotes[];
}

export interface CheatCategoryData {
    category?: LocalizedText;
    cheats: Cheat[];
}

export type CheatCategory = Cheat[];
export type CheatsData = Record<string, CheatCategory | CheatCategoryData>;

export interface CheatsFile {
    cheats: CheatsData;
    definitivePlatforms: PlatformId[];
}

export interface PlatformConfig {
    family: PlatformFamily;
    name: string;
    icon: string;
    familyIcon: string;
}

export interface ButtonIconData {
    icon: string;
    bg: string;
}

export type ButtonIcons = Partial<
    Record<PlatformId, Record<string, ButtonIconData>>
>;
