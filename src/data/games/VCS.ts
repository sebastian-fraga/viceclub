import type { Game } from "@/types/game";

export const GTAVCS: Game = {
    id: "VCS",
    title: "Grand Theft Auto: Vice City Stories",
    theme: {
        accent: {
            default: "#818cf8",
            muted: "",
        },
        buttons: {
            primary: {
                background: "#6366f1",
                hovered: "#4338ca",
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
            link: "https://www.youtube.com/watch?v=iP7fIzDH6nY",
        },
        {
            name: "2",
            link: "https://www.youtube.com/watch?v=vEZzUMjSl8E",
        },
        {
            name: "3",
            link: "https://www.youtube.com/watch?v=MzyANPlyOJ0",
        },
        {
            name: "4",
            link: "https://www.youtube.com/watch?v=T0Q34opxheU",
        },
    ],
    purchase: [],
    description: {
        paragraphs: ["home.vcs.paragraphs.1", "home.vcs.paragraphs.2"],
    },
    technicalSheet: {
        title: "GTA VCS",
        developers: ["Rockstar North", "Rockstar Leeds"],
        publisher: "Rockstar Games",
        producer: "Leslie Benzies",
        writers: ["Dan Houser", "David Bland"],
        platforms: ["PlayStation Portable", "PlayStation 2"],
        dates: [
            {
                platforms: ["PlayStation Portable"],
                dates: [
                    {
                        key: "home.vcs.technicalSheet.dates.0",
                        tag: "NA",
                    },
                    {
                        key: "home.vcs.technicalSheet.dates.1",
                        tag: "EU",
                    },
                    {
                        key: "home.vcs.technicalSheet.dates.2",
                        tag: "AU",
                    },
                ],
            },
            {
                platforms: ["PlayStation 2"],
                dates: [
                    {
                        key: "home.vcs.technicalSheet.dates.3",
                        tag: "NA",
                    },
                    {
                        key: "home.vcs.technicalSheet.dates.4",
                        tag: "EU",
                    },
                ],
            },
        ],
        engines: ["Rockstar Leeds 3D Engine"],

        sales: "home.vcs.technicalSheet.sales",
    },
};
