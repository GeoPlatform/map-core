
//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});

//refresh list of service types after configuring API endpoint above
GeoPlatformMapCore.ServiceTypes.refresh();


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

//load OpenStreet Map layer using API and set as base layer
GeoPlatformMapCore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);

    let http = new GeoPlatformClient.JQueryHttpClient();
    let lyrSvc = new GeoPlatformClient.LayerService('https://sit-ual.geoplatform.us', http);
    
    //Fetch Image layer
    lyrSvc.get('2647e1ae5acfe155dccb26def8ef2e38')
    .then(layer => mapInstance.addLayers(layer) )
    .then(e => { console.log("Unable to add Image layer: " + e.message); });

    lyrSvc.get('af9b4077549fe6c3367c8faca29cc165')
    .then(layer=> mapInstance.addLayers(layer))
    .catch(e => { console.log("Unable to add raster layer: " + e.message); });

    //Fetch WMTS layer
    lyrSvc.get('1be39433cc19b15838f85b06ed043122')
    .then(layer => mapInstance.addLayers(layer))
    .catch(e => {console.log("Unable to add wmts layer: " + e.message); });

    //Fetch Feature Layer
    lyrSvc.get('dab1ff07221cb500a3ed46fddbdbdcff')
    .then(layer => mapInstance.addLayers(layer))
    .catch(e=> { console.log("Unable to add feature layer: " + e.message); });

    //Fetch GeoJSON feed layer
    lyrSvc.get('92b85301f9da68b83cb3897f42129b87')
    .then(layer => mapInstance.addLayers(layer) )
    .catch(e => { console.log("Unable to add geojson layer: " + e.message); });

}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
