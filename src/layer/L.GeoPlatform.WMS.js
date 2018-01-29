
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform"],
            function(jQuery, Q, L, GeoPlatform) {
                return (root.WMSLayer = factory(jQuery, Q, L, GeoPlatform));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.WMSLayer = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform')
            )
        );
    } else {
        GeoPlatform.WMSLayer = factory(jQuery, Q, L/*eaflet*/, GeoPlatform);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

// (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if(!L) {
        throw new Error("Missing Leaflet");
    }
    if(!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }


    L.GeoPlatform.WMS = L.TileLayer.WMS.extend({

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
            L.TileLayer.WMS.prototype.onRemove.call(this, map);
        },

        getFeatureInfo: function (evt) {
            // Make an AJAX request to the server and hope for the best
            var url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this),
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

            // return this._url + L.Util.getParamString(params, this._url, true);
            var url = '/api/layers/' + this.wmsParams.wmvId + '/feature';
            return GeoPlatform.ualUrl + url + L.Util.getParamString(params, url, true);
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
            L.popup({ maxWidth: 800})
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
        }

    });


    L.GeoPlatform.wms = function(layer) {

        let service = layer.services && layer.services.length ?
            layer.services[0] : null;
        if(!service) {
            let msg = `L.GeoPlatform.wms() -
                      Cannot create leaflet layer for GP Layer:
                      layer has no service`;
            throw new Error(msg);
        }

        let url = service.href;
        let format  = layer.supportedFormats ? layer.supportedFormats[0] : "image/png";

        let opts = {
            layers: layer.layerName,
            transparent: true,
            format: format,
            wmvId: layer.id
        };
        if(GeoPlatform.leafletPane)
            opts.pane = GeoPlatform.leafletPane;

        return new L.GeoPlatform.WMS(url, opts);

    };

// })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMS;

}));
