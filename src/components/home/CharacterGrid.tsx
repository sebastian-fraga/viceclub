import Title from "@/components/ui/Title";
import type { GameId } from "@/config/games";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import useT from "@/hooks/useT";
import CharacterCard, { type Character } from "./CharacterCard";

export default function CharacterGrid({
    characters,
    gameId,
}: {
    characters: Character[];
    gameId: GameId;
}) {
    const t = useT();
    const [visibleCount, setVisibleCount] = useState(9);

    const visibleCharacters = characters.slice(0, visibleCount);
    const hasMore = visibleCount < characters.length;

    return (
        <motion.div
            className="flex w-full flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
            }}
        >
            <div className="max-w-fit">
                <Title label="home.titles.characters" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 max-mobile:mt-5 max-mobile:gap-3">
                {visibleCharacters.map((character, index) => (
                    <motion.div
                        key={character.id}
                        initial={{
                            opacity: 0,
                            y: 15,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: "easeOut",
                            delay:
                                index >= visibleCount - 9
                                    ? (index - (visibleCount - 9)) * 0.05
                                    : 0,
                        }}
                    >
                        <CharacterCard character={character} gameId={gameId} />
                    </motion.div>
                ))}
            </div>

            {hasMore && (
                <motion.button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                    whileTap={{ scale: 0.96 }}
                    className="mt-8 flex cursor-pointer items-center gap-3 self-center rounded-full bg-(--game-buttons-primary-background) px-12 py-4 text-xl font-bold text-(--game-buttons-primary-text) transition hover:bg-(--game-buttons-primary-hovered) hover:text-white max-mobile:mt-5 max-mobile:px-6 max-mobile:py-3 max-mobile:text-base shadow-2xl"
                >
                    <motion.span
                        className="flex items-center"
                        animate={{ y: [0, 3, 0] }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <IconChevronDown />
                    </motion.span>
                    {t("home.characters.loadMore")}
                </motion.button>
            )}
        </motion.div>
    );
}
