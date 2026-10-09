import { IconVolume, IconVolume2, IconVolume3 } from "@tabler/icons-react";
import { useRef, useState } from "react";

import useT from "@/hooks/useT";

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (value: number) => void;
}

function VolumeIcon({ volume }: { volume: number }) {
    if (volume === 0) return <IconVolume3 size={24} />;
    if (volume < 0.5) return <IconVolume2 size={24} />;
    return <IconVolume size={24} />;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export default function VolumeControl({
    volume,
    onVolumeChange,
}: VolumeControlProps) {
    const t = useT();

    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const getRatioFromClientY = (clientY: number) => {
        const element = sliderRef.current;

        if (!element) return volume;

        const rect = element.getBoundingClientRect();

        return clamp01(1 - (clientY - rect.top) / rect.height);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();

        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}

        setIsDragging(true);
        onVolumeChange(getRatioFromClientY(e.clientY));
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        onVolumeChange(getRatioFromClientY(e.clientY));
    };

    const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
        try {
            if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
            }
        } catch {}

        setIsDragging(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const step = 0.05;

        if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            onVolumeChange(clamp01(volume + step));
        }

        if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            onVolumeChange(clamp01(volume - step));
        }
    };

    const percent = volume * 100;

    return (
        <div className="flex items-center justify-end max-mobile:hidden">
            <div className="group relative" data-dragging={isDragging}>
                <button
                    type="button"
                    onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
                    aria-label={
                        volume > 0
                            ? t("radio.common.mute")
                            : t("radio.common.unmute")
                    }
                    className="block cursor-pointer p-4 text-white rounded-2xl bg-transparent hover:bg-white/10 group-focus-within:bg-white/10 transition-colors"
                >
                    <VolumeIcon volume={volume} />
                </button>

                <div className="invisible absolute bottom-full left-1/2 z-10 -translate-x-1/2 pb-8 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 group-data-[dragging=true]:visible group-data-[dragging=true]:opacity-100">
                    <div className="flex flex-col items-center rounded-full bg-[color-mix(in_oklch,var(--radio-station-accent)_85%,black)] px-3 py-6 shadow-xl shadow-black/20">
                        <div
                            ref={sliderRef}
                            role="slider"
                            tabIndex={0}
                            aria-label={t("radio.common.volume")}
                            aria-orientation="vertical"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(percent)}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerEnd}
                            onPointerCancel={handlePointerEnd}
                            onKeyDown={handleKeyDown}
                            className={`group/slider relative flex h-36 w-7 touch-none select-none items-center justify-center outline-none ${
                                isDragging
                                    ? "cursor-grabbing"
                                    : "cursor-pointer"
                            }`}
                        >
                            <div className="relative h-full w-1.25 rounded-full bg-[oklch(from_var(--radio-station-accent)_0.75_0.11_h)]/60 transition-[width] duration-150 group-hover/slider:w-2 group-focus-visible/slider:w-2">
                                <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gray-900/15" />

                                <div
                                    className={`absolute bottom-0 left-0 w-full rounded-full ${
                                        isDragging
                                            ? "bg-(--track-color)"
                                            : "bg-white"
                                    }`}
                                    style={{ height: `${percent}%` }}
                                />

                                <div
                                    className={`pointer-events-none absolute left-1/2 z-10 h-5 w-3.5 -translate-x-1/2 rounded-full border-2 border-(--radio-station-accent) bg-white transition-[scale,opacity] duration-150 ${
                                        isDragging
                                            ? "scale-100 opacity-100"
                                            : "scale-80 opacity-0 group-hover/slider:opacity-100 group-focus-visible/slider:opacity-100"
                                    }`}
                                    style={{
                                        bottom: `calc((100% - 20px) * ${volume})`,
                                        transformOrigin: `50% ${(1 - volume) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
