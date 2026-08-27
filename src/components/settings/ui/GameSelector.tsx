import type { GameId } from "@/config/games";
import { gamesList } from "@/config/games";

interface GameSelectorProps {
    selected: GameId[];
    onChange: (selected: GameId[]) => void;
}

export function GameSelector({ selected, onChange }: GameSelectorProps) {
    const toggleGame = (id: GameId) => {
        if (selected.includes(id)) {
            onChange(selected.filter((g) => g !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="grid h-full grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-black/20 p-2">
            {gamesList.map((game) => {
                const isChecked = selected.includes(game.id);

                return (
                    <label
                        key={game.id}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors select-none max-mobile:gap-2 max-mobile:px-2 max-mobile:py-1.5 ${
                            isChecked
                                ? "bg-white/10 text-white"
                                : "text-white/70 hover:bg-white/5"
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={isChecked}
                            onChange={() => toggleGame(game.id)}
                        />

                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-white/25 bg-white/5 transition-colors peer-checked:border-indigo-800 peer-checked:bg-indigo-900 max-mobile:h-3.5 max-mobile:w-3.5">
                            {isChecked && (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    className="h-3 w-3 text-white max-mobile:h-2.5 max-mobile:w-2.5"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            )}
                        </span>

                        <img
                            src={`/assets/images/icons/games/logos/${game.id}.webp`}
                            alt={`Logo de GTA ${game.id}`}
                            className="w-12 shrink-0 object-contain max-mobile:w-8"
                        />

                        <span className="text-sm font-medium max-mobile:text-xs max-mobile:line-clamp-2">
                            {game.fullName}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}
