// data.js - handles loading and parsing the mineral dataset, providing structures, minerals, elements, and properties.

export let minerals = [];
export const headerMap = {};
export const elements = [];
export const properties = [];
export const crystal = ['Cubic', 'Tetragonal', 'Hexagonal', 'Rhombohedral', 'Orthorhombic', 'Monoclinic', 'Triclinic', 'Undefined'];

export function loadCSV(csvFile) {
    return fetch(csvFile)
        .then(r => r.text())
        .then(csv => {
            const lines = csv.replace(/\r/g, '').trim().split('\n');
            
            const headers = lines[0].split(',').map(h => h.trim());
            headers.forEach((h, i) => headerMap[h] = i);
            
            // populate elements
            let start = headers.indexOf('Hydrogen');
            let end = headers.indexOf('Oganesson');
            elements.push(...headers.slice(start, end + 1));
            
            // populate properties
            start = headers.indexOf('Crystal Structure');
            end = headers.indexOf('Dispersion');
            const propCalculadas = ['Molar Mass', 'Molar Volume', 'Calculated Density'];
            
            properties.push(
                ...headers.slice(start, end + 1), 
                ...propCalculadas
            );

            // populate minerals
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue; 
                
                const values = lines[i].split(',');
                const mineral = { idx: i - 1 };
                
                headers.forEach((h, j) => {
                    mineral[h] = values[j] ? values[j].trim() : '';
                });
                minerals.push(mineral);
            }
            console.log(`successfully loaded ${minerals.length} minerals, ${elements.length} elements and ${properties.length} properties.`);
        });
}

export function getMineral(idx) {
    const m = minerals[idx];
    let crystal_idx = parseInt(m['Crystal Structure']);
    return {
        ...m,
        'Crystal Structure': crystal[crystal_idx]
    };
}
