import PlaybackControls from "@/components/radio/PlaybackControls";
import ProgressBar from "@/components/radio/ProgressBar";
import VolumeControl from "@/components/radio/VolumeControl";

import "./radio.css";

interface PlayerBarProps {
    isSeeking: boolean;
    isPlaying: boolean;
    isLoading: boolean;
    hasStation: boolean;
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
        <div className="grid grid-cols-[1fr_minmax(0,32rem)_1fr] gap-8 max-mobile:gap-4 rounded-4xl bg-linear-to-t from-(--button-bg) from-20% to-(--button-bg-hover) p-4 shadow-2xl shadow-pink-300/5 min-h-20 max-mobile:w-full max-mobile:max-w-125 max-mobile:px-10 max-mobile:py-5 max-mobile:flex-col">
            <div>Test</div>
            <div className="flex flex-col items-center w-full gap-3">
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
