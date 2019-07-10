/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import { Layer } from "leaflet";
import * as esri from "esri-leaflet";
import ServiceTypes from "../service/types";
import { clusteredFeatures, geoJsonFeed } from './cluster-feature';
import { wms } from './wms';
import { wmst } from './wmst';
import { wmts } from './wmts';
import ESRITileLayer from './esri-tile-layer';
import OSMLayerFactory from './osm-factory';
import { LayerResourceTypes } from '../shared/resource-types';
import { Config, LayerService, XHRHttpClient } from '@geoplatform/client';
/**
 * @record
 */
function LayerOptions() { }
/** @type {?|undefined} */
LayerOptions.prototype.layers;
/** @type {?|undefined} */
LayerOptions.prototype.transparent;
/** @type {?|undefined} */
LayerOptions.prototype.format;
/** @type {?|undefined} */
LayerOptions.prototype.pane;
/** @type {?|undefined} */
LayerOptions.prototype.srs;
/** @type {?|undefined} */
LayerOptions.prototype.url;
/** @type {?|undefined} */
LayerOptions.prototype.useCors;
;
/*
 * Extend base Leaflet layer class to ensure there's always a function
 * available for modifying zindex and opacity, even if nothing actually
 * happens inside.
 */
Layer.include({
    // Redefining a method
    setZIndex: function (value) {
        //do nothing in this abstract class, let impls do the work
    },
    setOpacity: function (value) {
        //do nothing in this abstract class, let impls do the work
    }
});
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?=} service
 * @return {?}
 */
function styleResolverFactory(service) {
    if (!service || typeof (service.style) !== 'function') {
        throw new Error("Must provide a LayerService instance");
    }
    return function featureStyleResolver(id) {
        return new Promise(function (resolve, reject) {
            service.style(id)
                .then(function (result) { return resolve(result); })
                .catch(function (e) {
                /** @type {?} */
                var msg = "Error loading style information for layer " + id + " : " + e.message;
                reject(new Error(msg));
            });
        });
    };
}
/**
 * Layer Factory
 *
 * Used to instantiate GeoPlatform Layer objects as Leaflet layer instances
 * capable of being rendered on Leaflet maps.
 *
 * Usage:
 *      let leafletLayer = LayerFactory.create(gpLayerObj);
 *
 *
 * Basic layer support is built in, but additional layer types can be supported
 * by registering new factory methods.
 *
 * Example:
 *      LayerFactory.register( (gpLayerObj) => {
 *          let isSupported = false;
 *          //implement test to verify supported layer type
 *          // ...
 *          if(isSupported) {
 *              return new MyCustomLayerClass(gpLayerObj);
 *          }
 *          return null;
 *      });
 *
 */
var /**
 * Layer Factory
 *
 * Used to instantiate GeoPlatform Layer objects as Leaflet layer instances
 * capable of being rendered on Leaflet maps.
 *
 * Usage:
 *      let leafletLayer = LayerFactory.create(gpLayerObj);
 *
 *
 * Basic layer support is built in, but additional layer types can be supported
 * by registering new factory methods.
 *
 * Example:
 *      LayerFactory.register( (gpLayerObj) => {
 *          let isSupported = false;
 *          //implement test to verify supported layer type
 *          // ...
 *          if(isSupported) {
 *              return new MyCustomLayerClass(gpLayerObj);
 *          }
 *          return null;
 *      });
 *
 */
LayerFactory = /** @class */ (function () {
    function LayerFactory() {
        this.factories = []; // A list of configured factory functors to instantiate layers
        this.init();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    LayerFactory.prototype.register = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (typeof (fn) === 'function') {
            this.factories.push(fn);
        }
    };
    /**
     * @param {?} service
     * @return {?}
     */
    LayerFactory.prototype.setLayerService = /**
     * @param {?} service
     * @return {?}
     */
    function (service) {
        this.service = service;
    };
    /**
     */
    /**
     *
     * @return {?}
     */
    LayerFactory.prototype.getStyleResolver = /**
     *
     * @return {?}
     */
    function () {
        if (!this.service || typeof (this.service.style) === 'undefined') {
            this.service = new LayerService(Config["ualUrl"], new XHRHttpClient());
        }
        return styleResolverFactory(this.service);
    };
    /**
     * @param layer - GP Layer object
     * @return leaflet layer instance or null
     */
    /**
     * @param {?} layer - GP Layer object
     * @return {?} leaflet layer instance or null
     */
    LayerFactory.prototype.create = /**
     * @param {?} layer - GP Layer object
     * @return {?} leaflet layer instance or null
     */
    function (layer) {
        if (!layer) {
            throw new Error("LayerFactory expects a layer object");
        }
        for (var i = 0; i < this.factories.length; ++i) {
            /** @type {?} */
            var fn = this.factories[i];
            /** @type {?} */
            var result = fn && typeof (fn) === 'function' && fn(layer);
            if (result)
                return result;
        }
        return null;
    };
    /**
     * @return {?}
     */
    LayerFactory.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        //OSM factory
        this.register(function (layer) {
            if (layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM)) {
                return OSMLayerFactory();
            }
        });
        // ESRI factory
        this.register(function (layer) {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            var service = layer["services"][0];
            /** @type {?} */
            var url = service.href;
            /** @type {?} */
            var svcType = service.serviceType;
            /** @type {?} */
            var typeUri = svcType ? svcType.uri : null;
            /** @type {?} */
            var 
            // srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;
            /** @type {?} */
            var opts;
            /**
             * @param {?} url
             * @return {?}
             */
            function checkUrl(url) {
                if (!url)
                    throw new Error("Layer's service does not define a service url");
            }
            if (ServiceTypes.ESRI_MAP_SERVER &&
                ServiceTypes.ESRI_MAP_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = /** @type {?} */ ({
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                });
                /** @type {?} */
                var supportedCrs = layer["crs"] || [];
                if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
                    console.log("Layer '" + layer.label + "' does not support " +
                        "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
                }
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return new ESRITileLayer(url, opts);
            }
            else if (ServiceTypes.ESRI_FEATURE_SERVER &&
                ServiceTypes.ESRI_FEATURE_SERVER.uri === typeUri) {
                checkUrl(url);
                return clusteredFeatures(layer, {
                    styleResolver: _this.getStyleResolver()
                });
            }
            else if (ServiceTypes.ESRI_TILE_SERVER &&
                ServiceTypes.ESRI_TILE_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = { url: url, useCors: true };
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return esri.tiledMapLayer(opts);
            }
            else if (ServiceTypes.ESRI_IMAGE_SERVER &&
                ServiceTypes.ESRI_IMAGE_SERVER.uri === typeUri) {
                opts = { url: url, useCors: true };
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return esri.imageMapLayer(opts);
            }
            return null;
        });
        // OGC factory
        this.register(function (layer) {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            var service = layer["services"][0];
            /** @type {?} */
            var svcType = service.serviceType;
            /** @type {?} */
            var typeUri = svcType ? svcType.uri : null;
            if (ServiceTypes.WMS && ServiceTypes.WMS.uri === typeUri) {
                return wms(layer);
            }
            else if (ServiceTypes.WMST && ServiceTypes.WMST.uri === typeUri) {
                return wmst(layer);
            }
            else if (ServiceTypes.WMTS && ServiceTypes.WMTS.uri === typeUri) {
                return wmts(layer);
            }
            return null;
        });
        this.register(function (layer) {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            var service = layer["services"][0];
            /** @type {?} */
            var svcType = service.serviceType;
            /** @type {?} */
            var typeUri = svcType ? svcType.uri : null;
            if (ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
                return geoJsonFeed(layer, {
                    styleResolver: _this.getStyleResolver()
                });
            }
            return null;
        });
        this.register(function (layer) {
            if (!layer)
                return null;
            /** @type {?} */
            var resourceTypes = layer.resourceTypes || [];
            if (resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) < 0) { //not tagged as VT layer
                //not tagged as VT layer
                return null;
            }
            /** @type {?} */
            var href = layer.href;
            if (!href || href.indexOf(".pbf") < 0) {
                console.log("LayerFactory - Layer does not define an Access URL");
                return null; //missing URL
            }
            /** @type {?} */
            var Leaflet = /** @type {?} */ (L);
            //if Leaflet vector grid plugin is not installed, can't render VT Layers
            if (typeof (Leaflet.vectorGrid) === 'undefined' &&
                typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
                console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
                return null;
            }
            /** @type {?} */
            var opts = {
                rendererFactory: (/** @type {?} */ (L.canvas)).tile
            };
            if (Config["leafletPane"])
                opts.pane = Config["leafletPane"];
            return Leaflet.vectorGrid.protobuf(href, opts);
        });
    };
    return LayerFactory;
}());
if (false) {
    /** @type {?} */
    LayerFactory.prototype.factories;
    /** @type {?} */
    LayerFactory.prototype.service;
}
export default new LayerFactory();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBR2pELE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUIsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFD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SUFBSSxJQUFJLEdBQVM7Z0JBQ25CLGVBQWUsRUFBRSxtQkFBRSxDQUFDLENBQUMsTUFBYSxFQUFFLENBQUMsSUFBSTthQUd6QyxDQUFDO1lBQ0MsSUFBRyxNQUFNO2dCQUFjLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxlQUFZLENBQUM7WUFDekQsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFL0MsQ0FBQyxDQUFDO0tBSU47dUJBdFRMO0lBdVRDLENBQUE7Ozs7Ozs7QUFFRCxlQUFlLElBQUksWUFBWSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCJsZWFmbGV0XCI7XG5pbXBvcnQgKiBhcyBlc3JpIGZyb20gXCJlc3JpLWxlYWZsZXRcIjtcbmltcG9ydCBTZXJ2aWNlVHlwZXMgZnJvbSBcIi4uL3NlcnZpY2UvdHlwZXNcIjtcbmltcG9ydCBPU00gZnJvbSBcIi4vb3NtXCI7XG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gJy4vZmVhdHVyZSc7XG5pbXBvcnQge1xuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllcixcbiAgICBjbHVzdGVyZWRGZWF0dXJlcyxcbiAgICBnZW9Kc29uRmVlZFxufSBmcm9tICcuL2NsdXN0ZXItZmVhdHVyZSc7XG5cbmltcG9ydCB7V01TLCB3bXN9IGZyb20gJy4vd21zJztcbmltcG9ydCB7V01TVCwgd21zdH0gZnJvbSAnLi93bXN0JztcbmltcG9ydCB7V01UUywgd210c30gZnJvbSAnLi93bXRzJztcbmltcG9ydCBFU1JJVGlsZUxheWVyIGZyb20gJy4vZXNyaS10aWxlLWxheWVyJztcbmltcG9ydCBPU01MYXllckZhY3RvcnkgZnJvbSAnLi9vc20tZmFjdG9yeSc7XG5pbXBvcnQge0xheWVyUmVzb3VyY2VUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3Jlc291cmNlLXR5cGVzJztcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCxcbiAgICBMYXllciBhcyBMYXllck1vZGVsLCBTZXJ2aWNlIGFzIFNlcnZpY2VNb2RlbCxcbiAgICBTZXJ2aWNlVHlwZVN0YW5kYXJkXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbnRlcmZhY2UgTGF5ZXJPcHRpb25zIHtcbiAgICBsYXllcnMgPzogc3RyaW5nfHN0cmluZ1tdLFxuICAgIHRyYW5zcGFyZW50ID86IGJvb2xlYW4sXG4gICAgZm9ybWF0ID86IHN0cmluZyxcbiAgICBwYW5lID86IHN0cmluZyxcbiAgICBzcnMgPzogc3RyaW5nLFxuICAgIHVybCA/OiBzdHJpbmcsXG4gICAgdXNlQ29ycyA/OiBib29sZWFuXG59O1xuXG5cblxuXG4vKlxuICogRXh0ZW5kIGJhc2UgTGVhZmxldCBsYXllciBjbGFzcyB0byBlbnN1cmUgdGhlcmUncyBhbHdheXMgYSBmdW5jdGlvblxuICogYXZhaWxhYmxlIGZvciBtb2RpZnlpbmcgemluZGV4IGFuZCBvcGFjaXR5LCBldmVuIGlmIG5vdGhpbmcgYWN0dWFsbHlcbiAqIGhhcHBlbnMgaW5zaWRlLlxuICovXG5MYXllci5pbmNsdWRlKHtcblxuICAgIC8vIFJlZGVmaW5pbmcgYSBtZXRob2RcbiAgICBzZXRaSW5kZXg6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9LFxuXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH1cblxufSk7XG5cblxuXG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBzdHlsZVJlc29sdmVyRmFjdG9yeShzZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuXG4gICAgaWYoIXNlcnZpY2UgfHwgdHlwZW9mKHNlcnZpY2Uuc3R5bGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIExheWVyU2VydmljZSBpbnN0YW5jZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc3R5bGUoaWQpXG4gICAgICAgICAgICAudGhlbiggcmVzdWx0ID0+IHJlc29sdmUocmVzdWx0KSApXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IGBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IobXNnKSApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBMYXllciBGYWN0b3J5XG4gKlxuICogVXNlZCB0byBpbnN0YW50aWF0ZSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RzIGFzIExlYWZsZXQgbGF5ZXIgaW5zdGFuY2VzXG4gKiBjYXBhYmxlIG9mIGJlaW5nIHJlbmRlcmVkIG9uIExlYWZsZXQgbWFwcy5cbiAqXG4gKiBVc2FnZTpcbiAqICAgICAgbGV0IGxlYWZsZXRMYXllciA9IExheWVyRmFjdG9yeS5jcmVhdGUoZ3BMYXllck9iaik7XG4gKlxuICpcbiAqIEJhc2ljIGxheWVyIHN1cHBvcnQgaXMgYnVpbHQgaW4sIGJ1dCBhZGRpdGlvbmFsIGxheWVyIHR5cGVzIGNhbiBiZSBzdXBwb3J0ZWRcbiAqIGJ5IHJlZ2lzdGVyaW5nIG5ldyBmYWN0b3J5IG1ldGhvZHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgICAgTGF5ZXJGYWN0b3J5LnJlZ2lzdGVyKCAoZ3BMYXllck9iaikgPT4ge1xuICogICAgICAgICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gKiAgICAgICAgICAvL2ltcGxlbWVudCB0ZXN0IHRvIHZlcmlmeSBzdXBwb3J0ZWQgbGF5ZXIgdHlwZVxuICogICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICBpZihpc1N1cHBvcnRlZCkge1xuICogICAgICAgICAgICAgIHJldHVybiBuZXcgTXlDdXN0b21MYXllckNsYXNzKGdwTGF5ZXJPYmopO1xuICogICAgICAgICAgfVxuICogICAgICAgICAgcmV0dXJuIG51bGw7XG4gKiAgICAgIH0pO1xuICpcbiAqL1xuY2xhc3MgTGF5ZXJGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgZmFjdG9yaWVzIDogRnVuY3Rpb25bXTtcbiAgICBwcml2YXRlIHNlcnZpY2UgOiBMYXllclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXMgPSBbXTsgICAgLy8gQSBsaXN0IG9mIGNvbmZpZ3VyZWQgZmFjdG9yeSBmdW5jdG9ycyB0byBpbnN0YW50aWF0ZSBsYXllcnNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoZm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZih0eXBlb2YoZm4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExheWVyU2VydmljZShzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICovXG4gICAgZ2V0U3R5bGVSZXNvbHZlcigpIDogRnVuY3Rpb24ge1xuICAgICAgICBpZighdGhpcy5zZXJ2aWNlIHx8IHR5cGVvZih0aGlzLnNlcnZpY2Uuc3R5bGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVSZXNvbHZlckZhY3RvcnkodGhpcy5zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBHUCBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZSggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBMYXllciB7XG4gICAgICAgIGlmKCFsYXllcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXJGYWN0b3J5IGV4cGVjdHMgYSBsYXllciBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5mYWN0b3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmbiA9IHRoaXMuZmFjdG9yaWVzW2ldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZuICYmIHR5cGVvZihmbik9PT0nZnVuY3Rpb24nICYmIGZuKGxheWVyKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGluaXQgKCkge1xuXG4gICAgICAgIC8vT1NNIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKCBsYXllciA6IExheWVyTW9kZWwgKT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk9TTSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNTGF5ZXJGYWN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEVTUkkgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICAgICAgICAgIHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAvLyBzcnMgICAgID0gbGF5ZXIuc3VwcG9ydGVkQ1JTID8gbGF5ZXIuc3VwcG9ydGVkQ1JTWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdHMgOiBMYXllck9wdGlvbnM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVXJsKHVybCkge1xuICAgICAgICAgICAgICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIkxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmUgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0IHx8IFwicG5nMzJcIlxuICAgICAgICAgICAgICAgIH0gYXMgTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYoc3JzKSBvcHRzLnNycyA9IHNycztcbiAgICAgICAgICAgICAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFU1JJVGlsZUxheWVyKHVybCwgb3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS50aWxlZE1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkuaW1hZ2VNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9HQyBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZTtcbiAgICAgICAgICAgIGxldCB0eXBlVXJpIDogc3RyaW5nID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLldNUyAmJiBTZXJ2aWNlVHlwZXMuV01TLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXMobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVNUICYmIFNlcnZpY2VUeXBlcy5XTVNULnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXN0KGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01UUyAmJiBTZXJ2aWNlVHlwZXMuV01UUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd210cyhsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRkVFRCAmJiBTZXJ2aWNlVHlwZXMuRkVFRC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvbkZlZWQobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFsYXllcikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGxldCByZXNvdXJjZVR5cGVzID0gbGF5ZXIucmVzb3VyY2VUeXBlcyB8fCBbXTtcbiAgICAgICAgICAgIGlmKHJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuTWFwQm94VmVjdG9yVGlsZSkgPCAwKSB7IC8vbm90IHRhZ2dlZCBhcyBWVCBsYXllclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaHJlZiA9IGxheWVyLmhyZWY7XG4gICAgICAgICAgICBpZighaHJlZiB8fCBocmVmLmluZGV4T2YoXCIucGJmXCIpIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGF5ZXIgZG9lcyBub3QgZGVmaW5lIGFuIEFjY2VzcyBVUkxcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAvL21pc3NpbmcgVVJMXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IExlYWZsZXQgPSBMIGFzIGFueTtcblxuICAgICAgICAgICAgLy9pZiBMZWFmbGV0IHZlY3RvciBncmlkIHBsdWdpbiBpcyBub3QgaW5zdGFsbGVkLCBjYW4ndCByZW5kZXIgVlQgTGF5ZXJzXG4gICAgICAgICAgICBpZiggdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZCkgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMZWFmbGV0IFZlY3RvciBUaWxlcyBwbHVnaW4gbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsZXQgc3R5bGVGbiA9IGZ1bmN0aW9uKGZlYXR1cmVQcm9wZXJ0aWVzLCB6KXtcbiAgICAgICAgICAgIC8vICAgICBsZXQgZmlsbCA9ICcjQUQ4MTZFJztcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4geyBjb2xvcjogZmlsbCwgd2VpZ2h0OiAxIH07XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgICAvLyAgICAgXCJuY193ZXRsYW5kc1wiIDogc3R5bGVGbixcbiAgICAgICAgICAgIC8vICAgICBcInZhX3dldGxhbmRzXCI6IHN0eWxlRm5cbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICB2YXIgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgXHRcdHJlbmRlcmVyRmFjdG9yeTogKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlXG4gICAgICAgICAgICAgICAgLy8gLFxuICAgICAgICBcdFx0Ly8gdmVjdG9yVGlsZUxheWVyU3R5bGVzOiBzdHlsZXMsXG4gICAgICAgIFx0fTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICBcdHJldHVybiBMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYoaHJlZiwgb3B0cyk7XG5cbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGF5ZXJGYWN0b3J5KCk7XG4iXX0=