import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "SA",
    mods: [
        {
            id: "silent-patch",
            title: "Silent Patch",
            category: "essentials",
            shortDescription: {
                es: "Parche esencial que corrige errores y mejora la estabilidad de GTA San Andreas sin alterar la experiencia original.",
                en: "An essential patch fixing bugs and stability issues in GTA San Andreas while preserving original gameplay.",
                fr: "Correctif essentiel améliorant la stabilité et corrigeant les bugs de GTA San Andreas sans dénaturer le jeu d'origine.",
                pt: "Patch essencial que corrige bugs e melhora a estabilidade do GTA San Andreas sem alterar o jogo original.",
            },
            description: {
                es: "Corrige crasheos, errores de lógica y problemas de compatibilidad, además de restaurar detalles y mecánicas que fallaban en el port original de PC. Ideal para lograr máxima estabilidad manteniendo intacta la experiencia clásica.",
                en: "Fixes crashes, logic bugs, and compatibility issues while restoring details and mechanics that were broken in the original PC port. Ideal for maximum stability while keeping the classic gameplay intact.",
                fr: "Résout les plantages, erreurs de logique et soucis de compatibilité tout en restaurant des détails et mécaniques défaillants dans le portage PC d'origine. Idéal pour une stabilité maximale sans dénaturer l'expérience classique.",
                pt: "Resolve travamentos, erros de lógica e problemas de compatibilidade, além de restaurar detalhes e mecânicas que falhavam no port original para PC. Ideal para obter máxima estabilidade mantendo a experiência clássica intacta.",
            },
            version: "34.1",
            author: ["Silent"],
            installSteps: [
                {
                    title: {
                        es: "Descargar el mod",
                        en: "Download the mod",
                        fr: "Télécharger le mod",
                        pt: "Baixar o mod",
                    },
                    description: {
                        es: "Descargar el archivo <code>SilentPatchSA.zip</code> en Github",
                        en: "Download the <code>SilentPatchSA.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>SilentPatchSA.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>SilentPatchSA.zip</code> no GitHub",
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
                {
                    title: {
                        es: "OPCIONAL",
                        en: "OPTIONAL",
                        fr: "FACULTATIF",
                        pt: "OPCIONAL",
                    },
                    description: {
                        es: "Editar el archivo <code>SilentPatchSA.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                        en: "Edit the <code>SilentPatchSA.ini</code> file using Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>SilentPatchSA.ini</code> avec le Bloc-notes afin d’ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>SilentPatchSA.ini</code> usando o Bloco de Notas para ajustar as configurações do mod.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://silentsblog.com/mods/gta-sa/#silentpatch",
            downloadUrl:
                "https://github.com/CookiePLMonster/SilentPatch/releases/tag/1.1-BUILD34.1-SA",
            isFeatured: true,
        },
    ],
};

export default mods;
