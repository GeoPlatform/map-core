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
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    /** @type {?} */
    let leafletLayer = new WMS(url, opts);
    /** @type {?} */
    let proxyUrl = Config.ualUrl + '/api/services/' +
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxzREFBc0QsQ0FBQztBQUc5RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFM0MsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDO0FBSXhCLFVBQVcsU0FBUyxDQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7OztJQUlqRCxZQUFZLEtBQXFCLEVBQUUsSUFBVztRQUMxQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RCOzs7OztJQUdELG1DQUFtQyxDQUFFLEdBQUc7O1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOztRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTztZQUMzQixJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDdkQsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLFVBQVUs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QUFNLENBQUM7S0FDckU7SUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUMxQixhQUFhLEVBQUUsSUFBSSxtQkFBQyxDQUFRLEVBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ25ELEtBQUssRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQztDQUNOO0FBRUQsSUFBSSxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUc7O0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzNCO0FBRUQsT0FBTyxFQUNILElBQUksSUFBSSxPQUFPLEVBQ2YsSUFBSSxFQUNKLElBQUksRUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcblxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRpbGVMYXllciwgdGlsZUxheWVyIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgJ2xlYWZsZXQtdGltZWRpbWVuc2lvbi9kaXN0L2xlYWZsZXQudGltZWRpbWVuc2lvbi5zcmMnO1xuLy8gaW1wb3J0IHsgVGltZURpbWVuc2lvbiwgdGltZURpbWVuc2lvbiB9IGZyb20gXCIuLi9saWJzL0wuVGltZURpbWVuc2lvblwiO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCBXTVMgZnJvbSAnLi93bXMnO1xuXG5cblxuY2xhc3MgV01TVCBleHRlbmRzIChMIGFzIGFueSkuVGltZURpbWVuc2lvbi5MYXllci5XTVMge1xuXG4gICAgcHJpdmF0ZSBfYmFzZUxheWVyIDogVGlsZUxheWVyLldNU1xuXG4gICAgY29uc3RydWN0b3IobGF5ZXIgOiBUaWxlTGF5ZXIuV01TLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcihsYXllciwgb3B0cyk7XG4gICAgfVxuXG4gICAgLy9vdmVycmlkZSBkZWZhdWx0IHBhcnNlciB0byBxdWVyeSBhbGwgTGF5ZXJzICh3aGV0aGVyIHF1ZXJ5YWJsZSBvciBub3QpXG4gICAgX3BhcnNlVGltZURpbWVuc2lvbkZyb21DYXBhYmlsaXRpZXMgKHhtbCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0geG1sLnF1ZXJ5U2VsZWN0b3JBbGwoJ0xheWVyJyk7XG4gICAgICAgIHZhciBsYXllck5hbWUgPSB0aGlzLl9iYXNlTGF5ZXIud21zUGFyYW1zLmxheWVycztcbiAgICAgICAgdmFyIGxheWVyID0gbnVsbDtcbiAgICAgICAgdmFyIHRpbWVzID0gbnVsbDtcblxuICAgICAgICBsYXllcnMuZm9yRWFjaChmdW5jdGlvbihjdXJyZW50KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiTmFtZVwiKS5pbm5lckhUTUwgPT09IGxheWVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGxheWVyID0gY3VycmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgdGltZXMgPSB0aGlzLl9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyhsYXllcik7XG4gICAgICAgICAgICBpZiAoIXRpbWVzKSB7XG4gICAgICAgICAgICAgICAgdGltZXMgPSB0aGlzLl9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyhsYXllci5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG5cbiAgICAvL292ZXJyaWRlIGRlZmF1bHQgcGFyc2VyIHRvIGZhbGwgYmFjayBpZiBEaW1lbnNpb24gaXMgcHJvdmlkZWQgYnV0IGhhcyBubyB2YWx1ZXNcbiAgICBfZ2V0VGltZXNGcm9tTGF5ZXJDYXBhYmlsaXRpZXMgKGxheWVyKSB7XG4gICAgICAgIHZhciB0aW1lcyA9IG51bGw7XG4gICAgICAgIHZhciBkaW1lbnNpb25zID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbChcIkRpbWVuc2lvbltuYW1lPSd0aW1lJ11cIik7XG4gICAgICAgIGlmIChkaW1lbnNpb25zICYmIGRpbWVuc2lvbnMubGVuZ3RoICYmIGRpbWVuc2lvbnNbMF0udGV4dENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aW1lcyA9IGRpbWVuc2lvbnNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aW1lcyB8fCAhdGltZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZXh0ZW50cyA9IGxheWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJFeHRlbnRbbmFtZT0ndGltZSddXCIpO1xuICAgICAgICAgICAgaWYgKGV4dGVudHMgJiYgZXh0ZW50cy5sZW5ndGggJiYgZXh0ZW50c1swXS50ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aW1lcyA9IGV4dGVudHNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHRpbWVzICYmIH50aW1lcy5pbmRleE9mKFwiY3VycmVudFwiKSkge1xuICAgICAgICAgICAgdGltZXMgPSB0aW1lcy5yZXBsYWNlKCdjdXJyZW50JywgbmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZXM7XG4gICAgfVxuXG59XG5cblxuXG5cbmZ1bmN0aW9uIHdtc3QoZ3BMYXllcikge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBncExheWVyLnNlcnZpY2VzWzBdO1xuICAgIGxldCB1cmwgPSBzZXJ2aWNlLmhyZWY7XG5cbiAgICBpZighdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldNU1QgTGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgbGF5ZXJzOiBncExheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIGZvcm1hdDogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgd212SWQ6IGdwTGF5ZXIubGF5ZXJJZFxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgbGVhZmxldExheWVyID0gbmV3IFdNUyggdXJsLCBvcHRzICk7XG5cbiAgICBsZXQgcHJveHlVcmwgPSBDb25maWcudWFsVXJsICsgJy9hcGkvc2VydmljZXMvJyArXG4gICAgICAgIHNlcnZpY2UuaWQgKyAnL3Byb3h5L2NhcGFiaWxpdGllcyc7XG5cbiAgICBsZXQgdGRPcHRzID0geyB0aW1lcyA6IG51bGwgfTtcblxuICAgIGlmKGdwTGF5ZXIudGVtcG9yYWwpIHtcblxuICAgICAgICBsZXQgZDEgPSBncExheWVyLnRlbXBvcmFsLnN0YXJ0RGF0ZSA/XG4gICAgICAgICAgICBuZXcgRGF0ZShncExheWVyLnRlbXBvcmFsLnN0YXJ0RGF0ZSkgOiBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgZDIgPSBncExheWVyLnRlbXBvcmFsLmVuZERhdGUgP1xuICAgICAgICAgICAgbmV3IERhdGUoZ3BMYXllci50ZW1wb3JhbC5lbmREYXRlKSA6IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgdGRPcHRzLnRpbWVzID0gZDEudG9JU09TdHJpbmcoKSArICcvJyArIGQyLnRvSVNPU3RyaW5nKCkgKyAnL1AxRCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXTVNUKGxlYWZsZXRMYXllciwge1xuICAgICAgICB0aW1lRGltZW5zaW9uOiBuZXcgKEwgYXMgYW55KS5UaW1lRGltZW5zaW9uKHRkT3B0cyksXG4gICAgICAgIHByb3h5OiBwcm94eVVybFxuICAgIH0pO1xufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNU1QgPSBXTVNUO1xuICAgIEwudGlsZUxheWVyLndtc3QgPSB3bXN0O1xufVxuXG5leHBvcnQge1xuICAgIFdNU1QgYXMgZGVmYXVsdCxcbiAgICBXTVNULFxuICAgIHdtc3Rcbn07XG4iXX0=