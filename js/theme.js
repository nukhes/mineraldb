const html = document.documentElement;
const toggle = document.querySelector('#theme-toggle');

function saveTheme(theme) {
    html.dataset.theme = theme;
    try {
        window.localStorage.setItem('theme', theme);
    } catch (err) {
        console.warn('Unable to persist theme selection', err);
    }
};

export function loadTheme() {
    const stored = window.localStorage.getItem('theme');
    if (stored) {
        saveTheme(stored);
        return;
    }
    saveTheme('light');
};

toggle.addEventListener('click', () => {
    saveTheme(html.dataset.theme == 'dark' ? 'light' : 'dark');
});
