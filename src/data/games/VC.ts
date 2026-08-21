import type { Game } from "@/types/game";

export const GTAVC: Game = {
    id: "VC",
    title: "Grand Theft Auto: Vice City",
    theme: {
        accent: {
            default: "#fbb6ce",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#fbb6ce",
                hovered: "#f472b6",
                text: "#500724",
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
            link: "https://www.youtube.com/watch?v=IlZZDQIYRyg",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=Mnb-tmlTSqU",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=iTxmx0SG0qU",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=BcqMaYdYow0",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=Q6HfCTEuGqY",
        },
        {
            name: "6",
            link: "https://www.youtube.com/watch?v=f_VBXRZuHTc",
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
                    link: "https://store.steampowered.com/app/1546990/Grand_Theft_Auto_Vice_City__The_Definitive_Edition/",
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
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gtavc",
                    extra: "10th",
                },
                {
                    name: "Google Play",
                    icon: "android",
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gtavc.de",
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
                    link: "https://apps.apple.com/us/app/grand-theft-auto-vice-city/id578448682",
                    extra: "10th",
                },
                {
                    name: "App Store",
                    icon: "ios",
                    link: "https://apps.apple.com/us/app/gta-vice-city-definitive/id6468845173",
                    extra: "DE",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.vc.paragraphs.1",
            "home.vc.paragraphs.2",
            "home.vc.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA VC",
        developers: ["Rockstar North"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "James Worrall"],
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
                        key: "home.vc.technicalSheet.dates.0",
                        tag: "NA",
                    },
                    {
                        key: "home.vc.technicalSheet.dates.1",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Microsoft Windows"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.2",
                        tag: "NA",
                    },
                    {
                        key: "home.vc.technicalSheet.dates.3",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Xbox"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.4",
                        tag: "NA",
                    },
                    {
                        key: "home.vc.technicalSheet.dates.5",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["macOS"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.6",
                        tag: "NA",
                    },
                ],
            },
            {
                platforms: ["iOS"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.7",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Android"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.8",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["PlayStation 3"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.9",
                        tag: "NA",
                    },
                    {
                        key: "home.vc.technicalSheet.dates.10",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["Amazon Fire OS"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.11",
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
                        key: "home.vc.technicalSheet.dates.12",
                        tag: "DE",
                    },
                ],
            },
            {
                platforms: ["Android", "iOS"],
                dates: [
                    {
                        key: "home.vc.technicalSheet.dates.13",
                        tag: "DE",
                    },
                ],
            },
        ],
        engines: ["RenderWare", "Unreal Engine (DE)"],

        sales: "home.vc.technicalSheet.sales",
    },
};
