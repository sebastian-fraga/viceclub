import {
    IconHome,
    IconHomeFilled,
    IconLayoutSidebarLeftExpand,
    IconLayoutSidebarRightExpand,
    IconSettings,
    IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import {
    GAME_SECTIONS,
    SECTIONS_METADATA,
    gamesList,
    type GameId,
    type SectionId,
} from "@/config/games";

import SidebarGame from "@/components/layout/sidebar/SidebarGame";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSidebarSounds } from "@/hooks/useSidebarSounds";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import SettingsModal from "../../settings/SettingsModal";
import { Tooltip } from "../../ui/Tooltip";

const SIDEBAR_STORAGE_KEY = "viceclub:sidebar-expanded";

type SidebarProps = {
    currentPath: string;
};

function Sidebar({ currentPath: initialPath }: SidebarProps) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const [currentPath, setCurrentPath] = useState(initialPath);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        function handleNavigation() {
            setCurrentPath(window.location.pathname);
            setMobileOpen(false);
        }

        document.addEventListener("astro:after-swap", handleNavigation);

        return () =>
            document.removeEventListener("astro:after-swap", handleNavigation);
    }, []);

    const asideRef = useRef<HTMLElement>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [expanded, setExpanded] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;

        try {
            return localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true";
        } catch {
            return false;
        }
    });

    useEffect(() => {
        if (isMobile === null) return;

        const width = isMobile ? "0px" : expanded ? "224px" : "88px";

        function applyWidth() {
            document.documentElement.style.setProperty(
                "--sidebar-width",
                width,
            );
        }

        applyWidth();
        document.addEventListener("astro:after-swap", applyWidth);

        return () =>
            document.removeEventListener("astro:after-swap", applyWidth);
    }, [expanded, isMobile]);

    useEffect(() => {
        try {
            localStorage.setItem(SIDEBAR_STORAGE_KEY, String(expanded));
        } catch {}
    }, [expanded]);

    useEffect(() => {
        if (!isMobile) return;

        document.body.style.overflow = mobileOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobile, mobileOpen]);

    useEffect(() => {
        function handleToggle() {
            setMobileOpen((prev) => !prev);
        }

        document.addEventListener("vc:toggle-sidebar", handleToggle);

        return () =>
            document.removeEventListener("vc:toggle-sidebar", handleToggle);
    }, []);

    useEffect(() => {
        document.dispatchEvent(
            new CustomEvent("vc:sidebar-state", {
                detail: { open: isMobile && mobileOpen },
            }),
        );
    }, [isMobile, mobileOpen]);

    useEffect(() => {
        if (!isMobile || !mobileOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (settingsOpen) return;

            if (
                asideRef.current &&
                !asideRef.current.contains(event.target as Node)
            ) {
                setMobileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, mobileOpen, settingsOpen]);

    useSidebarSounds(asideRef as React.RefObject<HTMLElement>);

    const { activeGame, activeSection } = useMemo(() => {
        const match = currentPath.match(/^\/([^/]+)\/?([^/]*)/i);

        if (!match) {
            return {
                activeGame: null as GameId | null,
                activeSection: null as SectionId | null,
            };
        }

        const gameSlug = match[1].toUpperCase();
        const sectionSlug = match[2] || "inicio";

        const foundGame =
            gamesList.find((game) => game.id === gameSlug)?.id ?? null;

        const foundSection = (
            Object.keys(SECTIONS_METADATA) as SectionId[]
        ).includes(sectionSlug as SectionId)
            ? (sectionSlug as SectionId)
            : null;

        return {
            activeGame: foundGame,
            activeSection: foundSection,
        };
    }, [currentPath]);

    const isHomeActive = currentPath === "/" || currentPath === "";

    const [openGame, setOpenGame] = useState<GameId | null>(activeGame);

    function toggleGame(id: GameId) {
        setOpenGame((prev) => (prev === id ? null : id));
    }

    const showLabels = isMobile ? true : expanded;

    if (!mounted || isMobile === null) {
        return null;
    }

    const baseNavButtonStyle = clsx(
        "flex w-full items-center gap-4 rounded-full px-2 py-1.5 transition max-mobile:p-3",
        showLabels ? "justify-start" : "justify-center",
    );

    return (
        <>
            <AnimatePresence>
                {isMobile && mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setMobileOpen(false)}
                        className="hidden max-mobile:block fixed inset-0 bg-black/60 z-15000"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                ref={asideRef}
                initial={false}
                animate={
                    isMobile
                        ? { x: mobileOpen ? 0 : "-100%", width: "100%" }
                        : { width: expanded ? 224 : 88, x: 0 }
                }
                transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                }}
                style={{
                    paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
                }}
                className="flex flex-col fixed left-0 top-[calc(var(--header-height)+var(--banner-height))] h-[calc(100vh-var(--header-height)-var(--banner-height))] max-mobile:top-0 max-mobile:h-dvh overflow-y-auto bg-[#15151F]/80 max-mobile:bg-[#15151F] backdrop-blur-md border-r border-white/10 z-15000 max-mobile:w-full transition-[top] scroll-sidebar"
                data-lenis-prevent
            >
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label={t("sidebar.close")}
                        className="absolute top-3 right-3 z-10 mt-1 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                        <IconX size={22} />
                    </button>
                )}

                <nav
                    aria-label={t("sidebar.navigation")}
                    className="flex flex-col justify-between items-stretch h-full min-h-0 gap-1 max-mobile:pt-16 p-2"
                >
                    <div className="flex flex-col items-stretch w-full gap-1">
                        <Tooltip
                            label={t("sidebar.home")}
                            position="right"
                            disabled={showLabels}
                        >
                            {isHomeActive ? (
                                <span
                                    aria-current="page"
                                    className={clsx(
                                        baseNavButtonStyle,
                                        "bg-(--button-bg-hover)/60 text-indigo-300 cursor-default",
                                    )}
                                >
                                    <IconHomeFilled size={20} />

                                    {showLabels && (
                                        <span>{t("sidebar.home")}</span>
                                    )}
                                </span>
                            ) : (
                                <a
                                    href="/"
                                    className={clsx(
                                        baseNavButtonStyle,
                                        "text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer",
                                    )}
                                >
                                    <IconHome size={20} />

                                    {showLabels && (
                                        <span>{t("sidebar.home")}</span>
                                    )}
                                </a>
                            )}
                        </Tooltip>

                        <Tooltip
                            label={t("sidebar.settings")}
                            position="right"
                            disabled={showLabels}
                        >
                            <button
                                type="button"
                                onClick={() => setSettingsOpen(true)}
                                className={clsx(
                                    baseNavButtonStyle,
                                    "text-slate-300 hover:bg-white/5 hover:text-white cursor-pointer",
                                )}
                            >
                                <IconSettings size={20} />

                                {showLabels && (
                                    <span>{t("sidebar.settings")}</span>
                                )}
                            </button>
                        </Tooltip>

                        <div className="h-px bg-white/10 my-2 mx-1" />

                        {showLabels && (
                            <span className="px-2 py-1.5 text-[14px] font-body-condensed uppercase text-indigo-200/50">
                                {t("sidebar.games")}
                            </span>
                        )}

                        {gamesList.map((game) => (
                            <SidebarGame
                                key={game.id}
                                game={game}
                                sections={GAME_SECTIONS[game.id]}
                                isOpen={openGame === game.id}
                                isActiveGame={activeGame === game.id}
                                activeSection={activeSection}
                                showLabels={showLabels}
                                onToggle={() => toggleGame(game.id)}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-stretch w-full max-mobile:hidden">
                        <div className="h-px bg-white/10 my-3 mx-1" />

                        <Tooltip
                            label={
                                expanded
                                    ? t("sidebar.collapse")
                                    : t("sidebar.expand")
                            }
                            position="right"
                            disabled={expanded}
                        >
                            <button
                                type="button"
                                onClick={() => setExpanded((prev) => !prev)}
                                aria-label={
                                    expanded
                                        ? t("sidebar.collapse")
                                        : t("sidebar.expand")
                                }
                                className={clsx(
                                    baseNavButtonStyle,
                                    "text-slate-400 hover:bg-white/5 hover:text-slate-200 cursor-pointer",
                                )}
                            >
                                <span className="shrink-0">
                                    {expanded ? (
                                        <div className="flex items-center gap-2">
                                            <IconLayoutSidebarRightExpand
                                                size={20}
                                            />
                                            <span className="text-sm">
                                                {t("sidebar.collapse")}
                                            </span>
                                        </div>
                                    ) : (
                                        <IconLayoutSidebarLeftExpand
                                            size={20}
                                        />
                                    )}
                                </span>
                            </button>
                        </Tooltip>
                    </div>
                </nav>

                <SettingsModal
                    open={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                />
            </motion.aside>
        </>
    );
}

export default Sidebar;
