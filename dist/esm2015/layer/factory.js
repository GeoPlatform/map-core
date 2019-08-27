/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        return new Promise((resolve, reject) => {
            service.style(id)
                .then(result => resolve(result))
                .catch(e => {
                /** @type {?} */
                let msg = `Error loading style information for layer ${id} : ${e.message}`;
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
        this.register((layer) => {
            if (layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM)) {
                return OSMLayerFactory();
            }
        });
        // ESRI factory
        this.register((layer) => {
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
                opts = /** @type {?} */ ({
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                });
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
        });
        // OGC factory
        this.register((layer) => {
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
        });
        this.register((layer) => {
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
        });
        this.register((layer) => {
            if (!layer)
                return null;
            /** @type {?} */
            let resourceTypes = layer.resourceTypes || [];
            if (resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) < 0) { //not tagged as VT layer
                //not tagged as VT layer
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
        });
    }
}
if (false) {
    /** @type {?} */
    LayerFactory.prototype.factories;
    /** @type {?} */
    LayerFactory.prototype.service;
}
export default new LayerFactory();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDL0MsT0FBTyxFQUNILE1BQU0sRUFBYSxZQUFZLEVBQUUsYUFBYSxFQUdqRCxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVTVCLENBQUM7Ozs7OztBQVVGLEtBQUssQ0FBQyxPQUFPLENBQUM7O0lBR1YsU0FBUyxFQUFFLFVBQVMsS0FBYzs7S0FFakM7SUFFRCxVQUFVLEVBQUUsVUFBUyxLQUFjOztLQUVsQztDQUVKLENBQUMsQ0FBQzs7Ozs7O0FBU0gsOEJBQThCLE9BQXVCO0lBRWpELElBQUcsQ0FBQyxPQUFPLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FB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LENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQy9DLElBQUksT0FBTyxHQUF5QixPQUFPLENBQUMsV0FBVyxDQUFDOztZQUN4RCxJQUFJLE9BQU8sR0FBWSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwRCxJQUFHLFlBQVksQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUN2RCxPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3pDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZixDQUFDLENBQUM7UUFLSCxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQ2xDLElBQUcsQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztZQUN2QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7O2dCQUN6RixPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTJCdkMsQ0FBQyxDQUFDO0tBSU47Q0FDSjs7Ozs7OztBQUVELGVBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IExheWVyIH0gZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xuaW1wb3J0IFNlcnZpY2VUeXBlcyBmcm9tIFwiLi4vc2VydmljZS90eXBlc1wiO1xuaW1wb3J0IE9TTSBmcm9tIFwiLi9vc21cIjtcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnLi9mZWF0dXJlJztcbmltcG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59IGZyb20gJy4vY2x1c3Rlci1mZWF0dXJlJztcblxuaW1wb3J0IHtXTVMsIHdtc30gZnJvbSAnLi93bXMnO1xuaW1wb3J0IHtXTVNULCB3bXN0fSBmcm9tICcuL3dtc3QnO1xuaW1wb3J0IHtXTVRTLCB3bXRzfSBmcm9tICcuL3dtdHMnO1xuaW1wb3J0IEVTUklUaWxlTGF5ZXIgZnJvbSAnLi9lc3JpLXRpbGUtbGF5ZXInO1xuaW1wb3J0IE9TTUxheWVyRmFjdG9yeSBmcm9tICcuL29zbS1mYWN0b3J5JztcbmltcG9ydCB7TGF5ZXJSZXNvdXJjZVR5cGVzfSBmcm9tICcuLi9zaGFyZWQvcmVzb3VyY2UtdHlwZXMnO1xuaW1wb3J0IHsgbWFwQm94VmVjdG9yVGlsZUxheWVyIH0gZnJvbSAnLi9tYnZ0JztcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBJdGVtVHlwZXMsIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCxcbiAgICBMYXllciBhcyBMYXllck1vZGVsLCBTZXJ2aWNlIGFzIFNlcnZpY2VNb2RlbCxcbiAgICBTZXJ2aWNlVHlwZVN0YW5kYXJkXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbnRlcmZhY2UgTGF5ZXJPcHRpb25zIHtcbiAgICBsYXllcnMgPzogc3RyaW5nfHN0cmluZ1tdLFxuICAgIHRyYW5zcGFyZW50ID86IGJvb2xlYW4sXG4gICAgZm9ybWF0ID86IHN0cmluZyxcbiAgICBwYW5lID86IHN0cmluZyxcbiAgICBzcnMgPzogc3RyaW5nLFxuICAgIHVybCA/OiBzdHJpbmcsXG4gICAgdXNlQ29ycyA/OiBib29sZWFuXG59O1xuXG5cblxuXG4vKlxuICogRXh0ZW5kIGJhc2UgTGVhZmxldCBsYXllciBjbGFzcyB0byBlbnN1cmUgdGhlcmUncyBhbHdheXMgYSBmdW5jdGlvblxuICogYXZhaWxhYmxlIGZvciBtb2RpZnlpbmcgemluZGV4IGFuZCBvcGFjaXR5LCBldmVuIGlmIG5vdGhpbmcgYWN0dWFsbHlcbiAqIGhhcHBlbnMgaW5zaWRlLlxuICovXG5MYXllci5pbmNsdWRlKHtcblxuICAgIC8vIFJlZGVmaW5pbmcgYSBtZXRob2RcbiAgICBzZXRaSW5kZXg6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9LFxuXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24odmFsdWUgOiBudW1iZXIpIHtcbiAgICAgICAgLy9kbyBub3RoaW5nIGluIHRoaXMgYWJzdHJhY3QgY2xhc3MsIGxldCBpbXBscyBkbyB0aGUgd29ya1xuICAgIH1cblxufSk7XG5cblxuXG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBzdHlsZVJlc29sdmVyRmFjdG9yeShzZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuXG4gICAgaWYoIXNlcnZpY2UgfHwgdHlwZW9mKHNlcnZpY2Uuc3R5bGUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk11c3QgcHJvdmlkZSBhIExheWVyU2VydmljZSBpbnN0YW5jZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNlcnZpY2Uuc3R5bGUoaWQpXG4gICAgICAgICAgICAudGhlbiggcmVzdWx0ID0+IHJlc29sdmUocmVzdWx0KSApXG4gICAgICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IGBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IobXNnKSApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cblxuXG5cblxuXG5cblxuLyoqXG4gKiBMYXllciBGYWN0b3J5XG4gKlxuICogVXNlZCB0byBpbnN0YW50aWF0ZSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RzIGFzIExlYWZsZXQgbGF5ZXIgaW5zdGFuY2VzXG4gKiBjYXBhYmxlIG9mIGJlaW5nIHJlbmRlcmVkIG9uIExlYWZsZXQgbWFwcy5cbiAqXG4gKiBVc2FnZTpcbiAqICAgICAgbGV0IGxlYWZsZXRMYXllciA9IExheWVyRmFjdG9yeS5jcmVhdGUoZ3BMYXllck9iaik7XG4gKlxuICpcbiAqIEJhc2ljIGxheWVyIHN1cHBvcnQgaXMgYnVpbHQgaW4sIGJ1dCBhZGRpdGlvbmFsIGxheWVyIHR5cGVzIGNhbiBiZSBzdXBwb3J0ZWRcbiAqIGJ5IHJlZ2lzdGVyaW5nIG5ldyBmYWN0b3J5IG1ldGhvZHMuXG4gKlxuICogRXhhbXBsZTpcbiAqICAgICAgTGF5ZXJGYWN0b3J5LnJlZ2lzdGVyKCAoZ3BMYXllck9iaikgPT4ge1xuICogICAgICAgICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gKiAgICAgICAgICAvL2ltcGxlbWVudCB0ZXN0IHRvIHZlcmlmeSBzdXBwb3J0ZWQgbGF5ZXIgdHlwZVxuICogICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICBpZihpc1N1cHBvcnRlZCkge1xuICogICAgICAgICAgICAgIHJldHVybiBuZXcgTXlDdXN0b21MYXllckNsYXNzKGdwTGF5ZXJPYmopO1xuICogICAgICAgICAgfVxuICogICAgICAgICAgcmV0dXJuIG51bGw7XG4gKiAgICAgIH0pO1xuICpcbiAqL1xuY2xhc3MgTGF5ZXJGYWN0b3J5IHtcblxuICAgIHByaXZhdGUgZmFjdG9yaWVzIDogRnVuY3Rpb25bXTtcbiAgICBwcml2YXRlIHNlcnZpY2UgOiBMYXllclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mYWN0b3JpZXMgPSBbXTsgICAgLy8gQSBsaXN0IG9mIGNvbmZpZ3VyZWQgZmFjdG9yeSBmdW5jdG9ycyB0byBpbnN0YW50aWF0ZSBsYXllcnNcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIoZm4gOiBGdW5jdGlvbikge1xuICAgICAgICBpZih0eXBlb2YoZm4pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZhY3Rvcmllcy5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldExheWVyU2VydmljZShzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICovXG4gICAgZ2V0U3R5bGVSZXNvbHZlcigpIDogRnVuY3Rpb24ge1xuICAgICAgICBpZighdGhpcy5zZXJ2aWNlIHx8IHR5cGVvZih0aGlzLnNlcnZpY2Uuc3R5bGUpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVSZXNvbHZlckZhY3RvcnkodGhpcy5zZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBHUCBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICAgICAqL1xuICAgIGNyZWF0ZSggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBMYXllciB7XG4gICAgICAgIGlmKCFsYXllcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXJGYWN0b3J5IGV4cGVjdHMgYSBsYXllciBvYmplY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5mYWN0b3JpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBmbiA9IHRoaXMuZmFjdG9yaWVzW2ldO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZuICYmIHR5cGVvZihmbik9PT0nZnVuY3Rpb24nICYmIGZuKGxheWVyKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIGluaXQgKCkge1xuXG4gICAgICAgIC8vT1NNIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKCBsYXllciA6IExheWVyTW9kZWwgKT0+IHtcbiAgICAgICAgICAgIGlmKGxheWVyICYmIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk9TTSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNTGF5ZXJGYWN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEVTUkkgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICAgICAgICAgIHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZSxcbiAgICAgICAgICAgICAgICB0eXBlVXJpID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAvLyBzcnMgICAgID0gbGF5ZXIuc3VwcG9ydGVkQ1JTID8gbGF5ZXIuc3VwcG9ydGVkQ1JTWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wdHMgOiBMYXllck9wdGlvbnM7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVXJsKHVybCkge1xuICAgICAgICAgICAgICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIkxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmUgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkVTUklfTUFQX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tVcmwodXJsKTtcbiAgICAgICAgICAgICAgICBvcHRzID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZm9ybWF0IHx8IFwicG5nMzJcIlxuICAgICAgICAgICAgICAgIH0gYXMgTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYoc3JzKSBvcHRzLnNycyA9IHNycztcbiAgICAgICAgICAgICAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFU1JJVGlsZUxheWVyKHVybCwgb3B0cyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0ZFQVRVUkVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX1RJTEVfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHsgdXJsOiB1cmwsIHVzZUNvcnM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXNyaS50aWxlZE1hcExheWVyKG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSICYmXG4gICAgICAgICAgICAgICAgU2VydmljZVR5cGVzLkVTUklfSU1BR0VfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkuaW1hZ2VNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9HQyBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoIChsYXllciA6IExheWVyTW9kZWwpID0+IHtcbiAgICAgICAgICAgIGlmKCFsYXllciB8fCAhbGF5ZXIuc2VydmljZXMgfHwgIWxheWVyLnNlcnZpY2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzWzBdO1xuICAgICAgICAgICAgbGV0IHN2Y1R5cGUgOiBTZXJ2aWNlVHlwZVN0YW5kYXJkID0gc2VydmljZS5zZXJ2aWNlVHlwZTtcbiAgICAgICAgICAgIGxldCB0eXBlVXJpIDogc3RyaW5nID0gc3ZjVHlwZSA/IHN2Y1R5cGUudXJpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLldNUyAmJiBTZXJ2aWNlVHlwZXMuV01TLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXMobGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5XTVNUICYmIFNlcnZpY2VUeXBlcy5XTVNULnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3bXN0KGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01UUyAmJiBTZXJ2aWNlVHlwZXMuV01UUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd210cyhsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG4gICAgICAgICAgICBpZihTZXJ2aWNlVHlwZXMuRkVFRCAmJiBTZXJ2aWNlVHlwZXMuRkVFRC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvSnNvbkZlZWQobGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVSZXNvbHZlcjogdGhpcy5nZXRTdHlsZVJlc29sdmVyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHJlc291cmNlVHlwZXMgPSBsYXllci5yZXNvdXJjZVR5cGVzIHx8IFtdO1xuICAgICAgICAgICAgaWYocmVzb3VyY2VUeXBlcy5pbmRleE9mKExheWVyUmVzb3VyY2VUeXBlcy5NYXBCb3hWZWN0b3JUaWxlKSA8IDApIHsgLy9ub3QgdGFnZ2VkIGFzIFZUIGxheWVyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWFwQm94VmVjdG9yVGlsZUxheWVyKGxheWVyKTtcblxuXG5cblxuICAgICAgICAgICAgLy8gbGV0IGhyZWYgPSBsYXllci5ocmVmO1xuICAgICAgICAgICAgLy8gaWYoIWhyZWYgfHwgaHJlZi5pbmRleE9mKFwiLnBiZlwiKSA8IDApIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExheWVyIGRvZXMgbm90IGRlZmluZSBhbiBBY2Nlc3MgVVJMXCIpO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiBudWxsOyAgLy9taXNzaW5nIFVSTFxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIGNvbnN0IExlYWZsZXQgPSBMIGFzIGFueTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAvL2lmIExlYWZsZXQgdmVjdG9yIGdyaWQgcGx1Z2luIGlzIG5vdCBpbnN0YWxsZWQsIGNhbid0IHJlbmRlciBWVCBMYXllcnNcbiAgICAgICAgICAgIC8vIGlmKCB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkKSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgIC8vICAgICB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExlYWZsZXQgVmVjdG9yIFRpbGVzIHBsdWdpbiBub3QgZm91bmRcIik7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gbGV0IG9wdHMgOiBhbnkgPSB7IHJlbmRlcmVyRmFjdG9yeTogKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlIH07XG4gICAgICAgICAgICAvLyBpZiggKGxheWVyIGFzIGFueSkuc3R5bGVzICkge1xuICAgICAgICAgICAgLy8gICAgIG9wdHMudmVjdG9yVGlsZUxheWVyU3R5bGVzID0gKGxheWVyIGFzIGFueSkuc3R5bGVzO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgIFx0Ly8gcmV0dXJuIExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZihocmVmLCBvcHRzKTtcblxuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBMYXllckZhY3RvcnkoKTtcbiJdfQ==