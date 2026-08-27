import { platformFamilies, type PlatformFamily } from "@/config/platforms";
import type { ButtonIcons } from "@/types/cheats";

export const PLATFORM_STORAGE_KEY = "viceclub_selected_platform";

const createButtonIcons = (buttons: string[], family: PlatformFamily) => {
    const bg = platformFamilies[family].background;
    return Object.fromEntries(
        buttons.map((button) => [
            button,
            {
                icon: `${button}.webp`,
                bg,
            },
        ]),
    );
};

export const BUTTON_ICONS: ButtonIcons = {
    ps2: createButtonIcons(
        [
            "R1",
            "R2",
            "L1",
            "L2",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "CIRCLE",
            "CROSS",
            "SQUARE",
            "TRIANGLE",
        ],
        "playstation",
    ),
    psp: createButtonIcons(
        [
            "R",
            "L",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "CIRCLE",
            "CROSS",
            "SQUARE",
            "TRIANGLE",
        ],
        "playstation",
    ),
    ps3: createButtonIcons(
        [
            "R1",
            "R2",
            "L1",
            "L2",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "CIRCLE",
            "CROSS",
            "SQUARE",
            "TRIANGLE",
        ],
        "playstation",
    ),
    ps4: createButtonIcons(
        [
            "R1",
            "R2",
            "L1",
            "L2",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "CIRCLE",
            "CROSS",
            "SQUARE",
            "TRIANGLE",
        ],
        "playstation",
    ),

    xbox: createButtonIcons(
        [
            "BLACK",
            "RT",
            "WHITE",
            "LT",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "A",
            "B",
            "X",
            "Y",
        ],
        "xbox",
    ),
    xbox360: createButtonIcons(
        [
            "RB",
            "RT",
            "LB",
            "LT",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "A",
            "B",
            "X",
            "Y",
        ],
        "xbox",
    ),
    xboxOne: createButtonIcons(
        [
            "RB",
            "RT",
            "LB",
            "LT",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "A",
            "B",
            "X",
            "Y",
        ],
        "xbox",
    ),

    switch: createButtonIcons(
        [
            "ZL",
            "ZR",
            "L",
            "R",
            "UP",
            "DOWN",
            "LEFT",
            "RIGHT",
            "A",
            "B",
            "X",
            "Y",
        ],
        "nintendo",
    ),
} as const;
