import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
    IconVolume,
    IconVolume2,
    IconVolume3,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import useT from "@/hooks/useT";
import { formatTime } from "./lib/formatTime";

import "./radio.css";

interface PlayerBarProps {
    isPlaying: boolean;
    isLoading: boolean;
    isSeeking: boolean;
    hasStation: boolean;
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
    const t = useT()
    const hasLoadedOnceRef = useRef(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [hoverRatio, setHoverRatio] = useState<number | null>(null);
    const [dragRatio, setDragRatio] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isLoading && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            setIsInitialLoad(false);
        }
    }, [isLoading]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const hoverProgress = hoverRatio !== null ? hoverRatio * 100 : null;
    const dragProgress = dragRatio !== null ? dragRatio * 100 : null;
    const isBusy = isLoading || isSeeking;
    const controlsDisabled = !hasStation || isInitialLoad;

    const getRatioFromEvent = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        setIsDragging(true);
        const ratio = getRatioFromEvent(e);
        setDragRatio(ratio);
        setHoverRatio(null); // clear hover when dragging starts
    };

    const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        if (isDragging) {
            const ratio = getRatioFromEvent(e);
            setDragRatio(ratio);
        } else {
            setHoverRatio(getRatioFromEvent(e));
        }
    };

    const handleProgressMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragRatio !== null) {
            onSeek(dragRatio * duration);
        }
        setDragRatio(null);
    };

    const handleProgressMouseLeave = () => {
        if (isDragging) {
            // If we leave while dragging, we cancel the drag because we won't get mouse up?
            // Alternatively, we could keep dragging and rely on mouse up outside the element.
            // But for simplicity, we cancel the drag when leaving the element.
            setIsDragging(false);
            setDragRatio(null);
        } else {
            setHoverRatio(null);
        }
    };

    const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        setIsDragging(true);
        const ratio = getRatioFromEvent(e);
        setDragRatio(ratio);
        setHoverRatio(null);
    };

    const handleProgressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!hasStation) return;
        if (isDragging) {
            e.preventDefault(); // prevent scrolling
            const ratio = getRatioFromEvent(e);
            setDragRatio(ratio);
        }
    };

    const handleProgressTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragRatio !== null) {
            onSeek(dragRatio * duration);
        }
        setDragRatio(null);
    };

    const handleProgressTouchCancel = handleProgressTouchEnd;

    return (
        <div className="flex items-center gap-4 rounded-2xl bg-linear-to-t from-[#231e3f] from-20% to-(--button-bg) px-5 py-3.5 max-mobile:px-3 max-mobile:py-2 shadow-2xl shadow-pink-300/5">
            <div className="flex items-center gap-3.5">
                <button
                    onClick={onPrev}
                    disabled={controlsDisabled}
                    aria-label={t("radio.common.prevSong")}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-300"
                >
                    <IconPlayerSkipBackFilled size={18} />
                </button>

                <button
                    onClick={onPlayPause}
                    disabled={controlsDisabled}
                    aria-label={
                        isPlaying
                            ? t("radio.common.pauseSong")
                            : t("radio.common.playSong")
                    }
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
                    aria-label={t("radio.common.nextSong")}
                    className="text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-300"
                >
                    <IconPlayerSkipForwardFilled size={18} />
                </button>
            </div>

            {hasStation && (
                <span className="w-10 shrink-0 text-xs text-slate-400 tabular-nums">
                    {formatTime(currentTime)}
                </span>
            )}

            <div
                className={clsx(
                    "group relative h-1.5 flex-1 min-w-0 rounded-full bg-(--button-bg) overflow-hidden max-mobile:h-2",
                    hasStation ? "cursor-pointer" : "cursor-default opacity-40",
                )}
                // We only handle click if not dragging (to avoid seeking on drag start)
                onClick={hasStation && !isDragging ? (e: React.MouseEvent<HTMLDivElement>) => {
                    if (!hasStation) return;
                    onSeek(getRatioFromEvent(e) * duration);
                } : undefined}
                onMouseDown={handleProgressMouseDown}
                onMouseMove={handleProgressMouseMove}
                onMouseUp={handleProgressMouseUp}
                onMouseLeave={handleProgressMouseLeave}
                onTouchStart={handleProgressTouchStart}
                onTouchMove={handleProgressTouchMove}
                onTouchEnd={handleProgressTouchEnd}
                onTouchCancel={handleProgressTouchCancel}
            >
                {!isBusy && (hoverProgress !== null || dragProgress !== null) && (
                    <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                            width: `${isDragging ? dragProgress : hoverProgress}%`,
                            backgroundColor: isDragging ? "rgba(139, 92, 246, 0.8)" : "rgba(196,181,253,0.3)", // Brighter violet for drag, lighter for hover
                            backdropFilter: isDragging ? "blur(2px)" : "none",
                            borderRadius: "9999px",
                        }}
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
                        animate={{
                            backgroundPosition: ["150% 0%", "-50% 0%"],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                )}
            </div>

            {hasStation && (
                <div className="flex shrink-0 items-center gap-1.5">
                    <span className="w-10 text-xs text-slate-400 tabular-nums">
                        {formatTime(duration)}
                    </span>

                    <div className="flex items-center gap-1.5 max-mobile:hidden">
                        <button
                            type="button"
                            onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
                            className="cursor-pointer text-slate-300 hover:text-white transition-colors"
                            aria-label={
                                volume > 0
                                    ? t("radio.common.mute")
                                    : t("radio.common.unmute")
                            }
                        >
                            <VolumeIcon volume={volume} />
                        </button>

                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={(e) =>
                                onVolumeChange(parseFloat(e.target.value))
                            }
                            style={
                                {
                                    "--volume": `${volume * 100}%`,
                                } as React.CSSProperties
                            }
                            className="volume-slider"
                            aria-label={t("radio.common.volume")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}