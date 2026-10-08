import clsx from "clsx";
import { motion } from "framer-motion";
import {
    useCallback,
    useEffect,
    useEffectEvent,
    useRef,
    useState,
} from "react";
import { formatTime } from "./lib/formatTime";

interface ProgressBarProps {
    isLoading: boolean;
    isSeeking: boolean;
    hasStation: boolean;
    currentTime: number;
    duration: number;
    onSeek: (seconds: number) => void;
}

export default function ProgressBar({
    isLoading,
    isSeeking,
    hasStation,
    currentTime,
    duration,
    onSeek,
}: ProgressBarProps) {
    const isBusy = isLoading || isSeeking;
    const progress =
        duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
    const [dragRatio, setDragRatio] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragProgress = dragRatio !== null ? dragRatio * 100 : null;

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
            } catch {}
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
        } catch {}

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

    const handleProgressPointerLeave = () => {};

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

            handleSeekEffect(ratio * duration);
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
        releaseActivePointerCapture,
    ]);

    const handleSeekEffect = useEffectEvent((seconds: number) => {
        onSeek(seconds);
    });
    return (
        <div className="flex w-full items-center gap-2 max-mobile:gap-6">
            {hasStation && (
                <span className="w-10 shrink-0 text-xs font-thin tabular-nums text-slate-300 max-mobile:w-6">
                    {isDragging && dragRatio !== null
                        ? formatTime(dragRatio * duration)
                        : formatTime(currentTime)}
                </span>
            )}

            <div
                ref={progressBarRef}
                className={clsx(
                    "group relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-(--button-bg) touch-none select-none max-mobile:h-2",
                    hasStation ? "cursor-pointer" : "cursor-default opacity-40",
                    isDragging && "cursor-grabbing",
                )}
                onPointerDown={handleProgressPointerDown}
                onPointerMove={handleProgressPointerMove}
                onPointerLeave={handleProgressPointerLeave}
            >
                <div className="relative h-1.5 min-w-0 overflow-hidden rounded-full bg-(--button-bg) max-mobile:h-2">
                    <div className="absolute top-0 left-0 h-full w-full bg-gray-900/15" />

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
                    <span className="w-10 shrink-0 text-xs font-thin tabular-nums text-slate-300 max-mobile:w-6">
                        {formatTime(duration)}
                    </span>
                </div>
            )}
        </div>
    );
}
