
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});


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
    let minimapBaseLayer = geoplatform.mapcore.OSMLayerFactory();
    new L.Control.MiniMap(minimapBaseLayer,{position:"bottomleft"}).addTo(leafletMap);
}

//referencing geoplatform.mapcore.MousePosition control using Leaflet shorthand
L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);

L.control.scale().addTo(leafletMap);

let mapInstance = geoplatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);

//load OpenStreet Map layer using API and set as base layer
geoplatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);
    handleCircularReference();
}).catch(e => { console.log("Unable to get OSM base layer"); });




function handleCircularReference() {
    let service = {
        type: geoplatform.client.ItemTypes.SERVICE,
        label: "Circular Reference Service",
        serviceType: geoplatform.mapcore.ServiceTypes.WMS,
        href: "http://www.google.com"
    };
    let layer = {
        type: geoplatform.client.ItemTypes.LAYER,
        label: "Circular Reference Layer",
        services: [service],
        layerName: '0',
        layerType: 'RasterLayer'
    };
    service.layers = layer; //<-- circular reference created here

    try {
        mapInstance.addLayers(layer);
        throw new Error("Layer should have generated an error but didn't!");
    } catch(e) {
        if(~e.message.indexOf("didn't")) {
            console.log("Failed to properly handle circular reference");
        } else {
            console.log("Circular reference was caught and error was thrown");
        }
    }
}
