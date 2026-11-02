import type { RadioStation } from "@/components/radio/types/types";
import type { GameId } from "@/config/games";
import useT from "@/hooks/useT";
import { IconRadio } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface RadioImageProps {
    station: RadioStation | null;
    game: GameId;
}

export default function RadioImage({ station, game }: RadioImageProps) {
    const t = useT();
    const imageSrc = station
        ? `/assets/images/radio/${game}/${station.id}.webp`
        : null;
    const [hasImageError, setHasImageError] = useState(false);

    const stationName = station?.displayNameKey
        ? t(station.displayNameKey)
        : station?.displayName;

    useEffect(() => {
        setHasImageError(false);
    }, [imageSrc]);

    console.log({ game, station, stationId: station?.id });

    return imageSrc && !hasImageError ? (
        <img
            src={imageSrc}
            alt={stationName ?? ""}
            width={64}
            height={64}
            className="h-full w-full object-contain drop-shadow-xl drop-shadow-[color-mix(in_oklch,var(--radio-station-accent)_25%,rgb(255_255_255/5%))] rounded-xl"
            onError={() => setHasImageError(true)}
        />
    ) : (
        <div className="flex h-full w-full items-center justify-center bg-white/10">
            <IconRadio size={28} className="text-white/70 max-mobile:size-6" />
        </div>
    );
}
