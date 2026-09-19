import type { Game } from "@/types/game";

export const GTAIV: Game = {
    id: "IV",
    title: "Grand Theft Auto IV",
    theme: {
        accent: {
            default: "#e5e5e5",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#a3a3a3",
                hovered: "#999696",
                text: "#000",
            },
            secondary: {
                background: "#00000000",
                border: "#ffffff80",
                hovered: "#ffffff26",
                text: "#fff",
            },
        },
    },
    variants: [
        {
            id: "IV",
            label: "GTA IV",
            theme: {
                accent: {
                    default: "#e5e5e5",
                    muted: "",
                },
                buttons: {
                    primary: {
                        background: "#a3a3a3",
                        hovered: "#999696",
                        text: "#000",
                    },
                    secondary: {
                        background: "#00000000",
                        border: "#ffffff80",
                        hovered: "#ffffff26",
                        text: "#fff",
                    },
                },
            },
            description: {
                paragraphs: [
                    "home.iv.paragraphs.1",
                    "home.iv.paragraphs.2",
                    "home.iv.paragraphs.3",
                    "home.iv.paragraphs.4",
                ],
            },
            technicalSheet: {
                title: "GTA IV",
                developers: ["Rockstar North"],
                publisher: "Rockstar Games",
                producer: "Leslie Benzies",
                writers: ["Dan Houser", "Rupert Humphries"],
                platforms: ["PlayStation 3", "Xbox 360", "Microsoft Windows"],
                dates: [
                    {
                        platforms: ["PlayStation 3", "Xbox 360"],
                        dates: [
                            {
                                key: "home.iv.technicalSheet.dates.0",
                            },
                        ],
                    },
                    {
                        platforms: ["Microsoft Windows"],
                        dates: [
                            {
                                key: "home.iv.technicalSheet.dates.1",
                                tag: "NA",
                            },
                            {
                                key: "home.iv.technicalSheet.dates.2",
                                tag: "EU",
                            },
                        ],
                    },
                ],
                engines: ["RAGE"],

                sales: "home.iv.technicalSheet.sales",
            },
        },
        {
            id: "TLAD",
            label: "The Lost and Damned",
            theme: {
                accent: {
                    default: "#D41B23",
                    muted: "",
                },
                buttons: {
                    primary: {
                        background: "#D41B23",
                        hovered: "#b8171e",
                        text: "#fff",
                    },
                    secondary: {
                        background: "#00000000",
                        border: "#ffffff80",
                        hovered: "#ffffff26",
                        text: "#fff",
                    },
                },
            },
            trailers: [
                {
                    name: "1",
                    link: "https://www.youtube.com/watch?v=FW2sTQuz6l8",
                },
                {
                    name: "2",
                    link: "https://www.youtube.com/watch?v=tshPSxS9dGY",
                },
                {
                    name: "3",
                    link: "https://www.youtube.com/watch?v=0ZY9evuTOUE",
                },
                {
                    name: "4",
                    link: "https://www.youtube.com/watch?v=qbIzfyuRY-A",
                },
                {
                    name: "5",
                    link: "https://www.youtube.com/watch?v=fZ24THhprFQ",
                },
                {
                    name: "6",
                    link: "https://www.youtube.com/watch?v=Oaa846BQzsk",
                },
                {
                    name: "7",
                    link: "https://www.youtube.com/watch?v=GK5xAtCXVf0",
                },
            ],
            purchase: [
                {
                    platform: "pc",
                    label: "PC",
                    stores: [
                        {
                            name: "Steam",
                            icon: "steam",
                            link: "https://store.steampowered.com/app/12210/Grand_Theft_Auto_IV_The_Complete_Edition/",
                            extra: "TCE",
                        },
                        {
                            name: "Rockstar Games Launcher",
                            icon: "rgl",
                            link: "https://store.rockstargames.com/game/buy-grand-theft-auto-iv/",
                            extra: "TCE",
                        },
                    ],
                },
                {
                    platform: "xbox",
                    label: "Xbox",
                    stores: [
                        {
                            name: "Xbox",
                            icon: "xbox",
                            link: "https://www.xbox.com/games/store/gta-iv-the-lost-and-damned/btfvlwb7fg8h",
                        },
                    ],
                },
            ],
            description: {
                paragraphs: [
                    "home.tlad.paragraphs.1",
                    "home.tlad.paragraphs.2",
                    "home.tlad.paragraphs.3",
                ],
            },
            technicalSheet: {
                title: "TLAD",
                developers: ["Rockstar North"],
                publisher: "Rockstar Games",
                producer: "Leslie Benzies",
                writers: ["Dan Houser", "Rupert Humphries"],
                platforms: ["Xbox 360", "PlayStation 3", "Microsoft Windows"],
                dates: [
                    {
                        platforms: ["Xbox 360"],
                        dates: [
                            {
                                key: "home.tlad.technicalSheet.dates.0",
                            },
                        ],
                    },
                    {
                        platforms: ["PlayStation 3", "Microsoft Windows"],
                        dates: [
                            {
                                key: "home.tlad.technicalSheet.dates.1",
                                tag: "NA",
                            },
                            {
                                key: "home.tlad.technicalSheet.dates.2",
                                tag: "EU",
                            },
                        ],
                    },
                ],
                engines: ["RAGE"],
            },
        },
        {
            id: "TBOGT",
            label: "The Ballad of Gay Tony",
            theme: {
                accent: {
                    default: "#F0E95B",
                    muted: "",
                },
                buttons: {
                    primary: {
                        background: "#F0E95B",
                        hovered: "#d8d04f",
                        text: "#000",
                    },
                    secondary: {
                        background: "#00000000",
                        border: "#ffffff80",
                        hovered: "#ffffff26",
                        text: "#fff",
                    },
                },
            },
            trailers: [
                {
                    name: "1",
                    link: "https://www.youtube.com/watch?v=fcDY7SCLWcc",
                },
                {
                    name: "2",
                    link: "https://www.youtube.com/watch?v=RnKqwWin6jo",
                },
                {
                    name: "3",
                    link: "https://www.youtube.com/watch?v=3NaYcBl314M",
                },
                {
                    name: "4",
                    link: "https://www.youtube.com/watch?v=LMKvTd7aNsU",
                },
                {
                    name: "5",
                    link: "https://www.youtube.com/watch?v=Oaa846BQzsk",
                },
                {
                    name: "6",
                    link: "https://www.youtube.com/watch?v=GK5xAtCXVf0",
                },
            ],
            purchase: [
                {
                    platform: "pc",
                    label: "PC",
                    stores: [
                        {
                            name: "Steam",
                            icon: "steam",
                            link: "https://store.steampowered.com/app/12210/Grand_Theft_Auto_IV_The_Complete_Edition/",
                            extra: "TCE",
                        },
                        {
                            name: "Rockstar Games Launcher",
                            icon: "rgl",
                            link: "https://store.rockstargames.com/game/buy-grand-theft-auto-iv/",
                            extra: "TCE",
                        },
                    ],
                },
                {
                    platform: "xbox",
                    label: "Xbox",
                    stores: [
                        {
                            name: "Xbox",
                            icon: "xbox",
                            link: "https://www.xbox.com/games/store/grand-theft-auto-the-ballad-of-gay-tony/bvblsm9ldmz0",
                        },
                    ],
                },
            ],
            description: {
                paragraphs: [
                    "home.tbogt.paragraphs.1",
                    "home.tbogt.paragraphs.2",
                    "home.tbogt.paragraphs.3",
                ],
            },
            technicalSheet: {
                title: "TBOGT",
                developers: ["Rockstar North"],
                publisher: "Rockstar Games",
                producer: "Leslie Benzies",
                writers: ["Dan Houser", "Rupert Humphries"],
                platforms: ["Xbox 360", "PlayStation 3", "Microsoft Windows"],
                dates: [
                    {
                        platforms: ["Xbox 360"],
                        dates: [
                            {
                                key: "home.tbogt.technicalSheet.dates.0",
                            },
                        ],
                    },
                    {
                        platforms: ["PlayStation 3", "Microsoft Windows"],
                        dates: [
                            {
                                key: "home.tbogt.technicalSheet.dates.1",
                                tag: "NA",
                            },
                            {
                                key: "home.tbogt.technicalSheet.dates.2",
                                tag: "EU",
                            },
                        ],
                    },
                ],
                engines: ["RAGE"],
            },
        },
    ],
    description: {
        paragraphs: [
            "home.iv.paragraphs.1",
            "home.iv.paragraphs.2",
            "home.iv.paragraphs.3",
            "home.iv.paragraphs.4",
        ],
    },
    trailers: [
        {
            name: "1",
            link: "https://www.youtube.com/watch?v=M80K51DosFo",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=kOZ8bRAO7YQ",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=lJIxpjXKd1g",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=mNrm7wqnpVI",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=zW8cZmaBUFk",
        },
        {
            name: "6",
            link: "https://www.youtube.com/watch?v=Fh2egiqQY8A",
        },
    ],
    purchase: [
        {
            platform: "pc",
            label: "PC",
            stores: [
                {
                    name: "Steam",
                    icon: "steam",
                    link: "https://store.steampowered.com/app/12210/Grand_Theft_Auto_IV_The_Complete_Edition/",
                },
                {
                    name: "Rockstar Games Launcher",
                    icon: "rgl",
                    link: "https://store.rockstargames.com/game/buy-grand-theft-auto-iv/",
                },
            ],
        },
        {
            platform: "xbox",
            label: "Xbox",
            stores: [
                {
                    name: "Xbox",
                    icon: "xbox",
                    link: "https://www.xbox.com/games/store/grand-theft-auto-iv/brq2sczctxf2/",
                },
            ],
        },
    ],
    technicalSheet: {
        title: "GTA IV",
        developers: ["Rockstar North"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "Rupert Humphries"],
        platforms: ["PlayStation 3", "Xbox 360", "Microsoft Windows"],
        dates: [
            {
                platforms: ["PlayStation 3", "Xbox 360"],
                dates: [
                    {
                        key: "home.iv.technicalSheet.dates.0",
                    },
                ],
            },
            {
                platforms: ["Microsoft Windows"],
                dates: [
                    {
                        key: "home.iv.technicalSheet.dates.1",
                        tag: "NA",
                    },
                    {
                        key: "home.iv.technicalSheet.dates.2",
                        tag: "EU",
                    },
                ],
            },
        ],
        engines: ["RAGE"],

        sales: "home.iv.technicalSheet.sales",
    },
    platforms: [],
    originalPlatforms: [],
    anniversaryPlatforms: [],
    definitivePlatforms: [],
    enhancedPlatforms: [],
    expandedAndEnhancedPlatforms: [],
};
