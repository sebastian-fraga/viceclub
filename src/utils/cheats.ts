import { getPlatformFamily, type Platform } from "@/config/platforms";

import type { Cheat, PlatformId } from "@/types/cheats";

export const getCheatCodes = (cheat: Cheat, platform: PlatformId): string[] => {
    return cheat.codes[platform] ?? [];
};

export const getButtonIconPath = (
    platform: Platform,
    button: string,
): string => {
    const family = getPlatformFamily(platform);

    if (family === "default") {
        return "";
    }

    return `/assets/images/icons/buttons/${family}/${platform}/${button}.webp`;
};