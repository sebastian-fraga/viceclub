import type { Game } from "@/types/game";

export const GTALCS: Game = {
    id: "LCS",
    title: "Grand Theft Auto: Liberty City Stories",
    theme: {
        accent: {
            default: "#ef4444",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#dc2626",
                hovered: "#7f1d1d",
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
    buttonsPosition: "left",
    trailers: [
        {
            name: "1",
            link: "https://www.youtube.com/watch?v=OHuitRUNDGo",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=dvzqSzvjaA0",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=1EPBoo8JUkU",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=YwLfICXePcc",
        },
        {
            name: "5",
            link: "https://www.youtube.com/watch?v=yAZxHDgFHEc",
        },
    ],
    purchase: [
        {
            platform: "android",
            label: "Android",
            stores: [
                {
                    name: "Google Play",
                    icon: "android",
                    link: "https://play.google.com/store/apps/details?id=com.rockstargames.gtalcs",
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
                    link: "https://apps.apple.com/app/gta-liberty-city-stories/id1061802598",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.lcs.paragraphs.1",

            "home.lcs.paragraphs.2",

            "home.lcs.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA LCS",
        developers: ["Rockstar North", "Rockstar Leeds"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "James Worrall", "David Bland"],
        platforms: [
            "PlayStation Portable",
            "PlayStation 2",
            "iOS",
            "Android",
            "Amazon Fire OS",
        ],
        dates: [
            {
                platforms: ["PlayStation Portable"],
                dates: [
                    {
                        key: "home.lcs.technicalSheet.dates.0",
                        tag: "NA",
                    },
                    {
                        key: "home.lcs.technicalSheet.dates.1",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["PlayStation 2"],
                dates: [
                    {
                        key: "home.lcs.technicalSheet.dates.2",
                        tag: "NA",
                    },
                    {
                        key: "home.lcs.technicalSheet.dates.3",
                        tag: "EU",
                    },
                ],
            },
            {
                platforms: ["iOS"],
                dates: [
                    {
                        key: "home.lcs.technicalSheet.dates.4",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Android"],
                dates: [
                    {
                        key: "home.lcs.technicalSheet.dates.5",
                        tag: "10th",
                    },
                ],
            },
            {
                platforms: ["Amazon Fire OS"],
                dates: [
                    {
                        key: "home.lcs.technicalSheet.dates.6",
                        tag: "10th",
                    },
                ],
            },
        ],
        engines: ["Rockstar Leeds 3D Engine"],
        sales: "home.lcs.technicalSheet.sales",
    },
    platforms: ["ps2", "psp"],
    originalPlatforms: ["ps2", "psp"],
    anniversaryPlatforms: [],
    definitivePlatforms: [],
    enhancedPlatforms: [],
    expandedAndEnhancedPlatforms: [],
};
