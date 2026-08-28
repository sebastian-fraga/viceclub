import {
    IconChevronLeft,
    IconHeadphones,
    IconMusic,
    IconMusicOff,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useHorizontalScrollMask } from "./hooks/useHorizontalScrollMask";

import clsx from "clsx";
import { EqualizerBars } from "./EqualizerBars";
import { formatTime } from "./lib/formatTime";
import { translateRadioText } from "./lib/translateRadioText";
import type { Playlist, RadioStation } from "./types/types";

interface SongSelectorProps {
    isBusy: boolean;
    isPlaying: boolean;
    station: RadioStation | null;
    activePlaylist: Playlist | null;
    currentIndex: number;
    onSelectPlaylist: (playlistId: string) => void;
    onSelectSong: (startTime: number) => void;
    onBack?: () => void;
    preventAutoScrollOnMobile?: boolean;
}

export function SongSelector({
    isBusy,
    isPlaying,
    station,
    activePlaylist,
    currentIndex,
    onSelectPlaylist,
    onSelectSong,
    onBack,
    preventAutoScrollOnMobile = true,
}: SongSelectorProps) {
    const { t } = useTranslation();

    const scrollRef = useRef<HTMLUListElement>(null);
    const songRefs = useRef<Map<number, HTMLLIElement>>(new Map());
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const genresScroll = useHorizontalScrollMask<HTMLDivElement>();
    const djsScroll = useHorizontalScrollMask<HTMLDivElement>();
    const playlistsScroll = useHorizontalScrollMask<HTMLDivElement>();

    useEffect(() => {
        genresScroll.updateScrollState();
        djsScroll.updateScrollState();
        playlistsScroll.updateScrollState();
    }, [activePlaylist]);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollUp(el.scrollTop > 0);
        setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };

    const handleScroll = () => updateScrollState();

    useEffect(() => {
        if (currentIndex === -1) return;
        const el = songRefs.current.get(currentIndex);
        if (!el) return;

        const MOBILE_QUERY = "(max-width: 640px)";

        const isMobile =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia(MOBILE_QUERY).matches;

        if (isMobile && preventAutoScrollOnMobile) {
            return;
        }

        el.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, [currentIndex, preventAutoScrollOnMobile]);

    const maskParts = [
        canScrollUp ? "transparent 0%, black 10%" : "black 0%",
        canScrollDown ? "black 90%, transparent 100%" : "black 100%",
    ];
    const maskImage = `linear-gradient(to bottom, ${maskParts.join(", ")})`;

    const selectorClasses =
        "text-gray-300/80 flex flex-col rounded-2xl bg-linear-to-b from-[#231e3f] from-20% to-[var(--button-bg)] shadow-2xl shadow-pink-300/5";

    return (
        <AnimatePresence mode="wait">
            {!station || !activePlaylist ? (
                <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`${selectorClasses} h-full items-center justify-center gap-4 max-mobile:px-12 max-mobile:text-center`}
                >
                    <IconMusicOff size={42} />
                    <p>{t("radio.emptySelector")}</p>
                </motion.div>
            ) : (
                <motion.div
                    key={station.id}
                    className={`${selectorClasses} px-6 max-mobile:pl-4 max-mobile:pr-6 py-10 max-mobile:py-6 gap-8 max-mobile:gap-5 h-full min-h-0`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="hidden max-mobile:flex items-center gap-1 text-sm text-slate-300 hover:text-white -mb-2 cursor-pointer"
                        >
                            <IconChevronLeft size={18} />
                            {t("radio.stations")}
                        </button>
                    )}

                    <div className="grid grid-cols-[auto_minmax(0,1fr)] max-mobile:grid-cols-1 gap-6 max-mobile:gap-3 w-full max-w-160 max-mobile:max-w-full shrink-0 items-start">
                        <div className="rounded-2xl border border-violet-300 bg-linear-120 from-[#37344D] to-slate-900 p-2 max-mobile:mx-auto">
                            <img
                                src={station.image}
                                alt={station.displayName}
                                className="w-26 h-26 max-mobile:w-20 max-mobile:h-20 object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-2.5 min-w-0 max-mobile:items-center max-mobile:text-center">
                            <h3 className="text-3xl max-mobile:text-2xl text-white font-medium">
                                {station.displayName}
                            </h3>

                            {activePlaylist.genres.length > 0 && (
                                <div
                                    ref={genresScroll.scrollRef}
                                    onScroll={genresScroll.handleScroll}
                                    className="flex flex-wrap max-mobile:flex-nowrap max-mobile:overflow-x-auto max-mobile:scrollbar-hide max-mobile:max-w-full max-w-full gap-2"
                                    style={{
                                        maskImage: genresScroll.maskImage,
                                        WebkitMaskImage: genresScroll.maskImage,
                                    }}
                                >
                                    {activePlaylist.genres.map((genre) => (
                                        <div
                                            key={genre}
                                            className="flex items-center gap-2 bg-violet-400/20 px-6 max-mobile:px-3 py-1 rounded-lg shrink-0"
                                        >
                                            <IconMusic className="text-violet-400" />
                                            <span className="text-violet-200 text-md max-mobile:text-sm whitespace-nowrap">
                                                {t(`radio.genres.${genre}`, {
                                                    defaultValue: genre,
                                                })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activePlaylist.djs.length > 0 && (
                                <div
                                    ref={djsScroll.scrollRef}
                                    onScroll={djsScroll.handleScroll}
                                    className="flex flex-wrap max-mobile:flex-nowrap max-mobile:overflow-x-auto max-mobile:scrollbar-hide max-mobile:max-w-full max-w-full gap-2"
                                    style={{
                                        maskImage: djsScroll.maskImage,
                                        WebkitMaskImage: djsScroll.maskImage,
                                    }}
                                >
                                    {activePlaylist.djs.map((dj) => (
                                        <div
                                            key={dj}
                                            className="flex items-center gap-2 bg-yellow-200/20 px-6 max-mobile:px-3 py-1 rounded-lg shrink-0"
                                        >
                                            <IconHeadphones className="text-yellow-200" />
                                            <span className="text-yellow-100 text-md max-mobile:text-sm whitespace-nowrap">
                                                {dj}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {station.playlists.length > 1 && (
                        <div
                            ref={playlistsScroll.scrollRef}
                            onScroll={playlistsScroll.handleScroll}
                            className="flex flex-wrap gap-2 shrink-0 max-w-160 max-mobile:flex-nowrap max-mobile:overflow-x-auto max-mobile:scrollbar-hide max-mobile:max-w-full"
                            style={{
                                maskImage: playlistsScroll.maskImage,
                                WebkitMaskImage: playlistsScroll.maskImage,
                            }}
                        >
                            {station.playlists.map((playlist) => {
                                const isActive =
                                    playlist.id === activePlaylist.id;

                                return (
                                    <button
                                        key={playlist.id}
                                        onClick={() =>
                                            onSelectPlaylist(playlist.id)
                                        }
                                        aria-pressed={isActive}
                                        data-active={isActive}
                                        className={clsx(
                                            "shrink-0 px-4 max-mobile:px-3 py-1.5 rounded-full text-sm max-mobile:text-xs font-medium transition-colors cursor-pointer",
                                            "focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-400",
                                            isActive
                                                ? "bg-violet-400 text-[#2B2939]"
                                                : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white",
                                        )}
                                    >
                                        {translateRadioText(playlist.name, t)}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="border-t border-purple-400/10 pt-3 flex-1 min-h-0 flex flex-col">
                        <p className="font-bold text-xl max-mobile:text-lg text-yellow-50 shrink-0">
                            {t("radio.tracks")}
                        </p>
                        <ul
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex flex-col mt-8 max-mobile:mt-0 overflow-y-auto scroll-radio flex-1 min-h-0"
                            style={{
                                maskImage,
                                WebkitMaskImage: maskImage,
                            }}
                        >
                            {activePlaylist.songs.map((song, index) => {
                                const isActive = index === currentIndex;
                                return (
                                    <motion.li
                                        key={`${song.title}-${song.start}`}
                                        ref={(el) => {
                                            if (el)
                                                songRefs.current.set(index, el);
                                            else songRefs.current.delete(index);
                                        }}
                                        data-active={isActive}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            delay: index * 0.03,
                                        }}
                                        className="flex items-center justify-between border-b last:border-b-0 pb-4 max-mobile:pb-3 pt-2 first:pt-0 border-purple-400/5"
                                    >
                                        <button
                                            onClick={() =>
                                                onSelectSong(song.start)
                                            }
                                            className="flex items-center justify-between w-full text-left cursor-pointer transition rounded-2xl hover:bg-white/10 px-5 max-mobile:px-3 py-2 data-[active=true]:bg-violet-400/10 mr-2 max-mobile:mr-0"
                                            data-active={isActive}
                                        >
                                            <div className="flex items-center gap-3 max-mobile:gap-2 min-w-0">
                                                <AnimatePresence>
                                                    {isActive && isPlaying && (
                                                        <motion.div
                                                            key="playing-icon"
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.6,
                                                                width: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                                width: "auto",
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                scale: 0.6,
                                                                width: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                                ease: "easeOut",
                                                            }}
                                                            className="shrink-0"
                                                        >
                                                            <EqualizerBars />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <div className="flex flex-col min-w-0">
                                                    <span
                                                        className={clsx(
                                                            "font-medium max-w-100 max-mobile:max-w-60 truncate max-mobile:text-sm",
                                                            isActive
                                                                ? "text-violet-300"
                                                                : "text-white",
                                                        )}
                                                    >
                                                        {translateRadioText(
                                                            song.title,
                                                            t,
                                                        )}
                                                    </span>

                                                    <span className="text-gray-400 text-sm max-mobile:text-xs font-thin truncate max-mobile:max-w-60">
                                                        {song.artist}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className={clsx(
                                                    "shrink-0 max-mobile:text-xs",
                                                    isActive
                                                        ? "text-violet-300"
                                                        : "text-gray-200",
                                                )}
                                            >
                                                {formatTime(song.duration)}
                                            </span>
                                        </button>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
