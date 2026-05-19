async function loadCharacters() {
    const game = window.location.pathname.split("/").filter(Boolean)[0];

    const res = await fetch("/assets/data/characters.json");
    const data = await res.json();

    const keys = game === "IV" ? ["IV", "TLAD", "TBOGT"] : [game];
    const lists = document.querySelectorAll(".characters-list");

    keys.forEach((key, i) => {
        const characters = data[key];
        const list = lists[i];
        if (!characters || !list) return;

        list.innerHTML = characters
            .map(
                (char) => `
                <div class="card-wrap">
                    <article class="card-inner">
                        <div class="card-front">
                            <img src="${char.image}" alt="${char.name}" loading="lazy" />
                            <div class="character-text">
                                <p>${char.name}</p>
                                <span>${char.role}</span>
                            </div>
                        </div>
                        <div class="card-back">
                            <p class="char-name">
                                ${char.name}
                                <span class="char-flags">
                                ${[]
                                    .concat(
                                        char.nationalities ??
                                            char.nationality ??
                                            [],
                                    )
                                    .filter(
                                        (code) =>
                                            code &&
                                            code.toLowerCase() !== "unknown",
                                    )
                                    .map(
                                        (code) =>
                                            `<img class="char-flag" src="https://flagcdn.com/20x15/${code.toLowerCase()}.png" alt="${code}" />`,
                                    )
                                    .join("")}
                                </span>
                            </p>
                            <div class="back-row">
                                <span class="back-label">Estado</span>
                                <span class="back-value status-${char.status}">${char.statusLabel}</span>
                            </div>
                            <div class="back-row">
                                <span class="back-label">Edad</span>
                                <span class="back-value">${char.age ?? "—"}</span>
                            </div>
                            <div class="back-row">
                                <span class="back-label">Primera aparición</span>
                                <span class="back-value">${char.firstAppearance ?? "—"}</span>
                            </div>
                            <div class="back-quote">"${char.quote}"</div>
                        </div>
                    </article>
                </div>
            `,
            )
            .join("");

        list.querySelectorAll(".card-wrap").forEach((card) => {
            card.addEventListener("click", () =>
                card.classList.toggle("flipped"),
            );
        });
    });
}

loadCharacters();
