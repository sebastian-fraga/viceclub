import { PlayerFooter } from "@/components/radio/PlayerFooter";
import type { GameId } from "@/config/games";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCurrentTrack } from "./hooks/useCurrentTrack";
import { useMediaSession } from "./hooks/useMediaSession";
import { useRadioSelection } from "./hooks/useRadioSelection";
import { getNextSeekTarget, getPrevSeekTarget } from "./lib/getAdjacentSong";
import { RadioFullscreen } from "./RadioFullscreen";
import RadioPlayer from "./RadioPlayer";
import type { RadioStation } from "./types/types";

interface RadioPageProps {
    stations: RadioStation[];
    station: RadioStation | null;
    game: GameId;
}

export default function RadioPage({ stations, game, station }: RadioPageProps) {
    const radio = useRadioSelection(stations);
    const isMobile = useIsMobile();
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const { currentIndex } = useCurrentTrack(
        radio.activePlaylist?.songs,
        radio.currentTime,
    );

    const currentSong = radio.activePlaylist?.songs[currentIndex] ?? null;

    const handleNext = () => {
        if (!radio.activePlaylist) return;

        const { time } = getNextSeekTarget(
            radio.activePlaylist.songs,
            radio.currentTime,
            currentIndex,
        );

        radio.seekTo(time);
    };

    const handlePrev = () => {
        if (!radio.activePlaylist) return;

        const { time } = getPrevSeekTarget(
            radio.activePlaylist.songs,
            radio.currentTime,
            currentIndex,
        );

        radio.seekTo(time);
    };

    useMediaSession(radio.activeStation, currentSong, {
        play: radio.play,
        pause: radio.pause,
        seekRelative: radio.seekRelative,
        next: handleNext,
        prev: handlePrev,
    });

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;

            const isTypingContext =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.isContentEditable;

            if (isTypingContext) return;

            if (e.code === "Space") {
                e.preventDefault();
                radio.togglePlay();
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                radio.seekRelative(5);
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                radio.seekRelative(-5);
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [radio]);

    useEffect(() => {
        if (isMobile === false) setIsFullscreenOpen(false);
    }, [isMobile]);

    const isFullscreenVisible =
        isMobile === true && isFullscreenOpen && radio.activeStation !== null;

    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 75;

            setIsAtBottom(isBottom);
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className="[transition:--radio-station-accent_600ms_ease] motion-reduce:transition-none flex flex-col gap-12 radio-track-scroll"
            style={
                {
                    "--radio-station-accent":
                        radio.activeStation?.color ??
                        station?.color ??
                        "var(--button-bg)",
                } as React.CSSProperties
            }
        >
            <RadioPlayer
                stations={stations}
                game={game}
                radio={radio}
                currentIndex={currentIndex}
            />

            <AnimatePresence>
                {radio.activeStation !== null &&
                    !isAtBottom &&
                    !isFullscreenVisible && (
                        <motion.div
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 80, opacity: 0 }}
                            className="fixed bottom-10 left-[calc(50%+var(--sidebar-width)/2)] -translate-x-1/2 w-[calc(100%-2rem)] max-w-[calc(80vw-var(--sidebar-width))] duration-300 z-1000 max-mobile:bottom-4 max-mobile:left-1/2 max-mobile:w-[calc(100%-1.5rem)] max-mobile:max-w-none max-mobile:-translate-x-1/2"
                        >
                            <PlayerFooter
                                variant={isMobile ? "mini" : "default"}
                                onOpen={() => setIsFullscreenOpen(true)}
                                song={currentSong}
                                djs={radio.activePlaylist?.djs ?? []}
                                isPlaying={radio.isPlaying}
                                isLoading={radio.isLoading}
                                isSeeking={radio.isSeeking}
                                hasStation={radio.activeStation !== null}
                                station={radio.activeStation}
                                currentTime={radio.currentTime}
                                duration={radio.duration}
                                volume={radio.volume}
                                onPlayPause={radio.togglePlay}
                                onNext={handleNext}
                                onPrev={handlePrev}
                                onSeek={radio.seekTo}
                                onVolumeChange={radio.setVolume}
                            />
                        </motion.div>
                    )}
            </AnimatePresence>

            <AnimatePresence>
                {isFullscreenVisible && (
                    <RadioFullscreen
                        key="radio-fullscreen"
                        radio={radio}
                        currentIndex={currentIndex}
                        currentSong={currentSong}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onClose={() => setIsFullscreenOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
