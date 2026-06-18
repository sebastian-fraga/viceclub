const countDownDate = new Date("Nov 19, 2026 00:00:00").getTime();
// const countDownDate = Date.now() + 2000;

const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

const countdownSection = document.getElementById("countdown-section");
const releaseContent = document.getElementById("countdown-finished");

function animate(element) {
    element.classList.remove("pop");
    void element.offsetWidth;
    element.classList.add("pop");
}

function updateValue(element, newValue) {
    if (element.textContent !== newValue.toString()) {
        element.textContent = newValue;
        animate(element);
    }
}

function updateCountdown() {
    const now = Date.now();
    const distance = countDownDate - now;

    if (distance < 0) {
        clearInterval(timer);

        countdownSection.classList.add("hidden");
        releaseContent.classList.remove("hidden");

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateValue(daysSpan, days);
    updateValue(hoursSpan, hours);
    updateValue(minutesSpan, minutes);
    updateValue(secondsSpan, seconds);
}

updateCountdown();

const timer = setInterval(updateCountdown, 1000);
