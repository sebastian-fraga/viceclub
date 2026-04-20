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
        <article>
            <img src="${char.image}" alt="${char.name}" loading="lazy" />
            <div class="character-text">
                <p>${char.name}</p>
                <span>${char.role}</span>
            </div>
        </article>
    `,
        )
        .join("");
}

loadCharacters();
