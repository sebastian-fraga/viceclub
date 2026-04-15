(async () => {
    let CONFIG;
    try {
        const res = await fetch(CONFIG_URL);
        CONFIG = await res.json();
    } catch (e) {
        console.error("No se pudo cargar la config del mapa:", e);
        return;
    }

    const aside = document.querySelector("aside");

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    aside.addEventListener("touchstart", startDrag);
    aside.addEventListener("mousedown", startDrag);

    function startDrag(e) {
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

        if (delta > 0) {
            aside.style.transform = `translateY(${delta}px)`;
        }
    }

    function endDrag() {
        isDragging = false;

        if (currentY - startY > 100) {
            aside.classList.remove("open");
        } else {
            aside.classList.add("open");
        }

        aside.style.transform = "";

        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("touchend", endDrag);
        document.removeEventListener("mouseup", endDrag);
    }

    let baseMarkers = Array.isArray(CONFIG.markers) ? [...CONFIG.markers] : [];

    const { map: mapCfg, markerTypes: MARKER_TYPES, storageKey } = CONFIG;

    const STORAGE_KEY = storageKey;
    const STORAGE_CUSTOM_KEY = storageKey + "_custom";

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

    function saveCustomMarkers(a) {
        localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(a));
    }

    let progress = loadProgress();
    let customMarkers = loadCustomMarkers();

    const layers = {};
    Object.keys(MARKER_TYPES).forEach((type) => {
        layers[type] = L.markerClusterGroup({
            maxClusterRadius: 20,
        });
        map.addLayer(layers[type]);
    });

    const customMarkerInstances = new Map();

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

            if (map.hasLayer(layer)) {
                map.removeLayer(layer);
                btn.querySelector(".layer-item").classList.add("inactive");
                btn.querySelector(".toggle-dot").classList.add("off");
            } else {
                map.addLayer(layer);
                btn.querySelector(".layer-item").classList.remove("inactive");
                btn.querySelector(".toggle-dot").classList.remove("off");
            }
        });

        layerButtonsContainer.appendChild(btn);
    });

    const ctxDynamicContainer = document.getElementById("ctx-dynamic-markers");

    if (ctxDynamicContainer) {
        Object.entries(MARKER_TYPES).forEach(([type, t]) => {
            const item = document.createElement("div");
            item.className = "ctx-item";

            item.innerHTML = `
            <span class="ci">
                <img src="../assets/images/maps/${GAME_ID}/${t.icon}" width="16" />
            </span>
            Agregar ${t.label}
        `;

            item.addEventListener("click", () => {
                if (ctxLatLng) {
                    addCustomMarker(
                        ctxLatLng.lat,
                        ctxLatLng.lng,
                        type,
                        null,
                        true,
                    );
                }
                ctxMenu.classList.remove("visible");
            });

            ctxDynamicContainer.appendChild(item);
        });
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

        const nextNumber = ids.length ? Math.max(...ids) + 1 : 1;
        return `${type}_${nextNumber}`;
    }

    function sortMarkersForExport(a, b) {
        if (a.type !== b.type) return a.type.localeCompare(b.type);

        const ai = String(a.id || "");
        const bi = String(b.id || "");
        return ai.localeCompare(bi);
    }

    function openPopup(marker, data) {
        const done = !!progress[data.id];
        const t = MARKER_TYPES[data.type];

        const totalOfType = getAllMarkers().filter(
            (m) => m.type === data.type,
        ).length;

        const doneOfType = getAllMarkers().filter(
            (m) => m.type === data.type && progress[m.id],
        ).length;

        const content = `
            <div class="popup-title">${data.label}</div>
            <div class="popup-meta">${t.label} · ${doneOfType}/${totalOfType} completados</div>
            <button class="popup-btn ${done ? "undone-btn" : "done-btn"}" id="popup-toggle-${data.id}">
                ${done ? "↩ Marcar como pendiente" : "✓ Marcar como completado"}
            </button>
        `;

        marker.bindPopup(content).openPopup();

        setTimeout(() => {
            const btn = document.getElementById(`popup-toggle-${data.id}`);
            if (!btn) return;

            btn.addEventListener("click", () => {
                if (progress[data.id]) delete progress[data.id];
                else progress[data.id] = true;

                saveProgress(progress);
                marker.setIcon(makeIcon(data.type, !!progress[data.id]));
                marker.closePopup();
                updateLayerProgress();
            });
        }, 50);
    }

    function openCustomPopup(marker, data) {
        marker
            .bindPopup(
                `
                <div class="popup-title">${data.label}</div>
                <div class="popup-meta">📍 Marcador personalizado</div>
                <button class="popup-btn danger" id="del-${data.id}" style="border-color:#ff5555;color:#ff5555;">
                    🗑 Eliminar marcador
                </button>
                `,
            )
            .openPopup();

        setTimeout(() => {
            const btn = document.getElementById(`del-${data.id}`);
            if (!btn) return;

            btn.addEventListener("click", () => {
                const layer = layers[data.type];
                if (layer) layer.removeLayer(marker);

                customMarkerInstances.delete(data.id);
                customMarkers = customMarkers.filter((c) => c.id !== data.id);
                saveCustomMarkers(customMarkers);
            });
        }, 50);
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

        if (layers[data.type]) {
            layers[data.type].addLayer(marker);
        }

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
        const sameTypeCount = getAllMarkers().filter(
            (m) => m.type === type,
        ).length;
        const label =
            labelOverride || `Custom ${t.label} #${sameTypeCount + 1}`;

        const data = { id, lat, lng, type, label };

        customMarkers.push(data);
        if (persist) saveCustomMarkers(customMarkers);

        createMarker(data, true);
    }

    const ctxMenu = document.getElementById("ctx-menu");
    let ctxLatLng = null;

    map.on("contextmenu", (e) => {
        ctxLatLng = e.latlng;
        document.getElementById("ctx-coords-display").textContent =
            `lat: ${e.latlng.lat.toFixed(2)}  ·  lng: ${e.latlng.lng.toFixed(2)}`;

        const x = e.originalEvent.clientX;
        const y = e.originalEvent.clientY;

        ctxMenu.style.left =
            (x + ctxMenu.offsetWidth + 10 > window.innerWidth
                ? x - ctxMenu.offsetWidth
                : x) + "px";

        ctxMenu.style.top =
            (y + ctxMenu.offsetHeight + 10 > window.innerHeight
                ? y - ctxMenu.offsetHeight
                : y) + "px";

        ctxMenu.classList.add("visible");
    });

    document.addEventListener("click", () =>
        ctxMenu.classList.remove("visible"),
    );
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") ctxMenu.classList.remove("visible");
    });

    document.getElementById("btn-export").addEventListener("click", () => {
        const finalJSON = {
            game: CONFIG.game || GAME_ID,
            storageKey: STORAGE_KEY,
            map: CONFIG.map,
            markerTypes: CONFIG.markerTypes,
            markers: [...baseMarkers, ...customMarkers].sort(
                sortMarkersForExport,
            ),
            progress,
        };

        const blob = new Blob([JSON.stringify(finalJSON, null, 2)], {
            type: "application/json",
        });

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `viceclub_${GAME_ID}.json`;
        a.click();

        URL.revokeObjectURL(a.href);
    });

    const inputImport = document.getElementById("input-import");

    document.getElementById("btn-import").addEventListener("click", () => {
        inputImport.click();
    });

    inputImport.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.progress) {
                    progress = data.progress;
                    saveProgress(progress);
                }

                if (Array.isArray(data.markers)) {
                    customMarkers = data.markers;
                    saveCustomMarkers(customMarkers);
                    rebuildAllMarkers();
                }
            } catch {
                console.error("JSON inválido");
            }
        };

        reader.readAsText(file);
        this.value = "";
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
        if (!confirm(`¿Resetear todo el progreso del mapa de GTA ${GAME_ID}?`))
            return;
        progress = {};
        saveProgress(progress);
        location.reload();
    });

    rebuildAllMarkers();
})();
