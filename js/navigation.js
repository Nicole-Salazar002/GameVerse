(() => {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-nav');
    const navbar = document.querySelector('.navbar');

    if (!toggle || !menu || !navbar) return;

    const closeMenu = () => {
        navbar.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    };

    toggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    menu.addEventListener('click', event => {
        if (event.target.closest('.nav-link')) closeMenu();
    });

    document.addEventListener('click', event => {
        if (!navbar.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
})();
