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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFJdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxzREFBc0QsQ0FBQztBQUc5RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFMUMsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDO0FBV3hCLElBQUE7SUFBbUIsZ0NBQWtDO0lBSWpELGNBQVksS0FBcUIsRUFBRSxJQUFXO2VBQzFDLGtCQUFNLEtBQUssRUFBRSxJQUFJLENBQUM7S0FDckI7SUFFRCx3RUFBd0U7Ozs7O0lBQ3hFLGtEQUFtQzs7OztJQUFuQyxVQUFxQyxHQUFHOztRQUNwQyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBQzNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztRQUNqQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQU87WUFDM0IsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZELEtBQUssR0FBRyxPQUFPLENBQUM7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLEtBQUssRUFBRTtZQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssRUFBRTtn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QU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXBELE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDO0tBQ3JFO0lBRUQsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDMUIsYUFBYSxFQUFFLElBQUksbUJBQUMsQ0FBUSxFQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuRCxLQUFLLEVBQUUsUUFBUTtLQUNsQixDQUFDLENBQUM7Q0FDTjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixJQUFNLEdBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUMzQjtBQUVELE9BQU8sRUFDSCxJQUFJLElBQUksT0FBTyxFQUNmLElBQUksRUFDSixJQUFJLEVBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBUaWxlTGF5ZXIsIHRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICdsZWFmbGV0LXRpbWVkaW1lbnNpb24vZGlzdC9sZWFmbGV0LnRpbWVkaW1lbnNpb24uc3JjJztcbi8vIGltcG9ydCB7IFRpbWVEaW1lbnNpb24sIHRpbWVEaW1lbnNpb24gfSBmcm9tIFwiLi4vbGlicy9MLlRpbWVEaW1lbnNpb25cIjtcblxuaW1wb3J0IHtDb25maWd9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbmltcG9ydCBXTVMgZnJvbSAnLi93bXMnO1xuXG4vLyBmdW5jdGlvbiB0ZFBvbHlGaWxsKG9wdGlvbnMpIHtcbi8vICAgICByZXR1cm4gbmV3IFdNU1Qob3B0aW9ucyk7XG4vLyB9XG4vL1xuLy8gdmFyIFRpbWVEaW1lbnNpb24gPSBMLlRpbWVEaW1lbnNpb247XG4vLyB2YXIgdGltZURpbWVuc2lvbiA9IEwudGltZURpbWVuc2lvbiB8fCB0ZFBvbHlGaWxsO1xuXG4vLyB2YXIgV01TVCA9IChUaW1lRGltZW5zaW9uICYmIFRpbWVEaW1lbnNpb24uTGF5ZXIgfHwgVGlsZUxheWVyKS5XTVMuZXh0ZW5kKHtcblxuY2xhc3MgV01TVCBleHRlbmRzIChMIGFzIGFueSkuVGltZURpbWVuc2lvbi5MYXllci5XTVMge1xuXG4gICAgcHJpdmF0ZSBfYmFzZUxheWVyIDogVGlsZUxheWVyLldNU1xuXG4gICAgY29uc3RydWN0b3IobGF5ZXIgOiBUaWxlTGF5ZXIuV01TLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcihsYXllciwgb3B0cyk7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBxdWVyeSBhbGwgTGF5ZXJzICh3aGV0aGVyIHF1ZXJ5YWJsZSBvciBub3QpXG4gICAgX3BhcnNlVGltZURpbWVuc2lvbkZyb21DYXBhYmlsaXRpZXMgKHhtbCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0geG1sLnF1ZXJ5U2VsZWN0b3JBbGwoJ0xheWVyJyk7XG4gICAgICAgIHZhciBsYXllck5hbWUgPSB0aGlzLl9iYXNlTGF5ZXIud21zUGFyYW1zLmxheWVycztcbiAgICAgICAgdmFyIGxheWVyID0gbnVsbDtcbiAgICAgICAgdmFyIHRpbWVzID0gbnVsbDtcblxuICAgICAgICBsYXllcnMuZm9yRWFjaChmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiTmFtZVwiKS5pbm5lckhUTUwgPT09IGxheWVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGxheWVyID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgdGltZXMgPSB0aGlzLl9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyhsYXllcik7XG4gICAgICAgICAgICBpZiAoIXRpbWVzKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSB0aGlzLl9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyhsYXllci5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG5cbiAgICAvL292ZXJyaWRlIGRlZmF1bHQgcGFyc2VyIHRvIGZhbGwgYmFjayBpZiBEaW1lbnNpb24gaXMgcHJvdmlkZWQgYnV0IGhhcyBubyB2YWx1ZXNcbiAgICBfZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMgKGxheWVyKSB7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG4gICAgICAgIHZhciBkaW1lbnNpb25zID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbChcIkRpbWVuc2lvbltuYW1lPSd0aW1lJ11cIik7XG4gICAgICAgIGlmIChkaW1lbnNpb25zICYmIGRpbWVuc2lvbnMubGVuZ3RoICYmIGRpbWVuc2lvbnNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aW1lcyA9IGRpbWVuc2lvbnNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aW1lcyB8fCAhdGltZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZXh0ZW50cyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJFeHRlbnRbbmFtZT0ndGltZSddXCIpO1xuICAgICAgICAgICAgaWYgKGV4dGVudHMgJiYgZXh0ZW50cy5sZW5ndGggJiYgZXh0ZW50c1swXS50ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aW1lcyA9IGV4dGVudHNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHRpbWVzICYmIH50aW1lcy5pbmRleE9mKFwiY3VycmVudFwiKSkge1xuICAgICAgICAgICAgdGltZXMgPSB0aW1lcy5yZXBsYWNlKCdjdXJyZW50JywgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHdtc3QoZ3BMYXllcikge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBncExheWVyLnNlcnZpY2VzWzBdO1xuICAgIGxldCB1cmwgPSBzZXJ2aWNlLmhyZWY7XG5cbiAgICBpZighdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldNU1QgTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgbGF5ZXJzOiBncExheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIGZvcm1hdDogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgd212SWQ6IGdwTGF5ZXIubGF5ZXJJZFxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgbGVhZmxldExheWVyID0gbmV3IFdNUyggdXJsLCBvcHRzICk7XG5cbiAgICBsZXQgcHJveHlVcmwgPSBDb25maWcudWFsVXJsICsgJy9hcGkvc2VydmljZXMvJyArXG4gICAgICAgIHNlcnZpY2UuaWQgKyAnL3Byb3h5L2NhcGFiaWxpdGllcyc7XG5cbiAgICBsZXQgdGRPcHRzID0geyB0aW1lcyA6IG51bGwgfTtcblxuICAgIGlmKGdwTGF5ZXIudGVtcG9yYWwpIHtcblxuICAgICAgICBsZXQgZDEgPSBncExheWVyLnRlbXBvcmFsLnN0YXJ0RGF0ZSA/XG4gICAgICAgICAgICBuZXcgRGF0ZShncExheWVyLnRlbXBvcmFsLnN0YXJ0RGF0ZSkgOiBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgZDIgPSBncExheWVyLnRlbXBvcmFsLmVuZERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlKSA6IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgdGRPcHRzLnRpbWVzID0gZDEudG9JU09TdHJpbmcoKSArICcvJyArIGQyLnRvSVNPU3RyaW5nKCkgKyAnL1AxRCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXTVNUKGxlYWZsZXRMYXllciwge1xuICAgICAgICB0aW1lRGltZW5zaW9uOiBuZXcgKEwgYXMgYW55KS5UaW1lRGltZW5zaW9uKHRkT3B0cyksXG4gICAgICAgIHByb3h5OiBwcm94eVVybFxuICAgIH0pO1xufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNU1QgPSBXTVNUO1xuICAgIEwudGlsZUxheWVyLndtc3QgPSB3bXN0O1xufVxuXG5leHBvcnQge1xuICAgIFdNU1QgYXMgZGVmYXVsdCxcbiAgICBXTVNULFxuICAgIHdtc3Rcbn07XG4iXX0=