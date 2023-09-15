document.addEventListener("DOMContentLoaded", function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get value
    const model_id = urlParams.get('model');

    // Fetch the JSON data to get H1 title
    fetch("data/categories.json")
        .then(response => response.json())
        .then(data => {
            const item = data[model_id];

            if (item) {
                // Set H1 title
                var h1 = document.getElementById("model-name");
                h1.textContent = item.title;
            } else {
                console.log("Item " + model_id + " not found.")
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });

    // Fetch the JSON data to get list of models
    fetch("data/models/" + model_id + "-models.json")
        .then(response => response.json())
        .then(data => {
            // Container
            var container = document.getElementById("container");

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];

                    // Create a div element
                    var div = document.createElement("div");
                    div.classList.add("category-item")
                    div.addEventListener("click", function () {
                        window.location.href = "services.html?category=" + model_id + "&model=" + key;
                    });

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
                }
            }
        })
})