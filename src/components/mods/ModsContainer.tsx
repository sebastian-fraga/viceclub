import FeaturedMod from "@/components/mods/FeaturedMod";
import ModModal from "@/components/mods/ModModal";
import ModsGrid from "@/components/mods/ModsGrid";
import { MultiSelector } from "@/components/ui/selector/MultiSelector";
import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import { MOD_CATEGORIES, type ModCategoryId } from "@/data/mods/categories";
import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";
import { IconMoodPuzzled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./mods.css";

interface Props {
    gameId: GameId;
    mods: ModEntry[];
}

export default function ModsContainer({ gameId, mods }: Props) {
    const [selectedModId, setSelectedModId] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<
        ModCategoryId | "all"
    >("all");

    const categoryOptions = [
        { id: "all" as const, label: "mods.categories.all" },
        ...Object.values(MOD_CATEGORIES),
    ];

    const i18n = useT();
    const gameInfo = gamesList.find((item) => item.id === gameId);

    const selectedMod = mods.find((mod) => mod.id === selectedModId) ?? null;

    const featuredMod = mods.find((mod) => mod.isFeatured);
    const normalMods = mods.filter(
        (mod) =>
            !mod.isFeatured &&
            (selectedCategory === "all" || selectedCategory === mod.category),
    );

    function handleSelectMod(mod: ModEntry) {
        setSelectedModId(mod.id);
    }

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-8 w-full max-w-6xl mx-auto px-4 text-white"
            >
                <div className="mb-12 mt-6 max-w-fit">
                    <Title
                        label={i18n("mods.title", {
                            fullName: gameInfo?.fullName,
                        })}
                    />
                </div>
                {featuredMod && (
                    <FeaturedMod mod={featuredMod} onSelect={handleSelectMod} />
                )}
                <div className="mt-12 mb-2">
                    <MultiSelector<ModCategoryId | "all">
                        options={categoryOptions}
                        selectedPrimaryId={selectedCategory}
                        onSelectPrimary={setSelectedCategory}
                    />
                </div>
                <div className="">
                    <ModsGrid mods={normalMods} onSelect={handleSelectMod} />
                    {normalMods.length === 0 && (
                        <div className="flex flex-col justify-center items-center gap-4 bg-(--button-bg)/80 py-20 rounded-2xl">
                            <IconMoodPuzzled />
                            <p>
                                No hay mods para esta categoría. Pero los habrá
                                pronto.
                            </p>
                        </div>
                    )}
                </div>
            </motion.section>
            <div>
                <AnimatePresence>
                    {selectedMod && (
                        <ModModal
                            open={true}
                            onClose={() => setSelectedModId(null)}
                            mod={selectedMod}
                            allMods={mods}
                            onSelectMod={setSelectedModId}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
