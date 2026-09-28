import type { ModCategoryId } from "./categories";

export interface ModInstallStep {
    title: string;
    description: string;
}

export interface ModEntry {
    id: string;
    title: string;
    category: ModCategoryId;
    shortDescription: string;
    description: string;
    version?: string;
    author: string | string[];
    requirements?: string[];
    installSteps: ModInstallStep[];
    coverImage: string;
    screenshots: string[];
    moreInfoUrl: string;
    downloadUrl: string;
    isFeatured?: boolean;
}

export interface GameModsFile {
    gameId: string;
    mods: ModEntry[];
}
