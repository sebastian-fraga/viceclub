import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "IV",
    mods: [
        {
            id: "fusion-fix",
            title: "Fusion Fix",
            category: "essentials",
            shortDescription: {
                es: "Proyecto integral que corrige fallos técnicos, restaura efectos visuales recortados y optimiza el rendimiento de GTA IV en PC.",
                en: "Comprehensive fix project resolving technical bugs, restoring cut visual effects, and optimizing overall GTA IV PC performance.",
                fr: "Projet correctif global résolvant les bugs techniques, restaurant les effets visuels coupés et optimisant GTA IV sur PC.",
                pt: "Projeto abrangente que corrige falhas técnicas, restaura efeitos visuais e otimiza o desempenho geral de GTA IV no PC.",
            },
            description: {
                es: "Solución definitiva para GTA IV: The Complete Edition que soluciona crasheos, problemas a altos FPS y bugs de iluminación/shaders. Restaura funciones y detalles gráficos de consolas mientras añade opciones avanzadas de postprocesamiento, todo integrado de forma nativa en el menú del juego.",
                en: "The definitive fix for GTA IV: The Complete Edition, addressing crashes, high-framerate issues, and shader glitches. Restores console-exclusive visual details and introduces modern post-processing options, all seamless from the in-game menu.",
                fr: "Correctif ultime pour GTA IV: The Complete Edition, résolvant les plantages, soucis à taux de rafraîchissement élevé et bugs de shaders. Restaure les détails visuels des consoles et ajoute des options de post-traitement modernes via le menu.",
                pt: "A solução definitiva para GTA IV: The Complete Edition, corrigindo travamentos, falhas em alta taxa de quadros e bugs de iluminação. Restaura detalhes gráficos dos consoles e adiciona opções avançadas de pós-processamento no próprio menu.",
            },
            version: "5.0.1",
            author: ["ThirteenAG"],
            installSteps: [
                {
                    title: {
                        es: "Descargar el mod",
                        en: "Download the mod",
                        fr: "Télécharger le mod",
                        pt: "Baixar o mod",
                    },
                    description: {
                        es: "Descargar el archivo <code>GTAIV.EFLC.FusionFix.zip</code> en Github",
                        en: "Download the <code>GTAIV.EFLC.FusionFix.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>GTAIV.EFLC.FusionFix.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>GTAIV.EFLC.FusionFix.zip</code> no GitHub",
                    },
                },
                {
                    title: {
                        es: "Extraer la carpeta",
                        en: "Extract the folder",
                        fr: "Extraire le dossier",
                        pt: "Extrair a pasta",
                    },
                    description: {
                        es: "Extraer la carpeta descargada con un programa como WinRAR o 7-Zip.",
                        en: "Extract the downloaded folder using a program such as WinRAR or 7-Zip.",
                        fr: "Extraire le dossier téléchargé avec un programme comme WinRAR ou 7-Zip.",
                        pt: "Extraia a pasta baixada usando um programa como WinRAR ou 7-Zip.",
                    },
                },
                {
                    title: {
                        es: "Localizar la carpeta del juego",
                        en: "Locate the game folder",
                        fr: "Localiser le dossier du jeu",
                        pt: "Localizar a pasta do jogo",
                    },
                    description: {
                        es: "Abrir en el explorador de archivos la carpeta raíz donde esté instalado el juego",
                        en: "Open the game's root installation folder in File Explorer.",
                        fr: "Ouvrir dans l’Explorateur de fichiers le dossier racine où le jeu est installé.",
                        pt: "Abra no Explorador de Arquivos a pasta raiz onde o jogo está instalado.",
                    },
                },
                {
                    title: {
                        es: "Mover los archivos",
                        en: "Move the files",
                        fr: "Déplacer les fichiers",
                        pt: "Mover os arquivos",
                    },
                    description: {
                        es: "Colocar todos los archivos en la carpeta del juego, y en caso de pedirlo, reemplazar archivos",
                        en: "Place all the files in the game folder and, if prompted, replace any existing files.",
                        fr: "Placer tous les fichiers dans le dossier du jeu et, si demandé, remplacer les fichiers existants.",
                        pt: "Coloque todos os arquivos na pasta do jogo e, se solicitado, substitua os arquivos existentes.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://fusionfix.io/iv",
            downloadUrl:
                "https://github.com/ThirteenAG/GTAIV.EFLC.FusionFix/releases/tag/v5.0.1",
            isFeatured: true,
        },
    ],
};

export default mods;
