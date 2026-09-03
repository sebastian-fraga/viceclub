import type {
    FlatImageEntry,
    MediaCategory,
} from "@/components/artworks/types";

import {
    getCaption,
    getImageUrl,
    getSectionLabel,
} from "@/components/artworks/mediaUtils";
import { flushSync } from "react-dom";

interface Props {
    gameId: string;
    category: MediaCategory;
    section: string;
    images: FlatImageEntry[];
    lang: string;
    onSelect: (image: FlatImageEntry) => void;
    activeImageId: string | null;
    registerThumb: (id: string, el: HTMLImageElement | null) => void;
}

export function SectionGrid({
    gameId,
    category,
    section,
    images,
    lang,
    onSelect,
    activeImageId,
    registerThumb,
}: Props) {
    function handleSelect(
        e: React.MouseEvent<HTMLButtonElement>,
        image: FlatImageEntry,
    ) {
        const imgEl = e.currentTarget.querySelector("img");

        if (!document.startViewTransition || !imgEl) {
            onSelect(image);
            return;
        }

        imgEl.style.viewTransitionName = "gallery-image";

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                onSelect(image);
            });
            imgEl.style.viewTransitionName = "";
        });

        transition.ready.catch((err) => console.error("VT ready failed:", err));
    }

    return (
        <section className="mx-auto max-mobile:mt-20 first:mobile:mt-30 mobile:mt-50 flex max-w-430 flex-col">
            <h3 className="mb-8 flex items-center gap-3 text-4xl font-medium text-indigo-50 max-mobile:max-w-120 max-mobile:text-2xl">
                <span className="min-w-0 truncate">
                    {getSectionLabel(section, lang)}
                </span>

                <span className="shrink-0 rounded-[4px] bg-(--button-bg) px-2 py-0.5 font-body-condensed text-sm">
                    {images.length}
                </span>
            </h3>

            <div className="grid grid-cols-3 gap-x-6 gap-y-8 max-mobile:grid-cols-1">
                {images.map((image, index) => {
                    const url = getImageUrl(
                        gameId,
                        category,
                        section,
                        image.id,
                    );

                    const caption = getCaption(image.caption, lang);
                    const isPriority = index < 6;

                    return (
                        <button
                            key={image.id}
                            onClick={(e) => handleSelect(e, image)}
                            className="fade-card group flex cursor-pointer flex-col overflow-hidden rounded-[20px] bg-[#252644] text-left shadow-xl shadow-(color:--button-bg)/5 transition-colors duration-350 hover:bg-[#2F2E52]"
                        >
                            <img
                                ref={(el) => registerThumb(image.id, el)}
                                src={url}
                                alt={caption}
                                loading={isPriority ? "eager" : "lazy"}
                                fetchPriority={isPriority ? "high" : "auto"}
                                width={640}
                                height={360}
                                className="aspect-video w-full shrink-0 object-cover object-top"
                            />

                            <div className="max-mobile:h-22 h-32 shrink-0 p-8">
                                <p className="truncate text-2xl max-mobile:text-lg font-medium text-violet-100">
                                    {caption}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
