import ModCategory from "@/components/mods/ModCategory";
import type { GameId } from "@/config/games";
import type { ModEntry } from "@/data/mods/types";
import { useLocalizedText } from "@/hooks/useLocalizedText";
import useT from "@/hooks/useT";
import { useRef } from "react";
import { flushSync } from "react-dom";

interface Props {
    gameId: GameId;
    mod: ModEntry;
    onSelect: (mod: ModEntry) => void;
}

export default function FeaturedMod({ gameId, mod, onSelect }: Props) {
    const i18n = useT();
    const localizedText = useLocalizedText();
    const articleRef = useRef<HTMLElement>(null);

    function handleClick() {
        const article = articleRef.current;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (!document.startViewTransition || reduceMotion || !article) {
            onSelect(mod);
            return;
        }

        article.style.viewTransitionName = "mod-dialog";

        const transition = document.startViewTransition(() => {
            flushSync(() => onSelect(mod));
            article.style.viewTransitionName = "";
        });

        transition.ready.catch((err) => console.error("VT ready failed:", err));
    }

    return (
        <article
            ref={articleRef}
            className="grid min-h-100 grid-cols-2 overflow-hidden rounded-3xl shadow-2xl shadow-(color:--button-bg)/20 max-mobile:flex max-mobile:flex-col-reverse"
        >
            <div className="flex flex-col gap-4 bg-(--button-bg) px-12 pt-12 pb-10 max-mobile:pt-8 max-mobile:px-6 max-mobile:gap-2">
                <span className="text-sm font-medium text-(--game-accent)">
                    {i18n("common.other.featured")}
                </span>

                <h3 className="font-body-condensed text-3xl">{mod.title}</h3>

                <span className="max-w-150 text-pretty font-thin text-white/85 max-mobile:text-sm/6 max-mobile:mb-4">
                    {localizedText(mod.shortDescription)}
                </span>

                <div className="mt-auto">
                    <button
                        className="cursor-pointer rounded-full bg-(--game-buttons-primary-background) px-8 py-2.5 text-base font-medium text-(--game-buttons-primary-text) transition-colors duration-400 hover:bg-(--game-buttons-primary-hovered)"
                        onClick={handleClick}
                    >
                        {i18n("mods.seeMod")}
                    </button>
                </div>
            </div>

            <div className="relative bg-radial-[at_-40%_-40%] from-(--game-accent)/40 to-50% to-(--button-bg-hover)/30 max-mobile:min-h-40">
                {mod.coverImage ? (
                    <img
                        src={mod.coverImage}
                        alt={mod.title}
                        className="absolute inset-0 size-full object-cover"
                    />
                ) : (
                    <img
                        src={`/assets/images/games/${gameId}/hero.webp`}
                        alt={mod.title}
                        className="absolute inset-0 size-full object-cover"
                    />
                )}

                <div className="absolute top-6 right-6">
                    <ModCategory mod={mod} />
                </div>
            </div>
        </article>
    );
}
