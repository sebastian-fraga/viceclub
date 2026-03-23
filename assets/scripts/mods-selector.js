
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('click', function (e) {
        const link = e.target.closest('.tab-link');
        if (!link) return;

        e.preventDefault();
        e.stopPropagation();

        const targetTab = link.getAttribute('data-tab');
        const parentDetails = link.closest('details');

        if (!parentDetails) return;

        parentDetails.querySelectorAll('.tab-link').forEach(tab => {
            tab.classList.remove('active');
        });

        link.classList.add('active');

        parentDetails.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = parentDetails.querySelector(
            `[data-content="${targetTab}"]`
        );

        if (targetContent) {
            targetContent.classList.add('active');
        }
    });

});
