const SEARCH_PAGE_HREF_PREFIX = "search.html?searchQuery=";

function search() {
    // Get the search query value
    var searchQuery = document.getElementById("searchQueryText").value;

    if (searchQuery.trim() === "") {
        alert("Skúste zadať niečo na prehľadávanie.");
        return;
    }
    
    window.location.href = SEARCH_PAGE_HREF_PREFIX + searchQuery;
}

function enableSubmit() {
    var inputValue = document.getElementById("searchQueryText").value;
    var submitButton = document.getElementById("searchSubmitButton");

    if (inputValue.trim() !== "") {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "true");
    }
}