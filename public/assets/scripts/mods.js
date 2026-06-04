const container = document.getElementById("modsContainer");
const game = container.dataset.game;
const MODS_URL = `https://viceclub.s3.us-east-1.amazonaws.com/${game}/mods/mods.json?t=${Date.now()}`;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(MODS_URL);
        const data = await res.json();

        container.innerHTML = "";
        renderMods(data.mods, "ESENCIALES");
        renderMods(data.recommended, "RECOMENDADOS");
    } catch (err) {
        console.error("Error loading mods:", err);
    }
});

const TABS = [
    { tab: "info", icon: "info", text: "Información", active: true },
    { tab: "screenshots", icon: "photo", text: "Capturas" },
    { tab: "download", icon: "download", text: "Descargar" },
];

function createAuthorDiv(mod) {
    const authorDiv = document.createElement("div");
    authorDiv.className = "mod-author";

    const authorP = document.createElement("p");
    authorP.textContent = `Creado por ${mod.info.author}`;

    const infoLink = document.createElement("a");
    infoLink.href = mod.info.link;
    infoLink.target = "_blank";
    infoLink.rel = "noopener noreferrer";
    infoLink.classList.add("btn-info");
    infoLink.innerHTML = `<span>VER MÁS</span><span class="material-symbols-rounded">open_in_new</span>`;

    const downloadLink = document.createElement("a");
    downloadLink.href = mod.download.link;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.classList.add("btn-download");
    downloadLink.innerHTML = `<span>DESCARGAR</span><span class="material-symbols-rounded">open_in_new</span>`;

    authorDiv.append(authorP, infoLink, downloadLink);
    return authorDiv;
}

function createInfoTab(mod) {
    const tab = document.createElement("div");
    tab.className = "tab-content active";
    tab.dataset.content = "info";

    const h5 = document.createElement("h5");
    h5.textContent = mod.info.title;

    const ul = document.createElement("ul");
    mod.info.features.forEach((f) => {
        const li = document.createElement("li");
        li.textContent = f;
        ul.appendChild(li);
    });

    tab.append(h5, ul, createAuthorDiv(mod));
    return tab;
}

function createScreenshotsTab(mod) {
    const tab = document.createElement("div");
    tab.className = "tab-content";
    tab.dataset.content = "screenshots";

    const grid = document.createElement("div");
    grid.className = "screenshots";

    mod.screenshots.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.loading = "lazy";
        grid.appendChild(img);
    });

    tab.appendChild(grid);
    return tab;
}

function createDownloadTab(mod) {
    const tab = document.createElement("div");
    tab.className = "tab-content";
    tab.dataset.content = "download";

    const ol = document.createElement("ol");
    mod.download.steps.forEach((s) => {
        const li = document.createElement("li");
        li.innerHTML = s;
        ol.appendChild(li);
    });

    tab.append(ol, createAuthorDiv(mod));
    return tab;
}

function initTabNav(nav, section) {
    const links = nav.querySelectorAll(".tab-link");
    const contents = section.querySelectorAll(".tab-content");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
            contents.forEach((c) =>
                c.classList.toggle(
                    "active",
                    c.dataset.content === link.dataset.tab,
                ),
            );
        });
    });
}

function initToggleAnimation(summary, details, expanded) {
    summary.addEventListener("click", (e) => {
        e.preventDefault();

        if (!details.open) {
            details.setAttribute("open", "");
            expanded.style.maxHeight = "0px";
            expanded.style.overflow = "hidden";
            expanded.style.transition = "max-height 0.5s ease";

            requestAnimationFrame(() => {
                expanded.style.maxHeight = "2000px"; // valor mayor al contenido real
            });

            expanded.addEventListener(
                "transitionend",
                () => {
                    expanded.style.maxHeight = "";
                    expanded.style.transition = "";
                    expanded.style.overflow = "";
                },
                { once: true },
            );
        } else {
            expanded.style.maxHeight = `${expanded.scrollHeight}px`;
            expanded.style.overflow = "hidden";
            expanded.style.transition = "max-height 0.35s ease";

            requestAnimationFrame(() => {
                expanded.style.maxHeight = "0px";
            });

            expanded.addEventListener(
                "transitionend",
                () => {
                    details.removeAttribute("open");
                    expanded.style.maxHeight = "";
                    expanded.style.transition = "";
                    expanded.style.overflow = "";
                },
                { once: true },
            );
        }
    });
}

function createModCard(mod) {
    const details = document.createElement("details");
    details.className = "mod";

    const summary = document.createElement("summary");
    summary.className = "mod-header";

    const img = document.createElement("img");
    img.src = mod.thumbnail;
    img.alt = `${mod.name} logo`;
    img.loading = "lazy";

    const textDiv = document.createElement("div");
    textDiv.className = "mod-text";

    const h4 = document.createElement("h4");
    h4.textContent = mod.name;

    const desc = document.createElement("p");
    desc.innerHTML = mod.description;

    textDiv.append(h4, desc);

    const arrow = document.createElement("span");
    arrow.className = "material-symbols-rounded arrow";
    arrow.textContent = "keyboard_arrow_down";

    summary.append(img, textDiv, arrow);
    details.appendChild(summary);

    const expanded = document.createElement("div");
    expanded.className = "mod-expanded";

    const nav = document.createElement("nav");
    nav.className = "mod-actions";

    TABS.forEach((t) => {
        const a = document.createElement("a");
        a.href = "#";
        a.dataset.tab = t.tab;
        a.className = `tab-link${t.active ? " active" : ""}`;

        const icon = document.createElement("span");
        icon.className = "material-symbols-rounded";
        icon.textContent = t.icon;

        a.append(icon, ` ${t.text}`);
        nav.appendChild(a);
    });

    const section = document.createElement("div");
    section.className = "mod-features";
    section.append(
        createInfoTab(mod),
        createScreenshotsTab(mod),
        createDownloadTab(mod),
    );

    expanded.append(nav, section);
    details.appendChild(expanded);

    initTabNav(nav, section);
    initToggleAnimation(summary, details, expanded);

    return details;
}

function renderMods(mods, title) {
    const group = document.createElement("article");
    group.className = "mod-group";

    const heading = document.createElement("div");
    heading.className = "mod-title-header";

    const h3 = document.createElement("h3");
    h3.textContent = title;

    heading.appendChild(h3);
    group.appendChild(heading);

    mods.forEach((mod) => group.appendChild(createModCard(mod)));

    container.appendChild(group);
}
