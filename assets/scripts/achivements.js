document.addEventListener("DOMContentLoaded", function () {
    const rutaActual = window.location.pathname;
    const carpetas = ["III", "VC", "SA", "IV", "V"];
    const secciones = [
        "original",
        "definitive",
        "socialclub",
        "iv",
        "tlad",
        "tbogt",
        "enhanced",
    ];
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
        const disclaimer = document.querySelector(".achievement-disclaimer");
        if (disclaimer) disclaimer.style.display = "none";

        const selector = document.querySelector(".card-selector");
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

        secciones.forEach((seccion) => {
            const contenedor = document.querySelector(
                `#${seccion} .achievement-list`,
            );
            if (contenedor) contenedor.innerHTML = skeletonHTML;
        });
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
        const disclaimer = document.querySelector(".achievement-disclaimer");
        if (disclaimer) {
            const tabInicial =
                localStorage.getItem(`achievements_tab_${juego}`) || "iv";
            disclaimer.style.display = tabInicial === "iv" ? "" : "none";
        }
    }

    function configurarBotones(datos) {
        if (juego === "IV") {
            renderizarSelectorVisual(datos);
            return;
        }

        const botones = document.querySelectorAll(
            ".achievement-selector button",
        );
        botones.forEach(function (boton) {
            boton.addEventListener("click", function () {
                const seccionObjetivo = this.getAttribute("data-seccion");
                if (!seccionObjetivo) return;

                document
                    .querySelectorAll(".achievement-content")
                    .forEach(function (contenido) {
                        contenido.style.display = "none";
                    });

                botones.forEach(function (btn) {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });

                document.getElementById(seccionObjetivo).style.display =
                    "block";
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");
            });
        });
    }

    function renderizarSelectorVisual(datos) {
        const selector = document.querySelector(".card-selector");
        if (!selector) return;

        const tabsDisponibles = secciones.filter(
            (s) => datos[s] && datos[s].length > 0,
        );

        selector.innerHTML = "";

        tabsDisponibles.forEach((tabId, i) => {
            const btn = document.createElement("button");
            btn.className = "checklist-tab-btn" + (i === 0 ? " active" : "");
            btn.dataset.seccion = tabId;
            btn.innerHTML = `
            <div class="tab-card">
                <img src="/assets/images/main/card_${tabId}.webp" alt="${tabId}">
                <div class="tab-overlay"></div>
            </div>
        `;

            btn.addEventListener("click", function () {
                document
                    .querySelectorAll(".achievement-content")
                    .forEach((c) => {
                        c.style.display = "none";
                    });

                selector.querySelectorAll(".checklist-tab-btn").forEach((b) => {
                    b.classList.remove("active");
                });

                document.getElementById(tabId).style.display = "block";
                this.classList.add("active");

                localStorage.setItem(`achievements_tab_${juego}`, tabId);

                const disclaimer = document.querySelector(
                    ".achievement-disclaimer",
                );
                if (disclaimer)
                    disclaimer.style.display = tabId === "iv" ? "" : "none";
            });

            selector.appendChild(btn);
        });

        if (tabsDisponibles.length > 0) {
            const tabGuardada = localStorage.getItem(
                `achievements_tab_${juego}`,
            );
            const tabInicial = tabsDisponibles.includes(tabGuardada)
                ? tabGuardada
                : tabsDisponibles[0];

            const btnInicial = selector.querySelector(
                `[data-seccion="${tabInicial}"]`,
            );
            if (btnInicial) {
                selector
                    .querySelectorAll(".checklist-tab-btn")
                    .forEach((b) => b.classList.remove("active"));
                btnInicial.classList.add("active");
            }

            document.querySelectorAll(".achievement-content").forEach((c) => {
                c.style.display = "none";
            });
            document.getElementById(tabInicial).style.display = "block";

            document.getElementById(tabInicial).style.display = "block";
        }

        if (selector) selector.style.display = "flex";
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
