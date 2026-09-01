import type { MediaCategory } from "./types";
import useT from "@/hooks/useT";

interface Props {
    active: MediaCategory;
    onChange: (category: MediaCategory) => void;
}

const buttonClass =
    "rounded-full px-10 py-4 font-bold transition-colors text-xl max-mobile:text-lg max-mobile:px-4 max-mobile:py-2 truncate";

function getButtonClass(active: MediaCategory, category: MediaCategory) {
    return `${buttonClass} ${
        active === category
            ? "bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text)"
            : "bg-none hover:text-(--game-buttons-primary-background) cursor-pointer"
    }`;
}

export function CategorySwitcher({ active, onChange }: Props) {
    const t = useT();
    return (
        <div className="pointer-events-none fixed inset-0 z-30 transform-gpu will-change-transform">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_25%_at_50%_5%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.6)_35%,transparent_70%)] max-mobile:hidden" />
            <div className="pointer-events-auto absolute left-1/2 mt-3 flex justify-center -translate-x-1/2 gap-2 transform-gpu will-change-transform max-mobile:top-auto max-mobile:bottom-0 max-mobile:w-full max-mobile:bg-(--button-bg) max-mobile:py-4 mobile:top-[calc(var(--banner-height)+var(--header-height)+20px)] max-mobile:px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <button
                    onClick={() => onChange("artworks")}
                    aria-pressed={active === "artworks"}
                    data-active={active === "artworks"}
                    className={getButtonClass(active, "artworks")}
                >
                    {t("artworks.categories.artworks")}
                </button>

                <button
                    onClick={() => onChange("screenshots")}
                    aria-pressed={active === "screenshots"}
                    data-active={active === "screenshots"}
                    className={getButtonClass(active, "screenshots")}
                >
                    {t("artworks.categories.screenshots")}
                </button>
            </div>
        </div>
    );
}
