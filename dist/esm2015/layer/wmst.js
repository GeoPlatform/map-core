/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import { Config } from '@geoplatform/client';
import WMS from './wms';
class WMST extends L.TimeDimension.Layer.WMS {
    /**
     * @param {?} layer
     * @param {?=} opts
     */
    constructor(layer, opts) {
        super(layer, opts);
    }
    /**
     * @param {?} xml
     * @return {?}
     */
    _parseTimeDimensionFromCapabilities(xml) {
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
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    _getTimesFromLayerCapabilities(layer) {
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
    }
}
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
    let service = gpLayer.services[0];
    /** @type {?} */
    let url = service.href;
    if (!url) {
        throw new Error("WMST Layer's service does not defined a service url");
    }
    /** @type {?} */
    let opts = {
        layers: gpLayer.layerName,
        transparent: true,
        format: "image/png",
        wmvId: gpLayer.layerId
    };
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    /** @type {?} */
    let leafletLayer = new WMS(url, opts);
    /** @type {?} */
    let proxyUrl = Config["ualUrl"] + '/api/services/' +
        service.id + '/proxy/capabilities';
    /** @type {?} */
    let tdOpts = { times: null };
    if (gpLayer.temporal) {
        /** @type {?} */
        let d1 = gpLayer.temporal.startDate ?
            new Date(gpLayer.temporal.startDate) : new Date();
        /** @type {?} */
        let d2 = gpLayer.temporal.endDate ?
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
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.WMST = WMST;
    L.tileLayer.wmst = wmst;
}
export { WMST as default, WMST, wmst };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxzREFBc0QsQ0FBQztBQUc5RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFM0MsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDO0FBSXhCLFVBQVcsU0FBUyxDQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7OztJQUlqRCxZQUFZLEtBQXFCLEVBQUUsSUFBVztRQUMxQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RCOzs7OztJQUdELG1DQUFtQyxDQUFFLEdBQUc7O1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOztRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTztZQUMzQixJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDdkQsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLFVBQVUs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QUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDMUIsYUFBYSxFQUFFLElBQUksbUJBQUMsQ0FBUSxFQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuRCxLQUFLLEVBQUUsUUFBUTtLQUNsQixDQUFDLENBQUM7Q0FDTjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixNQUFNLENBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUMzQjtBQUVELE9BQU8sRUFDSCxJQUFJLElBQUksT0FBTyxFQUNmLElBQUksRUFDSixJQUFJLEVBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUaWxlTGF5ZXIsIHRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICdsZWFmbGV0LXRpbWVkaW1lbnNpb24vZGlzdC9sZWFmbGV0LnRpbWVkaW1lbnNpb24uc3JjJztcbi8vIGltcG9ydCB7IFRpbWVEaW1lbnNpb24sIHRpbWVEaW1lbnNpb24gfSBmcm9tIFwiLi4vbGlicy9MLlRpbWVEaW1lbnNpb25cIjtcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgV01TIGZyb20gJy4vd21zJztcblxuXG5cbmNsYXNzIFdNU1QgZXh0ZW5kcyAoTCBhcyBhbnkpLlRpbWVEaW1lbnNpb24uTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2Jhc2VMYXllciA6IFRpbGVMYXllci5XTVNcblxuICAgIGNvbnN0cnVjdG9yKGxheWVyIDogVGlsZUxheWVyLldNUywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIobGF5ZXIsIG9wdHMpO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gcXVlcnkgYWxsIExheWVycyAod2hldGhlciBxdWVyeWFibGUgb3Igbm90KVxuICAgIF9wYXJzZVRpbWVEaW1lbnNpb25Gcm9tQ2FwYWJpbGl0aWVzICh4bWwpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHhtbC5xdWVyeVNlbGVjdG9yQWxsKCdMYXllcicpO1xuICAgICAgICB2YXIgbGF5ZXJOYW1lID0gdGhpcy5fYmFzZUxheWVyLndtc1BhcmFtcy5sYXllcnM7XG4gICAgICAgIHZhciBsYXllciA9IG51bGw7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG5cbiAgICAgICAgbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQucXVlcnlTZWxlY3RvcihcIk5hbWVcIikuaW5uZXJIVE1MID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IGN1cnJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIpO1xuICAgICAgICAgICAgaWYgKCF0aW1lcykge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gdGhpcy5fZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMobGF5ZXIucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBmYWxsIGJhY2sgaWYgRGltZW5zaW9uIGlzIHByb3ZpZGVkIGJ1dCBoYXMgbm8gdmFsdWVzXG4gICAgX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzIChsYXllcikge1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJEaW1lbnNpb25bbmFtZT0ndGltZSddXCIpO1xuICAgICAgICBpZiAoZGltZW5zaW9ucyAmJiBkaW1lbnNpb25zLmxlbmd0aCAmJiBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGltZXMgPSBkaW1lbnNpb25zWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGltZXMgfHwgIXRpbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGV4dGVudHMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRXh0ZW50W25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgICAgIGlmIChleHRlbnRzICYmIGV4dGVudHMubGVuZ3RoICYmIGV4dGVudHNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSBleHRlbnRzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aW1lcyAmJiB+dGltZXMuaW5kZXhPZihcImN1cnJlbnRcIikpIHtcbiAgICAgICAgICAgIHRpbWVzID0gdGltZXMucmVwbGFjZSgnY3VycmVudCcsIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxufVxuXG5cblxuXG5mdW5jdGlvbiB3bXN0KGdwTGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gZ3BMYXllci5zZXJ2aWNlc1swXTtcbiAgICBsZXQgdXJsID0gc2VydmljZS5ocmVmO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVNUIExheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIGxheWVyczogZ3BMYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgIHdtdklkOiBncExheWVyLmxheWVySWRcbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IGxlYWZsZXRMYXllciA9IG5ldyBXTVMoIHVybCwgb3B0cyApO1xuXG4gICAgbGV0IHByb3h5VXJsID0gQ29uZmlnLnVhbFVybCArICcvYXBpL3NlcnZpY2VzLycgK1xuICAgICAgICBzZXJ2aWNlLmlkICsgJy9wcm94eS9jYXBhYmlsaXRpZXMnO1xuXG4gICAgbGV0IHRkT3B0cyA9IHsgdGltZXMgOiBudWxsIH07XG5cbiAgICBpZihncExheWVyLnRlbXBvcmFsKSB7XG5cbiAgICAgICAgbGV0IGQxID0gZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5zdGFydERhdGUpIDogbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IGQyID0gZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRkT3B0cy50aW1lcyA9IGQxLnRvSVNPU3RyaW5nKCkgKyAnLycgKyBkMi50b0lTT1N0cmluZygpICsgJy9QMUQnO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TVChsZWFmbGV0TGF5ZXIsIHtcbiAgICAgICAgdGltZURpbWVuc2lvbjogbmV3IChMIGFzIGFueSkuVGltZURpbWVuc2lvbih0ZE9wdHMpLFxuICAgICAgICBwcm94eTogcHJveHlVcmxcbiAgICB9KTtcbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVNUID0gV01TVDtcbiAgICBMLnRpbGVMYXllci53bXN0ID0gd21zdDtcbn1cblxuZXhwb3J0IHtcbiAgICBXTVNUIGFzIGRlZmF1bHQsXG4gICAgV01TVCxcbiAgICB3bXN0XG59O1xuIl19