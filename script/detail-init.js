document.addEventListener("DOMContentLoaded", function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get values
    const category_id = urlParams.get('category');
    const model_id = urlParams.get('model');
    const service_id = urlParams.get('service');

    // Fetch the JSON data to get model name
    fetch("data/models/" + category_id + "-models.json")
        .then(response => response.json())
        .then(data => {
            const item = data[model_id];

            if (item) {
                // Set model-name content
                setTextContentById("model-name", item.title);
            } else {
                console.log("Item " + model_id + " not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        });

    // Fetch the JSON data to get service info
    fetch("data/service-items/" + category_id + "/" + model_id + ".json")
        .then(response => response.json())
        .then(data => {
            const item = data[service_id];

            if (item) {
                // Set service elements

                // Service name
                setTextContentById("service-name", item.title);

                // Image
                setImageSrc("detail-img", item.photoUrl);

                // Price
                setTextContentById("detail-price", item.price);

                // Price without tax
                var price_without_tax = item.price * 5 / 6;
                setTextContentById("detail-price-no-tax-num", price_without_tax.toFixed(2));

                // Availability
                var availability_element = document.getElementById("detail-availability");
                if (item.available) {
                    availability_element.textContent = "Kontaktujte nás";
                } else {
                    availability_element.textContent = "Momentálne nedostupné";
                    availability_element.classList.add("non-available");
                }

                // Brief note
                setTextContentById("detail-note", item.note);

                // Detailed description
                data.forEach((item) => {
                    const detailDesc = item.detail_desc;

                    if (Array.isArray(detailDesc) && detailDesc.length > 0) {
                        console.log(`${item.name}: Detail description is a list.`);
                    } else if (typeof detailDesc === "string" && detailDesc.trim() !== "") {
                        console.log(`${item.name}: Detail description is a string.`);
                    } else {
                        console.log(`${item.name}: Detail description is empty or not provided.`);
                    }
                });
            } else {
                console.log("Item " + service_id + " not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        })
})

function setTextContentById(elementId, textContent) {
    var e = document.getElementById(elementId);
    e.textContent = textContent;
}

function setTextContentByClass(elementClass, textContent) {
    var e = document.getElementsByClassName(elementClass);
    e.textContent = textContent;
}

function setImageSrc(imgId, imgUrl) {
    var e = document.getElementById(imgId);
    e.src = imgUrl;
}