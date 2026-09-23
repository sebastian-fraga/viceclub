import { IconCaretDownFilled, IconCaretRightFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Tooltip } from "../../ui/Tooltip";

type SidebarGameButtonProps = {
    game: {
        id: string;
        name: string;
    };
    isOpen: boolean;
    isActiveGame: boolean;
    showLabels: boolean;
    onToggle: () => void;
};

function SidebarGameButton({
    game,
    isOpen,
    isActiveGame,
    showLabels,
    onToggle,
}: SidebarGameButtonProps) {
    return (
        <Tooltip label={game.name} position="right" disabled={showLabels}>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-current={isActiveGame ? "page" : undefined}
                className={clsx(
                    "group flex items-center gap-2 rounded-2xl px-2 py-1 w-full transition cursor-pointer",
                    showLabels ? "justify-start" : "justify-center",
                    isActiveGame
                        ? "bg-(--button-bg)/70"
                        : isOpen
                          ? "bg-(--button-bg)/30"
                          : "hover:bg-(--button-bg)/40",
                )}
            >
                <img
                    src={`/assets/images/icons/games/logos/${game.id.toUpperCase()}.webp`}
                    alt={game.name}
                    className={clsx(
                        "w-12 h-12 shrink-0 object-contain transition",
                        isActiveGame
                            ? "opacity-100 drop-shadow-md drop-shadow-indigo-300/30"
                            : "opacity-80 hover:opacity-100 drop-shadow-md drop-shadow-indigo-300/15",
                    )}
                    loading="lazy"
                />

                <AnimatePresence>
                    {showLabels && (
                        <motion.span
                            initial={{
                                opacity: 0,
                                x: -4,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: -4,
                            }}
                            transition={{
                                duration: 0.15,
                                delay: 0.08,
                            }}
                            className="flex items-center flex-1 gap-2 overflow-hidden"
                        >
                            <span
                                className={clsx(
                                    "text-sm flex-1 text-left",
                                    isActiveGame
                                        ? "text-indigo-200 font-medium"
                                        : "text-slate-300",
                                )}
                            >
                                {game.name}
                            </span>

                            <span className="text-slate-500 shrink-0">
                                {isOpen ? (
                                    <IconCaretDownFilled
                                        size={12}
                                        className="group-hover:text-slate-400 transition duration-300"
                                    />
                                ) : (
                                    <IconCaretRightFilled
                                        size={12}
                                        className="opacity-10 group-hover:opacity-50 transition duration-300"
                                    />
                                )}
                            </span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </Tooltip>
    );
}

export default SidebarGameButton;
