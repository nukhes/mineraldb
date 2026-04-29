import { properties, elements, getMineral } from './data.js';
import { getMineralImage } from './wikipedia-scraper.js';

const results = document.getElementById('results');
const detail = document.getElementById('detail');

export function renderResults(list, query) {
    if (!list.length && query) {
        results.innerHTML = 'No minerals found';
        return;
    }

    // reset detail view when rendering new results
    renderDetails(-1);
    
    results.innerHTML = list.slice(0, 60).map(idx => {
        const m = getMineral(idx);
        return `
        <article onclick="renderDetails(${idx})">
            <h3>${m.Name}</h3>
            <small>${m['Crystal Structure']} | Hardness: ${m['Mohs Hardness']}</small>
        </article>
    `;
    }).join('');
}

window.renderDetails = (idx) => {

    // special index to hide details 
    if (idx === -1) {
        detail.style.display = 'none';
        document.title = `mineraldb`;
        return;
    }

    detail.style.display = 'block';

    const m = getMineral(idx);
    const elementsPresent = elements.filter(e => parseFloat(m[e] || 0) > 0);
    
    console.log('Rendering details for:', m);

    document.title = `${m.Name.toLowerCase()}, mineraldb`;

    let html = `<h2>${m.Name}</h2>`;
    html += '<article>';
    html += '<header><h3>Physical Properties</h3></header>';
    html += `<img id="thumbnail" style="padding: 1em; border-radius: 8px; max-width: 660px; margin-left: auto;">`;
    html += '<table>';
    html += '<thead><tr><th>Property</th><th>Value</th></tr></thead>';
    html += '<tbody>';
    properties.forEach(p => {
        const value = m[p];
        html += '<tr>';
        html += `<td>${p}</td>`;
        if (parseFloat(value)) {
            html += `<td>${parseFloat(value).toFixed(2)}</td>`;
        } else {
            html += `<td>${value}</td>`;
        }
        html += '</tr>';
    });
    html += '</tbody></table></article>';
    
    if (elementsPresent.length) {
        html += '<footer>';
        html += '<h3>Elements</h3>';
        html += '<nav>';
        html += '<ul>';
        elementsPresent.forEach(e => {
            html += `<li class="element">${e}</li>`;
        });
        html += '</ul></nav></footer>';
    }
    
    detail.innerHTML = html;
    detail.style.display = 'block';
    results.innerHTML = '';
    detail.scrollIntoView({ behavior: 'smooth' });

    getMineralImage(m.Name).then(imgUrl => {
        const thumbnail = document.querySelector('#thumbnail');
        thumbnail.setAttribute('src', imgUrl || 'https://placehold.co/800x400?text=not%20found.');
   });

}
