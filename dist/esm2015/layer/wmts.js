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
            /** @type {?} */
            let value = param.defaultValue || param.values && param.values.length && param.values[0];
            //ignore parameters without values and default values
            if (value === null && value === undefined)
                return;
            //ignore wmts specific parameters, WMTS layer will populate those values
            // based upon map state.
            /** @type {?} */
            let plc = param.name.toLowerCase();
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
    const L = ((/** @type {?} */ (window))).L;
    L.TileLayer.WMTS = WMTS;
    L.tileLayer.wmts = wmts;
}
export { WMTS as default, WMTS, wmts };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd210cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyxFQUNFLFNBQVMsRUFBYSxPQUFPLEVBQ2xDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUN0QixNQUFNLFNBQVMsQ0FBQztBQUVqQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O01BS3ZDLE9BQU8sR0FBRyxvQkFBb0I7Ozs7Ozs7Ozs7O0FBT3BDLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQzFCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7OztJQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7O1lBQ3pDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2YsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUMsRUFBQyxDQUFDO0FBQ0osQ0FBQzs7OztBQU1ELE1BQU0sSUFBSyxTQUFRLFNBQVM7Ozs7O0lBU3hCLFlBQVksR0FBWSxFQUFFLE9BQWM7UUFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUUsR0FBRyxFQUFFLE9BQU87UUFDcEIsSUFBSSxDQUFDLElB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QUssR0FBRyxJQUFJLFNBQVMsS0FBSyxHQUFHO2dCQUFFLE9BQU87aUJBQ3JFLElBQUcsZUFBZSxLQUFLLEdBQUc7Z0JBQUUsT0FBTyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7aUJBQzFELEVBQUUsb0VBQW9FO2dCQUN2RSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDcEQ7UUFDTCxDQUFDLEVBQUMsQ0FBQztLQUNOO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQzVDLHNEQUFzRCxDQUFDLENBQUM7S0FDL0Q7SUFFRCxJQUFHLENBQUMsR0FBRztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDekUsK0ZBQStGLENBQUMsQ0FBQztJQUVyRyxPQUFPLElBQUksSUFBSSxDQUFFLEdBQUcsRUFBRSxPQUFPLENBQUUsQ0FBQztBQUVwQyxDQUFDO0FBR0QsSUFBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFFOztVQUNaLENBQUMsR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzNCO0FBRUQsT0FBTyxFQUNILElBQUksSUFBSSxPQUFPLEVBQ2YsSUFBSSxFQUNKLElBQUksRUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7XG4gICAgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgQnJvd3NlcixcbiAgICBQb2ludCwgVXRpbCwgTGF0TG5nXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5cblxuY29uc3QgcGFyYW1SZSA9IC9cXHsgKihbXFx3Xy1dKykgKlxcfS9nO1xuXG4vLyBAZnVuY3Rpb24gdGVtcGxhdGUoc3RyOiBTdHJpbmcsIGRhdGE6IE9iamVjdCk6IFN0cmluZ1xuLy8gU2ltcGxlIHRlbXBsYXRpbmcgZmFjaWxpdHksIGFjY2VwdHMgYSB0ZW1wbGF0ZSBzdHJpbmcgb2YgdGhlIGZvcm0gYCdIZWxsbyB7YX0sIHtifSdgXG4vLyBhbmQgYSBkYXRhIG9iamVjdCBsaWtlIGB7YTogJ2ZvbycsIGI6ICdiYXInfWAsIHJldHVybnMgZXZhbHVhdGVkIHN0cmluZ1xuLy8gYCgnSGVsbG8gZm9vLCBiYXInKWAuIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGZ1bmN0aW9ucyBpbnN0ZWFkIG9mIHN0cmluZ3MgZm9yXG4vLyBkYXRhIHZhbHVlcyDigJQgdGhleSB3aWxsIGJlIGV2YWx1YXRlZCBwYXNzaW5nIGBkYXRhYCBhcyBhbiBhcmd1bWVudC5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0ciwgZGF0YSkge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UocGFyYW1SZSwgZnVuY3Rpb24gKHN0ciwga2V5KSB7XG5cdFx0dmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2tleS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBcdHRocm93IG5ldyBFcnJvcignTm8gdmFsdWUgcHJvdmlkZWQgZm9yIHZhcmlhYmxlICcgKyBzdHIpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlKGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0pO1xufVxuXG5cbi8qXG4gKiBpbnNwaXJlZCBieSBhbmQgdXNlcyBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL215bGVuL2xlYWZsZXQuVGlsZUxheWVyLldNVFNcbiAqL1xuY2xhc3MgV01UUyBleHRlbmRzIFRpbGVMYXllciB7XG5cbiAgICBwcml2YXRlIF91cmw6IHN0cmluZztcbiAgICBwcml2YXRlIF9jcnM6IGFueTtcbiAgICBwcml2YXRlIG1hdHJpeElkcyA6IGFueTtcbiAgICBwcml2YXRlIHdtdHNQYXJhbXMgOiBhbnk7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRXbXRzUGFyYW1zOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAodXJsLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIE9iamVjdClcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgICB0aGlzLmRlZmF1bHRXbXRzUGFyYW1zID0ge1xuICAgICAgICAgICAgc2VydmljZTogJ1dNVFMnLFxuICAgICAgICAgICAgcmVxdWVzdDogJ0dldFRpbGUnLFxuICAgICAgICAgICAgdmVyc2lvbjogJzEuMC4wJyxcbiAgICAgICAgICAgIGxheWVyczogJycsXG4gICAgICAgICAgICBzdHlsZXM6ICcnLFxuICAgICAgICAgICAgdGlsZU1hdHJpeFNldDogJycsXG4gICAgICAgICAgICBmb3JtYXQ6ICdpbWFnZS9wbmcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciB3bXRzUGFyYW1zID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdFdtdHNQYXJhbXMpO1xuICAgICAgICB2YXIgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEJyb3dzZXIucmV0aW5hKSB7XG4gICAgICAgICAgICB3bXRzUGFyYW1zLndpZHRoID0gd210c1BhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZSAqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3bXRzUGFyYW1zLndpZHRoID0gd210c1BhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGFsbCBrZXlzIHRoYXQgYXJlIG5vdCBUaWxlTGF5ZXIgb3B0aW9ucyBnbyB0byBXTVRTIHBhcmFtc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSE9XCJtYXRyaXhJZHNcIikge1xuICAgICAgICAgICAgICAgIHdtdHNQYXJhbXNbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud210c1BhcmFtcyA9IHdtdHNQYXJhbXM7XG4gICAgICAgIHRoaXMubWF0cml4SWRzID0gb3B0aW9ucy5tYXRyaXhJZHN8fHRoaXMuZ2V0RGVmYXVsdE1hdHJpeCgpO1xuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb25BZGQgKCBtYXA6IE1hcCApIDogdGhpcyB7XG4gICAgICAgIHRoaXMuX2NycyA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jcnMgfHwgKG1hcC5vcHRpb25zIGFzIGFueSkuY3JzO1xuICAgICAgICByZXR1cm4gc3VwZXIub25BZGQobWFwKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlVXJsIChjb29yZHMgOiBQb2ludCkgOiBzdHJpbmcgeyAvLyAoUG9pbnQsIE51bWJlcikgLT4gU3RyaW5nXG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZSBhcyBudW1iZXI7XG4gICAgICAgIHZhciBud1BvaW50ID0gY29vcmRzLm11bHRpcGx5QnkodGlsZVNpemUpO1xuICAgICAgICBud1BvaW50LngrPTE7XG4gICAgICAgIG53UG9pbnQueS09MTtcbiAgICAgICAgdmFyIHNlUG9pbnQgPSBud1BvaW50LmFkZCggbmV3IFBvaW50KHRpbGVTaXplLCB0aWxlU2l6ZSkgKTtcbiAgICAgICAgdmFyIHpvb20gPSB0aGlzLl90aWxlWm9vbTtcbiAgICAgICAgdmFyIG53ID0gdGhpcy5fY3JzLnByb2plY3QodGhpcy5fbWFwLnVucHJvamVjdChud1BvaW50LCB6b29tKSk7XG4gICAgICAgIHZhciBzZSA9IHRoaXMuX2Nycy5wcm9qZWN0KHRoaXMuX21hcC51bnByb2plY3Qoc2VQb2ludCwgem9vbSkpO1xuICAgICAgICB2YXIgdGlsZXdpZHRoID0gc2UueC1udy54O1xuICAgICAgICAvL3pvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgICAgICB2YXIgaWRlbnQgPSB0aGlzLm1hdHJpeElkc1t6b29tXS5pZGVudGlmaWVyO1xuICAgICAgICB2YXIgdGlsZU1hdHJpeCA9IHRoaXMud210c1BhcmFtcy50aWxlTWF0cml4U2V0ICsgXCI6XCIgKyBpZGVudDtcbiAgICAgICAgdmFyIFgwID0gdGhpcy5tYXRyaXhJZHNbem9vbV0udG9wTGVmdENvcm5lci5sbmc7XG4gICAgICAgIHZhciBZMCA9IHRoaXMubWF0cml4SWRzW3pvb21dLnRvcExlZnRDb3JuZXIubGF0O1xuICAgICAgICB2YXIgdGlsZWNvbD1NYXRoLmZsb29yKChudy54LVgwKS90aWxld2lkdGgpO1xuICAgICAgICB2YXIgdGlsZXJvdz0tTWF0aC5mbG9vcigobncueS1ZMCkvdGlsZXdpZHRoKTtcblxuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLl91cmw7XG4gICAgICAgIGxldCBpc1RpbGVNYXRyaXhUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVNYXRyaXh9Jyk7XG4gICAgICAgIGxldCBpc1RpbGVSb3dUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVSb3d9Jyk7XG4gICAgICAgIGxldCBpc1RpbGVDb2xUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVDb2x9Jyk7XG5cbiAgICAgICAgbGV0IG8gPSBPYmplY3QuYXNzaWduKHtzOiB0aGlzLl9nZXRTdWJkb21haW4oY29vcmRzKX0sIHRoaXMud210c1BhcmFtcyk7XG4gICAgICAgIGlmKGlzVGlsZU1hdHJpeFRlbXBsYXRlZD4wKSBvLlRpbGVNYXRyaXggPSBpZGVudDtcbiAgICAgICAgaWYoaXNUaWxlUm93VGVtcGxhdGVkPjApIG8uVGlsZVJvdyA9IHRpbGVyb3c7XG4gICAgICAgIGlmKGlzVGlsZUNvbFRlbXBsYXRlZD4wKSBvLlRpbGVDb2wgPSB0aWxlY29sO1xuICAgICAgICBmb3IobGV0IGsgaW4gbykge1xuICAgICAgICAgICAgb1trLnRvTG93ZXJDYXNlKCldID0gb1trXTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cmwgPSBVdGlsLnRlbXBsYXRlKHVybC50b0xvd2VyQ2FzZSgpLCBvKTtcbiAgICAgICAgdXJsID0gdGVtcGxhdGUodXJsLCBvKTtcblxuICAgICAgICBsZXQgcXNpID0gdXJsLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICBpZihxc2k8MCB8fCAoaXNUaWxlTWF0cml4VGVtcGxhdGVkPHFzaSAmJiBpc1RpbGVSb3dUZW1wbGF0ZWQ8cXNpIHx8IGlzVGlsZUNvbFRlbXBsYXRlZDxxc2kpKSB7XG4gICAgICAgICAgICAvL2lmIHRoZSBUTSxUUixUQyB2YXJpYWJsZXMgYXJlIHRlbXBsYXRlZCBidXQgbm90IGFzIHF1ZXJ5c3RyaW5nIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIC8vIChpZSwgbm8gJz8nIHByZXNlbnQgb3IgdGhvc2UgcGFyYW1zIGFyZSBiZWZvcmUgdGhlICc/JyksXG4gICAgICAgICAgICAvLyB0aGVuIHRoZSBVUkwgbXVzdCBub3QgYmUgT0dDIFdNVFMsIHNvIG5vIG5lZWQgZm9yIFdNVFMgcGFyYW1ldGVyc1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHRoaXMud210c1BhcmFtcywgdXJsKTtcbiAgICAgICAgICAgIGlmKGlzVGlsZU1hdHJpeFRlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlTWF0cml4PVwiICsgaWRlbnQ7IC8vdGlsZU1hdHJpeFNldFxuICAgICAgICAgICAgaWYoaXNUaWxlUm93VGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVSb3c9XCIgKyB0aWxlcm93O1xuICAgICAgICAgICAgaWYoaXNUaWxlQ29sVGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVDb2w9XCIgKyB0aWxlY29sO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBzZXRQYXJhbXMgKHBhcmFtcywgbm9SZWRyYXcpIHtcbiAgICAgICAgVXRpbC5leHRlbmQodGhpcy53bXRzUGFyYW1zLCBwYXJhbXMpO1xuICAgICAgICBpZiAoIW5vUmVkcmF3KSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRNYXRyaXggICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBtYXRyaXgzODU3IHJlcHJlc2VudHMgdGhlIHByb2plY3Rpb25cbiAgICAgICAgICogZm9yIGluIHRoZSBJR04gV01UUyBmb3IgdGhlIGdvb2dsZSBjb29yZGluYXRlcy5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBtYXRyaXhJZHMzODU3ID0gbmV3IEFycmF5KDIyKTtcbiAgICAgICAgZm9yICh2YXIgaT0gMDsgaTwyMjsgaSsrKSB7XG4gICAgICAgICAgICBtYXRyaXhJZHMzODU3W2ldPSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciAgICA6IFwiXCIgKyBpLFxuICAgICAgICAgICAgICAgIHRvcExlZnRDb3JuZXIgOiBuZXcgTGF0TG5nKDIwMDM3NTA4LjM0MjgsLTIwMDM3NTA4LjM0MjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRyaXhJZHMzODU3O1xuICAgIH1cblxuICAgIF9nZXRTdWJkb21haW4gKHRpbGVQb2ludCA6IFBvaW50KSA6IHN0cmluZyB7XG5cdFx0dmFyIGluZGV4ID0gTWF0aC5hYnModGlsZVBvaW50LnggKyB0aWxlUG9pbnQueSkgJSB0aGlzLm9wdGlvbnMuc3ViZG9tYWlucy5sZW5ndGg7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5zdWJkb21haW5zW2luZGV4XTtcblx0fVxuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHdtdHMobGF5ZXIpIHtcblxuICAgIGxldCB1cmwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggPyBsYXllci5zZXJ2aWNlc1swXS5ocmVmIDogbnVsbDtcblxuICAgIGxldCBzdXBwb3J0ZWRDcnMgPSBsYXllci5jcnMgfHwgW107XG4gICAgaWYoc3VwcG9ydGVkQ3JzICYmIHN1cHBvcnRlZENycy5sZW5ndGggPiAwICYmIH5zdXBwb3J0ZWRDcnMuaW5kZXhPZihcIkVTUEc6Mzg1N1wiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgXCJFUFNHOjM4NTcgU3BoZXJpY2FsIE1lcmNhdG9yIHByb2plY3Rpb24gYW5kIG1heSBub3QgcmVuZGVyIGFwcHJvcHJpYXRlbHkgb3IgYXQgYWxsLlwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbGF5ZXI6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgc3R5bGU6ICdkZWZhdWx0JyxcbiAgICAgICAgdGlsZU1hdHJpeFNldDogXCJkZWZhdWx0XCIsXG4gICAgICAgIGZvcm1hdDogXCJpbWFnZS9wbmdcIlxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAob3B0aW9ucyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgZGlzdHJvID0gKGxheWVyLmRpc3RyaWJ1dGlvbnMgfHwgW10pLmZpbmQoIGRpc3QgPT4ge1xuICAgICAgICAvL2Vuc3VyZSBkaXN0IGlzbid0ICdudWxsJ1xuICAgICAgICByZXR1cm4gZGlzdCAmJiBkaXN0LmhyZWYgJiYgKCBkaXN0Lm1lZGlhVHlwZT09PSdpbWFnZS9wbmcnIHx8IGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL2pwZWcnICk7XG4gICAgfSk7XG4gICAgaWYoZGlzdHJvKSB7XG4gICAgICAgIHVybCA9IGRpc3Ryby5ocmVmO1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGRpc3Ryby5tZWRpYVR5cGU7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IGRpc3Ryby5wYXJhbWV0ZXJzIHx8IFtdO1xuICAgICAgICBwYXJhbXMuZm9yRWFjaCggcGFyYW0gPT4ge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgcGFyYW0udmFsdWVzICYmIHBhcmFtLnZhbHVlcy5sZW5ndGggJiYgcGFyYW0udmFsdWVzWzBdO1xuXG4gICAgICAgICAgICAvL2lnbm9yZSBwYXJhbWV0ZXJzIHdpdGhvdXQgdmFsdWVzIGFuZCBkZWZhdWx0IHZhbHVlc1xuICAgICAgICAgICAgaWYodmFsdWUgPT09IG51bGwgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvL2lnbm9yZSB3bXRzIHNwZWNpZmljIHBhcmFtZXRlcnMsIFdNVFMgbGF5ZXIgd2lsbCBwb3B1bGF0ZSB0aG9zZSB2YWx1ZXNcbiAgICAgICAgICAgIC8vIGJhc2VkIHVwb24gbWFwIHN0YXRlLlxuICAgICAgICAgICAgbGV0IHBsYyA9IHBhcmFtLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKFwidGlsZW1hdHJpeFwiID09PSBwbGMgfHwgXCJ0aWxlcm93XCIgPT09IHBsYyB8fCBcInRpbGVjb2xcIiA9PT0gcGxjKSByZXR1cm47XG4gICAgICAgICAgICBlbHNlIGlmKFwidGlsZW1hdHJpeHNldFwiID09PSBwbGMpIG9wdGlvbnMudGlsZU1hdHJpeFNldCA9IHZhbHVlO1xuICAgICAgICAgICAgZWxzZSB7IC8vZm9yIGFsbCBvdGhlciBwYXJhbWV0ZXJzLCB0cnkgdG8gZmlsbCBpbiBkZWZhdWx0IG9yIGluaXRpYWwgdmFsdWVzXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJ3snICsgcGFyYW0ubmFtZSArICd9JywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXVE1TIExheWVyIC0gbGF5ZXIgXCIgKyBsYXllci5pZCArXG4gICAgICAgICAgICBcIiBoYXMgbm8gZGlzdHJpYnV0aW9uKHMpIHVzYWJsZSB0byBtYWtlIFdNVFMgcmVxdWVzdHNcIik7XG4gICAgfVxuXG4gICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGRldGVybWluZSBXTVRTIFVSTCBmb3IgbGF5ZXIgXCIgKyBsYXllci5pZCArXG4gICAgICAgIFwiLiBQbGVhc2UgbWFrZSBzdXJlIGl0IGlzIGRlZmluZWQgYnkgZWl0aGVyIHRoZSBzZXJ2aWNlIG9yIGEgZGlzdHJpYnV0aW9uIG9uIHRoZSBsYXllciBpdHNlbGYuXCIpO1xuXG4gICAgcmV0dXJuIG5ldyBXTVRTKCB1cmwsIG9wdGlvbnMgKTtcblxufVxuXG5cbmlmKCh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNVFMgPSBXTVRTO1xuICAgIEwudGlsZUxheWVyLndtdHMgPSB3bXRzO1xufVxuXG5leHBvcnQge1xuICAgIFdNVFMgYXMgZGVmYXVsdCxcbiAgICBXTVRTLFxuICAgIHdtdHNcbn07XG4iXX0=