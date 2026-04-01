document.addEventListener("DOMContentLoaded", function () {

    const rutaActual = window.location.pathname;
    const carpetas = ["III", "VC", "SA", "IV", "V"];
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

    const rutaJSON = "https://viceclub.s3.us-east-1.amazonaws.com/" + juego + "/achievements.json";
    const coloresRarity = {
        "bronze": { border: "2px solid #ff936170" },
        "silver": { border: "2px solid #B5B5B570" },
        "gold": { border: "2px solid #e9b14b70" },
        "platinum": { border: "2px solid #7989bf70" },
    }
    const coloresTags = {
        "Perdible": { background: "#6b2a2a", color: "#ff6b6b" },
        "Historia": { background: "#2a4a2a", color: "#6bff6b" },
        "Coleccionable": { background: "#858126", color: "#e4ff6b" },
        "Paciencia": { background: "#2a3a5a", color: "#6ba3ff" },
        "Online": { background: "#B1261A", color: "#fafafa" }
    };

    fetch(rutaJSON)
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(datos => renderizarLogros(datos))
        .catch(error => console.error("Error al cargar los logros:", error))
        .finally(() => configurarBotones());

    function renderizarLogros(datos) {
        const secciones = ["original", "definitive", "socialclub", "iv", "tbogt", "tlad", "enhanced"];

        secciones.forEach(function (seccion) {
            const contenedor = document.querySelector("#" + seccion + " .achievement-list");

            if (!contenedor || !datos[seccion]) return;

            datos[seccion].forEach(function (logro) {
                const tarjeta = document.createElement("div");
                tarjeta.className = "achievement-card";
                const estiloRarity = coloresRarity[logro.rarity] || {};
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

                (logro.tags || []).forEach(tag => {
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
    }


    function configurarBotones() {
        const botones = document.querySelectorAll(".achievement-selector button");

        botones.forEach(function (boton) {
            boton.addEventListener("click", function () {

                const seccionObjetivo = this.getAttribute("data-seccion");
                if (!seccionObjetivo) return;


                document.querySelectorAll(".achievement-content").forEach(function (contenido) {
                    contenido.style.display = "none";
                });

                botones.forEach(function (btn) {
                    btn.classList.remove("active");
                });

                document.getElementById(seccionObjetivo).style.display = "block";
                this.classList.add("active");
            });
        });
    }

    document.addEventListener("click", function (event) {
        const botonToggle = event.target.closest(".achievement-toggle");
        if (!botonToggle) return;

        const textoContainer = botonToggle.parentElement;
        const texto = textoContainer.querySelector(".achievement-guide-text");
        const icono = botonToggle.querySelector(".achievement-toggle-icon");
        const estaAbierto = botonToggle.getAttribute("aria-expanded") === "true";

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
