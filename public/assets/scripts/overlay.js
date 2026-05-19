document.addEventListener("click", function (e) {
    const img = e.target;
    if (img.matches(".news-image")) {
        const overlay = document.getElementById("imageOverlay");
        const overlayImg = document.getElementById("overlayImg");
        const footerText = document.getElementById("overlayFooterText");
        
        if (overlay && overlayImg) {
            overlayImg.src = img.src;
            overlay.classList.add("open");
            document.body.style.overflow = "hidden";
            if (footerText) {
                footerText.textContent = img.dataset.footer || "";
            }
        }
    }
});

document.getElementById("closeBtn")?.addEventListener("click", () => {
    const overlay = document.getElementById("imageOverlay");
    if (overlay) {
        overlay.classList.remove("open");
        document.body.style.overflow = "auto";
    }
});

