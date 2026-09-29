import type { MaybeLocalizedText } from "@/types/localizedText";
import type { ModCategoryId } from "./categories";

export interface ModInstallStep {
    title: MaybeLocalizedText;
    description: MaybeLocalizedText;
}

export interface ModEntry {
    id: string;
    title: string;
    category: ModCategoryId;
    shortDescription: MaybeLocalizedText;
    description: MaybeLocalizedText;
    version?: string;
    author: string | string[];
    requirements?: ModRequirementsData;
    installSteps: ModInstallStep[];
    coverImage: string;
    screenshots: string[];
    moreInfoUrl: string;
    downloadUrl: string;
    isFeatured?: boolean;
}

export interface ModRequirementsData {
    gameVersion?: string;
    mods?: string[];
}

export interface GameModsFile {
    gameId: string;
    mods: ModEntry[];
}
