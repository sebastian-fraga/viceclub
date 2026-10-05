import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "VC",
    mods: [
        {
            id: "silent-patch",
            title: "Silent Patch",
            category: "essentials",
            shortDescription: {
                es: "Parche esencial que corrige errores y mejora la estabilidad de GTA Vice City sin alterar la experiencia original.",
                en: "An essential patch fixing bugs and stability issues in GTA Vice City while preserving original gameplay.",
                fr: "Correctif essentiel améliorant la stabilité et corrigeant les bugs de GTA Vice City sans dénaturer le jeu d'origine.",
                pt: "Patch essencial que corrige bugs e melhora a estabilidade do GTA Vice City sem alterar o jogo original.",
            },
            description: {
                es: "Corrige crasheos, errores de lógica y problemas de compatibilidad, además de restaurar detalles y mecánicas que fallaban en el port original de PC. Ideal para lograr máxima estabilidad manteniendo intacta la experiencia clásica.",
                en: "Fixes crashes, logic bugs, and compatibility issues while restoring details and mechanics that were broken in the original PC port. Ideal for maximum stability while keeping the classic gameplay intact.",
                fr: "Résout les plantages, erreurs de logique et soucis de compatibilité tout en restaurant des détails et mécaniques défaillants dans le portage PC d'origine. Idéal pour une stabilité maximale sans dénaturer l'expérience classique.",
                pt: "Resolve travamentos, erros de lógica e problemas de compatibilidade, além de restaurar detalhes e mecânicas que falhavam no port original para PC. Ideal para obter máxima estabilidade mantendo a experiência clássica intacta.",
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
                        es: "OPCIONAL",
                        en: "OPTIONAL",
                        fr: "FACULTATIF",
                        pt: "OPCIONAL",
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
                es: "Herramienta que permite cargar mods en GTA Vice City de forma simple y segura. En lugar de reemplazar los archivos del juego, el plugin carga automáticamente los mods colocados en la carpeta <code>modloader/</code>. Para quitarlos, basta con eliminarlos de esa carpeta, y el juego original permanece intacto.",
                en: "A tool that allows mods to be loaded in GTA Vice City in a simple and safe way. Instead of replacing the game's files, the plugin automatically loads any mods placed in the <code>modloader/</code> folder. To remove them, they simply need to be deleted from that folder, and the original game remains untouched.",
                fr: "Un outil qui permet de charger des mods dans GTA Vice City de façon simple et sûre. Au lieu de remplacer les fichiers du jeu, le plugin charge automatiquement les mods placés dans le dossier <code>modloader/</code>. Pour les retirer, il suffit de les supprimer de ce dossier, et le jeu d'origine reste intact.",
                pt: "Uma ferramenta que permite carregar mods no GTA Vice City de forma simples e segura. Em vez de substituir os arquivos do jogo, o plugin carrega automaticamente os mods colocados na pasta <code>modloader/</code>. Para removê-los, basta apagá-los dessa pasta, e o jogo original permanece intacto.",
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
                        es: "Colocar el archivo <code>modloader.asi</code> dentro de la carpeta <code>scripts/</code> y la carpeta <code>modloader/</code> en la carpeta raíz del juego.",
                        en: "Place the <code>modloader.asi</code> file inside the <code>scripts/</code> folder, and the <code>modloader/</code> folder in the game's root folder.",
                        fr: "Placer le fichier <code>modloader.asi</code> dans le dossier <code>scripts/</code> et le dossier <code>modloader/</code> dans le dossier racine du jeu.",
                        pt: "Coloque o arquivo <code>modloader.asi</code> dentro da pasta <code>scripts/</code> e a pasta <code>modloader/</code> na pasta raiz do jogo.",
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
            shortDescription: {
                es: "Lleva a la versión de PC de Vice City los gráficos de PS2 y elementos visuales de Xbox",
                en: "Brings PS2 graphics and Xbox visual features to the PC version of Vice City",
                fr: "Apporte à la version PC de Vice City les graphismes de la PS2 et des éléments visuels de la Xbox",
                pt: "Traz para a versão de PC do Vice City os gráficos do PS2 e elementos visuais do Xbox",
            },
            description: {
                es: "Mod que acerca el apartado gráfico de la versión de PC de GTA Vice City al de las consolas. Reproduce con fidelidad el aspecto de PS2 y suma elementos de la versión de Xbox, como reflejos más detallados en los vehículos y una iluminación de contorno en los personajes. Todas las funciones pueden activarse, desactivarse y ajustarse desde un archivo de configuración.",
                en: "A mod that brings the graphics of the PC version of GTA Vice City closer to those of the consoles. It faithfully reproduces the look of the PS2 version and adds elements from the Xbox version, such as more detailed reflections on vehicles and rim lighting on characters. All features can be enabled, disabled, and adjusted from a configuration file.",
                fr: "Mod qui rapproche les graphismes de la version PC de GTA Vice City de ceux des consoles. Il reproduit fidèlement l'aspect de la version PS2 et ajoute des éléments de la version Xbox, comme des reflets plus détaillés sur les véhicules et un éclairage de contour sur les personnages. Toutes les fonctions peuvent être activées, désactivées et ajustées depuis un fichier de configuration.",
                pt: "Mod que aproxima o visual da versão de PC do GTA Vice City ao dos consoles. Reproduz com fidelidade o aspecto da versão de PS2 e adiciona elementos da versão de Xbox, como reflexos mais detalhados nos veículos e uma iluminação de contorno nos personagens. Todas as funções podem ser ativadas, desativadas e ajustadas a partir de um arquivo de configuração.",
            },
            version: "3.0b",
            author: ["aap"],
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
                        es: "Descargar el archivo <code>SkyGfx_III_VC_3.0b.zip</code> en GitHub.",
                        en: "Download the <code>SkyGfx_III_VC_3.0b.zip</code> file from GitHub.",
                        fr: "Télécharger le fichier <code>SkyGfx_III_VC_3.0b.zip</code> depuis GitHub.",
                        pt: "Baixe o arquivo <code>SkyGfx_III_VC_3.0b.zip</code> no GitHub.",
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
                        es: "Colocar los archivos <code>rwd3d9.dll</code> y <code>d3d8to9.dll</code> en la carpeta raíz del juego.",
                        en: "Place the <code>rwd3d9.dll</code> and <code>d3d8to9.dll</code> files in the game's root folder.",
                        fr: "Placer les fichiers <code>rwd3d9.dll</code> et <code>d3d8to9.dll</code> dans le dossier racine du jeu.",
                        pt: "Coloque os arquivos <code>rwd3d9.dll</code> e <code>d3d8to9.dll</code> na pasta raiz do jogo.",
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
                        es: "Colocar el archivo <code>skygfx.asi</code> dentro de la carpeta <code>modloader/</code>.",
                        en: "Place the <code>skygfx.asi</code> file inside the <code>modloader/</code> folder.",
                        fr: "Placer le fichier <code>skygfx.asi</code> dans le dossier <code>modloader/</code>.",
                        pt: "Coloque o arquivo <code>skygfx.asi</code> dentro da pasta <code>modloader/</code>.",
                    },
                },
                {
                    title: {
                        es: "Abrir la carpeta VC/",
                        en: "Open the VC/ folder",
                        fr: "Ouvrir le dossier VC/",
                        pt: "Abrir a pasta VC/",
                    },
                    description: {
                        es: "Abrir la carpeta <code>VC/</code> del mod descargado. Dentro, copiar el archivo <code>skygfx.ini</code> dentro de <code>modloader/</code> y la carpeta <code>neo/</code> en la carpeta raíz del juego.",
                        en: "Open the <code>VC/</code> folder of the downloaded mod. Inside it, copy the <code>skygfx.ini</code> file into <code>modloader/</code> and the <code>neo/</code> folder into the game's root folder.",
                        fr: "Ouvrir le dossier <code>VC/</code> du mod téléchargé. À l'intérieur, copier le fichier <code>skygfx.ini</code> dans <code>modloader/</code> et le dossier <code>neo/</code> dans le dossier racine du jeu.",
                        pt: "Abra a pasta <code>VC/</code> do mod baixado. Dentro dela, copie o arquivo <code>skygfx.ini</code> para <code>modloader/</code> e a pasta <code>neo/</code> para a pasta raiz do jogo.",
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
                        es: "Editar el archivo <code>skygfx.ini</code> abriéndolo desde el bloc de notas para ajustar parámetros del mod",
                        en: "Edit the <code>skygfx.ini</code> file using Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>skygfx.ini</code> avec le Bloc-notes afin d’ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>skygfx.ini</code> usando o Bloco de Notas para ajustar as configurações do mod.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://gtaforums.com/topic/750681-skygfx-ps2-xbox-and-mobile-graphics-for-pc/",
            downloadUrl: "https://github.com/aap/skygfx_vc/releases/",
        },
        {
            id: "ginput",
            title: "GInput",
            category: "essentials",
            shortDescription: {
                es: "Añade soporte completo para mandos, con vibración y controles iguales a los de consola",
                en: "Adds full controller support, with vibration and console-accurate controls",
                fr: "Ajoute une prise en charge complète des manettes, avec vibrations et commandes identiques à celles des consoles",
                pt: "Adiciona suporte completo a controles, com vibração e comandos idênticos aos dos consoles",
            },
            description: {
                es: "Mod que reescribe el sistema de controles de GTA Vice City para que los mandos funcionen como en las versiones de consola. Añade la vibración, algo que se había eliminado de todas las versiones de PC, y cinco esquemas de controles: los cuatro de PS2 y uno inspirado en GTA IV. Los mensajes de ayuda muestran los botones del mando (de PlayStation o de Xbox, a elección) en lugar de las teclas, y el juego alterna automáticamente entre teclado y mando según el último dispositivo utilizado. Incluye además un archivo de configuración con numerosas opciones.",
                en: "A mod that rewrites the control system of GTA Vice City so that gamepads work just like in the console versions. It adds vibration, something that was removed from every PC version, and five control schemes: the four from the PS2 version and one inspired by GTA IV. In-game help messages show the gamepad's buttons (either PlayStation or Xbox, as chosen) instead of keyboard keys, and the game automatically switches between keyboard and gamepad depending on the last device used. It also includes a configuration file with numerous options.",
                fr: "Mod qui réécrit le système de commandes de GTA Vice City pour que les manettes fonctionnent comme sur les versions console. Il ajoute les vibrations, une fonction supprimée de toutes les versions PC, ainsi que cinq schémas de commandes : les quatre de la version PS2 et un inspiré de GTA IV. Les messages d'aide affichent les boutons de la manette (PlayStation ou Xbox, au choix) à la place des touches du clavier, et le jeu passe automatiquement du clavier à la manette selon le dernier périphérique utilisé. Il inclut aussi un fichier de configuration proposant de nombreuses options.",
                pt: "Mod que reescreve o sistema de controles do GTA Vice City para que os controles funcionem como nas versões de console. Adiciona a vibração, algo que foi removido de todas as versões de PC, e cinco esquemas de comandos: os quatro da versão de PS2 e um inspirado no GTA IV. As mensagens de ajuda mostram os botões do controle (de PlayStation ou de Xbox, à escolha) no lugar das teclas, e o jogo alterna automaticamente entre teclado e controle conforme o último dispositivo utilizado. Também inclui um arquivo de configuração com diversas opções.",
            },
            author: ["Silent"],
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
                        es: "Descargar el archivo en la página de Silent.",
                        en: "Download the file from Silent's website.",
                        fr: "Télécharger le fichier depuis le site de Silent.",
                        pt: "Baixe o arquivo no site do Silent.",
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
                        es: "Colocar los archivos <code>GInputVC.asi</code> y <code>GInputVC.ini</code> en la carpeta raíz del juego.",
                        en: "Place the <code>GInputVC.asi</code> and <code>GInputVC.ini</code> files in the game's root folder.",
                        fr: "Placer les fichiers <code>GInputVC.asi</code> et <code>GInputVC.ini</code> dans le dossier racine du jeu.",
                        pt: "Coloque os arquivos <code>GInputVC.asi</code> e <code>GInputVC.ini</code> na pasta raiz do jogo.",
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
                        es: "Mover la carpeta <code>models/</code> a la raíz del juego para reemplazar los cuadros de texto con botones nativos de cada control.",
                        en: "Move the <code>models/</code> folder to the game's root folder to replace the text boxes with native buttons for each control.",
                        fr: "Déplacer le dossier <code>models/</code> dans le dossier racine du jeu afin de remplacer les zones de texte par les boutons natifs de chaque commande.",
                        pt: "Mova a pasta <code>models/</code> para a pasta raiz do jogo para substituir as caixas de texto pelos botões nativos de cada controle.",
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
                        es: "Editar el archivo <code>GInputVC.ini</code> abriéndolo desde el Bloc de notas para ajustar parámetros del mod.",
                        en: "Edit the <code>GInputVC.ini</code> file using Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>GInputVC.ini</code> avec le Bloc-notes afin d’ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>GInputVC.ini</code> usando o Bloco de Notas para ajustar as configurações do mod.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://gtaforums.com/topic/562765-ginput/",
            downloadUrl: "https://silentsblog.com/mods/gta-vc/#ginput",
        },
        {
            id: "magic-txd",
            title: "Magic.TXD",
            category: "utils",
            shortDescription: {
                es: "Programa para abrir y editar las texturas (archivos TXD) de GTA Vice City",
                en: "A program for opening and editing GTA Vice City textures (TXD files)",
                fr: "Programme pour ouvrir et modifier les textures (fichiers TXD) de GTA Vice City",
                pt: "Programa para abrir e editar as texturas (arquivos TXD) do GTA Vice City",
            },
            description: {
                es: "Programa utilizado para abrir, ver y editar archivos TXD, el formato en el que GTA Vice City guarda sus texturas. Permite, entre otras cosas, cambiar el tamaño de las texturas, quitarlas y ajustar sus propiedades. Es una herramienta muy utilizada por la comunidad para crear y modificar texturas de mods.",
                en: "A program used to open, view, and edit TXD files, the format in which GTA Vice City stores its textures. Among other things, it allows textures to be resized, removed, and have their properties adjusted. It is a tool widely used by the community to create and modify mod textures.",
                fr: "Programme utilisé pour ouvrir, visualiser et modifier les fichiers TXD, le format dans lequel GTA Vice City stocke ses textures. Il permet, entre autres, de redimensionner les textures, de les supprimer et d'ajuster leurs propriétés. C'est un outil très utilisé par la communauté pour créer et modifier les textures des mods.",
                pt: "Programa usado para abrir, visualizar e editar arquivos TXD, o formato em que o GTA Vice City guarda suas texturas. Permite, entre outras coisas, redimensionar as texturas, removê-las e ajustar suas propriedades. É uma ferramenta muito usada pela comunidade para criar e modificar texturas de mods.",
            },
            author: ["DK22Pac", "The_GTA"],
            version: "1.1",
            installSteps: [
                {
                    title: {
                        es: "Descargar el programa",
                        en: "Download the program",
                        fr: "Télécharger le programme",
                        pt: "Baixar o programa",
                    },
                    description: {
                        es: "Descargar el archivo <code>1.1 RC3 Win7+</code> desde la página de GTAForums.",
                        en: "Download the <code>1.1 RC3 Win7+</code> file from the GTAForums page.",
                        fr: "Télécharger le fichier <code>1.1 RC3 Win7+</code> depuis la page de GTAForums.",
                        pt: "Baixe o arquivo <code>1.1 RC3 Win7+</code> na página do GTAForums.",
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
                        es: "Instalar el programa",
                        en: "Install the program",
                        fr: "Installer le programme",
                        pt: "Instalar o programa",
                    },
                    description: {
                        es: "Hacer doble clic en el archivo <code>setup_11_rc3.exe</code> y seguir con la instalación.",
                        en: "Double-click the <code>setup_11_rc3.exe</code> file and follow the installation steps.",
                        fr: "Double-cliquer sur le fichier <code>setup_11_rc3.exe</code> et suivre l'installation.",
                        pt: "Clique duas vezes no arquivo <code>setup_11_rc3.exe</code> e siga com a instalação.",
                    },
                },
                {
                    title: {
                        es: "Abrir el programa",
                        en: "Open the program",
                        fr: "Ouvrir le programme",
                        pt: "Abrir o programa",
                    },
                    description: {
                        es: "Una vez completada la instalación, abrir la carpeta del programa, ubicada por defecto en <code>C:\\Program Files\\Magic TXD</code>, y hacer doble clic en el archivo <code>magictxd.exe</code>.",
                        en: "Once the installation is complete, open the program's folder, located by default at <code>C:\\Program Files\\Magic TXD</code>, and double-click the <code>magictxd.exe</code> file.",
                        fr: "Une fois l'installation terminée, ouvrir le dossier du programme, situé par défaut dans <code>C:\\Program Files\\Magic TXD</code>, et double-cliquer sur le fichier <code>magictxd.exe</code>.",
                        pt: "Após a conclusão da instalação, abra a pasta do programa, localizada por padrão em <code>C:\\Program Files\\Magic TXD</code>, e clique duas vezes no arquivo <code>magictxd.exe</code>.",
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
                        es: "Para crear un acceso directo, hacer clic derecho sobre <code>magictxd.exe</code> y elegir Enviar a → Escritorio (crear acceso directo). En Windows 11 puede ser necesario pulsar antes <code>Mostrar más opciones</code>.",
                        en: "To create a shortcut, right-click <code>magictxd.exe</code> and choose Send to → Desktop (create shortcut). On Windows 11, you may need to click <code>Show more options</code> first.",
                        fr: "Pour créer un raccourci, faire un clic droit sur <code>magictxd.exe</code> et choisir Envoyer vers → Bureau (créer un raccourci). Sous Windows 11, il peut être nécessaire de cliquer d'abord sur <code>Afficher plus d'options</code>.",
                        pt: "Para criar um atalho, clique com o botão direito em <code>magictxd.exe</code> e escolha Enviar para → Área de trabalho (criar atalho). No Windows 11, pode ser necessário clicar antes em <code>Mostrar mais opções</code>.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://gtaforums.com/topic/851436-relopensrc-magictxd/",
            downloadUrl: "https://www.gtagarage.com/mods/show.php?id=27862",
        },
        {
            id: "renderhook",
            title: "RenderHook",
            category: "graphics",
            shortDescription: {
                es: "Reemplaza el motor de renderizado por uno basado en DirectX 11, con ray tracing y shaders modernos",
                en: "Replaces the rendering engine with a DirectX 11-based one, with ray tracing and modern shaders",
                fr: "Remplace le moteur de rendu par un moteur basé sur DirectX 11, avec ray tracing et shaders modernes",
                pt: "Substitui o motor de renderização por um baseado em DirectX 11, com ray tracing e shaders modernos",
            },
            description: {
                es: "RenderHook reemplaza el motor de renderizado original del juego por uno basado en DirectX 11, con soporte para ray tracing. Esto permite sumar iluminación dinámica, reflejos y sombras realistas, además de shaders modernos que mejoran notablemente la calidad visual sin alterar el gameplay.",
                en: "RenderHook replaces the game's original rendering engine with one based on DirectX 11, with ray tracing support. This adds dynamic lighting, realistic reflections and shadows, plus modern shaders that noticeably improve visual quality without altering gameplay.",
                fr: "RenderHook remplace le moteur de rendu d'origine du jeu par un moteur basé sur DirectX 11, compatible avec le ray tracing. Il ajoute un éclairage dynamique, des reflets et des ombres réalistes, ainsi que des shaders modernes qui améliorent nettement la qualité visuelle sans modifier le gameplay.",
                pt: "O RenderHook substitui o motor de renderização original do jogo por um baseado em DirectX 11, com suporte a ray tracing. Isso adiciona iluminação dinâmica, reflexos e sombras realistas, além de shaders modernos que melhoram bastante a qualidade visual sem alterar a jogabilidade.",
            },
            author: ["PetkaGTA"],
            requirements: {
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
                        es: "Descargar el archivo <code>VC_-_RenderHook_Raytracing.7z</code>",
                        en: "Download the <code>VC_-_RenderHook_Raytracing.7z</code>",
                        fr: "Télécharger le fichier <code>VC_-_RenderHook_Raytracing.7z</code>",
                        pt: "Baixe o arquivo <code>VC_-_RenderHook_Raytracing.7z</code>",
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
            moreInfoUrl:
                "https://www.mixmods.com.br/2021/01/iii-vc-renderhook-raytracing-rtx-graphics/",
            downloadUrl:
                "https://sharemods.com/ssrjsxpkql8i/VC_-_RenderHook_Raytracing.7z.html",
        },
        {
            id: "project2dfx",
            title: "Project2DFX",
            category: "graphics",
            shortDescription: {
                es: "Añade coronas de luz a farolas y semáforos y amplía la distancia de dibujado de objetos lejanos.",
                en: "Adds light coronas to street lamps and traffic lights and extends the draw distance of distant objects.",
                fr: "Ajoute des coronas lumineuses aux lampadaires et feux de circulation et étend la distance d'affichage des objets lointains.",
                pt: "Adiciona coronas de luz a postes e semáforos e amplia a distância de renderização de objetos distantes.",
            },
            description: {
                es: "Project2DFX agrega coronas de luz (halos luminosos) a farolas, semáforos y otros elementos del mapa, y amplía la distancia de dibujado de los objetos lejanos (LOD) para que la ciudad se vea más completa a la distancia. No modifica el gameplay y funciona como un complemento visual ligero, ya que se carga como un script a través del ASI Loader.",
                en: "Project2DFX adds light coronas (glowing halos) to street lamps, traffic lights and other map elements, and extends the draw distance of distant objects (LOD) so the city looks more complete from afar. It does not change gameplay and works as a lightweight visual add-on, since it is loaded as a script through the ASI Loader.",
                fr: "Project2DFX ajoute des coronas lumineuses (halos) aux lampadaires, feux de circulation et autres éléments de la carte, et étend la distance d'affichage des objets lointains (LOD) pour que la ville paraisse plus complète au loin. Il ne modifie pas le gameplay et fonctionne comme un complément visuel léger, car il est chargé comme un script via l'ASI Loader.",
                pt: "O Project2DFX adiciona coronas de luz (halos luminosos) a postes, semáforos e outros elementos do mapa, e amplia a distância de renderização dos objetos distantes (LOD) para que a cidade pareça mais completa à distância. Não altera a jogabilidade e funciona como um complemento visual leve, pois é carregado como um script pelo ASI Loader.",
            },
            author: ["ThirteenAG"],
            requirements: {
                mods: ["widescreen-fix", "ultimate-asi-loader"],
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
                        es: "Descargar el archivo <code>VC.Project2DFX.zip</code>",
                        en: "Download the <code>VC.Project2DFX.zip</code>",
                        fr: "Télécharger le fichier <code>VC.Project2DFX.zip</code>",
                        pt: "Baixe o arquivo <code>VC.Project2DFX.zip</code>",
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
                        es: "Colocar todos los archivos dentro de la carpeta <code>scripts/</code> del juego",
                        en: "Place all the files inside the game's <code>scripts/</code> folder",
                        fr: "Placer tous les fichiers dans le dossier <code>scripts/</code> du jeu",
                        pt: "Coloque todos os arquivos dentro da pasta <code>scripts/</code> do jogo",
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
                        es: "Editar los archivos <code>III.VC.SA.LimitAdjuster.ini</code> y <code>VCLodLights.ini</code> abriéndolos desde el Bloc de notas para ajustar parámetros del mod.",
                        en: "Edit the <code>III.VC.SA.LimitAdjuster.ini</code> and <code>VCLodLights.ini</code> files by opening them in Notepad to adjust the mod's settings.",
                        fr: "Modifier les fichiers <code>III.VC.SA.LimitAdjuster.ini</code> et <code>VCLodLights.ini</code> en les ouvrant avec le Bloc-notes pour ajuster les paramètres du mod.",
                        pt: "Edite os arquivos <code>III.VC.SA.LimitAdjuster.ini</code> e <code>VCLodLights.ini</code> abrindo-os no Bloco de Notas para ajustar os parâmetros do mod.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://github.com/ThirteenAG/III.VC.SA.IV.Project2DFX/releases/tag/gtavc",
            downloadUrl:
                "https://github.com/ThirteenAG/III.VC.SA.IV.Project2DFX/releases/tag/gtavc",
        },
        {
            id: "mixsets",
            title: "MixSets",
            category: "gameplay",
            shortDescription: {
                es: "Reúne en un archivo de configuración decenas de ajustes, correcciones y opciones de gameplay del juego.",
                en: "Gathers dozens of game settings, fixes and gameplay options into a single configuration file.",
                fr: "Regroupe dans un seul fichier de configuration des dizaines de réglages, corrections et options de gameplay.",
                pt: "Reúne em um único arquivo de configuração dezenas de ajustes, correções e opções de jogabilidade.",
            },
            description: {
                es: "MixSets es un conjunto de ajustes que se controlan desde un único archivo de configuración (<code>Mix Sets.ini</code>). Permite activar, desactivar o modificar decenas de parámetros del juego, como correcciones de errores, comportamiento de vehículos y peatones, y otras opciones de gameplay, sin necesidad de instalar un mod distinto para cada cambio. Se carga a través de Mod Loader.",
                en: "MixSets is a set of tweaks controlled from a single configuration file (<code>Mix Sets.ini</code>). It lets you enable, disable or modify dozens of game parameters, such as bug fixes, vehicle and pedestrian behavior, and other gameplay options, without installing a separate mod for each change. It is loaded through Mod Loader.",
                fr: "MixSets est un ensemble de réglages contrôlés depuis un seul fichier de configuration (<code>Mix Sets.ini</code>). Il permet d'activer, de désactiver ou de modifier des dizaines de paramètres du jeu, comme des corrections de bugs, le comportement des véhicules et des piétons, et d'autres options de gameplay, sans installer un mod distinct pour chaque changement. Il est chargé via Mod Loader.",
                pt: "O MixSets é um conjunto de ajustes controlados a partir de um único arquivo de configuração (<code>Mix Sets.ini</code>). Ele permite ativar, desativar ou modificar dezenas de parâmetros do jogo, como correções de bugs, comportamento de veículos e pedestres e outras opções de jogabilidade, sem precisar instalar um mod separado para cada mudança. É carregado através do Mod Loader.",
            },
            version: "1.0.3",
            author: ["Junior_Djjr"],
            requirements: {
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
                        es: "Descargar el archivo <code>VC_-_MixSets.7z</code>",
                        en: "Download the <code>VC_-_MixSets.7z</code>",
                        fr: "Télécharger le fichier <code>VC_-_MixSets.7z</code>",
                        pt: "Baixe o arquivo <code>VC_-_MixSets.7z</code>",
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
                        es: "Abrir <code>EN/</code> y mover la carpeta <code>MixSets/</code> al <code>modloader/</code> del juego",
                        en: "Open <code>EN/</code> and move the <code>MixSets/</code> folder into the game's <code>modloader/</code> folder",
                        fr: "Ouvrir <code>EN/</code> et déplacer le dossier <code>MixSets/</code> dans le dossier <code>modloader/</code> du jeu",
                        pt: "Abra <code>EN/</code> e mova a pasta <code>MixSets/</code> para a pasta <code>modloader/</code> do jogo",
                    },
                },
                {
                    title: {
                        es: "Editar parámetros",
                        en: "Edit settings",
                        fr: "Modifier les paramètres",
                        pt: "Editar parâmetros",
                    },
                    description: {
                        es: "Editar el archivo <code>cleo/Mix Sets.ini</code> abriéndolo desde el Bloc de notas para ajustar parámetros del mod.",
                        en: "Edit the <code>cleo/Mix Sets.ini</code> file by opening it in Notepad to adjust the mod's settings.",
                        fr: "Modifier le fichier <code>cleo/Mix Sets.ini</code> en l'ouvrant avec le Bloc-notes pour ajuster les paramètres du mod.",
                        pt: "Edite o arquivo <code>cleo/Mix Sets.ini</code> abrindo-o no Bloco de Notas para ajustar os parâmetros do mod.",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2021/04/vc-mixsets-v1-0-3/",
            downloadUrl:
                "https://sharemods.com/ixbdaq70icmm/VC_-_MixSets.7z.html",
        },
        {
            id: "open-limit-adjuster",
            title: "Open Limit Adjuster",
            category: "essentials",
            shortDescription: {
                es: "Elimina o amplía los límites internos del motor del juego, evitando crasheos al usar mods.",
                en: "Removes or raises the game engine's internal limits, preventing crashes when using mods.",
                fr: "Supprime ou relève les limites internes du moteur du jeu, évitant les plantages lorsqu'on utilise de mods.",
                pt: "Remove ou amplia os limites internos do motor do jogo, evitando travamentos ao usar mods.",
            },
            description: {
                es: "Open Limit Adjuster modifica los límites internos del motor del juego, como la cantidad máxima de objetos, modelos, texturas o vehículos que se pueden cargar a la vez. Al ampliarlos o hacerlos dinámicos, evita crasheos y errores que aparecen al instalar muchos mods o contenido pesado. No cambia el gameplay y es una base recomendada para cualquier configuración con varios mods. Se carga a través de Mod Loader.",
                en: "Open Limit Adjuster modifies the game engine's internal limits, such as the maximum number of objects, models, textures or vehicles that can be loaded at once. By raising them or making them dynamic, it prevents the crashes and errors that appear when installing many mods or heavy content. It does not change gameplay and is a recommended base for any setup with several mods. It is loaded through Mod Loader.",
                fr: "Open Limit Adjuster modifie les limites internes du moteur du jeu, comme le nombre maximal d'objets, de modèles, de textures ou de véhicules pouvant être chargés simultanément. En les relevant ou en les rendant dynamiques, il évite les plantages et erreurs qui surviennent lors de l'installation de nombreux mods ou de contenus lourds. Il ne modifie pas le gameplay et constitue une base recommandée pour toute configuration comportant plusieurs mods. Il est chargé via Mod Loader.",
                pt: "O Open Limit Adjuster modifica os limites internos do motor do jogo, como a quantidade máxima de objetos, modelos, texturas ou veículos que podem ser carregados ao mesmo tempo. Ao ampliá-los ou torná-los dinâmicos, evita travamentos e erros que aparecem ao instalar muitos mods ou conteúdo pesado. Não altera a jogabilidade e é uma base recomendada para qualquer configuração com vários mods. É carregado através do Mod Loader.",
            },
            version: "1.7",
            author: ["LINK/2012", "ThirteenAG", "Blackbird88"],
            requirements: {
                mods: ["mod-loader"]
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
                        es: "Descargar el archivo <code>Open_Limit_Adjuster.zip</code>",
                        en: "Download the <code>Open_Limit_Adjuster.zip</code>",
                        fr: "Télécharger le fichier <code>Open_Limit_Adjuster.zip</code>",
                        pt: "Baixe o arquivo <code>Open_Limit_Adjuster.zip</code>",
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
                        es: "Mover la carpeta <code>Open Limit Adjuster/</code> al <code>modloader/</code> del juego",
                        en: "",
                        fr: "",
                        pt: "",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl:
                "https://www.mixmods.com.br/2022/10/open-limit-adjuster/",
            downloadUrl:
                "https://sharemods.com/a8lp92fm5jz4/Open_Limit_Adjuster.zip.html",
        },
    ],
};

export default mods;
