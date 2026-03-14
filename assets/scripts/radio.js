document.addEventListener("DOMContentLoaded", function () {

  const footer = document.querySelector("footer");
  const radioInfo = document.getElementById("radioInfo");
  const radioTitle = document.getElementById("radioTitle");
  const radioGrid = document.getElementById("radioGrid");

  const audio = new Audio();
  let currentRadio = null;
  let radioData = {};
  let targetTime = null;

  function getCurrentSongIndex() {

    if (!currentRadio) return -1;

    const songs = radioData[currentRadio]?.songs;
    if (!songs) return -1;

    const currentTime = audio.currentTime;

    for (let i = 0; i < songs.length; i++) {

      const start = Number(songs[i].start);
      const end = Number(songs[i].end);

      if (currentTime >= start && currentTime < end) {
        return i;
      }

    }

    return -1;

  }

  async function loadRadioData() {
    const rutaActual = window.location.pathname;
    const carpetas = ["III", "VC", "SA", "LCS", "VCS", "IV", "V"];
    let juego = null;

    carpetas.forEach(carpeta => {
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

    Object.keys(radioData).forEach((radioKey) => {

      const radio = radioData[radioKey];
      if (!radio || !radio.audio) return;

      const card = document.createElement("div");
      card.classList.add("radio-card");

      card.innerHTML = `
          <img src="${radio.image}" alt="${radio.displayName}">
        `;

      card.addEventListener("click", () => {

        document.querySelectorAll(".radio-card").forEach(c =>
          c.classList.remove("active")
        );

        card.classList.add("active");

        currentRadio = radioKey;
        updateRadioDirect(radioKey);
      });

      radioGrid.appendChild(card);
    });

    makeDial(120);
  }

  function makeDial(offsetAngle = 0) {
    if (!window.location.pathname.includes("/V/")) return;

    const items = document.querySelectorAll("#radioGrid .radio-card");
    const total = items.length;
    const step = 360 / total;

    const isMobile = window.innerWidth < 1024;

    const radius = isMobile ? 140 : 280;
    const offset = isMobile ? 90 : offsetAngle;

    items.forEach((item, index) => {
      const angle = step * index + offset;

      item.style.transform = `
            rotate(${angle}deg)
            translate(${radius}px)
            rotate(-${angle}deg)
        `;
    });
  }

  function updateRadioDirect(radioKey) {

    const data = radioData[radioKey];
    if (!data) return;

    playRadio(radioKey);

    radioInfo.classList.add("active");
    footer.classList.add("active");

    radioTitle.textContent = data.displayName;
    document.getElementById("radioImage").src = data.image || "";
    document.getElementById("albumArt").src = data.image || "";
    document.getElementById("radioDJ").innerHTML =
      data.dj
        ? `<span>Conducido por:</span> <p>${data.dj}</p>` : "";
    document.getElementById("radioGenre").innerHTML =
      data.genre
        ? `<span>Género:</span> <p>${data.genre}</p>` : "";
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
      document.getElementById("songTitle").textContent = "Sin información de canciones";
      document.getElementById("artistName").textContent = "";
    }
  }

  function renderSongList(songs, activeIndex) {

    const radioList = document.getElementById("radioList");
    radioList.innerHTML = "";

    if (!songs || songs.length === 0) return;

    songs.forEach((song, i) => {

      const li = document.createElement("li");

      li.textContent = song.artist
        ? `${song.artist} — ${song.title}`
        : song.title;

      if (i === activeIndex) {
        li.classList.add("active");
      }

      li.addEventListener("click", () => {
        seekTo(Number(song.start));
      });

      radioList.appendChild(li);
    });
  }

  function updateActiveSong(index) {

    const songs = radioData[currentRadio]?.songs;
    if (!songs || !songs[index]) return;

    document.getElementById("songTitle").textContent = songs[index].title;
    document.getElementById("artistName").textContent = songs[index].artist;

    renderSongList(songs, index);
  }

  const prevSongBtn = document.querySelector(".footer-controls span:nth-child(1)");
  const playPauseBtn = document.querySelector(".footer-pause");
  const playBtn = document.querySelector(".footer-play");
  const nextSongBtn = document.querySelector(".footer-controls span:nth-child(4)");

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
    document.querySelectorAll("#radioList li").forEach(li => li.classList.remove("active"));

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
      const songs = radioData[currentRadio]?.songs;
      if (songs) renderSongList(songs, -1);
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
          document.querySelectorAll("#radioList li").forEach(li => {
            li.classList.remove("active");
          });
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
      Math.min(audio.currentTime + seconds, audio.duration)
    );

    seekTo(newTime);

  }
  document.addEventListener("keydown", (e) => {

    if (!audio.duration) return;
    if (isSeeking) return;
    if (e.repeat) return;

    if (e.key === "ArrowRight") {
      seekRelative(5);
    }

    if (e.key === "ArrowLeft") {
      seekRelative(-5);
    }

  });

  fullProgressBar.addEventListener("click", (e) => {
    e.stopPropagation();

    const width = fullProgressBar.clientWidth;
    const clickX = e.offsetX;
    const timeToSeek = (clickX / width) * audio.duration;

    seekTo((clickX / width) * audio.duration);
  });

  function handleSongChange(direction) {

    if (!currentRadio) return;

    const songs = radioData[currentRadio].songs;
    if (!songs || songs.length === 0) return;

    const currentTime = audio.currentTime;
    const index = getCurrentSongIndex();

    if (direction === "next") {
      const next = index !== -1
        ? songs[(index + 1) % songs.length]
        : songs.find(s => Number(s.start) > currentTime);
      if (next) {
        seekTo(Number(next.start));
      }
    }

    if (direction === "prev") {
      const prev = index !== -1
        ? songs[(index - 1 + songs.length) % songs.length]
        : [...songs].reverse().find(s => Number(s.end) < currentTime);
      if (prev) {
        seekTo(Number(prev.start));
      }
    }
  }

  prevSongBtn.addEventListener("click", () => handleSongChange("prev"));
  nextSongBtn.addEventListener("click", () => handleSongChange("next"));

  loadRadioData();

});