document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL params
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value
    const searchQuery = urlParams.get('searchQuery');

    let data = await searchInData(searchQuery);
});

async function searchInData(searchQuery) {
    console.log(searchQuery);
}

class searchItem {
    constructor(categoryId, title, photoUrl, price, numOfKeywordsMatch, hrefToItem) {
        this.categoryId = categoryId;
        this.title = title;
        this.photoUrl = photoUrl;
        this.price = price;
        this.numOfKeywordsMatch = numOfKeywordsMatch;
        this.hrefToItem = hrefToItem;
    }
}
