import { loadCSV } from './data.js';
import { loadTheme } from './theme.js';
import { renderResults } from './render.js';
import { filterResults } from './search.js';

const minerals = 'dataset/mineral-properties.csv';

loadCSV(minerals).catch(err => { console.error(err) });
loadTheme();

const searchBox = document.querySelector('#search');
let debounce;
searchBox.addEventListener('input', (e) => {
    const query = e.target.value;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
        const results = filterResults(query);
        renderResults(results, query);
    }, 300);
});