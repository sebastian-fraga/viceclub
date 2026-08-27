import type { Game } from "@/types/game";

export const GTAVI: Game = {
    id: "VI",
    title: "Grand Theft Auto VI",
    theme: {
        accent: {
            default: "#ddd6fe",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#a5b4fc",
                hovered: "#6366f1",
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
            link: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=VQRLujxTm3c",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=EiQEBYDox_k",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=qq76pQsI1iw",
        },
    ],
    purchase: [
        {
            platform: "playstation",
            label: "PlayStation",
            stores: [
                {
                    name: "PlayStation Store",
                    icon: "playstation",
                    link: "https://www.playstation.com/games/grand-theft-auto-vi/",
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
                    link: "https://www.xbox.com/games/store/grand-theft-auto-vi/9NL3WWNZLZZN/0010",
                },
            ],
        },
    ],
    description: {
        paragraphs: [
            "home.vi.paragraphs.1",
            "home.vi.paragraphs.2",
            "home.vi.paragraphs.3",
        ],
    },
    technicalSheet: {
        title: "GTA VI",
        developers: ["Rockstar Games"],
        publisher: "Rockstar Games",
        producer: "?",
        writers: ["?"],
        platforms: ["PlayStation 5", "Xbox Series X/S"],
        dates: [
            {
                platforms: ["PlayStation 5", "Xbox Series X/S"],
                dates: [
                    {
                        key: "home.vi.technicalSheet.dates.0",
                    },
                ],
            },
        ],
        engines: ["RAGE"],
    },
    platforms: ["ps5", "xboxSeries"],
    originalPlatforms: [],
    anniversaryPlatforms: [],
    definitivePlatforms: [],
    enhancedPlatforms: [],
    expandedAndEnhancedPlatforms: [],
};
