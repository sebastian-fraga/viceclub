document.addEventListener("DOMContentLoaded", function () {
    const GAME_FOLDERS = ["III", "VC", "SA", "IV", "V"];

    const SECTIONS = [
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
            glow: "rgba(255,25,25,0.1)",
            bg: "linear-gradient(135deg, rgba(255,97,97,0.35), rgba(173,52,22,0.4))",
        },
        vc_original: {
            label: "Originales",
            icon: "vc_original.webp",
            color: "#DC84B0",
            glow: "rgba(244,194,253,0.15)",
            bg: "linear-gradient(135deg, rgba(220,132,176,0.4), rgba(248,199,224,0.35))",
        },
        vc_definitive: {
            label: "Edición Definitiva",
            icon: "vc_definitive.webp",
            color: "#D98EB6",
            glow: "rgba(244,194,253,0.15)",
            bg: "linear-gradient(135deg, rgba(217,142,182,0.4), rgba(194,92,171,0.35))",
        },
        sa_original: {
            label: "Originales",
            icon: "sa_original.webp",
            color: "#5fa459",
            glow: "rgba(72,178,27,0.15)",
            bg: "linear-gradient(135deg, rgba(49,77,50,0.4), rgba(150,235,157,0.35))",
        },
        sa_definitive: {
            label: "Edición Definitiva",
            icon: "sa_definitive.webp",
            color: "#70bb69",
            glow: "rgba(117,189,85,0.15)",
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
            glow: "rgba(255,94,82,0.1)",
            bg: "linear-gradient(135deg, rgba(87,2,2,0.4), rgba(250,75,75,0.35))",
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
            glow: "rgba(147,255,107,0.1)",
            bg: "linear-gradient(135deg, rgba(47,87,2,0.4), rgba(104,250,75,0.35))",
        },
    };

    const RARITY_STYLES = {
        bronze: { border: "2px solid #ffb89770" },
        silver: { border: "2px solid #B5B5B570" },
        gold: { border: "2px solid #f5b33970" },
        platinum: { border: "2px solid #7191fa70" },
    };

    const TAG_STYLES = {
        Perdible: { background: "#6b2a2a", color: "#ff6b6b" },
        Historia: { background: "#2a4a2a", color: "#6bff6b" },
        Coleccionable: { background: "#858126", color: "#e4ff6b" },
        Paciencia: { background: "#2a3a5a", color: "#6ba3ff" },
        Online: { background: "#B1261A", color: "#fafafa" },
    };

    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/").filter(Boolean);
    const game = GAME_FOLDERS.find((folder) => pathSegments.includes(folder));

    if (!game) {
        console.error("No se puedo encontrar el JSON desde la URL.");
        return;
    }

    const jsonUrl = `https://viceclub.s3.us-east-1.amazonaws.com/${game}/achievements.json`;

    fetch(jsonUrl)
        .then((r) => {
            if (!r.ok) throw new Error("Network response was not ok");
            return r.json();
        })
        .then((data) => {
            renderAchievements(data);
            renderTabSelector(data);
        })
        .catch((error) => console.error("Error loading achievements:", error));

    function createAchievementCard(achievement) {
        const card = document.createElement("div");
        card.className = "achievement-card";

        const rarityStyle = { ...(RARITY_STYLES[achievement.rarity] || {}) };
        if (achievement.rarity === "platinum")
            rarityStyle.margin = "0 0 30px 0";
        Object.assign(card.style, rarityStyle);

        const header = document.createElement("div");
        header.className = "achievement-card-header";

        const img = document.createElement("img");
        img.src = achievement.imagen;
        img.alt = achievement.nombre;
        img.className = "achievement-img";
        img.loading = "lazy";
        img.decoding = "async";

        const info = document.createElement("div");
        info.className = "achievement-card-info";

        const title = document.createElement("h3");
        title.className = "achievement-name";
        title.textContent = achievement.nombre;

        const desc = document.createElement("p");
        desc.className = "achievement-description";
        desc.textContent = achievement.descripcion;

        const tagContainer = document.createElement("div");
        tagContainer.className = "achievement-tag-container";

        (achievement.tags || []).forEach((tag) => {
            const style = TAG_STYLES[tag] || {};
            const span = document.createElement("span");
            span.className = "achievement-tag";
            span.textContent = tag;
            span.style.backgroundColor = style.background || "#2a2a3d";
            span.style.color = style.color || "#b0b0cc";
            tagContainer.appendChild(span);
        });

        info.append(title, desc, tagContainer);
        header.append(img, info);

        const guide = document.createElement("div");
        guide.className = "achievement-card-guide";

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "achievement-toggle";
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.innerHTML = `<span>Guía</span><span class="achievement-toggle-icon material-symbols-rounded">add</span>`;

        const guideText = document.createElement("p");
        guideText.className = "achievement-guide-text";
        guideText.textContent = achievement.como_conseguirlo;

        guide.append(toggleBtn, guideText);

        const fragment = document.createDocumentFragment();
        fragment.append(header, guide);
        card.appendChild(fragment);

        return card;
    }

    function renderAchievements(data) {
        SECTIONS.forEach((section) => {
            const container = document.querySelector(
                `#${section} .achievement-list`,
            );
            if (!container || !data[section]) return;

            container.innerHTML = "";
            data[section].forEach((achievement) => {
                container.appendChild(createAchievementCard(achievement));
            });
        });

        document.querySelectorAll(".achievement-content").forEach((content) => {
            const disclaimer = content.querySelector(".achievement-disclaimer");
            if (disclaimer) disclaimer.style.display = "";
        });
    }

    function renderTabSelector(data) {
        if (!GAME_FOLDERS.includes(game)) return;

        const selector = document.querySelector(".platform-selector");
        if (!selector) return;

        const availableTabs = SECTIONS.filter((s) => data[s]?.length > 0);

        selector.innerHTML = "";

        const savedTab = localStorage.getItem(`achievements_tab_${game}`);
        const initialTab = availableTabs.includes(savedTab)
            ? savedTab
            : availableTabs[0];

        availableTabs.forEach((tabId) => {
            const config = ACHIEVEMENT_TABS[tabId];
            if (!config) return;

            const wrapper = document.createElement("div");
            wrapper.className = "platform-family";

            const button = document.createElement("button");
            button.className = `platform-btn${tabId === initialTab ? " active" : ""}`;
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

            button.addEventListener("click", () =>
                activateTab(selector, tabId),
            );

            wrapper.appendChild(button);
            selector.appendChild(wrapper);
        });

        document
            .querySelectorAll(".achievement-content")
            .forEach((c) => (c.style.display = "none"));
        const initialEl = document.getElementById(initialTab);
        if (initialEl) initialEl.style.display = "block";
        selector.style.display = "flex";
    }

    function activateTab(selector, tabId) {
        selector
            .querySelectorAll(".platform-btn")
            .forEach((b) => b.classList.remove("active"));
        document
            .querySelectorAll(".achievement-content")
            .forEach((c) => (c.style.display = "none"));

        selector
            .querySelector(`[data-platform="${tabId}"]`)
            ?.classList.add("active");

        const content = document.getElementById(tabId);
        if (content) content.style.display = "block";

        localStorage.setItem(`achievements_tab_${game}`, tabId);
    }

    document.addEventListener("click", function (e) {
        const toggleBtn = e.target.closest(".achievement-toggle");
        if (!toggleBtn) return;

        const guide = toggleBtn.parentElement;
        const guideText = guide.querySelector(".achievement-guide-text");
        const icon = toggleBtn.querySelector(".achievement-toggle-icon");
        const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
        icon.textContent = isOpen ? "add" : "close";

        if (isOpen) {
            guideText.style.maxHeight = "0";
            guideText.style.opacity = "0";
            guideText.classList.remove("open");
            toggleBtn.setAttribute("aria-expanded", "false");
        } else {
            guideText.style.maxHeight = guideText.scrollHeight + "px";
            guideText.style.opacity = "1";
            guideText.classList.add("open");
            toggleBtn.setAttribute("aria-expanded", "true");
        }
    });
});
