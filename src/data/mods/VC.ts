import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "VC",
    mods: [
        {
            id: "silent-patch",
            title: "Silent Patch",
            category: "utils",
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
            category: "utils",
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
    ],
};

export default mods;
