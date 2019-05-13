/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { TileLayer, Browser, Point, Util, LatLng } from 'leaflet';
import { Config } from 'geoplatform.client';
/** @type {?} */
var paramRe = /\{ *([\w_-]+) *\}/g;
/**
 * @param {?} str
 * @param {?} data
 * @return {?}
 */
function template(str, data) {
    return str.replace(paramRe, function (str, key) {
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
    });
}
var WMTS = /** @class */ (function (_super) {
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
        // (String, Object)
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
     * @param {?} map
     * @return {?}
     */
    WMTS.prototype.onAdd = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
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
        /** @type {?} */
        var tileSize = /** @type {?} */ (this.options.tileSize);
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
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    WMTS.prototype.setParams = /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    function (params, noRedraw) {
        Util.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    };
    /**
     * @return {?}
     */
    WMTS.prototype.getDefaultMatrix = /**
     * @return {?}
     */
    function () {
        /** *
         * the matrix3857 represents the projection
         * for in the IGN WMTS for the google coordinates.
          @type {?} */
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
    /** @type {?} */
    WMTS.prototype._url;
    /** @type {?} */
    WMTS.prototype._crs;
    /** @type {?} */
    WMTS.prototype.matrixIds;
    /** @type {?} */
    WMTS.prototype.wmtsParams;
    /** @type {?} */
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
    var options = {
        layer: layer.layerName,
        style: 'default',
        tileMatrixSet: "default",
        format: "image/png"
    };
    if (Config.leafletPane)
        (/** @type {?} */ (options)).pane = Config.leafletPane;
    /** @type {?} */
    var distro = (layer.distributions || []).find(function (dist) {
        //ensure dist isn't 'null'
        return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
    });
    if (distro) {
        url = distro.href;
        options.format = distro.mediaType;
        /** @type {?} */
        var params = distro.parameters || [];
        params.forEach(function (param) {
            /** @type {?} */
            var plc = param.name.toLowerCase();
            if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc)
                return;
            /** @type {?} */
            var value = param.defaultValue || param.values && param.values.length && param.values[0];
            if (value !== null && value !== undefined) {
                url = url.replace('{' + param.name + '}', value);
            }
        });
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
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.TileLayer.WMTS = WMTS;
    L_1.tileLayer.wmts = wmts;
}
export { WMTS as default, WMTS, wmts };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci93bXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUd0QixPQUFPLEVBQ0UsU0FBUyxFQUFhLE9BQU8sRUFDbEMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQ3RCLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFLNUMsSUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUM7Ozs7OztBQU9yQyxrQkFBa0IsR0FBRyxFQUFFLElBQUk7SUFDMUIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHOztRQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNiLENBQUMsQ0FBQztDQUNIO0FBTUQsSUFBQTtJQUFtQixnQ0FBUztJQVN4QixjQUFZLEdBQVksRUFBRSxPQUFjO2VBQ3BDLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUM7S0FDdEI7Ozs7OztJQUVELHlCQUFVOzs7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LE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDNUMsc0RBQXNELENBQUMsQ0FBQztLQUMvRDtJQUVELElBQUcsQ0FBQyxHQUFHO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN6RSwrRkFBK0YsQ0FBQyxDQUFDO0lBRXJHLE9BQU8sSUFBSSxJQUFJLENBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBRSxDQUFDO0NBRW5DO0FBR0QsSUFBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUU7O0lBQ2xCLElBQU0sR0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDeEIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzNCO0FBRUQsT0FBTyxFQUNILElBQUksSUFBSSxPQUFPLEVBQ2YsSUFBSSxFQUNKLElBQUksRUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7XG4gICAgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgQnJvd3NlcixcbiAgICBQb2ludCwgVXRpbCwgTGF0TG5nXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cblxuXG5jb25zdCBwYXJhbVJlID0gL1xceyAqKFtcXHdfLV0rKSAqXFx9L2c7XG5cbi8vIEBmdW5jdGlvbiB0ZW1wbGF0ZShzdHI6IFN0cmluZywgZGF0YTogT2JqZWN0KTogU3RyaW5nXG4vLyBTaW1wbGUgdGVtcGxhdGluZyBmYWNpbGl0eSwgYWNjZXB0cyBhIHRlbXBsYXRlIHN0cmluZyBvZiB0aGUgZm9ybSBgJ0hlbGxvIHthfSwge2J9J2Bcbi8vIGFuZCBhIGRhdGEgb2JqZWN0IGxpa2UgYHthOiAnZm9vJywgYjogJ2Jhcid9YCwgcmV0dXJucyBldmFsdWF0ZWQgc3RyaW5nXG4vLyBgKCdIZWxsbyBmb28sIGJhcicpYC4gWW91IGNhbiBhbHNvIHNwZWNpZnkgZnVuY3Rpb25zIGluc3RlYWQgb2Ygc3RyaW5ncyBmb3Jcbi8vIGRhdGEgdmFsdWVzIOKAlCB0aGV5IHdpbGwgYmUgZXZhbHVhdGVkIHBhc3NpbmcgYGRhdGFgIGFzIGFuIGFyZ3VtZW50LlxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyLCBkYXRhKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZShwYXJhbVJlLCBmdW5jdGlvbiAoc3RyLCBrZXkpIHtcblx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGFba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFx0dGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZSBwcm92aWRlZCBmb3IgdmFyaWFibGUgJyArIHN0cik7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUoZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSk7XG59XG5cblxuLypcbiAqIGluc3BpcmVkIGJ5IGFuZCB1c2VzIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXlsZW4vbGVhZmxldC5UaWxlTGF5ZXIuV01UU1xuICovXG5jbGFzcyBXTVRTIGV4dGVuZHMgVGlsZUxheWVyIHtcblxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NyczogYW55O1xuICAgIHByaXZhdGUgbWF0cml4SWRzIDogYW55O1xuICAgIHByaXZhdGUgd210c1BhcmFtcyA6IGFueTtcblxuICAgIHByaXZhdGUgZGVmYXVsdFdtdHNQYXJhbXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplICh1cmwsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgT2JqZWN0KVxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuZGVmYXVsdFdtdHNQYXJhbXMgPSB7XG4gICAgICAgICAgICBzZXJ2aWNlOiAnV01UUycsXG4gICAgICAgICAgICByZXF1ZXN0OiAnR2V0VGlsZScsXG4gICAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgICAgICAgbGF5ZXJzOiAnJyxcbiAgICAgICAgICAgIHN0eWxlczogJycsXG4gICAgICAgICAgICB0aWxlTWF0cml4U2V0OiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2ltYWdlL3BuZydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHdtdHNQYXJhbXMgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0V210c1BhcmFtcyk7XG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplICogMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgLy8gYWxsIGtleXMgdGhhdCBhcmUgbm90IFRpbGVMYXllciBvcHRpb25zIGdvIHRvIFdNVFMgcGFyYW1zXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpIT1cIm1hdHJpeElkc1wiKSB7XG4gICAgICAgICAgICAgICAgd210c1BhcmFtc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53bXRzUGFyYW1zID0gd210c1BhcmFtcztcbiAgICAgICAgdGhpcy5tYXRyaXhJZHMgPSBvcHRpb25zLm1hdHJpeElkc3x8dGhpcy5nZXREZWZhdWx0TWF0cml4KCk7XG4gICAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvbkFkZCAoIG1hcDogTWFwICkgOiB0aGlzIHtcbiAgICAgICAgdGhpcy5fY3JzID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNycyB8fCAobWFwLm9wdGlvbnMgYXMgYW55KS5jcnM7XG4gICAgICAgIHJldHVybiBzdXBlci5vbkFkZChtYXApO1xuICAgIH1cblxuICAgIGdldFRpbGVVcmwgKGNvb3JkcyA6IFBvaW50KSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcbiAgICAgICAgdmFyIHRpbGVTaXplID0gdGhpcy5vcHRpb25zLnRpbGVTaXplIGFzIG51bWJlcjtcbiAgICAgICAgdmFyIG53UG9pbnQgPSBjb29yZHMubXVsdGlwbHlCeSh0aWxlU2l6ZSk7XG4gICAgICAgIG53UG9pbnQueCs9MTtcbiAgICAgICAgbndQb2ludC55LT0xO1xuICAgICAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKCBuZXcgUG9pbnQodGlsZVNpemUsIHRpbGVTaXplKSApO1xuICAgICAgICB2YXIgem9vbSA9IHRoaXMuX3RpbGVab29tO1xuICAgICAgICB2YXIgbncgPSB0aGlzLl9jcnMucHJvamVjdCh0aGlzLl9tYXAudW5wcm9qZWN0KG53UG9pbnQsIHpvb20pKTtcbiAgICAgICAgdmFyIHNlID0gdGhpcy5fY3JzLnByb2plY3QodGhpcy5fbWFwLnVucHJvamVjdChzZVBvaW50LCB6b29tKSk7XG4gICAgICAgIHZhciB0aWxld2lkdGggPSBzZS54LW53Lng7XG4gICAgICAgIC8vem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG4gICAgICAgIHZhciBpZGVudCA9IHRoaXMubWF0cml4SWRzW3pvb21dLmlkZW50aWZpZXI7XG4gICAgICAgIHZhciB0aWxlTWF0cml4ID0gdGhpcy53bXRzUGFyYW1zLnRpbGVNYXRyaXhTZXQgKyBcIjpcIiArIGlkZW50O1xuICAgICAgICB2YXIgWDAgPSB0aGlzLm1hdHJpeElkc1t6b29tXS50b3BMZWZ0Q29ybmVyLmxuZztcbiAgICAgICAgdmFyIFkwID0gdGhpcy5tYXRyaXhJZHNbem9vbV0udG9wTGVmdENvcm5lci5sYXQ7XG4gICAgICAgIHZhciB0aWxlY29sPU1hdGguZmxvb3IoKG53LngtWDApL3RpbGV3aWR0aCk7XG4gICAgICAgIHZhciB0aWxlcm93PS1NYXRoLmZsb29yKChudy55LVkwKS90aWxld2lkdGgpO1xuXG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX3VybDtcbiAgICAgICAgbGV0IGlzVGlsZU1hdHJpeFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZU1hdHJpeH0nKTtcbiAgICAgICAgbGV0IGlzVGlsZVJvd1RlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZVJvd30nKTtcbiAgICAgICAgbGV0IGlzVGlsZUNvbFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZUNvbH0nKTtcblxuICAgICAgICBsZXQgbyA9IE9iamVjdC5hc3NpZ24oe3M6IHRoaXMuX2dldFN1YmRvbWFpbihjb29yZHMpfSwgdGhpcy53bXRzUGFyYW1zKTtcbiAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPjApIG8uVGlsZU1hdHJpeCA9IGlkZW50O1xuICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ+MCkgby5UaWxlUm93ID0gdGlsZXJvdztcbiAgICAgICAgaWYoaXNUaWxlQ29sVGVtcGxhdGVkPjApIG8uVGlsZUNvbCA9IHRpbGVjb2w7XG4gICAgICAgIGZvcihsZXQgayBpbiBvKSB7XG4gICAgICAgICAgICBvW2sudG9Mb3dlckNhc2UoKV0gPSBvW2tdO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVybCA9IFV0aWwudGVtcGxhdGUodXJsLnRvTG93ZXJDYXNlKCksIG8pO1xuICAgICAgICB1cmwgPSB0ZW1wbGF0ZSh1cmwsIG8pO1xuXG4gICAgICAgIGxldCBxc2kgPSB1cmwuaW5kZXhPZihcIj9cIik7XG4gICAgICAgIGlmKHFzaTwwIHx8IChpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ8cXNpICYmIGlzVGlsZVJvd1RlbXBsYXRlZDxxc2kgfHwgaXNUaWxlQ29sVGVtcGxhdGVkPHFzaSkpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlIFRNLFRSLFRDIHZhcmlhYmxlcyBhcmUgdGVtcGxhdGVkIGJ1dCBub3QgYXMgcXVlcnlzdHJpbmcgcGFyYW1ldGVyc1xuICAgICAgICAgICAgLy8gKGllLCBubyAnPycgcHJlc2VudCBvciB0aG9zZSBwYXJhbXMgYXJlIGJlZm9yZSB0aGUgJz8nKSxcbiAgICAgICAgICAgIC8vIHRoZW4gdGhlIFVSTCBtdXN0IG5vdCBiZSBPR0MgV01UUywgc28gbm8gbmVlZCBmb3IgV01UUyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCA9IHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcodGhpcy53bXRzUGFyYW1zLCB1cmwpO1xuICAgICAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVNYXRyaXg9XCIgKyBpZGVudDsgLy90aWxlTWF0cml4U2V0XG4gICAgICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZVJvdz1cIiArIHRpbGVyb3c7XG4gICAgICAgICAgICBpZihpc1RpbGVDb2xUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZUNvbD1cIiArIHRpbGVjb2w7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLndtdHNQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdE1hdHJpeCAgKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhlIG1hdHJpeDM4NTcgcmVwcmVzZW50cyB0aGUgcHJvamVjdGlvblxuICAgICAgICAgKiBmb3IgaW4gdGhlIElHTiBXTVRTIGZvciB0aGUgZ29vZ2xlIGNvb3JkaW5hdGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG1hdHJpeElkczM4NTcgPSBuZXcgQXJyYXkoMjIpO1xuICAgICAgICBmb3IgKHZhciBpPSAwOyBpPDIyOyBpKyspIHtcbiAgICAgICAgICAgIG1hdHJpeElkczM4NTdbaV09IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyICAgIDogXCJcIiArIGksXG4gICAgICAgICAgICAgICAgdG9wTGVmdENvcm5lciA6IG5ldyBMYXRMbmcoMjAwMzc1MDguMzQyOCwtMjAwMzc1MDguMzQyOClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdHJpeElkczM4NTc7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd210cyhsYXllcikge1xuXG4gICAgbGV0IHVybCA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/IGxheWVyLnNlcnZpY2VzWzBdLmhyZWYgOiBudWxsO1xuXG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgIGxheWVyOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHN0eWxlOiAnZGVmYXVsdCcsXG4gICAgICAgIHRpbGVNYXRyaXhTZXQ6IFwiZGVmYXVsdFwiLFxuICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCJcbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdGlvbnMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IGRpc3RybyA9IChsYXllci5kaXN0cmlidXRpb25zIHx8IFtdKS5maW5kKCBkaXN0ID0+IHtcbiAgICAgICAgLy9lbnN1cmUgZGlzdCBpc24ndCAnbnVsbCdcbiAgICAgICAgcmV0dXJuIGRpc3QgJiYgZGlzdC5ocmVmICYmICggZGlzdC5tZWRpYVR5cGU9PT0naW1hZ2UvcG5nJyB8fCBkaXN0Lm1lZGlhVHlwZT09PSdpbWFnZS9qcGVnJyApO1xuICAgIH0pO1xuICAgIGlmKGRpc3Rybykge1xuICAgICAgICB1cmwgPSBkaXN0cm8uaHJlZjtcbiAgICAgICAgb3B0aW9ucy5mb3JtYXQgPSBkaXN0cm8ubWVkaWFUeXBlO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSBkaXN0cm8ucGFyYW1ldGVycyB8fCBbXTtcbiAgICAgICAgcGFyYW1zLmZvckVhY2goIHBhcmFtID0+IHtcblxuICAgICAgICAgICAgLy9pZ25vcmUgd210cyBzcGVjaWZpYyBwYXJhbWV0ZXJzLCBXTVRTIGxheWVyIHdpbGwgcG9wdWxhdGUgdGhvc2UgdmFsdWVzXG4gICAgICAgICAgICAvLyBiYXNlZCB1cG9uIG1hcCBzdGF0ZS5cbiAgICAgICAgICAgIGxldCBwbGMgPSBwYXJhbS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihcInRpbGVtYXRyaXhcIiA9PT0gcGxjIHx8IFwidGlsZXJvd1wiID09PSBwbGMgfHwgXCJ0aWxlY29sXCIgPT09IHBsYylcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vZm9yIGFsbCBvdGhlciBwYXJhbWV0ZXJzLCB0cnkgdG8gZmlsbCBpbiBkZWZhdWx0IG9yIGluaXRpYWwgdmFsdWVzXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgcGFyYW0udmFsdWVzICYmIHBhcmFtLnZhbHVlcy5sZW5ndGggJiYgcGFyYW0udmFsdWVzWzBdO1xuICAgICAgICAgICAgaWYodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKCd7JyArIHBhcmFtLm5hbWUgKyAnfScsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV1RNUyBMYXllciAtIGxheWVyIFwiICsgbGF5ZXIuaWQgK1xuICAgICAgICAgICAgXCIgaGFzIG5vIGRpc3RyaWJ1dGlvbihzKSB1c2FibGUgdG8gbWFrZSBXTVRTIHJlcXVlc3RzXCIpO1xuICAgIH1cblxuICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBkZXRlcm1pbmUgV01UUyBVUkwgZm9yIGxheWVyIFwiICsgbGF5ZXIuaWQgK1xuICAgICAgICBcIi4gUGxlYXNlIG1ha2Ugc3VyZSBpdCBpcyBkZWZpbmVkIGJ5IGVpdGhlciB0aGUgc2VydmljZSBvciBhIGRpc3RyaWJ1dGlvbiBvbiB0aGUgbGF5ZXIgaXRzZWxmLlwiKTtcblxuICAgIHJldHVybiBuZXcgV01UUyggdXJsLCBvcHRpb25zICk7XG5cbn1cblxuXG5pZigod2luZG93IGFzIGFueSkuTCkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVRTID0gV01UUztcbiAgICBMLnRpbGVMYXllci53bXRzID0gd210cztcbn1cblxuZXhwb3J0IHtcbiAgICBXTVRTIGFzIGRlZmF1bHQsXG4gICAgV01UUyxcbiAgICB3bXRzXG59O1xuIl19