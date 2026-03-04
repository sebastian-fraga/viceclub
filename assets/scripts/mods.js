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

    details.innerHTML = "";


    const summary = document.createElement("summary");

    const img = document.createElement("img");
    img.src = mod.thumbnail;
    img.alt = `Logo de ${mod.name}`;
    img.loading = "lazy";
    summary.appendChild(img);

    const textDiv = document.createElement("div");
    textDiv.className = "mod-text";

    const h4 = document.createElement("h4");
    h4.textContent = mod.name;

    const desc = document.createElement("p");
    desc.textContent = mod.description;

    textDiv.appendChild(h4);
    textDiv.appendChild(desc);
    summary.appendChild(textDiv);

    const arrow = document.createElement("span");
    arrow.className = "material-symbols-rounded arrow";
    arrow.textContent = "expand_more";
    summary.appendChild(arrow);

    const nav = document.createElement("nav");
    nav.className = "mod-actions";

    const tabs = [
      { tab: "info", icon: "info", text: "Información", active: true },
      { tab: "screenshots", icon: "photo", text: "Capturas" },
      { tab: "download", icon: "download", text: "Descargar" }
    ];

    tabs.forEach(t => {
      const a = document.createElement("a");
      a.href = "#";
      a.dataset.tab = t.tab;
      a.className = "tab-link" + (t.active ? " active" : "");

      const icon = document.createElement("span");
      icon.className = "material-symbols-rounded";
      icon.textContent = t.icon;

      a.appendChild(icon);
      a.append(" " + t.text);

      nav.appendChild(a);
    });

    summary.appendChild(nav);
    details.appendChild(summary);

    const expanded = document.createElement("div");
    expanded.className = "mod-expanded";

    const section = document.createElement("section");
    section.className = "mod-features";

    const infoTab = document.createElement("div");
    infoTab.className = "tab-content active";
    infoTab.dataset.content = "info";

    const h5 = document.createElement("h5");
    h5.textContent = mod.info.title;

    const ul = document.createElement("ul");
    mod.info.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      ul.appendChild(li);
    });

    const infoLink = document.createElement("a");
    infoLink.href = mod.info.link;
    infoLink.target = "_blank";
    infoLink.rel = "noopener noreferrer";

    const infoSpan = document.createElement("span");
    infoSpan.textContent = "VER MÁS";

    const infoIcon = document.createElement("span");
    infoIcon.className = "material-symbols-rounded";
    infoIcon.textContent = "open_in_new";

    infoLink.appendChild(infoSpan);
    infoLink.appendChild(infoIcon);

    const authorDiv = document.createElement("div");
    authorDiv.className = "mod-author";

    const authorP = document.createElement("p");
    authorP.textContent = `Creado por ${mod.info.author}`;

    authorDiv.appendChild(authorP);

    infoTab.appendChild(h5);
    infoTab.appendChild(ul);
    infoTab.appendChild(infoLink);
    infoTab.appendChild(authorDiv);

    const screenshotsTab = document.createElement("div");
    screenshotsTab.className = "tab-content";
    screenshotsTab.dataset.content = "screenshots";

    const screenshotsDiv = document.createElement("div");
    screenshotsDiv.className = "screenshots";

    mod.screenshots.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      img.alt = "";
      screenshotsDiv.appendChild(img);
    });

    screenshotsTab.appendChild(screenshotsDiv);

    const downloadTab = document.createElement("div");
    downloadTab.className = "tab-content";
    downloadTab.dataset.content = "download";

    const ol = document.createElement("ol");

    mod.download.steps.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      ol.appendChild(li);
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = mod.download.link;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";

    const dlSpan = document.createElement("span");
    dlSpan.textContent = "DESCARGAR";

    const dlIcon = document.createElement("span");
    dlIcon.className = "material-symbols-rounded";
    dlIcon.textContent = "open_in_new";

    downloadLink.appendChild(dlSpan);
    downloadLink.appendChild(dlIcon);

    downloadTab.appendChild(ol);
    downloadTab.appendChild(downloadLink);

    section.appendChild(infoTab);
    section.appendChild(screenshotsTab);
    section.appendChild(downloadTab);

    expanded.appendChild(section);
    details.appendChild(expanded);

    container.appendChild(details);
  });
}
