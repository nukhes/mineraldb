import { loadCSV } from './data.js';
import { loadTheme } from './theme.js';
import { renderResults } from './render.js';
import { filterResults } from './search.js';

const csvFile = 'dataset/mineral-properties.csv';
loadCSV(csvFile).catch(err => {
    const output = 'Failed to load mineral dataset';
    console.error(output, err);
});

loadTheme();

const searchBox = document.querySelector('#search');
searchBox.addEventListener('input', e => renderResults(filterResults(e.target.value), e.target.value));
