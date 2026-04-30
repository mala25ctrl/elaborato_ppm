document.addEventListener('DOMContentLoaded', () => {
    const headerInfoElement = document.querySelector('[data-js-header-info]');

    if (!headerInfoElement) return;

    let lastScrollPosition = window.scrollY;
    const scrollThreshold = 100;

    const toggleHeaderInfoOnScroll = () => {
        if (window.innerWidth < 768) {
            headerInfoElement.classList.remove('main-header__info--hidden');
            return;
        }

        const currentScrollPosition = window.scrollY;
        const scrollDelta = currentScrollPosition - lastScrollPosition;

        if (Math.abs(scrollDelta) < scrollThreshold) return;

        const isScrollingDown = currentScrollPosition > lastScrollPosition;
        const hasScrolledEnough = currentScrollPosition > 50;

        if (isScrollingDown && hasScrolledEnough) {
            headerInfoElement.classList.add('main-header__info--hidden');
            headerInfoElement.classList.remove('px-2', 'py-2');
        } else {
            headerInfoElement.classList.remove('main-header__info--hidden');
            headerInfoElement.classList.add('px-2', 'py-2');
        }

        lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', toggleHeaderInfoOnScroll);
    window.addEventListener('resize', toggleHeaderInfoOnScroll);
});