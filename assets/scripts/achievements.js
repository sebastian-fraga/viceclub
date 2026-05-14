document.addEventListener("DOMContentLoaded", function () {
    const rutaActual = window.location.pathname;
    const carpetas = ["III", "VC", "SA", "IV", "V"];
    const secciones = [
        "iii_original",
        "iii_definitive",
        "vc_original",
        "vc_definitive",
        "sa_original",
        "sa_definitive",
        "socialclub",
        "iv",
        "tlad",
        "tbogt",
        "v_original",
        "v_enhanced",
    ];

    const ACHIEVEMENT_TABS = {
        iii_original: {
            label: "Originales",
            icon: "iii_original.webp",
            color: "#d7d7d7",
            glow: "rgba(215,215,215,0.1)",
            bg: "linear-gradient(135deg, rgba(40,40,50,0.4), rgba(200,200,220,0.35))",
        },
        iii_definitive: {
            label: "Edición Definitiva",
            icon: "iii_definitive.webp",
            color: "#B8281B",
            glow: "rgba(255, 25, 25, 0.1)",
            bg: "linear-gradient(135deg,rgba(255, 97, 97, 0.35), rgba(173, 52, 22, 0.4))",
        },
        vc_original: {
            label: "Originales",
            icon: "vc_original.webp",
            color: "#DC84B0",
            glow: "rgba(244, 194, 253, 0.15)",
            bg: "linear-gradient(135deg, rgba(220, 132, 176, 0.4), rgba(248, 199, 224, 0.35))",
        },
        vc_definitive: {
            label: "Edición Definitiva",
            icon: "vc_definitive.webp",
            color: "#D98EB6",
            glow: "rgba(244, 194, 253, 0.15)",
            bg: "linear-gradient(135deg, rgba(217, 142, 182, 0.4), rgba(194, 92, 171, 0.35))",
        },
        sa_original: {
            label: "Originales",
            icon: "sa_original.webp",
            color: "#5fa459",
            glow: "rgba(72, 178, 27, 0.15)",
            bg: "linear-gradient(135deg, rgba(49, 77, 50, 0.4), rgba(150, 235, 157, 0.35))",
        },
        sa_definitive: {
            label: "Edición Definitiva",
            icon: "sa_definitive.webp",
            color: "#70bb69",
            glow: "rgba(117, 189, 85, 0.15)",
            bg: "linear-gradient(135deg, rgba(70,90,55,0.4), rgba(140,170,95,0.35))",
        },
        socialclub: {
            label: "Social Club",
            icon: "socialclub.webp",
            color: "#f0c04a",
            glow: "rgba(240,192,74,0.1)",
            bg: "linear-gradient(135deg, rgba(70,55,10,0.4), rgba(255,210,90,0.35))",
        },
        iv: {
            label: "GTA IV",
            icon: "iv.webp",
            color: "#fdfdfd",
            glow: "rgba(141,178,255,0.1)",
            bg: "linear-gradient(135deg, rgba(180,190,210,0.38), rgba(35,35,40,0.4))",
        },
        tlad: {
            label: "The Lost and Damned",
            icon: "tlad.webp",
            color: "#f8746f",
            glow: "rgba(255, 94, 82, 0.1)",
            bg: "linear-gradient(135deg, rgba(87, 2, 2, 0.4), rgba(250, 75, 75, 0.35))",
        },
        tbogt: {
            label: "The Ballad of Gay Tony",
            icon: "tbogt.webp",
            color: "#f075e0",
            glow: "rgba(255,92,168,0.1)",
            bg: "linear-gradient(135deg, rgba(87,2,40,0.4), rgba(250,75,150,0.35))",
        },
        v_original: {
            label: "Originales",
            icon: "v_original.webp",
            color: "#6bff95",
            glow: "rgba(107,255,149,0.1)",
            bg: "linear-gradient(135deg, rgba(2,87,40,0.4), rgba(75,250,127,0.35))",
        },
        v_enhanced: {
            label: "Versión Enhanced",
            icon: "v_enhanced.webp",
            color: "#a1ff6b",
            glow: "rgba(147, 255, 107, 0.1)",
            bg: "linear-gradient(135deg, rgba(47, 87, 2, 0.4), rgba(104, 250, 75, 0.35))",
        },
    };

    const coloresRarity = {
        bronze: { border: "2px solid #ffb89770" },
        silver: { border: "2px solid #B5B5B570" },
        gold: { border: "2px solid #f5b33970" },
        platinum: { border: "2px solid #7191fa70" },
    };

    const coloresTags = {
        Perdible: { background: "#6b2a2a", color: "#ff6b6b" },
        Historia: { background: "#2a4a2a", color: "#6bff6b" },
        Coleccionable: { background: "#858126", color: "#e4ff6b" },
        Paciencia: { background: "#2a3a5a", color: "#6ba3ff" },
        Online: { background: "#B1261A", color: "#fafafa" },
    };

    let juego = null;

    carpetas.forEach(function (carpeta) {
        if (rutaActual.includes("/" + carpeta + "/")) {
            juego = carpeta;
        }
    });

    if (!juego) {
        console.error("No se pudo detectar el juego desde la URL.");
        return;
    }

    const rutaJSON =
        "https://viceclub.s3.us-east-1.amazonaws.com/" +
        juego +
        "/achievements.json";

    mostrarSkeletons();

    fetch(rutaJSON)
        .then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
        })
        .then((datos) => {
            renderizarLogros(datos);
            configurarBotones(datos);
        })

        .catch((error) => console.error("Error al cargar los logros:", error));

    function mostrarSkeletons() {
        const selector = document.querySelector(".platform-selector");
        if (selector) selector.style.display = "none";

        const skeletonHTML = Array(4)
            .fill(
                `
        <div class="skeleton-entry achievement-skeleton">
            <div class="skeleton skeleton-date"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text short"></div>
        </div>
    `,
            )
            .join("");

        document.querySelectorAll(".achievement-content").forEach((c) => {
            c.style.display = "none";
        });

        const primero = document.querySelector(".achievement-content");
        if (primero) {
            const disclaimer = primero.querySelector(".achievement-disclaimer");
            if (disclaimer) disclaimer.style.display = "none";
            const lista = primero.querySelector(".achievement-list");
            if (lista) lista.innerHTML = skeletonHTML;
            primero.style.display = "block";
        }
    }

    function renderizarLogros(datos) {
        secciones.forEach(function (seccion) {
            const contenedor = document.querySelector(
                "#" + seccion + " .achievement-list",
            );

            if (!contenedor || !datos[seccion]) return;

            contenedor.innerHTML = "";

            datos[seccion].forEach(function (logro) {
                const tarjeta = document.createElement("div");
                tarjeta.className = "achievement-card";
                const estiloRarity = coloresRarity[logro.rarity] || {};

                if (logro.rarity === "platinum") {
                    estiloRarity.margin = "0 0 30px 0";
                }

                Object.assign(tarjeta.style, estiloRarity);
                tarjeta.innerHTML = "";
                const fragment = document.createDocumentFragment();

                // Header
                const header = document.createElement("div");
                header.className = "achievement-card-header";

                // Imagen
                const img = document.createElement("img");
                img.src = logro.imagen;
                img.alt = logro.nombre;
                img.className = "achievement-img";
                img.loading = "lazy";
                img.decoding = "async";

                header.appendChild(img);

                // Info container
                const info = document.createElement("div");
                info.className = "achievement-card-info";

                // Nombre
                const h3 = document.createElement("h3");
                h3.className = "achievement-name";
                h3.textContent = logro.nombre;

                // Descripción
                const desc = document.createElement("p");
                desc.className = "achievement-description";
                desc.textContent = logro.descripcion;

                // Tags
                const tagContainer = document.createElement("div");
                tagContainer.className = "achievement-tag-container";

                (logro.tags || []).forEach((tag) => {
                    const estilo = coloresTags[tag] || {};

                    const span = document.createElement("span");
                    span.className = "achievement-tag";
                    span.textContent = tag;

                    span.style.backgroundColor = estilo.background || "#2a2a3d";
                    span.style.color = estilo.color || "#b0b0cc";

                    tagContainer.appendChild(span);
                });

                info.appendChild(h3);
                info.appendChild(desc);
                info.appendChild(tagContainer);

                header.appendChild(info);

                const guide = document.createElement("div");
                guide.className = "achievement-card-guide";

                const button = document.createElement("button");
                button.className = "achievement-toggle";
                button.setAttribute("aria-expanded", "false");

                const spanText = document.createElement("span");
                spanText.textContent = "Guía";

                const spanIcon = document.createElement("span");
                spanIcon.className = "achievement-toggle-icon";
                spanIcon.textContent = "+";

                button.appendChild(spanText);
                button.appendChild(spanIcon);

                const guideText = document.createElement("p");
                guideText.className = "achievement-guide-text";
                guideText.textContent = logro.como_conseguirlo;

                guide.appendChild(button);
                guide.appendChild(guideText);

                fragment.appendChild(header);
                fragment.appendChild(guide);

                tarjeta.appendChild(fragment);

                contenedor.appendChild(tarjeta);
            });
        });
        document.querySelectorAll(".achievement-content").forEach((content) => {
            const disclaimer = content.querySelector(".achievement-disclaimer");
            if (disclaimer) disclaimer.style.display = "";
        });
    }

    function configurarBotones(datos) {
        if (["III", "VC", "SA", "IV", "V"].includes(juego)) {
            renderizarSelectorVisual(datos);
            return;
        }
    }

    function renderizarSelectorVisual(datos) {
        const selector = document.querySelector(".platform-selector");
        if (!selector) return;

        const tabsDisponibles = secciones.filter(
            (s) => datos[s] && datos[s].length > 0,
        );

        selector.innerHTML = "";

        const tabGuardada = localStorage.getItem(`achievements_tab_${juego}`);
        const tabInicial = tabsDisponibles.includes(tabGuardada)
            ? tabGuardada
            : tabsDisponibles[0];

        tabsDisponibles.forEach((tabId) => {
            const config = ACHIEVEMENT_TABS[tabId];
            if (!config) return;

            const familyWrapper = document.createElement("div");
            familyWrapper.className = "platform-family";

            const button = document.createElement("button");
            button.className =
                "platform-btn" + (tabId === tabInicial ? " active" : "");
            button.dataset.platform = tabId;

            button.style.setProperty("--platform-color", config.color);
            button.style.setProperty(
                "--platform-glow",
                config.glow ?? "rgba(255,255,255,0.05)",
            );
            button.style.background = config.bg;
            button.style.outlineColor = config.color;

            button.innerHTML = `
            <div class="platform-card">
                <img src="/assets/images/icons/games/combination_mark/${config.icon}" alt="${config.label}">
                <span>${config.label}</span>
            </div>
        `;

            button.addEventListener("click", () => {
                selector.querySelectorAll(".platform-btn").forEach((b) => {
                    b.classList.remove("active");
                });

                document
                    .querySelectorAll(".achievement-content")
                    .forEach((c) => {
                        c.style.display = "none";
                    });

                button.classList.add("active");
                const activeContent = document.getElementById(tabId);
                activeContent.style.display = "block";
                localStorage.setItem(`achievements_tab_${juego}`, tabId);
            });

            familyWrapper.appendChild(button);
            selector.appendChild(familyWrapper);
        });

        document.querySelectorAll(".achievement-content").forEach((c) => {
            c.style.display = "none";
        });

        document.getElementById(tabInicial).style.display = "block";
        selector.style.display = "flex";
    }

    document.addEventListener("click", function (event) {
        const botonToggle = event.target.closest(".achievement-toggle");
        if (!botonToggle) return;

        const textoContainer = botonToggle.parentElement;
        const texto = textoContainer.querySelector(".achievement-guide-text");
        const icono = botonToggle.querySelector(".achievement-toggle-icon");
        const estaAbierto =
            botonToggle.getAttribute("aria-expanded") === "true";

        if (estaAbierto) {
            texto.style.maxHeight = "0";
            texto.style.opacity = "0";
            icono.textContent = "+";
            texto.classList.toggle("open");
            botonToggle.setAttribute("aria-expanded", "false");
        } else {
            texto.style.maxHeight = texto.scrollHeight + "px";
            texto.style.opacity = "1";
            icono.textContent = "+";
            texto.classList.toggle("open");
            botonToggle.setAttribute("aria-expanded", "true");
        }
    });
});
