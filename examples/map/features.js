
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
var mapInstance = L.GeoPlatform.MapFactory.get();
mapInstance.setMap(leafletMap);

mapInstance.setBaseLayer(L.GeoPlatform.osm());


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
