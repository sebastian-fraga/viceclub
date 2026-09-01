import type { FlatImageEntry } from "@/components/artworks/types";
import { useCallback, useMemo, useState } from "react";

export function useLightbox(images: FlatImageEntry[]) {
    const [currentImages, setCurrentImages] = useState<FlatImageEntry[]>([]);
    const [index, setIndex] = useState<number | null>(null);

    const current = useMemo(
        () => (index !== null ? currentImages[index] : null),
        [currentImages, index],
    );

    const open = useCallback(
        (image: FlatImageEntry) => {
            const sectionImages = images.filter(
                (img) => img.section === image.section,
            );

            const i = sectionImages.findIndex((img) => img.id === image.id);

            if (i !== -1) {
                setCurrentImages(sectionImages);
                setIndex(i);
            }
        },
        [images],
    );

    const close = useCallback(() => {
        setIndex(null);
        setCurrentImages([]);
    }, []);

    const next = useCallback(() => {
        setIndex((i) => {
            if (i === null || i >= currentImages.length - 1) return i;
            return i + 1;
        });
    }, [currentImages.length]);

    const prev = useCallback(() => {
        setIndex((i) => {
            if (i === null || i <= 0) return i;
            return i - 1;
        });
    }, []);

    const canNext = index !== null && index < currentImages.length - 1;

    const canPrev = index !== null && index > 0;

    return {
        isOpen: index !== null,
        current,
        open,
        close,
        next,
        prev,
        canNext,
        canPrev,
    };
}
