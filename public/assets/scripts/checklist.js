
function getStorageKey(tabId = "default") {
    return `viceclub_checklist_${location.pathname}_${tabId}`;
}

function loadChecked(tabId) {
    try {
        return JSON.parse(localStorage.getItem(getStorageKey(tabId))) || {};
    } catch {
        return {};
    }
}

function saveChecked(state, tabId) {
    localStorage.setItem(getStorageKey(tabId), JSON.stringify(state));
}

function detectGame() {
    const folders = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];
    const segments = window.location.pathname.split("/").filter(Boolean);
    return folders.find((f) => segments.includes(f)) ?? null;
}

function createChecklistItem(item, game) {
    const li = document.createElement("li");
    li.className = "checklist-item";
    li.dataset.id = item.id;

    const row = document.createElement("div");
    row.className = "checklist-row";
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute("aria-expanded", "false");

    const label = document.createElement("label");
    label.className = "checkbox-label";
    label.title = "Marcar como completado";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "checklist-cb";
    input.setAttribute(
        "aria-label",
        item.texts ? item.texts.map((e) => e.text).join(" / ") : item.text,
    );

    const spanCustom = document.createElement("span");
    spanCustom.className = "checkbox-custom";

    label.append(input, spanCustom);

    const info = document.createElement("div");
    info.className = "checklist-info";

    if (item.texts) {
        item.texts.forEach((entry, i) => {
            const line = document.createElement("span");
            line.className =
                "checklist-title" + (i > 0 ? " checklist-title--sub" : "");

            if (entry.icon) {
                const icon = document.createElement("img");
                icon.src = `/assets/images/icons/blips/${game}/${entry.icon}.webp`;
                icon.className = "checklist-icon";
                icon.alt = "";
                icon.loading = "lazy";
                line.appendChild(icon);
            }

            line.appendChild(document.createTextNode(entry.text));
            info.appendChild(line);
        });
    } else {
        const title = document.createElement("span");
        title.className = "checklist-title";

        if (item.icon) {
            const icon = document.createElement("img");
            icon.src = `/assets/images/icons/blips/${game}/${item.icon}.webp`;
            icon.className = "checklist-icon";
            icon.alt = "";
            icon.loading = "lazy";
            title.appendChild(icon);
        }

        title.appendChild(document.createTextNode(item.text));
        info.appendChild(title);
    }

    row.append(label, info);
    li.appendChild(row);
    return li;
}

function renderPanel(panel, game, sections, tabId) {
    panel.dataset.rendered = "true";
    panel.dataset.tabId = tabId;

    const fragment = document.createDocumentFragment();

    sections.forEach((section) => {
        const article = document.createElement("article");
        article.dataset.sectionId = section.id;

        const h3 = document.createElement("h3");

        if (section.icon) {
            const img = document.createElement("img");
            img.src = `/assets/images/icons/blips/${game}/${section.icon}.webp`;
            img.className = "checklist-icon";
            img.alt = "";
            img.loading = "lazy";
            h3.appendChild(img);
        }

        h3.appendChild(document.createTextNode(section.title));
        article.appendChild(h3);

        const ul = document.createElement("ul");
        ul.className = "checklist-list";

        section.items.forEach((item) =>
            ul.appendChild(createChecklistItem(item, game)),
        );

        article.appendChild(ul);
        fragment.appendChild(article);
    });

    panel.appendChild(fragment);

    initSections(panel);
    initCheckboxes(panel, tabId);
    initItemDropdowns(panel);

    panel.querySelectorAll("article").forEach(updateSectionProgress);
}

function renderTabLayout(container, game, tabs) {
    const tabBar = document.createElement("div");
    tabBar.className = "card-selector";

    tabs.forEach((tab, i) => {
        const btn = document.createElement("button");
        btn.className = `checklist-tab-btn${i === 0 ? " active" : ""}`;
        btn.dataset.index = i;
        btn.dataset.game = tab.id;
        btn.innerHTML = `
            <div class="tab-card">
                <img src="/assets/images/main/cards/card_${tab.id}.webp" alt="${tab.label}">
                <div class="tab-overlay"></div>
            </div>
        `;
        tabBar.appendChild(btn);
    });

    container.appendChild(tabBar);
    container.dataset.activeGame = tabs[0].id;

    const panels = tabs.map((tab, i) => {
        const panel = document.createElement("div");
        panel.className = `checklist-panel${i === 0 ? "" : " hidden"}`;
        panel.dataset.tabId = tab.id;
        panel.dataset.index = i;
        container.appendChild(panel);
        return panel;
    });

    renderPanel(panels[0], game, tabs[0].sections, tabs[0].id);
    buildProgressBar(panels[0]);
    updateProgress(panels[0]);

    tabBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".checklist-tab-btn");
        if (!btn) return;

        const index = Number(btn.dataset.index);
        const panel = panels[index];
        const tab = tabs[index];

        container.dataset.activeGame = tab.id;

        tabBar
            .querySelectorAll(".checklist-tab-btn")
            .forEach((b) => b.classList.toggle("active", b === btn));

        panels.forEach((p) => p.classList.add("hidden"));
        panel.classList.remove("hidden");

        if (!panel.dataset.rendered) {
            renderPanel(panel, game, tab.sections, tab.id);
            buildProgressBar(panel);
            updateProgress(panel);
        }
    });
}

function buildProgressBar(panel) {
    const total = panel.querySelectorAll(".checklist-cb").length;

    const wrapper = document.createElement("div");
    wrapper.className = "progress-wrapper";
    wrapper.innerHTML = `
        <div class="progress-label">
            <span class="progress-text">Progress</span>
            <span class="progress-count">0 / ${total}</span>
        </div>
        <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:0%"></div>
        </div>
        <span class="progress-pct">0%</span>
    `;

    panel.insertBefore(wrapper, panel.firstChild);
}

function updateProgress(panel) {
    const all = panel.querySelectorAll(".checklist-cb");
    const done = panel.querySelectorAll(".checklist-cb:checked");
    const total = all.length;
    const count = done.length;
    const rawPct = total ? (count / total) * 100 : 0;
    const pct = Number.isInteger(rawPct)
        ? rawPct.toString()
        : rawPct.toFixed(2);

    const wrapper = panel.querySelector(".progress-wrapper");
    if (!wrapper) return;

    wrapper
        .querySelector(".progress-bar-fill")
        ?.style.setProperty("width", `${pct}%`);
    wrapper.querySelector(".progress-pct") &&
        (wrapper.querySelector(".progress-pct").textContent = `${pct}%`);
    wrapper.querySelector(".progress-count") &&
        (wrapper.querySelector(".progress-count").textContent =
            `${count} / ${total}`);

    if (rawPct === 100) launchConfetti();
}

function updateSectionProgress(article) {
    const all = article.querySelectorAll(".checklist-cb");
    const done = article.querySelectorAll(".checklist-cb:checked");
    const badge = article.querySelector(".section-badge");
    const checkAllBtn = article.querySelector(".section-check-all");

    if (badge) badge.textContent = `${done.length} / ${all.length}`;

    const complete = all.length > 0 && done.length === all.length;
    checkAllBtn?.classList.toggle("complete", complete);
    article.classList.toggle("section-complete", complete);
}

function initSections(panel) {
    panel.querySelectorAll("article").forEach((article) => {
        const h3 = article.querySelector("h3");
        const ul = article.querySelector("ul.checklist-list");
        if (!h3 || !ul) return;

        const controls = document.createElement("div");
        controls.className = "section-controls";
        controls.innerHTML = `
            <span class="section-badge">0 / 0</span>
            <button class="section-check-all" title="Marcar / desmarcar todas">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            </button>
            <span class="section-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </span>
        `;

        h3.appendChild(controls);
        h3.className = "section-header";
        h3.setAttribute("role", "button");
        h3.setAttribute("tabindex", "0");
        h3.setAttribute("aria-expanded", "false");

        const wrapper = document.createElement("div");
        wrapper.className = "checklist-list-wrapper section-collapsed";
        wrapper.style.display = "none";
        ul.parentNode.insertBefore(wrapper, ul);
        wrapper.appendChild(ul);

        h3.addEventListener("click", (e) => {
            if (e.target.closest(".section-check-all")) return;

            const isOpen = !wrapper.classList.contains("section-collapsed");

            if (!isOpen) {
                wrapper.style.display = "block";
                wrapper.offsetHeight;
                wrapper.classList.remove("section-collapsed");
            } else {
                wrapper.classList.add("section-collapsed");
                setTimeout(() => {
                    wrapper.style.display = "none";
                }, 220);
            }

            h3.setAttribute("aria-expanded", String(!isOpen));
            h3.querySelector(".section-arrow").classList.toggle(
                "open",
                !isOpen,
            );
        });

        h3.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                h3.click();
            }
        });

        controls
            .querySelector(".section-check-all")
            .addEventListener("click", (e) => {
                e.stopPropagation();

                const cbs = article.querySelectorAll(".checklist-cb");
                const allDone = [...cbs].every((cb) => cb.checked);

                const panelEl =
                    article.closest("[data-tab-id]") ||
                    article.closest(".checklist-container");
                const tabId = panelEl?.dataset.tabId || "default";
                const checked = loadChecked(tabId);

                cbs.forEach((cb) => {
                    cb.checked = !allDone;
                    const li = cb.closest(".checklist-item");
                    if (li) {
                        checked[li.dataset.id] = !allDone;
                        li.classList.toggle("completed", !allDone);
                    }
                });

                saveChecked(checked, tabId);
                updateSectionProgress(article);

                const panelNode =
                    article.closest(".checklist-panel") ||
                    article.closest(".checklist-container");
                if (panelNode) updateProgress(panelNode);
            });

        updateSectionProgress(article);
    });
}

function initCheckboxes(panel, tabId) {
    const checked = loadChecked(tabId);

    panel.querySelectorAll(".checklist-item").forEach((li) => {
        const id = li.dataset.id;
        const cb = li.querySelector(".checklist-cb");
        if (!cb || !id) return;

        if (checked[id]) {
            cb.checked = true;
            li.classList.add("completed");
        }

        cb.addEventListener("change", function () {
            const state = loadChecked(tabId);
            state[id] = this.checked;
            saveChecked(state, tabId);
            li.classList.toggle("completed", this.checked);

            const article = li.closest("article");
            if (article) updateSectionProgress(article);

            const panelNode =
                li.closest(".checklist-panel") ||
                li.closest(".checklist-container");
            if (panelNode) updateProgress(panelNode);
        });
    });
}

function initItemDropdowns(panel) {
    panel.querySelectorAll(".checklist-item").forEach((li) => {
        const row = li.querySelector(".checklist-row");
        const dropdown = li.querySelector(".checklist-dropdown");
        const btn = li.querySelector(".dropdown-toggle");
        if (!row || !dropdown || !btn) return;

        dropdown.classList.add("dropdown-collapsed");

        const toggle = () => {
            const isOpen = !dropdown.classList.contains("dropdown-collapsed");
            dropdown.classList.toggle("dropdown-collapsed", isOpen);
            btn.classList.toggle("open", !isOpen);
            row.setAttribute("aria-expanded", String(!isOpen));
        };

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggle();
        });
        row.querySelector(".checklist-info")?.addEventListener("click", toggle);
        row.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });
}

function launchConfetti() {
    const end = Date.now() + 500;
    const colors = ["#8d75ef", "#4d9eff", "#b475ef"];

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 80,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors,
            zIndex: 9999,
        });
        confetti({
            particleCount: 7,
            angle: 100,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors,
            zIndex: 9999,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

async function init() {
    const game = detectGame();
    if (!game) {
        console.error("Could not detect game from URL.");
        return;
    }

    const container = document.querySelector(".checklist-container");
    if (!container) {
        console.error(".checklist-container not found.");
        return;
    }

    try {
        const response = await fetch(
            `https://viceclub.s3.us-east-1.amazonaws.com/${game}/checklist.json`,
        );
        const data = await response.json();
        container.innerHTML = "";

        if (data.tabs && data.tabs.length > 1) {
            renderTabLayout(container, game, data.tabs);
        } else {
            const sections = data.sections || data.tabs?.[0].sections;
            const tabId = data.tabs?.[0].id || "default";
            renderPanel(container, game, sections, tabId);
            buildProgressBar(container);
            updateProgress(container);
        }
    } catch (error) {
        console.error("Error loading checklist:", error);
    }
}

document.addEventListener("DOMContentLoaded", init);
