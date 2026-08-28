import {
    IconCaretDownFilled,
    IconCaretRightFilled,
    IconChevronsLeft,
    IconChevronsRight,
    IconHome,
    IconHomeFilled,
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

import { useIsMobile } from "@/hooks/useIsMobile";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import SettingsModal from "../settings/SettingsModal";
import { Tooltip } from "../ui/Tooltip";
import { useSidebarSounds } from "@/hooks/useSidebarSounds";

function gameHref(gameId: GameId, sectionId: SectionId) {
    return `/${gameId.toUpperCase()}/${sectionId}`;
}

const SIDEBAR_STORAGE_KEY = "viceclub:sidebar-expanded";

type SidebarProps = {
    currentPath: string;
};

function Sidebar({ currentPath: initialPath }: SidebarProps) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const [currentPath, setCurrentPath] = useState(initialPath);
    useEffect(() => {
        function handleNavigation() {
            setCurrentPath(window.location.pathname);
            setMobileOpen(false);
        }
        document.addEventListener("astro:after-swap", handleNavigation);
        return () =>
            document.removeEventListener("astro:after-swap", handleNavigation);
    });

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

        document.documentElement.style.setProperty("--sidebar-width", width);
    }, [expanded, isMobile]);

    useEffect(() => {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(expanded));
    }, [expanded]);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        if (!isMobile) return;

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

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
        const shouldListen = isMobile ? mobileOpen : expanded;
        if (!shouldListen) return;

        function handleClickOutside(event: MouseEvent) {
            if (settingsOpen) return;

            if (
                asideRef.current &&
                !asideRef.current.contains(event.target as Node)
            ) {
                if (isMobile) {
                    setMobileOpen(false);
                } else {
                    setExpanded(false);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile, mobileOpen, expanded, settingsOpen]);

    useSidebarSounds(asideRef as React.RefObject<HTMLElement>);

    const { activeGame, activeSection } = useMemo(() => {
        const match = currentPath.match(/^\/([^/]+)\/?([^/]*)/i);
        if (!match)
            return {
                activeGame: null as GameId | null,
                activeSection: null as SectionId | null,
            };

        const gameSlug = match[1].toUpperCase();
        const sectionSlug = match[2] || "inicio";

        const foundGame = gamesList.find((g) => g.id === gameSlug)?.id ?? null;
        const foundSection = (
            Object.keys(SECTIONS_METADATA) as SectionId[]
        ).includes(sectionSlug as SectionId)
            ? (sectionSlug as SectionId)
            : null;

        return { activeGame: foundGame, activeSection: foundSection };
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
        "flex w-full items-center gap-4 rounded-lg px-2 py-2 transition",
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
                className="flex flex-col fixed left-0 top-[calc(var(--header-height)+var(--banner-height))]
    h-[calc(100vh-var(--header-height)-var(--banner-height))] max-mobile:top-0  max-mobile:h-full overflow-y-auto bg-[#15151F]/80 max-mobile:bg-[#15151F] backdrop-blur-md border-r border-slate-700/40 z-15000 max-mobile:w-full transition-[top]"
            >
                {isMobile && (
                    <button
                        type="button"
                        onClick={() => setMobileOpen(false)}
                        aria-label={t("sidebar.close")}
                        className="absolute top-3 right-3 z-10 p-2 rounded-lg text-slate-400 hover:text-white bg-white/10 transition"
                    >
                        <IconX size={22} />
                    </button>
                )}
                <nav
                    aria-label={t("sidebar.navigation")}
                    className="flex flex-col justify-between items-stretch h-full gap-1 max-mobile:pt-16 p-2 mb-8"
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
                                        "bg-pink-400/20 text-pink-200 cursor-default",
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
                                        "text-slate-200 hover:bg-white/5 cursor-pointer",
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
                                className={`${baseNavButtonStyle} text-slate-200 hover:bg-white/5 cursor-pointer`}
                            >
                                <IconSettings size={20} />

                                {showLabels && (
                                    <span>{t("sidebar.settings")}</span>
                                )}
                            </button>
                        </Tooltip>

                        <div className="h-0.5 bg-white/10 my-2 mx-1" />

                        {showLabels && (
                            <span className="text-[10px] uppercase tracking-wide text-slate-500 px-2 py-1">
                                {t("sidebar.games")}
                            </span>
                        )}

                        {gamesList.map((game) => {
                            const isOpen = openGame === game.id;
                            const isActiveGame = activeGame === game.id;
                            const sections = GAME_SECTIONS[game.id];

                            return (
                                <div
                                    key={game.id}
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <Tooltip
                                        label={game.name}
                                        position="right"
                                        disabled={showLabels}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleGame(game.id)}
                                            aria-expanded={isOpen}
                                            aria-current={
                                                isActiveGame
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={`flex items-center gap-2 rounded-lg px-2 py-1 w-full transition cursor-pointer hover:bg-white/5 ${
                                                showLabels
                                                    ? "justify-start"
                                                    : "justify-center"
                                            } ${
                                                isActiveGame
                                                    ? "bg-white/5 border-l-2 border-pink-300 rounded-l-none"
                                                    : isOpen
                                                      ? "bg-white/1 border-l-2 border-slate-600 rounded-l-none"
                                                      : ""
                                            }`}
                                        >
                                            <img
                                                src={`/assets/images/icons/games/logos/${game.id.toUpperCase()}.webp`}
                                                alt={game.name}
                                                className={`w-12 h-12 shrink-0 object-contain transition drop-shadow-md drop-shadow-black/40 ${
                                                    isActiveGame
                                                        ? "opacity-100"
                                                        : "opacity-70 hover:opacity-100"
                                                }`}
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
                                                            className={`text-sm flex-1 text-left ${
                                                                isActiveGame
                                                                    ? "text-pink-200 font-medium"
                                                                    : "text-slate-300"
                                                            }`}
                                                        >
                                                            {game.name}
                                                        </span>
                                                        <span className="text-slate-500 shrink-0">
                                                            {isOpen ? (
                                                                <IconCaretDownFilled
                                                                    size={12}
                                                                />
                                                            ) : (
                                                                <IconCaretRightFilled
                                                                    size={12}
                                                                />
                                                            )}
                                                        </span>
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </Tooltip>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="sections"
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut",
                                                }}
                                                className={`flex flex-col gap-0.5 overflow-hidden ${
                                                    showLabels
                                                        ? "ml-5 pl-3 border-l border-slate-700/60"
                                                        : "border-l-2 border-slate-700/60"
                                                }`}
                                            >
                                                {sections.map((sectionId) => {
                                                    const meta =
                                                        SECTIONS_METADATA[
                                                            sectionId
                                                        ];
                                                    const Icon = meta.icon;
                                                    const active =
                                                        isActiveGame &&
                                                        activeSection ===
                                                            sectionId;

                                                    return (
                                                        <Tooltip
                                                            key={sectionId}
                                                            label={t(
                                                                meta.label,
                                                            )}
                                                            position="right"
                                                            disabled={
                                                                showLabels
                                                            }
                                                        >
                                                            {active ? (
                                                                <span
                                                                    aria-current="page"
                                                                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 w-full ${
                                                                        showLabels
                                                                            ? "justify-start"
                                                                            : "justify-center"
                                                                    } bg-pink-500/10 text-pink-300 font-medium cursor-default`}
                                                                >
                                                                    <Icon
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="shrink-0"
                                                                    />

                                                                    {showLabels && (
                                                                        <span className="text-xs">
                                                                            {t(
                                                                                meta.label,
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                <a
                                                                    data-game-id={
                                                                        game.id
                                                                    }
                                                                    href={gameHref(
                                                                        game.id,
                                                                        sectionId,
                                                                    )}
                                                                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 w-full transition ${
                                                                        showLabels
                                                                            ? "justify-start"
                                                                            : "justify-center"
                                                                    } text-slate-500 hover:bg-white/5 hover:text-slate-300`}
                                                                >
                                                                    <Icon
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="shrink-0"
                                                                    />

                                                                    {showLabels && (
                                                                        <span className="text-xs">
                                                                            {t(
                                                                                meta.label,
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                </a>
                                                            )}
                                                        </Tooltip>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col items-stretch w-full max-mobile:hidden">
                        <div className="h-0.5 bg-white/10 my-2 mx-1" />
                        <Tooltip
                            label={t("sidebar.expand")}
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
                                className={`flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/5 cursor-pointer transition w-full ${
                                    expanded
                                        ? "justify-start"
                                        : "justify-center"
                                }`}
                            >
                                <span className="text-pink-300 shrink-0">
                                    {expanded ? (
                                        <IconChevronsLeft />
                                    ) : (
                                        <IconChevronsRight />
                                    )}
                                </span>
                                {expanded && (
                                    <span className="text-sm text-pink-300">
                                        {t("sidebar.collapse")}
                                    </span>
                                )}
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
