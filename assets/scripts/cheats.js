const PLATFORM_STORAGE_KEY = "viceclub_selected_platform";

const FAMILY_NAMES = {
    ps: "PlayStation",
    xbox: "Xbox",
    switch: "Nintendo Switch",
    pc: "PC",
};

const BUTTON_ICONS = {
    ps2: {
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
    psp: {
        R: { icon: "R.webp", bg: "#1b2a5585" },
        L: { icon: "L.webp", bg: "#1b2a5585" },
        UP: { icon: "UP.webp", bg: "#1b2a5585" },
        DOWN: { icon: "DOWN.webp", bg: "#1b2a5585" },
        LEFT: { icon: "LEFT.webp", bg: "#1b2a5585" },
        RIGHT: { icon: "RIGHT.webp", bg: "#1b2a5585" },
        CIRCLE: { icon: "CIRCLE.webp", bg: "#1b2a5585" },
        CROSS: { icon: "CROSS.webp", bg: "#1b2a5585" },
        SQUARE: { icon: "SQUARE.webp", bg: "#1b2a5585" },
        TRIANGLE: { icon: "TRIANGLE.webp", bg: "#1b2a5585" },
    },
    ps3: {
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
    ps4: {
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
        BLACK: { icon: "BLACK.webp", bg: "#204723c4" },
        RT: { icon: "RT.webp", bg: "#204723c4" },
        WHITE: { icon: "WHITE.webp", bg: "#204723c4" },
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
    xboxone: {
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

const PLATFORM_FAMILIES = {
    ps2: {
        family: "ps",
        name: "PS2",
        icon: "ps2.svg",
        familyIcon: "playstation.svg",
    },
    psp: {
        family: "ps",
        name: "PSP",
        icon: "psp.svg",
        familyIcon: "playstation.svg",
    },
    ps3: {
        family: "ps",
        name: "PS3",
        icon: "ps3.svg",
        familyIcon: "playstation.svg",
    },
    ps4: {
        family: "ps",
        name: "PS4",
        icon: "ps4.svg",
        familyIcon: "playstation.svg",
    },
    xbox: {
        family: "xbox",
        name: "Xbox",
        icon: "xbox_console.svg",
        familyIcon: "xbox.svg",
    },
    xbox360: {
        family: "xbox",
        name: "Xbox 360",
        icon: "xbox360.svg",
        familyIcon: "xbox.svg",
    },
    xboxone: {
        family: "xbox",
        name: "Xbox One",
        icon: "xboxone.svg",
        familyIcon: "xbox.svg",
    },
    switch: {
        family: "switch",
        name: "Switch",
        icon: "switch_console.svg",
        familyIcon: "switch.svg",
    },
    pc: { family: "pc", name: "PC", icon: "pc.svg", familyIcon: "pc.svg" },
};

const juegos = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];

const storedPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY);
let currentPlatform =
    storedPlatform && PLATFORM_FAMILIES[storedPlatform] ? storedPlatform : null;

let cheats = [];

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
    const keys = new Set();
    Object.values(cheatsObject).forEach((arr) =>
        arr.forEach(
            (cheat) =>
                cheat.codes &&
                Object.keys(cheat.codes).forEach((k) => keys.add(k)),
        ),
    );
    return Array.from(keys);
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
    const cheatCodes = [];

    const regex =
        /(?:section|s|cat):(?:"([^"]+)"|(\S+))|(?:cheat|c):(?:"([^"]+)"|(\S+))|(\S+)/gi;
    let match;
    let hasMatch = false;

    while ((match = regex.exec(raw.toLowerCase())) !== null) {
        hasMatch = true;
        if (match[1] !== undefined) sections.push(match[1]);
        else if (match[2] !== undefined) sections.push(match[2]);
        else if (match[3] !== undefined) cheatCodes.push(match[3]);
        else if (match[4] !== undefined) cheatCodes.push(match[4]);
        else words.push(match[5]);
    }

    if (!hasMatch) tooltip.style.display = "none";

    return { sections, words, cheatCodes };
}

function filterCheats(query) {
    const { sections, words, cheatCodes } = parseQuery(query);
    const items = document.querySelectorAll(".cheat-item");

    let visibleCount = 0;

    items.forEach((item) => {
        const title = normalize(item.querySelector(".cheat-title").textContent);
        const matchesWords = words.every((w) => title.includes(normalize(w)));

        let matchesCheats = true;
        if (cheatCodes.length > 0) {
            const pcTexts = [...item.querySelectorAll(".pc-code")]
                .map((el) => normalize(el.textContent))
                .join(" ");
            matchesCheats = cheatCodes.every((c) =>
                pcTexts.includes(normalize(c)),
            );
        }

        const visible = matchesWords && matchesCheats;
        item.style.display = visible ? "" : "none";
        if (visible) visibleCount++;
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

        const badge = section.querySelector(".category-count");
        if (badge) badge.textContent = visibles.length;

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

        const badge = section.querySelector(".category-count");
        if (badge) badge.textContent = visibleItems.length;

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

    let emptyMsg = document.getElementById("cheats-empty");

    if (visibleCount === 0) {
        tooltip.style.visibility = "hidden";
        tooltip.style.display = "none";
        tooltip.classList.remove("visible");

        if (!emptyMsg) {
            emptyMsg = document.createElement("div");
            emptyMsg.id = "cheats-empty";
            document.getElementById("cheatsContainer").appendChild(emptyMsg);
        }

        emptyMsg.innerHTML = `
        <span class="material-symbols-rounded">search_off</span>
        <p>No se encontraron trucos para <strong>"${query}"</strong></p>
    `;
    } else {
        emptyMsg?.remove();
    }
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

        const count = cheatsInCategory.filter(
            (c) => c.codes?.[currentPlatform],
        ).length;
        const badge = document.createElement("span");
        badge.className = "category-count";
        badge.textContent = count;

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

            if (PLATFORM_FAMILIES[currentPlatform]?.family === "pc") {
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
                    const family = PLATFORM_FAMILIES[currentPlatform]?.family;
                    const btnData =
                        BUTTON_ICONS[currentPlatform]?.[btn] ??
                        BUTTON_ICONS[family]?.[btn];

                    if (!btnData) {
                        const span = document.createElement("span");
                        span.className = "btn-text";
                        span.textContent = btn;
                        cheatCode.appendChild(span);
                        return;
                    }

                    const img = document.createElement("img");
                    img.src = `../assets/images/cheats/${family}/${currentPlatform}/${btnData.icon}`;
                    img.style.background = btnData.bg;
                    img.className = "btn-icon";
                    img.alt = btn;
                    img.loading = "lazy";

                    cheatCode.appendChild(img);
                });
            }

            cheatItem.appendChild(cheatTitle);
            cheatItem.appendChild(cheatCode);

            const note =
                (Array.isArray(cheat.platformNotes)
                    ? cheat.platformNotes.find((n) =>
                          n.platforms.includes(currentPlatform),
                      )?.note
                    : cheat.platformNotes?.[currentPlatform]) ??
                cheat.note ??
                null;

            const noteType = cheat.noteType ?? "info";

            if (note) {
                const noteEl = document.createElement("div");
                noteEl.className = `cheat-note cheat-note--${noteType}`;

                const icon = document.createElement("span");
                icon.className = "material-symbols-rounded cheat-note-icon";
                icon.textContent = noteType === "warning" ? "warning" : "info";

                const text = document.createElement("span");
                text.className = "cheat-note-text";
                text.textContent = note;

                noteEl.appendChild(icon);
                noteEl.appendChild(text);
                cheatItem.appendChild(noteEl);
            }

            list.appendChild(cheatItem);
        });

        if (list.children.length === 0) return;

        header.appendChild(title);
        header.appendChild(badge);
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

function renderPlatformSelector(platformKeys, definitivePlatforms = []) {
    const selector = document.querySelector(".platform-selector");
    if (!selector) return;
    selector.innerHTML = "";

    const families = {};
    platformKeys.forEach((key) => {
        const data = PLATFORM_FAMILIES[key];
        if (!data) return;
        if (!families[data.family]) families[data.family] = [];
        families[data.family].push(key);
    });

    Object.entries(families).forEach(([family, keys]) => {
        const firstKey = keys.find((k) => k === currentPlatform) || keys[0];
        const data = PLATFORM_FAMILIES[firstKey];

        const familyWrapper = document.createElement("div");
        familyWrapper.className = "platform-family";
        const button = document.createElement("button");
        button.className =
            "platform-btn" + (keys.includes(currentPlatform) ? " active" : "");
        button.dataset.platform = firstKey;
        button.dataset.family = family;

        button.innerHTML = `
    <div class="platform-card">
        <img src="../assets/images/platforms/${data.familyIcon}" alt="">
        <span>${FAMILY_NAMES[family] ?? family}</span>
    </div>
`;

        button.addEventListener("click", (e) => {
            if (e.target.classList.contains("subconsole-icon")) return;
            if (keys.includes(currentPlatform)) return;

            button.dataset.platform = keys[0];
            switchPlatform(keys[0]);
        });

        familyWrapper.appendChild(button);

        if (keys.length > 1) {
            const subContainer = document.createElement("div");
            subContainer.className = "platform-subconsoles";
            subContainer.dataset.count = keys.length;

            if (keys.includes(currentPlatform)) {
                subContainer.classList.add("visible");
            }

            const subInner = document.createElement("div");
            subInner.className = "subconsoles-inner";

            keys.forEach((k) => {
                const subBtn = document.createElement("button");

                subBtn.className =
                    "subconsole-btn" + (k === currentPlatform ? " active" : "");

                subBtn.dataset.platform = k;

                if (definitivePlatforms.includes(k)) {
                    subBtn.dataset.definitive = true;
                }

                const img = document.createElement("img");

                img.src = `../assets/images/platforms/${PLATFORM_FAMILIES[k].icon}`;
                img.alt = PLATFORM_FAMILIES[k].name;
                img.className = "subconsole-icon";

                subBtn.appendChild(img);

                subBtn.addEventListener("click", (e) => {
                    e.stopPropagation();

                    if (k === currentPlatform) return;

                    switchPlatform(k);
                });

                subInner.appendChild(subBtn);
            });

            subContainer.appendChild(subInner);
            familyWrapper.appendChild(subContainer);
        }

        selector.appendChild(familyWrapper);
    });
}

function switchPlatform(key) {
    currentPlatform = key;
    localStorage.setItem(PLATFORM_STORAGE_KEY, key);

    document.querySelectorAll(".platform-family").forEach((wrapper) => {
        const familyBtn = wrapper.querySelector(".platform-btn");
        const subBtns = [...wrapper.querySelectorAll(".subconsole-btn")];

        let isActive;

        if (subBtns.length > 0) {
            const familyKeys = subBtns.map((btn) => btn.dataset.platform);
            isActive = familyKeys.includes(key);
        } else {
            isActive = familyBtn?.dataset.platform === key;
        }

        familyBtn?.classList.toggle("active", isActive);
        if (isActive && subBtns.length > 0) familyBtn.dataset.platform = key;

        const subContainer = wrapper.querySelector(".platform-subconsoles");
        if (subContainer) {
            subContainer.classList.toggle("visible", isActive);
        }

        subBtns.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.platform === key);
        });
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = "";
    renderCheats();
}

document.addEventListener("DOMContentLoaded", async () => {
    mostrarSkeletons();
    const cheatsObject = await loadCheats();
    const definitivePlatforms = cheatsObject.definitivePlatforms ?? [];
    delete cheatsObject.definitivePlatforms;
    cheats = cheatsObject;

    const availablePlatforms = getAvailablePlatforms(cheatsObject);

    if (!currentPlatform || !availablePlatforms.includes(currentPlatform)) {
        currentPlatform = availablePlatforms[0];
    }

    if (availablePlatforms.length === 1) {
        const selector = document.querySelector(".platform-selector");
        if (selector) selector.style.display = "none";
    } else {
        renderPlatformSelector(availablePlatforms, definitivePlatforms);
    }

    renderCheats();
    document
        .getElementById("searchInput")
        ?.addEventListener("input", (e) => filterCheats(e.target.value));
});
