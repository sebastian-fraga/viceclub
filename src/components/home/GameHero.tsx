import { motion } from "framer-motion";

import { type Platform, type PlatformFamily } from "@/config/platforms";
import useSettings from "@/hooks/useSettings";
import type { Game } from "@/types/game";

import PurchaseDropdown from "@/components/home/PurchaseDropdown";
import TrailerDropdown from "@/components/home/TrailerDropdown";
import VariantSelector from "@/components/home/VariantSelector";
import useT from "@/hooks/useT";

interface Props {
    game: Game;
    variantId: string;
    onVariantChange: (variantId: string) => void;
}

export default function GameHero({ game, variantId, onVariantChange }: Props) {
    const t = useT();
    const { settings } = useSettings();

    const buttonClass =
        "px-10 py-4 rounded-full text-xl font-black cursor-pointer transition duration-500 max-mobile:px-5 max-mobile:py-2.5 max-mobile:text-sm";

    const background =
        variantId === game.id
            ? `/assets/images/games/${game.id}/hero.webp`
            : `/assets/images/games/${game.id}/${variantId}/hero.webp`;
    const gameIcon =
        variantId === game.id
            ? `/assets/images/icons/games/logos/${game.id}.webp`
            : `/assets/images/icons/games/logos/${variantId}.webp`;

    const preferredPlatform = settings.platform as Platform | "default";
    const preferredPlatformFamily = settings["platform-family"] as
        | PlatformFamily
        | "default";

    const selectedVariant = game.variants?.find(
        (variant) => variant.id === variantId,
    );

    const title =
        variantId === game.id
            ? game.title
            : (selectedVariant?.label ?? game.title);
    return (
        <section className="flex flex-col gap-6">
            {game.variants && (
                <VariantSelector
                    variants={game.variants}
                    selected={variantId}
                    onChange={onVariantChange}
                />
            )}
            <div className="relative min-h-80 w-full rounded-4xl shadow-2xl shadow-(color:--game-accent)/5 max-mobile:min-h-48 max-mobile:rounded-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-4xl overflow-hidden bg-cover max-mobile:rounded-3xl max-mobile:bg-position-[80%]"
                    style={{ backgroundImage: `url("${background}")` }}
                >
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/15 via-50% to-black/75" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                    className="absolute inset-x-0 bottom-0 flex items-center ml-4 gap-4 max-mobile:ml-2 max-mobile:gap-2 px-5"
                >
                    <div className="w-44 max-mobile:w-24">
                        <img
                            src={gameIcon}
                            alt={t("common.accessibility.gameIcon", {
                                game: game.id,
                            })}
                            className="drop-shadow-2xl drop-shadow-(color:--game-accent)/10"
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col items-start gap-4 max-mobile:gap-2 ">
                        <h1 className="px-1 text-3xl font-black tracking-wide text-pretty max-mobile:text-lg/5">
                            {title}
                        </h1>

                        <div className="flex gap-4 max-mobile:gap-2">
                            <PurchaseDropdown
                                purchase={game.purchase}
                                buttonClass={buttonClass}
                                preferredPlatform={preferredPlatform}
                                preferredPlatformFamily={
                                    preferredPlatformFamily
                                }
                            />

                            <TrailerDropdown
                                gameId={game.id}
                                trailers={game.trailers}
                                buttonClass={buttonClass}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
