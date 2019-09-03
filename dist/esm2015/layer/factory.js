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
        (resolve, reject) => {
            service.style(id)
                .then((/**
             * @param {?} result
             * @return {?}
             */
            result => resolve(result)))
                .catch((/**
             * @param {?} e
             * @return {?}
             */
            e => {
                /** @type {?} */
                let msg = `Error loading style information for layer ${id} : ${e.message}`;
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
class LayerFactory {
    constructor() {
        this.factories = []; // A list of configured factory functors to instantiate layers
        this.init();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    register(fn) {
        if (typeof (fn) === 'function') {
            this.factories.push(fn);
        }
    }
    /**
     * @param {?} service
     * @return {?}
     */
    setLayerService(service) {
        this.service = service;
    }
    /**
     *
     * @return {?}
     */
    getStyleResolver() {
        if (!this.service || typeof (this.service.style) === 'undefined') {
            this.service = new LayerService(Config.ualUrl, new XHRHttpClient());
        }
        return styleResolverFactory(this.service);
    }
    /**
     * @param {?} layer - GP Layer object
     * @return {?} leaflet layer instance or null
     */
    create(layer) {
        if (!layer) {
            throw new Error("LayerFactory expects a layer object");
        }
        for (let i = 0; i < this.factories.length; ++i) {
            /** @type {?} */
            let fn = this.factories[i];
            /** @type {?} */
            let result = fn && typeof (fn) === 'function' && fn(layer);
            if (result)
                return result;
        }
        return null;
    }
    /**
     * @return {?}
     */
    init() {
        //OSM factory
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
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
        (layer) => {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            let service = layer.services[0];
            /** @type {?} */
            let url = service.href;
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
            /** @type {?} */
            let 
            // srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;
            /** @type {?} */
            let opts;
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
                let supportedCrs = layer.crs || [];
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
                    styleResolver: this.getStyleResolver()
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
        }));
        // OGC factory
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            let service = layer.services[0];
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
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
        (layer) => {
            if (!layer || !layer.services || !layer.services.length)
                return null;
            /** @type {?} */
            let service = layer.services[0];
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
            if (ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
                return geoJsonFeed(layer, {
                    styleResolver: this.getStyleResolver()
                });
            }
            return null;
        }));
        this.register((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => {
            if (!layer)
                return null;
            /** @type {?} */
            let resourceTypes = layer.resourceTypes || [];
            if (resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) < 0) { //not tagged as VT layer
                return null;
            }
            return mapBoxVectorTileLayer(layer);
            // let href = layer.href;
            // if(!href || href.indexOf(".pbf") < 0) {
            //     console.log("LayerFactory - Layer does not define an Access URL");
            //     return null;  //missing URL
            // }
            //
            // const Leaflet = L as any;
            //
            // //if Leaflet vector grid plugin is not installed, can't render VT Layers
            // if( typeof(Leaflet.vectorGrid) === 'undefined' &&
            //     typeof(Leaflet.vectorGrid.protobuf) === 'undefined') {
            //     console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
            //     return null;
            // }
            //
            // let opts : any = { rendererFactory: ( L.canvas as any ).tile };
            // if( (layer as any).styles ) {
            //     opts.vectorTileLayerStyles = (layer as any).styles;
            // }
            // if(Config.leafletPane) opts.pane = Config.leafletPane;
            // return Leaflet.vectorGrid.protobuf(href, opts);
        }));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDL0MsT0FBTyxFQUNILE1BQU0sRUFBYSxZQUFZLEVBQUUsYUFBYSxFQUdqRCxNQUFNLHFCQUFxQixDQUFDOzs7O0FBRTdCLDJCQVFDOzs7SUFQRyw4QkFBMEI7O0lBQzFCLG1DQUF1Qjs7SUFDdkIsOEJBQWlCOztJQUNqQiw0QkFBZTs7SUFDZiwyQkFBYzs7SUFDZCwyQkFBYzs7SUFDZCwrQkFBa0I7O0FBQ3JCLENBQUM7Ozs7OztBQVVGLEtBQUssQ0FBQyxPQUFPLENBQUM7O0lBR1YsU0FBUzs7OztJQUFFLFVBQVMsS0FBYztRQUM5QiwwREFBMEQ7SUFDOUQsQ0FBQyxDQUFBO0lBRUQsVUFBVTs7OztJQUFFLFVBQVMsS0FBYztRQUMvQiwwREFBMEQ7SUFDOUQsQ0FBQyxDQUFB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NUIsRUFBRTtZQUNGLDJFQUEyRTtZQUMzRSxvREFBb0Q7WUFDcEQsNkRBQTZEO1lBQzdELDJFQUEyRTtZQUMzRSxtQkFBbUI7WUFDbkIsSUFBSTtZQUNKLEVBQUU7WUFDRixrRUFBa0U7WUFDbEUsZ0NBQWdDO1lBQ2hDLDBEQUEwRDtZQUMxRCxJQUFJO1lBQ0oseURBQXlEO1lBQzVELGtEQUFrRDtRQUVuRCxDQUFDLEVBQUMsQ0FBQztJQUlQLENBQUM7Q0FDSjs7Ozs7O0lBNUxHLGlDQUErQjs7Ozs7SUFDL0IsK0JBQStCOztBQTZMbkMsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5pbXBvcnQgU2VydmljZVR5cGVzIGZyb20gXCIuLi9zZXJ2aWNlL3R5cGVzXCI7XG5pbXBvcnQgT1NNIGZyb20gXCIuL29zbVwiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICcuL2ZlYXR1cmUnO1xuaW1wb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn0gZnJvbSAnLi9jbHVzdGVyLWZlYXR1cmUnO1xuXG5pbXBvcnQge1dNUywgd21zfSBmcm9tICcuL3dtcyc7XG5pbXBvcnQge1dNU1QsIHdtc3R9IGZyb20gJy4vd21zdCc7XG5pbXBvcnQge1dNVFMsIHdtdHN9IGZyb20gJy4vd210cyc7XG5pbXBvcnQgRVNSSVRpbGVMYXllciBmcm9tICcuL2VzcmktdGlsZS1sYXllcic7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHtMYXllclJlc291cmNlVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9yZXNvdXJjZS10eXBlcyc7XG5pbXBvcnQgeyBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIgfSBmcm9tICcuL21idnQnO1xuaW1wb3J0IHtcbiAgICBDb25maWcsIEl0ZW1UeXBlcywgTGF5ZXJTZXJ2aWNlLCBYSFJIdHRwQ2xpZW50LFxuICAgIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsLFxuICAgIFNlcnZpY2VUeXBlU3RhbmRhcmRcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmludGVyZmFjZSBMYXllck9wdGlvbnMge1xuICAgIGxheWVycyA/OiBzdHJpbmd8c3RyaW5nW10sXG4gICAgdHJhbnNwYXJlbnQgPzogYm9vbGVhbixcbiAgICBmb3JtYXQgPzogc3RyaW5nLFxuICAgIHBhbmUgPzogc3RyaW5nLFxuICAgIHNycyA/OiBzdHJpbmcsXG4gICAgdXJsID86IHN0cmluZyxcbiAgICB1c2VDb3JzID86IGJvb2xlYW5cbn07XG5cblxuXG5cbi8qXG4gKiBFeHRlbmQgYmFzZSBMZWFmbGV0IGxheWVyIGNsYXNzIHRvIGVuc3VyZSB0aGVyZSdzIGFsd2F5cyBhIGZ1bmN0aW9uXG4gKiBhdmFpbGFibGUgZm9yIG1vZGlmeWluZyB6aW5kZXggYW5kIG9wYWNpdHksIGV2ZW4gaWYgbm90aGluZyBhY3R1YWxseVxuICogaGFwcGVucyBpbnNpZGUuXG4gKi9cbkxheWVyLmluY2x1ZGUoe1xuXG4gICAgLy8gUmVkZWZpbmluZyBhIG1ldGhvZFxuICAgIHNldFpJbmRleDogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH0sXG5cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfVxuXG59KTtcblxuXG5cblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IGFueSB7XG5cbiAgICBpZighc2VydmljZSB8fCB0eXBlb2Yoc2VydmljZS5zdHlsZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTXVzdCBwcm92aWRlIGEgTGF5ZXJTZXJ2aWNlIGluc3RhbmNlXCIpO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2VydmljZS5zdHlsZShpZClcbiAgICAgICAgICAgIC50aGVuKCByZXN1bHQgPT4gcmVzb2x2ZShyZXN1bHQpIClcbiAgICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbXNnID0gYEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHtlLm1lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvcihtc2cpICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuXG5cblxuXG5cblxuXG4vKipcbiAqIExheWVyIEZhY3RvcnlcbiAqXG4gKiBVc2VkIHRvIGluc3RhbnRpYXRlIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdHMgYXMgTGVhZmxldCBsYXllciBpbnN0YW5jZXNcbiAqIGNhcGFibGUgb2YgYmVpbmcgcmVuZGVyZWQgb24gTGVhZmxldCBtYXBzLlxuICpcbiAqIFVzYWdlOlxuICogICAgICBsZXQgbGVhZmxldExheWVyID0gTGF5ZXJGYWN0b3J5LmNyZWF0ZShncExheWVyT2JqKTtcbiAqXG4gKlxuICogQmFzaWMgbGF5ZXIgc3VwcG9ydCBpcyBidWlsdCBpbiwgYnV0IGFkZGl0aW9uYWwgbGF5ZXIgdHlwZXMgY2FuIGJlIHN1cHBvcnRlZFxuICogYnkgcmVnaXN0ZXJpbmcgbmV3IGZhY3RvcnkgbWV0aG9kcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogICAgICBMYXllckZhY3RvcnkucmVnaXN0ZXIoIChncExheWVyT2JqKSA9PiB7XG4gKiAgICAgICAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAqICAgICAgICAgIC8vaW1wbGVtZW50IHRlc3QgdG8gdmVyaWZ5IHN1cHBvcnRlZCBsYXllciB0eXBlXG4gKiAgICAgICAgICAvLyAuLi5cbiAqICAgICAgICAgIGlmKGlzU3VwcG9ydGVkKSB7XG4gKiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBNeUN1c3RvbUxheWVyQ2xhc3MoZ3BMYXllck9iaik7XG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAqICAgICAgfSk7XG4gKlxuICovXG5jbGFzcyBMYXllckZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBmYWN0b3JpZXMgOiBGdW5jdGlvbltdO1xuICAgIHByaXZhdGUgc2VydmljZSA6IExheWVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmZhY3RvcmllcyA9IFtdOyAgICAvLyBBIGxpc3Qgb2YgY29uZmlndXJlZCBmYWN0b3J5IGZ1bmN0b3JzIHRvIGluc3RhbnRpYXRlIGxheWVyc1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICByZWdpc3RlcihmbiA6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKHR5cGVvZihmbikgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjdG9yaWVzLnB1c2goZm4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TGF5ZXJTZXJ2aWNlKHNlcnZpY2UgOiBMYXllclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlID0gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKi9cbiAgICBnZXRTdHlsZVJlc29sdmVyKCkgOiBGdW5jdGlvbiB7XG4gICAgICAgIGlmKCF0aGlzLnNlcnZpY2UgfHwgdHlwZW9mKHRoaXMuc2VydmljZS5zdHlsZSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIG5ldyBYSFJIdHRwQ2xpZW50KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZVJlc29sdmVyRmFjdG9yeSh0aGlzLnNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBsYXllciAtIEdQIExheWVyIG9iamVjdFxuICAgICAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gICAgICovXG4gICAgY3JlYXRlKCBsYXllciA6IExheWVyTW9kZWwgKSA6IExheWVyIHtcbiAgICAgICAgaWYoIWxheWVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMYXllckZhY3RvcnkgZXhwZWN0cyBhIGxheWVyIG9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmZhY3Rvcmllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGZuID0gdGhpcy5mYWN0b3JpZXNbaV07XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZm4gJiYgdHlwZW9mKGZuKT09PSdmdW5jdGlvbicgJiYgZm4obGF5ZXIpO1xuICAgICAgICAgICAgaWYocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuXG4gICAgaW5pdCAoKSB7XG5cbiAgICAgICAgLy9PU00gZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAoIGxheWVyIDogTGF5ZXJNb2RlbCApPT4ge1xuICAgICAgICAgICAgaWYobGF5ZXIgJiYgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuT1NNKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBPU01MYXllckZhY3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRVNSSSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgICAgICAgICAgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlLFxuICAgICAgICAgICAgICAgIHR5cGVVcmkgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsLFxuICAgICAgICAgICAgICAgIC8vIHNycyAgICAgPSBsYXllci5zdXBwb3J0ZWRDUlMgPyBsYXllci5zdXBwb3J0ZWRDUlNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3B0cyA6IExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tVcmwodXJsKSB7XG4gICAgICAgICAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZSBhIHNlcnZpY2UgdXJsXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyczogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmb3JtYXQgfHwgXCJwbmczMlwiXG4gICAgICAgICAgICAgICAgfSBhcyBMYXllck9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICAvLyBpZihzcnMpIG9wdHMuc3JzID0gc3JzO1xuICAgICAgICAgICAgICAgIGxldCBzdXBwb3J0ZWRDcnMgPSBsYXllci5jcnMgfHwgW107XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydGVkQ3JzICYmIHN1cHBvcnRlZENycy5sZW5ndGggPiAwICYmIH5zdXBwb3J0ZWRDcnMuaW5kZXhPZihcIkVTUEc6Mzg1N1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJFUFNHOjM4NTcgU3BoZXJpY2FsIE1lcmNhdG9yIHByb2plY3Rpb24gYW5kIG1heSBub3QgcmVuZGVyIGFwcHJvcHJpYXRlbHkgb3IgYXQgYWxsLlwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVTUklUaWxlTGF5ZXIodXJsLCBvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLnRpbGVkTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9JTUFHRV9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS5pbWFnZU1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT0dDIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlO1xuICAgICAgICAgICAgbGV0IHR5cGVVcmkgOiBzdHJpbmcgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsO1xuXG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuV01TICYmIFNlcnZpY2VUeXBlcy5XTVMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtcyhsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNU1QgJiYgU2VydmljZVR5cGVzLldNU1QudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtc3QobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVRTICYmIFNlcnZpY2VUeXBlcy5XTVRTLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXRzKGxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZTtcbiAgICAgICAgICAgIGxldCB0eXBlVXJpIDogc3RyaW5nID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbDtcbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5GRUVEICYmIFNlcnZpY2VUeXBlcy5GRUVELnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9Kc29uRmVlZChsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllcikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VUeXBlcyA9IGxheWVyLnJlc291cmNlVHlwZXMgfHwgW107XG4gICAgICAgICAgICBpZihyZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk1hcEJveFZlY3RvclRpbGUpIDwgMCkgeyAvL25vdCB0YWdnZWQgYXMgVlQgbGF5ZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIobGF5ZXIpO1xuXG5cblxuXG4gICAgICAgICAgICAvLyBsZXQgaHJlZiA9IGxheWVyLmhyZWY7XG4gICAgICAgICAgICAvLyBpZighaHJlZiB8fCBocmVmLmluZGV4T2YoXCIucGJmXCIpIDwgMCkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGF5ZXIgZG9lcyBub3QgZGVmaW5lIGFuIEFjY2VzcyBVUkxcIik7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7ICAvL21pc3NpbmcgVVJMXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gY29uc3QgTGVhZmxldCA9IEwgYXMgYW55O1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIC8vaWYgTGVhZmxldCB2ZWN0b3IgZ3JpZCBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgY2FuJ3QgcmVuZGVyIFZUIExheWVyc1xuICAgICAgICAgICAgLy8gaWYoIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQpID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgLy8gICAgIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGVhZmxldCBWZWN0b3IgVGlsZXMgcGx1Z2luIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBsZXQgb3B0cyA6IGFueSA9IHsgcmVuZGVyZXJGYWN0b3J5OiAoIEwuY2FudmFzIGFzIGFueSApLnRpbGUgfTtcbiAgICAgICAgICAgIC8vIGlmKCAobGF5ZXIgYXMgYW55KS5zdHlsZXMgKSB7XG4gICAgICAgICAgICAvLyAgICAgb3B0cy52ZWN0b3JUaWxlTGF5ZXJTdHlsZXMgPSAobGF5ZXIgYXMgYW55KS5zdHlsZXM7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgXHQvLyByZXR1cm4gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExheWVyRmFjdG9yeSgpO1xuIl19