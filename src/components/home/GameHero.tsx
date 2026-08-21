import { motion } from "framer-motion";

import { type Platform, type PlatformFamily } from "@/config/platforms";
import useSettings from "@/hooks/useSettings";
import type { Game } from "@/types/game";

import PurchaseDropdown from "@/components/home/PurchaseDropdown";
import TrailerDropdown from "@/components/home/TrailerDropdown";

interface Props {
    game: Game;
}

export default function GameHero({ game }: Props) {
    const { settings } = useSettings();

    const buttonClass =
        "px-10 py-4 rounded-full text-xl font-black cursor-pointer transition duration-500 max-mobile:px-5 max-mobile:py-2.5 max-mobile:text-sm";

    const background = `/assets/images/games/${game.id}/hero.webp`;
    const gameIcon = `/assets/images/icons/games/logos/${game.id}.webp`;

    const preferredPlatform = settings.platform as Platform | "default";
    const preferredPlatformFamily = settings["platform-family"] as
        | PlatformFamily
        | "default";

    return (
        <section className="relative min-h-80 w-full rounded-4xl drop-shadow-2xl max-mobile:min-h-44 max-mobile:rounded-3xl">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 rounded-4xl overflow-hidden bg-cover max-mobile:rounded-3xl max-mobile:bg-position-[80%]"
                style={{ backgroundImage: `url("${background}")` }}
            >
                <div
                    className={`absolute inset-0 ${
                        game.buttonsPosition === "left"
                            ? "bg-linear-to-b"
                            : "bg-linear-to-b"
                    } from-transparent via-black/20 via-50% to-black/95`}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="absolute inset-x-0 bottom-0 grid grid-cols-[192px_1fr] grid-rows-[1fr_auto] items-center ml-4 max-mobile:grid-cols-[96px_1fr] max-mobile:ml-2 -mb-2.5 max-mobile:-mb-1"
            >
                <div className="row-span-2 w-48 self-end object-fit max-mobile:w-24">
                    <img src={gameIcon} alt="" />
                </div>

                <div
                    className={`flex px-4 pt-8 ${
                        game.buttonsPosition === "left"
                            ? "justify-start"
                            : "justify-end"
                    } max-mobile:px-2 max-mobile:pt-4`}
                >
                    <h1 className="text-2xl font-medium tracking-wide max-mobile:text-lg">
                        {game.title}
                    </h1>
                </div>

                <div
                    className={`flex px-3 pb-10 gap-4 ${
                        game.buttonsPosition === "left"
                            ? "justify-start"
                            : "justify-end"
                    } max-mobile:px-2 max-mobile:pb-5 max-mobile:gap-2`}
                >
                    <PurchaseDropdown
                        purchase={game.purchase}
                        buttonClass={buttonClass}
                        preferredPlatform={preferredPlatform}
                        preferredPlatformFamily={preferredPlatformFamily}
                    />

                    <TrailerDropdown
                        gameId={game.id}
                        trailers={game.trailers}
                        buttonClass={buttonClass}
                    />
                </div>
            </motion.div>
        </section>
    );
}
