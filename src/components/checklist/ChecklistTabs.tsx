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
        <div className="mb-5 flex gap-3 overflow-x-auto max-mobile:mb-4 max-mobile:gap-2 justify-center">
            {tabs.map((tab, i) => {
                const isActive = i === activeIndex;
                const variant = variants.find((variant) => variant.id === tab.id)
                return (
                    <button
                        key={tab.id}
                        onClick={() => onSelect(i)}
                        className="relative shrink-0 overflow-hidden rounded-lg border transition-colors max-mobile:w-28 mt-4"
                        style={{
                            borderColor: isActive
                                ? "var(--game-accent)"
                                : "rgba(255,255,255,0.1)",
                            width: 270,
                        }}
                    >
                        <img
                            src={`/assets/images/main/cards/card_${tab.id}.webp`}
                            alt={tab.label}
                            className="h-full w-full object-cover"
                        />
                        <div
                            className={`absolute inset-0 transition-colors ${
                                isActive ? "bg-black/10" : "bg-black/50"
                            }`}
                        />
                        {isActive && (
                            <motion.div
                                layoutId="checklist-tab-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5"
                                style={{
                                    backgroundColor: variant?.theme.accent,
                                }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
