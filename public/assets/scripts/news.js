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
        const isLocalhost = location.hostname === "localhost";
        if (isLocalhost) {
            scrollToNews();
        } else {
            window.addEventListener(
                "newsReady",
                () => {
                    setTimeout(scrollToNews, 1200);
                },
                { once: true },
            );
        }
    });

function scrollToNews() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("news");
    if (!slug) return;

    const index = news.findIndex((n) => n.slug === slug);
    if (index === -1) return;

    if (index >= visibleCount) {
        visibleCount = index + 1;
        renderNews();
    }

    const articles = document.querySelectorAll(".news-article");
    const target = articles[index];
    if (!target) return;

    const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const top =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
}

function getArticleUrl(slug) {
    return `https://viceclub.app?news=${slug}`;
    // return `http://localhost:4321/?news=${slug}`;
}

function shareOnX(title, slug) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getArticleUrl(slug))}`;
    window.open(url, "_blank", "noopener");
}

function copyLink(slug, title, btn) {
    const text = `${title}\n${getArticleUrl(slug)}`;
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector("span.material-symbols-rounded");
        const label = btn.querySelector(".button-text");

        icon.textContent = "check";
        if (label) label.textContent = "Copiado";

        setTimeout(() => {
            icon.textContent = "content_copy";
            if (label) label.textContent = "Copiar enlace";
        }, 900);
    });
}

function shareNative(title, slug) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: getArticleUrl(slug),
        });
    }
}

function renderNews(previousCount = step) {
    container.innerHTML = "";

    news.slice(0, visibleCount).forEach((item, index) => {
        const article = document.createElement("article");
        article.classList.add("news-article");

        const isNew = index >= previousCount;
        const loadingStrategy = isNew ? "eager" : "lazy";

        article.innerHTML = `
            <div class="news-header">
                <h3>${item.title}</h3>
                <p>${item.subtitle}</p>
                <div class="news-header-info">
                    <h4>
                        <span class="material-symbols-rounded unfilled">person</span>
                        ${item.author}
                    </h4>
                    <h4>
                        <span class="material-symbols-rounded unfilled">calendar_today</span>
                        ${item.date}
                    </h4>
                </div>
            </div>
            <div class="news-content">
                <p>${item.paragraph1}</p>
                <div class="news-image-wrapper">
                    <img src="${item.image}" class="news-image" alt="${item.title}" loading="${loadingStrategy}" data-footer="${item.footerText}">
                    <div class="news-image-footer">
                        <span class="material-symbols-rounded unfilled">photo_camera</span>
                        <p>${item.footerText}</p>
                    </div>
                </div>
                <p>${item.paragraph2}</p>
                ${item.paragraph3 ? `<p class="last-paragraph">${item.paragraph3}</p>` : ""}
                <a href="${item.link}" target="_blank" rel="noopener" class="news-link">
                    <span class="material-symbols-rounded">open_in_new</span>
                    ${item.linkText || "Más información"}
                </a>
                <div class="divider"></div>
                <div class="news-share">
                    <p>Compartir:</p>
                    <button class="share-btn btn-x">
                        <span class="x"></span>
                    </button>
                    <button class="share-btn btn-copy">
                        <span class="material-symbols-rounded unfilled">content_copy</span>
                        <p class="button-text">Copiar enlace</p>
                    </button>
                    <button class="share-btn btn-share">
                        <span class="material-symbols-rounded unfilled">share</span>
                        <p class="button-text">Más</p>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(article);

        article
            .querySelector(".btn-x")
            .addEventListener("click", () => shareOnX(item.title, item.slug));
        article
            .querySelector(".btn-copy")
            .addEventListener("click", (e) =>
                copyLink(item.slug, item.title, e.currentTarget),
            );
        article
            .querySelector(".btn-share")
            .addEventListener("click", () =>
                shareNative(item.title, item.slug),
            );

        if (isNew) {
            const img = article.querySelector("img");
            const preload = new Image();
            preload.src = img.src;
        }
    });

    btn.style.display = visibleCount < news.length ? "flex" : "none";
}

btn.addEventListener("click", () => {
    const previousCount = visibleCount;
    visibleCount += step;
    renderNews(previousCount);
});
