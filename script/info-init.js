document.addEventListener("DOMContentLoaded", async function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get value
    const itemId = urlParams.get('item');

    var item = await get_item(itemId);

    // Set page title
    var titleElement = document.getElementById('deviceTitle');
    titleElement.textContent = item.title;

    // Set page text
    var textElement = document.getElementById('device-text');
    textElement.textContent = item.text;

    // Set page image
    var imageElement = document.getElementById("device-img");
    imageElement.src = item.photoUrl;
});

/**
 * The function obtains item from device-info.json according to its id
 * 
 * @param {str} itemId Device id
 * @returns {object} Item with title, text and photoUrl
 */
async function get_item(itemId) {
    try {
        const response = await fetch("data/devices-info.json");
        const data = await response.json();
        const item = data[itemId];
        if (item) {
            return item;
        } else {
            console.log("Item " + itemId + " not found.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching JSON data: ", error);
    }
}