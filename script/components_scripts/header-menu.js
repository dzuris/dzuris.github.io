document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("header-menu").innerHTML = `
<div id="menu-top-info" class="container">
    <div class="contacts">
        <span class="phone"><a href="tel:+421911528064"><i class="fas fa-phone-square-alt"></i>0911 528 064</a></span>
        <span class="mail"><a href="mailto:mobilflex@mobilflex.sk">mobilflex@mobilflex.sk</a></span>
    </div>
    <div class="networks">
        <span class="facebook"><a href="https://www.facebook.com/mobilflex.sk" target="_blank"><i class="fab fa-facebook"></i></a></span>
        <span class="instagram"><a href="https://www.instagram.com/mobilflex/" target="_blank"><i class="fab fa-instagram"></i></a></span>
    </div>
</div>
<div id="menu" class="container">
    <div class="logo">
        <a href="/">
            <img src="img/logo.png" alt="mobilflex logo">
        </a>
    </div>
    <nav>
        <ul>
            <li class="menu-item">
                <a href="#">Servis <i class="fas fa-caret-down"></i></a>
                <div class="dropdown-content">
                    <ul id="dropdownItems">
                        <li><a href="/#services">Mobilné telefóny</a></li>
                    </ul>
                </div>
            </li>
            <li>
                <a href="/#contact">Kontakt</a>
            </li>
        </ul>
    </nav>
    <form class="search-form" onsubmit="search(); return false;">
        <input type="text" id="searchQueryText" placeholder="Telefóny, služby..." oninput="enableSubmit()">
        <input type="submit" id="searchSubmitButton" value="Hľadať" disabled>
    </form>
</div>`;

    // JavaScript for dropdown menu
    var dropdowns = document.querySelectorAll('.menu-item');

    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('click', function () {
            this.querySelector('.dropdown-content').classList.toggle('show');
        });
    });

    window.onclick = function (event) {
        if (!event.target.matches('.menu-item')) {
            var dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(function (dropdown) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    }

    var listOfDevices = await loadDevices();
    var dropdownItemsElement = document.getElementById('dropdownItems');

    for (const key in listOfDevices) {
        const item = listOfDevices[key];

        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = "/info.html?item=" + key;
        anchor.textContent = item.title;
        listItem.appendChild(anchor);
        dropdownItemsElement.appendChild(listItem);
    }

    console.log('List of devices:', listOfDevices);
});

async function loadDevices() {
    try {
        const response = await fetch('data/devices-info.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading devices info:', error);
        return null;
    }
}