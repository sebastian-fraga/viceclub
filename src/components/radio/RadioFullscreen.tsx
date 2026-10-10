import type { RadioSelection } from "@/components/radio/hooks/useRadioSelection";
import useT from "@/hooks/useT";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { PlayerFooter } from "./PlayerFooter";
import { SongSelector } from "./SongSelector";
import { StationCarousel } from "./StationCarousel";
import type { Song } from "./types/types";

interface RadioFullscreenProps {
    radio: RadioSelection;
    currentIndex: number;
    currentSong: Song | null;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
}

export function RadioFullscreen({
    radio,
    currentIndex,
    currentSong,
    onNext,
    onPrev,
    onClose,
}: RadioFullscreenProps) {
    const t = useT();
    const station = radio.activeStation;

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        const prevHtml = html.style.overflow;
        const prevBody = body.style.overflow;

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            html.style.overflow = prevHtml;
            body.style.overflow = prevBody;
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const handleSelectSong = (startTime: number) => {
        radio.seekTo(startTime);
        if (!radio.isPlaying) radio.play();
    };

    if (!station) return null;

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={station.displayName}
            data-lenis-prevent
            className="fixed inset-0 z-2000 flex flex-col overflow-hidden bg-[color-mix(in_oklch,var(--radio-station-accent)_25%,#0d0c14)] text-slate-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
        >
            <header className="grid shrink-0 grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t("radio.common.close", {
                        defaultValue: "Cerrar",
                    })}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-200 active:bg-white/10"
                >
                    <IconChevronDown size={28} />
                </button>

                <h2 className="truncate text-center text-lg font-medium uppercase font-body-condensed">
                    {station.displayName}
                </h2>
            </header>

            <div className="shrink-0">
                <StationCarousel
                    stations={radio.stations}
                    activeStationId={station.id}
                    onSelect={radio.selectStation}
                />
            </div>

            <div className="min-h-0 flex-1 px-3 pb-3">
                <SongSelector
                    compact
                    preventAutoScrollOnMobile={false}
                    isPlaying={radio.isPlaying}
                    station={station}
                    activePlaylist={radio.activePlaylist}
                    currentIndex={currentIndex}
                    onSelectPlaylist={radio.selectPlaylist}
                    onSelectSong={handleSelectSong}
                />
            </div>

            <PlayerFooter
                variant="controls"
                song={currentSong}
                djs={radio.activePlaylist?.djs ?? []}
                isPlaying={radio.isPlaying}
                isLoading={radio.isLoading}
                isSeeking={radio.isSeeking}
                hasStation
                station={station}
                currentTime={radio.currentTime}
                duration={radio.duration}
                volume={radio.volume}
                onPlayPause={radio.togglePlay}
                onNext={onNext}
                onPrev={onPrev}
                onSeek={radio.seekTo}
                onVolumeChange={radio.setVolume}
            />
        </motion.div>
    );
}
