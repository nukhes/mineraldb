import { loadCSV } from './data.js';
import { loadTheme } from './theme.js';
import { renderResults } from './render.js';
import { filterResults } from './search.js';

const minerals = 'dataset/mineral-properties.csv';

loadCSV(minerals).catch(err => { console.error(err) });
loadTheme();

const searchBox = document.querySelector('#search');
searchBox.addEventListener('input', e => renderResults(filterResults(e.target.value), e.target.value));
