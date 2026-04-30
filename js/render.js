import { properties, elements, getMineral } from './data.js';
import { getMineralImage } from './wikipedia-scraper.js';

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
    "Aluminum": "Al",
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
    html += '<header><nav><h3>Physical Properties</h3> <button>Back to results</button></nav></header>';
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
        html += '<ul>';
        elementsPresent.forEach(e => {
            html += `<li class="element">${symbol[e]} (${e})</li>`;
        });
        html += '</ul></footer>';
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
