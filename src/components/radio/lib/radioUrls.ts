import type { GameId } from "@/config/games";

export function getRadioJsonUrl(gameId: GameId): string {
    return `/src/data/radio/${gameId}.json`;
}
