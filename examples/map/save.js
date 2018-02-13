
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
let mapInstance = GeoPlatform.MapFactory.get();
mapInstance.setMap(leafletMap);


//---------------------------------------------------------
//Necessary to save a map using authorized endpoints in UAL
let httpClient = new GeoPlatform.JQueryHttpClient();
httpClient.setAuthToken(function() {
    return null;    //SHOULD return valid auth token
});
mapInstance.setHttpClient(httpClient);
//---------------------------------------------------------


GeoPlatform.OSM.get().then(osm => {

    mapInstance.setBaseLayer(osm);

    let metadata = {
        label: "My Map",
        description: "This is a map",
        keywords: ["Map", "GeoPlatform"],
        createdBy: "test_user"
    };
    return mapInstance.saveMap(metadata);

})
.then( persisted => {
    console.log("Saved Map!");
})
.catch(e => { console.log(e.message); });
