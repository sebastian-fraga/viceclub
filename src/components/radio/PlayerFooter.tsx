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
import { useCallback, useEffect, useRef, useState } from "react";

import useT from "@/hooks/useT";
import clsx from "clsx";
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
    const t = useT();

    const hasLoadedOnceRef = useRef(false);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [dragRatio, setDragRatio] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isLoading && !hasLoadedOnceRef.current) {
            hasLoadedOnceRef.current = true;
            setIsInitialLoad(false);
        }
    }, [isLoading]);

    const progress =
        duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

    const dragProgress = dragRatio !== null ? dragRatio * 100 : null;

    const isBusy = isLoading || isSeeking;
    const controlsDisabled = !hasStation || isInitialLoad;

    const progressBarRef = useRef<HTMLDivElement>(null);

    const activePointerIdRef = useRef<number | null>(null);

    const getRatioFromClientX = useCallback((clientX: number) => {
        const element = progressBarRef.current;

        if (!element) return 0;

        const rect = element.getBoundingClientRect();

        return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    }, []);
    const releaseActivePointerCapture = useCallback(() => {
        const element = progressBarRef.current;
        const pointerId = activePointerIdRef.current;

        if (element && pointerId !== null) {
            try {
                if (element.hasPointerCapture(pointerId)) {
                    element.releasePointerCapture(pointerId);
                }
            } catch {
            }
        }

        activePointerIdRef.current = null;
    }, []);

    const handleProgressPointerDown = (
        e: React.PointerEvent<HTMLDivElement>,
    ) => {
        if (!hasStation || duration <= 0 || isDragging) return;

        e.preventDefault();

        activePointerIdRef.current = e.pointerId;

        try {
            progressBarRef.current?.setPointerCapture(e.pointerId);
        } catch {
        }

        const ratio = getRatioFromClientX(e.clientX);

        setIsDragging(true);
        setDragRatio(ratio);
    };

    const handleProgressPointerMove = (
        e: React.PointerEvent<HTMLDivElement>,
    ) => {
        if (!hasStation || duration <= 0) return;

        if (isDragging) {
            if (e.pointerId !== activePointerIdRef.current) {
                return;
            }

            e.preventDefault();

            const ratio = getRatioFromClientX(e.clientX);
            setDragRatio(ratio);

            return;
        }

        if (isBusy) return;
    };

    const handleProgressPointerLeave = () => {
    };

    useEffect(() => {
        if (!isDragging) return;

        const handlePointerMove = (e: PointerEvent) => {
            if (!hasStation || duration <= 0) return;

            const ratio = getRatioFromClientX(e.clientX);

            setDragRatio(ratio);
        };

        const handlePointerUp = (e: PointerEvent) => {
            if (!hasStation || duration <= 0) return;

            const ratio = getRatioFromClientX(e.clientX);

            releaseActivePointerCapture();

            setIsDragging(false);
            setDragRatio(null);

            onSeek(ratio * duration);
        };

        const handlePointerCancel = () => {
            releaseActivePointerCapture();

            setIsDragging(false);
            setDragRatio(null);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerCancel);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointercancel", handlePointerCancel);
        };
    }, [
        isDragging,
        hasStation,
        duration,
        getRatioFromClientX,
        onSeek,
        releaseActivePointerCapture,
    ]);

    return (
        <div className="flex items-center gap-4 rounded-2xl bg-linear-to-t from-[#231e3f] from-20% to-(--button-bg) px-5 py-3.5 shadow-2xl shadow-pink-300/5 max-mobile:w-full max-mobile:max-w-125 max-mobile:px-12 max-mobile:py-5 max-mobile:flex-col max-mobile:gap-4">
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

            <div className="flex w-full items-center gap-2 max-mobile:gap-6">
                {hasStation && (
                    <span className="w-10 shrink-0 max-mobile:text-sm text-xs max-mobile:w-8 max-mobile:text-slate-300 max-mobile:font-bold tabular-nums text-slate-400">
                        {isDragging && dragRatio !== null ? formatTime(dragRatio * duration) : formatTime(currentTime)}
                    </span>
                )}

                <div
                    ref={progressBarRef}
                    className={clsx(
                        "group relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-(--button-bg) touch-none select-none max-mobile:h-2",
                        hasStation
                            ? "cursor-pointer"
                            : "cursor-default opacity-40",
                        isDragging && "cursor-grabbing",
                    )}
                    onPointerDown={handleProgressPointerDown}
                    onPointerMove={handleProgressPointerMove}
                    onPointerLeave={handleProgressPointerLeave}
                >
                    <div className="relative h-1.5 min-w-0 overflow-hidden rounded-full bg-(--button-bg) max-mobile:h-2">
                        <div className="absolute top-0 left-0 h-full w-full bg-(--button-bg)" />

                        {isDragging && dragProgress !== null ? (
                            <>
                                <div
                                    className="absolute top-0 left-0 h-full rounded-full bg-violet-500"
                                    style={{
                                        width: `${dragProgress}%`,
                                    }}
                                />

                                {dragProgress < progress && (
                                    <div
                                        className="absolute top-0 h-full rounded-full"
                                        style={{
                                            left: `${dragProgress}%`,
                                            width: `${progress - dragProgress}%`,
                                            backgroundColor:
                                                "rgba(196, 181, 253, 0.3)",
                                        }}
                                    />
                                )}
                            </>
                        ) : (
                            <motion.div
                                className="absolute top-0 left-0 h-full rounded-full bg-violet-500"
                                animate={{ width: `${progress}%` }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                            />
                        )}

                        {isDragging && dragRatio !== null && (
                            <>
                                <div
                                    className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-violet-500 shadow-lg"
                                    style={{
                                        left: `calc(${dragProgress}% - 6px)`,
                                    }}
                                />

                                <div
                                    className="absolute bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-violet-800 px-2 py-1 text-xs text-white"
                                    style={{
                                        left: `${dragProgress}%`,
                                    }}
                                >
                                    {formatTime(dragRatio * duration)} /{" "}
                                    {formatTime(duration)}
                                </div>
                            </>
                        )}

                        {isBusy && (
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent 0%, rgba(196,181,253,0.7) 50%, transparent 100%)",
                                    backgroundSize: "200% 100%",
                                    pointerEvents: "none",
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
                </div>

                {hasStation && (
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="w-10 shrink-0 max-mobile:text-sm text-xs max-mobile:w-8 max-mobile:text-slate-300 max-mobile:font-bold  tabular-nums text-slate-400">
                            {formatTime(duration)}
                        </span>

                        <div className="flex items-center gap-1.5 max-mobile:hidden">
                            <button
                                type="button"
                                onClick={() =>
                                    onVolumeChange(volume > 0 ? 0 : 1)
                                }
                                className="cursor-pointer text-slate-300 transition-colors hover:text-white"
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
                                    onVolumeChange(
                                        Number.parseFloat(e.target.value),
                                    )
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
        </div>
    );
}
