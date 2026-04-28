const PLATFORM_STORAGE_KEY = "viceclub_selected_platform";
let currentPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY) || "ps";

let cheats = [];

const juegos = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];

const BUTTON_ICONS = {
    ps: {
        R1: { icon: "R1.webp", bg: "#1b2a5585" },
        R2: { icon: "R2.webp", bg: "#1b2a5585" },
        L1: { icon: "L1.webp", bg: "#1b2a5585" },
        L2: { icon: "L2.webp", bg: "#1b2a5585" },
        UP: { icon: "UP.webp", bg: "#1b2a5585" },
        DOWN: { icon: "DOWN.webp", bg: "#1b2a5585" },
        LEFT: { icon: "LEFT.webp", bg: "#1b2a5585" },
        RIGHT: { icon: "RIGHT.webp", bg: "#1b2a5585" },
        CIRCLE: { icon: "CIRCLE.webp", bg: "#1b2a5585" },
        CROSS: { icon: "CROSS.webp", bg: "#1b2a5585" },
        SQUARE: { icon: "SQUARE.webp", bg: "#1b2a5585" },
        TRIANGLE: { icon: "TRIANGLE.webp", bg: "#1b2a5585" },
    },
    xbox: {
        RB: { icon: "RB.webp", bg: "#204723c4" },
        RT: { icon: "RT.webp", bg: "#204723c4" },
        LB: { icon: "LB.webp", bg: "#204723c4" },
        LT: { icon: "LT.webp", bg: "#204723c4" },
        UP: { icon: "UP.webp", bg: "#204723c4" },
        DOWN: { icon: "DOWN.webp", bg: "#204723c4" },
        LEFT: { icon: "LEFT.webp", bg: "#204723c4" },
        RIGHT: { icon: "RIGHT.webp", bg: "#204723c4" },
        A: { icon: "A.webp", bg: "#204723c4" },
        B: { icon: "B.webp", bg: "#204723c4" },
        X: { icon: "X.webp", bg: "#204723c4" },
        Y: { icon: "Y.webp", bg: "#204723c4" },
    },
    switch: {
        ZL: { icon: "ZL.webp", bg: "#463636c4" },
        ZR: { icon: "ZR.webp", bg: "#463636c4" },
        L: { icon: "L.webp", bg: "#463636c4" },
        R: { icon: "R.webp", bg: "#463636c4" },
        UP: { icon: "UP.webp", bg: "#463636c4" },
        DOWN: { icon: "DOWN.webp", bg: "#463636c4" },
        LEFT: { icon: "LEFT.webp", bg: "#463636c4" },
        RIGHT: { icon: "RIGHT.webp", bg: "#463636c4" },
        A: { icon: "A.webp", bg: "#463636c4" },
        B: { icon: "B.webp", bg: "#463636c4" },
        X: { icon: "X.webp", bg: "#463636c4" },
        Y: { icon: "Y.webp", bg: "#463636c4" },
    },
};

function detectarJuego() {
    const ruta = window.location.pathname;
    let juegoDetectado = null;

    juegos.forEach((juego) => {
        if (ruta.includes("/" + juego + "/")) {
            juegoDetectado = juego;
        }
    });

    return juegoDetectado;
}

function mostrarSkeletons() {
    const container = document.getElementById("cheatsContainer");
    if (!container) return;

    const skeletonHTML = Array(4)
        .fill(
            `
        <div class="skeleton-entry cheat-skeleton">
                <div class="skeleton skeleton-date"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>
    `,
        )
        .join("");

    container.innerHTML = skeletonHTML;
}

async function loadCheats() {
    const juego = detectarJuego();

    if (!juego) {
        console.error("No se pudo detectar el juego desde la URL.");
        return [];
    }

    const rutaJSON = `https://viceclub.s3.us-east-1.amazonaws.com/${juego}/cheats.json`;

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

    Object.values(cheatsObject).forEach((categoryArray) => {
        categoryArray.forEach((cheat) => {
            if (!cheat.codes) return;

            Object.keys(cheat.codes).forEach((platform) => {
                platforms.add(platform);
            });
        });
    });

    return Array.from(platforms);
}

const tooltip = document.querySelector(".tooltip");
const helpIcon = document.querySelector(".help-icon");

function hasVisibleCheats() {
    const items = document.querySelectorAll(".cheat-item");
    if (items.length === 0) return true;
    return Array.from(items).some((item) => item.style.display !== "none");
}

function showTooltip() {
    if (!tooltip || !helpIcon) return;
    if (!hasVisibleCheats()) return;

    tooltip.style.display = "block";
    tooltip.style.visibility = "hidden";

    const rect = helpIcon.getBoundingClientRect();
    const container = document.querySelector(".cheats-search");

    const containerRect = container
        ? container.getBoundingClientRect()
        : { left: 0, top: 0 };

    const tooltipRect = tooltip.getBoundingClientRect();

    const left =
        rect.left - containerRect.left + rect.width / 2 - tooltipRect.width / 2;

    const arrowOffset = rect.left + rect.width / 2 - tooltipRect.left;

    tooltip.style.left = `${left}px`;
    tooltip.style.setProperty("--arrow-x", `${arrowOffset}px`);

    tooltip.style.visibility = "visible";
    tooltip.classList.add("visible");
}

function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove("visible");
    tooltip.style.display = "none";
}

if (helpIcon) {
    helpIcon.addEventListener("mouseenter", showTooltip);
    helpIcon.addEventListener("mouseleave", hideTooltip);
}

function normalize(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function parseQuery(raw) {
    const sections = [];
    const words = [];

    const regex = /(?:section|s|cat):(?:"([^"]+)"|(\S+))|(\S+)/gi;
    let match;
    let hasMatch = false;

    while ((match = regex.exec(raw.toLowerCase())) !== null) {
        hasMatch = true;
        if (match[1] !== undefined) {
            sections.push(match[1]);
        } else if (match[2] !== undefined) {
            sections.push(match[2]);
        } else {
            words.push(match[3]);
        }
    }

    if (!hasMatch) {
        tooltip.style.display = "none";
    }

    return { sections, words };
}

function filterCheats(query) {
    const { sections, words } = parseQuery(query);
    const items = document.querySelectorAll(".cheat-item");

    let visibleCount = 0;

    items.forEach((item) => {
        const title = normalize(item.querySelector(".cheat-title").textContent);

        const matchesWords = words.every((w) => title.includes(normalize(w)));
        item.style.display = matchesWords ? "" : "none";

        if (matchesWords) visibleCount++;
    });

    document.querySelectorAll(".cheat-category").forEach((section) => {
        const categoryKey = section.dataset.category;

        const matchesSection =
            sections.length === 0 ||
            sections.some((s) => categoryKey.includes(s));

        if (!matchesSection) {
            section.style.display = "none";
            return;
        }

        const visibles = [...section.querySelectorAll(".cheat-item")].filter(
            (i) => i.style.display !== "none",
        );

        section.style.display = visibles.length > 0 ? "" : "none";
    });

    if (visibleCount === 0) {
        tooltip.style.visibility = "hidden";
        tooltip.style.display = "none";
        tooltip.classList.remove("visible");
    }

    document.querySelectorAll(".cheat-category").forEach((section) => {
        if (section.style.display === "none") return;

        const visibleItems = [
            ...section.querySelectorAll(".cheat-item"),
        ].filter((i) => i.style.display !== "none");

        section.querySelectorAll(".cheat-item").forEach((item) => {
            item.style.borderRadius = "";
            item.style.background = "";
        });

        visibleItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.style.background =
                    "color-mix(in srgb, var(--block-color) 90%, var(--block-border))";
            }
        });
        const last = visibleItems.at(-1);
        if (last) last.style.borderRadius = "0 0 25px 25px";
    });
}

function renderCheats() {
    const container = document.getElementById("cheatsContainer");
    if (!container) return;

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    Object.entries(cheats).forEach(([category, cheatsInCategory]) => {
        const section = document.createElement("section");
        section.className = "cheat-category";
        section.dataset.category = category
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const header = document.createElement("div");
        header.className = "category-header";
        const title = document.createElement("h3");
        title.className = "category-title";
        title.textContent = category;

        const list = document.createElement("div");
        list.className = "category-list";

        cheatsInCategory.forEach((cheat) => {
            const code = cheat.codes?.[currentPlatform];
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
                code.forEach((text, i) => {
                    if (i > 0) {
                        const sep = document.createElement("span");
                        sep.className = "pc-code-sep";
                        sep.textContent = "/";
                        cheatCode.appendChild(sep);
                    }
                    const span = document.createElement("span");
                    span.className = "pc-code";
                    span.textContent = text;
                    cheatCode.appendChild(span);
                });
            } else {
                code.forEach((btn) => {
                    const btnData = BUTTON_ICONS[currentPlatform]?.[btn];

                    if (!btnData) {
                        const span = document.createElement("span");
                        span.className = "btn-text";
                        span.textContent = btn;
                        cheatCode.appendChild(span);
                        return;
                    }

                    const img = document.createElement("img");
                    img.src = `../assets/images/cheats/${currentPlatform}/${btnData.icon}`;
                    img.style.background = btnData.bg;
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

        header.appendChild(title);
        section.appendChild(header);
        section.appendChild(list);
        fragment.appendChild(section);
    });

    container.appendChild(fragment);
    filterCheats(document.getElementById("searchInput")?.value || "");
}

function initPlatformSelector() {
    const buttons = document.querySelectorAll(".platform-btn");

    buttons.forEach((btn) => {
        if (btn.dataset.platform === currentPlatform) {
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
        } else {
            btn.setAttribute("aria-selected", "false");
        }

        btn.addEventListener("click", () => {
            if (btn.dataset.platform === currentPlatform) return;

            buttons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            currentPlatform = btn.dataset.platform;
            localStorage.setItem(PLATFORM_STORAGE_KEY, currentPlatform);

            const searchInput = document.getElementById("searchInput");
            if (searchInput) searchInput.value = "";
            renderCheats();
            if (searchInput)
                setTimeout(() => filterCheats(searchInput.value), 0);
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    mostrarSkeletons();
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
    document
        .getElementById("searchInput")
        ?.addEventListener("input", (e) => filterCheats(e.target.value));
});
