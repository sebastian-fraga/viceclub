export type LocalizedRequirement =
    | string
    | {
          es: string;
          en: string;
          fr: string;
          pt: string;
      };

export interface ChallengeSchedule {
    from: LocalizedRequirement;
    to: LocalizedRequirement;
}

export interface ChallengeRequirements {
    schedule?: ChallengeSchedule;
    minLevel?: {
        skill: string;
        value: number;
    };
    availableAfter?: LocalizedRequirement[];
    unlockedBy?: LocalizedRequirement[];
}

export interface CollectibleData {
    description?: Description;
    type?: string;
    image?: string | undefined;
    text: string | undefined;
    guide?: CollectibleGuide;
    id: string;
    x: number;
    y: number;
    requirements?: ChallengeRequirements;
}

export type MapItemData = CollectibleData;

export interface CollectibleGuide {
    fromX: number;
    fromY: number;
    label?: string;
}

export interface GameMapMeta {
    width: number;
    height: number;
    minZoom: number;
    maxZoom: number;
}

export interface GameMapVariant {
    mapMeta: GameMapMeta;
    collectibles?: Record<string, CollectibleData[]>;
    sideMissions?: Record<string, CollectibleData[]>;
    timeTrials?: Record<string, CollectibleData[]>;
    challenges?: Record<string, CollectibleData[]>;
    locations?: Record<string, CollectibleData[]>;
}

export interface GameMapData {
    gameId: string;
    mapMeta?: GameMapMeta;
    collectibles?: Record<string, CollectibleData[]>;
    sideMissions?: Record<string, CollectibleData[]>;
    timeTrials?: Record<string, CollectibleData[]>;
    challenges?: Record<string, CollectibleData[]>;
    locations?: Record<string, CollectibleData[]>;
    variants?: Record<string, GameMapVariant>;
}

export type Description = string | Record<string, string>;

const mapModules = import.meta.glob<{ default: GameMapData }>(
    "/src/data/maps/*.json",
    { eager: true },
);

const mapDataByGameId: Record<string, GameMapData> = {};

for (const mod of Object.values(mapModules)) {
    mapDataByGameId[mod.default.gameId] = mod.default;
}

export function getGameMapData(
    gameId: string,
    variantId?: string,
): GameMapData | undefined {
    const gameMap = mapDataByGameId[gameId];

    if (!gameMap) return undefined;

    if (variantId && gameMap.variants?.[variantId]) {
        return {
            gameId,
            ...gameMap.variants[variantId],
        };
    }

    return gameMap;
}