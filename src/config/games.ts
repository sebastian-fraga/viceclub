import type { Icon } from "@tabler/icons-react";
import {
    IconClock,
    IconDeviceGamepad2,
    IconHome,
    IconListCheck,
    IconMap,
    IconPhoto,
    IconRadio,
    IconTool,
    IconTrophy,
} from "@tabler/icons-react";

export type GameId = "III" | "VC" | "SA" | "LCS" | "VCS" | "IV" | "V" | "VI";

export type SectionId =
    | "inicio"
    | "100"
    | "artworks"
    | "herramientas_y_mods"
    | "logros"
    | "mapa"
    | "radio"
    | "trucos"
    | "timeline";

export interface SectionMeta {
    label: string;
    icon: Icon;
}

export const SECTIONS_METADATA: Record<SectionId, SectionMeta> = {
    inicio: {
        label: "sidebar.sections.home",
        icon: IconHome,
    },
    "100": {
        label: "sidebar.sections.checklist",
        icon: IconListCheck,
    },
    artworks: {
        label: "sidebar.sections.artworks",
        icon: IconPhoto,
    },
    herramientas_y_mods: {
        label: "sidebar.sections.mods",
        icon: IconTool,
    },
    logros: {
        label: "sidebar.sections.achievements",
        icon: IconTrophy,
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
    },
    timeline: {
        label: "sidebar.sections.timeline",
        icon: IconClock,
    },
};

export const UNFINISHED_SECTIONS: Partial<Record<GameId, SectionId[]>> = {
    III: ["100", "artworks", "herramientas_y_mods", "logros", "mapa", "trucos"],
    VC: ["100", "artworks", "herramientas_y_mods", "logros", "mapa", "trucos"],
    SA: ["100", "artworks", "herramientas_y_mods", "logros", "mapa", "trucos"],
    LCS: ["100", "artworks", "mapa", "trucos"],
    VCS: ["100", "artworks", "mapa", "trucos"],
    IV: ["100", "artworks", "herramientas_y_mods", "logros", "mapa", "trucos"],
    V: ["100", "artworks", "herramientas_y_mods", "logros", "mapa", "trucos"],
};

export const gamesList: { id: GameId; name: string }[] = [
    { id: "III", name: "GTA III" },
    { id: "VC", name: "GTA Vice City" },
    { id: "SA", name: "GTA San Andreas" },
    { id: "LCS", name: "GTA Liberty City Stories" },
    { id: "VCS", name: "GTA Vice City Stories" },
    { id: "IV", name: "GTA IV" },
    { id: "V", name: "GTA V" },
    { id: "VI", name: "GTA VI" },
];

const FULL_SECTIONS: SectionId[] = [
    "inicio",
    "100",
    "artworks",
    "herramientas_y_mods",
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
    VI: ["inicio", "timeline"],
};
