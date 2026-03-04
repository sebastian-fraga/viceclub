
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

function getAvailablePlatforms(cheatsObject) {

    const platforms = new Set();

    Object.values(cheatsObject).forEach(categoryArray => {

        categoryArray.forEach(cheat => {

            if (!cheat.codes) return;

            Object.keys(cheat.codes).forEach(platform => {
                platforms.add(platform);
            });

        });

    });

    return Array.from(platforms);
}

function renderCheats() {

    const container = document.getElementById("cheatsContainer");
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Object.entries(cheats).forEach(([category, cheatsInCategory]) => {

        const section = document.createElement("section");
        section.className = "cheat-category";

        const title = document.createElement("h3");
        title.className = "category-title";
        title.textContent = category;

        const list = document.createElement("div");
        list.className = "category-list";

        cheatsInCategory.forEach(cheat => {

            const code = cheat.codes[currentPlatform];
            if (!code) return;

            const cheatItem = document.createElement("div");
            cheatItem.className = "cheat-item";
            cheatItem.id = cheat.id;

            const cheatTitle = document.createElement("h4");
            cheatTitle.className = "cheat-title";
            cheatTitle.textContent = cheat.title;

            const cheatCode = document.createElement("div");
            cheatCode.className = "cheat-code";

            if (currentPlatform === "pc") {

                const span = document.createElement("span");
                span.className = "pc-code";
                span.textContent = code[0];
                cheatCode.appendChild(span);

            } else {

                code.forEach(btn => {

                    const icon = BUTTON_ICONS[currentPlatform]?.[btn];

                    if (!icon) {
                        const span = document.createElement("span");
                        span.className = "btn-text";
                        span.textContent = btn;
                        cheatCode.appendChild(span);
                        return;
                    }

                    const img = document.createElement("img");
                    img.src = `../assets/images/cheats/${currentPlatform}/${icon}`;
                    img.className = "btn-icon";
                    img.alt = btn;
                    img.loading = "lazy";

                    cheatCode.appendChild(img);
                });
            }

            cheatItem.appendChild(cheatTitle);
            cheatItem.appendChild(cheatCode);
            list.appendChild(cheatItem);
        });

        if (list.children.length === 0) return;

        section.appendChild(title);
        section.appendChild(list);
        fragment.appendChild(section);

    });

    container.appendChild(fragment);
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

    const cheatsObject = await loadCheats();

    const availablePlatforms = getAvailablePlatforms(cheatsObject);


    cheats = cheatsObject;

    if (availablePlatforms.length === 1) {

        currentPlatform = availablePlatforms[0];

        const selector = document.querySelector(".platform-selector");
        if (selector) selector.style.display = "none";

    } else {
        initPlatformSelector();
    }

    renderCheats();
});