import useT from "@/hooks/useT";
import type { MediaCategory } from "./types";

interface Props {
    active: MediaCategory;
    onChange: (category: MediaCategory) => void;
}

const buttonClass =
    "rounded-full px-10 py-4 font-bold transition-colors text-xl max-mobile:text-lg max-mobile:px-4 max-mobile:py-2";

export function CategorySwitcher({ active, onChange }: Props) {
    const t = useT();

    function handleChange(category: MediaCategory) {
        if (category === active) return;

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        onChange(category);
    }

    return (
        <>
            <div className="pointer-events-none fixed inset-0 z-30 max-mobile:hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_25%_at_50%_5%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.5)_35%,transparent_70%)]" />
            </div>

            <div className="pointer-events-auto fixed left-1/2 z-30 flex -translate-x-1/2 justify-center gap-2 mobile:top-[calc(var(--banner-height)+var(--header-height)+20px)] max-mobile:bottom-0 max-mobile:w-full max-mobile:bg-(--button-bg) max-mobile:px-3 max-mobile:pt-6 max-mobile:pb-[calc(3rem+env(safe-area-inset-bottom))]">
                <button
                    onClick={() => onChange("artworks")}
                    aria-pressed={active === "artworks"}
                    data-active={active === "artworks"}
                    className={`${buttonClass} ${
                        active === "artworks"
                            ? "bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text)"
                            : "bg-none hover:text-(--game-buttons-primary-background) cursor-pointer"
                    }`}
                >
                    {t("artworks.categories.artworks")}
                </button>

                <button
                    onClick={() => onChange("screenshots")}
                    aria-pressed={active === "screenshots"}
                    data-active={active === "screenshots"}
                    className={`${buttonClass} ${
                        active === "screenshots"
                            ? "bg-(--game-buttons-primary-background) text-(--game-buttons-primary-text)"
                            : "bg-none hover:text-(--game-buttons-primary-background) cursor-pointer"
                    }`}
                >
                    {t("artworks.categories.screenshots")}
                </button>
            </div>
        </>
    );
}