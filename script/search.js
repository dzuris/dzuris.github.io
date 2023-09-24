function search() {
    // Get the search query value
    var searchQuery = document.getElementById("searchQueryText").value;

    if (searchQuery.trim() === "") {
        alert("Skúste zadať niečo na prehľadávanie.");
        return false;
    }
    
    console.log(searchQuery);
    return true;
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