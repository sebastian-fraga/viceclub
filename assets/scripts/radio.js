document.addEventListener("DOMContentLoaded", function () {


  const footer = document.querySelector("footer");
  const radioInfo = document.getElementById("radioInfo");
  const radioTitle = document.getElementById("radioTitle");
  const radioGrid = document.getElementById("radioGrid");

  const audio = new Audio();
  let currentRadio = null;
  let currentSongIndex = -1;
  let radioData = {};

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

    audio.src = data.audio;
    audio.play();

    playPauseBtn.style.display = "inline";
    playBtn.style.display = "none";

    const songs = data.songs;

    if (songs && songs.length > 0) {
      currentSongIndex = 0;
      updateActiveSong(0);
    } else {
      document.getElementById("songTitle").textContent =
        "Sin información de canciones";
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
        audio.currentTime = Number(song.start);
        updateActiveSong(i);
      });

      radioList.appendChild(li);
    });
  }

  function updateActiveSong(index) {

    currentSongIndex = index;
    const songs = radioData[currentRadio].songs;

    if (!songs || !songs[index]) return;

    document.getElementById("songTitle").textContent = songs[index].title;
    document.getElementById("artistName").textContent = songs[index].artist;

    renderSongList(songs, index);
  }


  const prevSongBtn = document.querySelector(".footer-controls span:nth-child(1)");
  const playPauseBtn = document.querySelector(".footer-controls span:nth-child(2)");
  const playBtn = document.querySelector(".footer-controls span:nth-child(3)");
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

  audio.addEventListener("timeupdate", () => {

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

      const songs = radioData[currentRadio]?.songs;
      if (songs && songs.length > 0) {

        for (let i = 0; i < songs.length; i++) {
          if (
            currentTime >= Number(songs[i].start) &&
            currentTime < Number(songs[i].end)
          ) {
            if (currentSongIndex !== i) {
              updateActiveSong(i);
            }
            break;
          }
        }
      }
    }
  });

  fullProgressBar.addEventListener("click", (e) => {

    const width = fullProgressBar.clientWidth;
    const clickX = e.offsetX;
    const timeToSeek = (clickX / width) * audio.duration;

    audio.currentTime = timeToSeek;
  });

  function handleSongChange(direction) {

    if (!currentRadio) return;

    const songs = radioData[currentRadio].songs;
    if (!songs || songs.length === 0) return;

    if (direction === "next") {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      audio.currentTime = Number(songs[nextIndex].start);
      updateActiveSong(nextIndex);
    }

    if (direction === "prev") {
      const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      audio.currentTime = Number(songs[prevIndex].start);
      updateActiveSong(prevIndex);
    }
  }

  prevSongBtn.addEventListener("click", () => handleSongChange("prev"));
  nextSongBtn.addEventListener("click", () => handleSongChange("next"));

  loadRadioData();

});