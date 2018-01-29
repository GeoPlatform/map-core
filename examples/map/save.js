
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
let mapInstance = L.GeoPlatform.MapFactory();
mapInstance.setMap(leafletMap);

GeoPlatform.osm().then(osm => {

    mapInstance.setBaseLayer(osm);

    let metadata = {
        label: "My Map",
        description: "This is a map",
        keywords: ["Map", "GeoPlatform"],
        createdBy: "test_user"
    };
    mapInstance.saveMap(metadata)
    .then( persisted => {
        console.log("Saved Map!");
    })
    .catch(e => { console.log(e.message); });
    
}).catch(e => { console.log("Unable to get OSM base layer"); });
