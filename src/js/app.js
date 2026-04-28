let minerals = [];
const csvFile = 'dataset/mineral-properties.csv';
const headerMap = {};

const search = document.getElementById('search');
const results = document.getElementById('results');
const detail = document.getElementById('detail');

const elements = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminium', 'Silicon', 'Phosphorus', 'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron', 'Cobalt', 'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium', 'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Cesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium', 'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium', 'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nihonium', 'Flerovium', 'Moscovium', 'Livermorium', 'Tennessine', 'Oganesson'];

const properties = ['Crystal Structure', 'Mohs Hardness', 'Diaphaneity', 'Specific Gravity', 'Optical', 'Refractive Index', 'Dispersion', 'Molar Mass', 'Molar Volume', 'Calculated Density'];

function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    const results = [];
    const lower = target.toLowerCase();
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const name = arr[mid].Name.toLowerCase();
        
        if (name.startsWith(lower)) {
            let start = mid, end = mid;
            while (start > 0 && arr[start - 1].Name.toLowerCase().startsWith(lower)) start--;
            while (end < arr.length - 1 && arr[end + 1].Name.toLowerCase().startsWith(lower)) end++;
            return arr.slice(start, end + 1);
        } else if (name < lower) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [];
}

function loadCSV() {
    return fetch(csvFile)
        .then(r => r.text())
        .then(csv => {
            const lines = csv.trim().split('\n');
            const headers = lines[0].split(',');
            headers.forEach((h, i) => headerMap[h] = i);
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                const mineral = { idx: i - 1 };
                headers.forEach((h, j) => mineral[h] = values[j] || '');
                minerals.push(mineral);
            }
        });
}

function filterResults(query) {
    if (!query.trim()) {
        results.innerHTML = '';
        detail.style.display = 'none';
        return;
    }
    
    const q = query.toLowerCase();
    let filtered = [];
    
    const byName = binarySearch(minerals, query);
    if (byName.length) {
        filtered = byName;
    } else {
        const elem = elements.find(e => e.toLowerCase().includes(q));
        if (elem) {
            const col = headerMap[elem];
            filtered = minerals.filter(m => parseFloat(m[elem] || 0) > 0);
        } else {
            const prop = properties.find(p => p.toLowerCase().includes(q));
            if (prop) {
                const col = headerMap[prop];
                filtered = minerals.filter(m => m[prop]);
            }
        }
    }
    
    displayResults(filtered);
}

function displayResults(list) {
    if (!list.length) {
        results.innerHTML = '<div class="no-results">No minerals found</div>';
        detail.style.display = 'none';
        return;
    }
    
    results.innerHTML = list.slice(0, 20).map(m => `
        <div class="mineral-card" onclick="showDetail(${m.idx})">
            <h3>${m.Name}</h3>
            <p>${m['Crystal Structure'] ? 'Crystal: ' + m['Crystal Structure'] : ''} ${m['Mohs Hardness'] ? '| Hardness: ' + m['Mohs Hardness'] : ''}</p>
        </div>
    `).join('');
}

function showDetail(idx) {
    const m = minerals[idx];
    const elementsPresent = elements.filter(e => parseFloat(m[e] || 0) > 0);
    
    let html = `<h2>${m.Name}</h2>`;
    
    html += '<div class="detail-section">';
    html += '<h3>Physical Properties</h3>';
    html += '<div class="property-grid">';
    properties.forEach(p => {
        if (m[p]) {
            html += `<div class="property-item"><strong>${p}</strong>${m[p]}</div>`;
        }
    });
    html += '</div></div>';
    
    if (elementsPresent.length) {
        html += '<div class="detail-section">';
        html += '<h3>Elements</h3>';
        html += '<div class="element-list">';
        elementsPresent.forEach(e => {
            html += `<span class="element-tag">${e}</span>`;
        });
        html += '</div></div>';
    }
    
    detail.innerHTML = html;
    detail.style.display = 'block';
    results.innerHTML = '';
    detail.scrollIntoView({ behavior: 'smooth' });
}

search.addEventListener('input', e => filterResults(e.target.value));

loadCSV().catch(err => {
    console.error('Failed to load mineral data:', err);
    results.innerHTML = '<div class="no-results">Unable to load mineral database</div>';
});
