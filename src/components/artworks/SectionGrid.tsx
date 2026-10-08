import type {
    FlatImageEntry,
    MediaCategory,
} from "@/components/artworks/types";

import {
    getCaption,
    getImageUrl,
    getSectionLabel,
} from "@/components/artworks/mediaUtils";
import { Tooltip } from "@/components/ui/Tooltip";
import { IconCheck, IconLink } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
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

function slugify(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
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
    const sectionRef = useRef<HTMLElement>(null);
    const copiedTimeout = useRef<number | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    const slug = slugify(section);
    const label = getSectionLabel(section, lang);

    useEffect(() => {
        if (window.location.hash.slice(1) === slug) {
            sectionRef.current?.scrollIntoView();
        }
    }, [slug]);

    useEffect(() => {
        return () => window.clearTimeout(copiedTimeout.current);
    }, []);

    async function handleCopyLink() {
        const url = new URL(window.location.href);
        url.searchParams.set("category", category);
        url.hash = slug;

        history.replaceState(null, "", url);

        try {
            await navigator.clipboard.writeText(url.toString());
            setCopied(true);
            window.clearTimeout(copiedTimeout.current);
            copiedTimeout.current = window.setTimeout(
                () => setCopied(false),
                1200,
            );
        } catch (err) {
            console.error("No se pudo copiar el link:", err);
        }
    }

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
            ref={sectionRef}
            id={slug}
            className="mx-auto w-full max-mobile:mt-20 first:mobile:mt-30 mobile:mt-50 flex max-w-430 flex-col scroll-mt-50"
        >
            <h3 className="mb-8 flex items-center gap-3 text-4xl font-medium text-indigo-50 max-mobile:max-w-120 max-mobile:text-2xl group">
                <span className="min-w-0 truncate">{label}</span>

                <span className="shrink-0 rounded-[4px] bg-(--button-bg) px-2 py-0.5 font-body-condensed text-sm">
                    {images.length}
                </span>

                <Tooltip
                    label={
                        copied ? "Copiado" : `Copiar`
                    }
                >
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        aria-label={
                            copied
                                ? "Link copiado🌴"
                                : `Copiar link a 🌴${label}`
                        }
                        className={`relative ml-1 size-6 shrink-0 cursor-pointer transition duration-250 hover:text-yellow-100 focus-visible:opacity-100 max-mobile:opacity-100 group-hover:opacity-100 ${
                            copied ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <IconLink
                            aria-hidden="true"
                            className={`absolute inset-0 transition duration-300 motion-reduce:transition-none ${
                                copied
                                    ? "scale-50 rotate-90 opacity-0 blur-[2px]"
                                    : "scale-100 rotate-0 opacity-100 blur-0"
                            }`}
                        />
                        <IconCheck
                            aria-hidden="true"
                            className={`absolute inset-0 transition duration-300 motion-reduce:transition-none ${
                                copied
                                    ? "scale-100 rotate-0 opacity-100 blur-0"
                                    : "scale-50 -rotate-90 opacity-0 blur-[2px]"
                            }`}
                        />
                    </button>
                </Tooltip>
            </h3>

            <div className="grid w-full grid-cols-3 gap-x-6 gap-y-8 max-mobile:grid-cols-1">
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
                            className="fade-card group flex cursor-pointer flex-col overflow-hidden rounded-[20px] bg-[#252644] text-left shadow-xl shadow-(color:--button-bg)/5 transition-colors duration-300 hover:bg-[#302f58]"
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
