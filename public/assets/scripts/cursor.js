const cursorToggle = document.getElementById("cursorToggle");

if (localStorage.getItem("customCursor") === null) {
    localStorage.setItem("customCursor", "true");
}

if (cursorToggle) {
    cursorToggle.checked = localStorage.getItem("customCursor") === "true";

    cursorToggle.addEventListener("change", () => {
        const enabled = cursorToggle.checked;

        localStorage.setItem("customCursor", enabled);

        document.body.classList.toggle("custom-cursor", enabled);
    });
}

function applyCursorState() {
    const enabled = localStorage.getItem("customCursor") === "true";

    document.body.classList.toggle("custom-cursor", enabled);
}

applyCursorState();
