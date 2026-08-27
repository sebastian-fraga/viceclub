import type { GameId } from "@/config/games";
import type { PlatformFamily } from "@/config/platforms";
import type { StoreIcon } from "@/config/stores";
import type { PlatformId } from "@/types/cheats";

interface Store {
    name: string;
    icon: StoreIcon;
    link: string;
    extra?: string;
}

interface DateValue {
    key: string;
    tag?: string;
}

export interface Game {
    id: GameId;
    title: string;

    theme: {
        accent: {
            default: string;
            muted: string;
        };
        buttons: {
            primary: {
                background: string;
                hovered?: string;
                border?: string;
                text: string;
            };
            secondary: {
                background: string;
                hovered?: string;
                border?: string;
                text: string;
            };
        };
    };

    variants?: GameVariant[];

    buttonsPosition: "left" | "right";

    trailers: {
        name: string;
        link: string;
    }[];

    purchase: {
        platform: PlatformFamily | "android" | "ios";
        label: string;
        stores: Store[];
    }[];

    description: {
        paragraphs: string[];
    };

    technicalSheet: {
        title: string;
        developers: string[];
        publisher: string;
        producer: string;
        writers: string[];
        platforms: string[];
        dates: {
            platforms: string[];
            dates: DateValue[];
        }[];
        engines: string[];
        sales?: string;
    };
    platforms: PlatformId[];
    originalPlatforms: PlatformId[];
    anniversaryPlatforms: PlatformId[];
    definitivePlatforms: PlatformId[];
    enhancedPlatforms: PlatformId[];
    expandedAndEnhancedPlatforms: PlatformId[];
}

export interface GameVariant {
    id: string;
    label: string;
    theme: {
        accent: string;
    };
}
