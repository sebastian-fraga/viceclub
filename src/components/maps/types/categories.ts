import { CHALLENGE_TYPES } from "./challengeTypes";
import { COLLECTIBLE_TYPES } from "./collectibleTypes";
import { LOCATION_TYPES } from "./locationTypes";

export const MAP_CATEGORIES = {
    collectibles: {
        label: "maps.markers.collectibles.title",
        types: COLLECTIBLE_TYPES,
    },
    challenges: {
        label: "maps.markers.challenges.title",
        types: CHALLENGE_TYPES,
    },
    locations: {
        label: "maps.markers.locations.title",
        types: LOCATION_TYPES,
    },
} as const;

export type MapCategory = keyof typeof MAP_CATEGORIES;

interface TypeMeta {
    color: string;
    label: string;
    singularLabel?: string;
}

export function getTypeMeta(type: string): TypeMeta | undefined {
    for (const category of Object.values(MAP_CATEGORIES)) {
        const types = category.types as Record<string, TypeMeta>;
        if (types[type]) return types[type];
    }
    return undefined;
}
