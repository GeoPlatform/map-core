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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sWUFBWSxNQUFNLGtCQUFrQixDQUFDO0FBRzVDLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsV0FBVyxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFNLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBTyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxlQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVdEYsQ0FBQzs7Ozs7O0FBT0YsOEJBQThCLE9BQXVCO0lBRWpELElBQUcsQ0FBQyxPQUFPLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0tBQzNEO0lBRUQsT0FBTyw4QkFBOEIsRUFBRTtRQUNuQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsQ0FBQzs7WUFDNUIsSUFBSSxHQUFHLEdBQUcsK0NBQTZDLEVB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cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCJsZWFmbGV0XCI7XG5pbXBvcnQgKiBhcyBlc3JpIGZyb20gXCJlc3JpLWxlYWZsZXRcIjtcbmltcG9ydCBTZXJ2aWNlVHlwZXMgZnJvbSBcIi4uL3NlcnZpY2UvdHlwZXNcIjtcbmltcG9ydCBPU00gZnJvbSBcIi4vb3NtXCI7XG5pbXBvcnQgRmVhdHVyZUxheWVyIGZyb20gJy4vZmVhdHVyZSc7XG5pbXBvcnQge1xuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllcixcbiAgICBjbHVzdGVyZWRGZWF0dXJlcyxcbiAgICBnZW9Kc29uRmVlZFxufSBmcm9tICcuL2NsdXN0ZXItZmVhdHVyZSc7XG5cbmltcG9ydCB7V01TLCB3bXN9IGZyb20gJy4vd21zJztcbmltcG9ydCB7V01TVCwgd21zdH0gZnJvbSAnLi93bXN0JztcbmltcG9ydCB7V01UUywgd210c30gZnJvbSAnLi93bXRzJztcbmltcG9ydCBFU1JJVGlsZUxheWVyIGZyb20gJy4vTC5UaWxlTGF5ZXIuRVNSSSc7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHsgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgSlF1ZXJ5SHR0cENsaWVudCB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbmludGVyZmFjZSBMYXllck9wdGlvbnMge1xuICAgIGxheWVycyA/OiBzdHJpbmd8c3RyaW5nW10sXG4gICAgdHJhbnNwYXJlbnQgPzogYm9vbGVhbixcbiAgICBmb3JtYXQgPzogc3RyaW5nLFxuICAgIHBhbmUgPzogc3RyaW5nLFxuICAgIHNycyA/OiBzdHJpbmcsXG4gICAgdXJsID86IHN0cmluZyxcbiAgICB1c2VDb3JzID86IGJvb2xlYW5cbn07XG5cblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IGFueSB7XG5cbiAgICBpZighc2VydmljZSB8fCB0eXBlb2Yoc2VydmljZS5zdHlsZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgTGF5ZXJTZXJ2aWNlIGluc3RhbmNlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCkge1xuICAgICAgICByZXR1cm4gc2VydmljZS5zdHlsZShpZCkuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsZXQgbXNnID0gYEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHtlLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgIHJldHVybiBRLnJlamVjdCggbmV3IEVycm9yKG1zZykgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cblxuXG5cblxuXG5cbmNsYXNzIExheWVyRmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGZhY3RvcmllcyA6IEZ1bmN0aW9uW107XG4gICAgcHJpdmF0ZSBzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yaWVzID0gW107ICAgIC8vIEEgbGlzdCBvZiBjb25maWd1cmVkIGZhY3RvcnkgZnVuY3RvcnMgdG8gaW5zdGFudGlhdGUgbGF5ZXJzXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKGZuIDogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodHlwZW9mKGZuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXMucHVzaChmbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMYXllclNlcnZpY2Uoc2VydmljZSA6IExheWVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqL1xuICAgIGdldFN0eWxlUmVzb2x2ZXIoKSA6IEZ1bmN0aW9uIHtcbiAgICAgICAgaWYoIXRoaXMuc2VydmljZSB8fCB0eXBlb2YodGhpcy5zZXJ2aWNlLnN0eWxlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IEpRdWVyeUh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHRoaXMuc2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxheWVyIC0gR1AgTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGUobGF5ZXIgOiBhbnkpIDogTGF5ZXIge1xuICAgICAgICBpZighbGF5ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxheWVyRmFjdG9yeSBleHBlY3RzIGEgbGF5ZXIgb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZmFjdG9yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZm4gPSB0aGlzLmZhY3Rvcmllc1tpXTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmbiAmJiB0eXBlb2YoZm4pPT09J2Z1bmN0aW9uJyAmJiBmbihsYXllcik7XG4gICAgICAgICAgICBpZihyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBpbml0ICgpIHtcblxuICAgICAgICAvL09TTSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKGxheWVyIDogYW55KT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTUxheWVyRmFjdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFU1JJIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlID8gc2VydmljZS5zZXJ2aWNlVHlwZS51cmkgOiBudWxsLFxuICAgICAgICAgICAgICAgIHNycyAgICAgPSBsYXllci5zdXBwb3J0ZWRDUlMgPyBsYXllci5zdXBwb3J0ZWRDUlNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0cyA6IExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tVcmwodXJsKSB7XG4gICAgICAgICAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZSBhIHNlcnZpY2UgdXJsXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyczogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgXCJwbmczMlwiXG4gICAgICAgICAgICAgICAgfSBhcyBMYXllck9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYoc3JzKSBvcHRzLnNycyA9IHNycztcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVTUklUaWxlTGF5ZXIodXJsLCBvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLnRpbGVkTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS5pbWFnZU1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT0dDIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc2VydmljZS5zZXJ2aWNlVHlwZSA/IHNlcnZpY2Uuc2VydmljZVR5cGUudXJpIDogbnVsbDtcbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogYW55KSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlc1swXSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc2VydmljZS5zZXJ2aWNlVHlwZSA/IHNlcnZpY2Uuc2VydmljZVR5cGUudXJpIDogbnVsbDtcbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5GRUVEICYmIFNlcnZpY2VUeXBlcy5GRUVELnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9Kc29uRmVlZChsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExheWVyRmFjdG9yeSgpO1xuIl19