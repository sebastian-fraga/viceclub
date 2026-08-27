import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentTrack } from "./hooks/useCurrentTrack";
import { useMediaSession } from "./hooks/useMediaSession";
import { useRadioSelection } from "./hooks/useRadioSelection";
import { getNextSeekTarget, getPrevSeekTarget } from "./lib/getAdjacentSong";
import { PlayerFooter } from "./PlayerFooter";
import { SongSelector } from "./SongSelector";
import { StationSelector } from "./StationSelector";
import type { RadioStation } from "./types/types";

interface RadioPlayerProps {
    stations: RadioStation[];
    game: GameId;
}

export function RadioPlayer({ stations, game }: RadioPlayerProps) {
    const { t } = useTranslation();
    const gameInfo = gamesList.find((item) => item.id === game);
    const radio = useRadioSelection(stations);
    const [mobilePanel, setMobilePanel] = useState<"stations" | "songs">(
        "stations",
    );

    const handleSelectStation = (stationId: string) => {
        radio.selectStation(stationId);
        setMobilePanel("songs");
    };

    const { currentIndex } = useCurrentTrack(
        radio.activePlaylist?.songs,
        radio.currentTime,
    );
    const currentSong = radio.activePlaylist?.songs[currentIndex] ?? null;
    const isBusy = radio.isLoading || radio.isSeeking;
    const handleSelectSong = (startTime: number) => {
        radio.seekTo(startTime);
        if (!radio.isPlaying) {
            radio.play();
        }
    };

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
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [radio]);

    return (
        <>
            <div className="max-w-fit">
                <Title
                    label="radio.title"
                    options={{ fullName: gameInfo?.fullName }}
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="relative max-mobile:h-[70vh] h-160">
                    <div
                        className={clsx(
                            "grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4 h-full w-full transition-transform duration-300 ease-out",
                            "max-mobile:flex max-mobile:gap-0 max-mobile:h-full max-mobile:w-[200%]",
                            mobilePanel === "songs"
                                ? "max-mobile:-translate-x-1/2"
                                : "max-mobile:translate-x-0",
                        )}
                    >
                        <div className="h-full min-h-0 max-mobile:w-1/2 max-mobile:h-full max-mobile:shrink-0">
                            <StationSelector
                                stations={stations}
                                activeStationId={
                                    radio.activeStation?.id ?? null
                                }
                                onSelect={handleSelectStation}
                            />
                        </div>
                        <div className="h-full min-h-0 max-mobile:w-1/2 max-mobile:h-full max-mobile:shrink-0">
                            <SongSelector
                                isBusy={isBusy}
                                isPlaying={radio.isPlaying}
                                station={radio.activeStation}
                                activePlaylist={radio.activePlaylist}
                                currentIndex={currentIndex}
                                onSelectPlaylist={radio.selectPlaylist}
                                onSelectSong={handleSelectSong}
                                onBack={() => setMobilePanel("stations")}
                            />
                        </div>
                    </div>
                </div>

                <PlayerFooter
                    isPlaying={radio.isPlaying}
                    isLoading={radio.isLoading}
                    isSeeking={radio.isSeeking}
                    hasStation={radio.activeStation !== null}
                    currentTime={radio.currentTime}
                    duration={radio.duration}
                    volume={radio.volume}
                    onPlayPause={radio.togglePlay}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onSeek={radio.seekTo}
                    onVolumeChange={radio.setVolume}
                />
            </div>
        </>
    );
}

export default RadioPlayer;
