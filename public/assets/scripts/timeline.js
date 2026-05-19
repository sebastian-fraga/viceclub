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
                    const icon = ev.icon || "timeline";
                    article.innerHTML = `
                        ${i === 0 ? `<h3 class="timeline-date">${entry.date}</h3>` : ""}
                        ${ev.time ? `<h4 class="timeline-time">${ev.time}</h4>` : ""}
                        <p>
                            <span class="material-symbols-rounded timeline-icon timeline-icon--${icon}">
                            ${icon}
                            </span>
                            ${ev.text}
                        </p>
                        ${
                            ev.image
                                ? `
                            <div class="timeline-image">
                                <img src="${ev.image}" crossorigin="anonymous" loading="lazy" class="news-image" data-footer="${ev.footerText || ""}" onload="applyDominantColor(this)"> 

                            </div>
                            `
                                : ""
                        }
                        `;
                    container.appendChild(article);
                });
            } else {
                const icon = entry.icon || "timeline";
                const article = document.createElement("article");
                article.innerHTML = `
                    <h3 class="timeline-date">${entry.date}</h3>
                    ${entry.time ? `<h4 class="timeline-time">${entry.time}</h4>` : ""}
                    <p>
                        <span class="material-symbols-rounded timeline-icon timeline-icon--${icon}">
                        ${icon}
                        </span>
                        ${entry.text}
                    </p>
                    ${
                        entry.image
                            ? `
                            <div class="timeline-image">
                                <img src="${entry.image}" crossorigin="anonymous" loading="lazy" class="news-image" data-footer="${entry.footerText || ""}" onload="applyDominantColor(this)">
                            </div>
                            `
                            : ""
                    }
                `;
                container.appendChild(article);
            }
        });
    } catch (error) {
        container.innerHTML = `<section class="text-container" id="timelineContainer"></section>`;
        console.error("Error al cargar el JSON:", error);
    }
}

function applyDominantColor(img) {
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        // Redimensionar a un canvas de 10x10 para procesar y promediar los colores eficientemente
        canvas.width = 10;
        canvas.height = 10;
        ctx.drawImage(img, 0, 0, 10, 10);

        const { data } = ctx.getImageData(0, 0, 10, 10);
        let r = 0,
            g = 0,
            b = 0,
            count = 0;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 128) continue;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }

        if (!count) return;
        const color = `rgba(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)}, 0.3)`;
        img.style.boxShadow = `0 0 12px 12px ${color}`;
    } catch (e) {
        console.warn("No se pudo obtener color dominante:", e);
    }
}

loadTimeline().then(() => {
    const arrowButton = document.getElementById("arrowButton");
    const articles = document.querySelectorAll("article");
    if (articles.length === 0) return;
    
    const lastArticle = articles[articles.length - 1];

    if (arrowButton) {
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
    }

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const lastArticleTop = lastArticle.offsetTop;

        if (arrowButton) {
            if (currentScroll >= lastArticleTop - 900) {
                arrowButton.classList.add("hidden");
            } else {
                arrowButton.classList.remove("hidden");
            }
        }
    });
});

