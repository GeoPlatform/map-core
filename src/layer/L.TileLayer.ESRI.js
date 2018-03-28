

(function (root, factory) {

    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('ESRITileLayer', [
            "jquery", "q", "leaflet",
            'geoplatform.client/src/shared/config'
        ],
        function(jQuery, Q, L, Config) {
            return (root.ESRITileLayer = factory(jQuery, Q, L, Config));
        });

    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.ESRITileLayer = factory(
                require("jquery"),
                require('q'),
                require('leaflet'),
                require('geoplatform.client').Config
            )
        );
    } else {
        GeoPlatform.ESRITileLayer = factory(jQuery, Q, L/*eaflet*/, GeoPlatform);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    if(!L) {
        throw new Error("Missing Leaflet");
    }
    if(!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    L.TileLayer.ESRI = L.TileLayer.extend({

        defaultESRIParams: {
            layers:       '', //=show:0,1,2
            transparent:  true,
            format:       'png32',
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            f:            'image'
            // imagesr:      '4326'
        },

        initialize: function (url, options) { // (String, Object)

            if(url.indexOf("/export") < 0) {
                let qidx = url.indexOf("?");
                if(qidx > 0) {
                    url = url.substring(0, qidx) + '/export' + url.substring(qidx);
                } else {
                    url += '/export';
                }
            }
            this._url = url;

            let esriParams = L.extend({}, this.defaultESRIParams),
                tileSize = options.tileSize || this.options.tileSize;

            let dim;
            if (options.detectRetina && L.Browser.retina) {
                dim = esriParams.height = tileSize * 2;
            } else {
                dim = esriParams.height = tileSize;
            }
            esriParams.size = dim + ',' + dim;

            for (var i in options) {
                // all keys that are not TileLayer options go to WMS params
                if (!this.options.hasOwnProperty(i) && i !== 'crs') {
                    esriParams[i] = options[i];
                }
            }

            //layer ids
            // esriParams.layers = "show:" + esriParams.layers;

            this.esriParams = esriParams;

            L.setOptions(this, options);

        },

        onAdd: function (map) {
            this._crs = this.options.crs || map.options.crs;
            this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (tilePoint) { // (Point, Number) -> String

            let map = this._map,
                tileSize = this.options.tileSize,

            nwPoint = tilePoint.multiplyBy(tileSize),
            sePoint = nwPoint.add([tileSize, tileSize]),

            nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
            se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
            bbox = [nw.x, se.y, se.x, nw.y].join(','),

            url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

            let params = L.extend({}, this.esriParams);
            params.layers = "show:" + params.layers;

            //convert to esri-special SR for spherical mercator
            if(params.bboxsr === 'EPSG:3857')
                params.bboxsr = '102100';
            if(params.imagesr === 'EPSG:3857')
                params.imagesr = '102100';

            return url + L.Util.getParamString(params, url, true) + '&BBOX=' + bbox;
        },

        setParams: function (params, noRedraw) {
            L.extend(this.esriParams, params);
            if (!noRedraw) {
                this.redraw();
            }
            return this;
        }
    });

    L.tileLayer.esri = function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    };


// })(jQuery, L/*eaflet*/,GeoPlatform);

    return L.TileLayer.ESRI;
}));
