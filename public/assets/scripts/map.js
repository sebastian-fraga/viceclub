(async () => {
    const CONFIG_URL = window.CONFIG_URL;
    const GAME_ID = window.GAME_ID;

    let CONFIG;
    try {
        const res = await fetch(CONFIG_URL);
        CONFIG = await res.json();
    } catch (e) {
        console.error("Could not load map config:", e);
        return;
    }

    const { map: mapCfg, markerTypes: MARKER_TYPES, storageKey } = CONFIG;
    const STORAGE_KEY = storageKey;
    const STORAGE_CUSTOM_KEY = storageKey + "_custom";

    let baseMarkers = Array.isArray(CONFIG.markers) ? [...CONFIG.markers] : [];
    let progress = loadProgress();
    let customMarkers = loadCustomMarkers();

    function loadProgress() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function saveProgress(p) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    }

    function loadCustomMarkers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_CUSTOM_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveCustomMarkers(arr) {
        localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(arr));
    }

    const bounds = mapCfg.bounds;
    const map = L.map("map", {
        crs: L.CRS.Simple,
        minZoom: mapCfg.minZoom,
        maxZoom: mapCfg.maxZoom,
        maxBounds: bounds,
        maxBoundsViscosity: 1,
    });

    L.imageOverlay(mapCfg.image, bounds).addTo(map);
    map.fitBounds(bounds);

    const layers = {};
    Object.keys(MARKER_TYPES).forEach((type) => {
        layers[type] = L.markerClusterGroup({ maxClusterRadius: 20 });
        map.addLayer(layers[type]);
    });

    const customMarkerInstances = new Map();

    function getAllMarkers() {
        return [...baseMarkers, ...customMarkers];
    }

    function nextMarkerId(type) {
        const ids = getAllMarkers()
            .filter((m) => m.type === type)
            .map((m) => {
                const match = String(m.id || "").match(
                    new RegExp(`^${type}_(\\d+)$`),
                );
                return match ? Number(match[1]) : 0;
            });
        return `${type}_${ids.length ? Math.max(...ids) + 1 : 1}`;
    }

    function sortMarkersForExport(a, b) {
        if (a.type !== b.type) return a.type.localeCompare(b.type);
        return String(a.id || "").localeCompare(String(b.id || ""));
    }

    function downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
    }

    function getContextMenuPos(x, y, menuEl) {
        return {
            left:
                x + menuEl.offsetWidth + 10 > window.innerWidth
                    ? x - menuEl.offsetWidth
                    : x,
            top:
                y + menuEl.offsetHeight + 10 > window.innerHeight
                    ? y - menuEl.offsetHeight
                    : y,
        };
    }

    function bindPopupButton(id, handler) {
        setTimeout(() => {
            document.getElementById(id)?.addEventListener("click", handler);
        }, 50);
    }

    function initAsideDrag(aside, toolbar) {
        let startY = 0,
            currentY = 0,
            isDragging = false;

        function startDrag(e) {
            if (toolbar.scrollTop > 0) return;
            isDragging = true;
            startY = e.touches ? e.touches[0].clientY : e.clientY;
            document.addEventListener("touchmove", onDrag);
            document.addEventListener("mousemove", onDrag);
            document.addEventListener("touchend", endDrag);
            document.addEventListener("mouseup", endDrag);
        }

        function onDrag(e) {
            if (!isDragging) return;
            currentY = e.touches ? e.touches[0].clientY : e.clientY;
            const delta = currentY - startY;
            if (delta > 0) aside.style.transform = `translateY(${delta}px)`;
        }

        function endDrag() {
            isDragging = false;
            aside.classList.toggle("open", currentY - startY <= 100);
            aside.style.transform = "";
            document.removeEventListener("touchmove", onDrag);
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("touchend", endDrag);
            document.removeEventListener("mouseup", endDrag);
        }

        aside.addEventListener("touchstart", startDrag);
        aside.addEventListener("mousedown", startDrag);
    }

    const toolbar = document.querySelector("#map-toolbar");
    const aside = document.querySelector("aside");
    initAsideDrag(aside, toolbar);

    function makeIcon(type, done) {
        const SIZE = 44;
        const t = MARKER_TYPES[type];
        return L.divIcon({
            html: `
                <div class="marker ${done ? "done" : ""}" style="--marker-color:${t.color}">
                    <img src="../assets/images/maps/${GAME_ID}/${t.icon}" />
                </div>
            `,
            className: "",
            iconSize: [SIZE, SIZE],
            iconAnchor: [SIZE / 2, SIZE / 2],
            popupAnchor: [0, -(SIZE / 2 + 6)],
        });
    }

    function openPopup(marker, data) {
        const buildContent = () => {
            const done = !!progress[data.id];
            const t = MARKER_TYPES[data.type];
            const allOfType = getAllMarkers().filter(
                (m) => m.type === data.type,
            );
            const doneOfType = allOfType.filter((m) => progress[m.id]).length;

            return `
            <div class="popup-title">${data.label}</div>
            <div class="popup-meta">${t.label} · ${doneOfType}/${allOfType.length} completados</div>
            <button class="popup-btn ${done ? "undone-btn" : "done-btn"}" id="popup-toggle-${data.id}">
                ${done ? "↩ Marcar como pendiente" : "✓ Marcar como completado"}
            </button>
        `;
        };

        marker.unbindPopup();
        marker.bindPopup(buildContent()).openPopup();

        bindPopupButton(`popup-toggle-${data.id}`, () => {
            if (progress[data.id]) delete progress[data.id];
            else progress[data.id] = true;

            saveProgress(progress);
            marker.setIcon(makeIcon(data.type, !!progress[data.id]));
            marker.closePopup();
            updateLayerProgress();
        });
    }

    function openCustomPopup(marker, data) {
        marker
            .bindPopup(
                `
            <div class="popup-title">${data.label}</div>
            <div class="popup-meta">Marcador personalizado</div>
            <button class="popup-btn danger" id="del-${data.id}" style="border-color:#ff5555;color:#ff5555;">
                🗑 Borrar marcador
            </button>
        `,
            )
            .openPopup();

        bindPopupButton(`del-${data.id}`, () => {
            layers[data.type]?.removeLayer(marker);
            customMarkerInstances.delete(data.id);
            customMarkers = customMarkers.filter((c) => c.id !== data.id);
            saveCustomMarkers(customMarkers);
        });
    }

    function createMarker(data, isCustom = false) {
        const marker = L.marker([data.lat, data.lng], {
            icon: makeIcon(data.type, !!progress[data.id]),
        });

        if (isCustom) {
            customMarkerInstances.set(data.id, marker);
            marker.on("click", () => openCustomPopup(marker, data));
        } else {
            marker.on("click", () => openPopup(marker, data));
        }

        layers[data.type]?.addLayer(marker);
        return marker;
    }

    function rebuildAllMarkers() {
        Object.values(layers).forEach((layer) => layer.clearLayers());
        customMarkerInstances.clear();
        baseMarkers.forEach((m) => createMarker(m, false));
        customMarkers.forEach((m) => createMarker(m, true));
        updateLayerProgress();
    }

    function addCustomMarker(lat, lng, type, labelOverride, persist = true) {
        const t = MARKER_TYPES[type];
        if (!t) return;

        const id = nextMarkerId(type);
        const count = getAllMarkers().filter((m) => m.type === type).length;
        const label = labelOverride || `Custom ${t.label} #${count + 1}`;
        const data = { id, lat, lng, type, label };

        customMarkers.push(data);
        if (persist) saveCustomMarkers(customMarkers);
        createMarker(data, true);
    }

    function updateLayerProgress() {
        Object.keys(MARKER_TYPES).forEach((type) => {
            const all = getAllMarkers().filter((m) => m.type === type);
            const done = all.filter((m) => progress[m.id]).length;
            const total = all.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            const countEl = document.getElementById(`progress-${type}`);
            const barEl = document.getElementById(`progress-bar-${type}`);

            if (countEl) countEl.textContent = `${done} / ${total}`;
            if (barEl) barEl.style.width = `${pct}%`;
        });
    }

    const layerButtonsContainer = document.getElementById("layer-buttons");

    Object.entries(MARKER_TYPES).forEach(([type, t]) => {
        const btn = document.createElement("button");
        btn.className = "layer-btn";
        btn.dataset.layer = type;
        btn.innerHTML = `
            <div class="layer-item active" data-layer="${type}">
                <div class="layer-thumb">
                    <img src="../assets/images/maps/${GAME_ID}/${t.icon}" />
                </div>
                <div class="layer-info">
                    <div class="layer-name">${t.label}</div>
                    <div class="layer-count">
                        <div class="progress-bar-wrap">
                            <div class="progress-bar" id="progress-bar-${type}" style="width:0%"></div>
                        </div>
                        <span id="progress-${type}">0 / 0</span>
                    </div>
                </div>
                <div class="toggle-dot" id="dot-${type}"></div>
            </div>
        `;

        btn.addEventListener("click", () => {
            const layer = layers[type];
            const hasLayer = map.hasLayer(layer);
            hasLayer ? map.removeLayer(layer) : map.addLayer(layer);
            btn.querySelector(".layer-item").classList.toggle(
                "inactive",
                hasLayer,
            );
            btn.querySelector(".toggle-dot").classList.toggle("off", hasLayer);
        });

        layerButtonsContainer.appendChild(btn);
    });

    const ctxMenu = document.getElementById("ctx-menu");
    let ctxLatLng = null;

    if (ctxMenu) {
        const ctxDynamicContainer = document.getElementById(
            "ctx-dynamic-markers",
        );
        if (ctxDynamicContainer) {
            Object.entries(MARKER_TYPES).forEach(([type, t]) => {
                const item = document.createElement("div");
                item.className = "ctx-item";
                item.innerHTML = `
                <span class="ci">
                    <img src="../assets/images/maps/${GAME_ID}/${t.icon}" width="16" />
                </span>
                Add ${t.label}
            `;
                item.addEventListener("click", () => {
                    if (ctxLatLng)
                        addCustomMarker(
                            ctxLatLng.lat,
                            ctxLatLng.lng,
                            type,
                            null,
                            true,
                        );
                    ctxMenu.classList.remove("visible");
                });
                ctxDynamicContainer.appendChild(item);
            });
        }

        let ctxJustOpened = false;

        map.on("contextmenu", (e) => {
            ctxLatLng = e.latlng;
            const coordsDisplay = document.getElementById("ctx-coords-display");
            if (coordsDisplay)
                coordsDisplay.textContent = `lat: ${e.latlng.lat.toFixed(2)}  ·  lng: ${e.latlng.lng.toFixed(2)}`;

            const { left, top } = getContextMenuPos(
                e.originalEvent.clientX,
                e.originalEvent.clientY,
                ctxMenu,
            );
            ctxMenu.style.left = `${left}px`;
            ctxMenu.style.top = `${top}px`;
            ctxMenu.classList.add("visible");
            ctxJustOpened = true;
        });

        document.addEventListener("click", () => {
            if (ctxJustOpened) {
                ctxJustOpened = false;
                return;
            }
            ctxMenu.classList.remove("visible");
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") ctxMenu.classList.remove("visible");
        });
    }

    document.addEventListener("click", () =>
        ctxMenu?.classList.remove("visible"),
    );
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") ctxMenu?.classList.remove("visible");
    });

    function createConfirmDialog({ text, onConfirm }) {
        const dialog = document.createElement("dialog");
        dialog.classList.add("reset-dialog");
        dialog.innerHTML = `
            <form method="dialog" class="dialog-content">
                <h3>Confirm action</h3>
                <p>${text}</p>
                <div class="dialog-actions">
                    <button value="cancel">Cancel</button>
                    <button id="confirm-btn" value="confirm">Confirm</button>
                </div>
            </form>
        `;

        document.body.appendChild(dialog);

        dialog.querySelector("#confirm-btn").addEventListener("click", () => {
            onConfirm();
            dialog.close();
            dialog.remove();
        });

        dialog.addEventListener("close", () => dialog.remove());

        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            const clickedInside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;
            if (!clickedInside) dialog.close("cancel");
        });

        dialog.showModal();
    }

    const btnExportProgress = document.getElementById("btn-export-progress");
    const btnImport = document.getElementById("btn-import");
    const btnExportDebug = document.getElementById("btn-export-debug");
    const inputImport = document.getElementById("input-import");
    const btnReset = document.getElementById("btn-reset");

    btnExportProgress?.addEventListener("click", () => {
        downloadJSON(
            { game: GAME_ID, storageKey: STORAGE_KEY, progress, customMarkers },
            `viceclub_progress_${GAME_ID}.json`,
        );
    });

    btnExportDebug?.addEventListener("click", () => {
        downloadJSON(
            {
                game: CONFIG.game || GAME_ID,
                storageKey: STORAGE_KEY,
                map: CONFIG.map,
                markerTypes: CONFIG.markerTypes,
                markers: [...baseMarkers, ...customMarkers].sort(
                    sortMarkersForExport,
                ),
                progress,
            },
            `viceclub_${GAME_ID}.json`,
        );
    });

    if (btnImport && inputImport) {
        btnImport.addEventListener("click", () => inputImport.click());

        inputImport.addEventListener("change", function () {
            const file = this.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);

                    if (data.game !== GAME_ID) {
                        alert("This file does not belong to this map.");
                        return;
                    }

                    if (data.progress) {
                        progress = { ...progress, ...data.progress };
                        saveProgress(progress);
                    }

                    if (Array.isArray(data.customMarkers)) {
                        const existingIds = new Set(
                            customMarkers.map((m) => m.id),
                        );
                        data.customMarkers.forEach((m) => {
                            if (!existingIds.has(m.id)) customMarkers.push(m);
                        });
                        saveCustomMarkers(customMarkers);
                    }

                    rebuildAllMarkers();
                } catch (err) {
                    console.error("Invalid JSON:", err);
                }
            };

            reader.readAsText(file);
            this.value = "";
        });
    }

    btnReset?.addEventListener("click", () => {
        createConfirmDialog({
            text: `Reset all map progress for GTA ${GAME_ID}?`,
            onConfirm: () => {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_CUSTOM_KEY);
                location.reload();
            },
        });
    });

    rebuildAllMarkers();
})();
