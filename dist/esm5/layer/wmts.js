/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { TileLayer, Browser, Point, Util, LatLng } from 'leaflet';
import { Config } from '@geoplatform/client';
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
    var supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd210cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFDRSxTQUFTLEVBQWEsT0FBTyxFQUNsQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFDdEIsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUs3QyxJQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzs7Ozs7O0FBT3JDLGtCQUFrQixHQUFHLEVBQUUsSUFBSTtJQUMxQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7O1FBQzdDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDdkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0NBQ0g7QUFNRCxJQUFBO0lBQW1CLGdDQUFTO0lBU3hCLGNBQVksR0FBWSxFQUFFLE9BQWM7ZUFDcEMsa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQztLQUN0Qjs7Ozs7O0lBRUQseUJBQVU7Ozs7O0lBQVYsVUFBWSxHQUFHLEVBQUUsT0FBTzs7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7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QUcsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN0QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7U0FDSixDQUFDLENBQUM7S0FDTjtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUM1QyxzREFBc0QsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsSUFBRyxDQUFDLEdBQUc7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3pFLCtGQUErRixDQUFDLENBQUM7SUFFckcsT0FBTyxJQUFJLElBQUksQ0FBRSxHQUFHLEVBQUUsT0FBTyxDQUFFLENBQUM7Q0FFbkM7QUFHRCxJQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRTs7SUFDbEIsSUFBTSxHQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBCcm93c2VyLFxuICAgIFBvaW50LCBVdGlsLCBMYXRMbmdcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuXG5jb25zdCBwYXJhbVJlID0gL1xceyAqKFtcXHdfLV0rKSAqXFx9L2c7XG5cbi8vIEBmdW5jdGlvbiB0ZW1wbGF0ZShzdHI6IFN0cmluZywgZGF0YTogT2JqZWN0KTogU3RyaW5nXG4vLyBTaW1wbGUgdGVtcGxhdGluZyBmYWNpbGl0eSwgYWNjZXB0cyBhIHRlbXBsYXRlIHN0cmluZyBvZiB0aGUgZm9ybSBgJ0hlbGxvIHthfSwge2J9J2Bcbi8vIGFuZCBhIGRhdGEgb2JqZWN0IGxpa2UgYHthOiAnZm9vJywgYjogJ2Jhcid9YCwgcmV0dXJucyBldmFsdWF0ZWQgc3RyaW5nXG4vLyBgKCdIZWxsbyBmb28sIGJhcicpYC4gWW91IGNhbiBhbHNvIHNwZWNpZnkgZnVuY3Rpb25zIGluc3RlYWQgb2Ygc3RyaW5ncyBmb3Jcbi8vIGRhdGEgdmFsdWVzIOKAlCB0aGV5IHdpbGwgYmUgZXZhbHVhdGVkIHBhc3NpbmcgYGRhdGFgIGFzIGFuIGFyZ3VtZW50LlxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyLCBkYXRhKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZShwYXJhbVJlLCBmdW5jdGlvbiAoc3RyLCBrZXkpIHtcblx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGFba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIFx0dGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZSBwcm92aWRlZCBmb3IgdmFyaWFibGUgJyArIHN0cik7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHZhbHVlID0gdmFsdWUoZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZTtcblx0fSk7XG59XG5cblxuLypcbiAqIGluc3BpcmVkIGJ5IGFuZCB1c2VzIGNvZGUgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbXlsZW4vbGVhZmxldC5UaWxlTGF5ZXIuV01UU1xuICovXG5jbGFzcyBXTVRTIGV4dGVuZHMgVGlsZUxheWVyIHtcblxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NyczogYW55O1xuICAgIHByaXZhdGUgbWF0cml4SWRzIDogYW55O1xuICAgIHByaXZhdGUgd210c1BhcmFtcyA6IGFueTtcblxuICAgIHByaXZhdGUgZGVmYXVsdFdtdHNQYXJhbXM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0aW9ucyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplICh1cmwsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgT2JqZWN0KVxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuZGVmYXVsdFdtdHNQYXJhbXMgPSB7XG4gICAgICAgICAgICBzZXJ2aWNlOiAnV01UUycsXG4gICAgICAgICAgICByZXF1ZXN0OiAnR2V0VGlsZScsXG4gICAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgICAgICAgbGF5ZXJzOiAnJyxcbiAgICAgICAgICAgIHN0eWxlczogJycsXG4gICAgICAgICAgICB0aWxlTWF0cml4U2V0OiAnJyxcbiAgICAgICAgICAgIGZvcm1hdDogJ2ltYWdlL3BuZydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHdtdHNQYXJhbXMgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0V210c1BhcmFtcyk7XG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplICogMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdtdHNQYXJhbXMud2lkdGggPSB3bXRzUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgLy8gYWxsIGtleXMgdGhhdCBhcmUgbm90IFRpbGVMYXllciBvcHRpb25zIGdvIHRvIFdNVFMgcGFyYW1zXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpIT1cIm1hdHJpeElkc1wiKSB7XG4gICAgICAgICAgICAgICAgd210c1BhcmFtc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53bXRzUGFyYW1zID0gd210c1BhcmFtcztcbiAgICAgICAgdGhpcy5tYXRyaXhJZHMgPSBvcHRpb25zLm1hdHJpeElkc3x8dGhpcy5nZXREZWZhdWx0TWF0cml4KCk7XG4gICAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBvbkFkZCAoIG1hcDogTWFwICkgOiB0aGlzIHtcbiAgICAgICAgdGhpcy5fY3JzID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNycyB8fCAobWFwLm9wdGlvbnMgYXMgYW55KS5jcnM7XG4gICAgICAgIHJldHVybiBzdXBlci5vbkFkZChtYXApO1xuICAgIH1cblxuICAgIGdldFRpbGVVcmwgKGNvb3JkcyA6IFBvaW50KSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcbiAgICAgICAgdmFyIHRpbGVTaXplID0gdGhpcy5vcHRpb25zLnRpbGVTaXplIGFzIG51bWJlcjtcbiAgICAgICAgdmFyIG53UG9pbnQgPSBjb29yZHMubXVsdGlwbHlCeSh0aWxlU2l6ZSk7XG4gICAgICAgIG53UG9pbnQueCs9MTtcbiAgICAgICAgbndQb2ludC55LT0xO1xuICAgICAgICB2YXIgc2VQb2ludCA9IG53UG9pbnQuYWRkKCBuZXcgUG9pbnQodGlsZVNpemUsIHRpbGVTaXplKSApO1xuICAgICAgICB2YXIgem9vbSA9IHRoaXMuX3RpbGVab29tO1xuICAgICAgICB2YXIgbncgPSB0aGlzLl9jcnMucHJvamVjdCh0aGlzLl9tYXAudW5wcm9qZWN0KG53UG9pbnQsIHpvb20pKTtcbiAgICAgICAgdmFyIHNlID0gdGhpcy5fY3JzLnByb2plY3QodGhpcy5fbWFwLnVucHJvamVjdChzZVBvaW50LCB6b29tKSk7XG4gICAgICAgIHZhciB0aWxld2lkdGggPSBzZS54LW53Lng7XG4gICAgICAgIC8vem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XG4gICAgICAgIHZhciBpZGVudCA9IHRoaXMubWF0cml4SWRzW3pvb21dLmlkZW50aWZpZXI7XG4gICAgICAgIHZhciB0aWxlTWF0cml4ID0gdGhpcy53bXRzUGFyYW1zLnRpbGVNYXRyaXhTZXQgKyBcIjpcIiArIGlkZW50O1xuICAgICAgICB2YXIgWDAgPSB0aGlzLm1hdHJpeElkc1t6b29tXS50b3BMZWZ0Q29ybmVyLmxuZztcbiAgICAgICAgdmFyIFkwID0gdGhpcy5tYXRyaXhJZHNbem9vbV0udG9wTGVmdENvcm5lci5sYXQ7XG4gICAgICAgIHZhciB0aWxlY29sPU1hdGguZmxvb3IoKG53LngtWDApL3RpbGV3aWR0aCk7XG4gICAgICAgIHZhciB0aWxlcm93PS1NYXRoLmZsb29yKChudy55LVkwKS90aWxld2lkdGgpO1xuXG5cbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX3VybDtcbiAgICAgICAgbGV0IGlzVGlsZU1hdHJpeFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZU1hdHJpeH0nKTtcbiAgICAgICAgbGV0IGlzVGlsZVJvd1RlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZVJvd30nKTtcbiAgICAgICAgbGV0IGlzVGlsZUNvbFRlbXBsYXRlZCA9IHVybC5pbmRleE9mKCd7VGlsZUNvbH0nKTtcblxuICAgICAgICBsZXQgbyA9IE9iamVjdC5hc3NpZ24oe3M6IHRoaXMuX2dldFN1YmRvbWFpbihjb29yZHMpfSwgdGhpcy53bXRzUGFyYW1zKTtcbiAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPjApIG8uVGlsZU1hdHJpeCA9IGlkZW50O1xuICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ+MCkgby5UaWxlUm93ID0gdGlsZXJvdztcbiAgICAgICAgaWYoaXNUaWxlQ29sVGVtcGxhdGVkPjApIG8uVGlsZUNvbCA9IHRpbGVjb2w7XG4gICAgICAgIGZvcihsZXQgayBpbiBvKSB7XG4gICAgICAgICAgICBvW2sudG9Mb3dlckNhc2UoKV0gPSBvW2tdO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVybCA9IFV0aWwudGVtcGxhdGUodXJsLnRvTG93ZXJDYXNlKCksIG8pO1xuICAgICAgICB1cmwgPSB0ZW1wbGF0ZSh1cmwsIG8pO1xuXG4gICAgICAgIGxldCBxc2kgPSB1cmwuaW5kZXhPZihcIj9cIik7XG4gICAgICAgIGlmKHFzaTwwIHx8IChpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ8cXNpICYmIGlzVGlsZVJvd1RlbXBsYXRlZDxxc2kgfHwgaXNUaWxlQ29sVGVtcGxhdGVkPHFzaSkpIHtcbiAgICAgICAgICAgIC8vaWYgdGhlIFRNLFRSLFRDIHZhcmlhYmxlcyBhcmUgdGVtcGxhdGVkIGJ1dCBub3QgYXMgcXVlcnlzdHJpbmcgcGFyYW1ldGVyc1xuICAgICAgICAgICAgLy8gKGllLCBubyAnPycgcHJlc2VudCBvciB0aG9zZSBwYXJhbXMgYXJlIGJlZm9yZSB0aGUgJz8nKSxcbiAgICAgICAgICAgIC8vIHRoZW4gdGhlIFVSTCBtdXN0IG5vdCBiZSBPR0MgV01UUywgc28gbm8gbmVlZCBmb3IgV01UUyBwYXJhbWV0ZXJzXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCA9IHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcodGhpcy53bXRzUGFyYW1zLCB1cmwpO1xuICAgICAgICAgICAgaWYoaXNUaWxlTWF0cml4VGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVNYXRyaXg9XCIgKyBpZGVudDsgLy90aWxlTWF0cml4U2V0XG4gICAgICAgICAgICBpZihpc1RpbGVSb3dUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZVJvdz1cIiArIHRpbGVyb3c7XG4gICAgICAgICAgICBpZihpc1RpbGVDb2xUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZUNvbD1cIiArIHRpbGVjb2w7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLndtdHNQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdE1hdHJpeCAgKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhlIG1hdHJpeDM4NTcgcmVwcmVzZW50cyB0aGUgcHJvamVjdGlvblxuICAgICAgICAgKiBmb3IgaW4gdGhlIElHTiBXTVRTIGZvciB0aGUgZ29vZ2xlIGNvb3JkaW5hdGVzLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG1hdHJpeElkczM4NTcgPSBuZXcgQXJyYXkoMjIpO1xuICAgICAgICBmb3IgKHZhciBpPSAwOyBpPDIyOyBpKyspIHtcbiAgICAgICAgICAgIG1hdHJpeElkczM4NTdbaV09IHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyICAgIDogXCJcIiArIGksXG4gICAgICAgICAgICAgICAgdG9wTGVmdENvcm5lciA6IG5ldyBMYXRMbmcoMjAwMzc1MDguMzQyOCwtMjAwMzc1MDguMzQyOClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdHJpeElkczM4NTc7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd210cyhsYXllcikge1xuXG4gICAgbGV0IHVybCA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/IGxheWVyLnNlcnZpY2VzWzBdLmhyZWYgOiBudWxsO1xuXG4gICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBsYXllcjogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZTogJ2RlZmF1bHQnLFxuICAgICAgICB0aWxlTWF0cml4U2V0OiBcImRlZmF1bHRcIixcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRpb25zIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBkaXN0cm8gPSAobGF5ZXIuZGlzdHJpYnV0aW9ucyB8fCBbXSkuZmluZCggZGlzdCA9PiB7XG4gICAgICAgIC8vZW5zdXJlIGRpc3QgaXNuJ3QgJ251bGwnXG4gICAgICAgIHJldHVybiBkaXN0ICYmIGRpc3QuaHJlZiAmJiAoIGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL3BuZycgfHwgZGlzdC5tZWRpYVR5cGU9PT0naW1hZ2UvanBlZycgKTtcbiAgICB9KTtcbiAgICBpZihkaXN0cm8pIHtcbiAgICAgICAgdXJsID0gZGlzdHJvLmhyZWY7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZGlzdHJvLm1lZGlhVHlwZTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gZGlzdHJvLnBhcmFtZXRlcnMgfHwgW107XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKCBwYXJhbSA9PiB7XG5cbiAgICAgICAgICAgIC8vaWdub3JlIHdtdHMgc3BlY2lmaWMgcGFyYW1ldGVycywgV01UUyBsYXllciB3aWxsIHBvcHVsYXRlIHRob3NlIHZhbHVlc1xuICAgICAgICAgICAgLy8gYmFzZWQgdXBvbiBtYXAgc3RhdGUuXG4gICAgICAgICAgICBsZXQgcGxjID0gcGFyYW0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoXCJ0aWxlbWF0cml4XCIgPT09IHBsYyB8fCBcInRpbGVyb3dcIiA9PT0gcGxjIHx8IFwidGlsZWNvbFwiID09PSBwbGMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvL2ZvciBhbGwgb3RoZXIgcGFyYW1ldGVycywgdHJ5IHRvIGZpbGwgaW4gZGVmYXVsdCBvciBpbml0aWFsIHZhbHVlc1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IHBhcmFtLnZhbHVlcyAmJiBwYXJhbS52YWx1ZXMubGVuZ3RoICYmIHBhcmFtLnZhbHVlc1swXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgneycgKyBwYXJhbS5uYW1lICsgJ30nLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldUTVMgTGF5ZXIgLSBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgICAgIFwiIGhhcyBubyBkaXN0cmlidXRpb24ocykgdXNhYmxlIHRvIG1ha2UgV01UUyByZXF1ZXN0c1wiKTtcbiAgICB9XG5cbiAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIFdNVFMgVVJMIGZvciBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgXCIuIFBsZWFzZSBtYWtlIHN1cmUgaXQgaXMgZGVmaW5lZCBieSBlaXRoZXIgdGhlIHNlcnZpY2Ugb3IgYSBkaXN0cmlidXRpb24gb24gdGhlIGxheWVyIGl0c2VsZi5cIik7XG5cbiAgICByZXR1cm4gbmV3IFdNVFMoIHVybCwgb3B0aW9ucyApO1xuXG59XG5cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01UUyA9IFdNVFM7XG4gICAgTC50aWxlTGF5ZXIud210cyA9IHdtdHM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01UUyBhcyBkZWZhdWx0LFxuICAgIFdNVFMsXG4gICAgd210c1xufTtcbiJdfQ==