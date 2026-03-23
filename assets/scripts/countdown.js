const countDownDate = new Date("Nov 19, 2026 00:00:00").getTime();

const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

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
        document.getElementById("countdown").textContent = "LLEGÓ EL DÍA!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateValue(daysSpan, days);
    updateValue(hoursSpan, hours);
    updateValue(minutesSpan, minutes);
    updateValue(secondsSpan, seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);