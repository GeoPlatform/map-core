

import jQuery from "jquery";
import Q from "q";
import {Config} from 'geoplatform.client';


var esriTileLayer = !L || !L.TileLayer ? null : L.TileLayer.extend({

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

if(L && L.TileLayer) {
    L.TileLayer.ESRI = esriTileLayer;
    L.tileLayer.esri = function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    };
}


export default esriTileLayer;
