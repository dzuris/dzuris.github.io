document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data from the file using fetch API
    fetch("data/categories.json")
        .then(response => response.json())
        .then(data => {
            // Container for side menu
            var container_side_menu = document.getElementById("categories-side-menu");

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];

                    var div = document.createElement("div");
                    div.classList.add("side-menu-item");

                    // Icon
                    var icon = document.createElement("img");
                    icon.src = "img/icons/smartphone.svg"
                    icon.alt = "smartphone icon"

                    // Text
                    var a = document.createElement("a");
                    a.textContent = item.title;
                    a.setAttribute("href", "models.html?model=" + key)

                    div.appendChild(icon);
                    div.appendChild(a);

                    container_side_menu.appendChild(div);
                }
            }

            // Container where the json data will be added
            var container = document.getElementById("categories");
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];

                    // Create a div element
                    var div = document.createElement("div");
                    div.classList.add("category-item")
                    div.addEventListener("click", function () {
                        window.location.href = "models.html?model=" + key;
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
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });
})