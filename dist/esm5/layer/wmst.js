/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
// import { TimeDimension, timeDimension } from "../libs/L.TimeDimension";
import { Config } from '@geoplatform/client';
import WMS from './wms';
var WMST = /** @class */ (function (_super) {
    tslib_1.__extends(WMST, _super);
    function WMST(layer, opts) {
        return _super.call(this, layer, opts) || this;
    }
    //override default parser to query all Layers (whether queryable or not)
    //override default parser to query all Layers (whether queryable or not)
    /**
     * @param {?} xml
     * @return {?}
     */
    WMST.prototype._parseTimeDimensionFromCapabilities = 
    //override default parser to query all Layers (whether queryable or not)
    /**
     * @param {?} xml
     * @return {?}
     */
    function (xml) {
        /** @type {?} */
        var layers = xml.querySelectorAll('Layer');
        /** @type {?} */
        var layerName = this._baseLayer.wmsParams.layers;
        /** @type {?} */
        var layer = null;
        /** @type {?} */
        var times = null;
        layers.forEach((/**
         * @param {?} current
         * @return {?}
         */
        function (current) {
            if (current.querySelector("Name").innerHTML === layerName) {
                layer = current;
            }
        }));
        if (layer) {
            times = this._getTimesFromLayerCapabilities(layer);
            if (!times) {
                times = this._getTimesFromLayerCapabilities(layer.parentNode);
            }
        }
        return times;
    };
    //override default parser to fall back if Dimension is provided but has no values
    //override default parser to fall back if Dimension is provided but has no values
    /**
     * @param {?} layer
     * @return {?}
     */
    WMST.prototype._getTimesFromLayerCapabilities = 
    //override default parser to fall back if Dimension is provided but has no values
    /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var times = null;
        /** @type {?} */
        var dimensions = layer.querySelectorAll("Dimension[name='time']");
        if (dimensions && dimensions.length && dimensions[0].textContent.length) {
            times = dimensions[0].textContent.trim();
        }
        if (!times || !times.length) {
            /** @type {?} */
            var extents = layer.querySelectorAll("Extent[name='time']");
            if (extents && extents.length && extents[0].textContent.length) {
                times = extents[0].textContent.trim();
            }
        }
        if (times && ~times.indexOf("current")) {
            times = times.replace('current', new Date().toISOString());
        }
        return times;
    };
    return WMST;
}((L).TimeDimension.Layer.WMS));
if (false) {
    /**
     * @type {?}
     * @private
     */
    WMST.prototype._baseLayer;
}
/**
 * @param {?} gpLayer
 * @return {?}
 */
function wmst(gpLayer) {
    /** @type {?} */
    var service = gpLayer.services[0];
    /** @type {?} */
    var url = service.href;
    if (!url) {
        throw new Error("WMST Layer's service does not defined a service url");
    }
    /** @type {?} */
    var opts = {
        layers: gpLayer.layerName,
        transparent: true,
        format: "image/png",
        wmvId: gpLayer.layerId
    };
    if (Config.leafletPane)
        ((/** @type {?} */ (opts))).pane = Config.leafletPane;
    /** @type {?} */
    var leafletLayer = new WMS(url, opts);
    /** @type {?} */
    var proxyUrl = Config.ualUrl + '/api/services/' +
        service.id + '/proxy/capabilities';
    /** @type {?} */
    var tdOpts = { times: null };
    if (gpLayer.temporal) {
        /** @type {?} */
        var d1 = gpLayer.temporal.startDate ?
            new Date(gpLayer.temporal.startDate) : new Date();
        /** @type {?} */
        var d2 = gpLayer.temporal.endDate ?
            new Date(gpLayer.temporal.endDate) : new Date();
        tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
    }
    return new WMST(leafletLayer, {
        timeDimension: new ((/** @type {?} */ (L))).TimeDimension(tdOpts),
        proxy: proxyUrl
    });
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.TileLayer.WMST = WMST;
    L_1.tileLayer.wmst = wmst;
}
export { WMST as default, WMST, wmst };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sc0RBQXNELENBQUM7O0FBRzlELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzQyxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFJeEI7SUFBbUIsZ0NBQWtDO0lBSWpELGNBQVksS0FBcUIsRUFBRSxJQUFXO2VBQzFDLGtCQUFNLEtBQUssRUFBRSxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELHdFQUF3RTs7Ozs7O0lBQ3hFLGtEQUFtQzs7Ozs7O0lBQW5DLFVBQXFDLEdBQUc7O1lBQ2hDLE1BQU0sR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDOztZQUN0QyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTTs7WUFDNUMsS0FBSyxHQUFHLElBQUk7O1lBQ1osS0FBSyxHQUFHLElBQUk7UUFFaEIsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFTLE9BQU87WUFDM0IsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZELEtBQUssR0FBRyxPQUFPLENBQUM7YUFDbkI7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pFO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNq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QUFDO0tBQ3JFO0lBRUQsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDMUIsYUFBYSxFQUFFLElBQUksQ0FBQyxtQkFBQSxDQUFDLEVBQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDbkQsS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRzs7UUFDZCxHQUFDLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUMzQjtBQUVELE9BQU8sRUFDSCxJQUFJLElBQUksT0FBTyxFQUNmLElBQUksRUFDSixJQUFJLEVBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUaWxlTGF5ZXIsIHRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICdsZWFmbGV0LXRpbWVkaW1lbnNpb24vZGlzdC9sZWFmbGV0LnRpbWVkaW1lbnNpb24uc3JjJztcbi8vIGltcG9ydCB7IFRpbWVEaW1lbnNpb24sIHRpbWVEaW1lbnNpb24gfSBmcm9tIFwiLi4vbGlicy9MLlRpbWVEaW1lbnNpb25cIjtcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgV01TIGZyb20gJy4vd21zJztcblxuXG5cbmNsYXNzIFdNU1QgZXh0ZW5kcyAoTCBhcyBhbnkpLlRpbWVEaW1lbnNpb24uTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2Jhc2VMYXllciA6IFRpbGVMYXllci5XTVNcblxuICAgIGNvbnN0cnVjdG9yKGxheWVyIDogVGlsZUxheWVyLldNUywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIobGF5ZXIsIG9wdHMpO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gcXVlcnkgYWxsIExheWVycyAod2hldGhlciBxdWVyeWFibGUgb3Igbm90KVxuICAgIF9wYXJzZVRpbWVEaW1lbnNpb25Gcm9tQ2FwYWJpbGl0aWVzICh4bWwpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHhtbC5xdWVyeVNlbGVjdG9yQWxsKCdMYXllcicpO1xuICAgICAgICB2YXIgbGF5ZXJOYW1lID0gdGhpcy5fYmFzZUxheWVyLndtc1BhcmFtcy5sYXllcnM7XG4gICAgICAgIHZhciBsYXllciA9IG51bGw7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG5cbiAgICAgICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQucXVlcnlTZWxlY3RvcihcIk5hbWVcIikuaW5uZXJIVE1MID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIpO1xuICAgICAgICAgICAgaWYgKCF0aW1lcykge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBmYWxsIGJhY2sgaWYgRGltZW5zaW9uIGlzIHByb3ZpZGVkIGJ1dCBoYXMgbm8gdmFsdWVzXG4gICAgX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzIChsYXllcikge1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJEaW1lbnNpb25bbmFtZT0ndGltZSddXCIpO1xuICAgICAgICBpZiAoZGltZW5zaW9ucyAmJiBkaW1lbnNpb25zLmxlbmd0aCAmJiBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGltZXMgPSBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGltZXMgfHwgIXRpbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRXh0ZW50W25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgICAgIGlmIChleHRlbnRzICYmIGV4dGVudHMubGVuZ3RoICYmIGV4dGVudHNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSBleHRlbnRzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aW1lcyAmJiB+dGltZXMuaW5kZXhPZihcImN1cnJlbnRcIikpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMucmVwbGFjZSgnY3VycmVudCcsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXN0KGdwTGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gZ3BMYXllci5zZXJ2aWNlc1swXTtcbiAgICBsZXQgdXJsID0gc2VydmljZS5ocmVmO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVNUIExheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIGxheWVyczogZ3BMYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHdtdklkOiBncExheWVyLmxheWVySWRcbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IGxlYWZsZXRMYXllciA9IG5ldyBXTVMoIHVybCwgb3B0cyApO1xuXG4gICAgbGV0IHByb3h5VXJsID0gQ29uZmlnLnVhbFVybCArICcvYXBpL3NlcnZpY2VzLycgK1xuICAgICAgICBzZXJ2aWNlLmlkICsgJy9wcm94eS9jYXBhYmlsaXRpZXMnO1xuXG4gICAgbGV0IHRkT3B0cyA9IHsgdGltZXMgOiBudWxsIH07XG5cbiAgICBpZihncExheWVyLnRlbXBvcmFsKSB7XG5cbiAgICAgICAgbGV0IGQxID0gZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUpIDogbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGQyID0gZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRkT3B0cy50aW1lcyA9IGQxLnRvSVNPU3RyaW5nKCkgKyAnLycgKyBkMi50b0lTT1N0cmluZygpICsgJy9QMUQnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TVChsZWFmbGV0TGF5ZXIsIHtcbiAgICAgICAgdGltZURpbWVuc2lvbjogbmV3IChMIGFzIGFueSkuVGltZURpbWVuc2lvbih0ZE9wdHMpLFxuICAgICAgICBwcm94eTogcHJveHlVcmxcbiAgICB9KTtcbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVNUID0gV01TVDtcbiAgICBMLnRpbGVMYXllci53bXN0ID0gd21zdDtcbn1cblxuZXhwb3J0IHtcbiAgICBXTVNUIGFzIGRlZmF1bHQsXG4gICAgV01TVCxcbiAgICB3bXN0XG59O1xuIl19