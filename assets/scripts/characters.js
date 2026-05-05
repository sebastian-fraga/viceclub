async function loadCharacters() {
    const game = window.location.pathname.split("/").filter(Boolean)[0];

    const res = await fetch("/assets/data/characters.json");
    const data = await res.json();
    const characters = data[game];

    if (!characters) {
        console.warn(`No se encontraron personajes para: ${game}`);
        return;
    }

    const list = document.querySelector(".characters-list");
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
                    <p class="char-name">${char.name}</p>
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
        card.addEventListener("click", () => card.classList.toggle("flipped"));
    });
}

loadCharacters();
