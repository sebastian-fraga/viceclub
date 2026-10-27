import { gamesList, type GameId } from "@/config/games";
import { useEffect, useState } from "react";

import {
    platformFamilies,
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

    const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
        initialPlatform as Platform,
    );

    useEffect(() => {
        const savedFamily = settings["platform-family"] as
            | PlatformFamily
            | "default";

        const savedPlatform = settings.platform as Platform | "default";

        const availableFamilies = getAvailableFamilies(availablePlatforms);

        const family = getInitialFamily(savedFamily, availableFamilies);

        const platform = getInitialPlatform(
            savedPlatform,
            family,
            availablePlatforms,
        );

        setSelectedFamily(family);
        setSelectedPlatform(platform);
    }, [settings, availablePlatforms]);

    const selectorOptions = buildSelectorOptions(
        availablePlatforms,
        gameData,
    );

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

                <MultiSelector<PlatformFamily, Platform>
                    options={selectorOptions}
                    selectedPrimaryId={selectedFamily}
                    selectedSecondaryId={selectedPlatform}
                    onSelectPrimary={handleFamilyChange}
                    onSelectSecondary={handlePlatformChange}
                />
            </div>

            {categories.map(([categoryName, categoryData]) => {
                const cheats: Cheat[] = Array.isArray(categoryData)
                    ? categoryData
                    : categoryData.cheats;

                return (
                    <section key={categoryName} className="flex flex-col gap-4">
                        <h2 className="flex items-center gap-3 text-2xl font-bold pb-1 text-(--title-color)">
                            {Array.isArray(categoryData)
                                ? categoryName
                                : t(categoryData.category)}

                            <span className="font-body-condensed text-sm bg-(--button-bg) px-2 py-0.5 rounded-[4px]">
                                {cheats.length}
                            </span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-stretch max-mobile:gap-y-3">
                            {cheats.map((cheat) => (
                                <CheatCard
                                    key={cheat.id}
                                    cheat={cheat}
                                    selectedPlatform={selectedPlatform}
                                    game={game}
                                    gameData={gameData}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </motion.div>
    );
};