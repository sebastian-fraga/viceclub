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

    const BUTTON_STYLES =
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-slate-300 transition-[filter,opacity] duration-400 drop-shadow-[0_0_10px] drop-shadow-transparent hover:drop-shadow-white/50";

    useEffect(() => {
        if (!isLoading && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            setIsInitialLoad(false);
        }
    }, [isLoading]);

    return (
        <div className="flex items-center gap-5 max-mobile:gap-3 text-white">
            <button
                type="button"
                onClick={onPrev}
                disabled={controlsDisabled}
                aria-label={t("radio.common.prevSong")}
                className={`${BUTTON_STYLES} p-2`}
            >
                <IconPlayerSkipBackFilled
                    size={16}
                    className="max-mobile:size-5"
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
                className={`${BUTTON_STYLES} text-(--radio-station-accent) h-12 w-12 max-mobile:h-10 max-mobile:w-10 bg-white rounded-full flex items-center justify-center`}
            >
                {isPlaying ? (
                    <IconPlayerPauseFilled
                        size={22}
                        className="max-mobile:size-5"
                    />
                ) : (
                    <IconPlayerPlayFilled
                        size={22}
                        className="max-mobile:size-5"
                    />
                )}
            </button>

            <button
                type="button"
                onClick={onNext}
                disabled={controlsDisabled}
                aria-label={t("radio.common.nextSong")}
                className={`${BUTTON_STYLES} p-2`}
            >
                <IconPlayerSkipForwardFilled
                    size={16}
                    className="max-mobile:size-5"
                />
            </button>
        </div>
    );
}
