import type {
    FlatImageEntry,
    MediaCategory,
} from "@/components/artworks/types";

import {
    getCaption,
    getImageUrl,
    getSectionLabel,
} from "@/components/artworks/mediaUtils";
import CopyLink from "@/components/ui/CopyLink";
import CountBadge from "@/components/ui/CountBadge";
import { useState } from "react";
import { flushSync } from "react-dom";

interface Props {
    gameId: string;
    category: MediaCategory;
    section: string;
    images: FlatImageEntry[];
    lang: string;
    priorityOffset: number;
    onSelect: (image: FlatImageEntry) => void;
    registerThumb: (id: string, el: HTMLImageElement | null) => void;
}

function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export const PRIORITY_IMAGE_COUNT = 9;

interface ThumbProps {
    url: string;
    caption: string;
    isPriority: boolean;
    registerThumb: (el: HTMLImageElement | null) => void;
}

function MediaThumb({ url, caption, isPriority, registerThumb }: ThumbProps) {
    const [loaded, setLoaded] = useState(false);

    function setRefs(el: HTMLImageElement | null) {
        registerThumb(el);

        if (el?.complete) setLoaded(true);
    }

    return (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#1b1b36]">
            <div
                aria-hidden="true"
                className={`absolute inset-0 bg-linear-to-r from-transparent via-white/6 to-transparent ${
                    loaded ? "hidden" : "animate-pulse"
                }`}
            />

            <img
                ref={setRefs}
                src={url}
                alt={caption}
                loading={isPriority ? "eager" : "lazy"}
                fetchPriority={isPriority ? "high" : "auto"}
                width={640}
                height={360}
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
}

export function SectionGrid({
    gameId,
    category,
    section,
    images,
    lang,
    priorityOffset,
    onSelect,
    registerThumb,
}: Props) {
    const slug = slugify(section);
    const label = getSectionLabel(section, lang);

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
        <section
            id={slug}
            className="mx-auto w-full max-mobile:mt-20 first:mobile:mt-30 mobile:mt-50 flex max-w-430 flex-col scroll-mt-50"
        >
            <h3 className="mb-8 flex items-center gap-3 text-4xl font-medium text-indigo-50 max-mobile:max-w-120 max-mobile:text-2xl group">
                <span className="min-w-0 truncate">{label}</span>

                <CountBadge count={images.length} />

                <CopyLink id={slug} label={label} searchParams={{ category }} />
            </h3>

            <div className="grid w-full lg:grid-cols-3 md:grid-cols-2 gap-x-6 gap-y-8 max-mobile:grid-cols-1">
                {images.map((image, index) => {
                    const url = getImageUrl(
                        gameId,
                        category,
                        section,
                        image.id,
                    );

                    const caption = getCaption(image.caption, lang);
                    const isPriority =
                        priorityOffset + index < PRIORITY_IMAGE_COUNT;

                    return (
                        <button
                            key={image.id}
                            onClick={(e) => handleSelect(e, image)}
                            className="fade-card group flex cursor-pointer flex-col overflow-hidden rounded-[20px] bg-[#252644] text-left shadow-xl shadow-(color:--button-bg)/5 transition-colors duration-300 hover:bg-[#302f58]"
                        >
                            <MediaThumb
                                url={url}
                                caption={caption}
                                isPriority={isPriority}
                                registerThumb={(el) =>
                                    registerThumb(image.id, el)
                                }
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
