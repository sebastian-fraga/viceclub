import parse from "html-react-parser";
import { motion } from "framer-motion";

import type { Cheat } from "@/types/cheats";
import type { GameId } from "@/config/games";
import type { Game } from "@/types/game";
import type { Platform } from "@/config/platforms";

import { GAME_MODS } from "@/data/mods";

import { getButtonIconPath, getCheatCodes } from "@/utils/cheats";
import { linkifyNote } from "./utils/linkifyNote.ts";

import { useLocalizedText } from "@/hooks/useLocalizedText";
import useT from "@/hooks/useT";

import { IconArrowUpRight } from "@tabler/icons-react";

interface Props {
    cheat: Cheat;
    selectedPlatform: Platform;
    game: GameId;
    gameData: Game;
}

export function CheatCard({ cheat, selectedPlatform, game, gameData }: Props) {
    const t = useLocalizedText();
    const i18n = useT();

    const codeButtons = getCheatCodes(cheat, selectedPlatform);

    const platformNotes = cheat.platformNotes?.filter((entry) =>
        entry.platforms.includes(selectedPlatform),
    );

    const isAvailable = codeButtons.length > 0;

    return (
        <div
            className={`rounded-3xl p-7 max-mobile:p-4 flex flex-col gap-2 transition-opacity ${
                isAvailable
                    ? "bg-(--button-bg)/70 shadow-2xl shadow-violet-400/5"
                    : "bg-(--button-bg)/20 opacity-50 cursor-not-allowed"
            }`}
        >
            <h3 className="text-xl text-violet-50 font-body-condensed">
                {t(cheat.title)}
            </h3>

            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {isAvailable ? (
                    codeButtons.map((button, index) => {
                        const isText =
                            selectedPlatform === "pc" ||
                            button.startsWith("text:");

                        const value = button.startsWith("text:")
                            ? button.slice(5)
                            : button;

                        return isText ? (
                            <kbd
                                key={`${button}-${index}`}
                                className="bg-(--button-bg) px-6 py-1.5 max-mobile:px-2.5 max-mobile:py-1 rounded-full text-sm first:font-black max-mobile:text-xs font-body text-(--title-color) shadow-2xl shadow-violet-300/15"
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
                    })
                ) : (
                    <span className="text-xs text-zinc-500">
                        {i18n("cheats.notAvailable")}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-0.5">
                {platformNotes?.map((platformNote, index) => {
                    const mod = platformNote.requiresMod
                        ? GAME_MODS[
                              game as keyof typeof GAME_MODS
                          ]?.mods.find(
                              (mod) => mod.id === platformNote.requiresMod,
                          )
                        : undefined;

                    let noteContent = platformNote.note
                        ? t(platformNote.note)
                        : "";

                    if (platformNote.requiresMod && mod) {
                        noteContent = i18n("cheats.requiresMod", {
                            mod: linkifyNote(
                                game,
                                mod.title,
                                mod.id,
                            ),
                        });
                    }

                    return (
                        <div
                            key={index}
                            className={`mt-2 rounded-2xl text-xs/5 text-pretty cheat-note-entry font-thin flex flex-wrap items-center gap-1 ${
                                platformNote.noteType === "warning"
                                    ? "text-red-100"
                                    : "text-blue-100"
                            }`}
                        >
                            {parse(noteContent, {
                                replace: (domNode) => {
                                    if (
                                        domNode.type === "tag" &&
                                        domNode.name ===
                                            "icon-arrow-up-right"
                                    ) {
                                        return (
                                            <IconArrowUpRight
                                                size={16}
                                            />
                                        );
                                    }
                                },
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}