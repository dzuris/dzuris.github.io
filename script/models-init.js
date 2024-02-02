document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get value
    const model_id = urlParams.get('model');
    const submodel_id = urlParams.get('submodel');

    var modelNameSpan = document.getElementById("model-name");
    var pageTitle = await get_title(model_id);

    var modelsFilePath = "";
    if (submodel_id) {
        var subTitle = await get_subtitle(model_id, submodel_id);        
        modelNameSpan.textContent = pageTitle + " " + subTitle;
        modelsFilePath = "data/models/" + model_id + "/" + submodel_id + "-models.json";
    } else {
        modelNameSpan.textContent = pageTitle;
        modelsFilePath = "data/models/" + model_id + "-models.json";
    }

    // Fetch all the data to the models.html page
    fetch_models(modelsFilePath, model_id, submodel_id);
});

/**
 * This function is used to obtain item title from categories json according to its id
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

/**
 * This function fetches data into models page
 */
function fetch_models(filePath, model_id, submodel_id) {

    // Fetch the JSON data to get list of models
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            // Container
            var container = document.getElementById("container");

            for (const key in data) {
                const item = data[key];

                // Create a div element
                var div = document.createElement("div");
                div.classList.add("category-item");

                // On click href to another location according to if item has Submodel
                div.addEventListener("click", function () {
                    window.location.href = getModelHrefLocation(model_id, item.hasSubmodels, submodel_id, key);
                });

                // Create and append an image element
                var img = document.createElement("img");
                img.src = item.photoUrl;
                img.alt = item.title;
                div.appendChild(img);

                // Create and append a span element
                var span = document.createElement("span");
                span.textContent = item.title;
                div.appendChild(span);

                // Added designation for some models and append it to div
                if (item.designation) {
                    var designationSpan = document.createElement("span");
                    designationSpan.classList.add("designation");
                    designationSpan.textContent = "( " + item.designation + " )";
                    div.appendChild(designationSpan);
                }

                // Append the div to the categories
                container.appendChild(div);
            }
        });
}

/**
 * Generates the href location for a model based on parameters.
 * @param {string} model_id - The ID of the main model.
 * @param {boolean} hasSubmodels - Indicates if the model has submodels.
 * @param {string} submodel_id - The ID of the submodel.
 * @param {string} key - The key associated with the model or submodel.
 * @returns {string} - The generated href location.
 */
function getModelHrefLocation(model_id, hasSubmodels, submodel_id, key) {
    // If the model has submodels, navigate to models.html with model_id and submodel key.
    if (hasSubmodels) {
        return "models.html?model=" + model_id + "&submodel=" + key;
    } else {
        // If submodel_id is provided, navigate to services.html with category, model, and submodel keys.
        if (submodel_id) {
            return "services.html?category=" + model_id + "&model=" + submodel_id + "&submodel=" + key;
        } else {
            // If no submodel_id, navigate to services.html with category and model keys.
            return "services.html?category=" + model_id + "&model=" + key;
        }
    }
}
