
const DEFAULT_DELAY = 870;

document.addEventListener('DOMContentLoaded', () => {

    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');
    const soundToggle = document.getElementById('soundToggle');

    const delay = window.SOUND_DELAY ?? DEFAULT_DELAY;


    const soundEnabled = localStorage.getItem('soundEnabled');

    if (soundEnabled === null) {
        localStorage.setItem('soundEnabled', 'true');
        if (soundToggle) soundToggle.checked = true;
    } else {
        if (soundToggle) soundToggle.checked = soundEnabled === 'true';
    }

    if (soundToggle) {
        soundToggle.addEventListener('change', () => {
            localStorage.setItem('soundEnabled', soundToggle.checked);
        });
    }

    function isSoundEnabled() {
        return localStorage.getItem('soundEnabled') === 'true';
    }

    document.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', function (e) {

            if (isSoundEnabled() && clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }

            const href = this.getAttribute('href');

            if (href && href !== '#' && !href.startsWith('http')) {
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = href;
                }, delay);
            }

        });

        link.addEventListener('mouseenter', () => {
            if (isSoundEnabled() && hoverSound) {
                hoverSound.currentTime = 0;
                hoverSound.play();
            }
        });

    });

});