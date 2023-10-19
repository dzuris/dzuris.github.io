const CATEGORIES_FILE_PATH = "data/categories.json"
const HREF_PREFIX = "models.html?model=";

class Category {
    constructor(title, photoUrl, hrefContent) {
        this.title = title;
        this.photoUrl = photoUrl;
        this.hrefContent = hrefContent;
    }
}

// On page loaded
document.addEventListener("DOMContentLoaded", async function () {
    var container = document.getElementById("categories");
    let categories = await getCategories();
    
    categories.forEach(category => {
        // Create a div element
        var div = document.createElement("div");
        div.classList.add("category-item")
        div.addEventListener("click", function () {
            window.location.href = category.hrefContent;
        });

        // Create an image element
        var img = document.createElement("img");
        img.src = category.photoUrl;
        img.alt = category.title;

        // Create a span element
        var span = document.createElement("span");
        span.textContent = category.title;

        // Append the image and span to the div
        div.appendChild(img);
        div.appendChild(span);

        // Append the div to the categories
        container.appendChild(div);
    })
})

/**
 * The function fetches the JSON file with categories and gets them as classes
 * 
 * @returns List of categories
 */
async function getCategories() {
    let result = [];
    try {
        const response = await fetch(CATEGORIES_FILE_PATH);
        const data = await response.json()
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            const item = data[key];

            let hrefContent = HREF_PREFIX + key;
            let category = new Category(item.title, item.photoUrl, hrefContent);

            result.push(category);
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }

    return result;
}
