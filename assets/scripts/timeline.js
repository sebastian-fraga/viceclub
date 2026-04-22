async function loadTimeline() {
    const container = document.getElementById("timelineContainer");

    container.innerHTML = `
    <div id="timelineLoader">
        ${Array(5)
            .fill(
                `
            <div class="skeleton-entry">
                <div class="skeleton skeleton-date"></div>
                <div class="skeleton skeleton-time"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text short"></div>
            </div>
        `,
            )
            .join("")}
    </div>
`;

    try {
        const response = await fetch(
            "https://viceclub.s3.us-east-1.amazonaws.com/VI/timeline.json?t=" +
                Date.now(),
        );
        const data = await response.json();

        let lastYear = null;

        container.innerHTML = `
            <h1>${data.title}</h1>
            <div class="timeline-last-updated">${data.lastUpdated}</div>
        `;

        data.entries.forEach((entry) => {
            const [day, month, year] = entry.date.split("/");

            if (lastYear && lastYear !== year) {
                const divider = document.createElement("div");
                divider.classList.add("timeline-divider");
                container.appendChild(divider);
            }
            lastYear = year;

            if (entry.events && Array.isArray(entry.events)) {
                entry.events.forEach((ev, i) => {
                    const article = document.createElement("article");
                    article.innerHTML = `
                        ${i === 0 ? `<h3 class="timeline-date">${entry.date}</h3>` : ""}
                        <h4 class="timeline-time">${ev.time}</h4>
                        <p>
                            <span class="material-symbols-rounded timeline-icon">
                            timeline
                            </span>
                            ${ev.text}
                        </p>
                        ${ev.image ? `<img src="${ev.image}" class="news-image" loading="lazy" data-footer="${ev.footerText || ""}">` : ""}
                    `;
                    container.appendChild(article);
                });
            } else {
                const article = document.createElement("article");
                article.innerHTML = `
                    <h3 class="timeline-date">${entry.date}</h3>
                    <h4 class="timeline-time">${entry.time}</h4>
                    <p>
                        <span class="material-symbols-rounded timeline-icon">
                        timeline
                        </span>
                        ${entry.text}
                    </p>
                    ${entry.image ? `<img src="${entry.image}" class="news-image" loading="lazy" data-footer="${entry.footerText || ""}">` : ""}
                `;
                container.appendChild(article);
            }
        });
    } catch (error) {
        container.innerHTML = `<section class="text-container" id="timelineContainer"></section>`;
        console.error("Error al cargar el JSON:", error);
    }
}

loadTimeline().then(() => {
    const arrowButton = document.getElementById("arrowButton");
    const articles = document.querySelectorAll("article");
    const lastArticle = articles[articles.length - 1];

    arrowButton.addEventListener("click", () => {
        const images = lastArticle.querySelectorAll("img");
        const pending = [...images].filter((img) => !img.complete);

        if (pending.length === 0) {
            lastArticle.scrollIntoView();
        } else {
            Promise.all(
                pending.map(
                    (img) =>
                        new Promise((resolve) => {
                            img.addEventListener("load", resolve);
                            img.addEventListener("error", resolve);
                        }),
                ),
            ).then(() => lastArticle.scrollIntoView());
        }
    });

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const lastArticleTop = lastArticle.offsetTop;

        if (currentScroll >= lastArticleTop - 900) {
            arrowButton.classList.add("hidden");
        } else {
            arrowButton.classList.remove("hidden");
        }
    });
});
