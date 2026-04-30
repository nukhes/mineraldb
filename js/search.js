import { minerals, properties, elements } from './data.js';

export function filterResults(query) {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    
    const byPrefix = binarySearchIndices(minerals, q);
    if (byPrefix.length) return byPrefix;

    const bySubstring = minerals
        .map((m, idx) => ({ name: m.Name.toLowerCase(), idx }))
        .filter(({ name }) => name.includes(q))
        .map(({ idx }) => idx);
        
    if (bySubstring.length) return bySubstring;

    const elem = elements.find(e => e.toLowerCase().includes(q));
    if (elem) {
        return minerals
            .map((m, idx) => ({ m, idx }))
            .filter(({ m }) => parseFloat(m[elem]) > 0)
            .map(({ idx }) => idx);
    } 
    
    const prop = properties.find(p => p.toLowerCase().includes(q));
    if (prop) {
        return minerals
            .map((m, idx) => ({ m, idx }))
            .filter(({ m }) => parseFloat(m[prop]) > 0)
            .map(({ idx }) => idx);
    }
    
    return [];
}

function binarySearchIndices(arr, target) {
    let left = 0, right = arr.length - 1;
    const lower = target.toLowerCase();
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const name = arr[mid].Name.toLowerCase();
        
        if (name.startsWith(lower)) {
            let start = mid, end = mid;
            while (start > 0 && arr[start - 1].Name.toLowerCase().startsWith(lower)) start--;
            while (end < arr.length - 1 && arr[end + 1].Name.toLowerCase().startsWith(lower)) end++;
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else if (name < lower) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [];
}
