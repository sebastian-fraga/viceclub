import type { RadioSelection } from "@/components/radio/hooks/useRadioSelection";
import Title from "@/components/ui/Title";
import { gamesList, type GameId } from "@/config/games";
import { useIsMobile } from "@/hooks/useIsMobile";
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
    const isMobile = useIsMobile();

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

            <div className="flex flex-col gap-4 max-mobile:gap-3">
                <div className="relative h-190 min-w-0 max-mobile:h-[70vh] max-mobile:min-h-105 max-mobile:max-h-190">
                    <div className="grid h-full w-full grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 max-mobile:grid-cols-1">
                        <div className="h-full min-h-0 min-w-0">
                            <StationSelector
                                stations={stations}
                                activeStationId={
                                    radio.activeStation?.id ?? null
                                }
                                onSelect={radio.selectStation}
                            />
                        </div>

                        {isMobile !== true && (
                            <div className="h-full min-h-0 min-w-0 max-mobile:hidden">
                                <SongSelector
                                    isPlaying={radio.isPlaying}
                                    station={radio.activeStation}
                                    activePlaylist={radio.activePlaylist}
                                    currentIndex={currentIndex}
                                    onSelectPlaylist={radio.selectPlaylist}
                                    onSelectSong={handleSelectSong}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RadioPlayer;
