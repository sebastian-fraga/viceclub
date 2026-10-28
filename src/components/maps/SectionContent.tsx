import ToggleButton from "@/components/maps/ToggleButton";
import {
    getRenderableTypes,
    getTypeIds,
    isTypeComplete,
    type MarkerMap,
    type SectionData,
} from "@/components/maps/utils/sectionUtils";
import { Tooltip } from "@/components/ui/Tooltip";
import useT from "@/hooks/useT";
import { IconCheck, IconEye, IconEyeOff } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export type { SectionData } from "@/components/maps/utils/sectionUtils";

interface SectionContentProps {
    section: SectionData;
    isCollapsed: boolean;
    markers: MarkerMap;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    onToggleType: (type: string) => void;
    onSetCompleted: (ids: string[], completed: boolean) => void;
}

export default function SectionContent({
    section,
    isCollapsed,
    markers,
    completedIds,
    hiddenTypes,
    onToggleType,
    onSetCompleted,
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
                        {getRenderableTypes(section, markers).map(
                            ([type, items]) => {
                                const marker = markers?.[type];
                                const meta = section.types[type];

                                if (!marker || !meta) return null;

                                const completedCount = items.filter((item) =>
                                    completedIds.has(`${type}_${item.id}`),
                                ).length;

                                const progress =
                                    items.length > 0
                                        ? (completedCount / items.length) * 100
                                        : 0;

                                const isComplete = isTypeComplete(
                                    type,
                                    items,
                                    completedIds,
                                );
                                const isHidden = hiddenTypes.has(type);
                                const name = i18n(meta.label);

                                return (
                                    <li
                                        key={type}
                                        className="relative mb-2 overflow-hidden rounded-2xl"
                                    >
                                        {isComplete && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.2 }}
                                                className="pointer-events-none absolute inset-0 z-10 bg-(--game-accent)/10"
                                            />
                                        )}

                                        <div
                                            className={`relative flex items-center gap-3 rounded-2xl px-3 pt-3 pb-4 text-sm font-medium transition ${
                                                isComplete
                                                    ? "bg-(--game-accent)/10"
                                                    : ""
                                            }`}
                                        >
                                            <div
                                                className={`flex min-w-0 flex-1 items-center gap-3.5 transition ${
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
                                                        backgroundColor:
                                                            meta.color,
                                                        boxShadow: `0 0 4px ${meta.color}`,
                                                    }}
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="block truncate font-bold text-base text-white/90">
                                                            {name}
                                                        </span>

                                                        <div
                                                            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 font-body-condensed text-xs ${
                                                                isComplete
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
                                            </div>

                                            <div className="relative z-20 flex shrink-0 gap-1.5">
                                                <Tooltip
                                                    label={i18n(
                                                        isHidden
                                                            ? "maps.sidebar.buttons.showOnMap"
                                                            : "maps.sidebar.buttons.hideFromMap",
                                                        { name },
                                                    )}
                                                    position="bottom"
                                                >
                                                    <ToggleButton
                                                        size="sm"
                                                        pressed={!isHidden}
                                                        label={i18n(
                                                            isHidden
                                                                ? "maps.sidebar.buttons.showOnMap"
                                                                : "maps.sidebar.buttons.hideFromMap",
                                                            { name },
                                                        )}
                                                        onClick={() =>
                                                            onToggleType(type)
                                                        }
                                                    >
                                                        {isHidden ? (
                                                            <IconEyeOff
                                                                size={14}
                                                            />
                                                        ) : (
                                                            <IconEye
                                                                size={14}
                                                            />
                                                        )}
                                                    </ToggleButton>
                                                </Tooltip>

                                                <Tooltip
                                                    label={i18n(
                                                        isComplete
                                                            ? "maps.sidebar.buttons.markAsIncomplete"
                                                            : "maps.sidebar.buttons.markAsCompleted",
                                                        { name },
                                                    )}
                                                    position="bottom"
                                                >
                                                    <ToggleButton
                                                        size="sm"
                                                        pressed={isComplete}
                                                        label={i18n(
                                                            isComplete
                                                                ? "maps.sidebar.buttons.markAsIncomplete"
                                                                : "maps.sidebar.buttons.markAsCompleted",
                                                            { name },
                                                        )}
                                                        onClick={() =>
                                                            onSetCompleted(
                                                                getTypeIds(
                                                                    type,
                                                                    items,
                                                                ),
                                                                !isComplete,
                                                            )
                                                        }
                                                    >
                                                        <IconCheck
                                                            size={14}
                                                            stroke={2.5}
                                                        />
                                                    </ToggleButton>
                                                </Tooltip>
                                            </div>
                                        </div>
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
