/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { TileLayer, Browser, Point, Util, LatLng } from 'leaflet';
import { Config } from 'geoplatform.client';
/** @type {?} */
const paramRe = /\{ *([\w_-]+) *\}/g;
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
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
        return super.onAdd(map);
    }
    /**
     * @param {?} coords
     * @return {?}
     */
    getTileUrl(coords) {
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
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    setParams(params, noRedraw) {
        Util.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }
    /**
     * @return {?}
     */
    getDefaultMatrix() {
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
    let url = layer.services && layer.services.length ? layer.services[0].href : null;
    /** @type {?} */
    let options = {
        layer: layer.layerName,
        style: 'default',
        tileMatrixSet: "default",
        format: "image/png"
    };
    if (Config.leafletPane)
        (/** @type {?} */ (options)).pane = Config.leafletPane;
    /** @type {?} */
    let distro = (layer.distributions || []).find(dist => {
        //ensure dist isn't 'null'
        return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
    });
    if (distro) {
        url = distro.href;
        options.format = distro.mediaType;
        /** @type {?} */
        let params = distro.parameters || [];
        params.forEach(param => {
            /** @type {?} */
            let plc = param.name.toLowerCase();
            if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc)
                return;
            /** @type {?} */
            let value = param.defaultValue || param.values && param.values.length && param.values[0];
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
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.WMTS = WMTS;
    L.tileLayer.wmts = wmts;
}
export { WMTS as default, WMTS, wmts };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd210cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUd0QixPQUFPLEVBQ0UsU0FBUyxFQUFhLE9BQU8sRUFDbEMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQ3RCLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFLNUMsTUFBTSxPQUFPLEdBQUcsb0JBQW9CLENBQUM7Ozs7OztBQU9yQyxrQkFBa0IsR0FBRyxFQUFFLElBQUk7SUFDMUIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHOztRQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNiLENBQUMsQ0FBQztDQUNIO0FBTUQsVUFBVyxTQUFRLFNBQVM7Ozs7O0lBU3hCLFlBQVksR0FBWSxFQUFFLE9BQWM7UUFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qjs7Ozs7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QyxzREFBc0QsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsSUFBRyxDQUFDLEdBQUc7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3pFLCtGQUErRixDQUFDLENBQUM7SUFFckcsT0FBTyxJQUFJLElBQUksQ0FBRSxHQUFHLEVBQUUsT0FBTyxDQUFFLENBQUM7Q0FFbkM7QUFHRCxJQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRTs7SUFDbEIsTUFBTSxDQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBCcm93c2VyLFxuICAgIFBvaW50LCBVdGlsLCBMYXRMbmdcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cblxuXG5cbmNvbnN0IHBhcmFtUmUgPSAvXFx7ICooW1xcd18tXSspICpcXH0vZztcblxuLy8gQGZ1bmN0aW9uIHRlbXBsYXRlKHN0cjogU3RyaW5nLCBkYXRhOiBPYmplY3QpOiBTdHJpbmdcbi8vIFNpbXBsZSB0ZW1wbGF0aW5nIGZhY2lsaXR5LCBhY2NlcHRzIGEgdGVtcGxhdGUgc3RyaW5nIG9mIHRoZSBmb3JtIGAnSGVsbG8ge2F9LCB7Yn0nYFxuLy8gYW5kIGEgZGF0YSBvYmplY3QgbGlrZSBge2E6ICdmb28nLCBiOiAnYmFyJ31gLCByZXR1cm5zIGV2YWx1YXRlZCBzdHJpbmdcbi8vIGAoJ0hlbGxvIGZvbywgYmFyJylgLiBZb3UgY2FuIGFsc28gc3BlY2lmeSBmdW5jdGlvbnMgaW5zdGVhZCBvZiBzdHJpbmdzIGZvclxuLy8gZGF0YSB2YWx1ZXMg4oCUIHRoZXkgd2lsbCBiZSBldmFsdWF0ZWQgcGFzc2luZyBgZGF0YWAgYXMgYW4gYXJndW1lbnQuXG5mdW5jdGlvbiB0ZW1wbGF0ZShzdHIsIGRhdGEpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKHBhcmFtUmUsIGZ1bmN0aW9uIChzdHIsIGtleSkge1xuXHRcdHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YVtrZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgXHR0aHJvdyBuZXcgRXJyb3IoJ05vIHZhbHVlIHByb3ZpZGVkIGZvciB2YXJpYWJsZSAnICsgc3RyKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFsdWUgPSB2YWx1ZShkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9KTtcbn1cblxuXG4vKlxuICogaW5zcGlyZWQgYnkgYW5kIHVzZXMgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9teWxlbi9sZWFmbGV0LlRpbGVMYXllci5XTVRTXG4gKi9cbmNsYXNzIFdNVFMgZXh0ZW5kcyBUaWxlTGF5ZXIge1xuXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBtYXRyaXhJZHMgOiBhbnk7XG4gICAgcHJpdmF0ZSB3bXRzUGFyYW1zIDogYW55O1xuXG4gICAgcHJpdmF0ZSBkZWZhdWx0V210c1BhcmFtczogYW55O1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRpb25zID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKHVybCwgb3B0aW9ucykgeyAvLyAoU3RyaW5nLCBPYmplY3QpXG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcbiAgICAgICAgdGhpcy5kZWZhdWx0V210c1BhcmFtcyA9IHtcbiAgICAgICAgICAgIHNlcnZpY2U6ICdXTVRTJyxcbiAgICAgICAgICAgIHJlcXVlc3Q6ICdHZXRUaWxlJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjAuMCcsXG4gICAgICAgICAgICBsYXllcnM6ICcnLFxuICAgICAgICAgICAgc3R5bGVzOiAnJyxcbiAgICAgICAgICAgIHRpbGVNYXRyaXhTZXQ6ICcnLFxuICAgICAgICAgICAgZm9ybWF0OiAnaW1hZ2UvcG5nJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgd210c1BhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRXbXRzUGFyYW1zKTtcbiAgICAgICAgdmFyIHRpbGVTaXplID0gb3B0aW9ucy50aWxlU2l6ZSB8fCB0aGlzLm9wdGlvbnMudGlsZVNpemU7XG4gICAgICAgIGlmIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBCcm93c2VyLnJldGluYSkge1xuICAgICAgICAgICAgd210c1BhcmFtcy53aWR0aCA9IHdtdHNQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd210c1BhcmFtcy53aWR0aCA9IHdtdHNQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01UUyBwYXJhbXNcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGkpICYmIGkhPVwibWF0cml4SWRzXCIpIHtcbiAgICAgICAgICAgICAgICB3bXRzUGFyYW1zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndtdHNQYXJhbXMgPSB3bXRzUGFyYW1zO1xuICAgICAgICB0aGlzLm1hdHJpeElkcyA9IG9wdGlvbnMubWF0cml4SWRzfHx0aGlzLmdldERlZmF1bHRNYXRyaXgoKTtcbiAgICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG9uQWRkICggbWFwOiBNYXAgKSA6IHRoaXMge1xuICAgICAgICB0aGlzLl9jcnMgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY3JzIHx8IChtYXAub3B0aW9ucyBhcyBhbnkpLmNycztcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uQWRkKG1hcCk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZVVybCAoY29vcmRzIDogUG9pbnQpIDogc3RyaW5nIHsgLy8gKFBvaW50LCBOdW1iZXIpIC0+IFN0cmluZ1xuICAgICAgICB2YXIgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemUgYXMgbnVtYmVyO1xuICAgICAgICB2YXIgbndQb2ludCA9IGNvb3Jkcy5tdWx0aXBseUJ5KHRpbGVTaXplKTtcbiAgICAgICAgbndQb2ludC54Kz0xO1xuICAgICAgICBud1BvaW50LnktPTE7XG4gICAgICAgIHZhciBzZVBvaW50ID0gbndQb2ludC5hZGQoIG5ldyBQb2ludCh0aWxlU2l6ZSwgdGlsZVNpemUpICk7XG4gICAgICAgIHZhciB6b29tID0gdGhpcy5fdGlsZVpvb207XG4gICAgICAgIHZhciBudyA9IHRoaXMuX2Nycy5wcm9qZWN0KHRoaXMuX21hcC51bnByb2plY3QobndQb2ludCwgem9vbSkpO1xuICAgICAgICB2YXIgc2UgPSB0aGlzLl9jcnMucHJvamVjdCh0aGlzLl9tYXAudW5wcm9qZWN0KHNlUG9pbnQsIHpvb20pKTtcbiAgICAgICAgdmFyIHRpbGV3aWR0aCA9IHNlLngtbncueDtcbiAgICAgICAgLy96b29tID0gdGhpcy5fbWFwLmdldFpvb20oKTtcbiAgICAgICAgdmFyIGlkZW50ID0gdGhpcy5tYXRyaXhJZHNbem9vbV0uaWRlbnRpZmllcjtcbiAgICAgICAgdmFyIHRpbGVNYXRyaXggPSB0aGlzLndtdHNQYXJhbXMudGlsZU1hdHJpeFNldCArIFwiOlwiICsgaWRlbnQ7XG4gICAgICAgIHZhciBYMCA9IHRoaXMubWF0cml4SWRzW3pvb21dLnRvcExlZnRDb3JuZXIubG5nO1xuICAgICAgICB2YXIgWTAgPSB0aGlzLm1hdHJpeElkc1t6b29tXS50b3BMZWZ0Q29ybmVyLmxhdDtcbiAgICAgICAgdmFyIHRpbGVjb2w9TWF0aC5mbG9vcigobncueC1YMCkvdGlsZXdpZHRoKTtcbiAgICAgICAgdmFyIHRpbGVyb3c9LU1hdGguZmxvb3IoKG53LnktWTApL3RpbGV3aWR0aCk7XG5cblxuICAgICAgICBsZXQgdXJsID0gdGhpcy5fdXJsO1xuICAgICAgICBsZXQgaXNUaWxlTWF0cml4VGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlTWF0cml4fScpO1xuICAgICAgICBsZXQgaXNUaWxlUm93VGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlUm93fScpO1xuICAgICAgICBsZXQgaXNUaWxlQ29sVGVtcGxhdGVkID0gdXJsLmluZGV4T2YoJ3tUaWxlQ29sfScpO1xuXG4gICAgICAgIGxldCBvID0gT2JqZWN0LmFzc2lnbih7czogdGhpcy5fZ2V0U3ViZG9tYWluKGNvb3Jkcyl9LCB0aGlzLndtdHNQYXJhbXMpO1xuICAgICAgICBpZihpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ+MCkgby5UaWxlTWF0cml4ID0gaWRlbnQ7XG4gICAgICAgIGlmKGlzVGlsZVJvd1RlbXBsYXRlZD4wKSBvLlRpbGVSb3cgPSB0aWxlcm93O1xuICAgICAgICBpZihpc1RpbGVDb2xUZW1wbGF0ZWQ+MCkgby5UaWxlQ29sID0gdGlsZWNvbDtcbiAgICAgICAgZm9yKGxldCBrIGluIG8pIHtcbiAgICAgICAgICAgIG9bay50b0xvd2VyQ2FzZSgpXSA9IG9ba107XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXJsID0gVXRpbC50ZW1wbGF0ZSh1cmwudG9Mb3dlckNhc2UoKSwgbyk7XG4gICAgICAgIHVybCA9IHRlbXBsYXRlKHVybCwgbyk7XG5cbiAgICAgICAgbGV0IHFzaSA9IHVybC5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgaWYocXNpPDAgfHwgKGlzVGlsZU1hdHJpeFRlbXBsYXRlZDxxc2kgJiYgaXNUaWxlUm93VGVtcGxhdGVkPHFzaSB8fCBpc1RpbGVDb2xUZW1wbGF0ZWQ8cXNpKSkge1xuICAgICAgICAgICAgLy9pZiB0aGUgVE0sVFIsVEMgdmFyaWFibGVzIGFyZSB0ZW1wbGF0ZWQgYnV0IG5vdCBhcyBxdWVyeXN0cmluZyBwYXJhbWV0ZXJzXG4gICAgICAgICAgICAvLyAoaWUsIG5vICc/JyBwcmVzZW50IG9yIHRob3NlIHBhcmFtcyBhcmUgYmVmb3JlIHRoZSAnPycpLFxuICAgICAgICAgICAgLy8gdGhlbiB0aGUgVVJMIG11c3Qgbm90IGJlIE9HQyBXTVRTLCBzbyBubyBuZWVkIGZvciBXTVRTIHBhcmFtZXRlcnNcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsID0gdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyh0aGlzLndtdHNQYXJhbXMsIHVybCk7XG4gICAgICAgICAgICBpZihpc1RpbGVNYXRyaXhUZW1wbGF0ZWQ8MClcbiAgICAgICAgICAgICAgICB1cmwgKz0gXCImVGlsZU1hdHJpeD1cIiArIGlkZW50OyAvL3RpbGVNYXRyaXhTZXRcbiAgICAgICAgICAgIGlmKGlzVGlsZVJvd1RlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlUm93PVwiICsgdGlsZXJvdztcbiAgICAgICAgICAgIGlmKGlzVGlsZUNvbFRlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlQ29sPVwiICsgdGlsZWNvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1zIChwYXJhbXMsIG5vUmVkcmF3KSB7XG4gICAgICAgIFV0aWwuZXh0ZW5kKHRoaXMud210c1BhcmFtcywgcGFyYW1zKTtcbiAgICAgICAgaWYgKCFub1JlZHJhdykge1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0TWF0cml4ICAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgbWF0cml4Mzg1NyByZXByZXNlbnRzIHRoZSBwcm9qZWN0aW9uXG4gICAgICAgICAqIGZvciBpbiB0aGUgSUdOIFdNVFMgZm9yIHRoZSBnb29nbGUgY29vcmRpbmF0ZXMuXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbWF0cml4SWRzMzg1NyA9IG5ldyBBcnJheSgyMik7XG4gICAgICAgIGZvciAodmFyIGk9IDA7IGk8MjI7IGkrKykge1xuICAgICAgICAgICAgbWF0cml4SWRzMzg1N1tpXT0ge1xuICAgICAgICAgICAgICAgIGlkZW50aWZpZXIgICAgOiBcIlwiICsgaSxcbiAgICAgICAgICAgICAgICB0b3BMZWZ0Q29ybmVyIDogbmV3IExhdExuZygyMDAzNzUwOC4zNDI4LC0yMDAzNzUwOC4zNDI4KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0cml4SWRzMzg1NztcbiAgICB9XG5cbiAgICBfZ2V0U3ViZG9tYWluICh0aWxlUG9pbnQgOiBQb2ludCkgOiBzdHJpbmcge1xuXHRcdHZhciBpbmRleCA9IE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGhpcy5vcHRpb25zLnN1YmRvbWFpbnMubGVuZ3RoO1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuc3ViZG9tYWluc1tpbmRleF07XG5cdH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXRzKGxheWVyKSB7XG5cbiAgICBsZXQgdXJsID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID8gbGF5ZXIuc2VydmljZXNbMF0uaHJlZiA6IG51bGw7XG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbGF5ZXI6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgc3R5bGU6ICdkZWZhdWx0JyxcbiAgICAgICAgdGlsZU1hdHJpeFNldDogXCJkZWZhdWx0XCIsXG4gICAgICAgIGZvcm1hdDogXCJpbWFnZS9wbmdcIlxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAob3B0aW9ucyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgZGlzdHJvID0gKGxheWVyLmRpc3RyaWJ1dGlvbnMgfHwgW10pLmZpbmQoIGRpc3QgPT4ge1xuICAgICAgICAvL2Vuc3VyZSBkaXN0IGlzbid0ICdudWxsJ1xuICAgICAgICByZXR1cm4gZGlzdCAmJiBkaXN0LmhyZWYgJiYgKCBkaXN0Lm1lZGlhVHlwZT09PSdpbWFnZS9wbmcnIHx8IGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL2pwZWcnICk7XG4gICAgfSk7XG4gICAgaWYoZGlzdHJvKSB7XG4gICAgICAgIHVybCA9IGRpc3Ryby5ocmVmO1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGRpc3Ryby5tZWRpYVR5cGU7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IGRpc3Ryby5wYXJhbWV0ZXJzIHx8IFtdO1xuICAgICAgICBwYXJhbXMuZm9yRWFjaCggcGFyYW0gPT4ge1xuXG4gICAgICAgICAgICAvL2lnbm9yZSB3bXRzIHNwZWNpZmljIHBhcmFtZXRlcnMsIFdNVFMgbGF5ZXIgd2lsbCBwb3B1bGF0ZSB0aG9zZSB2YWx1ZXNcbiAgICAgICAgICAgIC8vIGJhc2VkIHVwb24gbWFwIHN0YXRlLlxuICAgICAgICAgICAgbGV0IHBsYyA9IHBhcmFtLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKFwidGlsZW1hdHJpeFwiID09PSBwbGMgfHwgXCJ0aWxlcm93XCIgPT09IHBsYyB8fCBcInRpbGVjb2xcIiA9PT0gcGxjKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgLy9mb3IgYWxsIG90aGVyIHBhcmFtZXRlcnMsIHRyeSB0byBmaWxsIGluIGRlZmF1bHQgb3IgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBwYXJhbS52YWx1ZXMgJiYgcGFyYW0udmFsdWVzLmxlbmd0aCAmJiBwYXJhbS52YWx1ZXNbMF07XG4gICAgICAgICAgICBpZih2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJ3snICsgcGFyYW0ubmFtZSArICd9JywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXVE1TIExheWVyIC0gbGF5ZXIgXCIgKyBsYXllci5pZCArXG4gICAgICAgICAgICBcIiBoYXMgbm8gZGlzdHJpYnV0aW9uKHMpIHVzYWJsZSB0byBtYWtlIFdNVFMgcmVxdWVzdHNcIik7XG4gICAgfVxuXG4gICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGRldGVybWluZSBXTVRTIFVSTCBmb3IgbGF5ZXIgXCIgKyBsYXllci5pZCArXG4gICAgICAgIFwiLiBQbGVhc2UgbWFrZSBzdXJlIGl0IGlzIGRlZmluZWQgYnkgZWl0aGVyIHRoZSBzZXJ2aWNlIG9yIGEgZGlzdHJpYnV0aW9uIG9uIHRoZSBsYXllciBpdHNlbGYuXCIpO1xuXG4gICAgcmV0dXJuIG5ldyBXTVRTKCB1cmwsIG9wdGlvbnMgKTtcblxufVxuXG5cbmlmKCh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNVFMgPSBXTVRTO1xuICAgIEwudGlsZUxheWVyLndtdHMgPSB3bXRzO1xufVxuXG5leHBvcnQge1xuICAgIFdNVFMgYXMgZGVmYXVsdCxcbiAgICBXTVRTLFxuICAgIHdtdHNcbn07XG4iXX0=