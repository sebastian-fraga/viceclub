
import confetti from "canvas-confetti";

export function launchConfetti() {
    const end = Date.now() + 500;
    const colors = ["#8d75ef", "#4d9eff", "#b475ef"];

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 80,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors,
            zIndex: 9999,
        });
        confetti({
            particleCount: 7,
            angle: 100,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors,
            zIndex: 9999,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}
