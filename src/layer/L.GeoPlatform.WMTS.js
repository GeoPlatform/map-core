

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform"],
            function(jQuery, Q, L, GeoPlatform) {
                return (root.WMTSLayer = factory(jQuery, Q, L, GeoPlatform));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.WMTSLayer = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform')
            )
        );
    } else {
        GeoPlatform.WMTSLayer = factory(jQuery, Q, L/*eaflet*/, GeoPlatform);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

// (function(jQuery, L/*eaflet*/, GeoPlatform) {


    if(!L) {
        throw new Error("Missing Leaflet");
    }
    if(!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }



    /*
     * inspired by and uses code from https://github.com/mylen/leaflet.TileLayer.WMTS
     */
    L.GeoPlatform.WMTS = L.TileLayer.extend({

        defaultWmtsParams: {

            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            layers: '',
            styles: '',
            tileMatrixSet: '',
            format: 'image/png'
        },

        initialize: function (url, options) { // (String, Object)
            this._url = url;
            var wmtsParams = L.extend({}, this.defaultWmtsParams);
            var tileSize = options.tileSize || this.options.tileSize;
            if (options.detectRetina && L.Browser.retina) {
                wmtsParams.width = wmtsParams.height = tileSize * 2;
            } else {
                wmtsParams.width = wmtsParams.height = tileSize;
            }
            for (var i in options) {
                // all keys that are not TileLayer options go to WMTS params
                if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                    wmtsParams[i] = options[i];
                }
            }
            this.wmtsParams = wmtsParams;
            this.matrixIds = options.matrixIds||this.getDefaultMatrix();
            L.setOptions(this, options);
        },

        onAdd: function (map) {
            this._crs = this.options.crs || map.options.crs;
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (coords) { // (Point, Number) -> String
            var tileSize = this.options.tileSize;
            var nwPoint = coords.multiplyBy(tileSize);
            nwPoint.x+=1;
            nwPoint.y-=1;
            var sePoint = nwPoint.add(new L.Point(tileSize, tileSize));
            var zoom = this._tileZoom;
            var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
            var se = this._crs.project(this._map.unproject(sePoint, zoom));
            var tilewidth = se.x-nw.x;
            //zoom = this._map.getZoom();
            var ident = this.matrixIds[zoom].identifier;
            var tileMatrix = this.wmtsParams.tileMatrixSet + ":" + ident;
            var X0 = this.matrixIds[zoom].topLeftCorner.lng;
            var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
            var tilecol=Math.floor((nw.x-X0)/tilewidth);
            var tilerow=-Math.floor((nw.y-Y0)/tilewidth);


            let url = this._url;
            let isTileMatrixTemplated = url.indexOf('{TileMatrix}');
            let isTileRowTemplated = url.indexOf('{TileRow}');
            let isTileColTemplated = url.indexOf('{TileCol}');

            let o = { s: this._getSubdomain(coords) };
            if(isTileMatrixTemplated>0) o.TileMatrix = ident;
            if(isTileRowTemplated>0) o.TileRow = tilerow;
            if(isTileColTemplated>0) o.TileCol = tilecol;

            url = L.Util.template(url, o);

            let qsi = url.indexOf("?");
            if(qsi<0 || (isTileMatrixTemplated<qsi && isTileRowTemplated<qsi || isTileColTemplated<qsi)) {
                //if the TM,TR,TC variables are templated but not as querystring parameters
                // (ie, no '?' present or those params are before the '?'),
                // then the URL must not be OGC WMTS, so no need for WMTS parameters

            } else {
                url = url + L.Util.getParamString(this.wmtsParams, url);
                if(isTileMatrixTemplated<0)
                    url += "&TileMatrix=" + ident; //tileMatrixSet
                if(isTileRowTemplated<0)
                    url += "&TileRow=" + tilerow;
                if(isTileColTemplated<0)
                    url += "&TileCol=" + tilecol;
            }

            return url;
        },

        setParams: function (params, noRedraw) {
            L.extend(this.wmtsParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        },

        getDefaultMatrix : function () {
            /**
             * the matrix3857 represents the projection
             * for in the IGN WMTS for the google coordinates.
             */
            var matrixIds3857 = new Array(22);
            for (var i= 0; i<22; i++) {
                matrixIds3857[i]= {
                    identifier    : "" + i,
                    topLeftCorner : new L.LatLng(20037508.3428,-20037508.3428)
                };
            }
            return matrixIds3857;
        }
    });




    L.GeoPlatform.wmts = function(layer) {

        let url = layer.services && layer.services.length ? layer.services[0].href : null;

        let options = {
            layer: layer.layerName,
            style: 'default',
            tileMatrixSet: "default",
            format: "image/png"
        };
        if(GeoPlatform.leafletPane)
            options.pane = GeoPlatform.leafletPane;

        let distro = (layer.distributions || []).find( dist => {
            return dist.href && ( dist.mediaType==='image/png' || dist.mediaType==='image/jpeg' );
        });
        if(distro) {
            url = distro.href;
            options.format = distro.mediaType;

            let params = distro.parameters || [];
            params.each( param => {
                let value = param.defaultValue || param.values && param.values.length && param.values[0];
                if(value !== null && value !== undefined) {
                    url = url.replace('{' + param.name + '}', value);
                }
            });

        }

        if(!url) throw new Error("Unable to get URL for layer " + layer.id);

        return new L.GeoPlatform.WMTS( url, options );

    };


// })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.GeoPlatform.WMTS;

}));
