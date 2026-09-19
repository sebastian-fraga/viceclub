import type { GameVariant } from "@/types/game";

interface Props {
    variants: GameVariant[];
    selected: string;
    onChange: (variantId: string) => void;
}

export default function VariantSelector({
    variants,
    selected,
    onChange,
}: Props) {
    return (
        <div className="flex gap-4 overflow-x-auto scroll-home-variant-selector">
            {variants.map((variant) => (
                <button
                    key={variant.id}
                    type="button"
                    onClick={() => onChange(variant.id)}
                    className={`shrink-0 rounded-full px-6 py-2.5 font-bold transition-colors cursor-pointer
                        ${
                            selected === variant.id
                                ? "bg-(--game-accent) text-(--game-buttons-primary-text)"
                                : "bg-(--button-bg) hover:bg-(--button-bg-hover) text-(--game-buttons-secondary-text)"
                        }`}
                >
                    {variant.label}
                </button>
            ))}
        </div>
    );
}
