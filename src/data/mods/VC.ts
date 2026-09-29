import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "VC",
    mods: [
        {
            id: "silent-patch",
            title: "Silent Patch",
            category: "essentials",
            shortDescription: {
                es: "Parche de correcciones que mejora la estabilidad, compatibilidad y funcionamiento de GTA Vice City sin alterar su versión original",
                en: "A bug-fixing patch that improves the stability, compatibility, and overall functionality of GTA Vice City without altering its original version.",
                fr: "Correctif qui améliore la stabilité, la compatibilité et le fonctionnement général de GTA Vice City sans modifier sa version originale.",
                pt: "Patch de correções que melhora a estabilidade, compatibilidade e funcionamento geral do GTA Vice City sem alterar sua versão original.",
            },
            description: {
                es: "Parche de correcciones que soluciona numerosos bugs, crasheos, problemas de compatibilidad y errores de lógica, además de restaurar comportamientos y detalles que no funcionaban correctamente en el juego original. Está diseñado para mejorar la estabilidad y compatibilidad sin alterar la experiencia de juego original.",
                en: "A bug-fixing patch that addresses numerous bugs, crashes, compatibility issues, and logic errors, while also restoring behaviors and details that did not work correctly in the original game. It is designed to improve stability and compatibility without altering the original gameplay experience.",
                fr: "Correctif qui résout de nombreux bugs, plantages, problèmes de compatibilité et erreurs de logique, tout en restaurant des comportements et des détails qui ne fonctionnaient pas correctement dans le jeu original. Il est conçu pour améliorer la stabilité et la compatibilité sans modifier l’expérience de jeu originale.",
                pt: "Patch de correções que resolve diversos bugs, travamentos, problemas de compatibilidade e erros de lógica, além de restaurar comportamentos e detalhes que não funcionavam corretamente no jogo original. Ele foi desenvolvido para melhorar a estabilidade e a compatibilidade sem alterar a experiência de jogo original.",
            },
            version: "12.1",
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
                        es: "Descargar el archivo <code>SilentPatchVC.zip</code> en Github",
                        en: "Download the <code>SilentPatchVC.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>SilentPatchVC.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>SilentPatchVC.zip</code> no GitHub",
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
                        es: "(OPCIONAL)",
                        en: "(OPTIONAL)",
                        fr: "(FACULTATIF)",
                        pt: "(OPCIONAL)",
                    },
                    description: {
                        es: "Editar el archivo <code>SilentPatchVC.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                        en: "Edit the <code>SilentPatchVC.ini</code> file using Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>SilentPatchVC.ini</code> avec le Bloc-notes afin d’ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>SilentPatchVC.ini</code> usando o Bloco de Notas para ajustar as configurações do mod.",
                    },
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
            shortDescription: {
                es: "Añade compatibilidad adecuada con pantallas panorámicas y ultrapanorámicas",
                en: "Adds proper support for widescreen and ultrawide displays",
                fr: "Ajoute une prise en charge adaptée des écrans larges et ultralarges",
                pt: "Adiciona suporte adequado para telas widescreen e ultrawide",
            },
            description: {
                es: "Mod que corrige la relación de aspecto, el HUD, el campo de visión y el formato de las cinemáticas para adaptar GTA Vice City a resoluciones modernas, incluyendo pantallas ultrapanorámicas.",
                en: "A mod that fixes the aspect ratio, HUD, field of view, and cutscene formatting to adapt GTA Vice City to modern resolutions, including ultrawide displays.",
                fr: "Mod qui corrige le format d’image, le HUD, le champ de vision et le format des cinématiques afin d’adapter GTA Vice City aux résolutions modernes, y compris aux écrans ultralarges.",
                pt: "Mod que corrige a proporção da tela, o HUD, o campo de visão e o formato das cutscenes para adaptar GTA Vice City às resoluções modernas, incluindo telas ultrawide.",
            },
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
                        es: "Descargar el archivo <code>GTAVC.WidescreenFix.zip</code> en Github",
                        en: "Download the <code>GTAVC.WidescreenFix.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>GTAVC.WidescreenFix.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>GTAVC.WidescreenFix.zip</code> no GitHub",
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
                        es: "Mover la carpeta <code>scripts/</code> y el archivo <code>d3d8.dll</code> a la carpeta raíz del juego, y en caso de pedirlo, reemplazar archivos",
                        en: "Move the <code>scripts/</code> folder and the <code>d3d8.dll</code> file to the game's root folder and, if prompted, replace any existing files.",
                        fr: "Déplacer le dossier <code>scripts/</code> et le fichier <code>d3d8.dll</code> dans le dossier racine du jeu et, si demandé, remplacer les fichiers existants.",
                        pt: "Mova a pasta <code>scripts/</code> e o arquivo <code>d3d8.dll</code> para a pasta raiz do jogo e, se solicitado, substitua os arquivos existentes.",
                    },
                },
                {
                    title: {
                        es: "(OPCIONAL)",
                        en: "(OPTIONAL)",
                        fr: "(FACULTATIF)",
                        pt: "(OPCIONAL)",
                    },
                    description: {
                        es: "Editar el archivo <code>GTAVC.WidescreenFix.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                        en: "Edit the <code>GTAVC.WidescreenFix.ini</code> file using Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>GTAVC.WidescreenFix.ini</code> avec le Bloc-notes afin d’ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>GTAVC.WidescreenFix.ini</code> usando o Bloco de Notas para ajustar as configurações do mod.",
                    },
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
            shortDescription: {
                es: "Rediseña toda la dificultad de Vice City con misiones, clima y tráfico más duros",
                en: "Overhauls Vice City's difficulty with tougher missions, weather, and traffic",
                fr: "Refond la difficulté de Vice City avec des missions, une météo et un trafic plus durs",
                pt: "Reformula a dificuldade de Vice City com missões, clima e trânsito mais difíceis",
            },
            description: {
                es: "Mod de dificultad pensado para speedrunners que modifica todas las misiones principales y opcionales de GTA Vice City. Además rediseña el clima, el tráfico y los peatones, reubica los paquetes ocultos y añade saltos únicos, vehículos, atuendos y música nueva.",
                en: "A difficulty mod built with speedrunners in mind that modifies every main and optional mission in GTA Vice City. It also overhauls the weather, traffic, and pedestrians, relocates the hidden packages, and adds new unique jumps, vehicles, outfits, and music.",
                fr: "Mod de difficulté conçu pour les speedrunners, qui modifie toutes les missions principales et optionnelles de GTA Vice City. Il remanie aussi la météo, le trafic et les piétons, déplace les paquets cachés et ajoute de nouveaux sauts uniques, véhicules, tenues et musiques.",
                pt: "Mod de dificuldade pensado para speedrunners que modifica todas as missões principais e opcionais de GTA Vice City. Também reformula o clima, o trânsito e os pedestres, realoca os pacotes escondidos e adiciona saltos únicos, veículos, roupas e músicas novas.",
            },
            version: "2.5",
            author: ["DinosaurBytes"],
            requirements: {
                gameVersion: "1.0",
            },
            installSteps: [
                {
                    title: {
                        es: "Descargar el mod",
                        en: "Download the mod",
                        fr: "Télécharger le mod",
                        pt: "Baixar o mod",
                    },
                    description: {
                        es: "Descargar el archivo <code>GTA Tightened Vice - V2.5 Full.zip</code> en Dropbox",
                        en: "Download the <code>GTA Tightened Vice - V2.5 Full.zip</code> file from Dropbox",
                        fr: "Télécharger le fichier <code>GTA Tightened Vice - V2.5 Full.zip</code> sur Dropbox",
                        pt: "Baixe o arquivo <code>GTA Tightened Vice - V2.5 Full.zip</code> no Dropbox",
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
                        es: "Extraer la carpeta descargada con un programa como WinRAR o 7-Zip",
                        en: "Extract the downloaded folder using a program such as WinRAR or 7-Zip",
                        fr: "Extraire le dossier téléchargé avec un programme comme WinRAR ou 7-Zip",
                        pt: "Extraia a pasta baixada usando um programa como WinRAR ou 7-Zip",
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
                        en: "Open the game's root installation folder in File Explorer",
                        fr: "Ouvrir dans l’Explorateur de fichiers le dossier racine où le jeu est installé",
                        pt: "Abra no Explorador de Arquivos a pasta raiz onde o jogo está instalado",
                    },
                },
                {
                    title: {
                        es: "Mover todos los archivos",
                        en: "Move all the files",
                        fr: "Déplacer tous les fichiers",
                        pt: "Mover todos os arquivos",
                    },
                    description: {
                        es: "Colocar y reemplazar todos los archivos en la carpeta del juego",
                        en: "Copy all the files into the game folder and overwrite when prompted",
                        fr: "Copier tous les fichiers dans le dossier du jeu et les remplacer lorsque c’est demandé",
                        pt: "Copie todos os arquivos para a pasta do jogo e substitua quando solicitado",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://gtaforums.com/topic/986628-tightened-vice/",
            downloadUrl:
                "https://www.dropbox.com/scl/fi/gqqzeikj0v6xirtjjfnmn/GTA-Tightened-Vice-V2.5-Full.zip",
        },
        {
            id: "ultimate-asi-loader",
            title: "Ultimate ASI Loader",
            category: "essentials",
            shortDescription: {
                es: "Permite que el juego cargue plugins .asi, necesarios para muchos mods",
                en: "Allows the game to load .asi plugins, which many mods rely on",
                fr: "Permet au jeu de charger des plugins .asi, nécessaires à de nombreux mods",
                pt: "Permite que o jogo carregue plugins .asi, necessários para muitos mods",
            },
            description: {
                es: "Archivo que añade al juego la capacidad de cargar plugins con extensión .asi, un formato utilizado por una enorme cantidad de mods. Se instala colocando un único archivo, normalmente <code>dinput8.dll</code>, en la carpeta principal del juego, sin necesidad de modificar nada más. Es la base sobre la que funcionan muchos mods y herramientas, como Mod Loader.",
                en: "A file that adds the ability to load plugins with the .asi extension to the game, a format used by a huge number of mods. It is installed by placing a single file, usually <code>dinput8.dll</code>, in the game's main folder, with nothing else to modify. It is the foundation on which many mods and tools work, such as Mod Loader.",
                fr: "Un fichier qui ajoute au jeu la capacité de charger des plugins avec l'extension .asi, un format utilisé par un très grand nombre de mods. Il s'installe en plaçant un seul fichier, généralement <code>dinput8.dll</code>, dans le dossier principal du jeu, sans rien avoir à modifier d'autre. C'est la base sur laquelle reposent de nombreux mods et outils, comme Mod Loader.",
                pt: "Um arquivo que adiciona ao jogo a capacidade de carregar plugins com a extensão .asi, um formato usado por uma enorme quantidade de mods. É instalado colocando um único arquivo, normalmente <code>dinput8.dll</code>, na pasta principal do jogo, sem necessidade de modificar mais nada. É a base sobre a qual funcionam muitos mods e ferramentas, como o Mod Loader.",
            },
            version: "9.7.4",
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
                        es: "Descargar el archivo <code>Ultimate-ASI-Loader.zip</code> en Github",
                        en: "Download the <code>Ultimate-ASI-Loader.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>Ultimate-ASI-Loader.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>Ultimate-ASI-Loader.zip</code> no GitHub",
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
                        es: "Reemplazar el archivo",
                        en: "Replace the file",
                        fr: "Remplacer le fichier",
                        pt: "Substituir o arquivo",
                    },
                    description: {
                        es: "Mover el archivo <code>dinput8.dll</code> a la carpeta raíz del juego y reemplazarlo si ya existe.",
                        en: "Move the <code>dinput8.dll</code> file to the game's root folder and replace it if it already exists.",
                        fr: "Déplacer le fichier <code>dinput8.dll</code> dans le dossier racine du jeu et le remplacer s'il existe déjà.",
                        pt: "Mova o arquivo <code>dinput8.dll</code> para a pasta raiz do jogo e substitua-o caso já exista.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://github.com/ThirteenAG/Ultimate-ASI-Loader",
            downloadUrl:
                "https://github.com/ThirteenAG/Ultimate-ASI-Loader/releases",
        },
        {
            id: "mod-loader",
            title: "Mod Loader",
            category: "essentials",
            shortDescription: {
                es: "Permite instalar y quitar mods fácilmente, sin modificar los archivos originales del juego",
                en: "Allows mods to be installed and removed easily, without modifying the game's original files",
                fr: "Permet d'installer et de retirer des mods facilement, sans modifier les fichiers d'origine du jeu",
                pt: "Permite instalar e remover mods facilmente, sem modificar os arquivos originais do jogo",
            },
            description: {
                es: "Herramienta que permite cargar mods en GTA Vice City de forma simple y segura. En lugar de reemplazar los archivos del juego, el plugin carga automáticamente los mods colocados en la carpeta <code>modloader</code>. Para quitarlos, basta con eliminarlos de esa carpeta, y el juego original permanece intacto.",
                en: "A tool that allows mods to be loaded in GTA Vice City in a simple and safe way. Instead of replacing the game's files, the plugin automatically loads any mods placed in the <code>modloader</code> folder. To remove them, they simply need to be deleted from that folder, and the original game remains untouched.",
                fr: "Un outil qui permet de charger des mods dans GTA Vice City de façon simple et sûre. Au lieu de remplacer les fichiers du jeu, le plugin charge automatiquement les mods placés dans le dossier <code>modloader</code>. Pour les retirer, il suffit de les supprimer de ce dossier, et le jeu d'origine reste intact.",
                pt: "Uma ferramenta que permite carregar mods no GTA Vice City de forma simples e segura. Em vez de substituir os arquivos do jogo, o plugin carrega automaticamente os mods colocados na pasta <code>modloader</code>. Para removê-los, basta apagá-los dessa pasta, e o jogo original permanece intacto.",
            },
            version: "0.3.10",
            author: ["thelink2012"],
            requirements: {
                mods: ["ultimate-asi-loader"],
            },
            installSteps: [
                {
                    title: {
                        es: "Descargar el mod",
                        en: "Download the mod",
                        fr: "Télécharger le mod",
                        pt: "Baixar o mod",
                    },
                    description: {
                        es: "Descargar el archivo <code>modloader.zip</code> en Github",
                        en: "Download the <code>modloader.zip</code> file from GitHub",
                        fr: "Télécharger le fichier <code>modloader.zip</code> depuis GitHub",
                        pt: "Baixe o arquivo <code>modloader.zip</code> no GitHub",
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
                        es: "Colocar el archivo <code>modloader.asi</code> dentro de la carpeta <code>scripts/</code> y la carpeta <code>modloader</code> en la carpeta raíz del juego.",
                        en: "Place the <code>modloader.asi</code> file inside the <code>scripts/</code> folder, and the <code>modloader</code> folder in the game's root folder.",
                        fr: "Placer le fichier <code>modloader.asi</code> dans le dossier <code>scripts/</code> et le dossier <code>modloader</code> dans le dossier racine du jeu.",
                        pt: "Coloque o arquivo <code>modloader.asi</code> dentro da pasta <code>scripts/</code> e a pasta <code>modloader</code> na pasta raiz do jogo.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://github.com/thelink2012/modloader",
            downloadUrl:
                "https://github.com/thelink2012/modloader/releases/tag/v0.3.10",
        },
        {
            id: "framerate-vigilante",
            title: "Framerate Vigilante",
            category: "essentials",
            shortDescription: {
                es: "Corrige los errores de GTA Vice City al jugar a 60 FPS",
                en: "Fixes GTA Vice City bugs when playing at 60 FPS",
                fr: "Corrige les bugs de GTA Vice City en jouant à 60 FPS",
                pt: "Corrige os bugs do GTA Vice City ao jogar a 60 FPS",
            },
            description: {
                es: "Mod que corrige los errores que surgen al jugar a GTA Vice City con una tasa de FPS superior a los 30 FPS. El juego, originalmente, fue pensado para correr a esa cantidad de fotogramas por segundo, por lo que con valores más altos algunas funciones relacionadas a las físicas se rompen. Está pensado para jugar hasta 60 FPS, el rango que recomienda su autor.",
                en: "A mod that fixes the bugs that appear when playing GTA Vice City at a frame rate above 30 FPS. The game was originally designed to run at that frame rate, so at higher values some physics-related features break. It is designed for playing at up to 60 FPS, the range recommended by its author.",
                fr: "Mod qui corrige les bugs qui apparaissent en jouant à GTA Vice City avec un nombre d'images par seconde supérieur à 30 FPS. Le jeu a été conçu à l'origine pour tourner à cette fréquence, si bien qu'avec des valeurs plus élevées certaines fonctions liées à la physique ne fonctionnent plus correctement. Il est conçu pour jouer jusqu'à 60 FPS, la plage recommandée par son auteur.",
                pt: "Mod que corrige os bugs que surgem ao jogar GTA Vice City com uma taxa de FPS superior a 30 FPS. O jogo foi originalmente projetado para rodar nessa taxa, então com valores mais altos algumas funções relacionadas à física deixam de funcionar bem. Foi pensado para jogar em até 60 FPS, a faixa recomendada pelo autor.",
            },
            author: ["JuniorDjjr"],
            requirements: {
                gameVersion: "1.0",
                mods: ["mod-loader"],
            },
            installSteps: [
                {
                    title: {
                        es: "Descargar el mod",
                        en: "Download the mod",
                        fr: "Télécharger le mod",
                        pt: "Baixar o mod",
                    },
                    description: {
                        es: "Descargar el archivo <code>Framerate_Vigilante.zip</code> en la página de descarga.",
                        en: "Download the <code>Framerate_Vigilante.zip</code> file from the download page.",
                        fr: "Télécharger le fichier <code>Framerate_Vigilante.zip</code> depuis la page de téléchargement.",
                        pt: "Baixe o arquivo <code>Framerate_Vigilante.zip</code> na página de download.",
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
                        es: "Abrir en el explorador de archivos la carpeta raíz donde esté instalado el juego.",
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
                        es: "Dentro de la carpeta <code>GTA VC/</code> extraída, copiar y pegar la carpeta <code>FramerateVigilante</code> dentro de <code>modloader/</code>.",
                        en: "Inside the extracted <code>GTA VC/</code> folder, copy and paste the <code>FramerateVigilante</code> folder into <code>modloader/</code>.",
                        fr: "Dans le dossier <code>GTA VC/</code> extrait, copier et coller le dossier <code>FramerateVigilante</code> dans <code>modloader/</code>.",
                        pt: "Dentro da pasta <code>GTA VC/</code> extraída, copie e cole a pasta <code>FramerateVigilante</code> dentro de <code>modloader/</code>.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2022/08/iii-vc-sa-framerate-vigilante/",
            downloadUrl:
                "https://sharemods.com/0cxm88ppiv38/Framerate_Vigilante.zip.html",
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
