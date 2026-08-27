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
                hovered: "#525252",
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
                accent: "#e5e5e5",
            },
        },
        {
            id: "TLAD",
            label: "The Lost and Damned",
            theme: {
                accent: "#f00",
            },
        },
        {
            id: "TBOGT",
            label: "The Ballad of Gay Tony",
            theme: {
                accent: "#f3f",
            },
        },
    ],
    buttonsPosition: "left",
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
    platforms: [],
    originalPlatforms: [],
    anniversaryPlatforms: [],
    definitivePlatforms: [],
    enhancedPlatforms: [],
    expandedAndEnhancedPlatforms: [],
};
