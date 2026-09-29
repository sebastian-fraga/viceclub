import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "VC",
    mods: [
        {
            id: "silent-patch",
            title: "Silent Patch",
            category: "essentials",
            shortDescription:
                "Parche de correcciones que mejora la estabilidad, compatibilidad y funcionamiento de GTA Vice City sin alterar su versión original",
            description:
                "Parche de correcciones que soluciona numerosos bugs, crasheos, problemas de compatibilidad y errores de lógica, además de restaurar comportamientos y detalles que no funcionaban correctamente en el juego original. Está diseñado para mejorar la estabilidad y compatibilidad sin alterar la experiencia de juego original.",
            version: "12.1",
            author: ["Silent"],
            installSteps: [
                {
                    title: "Descargar el mod",
                    description:
                        "Descargar el archivo <code>SilentPatchVC.zip</code> en Github",
                },
                {
                    title: "Extraer la carpeta",
                    description:
                        "Extraer la carpeta descargada con un programa como WinRAR o 7-Zip.",
                },
                {
                    title: "Localizar la carpeta del juego",
                    description:
                        "Abrir en el explorador de archivos la carpeta raíz donde esté instalado el juego",
                },
                {
                    title: "Mover los archivos",
                    description:
                        "Colocar todos los archivos en la carpeta del juego, y en caso de pedirlo, reemplazar archivos",
                },
                {
                    title: "(OPCIONAL)",
                    description:
                        "Editar el archivo <code>SilentPatchVC.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://silentsblog.com/mods/gta-vc/#silentpatch",
            downloadUrl:
                "https://github.com/CookiePLMonster/SilentPatch/releases/tag/1.1-BUILD34.1-SA",
            isFeatured: true,
        },
        {
            id: "widescreen-fix",
            title: "Widescreen Fix",
            category: "essentials",
            shortDescription:
                "Añade compatibilidad adecuada con pantallas panorámicas y ultrapanorámicas",
            description:
                "Mod que corrige la relación de aspecto, el HUD, el campo de visión y el formato de las cinemáticas para adaptar GTA Vice City a resoluciones modernas, incluyendo pantallas ultrapanorámicas.",
            author: ["ThirteenAG"],
            installSteps: [
                {
                    title: "Descargar el mod",
                    description:
                        "Descargar el archivo <code>GTAVC.WidescreenFix.zip</code> en Github",
                },
                {
                    title: "Extraer la carpeta",
                    description:
                        "Extraer la carpeta descargada con un programa como WinRAR o 7-Zip.",
                },
                {
                    title: "Localizar la carpeta del juego",
                    description:
                        "Abrir en el explorador de archivos la carpeta raíz donde esté instalado el juego",
                },
                {
                    title: "Mover los archivos",
                    description:
                        "Mover la carpeta <code>/scripts/</code> y el archivo <code>d3d8.dll</code> a la carpeta raíz del juego, y en caso de pedirlo, reemplazar archivos",
                },
                {
                    title: "(OPCIONAL)",
                    description:
                        "Editar el archivo <code>GTAVC.WidescreenFix.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://fusionfix.io/wfp#gtavc",
            downloadUrl:
                "https://github.com/ThirteenAG/WidescreenFixesPack/releases/tag/gtavc",
        },
        {
            id: "tightened-vice",
            title: "Tightened Vice",
            category: "totalConversion",
            shortDescription: "",
            description: "",
            version: "2.5",
            author: ["_Rob_"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "",
            downloadUrl: "",
        },
        {
            id: "mod-loader",
            title: "Mod Loader",
            category: "essentials",
            shortDescription: "",
            description: "",
            version: "0.3.10",
            author: ["thelink2012"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "",
            downloadUrl: "",
        },
        {
            id: "framerate-vigilante",
            title: "Framerate Vigilante",
            category: "essentials",
            shortDescription: "",
            description: "",
            author: ["JuniorDjjr"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2022/08/iii-vc-sa-framerate-vigilante/",
            downloadUrl: "",
        },
        {
            id: "skygfx",
            title: "SkyGFX",
            category: "graphics",
            shortDescription: "",
            description: "",
            version: "3.0b",
            author: ["aap"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://gtaforums.com/topic/750681-skygfx-ps2-xbox-and-mobile-graphics-for-pc/",
            downloadUrl: "",
        },
        {
            id: "ginput",
            title: "GInput",
            category: "essentials",
            shortDescription: "",
            description: "",
            author: ["Silent"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "",
            downloadUrl: "",
        },
        {
            id: "magic-txd",
            title: "Magic.TXD",
            category: "utils",
            shortDescription: "",
            description: "",
            author: ["DK22Pac", "The_GTA"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "",
            downloadUrl: "",
        },
        {
            id: "renderhook",
            title: "RenderHook",
            category: "graphics",
            shortDescription: "",
            description: "",
            author: ["PetkaGTA"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "",
            downloadUrl: "",
        },
        {
            id: "project2dfx",
            title: "Project2DFX",
            category: "graphics",
            shortDescription: "",
            description: "",
            author: ["ThirteenAG"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://github.com/ThirteenAG/III.VC.SA.IV.Project2DFX/releases/tag/gtavc",
            downloadUrl: "",
        },
        {
            id: "mixsets",
            title: "MixSets",
            category: "gameplay",
            shortDescription: "",
            description: "",
            version: "1.0.3",
            author: ["Junior_Djjr"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2021/04/vc-mixsets-v1-0-3/",
            downloadUrl: "",
        },
        {
            id: "open-limit-adjuster",
            title: "Open Limit Adjuster",
            category: "essentials",
            shortDescription: "",
            description: "",
            version: "1.7",
            author: ["LINK/2012", "ThirteenAG", "Blackbird88"],
            installSteps: [
                {
                    title: "",
                    description: "",
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2022/10/open-limit-adjuster/",
            downloadUrl: "",
        },
    ],
};

export default mods;
