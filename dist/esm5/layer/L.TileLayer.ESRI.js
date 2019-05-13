/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { TileLayer, Browser, Util } from 'leaflet';
var EsriTileLayer = /** @class */ (function (_super) {
    tslib_1.__extends(EsriTileLayer, _super);
    function EsriTileLayer(url, options) {
        return _super.call(this, url, options) || this;
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    EsriTileLayer.prototype.initialize = /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
        // (String, Object)
        if (!url)
            throw new Error("Layer was not configured with a URL");
        this.defaultESRIParams = {
            layers: '',
            //=show:0,1,2
            transparent: true,
            format: 'png32',
            f: 'image'
        };
        if (url.indexOf("/export") < 0) {
            /** @type {?} */
            var qidx = url.indexOf("?");
            if (qidx > 0) {
                url = url.substring(0, qidx) + '/export' + url.substring(qidx);
            }
            else {
                url += '/export';
            }
        }
        this._url = url;
        /** @type {?} */
        var esriParams = Util.extend({}, this.defaultESRIParams);
        /** @type {?} */
        var tileSize = options.tileSize || this.options.tileSize;
        /** @type {?} */
        var dim;
        if (options.detectRetina && Browser.retina) {
            dim = esriParams.height = tileSize * 2;
        }
        else {
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
    };
    /**
     * @param {?} map
     * @return {?}
     */
    EsriTileLayer.prototype.onAdd = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
        this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
        return _super.prototype.onAdd.call(this, map);
    };
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    EsriTileLayer.prototype.getTileUrl = /**
     * @param {?} tilePoint
     * @return {?}
     */
    function (tilePoint) {
        /** @type {?} */
        var map = this._map;
        /** @type {?} */
        var tileSize = /** @type {?} */ (this.options.tileSize);
        /** @type {?} */
        var nwPoint = tilePoint.multiplyBy(tileSize);
        /** @type {?} */
        var sePoint = nwPoint.add([tileSize, tileSize]);
        /** @type {?} */
        var nw = this._crs.project(map.unproject(nwPoint, tilePoint.z));
        /** @type {?} */
        var se = this._crs.project(map.unproject(sePoint, tilePoint.z));
        /** @type {?} */
        var bbox = [nw.x, se.y, se.x, nw.y].join(',');
        /** @type {?} */
        var url = Util.template(this._url, { s: this._getSubdomain(tilePoint) });
        /** @type {?} */
        var params = Util.extend({}, this.esriParams);
        params.layers = "show:" + params.layers;
        //convert to esri-special SR for spherical mercator
        if (params.bboxsr === 'EPSG:3857')
            params.bboxsr = '102100';
        if (params.imagesr === 'EPSG:3857')
            params.imagesr = '102100';
        return url + Util.getParamString(params, url, true) + '&BBOX=' + bbox;
    };
    /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    EsriTileLayer.prototype.setParams = /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    function (params, noRedraw) {
        Util.extend(this.esriParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    };
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    EsriTileLayer.prototype._getSubdomain = /**
     * @param {?} tilePoint
     * @return {?}
     */
    function (tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    };
    return EsriTileLayer;
}(TileLayer));
if (false) {
    /** @type {?} */
    EsriTileLayer.prototype._url;
    /** @type {?} */
    EsriTileLayer.prototype._crs;
    /** @type {?} */
    EsriTileLayer.prototype.esriParams;
    /** @type {?} */
    EsriTileLayer.prototype.defaultESRIParams;
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.TileLayer.ESRI = EsriTileLayer;
    L_1.tileLayer.esri = function (url, options) {
        return new L_1.TileLayer.ESRI(url, options);
    };
}
export default EsriTileLayer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5UaWxlTGF5ZXIuRVNSSS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbImxheWVyL0wuVGlsZUxheWVyLkVTUkkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sRUFBTyxTQUFTLEVBQTRCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFLbEYsSUFBQTtJQUE0Qix5Q0FBUztJQU9qQyx1QkFBWSxHQUFHLEVBQUUsT0FBTztlQUNwQixrQkFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDO0tBQ3RCOzs7Ozs7SUFFRCxrQ0FBVTs7Ozs7SUFBVixVQUFZLEdBQUcsRUFBRSxPQUFPOztRQUVwQixJQUFHLENBQUMsR0FBRztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsaUJBQWlCLEdBQUc7WUFDckIsTUFBTSxFQUFRLEVBQUU7O1lBQ2hCLFdBQVcsRUFBRyxJQUFJO1lBQ2xCLE1BQU0sRUFBUSxPQUFPO1lBQ3JCLENBQUMsRUFBYSxPQUFPO1NBTXhCLENBQUM7UUFFRixJQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUMzQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUcsSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDVCxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEU7aUJBQU07Z0JBQ0gsR0FBRyxJQUFJLFNBQVMsQ0FBQzthQUNwQjtTQUNKO1FBQ0Qs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QztJQUM1QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7SUFDakMsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLEVBQUUsT0FBTztRQUNyQyxPQUFPLElBQUksR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzdDLENBQUM7Q0FDTDtBQUVELGVBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIFBvaW50LCBDb29yZHMsIEJyb3dzZXIsIFV0aWwgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cblxuY2xhc3MgRXNyaVRpbGVMYXllciBleHRlbmRzIFRpbGVMYXllciB7XG5cbiAgICBwcml2YXRlIF91cmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY3JzIDogYW55O1xuICAgIHByaXZhdGUgZXNyaVBhcmFtcyA6IGFueTtcbiAgICBwcml2YXRlIGRlZmF1bHRFU1JJUGFyYW1zIDogYW55O1xuXG4gICAgY29uc3RydWN0b3IodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAodXJsLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIE9iamVjdClcblxuICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllciB3YXMgbm90IGNvbmZpZ3VyZWQgd2l0aCBhIFVSTFwiKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRFU1JJUGFyYW1zID0ge1xuICAgICAgICAgICAgbGF5ZXJzOiAgICAgICAnJywgLy89c2hvdzowLDEsMlxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6ICB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAgICAgICAncG5nMzInLFxuICAgICAgICAgICAgZjogICAgICAgICAgICAnaW1hZ2UnXG4gICAgICAgICAgICAvLyBzcnM6ICAgICAgICAgICc0MzI2JyxcbiAgICAgICAgICAgIC8vIGJib3hzcjogICAgICAgJzQzMjYnLFxuICAgICAgICAgICAgLy8gYmJveDogICAgICAgICBudWxsLFxuICAgICAgICAgICAgLy8gc2l6ZTogICAgICAgICAnMjU2LDI1NicsXG4gICAgICAgICAgICAvLyBpbWFnZXNyOiAgICAgICc0MzI2J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKHVybC5pbmRleE9mKFwiL2V4cG9ydFwiKSA8IDApIHtcbiAgICAgICAgICAgIGxldCBxaWR4ID0gdXJsLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICAgICAgaWYocWlkeCA+IDApIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHFpZHgpICsgJy9leHBvcnQnICsgdXJsLnN1YnN0cmluZyhxaWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvZXhwb3J0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG5cbiAgICAgICAgbGV0IGVzcmlQYXJhbXMgOiBhbnkgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0RVNSSVBhcmFtcyksXG4gICAgICAgICAgICB0aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuXG4gICAgICAgIGxldCBkaW07XG4gICAgICAgIGlmIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBCcm93c2VyLnJldGluYSkge1xuICAgICAgICAgICAgZGltID0gZXNyaVBhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZSAqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaW0gPSBlc3JpUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xuICAgICAgICB9XG4gICAgICAgIGVzcmlQYXJhbXMuc2l6ZSA9IGRpbSArICcsJyArIGRpbTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGFsbCBrZXlzIHRoYXQgYXJlIG5vdCBUaWxlTGF5ZXIgb3B0aW9ucyBnbyB0byBXTVMgcGFyYW1zXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAnY3JzJykge1xuICAgICAgICAgICAgICAgIGVzcmlQYXJhbXNbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9sYXllciBpZHNcbiAgICAgICAgLy8gZXNyaVBhcmFtcy5sYXllcnMgPSBcInNob3c6XCIgKyBlc3JpUGFyYW1zLmxheWVycztcblxuICAgICAgICB0aGlzLmVzcmlQYXJhbXMgPSBlc3JpUGFyYW1zO1xuXG4gICAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIH1cblxuICAgIG9uQWRkIChtYXAgOiBNYXApIDogdGhpcyB7XG4gICAgICAgIHRoaXMuX2NycyA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jcnMgfHwgKG1hcC5vcHRpb25zIGFzIGFueSkuY3JzO1xuICAgICAgICB0aGlzLmVzcmlQYXJhbXMuc3JzID0gdGhpcy5lc3JpUGFyYW1zLmltYWdlc3IgPSB0aGlzLmVzcmlQYXJhbXMuYmJveHNyID0gdGhpcy5fY3JzLmNvZGU7XG4gICAgICAgIHJldHVybiBzdXBlci5vbkFkZChtYXApO1xuICAgIH1cblxuICAgIGdldFRpbGVVcmwgKHRpbGVQb2ludCA6IENvb3JkcyApIDogc3RyaW5nIHsgLy8gKFBvaW50LCBOdW1iZXIpIC0+IFN0cmluZ1xuXG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9tYXAsXG4gICAgICAgICAgICB0aWxlU2l6ZSA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZSBhcyBudW1iZXIsXG5cbiAgICAgICAgbndQb2ludCA9IHRpbGVQb2ludC5tdWx0aXBseUJ5KHRpbGVTaXplKSxcbiAgICAgICAgc2VQb2ludCA9IG53UG9pbnQuYWRkKFt0aWxlU2l6ZSwgdGlsZVNpemVdKSxcblxuICAgICAgICBudyA9IHRoaXMuX2Nycy5wcm9qZWN0KG1hcC51bnByb2plY3QobndQb2ludCwgdGlsZVBvaW50LnopKSxcbiAgICAgICAgc2UgPSB0aGlzLl9jcnMucHJvamVjdChtYXAudW5wcm9qZWN0KHNlUG9pbnQsIHRpbGVQb2ludC56KSksXG4gICAgICAgIGJib3ggPSBbbncueCwgc2UueSwgc2UueCwgbncueV0uam9pbignLCcpLFxuXG4gICAgICAgIHVybCA9IFV0aWwudGVtcGxhdGUodGhpcy5fdXJsLCB7czogdGhpcy5fZ2V0U3ViZG9tYWluKHRpbGVQb2ludCl9KTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZXNyaVBhcmFtcyk7XG4gICAgICAgIHBhcmFtcy5sYXllcnMgPSBcInNob3c6XCIgKyBwYXJhbXMubGF5ZXJzO1xuXG4gICAgICAgIC8vY29udmVydCB0byBlc3JpLXNwZWNpYWwgU1IgZm9yIHNwaGVyaWNhbCBtZXJjYXRvclxuICAgICAgICBpZihwYXJhbXMuYmJveHNyID09PSAnRVBTRzozODU3JylcbiAgICAgICAgICAgIHBhcmFtcy5iYm94c3IgPSAnMTAyMTAwJztcbiAgICAgICAgaWYocGFyYW1zLmltYWdlc3IgPT09ICdFUFNHOjM4NTcnKVxuICAgICAgICAgICAgcGFyYW1zLmltYWdlc3IgPSAnMTAyMTAwJztcblxuICAgICAgICByZXR1cm4gdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSkgKyAnJkJCT1g9JyArIGJib3g7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1zIChwYXJhbXMsIG5vUmVkcmF3KSB7XG4gICAgICAgIFV0aWwuZXh0ZW5kKHRoaXMuZXNyaVBhcmFtcywgcGFyYW1zKTtcbiAgICAgICAgaWYgKCFub1JlZHJhdykge1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBfZ2V0U3ViZG9tYWluICh0aWxlUG9pbnQgOiBQb2ludCkgOiBzdHJpbmcge1xuXHRcdHZhciBpbmRleCA9IE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGhpcy5vcHRpb25zLnN1YmRvbWFpbnMubGVuZ3RoO1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuc3ViZG9tYWluc1tpbmRleF07XG5cdH1cbn1cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuRVNSSSA9IEVzcmlUaWxlTGF5ZXI7XG4gICAgTC50aWxlTGF5ZXIuZXNyaSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMLlRpbGVMYXllci5FU1JJKHVybCwgb3B0aW9ucyk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXNyaVRpbGVMYXllcjtcbiJdfQ==