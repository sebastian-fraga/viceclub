import type { CollectibleData } from "@/components/maps/types";
import type { MapCategory } from "@/components/maps/types/categories";

export interface TypeMeta {
    color: string;
    label: string;
}

export interface SectionData {
    key: MapCategory;
    label: string;
    types: Record<string, TypeMeta>;
    typesData: Record<string, CollectibleData[]> | undefined;
}

export type MarkerMap = Record<string, { icon: string }> | undefined;

export type Tri = boolean | "mixed";

export const getCollectibleKey = (type: string, id: string) => `${type}_${id}`;

export function getTypeIds(type: string, items: CollectibleData[]): string[] {
    return items.map((item) => getCollectibleKey(type, item.id));
}

export function isTypeComplete(
    type: string,
    items: CollectibleData[],
    completedIds: Set<string>,
): boolean {
    return (
        items.length > 0 &&
        getTypeIds(type, items).every((id) => completedIds.has(id))
    );
}

export function getRenderableTypes(
    section: SectionData,
    markers: MarkerMap,
): [string, CollectibleData[]][] {
    return Object.entries(section.typesData ?? {}).filter(([type]) =>
        Boolean(markers?.[type] && section.types[type]),
    );
}

export function toTri(values: boolean[]): Tri {
    const count = values.filter(Boolean).length;

    if (count === 0) return false;

    return count === values.length ? true : "mixed";
}
