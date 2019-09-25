
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    // ualUrl : "http://localhost:4040"
    ualUrl : 'https://ual.geoplatform.gov'
});


let STYLES = geoplatform.mapcore.parseMapBoxStyle( MAPBOX_STYLE );

// console.log("Parsed style: ");
// console.log(JSON.stringify(STYLES, null, ' '));
// console.log(" ");
//
// const properties = {
//     _symbol: 2
// };
// Object.keys(STYLES).forEach(key => {
//     let style = STYLES[key](properties, 1, 'polygon');
//     console.log("Layer " + key + " Style:");
//     console.log(JSON.stringify(style, null, ' '));
// });




let elem = document.getElementById('map');
let mapOptions = {
    center        : [38, -80],
    zoom          : 12,
    minZoom       : 2,
    maxZoom       : 21,
    maxBounds     : [[-90,-180],[90,180]],
    tap           : true,
    touchZoom     : true,
    loadingControl: true
};
let leafletMap = L.map(elem, mapOptions);

let mapInstance = geoplatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Layer Error : " + e.id + " - " + e.message);
});

let esriResource = {
    // contentId: "dac59ebb69c91261115d56b5d43958e2",
    href: 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Protected_Areas_By_Manager/VectorTileServer/resources/styles',

    label: "default style",
    mediaType: "application/javascript",
    role: {
        id: "53983c42978cd510a5f844ec0a0c6c2b",
        label: "default styling",
        prefLabel: "default styling",
        resourceType: ["OnlineFunction"],
        type: "skos:Concept",
        uri: "http://www.geoplatform.gov/def/OnlineFunction/default_styling"
    },
    type: "AuxiliaryResource"
};

let wetlandsResource = {
    contentId: "dac59ebb69c91261115d56b5d43958e2",
    label: "default style",
    mediaType: "application/javascript",
    role: {
        id: "53983c42978cd510a5f844ec0a0c6c2b",
        label: "default styling",
        prefLabel: "default styling",
        resourceType: ["OnlineFunction"],
        type: "skos:Concept",
        uri: "http://www.geoplatform.gov/def/OnlineFunction/default_styling"
    },
    type: "AuxiliaryResource"
};



//load OpenStreet Map layer using API and set as base layer
geoplatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);

    let vtLayer1 = {
        id: "2ec9952c5c61671183c2199956d97da7",
        type: "Layer",
        label: "Wetlands Vector Tiles",
        layerType: "TileLayer",
        resourceTypes: ['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
        href: "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
    };
    vtLayer1.related = [wetlandsResource];
    mapInstance.addLayers(vtLayer1);


    // let vtLayer2 = {
    //     id: "187d91a6ec2171a22dc40030aae94037",
    //     type: "Layer",
    //     label: "NPS Boundary Tiles",
    //     layerType: "TileLayer",
    //     resourceTypes: ['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
    //     href: "https://s3.amazonaws.com/usace-maptiles-tests/nps-boundary-gz/{z}/{x}/{y}.pbf"
    // };
    // vtLayer2.related = [wetlandsResource];
    // mapInstance.addLayers(vtLayer2);


    let layer = {
        "type":"Layer",
        "id":"test",
        "uri":"afdfad",
        "label":"PADUS_2018_Protected_Areas_By_Manager Vector Tile Layer",
        "layerName":"1",
        "layerType":"TileLayer",
        "extent":{"minx":0,"maxx":0,"miny":0,"maxy":0},
        "href":"https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Protected_Areas_By_Manager/VectorTileServer/tile/{z}/{y}/{x}.pbf",
        "resourceTypes":["http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer"],
        "related": [esriResource]
    };
    mapInstance.addLayers(layer);


}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
