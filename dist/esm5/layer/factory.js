/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
import { Layer } from "leaflet";
import * as esri from "esri-leaflet";
import ServiceTypes from "../service/types";
import { clusteredFeatures, geoJsonFeed } from './cluster-feature';
import { wms } from './wms';
import { wmst } from './wmst';
import { wmts } from './wmts';
import ESRITileLayer from './esri-tile-layer';
import OSMLayerFactory from './osm-factory';
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
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer")) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQ0gsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBR2pELE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUIsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxPQUFPLDhCQUE4QixFQUFFO1FBQ25DLE9BQU8s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QUFFLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDekMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQztLQUlOO3VCQXBRTDtJQXFRQyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCB7IExheWVyIH0gZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xuaW1wb3J0IFNlcnZpY2VUeXBlcyBmcm9tIFwiLi4vc2VydmljZS90eXBlc1wiO1xuaW1wb3J0IE9TTSBmcm9tIFwiLi9vc21cIjtcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnLi9mZWF0dXJlJztcbmltcG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59IGZyb20gJy4vY2x1c3Rlci1mZWF0dXJlJztcblxuaW1wb3J0IHtXTVMsIHdtc30gZnJvbSAnLi93bXMnO1xuaW1wb3J0IHtXTVNULCB3bXN0fSBmcm9tICcuL3dtc3QnO1xuaW1wb3J0IHtXTVRTLCB3bXRzfSBmcm9tICcuL3dtdHMnO1xuaW1wb3J0IEVTUklUaWxlTGF5ZXIgZnJvbSAnLi9lc3JpLXRpbGUtbGF5ZXInO1xuaW1wb3J0IE9TTUxheWVyRmFjdG9yeSBmcm9tICcuL29zbS1mYWN0b3J5JztcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCxcbiAgICBMYXllciBhcyBMYXllck1vZGVsLCBTZXJ2aWNlIGFzIFNlcnZpY2VNb2RlbCxcbiAgICBTZXJ2aWNlVHlwZVN0YW5kYXJkXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbnRlcmZhY2UgTGF5ZXJPcHRpb25zIHtcbiAgICBsYXllcnMgPzogc3RyaW5nfHN0cmluZ1tdLFxuICAgIHRyYW5zcGFyZW50ID86IGJvb2xlYW4sXG4gICAgZm9ybWF0ID86IHN0cmluZyxcbiAgICBwYW5lID86IHN0cmluZyxcbiAgICBzcnMgPzogc3RyaW5nLFxuICAgIHVybCA/OiBzdHJpbmcsXG4gICAgdXNlQ29ycyA/OiBib29sZWFuXG59O1xuXG5cblxuXG4vKlxuICogRXh0ZW5kIGJhc2UgTGVhZmxldCBsYXllciBjbGFzcyB0byBlbnN1cmUgdGhlcmUncyBhbHdheXMgYSBmdW5jdGlvblxuICogYXZhaWxhYmxlIGZvciBtb2RpZnlpbmcgemluZGV4IGFuZCBvcGFjaXR5LCBldmVuIGlmIG5vdGhpbmcgYWN0dWFsbHlcbiAqIGhhcHBlbnMgaW5zaWRlLlxuICovXG5MYXllci5pbmNsdWRlKHtcblxuICAgIC8vIFJlZGVmaW5pbmcgYSBtZXRob2RcbiAgICBzZXRaSW5kZXg6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9LFxuXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH1cblxufSk7XG5cblxuXG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBzdHlsZVJlc29sdmVyRmFjdG9yeShzZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuXG4gICAgaWYoIXNlcnZpY2UgfHwgdHlwZW9mKHNlcnZpY2Uuc3R5bGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIExheWVyU2VydmljZSBpbnN0YW5jZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2Uuc3R5bGUoaWQpLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbGV0IG1zZyA9IGBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICByZXR1cm4gUS5yZWplY3QoIG5ldyBFcnJvcihtc2cpICk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBMYXllciBGYWN0b3J5XG4gKlxuICogVXNlZCB0byBpbnN0YW50aWF0ZSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RzIGFzIExlYWZsZXQgbGF5ZXIgaW5zdGFuY2VzXG4gKiBjYXBhYmxlIG9mIGJlaW5nIHJlbmRlcmVkIG9uIExlYWZsZXQgbWFwcy5cbiAqXG4gKiBVc2FnZTpcbiAqICAgICAgbGV0IGxlYWZsZXRMYXllciA9IExheWVyRmFjdG9yeS5jcmVhdGUoZ3BMYXllck9iaik7XG4gKlxuICpcbiAqIEJhc2ljIGxheWVyIHN1cHBvcnQgaXMgYnVpbHQgaW4sIGJ1dCBhZGRpdGlvbmFsIGxheWVyIHR5cGVzIGNhbiBiZSBzdXBwb3J0ZWRcbiAqIGJ5IHJlZ2lzdGVyaW5nIG5ldyBmYWN0b3J5IG1ldGhvZHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgICAgTGF5ZXJGYWN0b3J5LnJlZ2lzdGVyKCAoZ3BMYXllck9iaikgPT4ge1xuICogICAgICAgICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gKiAgICAgICAgICAvL2ltcGxlbWVudCB0ZXN0IHRvIHZlcmlmeSBzdXBwb3J0ZWQgbGF5ZXIgdHlwZVxuICogICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICBpZihpc1N1cHBvcnRlZCkge1xuICogICAgICAgICAgICAgIHJldHVybiBuZXcgTXlDdXN0b21MYXllckNsYXNzKGdwTGF5ZXJPYmopO1xuICogICAgICAgICAgfVxuICogICAgICAgICAgcmV0dXJuIG51bGw7XG4gKiAgICAgIH0pO1xuICpcbiAqL1xuY2xhc3MgTGF5ZXJGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgZmFjdG9yaWVzIDogRnVuY3Rpb25bXTtcbiAgICBwcml2YXRlIHNlcnZpY2UgOiBMYXllclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXMgPSBbXTsgICAgLy8gQSBsaXN0IG9mIGNvbmZpZ3VyZWQgZmFjdG9yeSBmdW5jdG9ycyB0byBpbnN0YW50aWF0ZSBsYXllcnNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoZm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZih0eXBlb2YoZm4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExheWVyU2VydmljZShzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICovXG4gICAgZ2V0U3R5bGVSZXNvbHZlcigpIDogRnVuY3Rpb24ge1xuICAgICAgICBpZighdGhpcy5zZXJ2aWNlIHx8IHR5cGVvZih0aGlzLnNlcnZpY2Uuc3R5bGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVSZXNvbHZlckZhY3RvcnkodGhpcy5zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBHUCBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZSggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBMYXllciB7XG4gICAgICAgIGlmKCFsYXllcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXJGYWN0b3J5IGV4cGVjdHMgYSBsYXllciBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5mYWN0b3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmbiA9IHRoaXMuZmFjdG9yaWVzW2ldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZuICYmIHR5cGVvZihmbik9PT0nZnVuY3Rpb24nICYmIGZuKGxheWVyKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGluaXQgKCkge1xuXG4gICAgICAgIC8vT1NNIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKCBsYXllciA6IExheWVyTW9kZWwgKT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTUxheWVyRmFjdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFU1JJIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgICAgICAgICBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGUsXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGwsXG4gICAgICAgICAgICAgICAgLy8gc3JzICAgICA9IGxheWVyLnN1cHBvcnRlZENSUyA/IGxheWVyLnN1cHBvcnRlZENSU1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcHRzIDogTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1VybCh1cmwpIHtcbiAgICAgICAgICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lIGEgc2VydmljZSB1cmxcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBcInBuZzMyXCJcbiAgICAgICAgICAgICAgICB9IGFzIExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIGlmKHNycykgb3B0cy5zcnMgPSBzcnM7XG4gICAgICAgICAgICAgICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRVNSSVRpbGVMYXllcih1cmwsIG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkudGlsZWRNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLmltYWdlTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPR0MgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlO1xuICAgICAgICAgICAgbGV0IHR5cGVVcmkgOiBzdHJpbmcgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkZFRUQgJiYgU2VydmljZVR5cGVzLkZFRUQudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25GZWVkKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGF5ZXJGYWN0b3J5KCk7XG4iXX0=