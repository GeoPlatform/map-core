/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import { Config } from '@geoplatform/client';
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
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    /** @type {?} */
    var leafletLayer = new WMS(url, opts);
    /** @type {?} */
    var proxyUrl = Config["ualUrl"] + '/api/services/' +
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUlBLE9BQU8sS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTdCLE9BQU8sc0RBQXNELENBQUM7QUFHOUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTNDLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztBQUl4QixJQUFBO0lBQW1CLGdDQUFrQztJQUlqRCxjQUFZLEtBQXFCLEVBQUUsSUFBVztlQUMxQyxrQkFBTSxLQUFLLEVBQUUsSUFBSSxDQUFDO0tBQ3JCO0lBRUQsd0VBQXdFOzs7OztJQUN4RSxrREFBbUM7Ozs7SUFBbkMsVUFBcUMsR0FBRzs7UUFDcEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7O1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPO1lBQzNCLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUN2RCxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakU7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QUFHLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztLQUNyRTtJQUVELE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzFCLGFBQWEsRUFBRSxJQUFJLG1CQUFDLENBQVEsRUFBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDbkQsS0FBSyxFQUFFLFFBQVE7S0FDbEIsQ0FBQyxDQUFDO0NBQ047QUFFRCxJQUFJLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRzs7SUFDcEIsSUFBTSxHQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLEdBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN4QixHQUFDLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDM0I7QUFFRCxPQUFPLEVBQ0gsSUFBSSxJQUFJLE9BQU8sRUFDZixJQUFJLEVBQ0osSUFBSSxFQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgVGlsZUxheWVyLCB0aWxlTGF5ZXIgfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAnbGVhZmxldC10aW1lZGltZW5zaW9uL2Rpc3QvbGVhZmxldC50aW1lZGltZW5zaW9uLnNyYyc7XG4vLyBpbXBvcnQgeyBUaW1lRGltZW5zaW9uLCB0aW1lRGltZW5zaW9uIH0gZnJvbSBcIi4uL2xpYnMvTC5UaW1lRGltZW5zaW9uXCI7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IFdNUyBmcm9tICcuL3dtcyc7XG5cblxuXG5jbGFzcyBXTVNUIGV4dGVuZHMgKEwgYXMgYW55KS5UaW1lRGltZW5zaW9uLkxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9iYXNlTGF5ZXIgOiBUaWxlTGF5ZXIuV01TXG5cbiAgICBjb25zdHJ1Y3RvcihsYXllciA6IFRpbGVMYXllci5XTVMsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKGxheWVyLCBvcHRzKTtcbiAgICB9XG5cbiAgICAvL292ZXJyaWRlIGRlZmF1bHQgcGFyc2VyIHRvIHF1ZXJ5IGFsbCBMYXllcnMgKHdoZXRoZXIgcXVlcnlhYmxlIG9yIG5vdClcbiAgICBfcGFyc2VUaW1lRGltZW5zaW9uRnJvbUNhcGFiaWxpdGllcyAoeG1sKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB4bWwucXVlcnlTZWxlY3RvckFsbCgnTGF5ZXInKTtcbiAgICAgICAgdmFyIGxheWVyTmFtZSA9IHRoaXMuX2Jhc2VMYXllci53bXNQYXJhbXMubGF5ZXJzO1xuICAgICAgICB2YXIgbGF5ZXIgPSBudWxsO1xuICAgICAgICB2YXIgdGltZXMgPSBudWxsO1xuXG4gICAgICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCJOYW1lXCIpLmlubmVySFRNTCA9PT0gbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBjdXJyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyKTtcbiAgICAgICAgICAgIGlmICghdGltZXMpIHtcbiAgICAgICAgICAgICAgICB0aW1lcyA9IHRoaXMuX2dldFRpbWVzRnJvbUxheWVyQ2FwYWJpbGl0aWVzKGxheWVyLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRpbWVzO1xuICAgIH1cblxuICAgIC8vb3ZlcnJpZGUgZGVmYXVsdCBwYXJzZXIgdG8gZmFsbCBiYWNrIGlmIERpbWVuc2lvbiBpcyBwcm92aWRlZCBidXQgaGFzIG5vIHZhbHVlc1xuICAgIF9nZXRUaW1lc0Zyb21MYXllckNhcGFiaWxpdGllcyAobGF5ZXIpIHtcbiAgICAgICAgdmFyIHRpbWVzID0gbnVsbDtcbiAgICAgICAgdmFyIGRpbWVuc2lvbnMgPSBsYXllci5xdWVyeVNlbGVjdG9yQWxsKFwiRGltZW5zaW9uW25hbWU9J3RpbWUnXVwiKTtcbiAgICAgICAgaWYgKGRpbWVuc2lvbnMgJiYgZGltZW5zaW9ucy5sZW5ndGggJiYgZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRpbWVzID0gZGltZW5zaW9uc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRpbWVzIHx8ICF0aW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBleHRlbnRzID0gbGF5ZXIucXVlcnlTZWxlY3RvckFsbChcIkV4dGVudFtuYW1lPSd0aW1lJ11cIik7XG4gICAgICAgICAgICBpZiAoZXh0ZW50cyAmJiBleHRlbnRzLmxlbmd0aCAmJiBleHRlbnRzWzBdLnRleHRDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRpbWVzID0gZXh0ZW50c1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYodGltZXMgJiYgfnRpbWVzLmluZGV4T2YoXCJjdXJyZW50XCIpKSB7XG4gICAgICAgICAgICB0aW1lcyA9IHRpbWVzLnJlcGxhY2UoJ2N1cnJlbnQnLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lcztcbiAgICB9XG5cbn1cblxuXG5cblxuZnVuY3Rpb24gd21zdChncExheWVyKSB7XG5cbiAgICBsZXQgc2VydmljZSA9IGdwTGF5ZXIuc2VydmljZXNbMF07XG4gICAgbGV0IHVybCA9IHNlcnZpY2UuaHJlZjtcblxuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TVCBMYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICBsYXllcnM6IGdwTGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiLFxuICAgICAgICB3bXZJZDogZ3BMYXllci5sYXllcklkXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCBsZWFmbGV0TGF5ZXIgPSBuZXcgV01TKCB1cmwsIG9wdHMgKTtcblxuICAgIGxldCBwcm94eVVybCA9IENvbmZpZy51YWxVcmwgKyAnL2FwaS9zZXJ2aWNlcy8nICtcbiAgICAgICAgc2VydmljZS5pZCArICcvcHJveHkvY2FwYWJpbGl0aWVzJztcblxuICAgIGxldCB0ZE9wdHMgPSB7IHRpbWVzIDogbnVsbCB9O1xuXG4gICAgaWYoZ3BMYXllci50ZW1wb3JhbCkge1xuXG4gICAgICAgIGxldCBkMSA9IGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlID9cbiAgICAgICAgICAgIG5ldyBEYXRlKGdwTGF5ZXIudGVtcG9yYWwuc3RhcnREYXRlKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkMiA9IGdwTGF5ZXIudGVtcG9yYWwuZW5kRGF0ZSA/XG4gICAgICAgICAgICBuZXcgRGF0ZShncExheWVyLnRlbXBvcmFsLmVuZERhdGUpIDogbmV3IERhdGUoKTtcblxuICAgICAgICB0ZE9wdHMudGltZXMgPSBkMS50b0lTT1N0cmluZygpICsgJy8nICsgZDIudG9JU09TdHJpbmcoKSArICcvUDFEJztcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNU1QobGVhZmxldExheWVyLCB7XG4gICAgICAgIHRpbWVEaW1lbnNpb246IG5ldyAoTCBhcyBhbnkpLlRpbWVEaW1lbnNpb24odGRPcHRzKSxcbiAgICAgICAgcHJveHk6IHByb3h5VXJsXG4gICAgfSk7XG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TVCA9IFdNU1Q7XG4gICAgTC50aWxlTGF5ZXIud21zdCA9IHdtc3Q7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TVCBhcyBkZWZhdWx0LFxuICAgIFdNU1QsXG4gICAgd21zdFxufTtcbiJdfQ==