import { motion } from "framer-motion";
import type { GameVariant } from "../../types/game";
import type { ChecklistTabData } from "../../types/checklist";

interface ChecklistTabsProps {
    tabs: ChecklistTabData[];
    variants: GameVariant[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

export function ChecklistTabs({
    tabs,
    variants,
    activeIndex,
    onSelect,
}: ChecklistTabsProps) {
    return (
        <div className="mb-6 flex items-center gap-3 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scrollbar-none max-mobile:mb-4 max-mobile:gap-2 max-mobile:px-6 mobile:justify-center">
            {tabs.map((tab, i) => {
                const isActive = i === activeIndex;

                const variant = variants.find(
                    (variant) => variant.id === tab.id,
                );

                return (
                    <button
                        key={tab.id}
                        onClick={() => onSelect(i)}
                        className="group relative mt-4 shrink-0 overflow-hidden rounded-2xl border-2 w-110 h-35 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl max-mobile:w-[calc(100vw-4rem)] min-w-0"
                        style={{
                            borderColor: isActive
                                ? "var(--game-accent)"
                                : "rgba(255,255,255,0.15)",
                            backgroundColor: isActive
                                ? "rgba(30, 15, 60, 0.6)"
                                : "rgba(30, 15, 60, 0.3)",
                        }}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={`/assets/images/main/cards/card_${tab.id}.webp`}
                                alt={tab.label}
                                className="h-full w-full object-cover transition-transform duration-500"
                                style={{
                                    transform: isActive
                                        ? "scale(1.05)"
                                        : "scale(1)",
                                    filter: isActive
                                        ? "brightness(1.1) contrast(1.05)"
                                        : "brightness(0.9) contrast(0.95)",
                                }}
                            />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                        <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-center">
                            <h3
                                className={`text-xl font-bold drop-shadow-[0_2px_4px_rgb(0,0,0,0.5)] transition-colors duration-300 max-mobile:text-lg ${
                                    isActive
                                        ? "text-white"
                                        : "text-white/50 group-hover:text-white/80"
                                }`}
                            >
                                {tab.label}
                            </h3>
                        </div>

                        <motion.div
                            layoutId="checklist-tab-underline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-90 from-(--game-accent) to-transparent/70"
                            style={{
                                opacity: isActive ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
