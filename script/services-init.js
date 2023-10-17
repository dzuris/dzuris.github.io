document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get values
    const category_id = urlParams.get('category');
    const model_id = urlParams.get('model');
    const submodel_id = urlParams.get('submodel');

    // Set model-name content - page title
    var span = document.getElementById("model-name");
    span.textContent = await get_title(category_id, model_id, submodel_id);

    // Show services on page
    fetch_services(category_id, model_id, submodel_id);
})

/**
 * This function obtains title for service page according to given parameters
 * 
 * @param {str} category_id - category (eg. samsung, iphone)
 * @param {str} model_id - model (eg. Galaxy A, Galaxy M)
 * @param {str} submodel_id - submodel (eg. Galaxy A15. Galaxy A20)
 * @returns Title for service page
 */
async function get_title(category_id, model_id, submodel_id) {
    var filePath = "";
    if (submodel_id) {
        filePath = "data/models/" + category_id + "/" + model_id + "-models.json";
    } else {
        filePath = "data/models/" + category_id + "-models.json";
    }

    try {
        const response = await fetch(filePath);
        const data = await response.json();
        const item = data[submodel_id];
        if (item) {
            return item.title;
        } else {
            console.log("Item " + submodel_id + " not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }
}

function fetch_services(category_id, model_id, submodel_id) {
    var filePath = "data/service-items/";
    if (submodel_id) {
        filePath += category_id + "/" + model_id + "/" + submodel_id + ".json";
    } else {
        filePath += category_id + "/" + model_id + ".json";
    }

    console.log(filePath);
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            // Container
            var container = document.getElementById("container");

            // List container
            var listContainer = document.getElementById("list-container");

            // Get href location prefix, only service id will be added in cycle
            var locationHrefPrefix = "detail.html?category=" + category_id + "&model=" + model_id;
            if (submodel_id) {
                locationHrefPrefix += "&submodel=" + submodel_id;
            }
            locationHrefPrefix += "&service=";
    
            // Iteration through all the services
            for (const key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                const item = data[key];

                // ----------------------------------------------------
                // Container
                // Create a div element
                var div = document.createElement("div");
                div.classList.add("service-item");
                div.addEventListener("click", function () {
                    window.location.href = locationHrefPrefix + key;
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

                // Append elements to the div
                div.append(img);
                div.append(title);
                div.append(price);

                // Append div to the container
                container.appendChild(div);

                // ----------------------------------------------------
                // List container
                //Create tr element
                var tr = document.createElement("tr");
                tr.addEventListener("click", function () {
                    window.location.href = locationHrefPrefix + key;
                });

                // Create tds elements
                var tdServiceName = document.createElement("td");
                tdServiceName.textContent = item.title;

                var tdPrice = document.createElement("td");
                tdPrice.textContent = item.price;

                // Append elements to tr
                tr.append(tdServiceName);
                tr.append(tdPrice);

                // Append tr to the list container
                listContainer.appendChild(tr);
            }

            for (const key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }

                const item = data[key];

                
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });
}