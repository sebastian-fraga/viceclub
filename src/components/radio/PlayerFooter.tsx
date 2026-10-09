import PlaybackControls from "@/components/radio/PlaybackControls";
import PlaybackInfo from "@/components/radio/PlaybackInfo";
import ProgressBar from "@/components/radio/ProgressBar";
import VolumeControl from "@/components/radio/VolumeControl";
import type { RadioStation, Song } from "@/components/radio/types/types";
import "./radio.css";

interface PlayerBarProps {
    isSeeking: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    hasStation: boolean;
    station: RadioStation | null;
    song: Song | null;
    djs: string[];
    onPlayPause: () => void;
    currentTime: number;
    duration: number;
    volume: number;
    onPrev: () => void;
    onNext: () => void;
    onSeek: (seconds: number) => void;
    onVolumeChange: (value: number) => void;
}

export function PlayerFooter({
    isSeeking,
    isPlaying,
    isLoading,
    hasStation,
    station,
    song,
    djs,
    currentTime,
    duration,
    volume,
    onPrev,
    onSeek,
    onVolumeChange,
    onPlayPause,
    onNext,
}: PlayerBarProps) {
    return (
        <div className="radio-track-cycle grid grid-cols-[1fr_minmax(0,32rem)_1fr] gap-8 max-mobile:gap-4 rounded-[32px] bg-(--radio-station-accent) px-4 py-3 shadow-2xl shadow-black/55 min-h-20 w-full max-mobile:max-w-125 max-mobile:px-10 max-mobile:py-5 max-mobile:flex-col">
            <PlaybackInfo station={station} song={song} djs={djs} />

            <div className="flex flex-col items-center w-full gap-3 min-w-0">
                <PlaybackControls
                    isPlaying={isPlaying}
                    isLoading={isLoading}
                    hasStation={hasStation}
                    onPlayPause={onPlayPause}
                    onNext={onNext}
                    onPrev={onPrev}
                />

                <ProgressBar
                    isLoading={isLoading}
                    isSeeking={isSeeking}
                    hasStation={hasStation}
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={onSeek}
                />
            </div>

            <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
        </div>
    );
}
