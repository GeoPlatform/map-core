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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5UaWxlTGF5ZXIuRVNSSS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci9MLlRpbGVMYXllci5FU1JJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUd0QixPQUFPLEVBQU8sU0FBUyxFQUE0QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBS2xGLElBQUE7SUFBNEIseUNBQVM7SUFPakMsdUJBQVksR0FBRyxFQUFFLE9BQU87ZUFDcEIsa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQztLQUN0Qjs7Ozs7O0lBRUQsa0NBQVU7Ozs7O0lBQVYsVUFBWSxHQUFHLEVBQUUsT0FBTzs7UUFFcEIsSUFBRyxDQUFDLEdBQUc7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHO1lBQ3JCLE1BQU0sRUFBUSxFQUFFOztZQUNoQixXQUFXLEVBQUcsSUFBSTtZQUNsQixNQUFNLEVBQVEsT0FBTztZQUNyQixDQUFDLEVBQWEsT0FBTztTQU14QixDQUFDO1FBRUYsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7WUFDM0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFHLElBQUksR0FBRyxDQUFDLEVBQUU7Z0JBQ1QsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILEdBQUcsSUFBSSxTQUFTLENBQUM7YUFDcEI7U0FDSjtRQUNE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QUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO0lBQ2pDLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87UUFDckMsT0FBTyxJQUFJLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM3QyxDQUFDO0NBQ0w7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBQb2ludCwgQ29vcmRzLCBCcm93c2VyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cbmNsYXNzIEVzcmlUaWxlTGF5ZXIgZXh0ZW5kcyBUaWxlTGF5ZXIge1xuXG4gICAgcHJpdmF0ZSBfdXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NycyA6IGFueTtcbiAgICBwcml2YXRlIGVzcmlQYXJhbXMgOiBhbnk7XG4gICAgcHJpdmF0ZSBkZWZhdWx0RVNSSVBhcmFtcyA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKHVybCwgb3B0aW9ucykgeyAvLyAoU3RyaW5nLCBPYmplY3QpXG5cbiAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIgd2FzIG5vdCBjb25maWd1cmVkIHdpdGggYSBVUkxcIik7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0RVNSSVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGxheWVyczogICAgICAgJycsIC8vPXNob3c6MCwxLDJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiAgdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogICAgICAgJ3BuZzMyJyxcbiAgICAgICAgICAgIGY6ICAgICAgICAgICAgJ2ltYWdlJ1xuICAgICAgICAgICAgLy8gc3JzOiAgICAgICAgICAnNDMyNicsXG4gICAgICAgICAgICAvLyBiYm94c3I6ICAgICAgICc0MzI2JyxcbiAgICAgICAgICAgIC8vIGJib3g6ICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIC8vIHNpemU6ICAgICAgICAgJzI1NiwyNTYnLFxuICAgICAgICAgICAgLy8gaW1hZ2VzcjogICAgICAnNDMyNidcbiAgICAgICAgfTtcblxuICAgICAgICBpZih1cmwuaW5kZXhPZihcIi9leHBvcnRcIikgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcWlkeCA9IHVybC5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgICAgIGlmKHFpZHggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCBxaWR4KSArICcvZXhwb3J0JyArIHVybC5zdWJzdHJpbmcocWlkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSAnL2V4cG9ydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuXG4gICAgICAgIGxldCBlc3JpUGFyYW1zIDogYW55ID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEVTUklQYXJhbXMpLFxuICAgICAgICAgICAgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcblxuICAgICAgICBsZXQgZGltO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIGRpbSA9IGVzcmlQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGltID0gZXNyaVBhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlc3JpUGFyYW1zLnNpemUgPSBkaW0gKyAnLCcgKyBkaW07XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01TIHBhcmFtc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJ2NycycpIHtcbiAgICAgICAgICAgICAgICBlc3JpUGFyYW1zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGF5ZXIgaWRzXG4gICAgICAgIC8vIGVzcmlQYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgZXNyaVBhcmFtcy5sYXllcnM7XG5cbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zID0gZXNyaVBhcmFtcztcblxuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICB9XG5cbiAgICBvbkFkZCAobWFwIDogTWFwKSA6IHRoaXMge1xuICAgICAgICB0aGlzLl9jcnMgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY3JzIHx8IChtYXAub3B0aW9ucyBhcyBhbnkpLmNycztcbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zLnNycyA9IHRoaXMuZXNyaVBhcmFtcy5pbWFnZXNyID0gdGhpcy5lc3JpUGFyYW1zLmJib3hzciA9IHRoaXMuX2Nycy5jb2RlO1xuICAgICAgICByZXR1cm4gc3VwZXIub25BZGQobWFwKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlVXJsICh0aWxlUG9pbnQgOiBDb29yZHMgKSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcblxuICAgICAgICBsZXQgbWFwID0gdGhpcy5fbWFwLFxuICAgICAgICAgICAgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemUgYXMgbnVtYmVyLFxuXG4gICAgICAgIG53UG9pbnQgPSB0aWxlUG9pbnQubXVsdGlwbHlCeSh0aWxlU2l6ZSksXG4gICAgICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChbdGlsZVNpemUsIHRpbGVTaXplXSksXG5cbiAgICAgICAgbncgPSB0aGlzLl9jcnMucHJvamVjdChtYXAudW5wcm9qZWN0KG53UG9pbnQsIHRpbGVQb2ludC56KSksXG4gICAgICAgIHNlID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChzZVBvaW50LCB0aWxlUG9pbnQueikpLFxuICAgICAgICBiYm94ID0gW253LngsIHNlLnksIHNlLngsIG53LnldLmpvaW4oJywnKSxcblxuICAgICAgICB1cmwgPSBVdGlsLnRlbXBsYXRlKHRoaXMuX3VybCwge3M6IHRoaXMuX2dldFN1YmRvbWFpbih0aWxlUG9pbnQpfSk7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmVzcmlQYXJhbXMpO1xuICAgICAgICBwYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgcGFyYW1zLmxheWVycztcblxuICAgICAgICAvL2NvbnZlcnQgdG8gZXNyaS1zcGVjaWFsIFNSIGZvciBzcGhlcmljYWwgbWVyY2F0b3JcbiAgICAgICAgaWYocGFyYW1zLmJib3hzciA9PT0gJ0VQU0c6Mzg1NycpXG4gICAgICAgICAgICBwYXJhbXMuYmJveHNyID0gJzEwMjEwMCc7XG4gICAgICAgIGlmKHBhcmFtcy5pbWFnZXNyID09PSAnRVBTRzozODU3JylcbiAgICAgICAgICAgIHBhcmFtcy5pbWFnZXNyID0gJzEwMjEwMCc7XG5cbiAgICAgICAgcmV0dXJuIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpICsgJyZCQk9YPScgKyBiYm94O1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLmVzcmlQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG59XG5cbmlmKCh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLkVTUkkgPSBFc3JpVGlsZUxheWVyO1xuICAgIEwudGlsZUxheWVyLmVzcmkgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5UaWxlTGF5ZXIuRVNSSSh1cmwsIG9wdGlvbnMpO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzcmlUaWxlTGF5ZXI7XG4iXX0=