
# MapCore `LayerFactory`

```js
import { LayerService, NodeHttpClient, Config } from 'geoplatform.client';
import { LayerFactory, MapInstance } from 'geoplatform.mapcore';

let map = ... //create Leaflet map
let mapInst = ... //create and bind MapCore MapInstance to map

new LayerService(Config.ualUrl, new NodeHttpClient()).get(<LAYER_ID>)
.then( layer => {

    //recommended, will use LayerFactory internally
    mapInst.addLayers([layer]);

    //also works, but not recommended
    // because it prevents MapInstance from tracking
    // the map's state properly
    let leafletLayer = LayerFactory(layer);
    if(leafletLayer) {
        leafletLayer.addTo(map);
    }

})
.catch( e => { ... });
```


# Layer Implementations supported by `LayerFactory`

The following sections show examples of creating leaflet layers for various types of underlying layer objects and services.

## WMS (Web Map Service)

```js
import { LayerFactory, WMS, wms } from 'geoplatform.mapcore';

let wmsLayer = ... //GP Layer Object with WMS Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(wmsLayer);
//create leaflet layer directly using WMS class
let b = new WMS(url, wmsOpts);
//create leaflet layer by passing GP Layer object to convenience function
let c = wms(wmsLayer);
```

## WMTS (Web Map Tile Service)
```js
import { LayerFactory, WMTS, wmts } from 'geoplatform.mapcore';

let wmtsLayer = ... //GP Layer Object with WMTS Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(wmtsLayer);
//create leaflet layer directly using WMS class
let b = new WMTS(url, wmtsOpts);
//create leaflet layer by passing GP Layer object to convenience function
let c = wmts(wmtsLayer);
```

## WMST (Web Map Service with Time)
```js
import { LayerFactory, WMST, wmst } from 'geoplatform.mapcore';

let wmstLayer = ... //GP Layer Object with WMST Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(wmstLayer);
//create leaflet layer directly using WMS class
let b = new WMST(url, wmstOpts);
//create leaflet layer by passing GP Layer object to convenience function
let c = wmst(wmstLayer);
```

## Feature Layer
```js
import { LayerFactory, FeatureLayer } from 'geoplatform.mapcore';

let featureLayer = ... //GP Layer Object with Esri FeatureServer Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(featureLayer);
//create leaflet layer directly using WMS class
let b = new FeatureLayer(url, opts);
```

## Clustered Feature Layer
Like Feature Layers, but render features in clusters to prevent over-saturating the
Leaflet rendering in the client.

```js
import { LayerFactory, clusteredFeatures } from 'geoplatform.mapcore';

import featureLayer = ... // GP Layer object with Esri FeatureServer Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(featureLayer);
//create leaflet layer by passing GP Layer object to convenience function
let b = clusteredFeatures(featureLayer);
```


## GeoJson Feed Layer
```js
import { LayerFactory, geoJsonFeed } from 'geoplatform.mapcore';

import feedLayer = ... // GP Layer object with GeoJSON Feed Service associated

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
let a = LayerFactory(feedLayer);
//create leaflet layer by passing GP Layer object to convenience function
let b = geoJsonFeed(feedLayer);
```

## Esri Tile Layer
Used to display layers hosted by Esri Map Servers

```js
import { LayerFactory, EsriTileLayer } from 'geoplatform.mapcore';

//The following are all equivalent
//...

//create leaflet layer by passing GP Layer object to LayerFactory
import layer = ... // GP Layer object with Esri MapServer Service associated
let a = LayerFactory(layer);

//create leaflet layer by passing GP Layer object to convenience function
let b = new EsriTileLayer(url, opts);
```
