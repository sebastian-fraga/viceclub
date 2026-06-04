const container = document.getElementById("newsContainer");
const btn = document.getElementById("loadNews");

let news = [];
let visibleCount = 2;
let step = 2;

function getLang() {
    return (localStorage.getItem("lang") || "ES").toLowerCase();
}

function t(value) {
    if (typeof value === "string") return value;
    const lang = getLang();
    return value?.[lang] || value?.es || "";
}

function getArticleUrl(slug) {
    return `https://viceclub.app?news=${slug}`;
}

function shareOnX(title, slug) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getArticleUrl(slug))}`;
    window.open(url, "_blank", "noopener");
}

function getTranslation(path) {
    return path
        .split(".")
        .reduce((obj, key) => obj?.[key], window.translations);
}

function copyLink(slug, title, btn) {
    const text = `${title}\n${getArticleUrl(slug)}`;
    navigator.clipboard.writeText(text).then(() => {
        const icon = btn.querySelector("span.material-symbols-rounded");
        const label = btn.querySelector(".button-text");
        icon.textContent = "check";
        if (label)
            label.textContent = getTranslation("index.news.share.copied");
        setTimeout(() => {
            icon.textContent = "content_copy";
            if (label)
                label.textContent = getTranslation("index.news.share.copy");
        }, 900);
    });
}

function shareNative(title, slug) {
    if (navigator.share) {
        navigator.share({ title, url: getArticleUrl(slug) });
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
                <h3>${t(item.title)}</h3>
                <p>${t(item.subtitle)}</p>
                <div class="news-header-info">
                    <h4>
                        <span class="material-symbols-rounded unfilled">person</span>
                        ${item.author}
                    </h4>
                    <h4>
                        <span class="material-symbols-rounded unfilled">calendar_today</span>
                        ${t(item.date)}
                    </h4>
                </div>
            </div>
            <div class="news-content">
                <p>${t(item.paragraph1)}</p>
                <div class="news-image-wrapper">
                    <img
                        src="${item.image}"
                        class="news-image"
                        alt="${t(item.title)}"
                        loading="${loadingStrategy}"
                        data-footer="${t(item.footerText)}"
                    >
                    <div class="news-image-footer">
                        <span class="material-symbols-rounded unfilled">photo_camera</span>
                        <p>${t(item.footerText)}</p>
                    </div>
                </div>
                <p>${t(item.paragraph2)}</p>
                ${item.paragraph3 ? `<p class="last-paragraph">${t(item.paragraph3)}</p>` : ""}
                <a href="${item.link}" target="_blank" rel="noopener" class="news-link">
                    <span class="material-symbols-rounded">open_in_new</span>
                    ${t(item.linkText) || "Más información"}
                </a>
                <div class="divider"></div>
                <div class="news-share">
                    <p data-i18n="index.news.share.title">Compartir:</p>
                    <button class="share-btn btn-x">
                        <span class="x"></span>
                    </button>
                    <button class="share-btn btn-copy">
                        <span class="material-symbols-rounded unfilled">content_copy</span>
                        <p class="button-text" data-i18n="index.news.share.copy">Copiar enlace</p>
                    </button>
                    <button class="share-btn btn-share">
                        <span class="material-symbols-rounded unfilled">share</span>
                        <p class="button-text" data-i18n="index.news.share.more">Más</p>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(article);

        article
            .querySelector(".btn-x")
            .addEventListener("click", () =>
                shareOnX(t(item.title), item.slug),
            );
        article
            .querySelector(".btn-copy")
            .addEventListener("click", (e) =>
                copyLink(item.slug, t(item.title), e.currentTarget),
            );
        article
            .querySelector(".btn-share")
            .addEventListener("click", () =>
                shareNative(t(item.title), item.slug),
            );

        if (isNew) {
            const img = article.querySelector("img");
            const preload = new Image();
            preload.src = img.src;
        }
    });

    btn.style.display = visibleCount < news.length ? "flex" : "none";
}

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

btn.addEventListener("click", () => {
    const previousCount = visibleCount;
    visibleCount += step;
    renderNews(previousCount);
});

const previousOnLangChange = window.onLangChange;

window.onLangChange = function () {

    if (typeof previousOnLangChange === "function") {
        previousOnLangChange();
    }

    if (news.length > 0) {
        renderNews();
        applyTranslations(window.translations);
    }
};

fetch(
    "https://viceclub.s3.us-east-1.amazonaws.com/news.json?nocache=" +
        Date.now(),
)
    .then((res) => res.json())
    .then((data) => {
        news = data;
        renderNews();
        if (window.translations) {
            applyTranslations(window.translations);
        }
        const isLocalhost = location.hostname === "localhost";
        if (isLocalhost) {
            scrollToNews();
        } else {
            window.addEventListener(
                "newsReady",
                () => {
                    setTimeout(scrollToNews, 300);
                },
                { once: true },
            );
        }
    });
