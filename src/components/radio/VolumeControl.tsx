import { IconVolume, IconVolume2, IconVolume3 } from "@tabler/icons-react";

import useT from "@/hooks/useT";

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (value: number) => void;
}

function VolumeIcon({ volume }: { volume: number }) {
    if (volume === 0) return <IconVolume3 size={16} />;
    if (volume < 0.5) return <IconVolume2 size={16} />;
    return <IconVolume size={16} />;
}

export default function VolumeControl({
    volume,
    onVolumeChange,
}: VolumeControlProps) {
    const t = useT();

    return (
        <div className="flex items-center gap-1.5 max-mobile:hidden">
            <button
                type="button"
                onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
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
                    onVolumeChange(Number.parseFloat(e.target.value))
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
    );
}
