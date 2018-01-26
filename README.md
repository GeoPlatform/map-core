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

### Creating a new map instance

```javascript
let mapInstance = L.GeoPlatform.MapFactory();
```

### Listening for events

```javascript

//listen for layer modification events
mapInstance.on('layers:changed', () => {
    let layers = mapInstance.getLayers();
});
```

### Modifying map state

```javascript
//center on lat,lng with zoom
mapInstance.setView(39, -76, 5);
mapInstance.setZoom(3); //update zoom
```

### Loading a GeoPlatform Map object

```javascript
mapInstance.loadMap(mapId).then( mapObj => {
    //do stuff to the newly-loaded map

    //get loaded base layer object
    let blObj = mapInstance.getBaseLayer();

    //get layer states (wrappers around layers)
    let layerStates = mapInstance.getLayers();

});
```

### Disposing of a Map Instance
When no longer needed, you should dispose of the map instance.
```javascript
mapInstance.destroyMap();
```

### Layers

#### Adding new layers
```javascript
let layers = [];
let geoplatformLayer = { ... }; //layer from GP API
layers.push(L.GeoPlatform.LayerFactory(geoplatformLayer));
mapInstance.addLayers(layers);
```

#### Removing layers
```javascript
mapInstance.removeLayer(gpLayerId);
```

#### Re-ordering layers
```javascript
let layers = mapInstance.getLayers();
//move layer to bottom
mapInstance.moveLayer(0, layers.length-1);
```

#### Changing layer state
```javascript
mapInstance.toggleLayerVisibility(gpLayerId);
mapInstance.setLayerVisibility(gpLayerId, true);
mapInstance.updateLayerOpacity(gpLayerId, 1.0);
```

#### Miscellaneous
```javascript
//get leaflet layer for existing gp layer object already on map
let leafletLayer = mapInstance.getLeafletLayerFor(gpLayerObj);
```


### Features

#### Adding Features
```javascript
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
```

#### Getting Current Features
```javascript
let featureArray = mapInstance.getFeatures();
```

#### Modifying features
```javascript
let feature = mapInstance.getFeatures()[0];
feature.geometry = { ... } //update geometry
//uses feature.properties.id to track the feature
mapInstance.updateFeature(feature);
```

#### Centering on Feature
```javascript
mapInstance.focusFeature(feature);
```

#### Removing Features
```javascript
//remove single feature
let id = mapInstance.getFeatures()[0].properties.id;
mapInstance.removeFeature(id);
//remove all
mapInstance.removeFeatures();
```


### Saving Maps

```javascript
//optionally, provide additional metadata about map
let metadata = {
    label: "My Map",
    description: "This is my map"
};
mapInstance.saveMap(metadata)
.then( mapObj => {
    //do something with persisted map info
})
.catch(e => {
    //do something with error
});
```
