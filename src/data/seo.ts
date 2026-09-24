import type { GameId } from "@/config/games";

type PageSeo = {
    title: string;
    description: string;
};

export const seo: Partial<Record<GameId, Record<string, PageSeo>>> = {
    III: {
        inicio: {
            title: "GTA 3 (GTA III): trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA 3 (GTA III) y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA 3 (GTA III) | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA 3 (GTA III): misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA 3 (GTA III) | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA 3 (GTA III) con Claude, Catalina, Salvatore Leone y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA 3 (GTA III)",
            description:
                "Explora herramientas y mods para la versión de PC de GTA 3 (GTA III): fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA 3 (GTA III)",
            description:
                "Consulta todos los logros y trofeos de GTA 3 (GTA III), sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA 3 (GTA III)",
            description:
                "Explora el mapa interactivo de Liberty City en GTA 3 (GTA III) y encuentra paquetes ocultos, saltos únicos, misiones secundarias y más.",
        },
        radio: {
            title: "Radios de GTA 3 (GTA III)",
            description:
                "Escucha las emisoras de GTA 3 (GTA III) y sus canciones, incluyendo Flashback FM, MSX, Double Clef FM y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA 3 (GTA III)",
            description:
                "Descubre todos los trucos de GTA 3 (GTA III) para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    VC: {
        inicio: {
            title: "GTA Vice City: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Vice City, trucos, todas las emisoras, trofeos, ficha técnica de GTA Vice City y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA Vice City | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA Vice City: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA Vice City | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA Vice City con Tommy, Lance, Ken Rosenberg y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA Vice City",
            description:
                "Explora herramientas y mods para la versión de PC de GTA Vice City: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA Vice City",
            description:
                "Consulta todos los logros y trofeos de GTA Vice City, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA Vice City",
            description:
                "Explora el mapa interactivo de Vice City y encuentra paquetes ocultos, saltos únicos, propiedades y mucho más.",
        },
        radio: {
            title: "Radios de GTA Vice City",
            description:
                "Escucha las emisoras de GTA Vice City y sus canciones, incluyendo Flash FM, V-Rock, Fever 105 y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA Vice City",
            description:
                "Descubre todos los trucos de GTA Vice City para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    SA: {
        inicio: {
            title: "GTA San Andreas: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Los Santos y alrededores, trucos, todas las emisoras, trofeos, ficha técnica de GTA San Andreas y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA San Andreas | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA San Andreas: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA San Andreas | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA San Andreas con CJ, Big Smoke, Sweet, Ryder, Tenpenny y otros personajes, además de vehículos y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA San Andreas",
            description:
                "Explora herramientas y mods para la versión de PC de GTA San Andreas: fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA San Andreas",
            description:
                "Consulta todos los logros y trofeos de GTA San Andreas, sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA San Andreas",
            description:
                "Explora el mapa interactivo de Los Santos, San Fierro y Las Venturas y encuentra graffitis, fotografías, herraduras, desafíos y mucho más.",
        },
        radio: {
            title: "Radios de GTA San Andreas",
            description:
                "Escucha las emisoras de GTA San Andreas y sus canciones, incluyendo Radio Los Santos, Radio X, SF-UR y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA San Andreas",
            description:
                "Descubre todos los trucos de GTA San Andreas para PlayStation 2, Xbox, PC y la Edición Definitiva, con códigos para cada plataforma.",
        },
    },
    LCS: {
        inicio: {
            title: "GTA Liberty City Stories: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA Liberty City Stories y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA Liberty City Stories | Misiones",
            description:
                "Rastrea tu progreso en GTA Liberty City Stories: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA Liberty City Stories | Personajes",
            description:
                "Descarga artworks y capturas de GTA Liberty City Stories con Toni, Salvatore, Maria Latore y otros personajes, además de vehículos y armas.",
        },
        mapa: {
            title: "Mapa interactivo de GTA Liberty City Stories",
            description:
                "Explora el mapa interactivo de Liberty City y encuentra paquetes ocultos, masacres, misiones secundarias, desafíos y mucho más.",
        },
        radio: {
            title: "Radios de GTA Liberty City Stories",
            description:
                "Escucha las emisoras de GTA Liberty City Stories y sus canciones, incluyendo Flashback 95.6, Liberty Jam y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA Liberty City Stories",
            description:
                "Descubre todos los trucos de GTA Liberty City Stories para PlayStation Portable y PlayStation 2, con códigos para cada plataforma.",
        },
    },
    VCS: {
        inicio: {
            title: "GTA Vice City Stories: trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Vice City, trucos, todas las emisoras, trofeos, ficha técnica de GTA Vice City Stories y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA Vice City Stories | Misiones",
            description:
                "Rastrea tu progreso en GTA Vice City Stories: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA Vice City Stories | Personajes",
            description:
                "Descarga artworks y capturas de GTA Vice City Stories con Victor, Lance, Phil Collins y otros personajes, además de vehículos y armas.",
        },
        mapa: {
            title: "Mapa interactivo de GTA Vice City Stories",
            description:
                "Explora el mapa interactivo de Vice City y encuentra paquetes ocultos, masacres, misiones secundarias, desafíos y mucho más.",
        },
        radio: {
            title: "Radios de GTA Vice City Stories",
            description:
                "Escucha las emisoras de GTA Vice City Stories y sus canciones, incluyendo Flash FM, Radio Espantoso, Wave 103 y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA Vice City Stories",
            description:
                "Descubre todos los trucos de GTA Vice City Stories para PlayStation Portable y PlayStation 2, con códigos para cada plataforma.",
        },
    },
    IV: {
        inicio: {
            title: "GTA 4 (GTA IV): trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Liberty City, trucos, todas las emisoras, trofeos, ficha técnica de GTA 4 (GTA IV), The Lost and Damned, The Ballad of Gay Tony y más. Toda la información en Vice Club.",
        },
        "100": {
            title: "Checklist 100% de GTA 4 (GTA IV) | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA 4 (GTA IV) y sus expansiones: misiones de la historia, coleccionables y trabajos secundarios para completar el 100% de cada juego.",
        },
        artworks: {
            title: "Artworks de GTA 4 (GTA IV) | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA 4 (GTA IV) con Niko, Roman, Dimitri y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA 4 (GTA IV)",
            description:
                "Explora herramientas y mods para la versión de PC de GTA 4 (GTA IV): fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA 4 (GTA IV)",
            description:
                "Consulta todos los logros y trofeos de GTA 4 (GTA IV), The Lost and Damned y The Ballad of Gay Tony, sus requisitos y cómo desbloquearlos.",
        },
        mapa: {
            title: "Mapa interactivo de GTA 4 (GTA IV)",
            description:
                "Explora el mapa interactivo de Liberty City en GTA 4 (GTA IV) y encuentra ratas voladoras, saltos únicos, vehículos de Stevie, gaviotas y más.",
        },
        radio: {
            title: "Radios de GTA 4 (GTA IV)",
            description:
                "Escucha las emisoras de GTA 4 (GTA IV) y sus canciones, incluyendo San Juan Sounds, Electro-Choc, Radio Broker y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA 4 (GTA IV)",
            description:
                "Descubre todos los trucos de GTA 4 (GTA IV) y sus expansiones The Lost and Damned y The Ballad of Gay Tony, con códigos de celular para cada juego.",
        },
    },
    V: {
        inicio: {
            title: "GTA 5 (GTA V): trucos, mapa, lista del 100% y más",
            description:
                "Mapa interactivo de Los Santos y Blaine County, trucos, todas las emisoras, trofeos, ficha técnica de GTA 5 (GTA V) y más. Toda la información en Vice Club",
        },
        "100": {
            title: "Checklist 100% de GTA 5 (GTA V) | Misiones y coleccionables",
            description:
                "Rastrea tu progreso en GTA 5 (GTA V): misiones de la historia, coleccionables y trabajos secundarios para completar el 100% del juego.",
        },
        artworks: {
            title: "Artworks de GTA 5 (GTA V) | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA 5 (GTA V) con Michael, Franklin, Trevor y otros personajes, además de vehículos, escenarios y armas.",
        },
        "herramientas-y-mods": {
            title: "Mods y herramientas para GTA 5 (GTA V)",
            description:
                "Explora herramientas y mods para la versión de PC de GTA 5 (GTA V): fixes, mejoras de jugabilidad y modificaciones esenciales.",
        },
        logros: {
            title: "Guía de logros y trofeos para GTA 5 (GTA V)",
            description:
                "Consulta todos los logros y trofeos de GTA 5 (GTA V), sus requisitos y cómo desbloquearlos para completar el juego al 100%.",
        },
        mapa: {
            title: "Mapa interactivo de GTA 5 (GTA V)",
            description:
                "Explora el mapa interactivo de Los Santos y Blaine County en GTA 5 (GTA V) y encuentra coleccionables, saltos únicos, vuelos a cuchillo y más.",
        },
        radio: {
            title: "Radios de GTA 5 (GTA V)",
            description:
                "Escucha las emisoras de GTA 5 (GTA V) y sus canciones, incluyendo Non-Stop Pop FM, Los Santos Rock Radio y muchas más.",
        },
        trucos: {
            title: "Trucos de GTA 5 (GTA V)",
            description:
                "Descubre todos los trucos de GTA 5 (GTA V) para PlayStation 3, Xbox 360, PC y la versión remasterizada, con códigos para cada plataforma.",
        },
    },
    VI: {
        inicio: {
            title: "GTA 6 (GTA VI): información, mapa, noticias y más",
            description:
                "Toda la información de GTA 6 (GTA VI): personajes, mapa de Leonida, noticias, novedades y ficha técnica en Vice Club.",
        },
        artworks: {
            title: "Artworks de GTA 6 (GTA VI) | Personajes y vehículos",
            description:
                "Descarga artworks y capturas de GTA 6 (GTA VI) con Jason, Lucia, escenarios de Leonida, vehículos y armas.",
        },
        timeline: {
            title: "Línea de tiempo de GTA 6 (GTA VI) | Filtraciones y noticias",
            description:
                "Línea de tiempo de GTA 6 (GTA VI) con filtraciones, noticias, rumores e información oficial desde su anuncio.",
        },
    },
};
