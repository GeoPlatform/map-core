/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { mapBoxVectorTileLayer } from './mbvt';
import { Config, LayerService, XHRHttpClient } from '@geoplatform/client';
/**
 * @record
 */
function LayerOptions() { }
if (false) {
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
}
;
/*
 * Extend base Leaflet layer class to ensure there's always a function
 * available for modifying zindex and opacity, even if nothing actually
 * happens inside.
 */
Layer.include({
    // Redefining a method
    setZIndex: (/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        //do nothing in this abstract class, let impls do the work
    }),
    setOpacity: (/**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        //do nothing in this abstract class, let impls do the work
    })
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
    return (/**
     * @param {?} id
     * @return {?}
     */
    function featureStyleResolver(id) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            service.style(id)
                .then((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return resolve(result); }))
                .catch((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var msg = "Error loading style information for layer " + id + " : " + e.message;
                reject(new Error(msg));
            }));
        }));
    });
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
            this.service = new LayerService(Config.ualUrl, new XHRHttpClient());
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
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM)) {
                return OSMLayerFactory();
            }
        }));
        // ESRI factory
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
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
                opts = (/** @type {?} */ ({
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                }));
                // if(srs) opts.srs = srs;
                /** @type {?} */
                var supportedCrs = layer.crs || [];
                if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
                    console.log("Layer '" + layer.label + "' does not support " +
                        "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
                }
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
                ServiceTypes.ESRI_TILE_SERVER.uri === typeUri &&
                !_this.isVectorTile(layer) //don't use Esri library for vector tile layers
            ) {
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
        }));
        // OGC factory
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
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
        }));
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            var service = layer.services[0];
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
        }));
        /**
         * Register factory function for Protobuf Vector Tile layers
         */
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            if (!layer)
                return null;
            /** @type {?} */
            var resourceTypes = layer.resourceTypes || [];
            if (resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) < 0) { //not tagged as VT layer
                return null;
            }
            return mapBoxVectorTileLayer(layer);
        }));
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    LayerFactory.prototype.isVectorTile = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var resourceTypes = (layer && layer.resourceTypes) || [];
        return resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) >= 0;
    };
    return LayerFactory;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerFactory.prototype.factories;
    /**
     * @type {?}
     * @private
     */
    LayerFactory.prototype.service;
}
export default new LayerFactory();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDL0MsT0FBTyxFQUNILE1BQU0sRUFBYSxZQUFZLEVBQUUsYUFBYSxFQUdqRCxNQUFNLHFCQUFxQixDQUFDOzs7O0FBRTdCLDJCQVFDOzs7SUFQRyw4QkFBMEI7O0lBQzFCLG1DQUF1Qjs7SUFDdkIsOEJBQWlCOztJQUNqQiw0QkFBZTs7SUFDZiwyQkFBYzs7SUFDZCwyQkFBYzs7SUFDZCwrQkFBa0I7O0FBQ3JCLENBQUM7Ozs7OztBQVVGLEtBQUssQ0FBQyxPQUFPLENBQUM7O0lBR1YsU0FBUzs7OztJQUFFLFVBQVMsS0FBYztRQUM5QiwwREFBMEQ7SUFDOUQsQ0FBQyxDQUFBO0lBRUQsVUFBVTs7OztJQUFFLFVBQVMsS0FBYztRQUMvQiwwREFBMEQ7SUFDOUQsQ0FBQyxDQUFB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SyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFDLENBQUM7SUFFUCxDQUFDOzs7OztJQUdELG1DQUFZOzs7O0lBQVosVUFBYSxLQUFLOztZQUNWLGFBQWEsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtRQUN4RCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsSUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQW5MRCxJQW1MQzs7Ozs7O0lBakxHLGlDQUErQjs7Ozs7SUFDL0IsK0JBQStCOztBQWtMbkMsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5pbXBvcnQgU2VydmljZVR5cGVzIGZyb20gXCIuLi9zZXJ2aWNlL3R5cGVzXCI7XG5pbXBvcnQgT1NNIGZyb20gXCIuL29zbVwiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICcuL2ZlYXR1cmUnO1xuaW1wb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn0gZnJvbSAnLi9jbHVzdGVyLWZlYXR1cmUnO1xuXG5pbXBvcnQge1dNUywgd21zfSBmcm9tICcuL3dtcyc7XG5pbXBvcnQge1dNU1QsIHdtc3R9IGZyb20gJy4vd21zdCc7XG5pbXBvcnQge1dNVFMsIHdtdHN9IGZyb20gJy4vd210cyc7XG5pbXBvcnQgRVNSSVRpbGVMYXllciBmcm9tICcuL2VzcmktdGlsZS1sYXllcic7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHtMYXllclJlc291cmNlVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9yZXNvdXJjZS10eXBlcyc7XG5pbXBvcnQgeyBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIgfSBmcm9tICcuL21idnQnO1xuaW1wb3J0IHtcbiAgICBDb25maWcsIEl0ZW1UeXBlcywgTGF5ZXJTZXJ2aWNlLCBYSFJIdHRwQ2xpZW50LFxuICAgIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsLFxuICAgIFNlcnZpY2VUeXBlU3RhbmRhcmRcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmludGVyZmFjZSBMYXllck9wdGlvbnMge1xuICAgIGxheWVycyA/OiBzdHJpbmd8c3RyaW5nW10sXG4gICAgdHJhbnNwYXJlbnQgPzogYm9vbGVhbixcbiAgICBmb3JtYXQgPzogc3RyaW5nLFxuICAgIHBhbmUgPzogc3RyaW5nLFxuICAgIHNycyA/OiBzdHJpbmcsXG4gICAgdXJsID86IHN0cmluZyxcbiAgICB1c2VDb3JzID86IGJvb2xlYW5cbn07XG5cblxuXG5cbi8qXG4gKiBFeHRlbmQgYmFzZSBMZWFmbGV0IGxheWVyIGNsYXNzIHRvIGVuc3VyZSB0aGVyZSdzIGFsd2F5cyBhIGZ1bmN0aW9uXG4gKiBhdmFpbGFibGUgZm9yIG1vZGlmeWluZyB6aW5kZXggYW5kIG9wYWNpdHksIGV2ZW4gaWYgbm90aGluZyBhY3R1YWxseVxuICogaGFwcGVucyBpbnNpZGUuXG4gKi9cbkxheWVyLmluY2x1ZGUoe1xuXG4gICAgLy8gUmVkZWZpbmluZyBhIG1ldGhvZFxuICAgIHNldFpJbmRleDogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH0sXG5cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfVxuXG59KTtcblxuXG5cblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IGFueSB7XG5cbiAgICBpZighc2VydmljZSB8fCB0eXBlb2Yoc2VydmljZS5zdHlsZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgTGF5ZXJTZXJ2aWNlIGluc3RhbmNlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2VydmljZS5zdHlsZShpZClcbiAgICAgICAgICAgIC50aGVuKCByZXN1bHQgPT4gcmVzb2x2ZShyZXN1bHQpIClcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gYEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHtlLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvcihtc2cpICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cblxuXG5cblxuXG4vKipcbiAqIExheWVyIEZhY3RvcnlcbiAqXG4gKiBVc2VkIHRvIGluc3RhbnRpYXRlIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdHMgYXMgTGVhZmxldCBsYXllciBpbnN0YW5jZXNcbiAqIGNhcGFibGUgb2YgYmVpbmcgcmVuZGVyZWQgb24gTGVhZmxldCBtYXBzLlxuICpcbiAqIFVzYWdlOlxuICogICAgICBsZXQgbGVhZmxldExheWVyID0gTGF5ZXJGYWN0b3J5LmNyZWF0ZShncExheWVyT2JqKTtcbiAqXG4gKlxuICogQmFzaWMgbGF5ZXIgc3VwcG9ydCBpcyBidWlsdCBpbiwgYnV0IGFkZGl0aW9uYWwgbGF5ZXIgdHlwZXMgY2FuIGJlIHN1cHBvcnRlZFxuICogYnkgcmVnaXN0ZXJpbmcgbmV3IGZhY3RvcnkgbWV0aG9kcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICAgICBMYXllckZhY3RvcnkucmVnaXN0ZXIoIChncExheWVyT2JqKSA9PiB7XG4gKiAgICAgICAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAqICAgICAgICAgIC8vaW1wbGVtZW50IHRlc3QgdG8gdmVyaWZ5IHN1cHBvcnRlZCBsYXllciB0eXBlXG4gKiAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgIGlmKGlzU3VwcG9ydGVkKSB7XG4gKiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNeUN1c3RvbUxheWVyQ2xhc3MoZ3BMYXllck9iaik7XG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAqICAgICAgfSk7XG4gKlxuICovXG5jbGFzcyBMYXllckZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBmYWN0b3JpZXMgOiBGdW5jdGlvbltdO1xuICAgIHByaXZhdGUgc2VydmljZSA6IExheWVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZhY3RvcmllcyA9IFtdOyAgICAvLyBBIGxpc3Qgb2YgY29uZmlndXJlZCBmYWN0b3J5IGZ1bmN0b3JzIHRvIGluc3RhbnRpYXRlIGxheWVyc1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcihmbiA6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKHR5cGVvZihmbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yaWVzLnB1c2goZm4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TGF5ZXJTZXJ2aWNlKHNlcnZpY2UgOiBMYXllclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKi9cbiAgICBnZXRTdHlsZVJlc29sdmVyKCkgOiBGdW5jdGlvbiB7XG4gICAgICAgIGlmKCF0aGlzLnNlcnZpY2UgfHwgdHlwZW9mKHRoaXMuc2VydmljZS5zdHlsZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIG5ldyBYSFJIdHRwQ2xpZW50KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZVJlc29sdmVyRmFjdG9yeSh0aGlzLnNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsYXllciAtIEdQIExheWVyIG9iamVjdFxuICAgICAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gICAgICovXG4gICAgY3JlYXRlKCBsYXllciA6IExheWVyTW9kZWwgKSA6IExheWVyIHtcbiAgICAgICAgaWYoIWxheWVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMYXllckZhY3RvcnkgZXhwZWN0cyBhIGxheWVyIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmZhY3Rvcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGZuID0gdGhpcy5mYWN0b3JpZXNbaV07XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZm4gJiYgdHlwZW9mKGZuKT09PSdmdW5jdGlvbicgJiYgZm4obGF5ZXIpO1xuICAgICAgICAgICAgaWYocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgaW5pdCAoKSB7XG5cbiAgICAgICAgLy9PU00gZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAoIGxheWVyIDogTGF5ZXJNb2RlbCApPT4ge1xuICAgICAgICAgICAgaWYobGF5ZXIgJiYgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuT1NNKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPU01MYXllckZhY3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRVNSSSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgICAgICAgICAgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsLFxuICAgICAgICAgICAgICAgIC8vIHNycyAgICAgPSBsYXllci5zdXBwb3J0ZWRDUlMgPyBsYXllci5zdXBwb3J0ZWRDUlNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0cyA6IExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tVcmwodXJsKSB7XG4gICAgICAgICAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZSBhIHNlcnZpY2UgdXJsXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUi51cmkgPT09IHR5cGVVcmlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBcInBuZzMyXCJcbiAgICAgICAgICAgICAgICB9IGFzIExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIGlmKHNycykgb3B0cy5zcnMgPSBzcnM7XG4gICAgICAgICAgICAgICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRVNSSVRpbGVMYXllcih1cmwsIG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUi51cmkgPT09IHR5cGVVcmlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmlzVmVjdG9yVGlsZShsYXllcikgICAvL2Rvbid0IHVzZSBFc3JpIGxpYnJhcnkgZm9yIHZlY3RvciB0aWxlIGxheWVyc1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLnRpbGVkTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIudXJpID09PSB0eXBlVXJpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLmltYWdlTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPR0MgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlO1xuICAgICAgICAgICAgbGV0IHR5cGVVcmkgOiBzdHJpbmcgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkZFRUQgJiYgU2VydmljZVR5cGVzLkZFRUQudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25GZWVkKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlciBmYWN0b3J5IGZ1bmN0aW9uIGZvciBQcm90b2J1ZiBWZWN0b3IgVGlsZSBsYXllcnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllcikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VUeXBlcyA9IGxheWVyLnJlc291cmNlVHlwZXMgfHwgW107XG4gICAgICAgICAgICBpZihyZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk1hcEJveFZlY3RvclRpbGUpIDwgMCkgeyAvL25vdCB0YWdnZWQgYXMgVlQgbGF5ZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIobGF5ZXIpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgaXNWZWN0b3JUaWxlKGxheWVyKSB7XG4gICAgICAgIGxldCByZXNvdXJjZVR5cGVzID0gKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMpIHx8IFtdO1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VUeXBlcy5pbmRleE9mKExheWVyUmVzb3VyY2VUeXBlcy5NYXBCb3hWZWN0b3JUaWxlKT49MDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMYXllckZhY3RvcnkoKTtcbiJdfQ==