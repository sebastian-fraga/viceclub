document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("hamburger");
    const rightContent = document.getElementById("rightContent");
    const block = document.querySelector(".block");

    button.addEventListener("click", function (event) {
        event.stopPropagation();
        rightContent.classList.toggle("show");
        button.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (
            !rightContent.contains(event.target) &&
            !button.contains(event.target)
        ) {
            rightContent.classList.remove("show");
            button.classList.remove("active");
        }
    });
});
