document.addEventListener("click", function (e) {
    const img = e.target;
    if (img.matches(".news-image")) {
        const overlay = document.getElementById("imageOverlay");
        const overlayImg = document.getElementById("overlayImg");
        const footerText = document.getElementById("overlayFooterText");

        if (overlay && overlayImg) {
            overlayImg.src = img.src;
            if (footerText) {
                footerText.textContent = img.dataset.footer || "";
            }
            overlay.showModal();
            document.body.style.overflow = "hidden";
        }
    }
});

document.addEventListener("mouseover", function (e) {
    const img = e.target;
    if (img.matches(".news-image")) {
        const preload = new Image();
        preload.src = img.src;
    }
});

document.getElementById("closeBtn")?.addEventListener("click", () => {
    document.getElementById("imageOverlay")?.close();
    document.body.style.overflow = "auto";
});

document.getElementById("imageOverlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.close();
        document.body.style.overflow = "auto";
    }
});
