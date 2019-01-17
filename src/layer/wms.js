
import jQuery from "jquery";
import Q from "q";
import { TileLayer, tileLayer, Util, popup } from 'leaflet';

import {Config} from 'geoplatform.client';



var WMS = TileLayer.WMS.extend({

    enableGetFeatureInfo: function () {
        this._map.on('click', this.getFeatureInfo, this);
        this._enabled = true;
    },

    disableGetFeatureInfo: function() {
        this._map.off('click', this.getFeatureInfo, this);
        this._enabled = false;
    },

    isGetFeatureInfoEnabled: function() {
        return this._enabled;
    },

    onRemove: function (map) {

        //if GFI is enabled, disable it before removing
        if(this.isGetFeatureInfoEnabled())
        this.disableGetFeatureInfo();

        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        TileLayer.WMS.prototype.onRemove.call(this, map);
    },

    getFeatureInfo: function (evt) {
        // Make an AJAX request to the server and hope for the best
        var url = this.getFeatureInfoUrl(evt.latlng),
        showResults = Util.bind(this.showGetFeatureInfo, this),
        parseGetFeatureInfo = this.parseGetFeatureInfo;
        jQuery.ajax({
            url: url,
            success: function (data, status, xhr) {
                // var err = typeof data === 'string' ? null : data;
                if(typeof(data) !== 'string')
                data = parseGetFeatureInfo(data);
                showResults(null, evt.latlng, data);
            },
            error: function (xhr, status, error) {
                showResults(error);
            }
        });
    },

    getFeatureInfoUrl: function (latlng) {
        // Construct a GetFeatureInfo request URL given a point
        var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
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

        // return this._url + Util.getParamString(params, this._url, true);
        var url = '/api/layers/' + this.wmsParams.wmvId + '/feature';
        return Config.ualUrl + url + Util.getParamString(params, url, true);
    },

    parseGetFeatureInfo: function(content) {
        var fields = [];
        for(var field in content) {
            fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
        }
        if(fields.length == 0)
        fields.push('<em>No data available</em>');
        return '<div>' + fields.join(' ') + '</div>';
    },

    showGetFeatureInfo: function (err, latlng, content) {
        if (err) { console.log(err); return; } // do nothing if there's an error

        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800})
        .setLatLng(latlng)
        .setContent(content)
        .openOn(this._map);
    }

});


function wms(layer) {

    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if(!service) {
        let msg = `wms() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }

    let url = service.href;
    let formats = layer.supportedFormats || [];
    let format  = formats.length ? formats[0] : "image/png";

    let version = '1.1.1';
    if(service.api && service.api.length) {
        let is130 = service.api.filter(api => api.accessURL.indexOf('wms/1.3.0')>0 ).length > 0;
        if(is130) version = '1.3.0';
    }

    let opts = {
        layers: layer.layerName,
        transparent: true,
        format: format,
        wmvId: layer.id,
        version: version
    };
    if(Config.leafletPane)
        opts.pane = Config.leafletPane;

    return new WMS(url, opts);

}

// TileLayer.WMS = WMS;
// tileLayer.wms = wms;

export {
    WMS as default,
    WMS,
    wms
};
