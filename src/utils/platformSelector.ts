import {
    platformFamilies,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";

import type { Game } from "@/types/game";

export const getAvailableFamilies = (
    availablePlatforms: Platform[],
): PlatformFamily[] => {
    return (
        Object.entries(platformFamilies) as [
            PlatformFamily,
            (typeof platformFamilies)[PlatformFamily],
        ][]
    )
        .filter(([, family]) =>
            family.platforms.some((platform) =>
                availablePlatforms.includes(platform as Platform),
            ),
        )
        .map(([familyId]) => familyId);
};

export const getInitialFamily = (
    savedFamily: PlatformFamily | "default",
    availableFamilies: PlatformFamily[],
): PlatformFamily => {
    if (savedFamily !== "default" && availableFamilies.includes(savedFamily)) {
        return savedFamily;
    }

    return availableFamilies[0] ?? "pc";
};

export const getInitialPlatform = (
    savedPlatform: Platform | "default",
    selectedFamily: PlatformFamily,
    availablePlatforms: Platform[],
): Platform => {
    const familyPlatforms = platformFamilies[selectedFamily].platforms.filter(
        (platform) => availablePlatforms.includes(platform as Platform),
    ) as Platform[];

    if (
        savedPlatform !== "default" &&
        familyPlatforms.includes(savedPlatform)
    ) {
        return savedPlatform;
    }

    return familyPlatforms[0] ?? "pc";
};

export const getPlatformEdition = (
    platform: Platform,
    gameData: Game,
): string => {
    if (gameData.originalPlatforms.includes(platform)) {
        return "common.editionLabels.original";
    }
    if (gameData.anniversaryPlatforms.includes(platform)) {
        return "common.editionLabels.10th";
    }

    if (gameData.definitivePlatforms.includes(platform)) {
        return "common.editionLabels.DE";
    }

    if (gameData.enhancedPlatforms.includes(platform)) {
        return "common.editionLabels.E";
    }
    if (gameData.expandedAndEnhancedPlatforms.includes(platform)) {
        return "common.editionLabels.E&E";
    }

    return "";
};
