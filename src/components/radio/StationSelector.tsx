import clsx from "clsx";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { RadioStation } from "./types/types";

interface StationSelectorProps {
    stations: RadioStation[];
    activeStationId: string | null;
    onSelect: (stationId: string) => void;
}

export function StationSelector({
    stations,
    activeStationId,
    onSelect,
}: StationSelectorProps) {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollUp(el.scrollTop > 0);
        setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };

    const handleScroll = () => updateScrollState();

    if (stations.length === 0) {
        return (
            <div className="flex flex-col px-4 py-6 rounded-2xl bg-[#24222E] text-slate-50">
                <h3 className="mb-4 text-2xl font-medium">
                    {t("radio.stations")}
                </h3>
                <p className="text-sm text-slate-400">
                    {t("radio.emptySelector")}
                </p>
            </div>
        );
    }

    const maskParts = [
        canScrollUp ? "transparent 0%, black 10%" : "black 0%",
        canScrollDown ? "black 90%, transparent 100%" : "black 100%",
    ];
    const maskImage = `linear-gradient(to bottom, ${maskParts.join(", ")})`;

    return (
        <motion.div
            className="flex flex-col pl-4 py-6 rounded-2xl bg-linear-to-b from-[#231e3f] from-20% to-(--button-bg) shadow-2xl shadow-pink-300/5 text-slate-50 min-h-0 h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
            <h3 className="mb-2 text-2xl max-mobile:text-xl pl-4 max-mobile:pl-3 font-medium">
                {t("radio.stations")}
            </h3>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="grid justify-items-center grid-cols-4 max-mobile:grid-cols-2 gap-x-4 gap-y-8 overflow-y-auto h-full min-h-0 p-3 scroll-radio"
                style={{ maskImage, WebkitMaskImage: maskImage }}
            >
                {stations.map((station, index) => {
                    const isActive = station.id === activeStationId;
                    return (
                        <motion.div
                            key={station.id}
                            className="flex flex-col items-center gap-2 w-full"
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 24,
                                delay: index * 0.04,
                            }}
                            onAnimationComplete={updateScrollState}
                        >
                            <motion.button
                                onClick={() => onSelect(station.id)}
                                aria-pressed={isActive}
                                whileTap={{ scale: 0.95 }}
                                animate={{ scale: isActive ? 1.05 : 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={clsx(
                                    "group relative bg-linear-120 from-[#262438] to-slate-900 border border-gray-400/10 rounded-xl px-2 py-8 w-full min-h-40 flex flex-col items-center justify-center transition cursor-pointer hover:ring hover:ring-pink-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-purple-400 overflow-hidden",
                                    isActive &&
                                        "border-violet-300 bg-[#37344D] border",
                                )}
                            >
                                <motion.img
                                    src={station.image}
                                    alt={station.displayName}
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-26 w-22 object-contain"
                                />
                                <span className="absolute bottom-3 left-1/2 text-yellow-50 -translate-x-1/2 text-xs truncate max-w-[90%] text-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 max-mobile:opacity-100 max-mobile:translate-y-0 transition-all duration-200">
                                    {station.displayName}
                                </span>
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
