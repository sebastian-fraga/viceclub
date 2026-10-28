import SectionContent from "@/components/maps/SectionContent";
import SectionHeader from "@/components/maps/SectionHeader";
import type { TypeMeta } from "@/components/maps/utils/sectionUtils";
import type { CollectibleData } from "@/components/maps/types";
import {
    MAP_CATEGORIES,
    type MapCategory,
} from "@/components/maps/types/categories";
import { MAP_MARKERS } from "@/data/maps/markers";
import { useScrollLock } from "@/hooks/useScrollLock";
import useT from "@/hooks/useT";
import { themeToCssVars } from "@/lib/theme";
import type { GameTheme } from "@/types/game";
import { IconFilter, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";

interface MapSidebarProps {
    gameId: string;
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    onToggleType: (type: string) => void;
    onSetTypesHidden: (types: string[], hidden: boolean) => void;
    onSetCompleted: (ids: string[], completed: boolean) => void;
    theme: GameTheme;
}

export default function MapSidebar({
    gameId,
    data,
    completedIds,
    hiddenTypes,
    onToggleType,
    onSetTypesHidden,
    onSetCompleted,
    theme,
}: MapSidebarProps) {
    const markers = MAP_MARKERS[gameId as keyof typeof MAP_MARKERS];

    const i18n = useT();
    const t = useT();

    const sections = (Object.keys(MAP_CATEGORIES) as MapCategory[])
        .map((categoryKey) => ({
            key: categoryKey,
            label: MAP_CATEGORIES[categoryKey].label,
            types: MAP_CATEGORIES[categoryKey].types as Record<
                string,
                TypeMeta
            >,
            typesData: data[categoryKey],
        }))
        .filter(
            (section) =>
                section.typesData && Object.keys(section.typesData).length > 0,
        );

    const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = (key: string) => {
        setCollapsed((prev) => {
            const next = new Set(prev);

            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }

            return next;
        });
    };

    useScrollLock(isOpen);

    if (sections.length === 0) return null;

    return (
        <>
            <aside
                className="mr-auto ml-4 h-full w-full max-w-160 min-h-0 max-h-full overflow-y-auto scroll-map rounded-4xl text-white max-mobile:hidden"
                data-lenis-prevent
            >
                {sections.map((section) => {
                    const isCollapsed = collapsed.has(section.key);

                    return (
                        <div
                            key={section.key}
                            className="mb-6 last:mb-0 overflow-hidden rounded-3xl bg-(--button-bg) shadow-2xl shadow-(color:--button-bg)/40"
                        >
                            <SectionHeader
                                section={section}
                                markers={markers}
                                completedIds={completedIds}
                                hiddenTypes={hiddenTypes}
                                isCollapsed={isCollapsed}
                                onToggleCollapse={() =>
                                    toggleSection(section.key)
                                }
                                onSetTypesHidden={onSetTypesHidden}
                                onSetCompleted={onSetCompleted}
                            />

                            <SectionContent
                                section={section}
                                isCollapsed={isCollapsed}
                                markers={markers}
                                completedIds={completedIds}
                                hiddenTypes={hiddenTypes}
                                onToggleType={onToggleType}
                                onSetCompleted={onSetCompleted}
                            />
                        </div>
                    );
                })}
            </aside>

            <div className="hidden max-mobile:block">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-(--button-bg)/95 px-5 py-3 font-body-condensed text-base text-white shadow-2xl shadow-black/40 backdrop-blur-md cursor-pointer hover:bg-(--button-bg-hover) transition duration-300"
                        >
                            <IconFilter size={18} />
                            <span className="uppercase">
                                {i18n("maps.markers.title")}
                            </span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {typeof document !== "undefined" &&
                    createPortal(
                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <motion.button
                                        type="button"
                                        aria-label={t(
                                            "common.accessibility.closeMenu",
                                        )}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-1100 cursor-default bg-black/50 backdrop-blur-[2px]"
                                    />

                                    <motion.aside
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100%" }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0.32, 0.72, 0, 1],
                                        }}
                                        className="fixed inset-x-0 bottom-0 z-1110 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-4xl bg-(--button-bg) text-white shadow-2xl shadow-black/50"
                                        style={themeToCssVars(theme)}
                                    >
                                        <div className="flex shrink-0 items-center justify-between bg-(--button-bg) px-6 pt-4 pb-3">
                                            <span className="font-body-condensed uppercase text-2xl text-white">
                                                {i18n("maps.markers.title")}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                aria-label={t(
                                                    "common.accessibility.closeMenu",
                                                )}
                                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/60 transition hover:text-white"
                                            >
                                                <IconX size={18} />
                                            </button>
                                        </div>

                                        <div
                                            className="min-h-0 flex-1 overflow-y-auto scroll-map overscroll-contain touch-pan-y px-4 pb-12"
                                            data-lenis-prevent
                                        >
                                            {sections.map((section) => {
                                                const isCollapsed =
                                                    collapsed.has(section.key);

                                                return (
                                                    <div
                                                        key={section.key}
                                                        className="mb-4 overflow-hidden rounded-3xl bg-black/10 last:mb-0"
                                                    >
                                                        <SectionHeader
                                                            compact
                                                            section={section}
                                                            markers={markers}
                                                            completedIds={
                                                                completedIds
                                                            }
                                                            hiddenTypes={
                                                                hiddenTypes
                                                            }
                                                            isCollapsed={
                                                                isCollapsed
                                                            }
                                                            onToggleCollapse={() =>
                                                                toggleSection(
                                                                    section.key,
                                                                )
                                                            }
                                                            onSetTypesHidden={
                                                                onSetTypesHidden
                                                            }
                                                            onSetCompleted={
                                                                onSetCompleted
                                                            }
                                                        />

                                                        <SectionContent
                                                            section={section}
                                                            isCollapsed={
                                                                isCollapsed
                                                            }
                                                            markers={markers}
                                                            completedIds={
                                                                completedIds
                                                            }
                                                            hiddenTypes={
                                                                hiddenTypes
                                                            }
                                                            onToggleType={
                                                                onToggleType
                                                            }
                                                            onSetCompleted={
                                                                onSetCompleted
                                                            }
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.aside>
                                </>
                            )}
                        </AnimatePresence>,
                        document.body,
                    )}
            </div>
        </>
    );
}
