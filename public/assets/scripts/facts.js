document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(
            "https://viceclub.s3.us-east-1.amazonaws.com/facts.json?t=" +
                Date.now(),
        );

        const lang = localStorage.getItem("lang") || "ES";
        const facts = await res.json();
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const params = new URLSearchParams(window.location.search);
        const forceId = params.get("fact");
        const parsedId = parseInt(forceId);

        const dailyFact = facts[dayOfYear % facts.length];
        const fact =
            forceId !== null && !isNaN(parsedId) && parsedId >= 1
                ? (facts.find((f) => f.id === parsedId) ?? dailyFact)
                : dailyFact;
        // visit viceclub.app?fact=X for a specific fact

        function renderFact(lang) {
            const text =
                typeof fact.description === "object"
                    ? (fact.description[lang.toLowerCase()] ??
                        fact.description["es"])
                    : fact.description;

            document.querySelector(".fotd-description p").innerHTML = text;
        }

        renderFact(lang);

        const previousOnLangChange = window.onLangChange;
        window.onLangChange = () => {
            if (typeof previousOnLangChange === "function") {
                previousOnLangChange();
            }
            renderFact(localStorage.getItem("lang") || "ES");
        };

        const fotdImg = document.querySelector(".fotd-image img");
        fotdImg.src = fact.image;
        fotdImg.style.objectPosition = fact.imagePosition ?? "center";
        fotdImg.setAttribute("loading", "eager");

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
            sourceEl.innerHTML = `
                <span class="material-symbols-rounded">info</span>
                <span data-i18n="index.fotd.source">Ver fuente</span>
            `;
            footer.appendChild(sourceEl);
        }

        if (fact.location?.image) {
            const { image } = fact.location;

            const mapBtn = document.createElement("div");
            mapBtn.className = "fotd-map-btn";
            mapBtn.innerHTML = `
                <span class="material-symbols-rounded">location_on</span>
                <span data-i18n="index.fotd.location">Ubicación</span>
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

        if (window.translations) {
            applyTranslations(window.translations);
        }
    } catch (err) {
        console.error("Error cargando el dato del día:", err);
    }
});
