/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQztBQUNyQyxPQUFPLFlBQVksTUFBTSxrQkFBa0IsQ0FBQztBQUc1QyxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBTSxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFPLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNsQyxPQUFPLEVBQU8sSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sZUFBZSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQ0gsTUFBTSxFQUFhLFlBQVksRUFBRSxhQUFhLEVBR2pELE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVNUIsQ0FBQzs7Ozs7O0FBVUYsS0FBSyxDQUFDLE9BQU8sQ0FBQzs7SUFHVixTQUFTLEVBQUUsVUFBUyxLQUFjOztLQUVqQztJQUVELFVBQVUsRUFBRSxVQUFTLEtBQWM7O0tBRWxDO0NBRUosQ0FBQyxDQUFDOzs7Ozs7QUFTSCw4QkFBOEIsT0FBdUI7SUFFakQsSUFBRyxDQUFDLE9BQU8sSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxPQUFPLDhCQUE4QixFQUFFO1FBQ25DLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ2hCLElBQUksQ0FBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBRTtpQkFDakMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFOztnQkFDUCxJQUFJLEdBQUcsR0FBRyw2Q0FBNkMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0UsTUFBTSxDQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO0tBQ04sQ0FBQztDQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDRDtJQUtJO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsUUFBUSxDQUFDLEVBQWE7UUFDbEIsSUFBRyxPQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO0tBQ0o7Ozs7O0lBRUQsZUFBZSxDQUFDLE9BQXNCO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQzFCOzs7OztJQUlELGdCQUFnQjtRQUNaLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sWUFBUyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUM3Qzs7Ozs7SUFNRCxNQUFNLENBQUUsS0FBa0I7UUFDdEIsSUFBRyxDQUFDLEtBQUssRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUMxRDtRQUNELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTs7WUFDdkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxJQUFJLE9BQU0sQ0FBQyxFQUFFLENBQUMsS0FBRyxVQUFVLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELElBQUcsTUFBTTtnQkFBRSxPQUFPLE1BQU0sQ0FBQztTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7Ozs7SUFHRCxJQUFJOztRQUdBLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBRSxLQUFrQixFQUFFLEVBQUU7WUFDbkMsSUFBRyxLQUFLLElBQUksS0FBSyxDQUFDLGFBQWE7Z0JBQzNCLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTTtnQkFDMUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEQsT0FBTyxlQUFlLEVBQUUsQ0FBQzthQUM1QjtTQUNKLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQ2xDLElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLFlBQVMsSUFBSSxDQUFDLEtBQUssYUFBVSxNQUFNO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztZQUNwRSxJQUFJLE9BQU8sR0FBa0IsS0FBSyxhQUFVLENBQUMsQ0FBQyxDQUFDOztZQUMvQyxJQUFJLEdBQUcsR0FBTyxPQUFPLENBQUMsSUFBSSxDQUtGOztZQUx4QixJQUNJLE9BQU8sR0FBeUIsT0FBTyxDQUFDLFdBQVcsQ0FJL0I7O1lBTHhCLElBRUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUdsQjs7WUFMeEI7O1lBSUksTUFBTSxHQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9DOztZQUx4QixJQUtJLElBQUksQ0FBZ0I7Ozs7O1lBRXhCLGtCQUFrQixHQUFHO2dCQUNqQixJQUFHLENBQUMsR0FBRztvQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7YUFDN0U7WUFFRCxJQUFHLFlBQVksQ0FBQyxlQUFlO2dCQUMzQixZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQzlDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxJQUFJLHFCQUFHO29CQUNILE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUztvQkFDdkIsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLE1BQU0sRUFBRSxNQUFNLElBQUksT0FBTztpQkFDWixDQUFBLENBQUM7O2dCQUdsQixJQUFJLFlBQVksR0FBRyxLQUFLLFdBQVEsRUFBRSxDQUFDO2dCQUNuQyxJQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQzlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcscUJBQXFCO3dCQUN2RCxxRkFBcUYsQ0FBQyxDQUFDO2lCQUM5RjtnQkFFRCxJQUFHLE1BQU07b0JBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLGVBQVksQ0FBQztnQkFDbkMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFFdkM7aUJBQU0sSUFBRyxZQUFZLENBQUMsbUJBQW1CO2dCQUN0QyxZQUFZLENBQUMsbUJBQW1CLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDbEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE9BQU8saUJBQWlCLENBQUMsS0FBSyxFQUFFO29CQUM1QixhQUFhLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2lCQUN6QyxDQUFDLENBQUM7YUFFTjtpQkFBTSxJQUFHLFlBQVksQ0FBQyxnQkFBZ0I7Z0JBQ25DLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUMvQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ25DLElBQUcsTUFBTTtvQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sZUFBWSxDQUFDO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFFbkM7aUJBQU0sSUFBRyxZQUFZLENBQUMsaUJBQWlCO2dCQUNwQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDaEQsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ25DLElBQUcsTUFBTTtvQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sZUFBWSxDQUFDO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFFbkM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQzs7UUFHSCxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQ2xDLElBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLFlBQVMsSUFBSSxDQUFDLEtBQUssYUFBVSxNQUFNO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztZQUNwRSxJQUFJLE9BQU8sR0FBa0IsS0FBSyxhQUFVLENBQUMsQ0FBQyxDQUFDOztZQUMvQyxJQUFJLE9BQU8sR0FBeUIsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7WUFDeEQsSUFBSSxPQUFPLEdBQVksT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFcEQsSUFBRyxZQUFZLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDckQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7aUJBQU0sSUFBRyxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDOUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7aUJBQU0sSUFBRyxZQUFZLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtnQkFDOUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxLQUFrQixFQUFFLEVBQUU7WUFDbEMsSUFBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssWUFBUyxJQUFJLENBQUMsS0FBSyxhQUFVLE1BQU07Z0JBQUUsT0FBTyxJQUFJLENBQUM7O1lBQ3BFLElBQUksT0FBTyxHQUFrQixLQUFLLGFBQVUsQ0FBQyxDQUFDLENBQUM7O1lBQy9DLElBQUksT0FBTyxHQUF5QixPQUFPLENBQUMsV0FBVyxDQUFDOztZQUN4RCxJQUFJLE9BQU8sR0FBWSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwRCxJQUFHLFlBQVksQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO2dCQUN2RCxPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ3pDLENBQUMsQ0FBQzthQUNOO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZixDQUFDLENBQUM7UUFLSCxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBRWxDLElBQUcsQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxDQUFDOztZQUV2QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSx3QkFBd0I7O2dCQUN6RixPQUFPLElBQUksQ0FBQzthQUNmOztZQUVELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO2dCQUNsRSxPQUFPLElBQUksQ0FBQzthQUNmOztZQUVELE1BQU0sT0FBTyxxQkFBRyxDQUFRLEVBQUM7O1lBR3pCLElBQUksT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxXQUFXO2dCQUMxQyxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztnQkFDcEUsT0FBTyxJQUFJLENBQUM7YUFDZjs7WUFXRCxJQUFJLElBQUksR0FBUztnQkFDbkIsZUFBZSxFQUFFLG1CQUFFLENBQUMsQ0FBQyxNQUFhLEVBQUUsQ0FBQyxJQUFJO2FBR3pDLENBQUM7WUFDQyxJQUFHLE1BQU07Z0JBQWMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLGVBQVksQ0FBQztZQUN6RCxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUUvQyxDQUFDLENBQUM7S0FJTjtDQUNKOzs7Ozs7O0FBRUQsZUFBZSxJQUFJLFlBQVksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5pbXBvcnQgU2VydmljZVR5cGVzIGZyb20gXCIuLi9zZXJ2aWNlL3R5cGVzXCI7XG5pbXBvcnQgT1NNIGZyb20gXCIuL29zbVwiO1xuaW1wb3J0IEZlYXR1cmVMYXllciBmcm9tICcuL2ZlYXR1cmUnO1xuaW1wb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn0gZnJvbSAnLi9jbHVzdGVyLWZlYXR1cmUnO1xuXG5pbXBvcnQge1dNUywgd21zfSBmcm9tICcuL3dtcyc7XG5pbXBvcnQge1dNU1QsIHdtc3R9IGZyb20gJy4vd21zdCc7XG5pbXBvcnQge1dNVFMsIHdtdHN9IGZyb20gJy4vd210cyc7XG5pbXBvcnQgRVNSSVRpbGVMYXllciBmcm9tICcuL2VzcmktdGlsZS1sYXllcic7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vb3NtLWZhY3RvcnknO1xuaW1wb3J0IHtMYXllclJlc291cmNlVHlwZXN9IGZyb20gJy4uL3NoYXJlZC9yZXNvdXJjZS10eXBlcyc7XG5pbXBvcnQge1xuICAgIENvbmZpZywgSXRlbVR5cGVzLCBMYXllclNlcnZpY2UsIFhIUkh0dHBDbGllbnQsXG4gICAgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWwsXG4gICAgU2VydmljZVR5cGVTdGFuZGFyZFxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW50ZXJmYWNlIExheWVyT3B0aW9ucyB7XG4gICAgbGF5ZXJzID86IHN0cmluZ3xzdHJpbmdbXSxcbiAgICB0cmFuc3BhcmVudCA/OiBib29sZWFuLFxuICAgIGZvcm1hdCA/OiBzdHJpbmcsXG4gICAgcGFuZSA/OiBzdHJpbmcsXG4gICAgc3JzID86IHN0cmluZyxcbiAgICB1cmwgPzogc3RyaW5nLFxuICAgIHVzZUNvcnMgPzogYm9vbGVhblxufTtcblxuXG5cblxuLypcbiAqIEV4dGVuZCBiYXNlIExlYWZsZXQgbGF5ZXIgY2xhc3MgdG8gZW5zdXJlIHRoZXJlJ3MgYWx3YXlzIGEgZnVuY3Rpb25cbiAqIGF2YWlsYWJsZSBmb3IgbW9kaWZ5aW5nIHppbmRleCBhbmQgb3BhY2l0eSwgZXZlbiBpZiBub3RoaW5nIGFjdHVhbGx5XG4gKiBoYXBwZW5zIGluc2lkZS5cbiAqL1xuTGF5ZXIuaW5jbHVkZSh7XG5cbiAgICAvLyBSZWRlZmluaW5nIGEgbWV0aG9kXG4gICAgc2V0WkluZGV4OiBmdW5jdGlvbih2YWx1ZSA6IG51bWJlcikge1xuICAgICAgICAvL2RvIG5vdGhpbmcgaW4gdGhpcyBhYnN0cmFjdCBjbGFzcywgbGV0IGltcGxzIGRvIHRoZSB3b3JrXG4gICAgfSxcblxuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKHZhbHVlIDogbnVtYmVyKSB7XG4gICAgICAgIC8vZG8gbm90aGluZyBpbiB0aGlzIGFic3RyYWN0IGNsYXNzLCBsZXQgaW1wbHMgZG8gdGhlIHdvcmtcbiAgICB9XG5cbn0pO1xuXG5cblxuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gc3R5bGVSZXNvbHZlckZhY3Rvcnkoc2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogYW55IHtcblxuICAgIGlmKCFzZXJ2aWNlIHx8IHR5cGVvZihzZXJ2aWNlLnN0eWxlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBMYXllclNlcnZpY2UgaW5zdGFuY2VcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXJ2aWNlLnN0eWxlKGlkKVxuICAgICAgICAgICAgLnRoZW4oIHJlc3VsdCA9PiByZXNvbHZlKHJlc3VsdCkgKVxuICAgICAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtc2cgPSBgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke2UubWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgIHJlamVjdCggbmV3IEVycm9yKG1zZykgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5cblxuXG5cblxuXG5cbi8qKlxuICogTGF5ZXIgRmFjdG9yeVxuICpcbiAqIFVzZWQgdG8gaW5zdGFudGlhdGUgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0cyBhcyBMZWFmbGV0IGxheWVyIGluc3RhbmNlc1xuICogY2FwYWJsZSBvZiBiZWluZyByZW5kZXJlZCBvbiBMZWFmbGV0IG1hcHMuXG4gKlxuICogVXNhZ2U6XG4gKiAgICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBMYXllckZhY3RvcnkuY3JlYXRlKGdwTGF5ZXJPYmopO1xuICpcbiAqXG4gKiBCYXNpYyBsYXllciBzdXBwb3J0IGlzIGJ1aWx0IGluLCBidXQgYWRkaXRpb25hbCBsYXllciB0eXBlcyBjYW4gYmUgc3VwcG9ydGVkXG4gKiBieSByZWdpc3RlcmluZyBuZXcgZmFjdG9yeSBtZXRob2RzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiAgICAgIExheWVyRmFjdG9yeS5yZWdpc3RlciggKGdwTGF5ZXJPYmopID0+IHtcbiAqICAgICAgICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICogICAgICAgICAgLy9pbXBsZW1lbnQgdGVzdCB0byB2ZXJpZnkgc3VwcG9ydGVkIGxheWVyIHR5cGVcbiAqICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgaWYoaXNTdXBwb3J0ZWQpIHtcbiAqICAgICAgICAgICAgICByZXR1cm4gbmV3IE15Q3VzdG9tTGF5ZXJDbGFzcyhncExheWVyT2JqKTtcbiAqICAgICAgICAgIH1cbiAqICAgICAgICAgIHJldHVybiBudWxsO1xuICogICAgICB9KTtcbiAqXG4gKi9cbmNsYXNzIExheWVyRmFjdG9yeSB7XG5cbiAgICBwcml2YXRlIGZhY3RvcmllcyA6IEZ1bmN0aW9uW107XG4gICAgcHJpdmF0ZSBzZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZmFjdG9yaWVzID0gW107ICAgIC8vIEEgbGlzdCBvZiBjb25maWd1cmVkIGZhY3RvcnkgZnVuY3RvcnMgdG8gaW5zdGFudGlhdGUgbGF5ZXJzXG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKGZuIDogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYodHlwZW9mKGZuKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5mYWN0b3JpZXMucHVzaChmbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRMYXllclNlcnZpY2Uoc2VydmljZSA6IExheWVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBzZXJ2aWNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqL1xuICAgIGdldFN0eWxlUmVzb2x2ZXIoKSA6IEZ1bmN0aW9uIHtcbiAgICAgICAgaWYoIXRoaXMuc2VydmljZSB8fCB0eXBlb2YodGhpcy5zZXJ2aWNlLnN0eWxlKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlUmVzb2x2ZXJGYWN0b3J5KHRoaXMuc2VydmljZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxheWVyIC0gR1AgTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAgICAgKi9cbiAgICBjcmVhdGUoIGxheWVyIDogTGF5ZXJNb2RlbCApIDogTGF5ZXIge1xuICAgICAgICBpZighbGF5ZXIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxheWVyRmFjdG9yeSBleHBlY3RzIGEgbGF5ZXIgb2JqZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZmFjdG9yaWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZm4gPSB0aGlzLmZhY3Rvcmllc1tpXTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmbiAmJiB0eXBlb2YoZm4pPT09J2Z1bmN0aW9uJyAmJiBmbihsYXllcik7XG4gICAgICAgICAgICBpZihyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG5cbiAgICBpbml0ICgpIHtcblxuICAgICAgICAvL09TTSBmYWN0b3J5XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoICggbGF5ZXIgOiBMYXllck1vZGVsICk9PiB7XG4gICAgICAgICAgICBpZihsYXllciAmJiBsYXllci5yZXNvdXJjZVR5cGVzICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICB+bGF5ZXIucmVzb3VyY2VUeXBlcy5pbmRleE9mKExheWVyUmVzb3VyY2VUeXBlcy5PU00pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTUxheWVyRmFjdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBFU1JJIGZhY3RvcnlcbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgICAgICAgICBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGUsXG4gICAgICAgICAgICAgICAgdHlwZVVyaSA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGwsXG4gICAgICAgICAgICAgICAgLy8gc3JzICAgICA9IGxheWVyLnN1cHBvcnRlZENSUyA/IGxheWVyLnN1cHBvcnRlZENSU1swXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcHRzIDogTGF5ZXJPcHRpb25zO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1VybCh1cmwpIHtcbiAgICAgICAgICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lIGEgc2VydmljZSB1cmxcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5FU1JJX01BUF9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9NQVBfU0VSVkVSLnVyaSA9PT0gdHlwZVVyaSkge1xuICAgICAgICAgICAgICAgIGNoZWNrVXJsKHVybCk7XG4gICAgICAgICAgICAgICAgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBcInBuZzMyXCJcbiAgICAgICAgICAgICAgICB9IGFzIExheWVyT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIGlmKHNycykgb3B0cy5zcnMgPSBzcnM7XG4gICAgICAgICAgICAgICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRVNSSVRpbGVMYXllcih1cmwsIG9wdHMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfRkVBVFVSRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9GRUFUVVJFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZVJlc29sdmVyOiB0aGlzLmdldFN0eWxlUmVzb2x2ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLkVTUklfVElMRV9TRVJWRVIgJiZcbiAgICAgICAgICAgICAgICBTZXJ2aWNlVHlwZXMuRVNSSV9USUxFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBjaGVja1VybCh1cmwpO1xuICAgICAgICAgICAgICAgIG9wdHMgPSB7IHVybDogdXJsLCB1c2VDb3JzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVzcmkudGlsZWRNYXBMYXllcihvcHRzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmKFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUiAmJlxuICAgICAgICAgICAgICAgIFNlcnZpY2VUeXBlcy5FU1JJX0lNQUdFX1NFUlZFUi51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICBvcHRzID0geyB1cmw6IHVybCwgdXNlQ29yczogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBlc3JpLmltYWdlTWFwTGF5ZXIob3B0cyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPR0MgZmFjdG9yeVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCAobGF5ZXIgOiBMYXllck1vZGVsKSA9PiB7XG4gICAgICAgICAgICBpZighbGF5ZXIgfHwgIWxheWVyLnNlcnZpY2VzIHx8ICFsYXllci5zZXJ2aWNlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlc1swXTtcbiAgICAgICAgICAgIGxldCBzdmNUeXBlIDogU2VydmljZVR5cGVTdGFuZGFyZCA9IHNlcnZpY2Uuc2VydmljZVR5cGU7XG4gICAgICAgICAgICBsZXQgdHlwZVVyaSA6IHN0cmluZyA9IHN2Y1R5cGUgPyBzdmNUeXBlLnVyaSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmKFNlcnZpY2VUeXBlcy5XTVMgJiYgU2VydmljZVR5cGVzLldNUy51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihTZXJ2aWNlVHlwZXMuV01TVCAmJiBTZXJ2aWNlVHlwZXMuV01TVC51cmkgPT09IHR5cGVVcmkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd21zdChsYXllcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoU2VydmljZVR5cGVzLldNVFMgJiYgU2VydmljZVR5cGVzLldNVFMudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdtdHMobGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuICAgICAgICAgICAgaWYoIWxheWVyIHx8ICFsYXllci5zZXJ2aWNlcyB8fCAhbGF5ZXIuc2VydmljZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXNbMF07XG4gICAgICAgICAgICBsZXQgc3ZjVHlwZSA6IFNlcnZpY2VUeXBlU3RhbmRhcmQgPSBzZXJ2aWNlLnNlcnZpY2VUeXBlO1xuICAgICAgICAgICAgbGV0IHR5cGVVcmkgOiBzdHJpbmcgPSBzdmNUeXBlID8gc3ZjVHlwZS51cmkgOiBudWxsO1xuICAgICAgICAgICAgaWYoU2VydmljZVR5cGVzLkZFRUQgJiYgU2VydmljZVR5cGVzLkZFRUQudXJpID09PSB0eXBlVXJpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb0pzb25GZWVkKGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlUmVzb2x2ZXI6IHRoaXMuZ2V0U3R5bGVSZXNvbHZlcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgdGhpcy5yZWdpc3RlciggKGxheWVyIDogTGF5ZXJNb2RlbCkgPT4ge1xuXG4gICAgICAgICAgICBpZighbGF5ZXIpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VUeXBlcyA9IGxheWVyLnJlc291cmNlVHlwZXMgfHwgW107XG4gICAgICAgICAgICBpZihyZXNvdXJjZVR5cGVzLmluZGV4T2YoTGF5ZXJSZXNvdXJjZVR5cGVzLk1hcEJveFZlY3RvclRpbGUpIDwgMCkgeyAvL25vdCB0YWdnZWQgYXMgVlQgbGF5ZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGhyZWYgPSBsYXllci5ocmVmO1xuICAgICAgICAgICAgaWYoIWhyZWYgfHwgaHJlZi5pbmRleE9mKFwiLnBiZlwiKSA8IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExheWVyIGRvZXMgbm90IGRlZmluZSBhbiBBY2Nlc3MgVVJMXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsOyAgLy9taXNzaW5nIFVSTFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBMZWFmbGV0ID0gTCBhcyBhbnk7XG5cbiAgICAgICAgICAgIC8vaWYgTGVhZmxldCB2ZWN0b3IgZ3JpZCBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgY2FuJ3QgcmVuZGVyIFZUIExheWVyc1xuICAgICAgICAgICAgaWYoIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQpID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGVhZmxldCBWZWN0b3IgVGlsZXMgcGx1Z2luIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbGV0IHN0eWxlRm4gPSBmdW5jdGlvbihmZWF0dXJlUHJvcGVydGllcywgeil7XG4gICAgICAgICAgICAvLyAgICAgbGV0IGZpbGwgPSAnI0FEODE2RSc7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHsgY29sb3I6IGZpbGwsIHdlaWdodDogMSB9O1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgLy8gICAgIFwibmNfd2V0bGFuZHNcIiA6IHN0eWxlRm4sXG4gICAgICAgICAgICAvLyAgICAgXCJ2YV93ZXRsYW5kc1wiOiBzdHlsZUZuXG4gICAgICAgICAgICAvLyB9O1xuICAgICAgICAgICAgdmFyIG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIFx0XHRyZW5kZXJlckZhY3Rvcnk6ICggTC5jYW52YXMgYXMgYW55ICkudGlsZVxuICAgICAgICAgICAgICAgIC8vICxcbiAgICAgICAgXHRcdC8vIHZlY3RvclRpbGVMYXllclN0eWxlczogc3R5bGVzLFxuICAgICAgICBcdH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgXHRyZXR1cm4gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExheWVyRmFjdG9yeSgpO1xuIl19