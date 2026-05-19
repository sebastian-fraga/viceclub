document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(
            "https://viceclub.s3.us-east-1.amazonaws.com/facts.json?t=" +
                Date.now(),
        );
        const facts = await res.json();
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const params = new URLSearchParams(window.location.search);

        const forceIndex = params.get("fact");
        const factIndex =
            forceIndex !== null
                ? parseInt(forceIndex) % facts.length
                : dayOfYear % facts.length;
        const fact = facts[factIndex];

        document.querySelector(".fotd-description p").innerHTML =
            fact.description;

        const fotdImg = document.querySelector(".fotd-image img");
        fotdImg.src = fact.image + "?t=" + Date.now();
        fotdImg.style.objectPosition = fact.imagePosition ?? "center";

        document.querySelector(".fotd-image img").src = fact.image;

        const logoImg = document.querySelector(".fotd-header img");
        if (fact.game) {
            logoImg.src = `/assets/images/icons/games/logos/${fact.game}.webp`;
            logoImg.alt = `Logo GTA ${fact.game}`;
        } else {
            logoImg.style.display = "none";
        }

        const footer = document.querySelector(".fotd-buttons");
        footer.innerHTML = "";

        if (fact.source) {
            const sourceEl = document.createElement("a");
            sourceEl.href = fact.source;
            sourceEl.target = "_blank";
            sourceEl.rel = "noopener";
            sourceEl.className = "fotd-source";
            sourceEl.innerHTML = `<span class="material-symbols-rounded">info</span> Ver fuente`;
            footer.appendChild(sourceEl);
        }
        if (fact.location?.image) {
            const { image } = fact.location;

            const mapBtn = document.createElement("div");
            mapBtn.className = "fotd-map-btn";
            mapBtn.innerHTML = `
        <span class="material-symbols-rounded">location_on</span>
        Ubicación
    `;

            const preview = document.createElement("div");
            preview.className = "fotd-map-preview";

            const img = document.createElement("img");
            img.src = image;
            img.alt = "Ubicación del dato";

            preview.appendChild(img);
            mapBtn.appendChild(preview);

            footer.appendChild(mapBtn);
        }
    } catch (err) {
        console.error("Error cargando los datos del día:", err);
    }
});
