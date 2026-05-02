export async function getMineralSummary(name) {
    const api = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
    const url = `${api}${encodeURIComponent(name)}`
    const placeholder = {
        'thumbnail': 'https://placehold.co/800x400?text=not%20found.',
        'summary': 'No summary info.'
    };
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        return {
            thumbnail: data.thumbnail.source || placeholder.thumbnail,
            summary: data.extract || placeholder.summary
        };
    } catch (err) {
        console.warn(err);
        return null;
    }
}
