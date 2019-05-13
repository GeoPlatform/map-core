/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as esri from "esri-leaflet";
import ServiceTypes from "../service/types";
import { clusteredFeatures, geoJsonFeed } from './cluster-feature';
import { wms } from './wms';
import { wmst } from './wmst';
import { wmts } from './wmts';
import ESRITileLayer from './L.TileLayer.ESRI';
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
var LayerFactory = /** @class */ (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbImxheWVyL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFHdEIsT0FBTyxLQUFLLElBQUksTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxZQUFZLE1BQU0sa0JBQWtCLENBQUM7QUFHNUMsT0FBTyxFQUVILGlCQUFpQixFQUNqQixXQUFXLEVBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQU0sR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBTyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLGVBQWUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLE1BQU0sRUFBYSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVV0RixDQUFDOzs7Ozs7QUFPRiw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxPQUFPLDhCQUE4QixFQUFFO1FBQ25DLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDOztZQUM1QixJQUFJLEdBQUcsR0FBRywrQ0FBNkMsRUFB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Y2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IExheWVyIH0gZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xuaW1wb3J0IFNlcnZpY2VUeXBlcyBmcm9tIFwiLi4vc2VydmljZS90eXBlc1wiO1xuaW1wb3J0IE9TTSBmcm9tIFwiLi9vc21cIjtcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnLi9mZWF0dXJlJztcbmltcG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59IGZyb20gJy4vY2x1c3Rlci1mZWF0dXJlJztcblxuaW1wb3J0IHtXTVMsIHdtc30gZnJvbSAnLi93bXMnO1xuaW1wb3J0IHtXTVNULCB3bXN0fSBmcm9tICcuL3dtc3QnO1xuaW1wb3J0IHtXTVRTLCB3bXRzfSBmcm9tICcuL3dtdHMnO1xuaW1wb3J0IEVTUklUaWxlTGF5ZXIgZnJvbSAnLi9MLlRpbGVMYXllci5FU1JJJztcbmltcG9ydCBPU01MYXllckZhY3RvcnkgZnJvbSAnLi9vc20tZmFjdG9yeSc7XG5pbXBvcnQgeyBDb25maWcsIEl0ZW1UeXBlcywgTGF5ZXJTZXJ2aWNlLCBKUXVlcnlIdHRwQ2xpZW50IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuaW50ZXJmYWNlIExheWVyT3B0aW9ucyB7XG4gICAgbGF5ZXJzID86IHN0cmluZ3xzdHJpbmdbXSxcbiAgICB0cmFuc3BhcmVudCA/OiBib29sZWFuLFxuICAgIGZvcm1hdCA/OiBzdHJpbmcsXG4gICAgcGFuZSA/OiBzdHJpbmcsXG4gICAgc3JzID86IHN0cmluZyxcbiAgICB1cmwgPzogc3RyaW5nLFxuICAgIHVzZUNvcnMgPzogYm9vbGVhblxufTtcblxuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gc3R5bGVSZXNvbHZlckZhY3Rvcnkoc2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogYW55IHtcblxuICAgIGlmKCFzZXJ2aWNlIHx8IHR5cGVvZihzZXJ2aWNlLnN0eWxlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBMYXllclNlcnZpY2UgaW5zdGFuY2VcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnN0eWxlKGlkKS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KCBuZXcgRXJyb3IobXNnKSApO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cblxuXG5cblxuXG5cblxuY2xhc3MgTGF5ZXJGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgZmFjdG9yaWVzIDogRnVuY3Rpb25bXTtcbiAgICBwcml2YXRlIHNlcnZpY2UgOiBMYXllclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXMgPSBbXTsgICAgLy8gQSBsaXN0IG9mIGNvbmZpZ3VyZWQgZmFjdG9yeSBmdW5jdG9ycyB0byBpbnN0YW50aWF0ZSBsYXllcnNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoZm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZih0eXBlb2YoZm4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExheWVyU2VydmljZShzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICovXG4gICAgZ2V0U3R5bGVSZXNvbHZlcigpIDogRnVuY3Rpb24ge1xuICAgICAgICBpZighdGhpcy5zZXJ2aWNlIHx8IHR5cGVvZih0aGlzLnNlcnZpY2Uuc3R5bGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgSlF1ZXJ5SHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVSZXNvbHZlckZhY3RvcnkodGhpcy5zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBHUCBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZShsYXllciA6IGFueSkgOiBMYXllciB7XG4gICAgICAgIGlmKCFsYXllcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXJGYWN0b3J5IGV4cGVjdHMgYSBsYXllciBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5mYWN0b3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmbiA9IHRoaXMuZmFjdG9yaWVzW2ldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZuICYmIHR5cGVvZihmbik9PT0nZnVuY3Rpb24nICYmIGZuKGxheWVyKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGluaXQgKCkge1xuXG4gICAgICAgIC8vT1NNIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlcigobGF5ZXIgOiBhbnkpPT4ge1xuICAgICAgICAgICAgaWYobGF5ZXIgJiYgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNTGF5ZXJGYWN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEVTUkkgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzWzBdLFxuICAgICAgICAgICAgICAgIHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHNlcnZpY2Uuc2VydmljZVR5cGUgPyBzZXJ2aWNlLnNlcnZpY2VUeXBlLnVyaSA6IG51bGwsXG4gICAgICAgICAgICAgICAgc3JzICAgICA9IGxheWVyLnN1cHBvcnRlZENSUyA/IGxheWVyLnN1cHBvcnRlZENSU1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcHRzIDogTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1VybCh1cmwpIHtcbiAgICAgICAgICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lIGEgc2VydmljZSB1cmxcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBcInBuZzMyXCJcbiAgICAgICAgICAgICAgICB9IGFzIExheWVyT3B0aW9ucztcbiAgICAgICAgICAgICAgICBpZihzcnMpIG9wdHMuc3JzID0gc3JzO1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRVNSSVRpbGVMYXllcih1cmwsIG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkudGlsZWRNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLmltYWdlTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPR0MgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlID8gc2VydmljZS5zZXJ2aWNlVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLldNUyAmJiBTZXJ2aWNlVHlwZXMuV01TLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXMobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVNUICYmIFNlcnZpY2VUeXBlcy5XTVNULnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXN0KGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01UUyAmJiBTZXJ2aWNlVHlwZXMuV01UUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd210cyhsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzWzBdLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlID8gc2VydmljZS5zZXJ2aWNlVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkZFRUQgJiYgU2VydmljZVR5cGVzLkZFRUQudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25GZWVkKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTGF5ZXJGYWN0b3J5KCk7XG4iXX0=