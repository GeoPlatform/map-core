# GeoPlatform Map Core Library
This library provides extensions to Leaflet as well as common functionality used to
work with GeoPlatform Map, Layer, and Service objects.

## Dependencies
This library requires the following dependencies be present in your application:

### Third Party Dependencies

- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+
- [Leaflet](https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.js) - version 1.X+
- [Esri Leaflet](https://cdnjs.cloudflare.com/ajax/libs/esri-leaflet/2.1.2/esri-leaflet.js) - version 2.1+
- [Leaflet.markercluster](https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.3.0/leaflet.markercluster.js) - version 1.X+
- [Leaflet TimeDimension](https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.0/dist/leaflet.timedimension.src.js) - version 1.X+
- [ISO8601 JS Period](https://cdn.jsdelivr.net/npm/iso8601-js-period@0.2.1/iso8601.min.js) - version 0.2.X



### GeoPlatform Dependencies
- [ng-common](https://github.com/GeoPlatform/ng-common)


### Miscellaneous Dependencies

Map core should be included in your app _after_ you provided environment-specific
configuration variables. It expects `window.GeoPlatform` to exist at runtime.

```html
<!-- define 'GeoPlatform' namespace and set env variables-->
<script src="env.js"></script>
<!-- include ng-common -->
<script src="geoplatform.common.js"></script>
<!-- include map core -->
<script src="geoplatform.mapcore.js"></script>
```

If you are using Angular 1.x, import the mapcore.ng.js file to get access to
"NG" services which leverage Angular's $http service when fetching data.

```html
<script src="geoplatform.mapcore.ng.js"></script>
```

## Environment Variables
An example of the `GeoPlatform` object and environment variables contained
within is shown below.

```javascript
GeoPlatform = {

    //environment the application is deployed within
    "env" : "development",

    //URLs to GeoPlatform identity management services
    "idmUrl" : "https://sitidp.geoplatform.us",
    "idspUrl" : "https://sitsp.geoplatform.us",

    //URL to GeoPlatform UAL for API usage
    "ualUrl" : "https://sit-ual.geoplatform.us",

    //timeout max for requests
    "timeout" : "5000",

    //name of custom Leaflet pane to append layers to
    "leafletPane" : "gpmvPane",

    //identifier of GP Layer to use as default base layer
    "defaultBaseLayerId" : "336e91f5f5680e37031b80c9e7a49a4c",

    //{env}-{id} of application deployed
    "appId" : "development-mv"

};
```


## Using Map Core
Using map core functionality in an application is described in the following sections.

### GeoPlatform versus L.GeoPlatform
Map Core populates both the `GeoPlatform` namespace and a sub-namespace, `L.GeoPlatform`, within Leaflet's namespace (`L`).  It is important to realize these two are not interchangeable; `L.GeoPlatform` contains functions, classes, and objects that directly
relate to usage within a Leaflet map, while "GeoPlatform" (no "L" prefix) contains
functions, classes, and objects that do not.

For example, the factory used to create Leaflet layer instances is bound within
the L.GeoPlatform namespace: `L.GeoPlatform.LayerFactory`.  The factory used to create
query objects for use with GeoPlatform API services is bound within the GeoPlatform
namespace: `GeoPlatform.QueryFactory`;

Some additional examples:
- [GeoPlatform.ItemService](src/shared/item-service.js) (and it's subclasses)
- [GeoPlatform.MapFactory](src/map/factory.js) (which creates a MapInstance)
- [GeoPlatform.MapInstance](src/map/instance.js) (which may bind _to a Leaflet Map_ but is not a Leaflet control or extension)

vs

- [L.GeoPlatform.WMS](src/layer/L.GeoPlatform.WMS) (a Leaflet layer instance)
- [L.GeoPlatform.featureStyleResolver](src/shared/style-resolver.js) (used by feature layers to load style info)
- [L.GeoPlatform.featurePopupTemplate](src/shared/L.GeoPlatform.PopupTemplate) (used by feature layers to define popup content)

_Hint:_ If something can only really be used within the context of a Leaflet map,
it's best to define it within the L.GeoPlatform namespace. Otherwise, define it
within the GeoPlatform namespace.

### Map instances
To learn how to bind GeoPlatform Maps, Layers, and GeoJSON features to
Leaflet maps, see the [Map Instances](src/map/instance.md) documentation.

### GeoPlatform APIs
To learn how to use the GeoPlatform API to fetch, create, update, and remove
GeoPlatform Assets, see the [GeoPlatform API](api.md) documentation.

### Using Map Core with Angular
The default services used within Map Core components will still be jQuery-based,
but can be overridden by passing the desired service implementation.

```javascript
//use angular $http to fetch OSM base layer definition
let ngLayerSvc = new GeoPlatform.NGLayerService();
GeoPlatform.OSM.get(ngLayerSvc).then( layer => {...}).catch( e => {...});
```

```javascript
//use angular $http to load and save maps inside MapInstance
let ngMapSvc = new GeoPlatform.NGMapService();
let mapInstance = GeoPlatform.MapFactory.get();
mapInstance.setService(ngMapSvc);
```

### Miscellaneous

#### Conventions
If defining a class or object or constant, use upper case. If defining a function,
use camel case.
