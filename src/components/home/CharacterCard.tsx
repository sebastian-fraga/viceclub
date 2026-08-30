import useT from "@/hooks/useT";
import { useState } from "react";

interface Props {
    character: Character;
    gameId: string;
}

export interface Character {
    id: string;
    name: string;
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
    quote: string;
    nationalities: string[];
}

const STATUS_STYLES: Record<string, string> = {
    main: "bg-sky-600/80 text-sky-50",
    maleEnemy: "bg-red-600/80 text-red-50",
    femaleEnemy: "bg-red-600/80 text-red-50",
    maleAlly: "bg-emerald-600/80 text-emerald-50",
    femaleAlly: "bg-emerald-600/80 text-emerald-50",
    neutral: "bg-neutral-700/80 text-neutral-50",
    unknown: "bg-neutral-700/80 text-neutral-50",
};

function FlagImage({ countryCode }: { countryCode: string }) {
    const code = countryCode.toLowerCase();

    return (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
            alt={countryCode.toUpperCase()}
            title={countryCode.toUpperCase()}
            width={20}
            height={14}
            loading="lazy"
            className="h-3 w-4 shrink-0 rounded-xs object-cover ring-1 ring-white/10 max-mobile:h-2.5 max-mobile:w-3.5"
        />
    );
}

export default function CharacterCard({ character, gameId }: Props) {
    const t = useT();
    const [flipped, setFlipped] = useState(false);

    const statusStyle =
        STATUS_STYLES[character.status] ?? STATUS_STYLES.neutral;

    const toggle = () => setFlipped((prev) => !prev);

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
                    { name: character.name },
                )}
                onClick={toggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className="relative h-full w-full cursor-pointer rounded-md outline-none duration-500 ease-out transform-3d transition focus-visible:ring-2 focus-visible:ring-pink-300/70 hover:ring-2 hover:ring-(--game-buttons-primary-hovered)"
                style={{
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-md border border-neutral-400/10 bg-neutral-900 backface-hidden">
                    <div className="relative flex-1 overflow-hidden">
                        <img
                            src={character.image}
                            alt={character.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />

                        <span
                            className={`absolute right-2 top-2 font-black rounded-full px-3 py-1 text-[10px] uppercase tracking-wide max-mobile:right-1.5 max-mobile:top-2.5 max-mobile:px-1.5 max-mobile:py-0.5 max-mobile:text-[9px] ${statusStyle}`}
                        >
                            {t(
                                `home.characters.statusLabel.${character.status}`,
                            )}
                        </span>
                    </div>

                    <div className="p-3 max-mobile:p-2">
                        <p className="text-sm font-bold text-neutral-100 max-mobile:text-xs">
                            {character.name}
                        </p>

                        <p className="text-xs text-neutral-400 max-mobile:text-[11px]">
                            {t(
                                `home.${gameId.toLocaleLowerCase()}.characters.${character.id}.role`,
                            )}
                        </p>
                    </div>
                </div>

                <div className="absolute inset-0 flex flex-col gap-5 overflow-y-auto rounded-md border border-neutral-400/10 bg-neutral-900 p-4 backface-hidden transform-[rotateY(180deg)] max-mobile:gap-3 max-mobile:p-3">
                    <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-neutral-100 max-mobile:text-sm">
                            {character.name}
                        </p>

                        <div className="flex items-center gap-1">
                            {character.nationalities?.map((n) => (
                                <FlagImage key={n} countryCode={n} />
                            ))}
                        </div>
                    </div>

                    <dl className="flex flex-col gap-3 text-sm max-mobile:gap-2 max-mobile:text-xs">
                        <div className="flex items-start justify-between gap-3">
                            <dt className="text-neutral-500">
                                {t("home.characters.age")}
                            </dt>

                            <dd className="font-medium text-neutral-200">
                                {typeof character.age === "number"
                                    ? character.age
                                    : t(character.age)}
                            </dd>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                            <dt className="shrink-0 text-neutral-500 max-w-20">
                                {t("home.characters.firstAppearance")}
                            </dt>

                            <dd className="text-right font-medium text-neutral-200 truncate">
                                {t(
                                    `home.${gameId.toLocaleLowerCase()}.characters.${character.id}.mission`,
                                )}
                            </dd>
                        </div>
                    </dl>

                    <p className="mt-auto text-sm italic leading-relaxed text-neutral-400 max-mobile:text-xs max-mobile:leading-normal">
                        “
                        {t(
                            `home.${gameId.toLocaleLowerCase()}.characters.${character.id}.quote`,
                        )}
                        ”
                    </p>
                </div>
            </div>
        </div>
    );
}
