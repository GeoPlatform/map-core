
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : "http://localhost:4040"
    // ualUrl : 'https://ual.geoplatform.gov'
});

// let fn = function(properties, zoom, type) {
//     let color = '#AD816E';
//     switch(properties.WETLAND_TYPE) {
//         case "Estuarine and Marine Deepwater": color = "#097F8B"; break;
//         case "Estuarine and Marine Wetland": color = "#73BAA7"; break;
//         case "Freshwater Emergent Wetland": color = "#87C023"; break;
//         case "Freshwater Forested/Shrub Wetland": color = "#108034"; break;
//         case "Freshwater Pond": color = "#688FB6"; break;
//         case "Lake": color = "#100673"; break;
//         case "Riverine": color = "#048DB9"; break;
//         default: color = "#AD816E";
//     }
//     return {
//         color: color,
//         fillColor: color,
//         opacity: 1,
//         fillOpacity: 0.6
//     };
// };
// let STYLES = {
//     nc_wetlands: fn,
//     va_wetlands: fn
// }

let STYLES = geoplatform.mapcore.parseMapBoxStyle( MAPBOX_STYLE );

//test feature to use to evaluate parsed style
const properties = {
    WETLAND_TYPE: "Lake"
};
Object.keys(STYLES).forEach(key => {
    let style = STYLES[key](properties, 1, 'polygon');
    console.log("Layer " + key + " Style:");
    console.log(JSON.stringify(style, null, ' '));
});

// console.log(JSON.stringify(STYLES, null, ' '));



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

let styleResource = {
    contentId: "dac59ebb69c91261115d56b5d43958e2",
    label: "default style",
    mediaType: "application/javascript",
    role: {
        description: "default styling document provided",
        id: "53983c42978cd510a5f844ec0a0c6c2b",
        label: "default styling",
        modified: 1566852608477,
        path: "http://www.geoplatform.gov/def/OnlineFunction/default_styling",
        prefLabel: "default styling",
        resourceType: ["OnlineFunction"],
        type: "skos:Concept",
        uri: "http://www.geoplatform.gov/def/OnlineFunction/default_styling",
        _created: 1566852608477,
        _createdBy: "gp-admin",
        _enriched: true,
        _lastModifiedBy: "gp-admin",
        _modified: 1566852608477,
        _status: "current",
        _versionId: 1,
        _visibility: "public"
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
    vtLayer1.related = [styleResource];
    mapInstance.addLayers(vtLayer1);


    let vtLayer2 = {
        id: "187d91a6ec2171a22dc40030aae94037",
        type: "Layer",
        label: "NPS Boundary Tiles",
        layerType: "TileLayer",
        resourceTypes: ['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
        href: "https://s3.amazonaws.com/usace-maptiles-tests/nps-boundary-gz/{z}/{x}/{y}.pbf"
    };
    vtLayer2.related = [styleResource];
    mapInstance.addLayers(vtLayer2);


}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
