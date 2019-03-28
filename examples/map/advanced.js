
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

if(typeof(L.Control.MiniMap) !== 'undefined') {
    let minimapBaseLayer = GeoPlatformMapCore.OSMLayerFactory();
    new L.Control.MiniMap(minimapBaseLayer,{position:"bottomleft"}).addTo(leafletMap);
}

//referencing GeoPlatformMapCore.MousePosition control using Leaflet shorthand
L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);
L.control.scale().addTo(leafletMap);
// L.Control.loading().addTo(leafletMap);


let mapInstance = GeoPlatformMapCore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Error Handler : " + e.id + " - " + e.message);
});

//load OpenStreet Map layer using API and set as base layer
GeoPlatformMapCore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);

    let http = new GeoPlatformClient.JQueryHttpClient();
    let lyrSvc = new GeoPlatformClient.LayerService('https://sit-ual.geoplatform.us', http);

    let promises = [

        //Fetch Image layer
        lyrSvc.get('2e738952d5cf2b50c2f4ebd63cf06416')
        .catch(e => { console.log("Unable to add Image layer: " + e.message); return null; }),

        //Fetch WMS layer
        lyrSvc.get('6f43f89ea70529a0e4ae918564e502e8')
        .catch(e => { console.log("Unable to add raster layer: " + e.message); return null; }),

        //Fetch WMTS layer
        lyrSvc.get('203224548affc2da4ba4a372066da614')
        .catch(e => {console.log("Unable to add wmts layer: " + e.message); return null; }),

        //Fetch Feature Layer
        lyrSvc.get('de7c39d1195dde556e5f0748f2f1efb9')
        .catch(e=> { console.log("Unable to add feature layer: " + e.message); return null; }),

        //Fetch GeoJSON feed layer
        lyrSvc.get('241771f5dd0082286d6fef45541203fe')
        .catch(e => { console.log("Unable to add geojson layer: " + e.message); return null; })

    ];
    Q.allSettled(promises).then(results => {

        let layers = results.filter(r=>r.state==='fulfilled').map(r=>r.value);
        mapInstance.addLayers(layers);

        mapInstance.getLayers().forEach( layerState => {
            let id = layerState.layer.id;
            let label = layerState.layer.label;
            let btn = '<div><button type="button" onClick="toggle(\'' + id + '\')">' + label + '</button></div>';
            jQuery(document.body).append(btn);
        });
    });

}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});


function toggle(layerId) {
    mapInstance.toggleLayerVisibility(layerId);
}
