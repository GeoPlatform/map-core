

import * as jquery from "jquery";
const jQuery = jquery;

import * as Q from "q";
import { Map, TileLayer, tileLayer, Point, Coords, Browser, Util } from 'leaflet';

import {Config} from 'geoplatform.client';


class EsriTileLayer extends TileLayer {

    private _url : string;
    private _crs : any;
    private esriParams : any;
    private defaultESRIParams : any;

    constructor(url, options) {
        super(url, options);
    }

    initialize (url, options) { // (String, Object)

        if(!url) throw new Error("Layer was not configured with a URL");

        this.defaultESRIParams = {
            layers:       '', //=show:0,1,2
            transparent:  true,
            format:       'png32',
            f:            'image'
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            // imagesr:      '4326'
        };

        if(url.indexOf("/export") < 0) {
            let qidx = url.indexOf("?");
            if(qidx > 0) {
                url = url.substring(0, qidx) + '/export' + url.substring(qidx);
            } else {
                url += '/export';
            }
        }
        this._url = url;

        let esriParams : any = Util.extend({}, this.defaultESRIParams),
            tileSize = options.tileSize || this.options.tileSize;

        let dim;
        if (options.detectRetina && Browser.retina) {
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

        Util.setOptions(this, options);

    }

    onAdd (map : Map) : this {
        this._crs = (this.options as any).crs || (map.options as any).crs;
        this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
        return super.onAdd(map);
    }

    getTileUrl (tilePoint : Coords ) : string { // (Point, Number) -> String

        let map = this._map,
            tileSize = this.options.tileSize as number,

        nwPoint = tilePoint.multiplyBy(tileSize),
        sePoint = nwPoint.add([tileSize, tileSize]),

        nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
        se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
        bbox = [nw.x, se.y, se.x, nw.y].join(','),

        url = Util.template(this._url, {s: this._getSubdomain(tilePoint)});

        let params = Util.extend({}, this.esriParams);
        params.layers = "show:" + params.layers;

        //convert to esri-special SR for spherical mercator
        if(params.bboxsr === 'EPSG:3857')
            params.bboxsr = '102100';
        if(params.imagesr === 'EPSG:3857')
            params.imagesr = '102100';

        return url + Util.getParamString(params, url, true) + '&BBOX=' + bbox;
    }

    setParams (params, noRedraw) {
        Util.extend(this.esriParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }

    _getSubdomain (tilePoint : Point) : string {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	}
}

if((window as any).L) {
    const L = (window as any).L;
    L.TileLayer.ESRI = EsriTileLayer;
    L.tileLayer.esri = function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    };
}

export default EsriTileLayer;
