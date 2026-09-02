import useT from "@/hooks/useT";
import {
    IconChevronLeft,
    IconChevronRight,
    IconDownload,
    IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
    getCaption,
    getImageUrl,
    getSectionLabel,
    slugify,
} from "./mediaUtils";
import type { FlatImageEntry, MediaCategory } from "./types";

interface Props {
    gameId: string;
    category: MediaCategory;
    image: FlatImageEntry;
    lang: string;
    onNext: () => void;
    onPrev: () => void;
    canNext: boolean;
    canPrev: boolean;
    onClose: () => void;
}

export function Lightbox({
    gameId,
    category,
    image,
    lang,
    onNext,
    onPrev,
    onClose,
    canNext,
    canPrev,
}: Props) {
    const [isClosing, setIsClosing] = useState(false);

    const t = useT();
    const url = getImageUrl(gameId, category, image.section, image.id);
    const caption = getCaption(image.caption, lang);
    const sectionLabel = getSectionLabel(image.section, lang);
    const filename = `${slugify(caption || image.id)}.webp`;

    const mobileButtonsStyles =
        "hidden max-mobile:flex absolute top-1/2 -translate-y-1/2 items-center justify-center p-2 text-white transition duration-400 disabled:text-white/30 cursor-pointer disabled:cursor-not-allowed";

    function handleClose() {
        setIsClosing(true);
    }

    useEffect(() => {
        if (!isClosing) return;

        const timeout = setTimeout(() => {
            onClose();
        }, 400);

        return () => clearTimeout(timeout);
    }, [isClosing, onClose]);

    async function handleDownload() {
        try {
            const response = await fetch(url, {
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
            }, 1000);
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    useEffect(() => {
        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") handleClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        }

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [onPrev, onNext]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            className={`fixed z-40 flex flex-col bg-black left-(--sidebar-width) right-0 top-[calc(var(--banner-height)+var(--header-height))] bottom-0 transition-opacity duration-400 ${
                isClosing ? "opacity-0" : "opacity-100"
            }`}
        >
            <div className="mobile:absolute mobile:right-8 mobile:top-8 z-10 flex items-center gap-4 max-mobile:justify-between max-mobile:px-8 max-mobile:pt-4">
                <div className="w-full flex-col truncate">
                    <span className="hidden max-mobile:block truncate max-w-50 text-lg max-mobile:text-sm font-medium text-violet-200">
                        {sectionLabel}
                    </span>
                    <span className="hidden max-mobile:block truncate max-w-50 text-lg max-mobile:text-base font-bold text-violet-100">
                        {caption}
                    </span>
                </div>

                <button
                    onClick={handleClose}
                    aria-label={t("common.accessibility.close")}
                    className="rounded-full p-5 text-violet-300 bg-(--button-bg) cursor-pointer hover:bg-[#252644] transition duration-400 max-mobile:p-4"
                >
                    <IconX stroke={2} className="max-mobile:size-4" />
                </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden">
                <img
                    src={url}
                    alt={caption}
                    style={{ viewTransitionName: "gallery-image" }}
                    className="h-full w-full max-w-full object-contain"
                />

                <button
                    onClick={onPrev}
                    disabled={!canPrev}
                    aria-label={t("common.accessibility.prev")}
                    className={`left-2 ${mobileButtonsStyles}`}
                >
                    <IconChevronLeft
                        size={24}
                        className="drop-shadow-xs drop-shadow-black/40"
                    />
                </button>

                <button
                    onClick={onNext}
                    disabled={!canNext}
                    aria-label={t("common.accessibility.next")}
                    className={`right-2 ${mobileButtonsStyles}`}
                >
                    <IconChevronRight
                        size={24}
                        className="drop-shadow-xs drop-shadow-black/40"
                    />
                </button>
            </div>

            <div className="w-[calc(100%-var(--sidebar-width))] mx-auto mb-10 bg-[#252644] rounded-3xl py-8 px-12 max-mobile:w-full max-mobile:mx-0 max-mobile:mb-0 max-mobile:rounded-none max-mobile:py-4 max-mobile:px-4 max-mobile:pb-[calc(1rem+env(safe-area-inset-bottom)+56px)]">
                <div className="flex items-center justify-between max-mobile:flex-col max-mobile:gap-3">
                    <div className="flex items-center gap-6 max-mobile:hidden">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onPrev}
                                disabled={!canPrev}
                                aria-label={t("common.accessibility.prev")}
                                className="cursor-pointer rounded-full bg-(--button-bg) p-5 text-indigo-50 transition duration-400 enabled:hover:bg-(--button-bg-hover) disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <IconChevronLeft size={38} />
                            </button>

                            <button
                                onClick={onNext}
                                disabled={!canNext}
                                aria-label={t("common.accessibility.next")}
                                className="cursor-pointer rounded-full bg-(--button-bg) p-5 text-indigo-50 transition duration-400 enabled:hover:bg-(--button-bg-hover) disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <IconChevronRight size={38} />
                            </button>
                        </div>

                        <div className="flex gap-2 text-2xl">
                            <span className="font-bold text-violet-200">
                                {sectionLabel}
                            </span>
                            <span className="font-bold text-indigo-400/30">
                                /
                            </span>
                            <span className="text-violet-50">{caption}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 max-mobile:w-full max-mobile:justify-between">
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-4 rounded-full bg-(--game-buttons-primary-background) cursor-pointer hover:bg-(--game-buttons-primary-hovered) transition duration-400 px-32 py-7 font-black text-3xl text-(--game-buttons-primary-text) max-mobile:flex-1 max-mobile:justify-center max-mobile:px-6 max-mobile:py-3 max-mobile:text-lg"
                        >
                            {t("common.buttons.download")}
                            <IconDownload
                                stroke={3}
                                size={32}
                                className="max-mobile:size-5"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
