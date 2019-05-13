/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import { Config } from 'geoplatform.client';
import WMS from './wms';
var WMST = /** @class */ (function (_super) {
    tslib_1.__extends(WMST, _super);
    function WMST(layer, opts) {
        return _super.call(this, layer, opts) || this;
    }
    //override default parser to query all Layers (whether queryable or not)
    /**
     * @param {?} xml
     * @return {?}
     */
    WMST.prototype._parseTimeDimensionFromCapabilities = /**
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
        layers.forEach(function (current) {
            if (current.querySelector("Name").innerHTML === layerName) {
                layer = current;
            }
        });
        if (layer) {
            times = this._getTimesFromLayerCapabilities(layer);
            if (!times) {
                times = this._getTimesFromLayerCapabilities(layer.parentNode);
            }
        }
        return times;
    };
    //override default parser to fall back if Dimension is provided but has no values
    /**
     * @param {?} layer
     * @return {?}
     */
    WMST.prototype._getTimesFromLayerCapabilities = /**
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
}(L.TimeDimension.Layer.WMS));
if (false) {
    /** @type {?} */
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
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
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
        timeDimension: new (/** @type {?} */ (L)).TimeDimension(tdOpts),
        proxy: proxyUrl
    });
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.TileLayer.WMST = WMST;
    L_1.tileLayer.wmst = wmst;
}
export { WMST as default, WMST, wmst };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbImxheWVyL3dtc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBSXRCLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sc0RBQXNELENBQUM7QUFHOUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTFDLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztBQVd4QixJQUFBO0lBQW1CLGdDQUFrQztJQUlqRCxjQUFZLEtBQXFCLEVBQUUsSUFBVztlQUMxQyxrQkFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDO0tBQ3JCO0lBRUQsd0VBQXdFOzs7OztJQUN4RSxrREFBbUM7Ozs7SUFBbkMsVUFBcUMsR0FBRzs7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPO1lBQzNCLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUN2RCxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1Is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QUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVwRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztLQUNyRTtJQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzFCLGFBQWEsRUFBRSxJQUFJLG1CQUFDLENBQVEsRUFBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDbkQsS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0NBQ047QUFFRCxJQUFJLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRzs7SUFDcEIsSUFBTSxHQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGlsZUxheWVyLCB0aWxlTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAnbGVhZmxldC10aW1lZGltZW5zaW9uL2Rpc3QvbGVhZmxldC50aW1lZGltZW5zaW9uLnNyYyc7XG4vLyBpbXBvcnQgeyBUaW1lRGltZW5zaW9uLCB0aW1lRGltZW5zaW9uIH0gZnJvbSBcIi4uL2xpYnMvTC5UaW1lRGltZW5zaW9uXCI7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5pbXBvcnQgV01TIGZyb20gJy4vd21zJztcblxuLy8gZnVuY3Rpb24gdGRQb2x5RmlsbChvcHRpb25zKSB7XG4vLyAgICAgcmV0dXJuIG5ldyBXTVNUKG9wdGlvbnMpO1xuLy8gfVxuLy9cbi8vIHZhciBUaW1lRGltZW5zaW9uID0gTC5UaW1lRGltZW5zaW9uO1xuLy8gdmFyIHRpbWVEaW1lbnNpb24gPSBMLnRpbWVEaW1lbnNpb24gfHwgdGRQb2x5RmlsbDtcblxuLy8gdmFyIFdNU1QgPSAoVGltZURpbWVuc2lvbiAmJiBUaW1lRGltZW5zaW9uLkxheWVyIHx8IFRpbGVMYXllcikuV01TLmV4dGVuZCh7XG5cbmNsYXNzIFdNU1QgZXh0ZW5kcyAoTCBhcyBhbnkpLlRpbWVEaW1lbnNpb24uTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2Jhc2VMYXllciA6IFRpbGVMYXllci5XTVNcblxuICAgIGNvbnN0cnVjdG9yKGxheWVyIDogVGlsZUxheWVyLldNUywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIobGF5ZXIsIG9wdHMpO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gcXVlcnkgYWxsIExheWVycyAod2hldGhlciBxdWVyeWFibGUgb3Igbm90KVxuICAgIF9wYXJzZVRpbWVEaW1lbnNpb25Gcm9tQ2FwYWJpbGl0aWVzICh4bWwpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHhtbC5xdWVyeVNlbGVjdG9yQWxsKCdMYXllcicpO1xuICAgICAgICB2YXIgbGF5ZXJOYW1lID0gdGhpcy5fYmFzZUxheWVyLndtc1BhcmFtcy5sYXllcnM7XG4gICAgICAgIHZhciBsYXllciA9IG51bGw7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG5cbiAgICAgICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQucXVlcnlTZWxlY3RvcihcIk5hbWVcIikuaW5uZXJIVE1MID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIpO1xuICAgICAgICAgICAgaWYgKCF0aW1lcykge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBmYWxsIGJhY2sgaWYgRGltZW5zaW9uIGlzIHByb3ZpZGVkIGJ1dCBoYXMgbm8gdmFsdWVzXG4gICAgX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzIChsYXllcikge1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJEaW1lbnNpb25bbmFtZT0ndGltZSddXCIpO1xuICAgICAgICBpZiAoZGltZW5zaW9ucyAmJiBkaW1lbnNpb25zLmxlbmd0aCAmJiBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGltZXMgPSBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGltZXMgfHwgIXRpbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRXh0ZW50W25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgICAgIGlmIChleHRlbnRzICYmIGV4dGVudHMubGVuZ3RoICYmIGV4dGVudHNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSBleHRlbnRzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aW1lcyAmJiB+dGltZXMuaW5kZXhPZihcImN1cnJlbnRcIikpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMucmVwbGFjZSgnY3VycmVudCcsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXN0KGdwTGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gZ3BMYXllci5zZXJ2aWNlc1swXTtcbiAgICBsZXQgdXJsID0gc2VydmljZS5ocmVmO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVNUIExheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIGxheWVyczogZ3BMYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHdtdklkOiBncExheWVyLmxheWVySWRcbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IGxlYWZsZXRMYXllciA9IG5ldyBXTVMoIHVybCwgb3B0cyApO1xuXG4gICAgbGV0IHByb3h5VXJsID0gQ29uZmlnLnVhbFVybCArICcvYXBpL3NlcnZpY2VzLycgK1xuICAgICAgICBzZXJ2aWNlLmlkICsgJy9wcm94eS9jYXBhYmlsaXRpZXMnO1xuXG4gICAgbGV0IHRkT3B0cyA9IHsgdGltZXMgOiBudWxsIH07XG5cbiAgICBpZihncExheWVyLnRlbXBvcmFsKSB7XG5cbiAgICAgICAgbGV0IGQxID0gZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUpIDogbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGQyID0gZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRkT3B0cy50aW1lcyA9IGQxLnRvSVNPU3RyaW5nKCkgKyAnLycgKyBkMi50b0lTT1N0cmluZygpICsgJy9QMUQnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TVChsZWFmbGV0TGF5ZXIsIHtcbiAgICAgICAgdGltZURpbWVuc2lvbjogbmV3IChMIGFzIGFueSkuVGltZURpbWVuc2lvbih0ZE9wdHMpLFxuICAgICAgICBwcm94eTogcHJveHlVcmxcbiAgICB9KTtcbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVNUID0gV01TVDtcbiAgICBMLnRpbGVMYXllci53bXN0ID0gd21zdDtcbn1cblxuZXhwb3J0IHtcbiAgICBXTVNUIGFzIGRlZmF1bHQsXG4gICAgV01TVCxcbiAgICB3bXN0XG59O1xuIl19