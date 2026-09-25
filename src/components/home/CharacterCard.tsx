import useT from "@/hooks/useT";
import { useState } from "react";

interface Props {
    character: Character;
    variantId: string;
}

export interface Character {
    id: string;
    name: string;
    nameKey?: string;
    role: string;
    image: string;
    age: number | string;
    status:
        | "main"
        | "maleEnemy"
        | "femaleEnemy"
        | "maleAlly"
        | "femaleAlly"
        | "neutral"
        | "unknown"
        | string;
    firstAppearance: string;
    quote?: string;
    nationalities?: string[];
}

const STATUS_STYLES: Record<string, string> = {
    main: "bg-violet-500/80 text-violet-50",
    maleEnemy: "bg-red-500/80 text-red-50",
    femaleEnemy: "bg-red-500/80 text-red-50",
    maleAlly: "bg-emerald-500/80 text-emerald-50",
    femaleAlly: "bg-emerald-500/80 text-emerald-50",
    neutral: "bg-neutral-500/80 text-neutral-50",
    unknown: "bg-neutral-500/80 text-neutral-50",
};

function FlagImage({ nationality }: { nationality: string }) {
    if (nationality === "unknown") {
        return (
            <span className="flex h-3 w-4 shrink-0 items-center justify-center rounded-xs bg-white/10 text-[9px] text-neutral-300">
                ?
            </span>
        );
    }

    const code = nationality.toLowerCase();

    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
            width={20}
            height={14}
            loading="lazy"
            className="h-3 w-4 shrink-0 rounded-xs object-cover max-mobile:h-2.5 max-mobile:w-3.5"
        />
    );
}

export default function CharacterCard({ character, variantId }: Props) {
    const t = useT();
    const [flipped, setFlipped] = useState(false);

    const statusStyle =
        STATUS_STYLES[character.status] ?? STATUS_STYLES.neutral;

    const toggle = () => setFlipped((prev) => !prev);

    const characterName = character.nameKey
        ? t(character.nameKey)
        : character.name;

    return (
        <div className="h-90 w-full perspective-distant max-mobile:h-72">
            <div
                role="button"
                tabIndex={0}
                aria-pressed={flipped}
                aria-label={t(
                    flipped
                        ? "characters.accessibility.showLess"
                        : "characters.accessibility.showMore",
                    { name: characterName },
                )}
                onClick={toggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className="group relative h-full w-full cursor-pointer rounded-lg shadow-[0_18px_40px_-16px_var(--button-bg)] outline-none duration-500 ease-out transform-3d transition focus-visible:ring-2 focus-visible:ring-pink-300/70]"
                style={{
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-lg bg-(--button-bg) backface-hidden">
                    <div className="relative flex-1 overflow-hidden after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-2/5 after:bg-linear-to-t after:from-(--button-bg) after:to-transparent after:content-['']">
                        <img
                            src={character.image}
                            alt={characterName}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />

                        <span
                            className={`absolute right-2.5 top-2.5 z-10 rounded-full px-4 py-1 text-[12px] font-extrabold uppercase font-body-condensed max-mobile:right-1.5 max-mobile:top-2.5 max-mobile:px-1.5 max-mobile:py-0.5 max-mobile:text-[9px] ${statusStyle}`}
                        >
                            {t(
                                `home.characters.statusLabel.${character.status}`,
                            )}
                        </span>
                    </div>

                    <div className="relative isolate flex flex-col gap-0.5 bg-(--button-bg) px-4 pb-4 pt-1 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-t before:from-[color-mix(in_oklab,var(--game-accent,#a855f7)_28%,transparent)] before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] group-hover:before:opacity-100 max-mobile:px-3 max-mobile:pb-3">
                        <p className="text-sm font-bold tracking-tight text-neutral-50 max-mobile:text-xs">
                            {characterName}
                        </p>

                        <p className="text-xs text-neutral-300 max-mobile:text-[11px]">
                            {t(
                                `home.${variantId.toLocaleLowerCase()}.characters.${character.id}.role`,
                            )}
                        </p>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 flex flex-col gap-4 overflow-y-auto rounded-lg bg-(--button-bg) bg-[radial-gradient(120%_70%_at_100%_0%,color-mix(in_oklab,var(--game-accent,#a855f7)_25%,transparent),transparent_60%)] p-4 backface-hidden transform-[rotateY(180deg)] max-mobile:gap-3 max-mobile:p-3"
                    data-lenis-prevent
                >
                    <div className="flex items-center gap-2">
                        <p className="text-base font-bold tracking-tight text-neutral-50 max-mobile:text-sm">
                            {characterName}
                        </p>

                        <div className="flex items-center gap-1">
                            {character.nationalities?.map((nationality) => (
                                <FlagImage
                                    key={nationality}
                                    nationality={nationality}
                                />
                            ))}
                        </div>
                    </div>

                    <dl className="flex flex-col gap-2 text-sm max-mobile:text-xs">
                        <div className="flex items-start justify-between gap-3 rounded-md bg-(--button-bg-hover) px-3 py-2.5 max-mobile:py-2">
                            <dt className="text-[10px] font-semibold uppercase tracking-widest text-neutral-300">
                                {t("home.characters.age")}
                            </dt>

                            <dd className="font-semibold text-neutral-50">
                                {typeof character.age === "number"
                                    ? character.age
                                    : t(character.age)}
                            </dd>
                        </div>

                        <div className="flex items-start justify-between gap-3 rounded-md bg-(--button-bg-hover) px-3 py-2.5 max-mobile:py-2">
                            <dt className="shrink-0 max-w-20 text-[10px] font-semibold uppercase tracking-widest text-neutral-300">
                                {t("home.characters.firstAppearance")}
                            </dt>

                            <dd className="truncate text-right font-semibold text-neutral-50">
                                {t(
                                    `home.${variantId.toLocaleLowerCase()}.characters.${character.id}.mission`,
                                )}
                            </dd>
                        </div>
                    </dl>

                    <p className="mt-auto rounded-md bg-(--button-bg-hover) px-3 py-3 text-sm italic leading-relaxed text-neutral-200 max-mobile:text-xs max-mobile:leading-normal">
                        “
                        {t(
                            `home.${variantId.toLocaleLowerCase()}.characters.${character.id}.quote`,
                        )}
                        ”
                    </p>
                </div>
            </div>
        </div>
    );
}
