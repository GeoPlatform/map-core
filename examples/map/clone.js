

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
mapInstance.load(L.GeoPlatform.osm());

//just for example purposes, find the first map available
GeoPlatform.mapService.search().then( response => {
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
        mapInstance.loadMap(map.id)
        .then( () => {

            //Must override certain properties like
            // id, uri, createdBy, and modified
            // should also update label
            let md = {
                id: null,       //will get assigned by API
                uri: null,      //will get assigned by API
                modified: null, //will get assigned by API
                createdBy: 'test_user',
                label: 'Copy of ' + map.label
            };
            let mapDef = mapInstance.getMapResourceContent(md);
            this.mapSvc.setAsNewMap(mapDef);
            mapInstance.save();

        })
        .catch( e => console.log(e.message) );

    }
})
.catch(e => { console.log(e.message); });
