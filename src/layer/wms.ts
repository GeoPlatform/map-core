
/// <reference path="../../node_modules/@geoplatform/client/dist/shared/models.d.ts" />

import * as jquery from "jquery";
const jQuery = jquery;

import { Map, TileLayer, tileLayer, LatLng, Util, popup } from 'leaflet';

import {
    Config, Layer as LayerModel, Service as ServiceModel
} from '@geoplatform/client';



class WMS extends TileLayer.WMS {

    private _enabled : boolean = false;

    constructor(url : string, opts ?: any) {
        super(url, opts);
        this._enabled = false;
    }

    enableGetFeatureInfo  () {
        this._map.on('click', this.getFeatureInfo, this);
        this._enabled = true;
    }

    disableGetFeatureInfo () {
        this._map.off('click', this.getFeatureInfo, this);
        this._enabled = false;
    }

    isGetFeatureInfoEnabled () {
        return this._enabled;
    }

    onRemove (map : Map) : this {

        //if GFI is enabled, disable it before removing
        if(this.isGetFeatureInfoEnabled())
        this.disableGetFeatureInfo();

        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return super.onRemove.call(this, map);

    }

    getFeatureInfo  (evt) {
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng),
        parseGetFeatureInfo = this.parseGetFeatureInfo;
        jQuery.ajax({
            url: url,
            success  (data, status, xhr) {
                // var err = typeof data === 'string' ? null : data;
                if(typeof(data) !== 'string')
                data = parseGetFeatureInfo(data);
                // () => {
                    this.showGetFeatureInfo(null, evt.latlng, data);
                // }
            },
            error  (xhr, status, error) {
                () => { this.showGetFeatureInfo(error); }
            }
        });
    }

    getFeatureInfoUrl  (latlng : LatLng) {
        // Construct a GetFeatureInfo request URL given a point
        var point = this._map.latLngToContainerPoint(latlng),
        size = this._map.getSize(),

        params = {
            srs: 'EPSG:4326',
            bbox: this._map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            // layers: this.wmsParams.layers,
            // query_layers: this.wmsParams.layers,
            info_format: 'text/xml',
            x: point.x,
            y: point.y,
            i: point.x, //1.3.0
            j: point.y  //1.3.0
        };

        let wmvId = (this.wmsParams as any).wmvId;

        // return this._url + Util.getParamString(params, this._url, true);
        var url = '/api/layers/' + wmvId + '/feature';
        return Config.ualUrl + url + Util.getParamString(params, url, true);
    }

    parseGetFeatureInfo (content) {
        var fields = [];
        for(var field in content) {
            fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
        }
        if(fields.length == 0)
        fields.push('<em>No data available</em>');
        return '<div>' + fields.join(' ') + '</div>';
    }

    showGetFeatureInfo  (err : Error, latlng : LatLng, content: any) {
        if (err) { console.log(err); return; } // do nothing if there's an error

        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800})
        .setLatLng(latlng)
        .setContent(content)
        .openOn(this._map);
    }

}


function determineWMSFormat( layer : LayerModel ) : string {
    let formats : string[] = layer.formats;
    if(formats && formats.length) {
        //look for common formats that make sense first...
        let idx = 0;
        let common = [ 'image/png32', 'image/png24', 'image/png8', 'image/png', 'image/jpeg' ];
        while( idx < common.length) {
            if( formats.indexOf( common[idx] ) >= 0 ) return common[idx];
            idx++;
        }
    }
    console.log("Layer '" + layer.label + "' has no formats specified, " +
        "assuming a default of 'image/png'");
    return 'image/png';
}


/**
 * short-form function for instantiating a WMS-based Layer's Leaflet instance
 */
function wms(layer : LayerModel) : WMS {

    let service : ServiceModel = layer.services && layer.services.length ?
        layer.services[0] : null;
    if(!service) {
        throw new Error("Cannot create leaflet layer for WMS Layer '" +
            (layer.label || layer.id) +
            "' because layer has no service associated with it");
    }

    let url : string = service.href;
    if(!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }

    //pick output format for the raster images
    let format = determineWMSFormat(layer);

    let supportedCrs = layer.crs || [];
    if(supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }

    //determine proper version of the WMS spec to use
    let version : string = '1.1.1';
    let versions : string[] = service.serviceTypeVersions || [];
    if(versions.length && versions.indexOf('1.1.1') < 0) {
        version = versions[0];
    } else {
        console.log("Warning: WMS Service doesn't list supported versions, assuming 1.1.1");
    }

    let opts : any = {
        layers      : layer.layerName,
        transparent : true,
        format      : format,
        wmvId       : layer.id,
        version     : version
    };
    if(Config.leafletPane) {
        (opts as any).pane = Config.leafletPane;
    }

    return new WMS(url, opts);

}

if( (window as any).L ) {
    const L = (window as any).L;
    L.TileLayer.WMS = WMS;
    L.tileLayer.wms = wms;
}

export {
    WMS as default,
    WMS,
    wms
};
