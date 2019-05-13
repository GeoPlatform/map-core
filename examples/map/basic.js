
//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});

const GeoPlatformMapCore = geoplatform.map;

/*
 * Optionally, refresh list of service types after configuring API endpoint above
 * or continue to use default list provided in library
 */
//GeoPlatformMapCore.ServiceTypes.refresh();


let elem = document.getElementById('map');
let mapOptions = {
    center: [38, -96],
    zoom: 5,
    minZoom: 2,
    maxZoom: 21,
    maxBounds: [[-90,-180],[90,180]],
    tap: true,
    touchZoom:true,
    loadingControl: true
};

let leafletMap = L.map(elem, mapOptions);

if(typeof(L.Control.MiniMap) !== 'undefined') {
    let minimapBaseLayer = GeoPlatformMapCore.OSMLayerFactory();
    new L.Control.MiniMap(minimapBaseLayer,{position:"bottomleft"}).addTo(leafletMap);
}

//referencing GeoPlatformMapCore.MousePosition control using Leaflet shorthand
L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);

L.control.scale().addTo(leafletMap);

let mapInstance = GeoPlatformMapCore.MapFactory.get();
mapInstance.setMap(leafletMap);

// //load OpenStreet Map layer using API and set as base layer
// GeoPlatformMapCore.OSM.get().then(baseLayer => {
GeoPlatformMapCore.DefaultBaseLayer.get().then(baseLayer => {
    mapInstance.setBaseLayer(baseLayer);
}).catch(e => { console.log("Unable to get base layer"); });

// mapInstance.setBaseLayer(null); //should force setting default base layer
