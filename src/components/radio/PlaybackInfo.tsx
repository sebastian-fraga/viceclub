import type { RadioStation, Song } from "@/components/radio/types/types";
import { IconRadio } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface PlaybackInfoProps {
    station: RadioStation | null;
    djs: string[];
    song: Song | null;
}

export default function PlaybackInfo({
    station,
    song,
    djs,
}: PlaybackInfoProps) {
    const [hasImageError, setHasImageError] = useState(false);

    const imageSrc = station?.image;
    const showImage = Boolean(imageSrc) && !hasImageError;

    useEffect(() => {
        setHasImageError(false);
    }, [imageSrc]);

    return (
        <div className="grid grid-cols-[72px_1fr] max-mobile:grid-cols-[56px_minmax(0,1fr)] gap-5 max-mobile:gap-3 items-center">
            <div className="h-18 w-18 max-mobile:h-14 max-mobile:w-14 shrink-0 overflow-hidden rounded-3xl bg-black p-2 max-mobile:p-1.5">
                {showImage ? (
                    <img
                        src={imageSrc}
                        alt={station?.displayName ?? ""}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain drop-shadow-xl drop-shadow-[color-mix(in_oklch,var(--radio-station-accent)_25%,rgb(255_255_255/5%))]"
                        onError={() => setHasImageError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/10">
                        <IconRadio
                            size={28}
                            className="text-white/70 max-mobile:size-6"
                        />
                    </div>
                )}
            </div>

            <div className="flex min-w-0 flex-col gap-px">
                {station?.displayName && (
                    <span className="truncate font-medium uppercase">
                        {station.displayName}
                    </span>
                )}

                {song ? (
                    <div className="flex min-w-0 gap-1.5 font-medium">
                        <span className="truncate text-[color-mix(in_oklch,var(--radio-station-accent)_10%,white)]">
                            {song.title}
                        </span>
                        <span className="select-none">•</span>
                        <span className="truncate text-[color-mix(in_oklch,var(--radio-station-accent)_30%,white)]">
                            {song.artist}
                        </span>
                    </div>
                ) : (
                    <div className="flex min-w-0 gap-1.5 font-medium">
                        <span className="shrink-0 text-[color-mix(in_oklch,var(--radio-station-accent)_10%,white)]">
                            {station?.displayName}
                        </span>
                        <span className="select-none">•</span>
                        <span className="truncate text-[color-mix(in_oklch,var(--radio-station-accent)_30%,white)]">
                            {djs.map((name, index) => (
                                <span key={`${name}-${index}`}>
                                    {index > 0 && ", "}
                                    {name}
                                </span>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
