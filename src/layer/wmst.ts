

import * as Q from "q";

import * as L from 'leaflet';
import { TileLayer, tileLayer } from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
// import { TimeDimension, timeDimension } from "../libs/L.TimeDimension";

import {Config} from '@geoplatform/client';

import WMS from './wms';



class WMST extends (L as any).TimeDimension.Layer.WMS {

    private _baseLayer : TileLayer.WMS

    constructor(layer : TileLayer.WMS, opts ?: any) {
        super(layer, opts);
    }

    //override default parser to query all Layers (whether queryable or not)
    _parseTimeDimensionFromCapabilities (xml) {
        var layers = xml.querySelectorAll('Layer');
        var layerName = this._baseLayer.wmsParams.layers;
        var layer = null;
        var times = null;

        layers.forEach(function(current) {
            if (current.querySelector("Name").innerHTML === layerName) {
                layer = current;
            }
        });
        if (layer) {
            times = this._getTimesFromLayerCapabilities(layer);
            if (!times) {
                times = this._getTimesFromLayerCapabilities(layer.parentNode);
            }
        }

        return times;
    }

    //override default parser to fall back if Dimension is provided but has no values
    _getTimesFromLayerCapabilities (layer) {
        var times = null;
        var dimensions = layer.querySelectorAll("Dimension[name='time']");
        if (dimensions && dimensions.length && dimensions[0].textContent.length) {
            times = dimensions[0].textContent.trim();
        }
        if(!times || !times.length) {
            var extents = layer.querySelectorAll("Extent[name='time']");
            if (extents && extents.length && extents[0].textContent.length) {
                times = extents[0].textContent.trim();
            }
        }
        if(times && ~times.indexOf("current")) {
            times = times.replace('current', new Date().toISOString());
        }
        return times;
    }

}




function wmst(gpLayer) {

    let service = gpLayer.services[0];
    let url = service.href;

    if(!url) {
        throw new Error("WMST Layer's service does not defined a service url");
    }

    let opts = {
        layers: gpLayer.layerName,
        transparent: true,
        format: "image/png",
        wmvId: gpLayer.layerId
    };
    if(Config.leafletPane)
        (opts as any).pane = Config.leafletPane;

    let leafletLayer = new WMS( url, opts );

    let proxyUrl = Config.ualUrl + '/api/services/' +
        service.id + '/proxy/capabilities';

    let tdOpts = { times : null };

    if(gpLayer.temporal) {

        let d1 = gpLayer.temporal.startDate ?
            new Date(gpLayer.temporal.startDate) : new Date();
        let d2 = gpLayer.temporal.endDate ?
            new Date(gpLayer.temporal.endDate) : new Date();

        tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
    }

    return new WMST(leafletLayer, {
        timeDimension: new (L as any).TimeDimension(tdOpts),
        proxy: proxyUrl
    });
}

if( (window as any).L ) {
    const L = (window as any).L;
    L.TileLayer.WMST = WMST;
    L.tileLayer.wmst = wmst;
}

export {
    WMST as default,
    WMST,
    wmst
};
