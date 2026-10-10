import PlaybackControls from "@/components/radio/PlaybackControls";
import PlaybackInfo from "@/components/radio/PlaybackInfo";
import ProgressBar from "@/components/radio/ProgressBar";
import VolumeControl from "@/components/radio/VolumeControl";
import type { RadioStation, Song } from "@/components/radio/types/types";
import { IconChevronUp } from "@tabler/icons-react";
import "./radio.css";

export type PlayerFooterVariant = "default" | "mini" | "controls";

interface PlayerBarProps {
    variant?: PlayerFooterVariant;
    onOpen?: () => void;
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
    variant = "default",
    onOpen,
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
    if (variant === "mini") {
        return (
            <button
                type="button"
                onClick={onOpen}
                className="radio-track-cycle flex w-full cursor-pointer items-center gap-3 rounded-[28px] bg-(--radio-station-accent) px-4 py-3 text-left shadow-2xl shadow-black/55"
            >
                <div className="min-w-0 flex-1">
                    <PlaybackInfo station={station} song={song} djs={djs} />
                </div>
                <IconChevronUp size={22} className="shrink-0 text-white/70" />
            </button>
        );
    }

    if (variant === "controls") {
        return (
            <div className="radio-track-cycle flex w-full flex-col items-center gap-3 rounded-t-[32px] bg-(--radio-station-accent) px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/55">
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
        );
    }

    return (
        <div className="radio-track-cycle grid w-full min-h-20 grid-cols-[minmax(0,1fr)_minmax(0,32rem)_minmax(0,1fr)] items-center gap-8 rounded-[32px] bg-(--radio-station-accent) px-4 py-3 shadow-2xl shadow-black/55 max-mobile:flex max-mobile:max-w-125 max-mobile:flex-col max-mobile:gap-5 max-mobile:px-5 max-mobile:py-5">
            <PlaybackInfo station={station} song={song} djs={djs} />

            <div className="flex w-full min-w-0 flex-col items-center gap-3">
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
