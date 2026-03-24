const container = document.getElementById("modsContainer");
const game = container.dataset.game;

const MODS_URL = `https://viceclub.s3.us-east-1.amazonaws.com/${game}/mods/mods.json?t=${Date.now()}`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(MODS_URL);
    const data = await res.json();

    renderMods(data.mods, "ESENCIALES");
    renderMods(data.recommended, "RECOMENDADOS");

  } catch (err) {
    console.error("Error cargando mods:", err);
  }
});

function renderMods(mods, title) {
  const heading = document.createElement("div");
  heading.className = "mod-title-header";

  const h3 = document.createElement("h3");
  h3.textContent = title;

  heading.appendChild(h3);
  container.appendChild(heading);

  mods.forEach((mod) => {
    const details = document.createElement("details");
    details.className = "mod";


    const summary = document.createElement("summary");
    summary.className = "mod-header";

    const img = document.createElement("img");
    img.src = mod.thumbnail;
    img.alt = `Logo de ${mod.name}`;
    img.loading = "lazy";

    const textDiv = document.createElement("div");
    textDiv.className = "mod-text";

    const h4 = document.createElement("h4");
    h4.textContent = mod.name;

    const desc = document.createElement("p");
    desc.textContent = mod.description;

    textDiv.appendChild(h4);
    textDiv.appendChild(desc);

    const arrow = document.createElement("span");
    arrow.className = "material-symbols-rounded arrow";
    arrow.textContent = "arrow_drop_down";

    summary.appendChild(img);
    summary.appendChild(textDiv);
    summary.appendChild(arrow);

    details.appendChild(summary);


    const expanded = document.createElement("div");
    expanded.className = "mod-expanded";


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

    expanded.appendChild(nav);

    const section = document.createElement("section");
    section.className = "mod-features";

    const authorDiv = document.createElement("div");
    authorDiv.className = "mod-author";

    const authorP = document.createElement("p");
    authorP.textContent = `Creado por ${mod.info.author}`;

    const infoLink = document.createElement("a");
    infoLink.href = mod.info.link;
    infoLink.target = "_blank";
    infoLink.rel = "noopener noreferrer";
    infoLink.classList.add("btn-info");
    infoLink.innerHTML = `
      <span>VER MÁS</span>
      <span class="material-symbols-rounded">open_in_new</span>
    `;

    const downloadLink = document.createElement("a");
    downloadLink.href = mod.download.link;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.classList.add("btn-download");
    downloadLink.innerHTML = `
      <span>DESCARGAR</span>
      <span class="material-symbols-rounded">open_in_new</span>
    `;

    authorDiv.appendChild(authorP);
    authorDiv.appendChild(infoLink);
    authorDiv.appendChild(downloadLink);

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

    infoTab.appendChild(h5);
    infoTab.appendChild(ul);
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

    downloadTab.appendChild(ol);
    downloadTab.appendChild(authorDiv.cloneNode(true));

    section.appendChild(infoTab);
    section.appendChild(screenshotsTab);
    section.appendChild(downloadTab);

    expanded.appendChild(section);
    details.appendChild(expanded);

    container.appendChild(details);

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      if (!details.open) {
        details.setAttribute("open", "");
        expanded.style.maxHeight = "0px";
        expanded.style.overflow = "hidden";

        requestAnimationFrame(() => {
          expanded.style.transition = "max-height 0.35s ease";
          expanded.style.maxHeight = expanded.scrollHeight + "20px";

          expanded.addEventListener("transitionend", () => {
            expanded.style.maxHeight = "";
            expanded.style.transition = "";
            expanded.style.overflow = "";
          }, { once: true });
        });

      } else {
        expanded.style.maxHeight = expanded.scrollHeight + "px";
        expanded.style.overflow = "hidden";

        requestAnimationFrame(() => {
          expanded.style.transition = "max-height 0.35s ease";
          expanded.style.maxHeight = "0px";
        });

        expanded.addEventListener("transitionend", () => {
          details.removeAttribute("open");
          expanded.style.maxHeight = "";
          expanded.style.transition = "";
          expanded.style.overflow = "";
        }, { once: true });
      }
    });


    const links = nav.querySelectorAll(".tab-link");
    const contents = section.querySelectorAll(".tab-content");

    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const tab = link.dataset.tab;

        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        contents.forEach(c => {
          c.classList.toggle("active", c.dataset.content === tab);
        });
      });
    });
  });
}


