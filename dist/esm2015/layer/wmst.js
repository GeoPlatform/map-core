/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import * as L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import { Config } from 'geoplatform.client';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbImxheWVyL3dtc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFJdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxTQUFTLENBQUM7QUFFN0IsT0FBTyxzREFBc0QsQ0FBQztBQUc5RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFMUMsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDO0FBV3hCLFVBQVcsU0FBUyxDQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7OztJQUlqRCxZQUFZLEtBQXFCLEVBQUUsSUFBVztRQUMxQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3RCOzs7OztJQUdELG1DQUFtQyxDQUFFLEdBQUc7O1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOztRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTztZQUMzQixJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDdkQsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMs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RyxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUM7S0FDckU7SUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtRQUMxQixhQUFhLEVBQUUsSUFBSSxtQkFBQyxDQUFRLEVBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ25ELEtBQUssRUFBRSxRQUFRO0tBQ2xCLENBQUMsQ0FBQztDQUNOO0FBRUQsSUFBSSxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUc7O0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQzNCO0FBRUQsT0FBTyxFQUNILElBQUksSUFBSSxPQUFPLEVBQ2YsSUFBSSxFQUNKLElBQUksRUFDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcblxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IFRpbGVMYXllciwgdGlsZUxheWVyIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgJ2xlYWZsZXQtdGltZWRpbWVuc2lvbi9kaXN0L2xlYWZsZXQudGltZWRpbWVuc2lvbi5zcmMnO1xuLy8gaW1wb3J0IHsgVGltZURpbWVuc2lvbiwgdGltZURpbWVuc2lvbiB9IGZyb20gXCIuLi9saWJzL0wuVGltZURpbWVuc2lvblwiO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuaW1wb3J0IFdNUyBmcm9tICcuL3dtcyc7XG5cbi8vIGZ1bmN0aW9uIHRkUG9seUZpbGwob3B0aW9ucykge1xuLy8gICAgIHJldHVybiBuZXcgV01TVChvcHRpb25zKTtcbi8vIH1cbi8vXG4vLyB2YXIgVGltZURpbWVuc2lvbiA9IEwuVGltZURpbWVuc2lvbjtcbi8vIHZhciB0aW1lRGltZW5zaW9uID0gTC50aW1lRGltZW5zaW9uIHx8IHRkUG9seUZpbGw7XG5cbi8vIHZhciBXTVNUID0gKFRpbWVEaW1lbnNpb24gJiYgVGltZURpbWVuc2lvbi5MYXllciB8fCBUaWxlTGF5ZXIpLldNUy5leHRlbmQoe1xuXG5jbGFzcyBXTVNUIGV4dGVuZHMgKEwgYXMgYW55KS5UaW1lRGltZW5zaW9uLkxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9iYXNlTGF5ZXIgOiBUaWxlTGF5ZXIuV01TXG5cbiAgICBjb25zdHJ1Y3RvcihsYXllciA6IFRpbGVMYXllci5XTVMsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKGxheWVyLCBvcHRzKTtcbiAgICB9XG5cbiAgICAvL292ZXJyaWRlIGRlZmF1bHQgcGFyc2VyIHRvIHF1ZXJ5IGFsbCBMYXllcnMgKHdoZXRoZXIgcXVlcnlhYmxlIG9yIG5vdClcbiAgICBfcGFyc2VUaW1lRGltZW5zaW9uRnJvbUNhcGFiaWxpdGllcyAoeG1sKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB4bWwucXVlcnlTZWxlY3RvckFsbCgnTGF5ZXInKTtcbiAgICAgICAgdmFyIGxheWVyTmFtZSA9IHRoaXMuX2Jhc2VMYXllci53bXNQYXJhbXMubGF5ZXJzO1xuICAgICAgICB2YXIgbGF5ZXIgPSBudWxsO1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuXG4gICAgICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJOYW1lXCIpLmlubmVySFRNTCA9PT0gbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyKTtcbiAgICAgICAgICAgIGlmICghdGltZXMpIHtcbiAgICAgICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gZmFsbCBiYWNrIGlmIERpbWVuc2lvbiBpcyBwcm92aWRlZCBidXQgaGFzIG5vIHZhbHVlc1xuICAgIF9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyAobGF5ZXIpIHtcbiAgICAgICAgdmFyIHRpbWVzID0gbnVsbDtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRGltZW5zaW9uW25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy5sZW5ndGggJiYgZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRpbWVzID0gZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRpbWVzIHx8ICF0aW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnRzID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbChcIkV4dGVudFtuYW1lPSd0aW1lJ11cIik7XG4gICAgICAgICAgICBpZiAoZXh0ZW50cyAmJiBleHRlbnRzLmxlbmd0aCAmJiBleHRlbnRzWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gZXh0ZW50c1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGltZXMgJiYgfnRpbWVzLmluZGV4T2YoXCJjdXJyZW50XCIpKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRpbWVzLnJlcGxhY2UoJ2N1cnJlbnQnLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd21zdChncExheWVyKSB7XG5cbiAgICBsZXQgc2VydmljZSA9IGdwTGF5ZXIuc2VydmljZXNbMF07XG4gICAgbGV0IHVybCA9IHNlcnZpY2UuaHJlZjtcblxuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TVCBMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICBsYXllcnM6IGdwTGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiLFxuICAgICAgICB3bXZJZDogZ3BMYXllci5sYXllcklkXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBuZXcgV01TKCB1cmwsIG9wdHMgKTtcblxuICAgIGxldCBwcm94eVVybCA9IENvbmZpZy51YWxVcmwgKyAnL2FwaS9zZXJ2aWNlcy8nICtcbiAgICAgICAgc2VydmljZS5pZCArICcvcHJveHkvY2FwYWJpbGl0aWVzJztcblxuICAgIGxldCB0ZE9wdHMgPSB7IHRpbWVzIDogbnVsbCB9O1xuXG4gICAgaWYoZ3BMYXllci50ZW1wb3JhbCkge1xuXG4gICAgICAgIGxldCBkMSA9IGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkMiA9IGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSA/XG4gICAgICAgICAgICBuZXcgRGF0ZShncExheWVyLnRlbXBvcmFsLmVuZERhdGUpIDogbmV3IERhdGUoKTtcblxuICAgICAgICB0ZE9wdHMudGltZXMgPSBkMS50b0lTT1N0cmluZygpICsgJy8nICsgZDIudG9JU09TdHJpbmcoKSArICcvUDFEJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNU1QobGVhZmxldExheWVyLCB7XG4gICAgICAgIHRpbWVEaW1lbnNpb246IG5ldyAoTCBhcyBhbnkpLlRpbWVEaW1lbnNpb24odGRPcHRzKSxcbiAgICAgICAgcHJveHk6IHByb3h5VXJsXG4gICAgfSk7XG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TVCA9IFdNU1Q7XG4gICAgTC50aWxlTGF5ZXIud21zdCA9IHdtc3Q7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TVCBhcyBkZWZhdWx0LFxuICAgIFdNU1QsXG4gICAgd21zdFxufTtcbiJdfQ==