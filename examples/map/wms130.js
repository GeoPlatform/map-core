
//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    // ualUrl : 'https://sit-ual.geoplatform.us'

    ualUrl : 'http://localhost:4040',
    timeout: 120000
});

/*
 * Optionally, refresh list of service types after configuring API endpoint above
 * or continue to use default list provided in library
 */
//GeoPlatform.mapcore.ServiceTypes.refresh();


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


let mapInstance = GeoPlatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Error Handler : " + e.id + " - " + e.message);
});

mapInstance.on('layer:error', (err) => {
    console.log(JSON.stringify(err));
});

//load OpenStreet Map layer using API and set as base layer
GeoPlatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);
    mapInstance.addLayers([LAYER]);
}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});




const LAYER = {
    "id": "f6d1b68184c29182975319225c861ed8",
"type": "Layer",
"uri": "http://www.geoplatform.gov/id/layer/fa7f6955e7326fb8bd702cd9f1c3bd80",
"label": "Ozone (8 day)",
"title": "Ozone (8 day)",
"description": "Ozone (8 day)",
    "layerName": "MYDAL2_D_AER_RA",
    "layerType": "RasterLayer",
    "services": [
        {
            "_modified": 1547654727894,
"id": "b7f64ffa2a5053794ccd385bf632b3fe",
"type": "regp:Service",
"uri": "http://www.geoplatform.gov/id/service/28c1e6b24d482452e4c0cf0f808ec426",
"label": "NASA Earth Observations (NEO) WMS",
"title": "NASA Earth Observations (NEO) WMS",
"description": "Remote sensing imagery from NASA Earth Observations (NEO).",
            "href": "https://neo.sci.gsfc.nasa.gov/wms/wms",
            "serviceType": {
                "id": "abed5a00c536fb2d7019092c37ed634c",
                "uri": "http://opengis.net/spec/wms",
                "type": "dct:Standard",
                "title": "OGC Web Map Service (WMS)",
                "description": "OGC Web Map Service (WMS)",
                "label": "OGC Web Map Service (WMS)",
                "resourceType": ["ServiceType"]
            },
            "api": [
                {
                    "accessURL": "http://schemas.opengis.net/wms/1.3.0/",
                    "title": "WMS 1.3.0 Schemas",
                    "type": "regp:APIDocument"
                }
            ]
        }
    ]
};
