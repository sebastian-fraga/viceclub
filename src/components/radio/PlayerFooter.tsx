import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    IconPlayerPlayFilled,
    IconPlayerPauseFilled,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
    IconVolume,
    IconVolume2,
    IconVolume3,
} from "@tabler/icons-react";

import { formatTime } from "./lib/formatTime";
import clsx from "clsx";

interface PlayerBarProps {
    isPlaying: boolean;
    isLoading: boolean;
    isSeeking: boolean;
    hasStation: boolean; // nuevo
    currentTime: number;
    duration: number;
    volume: number;
    onPlayPause: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSeek: (seconds: number) => void;
    onVolumeChange: (value: number) => void;
}

function VolumeIcon({ volume }: { volume: number }) {
    if (volume === 0) return <IconVolume3 size={16} />;
    if (volume < 0.5) return <IconVolume2 size={16} />;
    return <IconVolume size={16} />;
}

export function PlayerFooter({
    isPlaying,
    isLoading,
    isSeeking,
    hasStation,
    currentTime,
    duration,
    volume,
    onPlayPause,
    onNext,
    onPrev,
    onSeek,
    onVolumeChange,
}: PlayerBarProps) {
    const hasLoadedOnceRef = useRef(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hoverRatio, setHoverRatio] = useState<number | null>(null);

    useEffect(() => {
        if (!isLoading && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            setIsInitialLoad(false);
        }
    }, [isLoading]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const hoverProgress = hoverRatio !== null ? hoverRatio * 100 : null;
    const isBusy = isLoading || isSeeking;
    const controlsDisabled = !hasStation || isInitialLoad;

    const getRatioFromEvent = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        onSeek(getRatioFromEvent(e) * duration);
    };

    const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        setHoverRatio(getRatioFromEvent(e));
    };

    return (
        <div className="flex items-center gap-4 rounded-2xl bg-slate-800 px-5 py-3.5 max-mobile:px-3 max-mobile:py-2">
            <div className="flex items-center gap-3.5">
                <button
                    onClick={onPrev}
                    disabled={controlsDisabled}
                    aria-label="Canción anterior"
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-300"
                >
                    <IconPlayerSkipBackFilled size={18} />
                </button>

                <button
                    onClick={onPlayPause}
                    disabled={controlsDisabled}
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-slate-900 cursor-pointer hover:bg-violet-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-violet-500"
                >
                    {isPlaying ? (
                        <IconPlayerPauseFilled size={16} />
                    ) : (
                        <IconPlayerPlayFilled size={16} />
                    )}
                </button>

                <button
                    onClick={onNext}
                    disabled={controlsDisabled}
                    aria-label="Canción siguiente"
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-300"
                >
                    <IconPlayerSkipForwardFilled size={18} />
                </button>
            </div>

            {hasStation && (
                <span className="min-w-8 text-xs text-slate-400 tabular-nums">
                    {formatTime(currentTime)}
                </span>
            )}

            <div
                className={clsx(
                    "group relative h-1.5 flex-1 min-w-0 rounded-full bg-slate-600 overflow-hidden max-mobile:h-2",
                    hasStation ? "cursor-pointer" : "cursor-default opacity-40",
                )}
                onClick={handleProgressClick}
                onMouseMove={handleProgressMouseMove}
                onMouseLeave={() => setHoverRatio(null)}
            >
                {!isBusy && hoverProgress !== null && (
                    <div
                        className="absolute top-0 left-0 h-full rounded-full bg-slate-300/60"
                        style={{ width: `${hoverProgress}%` }}
                    />
                )}

                <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-violet-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {isBusy && (
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 0%, rgba(196,181,253,0.7) 50%, transparent 100%)",
                            backgroundSize: "200% 100%",
                        }}
                        animate={{ backgroundPosition: ["150% 0%", "-50% 0%"] }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                )}
            </div>

            {hasStation && (
                <div className="min-w-0 flex items-center gap-1.5 flex-none">
                    <span className="min-w-8 text-xs text-slate-400 tabular-nums">
                        {formatTime(duration)}
                    </span>
                    <div className="flex items-center gap-1.5 max-mobile:hidden">
                        <span className="text-slate-300">
                            <VolumeIcon volume={volume} />
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={(e) =>
                                onVolumeChange(parseFloat(e.target.value))
                            }
                            className="h-1 w-24 cursor-pointer accent-violet-400"
                            aria-label="Volumen"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
