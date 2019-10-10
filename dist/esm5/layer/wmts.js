/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TileLayer, Browser, Point, Util, LatLng } from 'leaflet';
import { Config } from '@geoplatform/client';
/** @type {?} */
var paramRe = /\{ *([\w_-]+) *\}/g;
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
var /*
 * inspired by and uses code from https://github.com/mylen/leaflet.TileLayer.WMTS
 */
WMTS = /** @class */ (function (_super) {
    tslib_1.__extends(WMTS, _super);
    function WMTS(url, options) {
        return _super.call(this, url, options) || this;
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    WMTS.prototype.initialize = /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
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
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    WMTS.prototype.onAdd = /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    function (map) {
        (/** @type {?} */ (this))._crs = ((/** @type {?} */ ((/** @type {?} */ (this)).options))).crs || ((/** @type {?} */ (map.options))).crs;
        return _super.prototype.onAdd.call(this, map);
    };
    /**
     * @param {?} coords
     * @return {?}
     */
    WMTS.prototype.getTileUrl = /**
     * @param {?} coords
     * @return {?}
     */
    function (coords) {
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
        var url = this._url;
        /** @type {?} */
        var isTileMatrixTemplated = url.indexOf('{TileMatrix}');
        /** @type {?} */
        var isTileRowTemplated = url.indexOf('{TileRow}');
        /** @type {?} */
        var isTileColTemplated = url.indexOf('{TileCol}');
        /** @type {?} */
        var o = Object.assign({ s: this._getSubdomain(coords) }, this.wmtsParams);
        if (isTileMatrixTemplated > 0)
            o.TileMatrix = ident;
        if (isTileRowTemplated > 0)
            o.TileRow = tilerow;
        if (isTileColTemplated > 0)
            o.TileCol = tilecol;
        for (var k in o) {
            o[k.toLowerCase()] = o[k];
        }
        // url = Util.template(url.toLowerCase(), o);
        url = template(url, o);
        /** @type {?} */
        var qsi = url.indexOf("?");
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
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    WMTS.prototype.setParams = /**
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    function (params, noRedraw) {
        Util.extend((/** @type {?} */ (this)).wmtsParams, params);
        if (!noRedraw) {
            (/** @type {?} */ (this)).redraw();
        }
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    WMTS.prototype.getDefaultMatrix = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    WMTS.prototype._getSubdomain = /**
     * @param {?} tilePoint
     * @return {?}
     */
    function (tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    };
    return WMTS;
}(TileLayer));
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
    var url = layer.services && layer.services.length ? layer.services[0].href : null;
    /** @type {?} */
    var supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    /** @type {?} */
    var options = {
        layer: layer.layerName,
        layers: layer.layerName,
        style: 'default',
        tileMatrixSet: "default",
        format: "image/png"
    };
    if (Config.leafletPane)
        ((/** @type {?} */ (options))).pane = Config.leafletPane;
    /** @type {?} */
    var distro = (layer.distributions || []).find((/**
     * @param {?} dist
     * @return {?}
     */
    function (dist) {
        //ensure dist isn't 'null'
        return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
    }));
    if (distro) {
        url = distro.href;
        options.format = distro.mediaType;
        /** @type {?} */
        var params = distro.parameters || [];
        params.forEach((/**
         * @param {?} param
         * @return {?}
         */
        function (param) {
            /** @type {?} */
            var value = param.defaultValue || param.values && param.values.length && param.values[0];
            //ignore parameters without values and default values
            if (value === null && value === undefined)
                return;
            //ignore wmts specific parameters, WMTS layer will populate those values
            // based upon map state.
            /** @type {?} */
            var plc = param.name.toLowerCase();
            if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc)
                return;
            else if ("tilematrixset" === plc)
                options.tileMatrixSet = value;
            else { //for all other parameters, try to fill in default or initial values
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
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.TileLayer.WMTS = WMTS;
    L_1.tileLayer.wmts = wmts;
}
export { WMTS as default, WMTS, wmts };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd210cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFDRSxTQUFTLEVBQWEsT0FBTyxFQUNsQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFDdEIsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQUt2QyxPQUFPLEdBQUcsb0JBQW9COzs7Ozs7Ozs7OztBQU9wQyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSTtJQUMxQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTzs7Ozs7SUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHOztZQUN6QyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNmLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDL0Q7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTtZQUN2QyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDLEVBQUMsQ0FBQztBQUNKLENBQUM7Ozs7QUFNRDs7OztJQUFtQixnQ0FBUztJQVN4QixjQUFZLEdBQVksRUFBRSxPQUFjO2VBQ3BDLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBRUQseUJBQVU7Ozs7O0lBQVYsVUFBWSxHQUFHLEVBQUUsT0FBTztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFH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cnQge1xuICAgIE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIEJyb3dzZXIsXG4gICAgUG9pbnQsIFV0aWwsIExhdExuZ1xufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5cbmNvbnN0IHBhcmFtUmUgPSAvXFx7ICooW1xcd18tXSspICpcXH0vZztcblxuLy8gQGZ1bmN0aW9uIHRlbXBsYXRlKHN0cjogU3RyaW5nLCBkYXRhOiBPYmplY3QpOiBTdHJpbmdcbi8vIFNpbXBsZSB0ZW1wbGF0aW5nIGZhY2lsaXR5LCBhY2NlcHRzIGEgdGVtcGxhdGUgc3RyaW5nIG9mIHRoZSBmb3JtIGAnSGVsbG8ge2F9LCB7Yn0nYFxuLy8gYW5kIGEgZGF0YSBvYmplY3QgbGlrZSBge2E6ICdmb28nLCBiOiAnYmFyJ31gLCByZXR1cm5zIGV2YWx1YXRlZCBzdHJpbmdcbi8vIGAoJ0hlbGxvIGZvbywgYmFyJylgLiBZb3UgY2FuIGFsc28gc3BlY2lmeSBmdW5jdGlvbnMgaW5zdGVhZCBvZiBzdHJpbmdzIGZvclxuLy8gZGF0YSB2YWx1ZXMg4oCUIHRoZXkgd2lsbCBiZSBldmFsdWF0ZWQgcGFzc2luZyBgZGF0YWAgYXMgYW4gYXJndW1lbnQuXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHIsIGRhdGEpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKHBhcmFtUmUsIGZ1bmN0aW9uIChzdHIsIGtleSkge1xuXHRcdHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHR0aHJvdyBuZXcgRXJyb3IoJ05vIHZhbHVlIHByb3ZpZGVkIGZvciB2YXJpYWJsZSAnICsgc3RyKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZShkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9KTtcbn1cblxuXG4vKlxuICogaW5zcGlyZWQgYnkgYW5kIHVzZXMgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9teWxlbi9sZWFmbGV0LlRpbGVMYXllci5XTVRTXG4gKi9cbmNsYXNzIFdNVFMgZXh0ZW5kcyBUaWxlTGF5ZXIge1xuXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBtYXRyaXhJZHMgOiBhbnk7XG4gICAgcHJpdmF0ZSB3bXRzUGFyYW1zIDogYW55O1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0V210c1BhcmFtczogYW55O1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKHVybCwgb3B0aW9ucykgeyAvLyAoU3RyaW5nLCBPYmplY3QpXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICAgICAgdGhpcy5kZWZhdWx0V210c1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHNlcnZpY2U6ICdXTVRTJyxcbiAgICAgICAgICAgIHJlcXVlc3Q6ICdHZXRUaWxlJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjAuMCcsXG4gICAgICAgICAgICBsYXllcnM6ICcnLFxuICAgICAgICAgICAgc3R5bGVzOiAnJyxcbiAgICAgICAgICAgIHRpbGVNYXRyaXhTZXQ6ICcnLFxuICAgICAgICAgICAgZm9ybWF0OiAnaW1hZ2UvcG5nJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgd210c1BhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRXbXRzUGFyYW1zKTtcbiAgICAgICAgdmFyIHRpbGVTaXplID0gb3B0aW9ucy50aWxlU2l6ZSB8fCB0aGlzLm9wdGlvbnMudGlsZVNpemU7XG4gICAgICAgIGlmIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBCcm93c2VyLnJldGluYSkge1xuICAgICAgICAgICAgd210c1BhcmFtcy53aWR0aCA9IHdtdHNQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd210c1BhcmFtcy53aWR0aCA9IHdtdHNQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01UUyBwYXJhbXNcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGkpICYmIGkhPVwibWF0cml4SWRzXCIpIHtcbiAgICAgICAgICAgICAgICB3bXRzUGFyYW1zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndtdHNQYXJhbXMgPSB3bXRzUGFyYW1zO1xuICAgICAgICB0aGlzLm1hdHJpeElkcyA9IG9wdGlvbnMubWF0cml4SWRzfHx0aGlzLmdldERlZmF1bHRNYXRyaXgoKTtcbiAgICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9uQWRkICggbWFwOiBNYXAgKSA6IHRoaXMge1xuICAgICAgICB0aGlzLl9jcnMgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY3JzIHx8IChtYXAub3B0aW9ucyBhcyBhbnkpLmNycztcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uQWRkKG1hcCk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZVVybCAoY29vcmRzIDogUG9pbnQpIDogc3RyaW5nIHsgLy8gKFBvaW50LCBOdW1iZXIpIC0+IFN0cmluZ1xuICAgICAgICB2YXIgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemUgYXMgbnVtYmVyO1xuICAgICAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KHRpbGVTaXplKTtcbiAgICAgICAgbndQb2ludC54Kz0xO1xuICAgICAgICBud1BvaW50LnktPTE7XG4gICAgICAgIHZhciBzZVBvaW50ID0gbndQb2ludC5hZGQoIG5ldyBQb2ludCh0aWxlU2l6ZSwgdGlsZVNpemUpICk7XG4gICAgICAgIHZhciB6b29tID0gdGhpcy5fdGlsZVpvb207XG4gICAgICAgIHZhciBudyA9IHRoaXMuX2Nycy5wcm9qZWN0KHRoaXMuX21hcC51bnByb2plY3QobndQb2ludCwgem9vbSkpO1xuICAgICAgICB2YXIgc2UgPSB0aGlzLl9jcnMucHJvamVjdCh0aGlzLl9tYXAudW5wcm9qZWN0KHNlUG9pbnQsIHpvb20pKTtcbiAgICAgICAgdmFyIHRpbGV3aWR0aCA9IHNlLngtbncueDtcbiAgICAgICAgLy96b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICAgICAgdmFyIGlkZW50ID0gdGhpcy5tYXRyaXhJZHNbem9vbV0uaWRlbnRpZmllcjtcbiAgICAgICAgdmFyIHRpbGVNYXRyaXggPSB0aGlzLndtdHNQYXJhbXMudGlsZU1hdHJpeFNldCArIFwiOlwiICsgaWRlbnQ7XG4gICAgICAgIHZhciBYMCA9IHRoaXMubWF0cml4SWRzW3pvb21dLnRvcExlZnRDb3JuZXIubG5nO1xuICAgICAgICB2YXIgWTAgPSB0aGlzLm1hdHJpeElkc1t6b29tXS50b3BMZWZ0Q29ybmVyLmxhdDtcbiAgICAgICAgdmFyIHRpbGVjb2w9TWF0aC5mbG9vcigobncueC1YMCkvdGlsZXdpZHRoKTtcbiAgICAgICAgdmFyIHRpbGVyb3c9LU1hdGguZmxvb3IoKG53LnktWTApL3RpbGV3aWR0aCk7XG5cblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5fdXJsO1xuICAgICAgICBsZXQgaXNUaWxlTWF0cml4VGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlTWF0cml4fScpO1xuICAgICAgICBsZXQgaXNUaWxlUm93VGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlUm93fScpO1xuICAgICAgICBsZXQgaXNUaWxlQ29sVGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlQ29sfScpO1xuXG4gICAgICAgIGxldCBvID0gT2JqZWN0LmFzc2lnbih7czogdGhpcy5fZ2V0U3ViZG9tYWluKGNvb3Jkcyl9LCB0aGlzLndtdHNQYXJhbXMpO1xuICAgICAgICBpZihpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ+MCkgby5UaWxlTWF0cml4ID0gaWRlbnQ7XG4gICAgICAgIGlmKGlzVGlsZVJvd1RlbXBsYXRlZD4wKSBvLlRpbGVSb3cgPSB0aWxlcm93O1xuICAgICAgICBpZihpc1RpbGVDb2xUZW1wbGF0ZWQ+MCkgby5UaWxlQ29sID0gdGlsZWNvbDtcbiAgICAgICAgZm9yKGxldCBrIGluIG8pIHtcbiAgICAgICAgICAgIG9bay50b0xvd2VyQ2FzZSgpXSA9IG9ba107XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXJsID0gVXRpbC50ZW1wbGF0ZSh1cmwudG9Mb3dlckNhc2UoKSwgbyk7XG4gICAgICAgIHVybCA9IHRlbXBsYXRlKHVybCwgbyk7XG5cbiAgICAgICAgbGV0IHFzaSA9IHVybC5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgaWYocXNpPDAgfHwgKGlzVGlsZU1hdHJpeFRlbXBsYXRlZDxxc2kgJiYgaXNUaWxlUm93VGVtcGxhdGVkPHFzaSB8fCBpc1RpbGVDb2xUZW1wbGF0ZWQ8cXNpKSkge1xuICAgICAgICAgICAgLy9pZiB0aGUgVE0sVFIsVEMgdmFyaWFibGVzIGFyZSB0ZW1wbGF0ZWQgYnV0IG5vdCBhcyBxdWVyeXN0cmluZyBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAvLyAoaWUsIG5vICc/JyBwcmVzZW50IG9yIHRob3NlIHBhcmFtcyBhcmUgYmVmb3JlIHRoZSAnPycpLFxuICAgICAgICAgICAgLy8gdGhlbiB0aGUgVVJMIG11c3Qgbm90IGJlIE9HQyBXTVRTLCBzbyBubyBuZWVkIGZvciBXTVRTIHBhcmFtZXRlcnNcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsID0gdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyh0aGlzLndtdHNQYXJhbXMsIHVybCk7XG4gICAgICAgICAgICBpZihpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZU1hdHJpeD1cIiArIGlkZW50OyAvL3RpbGVNYXRyaXhTZXRcbiAgICAgICAgICAgIGlmKGlzVGlsZVJvd1RlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlUm93PVwiICsgdGlsZXJvdztcbiAgICAgICAgICAgIGlmKGlzVGlsZUNvbFRlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlQ29sPVwiICsgdGlsZWNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1zIChwYXJhbXMsIG5vUmVkcmF3KSB7XG4gICAgICAgIFV0aWwuZXh0ZW5kKHRoaXMud210c1BhcmFtcywgcGFyYW1zKTtcbiAgICAgICAgaWYgKCFub1JlZHJhdykge1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0TWF0cml4ICAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgbWF0cml4Mzg1NyByZXByZXNlbnRzIHRoZSBwcm9qZWN0aW9uXG4gICAgICAgICAqIGZvciBpbiB0aGUgSUdOIFdNVFMgZm9yIHRoZSBnb29nbGUgY29vcmRpbmF0ZXMuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbWF0cml4SWRzMzg1NyA9IG5ldyBBcnJheSgyMik7XG4gICAgICAgIGZvciAodmFyIGk9IDA7IGk8MjI7IGkrKykge1xuICAgICAgICAgICAgbWF0cml4SWRzMzg1N1tpXT0ge1xuICAgICAgICAgICAgICAgIGlkZW50aWZpZXIgICAgOiBcIlwiICsgaSxcbiAgICAgICAgICAgICAgICB0b3BMZWZ0Q29ybmVyIDogbmV3IExhdExuZygyMDAzNzUwOC4zNDI4LC0yMDAzNzUwOC4zNDI4KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0cml4SWRzMzg1NztcbiAgICB9XG5cbiAgICBfZ2V0U3ViZG9tYWluICh0aWxlUG9pbnQgOiBQb2ludCkgOiBzdHJpbmcge1xuXHRcdHZhciBpbmRleCA9IE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGhpcy5vcHRpb25zLnN1YmRvbWFpbnMubGVuZ3RoO1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuc3ViZG9tYWluc1tpbmRleF07XG5cdH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXRzKGxheWVyKSB7XG5cbiAgICBsZXQgdXJsID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID8gbGF5ZXIuc2VydmljZXNbMF0uaHJlZiA6IG51bGw7XG5cbiAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgIGxheWVyOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIGxheWVyczogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZTogJ2RlZmF1bHQnLFxuICAgICAgICB0aWxlTWF0cml4U2V0OiBcImRlZmF1bHRcIixcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRpb25zIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBkaXN0cm8gPSAobGF5ZXIuZGlzdHJpYnV0aW9ucyB8fCBbXSkuZmluZCggZGlzdCA9PiB7XG4gICAgICAgIC8vZW5zdXJlIGRpc3QgaXNuJ3QgJ251bGwnXG4gICAgICAgIHJldHVybiBkaXN0ICYmIGRpc3QuaHJlZiAmJiAoIGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL3BuZycgfHwgZGlzdC5tZWRpYVR5cGU9PT0naW1hZ2UvanBlZycgKTtcbiAgICB9KTtcbiAgICBpZihkaXN0cm8pIHtcbiAgICAgICAgdXJsID0gZGlzdHJvLmhyZWY7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZGlzdHJvLm1lZGlhVHlwZTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gZGlzdHJvLnBhcmFtZXRlcnMgfHwgW107XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKCBwYXJhbSA9PiB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBwYXJhbS52YWx1ZXMgJiYgcGFyYW0udmFsdWVzLmxlbmd0aCAmJiBwYXJhbS52YWx1ZXNbMF07XG5cbiAgICAgICAgICAgIC8vaWdub3JlIHBhcmFtZXRlcnMgd2l0aG91dCB2YWx1ZXMgYW5kIGRlZmF1bHQgdmFsdWVzXG4gICAgICAgICAgICBpZih2YWx1ZSA9PT0gbnVsbCAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgIC8vaWdub3JlIHdtdHMgc3BlY2lmaWMgcGFyYW1ldGVycywgV01UUyBsYXllciB3aWxsIHBvcHVsYXRlIHRob3NlIHZhbHVlc1xuICAgICAgICAgICAgLy8gYmFzZWQgdXBvbiBtYXAgc3RhdGUuXG4gICAgICAgICAgICBsZXQgcGxjID0gcGFyYW0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoXCJ0aWxlbWF0cml4XCIgPT09IHBsYyB8fCBcInRpbGVyb3dcIiA9PT0gcGxjIHx8IFwidGlsZWNvbFwiID09PSBwbGMpIHJldHVybjtcbiAgICAgICAgICAgIGVsc2UgaWYoXCJ0aWxlbWF0cml4c2V0XCIgPT09IHBsYykgb3B0aW9ucy50aWxlTWF0cml4U2V0ID0gdmFsdWU7XG4gICAgICAgICAgICBlbHNlIHsgLy9mb3IgYWxsIG90aGVyIHBhcmFtZXRlcnMsIHRyeSB0byBmaWxsIGluIGRlZmF1bHQgb3IgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgneycgKyBwYXJhbS5uYW1lICsgJ30nLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldUTVMgTGF5ZXIgLSBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgICAgIFwiIGhhcyBubyBkaXN0cmlidXRpb24ocykgdXNhYmxlIHRvIG1ha2UgV01UUyByZXF1ZXN0c1wiKTtcbiAgICB9XG5cbiAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIFdNVFMgVVJMIGZvciBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgXCIuIFBsZWFzZSBtYWtlIHN1cmUgaXQgaXMgZGVmaW5lZCBieSBlaXRoZXIgdGhlIHNlcnZpY2Ugb3IgYSBkaXN0cmlidXRpb24gb24gdGhlIGxheWVyIGl0c2VsZi5cIik7XG5cbiAgICByZXR1cm4gbmV3IFdNVFMoIHVybCwgb3B0aW9ucyApO1xuXG59XG5cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01UUyA9IFdNVFM7XG4gICAgTC50aWxlTGF5ZXIud210cyA9IHdtdHM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01UUyBhcyBkZWZhdWx0LFxuICAgIFdNVFMsXG4gICAgd210c1xufTtcbiJdfQ==