import type { Tri } from "@/components/maps/utils/sectionUtils";
import type { ReactNode } from "react";

interface ToggleButtonProps {
    pressed: Tri;
    label: string;
    onClick: () => void;
    children: ReactNode;
    size?: "sm" | "md";
}

export default function ToggleButton({
    pressed,
    label,
    onClick,
    children,
    size = "md",
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
            className={`grid shrink-0 cursor-pointer place-items-center transition duration-350 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shadow-md ${
                size === "sm"
                    ? "size-7 rounded-lg"
                    : "size-9 rounded-xl"
            } ${tone}`}
        >
            {children}
        </button>
    );
}
