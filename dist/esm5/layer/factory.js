/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { Layer } from "leaflet";
import * as esri from "esri-leaflet";
import ServiceTypes from "../service/types";
import { clusteredFeatures, geoJsonFeed } from './cluster-feature';
import { wms } from './wms';
import { wmst } from './wmst';
import { wmts } from './wmts';
import ESRITileLayer from './esri-tile-layer';
import OSMLayerFactory from './osm-factory';
import { Config, LayerService, JQueryHttpClient } from 'geoplatform.client';
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
            this.service = new LayerService(Config.ualUrl, new JQueryHttpClient());
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
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
            /** @type {?} */
            var url = service.href;
            /** @type {?} */
            var typeUri = service.serviceType ? service.serviceType.uri : null;
            /** @type {?} */
            var srs = layer.supportedCRS ? layer.supportedCRS[0] : null;
            /** @type {?} */
            var format = layer.supportedFormats ? layer.supportedFormats[0] : null;
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
                if (srs)
                    opts.srs = srs;
                if (Config.leafletPane)
                    opts.pane = Config.leafletPane;
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
                if (Config.leafletPane)
                    opts.pane = Config.leafletPane;
                return esri.tiledMapLayer(opts);
            }
            else if (ServiceTypes.ESRI_IMAGE_SERVER &&
                ServiceTypes.ESRI_IMAGE_SERVER.uri === typeUri) {
                opts = { url: url, useCors: true };
                if (Config.leafletPane)
                    opts.pane = Config.leafletPane;
                return esri.imageMapLayer(opts);
            }
            return null;
        });
        // OGC factory
        this.register(function (layer) {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
            /** @type {?} */
            var typeUri = service.serviceType ? service.serviceType.uri : null;
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
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
            /** @type {?} */
            var typeUri = service.serviceType ? service.serviceType.uri : null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV0QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRzVDLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsV0FBVyxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFNLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBTyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxlQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVdEYsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNqRCxNQUFNLElB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QUssT0FBTyxFQUFFO2dCQUN2RCxPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLGFBQWEsRUFBRSxLQUFJLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3pDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZixDQUFDLENBQUM7S0FJTjt1QkF2UEw7SUF3UEMsQ0FBQTs7Ozs7OztBQUVELGVBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5pbXBvcnQgU2VydmljZVR5cGVzIGZyb20gXCIuLi9zZXJ2aWNlL3R5cGVzXCI7XG5pbXBvcnQgT1NNIGZyb20gXCIuL29zbVwiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICcuL2ZlYXR1cmUnO1xuaW1wb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn0gZnJvbSAnLi9jbHVzdGVyLWZlYXR1cmUnO1xuXG5pbXBvcnQge1dNUywgd21zfSBmcm9tICcuL3dtcyc7XG5pbXBvcnQge1dNU1QsIHdtc3R9IGZyb20gJy4vd21zdCc7XG5pbXBvcnQge1dNVFMsIHdtdHN9IGZyb20gJy4vd210cyc7XG5pbXBvcnQgRVNSSVRpbGVMYXllciBmcm9tICcuL2VzcmktdGlsZS1sYXllcic7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgSlF1ZXJ5SHR0cENsaWVudCB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbmludGVyZmFjZSBMYXllck9wdGlvbnMge1xuICAgIGxheWVycyA/OiBzdHJpbmd8c3RyaW5nW10sXG4gICAgdHJhbnNwYXJlbnQgPzogYm9vbGVhbixcbiAgICBmb3JtYXQgPzogc3RyaW5nLFxuICAgIHBhbmUgPzogc3RyaW5nLFxuICAgIHNycyA/OiBzdHJpbmcsXG4gICAgdXJsID86IHN0cmluZyxcbiAgICB1c2VDb3JzID86IGJvb2xlYW5cbn07XG5cblxuXG5cbi8qXG4gKiBFeHRlbmQgYmFzZSBMZWFmbGV0IGxheWVyIGNsYXNzIHRvIGVuc3VyZSB0aGVyZSdzIGFsd2F5cyBhIGZ1bmN0aW9uXG4gKiBhdmFpbGFibGUgZm9yIG1vZGlmeWluZyB6aW5kZXggYW5kIG9wYWNpdHksIGV2ZW4gaWYgbm90aGluZyBhY3R1YWxseVxuICogaGFwcGVucyBpbnNpZGUuXG4gKi9cbkxheWVyLmluY2x1ZGUoe1xuXG4gICAgLy8gUmVkZWZpbmluZyBhIG1ldGhvZFxuICAgIHNldFpJbmRleDogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH0sXG5cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfVxuXG59KTtcblxuXG5cblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IGFueSB7XG5cbiAgICBpZighc2VydmljZSB8fCB0eXBlb2Yoc2VydmljZS5zdHlsZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgTGF5ZXJTZXJ2aWNlIGluc3RhbmNlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCkge1xuICAgICAgICByZXR1cm4gc2VydmljZS5zdHlsZShpZCkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gYEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHtlLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdCggbmV3IEVycm9yKG1zZykgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cblxuXG5cblxuXG4vKipcbiAqIExheWVyIEZhY3RvcnlcbiAqXG4gKiBVc2VkIHRvIGluc3RhbnRpYXRlIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdHMgYXMgTGVhZmxldCBsYXllciBpbnN0YW5jZXNcbiAqIGNhcGFibGUgb2YgYmVpbmcgcmVuZGVyZWQgb24gTGVhZmxldCBtYXBzLlxuICpcbiAqIFVzYWdlOlxuICogICAgICBsZXQgbGVhZmxldExheWVyID0gTGF5ZXJGYWN0b3J5LmNyZWF0ZShncExheWVyT2JqKTtcbiAqXG4gKlxuICogQmFzaWMgbGF5ZXIgc3VwcG9ydCBpcyBidWlsdCBpbiwgYnV0IGFkZGl0aW9uYWwgbGF5ZXIgdHlwZXMgY2FuIGJlIHN1cHBvcnRlZFxuICogYnkgcmVnaXN0ZXJpbmcgbmV3IGZhY3RvcnkgbWV0aG9kcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICAgICBMYXllckZhY3RvcnkucmVnaXN0ZXIoIChncExheWVyT2JqKSA9PiB7XG4gKiAgICAgICAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAqICAgICAgICAgIC8vaW1wbGVtZW50IHRlc3QgdG8gdmVyaWZ5IHN1cHBvcnRlZCBsYXllciB0eXBlXG4gKiAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgIGlmKGlzU3VwcG9ydGVkKSB7XG4gKiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNeUN1c3RvbUxheWVyQ2xhc3MoZ3BMYXllck9iaik7XG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAqICAgICAgfSk7XG4gKlxuICovXG5jbGFzcyBMYXllckZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBmYWN0b3JpZXMgOiBGdW5jdGlvbltdO1xuICAgIHByaXZhdGUgc2VydmljZSA6IExheWVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZhY3RvcmllcyA9IFtdOyAgICAvLyBBIGxpc3Qgb2YgY29uZmlndXJlZCBmYWN0b3J5IGZ1bmN0b3JzIHRvIGluc3RhbnRpYXRlIGxheWVyc1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcihmbiA6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKHR5cGVvZihmbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yaWVzLnB1c2goZm4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TGF5ZXJTZXJ2aWNlKHNlcnZpY2UgOiBMYXllclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKi9cbiAgICBnZXRTdHlsZVJlc29sdmVyKCkgOiBGdW5jdGlvbiB7XG4gICAgICAgIGlmKCF0aGlzLnNlcnZpY2UgfHwgdHlwZW9mKHRoaXMuc2VydmljZS5zdHlsZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIG5ldyBKUXVlcnlIdHRwQ2xpZW50KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZVJlc29sdmVyRmFjdG9yeSh0aGlzLnNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsYXllciAtIEdQIExheWVyIG9iamVjdFxuICAgICAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gICAgICovXG4gICAgY3JlYXRlKGxheWVyIDogYW55KSA6IExheWVyIHtcbiAgICAgICAgaWYoIWxheWVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMYXllckZhY3RvcnkgZXhwZWN0cyBhIGxheWVyIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmZhY3Rvcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGZuID0gdGhpcy5mYWN0b3JpZXNbaV07XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZm4gJiYgdHlwZW9mKGZuKT09PSdmdW5jdGlvbicgJiYgZm4obGF5ZXIpO1xuICAgICAgICAgICAgaWYocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgaW5pdCAoKSB7XG5cbiAgICAgICAgLy9PU00gZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKChsYXllciA6IGFueSk9PiB7XG4gICAgICAgICAgICBpZihsYXllciAmJiBsYXllci5yZXNvdXJjZVR5cGVzICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICB+bGF5ZXIucmVzb3VyY2VUeXBlcy5pbmRleE9mKFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvb250L29wZW5sYXllci9PU01MYXllclwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPU01MYXllckZhY3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRVNSSSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXNbMF0sXG4gICAgICAgICAgICAgICAgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc2VydmljZS5zZXJ2aWNlVHlwZSA/IHNlcnZpY2Uuc2VydmljZVR5cGUudXJpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBzcnMgICAgID0gbGF5ZXIuc3VwcG9ydGVkQ1JTID8gbGF5ZXIuc3VwcG9ydGVkQ1JTWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdHMgOiBMYXllck9wdGlvbnM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVXJsKHVybCkge1xuICAgICAgICAgICAgICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIkxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmUgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0IHx8IFwicG5nMzJcIlxuICAgICAgICAgICAgICAgIH0gYXMgTGF5ZXJPcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmKHNycykgb3B0cy5zcnMgPSBzcnM7XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFU1JJVGlsZUxheWVyKHVybCwgb3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS50aWxlZE1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkuaW1hZ2VNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9HQyBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXNbMF0sXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHNlcnZpY2Uuc2VydmljZVR5cGUgPyBzZXJ2aWNlLnNlcnZpY2VUeXBlLnVyaSA6IG51bGw7XG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuV01TICYmIFNlcnZpY2VUeXBlcy5XTVMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtcyhsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNU1QgJiYgU2VydmljZVR5cGVzLldNU1QudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtc3QobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVRTICYmIFNlcnZpY2VUeXBlcy5XTVRTLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXRzKGxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXNbMF0sXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHNlcnZpY2Uuc2VydmljZVR5cGUgPyBzZXJ2aWNlLnNlcnZpY2VUeXBlLnVyaSA6IG51bGw7XG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRkVFRCAmJiBTZXJ2aWNlVHlwZXMuRkVFRC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvbkZlZWQobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMYXllckZhY3RvcnkoKTtcbiJdfQ==