export async function getMineralImage(name) {
    const url =`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=1000&origin=*`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        if (pageId !== "-1" && pages[pageId].thumbnail) {
            const thumbnailUrl = pages[pageId].thumbnail.source;
            let fullUrl;
            if (thumbnailUrl.includes('/thumb/')) {
                fullUrl = thumbnailUrl.replace('/thumb/', '/').replace(/\/[^\/]+$/, '');
            } else {
                fullUrl = thumbnailUrl;
            }
            return fullUrl;
        }
        return null;
    } catch (e) {
        return null;
    }
}
