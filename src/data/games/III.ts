import type { Game } from "@/types/game";

export const GTAIII: Game = {
    id: "III",
    title: "Grand Theft Auto III",
    theme: {
        accent: {
            default: "#fff085",
            muted: "#dfda33aa",
        },
        buttons: {
            primary: {
                background: "#fff085",
                hovered: "oklch(90.5% 0.182 98.111) ",
                text: "#432004",
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
            link: "https://www.youtube.com/watch?v=ygdtkkCFxkE",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=lCyiW882D7U",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=A7X4_ejQSWE",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=Z6YY3m1cA84",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=0VxoWT0MyLE",
        },
        {
            name: "6",
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
                    link: "https://store.steampowered.com/app/1546970/Grand_Theft_Auto_III__The_Definitive_Edition/",
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
                    link: "https://play.google.com/store/apps/details?id=com.rockstar.gta3",
                    extra: "10th",
                },
                {
                    name: "Google Play",
                    icon: "android",
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gta3.de",
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
                    link: "https://apps.apple.com/app/grand-theft-auto-iii/id479662730",
                    extra: "10th",
                },
                {
                    name: "App Store",
                    icon: "ios",
                    link: "https://apps.apple.com/app/grand-theft-auto-iii/id479662730",
                    extra: "DE",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.iii.paragraphs.1",
            "home.iii.paragraphs.2",
            "home.iii.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA III",
        developers: ["DMA Design"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "James Worrall", "Paul Kurowski"],
        platforms: [
            "PlayStation 2",
            "Xbox",
            "Microsoft Windows",
            "macOS",
            "Android",
            "iOS",
            "PlayStation 3",
            "Amazon Fire OS",
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
                        key: "home.iii.technicalSheet.dates.0",
                        tag: "NA",
                    },
                    {
                        key: "home.iii.technicalSheet.dates.1",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Microsoft Windows"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.2",
                        tag: "NA",
                    },
                    {
                        key: "home.iii.technicalSheet.dates.3",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Xbox"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.4",
                        tag: "NA",
                    },
                    {
                        key: "home.iii.technicalSheet.dates.5",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["macOS"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.6",
                    },
                ],
            },
            {
                platforms: ["Android", "iOS"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.7",
                        tag: "10TH",
                    },
                ],
            },
            {
                platforms: ["PlayStation 3"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.8",
                        tag: "NA",
                    },
                    {
                        key: "home.iii.technicalSheet.dates.9",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Amazon Fire OS"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.10",
                        tag: "10TH",
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
                        key: "home.iii.technicalSheet.dates.11",
                        tag: "DE",
                    },
                ],
            },
            {
                platforms: ["Android", "iOS"],
                dates: [
                    {
                        key: "home.iii.technicalSheet.dates.12",
                        tag: "DE",
                    },
                ],
            },
        ],
        engines: ["RenderWare", "Unreal Engine (DE)"],

        sales: "home.iii.technicalSheet.sales",
    },
};
