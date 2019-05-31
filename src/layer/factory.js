
import Q from "q";
import jQuery from 'jquery';
import * as L from "leaflet";
import * as esri from "esri-leaflet";
import ServiceTypes from "../service/types";
import OSM from "./osm";
import FeatureLayer from './feature';
import {
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed
} from './cluster-feature';

import {WMS, wms} from './wms';
import {WMST, wmst} from './wmst';
import {WMTS, wmts} from './wmts';
import ESRITileLayer from './L.TileLayer.ESRI';
import OSMLayerFactory from './osm-factory';
import { Config, ItemTypes, LayerService, JQueryHttpClient } from 'geoplatform.client';




/**
 * Fetches style information from GeoPlatform UAL
 * @param {string} id - identifier of layer to resolve style for
 */
function styleResolverFactory(service) {

    if(!service || typeof(service.style) !== 'function') {
        throw new Error("Must provide a LayerService instance");
    }

    return function featureStyleResolver(id) {
        return service.style(id).catch(e => {
            let msg = `Error loading style information for layer ${id} : ${e.message}`;
            return Q.reject( new Error(msg) );
        });
    };
}









class LayerFactory {

    constructor() {
        this.factories = [];    // A list of configured factory functors to instantiate layers
        this.init();
    }

    register(fn) {
        if(typeof(fn) === 'function') {
            this.factories.push(fn);
        }
    }

    setLayerService(service) {
        this.service = service;
    }

    /**
     * @return {function}
     */
    getStyleResolver() {
        if(!this.service || typeof(this.service.style) === 'undefined') {
            this.service = new LayerService(Config.ualUrl, new JQueryHttpClient());
        }
        return styleResolverFactory(this.service);
    }

    /**
     * @param {object} layer - GP Layer object
     * @return {L.Layer} leaflet layer instance or null
     */
    create(layer) {
        if(!layer) {
            throw new Error("LayerFactory expects a layer object");
        }
        for(let i=0; i<this.factories.length; ++i) {
            let fn = this.factories[i];
            let result = fn && typeof(fn)==='function' && fn(layer);
            if(result) return result;
        }
        return null;
    }


    init () {

        //OSM factory
        this.register((layer)=> {
            if(layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer")) {
                return OSMLayerFactory();
            }
        });

        // ESRI factory
        this.register( (layer) => {
            if(!layer || !layer.services || !layer.services.length) return null;
            let service = layer.services[0],
                url     = service.href,
                typeUri = service.serviceType ? service.serviceType.uri : null,
                srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
                format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
                opts = {};

            function checkUrl(url) {
                if(!url) throw new Error("Layer's service does not define a service url");
            }

            if(ServiceTypes.ESRI_MAP_SERVER &&
                ServiceTypes.ESRI_MAP_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = {
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                };
                if(srs) opts.srs = srs;
                if(Config.leafletPane)
                    opts.pane = Config.leafletPane;
                return new ESRITileLayer(url, opts);

            } else if(ServiceTypes.ESRI_FEATURE_SERVER &&
                ServiceTypes.ESRI_FEATURE_SERVER.uri === typeUri) {
                checkUrl(url);
                return clusteredFeatures(layer, {
                    styleResolver: this.getStyleResolver()
                });

            } else if(ServiceTypes.ESRI_TILE_SERVER &&
                ServiceTypes.ESRI_TILE_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = { url: url, useCors: true };
                if(Config.leafletPane)
                    opts.pane = Config.leafletPane;
                return esri.tiledMapLayer(opts);

            } else if(ServiceTypes.ESRI_IMAGE_SERVER &&
                ServiceTypes.ESRI_IMAGE_SERVER.uri === typeUri) {
                opts = { url: url, useCors: true };
                if(Config.leafletPane)
                    opts.pane = Config.leafletPane;
                return esri.imageMapLayer(opts);

            }
            return null;
        });

        // OGC factory
        this.register( (layer) => {
            if(!layer || !layer.services || !layer.services.length) return null;
            let service = layer.services[0],
                typeUri = service.serviceType ? service.serviceType.uri : null;
            if(ServiceTypes.WMS && ServiceTypes.WMS.uri === typeUri) {
                return wms(layer);
            } else if(ServiceTypes.WMST && ServiceTypes.WMST.uri === typeUri) {
                return wmst(layer);
            } else if(ServiceTypes.WMTS && ServiceTypes.WMTS.uri === typeUri) {
                return wmts(layer);
            }
            return null;
        });


        this.register( (layer) => {
            if(!layer || !layer.services || !layer.services.length) return null;
            let service = layer.services[0],
                typeUri = service.serviceType ? service.serviceType.uri : null;
            if(ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
                return geoJsonFeed(layer, {
                    styleResolver: this.getStyleResolver()
                });
            }
            return null;
        });





        this.register( (layer) => {

            if(!layer) return null;

            const MBVTRT = 'http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer';
            let resourceTypes = layer.resourceTypes || [];
            if(resourceTypes.indexOf(MBVTRT) < 0) { //not tagged as VT layer
                return null;
            }

            let href = layer.href;
            if(!href || href.indexOf(".pbf") < 0) {
                console.log("LayerFactory - Layer does not define an Access URL");
                return null;  //missing URL
            }

            //if Leaflet vector grid plugin is not installed, can't render VT Layers
            if( typeof(L.vectorGrid) === 'undefined' &&
                typeof(L.vectorGrid.protobuf) === 'undefined') {
                console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
                return null;
            }

            // let styleFn = function(featureProperties, z){
            //     let fill = '#AD816E';
            //     return { color: fill, weight: 1 };
            // };
            //
            // var styles = {
            //     "nc_wetlands" : styleFn,
            //     "va_wetlands": styleFn
            // };
            var opts = {
        		rendererFactory: L.canvas.tile
                // ,
        		// vectorTileLayerStyles: styles,
        	};
            if(Config.leafletPane) opts.pane = Config.leafletPane;
        	return L.vectorGrid.protobuf(href, opts);

        });

    }
}

export default new LayerFactory();





























// /**
//  * @param {Object} layer - GeoPlatform Layer object
//  * @return {L.Layer} Leaflet layer instance
//  */
// var LayerFactory = function(layer) {
//
//     if(!layer) {
//         throw new Error(`
//             L.GeoPlatform.LayerFactory() -
//             Invalid argument: must provide a layer object
//         `);
//     }
//
//     //OSM layers have no "services" so we have to treat them differently
//     if(OSM.test(layer)) {
//         return OSMLayerFactory();
//     }
//
//     if(!layer.services || !layer.services.length) {
//         console.log("MapCore LayerFactory() - cannot create layer for " + layer.id + " because it has no services");
//         throw new Error(`GeoPlatform Layer resource ('${layer.id}') has no Services defined`);
//     }
//
//     let service = layer.services[0],
//         url     = service.href,
//         typeUri = service.serviceType ? service.serviceType.uri : null,
//         srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
//         format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
//         opts = {};
//
//     if(typeUri === null) {
//         console.log("MapCore LayerFactory() - cannot create layer for " + layer.id +
//             "; it has a Service of an unspecified service type");
//         throw new Error(`GeoPlatform Layer resource ('${layer.id}') has a Service of an unspecified service type`);
//         // return null;
//     }
//
//     if(ServiceTypes.ESRI_MAP_SERVER &&
//         ServiceTypes.ESRI_MAP_SERVER.uri === typeUri) {
//         opts = {
//             layers: layer.layerName,
//             transparent: true,
//             format: format || "png32"
//         };
//         if(srs) opts.srs = srs;
//         if(Config.leafletPane)
//             opts.pane = Config.leafletPane;
//         return new ESRITileLayer(url, opts);
//
//     } else if(ServiceTypes.ESRI_FEATURE_SERVER &&
//         ServiceTypes.ESRI_FEATURE_SERVER.uri === typeUri) {
//         return clusteredFeatures(layer);
//
//     } else if(ServiceTypes.ESRI_TILE_SERVER &&
//         ServiceTypes.ESRI_TILE_SERVER.uri === typeUri) {
//         opts = { url: url, useCors: true };
//         if(Config.leafletPane)
//             opts.pane = Config.leafletPane;
//         return esri.tiledMapLayer(opts);
//
//     } else if(ServiceTypes.ESRI_IMAGE_SERVER &&
//         ServiceTypes.ESRI_IMAGE_SERVER.uri === typeUri) {
//         opts = { url: url, useCors: true };
//         if(Config.leafletPane)
//             opts.pane = Config.leafletPane;
//         return esri.imageMapLayer(opts);
//
//     } else if(ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
//         return geoJsonFeed(layer);
//
//     } else if(ServiceTypes.WMS && ServiceTypes.WMS.uri === typeUri) {
//         return wms(layer);
//
//     } else if(ServiceTypes.WMST && ServiceTypes.WMST.uri === typeUri) {
//         return wmst(layer);
//
//     } else if(ServiceTypes.WMTS && ServiceTypes.WMTS.uri === typeUri) {
//         return wmts(layer);
//
//     } else {
//         console.log("MapCore LayerFactory() - Could not create layer for " + layer.id +
//             "because of unsupported service type: " + typeUri);
//         throw new Error("GeoPlatform Layer resource ('" + layer.id +
//             "') has a Service with an unsupported service type: " + typeUri);
//         // return null;
//     }
// };
//
// export default LayerFactory;
