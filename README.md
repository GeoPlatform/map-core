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
<script src="env.js"></script>
<script src="geoplatform.common.js"></script>
<script src="geoplatform.mapcore.js"></script>
```

## Using Map Core
Using map core functionality in an application is described in the following sections.

### Map instances
To learn how to bind GeoPlatform Maps, Layers, and GeoJSON features to
Leaflet maps, see the [Map Instances](src/map/instance.md) documentation.

### GeoPlatform APIs
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) documentation.
