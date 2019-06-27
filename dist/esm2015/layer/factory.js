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
        return service.style(id).catch(e => {
            /** @type {?} */
            let msg = `Error loading style information for layer ${id} : ${e.message}`;
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
            this.service = new LayerService(Config["ualUrl"], new XHRHttpClient());
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
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
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
                let supportedCrs = layer["crs"] || [];
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
                    styleResolver: this.getStyleResolver()
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
        this.register((layer) => {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
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
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
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
            /** @type {?} */
            let href = layer.href;
            if (!href || href.indexOf(".pbf") < 0) {
                console.log("LayerFactory - Layer does not define an Access URL");
                return null; //missing URL
            }
            /** @type {?} */
            const Leaflet = /** @type {?} */ (L);
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
    }
}
if (false) {
    /** @type {?} */
    LayerFactory.prototype.factories;
    /** @type {?} */
    LayerFactory.prototype.service;
}
export default new LayerFactory();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFFdkIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBR2pELE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUIsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtR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LENBQUM7WUFDekQsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFL0MsQ0FBQyxDQUFDO0tBSU47Q0FDSjs7Ozs7OztBQUVELGVBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5pbXBvcnQgU2VydmljZVR5cGVzIGZyb20gXCIuLi9zZXJ2aWNlL3R5cGVzXCI7XG5pbXBvcnQgT1NNIGZyb20gXCIuL29zbVwiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICcuL2ZlYXR1cmUnO1xuaW1wb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn0gZnJvbSAnLi9jbHVzdGVyLWZlYXR1cmUnO1xuXG5pbXBvcnQge1dNUywgd21zfSBmcm9tICcuL3dtcyc7XG5pbXBvcnQge1dNU1QsIHdtc3R9IGZyb20gJy4vd21zdCc7XG5pbXBvcnQge1dNVFMsIHdtdHN9IGZyb20gJy4vd210cyc7XG5pbXBvcnQgRVNSSVRpbGVMYXllciBmcm9tICcuL2VzcmktdGlsZS1sYXllcic7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHtMYXllclJlc291cmNlVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9yZXNvdXJjZS10eXBlcyc7XG5pbXBvcnQge1xuICAgIENvbmZpZywgSXRlbVR5cGVzLCBMYXllclNlcnZpY2UsIFhIUkh0dHBDbGllbnQsXG4gICAgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWwsXG4gICAgU2VydmljZVR5cGVTdGFuZGFyZFxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW50ZXJmYWNlIExheWVyT3B0aW9ucyB7XG4gICAgbGF5ZXJzID86IHN0cmluZ3xzdHJpbmdbXSxcbiAgICB0cmFuc3BhcmVudCA/OiBib29sZWFuLFxuICAgIGZvcm1hdCA/OiBzdHJpbmcsXG4gICAgcGFuZSA/OiBzdHJpbmcsXG4gICAgc3JzID86IHN0cmluZyxcbiAgICB1cmwgPzogc3RyaW5nLFxuICAgIHVzZUNvcnMgPzogYm9vbGVhblxufTtcblxuXG5cblxuLypcbiAqIEV4dGVuZCBiYXNlIExlYWZsZXQgbGF5ZXIgY2xhc3MgdG8gZW5zdXJlIHRoZXJlJ3MgYWx3YXlzIGEgZnVuY3Rpb25cbiAqIGF2YWlsYWJsZSBmb3IgbW9kaWZ5aW5nIHppbmRleCBhbmQgb3BhY2l0eSwgZXZlbiBpZiBub3RoaW5nIGFjdHVhbGx5XG4gKiBoYXBwZW5zIGluc2lkZS5cbiAqL1xuTGF5ZXIuaW5jbHVkZSh7XG5cbiAgICAvLyBSZWRlZmluaW5nIGEgbWV0aG9kXG4gICAgc2V0WkluZGV4OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfSxcblxuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9XG5cbn0pO1xuXG5cblxuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gc3R5bGVSZXNvbHZlckZhY3Rvcnkoc2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogYW55IHtcblxuICAgIGlmKCFzZXJ2aWNlIHx8IHR5cGVvZihzZXJ2aWNlLnN0eWxlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBMYXllclNlcnZpY2UgaW5zdGFuY2VcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkKSB7XG4gICAgICAgIHJldHVybiBzZXJ2aWNlLnN0eWxlKGlkKS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxldCBtc2cgPSBgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgcmV0dXJuIFEucmVqZWN0KCBuZXcgRXJyb3IobXNnKSApO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cblxuXG5cblxuXG5cbi8qKlxuICogTGF5ZXIgRmFjdG9yeVxuICpcbiAqIFVzZWQgdG8gaW5zdGFudGlhdGUgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0cyBhcyBMZWFmbGV0IGxheWVyIGluc3RhbmNlc1xuICogY2FwYWJsZSBvZiBiZWluZyByZW5kZXJlZCBvbiBMZWFmbGV0IG1hcHMuXG4gKlxuICogVXNhZ2U6XG4gKiAgICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBMYXllckZhY3RvcnkuY3JlYXRlKGdwTGF5ZXJPYmopO1xuICpcbiAqXG4gKiBCYXNpYyBsYXllciBzdXBwb3J0IGlzIGJ1aWx0IGluLCBidXQgYWRkaXRpb25hbCBsYXllciB0eXBlcyBjYW4gYmUgc3VwcG9ydGVkXG4gKiBieSByZWdpc3RlcmluZyBuZXcgZmFjdG9yeSBtZXRob2RzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiAgICAgIExheWVyRmFjdG9yeS5yZWdpc3RlciggKGdwTGF5ZXJPYmopID0+IHtcbiAqICAgICAgICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICogICAgICAgICAgLy9pbXBsZW1lbnQgdGVzdCB0byB2ZXJpZnkgc3VwcG9ydGVkIGxheWVyIHR5cGVcbiAqICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgaWYoaXNTdXBwb3J0ZWQpIHtcbiAqICAgICAgICAgICAgICByZXR1cm4gbmV3IE15Q3VzdG9tTGF5ZXJDbGFzcyhncExheWVyT2JqKTtcbiAqICAgICAgICAgIH1cbiAqICAgICAgICAgIHJldHVybiBudWxsO1xuICogICAgICB9KTtcbiAqXG4gKi9cbmNsYXNzIExheWVyRmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGZhY3RvcmllcyA6IEZ1bmN0aW9uW107XG4gICAgcHJpdmF0ZSBzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yaWVzID0gW107ICAgIC8vIEEgbGlzdCBvZiBjb25maWd1cmVkIGZhY3RvcnkgZnVuY3RvcnMgdG8gaW5zdGFudGlhdGUgbGF5ZXJzXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKGZuIDogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodHlwZW9mKGZuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXMucHVzaChmbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMYXllclNlcnZpY2Uoc2VydmljZSA6IExheWVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqL1xuICAgIGdldFN0eWxlUmVzb2x2ZXIoKSA6IEZ1bmN0aW9uIHtcbiAgICAgICAgaWYoIXRoaXMuc2VydmljZSB8fCB0eXBlb2YodGhpcy5zZXJ2aWNlLnN0eWxlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHRoaXMuc2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxheWVyIC0gR1AgTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGUoIGxheWVyIDogTGF5ZXJNb2RlbCApIDogTGF5ZXIge1xuICAgICAgICBpZighbGF5ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxheWVyRmFjdG9yeSBleHBlY3RzIGEgbGF5ZXIgb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZmFjdG9yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZm4gPSB0aGlzLmZhY3Rvcmllc1tpXTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmbiAmJiB0eXBlb2YoZm4pPT09J2Z1bmN0aW9uJyAmJiBmbihsYXllcik7XG4gICAgICAgICAgICBpZihyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBpbml0ICgpIHtcblxuICAgICAgICAvL09TTSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoICggbGF5ZXIgOiBMYXllck1vZGVsICk9PiB7XG4gICAgICAgICAgICBpZihsYXllciAmJiBsYXllci5yZXNvdXJjZVR5cGVzICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICB+bGF5ZXIucmVzb3VyY2VUeXBlcy5pbmRleE9mKExheWVyUmVzb3VyY2VUeXBlcy5PU00pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTUxheWVyRmFjdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFU1JJIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgICAgICAgICBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGUsXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGwsXG4gICAgICAgICAgICAgICAgLy8gc3JzICAgICA9IGxheWVyLnN1cHBvcnRlZENSUyA/IGxheWVyLnN1cHBvcnRlZENSU1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcHRzIDogTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1VybCh1cmwpIHtcbiAgICAgICAgICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lIGEgc2VydmljZSB1cmxcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBcInBuZzMyXCJcbiAgICAgICAgICAgICAgICB9IGFzIExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIGlmKHNycykgb3B0cy5zcnMgPSBzcnM7XG4gICAgICAgICAgICAgICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRVNSSVRpbGVMYXllcih1cmwsIG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkudGlsZWRNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLmltYWdlTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPR0MgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlO1xuICAgICAgICAgICAgbGV0IHR5cGVVcmkgOiBzdHJpbmcgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkZFRUQgJiYgU2VydmljZVR5cGVzLkZFRUQudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25GZWVkKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuXG4gICAgICAgICAgICBpZighbGF5ZXIpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VUeXBlcyA9IGxheWVyLnJlc291cmNlVHlwZXMgfHwgW107XG4gICAgICAgICAgICBpZihyZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk1hcEJveFZlY3RvclRpbGUpIDwgMCkgeyAvL25vdCB0YWdnZWQgYXMgVlQgbGF5ZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhyZWYgPSBsYXllci5ocmVmO1xuICAgICAgICAgICAgaWYoIWhyZWYgfHwgaHJlZi5pbmRleE9mKFwiLnBiZlwiKSA8IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExheWVyIGRvZXMgbm90IGRlZmluZSBhbiBBY2Nlc3MgVVJMXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAgLy9taXNzaW5nIFVSTFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBMZWFmbGV0ID0gTCBhcyBhbnk7XG5cbiAgICAgICAgICAgIC8vaWYgTGVhZmxldCB2ZWN0b3IgZ3JpZCBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgY2FuJ3QgcmVuZGVyIFZUIExheWVyc1xuICAgICAgICAgICAgaWYoIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQpID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGVhZmxldCBWZWN0b3IgVGlsZXMgcGx1Z2luIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbGV0IHN0eWxlRm4gPSBmdW5jdGlvbihmZWF0dXJlUHJvcGVydGllcywgeil7XG4gICAgICAgICAgICAvLyAgICAgbGV0IGZpbGwgPSAnI0FEODE2RSc7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHsgY29sb3I6IGZpbGwsIHdlaWdodDogMSB9O1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgLy8gICAgIFwibmNfd2V0bGFuZHNcIiA6IHN0eWxlRm4sXG4gICAgICAgICAgICAvLyAgICAgXCJ2YV93ZXRsYW5kc1wiOiBzdHlsZUZuXG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgdmFyIG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIFx0XHRyZW5kZXJlckZhY3Rvcnk6ICggTC5jYW52YXMgYXMgYW55ICkudGlsZVxuICAgICAgICAgICAgICAgIC8vICxcbiAgICAgICAgXHRcdC8vIHZlY3RvclRpbGVMYXllclN0eWxlczogc3R5bGVzLFxuICAgICAgICBcdH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgXHRyZXR1cm4gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExheWVyRmFjdG9yeSgpO1xuIl19