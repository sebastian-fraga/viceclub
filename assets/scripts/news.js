const container = document.getElementById("newsContainer");
const btn = document.getElementById("verMas");
let noticias = [];
let visibleCount = 2;
let step = 2;

fetch("https://viceclub.s3.us-east-1.amazonaws.com/news.json?nocache=" + Date.now())
    .then(res => res.json())
    .then(data => {
        noticias = data;
        renderNoticias();
    });

function renderNoticias() {
    container.innerHTML = "";

    noticias.slice(0, visibleCount).forEach(noticia => {
        const article = document.createElement("article");
        article.classList.add("news-article");
        article.innerHTML = `
            <div class="news-header">
                <h3>${noticia.title}</h3>
                <h4>${noticia.date}</h4>
            </div>
            <div class="news-content">
                <p>${noticia.paragraph1}</p>
                <img src="${noticia.image}" alt="${noticia.title}" class="news-image" loading="lazy" data-footer="${noticia.footerText}">
                <p>${noticia.paragraph2}</p>
                <a href="${noticia.link}" target="_blank" rel="noopener" class="news-link">
                ${noticia.linkText || "Más información"}
                    <span class="material-symbols-rounded">arrow_outward</span>
                </a>
            </div>
        `;
        container.appendChild(article);
    });

    if (visibleCount < noticias.length) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
}
btn.addEventListener("click", () => {
    visibleCount += step;
    renderNoticias();
});
const newsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            newsObserver.unobserve(img);
        }
    });
});