import type { GameId } from "@/config/games";

type PageSeo = {
    title: string;
    description: string;
};

export const seo: Partial<Record<GameId, Record<string, PageSeo>>> = {
    III: {
        inicio: {
            title: "GTA III: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA III y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA III | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA III: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA III | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA III con Claude, Catalina, Salvatore Leone y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA III",
            description:
                "Explora herramientas y mods para la versión de PC de GTA III: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA III",
            description:
                "Consulta todos los logros y trofeos de GTA III, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA III",
            description:
                "Explora el mapa interactivo de Liberty City y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA III",
            description:
                "Escucha las emisoras de GTA III y sus canciones, incluyendo Flashback FM, MSX, Double Clef FM y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA III",
            description:
                "Descubre todos los trucos de GTA III para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    VC: {
        inicio: {
            title: "GTA Vice City: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Vice City, trucos, todas las emisoras, trofeos, ficha técnica de GTA VC y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA VC | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA VC: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA VC | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA VC con Tommy, Lance, Ken Rosenberg y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA VC",
            description:
                "Explora herramientas y mods para la versión de PC de GTA VC: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA VC",
            description:
                "Consulta todos los logros y trofeos de GTA VC, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA VC",
            description:
                "Explora el mapa interactivo de Vice City y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA VC",
            description:
                "Escucha las emisoras de GTA VC y sus canciones, incluyendo Flash FM, V-Rock, Fever 105 y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA VC",
            description:
                "Descubre todos los trucos de GTA VC para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    SA: {
        inicio: {
            title: "GTA San Andreas: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Los Santos y alrededores, trucos, todas las emisoras, trofeos, ficha técnica de GTA SA y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA SA | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA SA: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA SA | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA SA con CJ, Big Smoke, Sweet, Ryder, Tenpenny y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA SA",
            description:
                "Explora herramientas y mods para la versión de PC de GTA SA: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA SA",
            description:
                "Consulta todos los logros y trofeos de GTA SA, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA SA",
            description:
                "Explora el mapa interactivo de Los Santos, San Fierro y Las Venturas y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA SA",
            description:
                "Escucha las emisoras de GTA SA y sus canciones, incluyendo Radio Los Santos, Radio X, SF-UR y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA SA",
            description:
                "Descubre todos los trucos de GTA SA para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    LCS: {
        inicio: {
            title: "GTA Liberty City Stories: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA LCS y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA LCS | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA LCS: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA LCS | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA LCS con Toni, Salvatore, Maria Latore y otros personajes, además de vehículos, escenarios y armas.",
        },
        mapa: {
            title: "Mapa interactivo de GTA LCS",
            description:
                "Explora el mapa interactivo de Liberty City y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA LCS",
            description:
                "Escucha las emisoras de GTA LCS y sus canciones, incluyendo Flashback 95.6, Liberty Jam y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA LCS",
            description:
                "Descubre todos los trucos de GTA LCS para PlayStation Portable y PlayStation 2, con códigos para cada plataforma.",
        },
    },
    VCS: {
        inicio: {
            title: "GTA Vice City Stories: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Vice City, trucos, todas las emisoras, trofeos, ficha técnica de GTA VCS y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA VCS | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA VCS: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA VCS | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA VCS con Victor, Lance, Phil Collins y otros personajes, además de vehículos, escenarios y armas.",
        },
        mapa: {
            title: "Mapa interactivo de GTA VCS",
            description:
                "Explora el mapa interactivo de Vice City y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA VCS",
            description:
                "Escucha las emisoras de GTA VCS y sus canciones, incluyendo Flash FM, Radio Espantoso, Wave 103 y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA VCS",
            description:
                "Descubre todos los trucos de GTA VCS para PlayStation Portable y PlayStation 2, con códigos para cada plataforma.",
        },
    },
    IV: {
        inicio: {
            title: "GTA IV: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA IV, The Lost and Damned, The Ballad of Gay Tony y más. Toda la información en Vice Club.",
        },
        "100": {
            title: "Checklist 100% de GTA IV | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA IV y sus expansiones: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% de cada juego.",
        },
        artworks: {
            title: "Artworks de GTA IV | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA IV con Niko, Roman, Dimitri y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA IV",
            description:
                "Explora herramientas y mods para la versión de PC de GTA IV: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA IV",
            description:
                "Consulta todos los logros y trofeos de GTA IV, The Lost and Damned y The Ballad of Gay Tony, sus requisitos y cómo desbloquearlos para completar cada juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA IV",
            description:
                "Explora el mapa interactivo de Liberty City y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA IV",
            description:
                "Escucha las emisoras de GTA IV y sus canciones, incluyendo San Juan Sounds, Electro-Choc, Radio Broker y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA IV",
            description:
                "Descubre todos los trucos de GTA IV y sus expansiones The Lost and Damned y The Ballad of Gay Tony, con códigos de celular para cada juego.",
        },
    },
    V: {
        inicio: {
            title: "GTA V: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Los Santos y Blaine County, trucos, todas las emisoras, trofeos, ficha técnica de GTA V y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA V | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA V: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA V | Personajes, vehículos y capturas",
            description:
                "Descarga artworks y capturas de pantalla de GTA V con Michael, Franklin, Trevor y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA V",
            description:
                "Explora herramientas y mods para la versión de PC de GTA V: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA V",
            description:
                "Consulta todos los logros y trofeos de GTA V, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA V",
            description:
                "Explora el mapa interactivo de Los Santos y Blaine County y encuentra coleccionables, misiones, armas, vehículos, secretos y mucho más.",
        },
        radio: {
            title: "Radios de GTA V",
            description:
                "Escucha las emisoras de GTA V y sus canciones, incluyendo Non-Stop Pop FM, Los Santos Rock Radio y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA V",
            description:
                "Descubre todos los trucos de GTA V para PlayStation 3, Xbox 360, PC y la versión remasterizada, con códigos para cada plataforma.",
        },
    },
    VI: {
        inicio: {
            title: "GTA VI: información, mapa, noticias y más",
            description:
                "Descubre toda la información de GTA VI: personajes, mapa de Leonida, noticias, novedades, ficha técnica y más en Vice Club.",
        },
        timeline: {
            title: "Línea de tiempo de GTA VI | Filtraciones y noticias",
            description:
                "Consulta la línea de tiempo de GTA VI con filtraciones, noticias, rumores, información oficial y los acontecimientos más importantes desde su anuncio.",
        },
    },
};
