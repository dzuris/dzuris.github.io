document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data from the file using fetch API
    fetch("data/categories.json")
        .then(response => response.json())
        .then(data => {
            // Container where the json data will be added
            var container = document.getElementById("categories");

            data.forEach(function(item) {
                // Create a div element
                var div = document.createElement("div");

                // Create an image element
                var img = document.createElement("img");
                img.src = item.photoUrl;
                img.alt = item.title;

                // Create a span element
                var span = document.createElement("span");
                span.textContent = item.title;

                // Append the image and span to the div
                div.appendChild(img);
                div.appendChild(span);

                // Append the div to the categories
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });
})