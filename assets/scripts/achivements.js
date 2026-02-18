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
    const coloresTags = {
        "Perdible": { background: "#6b2a2a", color: "#ff6b6b" },
        "Historia": { background: "#2a4a2a", color: "#6bff6b" },
        "Coleccionable": { background: "#858126", color: "#e4ff6b" },
        "Paciencia": { background: "#2a3a5a", color: "#6ba3ff" },
        "Online": { background: "#B1261A", color: "#fafafa" }
    };

    fetch(rutaJSON)
        .then(function (respuesta) {
            if (!respuesta.ok) throw new Error("No se encontró el archivo JSON");
            return respuesta.json();
        })
        .then(function (datos) {
            renderizarLogros(datos);
            configurarBotones();
        })
        .catch(function (error) {
            console.error("Error al cargar los logros:", error);
        });

    function renderizarLogros(datos) {
        const secciones = ["original", "definitive", "socialclub", "iv", "tbogt", "tlad", "enhanced"];

        secciones.forEach(function (seccion) {
            const contenedor = document.querySelector("#" + seccion + " .achievement-list");

            if (!contenedor || !datos[seccion]) return;

            datos[seccion].forEach(function (logro) {
                const tarjeta = document.createElement("div");


                tarjeta.className = "achievement-card";

                tarjeta.innerHTML = `
                    <div class="achievement-card-header">
                        <img src="${logro.imagen}" alt="${logro.nombre}" class="achievement-img" loading="lazy" decoding="async">
                        <div class="achievement-card-info">
                            <h3 class="achievement-name">${logro.nombre}</h3>
                            <p class="achievement-description">${logro.descripcion}</p>
                            <div class="achievement-tag-container">
                                ${(logro.tags || []).map(tag => {
                    const estilo = coloresTags[tag] || {};

                    return `<span class="achievement-tag" style="background-color: ${estilo.background || "#2a2a3d"}; color: ${estilo.color || "#b0b0cc"}">${tag}</span>`;
                }).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="achievement-card-guide">
                        <button class="achievement-toggle" aria-expanded="false">
                            <span>Guía</span>
                            <span class="achievement-toggle-icon">+</span>
                        </button>
                        <p class="achievement-guide-text">${logro.como_conseguirlo}</p>
                    </div>
                `;

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
