# GeoPlatform Map Core Library
This library provides extensions to Leaflet as well as common functionality used to
work with GeoPlatform Map, Layer, and Service objects.

## Dependencies
This library requires the following dependencies be present in your application:
- jquery (2.1+)
- q (1.5+)
- leaflet (1.X+)
- leaflet-plugins (1.2+)
- esri-leaflet (2.1+)
- leaflet.markercluster (1.X+)
- leaflet-timedimension (1.X+)


## Usage

```javascript

let mapInstance = L.GeoPlatform.MapFactory();

//load map using its ID
mapInstance.loadMap(mapId);

//manually add new layers
let layers = [];
let geoplatformLayer = { ... }; //layer from GP API
layers.push(L.GeoPlatform.LayerFactory(geoplatformLayer));
mapInstance.addLayers(layers);

//add features using GeoJSON
let geoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-78,39]
            }
        }
    ]
};
mapInstance.addFeatures(geoJson);


//save map
mapInstance.saveMap().then( mapObj => {...}).catch(e => {...});

```
