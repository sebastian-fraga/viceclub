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
