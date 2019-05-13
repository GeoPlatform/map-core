/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as TimeDimension from 'leaflet-timedimension/dist/leaflet.timedimension.min';
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
}(TimeDimension.Layer.WMS));
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
        timeDimension: new TimeDimension(tdOpts),
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbImxheWVyL3dtc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBTXRCLE9BQU8sS0FBSyxhQUFhLE1BQU0sc0RBQXNELENBQUM7QUFHdEYsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRTFDLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztBQVd4QixJQUFBO0lBQW1CLGdDQUF1QjtJQUl0QyxjQUFZLEtBQXFCLEVBQUUsSUFBVztlQUMxQyxrQkFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDO0tBQ3JCO0lBRUQsd0VBQXdFOzs7OztJQUN4RSxrREFBbUM7Ozs7SUFBbkMsVUFBcUMsR0FBRzs7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPO1lBQzNCLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUN2RCxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxHQUFHLElBQUksQ0FBQyw4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RSxDQUFDO1FBRXBELE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDO0tBQ3JFO0lBRUQsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDMUIsYUFBYSxFQUFFLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxLQUFLLEVBQUUsUUFBUTtLQUNsQixDQUFDLENBQUM7Q0FDTjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixJQUFNLEdBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUMzQjtBQUVELE9BQU8sRUFDSCxJQUFJLElBQUksT0FBTyxFQUNmLElBQUksRUFDSixJQUFJLEVBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUaWxlTGF5ZXIsIHRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICogYXMgVGltZURpbWVuc2lvbiBmcm9tICdsZWFmbGV0LXRpbWVkaW1lbnNpb24vZGlzdC9sZWFmbGV0LnRpbWVkaW1lbnNpb24ubWluJztcbi8vIGltcG9ydCB7IFRpbWVEaW1lbnNpb24sIHRpbWVEaW1lbnNpb24gfSBmcm9tIFwiLi4vbGlicy9MLlRpbWVEaW1lbnNpb25cIjtcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbmltcG9ydCBXTVMgZnJvbSAnLi93bXMnO1xuXG4vLyBmdW5jdGlvbiB0ZFBvbHlGaWxsKG9wdGlvbnMpIHtcbi8vICAgICByZXR1cm4gbmV3IFdNU1Qob3B0aW9ucyk7XG4vLyB9XG4vL1xuLy8gdmFyIFRpbWVEaW1lbnNpb24gPSBMLlRpbWVEaW1lbnNpb247XG4vLyB2YXIgdGltZURpbWVuc2lvbiA9IEwudGltZURpbWVuc2lvbiB8fCB0ZFBvbHlGaWxsO1xuXG4vLyB2YXIgV01TVCA9IChUaW1lRGltZW5zaW9uICYmIFRpbWVEaW1lbnNpb24uTGF5ZXIgfHwgVGlsZUxheWVyKS5XTVMuZXh0ZW5kKHtcblxuY2xhc3MgV01TVCBleHRlbmRzIFRpbWVEaW1lbnNpb24uTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2Jhc2VMYXllciA6IFRpbGVMYXllci5XTVNcblxuICAgIGNvbnN0cnVjdG9yKGxheWVyIDogVGlsZUxheWVyLldNUywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIobGF5ZXIsIG9wdHMpO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gcXVlcnkgYWxsIExheWVycyAod2hldGhlciBxdWVyeWFibGUgb3Igbm90KVxuICAgIF9wYXJzZVRpbWVEaW1lbnNpb25Gcm9tQ2FwYWJpbGl0aWVzICh4bWwpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHhtbC5xdWVyeVNlbGVjdG9yQWxsKCdMYXllcicpO1xuICAgICAgICB2YXIgbGF5ZXJOYW1lID0gdGhpcy5fYmFzZUxheWVyLndtc1BhcmFtcy5sYXllcnM7XG4gICAgICAgIHZhciBsYXllciA9IG51bGw7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG5cbiAgICAgICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQucXVlcnlTZWxlY3RvcihcIk5hbWVcIikuaW5uZXJIVE1MID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIpO1xuICAgICAgICAgICAgaWYgKCF0aW1lcykge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBmYWxsIGJhY2sgaWYgRGltZW5zaW9uIGlzIHByb3ZpZGVkIGJ1dCBoYXMgbm8gdmFsdWVzXG4gICAgX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzIChsYXllcikge1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJEaW1lbnNpb25bbmFtZT0ndGltZSddXCIpO1xuICAgICAgICBpZiAoZGltZW5zaW9ucyAmJiBkaW1lbnNpb25zLmxlbmd0aCAmJiBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGltZXMgPSBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGltZXMgfHwgIXRpbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRXh0ZW50W25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgICAgIGlmIChleHRlbnRzICYmIGV4dGVudHMubGVuZ3RoICYmIGV4dGVudHNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSBleHRlbnRzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aW1lcyAmJiB+dGltZXMuaW5kZXhPZihcImN1cnJlbnRcIikpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMucmVwbGFjZSgnY3VycmVudCcsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXN0KGdwTGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gZ3BMYXllci5zZXJ2aWNlc1swXTtcbiAgICBsZXQgdXJsID0gc2VydmljZS5ocmVmO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVNUIExheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIGxheWVyczogZ3BMYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHdtdklkOiBncExheWVyLmxheWVySWRcbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IGxlYWZsZXRMYXllciA9IG5ldyBXTVMoIHVybCwgb3B0cyApO1xuXG4gICAgbGV0IHByb3h5VXJsID0gQ29uZmlnLnVhbFVybCArICcvYXBpL3NlcnZpY2VzLycgK1xuICAgICAgICBzZXJ2aWNlLmlkICsgJy9wcm94eS9jYXBhYmlsaXRpZXMnO1xuXG4gICAgbGV0IHRkT3B0cyA9IHsgdGltZXMgOiBudWxsIH07XG5cbiAgICBpZihncExheWVyLnRlbXBvcmFsKSB7XG5cbiAgICAgICAgbGV0IGQxID0gZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUpIDogbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGQyID0gZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRkT3B0cy50aW1lcyA9IGQxLnRvSVNPU3RyaW5nKCkgKyAnLycgKyBkMi50b0lTT1N0cmluZygpICsgJy9QMUQnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TVChsZWFmbGV0TGF5ZXIsIHtcbiAgICAgICAgdGltZURpbWVuc2lvbjogbmV3IFRpbWVEaW1lbnNpb24odGRPcHRzKSxcbiAgICAgICAgcHJveHk6IHByb3h5VXJsXG4gICAgfSk7XG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TVCA9IFdNU1Q7XG4gICAgTC50aWxlTGF5ZXIud21zdCA9IHdtc3Q7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TVCBhcyBkZWZhdWx0LFxuICAgIFdNU1QsXG4gICAgd21zdFxufTtcbiJdfQ==