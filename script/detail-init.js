document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get values
    const category_id = urlParams.get('category');
    const model_id = urlParams.get('model');
    const submodel_id = urlParams.get('submodel');
    const service_id = urlParams.get('service');

    // Set model name - page title
    setTextContentById("model-name", await get_title(category_id, model_id, submodel_id));

    // Fetch the JSON data to get service info
    fetch_detail(category_id, model_id, submodel_id, service_id);
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
        model = submodel_id;
        filePath = "data/models/" + category_id + "/" + model_id + "-models.json";
    } else {
        model = model_id;
        filePath = "data/models/" + category_id + "-models.json";
    }

    try {
        const response = await fetch(filePath);
        const data = await response.json();
        const item = data[model];
        if (item) {
            return item.title;
        } else {
            console.log("Item " + model + " not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }
}

function fetch_detail(category_id, model_id, submodel_id, service_id) {
    var filePath = "data/service-items/" + category_id + "/" + model_id;
    if (submodel_id) {
        filePath += "/" + submodel_id;
    }
    filePath += ".json";

    fetch(filePath)
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
                var priceElement = document.getElementById("detail-price");
                if (isNaN(item.price) && item.price === '') {
                    priceElement.classList.add('no-price')
                } else if (!isNaN(item.price)) {
                    priceElement.classList.add('price-num')
                }
                priceElement.textContent = item.price;

                // Time
                if (item.time) {
                    setTextContentById("detail-time", item.time);
                }

                // Info banner price
                if (isNaN(item.price) || item.price === '') {
                    document.getElementById("detail-servis-info").classList.add('no-price')
                }


                // Waiting
                if (item.for_waiting) {
                    setTextContentById("detail-waiting", "Na počkanie")
                }

                // Brief note
                if (item.note) {
                    setTextContentById("detail-note", item.note);
                }

                // Detailed description
                const detailDesc = item.detail_desc;

                if (Array.isArray(detailDesc) && detailDesc.length > 0) {
                    // detail description is a list
                    var detail_desc_container = document.getElementById("detailed-description-text");
                    detailDesc.forEach((item) => {
                        switch (item.cat) {
                            case 1:
                                var p = document.createElement("p");
                                p.innerHTML = item.note;
                                detail_desc_container.appendChild(p);
                                break;
                            case 2:
                                var figure = document.createElement("figure");
                                var caption = document.createElement("figcaption");
                                caption.textContent = item.title;
                                figure.appendChild(caption);
                                var list = document.createElement("ul");
                                list.classList.add("list-detail");
                                item.points.forEach((point) => {
                                    var li = document.createElement("li");
                                    li.innerHTML = point;
                                    list.appendChild(li);
                                });
                                figure.appendChild(list);
                                detail_desc_container.appendChild(figure);
                                break;
                            case 3:
                                var img = document.createElement("img");
                                img.src = item.src;
                                img.alt = "detail description image";
                                detail_desc_container.appendChild(img);
                                break;
                        }
                    })
                } else if (typeof detailDesc === "string" && detailDesc.trim() !== "") {
                    // detail description is a string
                    setTextContentById("detailed-description-text", detailDesc);
                }
            } else {
                console.log("Item " + service_id + " not found.");
            }
        })
        .catch(error => {
            console.error("Error fetching JSON data: ", error);
        })
}

function setTextContentById(elementId, textContent) {
    var e = document.getElementById(elementId);
    e.innerHTML = textContent;
}

function setImageSrc(imgId, imgUrl) {
    var e = document.getElementById(imgId);
    e.src = imgUrl;
}