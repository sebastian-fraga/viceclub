import type { GameId } from "@/config/games";

export function linkifyNote(gameId: GameId, modTitle: string, modId: string) {
    const href = `/${gameId}/herramientas-y-mods?mod=${encodeURIComponent(modId)}`;

    return `<a href="${href}" class="cheat-link">
                <span>${modTitle}<icon-arrow-up-right></icon-arrow-up-right></span>
            </a>`;
}
