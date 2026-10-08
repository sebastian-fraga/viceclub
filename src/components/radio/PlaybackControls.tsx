import useT from "@/hooks/useT";
import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

interface PlaybackControlsProps {
    hasStation: boolean;
    isLoading: boolean;
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function PlaybackControls({
    onPrev,
    hasStation,
    isLoading,
    onPlayPause,
    isPlaying,
    onNext,
}: PlaybackControlsProps) {
    const t = useT();

    const hasLoadedOnceRef = useRef(false);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const controlsDisabled = !hasStation || isInitialLoad;

    useEffect(() => {
        if (!isLoading && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            setIsInitialLoad(false);
        }
    }, [isLoading]);
    return (
        <div className="flex items-center gap-3.5 max-mobile:gap-4">
            <button
                type="button"
                onClick={onPrev}
                disabled={controlsDisabled}
                aria-label={t("radio.common.prevSong")}
                className="cursor-pointer text-slate-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-300"
            >
                <IconPlayerSkipBackFilled
                    size={18}
                    className="max-mobile:size-6"
                />
            </button>

            <button
                type="button"
                onClick={onPlayPause}
                disabled={controlsDisabled}
                aria-label={
                    isPlaying
                        ? t("radio.common.pauseSong")
                        : t("radio.common.playSong")
                }
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-violet-500 text-slate-900 transition-colors hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-violet-500 max-mobile:h-10 max-mobile:w-10"
            >
                {isPlaying ? (
                    <IconPlayerPauseFilled
                        size={16}
                        className="max-mobile:size-6"
                    />
                ) : (
                    <IconPlayerPlayFilled
                        size={16}
                        className="max-mobile:size-6"
                    />
                )}
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={controlsDisabled}
                aria-label={t("radio.common.nextSong")}
                className="cursor-pointer text-slate-300 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-300"
            >
                <IconPlayerSkipForwardFilled
                    size={18}
                    className="max-mobile:size-6"
                />
            </button>
        </div>
    );
}
