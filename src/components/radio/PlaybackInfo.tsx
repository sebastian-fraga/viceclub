import { translateRadioText } from "@/components/radio/lib/translateRadioText";
import MarqueeText from "@/components/radio/MarqueeText";
import RadioImage from "@/components/radio/RadioImage";
import SongLabel from "@/components/radio/SongLabel";
import type { RadioStation, Song } from "@/components/radio/types/types";
import type { GameId } from "@/config/games";
import useT from "@/hooks/useT";
import { IconRadio } from "@tabler/icons-react";
import { AnimatePresence, motion, type MotionProps } from "framer-motion";

interface PlaybackInfoProps {
    station: RadioStation | null;
    stationId: string | null;
    djs: string[];
    song: Song | null;
    game: GameId;
}

const rowMotion: MotionProps = {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
    transition: { duration: 0.18, ease: "easeOut" },
};

export default function PlaybackInfo({
    station,
    stationId,
    song,
    djs,
    game,
}: PlaybackInfoProps) {
    const t = useT();

    const stationName = station?.displayNameKey
        ? t(station.displayNameKey)
        : station?.displayName;

    return (
        <div className="grid grid-cols-[72px_1fr] max-mobile:grid-cols-[56px_minmax(0,1fr)] gap-5 max-mobile:gap-3 items-center">
            <div className="h-18 w-18 max-mobile:h-14 max-mobile:w-14 shrink-0 overflow-hidden rounded-xl p-2 bg-[color-mix(in_oklch,var(--radio-station-accent)_40%,black)] max-mobile:p-1.5">
                <RadioImage station={station} game={game} />
            </div>

            <div className="flex min-w-0 flex-col gap-px">
                {stationName && (
                    <div className="truncate font-medium text-[17px] uppercase">
                        {stationName}
                    </div>
                )}

                <MarqueeText>
                    <AnimatePresence mode="wait" initial={false}>
                        {song ? (
                            <motion.div
                                key="song"
                                {...rowMotion}
                                className="flex items-center gap-2 font-medium"
                            >
                                <SongLabel song={song} isActive={false} />

                                <span className="text-[color-mix(in_oklch,var(--radio-station-accent)_10%,white)]">
                                    {translateRadioText(song.title, t)}
                                </span>

                                <span className="select-none">•</span>

                                <span className="text-[color-mix(in_oklch,var(--radio-station-accent)_30%,white)]">
                                    {song.artist}
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                {...rowMotion}
                                className="flex items-center gap-1.5 font-medium"
                            >
                                <span className="shrink-0 text-[color-mix(in_oklch,var(--radio-station-accent)_10%,white)]">
                                    {stationName}
                                </span>

                                <span className="select-none">•</span>

                                <span className="text-[color-mix(in_oklch,var(--radio-station-accent)_30%,white)]">
                                    {djs.map((name, index) => (
                                        <span key={`${name}-${index}`}>
                                            {index > 0 && ", "}
                                            {name}
                                        </span>
                                    ))}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </MarqueeText>
            </div>
        </div>
    );
}
