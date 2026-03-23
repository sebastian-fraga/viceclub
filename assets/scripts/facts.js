document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch('https://viceclub.s3.us-east-1.amazonaws.com/facts.json?t=' + Date.now());
        const facts = await res.json();
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const factIndex = dayOfYear % facts.length;
        const fact = facts[factIndex];

        document.querySelector(".fotd-description p").innerHTML = fact.description;
        document.querySelector(".fotd-image img").src = fact.image;
        const sourceContainer = document.querySelector(".fotd-source");

        if (fact.source) {
            sourceContainer.innerHTML = `<a href="${fact.source}" target="_blank" rel="noopener">Ver fuente <span class="material-symbols-rounded">info</span></a>`;
        } else {
            sourceContainer.innerHTML = "";
        }

    } catch (err) {
        console.error("Error cargando los datos del día:", err);
    }
});