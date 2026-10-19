import type { CSSProperties } from "react";
import type { GameTheme } from "@/types/game";

/**
 * Convierte un tema de juego en las variables CSS que consume el tema
 * activo. Es la unica fuente: BaseLayout, la pagina de inicio y el mapa
 * aplicaban el mismo bloque de variables por separado.
 *
 * Los valores opcionales (hovered, border) se omiten cuando no existen, de
 * forma que no se escribe "undefined" en el estilo inline.
 */
export function themeToCssVars(theme: GameTheme): CSSProperties {
    return {
        "--game-accent": theme.accent.default,
        "--game-accent-muted": theme.accent.muted,
        "--game-buttons-primary-background": theme.buttons.primary.background,
        "--game-buttons-primary-hovered": theme.buttons.primary.hovered,
        "--game-buttons-primary-border": theme.buttons.primary.border,
        "--game-buttons-primary-text": theme.buttons.primary.text,
        "--game-buttons-secondary-background":
            theme.buttons.secondary.background,
        "--game-buttons-secondary-hovered": theme.buttons.secondary.hovered,
        "--game-buttons-secondary-border": theme.buttons.secondary.border,
        "--game-buttons-secondary-text": theme.buttons.secondary.text,
    } as CSSProperties;
}
