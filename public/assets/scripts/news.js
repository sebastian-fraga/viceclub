const container = document.getElementById("newsContainer");
const btn = document.getElementById("loadNews");

let news = [];
let visibleCount = 2;
let step = 2;

fetch(
    "https://viceclub.s3.us-east-1.amazonaws.com/news.json?nocache=" +
        Date.now(),
)
    .then((res) => res.json())
    .then((data) => {
        news = data;
        renderNews();
    });

function renderNews(previousCount = step) {
    container.innerHTML = "";

    news.slice(0, visibleCount).forEach((news, index) => {
        const article = document.createElement("article");
        article.classList.add("news-article");

        const isNew = index >= previousCount;
        const loadingStrategy = isNew ? "eager" : "lazy";

        article.innerHTML = `
            <div class="news-header">
                <h3>${news.title}</h3>
                <h4>${news.date}</h4>
            </div>
            <div class="news-content">
                <p>${news.paragraph1}</p>
                <img src="${news.image}" alt="${news.title}" class="news-image" loading="${loadingStrategy}" data-footer="${news.footerText}">
                <p>${news.paragraph2}</p>
                <a href="${news.link}" target="_blank" rel="noopener" class="news-link">
                ${news.linkText || "Más información"}
                    <span class="material-symbols-rounded">arrow_outward</span>
                </a>
            </div>
        `;
        container.appendChild(article);

        if (isNew) {
            const img = article.querySelector("img");
            const preload = new Image();
            preload.src = img.src;
        }
    });

    if (visibleCount < news.length) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }
}
btn.addEventListener("click", () => {
    const previousCount = visibleCount;
    visibleCount += step;
    renderNews(previousCount);
});
const newsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            newsObserver.unobserve(img);
        }
    });
});
