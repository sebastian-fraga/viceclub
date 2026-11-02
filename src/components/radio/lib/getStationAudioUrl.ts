import type { GameId } from "@/config/games";

/**
 * Builds the audio URL of a radio station playlist inside the R2 bucket.
 *
 * This is the single source of truth for the R2 path pattern:
 *
 * - Station without playlists:      `{bucket}/{gameId}/{stationId}.ogg`
 * - Station with playlists:         `{bucket}/{gameId}/{stationId}_{playlistId}.ogg`
 *
 * `stationId` is the key of the station inside its JSON file (e.g. `head_radio`,
 * `public_liberty_radio`). `playlistId` is the explicit numeric `id` declared in
 * the raw JSON (`1`, `2`, `3`…), not the slug derived from the playlist name.
 *
 * @throws If `PUBLIC_R2_BUCKET` is not configured, so the build fails loudly
 * instead of emitting `undefined/...` URLs.
 */
export function getStationAudioUrl(
    gameId: GameId,
    stationId: string,
    playlistId?: number,
): string {
    const bucket = import.meta.env.PUBLIC_R2_BUCKET?.replace(/\/+$/, "");

    if (!bucket) {
        throw new Error(
            "PUBLIC_R2_BUCKET is not set. Add it to .env (see .env.example).",
        );
    }

    const fileName =
        playlistId === undefined ? `${stationId}.ogg` : `${stationId}_${playlistId}.ogg`;

    return `${bucket}/${gameId}/${fileName}`;
}
