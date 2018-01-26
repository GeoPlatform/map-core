# GeoPlatform Map Core Library
This library provides extensions to Leaflet as well as common functionality used to
work with GeoPlatform Map, Layer, and Service objects.

## Dependencies
This library requires the following dependencies be present in your application:

### Third Party Dependencies

- jquery (2.1+)
- q (1.5+)
- leaflet (1.X+)
- leaflet-plugins (1.2+)
- esri-leaflet (2.1+)
- leaflet.markercluster (1.X+)
- leaflet-timedimension (1.X+)

### GeoPlatform Dependencies
- ng-common

### Miscellaneous Dependencies

Map core should be included in your app _after_ you provided environment-specific
configuration variables. It expects `window.GeoPlatform` to exist at runtime.

```html
<script src="config.js"></script>
<script src="geoplatform.common.js"></script>
<script src="geoplatform.mapcore.js"></script>
```

## Usage

### Maps

#### Creating a new map instance

```javascript
//create a Leaflet Map
let leafletMap = L.Map('#map', { ... });

//create a map instance
let mapInstance = L.GeoPlatform.MapFactory();

//bind leaflet map to the map instance so the leaflet
// map can be modified through the map instance api
mapInstance.setMap(leafletMap);
```

#### Listening for events

```javascript

//listen for layer modification events
mapInstance.on('layers:changed', () => {
    let layers = mapInstance.getLayers();
});
```

#### Modifying map state

```javascript
//center on lat,lng with zoom
mapInstance.setView(39, -76, 5);
mapInstance.setZoom(3); //update zoom
```

#### Loading a GeoPlatform Map object

```javascript
mapInstance.loadMap(mapId).then( mapObj => {
    //do stuff to the newly-loaded map

    //get loaded base layer object
    let blObj = mapInstance.getBaseLayer();

    //get layer states (wrappers around layers)
    let layerStates = mapInstance.getLayers();

});
```

#### Disposing of a Map Instance
When no longer needed, you should dispose of the map instance.
```javascript
mapInstance.destroyMap();
```

### Layers

#### Creating Leaflet instances for GeoPlatform Layer objects
Map core provides a factory for converting GeoPlatform Layer objects
into Leaflet layer instances. This factory uses the layer's metadata to
determine the appropriate Leaflet class to instantiate. In most cases, the
service type of the Service linked to the Layer is used to make this determination.  
The list of supported map service types can be accessed using `GeoPlatform.ServiceTypes`.

```javascript
let gpLayer = { type: "Layer", services: [{...}], ... };
let leafletLayer = L.GeoPlatform.LayerFactory(gpLayer);
```

#### Adding new layers to a map instance
```javascript
let layers = [];
let geoplatformLayer = { ... }; //layer from GP API
layers.push(L.GeoPlatform.LayerFactory(geoplatformLayer));
mapInstance.addLayers(layers);
```

#### Removing layers from a map instance
```javascript
mapInstance.removeLayer(gpLayerId);
```

#### Re-ordering layers in a map instance
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

Map core feature support uses GeoJSON-encoded feature information. Each feature
should be uniquely identified using a property named `id` inside the
feature's `properties` object. Optionally, custom style information may be provided
using the `style` property (see below).

#### Adding Features
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
