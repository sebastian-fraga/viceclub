document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('.footer-settings button');
    if (!btn) return;

    btn.innerHTML = `
        <span class="lang-btn-content">
            <img src="https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/es.svg" width="20" height="20">
            ES
        </span>
        <span class="material-symbols-rounded arrow">arrow_drop_down</span>
    `;

    const menu = document.createElement('div');
    menu.className = 'lang-menu';
    menu.innerHTML = `
        <div class="lang-option selected" data-lang="ES">
            <img src="https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/es.svg" width="20" height="20"> Español <span class="check">✓</span>
        </div>
        <div class="lang-option" data-lang="EN">
            <img src="https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/gb.svg" width="20" height="20"> English <span class="check">✓</span>
        </div>
        <div class="lang-option" data-lang="FR">
            <img src="https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/fr.svg" width="20" height="20"> Français <span class="check">✓</span>
        </div>
        <div class="lang-option" data-lang="PT">
            <img src="https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/br.svg" width="20" height="20"> Português <span class="check">✓</span>
        </div>
    `;

    btn.parentElement.style.position = 'relative';
    btn.parentElement.appendChild(menu);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('visible');
        btn.classList.toggle('open');
    });

    menu.querySelectorAll('.lang-option').forEach(opt => {
        opt.addEventListener('click', () => {
            menu.querySelectorAll('.lang-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            const code = opt.dataset.lang;
            const flagSrc = opt.querySelector('img').src;

            btn.querySelector('.lang-btn-content').innerHTML = `
                <img src="${flagSrc}" width="20" height="20">
                ${code}
            `;

            menu.classList.remove('visible');
            btn.classList.remove('open');
        });
    });

    document.addEventListener('click', () => {
        menu.classList.remove('visible');
        btn.classList.remove('open');
    });
});