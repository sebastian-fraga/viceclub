import type { CollectibleData } from "@/components/maps/types";
import type { MapCategory } from "@/components/maps/types/categories";
import useT from "@/hooks/useT";
import { AnimatePresence, motion } from "framer-motion";

interface TypeMeta {
    color: string;
    label: string;
}

export interface SectionData {
    key: MapCategory;
    label: string;
    types: Record<string, TypeMeta>;
    typesData: Record<string, CollectibleData[]> | undefined;
}

interface SectionContentProps {
    section: SectionData;
    isCollapsed: boolean;
    markers: Record<string, { icon: string }> | undefined;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    onToggleType: (type: string) => void;
}

export default function SectionContent({
    section,
    isCollapsed,
    markers,
    completedIds,
    hiddenTypes,
    onToggleType,
}: SectionContentProps) {
    const i18n = useT();
    return (
        <AnimatePresence initial={false}>
            {!isCollapsed && (
                <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                >
                    <ul className="px-3 pb-3">
                        {Object.entries(section.typesData!).map(
                            ([type, items]) => {
                                const completedCount = items.filter((item) =>
                                    completedIds.has(`${type}_${item.id}`),
                                ).length;

                                const progress =
                                    items.length > 0
                                        ? (completedCount / items.length) * 100
                                        : 0;

                                const marker =
                                    markers?.[type as keyof typeof markers];

                                const meta = section.types[type];

                                const isHidden = hiddenTypes.has(type);

                                if (!marker || !meta) return null;

                                return (
                                    <li
                                        key={type}
                                        className="relative mb-2 overflow-hidden rounded-2xl"
                                    >
                                        {completedCount === items.length &&
                                            items.length > 0 && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    className="pointer-events-none absolute inset-0 z-10 bg-(--game-accent)/10"
                                                />
                                            )}

                                        <button
                                            type="button"
                                            onClick={() => onToggleType(type)}
                                            aria-pressed={!isHidden}
                                            className={`relative flex w-full cursor-pointer items-center gap-3.5 rounded-2xl px-3 pt-3 pb-4 text-left text-sm font-medium transition ${
                                                completedCount === items.length
                                                    ? "bg-(--game-accent)/10"
                                                    : "hover:bg-white/5"
                                            } ${
                                                isHidden
                                                    ? "opacity-40 grayscale-70"
                                                    : "opacity-100"
                                            }`}
                                        >
                                            <img
                                                src={marker.icon}
                                                alt=""
                                                className="h-12 w-12 shrink-0 rounded-xl object-contain p-1.5"
                                                style={{
                                                    backgroundColor: meta.color,
                                                    boxShadow: `0 0 4px ${meta.color}`,
                                                }}
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="block truncate font-bold text-base text-white/90">
                                                        {i18n(meta.label)}
                                                    </span>

                                                    <div
                                                        className={`flex shrink-0 items-center gap-1 rounded-full px-4 py-1.5 font-body-condensed text-xs ${
                                                            completedCount ===
                                                            items.length
                                                                ? "bg-(--game-accent)/20"
                                                                : "bg-white/5"
                                                        }`}
                                                    >
                                                        <span
                                                            className={
                                                                completedCount >
                                                                0
                                                                    ? "font-bold text-white"
                                                                    : "text-white/70"
                                                            }
                                                        >
                                                            {completedCount}
                                                        </span>

                                                        <span className="text-white/30">
                                                            /
                                                        </span>

                                                        <span className="text-white/60">
                                                            {items.length}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                                    <motion.div
                                                        className="h-full rounded-full bg-(--game-accent)"
                                                        inherit={false}
                                                        initial={{
                                                            width: "0%",
                                                        }}
                                                        animate={{
                                                            width: `${progress}%`,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            ease: "easeOut",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                );
                            },
                        )}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
