document.addEventListener("DOMContentLoaded", function () {
    // Get the URL params
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value
    const searchQuery = urlParams.get('searchQuery');

    searchInData(searchQuery);
});

function searchInData(searchQuery) {
    console.log(searchQuery);
}