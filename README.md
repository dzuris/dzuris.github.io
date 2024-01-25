# Mobilflex web

Webová stránka založená na HTML, CSS a JavaScript technológiach.

## JSON organizácia

- data/categories.json - súbor obsahujuci kategórie (iphone, samsung, xiaomi)
    - data/models/CATEGORY_ID-models.json - súbor obsahujúci jednotlivé modely pre kategóriu (iphone 11, iphone X...)
        - data/list-items/CATEGORY_ID/MODEL_ID.json - súbor obsahujúci položky pre konkrétny model (výmena displeja, výmena baterky...)

- detail_desc:
  - Category 1:
    - { "cat": 1, "note": "Note text" }
  - Category 2:
    - { "cat": 2, "title": "Title text", "points": [ "This is point 1", "This is point 2" ]}
  - Category 3:
    - { "cat": 3, "src": "image/path/src.png" }

## Spustenie vo Visual Studio

1. Je nutné mať nainštalovanú Extension "Live Server" od Ritwick Dey
2. Pravým tlačidlom štiknúť na súbor "index.html" a zvoliť "Open with Live Server"
3. Stránka by sa mala otvoriť v prehliadači

Ak stránka nebude otvorená cez lokálny server, nebude schopná načítať dáta z json súborov.

### Autor
Adam Dzurilla  
adamdzurilla19@gmail.com