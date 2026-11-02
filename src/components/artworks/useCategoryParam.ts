import type { MediaCategory } from "@/components/artworks/types";
import { useUrlParam } from "@/hooks/useUrlParam";

const CATEGORIES: MediaCategory[] = ["artworks", "screenshots"];
const DEFAULT_CATEGORY: MediaCategory = "artworks";

export function useCategoryParam() {
    return useUrlParam("category", CATEGORIES, DEFAULT_CATEGORY);
}
