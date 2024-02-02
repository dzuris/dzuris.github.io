document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get value
    const model_id = urlParams.get('model');
    const submodel_id = urlParams.get('submodel');

    var span = document.getElementById("model-name");
    var title = await get_title(model_id);

    var modelsFilePath = "";
    if (submodel_id) {
        var subTitle = await get_subtitle(model_id, submodel_id);        
        span.textContent = title + " " + subTitle;
        modelsFilePath = "data/models/" + model_id + "/" + submodel_id + "-models.json";
    } else {
        span.textContent = title;
        modelsFilePath = "data/models/" + model_id + "-models.json";
    }

    fetch_models(modelsFilePath, model_id, submodel_id);
});

/**
 * This function is used to obtain item title from categories json according to id
 * 
 * @param {str} model_id - category id for obtaining specific item
 * @returns {str} Category item title
 */
async function get_title(model_id) {
    try {
        const response = await fetch("data/categories.json");
        const data = await response.json();
        const item = data[model_id];
        if (item) {
            return item.title;
        } else {
            console.log("Item " + model_id + " not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }
}

/**
 * This function is used to obtain model title from models json according to category id and pick item according to model id
 * 
 * @param {str} category_id 
 * @param {str} model_id 
 * @returns {str} Submodel title
 */
async function get_subtitle(category_id, model_id) {
    try {
        const response = await fetch("data/models/" + category_id + "-models.json");
        const data = await response.json();
        const item = data[model_id];
        if (item) {
            return item.title;
        } else {
            console.log("Item " + model_id + " not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }
}

function fetch_models(filePath, model_id, submodel_id) {

    // Fetch the JSON data to get list of models
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            // Container
            var container = document.getElementById("container");

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const item = data[key];

                    // Create a div element
                    var div = document.createElement("div");
                    div.classList.add("category-item");

                    // On click href to another location according to if item has Submodel
                    if (item.hasSubmodels) {
                        div.addEventListener("click", function () {
                            window.location.href = "models.html?model=" + model_id + "&submodel=" + key;
                        });
                    } else {
                        if (submodel_id) {
                            div.addEventListener("click", function () {
                                window.location.href = "services.html?category=" + model_id + "&model=" + submodel_id + "&submodel=" + key;
                            });
                        } else {
                            div.addEventListener("click", function () {
                                window.location.href = "services.html?category=" + model_id + "&model=" + key;
                            });
                        }
                    }

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

                    if (item.designation) {
                        var designationSpan = document.createElement("span");
                        designationSpan.classList.add("designation");
                        designationSpan.textContent = "( " + item.designation + " )";
                        div.appendChild(designationSpan);
                    }

                    // Append the div to the categories
                    container.appendChild(div);
                }
            }
        });
}