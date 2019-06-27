
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

    let vtLayer = {
        id: "f41290dac72ecad35b5a039847edb44f",
        type: "Layer",
        label: "Wetlands Vector Tiles",
        layerType: "TileLayer",
        resourceTypes: ['http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer'],
        href: "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
    };
    mapInstance.addLayers(vtLayer);


}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
