import { GAME_IDS, type GameId } from "@/config/games";

export function detectGame(pathname: string): GameId | null {
    return GAME_IDS.find((game) => pathname.includes(`/${game}/`)) ?? null;
}
