const DEFAULT_DELAY = 870;
const BASE_SOUNDS = "/assets/sounds/";

let audioCtx = null;
const buffers = {};

function getAudioContext() {
    if (!audioCtx) audioCtx = new AudioContext();
    return audioCtx;
}

async function loadSound(name, url) {
    const ctx = getAudioContext();
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    buffers[name] = await ctx.decodeAudioData(arrayBuffer);
}

function playSound(name) {
    if (!buffers[name]) return;
    const ctx = getAudioContext();
    const source = ctx.createBufferSource();
    source.buffer = buffers[name];
    source.connect(ctx.destination);
    source.start(0);
}

function getSoundsForCurrentPath() {
    const folder =
        window.location.pathname.split("/").filter(Boolean)[0] ?? "default";

    return {
        click: `${BASE_SOUNDS}select_${folder}.wav`,
        hover: `${BASE_SOUNDS}hover_${folder}.wav`,
    };
}

document.addEventListener("DOMContentLoaded", async () => {
    const { click: clickUrl, hover: hoverUrl } = getSoundsForCurrentPath();

    await Promise.all([
        loadSound("click", clickUrl),
        loadSound("hover", hoverUrl),
    ]);

    const soundToggle = document.getElementById("soundToggle");
    const delay = window.SOUND_DELAY ?? DEFAULT_DELAY;
    let navigating = false;
    let hoverTimeout = null;

    if (localStorage.getItem("soundEnabled") === null) {
        localStorage.setItem("soundEnabled", "true");
    }

    if (soundToggle) {
        soundToggle.checked = localStorage.getItem("soundEnabled") === "true";
        soundToggle.addEventListener("change", () => {
            localStorage.setItem("soundEnabled", soundToggle.checked);
        });
    }

    function isSoundEnabled() {
        return localStorage.getItem("soundEnabled") === "true";
    }

    document.querySelectorAll("#rightContent a").forEach((link) => {
        link.addEventListener("click", function (e) {
            navigating = true;

            if (isSoundEnabled()) playSound("click");

            const href = this.getAttribute("href");
            if (href && href !== "#") {
                try {
                    const url = new URL(href, window.location.href);
                    if (url.protocol === "http:" || url.protocol === "https:") {
                        e.preventDefault();
                        setTimeout(
                            () => (window.location.href = url.href),
                            delay,
                        );
                    }
                } catch (err) {}
            }
        });

        const hasHover = window.matchMedia("(hover: hover)").matches;

        if (hasHover) {
            link.addEventListener("mouseenter", () => {
                if (navigating || !isSoundEnabled() || hoverTimeout) return;
                playSound("hover");
                hoverTimeout = setTimeout(() => (hoverTimeout = null), 100);
            });
        }
    });
});
