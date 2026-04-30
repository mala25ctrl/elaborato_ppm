const giorni = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
    'settembre', 'ottobre', 'novembre', 'dicembre'];

document.addEventListener('DOMContentLoaded', () => {
    initHeaderInfoScroll(); //Gestione header dinamico su scroll
    initCurrentDate();  //Inserisce data attuale
    initLastUpdateTime();  //Inserisce ora dell'ultimo aggiornamento (ora di caricamento pagina)
});

/**
 * Gestisce la visibilità della sezione header-info durante lo scroll
 */
function initHeaderInfoScroll() {
    const headerInfoElement = document.querySelector('[data-js-header-info]');
    if (!headerInfoElement) return;

    let lastScrollPosition = window.scrollY;

    const scrollThreshold = 100; // soglia minima per reagire allo scroll

    const toggleHeaderInfoOnScroll = () => {
        // Su mobile l’header resta sempre visibile
        if (window.innerWidth < 768) {
            showHeaderInfo(headerInfoElement);
            return;
        }

        const currentScrollPosition = window.scrollY;
        const scrollDelta = currentScrollPosition - lastScrollPosition;

        // Ignora piccoli movimenti
        if (Math.abs(scrollDelta) < scrollThreshold) return;

        const isScrollingDown = currentScrollPosition > lastScrollPosition;

        // Nasconde solo se:
        // - stai scendendo
        // - hai superato la soglia iniziale
        if (isScrollingDown && currentScrollPosition > scrollThreshold) {
            hideHeaderInfo(headerInfoElement);
        } else {
            showHeaderInfo(headerInfoElement);
        }

        lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', toggleHeaderInfoOnScroll);
    window.addEventListener('resize', toggleHeaderInfoOnScroll);
}

/**
 * Nasconde la sezione header-info
 */
function hideHeaderInfo(element) {
    element.classList.add('main-header__info--hidden');
    element.classList.remove('px-2', 'py-2');
}

/**
 * Mostra la sezione header-info
 */
function showHeaderInfo(element) {
    element.classList.remove('main-header__info--hidden');
    element.classList.add('px-2', 'py-2');
}

/**
 * Inserisce la data corrente nell'elemento <time>
 */
function initCurrentDate() {
    const timeElement = document.querySelector('.main-header__info time');

    if (!timeElement) return;

    const now = new Date();

    timeElement.textContent = formatItalianDate(now);
    timeElement.setAttribute('datetime', formatIsoDate(now));
}

/**
 * Formatta la data in formato leggibile italiano
 * es: "giovedì, 30 aprile 2026"
 */
function formatItalianDate(date) {
    return `${giorni[date.getDay()]}, ${date.getDate()} ${mesi[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Restituisce la data in formato ISO (YYYY-MM-DD)
 */
function formatIsoDate(date) {
    return date.toISOString().split('T')[0];
}

/**
 * Inserisce l'orario di ultimo aggiornamento
 */
function initLastUpdateTime() {
    const lastUpdateElement = document.querySelector('[data-js-last-update]');

    if (!lastUpdateElement) return;

    const now = new Date();

    lastUpdateElement.textContent = `Ultimo aggiornamento: ${formatTime(now)}`;
}

/**
 * Formatta l'orario in HH:MM
 */
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}