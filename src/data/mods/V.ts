import type { GameModsFile } from "./types";

const mods: GameModsFile = {
    gameId: "V",
    mods: [
        {
            id: "open-iv",
            title: "OpenIV",
            category: "essentials",
            shortDescription: {
                es: "Editor de archivos y gestor de mods esencial para Grand Theft Auto V.",
                en: "Essential archive editor and modding tool for Grand Theft Auto V.",
                fr: "Éditeur d'archives et outil de modding incontournable pour Grand Theft Auto V.",
                pt: "Editor de arquivos e gerenciador de mods essencial para Grand Theft Auto V.",
            },
            description: {
                es: "Herramienta fundamental para editar archivos .rpf y gestionar mods. Permite explorar, extraer y reemplazar texturas, modelos 3D, audios y scripts, además de instalar modificaciones mediante paquetes .oiv de forma rápida y segura.",
                en: "The definitive tool for editing .rpf archives and managing mods. Allows you to browse, extract, and replace textures, 3D models, audio, and scripts, as well as install mods using .oiv packages quickly and safely.",
                fr: "L'outil ultime pour modifier les fichiers .rpf et gérer vos mods. Permet de parcourir, extraire et remplacer textures, modèles 3D, audios et scripts, tout en simplifiant l'installation via des fichiers .oiv.",
                pt: "Ferramenta indispensável para editar arquivos .rpf e gerenciar mods. Permite navegar, extrair e substituir texturas, modelos 3D, áudios e scripts, além de instalar modificações via pacotes .oiv com rapidez e segurança.",
            },
            version: "4.1",
            author: ["OpenIV"],
            installSteps: [
                {
                    title: {
                        es: "Descargar el programa",
                        en: "Download the program",
                        fr: "Télécharger le programme",
                        pt: "Baixar o programa",
                    },
                    description: {
                        es: "Descargar OpenIV desde su página web",
                        en: "Download OpenIV from its official website",
                        fr: "Télécharger OpenIV depuis su site officiel",
                        pt: "Baixar o OpenIV no site oficial",
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
                        es: "Hacer doble clic en el archivo <code>ovisetup.exe</code> y seguir con la instalación.",
                        en: "Double-click the <code>ovisetup.exe</code> file and follow the installer instructions.",
                        fr: "Double-cliquer sur le fichier <code>ovisetup.exe</code> et suivre les étapes d'installation.",
                        pt: "Dar um duplo clique no arquivo <code>ovisetup.exe</code> e seguir as instruções de instalação.",
                    },
                },
                {
                    title: {
                        es: "Abrir la carpeta del juego",
                        en: "Select the game directory",
                        fr: "Sélectionner le dossier du jeu",
                        pt: "Selecionar a pasta do jogo",
                    },
                    description: {
                        es: "Al terminar la instalación, elegir Grand Theft Auto V y localizar la carpeta en la que está instalado",
                        en: "Once installed, select Grand Theft Auto V and browse to your game installation folder",
                        fr: "Une fois l'installation terminée, choisissez Grand Theft Auto V et indiquez le dossier d'installation du jeu",
                        pt: "Após concluir a instalação, escolha o Grand Theft Auto V e selecione a pasta onde o jogo está instalado",
                    },
                },
            ],
            coverImage: "",
            screenshots: ["", "", ""],
            moreInfoUrl: "https://openiv.com/",
            downloadUrl: "https://openiv.com/",
            isFeatured: true,
        },
    ],
};

export default mods;
