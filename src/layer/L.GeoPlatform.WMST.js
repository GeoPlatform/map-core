

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform"],
            function(jQuery, Q, L, GeoPlatform) {
                return (root.WMSTLayer = factory(jQuery, Q, L, GeoPlatform));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.WMSTLayer = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform')
            )
        );
    } else {
        GeoPlatform.WMSTLayer = factory(jQuery, Q, L/*eaflet*/, GeoPlatform);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

// (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if(!L) {
        throw new Error("Missing Leaflet");
    }
    if(!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }



    L.GeoPlatform.WMST = L.TimeDimension.Layer.WMS.extend({

        //override default parser to query all Layers (whether queryable or not)
        _parseTimeDimensionFromCapabilities: function(xml) {
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
        },

        //override default parser to fall back if Dimension is provided but has no values
        _getTimesFromLayerCapabilities: function(layer) {
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

    });




    L.GeoPlatform.wmst = function (gpLayer) {

        let service = gpLayer.services[0];
        let url = service.href;

        let opts = {
            layers: gpLayer.layerName,
            transparent: true,
            format: "image/png",
            wmvId: gpLayer.layerId
        };
        if(GeoPlatform.leafletPane)
            opts.pane = GeoPlatform.leafletPane;

        let leafletLayer = new L.TileLayer.CustomWMS( url, opts );

        let proxyUrl = GeoPlatform.ualUrl + '/api/services/' +
            service.id + '/proxy/capabilities';

        let tdOpts = {};

        if(gpLayer.temporal) {

            let d1 = gpLayer.temporal.startDate ?
                new Date(gpLayer.temporal.startDate) : new Date();
            let d2 = gpLayer.temporal.endDate ?
                new Date(gpLayer.temporal.endDate) : new Date();

            tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
        }

        return new L.GeoPlatform.WMST(leafletLayer, {
            timeDimension: L.timeDimension(tdOpts),
            proxy: proxyUrl
        });
    };


// })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMST;

}));
