/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TileLayer, Browser, Point, Util, LatLng } from 'leaflet';
import { Config } from '@geoplatform/client';
/** @type {?} */
const paramRe = /\{ *([\w_-]+) *\}/g;
// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
/**
 * @param {?} str
 * @param {?} data
 * @return {?}
 */
function template(str, data) {
    return str.replace(paramRe, (/**
     * @param {?} str
     * @param {?} key
     * @return {?}
     */
    function (str, key) {
        /** @type {?} */
        var value = data[key];
        if (value === undefined) {
            value = data[key.toLowerCase()];
        }
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        }
        else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    }));
}
/*
 * inspired by and uses code from https://github.com/mylen/leaflet.TileLayer.WMTS
 */
class WMTS extends TileLayer {
    /**
     * @param {?} url
     * @param {?=} options
     */
    constructor(url, options) {
        super(url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    initialize(url, options) {
        this._url = url;
        this.defaultWmtsParams = {
            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            layers: '',
            styles: '',
            tileMatrixSet: '',
            format: 'image/png'
        };
        /** @type {?} */
        var wmtsParams = Util.extend({}, this.defaultWmtsParams);
        /** @type {?} */
        var tileSize = options.tileSize || this.options.tileSize;
        if (options.detectRetina && Browser.retina) {
            wmtsParams.width = wmtsParams.height = tileSize * 2;
        }
        else {
            wmtsParams.width = wmtsParams.height = tileSize;
        }
        for (var i in options) {
            // all keys that are not TileLayer options go to WMTS params
            if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
                wmtsParams[i] = options[i];
            }
        }
        this.wmtsParams = wmtsParams;
        this.matrixIds = options.matrixIds || this.getDefaultMatrix();
        Util.setOptions(this, options);
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    onAdd(map) {
        (/** @type {?} */ (this))._crs = ((/** @type {?} */ ((/** @type {?} */ (this)).options))).crs || ((/** @type {?} */ (map.options))).crs;
        return super.onAdd(map);
    }
    /**
     * @param {?} coords
     * @return {?}
     */
    getTileUrl(coords) {
        // (Point, Number) -> String
        /** @type {?} */
        var tileSize = (/** @type {?} */ (this.options.tileSize));
        /** @type {?} */
        var nwPoint = coords.multiplyBy(tileSize);
        nwPoint.x += 1;
        nwPoint.y -= 1;
        /** @type {?} */
        var sePoint = nwPoint.add(new Point(tileSize, tileSize));
        /** @type {?} */
        var zoom = this._tileZoom;
        /** @type {?} */
        var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
        /** @type {?} */
        var se = this._crs.project(this._map.unproject(sePoint, zoom));
        /** @type {?} */
        var tilewidth = se.x - nw.x;
        //zoom = this._map.getZoom();
        /** @type {?} */
        var ident = this.matrixIds[zoom].identifier;
        /** @type {?} */
        var tileMatrix = this.wmtsParams.tileMatrixSet + ":" + ident;
        /** @type {?} */
        var X0 = this.matrixIds[zoom].topLeftCorner.lng;
        /** @type {?} */
        var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
        /** @type {?} */
        var tilecol = Math.floor((nw.x - X0) / tilewidth);
        /** @type {?} */
        var tilerow = -Math.floor((nw.y - Y0) / tilewidth);
        /** @type {?} */
        let url = this._url;
        /** @type {?} */
        let isTileMatrixTemplated = url.indexOf('{TileMatrix}');
        /** @type {?} */
        let isTileRowTemplated = url.indexOf('{TileRow}');
        /** @type {?} */
        let isTileColTemplated = url.indexOf('{TileCol}');
        /** @type {?} */
        let o = Object.assign({ s: this._getSubdomain(coords) }, this.wmtsParams);
        if (isTileMatrixTemplated > 0)
            o.TileMatrix = ident;
        if (isTileRowTemplated > 0)
            o.TileRow = tilerow;
        if (isTileColTemplated > 0)
            o.TileCol = tilecol;
        for (let k in o) {
            o[k.toLowerCase()] = o[k];
        }
        // url = Util.template(url.toLowerCase(), o);
        url = template(url, o);
        /** @type {?} */
        let qsi = url.indexOf("?");
        if (qsi < 0 || (isTileMatrixTemplated < qsi && isTileRowTemplated < qsi || isTileColTemplated < qsi)) {
            //if the TM,TR,TC variables are templated but not as querystring parameters
            // (ie, no '?' present or those params are before the '?'),
            // then the URL must not be OGC WMTS, so no need for WMTS parameters
        }
        else {
            url = url + Util.getParamString(this.wmtsParams, url);
            if (isTileMatrixTemplated < 0)
                url += "&TileMatrix=" + ident; //tileMatrixSet
            if (isTileRowTemplated < 0)
                url += "&TileRow=" + tilerow;
            if (isTileColTemplated < 0)
                url += "&TileCol=" + tilecol;
        }
        return url;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    setParams(params, noRedraw) {
        Util.extend((/** @type {?} */ (this)).wmtsParams, params);
        if (!noRedraw) {
            (/** @type {?} */ (this)).redraw();
        }
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    getDefaultMatrix() {
        /**
         * the matrix3857 represents the projection
         * for in the IGN WMTS for the google coordinates.
         * @type {?}
         */
        var matrixIds3857 = new Array(22);
        for (var i = 0; i < 22; i++) {
            matrixIds3857[i] = {
                identifier: "" + i,
                topLeftCorner: new LatLng(20037508.3428, -20037508.3428)
            };
        }
        return matrixIds3857;
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    _getSubdomain(tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    WMTS.prototype._url;
    /**
     * @type {?}
     * @private
     */
    WMTS.prototype._crs;
    /**
     * @type {?}
     * @private
     */
    WMTS.prototype.matrixIds;
    /**
     * @type {?}
     * @private
     */
    WMTS.prototype.wmtsParams;
    /**
     * @type {?}
     * @private
     */
    WMTS.prototype.defaultWmtsParams;
}
/**
 * @param {?} layer
 * @return {?}
 */
function wmts(layer) {
    /** @type {?} */
    let url = layer.services && layer.services.length ? layer.services[0].href : null;
    /** @type {?} */
    let supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    /** @type {?} */
    let options = {
        layer: layer.layerName,
        style: 'default',
        tileMatrixSet: "default",
        format: "image/png"
    };
    if (Config.leafletPane)
        ((/** @type {?} */ (options))).pane = Config.leafletPane;
    /** @type {?} */
    let distro = (layer.distributions || []).find((/**
     * @param {?} dist
     * @return {?}
     */
    dist => {
        //ensure dist isn't 'null'
        return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
    }));
    if (distro) {
        url = distro.href;
        options.format = distro.mediaType;
        /** @type {?} */
        let params = distro.parameters || [];
        params.forEach((/**
         * @param {?} param
         * @return {?}
         */
        param => {
            //ignore wmts specific parameters, WMTS layer will populate those values
            // based upon map state.
            /** @type {?} */
            let plc = param.name.toLowerCase();
            if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc)
                return;
            //for all other parameters, try to fill in default or initial values
            /** @type {?} */
            let value = param.defaultValue || param.values && param.values.length && param.values[0];
            if (value !== null && value !== undefined) {
                url = url.replace('{' + param.name + '}', value);
            }
        }));
    }
    else {
        throw new Error("WTMS Layer - layer " + layer.id +
            " has no distribution(s) usable to make WMTS requests");
    }
    if (!url)
        throw new Error("Unable to determine WMTS URL for layer " + layer.id +
            ". Please make sure it is defined by either the service or a distribution on the layer itself.");
    return new WMTS(url, options);
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    const L = ((/** @type {?} */ (window))).L;
    L.TileLayer.WMTS = WMTS;
    L.tileLayer.wmts = wmts;
}
export { WMTS as default, WMTS, wmts };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd210cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUNFLFNBQVMsRUFBYSxPQUFPLEVBQ2xDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUN0QixNQUFNLFNBQVMsQ0FBQztBQUVqQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O01BS3ZDLE9BQU8sR0FBRyxvQkFBb0I7Ozs7Ozs7Ozs7O0FBT3BDLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQzFCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7OztJQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7O1lBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2YsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUMsRUFBQyxDQUFDO0FBQ0osQ0FBQzs7OztBQU1ELE1BQU0sSUFBSyxTQUFRLFNBQVM7Ozs7O0lBU3hCLFlBQVksR0FBWSxFQUFFLE9BQWM7UUFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUUsR0FBRyxFQUFFLE9BQU87UUFDcEIsSUFBSSxDQUFDLElB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LEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3RDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRDtRQUNMLENBQUMsRUFBQyxDQUFDO0tBQ047U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDNUMsc0RBQXNELENBQUMsQ0FBQztLQUMvRDtJQUVELElBQUcsQ0FBQyxHQUFHO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN6RSwrRkFBK0YsQ0FBQyxDQUFDO0lBRXJHLE9BQU8sSUFBSSxJQUFJLENBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBRSxDQUFDO0FBRXBDLENBQUM7QUFHRCxJQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7O1VBQ1osQ0FBQyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBCcm93c2VyLFxuICAgIFBvaW50LCBVdGlsLCBMYXRMbmdcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuXG5jb25zdCBwYXJhbVJlID0gL1xceyAqKFtcXHdfLV0rKSAqXFx9L2c7XG5cbi8vIEBmdW5jdGlvbiB0ZW1wbGF0ZShzdHI6IFN0cmluZywgZGF0YTogT2JqZWN0KTogU3RyaW5nXG4vLyBTaW1wbGUgdGVtcGxhdGluZyBmYWNpbGl0eSwgYWNjZXB0cyBhIHRlbXBsYXRlIHN0cmluZyBvZiB0aGUgZm9ybSBgJ0hlbGxvIHthfSwge2J9J2Bcbi8vIGFuZCBhIGRhdGEgb2JqZWN0IGxpa2UgYHthOiAnZm9vJywgYjogJ2Jhcid9YCwgcmV0dXJucyBldmFsdWF0ZWQgc3RyaW5nXG4vLyBgKCdIZWxsbyBmb28sIGJhcicpYC4gWW91IGNhbiBhbHNvIHNwZWNpZnkgZnVuY3Rpb25zIGluc3RlYWQgb2Ygc3RyaW5ncyBmb3Jcbi8vIGRhdGEgdmFsdWVzIOKAlCB0aGV5IHdpbGwgYmUgZXZhbHVhdGVkIHBhc3NpbmcgYGRhdGFgIGFzIGFuIGFyZ3VtZW50LlxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyLCBkYXRhKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZShwYXJhbVJlLCBmdW5jdGlvbiAoc3RyLCBrZXkpIHtcblx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGFba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFx0dGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZSBwcm92aWRlZCBmb3IgdmFyaWFibGUgJyArIHN0cik7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUoZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSk7XG59XG5cblxuLypcbiAqIGluc3BpcmVkIGJ5IGFuZCB1c2VzIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXlsZW4vbGVhZmxldC5UaWxlTGF5ZXIuV01UU1xuICovXG5jbGFzcyBXTVRTIGV4dGVuZHMgVGlsZUxheWVyIHtcblxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NyczogYW55O1xuICAgIHByaXZhdGUgbWF0cml4SWRzIDogYW55O1xuICAgIHByaXZhdGUgd210c1BhcmFtcyA6IGFueTtcblxuICAgIHByaXZhdGUgZGVmYXVsdFdtdHNQYXJhbXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplICh1cmwsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgT2JqZWN0KVxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuZGVmYXVsdFdtdHNQYXJhbXMgPSB7XG4gICAgICAgICAgICBzZXJ2aWNlOiAnV01UUycsXG4gICAgICAgICAgICByZXF1ZXN0OiAnR2V0VGlsZScsXG4gICAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgICAgICAgbGF5ZXJzOiAnJyxcbiAgICAgICAgICAgIHN0eWxlczogJycsXG4gICAgICAgICAgICB0aWxlTWF0cml4U2V0OiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2ltYWdlL3BuZydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHdtdHNQYXJhbXMgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0V210c1BhcmFtcyk7XG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplICogMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgLy8gYWxsIGtleXMgdGhhdCBhcmUgbm90IFRpbGVMYXllciBvcHRpb25zIGdvIHRvIFdNVFMgcGFyYW1zXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpIT1cIm1hdHJpeElkc1wiKSB7XG4gICAgICAgICAgICAgICAgd210c1BhcmFtc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53bXRzUGFyYW1zID0gd210c1BhcmFtcztcbiAgICAgICAgdGhpcy5tYXRyaXhJZHMgPSBvcHRpb25zLm1hdHJpeElkc3x8dGhpcy5nZXREZWZhdWx0TWF0cml4KCk7XG4gICAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvbkFkZCAoIG1hcDogTWFwICkgOiB0aGlzIHtcbiAgICAgICAgdGhpcy5fY3JzID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNycyB8fCAobWFwLm9wdGlvbnMgYXMgYW55KS5jcnM7XG4gICAgICAgIHJldHVybiBzdXBlci5vbkFkZChtYXApO1xuICAgIH1cblxuICAgIGdldFRpbGVVcmwgKGNvb3JkcyA6IFBvaW50KSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcbiAgICAgICAgdmFyIHRpbGVTaXplID0gdGhpcy5vcHRpb25zLnRpbGVTaXplIGFzIG51bWJlcjtcbiAgICAgICAgdmFyIG53UG9pbnQgPSBjb29yZHMubXVsdGlwbHlCeSh0aWxlU2l6ZSk7XG4gICAgICAgIG53UG9pbnQueCs9MTtcbiAgICAgICAgbndQb2ludC55LT0xO1xuICAgICAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKCBuZXcgUG9pbnQodGlsZVNpemUsIHRpbGVTaXplKSApO1xuICAgICAgICB2YXIgem9vbSA9IHRoaXMuX3RpbGVab29tO1xuICAgICAgICB2YXIgbncgPSB0aGlzLl9jcnMucHJvamVjdCh0aGlzLl9tYXAudW5wcm9qZWN0KG53UG9pbnQsIHpvb20pKTtcbiAgICAgICAgdmFyIHNlID0gdGhpcy5fY3JzLnByb2plY3QodGhpcy5fbWFwLnVucHJvamVjdChzZVBvaW50LCB6b29tKSk7XG4gICAgICAgIHZhciB0aWxld2lkdGggPSBzZS54LW53Lng7XG4gICAgICAgIC8vem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG4gICAgICAgIHZhciBpZGVudCA9IHRoaXMubWF0cml4SWRzW3pvb21dLmlkZW50aWZpZXI7XG4gICAgICAgIHZhciB0aWxlTWF0cml4ID0gdGhpcy53bXRzUGFyYW1zLnRpbGVNYXRyaXhTZXQgKyBcIjpcIiArIGlkZW50O1xuICAgICAgICB2YXIgWDAgPSB0aGlzLm1hdHJpeElkc1t6b29tXS50b3BMZWZ0Q29ybmVyLmxuZztcbiAgICAgICAgdmFyIFkwID0gdGhpcy5tYXRyaXhJZHNbem9vbV0udG9wTGVmdENvcm5lci5sYXQ7XG4gICAgICAgIHZhciB0aWxlY29sPU1hdGguZmxvb3IoKG53LngtWDApL3RpbGV3aWR0aCk7XG4gICAgICAgIHZhciB0aWxlcm93PS1NYXRoLmZsb29yKChudy55LVkwKS90aWxld2lkdGgpO1xuXG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX3VybDtcbiAgICAgICAgbGV0IGlzVGlsZU1hdHJpeFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZU1hdHJpeH0nKTtcbiAgICAgICAgbGV0IGlzVGlsZVJvd1RlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZVJvd30nKTtcbiAgICAgICAgbGV0IGlzVGlsZUNvbFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZUNvbH0nKTtcblxuICAgICAgICBsZXQgbyA9IE9iamVjdC5hc3NpZ24oe3M6IHRoaXMuX2dldFN1YmRvbWFpbihjb29yZHMpfSwgdGhpcy53bXRzUGFyYW1zKTtcbiAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPjApIG8uVGlsZU1hdHJpeCA9IGlkZW50O1xuICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ+MCkgby5UaWxlUm93ID0gdGlsZXJvdztcbiAgICAgICAgaWYoaXNUaWxlQ29sVGVtcGxhdGVkPjApIG8uVGlsZUNvbCA9IHRpbGVjb2w7XG4gICAgICAgIGZvcihsZXQgayBpbiBvKSB7XG4gICAgICAgICAgICBvW2sudG9Mb3dlckNhc2UoKV0gPSBvW2tdO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVybCA9IFV0aWwudGVtcGxhdGUodXJsLnRvTG93ZXJDYXNlKCksIG8pO1xuICAgICAgICB1cmwgPSB0ZW1wbGF0ZSh1cmwsIG8pO1xuXG4gICAgICAgIGxldCBxc2kgPSB1cmwuaW5kZXhPZihcIj9cIik7XG4gICAgICAgIGlmKHFzaTwwIHx8IChpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ8cXNpICYmIGlzVGlsZVJvd1RlbXBsYXRlZDxxc2kgfHwgaXNUaWxlQ29sVGVtcGxhdGVkPHFzaSkpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlIFRNLFRSLFRDIHZhcmlhYmxlcyBhcmUgdGVtcGxhdGVkIGJ1dCBub3QgYXMgcXVlcnlzdHJpbmcgcGFyYW1ldGVyc1xuICAgICAgICAgICAgLy8gKGllLCBubyAnPycgcHJlc2VudCBvciB0aG9zZSBwYXJhbXMgYXJlIGJlZm9yZSB0aGUgJz8nKSxcbiAgICAgICAgICAgIC8vIHRoZW4gdGhlIFVSTCBtdXN0IG5vdCBiZSBPR0MgV01UUywgc28gbm8gbmVlZCBmb3IgV01UUyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCA9IHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcodGhpcy53bXRzUGFyYW1zLCB1cmwpO1xuICAgICAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVNYXRyaXg9XCIgKyBpZGVudDsgLy90aWxlTWF0cml4U2V0XG4gICAgICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZVJvdz1cIiArIHRpbGVyb3c7XG4gICAgICAgICAgICBpZihpc1RpbGVDb2xUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZUNvbD1cIiArIHRpbGVjb2w7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLndtdHNQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdE1hdHJpeCAgKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhlIG1hdHJpeDM4NTcgcmVwcmVzZW50cyB0aGUgcHJvamVjdGlvblxuICAgICAgICAgKiBmb3IgaW4gdGhlIElHTiBXTVRTIGZvciB0aGUgZ29vZ2xlIGNvb3JkaW5hdGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG1hdHJpeElkczM4NTcgPSBuZXcgQXJyYXkoMjIpO1xuICAgICAgICBmb3IgKHZhciBpPSAwOyBpPDIyOyBpKyspIHtcbiAgICAgICAgICAgIG1hdHJpeElkczM4NTdbaV09IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyICAgIDogXCJcIiArIGksXG4gICAgICAgICAgICAgICAgdG9wTGVmdENvcm5lciA6IG5ldyBMYXRMbmcoMjAwMzc1MDguMzQyOCwtMjAwMzc1MDguMzQyOClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdHJpeElkczM4NTc7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd210cyhsYXllcikge1xuXG4gICAgbGV0IHVybCA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/IGxheWVyLnNlcnZpY2VzWzBdLmhyZWYgOiBudWxsO1xuXG4gICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBsYXllcjogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZTogJ2RlZmF1bHQnLFxuICAgICAgICB0aWxlTWF0cml4U2V0OiBcImRlZmF1bHRcIixcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRpb25zIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBkaXN0cm8gPSAobGF5ZXIuZGlzdHJpYnV0aW9ucyB8fCBbXSkuZmluZCggZGlzdCA9PiB7XG4gICAgICAgIC8vZW5zdXJlIGRpc3QgaXNuJ3QgJ251bGwnXG4gICAgICAgIHJldHVybiBkaXN0ICYmIGRpc3QuaHJlZiAmJiAoIGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL3BuZycgfHwgZGlzdC5tZWRpYVR5cGU9PT0naW1hZ2UvanBlZycgKTtcbiAgICB9KTtcbiAgICBpZihkaXN0cm8pIHtcbiAgICAgICAgdXJsID0gZGlzdHJvLmhyZWY7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZGlzdHJvLm1lZGlhVHlwZTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gZGlzdHJvLnBhcmFtZXRlcnMgfHwgW107XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKCBwYXJhbSA9PiB7XG5cbiAgICAgICAgICAgIC8vaWdub3JlIHdtdHMgc3BlY2lmaWMgcGFyYW1ldGVycywgV01UUyBsYXllciB3aWxsIHBvcHVsYXRlIHRob3NlIHZhbHVlc1xuICAgICAgICAgICAgLy8gYmFzZWQgdXBvbiBtYXAgc3RhdGUuXG4gICAgICAgICAgICBsZXQgcGxjID0gcGFyYW0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoXCJ0aWxlbWF0cml4XCIgPT09IHBsYyB8fCBcInRpbGVyb3dcIiA9PT0gcGxjIHx8IFwidGlsZWNvbFwiID09PSBwbGMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvL2ZvciBhbGwgb3RoZXIgcGFyYW1ldGVycywgdHJ5IHRvIGZpbGwgaW4gZGVmYXVsdCBvciBpbml0aWFsIHZhbHVlc1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IHBhcmFtLnZhbHVlcyAmJiBwYXJhbS52YWx1ZXMubGVuZ3RoICYmIHBhcmFtLnZhbHVlc1swXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgneycgKyBwYXJhbS5uYW1lICsgJ30nLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldUTVMgTGF5ZXIgLSBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgICAgIFwiIGhhcyBubyBkaXN0cmlidXRpb24ocykgdXNhYmxlIHRvIG1ha2UgV01UUyByZXF1ZXN0c1wiKTtcbiAgICB9XG5cbiAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIFdNVFMgVVJMIGZvciBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgXCIuIFBsZWFzZSBtYWtlIHN1cmUgaXQgaXMgZGVmaW5lZCBieSBlaXRoZXIgdGhlIHNlcnZpY2Ugb3IgYSBkaXN0cmlidXRpb24gb24gdGhlIGxheWVyIGl0c2VsZi5cIik7XG5cbiAgICByZXR1cm4gbmV3IFdNVFMoIHVybCwgb3B0aW9ucyApO1xuXG59XG5cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01UUyA9IFdNVFM7XG4gICAgTC50aWxlTGF5ZXIud210cyA9IHdtdHM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01UUyBhcyBkZWZhdWx0LFxuICAgIFdNVFMsXG4gICAgd210c1xufTtcbiJdfQ==