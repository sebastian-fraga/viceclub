import { gamesList, type GameId } from "@/config/games";
import { useEffect, useState } from "react";

import {
    platformFamilies,
    getPlatformFamily,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";

import { games } from "@/data/games";

import type { Cheat, CheatsFile } from "@/types/cheats";

import { MultiSelector } from "@/components/ui/selector/MultiSelector";
import Title from "@/components/ui/Title";

import useSettings from "@/hooks/useSettings";
import useT from "@/hooks/useT";

import { motion } from "framer-motion";

import "./cheats.css";

import { useLocalizedText } from "@/hooks/useLocalizedText";
import {
    getAvailableFamilies,
    getInitialFamily,
    getInitialPlatform,
} from "@/utils/platformSelector";

import { CheatCard } from "./CheatCard";
import { buildSelectorOptions } from "./utils/buildSelectorOptions";
import CopyLink from "@/components/ui/CopyLink";
import { slugify } from "@/components/artworks/mediaUtils";
import { useUrlParam } from "@/hooks/useUrlParam";
import CountBadge from "@/components/ui/CountBadge";

interface CheatsContainerProps {
    cheatsData: CheatsFile;
    platforms: Platform[];
    game: GameId;
}

export const CheatsContainer = ({
    cheatsData,
    platforms: availablePlatforms,
    game,
}: CheatsContainerProps) => {
    const i18n = useT();
    const t = useLocalizedText();
    const { settings } = useSettings();

    const gameInfo = gamesList.find((item) => item.id === game);
    const gameData = games[game];

    const availableFamilies = getAvailableFamilies(availablePlatforms);

    const initialFamily =
        getInitialFamily(
            settings["platform-family"] as PlatformFamily | "default",
            availableFamilies,
        ) ?? availableFamilies[0];

    let initialPlatform = getInitialPlatform(
        settings.platform as Platform | "default",
        initialFamily as PlatformFamily,
        availablePlatforms,
    );

    if (!initialPlatform) {
        initialPlatform = availablePlatforms[0];
    }

    const [selectedFamily, setSelectedFamily] = useState<PlatformFamily>(
        initialFamily as PlatformFamily,
    );

    const [selectedPlatform, setSelectedPlatform, hasUrlPlatform] = useUrlParam(
        "platform",
        availablePlatforms,
        initialPlatform,
    );

    useEffect(() => {
        const family = getPlatformFamily(selectedPlatform);

        if (family !== "default") {
            setSelectedFamily(family);
        }
    }, [selectedPlatform]);

    useEffect(() => {
        if (hasUrlPlatform) return;

        const savedFamily = settings["platform-family"] as
            | PlatformFamily
            | "default";

        const savedPlatform = settings.platform as Platform | "default";

        const family = getInitialFamily(savedFamily, availableFamilies);

        const platform =
            getInitialPlatform(savedPlatform, family, availablePlatforms) ??
            availablePlatforms[0];

        setSelectedFamily(family);
        setSelectedPlatform(platform);
    }, [hasUrlPlatform, settings, availablePlatforms, setSelectedPlatform]);

    const selectorOptions = buildSelectorOptions(availablePlatforms, gameData);

    const handleFamilyChange = (family: PlatformFamily) => {
        setSelectedFamily(family);

        const firstAvailablePlatform = platformFamilies[family].platforms.find(
            (platform) => availablePlatforms.includes(platform as Platform),
        );

        if (firstAvailablePlatform) {
            setSelectedPlatform(firstAvailablePlatform as Platform);
        }
    };

    const handlePlatformChange = (platform: Platform) => {
        setSelectedPlatform(platform);
    };

    const categories = Object.entries(cheatsData);
    const showSelector = availablePlatforms.length > 1;

    let globalIndex = 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-18 w-full max-w-5xl mt-8 mx-auto px-4 text-white"
        >
            <div className="flex flex-col gap-12">
                <div className="max-w-fit">
                    <Title
                        label={i18n("cheats.title", {
                            fullName: gameInfo?.fullName,
                        })}
                    />
                </div>

                {showSelector && (
                    <MultiSelector<PlatformFamily, Platform>
                        options={selectorOptions}
                        selectedPrimaryId={selectedFamily}
                        selectedSecondaryId={selectedPlatform}
                        onSelectPrimary={handleFamilyChange}
                        onSelectSecondary={handlePlatformChange}
                    />
                )}
            </div>

            {categories.map(([categoryName, categoryData]) => {
                const cheats: Cheat[] = Array.isArray(categoryData)
                    ? categoryData
                    : categoryData.cheats;

                const id = slugify(categoryName);

                return (
                    <section
                        key={categoryName}
                        id={id}
                        className="flex flex-col gap-4 scroll-mt-50"
                    >
                        <h3 className="flex items-center gap-3 text-2xl font-bold pb-1 text-(--title-color) group">
                            {Array.isArray(categoryData)
                                ? categoryName
                                : t(categoryData.category)}

                            <CountBadge count={cheats.length} />

                            <CopyLink
                                id={slugify(categoryName)}
                                label={categoryName}
                                searchParams={{ platform: selectedPlatform }}
                            />
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-stretch max-mobile:gap-y-3">
                            {cheats.map((cheat) => {
                                const index = globalIndex++;
                                return (
                                    <CheatCard
                                        key={cheat.id}
                                        cheat={cheat}
                                        index={index}
                                        selectedPlatform={selectedPlatform}
                                        game={game}
                                        gameData={gameData}
                                    />
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </motion.div>
    );
};
