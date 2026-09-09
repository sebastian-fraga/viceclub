import GameMapCanvas from "@/components/maps/GameMapCanvas";
import { getGameMapData } from "@/components/maps/types";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

interface GameMapProps {
    gameId: string;
}

export default function GameMap({ gameId }: GameMapProps) {
    const mapData = useMemo(() => getGameMapData(gameId), [gameId]);

    if (!mapData?.mapMeta) {
        return null;
    }

    return (
        <GameMapCanvas
            gameId={gameId}
            minZoom={0}
            data={{
                collectibles: mapData?.collectibles ?? {},
                challenges: mapData?.challenges ?? {},
                locations: mapData?.locations ?? {},
            }}
            {...mapData.mapMeta}
        />
    );
}
