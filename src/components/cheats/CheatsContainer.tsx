import { gamesList, type GameId } from "@/config/games";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

import {
    platformFamilies,
    platformIcons,
    platforms,
    type Platform,
    type PlatformFamily,
} from "@/config/platforms";

import { games } from "@/data/games";

import type { Cheat, CheatsFile } from "@/types/cheats";

import type { MultiSelectorOption } from "@/components/ui/selector/MultiSelector";
import { MultiSelector } from "@/components/ui/selector/MultiSelector";
import Title from "@/components/ui/Title";

import useSettings from "@/hooks/useSettings";
import useT from "@/hooks/useT";

import { getButtonIconPath, getCheatCodes } from "@/utils/cheats";

import "./cheats.css";

import { useLocalizedText } from "@/hooks/useLocalizedText";
import {
    getAvailableFamilies,
    getInitialFamily,
    getInitialPlatform,
    getPlatformEdition,
} from "@/utils/platformSelector";
import { motion } from "framer-motion";

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
    const i18n = useT()
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
                            {cheats.map((cheat) => {
                                const codeButtons = getCheatCodes(
                                    cheat,
                                    selectedPlatform,
                                );

                                const platformNotes =
                                    cheat.platformNotes?.filter((entry) =>
                                        entry.platforms.includes(
                                            selectedPlatform,
                                        ),
                                    );

                                const isAvailable = codeButtons.length > 0;
                                return (
                                    <div
                                        key={cheat.id}
                                        className={`rounded-3xl p-7 max-mobile:p-4 flex flex-col gap-2 transition-opacity ${
                                            isAvailable
                                                ? "bg-(--button-bg)/40 shadow-2xl shadow-violet-400/5"
                                                : "bg-(--button-bg)/20 opacity-50 cursor-not-allowed"
                                        }`}
                                    >
                                        <h3 className="text-lg font-medium text-violet-50">
                                            {t(cheat.title)}
                                        </h3>

                                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                            {isAvailable ? (
                                                codeButtons.map(
                                                    (button, index) => {
                                                        const isText =
                                                            selectedPlatform ===
                                                                "pc" ||
                                                            button.startsWith(
                                                                "text:",
                                                            );

                                                        const value =
                                                            button.startsWith(
                                                                "text:",
                                                            )
                                                                ? button.slice(
                                                                      5,
                                                                  )
                                                                : button;

                                                        return isText ? (
                                                            <kbd
                                                                key={`${button}-${index}`}
                                                                className="bg-(--button-bg) px-6 py-1.5 max-mobile:px-2.5 max-mobile:py-1 rounded-full text-sm max-mobile:text-xs font-body text-(--title-color) shadow-2xl shadow-violet-300/15"
                                                            >
                                                                {value}
                                                            </kbd>
                                                        ) : (
                                                            <img
                                                                key={`${button}-${index}`}
                                                                src={getButtonIconPath(
                                                                    selectedPlatform,
                                                                    button,
                                                                )}
                                                                alt={button}
                                                                className="h-9 w-auto object-contain shadow-2xl shadow-violet-300/25"
                                                            />
                                                        );
                                                    },
                                                )
                                            ) : (
                                                <span className="text-xs text-zinc-500">
                                                    {i18n("cheats.notAvailable")}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-0">
                                            {platformNotes?.map(
                                                (platformNote, index) => (
                                                    <div
                                                        key={index}
                                                        className={`font-body-condensed tracking-wide mt-2 rounded-2xl text-sm cheat-note-entry ${
                                                            platformNote.noteType ===
                                                            "warning"
                                                                ? "text-red-100"
                                                                : "text-blue-100"
                                                        }`}
                                                    >
                                                        {parse(
                                                            t(
                                                                platformNote.note,
                                                            ),
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </motion.div>
    );
};
