import type { CollectibleData } from "@/components/maps/types";
import {
    MAP_CATEGORIES,
    type MapCategory,
} from "@/components/maps/types/categories";
import { MAP_MARKERS } from "@/data/maps/markers";
import useT from "@/hooks/useT";
import { IconChevronDown, IconFilter, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MapSidebarProps {
    gameId: string;
    data: Partial<Record<MapCategory, Record<string, CollectibleData[]>>>;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    onToggleType: (type: string) => void;
}

interface TypeMeta {
    color: string;
    label: string;
}

export default function MapSidebar({
    gameId,
    data,
    completedIds,
    hiddenTypes,
    onToggleType,
}: MapSidebarProps) {
    const markers = MAP_MARKERS[gameId as keyof typeof MAP_MARKERS];

    const i18n = useT();

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

    if (sections.length === 0) return null;

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <aside className="mr-12 h-full w-full max-w-140 max-h-full overflow-y-auto rounded-4xl px-6 text-white max-mobile:hidden">
                {sections.map((section) => {
                    const isCollapsed = collapsed.has(section.key);

                    return (
                        <div
                            key={section.key}
                            className="group mb-6 last:mb-0 overflow-hidden rounded-3xl bg-(--button-bg) shadow-2xl shadow-(color:--button-bg)/40"
                        >
                            <button
                                type="button"
                                onClick={() => toggleSection(section.key)}
                                aria-expanded={!isCollapsed}
                                className="flex w-full cursor-pointer items-center justify-between px-6 py-4"
                            >
                                <span className="font-body-condensed text-[22px] text-white">
                                    {i18n(section.label)}
                                </span>

                                <IconChevronDown
                                    size={18}
                                    className={`text-white/50 transition duration-200 group-hover:text-white ${
                                        isCollapsed ? "-rotate-180" : "rotate-0"
                                    }`}
                                />
                            </button>

                            <SectionContent
                                section={section}
                                isCollapsed={isCollapsed}
                                markers={markers}
                                completedIds={completedIds}
                                hiddenTypes={hiddenTypes}
                                onToggleType={onToggleType}
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
                            className="fixed bottom-12 left-1/2 z-1100 flex -translate-x-1/2 items-center gap-2 rounded-full bg-(--button-bg)/95 px-5 py-3 font-body-condensed text-base text-white shadow-2xl shadow-black/40 backdrop-blur-md cursor-pointer hover:bg-(--button-bg-hover) transition duration-300"
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
                                        aria-label="Cerrar filtros"
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
                                    >
                                        <div className="flex shrink-0 items-center justify-between bg-(--button-bg) px-6 pt-3 pb-3">
                                            <span className="font-body-condensed text-xl text-white">
                                                {i18n("maps.markers.title")}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => setIsOpen(false)}
                                                aria-label="Cerrar filtros"
                                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/60 transition hover:text-white"
                                            >
                                                <IconX size={18} />
                                            </button>
                                        </div>

                                        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-4 pb-12">
                                            {sections.map((section) => {
                                                const isCollapsed =
                                                    collapsed.has(section.key);

                                                return (
                                                    <div
                                                        key={section.key}
                                                        className="group mb-4 overflow-hidden rounded-3xl bg-black/10 last:mb-0"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                toggleSection(
                                                                    section.key,
                                                                )
                                                            }
                                                            aria-expanded={
                                                                !isCollapsed
                                                            }
                                                            className="flex w-full cursor-pointer items-center justify-between px-5 py-4"
                                                        >
                                                            <span className="font-body-condensed text-xl text-white">
                                                                {i18n(
                                                                    section.label,
                                                                )}
                                                            </span>

                                                            <IconChevronDown
                                                                size={18}
                                                                className={`text-white/50 transition duration-200 group-hover:text-white ${
                                                                    isCollapsed
                                                                        ? "-rotate-180"
                                                                        : "rotate-0"
                                                                }`}
                                                            />
                                                        </button>

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

function SectionContent({
    section,
    isCollapsed,
    markers,
    completedIds,
    hiddenTypes,
    onToggleType,
}: {
    section: {
        key: MapCategory;
        label: string;
        types: Record<string, TypeMeta>;
        typesData: Record<string, CollectibleData[]> | undefined;
    };
    isCollapsed: boolean;
    markers: Record<string, { icon: string }> | undefined;
    completedIds: Set<string>;
    hiddenTypes: Set<string>;
    onToggleType: (type: string) => void;
}) {
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
                                        className="relative mb-1.5 overflow-hidden rounded-2xl"
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
                                            className={`relative flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${
                                                completedCount === items.length
                                                    ? "bg-(--game-accent)/10"
                                                    : "hover:bg-white/5"
                                            } ${
                                                isHidden
                                                    ? "opacity-40"
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
                                                        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 font-body-condensed text-xs ${
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
                                                        initial={false}
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
