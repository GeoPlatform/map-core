
//configure geoplatform env variables needed to interact with the API
GeoPlatformClient.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});


// if(typeof(L.mapboxGL) === 'undefined') {
//     $('#map').html("MapBoxGL layer library was not loaded, check includes and try again");
//     return;
// }
if(typeof(L.vectorGrid) !== 'undefined') {

    /*
     * register a vector tile layer factory
     */
    var LayerFactory = GeoPlatform.mapcore.LayerFactory;
    LayerFactory.register( (layer) => {

        if(!layer) return null;
        let distros = layer.distributions || [];
        if(!distros.length) return null;
        let distro = distros[0];
        if(distro.href.indexOf(".pbf") < 0) return null;

        let styleFn = function(featureProperties, z){
            let fill = '#AD816E';
            // console.log("NC Type: " + featureProperties.WETLAND_TYPE);
            switch(featureProperties.WETLAND_TYPE) {
                case "Estuarine and Marine Deepwater": fill = "#097F8B"; break;
                case "Estuarine and Marine Wetland": fill = "#73BAA7"; break;
                case "Freshwater Emergent Wetland": fill = "#87C023"; break;
                case "Freshwater Forested/Shrub Wetland": fill = "#108034"; break;
                case "Freshwater Pond": fill = "#688FB6"; break;
                case "Lake": fill = "#100673"; break;
                case "Riverine": fill = "#048DB9"; break;
                default: fill = "#AD816E";
            }
            return { color: fill, weight: 1 };
        };

        var styles = {
            "nc_wetlands" : styleFn,
            "va_wetlands": styleFn
        };
        var vtUrl = distro.href;
    	var vtOpts = {
    		rendererFactory: L.canvas.tile,
    		vectorTileLayerStyles: styles,
    	};
    	return L.vectorGrid.protobuf(vtUrl, vtOpts);

    });
} else {
    $(document.body).append("VectorGrid tile layer library was not loaded, check includes and try again");
}



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

//referencing GeoPlatform.mapcore.MousePosition control using Leaflet shorthand
L.control.mousePosition({ separator: ' , ', numDigits: 3 }).addTo(leafletMap);
L.control.scale().addTo(leafletMap);
// L.Control.loading().addTo(leafletMap);


let mapInstance = GeoPlatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);
mapInstance.setErrorHandler( (e) => {
    console.log("Error Handler : " + e.id + " - " + e.message);
});

//load OpenStreet Map layer using API and set as base layer
GeoPlatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);

    // var gl = L.mapboxGL({
    // 	style: 'https://raw.githubusercontent.com/osm2vectortiles/mapbox-gl-styles/master/styles/bright-v9-cdn.json',
    // 	accessToken: 'pk.eyJ1IjoidXNhY2UiLCJhIjoiY2o1MDZscms4MDI4MjMycG1wa3puc212MCJ9.CW7edZMtlx5vFLNF5P-zTA'
    // }).addTo(leafletMap);

    let vtLayer = {
        type: "Layer",
        label: "Wetlands Vector Tiles",
        layerType: "FeatureLayer",
        //the following is a hack and should not be how this is done for reals...
        distributions: [{
            type: "dcat:Distribution",
            href: "https://s3.amazonaws.com/usace-maptiles-tests/wetlands-gz/{z}/{x}/{y}.pbf"
        }]
    };
    mapInstance.addLayers(vtLayer);


}).catch(e => {
    console.log("Unable to get OSM base layer: " + e.message);
});
