import useT from "@/hooks/useT";

import { motion } from "framer-motion";

import YouTubeIcon from "@/components/icons/YouTubeIcon";

import { IconArrowUpRight } from "@tabler/icons-react";

import PlatformSelector from "@/components/ui/selector/PlatformSelector";

interface Trailer {
    name: string;
    link: string;
}

interface Props {
    variantId: string;
    trailers: Trailer[];
    buttonClass: string;
}

export default function TrailerDropdown({ variantId, trailers, buttonClass }: Props) {
    const t = useT();

    return (
        <PlatformSelector
            variant="secondary"
            label={t("home.buttons.trailers")}
            buttonClass={buttonClass}
            contentClassName="max-w-120 pt-2"
        >
            <div className="flex items-center gap-3 px-6 border-b pb-2 pt-1 border-white/10 max-mobile:gap-2 max-mobile:px-4">
                <div className="w-6 max-mobile:w-5">
                    <YouTubeIcon />
                </div>
                <span className="font-black text-xl font-body-condensed max-mobile:text-sm">
                    YouTube
                </span>
            </div>
            <div
                className="flex flex-col gap-0.5 max-h-50 overflow-y-auto scroll-home-dropdown max-mobile:max-h-40"
                data-lenis-prevent
            >
                {trailers.map((trailer, index) => {
                    const isLast = index === trailers.length - 1;

                    return (
                        <motion.a
                            key={trailer.link}
                            href={trailer.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover="hover"
                            whileTap="hover"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 4,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                },
                                exit: { opacity: 0, y: -4 },
                            }}
                            transition={{ duration: 0.15 }}
                            className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-thin transition-all hover:bg-white/10 max-mobile:px-3 max-mobile:py-2.5 max-mobile:text-xs ${
                                isLast
                                    ? "pb-4 rounded-b-2xl max-mobile:pb-3"
                                    : ""
                            }`}
                        >
                            <span className="text-white/40 text-xs font-mono w-4 max-mobile:w-3.5 max-mobile:text-[11px]">
                                {index + 1}
                            </span>

                            <span
                                className="truncate"
                                title={t(
                                    `home.${variantId.toLocaleLowerCase()}.trailers.${trailer.name}`,
                                )}
                            >
                                {t(
                                    `home.${variantId.toLocaleLowerCase()}.trailers.${trailer.name}`,
                                )}
                            </span>

                            <motion.div
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        x: 8,
                                    },
                                    visible: {
                                        opacity: 0,
                                        x: 8,
                                    },
                                    exit: {
                                        opacity: 0,
                                        x: 8,
                                    },
                                    hover: {
                                        opacity: 1,
                                        x: 0,
                                    },
                                }}
                                className="ml-auto"
                            >
                                <IconArrowUpRight className="size-4 max-mobile:size-3.5" />
                            </motion.div>
                        </motion.a>
                    );
                })}
            </div>
        </PlatformSelector>
    );
}