import type { Icon } from "@tabler/icons-react";
import {
    IconClock,
    IconClockFilled,
    IconDeviceGamepad2,
    IconDeviceGamepad2Filled,
    IconHome,
    IconHomeFilled,
    IconListCheck,
    IconMap,
    IconPhoto,
    IconPhotoFilled,
    IconRadio,
    IconTool,
    IconTrophy,
    IconTrophyFilled,
} from "@tabler/icons-react";

export type GameId = "III" | "VC" | "SA" | "LCS" | "VCS" | "IV" | "V" | "VI";

export const GAME_IDS: GameId[] = [
    "III",
    "VC",
    "SA",
    "LCS",
    "VCS",
    "IV",
    "V",
    "VI",
];

export type SectionId =
    | "inicio"
    | "100"
    | "artworks"
    | "herramientas-y-mods"
    | "logros"
    | "mapa"
    | "radio"
    | "trucos"
    | "timeline";

export interface SectionMeta {
    label: string;
    icon: Icon;
    activeIcon?: Icon;
}

export const SECTIONS_METADATA: Record<SectionId, SectionMeta> = {
    inicio: {
        label: "sidebar.sections.home",
        icon: IconHome,
        activeIcon: IconHomeFilled,
    },
    "100": {
        label: "sidebar.sections.checklist",
        icon: IconListCheck,
    },
    artworks: {
        label: "sidebar.sections.artworks",
        icon: IconPhoto,
        activeIcon: IconPhotoFilled,
    },
    "herramientas-y-mods": {
        label: "sidebar.sections.mods",
        icon: IconTool,
    },
    logros: {
        label: "sidebar.sections.achievements",
        icon: IconTrophy,
        activeIcon: IconTrophyFilled,
    },
    mapa: {
        label: "sidebar.sections.map",
        icon: IconMap,
    },
    radio: {
        label: "sidebar.sections.radio",
        icon: IconRadio,
    },
    trucos: {
        label: "sidebar.sections.cheats",
        icon: IconDeviceGamepad2,
        activeIcon: IconDeviceGamepad2Filled,
    },
    timeline: {
        label: "sidebar.sections.timeline",
        icon: IconClock,
        activeIcon: IconClockFilled,
    },
};

export const UNFINISHED_SECTIONS: Partial<Record<GameId, SectionId[]>> = {
    III: ["herramientas-y-mods", "logros", "mapa"],
    VC: ["herramientas-y-mods", "logros", "mapa"],
    SA: ["herramientas-y-mods", "logros", "mapa"],
    LCS: ["mapa"],
    VCS: ["mapa"],
    IV: ["herramientas-y-mods", "logros", "mapa"],
    V: ["herramientas-y-mods", "logros", "mapa"],
};

export const gamesList: { id: GameId; name: string; fullName: string }[] = [
    { id: "III", name: "GTA III", fullName: "Grand Theft Auto III" },
    {
        id: "VC",
        name: "GTA Vice City",
        fullName: "Grand Theft Auto: Vice City",
    },
    {
        id: "SA",
        name: "GTA San Andreas",
        fullName: "Grand Theft Auto: San Andreas",
    },
    {
        id: "LCS",
        name: "GTA Liberty City Stories",
        fullName: "Grand Theft Auto: Liberty City Stories",
    },
    {
        id: "VCS",
        name: "GTA Vice City Stories",
        fullName: "Grand Theft Auto: Vice City Stories",
    },
    { id: "IV", name: "GTA IV", fullName: "Grand Theft Auto IV" },
    { id: "V", name: "GTA V", fullName: "Grand Theft Auto V" },
    { id: "VI", name: "GTA VI", fullName: "Grand Theft Auto VI" },
];

const FULL_SECTIONS: SectionId[] = [
    "inicio",
    "100",
    "artworks",
    "herramientas-y-mods",
    "logros",
    "mapa",
    "radio",
    "trucos",
];

const STORIES_SECTIONS: SectionId[] = [
    "inicio",
    "100",
    "artworks",
    "mapa",
    "radio",
    "trucos",
];

export const GAME_SECTIONS: Record<GameId, SectionId[]> = {
    III: FULL_SECTIONS,
    VC: FULL_SECTIONS,
    SA: FULL_SECTIONS,
    LCS: STORIES_SECTIONS,
    VCS: STORIES_SECTIONS,
    IV: FULL_SECTIONS,
    V: FULL_SECTIONS,
    VI: ["inicio", "artworks", "timeline"],
};
