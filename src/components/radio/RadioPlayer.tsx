import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import type { RadioSelection } from "@/components/radio/hooks/useRadioSelection";
import clsx from "clsx";
import { useState } from "react";
import { SongSelector } from "./SongSelector";
import { StationSelector } from "./StationSelector";
import type { RadioStation } from "./types/types";

interface RadioPlayerProps {
    stations: RadioStation[];
    game: GameId;
    radio: RadioSelection;
    currentIndex: number;
}

export function RadioPlayer({
    stations,
    game,
    radio,
    currentIndex,
}: RadioPlayerProps) {
    const gameInfo = gamesList.find((item) => item.id === game);
    const [mobilePanel, setMobilePanel] = useState<"stations" | "songs">(
        "stations",
    );

    const handleSelectStation = (stationId: string) => {
        radio.selectStation(stationId);
        setMobilePanel("songs");
    };

    const handleSelectSong = (startTime: number) => {
        radio.seekTo(startTime);

        if (!radio.isPlaying) {
            radio.play();
        }
    };

    return (
        <>
            <div className="max-w-fit">
                <Title
                    label="radio.title"
                    options={{ fullName: gameInfo?.fullName }}
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative h-190 max-mobile:h-[70vh] max-mobile:overflow-hidden">
                    <div
                        className={clsx(
                            "grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 h-full w-full transition-transform duration-300 ease-out",
                            "max-mobile:flex max-mobile:gap-0 max-mobile:h-full max-mobile:w-[200%]",
                            mobilePanel === "songs"
                                ? "max-mobile:-translate-x-1/2"
                                : "max-mobile:translate-x-0",
                        )}
                    >
                        <div className="h-full min-h-0 max-mobile:w-1/2 max-mobile:h-full max-mobile:shrink-0">
                            <StationSelector
                                stations={stations}
                                activeStationId={
                                    radio.activeStation?.id ?? null
                                }
                                onSelect={handleSelectStation}
                            />
                        </div>

                        <div className="h-full min-h-0 max-mobile:w-1/2 max-mobile:h-full max-mobile:shrink-0">
                            <SongSelector
                                isPlaying={radio.isPlaying}
                                station={radio.activeStation}
                                activePlaylist={radio.activePlaylist}
                                currentIndex={currentIndex}
                                onSelectPlaylist={radio.selectPlaylist}
                                onSelectSong={handleSelectSong}
                                onBack={() => setMobilePanel("stations")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RadioPlayer;