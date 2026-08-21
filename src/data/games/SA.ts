import type { Game } from "@/types/game";

export const GTASA: Game = {
    id: "SA",
    title: "Grand Theft Auto: San Andreas",
    theme: {
        accent: {
            default: "#bef264",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#a3e635",
                hovered: "#65a30d",
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
    buttonsPosition: "left",
    trailers: [
        {
            name: "1",
            link: "https://www.youtube.com/watch?v=Wf-lPtfhCrQ",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=yOzcbtsw_pQ",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=Cn_aeG6xUkk",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=jFTXRoM50XE",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=daw8xhaGj2s",
        },
        {
            name: "6",
            link: "https://www.youtube.com/watch?v=vk-R_8i5jpI",
        },
        {
            name: "7",
            link: "https://www.youtube.com/watch?v=D71cBUeAL58",
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
                    link: "https://store.steampowered.com/app/1547000/Grand_Theft_Auto_San_Andreas__The_Definitive_Edition/",
                },
                {
                    name: "Rockstar Games Launcher",
                    icon: "rgl",
                    link: "https://store.rockstargames.com/game/buy-grand-theft-auto-the-trilogy-the-definitive-edition",
                },
            ],
        },
        {
            platform: "playstation",
            label: "PlayStation",
            stores: [
                {
                    name: "PlayStation Store",
                    icon: "playstation",
                    link: "https://store.playstation.com/concept/10003543/",
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
                    link: "https://www.microsoft.com/store/productid/9MXMJFNZMVWD",
                },
            ],
        },
        {
            platform: "nintendo",
            label: "Nintendo",
            stores: [
                {
                    name: "Nintendo eShop",
                    icon: "switch",
                    link: "https://www.nintendo.com/store/products/grand-theft-auto-the-trilogy-the-definitive-edition-switch/",
                },
            ],
        },
        {
            platform: "android",
            label: "Android",
            stores: [
                {
                    name: "Google Play",
                    icon: "android",
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gtasa",
                    extra: "10th",
                },
                {
                    name: "Google Play",
                    icon: "android",
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gtasa.de",
                    extra: "DE",
                },
            ],
        },
        {
            platform: "ios",
            label: "iOS",
            stores: [
                {
                    name: "App Store",
                    icon: "ios",
                    link: "https://apps.apple.com/us/app/grand-theft-auto-san-andreas/id763692274",
                    extra: "10th",
                },
                {
                    name: "App Store",
                    icon: "ios",
                    link: "https://apps.apple.com/us/app/gta-san-andreas-definitive/id6468845068",
                    extra: "DE",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.sa.paragraphs.1",
            "home.sa.paragraphs.2",
            "home.sa.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA SA",
        developers: ["Rockstar North"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "James Worrall", "DJ Pooh"],
        platforms: [
            "PlayStation 2",
            "Xbox",
            "Microsoft Windows",
            "macOS",
            "Android",
            "iOS",
            "Amazon Fire OS",
            "Windows Phone",
            "PlayStation 3",
            "PlayStation 4",
            "PlayStation 5",
            "Xbox Series X/S",
            "Nintendo Switch",
        ],
        dates: [
            {
                platforms: ["PlayStation 2"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.0",
                        tag: "NA",
                    },
                    {
                        key: "home.sa.technicalSheet.dates.1",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Xbox", "Microsoft Windows"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.2",
                        tag: "NA",
                    },
                    {
                        key: "home.sa.technicalSheet.dates.3",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["macOS"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.4",
                    },
                ],
            },
            {
                platforms: ["iOS"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.5",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Android"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.6",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Windows Phone"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.7",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Amazon Fire OS"],

                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.8",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Xbox 360"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.9",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["PlayStation 3"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.10",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: [
                    "PlayStation 4, PlayStation 5",
                    "Xbox One, Xbox Series X/S",
                    "Microsoft Windows",
                    "Nintendo Switch",
                ],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.11",
                        tag: "DE",
                    },
                ],
            },
            {
                platforms: ["Android", "iOS"],
                dates: [
                    {
                        key: "home.sa.technicalSheet.dates.12",
                        tag: "DE",
                    },
                ],
            },
        ],
        engines: ["RenderWare", "Unreal Engine (DE)"],

        sales: "home.sa.technicalSheet.sales",
    },
};
