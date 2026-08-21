import { useCallback, useEffect, useRef, useState } from "react";

export function useProgressDrag(
    duration: number,
    onSeekEnd: (time: number) => void,
) {
    const barRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previewPct, setPreviewPct] = useState<number | null>(null);
    const [previewTime, setPreviewTime] = useState<number | null>(null);

    const getPctAndTime = useCallback(
        (clientX: number) => {
            const bar = barRef.current;
            if (!bar) return { pct: 0, time: 0 };
            const rect = bar.getBoundingClientRect();
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const pct = (x / rect.width) * 100;
            const time = (x / rect.width) * duration;
            return { pct, time };
        },
        [duration],
    );

    const startDrag = useCallback(
        (clientX: number) => {
            setIsDragging(true);
            const { pct, time } = getPctAndTime(clientX);
            setPreviewPct(pct);
            setPreviewTime(time);
        },
        [getPctAndTime],
    );

    useEffect(() => {
        if (!isDragging) return;

        const onMove = (clientX: number) => {
            const { pct, time } = getPctAndTime(clientX);
            setPreviewPct(pct);
            setPreviewTime(time);
        };

        const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
        const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

        const endDrag = (clientX: number) => {
            const { time } = getPctAndTime(clientX);
            setIsDragging(false);
            setPreviewPct(null);
            setPreviewTime(null);
            onSeekEnd(time);
        };

        const onMouseUp = (e: MouseEvent) => endDrag(e.clientX);
        const onTouchEnd = (e: TouchEvent) => endDrag(e.changedTouches[0].clientX);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchmove", onTouchMove, { passive: true });
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchend", onTouchEnd);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("touchend", onTouchEnd);
        };
    }, [isDragging, getPctAndTime, onSeekEnd]);

    return { barRef, isDragging, previewPct, previewTime, startDrag };
}