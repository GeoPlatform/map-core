/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        if (!url)
            throw new Error("Layer was not configured with a URL");
        this.defaultESRIParams = {
            layers: '',
            //=show:0,1,2
            transparent: true,
            format: 'png32',
            f: 'image'
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            // imagesr:      '4326'
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
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    EsriTileLayer.prototype.onAdd = /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    function (map) {
        (/** @type {?} */ (this))._crs = ((/** @type {?} */ ((/** @type {?} */ (this)).options))).crs || ((/** @type {?} */ (map.options))).crs;
        (/** @type {?} */ (this)).esriParams.srs = (/** @type {?} */ (this)).esriParams.imagesr = (/** @type {?} */ (this)).esriParams.bboxsr = (/** @type {?} */ (this))._crs.code;
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
        // (Point, Number) -> String
        /** @type {?} */
        var map = this._map;
        /** @type {?} */
        var tileSize = (/** @type {?} */ (this.options.tileSize));
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
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    EsriTileLayer.prototype.setParams = /**
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    function (params, noRedraw) {
        Util.extend((/** @type {?} */ (this)).esriParams, params);
        if (!noRedraw) {
            (/** @type {?} */ (this)).redraw();
        }
        return (/** @type {?} */ (this));
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
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype._url;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype._crs;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype.esriParams;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype.defaultESRIParams;
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.TileLayer.ESRI = EsriTileLayer;
    L_1.tileLayer.esri = (/**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
        return new L_1.TileLayer.ESRI(url, options);
    });
}
export default EsriTileLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS10aWxlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9lc3JpLXRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQU8sU0FBUyxFQUE0QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBS2xGO0lBQTRCLHlDQUFTO0lBT2pDLHVCQUFZLEdBQUcsRUFBRSxPQUFPO2VBQ3BCLGtCQUFNLEdBQUcsRUFBRSxPQUFPLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBRUQsa0NBQVU7Ozs7O0lBQVYsVUFBWSxHQUFHLEVBQUUsT0FBTztRQUVwQixJQUFHLENBQUMsR0FBRztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsaUJBQWlCLEdBQUc7WUFDckIsTUFBTSxFQUFRLEVBQUU7O1lBQ2hCLFdBQVcsRUFBRyxJQUFJO1lBQ2xCLE1BQU0sRUFBUSxPQUFPO1lBQ3JCLENBQUMsRUFBYSxPQUFPO1lBQ3JCLHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLDJCQUEyQjtZQUMzQix1QkFBdUI7U0FDMUIsQ0FBQztRQUVGLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNULEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDSCxHQUFHLElBQUksU0FBUyxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7WUFFWixVQUFVLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDOztZQUMxRCxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7O1lBRXBELEdBQUc7UUFDUCxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN4QyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDdEM7UUFDRCxVQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxDLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ25CLDJEQUEyRDtZQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDaEQsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QjtTQUNKO1FBRUQsV0FBVztRQUNYLG1EQUFtRDtRQUVuRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVuQyxDQUFDOzs7Ozs7O0lBRUQsNkJBQUs7Ozs7OztJQUFMLFVBQU8sR0FBUztRQUNaLG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksR0FBRyxDQUFDLG1CQUFBLG1CQUFBLElBQUksRUFBQSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQUEsR0FBRyxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2xFLG1CQUFBLElBQUksRUFBQSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEYsT0FBTyxpQkFBTSxLQUFLLFlBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVksU0FBa0I7OztZQUV0QixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUk7O1lBQ2YsUUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFVOztZQUU5QyxPQUFPLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7O1lBQ3hDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUUzQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMzRCxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUMzRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7WUFFekMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUM7O1lBRTlELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFeEMsbURBQW1EO1FBQ25ELElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxXQUFXO1lBQzVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQzdCLElBQUcsTUFBTSxDQUFDLE9BQU8sS0FBSyxXQUFXO1lBQzdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBRTlCLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQzFFLENBQUM7Ozs7Ozs7O0lBRUQsaUNBQVM7Ozs7Ozs7SUFBVCxVQUFXLE1BQU0sRUFBRSxRQUFRO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFBLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtRQUNELE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxxQ0FBYTs7OztJQUFiLFVBQWUsU0FBaUI7O1lBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU07UUFDaEYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBNUdELENBQTRCLFNBQVMsR0E0R3BDOzs7Ozs7SUExR0csNkJBQXNCOzs7OztJQUN0Qiw2QkFBbUI7Ozs7O0lBQ25CLG1DQUF5Qjs7Ozs7SUFDekIsMENBQWdDOztBQXlHcEMsSUFBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFFOztRQUNaLEdBQUMsR0FBRyxDQUFDLG1CQUFBLE1BQU0sRUFBTyxDQUFDLENBQUMsQ0FBQztJQUMzQixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7SUFDakMsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJOzs7OztJQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87UUFDckMsT0FBTyxJQUFJLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUEsQ0FBQztDQUNMO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIFBvaW50LCBDb29yZHMsIEJyb3dzZXIsIFV0aWwgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbmNsYXNzIEVzcmlUaWxlTGF5ZXIgZXh0ZW5kcyBUaWxlTGF5ZXIge1xuXG4gICAgcHJpdmF0ZSBfdXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NycyA6IGFueTtcbiAgICBwcml2YXRlIGVzcmlQYXJhbXMgOiBhbnk7XG4gICAgcHJpdmF0ZSBkZWZhdWx0RVNSSVBhcmFtcyA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKHVybCwgb3B0aW9ucykgeyAvLyAoU3RyaW5nLCBPYmplY3QpXG5cbiAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIgd2FzIG5vdCBjb25maWd1cmVkIHdpdGggYSBVUkxcIik7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0RVNSSVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGxheWVyczogICAgICAgJycsIC8vPXNob3c6MCwxLDJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiAgdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogICAgICAgJ3BuZzMyJyxcbiAgICAgICAgICAgIGY6ICAgICAgICAgICAgJ2ltYWdlJ1xuICAgICAgICAgICAgLy8gc3JzOiAgICAgICAgICAnNDMyNicsXG4gICAgICAgICAgICAvLyBiYm94c3I6ICAgICAgICc0MzI2JyxcbiAgICAgICAgICAgIC8vIGJib3g6ICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIC8vIHNpemU6ICAgICAgICAgJzI1NiwyNTYnLFxuICAgICAgICAgICAgLy8gaW1hZ2VzcjogICAgICAnNDMyNidcbiAgICAgICAgfTtcblxuICAgICAgICBpZih1cmwuaW5kZXhPZihcIi9leHBvcnRcIikgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcWlkeCA9IHVybC5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgICAgIGlmKHFpZHggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCBxaWR4KSArICcvZXhwb3J0JyArIHVybC5zdWJzdHJpbmcocWlkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSAnL2V4cG9ydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuXG4gICAgICAgIGxldCBlc3JpUGFyYW1zIDogYW55ID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEVTUklQYXJhbXMpLFxuICAgICAgICAgICAgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcblxuICAgICAgICBsZXQgZGltO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIGRpbSA9IGVzcmlQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGltID0gZXNyaVBhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlc3JpUGFyYW1zLnNpemUgPSBkaW0gKyAnLCcgKyBkaW07XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01TIHBhcmFtc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJ2NycycpIHtcbiAgICAgICAgICAgICAgICBlc3JpUGFyYW1zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGF5ZXIgaWRzXG4gICAgICAgIC8vIGVzcmlQYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgZXNyaVBhcmFtcy5sYXllcnM7XG5cbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zID0gZXNyaVBhcmFtcztcblxuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICB9XG5cbiAgICBvbkFkZCAobWFwIDogTWFwKSA6IHRoaXMge1xuICAgICAgICB0aGlzLl9jcnMgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY3JzIHx8IChtYXAub3B0aW9ucyBhcyBhbnkpLmNycztcbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zLnNycyA9IHRoaXMuZXNyaVBhcmFtcy5pbWFnZXNyID0gdGhpcy5lc3JpUGFyYW1zLmJib3hzciA9IHRoaXMuX2Nycy5jb2RlO1xuICAgICAgICByZXR1cm4gc3VwZXIub25BZGQobWFwKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlVXJsICh0aWxlUG9pbnQgOiBDb29yZHMgKSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcblxuICAgICAgICBsZXQgbWFwID0gdGhpcy5fbWFwLFxuICAgICAgICAgICAgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemUgYXMgbnVtYmVyLFxuXG4gICAgICAgIG53UG9pbnQgPSB0aWxlUG9pbnQubXVsdGlwbHlCeSh0aWxlU2l6ZSksXG4gICAgICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChbdGlsZVNpemUsIHRpbGVTaXplXSksXG5cbiAgICAgICAgbncgPSB0aGlzLl9jcnMucHJvamVjdChtYXAudW5wcm9qZWN0KG53UG9pbnQsIHRpbGVQb2ludC56KSksXG4gICAgICAgIHNlID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChzZVBvaW50LCB0aWxlUG9pbnQueikpLFxuICAgICAgICBiYm94ID0gW253LngsIHNlLnksIHNlLngsIG53LnldLmpvaW4oJywnKSxcblxuICAgICAgICB1cmwgPSBVdGlsLnRlbXBsYXRlKHRoaXMuX3VybCwge3M6IHRoaXMuX2dldFN1YmRvbWFpbih0aWxlUG9pbnQpfSk7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmVzcmlQYXJhbXMpO1xuICAgICAgICBwYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgcGFyYW1zLmxheWVycztcblxuICAgICAgICAvL2NvbnZlcnQgdG8gZXNyaS1zcGVjaWFsIFNSIGZvciBzcGhlcmljYWwgbWVyY2F0b3JcbiAgICAgICAgaWYocGFyYW1zLmJib3hzciA9PT0gJ0VQU0c6Mzg1NycpXG4gICAgICAgICAgICBwYXJhbXMuYmJveHNyID0gJzEwMjEwMCc7XG4gICAgICAgIGlmKHBhcmFtcy5pbWFnZXNyID09PSAnRVBTRzozODU3JylcbiAgICAgICAgICAgIHBhcmFtcy5pbWFnZXNyID0gJzEwMjEwMCc7XG5cbiAgICAgICAgcmV0dXJuIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpICsgJyZCQk9YPScgKyBiYm94O1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLmVzcmlQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG59XG5cbmlmKCh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLkVTUkkgPSBFc3JpVGlsZUxheWVyO1xuICAgIEwudGlsZUxheWVyLmVzcmkgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5UaWxlTGF5ZXIuRVNSSSh1cmwsIG9wdGlvbnMpO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzcmlUaWxlTGF5ZXI7XG4iXX0=