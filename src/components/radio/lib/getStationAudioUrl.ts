import type { GameId } from "@/config/games";

export function getStationAudioUrl(
    gameId: GameId,
    stationId: string,
    playlistId?: number,
): string {
    const bucket = import.meta.env.PUBLIC_R2_BUCKET?.replace(/\/+$/, "");

    if (!bucket) {
        throw new Error(
            "PUBLIC_R2_BUCKET is not set. Add it to .env",
        );
    }

    const fileName =
        playlistId === undefined ? `${stationId}.ogg` : `${stationId}_${playlistId}.ogg`;

    return `${bucket}/${gameId}/${fileName}`;
}
