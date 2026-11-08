import { MOBILE_QUERY } from "@/config/breakpoints";
import useT from "@/hooks/useT";
import {
    IconChevronLeft,
    IconHeadphones,
    IconMusic,
    IconMusicOff,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import RadioImage from "@/components/radio/RadioImage";
import SongLabel from "@/components/radio/SongLabel";
import CountBadge from "@/components/ui/CountBadge";
import NotFoundContent from "@/components/ui/NotFoundContent";
import type { GameId } from "@/config/games";
import clsx from "clsx";
import { EqualizerBars } from "./EqualizerBars";
import { InfoChips } from "./InfoChips";
import { PlaylistTabs } from "./PlaylistTabs";
import { formatTime } from "./lib/formatTime";
import { translateRadioText } from "./lib/translateRadioText";
import type { Playlist, RadioStation } from "./types/types";

interface SongSelectorProps {
    game: GameId;
    isPlaying: boolean;
    station: RadioStation | null;
    activePlaylist: Playlist | null;
    currentIndex: number;
    onSelectPlaylist: (playlistId: string) => void;
    onSelectSong: (startTime: number) => void;
    onBack?: () => void;
    preventAutoScrollOnMobile?: boolean;
    compact?: boolean;
}

export function SongSelector({
    game,
    isPlaying,
    station,
    activePlaylist,
    currentIndex,
    onSelectPlaylist,
    onSelectSong,
    onBack,
    preventAutoScrollOnMobile = true,
    compact = false,
}: SongSelectorProps) {
    const t = useT();

    const stationName = station?.displayNameKey
        ? t(station.displayNameKey)
        : station?.displayName;

    const scrollRef = useRef<HTMLUListElement>(null);
    const songRefs = useRef<Map<number, HTMLLIElement>>(new Map());
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollUp(el.scrollTop > 0);
        setCanScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    };

    useEffect(() => {
        updateScrollState();
    }, [activePlaylist]);

    const handleScroll = () => updateScrollState();

    const updateScrollStateRef = useRef(updateScrollState);
    updateScrollStateRef.current = updateScrollState;

    const handleCardMount = useCallback((el: HTMLDivElement | null) => {
        if (el) updateScrollStateRef.current();
    }, []);

    useEffect(() => {
        if (currentIndex === -1) return;

        const scrollToActive = () => {
            const el = songRefs.current.get(currentIndex);
            if (!el) return;

            const isMobile = window.matchMedia(MOBILE_QUERY).matches;

            if (isMobile && preventAutoScrollOnMobile) {
                return;
            }

            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        };
        
        const frame = requestAnimationFrame(scrollToActive);
        return () => cancelAnimationFrame(frame);
    }, [currentIndex, activePlaylist, preventAutoScrollOnMobile]);

    const maskParts = [
        canScrollUp ? "transparent 0%, black 10%" : "black 0%",
        canScrollDown ? "black 90%, transparent 100%" : "black 100%",
    ];
    const maskImage = `linear-gradient(to bottom, ${maskParts.join(", ")})`;

    const cardSpacing = compact
        ? "px-4 max-mobile:pl-3 max-mobile:pr-0 py-4 gap-3"
        : "pl-6 max-mobile:pl-4 max-mobile:pr-6 py-10 max-mobile:py-6 gap-8 max-mobile:gap-5";

    const selectorClasses =
        "text-gray-300/80 flex flex-col rounded-4xl bg-[color-mix(in_oklch,var(--radio-station-accent)_45%,transparent)] shadow-2xl shadow-pink-300/5";

    const songs = activePlaylist?.songs ?? [];
    const hasSongs = songs.length > 0;

    return (
        <AnimatePresence mode="wait">
            {!station || !activePlaylist ? (
                <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`${selectorClasses} w-full min-w-0 h-full items-center justify-center gap-4 max-mobile:px-12 max-mobile:text-center`}
                >
                    <IconMusicOff size={42} />
                    <p>{t("radio.emptySelector")}</p>
                </motion.div>
            ) : (
                <motion.div
                    key={station.id}
                    ref={handleCardMount}
                    className={`${selectorClasses} ${cardSpacing} h-full min-h-0 w-full min-w-0 @container`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {onBack && !compact && (
                        <button
                            onClick={onBack}
                            className="hidden max-mobile:flex items-center gap-1 text-base text-slate-300 hover:text-white -mb-2 cursor-pointer font-body-condensed"
                        >
                            <IconChevronLeft size={18} />
                            {t("radio.stations.title")}
                        </button>
                    )}

                    {!compact && (
                        <div className="grid w-full min-w-0 grid-cols-[104px_minmax(0,1fr)] max-mobile:grid-cols-1 gap-6 max-mobile:gap-3 max-mobile:mb-4 max-mobile:mt-2 items-start pr-4">
                            <div className="flex aspect-square w-full items-center justify-center bg-[color-mix(in_oklch,var(--radio-station-accent)_40%,black)] rounded-xl p-2 max-mobile:mx-auto max-mobile:h-40 max-mobile:w-40">
                                <RadioImage station={station} game={game} />
                            </div>

                            <div className="min-w-0 w-full overflow-hidden flex flex-col gap-2.5 max-mobile:gap-4 max-mobile:items-center">
                                <h3 className="text-3xl max-mobile:text-2xl text-white font-medium truncate max-w-[30ch]">
                                    {stationName}
                                </h3>

                                <InfoChips
                                    items={activePlaylist.genres}
                                    icon={IconMusic}
                                    tooltipLabel={t("radio.common.genre")}
                                    getLabel={(genre) =>
                                        t(`radio.genres.${genre}`, {
                                            defaultValue: genre,
                                        })
                                    }
                                    chipClassName="bg-violet-400/20"
                                    iconClassName="text-violet-400"
                                    textClassName="text-violet-200"
                                />

                                <InfoChips
                                    items={activePlaylist.djs}
                                    icon={IconHeadphones}
                                    tooltipLabel={t("radio.common.dj")}
                                    chipClassName="bg-yellow-200/20"
                                    iconClassName="text-yellow-200"
                                    textClassName="text-yellow-100"
                                />
                            </div>
                        </div>
                    )}

                    <PlaylistTabs
                        playlists={station.playlists}
                        activePlaylistId={activePlaylist.id}
                        onSelect={onSelectPlaylist}
                    />

                    <div className="pt-1 flex-1 min-h-0 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 pl-4 max-mobile:pl-3">
                            <p className=" text-2xl max-mobile:text-xl font-body-condensed text-[color-mix(in_oklch,var(--radio-station-accent)_20%,white)]">
                                {t("radio.tracks")}
                            </p>
                            <CountBadge
                                count={songs.length}
                                backgroundColor="color-mix(in oklch, var(--radio-station-accent) 90%, black)"
                                color="color-mix(in oklch, var(--radio-station-accent) 15%, white)"
                            />
                        </div>
                        {hasSongs ? (
                            <ul
                                key={activePlaylist.id}
                                ref={scrollRef}
                                onScroll={handleScroll}
                                className="flex flex-col mt-2 max-mobile:mt-0 overflow-y-auto overscroll-y-contain scroll-radio flex-1 min-h-0 max-mobile:pr-3"
                                data-lenis-prevent
                                style={{
                                    maskImage,
                                    WebkitMaskImage: maskImage,
                                }}
                            >
                                {songs.map((song, index) => {
                                    const isActive = index === currentIndex;
                                    return (
                                        <motion.li
                                            key={`${song.title}-${song.start}`}
                                            ref={(el) => {
                                                if (el)
                                                    songRefs.current.set(
                                                        index,
                                                        el,
                                                    );
                                                else
                                                    songRefs.current.delete(
                                                        index,
                                                    );
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
                                            className="flex items-center justify-between pb-4 max-mobile:pb-3 pt-2 first:pt-0"
                                        >
                                            <button
                                                onClick={() =>
                                                    onSelectSong(song.start)
                                                }
                                                className="flex items-center justify-between w-full text-left cursor-pointer transition duration-400 rounded-md hover:bg-white/10 px-5 max-mobile:px-3.5 py-2.5 data-[active=true]:bg-white mr-2 max-mobile:mr-0"
                                                data-active={isActive}
                                            >
                                                <div className="flex items-center gap-4 max-mobile:gap-3 min-w-0">
                                                    <div className="relative flex h-4 w-5 items-center justify-center">
                                                        <AnimatePresence
                                                            initial={false}
                                                            mode="sync"
                                                        >
                                                            {isActive &&
                                                            isPlaying ? (
                                                                <motion.span
                                                                    key="equalizer"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        scale: 0.7,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        scale: 1,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        scale: 0.7,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.18,
                                                                        ease: "easeOut",
                                                                    }}
                                                                    className="absolute inset-0 flex items-center justify-center"
                                                                >
                                                                    <EqualizerBars />
                                                                </motion.span>
                                                            ) : (
                                                                <motion.span
                                                                    key="number"
                                                                    initial={{
                                                                        opacity: 0,
                                                                        scale: 0.7,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        scale: 1,
                                                                    }}
                                                                    exit={{
                                                                        opacity: 0,
                                                                        scale: 0.7,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.18,
                                                                        ease: "easeOut",
                                                                    }}
                                                                    className={clsx(
                                                                        "absolute inset-0 flex items-center justify-center text-[12px] font-body-condensed tabular-nums",
                                                                        isActive
                                                                            ? "text-black"
                                                                            : "text-gray-200/80",
                                                                    )}
                                                                >
                                                                    {String(
                                                                        index +
                                                                            1,
                                                                    ).padStart(
                                                                        2,
                                                                        "0",
                                                                    )}
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className="flex flex-col min-w-0 max-mobile:gap-px">
                                                        <div className="flex items-center gap-2 min-w-0 max-mobile:gap-1">
                                                            <span
                                                                className={clsx(
                                                                    "min-w-0 font-medium max-w-100 max-mobile:max-w-75 truncate max-mobile:text-sm transition",
                                                                    isActive
                                                                        ? "text-[color-mix(in_oklch,var(--radio-station-accent)_50%,black)]"
                                                                        : "text-[color-mix(in_oklch,var(--radio-station-accent)_30%,white)]",
                                                                )}
                                                            >
                                                                {translateRadioText(
                                                                    song.title,
                                                                    t,
                                                                )}
                                                            </span>
                                                            <SongLabel
                                                                song={song}
                                                                className={clsx(
                                                                    "shrink-0 text-xs ml-1 mr-4 pt-0.5 pb-0.5",
                                                                    !isActive &&
                                                                        "opacity-60",
                                                                )}
                                                                isActive={
                                                                    isActive
                                                                }
                                                            />
                                                        </div>

                                                        <span
                                                            className={clsx(
                                                                "text-sm max-mobile:text-xs font-medium truncate transition",
                                                                isActive
                                                                    ? "text-[color-mix(in_oklch,var(--radio-station-accent)_95%,white)]"
                                                                    : "text-[color-mix(in_oklch,var(--radio-station-accent)_60%,white)]",
                                                            )}
                                                        >
                                                            {song.artist}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={clsx(
                                                        "shrink-0 max-mobile:text-xs tabular-nums font-body-condensed transition",
                                                        isActive
                                                            ? "text-black"
                                                            : "text-white",
                                                    )}
                                                >
                                                    {formatTime(song.duration)}
                                                </span>
                                            </button>
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <NotFoundContent
                                variant="fill"
                                className="my-4 mx-4 bg-linear-120 from-[color-mix(in_oklch,var(--radio-station-accent)_40%,transparent)] via-[color-mix(in_oklch,var(--radio-station-accent)_25%,transparent)] to-[color-mix(in_oklch,var(--radio-station-accent)_10%,transparent)]"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
