//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl: 'http://localhost:4040'
    // ualUrl : 'https://ual.geoplatform.gov'
});

/*
 * Optionally, refresh list of service types after configuring API endpoint above
 * or continue to use default list provided in library
 */
//geoplatform.mapcore.ServiceTypes.refresh();


//NOTE: This example requires the Leaflet.Draw plugin

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

var leafletMap = L.map(elem, mapOptions);
var mapInstance = geoplatform.mapcore.MapFactory.get();
mapInstance.setMap(leafletMap);

//load OpenStreet Map layer using API and set as base layer
geoplatform.mapcore.OSM.get().then(osm => {
    mapInstance.setBaseLayer(osm);
    initFeatures();
}).catch(e => { console.log("Unable to get OSM base layer"); });


function initFeatures() {

    //add a feature manually
    let geoJson = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-90, 40]
        },
        "properties": {
            "id": Math.ceil(Math.random()*9999),
            "name": "Point"
        }
    };
    mapInstance.addFeature(geoJson);





    // http://localhost:4040/api/layers/5dd10ce8b3486f4f1956ecff80f2f0cd/style

    let layers = [{
        extent: {minx: -78.48223100026041, maxx: -57.79715699969576, miny: 23.309621729266357, maxy: 35.67755854867985},
        id: "5dd10ce8b3486f4f1956ecff80f2f0cd",
        layerName: "4",
        layerType: "FeatureLayer",
        maxScale: 0,
        minScale: 0,
        services: [
            {
                href: "https://services2.arcgis.com/OKNnwEOcvx5lXPqr/arcgis/rest/services/Hurricane_Florence/FeatureServer",
                id: "08151f55de77745a64cdfba471d32de8",
                serviceType: {
                    id: "48980c5bad0c8d4666b393874eb5279a",
                    label: "Esri REST Feature Service",
                    resourceType: ["ServiceType"],
                    title: "Esri REST Feature Service",
                    type: "dct:Standard",
                    uri: "http://www.geoplatform.gov/spec/esri-feature-rest"
                },
                title: "Hurricane_Florence",
                type: "regp:Service",
                uri: "http://www.geoplatform.gov/id/service/a5ce094804f3cb1c59b7abe0e24d0b3a"
            }
        ],
        title: "Forecast Wind Field",
        type: "Layer",
        uri: "http://www.geoplatform.gov/id/layer/1f53da8833dda8561551376d1132f7ae"
    }, {
        extent: {minx: -99.5027199196396, maxx: -71.1337300545618, miny: 24.696127871725466, maxy: 42.08805898562924},
        id: "a25dfb28eab8d0c418b0a36e4003e3cf",
        label: "Hurricane_Evacuation_Routes",
        layerName: "0",
        layerType: "FeatureLayer",
        maxScale: 0,
        minScale: 36978596,
        services: [{
            extent: {minx: -99.5027199196396, maxx: -71.1337300545618, miny: 24.696127871725466, maxy: 42.08805898562924},
            href: "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Hurricane_Evacuation_Routes/FeatureServer",
            id: "d691598e63bb778d7a1b5143045478b7",
            serviceType: {
                id: "48980c5bad0c8d4666b393874eb5279a",
                label: "Esri REST Feature Service",
                resourceType: ["ServiceType"],
                title: "Esri REST Feature Service",
                type: "dct:Standard",
                uri: "http://www.geoplatform.gov/spec/esri-feature-rest"
            },
            title: "Hurricane Evacuation Routes",
            type: "regp:Service",
            uri: "http://www.geoplatform.gov/id/service/487883940c7429806f6defc74b4f1cc0"
        }],
        title: "Hurricane_Evacuation_Routes",
        type: "Layer",
        uri: "http://www.geoplatform.gov/id/layer/4a497259912332cfc8f3d946b7322596"
    }];
    mapInstance.addLayers(layers);








    //enable Leaflet.Draw for drawing features

    let shapeOpts = {
        repeatMode: true,
        shapeOptions: {
            stroke: true, color: '#999', weight: 2,
            opacity: 1, fill: true, fillColor: null,
            fillOpacity: 0.2, clickable: false
        }
    };
    let drawOpts = {
        draw: {
            marker: { repeatMode: true },
            polyline : shapeOpts,
            polygon : shapeOpts,
            circle : false,
            rectangle : false
        }
    };

    let draw = new L.Control.Draw(drawOpts);
    leafletMap.on('draw:created', (evt) => {
        var layer = evt.layer;
        mapInstance.addFeature(layer.toGeoJSON());
    });
    leafletMap.addControl(draw);
}
