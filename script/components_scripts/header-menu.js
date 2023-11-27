document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("header-menu").innerHTML= `
<div id="menu-top-info">
    <div class="contacts">
        <span class="phone"><a href="tel:+421911528064"><i class="fas fa-phone-square-alt"></i>0911 528 064</a></span>
        <span class="mail"><a href="mailto:mobilflex@mobilflex.sk">mobilflex@mobilflex.sk</a></span>
    </div>
    <div class="networks">
        <span class="facebook"><a href="https://www.facebook.com/mobilflex.sk" target="_blank"><i class="fab fa-facebook"></i></a></span>
        <span class="instagram"><a href="https://www.instagram.com/mobilflex/" target="_blank"><i class="fab fa-instagram"></i></a></span>
    </div>
</div>
<div id="menu">
    <div class="logo">
        <a href="/">
            <img src="img/logo.png" alt="mobilflex logo">
        </a>
    </div>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#services">Servis</a></li>
            <li><a href="/#contact">Kontakt</a></li>
        </ul>
    </nav>
    <form class="search-form" onsubmit="search(); return false;">
        <input type="text" id="searchQueryText" placeholder="Telefóny, služby..." oninput="enableSubmit()">
        <input type="submit" id="searchSubmitButton" value="Hľadať" disabled>
    </form>
</div>`;
});