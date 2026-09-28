import FeaturedMod from "@/components/mods/FeaturedMod";
import ModModal from "@/components/mods/ModModal";
import ModsGrid from "@/components/mods/ModsGrid";
import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import type { ModEntry } from "@/data/mods/types";
import useT from "@/hooks/useT";
import { useState } from "react";
import "./mods.css";

interface Props {
    gameId: GameId;
    mods: ModEntry[];
}

export default function ModsContainer({ gameId, mods }: Props) {
    const i18n = useT();
    const gameInfo = gamesList.find((item) => item.id === gameId);

    const featuredMod = mods.find((mod) => mod.isFeatured);
    const normalMods = mods.filter((mod) => !mod.isFeatured);

    const [selectedMod, setSelectedMod] = useState<ModEntry | null>(null);
    return (
        <>
            <section className="flex flex-col gap-18 w-full max-w-6xl mt-8 mx-auto px-4 text-white">
                <div className="mb-12 mt-6 max-w-fit">
                    <Title
                        label={i18n("mods.title", {
                            fullName: gameInfo?.fullName,
                        })}
                    />
                </div>
                {featuredMod && (
                    <FeaturedMod mod={featuredMod} onSelect={setSelectedMod} />
                )}
                <div>
                    <ModsGrid mods={normalMods} onSelect={setSelectedMod} />
                </div>
            </section>
            <div>
                {selectedMod && (
                    <ModModal
                        open={selectedMod !== null}
                        onClose={() => setSelectedMod(null)}
                        mod={selectedMod}
                    />
                )}
            </div>
        </>
    );
}
