document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector(".radio-footer");
    const radioInfo = document.getElementById("radioInfo");
    const radioTitle = document.getElementById("radioTitle");
    const radioGrid = document.getElementById("radioGrid");

    const audio = new Audio();
    let currentRadio = null;
    let radioData = {};
    let targetTime = null;

    function updateMediaSession(song, radioData) {
        if (!("mediaSession" in navigator)) return;

        const data = radioData[currentRadio];

        const title = song ? song.title : (data?.displayName ?? "Radio");
        const artist = song ? (song.artist ?? "") : "Vice Club";
        const artwork = data?.image ?? "";

        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: artist,
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
            audio.play();
            playBtn.style.display = "none";
            playPauseBtn.style.display = "inline";
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            audio.pause();
            playPauseBtn.style.display = "none";
            playBtn.style.display = "inline";
        });
    }

    function getCurrentSongIndex() {
        if (!currentRadio) return -1;

        const data = radioData[currentRadio];
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

    async function loadRadioData() {
        const rutaActual = window.location.pathname;
        const carpetas = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];
        let juego = null;

        carpetas.forEach((carpeta) => {
            if (rutaActual.includes("/" + carpeta + "/")) {
                juego = carpeta;
            }
        });

        if (!juego) {
            console.error("No se pudo detectar el juego desde la URL.");
            return;
        }

        const rutaJSON = `https://viceclub.s3.us-east-1.amazonaws.com/${juego}/radio.json`;

        try {
            const response = await fetch(rutaJSON);
            radioData = await response.json();
            renderRadioGrid();
            console.log("Radios cargadas para:", juego);
        } catch (error) {
            console.error("Error cargando radios:", error);
        }
    }

    function renderRadioGrid() {
        radioGrid.innerHTML = "";

        const rutaActual = window.location.pathname;
        const esGTA5 = rutaActual.includes("/V/");

        if (esGTA5) {
            const offCard = document.createElement("div");
            offCard.classList.add("radio-card", "active");
            offCard.dataset.off = "true";
            offCard.innerHTML = `<img src="../assets/images/radios/V/off.webp" alt="Apagado">`;

            offCard.addEventListener("click", () => {
                document
                    .querySelectorAll(".radio-card")
                    .forEach((c) => c.classList.remove("active"));
                offCard.classList.add("active");

                if (currentRadio && radioData[currentRadio]) {
                    delete radioData[currentRadio]._activeSongs;
                }

                audio.pause();
                audio.src = "";
                currentRadio = null;
                footer.classList.remove("active");
                radioInfo.classList.remove("active");
            });

            radioGrid.appendChild(offCard);
        }

        Object.keys(radioData).forEach((radioKey) => {
            const radio = radioData[radioKey];
            if (!radio || (!radio.audio && !radio.playlists)) return;
            const card = document.createElement("div");
            card.classList.add("radio-card");
            card.innerHTML = `<img src="${radio.image}" alt="${radio.displayName}">`;

            card.addEventListener("click", () => {
                document
                    .querySelectorAll(".radio-card")
                    .forEach((c) => c.classList.remove("active"));
                card.classList.add("active");

                if (currentRadio && radioData[currentRadio]) {
                    delete radioData[currentRadio]._activeSongs;
                }

                currentRadio = radioKey;
                updateRadioDirect(radioKey);
            });

            radioGrid.appendChild(card);
        });

        makeDial(120);
    }

    function makeDial() {
        if (!window.location.pathname.includes("/V/")) return;

        const container = document.getElementById("radioGrid");
        const items = container.querySelectorAll(".radio-card");
        const total = items.length;

        if (total === 0) return;

        const rect = container.getBoundingClientRect();
        const size = Math.min(rect.width, rect.height);

        const radius = size / 2 - (window.innerWidth < 500 ? 30 : 60);

        const step = 360 / total;
        const startAngle = 90;

        items.forEach((item, index) => {
            const angle = step * index + startAngle;

            item.style.position = "absolute";
            item.style.left = "50%";
            item.style.top = "50%";

            item.style.transform = `
      rotate(${angle}deg)
      translate(${radius}px)
      rotate(${-angle}deg)
    `;
            window.addEventListener("resize", makeDial);
        });
    }

    function updateRadioDirect(radioKey) {
        const data = radioData[radioKey];
        if (!data) return;
        if (!footer) return;

        radioInfo.classList.add("active");
        footer.classList.add("active");

        radioTitle.textContent = data.displayName;
        document.getElementById("radioImage").src = data.image || "";
        document.getElementById("albumArt").src = data.image || "";

        if (data.playlists) {
            audio.pause();
            audio.src = "";
            playPauseBtn.style.display = "none";
            playBtn.style.display = "inline";

            const selectorHTML = data.playlists
                .map(
                    (playlist, i) => `
        <button class="playlist-btn${i === 0 ? " active" : ""}" data-index="${i}">
          ${playlist.name}
        </button>
      `,
                )
                .join("");

            document.getElementById("radioDJ").innerHTML =
                `<div id="playlistSelector">${selectorHTML}</div>`;
            document.getElementById("radioGenre").innerHTML = "";

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

            return;
        }

        playRadio(radioKey);
        document.getElementById("radioDJ").innerHTML = data.dj
            ? `<span>Conducido por:</span> <p>${data.dj}</p>`
            : "";
        document.getElementById("radioGenre").innerHTML = data.genre
            ? `<span>Género:</span> <p>${data.genre}</p>`
            : "";
    }

    function updateRadioReproductor(radioKey, playlistIndex) {
        const data = radioData[radioKey];
        const playlist = data.playlists[playlistIndex];
        if (!playlist) return;

        data._activeSongs = playlist.songs ?? [];

        const djEl = document.getElementById("radioDJ");
        const genreEl = document.getElementById("radioGenre");
        const selector = document.getElementById("playlistSelector");

        djEl.innerHTML = "";
        if (selector) djEl.appendChild(selector);

        if (playlist.dj) {
            const djInfo = document.createElement("div");
            djInfo.innerHTML = `<span>Conducido por:</span> <p>${playlist.dj}</p>`;
            djEl.appendChild(djInfo);
        }

        genreEl.innerHTML = playlist.genre
            ? `<span>Género:</span> <p>${playlist.genre}</p>`
            : "";

        if (playlist.audio) {
            audio.src = `${playlist.audio}?v=${Date.now()}`;
            audio.play();
            playPauseBtn.style.display = "inline";
            playBtn.style.display = "none";
        }

        if (data._activeSongs.length > 0) {
            renderSongList(data._activeSongs, -1);
            document.getElementById("songTitle").textContent = "";
            document.getElementById("artistName").textContent = "";
        } else {
            document.getElementById("songTitle").textContent =
                "Sin información de canciones";
            document.getElementById("artistName").textContent = "";
        }
        updateMediaSession(null, radioData);
    }

    function playRadio(name) {
        const data = radioData[name];

        if (!data || !data.audio) {
            audio.pause();
            return;
        }

        audio.src = `${data.audio}?v=${Date.now()}`;
        audio.play();

        playPauseBtn.style.display = "inline";
        playBtn.style.display = "none";

        const songs = data.songs;

        if (songs && songs.length > 0) {
            renderSongList(songs, -1);
            document.getElementById("songTitle").textContent = "";
            document.getElementById("artistName").textContent = "";
        } else {
            document.getElementById("songTitle").textContent =
                "Sin información de canciones";
            document.getElementById("artistName").textContent = "";
        }
        updateMediaSession(null, radioData);
    }

    function renderSongList(songs, activeIndex) {
        const radioList = document.getElementById("radioList");
        radioList.innerHTML = "";

        if (!songs || songs.length === 0) return;

        const title = document.createElement("h4");
        title.textContent = "Canciones";
        title.classList.add("tracklist-title");

        radioList.appendChild(title);

        songs.forEach((song, i) => {
            const li = document.createElement("li");

            li.textContent = song.artist
                ? `${song.artist} — ${song.title}`
                : song.title;

            if (i === activeIndex) li.classList.add("active");

            li.addEventListener("click", () => seekTo(Number(song.start)));

            radioList.appendChild(li);
        });
    }

    function checkMarquee(el) {
        el.classList.remove("marquee");
        el.innerHTML = el.textContent;

        setTimeout(() => {
            if (window.innerWidth <= 1400 && el.scrollWidth > el.clientWidth) {
                const overflow = el.scrollWidth - el.clientWidth;
                el.innerHTML = `<span>${el.textContent}</span>`;
                el.classList.add("marquee");
                el.style.setProperty("--marquee-distance", `-${overflow}px`);
            }
        }, 0);
    }

    function updateActiveSong(index) {
        const data = radioData[currentRadio];
        const songs = data?._activeSongs ?? data?.songs;
        if (!songs || !songs[index]) return;

        const songTitleEl = document.getElementById("songTitle");
        const artistNameEl = document.getElementById("artistName");

        songTitleEl.textContent = songs[index].title;
        artistNameEl.textContent = songs[index].artist;

        songTitleEl.classList.remove("marquee");
        artistNameEl.classList.remove("marquee");
        checkMarquee(songTitleEl);
        checkMarquee(artistNameEl);

        renderSongList(songs, index);
        updateMediaSession(songs[index], radioData);
    }

    let resizeTimeout;

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
            const songTitleEl = document.getElementById("songTitle");
            const artistNameEl = document.getElementById("artistName");

            if (songTitleEl) checkMarquee(songTitleEl);
            if (artistNameEl) checkMarquee(artistNameEl);
        }, 150);
    });

    const prevSongBtn = document.querySelector(
        ".footer-controls span:nth-child(1)",
    );
    const playPauseBtn = document.querySelector(".footer-pause");
    const playBtn = document.querySelector(".footer-play");
    const nextSongBtn = document.querySelector(
        ".footer-controls span:nth-child(4)",
    );

    const currentTimeDisplay = document.getElementById("currentTime");
    const totalTimeDisplay = document.getElementById("totalTime");
    const progressBar = document.getElementById("currentBar");
    const fullProgressBar = document.getElementById("bar");

    playPauseBtn.addEventListener("click", () => {
        audio.pause();
        playPauseBtn.style.display = "none";
        playBtn.style.display = "inline";
    });

    playBtn.addEventListener("click", () => {
        audio.play();
        playBtn.style.display = "none";
        playPauseBtn.style.display = "inline";
    });

    let lastSongIndex = -1;
    let isSeeking = false;

    function seekTo(time) {
        isSeeking = true;
        targetTime = time;

        lastSongIndex = -2;
        document.getElementById("songTitle").textContent = "";
        document.getElementById("artistName").textContent = "";
        document
            .querySelectorAll("#radioList li")
            .forEach((li) => li.classList.remove("active"));

        audio.currentTime = Math.max(0, Math.min(time, audio.duration));
    }

    audio.addEventListener("seeked", () => {
        isSeeking = false;

        if (targetTime !== null) {
            audio.currentTime = targetTime;
            targetTime = null;
        }

        const activeIndex = getCurrentSongIndex();
        lastSongIndex = activeIndex;

        if (activeIndex !== -1) {
            updateActiveSong(activeIndex);
        } else {
            document.getElementById("songTitle").textContent = "";
            document.getElementById("artistName").textContent = "";
            const data = radioData[currentRadio];
            const songs = data?._activeSongs ?? data?.songs;
            if (songs) renderSongList(songs, -1);
            updateMediaSession(null, radioData);
        }
    });

    audio.addEventListener("timeupdate", () => {
        if (isSeeking) return;

        const totalTime = audio.duration;
        const currentTime = audio.currentTime;

        if (!isNaN(totalTime)) {
            const progress = (currentTime / totalTime) * 100;
            progressBar.style.width = `${progress}%`;

            const formatTime = (time) => {
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time % 3600) / 60);
                const seconds = Math.floor(time % 60);
                if (hours > 0) {
                    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                } else {
                    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                }
            };

            currentTimeDisplay.textContent = formatTime(currentTime);
            totalTimeDisplay.textContent = formatTime(totalTime);

            const activeIndex = getCurrentSongIndex();

            if (activeIndex !== lastSongIndex) {
                lastSongIndex = activeIndex;

                if (activeIndex !== -1) {
                    updateActiveSong(activeIndex);
                } else {
                    document.getElementById("songTitle").textContent = "";
                    document.getElementById("artistName").textContent = "";
                    document
                        .querySelectorAll("#radioList li")
                        .forEach((li) => li.classList.remove("active"));
                    updateMediaSession(null, radioData);
                }
            }
        }
    });

    audio.addEventListener("ended", () => {
        playPauseBtn.style.display = "none";
        playBtn.style.display = "inline";
    });

    const debugMode = true;

    if (debugMode) {
        document.addEventListener("click", () => {
            const seconds = Math.floor(audio.currentTime);
            navigator.clipboard.writeText(seconds.toString());
            console.log("Tiempo copiado:", seconds);
        });
    }

    function seekRelative(seconds) {
        if (isSeeking) return;
        const newTime = Math.max(
            0,
            Math.min(audio.currentTime + seconds, audio.duration),
        );
        seekTo(newTime);
    }

    document.addEventListener("keydown", (e) => {
        if (!audio.duration) return;
        if (isSeeking) return;
        if (e.repeat) return;

        if (e.key === "ArrowRight") seekRelative(5);
        if (e.key === "ArrowLeft") seekRelative(-5);
    });

    fullProgressBar.addEventListener("click", (e) => {
        e.stopPropagation();
        const width = fullProgressBar.clientWidth;
        const clickX = e.offsetX;
        seekTo((clickX / width) * audio.duration);
    });

    function handleSongChange(direction) {
        if (!currentRadio) return;

        const data = radioData[currentRadio];
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

    prevSongBtn.addEventListener("click", () => handleSongChange("prev"));
    nextSongBtn.addEventListener("click", () => handleSongChange("next"));

    loadRadioData();

    const volumeSlider = document.querySelector(".footer-volume input");
    const volumeIcon = document.querySelector(".footer-volume span");

    if (volumeSlider) {
        const savedVolume = localStorage.getItem("volume");
        if (savedVolume !== null) {
            audio.volume = savedVolume / 100;
            volumeSlider.value = savedVolume;
            if (savedVolume == 0) volumeIcon.textContent = "volume_off";
            else if (savedVolume < 50) volumeIcon.textContent = "volume_down";
            else volumeIcon.textContent = "volume_up";
        }

        volumeSlider.addEventListener("input", () => {
            const vol = volumeSlider.value;
            audio.volume = vol / 100;
            localStorage.setItem("volume", vol);

            if (vol == 0) volumeIcon.textContent = "volume_off";
            else if (vol < 50) volumeIcon.textContent = "volume_down";
            else volumeIcon.textContent = "volume_up";
        });

        function updateRange() {
            const value =
                ((volumeSlider.value - volumeSlider.min) /
                    (volumeSlider.max - volumeSlider.min)) *
                100;

            volumeSlider.style.background = `
      linear-gradient(to right,  #e39dff ${value}%,
        rgba(192,192,192,0.3) ${value}%
        )`;
            volumeSlider.style.transition = "background 0.1s linear";
        }

        volumeSlider.addEventListener("input", updateRange);
        updateRange();
    }
});
