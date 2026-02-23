
const PLATFORM_STORAGE_KEY = "viceclub_selected_platform";
let currentPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY) || "ps";
let cheats = [];

const juegos = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];

const BUTTON_ICONS = {
    ps: {
        R1: "R1.webp", R2: "R2.webp", L1: "L1.webp", L2: "L2.webp",
        UP: "UP.webp", DOWN: "DOWN.webp", LEFT: "LEFT.webp", RIGHT: "RIGHT.webp", CIRCLE: "CIRCLE.webp", CROSS: "CROSS.webp", SQUARE: "SQUARE.webp", TRIANGLE: "TRIANGLE.webp",
    },
    xbox: {
        RB: "RB.webp", RT: "RT.webp", LB: "LB.webp", LT: "LT.webp",
        UP: "UP.webp", DOWN: "DOWN.webp", LEFT: "LEFT.webp", RIGHT: "RIGHT.webp", B: "B.webp", A: "A.webp", X: "X.webp", Y: "Y.webp",
    },
    switch: {
        ZL: "ZL.webp", ZR: "ZR.webp", L: "L.webp", R: "R.webp",
        UP: "UP.webp", DOWN: "DOWN.webp", LEFT: "LEFT.webp", RIGHT: "RIGHT.webp", B: "B.webp", A: "A.webp", X: "X.webp", Y: "Y.webp",
    },
};


function detectarJuego() {
    const ruta = window.location.pathname;
    let juegoDetectado = null;

    juegos.forEach(juego => {
        if (ruta.includes("/" + juego + "/")) {
            juegoDetectado = juego;
        }
    });

    return juegoDetectado;
}


async function loadCheats() {

    const juego = detectarJuego();

    if (!juego) {
        console.error("No se pudo detectar el juego desde la URL.");
        return [];
    }

    const rutaJSON =
        `https://viceclub.s3.us-east-1.amazonaws.com/${juego}/cheats.json`;

    try {
        const response = await fetch(rutaJSON);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando cheats.json:", error);
        return [];
    }
}


function groupByCategory(cheatsArray) {
    return cheatsArray.reduce((groups, cheat) => {
        const category = cheat.category || "Otros";

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(cheat);
        return groups;
    }, {});
}

function renderCheats() {

    const container = document.getElementById("cheatsContainer");
    if (!container) return;

    container.innerHTML = Object.entries(cheats).map(([category, cheatsInCategory]) => {

        const cheatsHTML = cheatsInCategory.map(cheat => {

            const code = cheat.codes[currentPlatform];

            if (!code) return "";

            let renderedCode;

            if (currentPlatform === "pc") {
                renderedCode = `
                    <span class="pc-code">
                        ${code[0]}
                    </span>
                `;
            } else {
                renderedCode = code.map(btn => {

                    const icon = BUTTON_ICONS[currentPlatform]?.[btn];

                    if (!icon) {
                        return `<span class="btn-text">${btn}</span>`;
                    }

                    return `
                        <img
                            src="../assets/images/cheats/${currentPlatform}/${icon}"
                            class="btn-icon"
                            alt="${btn}"
                            loading="lazy"
                        >
                    `;
                }).join("");
            }

            return `
                <div class="cheat-item" id="${cheat.id}">
                    <h4 class="cheat-title">${cheat.title}</h4>
                    <div class="cheat-code">
                        ${renderedCode}
                    </div>
                </div>
            `;
        }).join("");

        if (!cheatsHTML.trim()) return "";

        return `
            <section class="cheat-category">
                <h3 class="category-title">${category}</h3>
                <div class="category-list">
                    ${cheatsHTML}
                </div>
            </section>
        `;

    }).join("");
}


function initPlatformSelector() {

    const buttons = document.querySelectorAll(".platform-btn");

    buttons.forEach(btn => {

        if (btn.dataset.platform === currentPlatform) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {

            buttons.forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentPlatform = btn.dataset.platform;

            localStorage.setItem(PLATFORM_STORAGE_KEY, currentPlatform);

            renderCheats();
        });
    });
}


document.addEventListener("DOMContentLoaded", async () => {

    cheats = await loadCheats();

    initPlatformSelector();
    renderCheats();
});