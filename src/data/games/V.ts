import type { Game } from "@/types/game";

export const GTAV: Game = {
    id: "V",
    title: "Grand Theft Auto V",
    theme: {
        accent: {
            default: "#6ee7b7",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#bbf7d0",
                hovered: "#4ade80",
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
            link: "https://www.youtube.com/watch?v=QkkoHAzjnUs",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=71OLdbq1SN0",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=HqZXw5M6qQY",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=kfzrQGU6jhM",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=XAOUlsrmzYM",
        },
        {
            name: "6",
            link: "https://www.youtube.com/watch?v=N-xHcvug3WI",
        },
        {
            name: "7",
            link: "https://www.youtube.com/watch?v=hvoD7ehZPcM",
        },
        {
            name: "8",
            link: "https://www.youtube.com/watch?v=olEGtoYs_8A",
        },
        {
            name: "9",
            link: "https://www.youtube.com/watch?v=SbC1etgVNZk",
        },
        {
            name: "10",
            link: "https://www.youtube.com/watch?v=3DBrG2YjqQA",
        },
        {
            name: "11",
            link: "https://www.youtube.com/watch?v=QyoEDelh0Zo",
        },
        {
            name: "12",
            link: "https://www.youtube.com/watch?v=qoytS3930aY",
        },
        {
            name: "13",
            link: "https://www.youtube.com/watch?v=foUaOCzfIRU",
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
                    link: "https://store.steampowered.com/app/3240220/Grand_Theft_Auto_V_Enhanced",
                    extra: "E",
                },
                {
                    name: "Steam",
                    icon: "steam",
                    link: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V_Legacy/",
                    extra: "L",
                },
                {
                    name: "Rockstar Games Launcher",
                    icon: "rgl",
                    link: "https://store.rockstargames.com/game/buy-gta-v",
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
                    link: "https://store.playstation.com/product/UP1004-PPSA03420_00-GTAVCROSSGENBUND",
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
                    link: "https://www.xbox.com/games/store/grand-theft-auto-v-xbox-one/bpj686w6s0nh/",
                    extra: "L",
                },
                {
                    name: "Xbox",
                    icon: "xbox",
                    link: "https://www.xbox.com/games/store/grand-theft-auto-v-xbox-series-xs/9NXMBTB02ZSF/",
                    extra: "E&E",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.v.paragraphs.1",
            "home.v.paragraphs.2",
            "home.v.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA V",
        developers: ["Rockstar North"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "Rupert Humphries", "Michael Unsworth"],
        platforms: [
            "PlayStation 3",
            "Xbox 360",
            "PlayStation 4",
            "Xbox One",
            "Microsoft Windows",
            "PlayStation 5",
            "Xbox Series X/S",
        ],
        dates: [
            {
                platforms: ["PlayStation 3", "Xbox 360"],
                dates: [
                    {
                        key: "home.v.technicalSheet.dates.0",
                    },
                ],
            },
            {
                platforms: ["PlayStation 4", "Xbox One"],
                dates: [
                    {
                        key: "home.v.technicalSheet.dates.1",
                        tag: "E",
                    },
                ],
            },
            {
                platforms: ["Microsoft Windows"],
                dates: [
                    {
                        key: "home.v.technicalSheet.dates.2",
                    },
                ],
            },
            {
                platforms: ["PlayStation 5", "Xbox Series X/S"],
                dates: [
                    {
                        key: "home.v.technicalSheet.dates.3",
                        tag: "E&E",
                    },
                ],
            },
            {
                platforms: ["Microsoft Windows"],
                dates: [
                    {
                        key: "home.v.technicalSheet.dates.4",
                        tag: "E&E",
                    },
                ],
            },
        ],
        engines: ["RAGE"],

        sales: "home.v.technicalSheet.sales",
    },
    platforms: ["ps3", "ps4", "ps5", "xbox360", "xboxOne", "xboxSeries", "pc"],
    originalPlatforms: ["ps3", "xbox360"],
    anniversaryPlatforms: [],
    definitivePlatforms: [],
    enhancedPlatforms: ["ps4", "xboxOne"],
    expandedAndEnhancedPlatforms: ["ps5", "xboxSeries"],
};
