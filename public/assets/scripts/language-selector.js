document.addEventListener("DOMContentLoaded", async function () {
    function detectLang() {
        const saved = localStorage.getItem("lang");
        if (saved) return saved;

        const browserLang = navigator.language?.slice(0, 2).toUpperCase();
        const supported = ["ES", "EN", "FR", "PT"];
        return supported.includes(browserLang) ? browserLang : "ES";
    }

    const btn = document.querySelector(".footer-settings button");
    if (!btn) return;

    async function loadLang(lang) {
        const res = await fetch(`/assets/lang/${lang.toLowerCase()}.json`);
        return await res.json();
    }

    function applyTranslations(translations) {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            const value = key
                .split(".")
                .reduce((obj, k) => obj?.[k], translations);
            if (value) el.textContent = value;
        });

        const game = window.location.pathname.split("/")[1];
        const section = window.location.pathname.split("/")[2];
        const sectionKey = section === "100" ? "checklist" : section;

        const heading = translations?.[sectionKey]?.[game]?.heading;
        if (heading) document.querySelector("h1").textContent = heading;

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            const value = key
                .split(".")
                .reduce((obj, k) => obj?.[k], translations);
            if (value) el.placeholder = value;
        });

        // cheats
        if (typeof renderCheats === "function") {
            renderCheats();
        }
    }

    async function changeLang(lang) {
        localStorage.setItem("lang", lang);
        const translations = await loadLang(lang);
        applyTranslations(translations);
    }

    const flags = {
        ES: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/es.svg",
        EN: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/gb.svg",
        FR: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/fr.svg",
        PT: "https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/br.svg",
    };

    function updateBtn(code) {
        btn.querySelector(".lang-btn-content").innerHTML = `
            <img src="${flags[code]}" width="20" height="20"> ${code}
        `;
    }

    btn.innerHTML = `
        <span class="lang-btn-content">
            <img src="${flags.ES}" width="20" height="20"> ES
        </span>
        <span class="material-symbols-rounded arrow">arrow_drop_down</span>
    `;

    const menu = document.createElement("div");
    menu.className = "lang-menu";
    menu.innerHTML = Object.entries(flags)
        .map(
            ([code, src]) => `
        <div class="lang-option ${code === "ES" ? "selected" : ""}" data-lang="${code}">
            <img src="${src}" width="20" height="20">
            ${{ ES: "Español", EN: "English", FR: "Français", PT: "Português" }[code]}
            <span class="check">✓</span>
        </div>
    `,
        )
        .join("");

    btn.parentElement.style.position = "relative";
    btn.parentElement.appendChild(menu);

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("visible");
        btn.classList.toggle("open");
    });

    menu.querySelectorAll(".lang-option").forEach((opt) => {
        opt.addEventListener("click", async () => {
            menu.querySelectorAll(".lang-option").forEach((o) =>
                o.classList.remove("selected"),
            );
            opt.classList.add("selected");

            const code = opt.dataset.lang;
            updateBtn(code);
            await changeLang(code);

            menu.classList.remove("visible");
            btn.classList.remove("open");
        });
    });

    document.addEventListener("click", () => {
        menu.classList.remove("visible");
        btn.classList.remove("open");
    });

    const savedLang = detectLang();
    updateBtn(savedLang);
    await changeLang(savedLang);

    menu.querySelectorAll(".lang-option").forEach((opt) => {
        opt.classList.toggle("selected", opt.dataset.lang === savedLang);
    });
});

if (
    location.hostname === "localhost" ||
    localStorage.getItem("vc_debug") === "true"
) {
    const s = document.createElement("script");
    s.src = "/assets/scripts/debug-menu.js";
    document.head.appendChild(s);
}
