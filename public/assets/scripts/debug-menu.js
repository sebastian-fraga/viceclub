navigator.serviceWorker?.addEventListener("message", (e) => {
    if (e.data?.type === "CACHE_VERSION") {
        localStorage.setItem("sw_version", e.data.version);
    }
});

const DEBUG_ENABLED = location.hostname === "localhost";

if (DEBUG_ENABLED) {
    document.addEventListener("DOMContentLoaded", () => initDebugMenu());
}

async function initDebugMenu() {
    try {

        const style = document.createElement("style");
        style.textContent = `
            #vc-debug-menu {
                position: fixed; z-index: 99999;
                background: rgba(26, 26, 46, 0.93); color: #e0e0e0;
                border: 1px solid #333;
                border-radius: 10px;
                min-width: 230px;
                font: 13px/1.5 monospace;
                box-shadow: 0 8px 32px rgba(0,0,0,.5);
                overflow: hidden;
                display: none;
                backdrop-filter: blur(5px);
            }
            #vc-debug-menu .dm-head {
                background: #0f0f1a;
                padding: 8px 14px;
                font-size: 11px; color: #888;
                border-bottom: 1px solid #333;
                display: flex; align-items: center; gap: 8px;
            }
            #vc-debug-menu .dm-dot { width:8px; height:8px; border-radius:50%; background:#e24b4a; }
            #vc-debug-menu .dm-section { padding: 4px 0; border-bottom: 1px solid #222; }
            #vc-debug-menu .dm-section:last-child { border-bottom: none; }
            #vc-debug-menu .dm-label {
                padding: 5px 14px 2px;
                font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: .06em;
            }
            #vc-debug-menu .dm-row {
                display: flex; align-items: center;
                padding: 6px 14px; gap: 8px; cursor: pointer;
            }
            #vc-debug-menu .dm-row:hover { background: rgba(255,255,255,.05); }
            #vc-debug-menu .dm-row .key { flex:1; color: #ccc; display: flex; align-items: center; gap: 8px; }
            #vc-debug-menu .dm-row .key .material-symbols-rounded { font-size: 19px !important; text-shadow: 0 0 5px rgba(248,220,253,0.3); color: rgb(248,220,253); }
            #vc-debug-menu .dm-row .val {
                font-size: 11px; padding: 2px 8px; border-radius: 20px;
                background: #2a2a3e; color: #7f77dd;
            }
            #vc-debug-menu .dm-row .val.ok   { background: #0f2a1e; color: #1d9e75; }
            #vc-debug-menu .dm-row .val.err  { background: #2a0f0f; color: #e24b4a; }
            #vc-debug-menu .dm-row .val.warn { background: #2a200f; color: #ef9f27; }
        `;
        document.head.appendChild(style);

        const menu = document.createElement("div");
        menu.id = "vc-debug-menu";
        document.body.appendChild(menu);

        const panelStyles = `
            position: fixed; z-index: 99999;
            background: rgba(26, 26, 46, 0.93);
            border: 1px solid #333;
            border-radius: 10px; min-width: 220px;
            font: 13px/1.5 monospace; color: #e0e0e0;
            display: none; overflow: hidden;
            box-shadow: 0 8px 32px rgba(0,0,0,.5);
            backdrop-filter: blur(5px);
        `;

        const lsPanel = document.createElement("div");
        lsPanel.id = "vc-ls-panel";
        lsPanel.style.cssText = panelStyles;
        document.body.appendChild(lsPanel);

        const cachePanel = document.createElement("div");
        cachePanel.id = "vc-cache-panel";
        cachePanel.style.cssText = panelStyles;
        document.body.appendChild(cachePanel);


        function closeMenu() {
            menu.style.display = "none";
            lsPanel.style.display = "none";
        }

        async function getSwStatus() {
            if (!("serviceWorker" in navigator))
                return { active: false, version: "n/a" };
            const reg = await navigator.serviceWorker.getRegistration();
            const active = !!reg?.active;
            const version = localStorage.getItem("sw_version") || "—";
            return { active, version };
        }

        async function getCacheCount() {
            if (!("caches" in window)) return 0;
            const keys = await caches.keys();
            let total = 0;
            for (const key of keys) {
                const cache = await caches.open(key);
                const reqs = await cache.keys();
                total += reqs.length;
            }
            return total;
        }

        async function renderCachePanel() {
            const cacheNames = await caches.keys();

            let html = `
                <div style="background:#0f0f1a; padding:8px 14px;
                            font-size:11px; color:#888;
                            border-bottom:1px solid #333;">
                    Cache Storage
                </div>
            `;

            if (cacheNames.length === 0) {
                html += `<div style="padding:12px 14px; color:#555;">empty</div>`;
            }

            for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const requests = await cache.keys();

                html += `
                    <div style="border-bottom:1px solid #1e1e30;">
                        <div style="padding:8px 12px; color:#7f77dd; font-size:11px; border-bottom:1px solid #222;">
                            ${cacheName} (${requests.length})
                        </div>
                        ${requests
                            .map(
                                (req) => `
                            <div style="display:flex; align-items:center; gap:8px; padding:6px 12px; border-bottom:1px solid #181825;">
                                <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:11px; color:#ccc;">
                                    ${new URL(req.url).pathname}
                                </span>
                                <button
                                    data-url="${req.url}"
                                    data-cache="${cacheName}"
                                    style="width:20px; height:20px; border:none; border-radius:4px;
                                           background:rgba(226,75,74,.15); color:#e24b4a; cursor:pointer;">
                                    ×
                                </button>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>
                `;
            }

            cachePanel.innerHTML = html;

            cachePanel.querySelectorAll("button").forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    const cache = await caches.open(btn.dataset.cache);
                    await cache.delete(btn.dataset.url);
                    renderCachePanel();
                });
            });
        }

        function renderLsPanel() {
            const keys = Object.keys(localStorage);
            lsPanel.innerHTML = `
                <div style="background:#0f0f1a; padding:8px 14px; font-size:11px; color:#888;
                            border-bottom:1px solid #333; display:flex; justify-content:space-between;">
                    <span>localStorage</span>
                    <span style="color:#7f77dd">${keys.length} keys</span>
                </div>
                ${keys.length === 0 ? '<div style="padding:12px 14px; color:#555;">empty</div>' : ""}
                ${keys
                    .map(
                        (k) => `
                    <div style="display:flex; align-items:center; padding:6px 12px; gap:8px; border-bottom:1px solid #1e1e30;">
                        <span style="flex:1; color:#ccc; font-size:12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${k}</span>
                        <span style="font-size:10px; color:#555; max-width:60px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                            ${String(localStorage.getItem(k)).substring(0, 20)}
                        </span>
                        <button data-key="${k}" style="width:20px; height:20px; border-radius:4px;
                            background:rgba(226,75,74,.15); color:#e24b4a; border:none; cursor:pointer;
                            font-size:13px; line-height:1;">×</button>
                    </div>
                `,
                    )
                    .join("")}
            `;

            lsPanel.querySelectorAll("button[data-key]").forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    localStorage.removeItem(btn.dataset.key);
                    renderLsPanel();
                    const toggle = document.querySelector("#vc-ls-toggle .val");
                    if (toggle)
                        toggle.textContent =
                            Object.keys(localStorage).length + " keys";
                });
            });
        }

        async function buildMenu() {
            const sw = await getSwStatus();
            const cacheCount = await getCacheCount();
            const lsKeys = Object.keys(localStorage).length;
            const page = location.pathname.split("/").pop() || "index.html";

            menu.innerHTML = `
                <div class="dm-head">
                    <div class="dm-dot"></div>
                    Vice Club — Debug
                </div>
                <div class="dm-section">
                    <div class="dm-label">Página</div>
                    <div class="dm-row"><span class="key">Archivo</span><span class="val">${page}</span></div>
                    <div class="dm-row"><span class="key">Versión SW</span><span class="val">${sw.version}</span></div>
                </div>
                <div class="dm-section">
                    <div class="dm-label">Servicios</div>
                    <div class="dm-row">
                        <span class="key">Service Worker</span>
                        <span class="val ${sw.active ? "ok" : "err"}">${sw.active ? "active" : "inactive"}</span>
                    </div>
                    <div class="dm-row" id="vc-cache-toggle">
                        <span class="key">Caché ›</span>
                        <span class="val">${cacheCount} files</span>
                    </div>
                    <div class="dm-row" id="vc-ls-toggle">
                        <span class="key">localStorage ›</span>
                        <span class="val ${lsKeys > 0 ? "warn" : ""}">${lsKeys} keys</span>
                    </div>
                </div>
                <div class="dm-section">
                    <div class="dm-label">Acciones</div>
                    <div class="dm-row" id="vc-open-prod"><span class="key"><span class="material-symbols-rounded">arrow_outward</span>Abrir en producción</span></div>
                    <div class="dm-row" id="vc-clear-cache"><span class="key"><span class="material-symbols-rounded">delete</span>Borrar caché</span></div>
                    <div class="dm-row" id="vc-hard-reload"><span class="key"><span class="material-symbols-rounded">autorenew</span>Forzar recarga</span></div>
                    <div class="dm-row" id="vc-copy-state"><span class="key"><span class="material-symbols-rounded">copy_all</span>Copiar estado</span></div>
                    <div class="dm-row" id="vc-log-ls"><span class="key"><span class="material-symbols-rounded">terminal</span>Loggear localStorage</span></div>
                </div>
            `;

            const header = menu.querySelector(".dm-head");
            let isDragging = false,
                offsetX = 0,
                offsetY = 0;

            header.addEventListener("mousedown", (e) => {
                isDragging = true;
                const rect = menu.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                document.body.style.userSelect = "none";
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;
                menu.style.left = `${e.clientX - offsetX}px`;
                menu.style.top = `${e.clientY - offsetY}px`;
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
                document.body.style.userSelect = "";
            });

            document
                .getElementById("vc-open-prod")
                ?.addEventListener("click", () => {
                    window.open(
                        "https://viceclub.app" +
                            location.pathname +
                            location.search +
                            location.hash,
                        "_blank",
                    );
                    closeMenu();
                });

            document
                .getElementById("vc-clear-cache")
                ?.addEventListener("click", async () => {
                    const keys = await caches.keys();
                    await Promise.all(keys.map((k) => caches.delete(k)));
                    alert(`Cache cleared (${keys.length} stores)`);
                    closeMenu();
                });

            document
                .getElementById("vc-hard-reload")
                ?.addEventListener("click", () => {
                    location.reload(true);
                });

            document
                .getElementById("vc-copy-state")
                ?.addEventListener("click", () => {
                    const state = {
                        page,
                        url: location.href,
                        sw,
                        cacheCount,
                        lsKeys,
                        localStorage: { ...localStorage },
                    };
                    navigator.clipboard.writeText(
                        JSON.stringify(state, null, 2),
                    );
                    closeMenu();
                });

            document
                .getElementById("vc-log-ls")
                ?.addEventListener("click", () => {
                    console.table(
                        Object.fromEntries(
                            Object.keys(localStorage).map((k) => [
                                k,
                                localStorage.getItem(k),
                            ]),
                        ),
                    );
                    closeMenu();
                });

            document
                .getElementById("vc-cache-toggle")
                ?.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    if (cachePanel.style.display === "block") {
                        cachePanel.style.display = "none";
                        return;
                    }
                    await renderCachePanel();
                    const rect = menu.getBoundingClientRect();
                    cachePanel.style.left = `${rect.right + 8}px`;
                    cachePanel.style.top = `${rect.top}px`;
                    cachePanel.style.display = "block";
                });

            document
                .getElementById("vc-ls-toggle")
                ?.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (lsPanel.style.display === "block") {
                        lsPanel.style.display = "none";
                        return;
                    }
                    renderLsPanel();
                    const rect = menu.getBoundingClientRect();
                    lsPanel.style.left = `${rect.right + 8}px`;
                    lsPanel.style.top = `${rect.top}px`;
                    lsPanel.style.display = "block";
                });
        }

        menu.addEventListener("click", (e) => e.stopPropagation());
        lsPanel.addEventListener("click", (e) => e.stopPropagation());

        navigator.serviceWorker.ready.then(() => {
            navigator.serviceWorker.controller?.postMessage({
                type: "GET_VERSION",
            });
        });

        let menuJustOpened = false;

        document.addEventListener("keydown", async (e) => {
            if (e.altKey && e.key === "a") {
                e.preventDefault();
                await buildMenu();
                menu.style.left = "20px";
                menu.style.top = "120px";
                menu.style.display = "block";
                menuJustOpened = true;
            }
            if (e.key === "Escape") closeMenu();
        });

        document.addEventListener("click", () => {
            if (menuJustOpened) {
                menuJustOpened = false;
                return;
            }
            closeMenu();
        });
    } catch (e) {
        console.error("initDebugMenu error:", e);
    }
}
