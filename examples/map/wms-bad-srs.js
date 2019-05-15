
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    // ualUrl : 'https://sit-ual.geoplatform.us'
    ualUrl : 'http://localhost:4040'
});

/*
 * Optionally, refresh list of service types after configuring API endpoint above
 * or continue to use default list provided in library
 */
//geoplatform.mapcore.ServiceTypes.refresh();


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


let mapInstance = geoplatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Error Handler : " + e.id + " - " + e.message);
});

//load OpenStreet Map layer using API and set as base layer
geoplatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);
    mapInstance.addLayers([LAYER]);
}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});




const LAYER = {
    "id": "cffe70672eb60c60acc7239622ff0858",
    "type": "Layer",
    "uri": "http://www.geoplatform.gov/id/layer/d6d74911fb9e761e540209a35a3456b9",
    "label": "Active Fires (1 day - Terra/MODIS)",
    "title": "Active Fires (1 day - Terra/MODIS)",
    "description": "Active Fires (1 day - Terra/MODIS)",
    "services": [
        {
            "id": "bbae0a28209f25c0ad2f1551b96ef037",
            "type": "regp:Service",
            "uri": "http://www.geoplatform.gov/id/service/7fa68199a3ab0661400f8c12db0fba6a",
            "label": "NASA Earth Observations (NEO) WMS",
            "title": "NASA Earth Observations (NEO) WMS",
            "description": "Remote sensing imagery from NASA Earth Observations (NEO).",
            "href": "https://neo.sci.gsfc.nasa.gov/wms/wms?version=1.1.1&service=WMS",
            "serviceType": {
                "id": "abed5a00c536fb2d7019092c37ed634c",
                "uri": "http://opengis.net/spec/wms",
                "type": "dct:Standard",
                "title": "OGC Web Map Service (WMS)",
                "description": "OGC Web Map Service (WMS)",
                "label": "OGC Web Map Service (WMS)",
                "resourceType": ["ServiceType"]
            }
        }
    ]
};
