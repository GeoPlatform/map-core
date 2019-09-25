//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
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
}).catch(e => { console.log("Error setting up map: " + e.message); });


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

    initEditable();


}


function initEditable() {

    //    enable Leaflet.Draw for drawing features

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



// function initEditable() {
//
//     //http://leaflet.github.io/Leaflet.Editable/doc/api.html
//
//
//     //register a feature editor control on the map instance
//     let options = {
//         marker: { icon: 'X' },
//         line: true,
//         polygon: true,
//         rectangle: true,
//         circle: true
//     }
//     let editor = new geoplatform.mapcore.FeatureEditor(mapInstance, options);
//
//     editor.on('feature:created', (feature) => {
//         console.log("Feature Created");
//     });
//
//
//
//     var line = L.polyline([ [38.1292, -77.256], [38.1295, -77.259], [38.1291, -77.261] ]);
//     mapInstance.addFeatureLayer(line);
//     // line.on('dblclick', L.DomEvent.stop).on('dblclick', line.toggleEdit);
//
//
//     var multi = L.polygon([
//       [
//         [ [38.1239, -77.244], [38.123, -77.253], [38.1252, -77.255], [38.1250, -77.251], [38.1239, -77.244] ],
//         [ [38.124, -77.246], [38.1236, -77.248], [38.12475, -77.250] ],
//         [ [38.124, -77.251], [38.1236, -77.253], [38.12475, -77.254] ]
//       ],
//       [
//         [ [38.1269, -77.246], [38.126, -77.252], [38.1282, -77.255], [38.1280, -77.245] ]
//       ]
//     ]);
//     mapInstance.addFeatureLayer(multi);
//     // multi.on('dblclick', L.DomEvent.stop).on('dblclick', multi.toggleEdit);
//     multi.bindPopup('hi!');
//
//
//     var poly = L.polygon([
//       [ [38.1239, -77.259], [38.123, -77.263], [38.1252, -77.265], [38.1250, -77.261] ],
//       [ [38.124, -77.263], [38.1236, -77.261], [38.12475, -77.262] ]
//     ]);
//     mapInstance.addFeatureLayer(poly);
//     poly.on('dblclick', L.DomEvent.stop).on('dblclick', poly.toggleEdit);
//
//     var rec = L.rectangle([ [38.1235, -77.255], [38.1215, -77.259] ]);
//     mapInstance.addFeatureLayer(rec);
//     //rec.on('dblclick', L.DomEvent.stop).on('dblclick', rec.toggleEdit);
//
//     var circle = L.circle([38.1220, -77.250], {radius: 100});
//     mapInstance.addFeatureLayer(circle);
//     //circle.on('dblclick', L.DomEvent.stop).on('dblclick', circle.toggleEdit);
// }
