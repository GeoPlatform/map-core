
//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov',
    env: 'development' //to prevent bumping map's numViews
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


//just for example purposes, find the first map available
let query = GeoPlatformClient.QueryFactory().keywords('WMV');

let service = new GeoPlatformClient.MapService(GeoPlatformClient.Config.ualUrl, new GeoPlatformClient.JQueryHttpClient());

service.search(query)
.then( response => {
    if(response.results.length) {

        //Note: search results do not contain resolved
        // references to properties such as layers and
        // layer services, so we need to specifically
        // fetch the individual map to load it.
        // Can either use MapService.get(id) and
        // then MapInstance.loadMapFromObj(map) or
        // just use MapInstance.loadMap(id);
        let map = response.results[0];

        //either this...
        return mapInstance.loadMap(map.id);

        //or this
        // return service.get(map.id)
        // .then( fullMap => {
        //     mapInstance.loadMapFromObj(fullMap);
        //     return fullMap;
        // }).catch(e => { console.log(e.message); });

    }
})
.catch(e => { console.log(e.message); });
