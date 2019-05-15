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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVwRixDQUFDOzs7Ozs7QUFVRixLQUFLLENBQUMsT0FBTyxDQUFDOztJQUdWLFNBQVMsRUFBRSxVQUFTLEtBQWM7O0tBRWpDO0lBRUQsVUFBVSxFQUFFLFVBQVMsS0FBYzs7S0FFbEM7Q0FFSixDQUFDLENBQUM7Ozs7OztBQVNILDhCQUE4QixPQUF1QjtJQUVqRCxJQUFHLENBQUMsT0FBTyxJQUFJLE9BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssVUFBVSxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztLQUMzRDtJQUVELE9BQU8sOEJBQThCLEVBQUU7UUFDbkMsT0FBTyxP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LENBQUMsQ0FBQztLQUlOO3VCQXJQTDtJQXNQQyxDQUFBOzs7Ozs7O0FBRUQsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCB7IExheWVyIH0gZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xuaW1wb3J0IFNlcnZpY2VUeXBlcyBmcm9tIFwiLi4vc2VydmljZS90eXBlc1wiO1xuaW1wb3J0IE9TTSBmcm9tIFwiLi9vc21cIjtcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnLi9mZWF0dXJlJztcbmltcG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59IGZyb20gJy4vY2x1c3Rlci1mZWF0dXJlJztcblxuaW1wb3J0IHtXTVMsIHdtc30gZnJvbSAnLi93bXMnO1xuaW1wb3J0IHtXTVNULCB3bXN0fSBmcm9tICcuL3dtc3QnO1xuaW1wb3J0IHtXTVRTLCB3bXRzfSBmcm9tICcuL3dtdHMnO1xuaW1wb3J0IEVTUklUaWxlTGF5ZXIgZnJvbSAnLi9lc3JpLXRpbGUtbGF5ZXInO1xuaW1wb3J0IE9TTUxheWVyRmFjdG9yeSBmcm9tICcuL29zbS1mYWN0b3J5JztcbmltcG9ydCB7IENvbmZpZywgSXRlbVR5cGVzLCBMYXllclNlcnZpY2UsIFhIUkh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW50ZXJmYWNlIExheWVyT3B0aW9ucyB7XG4gICAgbGF5ZXJzID86IHN0cmluZ3xzdHJpbmdbXSxcbiAgICB0cmFuc3BhcmVudCA/OiBib29sZWFuLFxuICAgIGZvcm1hdCA/OiBzdHJpbmcsXG4gICAgcGFuZSA/OiBzdHJpbmcsXG4gICAgc3JzID86IHN0cmluZyxcbiAgICB1cmwgPzogc3RyaW5nLFxuICAgIHVzZUNvcnMgPzogYm9vbGVhblxufTtcblxuXG5cblxuLypcbiAqIEV4dGVuZCBiYXNlIExlYWZsZXQgbGF5ZXIgY2xhc3MgdG8gZW5zdXJlIHRoZXJlJ3MgYWx3YXlzIGEgZnVuY3Rpb25cbiAqIGF2YWlsYWJsZSBmb3IgbW9kaWZ5aW5nIHppbmRleCBhbmQgb3BhY2l0eSwgZXZlbiBpZiBub3RoaW5nIGFjdHVhbGx5XG4gKiBoYXBwZW5zIGluc2lkZS5cbiAqL1xuTGF5ZXIuaW5jbHVkZSh7XG5cbiAgICAvLyBSZWRlZmluaW5nIGEgbWV0aG9kXG4gICAgc2V0WkluZGV4OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfSxcblxuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9XG5cbn0pO1xuXG5cblxuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gc3R5bGVSZXNvbHZlckZhY3Rvcnkoc2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogYW55IHtcblxuICAgIGlmKCFzZXJ2aWNlIHx8IHR5cGVvZihzZXJ2aWNlLnN0eWxlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBMYXllclNlcnZpY2UgaW5zdGFuY2VcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnN0eWxlKGlkKS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KCBuZXcgRXJyb3IobXNnKSApO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cblxuXG5cblxuXG5cbi8qKlxuICogTGF5ZXIgRmFjdG9yeVxuICpcbiAqIFVzZWQgdG8gaW5zdGFudGlhdGUgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0cyBhcyBMZWFmbGV0IGxheWVyIGluc3RhbmNlc1xuICogY2FwYWJsZSBvZiBiZWluZyByZW5kZXJlZCBvbiBMZWFmbGV0IG1hcHMuXG4gKlxuICogVXNhZ2U6XG4gKiAgICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBMYXllckZhY3RvcnkuY3JlYXRlKGdwTGF5ZXJPYmopO1xuICpcbiAqXG4gKiBCYXNpYyBsYXllciBzdXBwb3J0IGlzIGJ1aWx0IGluLCBidXQgYWRkaXRpb25hbCBsYXllciB0eXBlcyBjYW4gYmUgc3VwcG9ydGVkXG4gKiBieSByZWdpc3RlcmluZyBuZXcgZmFjdG9yeSBtZXRob2RzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiAgICAgIExheWVyRmFjdG9yeS5yZWdpc3RlciggKGdwTGF5ZXJPYmopID0+IHtcbiAqICAgICAgICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICogICAgICAgICAgLy9pbXBsZW1lbnQgdGVzdCB0byB2ZXJpZnkgc3VwcG9ydGVkIGxheWVyIHR5cGVcbiAqICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgaWYoaXNTdXBwb3J0ZWQpIHtcbiAqICAgICAgICAgICAgICByZXR1cm4gbmV3IE15Q3VzdG9tTGF5ZXJDbGFzcyhncExheWVyT2JqKTtcbiAqICAgICAgICAgIH1cbiAqICAgICAgICAgIHJldHVybiBudWxsO1xuICogICAgICB9KTtcbiAqXG4gKi9cbmNsYXNzIExheWVyRmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGZhY3RvcmllcyA6IEZ1bmN0aW9uW107XG4gICAgcHJpdmF0ZSBzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yaWVzID0gW107ICAgIC8vIEEgbGlzdCBvZiBjb25maWd1cmVkIGZhY3RvcnkgZnVuY3RvcnMgdG8gaW5zdGFudGlhdGUgbGF5ZXJzXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKGZuIDogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodHlwZW9mKGZuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXMucHVzaChmbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMYXllclNlcnZpY2Uoc2VydmljZSA6IExheWVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqL1xuICAgIGdldFN0eWxlUmVzb2x2ZXIoKSA6IEZ1bmN0aW9uIHtcbiAgICAgICAgaWYoIXRoaXMuc2VydmljZSB8fCB0eXBlb2YodGhpcy5zZXJ2aWNlLnN0eWxlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHRoaXMuc2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxheWVyIC0gR1AgTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGUobGF5ZXIgOiBhbnkpIDogTGF5ZXIge1xuICAgICAgICBpZighbGF5ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxheWVyRmFjdG9yeSBleHBlY3RzIGEgbGF5ZXIgb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZmFjdG9yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZm4gPSB0aGlzLmZhY3Rvcmllc1tpXTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmbiAmJiB0eXBlb2YoZm4pPT09J2Z1bmN0aW9uJyAmJiBmbihsYXllcik7XG4gICAgICAgICAgICBpZihyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBpbml0ICgpIHtcblxuICAgICAgICAvL09TTSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKGxheWVyIDogYW55KT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTUxheWVyRmFjdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFU1JJIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlID8gc2VydmljZS5zZXJ2aWNlVHlwZS51cmkgOiBudWxsLFxuICAgICAgICAgICAgICAgIHNycyAgICAgPSBsYXllci5zdXBwb3J0ZWRDUlMgPyBsYXllci5zdXBwb3J0ZWRDUlNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0cyA6IExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tVcmwodXJsKSB7XG4gICAgICAgICAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZSBhIHNlcnZpY2UgdXJsXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyczogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgXCJwbmczMlwiXG4gICAgICAgICAgICAgICAgfSBhcyBMYXllck9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYoc3JzKSBvcHRzLnNycyA9IHNycztcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVTUklUaWxlTGF5ZXIodXJsLCBvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLnRpbGVkTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS5pbWFnZU1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT0dDIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc2VydmljZS5zZXJ2aWNlVHlwZSA/IHNlcnZpY2Uuc2VydmljZVR5cGUudXJpIDogbnVsbDtcbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc2VydmljZS5zZXJ2aWNlVHlwZSA/IHNlcnZpY2Uuc2VydmljZVR5cGUudXJpIDogbnVsbDtcbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5GRUVEICYmIFNlcnZpY2VUeXBlcy5GRUVELnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9Kc29uRmVlZChsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExheWVyRmFjdG9yeSgpO1xuIl19