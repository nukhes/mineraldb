import { properties, elements, getMineral } from './data.js';
import { getMineralSummary } from './wikipedia-scraper.js';
import { filterResults } from './search.js';
import { searchBox } from './main.js';

const results = document.getElementById('results');
const detail = document.getElementById('detail');
const symbol = {
    "Hydrogen": "H",
    "Helium": "He",
    "Lithium": "Li",
    "Beryllium": "Be",
    "Boron": "B",
    "Carbon": "C",
    "Nitrogen": "N",
    "Oxygen": "O",
    "Fluorine": "F",
    "Neon": "Ne",
    "Sodium": "Na",
    "Magnesium": "Mg",
    "Aluminium": "Al",
    "Silicon": "Si",
    "Phosphorus": "P",
    "Sulfur": "S",
    "Chlorine": "Cl",
    "Argon": "Ar",
    "Potassium": "K",
    "Calcium": "Ca",
    "Scandium": "Sc",
    "Titanium": "Ti",
    "Vanadium": "V",
    "Chromium": "Cr",
    "Manganese": "Mn",
    "Iron": "Fe",
    "Cobalt": "Co",
    "Nickel": "Ni",
    "Copper": "Cu",
    "Zinc": "Zn",
    "Gallium": "Ga",
    "Germanium": "Ge",
    "Arsenic": "As",
    "Selenium": "Se",
    "Bromine": "Br",
    "Krypton": "Kr",
    "Rubidium": "Rb",
    "Strontium": "Sr",
    "Yttrium": "Y",
    "Zirconium": "Zr",
    "Niobium": "Nb",
    "Molybdenum": "Mo",
    "Technetium": "Tc",
    "Ruthenium": "Ru",
    "Rhodium": "Rh",
    "Palladium": "Pd",
    "Silver": "Ag",
    "Cadmium": "Cd",
    "Indium": "In",
    "Tin": "Sn",
    "Antimony": "Sb",
    "Tellurium": "Te",
    "Iodine": "I",
    "Xenon": "Xe",
    "Cesium": "Cs",
    "Barium": "Ba",
    "Lanthanum": "La",
    "Cerium": "Ce",
    "Praseodymium": "Pr",
    "Neodymium": "Nd",
    "Promethium": "Pm",
    "Samarium": "Sm",
    "Europium": "Eu",
    "Gadolinium": "Gd",
    "Terbium": "Tb",
    "Dysprosium": "Dy",
    "Holmium": "Ho",
    "Erbium": "Er",
    "Thulium": "Tm",
    "Ytterbium": "Yb",
    "Lutetium": "Lu",
    "Hafnium": "Hf",
    "Tantalum": "Ta",
    "Tungsten": "W",
    "Rhenium": "Re",
    "Osmium": "Os",
    "Iridium": "Ir",
    "Platinum": "Pt",
    "Gold": "Au",
    "Mercury": "Hg",
    "Thallium": "Tl",
    "Lead": "Pb",
    "Bismuth": "Bi",
    "Polonium": "Po",
    "Astatine": "At",
    "Radon": "Rn",
    "Francium": "Fr",
    "Radium": "Ra",
    "Actinium": "Ac",
    "Thorium": "Th",
    "Protactinium": "Pa",
    "Uranium": "U",
    "Neptunium": "Np",
    "Plutonium": "Pu",
    "Americium": "Am",
    "Curium": "Cm",
    "Berkelium": "Bk",
    "Californium": "Cf",
    "Einsteinium": "Es",
    "Fermium": "Fm",
    "Mendelevium": "Md",
    "Nobelium": "No",
    "Lawrencium": "Lr",
    "Rutherfordium": "Rf",
    "Dubnium": "Db",
    "Seaborgium": "Sg",
    "Bohrium": "Bh",
    "Hassium": "Hs",
    "Meitnerium": "Mt",
    "Darmstadtium": "Ds",
    "Roentgenium": "Rg",
    "Copernicium": "Cn",
    "Nihonium": "Nh",
    "Flerovium": "Fl",
    "Moscovium": "Mc",
    "Livermorium": "Lv",
    "Tennessine": "Ts",
    "Oganesson": "Og"
};

export const renderResults = (list, query) => {
    if (!list.length && query) {
        results.innerHTML = 'No minerals found';
        return;
    }

    // reset detail view when rendering new results
    renderDetails(-1);
    
    results.innerHTML = list.slice(0, 60).map(idx => {
        const m = getMineral(idx);
        return `
        <article onclick="renderDetails(${idx}, '${query}')">
            <h3>${m.Name}</h3>
            <small>Hardness: ${m['Mohs Hardness']}</small>
        </article>
    `;
    }).join('');
}

window.lastSearch = (query) => {
    renderDetails(-1);
    const results = filterResults(query);
    renderResults(results, query)
    searchBox.value=query
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.renderDetails = (idx, last_query='diamond') => {

    // special index to hide details 
    if (idx === -1) {
        detail.style.display = 'none';
        document.title = `mineraldb`;
        return;
    }

    // default behavior
    detail.style.display = 'block';
    results.innerHTML = '';

    const m = getMineral(idx);
    const mineralName = m.Name;
    const composition = elements.filter(e => parseFloat(m[e] || 0) > 0);
    let propertiesHTML = '';
    let elementsHTML = '';
    
    // write propertiesHTML in a table
    properties.forEach(p => {
        const value = m[p];
        propertiesHTML += '<tr>';
        propertiesHTML += `<td>${p}</td>`;
        if (parseFloat(value)) {
            propertiesHTML += `<td>${parseFloat(value).toFixed(2)}</td>`;
        } else {
            propertiesHTML += `<td>${value}</td>`;
        }
        propertiesHTML += '</tr>';
    });
    
    // write elementsHTML in list
    composition.forEach(e => {
        console.log(e)
        elementsHTML += `<li class="element">${symbol[e]} (${e})</li>`;
    });
    
    document.title = `${mineralName.toLowerCase()}, mineraldb`;

    let html = `
    <nav>
        <h2>${mineralName}</h2>
        <button onclick='lastSearch("${last_query}")'>Back to results</button>
    </nav>

    <article id="summary" style='display: none;'>
        <img>
        <p></p>
    </article>

    <article>
        <header>
            <h3>Physical Properties</h3>
        </header>
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                ${propertiesHTML}
            </tbody>
        </table>

        <footer>
            <h3>Elements<h3>
            <ul>
                ${elementsHTML}
            </ul>
        </footer>
    </article>
    `;

    detail.innerHTML = html;

    // scraps wikipedia for summary and thumbnail, applying these to the respective HTML
    // elements.
    getMineralSummary(mineralName).then(data => {
        if (!data) { return; }

        const summary = document.querySelector('#summary');
        const thumbnail = summary.querySelector('#summary img');
        const text = document.querySelector('#summary p');
        thumbnail.setAttribute('src', data.thumbnail);
        text.innerHTML=data.summary;
        summary.style.display = 'block';
    });

    detail.scrollIntoView({ behavior: 'smooth' });
}
