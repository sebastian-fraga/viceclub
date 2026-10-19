import { useKeyDown } from "@/hooks/useKeyDown";

export function useEscapeKey(onEscape: () => void, enabled = true) {
    useKeyDown(
        (event) => {
            if (event.key === "Escape") onEscape();
        },
        { enabled },
    );
}
