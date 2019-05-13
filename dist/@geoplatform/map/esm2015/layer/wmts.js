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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci93bXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sRUFDRSxTQUFTLEVBQWEsT0FBTyxFQUNsQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFDdEIsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUs1QyxNQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQzs7Ozs7O0FBT3JDLGtCQUFrQixHQUFHLEVBQUUsSUFBSTtJQUMxQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUc7O1FBQzdDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDdkMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0NBQ0g7QUFNRCxVQUFXLFNBQVEsU0FBUzs7Ozs7SUFTeEIsWUFBWSxHQUFZLEVBQUUsT0FBYztRQUNwQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7SUFF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QUFzRCxDQUFDLENBQUM7S0FDL0Q7SUFFRCxJQUFHLENBQUMsR0FBRztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDekUsK0ZBQStGLENBQUMsQ0FBQztJQUVyRyxPQUFPLElBQUksSUFBSSxDQUFFLEdBQUcsRUFBRSxPQUFPLENBQUUsQ0FBQztDQUVuQztBQUdELElBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFFOztJQUNsQixNQUFNLENBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUMzQjtBQUVELE9BQU8sRUFDSCxJQUFJLElBQUksT0FBTyxFQUNmLElBQUksRUFDSixJQUFJLEVBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQge1xuICAgIE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIEJyb3dzZXIsXG4gICAgUG9pbnQsIFV0aWwsIExhdExuZ1xufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuXG5cblxuY29uc3QgcGFyYW1SZSA9IC9cXHsgKihbXFx3Xy1dKykgKlxcfS9nO1xuXG4vLyBAZnVuY3Rpb24gdGVtcGxhdGUoc3RyOiBTdHJpbmcsIGRhdGE6IE9iamVjdCk6IFN0cmluZ1xuLy8gU2ltcGxlIHRlbXBsYXRpbmcgZmFjaWxpdHksIGFjY2VwdHMgYSB0ZW1wbGF0ZSBzdHJpbmcgb2YgdGhlIGZvcm0gYCdIZWxsbyB7YX0sIHtifSdgXG4vLyBhbmQgYSBkYXRhIG9iamVjdCBsaWtlIGB7YTogJ2ZvbycsIGI6ICdiYXInfWAsIHJldHVybnMgZXZhbHVhdGVkIHN0cmluZ1xuLy8gYCgnSGVsbG8gZm9vLCBiYXInKWAuIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGZ1bmN0aW9ucyBpbnN0ZWFkIG9mIHN0cmluZ3MgZm9yXG4vLyBkYXRhIHZhbHVlcyDigJQgdGhleSB3aWxsIGJlIGV2YWx1YXRlZCBwYXNzaW5nIGBkYXRhYCBhcyBhbiBhcmd1bWVudC5cbmZ1bmN0aW9uIHRlbXBsYXRlKHN0ciwgZGF0YSkge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UocGFyYW1SZSwgZnVuY3Rpb24gKHN0ciwga2V5KSB7XG5cdFx0dmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFsdWUgPSBkYXRhW2tleS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBcdHRocm93IG5ldyBFcnJvcignTm8gdmFsdWUgcHJvdmlkZWQgZm9yIHZhcmlhYmxlICcgKyBzdHIpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlKGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0pO1xufVxuXG5cbi8qXG4gKiBpbnNwaXJlZCBieSBhbmQgdXNlcyBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL215bGVuL2xlYWZsZXQuVGlsZUxheWVyLldNVFNcbiAqL1xuY2xhc3MgV01UUyBleHRlbmRzIFRpbGVMYXllciB7XG5cbiAgICBwcml2YXRlIF91cmw6IHN0cmluZztcbiAgICBwcml2YXRlIF9jcnM6IGFueTtcbiAgICBwcml2YXRlIG1hdHJpeElkcyA6IGFueTtcbiAgICBwcml2YXRlIHdtdHNQYXJhbXMgOiBhbnk7XG5cbiAgICBwcml2YXRlIGRlZmF1bHRXbXRzUGFyYW1zOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdGlvbnMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAodXJsLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIE9iamVjdClcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuICAgICAgICB0aGlzLmRlZmF1bHRXbXRzUGFyYW1zID0ge1xuICAgICAgICAgICAgc2VydmljZTogJ1dNVFMnLFxuICAgICAgICAgICAgcmVxdWVzdDogJ0dldFRpbGUnLFxuICAgICAgICAgICAgdmVyc2lvbjogJzEuMC4wJyxcbiAgICAgICAgICAgIGxheWVyczogJycsXG4gICAgICAgICAgICBzdHlsZXM6ICcnLFxuICAgICAgICAgICAgdGlsZU1hdHJpeFNldDogJycsXG4gICAgICAgICAgICBmb3JtYXQ6ICdpbWFnZS9wbmcnXG4gICAgICAgIH07XG4gICAgICAgIHZhciB3bXRzUGFyYW1zID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdFdtdHNQYXJhbXMpO1xuICAgICAgICB2YXIgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEJyb3dzZXIucmV0aW5hKSB7XG4gICAgICAgICAgICB3bXRzUGFyYW1zLndpZHRoID0gd210c1BhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZSAqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3bXRzUGFyYW1zLndpZHRoID0gd210c1BhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGFsbCBrZXlzIHRoYXQgYXJlIG5vdCBUaWxlTGF5ZXIgb3B0aW9ucyBnbyB0byBXTVRTIHBhcmFtc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSE9XCJtYXRyaXhJZHNcIikge1xuICAgICAgICAgICAgICAgIHdtdHNQYXJhbXNbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMud210c1BhcmFtcyA9IHdtdHNQYXJhbXM7XG4gICAgICAgIHRoaXMubWF0cml4SWRzID0gb3B0aW9ucy5tYXRyaXhJZHN8fHRoaXMuZ2V0RGVmYXVsdE1hdHJpeCgpO1xuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb25BZGQgKCBtYXA6IE1hcCApIDogdGhpcyB7XG4gICAgICAgIHRoaXMuX2NycyA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jcnMgfHwgKG1hcC5vcHRpb25zIGFzIGFueSkuY3JzO1xuICAgICAgICByZXR1cm4gc3VwZXIub25BZGQobWFwKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlVXJsIChjb29yZHMgOiBQb2ludCkgOiBzdHJpbmcgeyAvLyAoUG9pbnQsIE51bWJlcikgLT4gU3RyaW5nXG4gICAgICAgIHZhciB0aWxlU2l6ZSA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZSBhcyBudW1iZXI7XG4gICAgICAgIHZhciBud1BvaW50ID0gY29vcmRzLm11bHRpcGx5QnkodGlsZVNpemUpO1xuICAgICAgICBud1BvaW50LngrPTE7XG4gICAgICAgIG53UG9pbnQueS09MTtcbiAgICAgICAgdmFyIHNlUG9pbnQgPSBud1BvaW50LmFkZCggbmV3IFBvaW50KHRpbGVTaXplLCB0aWxlU2l6ZSkgKTtcbiAgICAgICAgdmFyIHpvb20gPSB0aGlzLl90aWxlWm9vbTtcbiAgICAgICAgdmFyIG53ID0gdGhpcy5fY3JzLnByb2plY3QodGhpcy5fbWFwLnVucHJvamVjdChud1BvaW50LCB6b29tKSk7XG4gICAgICAgIHZhciBzZSA9IHRoaXMuX2Nycy5wcm9qZWN0KHRoaXMuX21hcC51bnByb2plY3Qoc2VQb2ludCwgem9vbSkpO1xuICAgICAgICB2YXIgdGlsZXdpZHRoID0gc2UueC1udy54O1xuICAgICAgICAvL3pvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xuICAgICAgICB2YXIgaWRlbnQgPSB0aGlzLm1hdHJpeElkc1t6b29tXS5pZGVudGlmaWVyO1xuICAgICAgICB2YXIgdGlsZU1hdHJpeCA9IHRoaXMud210c1BhcmFtcy50aWxlTWF0cml4U2V0ICsgXCI6XCIgKyBpZGVudDtcbiAgICAgICAgdmFyIFgwID0gdGhpcy5tYXRyaXhJZHNbem9vbV0udG9wTGVmdENvcm5lci5sbmc7XG4gICAgICAgIHZhciBZMCA9IHRoaXMubWF0cml4SWRzW3pvb21dLnRvcExlZnRDb3JuZXIubGF0O1xuICAgICAgICB2YXIgdGlsZWNvbD1NYXRoLmZsb29yKChudy54LVgwKS90aWxld2lkdGgpO1xuICAgICAgICB2YXIgdGlsZXJvdz0tTWF0aC5mbG9vcigobncueS1ZMCkvdGlsZXdpZHRoKTtcblxuXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLl91cmw7XG4gICAgICAgIGxldCBpc1RpbGVNYXRyaXhUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVNYXRyaXh9Jyk7XG4gICAgICAgIGxldCBpc1RpbGVSb3dUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVSb3d9Jyk7XG4gICAgICAgIGxldCBpc1RpbGVDb2xUZW1wbGF0ZWQgPSB1cmwuaW5kZXhPZigne1RpbGVDb2x9Jyk7XG5cbiAgICAgICAgbGV0IG8gPSBPYmplY3QuYXNzaWduKHtzOiB0aGlzLl9nZXRTdWJkb21haW4oY29vcmRzKX0sIHRoaXMud210c1BhcmFtcyk7XG4gICAgICAgIGlmKGlzVGlsZU1hdHJpeFRlbXBsYXRlZD4wKSBvLlRpbGVNYXRyaXggPSBpZGVudDtcbiAgICAgICAgaWYoaXNUaWxlUm93VGVtcGxhdGVkPjApIG8uVGlsZVJvdyA9IHRpbGVyb3c7XG4gICAgICAgIGlmKGlzVGlsZUNvbFRlbXBsYXRlZD4wKSBvLlRpbGVDb2wgPSB0aWxlY29sO1xuICAgICAgICBmb3IobGV0IGsgaW4gbykge1xuICAgICAgICAgICAgb1trLnRvTG93ZXJDYXNlKCldID0gb1trXTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cmwgPSBVdGlsLnRlbXBsYXRlKHVybC50b0xvd2VyQ2FzZSgpLCBvKTtcbiAgICAgICAgdXJsID0gdGVtcGxhdGUodXJsLCBvKTtcblxuICAgICAgICBsZXQgcXNpID0gdXJsLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICBpZihxc2k8MCB8fCAoaXNUaWxlTWF0cml4VGVtcGxhdGVkPHFzaSAmJiBpc1RpbGVSb3dUZW1wbGF0ZWQ8cXNpIHx8IGlzVGlsZUNvbFRlbXBsYXRlZDxxc2kpKSB7XG4gICAgICAgICAgICAvL2lmIHRoZSBUTSxUUixUQyB2YXJpYWJsZXMgYXJlIHRlbXBsYXRlZCBidXQgbm90IGFzIHF1ZXJ5c3RyaW5nIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIC8vIChpZSwgbm8gJz8nIHByZXNlbnQgb3IgdGhvc2UgcGFyYW1zIGFyZSBiZWZvcmUgdGhlICc/JyksXG4gICAgICAgICAgICAvLyB0aGVuIHRoZSBVUkwgbXVzdCBub3QgYmUgT0dDIFdNVFMsIHNvIG5vIG5lZWQgZm9yIFdNVFMgcGFyYW1ldGVyc1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHRoaXMud210c1BhcmFtcywgdXJsKTtcbiAgICAgICAgICAgIGlmKGlzVGlsZU1hdHJpeFRlbXBsYXRlZDwwKVxuICAgICAgICAgICAgICAgIHVybCArPSBcIiZUaWxlTWF0cml4PVwiICsgaWRlbnQ7IC8vdGlsZU1hdHJpeFNldFxuICAgICAgICAgICAgaWYoaXNUaWxlUm93VGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVSb3c9XCIgKyB0aWxlcm93O1xuICAgICAgICAgICAgaWYoaXNUaWxlQ29sVGVtcGxhdGVkPDApXG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJlRpbGVDb2w9XCIgKyB0aWxlY29sO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG5cbiAgICBzZXRQYXJhbXMgKHBhcmFtcywgbm9SZWRyYXcpIHtcbiAgICAgICAgVXRpbC5leHRlbmQodGhpcy53bXRzUGFyYW1zLCBwYXJhbXMpO1xuICAgICAgICBpZiAoIW5vUmVkcmF3KSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRNYXRyaXggICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBtYXRyaXgzODU3IHJlcHJlc2VudHMgdGhlIHByb2plY3Rpb25cbiAgICAgICAgICogZm9yIGluIHRoZSBJR04gV01UUyBmb3IgdGhlIGdvb2dsZSBjb29yZGluYXRlcy5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBtYXRyaXhJZHMzODU3ID0gbmV3IEFycmF5KDIyKTtcbiAgICAgICAgZm9yICh2YXIgaT0gMDsgaTwyMjsgaSsrKSB7XG4gICAgICAgICAgICBtYXRyaXhJZHMzODU3W2ldPSB7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllciAgICA6IFwiXCIgKyBpLFxuICAgICAgICAgICAgICAgIHRvcExlZnRDb3JuZXIgOiBuZXcgTGF0TG5nKDIwMDM3NTA4LjM0MjgsLTIwMDM3NTA4LjM0MjgpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRyaXhJZHMzODU3O1xuICAgIH1cblxuICAgIF9nZXRTdWJkb21haW4gKHRpbGVQb2ludCA6IFBvaW50KSA6IHN0cmluZyB7XG5cdFx0dmFyIGluZGV4ID0gTWF0aC5hYnModGlsZVBvaW50LnggKyB0aWxlUG9pbnQueSkgJSB0aGlzLm9wdGlvbnMuc3ViZG9tYWlucy5sZW5ndGg7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5zdWJkb21haW5zW2luZGV4XTtcblx0fVxuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHdtdHMobGF5ZXIpIHtcblxuICAgIGxldCB1cmwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggPyBsYXllci5zZXJ2aWNlc1swXS5ocmVmIDogbnVsbDtcblxuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBsYXllcjogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZTogJ2RlZmF1bHQnLFxuICAgICAgICB0aWxlTWF0cml4U2V0OiBcImRlZmF1bHRcIixcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRpb25zIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBkaXN0cm8gPSAobGF5ZXIuZGlzdHJpYnV0aW9ucyB8fCBbXSkuZmluZCggZGlzdCA9PiB7XG4gICAgICAgIC8vZW5zdXJlIGRpc3QgaXNuJ3QgJ251bGwnXG4gICAgICAgIHJldHVybiBkaXN0ICYmIGRpc3QuaHJlZiAmJiAoIGRpc3QubWVkaWFUeXBlPT09J2ltYWdlL3BuZycgfHwgZGlzdC5tZWRpYVR5cGU9PT0naW1hZ2UvanBlZycgKTtcbiAgICB9KTtcbiAgICBpZihkaXN0cm8pIHtcbiAgICAgICAgdXJsID0gZGlzdHJvLmhyZWY7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZGlzdHJvLm1lZGlhVHlwZTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gZGlzdHJvLnBhcmFtZXRlcnMgfHwgW107XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKCBwYXJhbSA9PiB7XG5cbiAgICAgICAgICAgIC8vaWdub3JlIHdtdHMgc3BlY2lmaWMgcGFyYW1ldGVycywgV01UUyBsYXllciB3aWxsIHBvcHVsYXRlIHRob3NlIHZhbHVlc1xuICAgICAgICAgICAgLy8gYmFzZWQgdXBvbiBtYXAgc3RhdGUuXG4gICAgICAgICAgICBsZXQgcGxjID0gcGFyYW0ubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoXCJ0aWxlbWF0cml4XCIgPT09IHBsYyB8fCBcInRpbGVyb3dcIiA9PT0gcGxjIHx8IFwidGlsZWNvbFwiID09PSBwbGMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvL2ZvciBhbGwgb3RoZXIgcGFyYW1ldGVycywgdHJ5IHRvIGZpbGwgaW4gZGVmYXVsdCBvciBpbml0aWFsIHZhbHVlc1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IHBhcmFtLnZhbHVlcyAmJiBwYXJhbS52YWx1ZXMubGVuZ3RoICYmIHBhcmFtLnZhbHVlc1swXTtcbiAgICAgICAgICAgIGlmKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgneycgKyBwYXJhbS5uYW1lICsgJ30nLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldUTVMgTGF5ZXIgLSBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgICAgIFwiIGhhcyBubyBkaXN0cmlidXRpb24ocykgdXNhYmxlIHRvIG1ha2UgV01UUyByZXF1ZXN0c1wiKTtcbiAgICB9XG5cbiAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZGV0ZXJtaW5lIFdNVFMgVVJMIGZvciBsYXllciBcIiArIGxheWVyLmlkICtcbiAgICAgICAgXCIuIFBsZWFzZSBtYWtlIHN1cmUgaXQgaXMgZGVmaW5lZCBieSBlaXRoZXIgdGhlIHNlcnZpY2Ugb3IgYSBkaXN0cmlidXRpb24gb24gdGhlIGxheWVyIGl0c2VsZi5cIik7XG5cbiAgICByZXR1cm4gbmV3IFdNVFMoIHVybCwgb3B0aW9ucyApO1xuXG59XG5cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01UUyA9IFdNVFM7XG4gICAgTC50aWxlTGF5ZXIud210cyA9IHdtdHM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01UUyBhcyBkZWZhdWx0LFxuICAgIFdNVFMsXG4gICAgd210c1xufTtcbiJdfQ==