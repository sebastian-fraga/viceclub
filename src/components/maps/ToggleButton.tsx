import type { Tri } from "@/components/maps/utils/sectionUtils";
import type { ReactNode } from "react";

interface ToggleButtonProps {
    pressed: Tri;
    label: string;
    onClick: () => void;
    children: ReactNode;
}

export default function ToggleButton({
    pressed,
    label,
    onClick,
    children,
}: ToggleButtonProps) {
    const tone =
        pressed === true
            ? "bg-(--game-accent) text-(--game-buttons-primary-text) hover:bg-(--game-accent)/90 shadow-(color:--game-accent)/30"
            : pressed === "mixed"
              ? "bg-(--game-accent)/35 text-white"
              : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white";

    return (
        <button
            type="button"
            aria-pressed={pressed}
            aria-label={label}
            onClick={onClick}
            className={`grid size-9 shrink-0 cursor-pointer place-items-center rounded-xl transition duration-350 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-md ${tone}`}
        >
            {children}
        </button>
    );
}
