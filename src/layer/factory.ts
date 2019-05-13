
import * as Q from "q";
import * as jquery from "jquery";
const jQuery = jquery;

import { Layer } from "leaflet";
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

interface LayerOptions {
    layers ?: string|string[],
    transparent ?: boolean,
    format ?: string,
    pane ?: string,
    srs ?: string,
    url ?: string,
    useCors ?: boolean
};


/**
 * Fetches style information from GeoPlatform UAL
 * @param id - identifier of layer to resolve style for
 */
function styleResolverFactory(service ?: LayerService) : any {

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

    private factories : Function[];
    private service : LayerService;

    constructor() {
        this.factories = [];    // A list of configured factory functors to instantiate layers
        this.init();
    }

    register(fn : Function) {
        if(typeof(fn) === 'function') {
            this.factories.push(fn);
        }
    }

    setLayerService(service : LayerService) {
        this.service = service;
    }

    /**
     */
    getStyleResolver() : Function {
        if(!this.service || typeof(this.service.style) === 'undefined') {
            this.service = new LayerService(Config.ualUrl, new JQueryHttpClient());
        }
        return styleResolverFactory(this.service);
    }

    /**
     * @param layer - GP Layer object
     * @return leaflet layer instance or null
     */
    create(layer : any) : Layer {
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
        this.register((layer : any)=> {
            if(layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer")) {
                return OSMLayerFactory();
            }
        });

        // ESRI factory
        this.register( (layer : any) => {
            if(!layer || !layer.services || !layer.services.length) return null;
            let service = layer.services[0],
                url     = service.href,
                typeUri = service.serviceType ? service.serviceType.uri : null,
                srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
                format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
                opts : LayerOptions;

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
                } as LayerOptions;
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
        this.register( (layer : any) => {
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


        this.register( (layer : any) => {
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



    }
}

export default new LayerFactory();