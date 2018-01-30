
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
    let minimapBaseLayer = L.GeoPlatform.osm();
    new L.Control.MiniMap(minimapBaseLayer,{position:"bottomleft"}).addTo(leafletMap);
}

L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);
L.control.scale().addTo(leafletMap);

let mapInstance = GeoPlatform.MapFactory.get();
mapInstance.setMap(leafletMap);

//load OpenStreet Map layer using API and set as base layer
GeoPlatform.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);
}).catch(e => { console.log("Unable to get OSM base layer"); });
