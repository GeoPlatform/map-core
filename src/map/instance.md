
# Using Map Instances
The following information details how to use a MapInstance to manipulate and
manage a Leaflet map instance.

## Creating a new map instance

```javascript
//create a Leaflet Map
let leafletMap = L.Map('#map', leafletOptions);

//using es6 import
import { MapFactory, OSM } from 'geoplatform.mapcore';

//or using require()
const MapCore = require('geoplatform.mapcore');
const MapFactory = MapCore.MapFactory;
const OSM = MapCore.OSM;

//or using global variable
const MapFactory = GeoPlatformMapCore.MapFactory;
const OSM = GeoPlatformMapCore.OSM;


//then get new map instance
let mapInstance = MapFactory.get();

//bind leaflet map to the map instance so the leaflet
// map can be modified through the map instance api
mapInstance.setMap(leafletMap);

//fetch the OSM layer from GeoPlatform API and set it as the
// base layer on the map
OSM.get().then( layer => {
    mapInstance.setBaseLayer(layer);
})
```


## Listening for events

```javascript

//listen for layer modification events
let listener = () => { let layers = mapInstance.getLayers() };
mapInstance.on('layers:changed', listener);

//and later, unregister listener
mapInstance.off('layers:changed', listener);
```

## Modifying map state

```javascript
//center on lat,lng with zoom
mapInstance.setView(39, -76, 5);
mapInstance.setZoom(3); //update zoom
```

## Loading a GeoPlatform Map object

```javascript
mapInstance.loadMap(mapId).then( mapObj => {
    //do stuff to the newly-loaded map

    //get loaded base layer object
    let blObj = mapInstance.getBaseLayer();

    //get layer states (wrappers around layers)
    let layerStates = mapInstance.getLayers();

});
```

## Disposing of a Map Instance
When no longer needed, you should dispose of the map instance.
```javascript
mapInstance.destroyMap();
```

## Cached Map Instances
MapFactory caches instances created through it using keys which are available via `instance.getKey()`. You can later retrieve the same instance using its key:
```javascript
let mapKey = "MY_MAP";
let instance = GeoPlatformMapCore.MapFactory.get(mapKey);
```

To dispose of a cached map or clear all cached instances, call `MapFactory.dispose()` passing either a map's key to dispose of only that map instance or no arguments to clear the cache.

__Note:__ Disposing of a single map will call `destroyMap()` on that instance.


## Avoid using the Leaflet API directly
It is important to know that changes to the underlying Leaflet map made
without using the GeoPlatform MapInstance will not be reflected in the state
managed by the MapInstance object.

For example, adding and removing layers directly will prevent being able to
determine accurate map state later:

```javascript
let leafletMap = L.Map('#map', { ... });
let mapInstance = GeoPlatformMapCore.MapFactory.get();
mapInstance.setMap(leafletMap);

leafletMap.addLayer(leafletLayerObj);
let layerStates = mapInstance.getLayers(); //<-- will be empty

mapInstance.addLayer(gpLayerObj);
layerStates = mapInstance.getLayers(); //<-- will have one item
```




## Map Layers

### Creating Leaflet instances for GeoPlatform Layer objects
Map core provides a factory for converting GeoPlatform Layer objects
into Leaflet layer instances. This factory uses the layer's metadata to
determine the appropriate Leaflet class to instantiate. In most cases, the
service type of the Service linked to the Layer is used to make this determination.  
The list of supported map service types can be accessed using `GeoPlatform.ServiceTypes`.

```javascript
let gpLayer = { type: "Layer", services: [{...}], ... };
let leafletLayer = GeoPlatformMapCore.LayerFactory(gpLayer);
```

### Adding new layers to a map instance
```javascript
let layers = [];
let geoplatformLayer = { ... }; //layer from GP API
layers.push(GeoPlatformMapCore.LayerFactory(geoplatformLayer));
mapInstance.addLayers(layers);
```

### Removing layers from a map instance
```javascript
mapInstance.removeLayer(gpLayerId);
```

### Re-ordering layers in a map instance
```javascript
let layers = mapInstance.getLayers();
//move layer to bottom
mapInstance.moveLayer(0, layers.length-1);
```

### Changing layer state
```javascript
mapInstance.toggleLayerVisibility(gpLayerId);
mapInstance.setLayerVisibility(gpLayerId, true);
mapInstance.updateLayerOpacity(gpLayerId, 1.0);
```

### Miscellaneous
```javascript
//get leaflet layer for existing gp layer object already on map
let leafletLayer = mapInstance.getLeafletLayerFor(gpLayerObj);
```


Convenience methods exist for using OpenStreetMap layers, which are used as
default base layers unless otherwise specified.

```javascript
//fetch OSM layer definition using GeoPlatform API
GeoPlatformMapCore.OSM.get().then( osmLayer => {
    mapInstance.setBaseLayer(osmLayer);
});

//test whether a GeoPlatform Layer is OSM or not
let layer = { "type": "Layer", ... };
if( GeoPlatformMapCore.OSM.test(layer) ) {
    console.log("Layer is OSM!");
}

//create a quick, unpersisted OSM Leaflet layer instance
// it's recommended to fetch OSM and add to map that way,
// but this is handy for preview maps, mini maps, and
// similar uses of a map that don't need persistence
let leafletLayer = GeoPlatformMapCore.OSMLayerFactory();
leafletMap.addLayer(leafletLayer);
```



## Map Features

Map core feature support uses GeoJSON-encoded feature information. Each feature
should be uniquely identified using a property named `id` inside the
feature's `properties` object. Optionally, custom style information may be provided
using the `style` property (see below).

### Adding Features
```javascript
let geoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "1",
                "label": "Feature Label",
                "style": {
                    "stroke": '#00f',
                    "opacity": 1.0,
                    "fill": '#0f0',
                    "fillOpacity": 0.3
                }
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-78,39]
            }
        }
    ]
};
mapInstance.addFeatures(geoJson);
```

### Getting Current Features
```javascript
let featureArray = mapInstance.getFeatures();
```

### Modifying features
```javascript
let feature = mapInstance.getFeatures()[0];
feature.geometry = { ... } //update geometry
//uses feature.properties.id to track the feature
mapInstance.updateFeature(feature);
```

### Centering on Feature
```javascript
mapInstance.focusFeature(feature);
```

### Removing Features
```javascript
//remove single feature
let id = mapInstance.getFeatures()[0].properties.id;
mapInstance.removeFeature(id);
//remove all
mapInstance.removeFeatures();
```


## Saving Maps

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

## Map Controls
Included in Map Core are three Leaflet map controls for use with maps:
- [L.Control.Loading](../control/L.Control.Loading.js)
  - _also resolved using `GeoPlatformMapCore.LoadingControl`_
- [L.Control.MeasureControl](../control/L.Control.MeasureControl.js)
  - _also resolved using `GeoPlatformMapCore.MeasureControl`_
- [L.Control.MousePosition](../control/L.Control.MousePosition.js)
  - _also resolved using `GeoPlatformMapCore.MousePosition`_
