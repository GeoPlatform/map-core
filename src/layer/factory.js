
import Q from "q";
import * as L from "leaflet";
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
import { Config } from 'geoplatform.client';


/**
 * @param {Object} layer - GeoPlatform Layer object
 * @return {L.Layer} Leaflet layer instance
 */
var LayerFactory = function(layer) {

    if(!layer) {
        throw new Error(`
            L.GeoPlatform.LayerFactory() -
            Invalid argument: must provide a layer object
        `);
    }

    //OSM layers have no "services" so we have to treat them differently
    if(OSM.test(layer)) {
        return OSMLayerFactory();
    }

    if(!layer.services || !layer.services.length) {
        throw new Error(`
            L.GeoPlatform.LayerFactory() -
            Cannot create Leaflet layer for GP Layer ${layer.id},
            layer has no services defined!
        `);
    }

    let service = layer.services[0],
        url     = service.href,
        typeUri = service.serviceType.uri,
        srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
        format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
        opts = {};


    if(ServiceTypes.ESRI_MAP_SERVER &&
        ServiceTypes.ESRI_MAP_SERVER.uri === typeUri) {
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
        return clusteredFeatures(layer);

    } else if(ServiceTypes.ESRI_TILE_SERVER &&
        ServiceTypes.ESRI_TILE_SERVER.uri === typeUri) {
        opts = { url: url, useCors: true };
        if(Config.leafletPane)
            opts.pane = Config.leafletPane;
        return L.esri.tiledMapLayer(opts);

    } else if(ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
        return geoJsonFeed(layer);

    } else if(ServiceTypes.WMS && ServiceTypes.WMS.uri === typeUri) {
        return wms(layer);

    } else if(ServiceTypes.WMST && ServiceTypes.WMST.uri === typeUri) {
        return wmst(layer);

    } else if(ServiceTypes.WMTS && ServiceTypes.WMTS.uri === typeUri) {
        return wmts(layer);

    } else {
        console.log("LayerFactory() - Could not create Leaflet layer for " +
            "GeoPlatform Layer with service type: " + typeUri);
        return null;
    }
};

export default LayerFactory;
