const container = document.getElementById("modsContainer");
const game = container.dataset.game;

const MODS_URL = `https://viceclub.s3.us-east-1.amazonaws.com/${game}/mods/mods.json?t=${Date.now()}`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(MODS_URL);
    const data = await res.json();
    renderMods(data.mods);
  } catch (err) {
    console.error("Error cargando mods:", err);
  }
});

function renderMods(mods) {
  container.innerHTML = "";

  mods.forEach((mod) => {
    const details = document.createElement("details");
    details.className = "mod";

    details.innerHTML = `
      <summary>
        <img src="${mod.thumbnail}" alt="Logo de ${mod.name}">
        <div class="mod-text">
          <h4>${mod.name}</h4>
          <p>${mod.description}</p>
        </div>

        <span class="material-symbols-rounded arrow">expand_more</span>

        <nav class="mod-actions">
          <a href="#" data-tab="info" class="tab-link active">
            <span class="material-symbols-rounded">info</span>
            Información
          </a>
          <a href="#" data-tab="screenshots" class="tab-link">
            <span class="material-symbols-rounded">photo</span>
            Capturas
          </a>
          <a href="#" data-tab="download" class="tab-link">
            <span class="material-symbols-rounded">download</span>
            Descargar
          </a>
        </nav>
      </summary>

      <div class="mod-expanded">
        <section class="mod-features">

          <div class="tab-content active" data-content="info">
            <h5>${mod.info.title}</h5>
            <ul>
              ${mod.info.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
            <a href="${mod.info.link}" target="_blank">
              <span>VER MÁS</span>
              <span class="material-symbols-rounded">open_in_new</span>
            </a>
            <div class="mod-author">
              <p>Creado por ${mod.info.author}</p>
            </div>
          </div>

          <div class="tab-content" data-content="screenshots">
            <div class="screenshots">
              ${mod.screenshots
                .map((img) => `<img src="${img}" loading="lazy" alt="">`)
                .join("")}
            </div>
          </div>

          <div class="tab-content" data-content="download">
          <ol>
          ${mod.download.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
          <a href="${mod.download.link}" target="_blank">
            <span>DESCARGAR</span>
              <span class="material-symbols-rounded">open_in_new</span>
          </a>
          </div>

        </section>
      </div>
    `;

    container.appendChild(details);
  });
}
