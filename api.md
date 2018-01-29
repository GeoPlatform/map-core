# GeoPlatform APIs

## Maps
To search, retrieve, update, and delete GeoPlatform Map objects using
the GeoPlatform API, use an instance of GeoPlatform.MapService. One exists
by default using the lowercase convention:

```javascript
GeoPlatform.mapService().get(mapId).then( map => {...}).catch(e=>{...});
```

You can also create an instance and override behavior.
```javascript
let service = new GeoPlatform.MapService();
service.get = function(id) {
     return GeoPlatform.MapService.prototype.get.call(this, id);
};
```


## Layers
To search, retrieve, update, and delete GeoPlatform Layer objects using
the GeoPlatform API, use an instance of GeoPlatform.LayerService. One exists
by default using the lowercase convention:

```javascript
GeoPlatform.layerService().get(layerId).then( layer => {...}).catch(e=>{...});
```

You can also create an instance and override behavior.
```javascript
let service = new GeoPlatform.LayerService();
service.get = function(id) {
     return GeoPlatform.LayerService.prototype.get.call(this, id);
};
```


## Services
To search, retrieve, update, and delete GeoPlatform Service objects using
the GeoPlatform API, use an instance of GeoPlatform.ServiceService. One exists
by default using the lowercase convention:

```javascript
GeoPlatform.serviceService().get(serviceId).then( service => {...}).catch(e=>{...});
```

You can also create an instance and override behavior.
```javascript
let service = new GeoPlatform.ServiceService();
service.get = function(id) {
     return GeoPlatform.ServiceService.prototype.get.call(this, id);
};
```
