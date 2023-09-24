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

                // Brief note
                setTextContentById("detail-note", item.note);

                // Detailed description
                const detailDesc = item.detail_desc;

                if (Array.isArray(detailDesc) && detailDesc.length > 0) {
                    // detail description is a list
                    var detail_desc_container = document.getElementById("detailed-description-text");
                    detailDesc.forEach((item) => {
                        switch (item.cat) {
                            case 1:
                                var p = document.createElement("p");
                                p.textContent = item.note;
                                detail_desc_container.appendChild(p);
                                break;
                            case 2:
                                var figure = document.createElement("figure");
                                var caption = document.createElement("figcaption");
                                caption.textContent = item.title;
                                figure.appendChild(caption);
                                var list = document.createElement("ul");
                                item.points.forEach((point) => {
                                    var li = document.createElement("li");
                                    li.textContent = point;
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
})

function setTextContentById(elementId, textContent) {
    var e = document.getElementById(elementId);
    e.textContent = textContent;
}

function setImageSrc(imgId, imgUrl) {
    var e = document.getElementById(imgId);
    e.src = imgUrl;
}