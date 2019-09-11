const MAPBOX_STYLE = {
    "from": "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Public_Access/VectorTileServer/resources/styles",
    "spriteJSON": "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Public_Access/VectorTileServer/resources/sprites/sprite.json",
    "spriteIMG": "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Public_Access/VectorTileServer/resources/sprites/sprite.png",

    "version": 8,
    "sprite": "../sprites/sprite",
    "glyphs": "../fonts/{fontstack}/{range}.pbf",
    "sources": {
    "esri": {
    "type": "vector",
    "url": "../../"
}
},
"layers": [
{
"id": "Public Access/Terrestrial - Closed Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
0
],
"layout": {},
"paint": {
"fill-color": "#FFF0C9"
}
},
{
"id": "Public Access/Terrestrial - Open Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
1
],
"layout": {},
"paint": {
"fill-color": "#80C535"
}
},
{
"id": "Public Access/Terrestrial - Restricted Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
2
],
"layout": {},
"paint": {
"fill-color": "#64B484"
}
},
{
"id": "Public Access/Marine Area - Closed Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
4
],
"layout": {},
"paint": {
"fill-pattern": "Public Access/Marine Area - Closed Access"
}
},
{
"id": "Public Access/Marine Area - Open Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
5
],
"layout": {},
"paint": {
"fill-pattern": "Public Access/Marine Area - Open Access"
}
},
{
"id": "Public Access/Marine Area - Restricted Access",
"type": "fill",
"source": "esri",
"source-layer": "Public Access",
"filter": [
"==",
"_symbol",
6
],
"layout": {},
"paint": {
"fill-pattern": "Public Access/Marine Area - Restricted Access"
}
}
]
}
