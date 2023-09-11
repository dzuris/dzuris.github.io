# Mobilflex web

Webová stránka založená na HTML, CSS a JavaScript technológiach.

## JSON organizácia

- data/categories.json - subor obsahujuci kategorie (iphone, samsung, xiaomi)
    - data/models/CATEGORY_ID-models.json - subor obsahujuci jednotlive modely pre kategoriu (iphone 11, iphone X...)
        - data/list-items/CATEGORY_ID/MODEL_ID.json - subor obsahujuci polozky pre konkretny model (vymena displeja, vymena baterky...)

## Spustenie vo Visual Studio

1. Je nutné mať nainštalovanú Extension "Live Server" od Ritwick Dey
2. Pravým tlačidlo štiknúť na súbor "index.html" a zvoliť "Open with Live Server"
3. Stránka by sa mala otvoriť v prehliadači

Ak stránka nebude otvorená cez lokálny server, stránka nebude schopná načítať dáta z json súborov