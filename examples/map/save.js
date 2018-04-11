//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});

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
let mapInstance = GeoPlatformMapCore.MapFactory.get();
mapInstance.setMap(leafletMap);


//---------------------------------------------------------
//Necessary to save a map using authorized endpoints in UAL
let httpClient = new GeoPlatformClient.JQueryHttpClient();
httpClient.setAuthToken(function() {
    return null;    //SHOULD return valid auth token
});
mapInstance.setHttpClient(httpClient);
//---------------------------------------------------------


GeoPlatformMapCore.OSM.get().then(osm => {

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
