import { platformFamilies, platformIcons, platforms, type Platform, type PlatformFamily } from "@/config/platforms";
import type { Game } from "@/types/game";
import type { MultiSelectorOption } from "@/components/ui/selector/MultiSelector";
import { getPlatformEdition } from "@/utils/platformSelector";

export function buildSelectorOptions(
    availablePlatforms: Platform[],
    gameData: Game,
): MultiSelectorOption<PlatformFamily, Platform>[] {
    const selectorOptions: MultiSelectorOption<PlatformFamily, Platform>[] = [];

    for (const [familyId, family] of Object.entries(platformFamilies)) {
        const familyIdTyped = familyId as PlatformFamily;

        const familyPlatforms = family.platforms.filter((platform) =>
            availablePlatforms.includes(platform as Platform),
        ) as Platform[];

        if (familyPlatforms.length === 0) {
            continue;
        }

        selectorOptions.push({
            id: familyIdTyped,
            label: family.name,
            icon: family.icon,

            subOptions: familyPlatforms.map((platform) => ({
                id: platform,
                label: platforms[platform],
                icon: platformIcons[platform],
                labelEdition: getPlatformEdition(platform, gameData),
            })),
        });
    }

    return selectorOptions;
}