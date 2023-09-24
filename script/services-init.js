document.addEventListener("DOMContentLoaded", function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get values
    const category_id = urlParams.get('category');
    const model_id = urlParams.get('model');

    // Fetch the JSON data to get model-name content
    fetch("data/models/" + category_id + "-models.json")
        .then(response => response.json())
        .then(data => {
            const item = data[model_id];

            if (item) {
                // Set model-name content
                var span = document.getElementById("model-name");
                span.textContent = item.title;
            } else {
                console.log("Item " + model_id + " not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });

    // Fetch the JSON data to get services
    fetch("data/service-items/" + category_id + "/" + model_id + ".json")
        .then(response => response.json())
        .then(data => {
            // Container
            var container = document.getElementById("container");

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];

                    // Create a div element
                    var div = document.createElement("div");
                    div.classList.add("service-item");
                    div.addEventListener("click", function () {
                        window.location.href = "detail.html?category=" + category_id + "&model=" + model_id + "&service=" + key;
                    });

                    // Img element
                    var img = document.createElement("img");
                    img.src = item.photoUrl;
                    img.alt = item.title;

                    // Title element
                    var title = document.createElement("h3");
                    title.classList.add("title");
                    title.textContent = item.title;

                    // Price element
                    var price = document.createElement("span");
                    price.classList.add("price");
                    price.textContent = item.price;

                    // Note element
                    var note = document.createElement("p");
                    note.classList.add("note");
                    note.textContent = item.note;

                    // Append elements to the div
                    div.append(img);
                    div.append(title);
                    div.append(price);
                    div.append(note);

                    // Append div to the container
                    container.appendChild(div);
                }
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });
})