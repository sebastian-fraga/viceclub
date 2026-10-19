import type { CSSProperties } from "react";
import type { GameTheme } from "@/types/game";

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
