# GeoPlatform Map Core Library
This library provides extensions to Leaflet as well as common functionality used to
work with GeoPlatform Map, Layer, and Service objects.

## Dependencies
This library requires the following dependencies be present in your application:

### Third Party Dependencies

- [Q](https://cdnjs.cloudflare.com/ajax/libs/q.js/1.5.1/q.js) - version 1.5+
- [jQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js) - version 2.1+
- [Leaflet](https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.js) - version 1.X+
- [Esri Leaflet](https://cdnjs.cloudflare.com/ajax/libs/esri-leaflet/2.1.2/esri-leaflet.js) - version 2.1+
- [Leaflet.markercluster](https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.3.0/leaflet.markercluster.js) - version 1.X+
- [Leaflet TimeDimension](https://cdn.jsdelivr.net/npm/leaflet-timedimension@1.1.0/dist/leaflet.timedimension.src.js) - version 1.X+
- [ISO8601 JS Period](https://cdn.jsdelivr.net/npm/iso8601-js-period@0.2.1/iso8601.min.js) - version 0.2.X



### GeoPlatform Dependencies
- [Geoplatform Client API](https://github.com/GeoPlatform/client-api)
  - _requires version XXX_  (branch 'rollup' currently)

### Miscellaneous Requirements
This library expects a set of configured parameters defining things such as the GeoPlatform API endpoint to communicate with and leaflet customizations.  

__Note:__ If you are using a build tool like WebPack, you should ensure the Client API configuration object is properly initialized before using Map Core components.

```js
import { Config } from 'geoplatform.client';
...
//ensure GP API config is set
if(!Config.ualUrl) {
    Config.configure( ...options... );
}
...
//then start importing map core components
import { MapInstance } from 'geoplatform.mapcore';
...
```

__Note:__ You must configure the `GeoPlatformClient.Config` environment
variables in order to utilize certain features of Map Core, such as creating
Leaflet layers using `GeoPlatformMapCore.LayerFactory`.  

```html
<script src="geoplatform.client.js"></script>
<script>
    const Config = require("geoplatform.client").Config;
    Config.configure({
        env: 'development',
        ualUrl: "...",
        appId: "...",
        ...
    });
</script>
<script src="geoplatform.mapcore.js"></script>
```

See [Environment Variables](Environment_Variables) below for details on what is expected to be provided.

### Including Map Core in your app



Alternatively, load Map Core (and Client API) distribution files from CDN:
```html
<script src="http://dyk46gk69472z.cloudfront.net/gp.mapcore/_VERSION_/js/geoplatform.client.js"></script>
<script src="http://dyk46gk69472z.cloudfront.net/gp.mapcore/_VERSION_/js/geoplatform.mapcore.js"></script>
```


## Environment Variables
An example of the environment variables passed to `GeoPlatformClient.Config.configure()` is shown below.

```javascript
{

    //REQUIRED: environment the application is deployed within
    // one of "development" or "production"
    "env" : "development",

    //REQUIRED: URL to GeoPlatform UAL for API usage
    "ualUrl" : "...",

    //optional, timeout max for requests
    "timeout" : "5000",

    //optional, name of custom Leaflet pane to append layers to
    "leafletPane" : "myCustomLeafletPane",

    //optional, identifier of GP Layer to use as default base layer
    "defaultBaseLayerId" : "336e91f5f5680e37031b80c9e7a49a4c",

    //optional, id of client application
    "appId" : "myCustomAppId"

}
```


## Using Map Core
Using map core functionality in an application is described in the following sections.


### Map instances
To learn how to bind GeoPlatform Maps, Layers, and GeoJSON features to
Leaflet maps, see the [Map Instances](src/map/instance.md) documentation.

### Map Layers
To learn how to add GeoPlatform Layer objects to Leaflet maps using MapCore, read
the [LayerFactory](src/layer/factory.md) documentation.

### Using Map Core with Angular
The default services used within Map Core components are jQuery-based,
but can be overridden by passing the desired service implementation.

```javascript
//example using 'GeoPlatformClient' and 'GeoPlatformMapCore' global variables
//use angular $http to fetch OSM base layer definition
let ngLayerSvc = new GeoPlatformClient.LayerService(new GeoPlatformClient.NGHttpClient());
GeoPlatformMapCore.OSM.get(ngLayerSvc).then( layer => {...}).catch( e => {...});
```

To change the underlying service transport used by MapInstance, set the
desired HttpClient implementation like so:

```javascript
//use angular $http to load and save maps inside MapInstance
let mapInstance = GeoPlatformMapCore.MapFactory.get();
mapInstance.setHttpClient(new GeoPlatformClient.NGHttpClient());  //use angular
```


### Miscellaneous

#### Conventions
If defining a class or object or constant, use upper case. If defining a function,
use camel case.
