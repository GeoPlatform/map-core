/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
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
        return service.style(id).catch(function (e) {
            /** @type {?} */
            var msg = "Error loading style information for layer " + id + " : " + e.message;
            return Q.reject(new Error(msg));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBR2pELE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUIsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtR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QUNDLElBQUcsTUFBTTtnQkFBYyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sZUFBWSxDQUFDO1lBQ3pELE9BQU8sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRS9DLENBQUMsQ0FBQztLQUlOO3VCQXBUTDtJQXFUQyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCJsZWFmbGV0XCI7XG5pbXBvcnQgKiBhcyBlc3JpIGZyb20gXCJlc3JpLWxlYWZsZXRcIjtcbmltcG9ydCBTZXJ2aWNlVHlwZXMgZnJvbSBcIi4uL3NlcnZpY2UvdHlwZXNcIjtcbmltcG9ydCBPU00gZnJvbSBcIi4vb3NtXCI7XG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gJy4vZmVhdHVyZSc7XG5pbXBvcnQge1xuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllcixcbiAgICBjbHVzdGVyZWRGZWF0dXJlcyxcbiAgICBnZW9Kc29uRmVlZFxufSBmcm9tICcuL2NsdXN0ZXItZmVhdHVyZSc7XG5cbmltcG9ydCB7V01TLCB3bXN9IGZyb20gJy4vd21zJztcbmltcG9ydCB7V01TVCwgd21zdH0gZnJvbSAnLi93bXN0JztcbmltcG9ydCB7V01UUywgd210c30gZnJvbSAnLi93bXRzJztcbmltcG9ydCBFU1JJVGlsZUxheWVyIGZyb20gJy4vZXNyaS10aWxlLWxheWVyJztcbmltcG9ydCBPU01MYXllckZhY3RvcnkgZnJvbSAnLi9vc20tZmFjdG9yeSc7XG5pbXBvcnQge0xheWVyUmVzb3VyY2VUeXBlc30gZnJvbSAnLi4vc2hhcmVkL3Jlc291cmNlLXR5cGVzJztcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCxcbiAgICBMYXllciBhcyBMYXllck1vZGVsLCBTZXJ2aWNlIGFzIFNlcnZpY2VNb2RlbCxcbiAgICBTZXJ2aWNlVHlwZVN0YW5kYXJkXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbnRlcmZhY2UgTGF5ZXJPcHRpb25zIHtcbiAgICBsYXllcnMgPzogc3RyaW5nfHN0cmluZ1tdLFxuICAgIHRyYW5zcGFyZW50ID86IGJvb2xlYW4sXG4gICAgZm9ybWF0ID86IHN0cmluZyxcbiAgICBwYW5lID86IHN0cmluZyxcbiAgICBzcnMgPzogc3RyaW5nLFxuICAgIHVybCA/OiBzdHJpbmcsXG4gICAgdXNlQ29ycyA/OiBib29sZWFuXG59O1xuXG5cblxuXG4vKlxuICogRXh0ZW5kIGJhc2UgTGVhZmxldCBsYXllciBjbGFzcyB0byBlbnN1cmUgdGhlcmUncyBhbHdheXMgYSBmdW5jdGlvblxuICogYXZhaWxhYmxlIGZvciBtb2RpZnlpbmcgemluZGV4IGFuZCBvcGFjaXR5LCBldmVuIGlmIG5vdGhpbmcgYWN0dWFsbHlcbiAqIGhhcHBlbnMgaW5zaWRlLlxuICovXG5MYXllci5pbmNsdWRlKHtcblxuICAgIC8vIFJlZGVmaW5pbmcgYSBtZXRob2RcbiAgICBzZXRaSW5kZXg6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9LFxuXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH1cblxufSk7XG5cblxuXG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBzdHlsZVJlc29sdmVyRmFjdG9yeShzZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuXG4gICAgaWYoIXNlcnZpY2UgfHwgdHlwZW9mKHNlcnZpY2Uuc3R5bGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIExheWVyU2VydmljZSBpbnN0YW5jZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc3R5bGUoaWQpLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoIG5ldyBFcnJvcihtc2cpICk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBMYXllciBGYWN0b3J5XG4gKlxuICogVXNlZCB0byBpbnN0YW50aWF0ZSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RzIGFzIExlYWZsZXQgbGF5ZXIgaW5zdGFuY2VzXG4gKiBjYXBhYmxlIG9mIGJlaW5nIHJlbmRlcmVkIG9uIExlYWZsZXQgbWFwcy5cbiAqXG4gKiBVc2FnZTpcbiAqICAgICAgbGV0IGxlYWZsZXRMYXllciA9IExheWVyRmFjdG9yeS5jcmVhdGUoZ3BMYXllck9iaik7XG4gKlxuICpcbiAqIEJhc2ljIGxheWVyIHN1cHBvcnQgaXMgYnVpbHQgaW4sIGJ1dCBhZGRpdGlvbmFsIGxheWVyIHR5cGVzIGNhbiBiZSBzdXBwb3J0ZWRcbiAqIGJ5IHJlZ2lzdGVyaW5nIG5ldyBmYWN0b3J5IG1ldGhvZHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgICAgTGF5ZXJGYWN0b3J5LnJlZ2lzdGVyKCAoZ3BMYXllck9iaikgPT4ge1xuICogICAgICAgICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gKiAgICAgICAgICAvL2ltcGxlbWVudCB0ZXN0IHRvIHZlcmlmeSBzdXBwb3J0ZWQgbGF5ZXIgdHlwZVxuICogICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICBpZihpc1N1cHBvcnRlZCkge1xuICogICAgICAgICAgICAgIHJldHVybiBuZXcgTXlDdXN0b21MYXllckNsYXNzKGdwTGF5ZXJPYmopO1xuICogICAgICAgICAgfVxuICogICAgICAgICAgcmV0dXJuIG51bGw7XG4gKiAgICAgIH0pO1xuICpcbiAqL1xuY2xhc3MgTGF5ZXJGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgZmFjdG9yaWVzIDogRnVuY3Rpb25bXTtcbiAgICBwcml2YXRlIHNlcnZpY2UgOiBMYXllclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXMgPSBbXTsgICAgLy8gQSBsaXN0IG9mIGNvbmZpZ3VyZWQgZmFjdG9yeSBmdW5jdG9ycyB0byBpbnN0YW50aWF0ZSBsYXllcnNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoZm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZih0eXBlb2YoZm4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExheWVyU2VydmljZShzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICovXG4gICAgZ2V0U3R5bGVSZXNvbHZlcigpIDogRnVuY3Rpb24ge1xuICAgICAgICBpZighdGhpcy5zZXJ2aWNlIHx8IHR5cGVvZih0aGlzLnNlcnZpY2Uuc3R5bGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVSZXNvbHZlckZhY3RvcnkodGhpcy5zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBHUCBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZSggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBMYXllciB7XG4gICAgICAgIGlmKCFsYXllcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXJGYWN0b3J5IGV4cGVjdHMgYSBsYXllciBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5mYWN0b3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmbiA9IHRoaXMuZmFjdG9yaWVzW2ldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZuICYmIHR5cGVvZihmbik9PT0nZnVuY3Rpb24nICYmIGZuKGxheWVyKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGluaXQgKCkge1xuXG4gICAgICAgIC8vT1NNIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKCBsYXllciA6IExheWVyTW9kZWwgKT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk9TTSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNTGF5ZXJGYWN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEVTUkkgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICAgICAgICAgIHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAvLyBzcnMgICAgID0gbGF5ZXIuc3VwcG9ydGVkQ1JTID8gbGF5ZXIuc3VwcG9ydGVkQ1JTWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdHMgOiBMYXllck9wdGlvbnM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVXJsKHVybCkge1xuICAgICAgICAgICAgICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIkxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmUgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0IHx8IFwicG5nMzJcIlxuICAgICAgICAgICAgICAgIH0gYXMgTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYoc3JzKSBvcHRzLnNycyA9IHNycztcbiAgICAgICAgICAgICAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFU1JJVGlsZUxheWVyKHVybCwgb3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS50aWxlZE1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkuaW1hZ2VNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9HQyBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZTtcbiAgICAgICAgICAgIGxldCB0eXBlVXJpIDogc3RyaW5nID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLldNUyAmJiBTZXJ2aWNlVHlwZXMuV01TLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXMobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVNUICYmIFNlcnZpY2VUeXBlcy5XTVNULnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXN0KGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01UUyAmJiBTZXJ2aWNlVHlwZXMuV01UUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd210cyhsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRkVFRCAmJiBTZXJ2aWNlVHlwZXMuRkVFRC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvbkZlZWQobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFsYXllcikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGxldCByZXNvdXJjZVR5cGVzID0gbGF5ZXIucmVzb3VyY2VUeXBlcyB8fCBbXTtcbiAgICAgICAgICAgIGlmKHJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuTWFwQm94VmVjdG9yVGlsZSkgPCAwKSB7IC8vbm90IHRhZ2dlZCBhcyBWVCBsYXllclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaHJlZiA9IGxheWVyLmhyZWY7XG4gICAgICAgICAgICBpZighaHJlZiB8fCBocmVmLmluZGV4T2YoXCIucGJmXCIpIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGF5ZXIgZG9lcyBub3QgZGVmaW5lIGFuIEFjY2VzcyBVUkxcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAvL21pc3NpbmcgVVJMXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IExlYWZsZXQgPSBMIGFzIGFueTtcblxuICAgICAgICAgICAgLy9pZiBMZWFmbGV0IHZlY3RvciBncmlkIHBsdWdpbiBpcyBub3QgaW5zdGFsbGVkLCBjYW4ndCByZW5kZXIgVlQgTGF5ZXJzXG4gICAgICAgICAgICBpZiggdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZCkgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMZWFmbGV0IFZlY3RvciBUaWxlcyBwbHVnaW4gbm90IGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsZXQgc3R5bGVGbiA9IGZ1bmN0aW9uKGZlYXR1cmVQcm9wZXJ0aWVzLCB6KXtcbiAgICAgICAgICAgIC8vICAgICBsZXQgZmlsbCA9ICcjQUQ4MTZFJztcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4geyBjb2xvcjogZmlsbCwgd2VpZ2h0OiAxIH07XG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgICAvLyAgICAgXCJuY193ZXRsYW5kc1wiIDogc3R5bGVGbixcbiAgICAgICAgICAgIC8vICAgICBcInZhX3dldGxhbmRzXCI6IHN0eWxlRm5cbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICB2YXIgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgXHRcdHJlbmRlcmVyRmFjdG9yeTogKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlXG4gICAgICAgICAgICAgICAgLy8gLFxuICAgICAgICBcdFx0Ly8gdmVjdG9yVGlsZUxheWVyU3R5bGVzOiBzdHlsZXMsXG4gICAgICAgIFx0fTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICBcdHJldHVybiBMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYoaHJlZiwgb3B0cyk7XG5cbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGF5ZXJGYWN0b3J5KCk7XG4iXX0=