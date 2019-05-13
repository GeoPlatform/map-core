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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci93bXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQU10QixPQUFPLEtBQUssYUFBYSxNQUFNLHNEQUFzRCxDQUFDO0FBR3RGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUxQyxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFXeEIsSUFBQTtJQUFtQixnQ0FBdUI7SUFJdEMsY0FBWSxLQUFxQixFQUFFLElBQVc7ZUFDMUMsa0JBQU0sS0FBSyxFQUFFLElBQUksQ0FBQztLQUNyQjtJQUVELHdFQUF3RTs7Ozs7SUFDeEUsa0RBQW1DOzs7O0lBQW5DLFVBQXFDLEdBQUc7O1FBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDOztRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1FBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsT0FBTztZQUMzQixJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtnQkFDdkQsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssR0FBRyxJQUFJLENBQUMs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QUUsQ0FBQztRQUVwRCxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztLQUNyRTtJQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzFCLGFBQWEsRUFBRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDeEMsS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0NBQ047QUFFRCxJQUFJLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRzs7SUFDcEIsSUFBTSxHQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGlsZUxheWVyLCB0aWxlTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAqIGFzIFRpbWVEaW1lbnNpb24gZnJvbSAnbGVhZmxldC10aW1lZGltZW5zaW9uL2Rpc3QvbGVhZmxldC50aW1lZGltZW5zaW9uLm1pbic7XG4vLyBpbXBvcnQgeyBUaW1lRGltZW5zaW9uLCB0aW1lRGltZW5zaW9uIH0gZnJvbSBcIi4uL2xpYnMvTC5UaW1lRGltZW5zaW9uXCI7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5pbXBvcnQgV01TIGZyb20gJy4vd21zJztcblxuLy8gZnVuY3Rpb24gdGRQb2x5RmlsbChvcHRpb25zKSB7XG4vLyAgICAgcmV0dXJuIG5ldyBXTVNUKG9wdGlvbnMpO1xuLy8gfVxuLy9cbi8vIHZhciBUaW1lRGltZW5zaW9uID0gTC5UaW1lRGltZW5zaW9uO1xuLy8gdmFyIHRpbWVEaW1lbnNpb24gPSBMLnRpbWVEaW1lbnNpb24gfHwgdGRQb2x5RmlsbDtcblxuLy8gdmFyIFdNU1QgPSAoVGltZURpbWVuc2lvbiAmJiBUaW1lRGltZW5zaW9uLkxheWVyIHx8IFRpbGVMYXllcikuV01TLmV4dGVuZCh7XG5cbmNsYXNzIFdNU1QgZXh0ZW5kcyBUaW1lRGltZW5zaW9uLkxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9iYXNlTGF5ZXIgOiBUaWxlTGF5ZXIuV01TXG5cbiAgICBjb25zdHJ1Y3RvcihsYXllciA6IFRpbGVMYXllci5XTVMsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKGxheWVyLCBvcHRzKTtcbiAgICB9XG5cbiAgICAvL292ZXJyaWRlIGRlZmF1bHQgcGFyc2VyIHRvIHF1ZXJ5IGFsbCBMYXllcnMgKHdoZXRoZXIgcXVlcnlhYmxlIG9yIG5vdClcbiAgICBfcGFyc2VUaW1lRGltZW5zaW9uRnJvbUNhcGFiaWxpdGllcyAoeG1sKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB4bWwucXVlcnlTZWxlY3RvckFsbCgnTGF5ZXInKTtcbiAgICAgICAgdmFyIGxheWVyTmFtZSA9IHRoaXMuX2Jhc2VMYXllci53bXNQYXJhbXMubGF5ZXJzO1xuICAgICAgICB2YXIgbGF5ZXIgPSBudWxsO1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuXG4gICAgICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJOYW1lXCIpLmlubmVySFRNTCA9PT0gbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyKTtcbiAgICAgICAgICAgIGlmICghdGltZXMpIHtcbiAgICAgICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gZmFsbCBiYWNrIGlmIERpbWVuc2lvbiBpcyBwcm92aWRlZCBidXQgaGFzIG5vIHZhbHVlc1xuICAgIF9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyAobGF5ZXIpIHtcbiAgICAgICAgdmFyIHRpbWVzID0gbnVsbDtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRGltZW5zaW9uW25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy5sZW5ndGggJiYgZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRpbWVzID0gZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRpbWVzIHx8ICF0aW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnRzID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbChcIkV4dGVudFtuYW1lPSd0aW1lJ11cIik7XG4gICAgICAgICAgICBpZiAoZXh0ZW50cyAmJiBleHRlbnRzLmxlbmd0aCAmJiBleHRlbnRzWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gZXh0ZW50c1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGltZXMgJiYgfnRpbWVzLmluZGV4T2YoXCJjdXJyZW50XCIpKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRpbWVzLnJlcGxhY2UoJ2N1cnJlbnQnLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd21zdChncExheWVyKSB7XG5cbiAgICBsZXQgc2VydmljZSA9IGdwTGF5ZXIuc2VydmljZXNbMF07XG4gICAgbGV0IHVybCA9IHNlcnZpY2UuaHJlZjtcblxuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TVCBMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICBsYXllcnM6IGdwTGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiLFxuICAgICAgICB3bXZJZDogZ3BMYXllci5sYXllcklkXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBuZXcgV01TKCB1cmwsIG9wdHMgKTtcblxuICAgIGxldCBwcm94eVVybCA9IENvbmZpZy51YWxVcmwgKyAnL2FwaS9zZXJ2aWNlcy8nICtcbiAgICAgICAgc2VydmljZS5pZCArICcvcHJveHkvY2FwYWJpbGl0aWVzJztcblxuICAgIGxldCB0ZE9wdHMgPSB7IHRpbWVzIDogbnVsbCB9O1xuXG4gICAgaWYoZ3BMYXllci50ZW1wb3JhbCkge1xuXG4gICAgICAgIGxldCBkMSA9IGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkMiA9IGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSA/XG4gICAgICAgICAgICBuZXcgRGF0ZShncExheWVyLnRlbXBvcmFsLmVuZERhdGUpIDogbmV3IERhdGUoKTtcblxuICAgICAgICB0ZE9wdHMudGltZXMgPSBkMS50b0lTT1N0cmluZygpICsgJy8nICsgZDIudG9JU09TdHJpbmcoKSArICcvUDFEJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNU1QobGVhZmxldExheWVyLCB7XG4gICAgICAgIHRpbWVEaW1lbnNpb246IG5ldyBUaW1lRGltZW5zaW9uKHRkT3B0cyksXG4gICAgICAgIHByb3h5OiBwcm94eVVybFxuICAgIH0pO1xufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNU1QgPSBXTVNUO1xuICAgIEwudGlsZUxheWVyLndtc3QgPSB3bXN0O1xufVxuXG5leHBvcnQge1xuICAgIFdNU1QgYXMgZGVmYXVsdCxcbiAgICBXTVNULFxuICAgIHdtc3Rcbn07XG4iXX0=