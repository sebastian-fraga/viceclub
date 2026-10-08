import type { MediaCategory } from "@/components/artworks/types";
import { useCallback, useState } from "react";

const CATEGORIES: MediaCategory[] = ["artworks", "screenshots"];
const DEFAULT_CATEGORY: MediaCategory = "artworks";

function readCategoryFromUrl(): MediaCategory {
    if (typeof window === "undefined") return DEFAULT_CATEGORY;

    const value = new URLSearchParams(window.location.search).get("category");

    return CATEGORIES.includes(value as MediaCategory)
        ? (value as MediaCategory)
        : DEFAULT_CATEGORY;
}

export function useCategoryParam() {
    const [category, setCategoryState] =
        useState<MediaCategory>(readCategoryFromUrl);

    const setCategory = useCallback((next: MediaCategory) => {
        setCategoryState(next);

        const url = new URL(window.location.href);
        url.searchParams.set("category", next);
        url.hash = "";
        history.replaceState(null, "", url);
    }, []);

    return [category, setCategory] as const;
}
