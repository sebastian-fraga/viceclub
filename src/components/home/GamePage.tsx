import type { Character } from "@/components/home/CharacterCard";
import CharacterGrid from "@/components/home/CharacterGrid";
import ExploreSections from "@/components/home/ExploreSections";
import FichaTecnica from "@/components/home/FichaTecnica";
import GameHero from "@/components/home/GameHero";
import HomeParagraphs from "@/components/home/HomeParagraphs";
import type { Game } from "@/types/game";
import { useState } from "react";

interface Props {
    game: Game;
    charactersData: Record<string, Character[]>;
}

function GamePage({ game, charactersData }: Props) {
    const [variantId, setVariantId] = useState<string>(game.id);

    const selectedVariant = game.variants?.find(
        (variant) => variant.id === variantId,
    );

    const activeTheme = selectedVariant?.theme ?? game.theme;

    const activeDescription = selectedVariant?.description ?? game.description;

    const characters = charactersData[variantId] ?? [];
    return (
        <div
            style={
                {
                    "--game-accent": activeTheme.accent.default,
                    "--game-accent-muted": activeTheme.accent.muted,
                    "--game-buttons-primary-background":
                        activeTheme.buttons.primary.background,
                    "--game-buttons-primary-hovered":
                        activeTheme.buttons.primary.hovered,
                    "--game-buttons-primary-border":
                        activeTheme.buttons.primary.border,
                    "--game-buttons-primary-text":
                        activeTheme.buttons.primary.text,
                    "--game-buttons-secondary-background":
                        activeTheme.buttons.secondary.background,
                    "--game-buttons-secondary-hovered":
                        activeTheme.buttons.secondary.hovered,
                    "--game-buttons-secondary-border":
                        activeTheme.buttons.secondary.border,
                    "--game-buttons-secondary-text":
                        activeTheme.buttons.secondary.text,
                } as React.CSSProperties
            }
        >
            <GameHero
                game={game}
                variantId={variantId}
                onVariantChange={setVariantId}
            />

            <HomeParagraphs paragraphs={activeDescription.paragraphs} />

            <div className="grid grid-cols-2 max-mobile:grid-cols-1 w-full gap-0 max-mobile:gap-8">
                <div className="flex justify-start">
                    <FichaTecnica
                        game={game.id}
                        title={game.technicalSheet.title}
                        developers={game.technicalSheet.developers}
                        publisher={game.technicalSheet.publisher}
                        producer={game.technicalSheet.producer}
                        writers={game.technicalSheet.writers}
                        platforms={game.technicalSheet.platforms}
                        dates={game.technicalSheet.dates}
                        engines={game.technicalSheet.engines}
                        sales={game.technicalSheet.sales}
                    />
                </div>

                <CharacterGrid characters={characters} gameId={game.id} />
            </div>

            <div>
                <ExploreSections game={game} />
            </div>
        </div>
    );
}

export default GamePage;
