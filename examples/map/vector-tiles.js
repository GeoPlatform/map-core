
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
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

//referencing geoplatform.mapcore.MousePosition control using Leaflet shorthand
L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);
L.control.scale().addTo(leafletMap);
// L.Control.loading().addTo(leafletMap);


let mapInstance = geoplatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Error Handler : " + e.id + " - " + e.message);
});

//load OpenStreet Map layer using API and set as base layer
geoplatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);

    // var gl = L.mapboxGL({
    // 	style: 'https://raw.githubusercontent.com/osm2vectortiles/mapbox-gl-styles/master/styles/bright-v9-cdn.json',
    // 	accessToken: 'pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA'
    // }).addTo(leafletMap);

    // let vtLayer = {
    //     id: "f41290dac72ecad35b5a039847edb44f",
    //     type: "Layer",
    //     label: "Wetlands Vector Tiles",
    //     layerType: "TileLayer",
    //     resourceTypes: ['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
    //     href: "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
    // };


    let vtLayer = {
        "_modified":1567791162355,"_versionId":2,"_status":"current","type":"Layer",
        "id":"c07d196dbd72012056c88014c63766c2",
        "uri":"http://www.geoplatform.gov/id/layer/189ea273b3514bd0feaf854b7c8e22c3",
        "modified":1567791162355,"label":"test esri vt layer",
        "title":"test esri vt layer","description":"test","classifiers":{},
        "status":"submitted","thumbnail":{"mediaType":"image/png"},
        "layerName":"1","layerType":"TileLayer","legend":{},"temporal":{},
        "created":1567791140919,"createdBy":"patrickn","extent":{"minx":0,"maxx":0,"miny":0,"maxy":0},
        "href":"https://stg-gs.geoplatform.gov/geoserver/gwc/service/tms/1.0.0/National_Address_Database%3Anad-test@EPSG%3A4326@pbf/{z}/{y}/{x}.pbf",
        "lastModifiedBy":"patrickn","visibility":"public",
        "resourceTypes":['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer']
        // ,
        // "related": [{
        //     role: { uri: "http://www.geoplatform.gov/def/OnlineFunction/default_styling" },
        //     label: "default style",
        //     "href": 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Protected_Areas_By_Manager/VectorTileServer/resources/styles'
        // }]
    }

    // let vtLayer = {
    //     "_modified":1567791162355,"_versionId":2,"_status":"current","type":"Layer",
    //     "id":"c07d196dbd72012056c88014c63766c2",
    //     "uri":"http://www.geoplatform.gov/id/layer/189ea273b3514bd0feaf854b7c8e22c3",
    //     "modified":1567791162355,"label":"test esri vt layer",
    //     "title":"test esri vt layer","description":"test","classifiers":{},
    //     "status":"submitted","thumbnail":{"mediaType":"image/png"},
    //     "layerName":"1","layerType":"TileLayer","legend":{},"temporal":{},
    //     "created":1567791140919,"createdBy":"patrickn","extent":{"minx":0,"maxx":0,"miny":0,"maxy":0},
    //     "href":"https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Protected_Areas_By_Manager/VectorTileServer/tile/{z}/{y}/{x}.pbf",
    //     "lastModifiedBy":"patrickn","visibility":"public",
    //     "resourceTypes":['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
    //     "related": [{
    //         role: { uri: "http://www.geoplatform.gov/def/OnlineFunction/default_styling" },
    //         label: "default style",
    //         "href": 'https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/PADUS_2018_Protected_Areas_By_Manager/VectorTileServer/resources/styles'
    //     }]
    // }
    mapInstance.addLayers(vtLayer);


}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
