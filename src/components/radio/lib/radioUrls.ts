import type { GameId } from "@/components/layout/Sidebar"

const S3_BASE_URL = "https://viceclub.s3.us-east-1.amazonaws.com";

export function getRadioJsonUrl(gameId: GameId): string {
    return `${S3_BASE_URL}/${gameId}/radio.json`;
}