document.addEventListener("DOMContentLoaded", function () {
    const elements = {
        footer: document.querySelector(".radio-footer"),
        footerText: document.querySelector(".footer-text"),

        radioInfo: document.getElementById("radioInfo"),
        radioTitle: document.getElementById("radioTitle"),
        radioGrid: document.getElementById("radioGrid"),
        radioImage: document.getElementById("radioImage"),
        radioDJ: document.getElementById("radioDJ"),
        radioGenre: document.getElementById("radioGenre"),
        radioList: document.getElementById("radioList"),

        albumArt: document.getElementById("albumArt"),
        songTitle: document.getElementById("songTitle"),
        artistName: document.getElementById("artistName"),

        playPauseBtn: document.querySelector(".footer-pause"),
        playBtn: document.querySelector(".footer-play"),
        prevSongBtn: document.querySelector(
            ".footer-controls span:nth-child(1)",
        ),
        nextSongBtn: document.querySelector(
            ".footer-controls span:nth-child(4)",
        ),

        currentTime: document.getElementById("currentTime"),
        totalTime: document.getElementById("totalTime"),
        progressBar: document.getElementById("currentBar"),
        fullProgressBar: document.getElementById("bar"),

        volumeSlider: document.querySelector(".footer-volume input"),
        volumeIcon: document.querySelector(".footer-volume span"),
    };

    const audio = new Audio();

    const state = {
        currentRadio: null,
        radioData: {},
        targetTime: null,
        lastSongIndex: -1,
        isSeeking: false,
        isDraggingBar: false,
    };

    let resizeTimeout;
    let lastVolume = elements.volumeSlider ? elements.volumeSlider.value : 100;

    function refreshTranslations() {
        if (window.translations && window.applyTranslations) {
            window.applyTranslations(window.translations);
        }
    }

    function setFooterLoading(isLoading) {
        if (!elements.footerText) return;
        elements.footerText.classList.toggle("loading", isLoading);
    }

    function setPlayerButtonsDisabled(disabled) {
        elements.prevSongBtn?.classList.toggle("disabled", disabled);
        elements.playBtn?.classList.toggle("disabled", disabled);
        elements.playPauseBtn?.classList.toggle("disabled", disabled);
        elements.nextSongBtn?.classList.toggle("disabled", disabled);
    }

    function clearActiveCards() {
        document
            .querySelectorAll(".radio-card")
            .forEach((card) => card.classList.remove("active"));
    }

    function updateMediaSession(song) {
        if (!("mediaSession" in navigator)) return;

        const data = state.radioData[state.currentRadio];
        const title = song ? song.title : (data?.displayName ?? "Radio");
        const artist = song ? (song.artist ?? "") : "Vice Club";
        const artwork = data?.image ?? "";

        navigator.mediaSession.metadata = new MediaMetadata({
            title,
            artist,
            artwork: artwork
                ? [
                      { src: artwork, sizes: "512x512", type: "image/webp" },
                      { src: artwork, sizes: "256x256", type: "image/webp" },
                  ]
                : [],
        });

        navigator.mediaSession.setActionHandler("previoustrack", () =>
            handleSongChange("prev"),
        );
        navigator.mediaSession.setActionHandler("nexttrack", () =>
            handleSongChange("next"),
        );
        navigator.mediaSession.setActionHandler("seekbackward", () =>
            seekRelative(-10),
        );
        navigator.mediaSession.setActionHandler("seekforward", () =>
            seekRelative(10),
        );
        navigator.mediaSession.setActionHandler("play", () => {
            safePlay();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            audio.pause();
            elements.playPauseBtn.style.display = "none";
            elements.playBtn.style.display = "inline";
        });
    }

    function getCurrentSongIndex() {
        if (!state.currentRadio) return -1;

        const data = state.radioData[state.currentRadio];
        const songs = data?._activeSongs ?? data?.songs;
        if (!songs) return -1;

        const currentTime = audio.currentTime;

        for (let i = 0; i < songs.length; i++) {
            const start = Number(songs[i].start);
            const end = Number(songs[i].end);
            if (currentTime >= start && currentTime < end) return i;
        }

        return -1;
    }

    function checkMarquee(el) {
        el.classList.remove("marquee");
        el.innerHTML = el.textContent;

        setTimeout(() => {
            if (window.innerWidth <= 1980 && el.scrollWidth > el.clientWidth) {
                const overflow = el.scrollWidth - el.clientWidth;
                el.innerHTML = `<span>${el.textContent}</span>`;
                el.classList.add("marquee");
                el.style.setProperty("--marquee-distance", `-${overflow}px`);
            }
        }, 0);
    }

    function renderDJ(dj) {
        if (!dj) return "";
        const djs = Array.isArray(dj) ? dj : [dj];

        return `
            <span data-i18n="radio.info.host">Conducido por:</span>
            <div class="dj-tags">
                ${djs.map((d) => `<p>${d}</p>`).join("")}
            </div>
        `;
    }

    function renderGenre(genre) {
        if (!genre) return "";
        const genres = Array.isArray(genre) ? genre : [genre];

        return `
            <span data-i18n="radio.info.genre">Género:</span>
            <div class="genre-tags">
                ${genres.map((g) => `<p>${g}</p>`).join("")}
            </div>
        `;
    }

    function renderSongList(songs, activeIndex) {
        elements.radioList.innerHTML = "";

        if (!songs || songs.length === 0) return;

        const title = document.createElement("h4");
        title.textContent = "Canciones:";
        title.dataset.i18n = "radio.info.tracklist";
        title.classList.add("tracklist-title");
        elements.radioList.appendChild(title);

        refreshTranslations();

        songs.forEach((song, i) => {
            const li = document.createElement("li");
            if (i === activeIndex) li.classList.add("active");

            li.innerHTML = `
                <span class="tl-num">${i + 1}</span>
                <span class="tl-play material-symbols-rounded">play_arrow</span>
                <div class="tl-info">
                    <div class="tl-title">${song.title ?? ""}</div>
                    ${song.artist ? `<div class="tl-artist">${song.artist}</div>` : ""}
                </div>
            `;

            li.addEventListener("click", () => seekTo(Number(song.start)));
            elements.radioList.appendChild(li);
        });
    }

    function formatTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0) {
            return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function updateBarVisual(clientX) {
        const rect = elements.fullProgressBar.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const pct = (x / rect.width) * 100;

        elements.progressBar.style.width = `${pct}%`;

        const previewTime = (x / rect.width) * audio.duration;
        if (!isNaN(previewTime)) {
            elements.currentTime.textContent = formatTime(previewTime);
        }
    }

    function getSeekTime(clientX) {
        const rect = elements.fullProgressBar.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        return (x / rect.width) * audio.duration;
    }

    function updateIcon(vol) {
        if (vol == 0) {
            elements.volumeIcon.textContent = "volume_off";
            elements.volumeIcon.dataset.state = "muted";
        } else if (vol < 50) {
            elements.volumeIcon.textContent = "volume_down";
            elements.volumeIcon.dataset.state = "low";
        } else {
            elements.volumeIcon.textContent = "volume_up";
            elements.volumeIcon.dataset.state = "high";
        }
    }

    function updateRange() {
        const value =
            ((elements.volumeSlider.value - elements.volumeSlider.min) /
                (elements.volumeSlider.max - elements.volumeSlider.min)) *
            100;

        elements.volumeSlider.style.background = `
            linear-gradient(to right,  #e39dff ${value}%,
            rgba(192,192,192,0.3) ${value}%)
        `;
        elements.volumeSlider.style.transition = "background 0.1s linear";
    }

    function safePlay() {
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    elements.playBtn.style.display = "none";
                    elements.playPauseBtn.style.display = "inline";
                })
                .catch((err) => {
                    if (err.name === "NotAllowedError") {
                        console.warn(
                            "Autoplay bloqueado por el navegador. Esperando clic del usuario.",
                        );
                        elements.playPauseBtn.style.display = "none";
                        elements.playBtn.style.display = "inline";
                    } else if (err.name !== "AbortError") {
                        console.error("Error al reproducir:", err);
                    }
                });
        }
    }

    function seekTo(time) {
        if (!isFinite(audio.duration) || !isFinite(time)) return;

        state.isSeeking = true;
        state.targetTime = time;
        state.lastSongIndex = -2;

        elements.songTitle.textContent = "";
        elements.artistName.textContent = "";

        document
            .querySelectorAll("#radioList li")
            .forEach((li) => li.classList.remove("active"));

        audio.currentTime = Math.max(0, Math.min(time, audio.duration));
    }

    function seekRelative(seconds) {
        if (state.isSeeking) return;

        const newTime = Math.max(
            0,
            Math.min(audio.currentTime + seconds, audio.duration),
        );
        seekTo(newTime);
    }

    function updateActiveSong(index) {
        const data = state.radioData[state.currentRadio];
        const songs = data?._activeSongs ?? data?.songs;
        if (!songs || !songs[index]) return;

        const playlistIndex = data.playlists
            ? [...document.querySelectorAll(".playlist-btn")].findIndex((b) =>
                  b.classList.contains("active"),
              )
            : -1;

        const hashSuffix =
            playlistIndex !== -1
                ? `@${playlistIndex}@${Math.floor(songs[index].start)}`
                : `@${Math.floor(songs[index].start)}`;

        history.replaceState(null, "", `#${state.currentRadio}${hashSuffix}`);

        elements.songTitle.textContent = songs[index].title;
        elements.artistName.textContent = songs[index].artist;

        elements.songTitle.classList.remove("marquee");
        elements.artistName.classList.remove("marquee");

        checkMarquee(elements.songTitle);
        checkMarquee(elements.artistName);

        renderSongList(songs, index);
        updateMediaSession(songs[index]);
    }

    function handleSongChange(direction) {
        if (!state.currentRadio) return;

        const data = state.radioData[state.currentRadio];
        const songs = data?._activeSongs ?? data?.songs;
        if (!songs || songs.length === 0) return;

        const index = getCurrentSongIndex();

        if (direction === "next") {
            const next =
                index !== -1
                    ? songs[(index + 1) % songs.length]
                    : songs.find((s) => Number(s.start) > audio.currentTime);

            if (next) seekTo(Number(next.start));
        }

        if (direction === "prev") {
            const prev =
                index !== -1
                    ? songs[(index - 1 + songs.length) % songs.length]
                    : [...songs]
                          .reverse()
                          .find((s) => Number(s.end) < audio.currentTime);

            if (prev) seekTo(Number(prev.start));
        }
    }

    function playRadio(name) {
        const data = state.radioData[name];

        if (!data || !data.audio) {
            audio.pause();
            setFooterLoading(false);
            return;
        }

        setFooterLoading(true);

        audio.src = `${data.audio}?v=${Date.now()}`;
        audio.oncanplay = () => {
            safePlay();
            audio.oncanplay = null;
        };

        const songs = data.songs;

        if (songs && songs.length > 0) {
            renderSongList(songs, -1);

            const firstIndex = getCurrentSongIndex();
            if (firstIndex !== -1) {
                state.lastSongIndex = firstIndex;
                updateActiveSong(firstIndex);
            } else {
                elements.songTitle.textContent = "";
                elements.artistName.textContent = "";
            }
        } else {
            elements.songTitle.textContent = "Sin información de canciones";
            elements.artistName.textContent = "";
        }

        updateMediaSession(null);
    }

    function updateRadioReproductor(radioKey, playlistIndex) {
        const data = state.radioData[radioKey];
        const playlist = data.playlists[playlistIndex];
        if (!playlist) return;

        data._activeSongs = playlist.songs ?? [];

        const selector = document.getElementById("playlistSelector");

        elements.radioDJ.innerHTML = "";
        if (selector) elements.radioDJ.appendChild(selector);

        if (playlist.dj) {
            const djInfo = document.createElement("div");
            djInfo.innerHTML = renderDJ(playlist.dj);
            elements.radioDJ.appendChild(djInfo);
        }

        elements.radioGenre.innerHTML = renderGenre(playlist.genre);

        refreshTranslations();

        if (playlist.audio) {
            setFooterLoading(true);

            audio.src = `${playlist.audio}?v=${Date.now()}`;
            audio.oncanplay = () => {
                safePlay();
                audio.oncanplay = null;
            };
        } else {
            setFooterLoading(false);
        }

        if (data._activeSongs.length > 0) {
            renderSongList(data._activeSongs, -1);

            const firstIndex = getCurrentSongIndex();
            if (firstIndex !== -1) {
                state.lastSongIndex = firstIndex;
                updateActiveSong(firstIndex);
            } else {
                elements.songTitle.textContent = "";
                elements.artistName.textContent = "";
            }
        } else {
            elements.songTitle.textContent = "Sin información de canciones";
            elements.artistName.textContent = "";
        }

        updateMediaSession(null);
    }

    function makeDial() {
        if (!window.location.pathname.includes("/V/")) return;

        const container = elements.radioGrid;
        const items = container.querySelectorAll(".radio-card");
        const total = items.length;

        if (total === 0) return;

        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);

        const cardSize = parseFloat(getComputedStyle(items[0]).width);
        const minRadius = (total * cardSize) / (2 * Math.PI);
        const naturalRadius = size / 2 - (window.innerWidth < 500 ? 30 : 60);
        const radius = Math.max(minRadius, naturalRadius);

        const step = 360 / total;
        const startAngle = 90;

        items.forEach((item, index) => {
            const angle = step * index + startAngle;
            item.style.transform = `
                rotate(${angle}deg)
                translate(${radius}px)
                rotate(${-angle}deg)
            `;
        });
    }

    function renderRadioGrid() {
        elements.radioGrid.innerHTML = "";

        if (window.location.pathname.includes("/V/")) {
            const offCard = document.createElement("div");
            offCard.classList.add("radio-card", "active");
            offCard.dataset.off = "true";
            offCard.innerHTML = `<img src="../assets/images/radios/V/off.webp" alt="Apagado">`;

            offCard.addEventListener("click", () => {
                clearActiveCards();
                offCard.classList.add("active");

                if (state.currentRadio && state.radioData[state.currentRadio]) {
                    delete state.radioData[state.currentRadio]._activeSongs;
                }

                audio.pause();
                audio.src = "";
                state.currentRadio = null;
                setFooterLoading(false);

                elements.footer.classList.remove("active");
                elements.radioInfo.classList.remove("active");
                elements.radioInfo.addEventListener(
                    "transitionend",
                    () => {
                        elements.radioInfo.style.display = "none";
                    },
                    { once: true },
                );

                elements.playPauseBtn.style.display = "none";
                elements.playBtn.style.display = "inline";

                window.scrollTo({ top: 0, behavior: "smooth" });
                elements.radioInfo.scrollTop = 0;
            });

            elements.radioGrid.appendChild(offCard);
        }

        Object.keys(state.radioData).forEach((radioKey) => {
            const radio = state.radioData[radioKey];
            if (!radio || (!radio.audio && !radio.playlists)) return;

            const card = document.createElement("div");
            card.classList.add("radio-card");
            card.innerHTML = `<img src="${radio.image}" alt="${radio.displayName}">`;
            card.dataset.radioKey = radioKey;

            card.addEventListener("click", () => {
                clearActiveCards();
                card.classList.add("active");

                if (state.currentRadio && state.radioData[state.currentRadio]) {
                    delete state.radioData[state.currentRadio]._activeSongs;
                }

                state.currentRadio = radioKey;
                updateRadioDirect(radioKey);
                window.scrollTo({ top: 0, behavior: "smooth" });
            });

            elements.radioGrid.appendChild(card);
        });

        makeDial();
    }

    function updateRadioDirect(radioKey) {
        history.replaceState(null, "", `#${radioKey}`);

        const data = state.radioData[radioKey];
        if (!data) return;
        if (!elements.footer) return;

        setFooterLoading(true);

        elements.radioInfo.style.display = "grid";
        requestAnimationFrame(() => elements.radioInfo.classList.add("active"));
        elements.footer.classList.add("active");

        elements.radioTitle.textContent = data.displayName;
        elements.radioImage.src = data.image || "";
        elements.albumArt.src = data.image || "";

        if (data.playlists) {
            audio.pause();
            audio.src = "";
            elements.playPauseBtn.style.display = "none";
            elements.playBtn.style.display = "inline";

            const selectorHTML = data.playlists
                .map(
                    (playlist, i) => `
                        <button class="playlist-btn${i === 0 ? " active" : ""}" data-index="${i}">
                            ${playlist.name}
                        </button>
                    `,
                )
                .join("");

            elements.radioDJ.innerHTML = `<div id="playlistSelector">${selectorHTML}</div>`;
            elements.radioGenre.innerHTML = "";

            updateRadioReproductor(radioKey, 0);

            document.querySelectorAll(".playlist-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    document
                        .querySelectorAll(".playlist-btn")
                        .forEach((b) => b.classList.remove("active"));

                    btn.classList.add("active");
                    updateRadioReproductor(radioKey, Number(btn.dataset.index));
                });
            });

            refreshTranslations();
            return;
        }

        playRadio(radioKey);
        elements.radioDJ.innerHTML = renderDJ(data.dj);
        elements.radioGenre.innerHTML = renderGenre(data.genre);

        refreshTranslations();
    }

    async function loadRadioData() {
        const rutaActual = window.location.pathname;
        const carpetas = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];
        const juego = carpetas.find((carpeta) =>
            rutaActual.includes(`/${carpeta}/`),
        );

        if (!juego) {
            console.error("No se pudo detectar el juego desde la URL.");
            return;
        }

        if (juego === "V") makeDial();

        const rutaJSON = `https://viceclub.s3.us-east-1.amazonaws.com/${juego}/radio.json`;

        try {
            const response = await fetch(rutaJSON);
            state.radioData = await response.json();

            renderRadioGrid();

            const hash = window.location.hash.slice(1);

            if (hash && hash.includes("@")) {
                const parts = hash.split("@");
                const radioKey = parts[0];

                const hasPlaylist = parts.length === 3;
                const playlistIndex = hasPlaylist ? Number(parts[1]) : 0;
                const time = hasPlaylist ? Number(parts[2]) : Number(parts[1]);

                if (state.radioData[radioKey]) {
                    const card = [
                        ...document.querySelectorAll(".radio-card"),
                    ].find((c) => c.dataset.radioKey === radioKey);

                    if (card) {
                        card.click();
                        audio.addEventListener(
                            "loadedmetadata",
                            () => {
                                if (
                                    hasPlaylist &&
                                    state.radioData[radioKey].playlists
                                ) {
                                    const btn =
                                        document.querySelectorAll(
                                            ".playlist-btn",
                                        )[playlistIndex];

                                    if (btn) {
                                        document
                                            .querySelectorAll(".playlist-btn")
                                            .forEach((b) =>
                                                b.classList.remove("active"),
                                            );
                                        btn.classList.add("active");
                                        updateRadioReproductor(
                                            radioKey,
                                            playlistIndex,
                                        );
                                    }

                                    audio.addEventListener(
                                        "loadedmetadata",
                                        () => seekTo(time),
                                        { once: true },
                                    );
                                } else {
                                    seekTo(time);
                                }
                            },
                            { once: true },
                        );
                    }
                }
            } else if (hash && state.radioData[hash]) {
                const card = [...document.querySelectorAll(".radio-card")].find(
                    (c) => c.dataset.radioKey === hash,
                );
                if (card) card.click();
            }
        } catch (error) {
            console.error("Error cargando radios:", error);
        }
    }

    audio.addEventListener("seeked", () => {
        state.isSeeking = false;

        if (state.targetTime !== null) {
            audio.currentTime = state.targetTime;
            state.targetTime = null;
        }

        const activeIndex = getCurrentSongIndex();
        state.lastSongIndex = activeIndex;

        if (activeIndex !== -1) {
            updateActiveSong(activeIndex);
        } else {
            elements.songTitle.textContent = "";
            elements.artistName.textContent = "";

            const data = state.radioData[state.currentRadio];
            const songs = data?._activeSongs ?? data?.songs;
            if (songs) renderSongList(songs, -1);

            updateMediaSession(null);
        }
    });

    audio.addEventListener("loadstart", () => {
        setFooterLoading(true);
        setPlayerButtonsDisabled(true);
    });

    audio.addEventListener("canplay", () => {
        setFooterLoading(false);
        setPlayerButtonsDisabled(false);
    });

    audio.addEventListener("timeupdate", () => {
        if (state.isSeeking || state.isDraggingBar) return;

        const totalTime = audio.duration;
        const currentTime = audio.currentTime;

        if (!isNaN(totalTime)) {
            const progress = (currentTime / totalTime) * 100;
            elements.progressBar.style.width = `${progress}%`;

            elements.currentTime.textContent = formatTime(currentTime);
            elements.totalTime.textContent = formatTime(totalTime);

            const activeIndex = getCurrentSongIndex();

            if (activeIndex !== state.lastSongIndex) {
                state.lastSongIndex = activeIndex;

                if (activeIndex !== -1) {
                    updateActiveSong(activeIndex);
                } else {
                    elements.songTitle.textContent = "";
                    elements.artistName.textContent = "";
                    document
                        .querySelectorAll("#radioList li")
                        .forEach((li) => li.classList.remove("active"));
                    updateMediaSession(null);
                }
            }
        }
    });

    audio.addEventListener("ended", () => {
        elements.playPauseBtn.style.display = "none";
        elements.playBtn.style.display = "inline";
    });

    elements.playPauseBtn.addEventListener("click", () => {
        audio.pause();
        elements.playPauseBtn.style.display = "none";
        elements.playBtn.style.display = "inline";
    });

    elements.playBtn.addEventListener("click", () => {
        safePlay();
    });

    elements.prevSongBtn.addEventListener("click", () =>
        handleSongChange("prev"),
    );
    elements.nextSongBtn.addEventListener("click", () =>
        handleSongChange("next"),
    );

    elements.fullProgressBar.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        state.isDraggingBar = true;
        updateBarVisual(e.clientX);
    });

    elements.fullProgressBar.addEventListener(
        "touchstart",
        (e) => {
            e.stopPropagation();
            state.isDraggingBar = true;
            updateBarVisual(e.touches[0].clientX);
        },
        { passive: true },
    );

    document.addEventListener("mousemove", (e) => {
        if (!state.isDraggingBar) return;
        updateBarVisual(e.clientX);
    });

    document.addEventListener(
        "touchmove",
        (e) => {
            if (!state.isDraggingBar) return;
            updateBarVisual(e.touches[0].clientX);
        },
        { passive: true },
    );

    document.addEventListener("mouseup", (e) => {
        if (!state.isDraggingBar) return;
        state.isDraggingBar = false;
        seekTo(getSeekTime(e.clientX));
    });

    document.addEventListener("touchend", (e) => {
        if (!state.isDraggingBar) return;
        state.isDraggingBar = false;
        seekTo(getSeekTime(e.changedTouches[0].clientX));
    });

    document.addEventListener("keydown", (e) => {
        if (!audio.duration) return;
        if (state.isSeeking) return;
        if (e.repeat) return;

        if (e.key === "ArrowRight") seekRelative(5);
        if (e.key === "ArrowLeft") seekRelative(-5);
    });

    document.addEventListener("keydown", (e) => {
        if (!audio.duration) return;
        if (state.isSeeking) return;
        if (e.repeat) return;

        if (e.code === "Space") {
            e.preventDefault();

            if (audio.paused) {
                audio.play();
                elements.playPauseBtn.style.display = "inline";
                elements.playBtn.style.display = "none";
            } else {
                audio.pause();
                elements.playPauseBtn.style.display = "none";
                elements.playBtn.style.display = "inline";
            }
        }
    });

    function initVolumeControls() {
        if (!elements.volumeSlider) return;

        const savedVolume = localStorage.getItem("volume");
        if (savedVolume !== null) {
            audio.volume = savedVolume / 100;
            elements.volumeSlider.value = savedVolume;
            updateIcon(savedVolume);
        }

        elements.volumeSlider.addEventListener("input", () => {
            const vol = elements.volumeSlider.value;
            audio.volume = vol / 100;
            localStorage.setItem("volume", vol);
            if (vol > 0) lastVolume = vol;

            updateIcon(vol);
        });

        function toggleMute() {
            if (audio.volume > 0) {
                lastVolume = elements.volumeSlider.value;
                audio.volume = 0;
                elements.volumeSlider.value = 0;
                localStorage.setItem("volume", 0);
                updateIcon(0);
            } else {
                audio.volume = lastVolume / 100;
                elements.volumeSlider.value = lastVolume;
                localStorage.setItem("volume", lastVolume);
                updateIcon(lastVolume);
            }

            updateRange();
        }

        elements.volumeIcon.addEventListener("click", toggleMute);

        document.addEventListener("keydown", (e) => {
            if (e.code === "KeyM") {
                toggleMute();
            }
        });

        elements.volumeSlider.addEventListener("input", updateRange);
        updateRange();
    }

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            const songTitleEl = elements.songTitle;
            const artistNameEl = elements.artistName;

            if (songTitleEl) checkMarquee(songTitleEl);
            if (artistNameEl) checkMarquee(artistNameEl);

            makeDial();
        }, 150);
    });

    const debugMode = window.location.hostname === "localhost";

    if (debugMode) {
        document.addEventListener("click", () => {
            const seconds = Math.round(audio.currentTime * 100) / 100 - 0.35;
            navigator.clipboard.writeText(seconds.toString());
            console.log("Tiempo copiado:", seconds);
        });
    }

    function init() {
        initVolumeControls();
        loadRadioData();
    }

    init();
});
