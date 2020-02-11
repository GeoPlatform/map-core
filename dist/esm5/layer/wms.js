/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/// <reference path="../../node_modules/@geoplatform/client/dist/shared/models.d.ts" />
/// <reference path="../../node_modules/@geoplatform/client/dist/shared/models.d.ts" />
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { TileLayer, Util, popup } from 'leaflet';
import { Config } from '@geoplatform/client';
var WMS = /** @class */ (function (_super) {
    tslib_1.__extends(WMS, _super);
    function WMS(url, opts) {
        var _this = _super.call(this, url, opts) || this;
        _this._enabled = false;
        _this._enabled = false;
        return _this;
    }
    /**
     * @return {?}
     */
    WMS.prototype.enableGetFeatureInfo = /**
     * @return {?}
     */
    function () {
        this._map.on('click', this.getFeatureInfo, this);
        this._enabled = true;
    };
    /**
     * @return {?}
     */
    WMS.prototype.disableGetFeatureInfo = /**
     * @return {?}
     */
    function () {
        this._map.off('click', this.getFeatureInfo, this);
        this._enabled = false;
    };
    /**
     * @return {?}
     */
    WMS.prototype.isGetFeatureInfoEnabled = /**
     * @return {?}
     */
    function () {
        return this._enabled;
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    WMS.prototype.onRemove = /**
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    function (map) {
        //if GFI is enabled, disable it before removing
        if ((/** @type {?} */ (this)).isGetFeatureInfoEnabled())
            (/** @type {?} */ (this)).disableGetFeatureInfo();
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return _super.prototype.onRemove.call((/** @type {?} */ (this)), map);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    WMS.prototype.getFeatureInfo = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        // Make an AJAX request to the server and hope for the best
        /** @type {?} */
        var url = this.getFeatureInfoUrl(evt.latlng);
        /** @type {?} */
        var parseGetFeatureInfo = this.parseGetFeatureInfo;
        jQuery.ajax({
            url: url,
            success: /**
             * @param {?} data
             * @param {?} status
             * @param {?} xhr
             * @return {?}
             */
            function (data, status, xhr) {
                // var err = typeof data === 'string' ? null : data;
                if (typeof (data) !== 'string')
                    data = parseGetFeatureInfo(data);
                // () => {
                this.showGetFeatureInfo(null, evt.latlng, data);
                // }
            },
            error: /**
             * @param {?} xhr
             * @param {?} status
             * @param {?} error
             * @return {?}
             */
            function (xhr, status, error) {
                var _this = this;
                (/**
                 * @return {?}
                 */
                function () { _this.showGetFeatureInfo(error); });
            }
        });
    };
    /**
     * @param {?} latlng
     * @return {?}
     */
    WMS.prototype.getFeatureInfoUrl = /**
     * @param {?} latlng
     * @return {?}
     */
    function (latlng) {
        // Construct a GetFeatureInfo request URL given a point
        /** @type {?} */
        var point = this._map.latLngToContainerPoint(latlng);
        /** @type {?} */
        var size = this._map.getSize();
        /** @type {?} */
        var params = {
            srs: 'EPSG:4326',
            bbox: this._map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            // layers: this.wmsParams.layers,
            // query_layers: this.wmsParams.layers,
            info_format: 'text/xml',
            x: point.x,
            y: point.y,
            i: point.x,
            //1.3.0
            j: point.y //1.3.0
        };
        /** @type {?} */
        var wmvId = ((/** @type {?} */ (this.wmsParams))).wmvId;
        // return this._url + Util.getParamString(params, this._url, true);
        /** @type {?} */
        var url = '/api/layers/' + wmvId + '/feature';
        return Config.ualUrl + url + Util.getParamString(params, url, true);
    };
    /**
     * @param {?} content
     * @return {?}
     */
    WMS.prototype.parseGetFeatureInfo = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var fields = [];
        for (var field in content) {
            fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
        }
        if (fields.length == 0)
            fields.push('<em>No data available</em>');
        return '<div>' + fields.join(' ') + '</div>';
    };
    /**
     * @param {?} err
     * @param {?} latlng
     * @param {?} content
     * @return {?}
     */
    WMS.prototype.showGetFeatureInfo = /**
     * @param {?} err
     * @param {?} latlng
     * @param {?} content
     * @return {?}
     */
    function (err, latlng, content) {
        if (err) {
            console.log(err);
            return;
        } // do nothing if there's an error
        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800 })
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
    };
    return WMS;
}(TileLayer.WMS));
if (false) {
    /**
     * @type {?}
     * @private
     */
    WMS.prototype._enabled;
}
/**
 * @param {?} layer
 * @return {?}
 */
function determineWMSFormat(layer) {
    /** @type {?} */
    var formats = layer.formats;
    if (formats && formats.length) {
        //look for common formats that make sense first...
        /** @type {?} */
        var idx = 0;
        /** @type {?} */
        var common = ['image/png32', 'image/png24', 'image/png8', 'image/png', 'image/jpeg'];
        while (idx < common.length) {
            if (formats.indexOf(common[idx]) >= 0)
                return common[idx];
            idx++;
        }
    }
    console.log("Layer '" + layer.label + "' has no formats specified, " +
        "assuming a default of 'image/png'");
    return 'image/png';
}
/**
 * short-form function for instantiating a WMS-based Layer's Leaflet instance
 * @param {?} layer
 * @return {?}
 */
function wms(layer) {
    /** @type {?} */
    var service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        throw new Error("Cannot create leaflet layer for WMS Layer '" +
            (layer.label || layer.id) +
            "' because layer has no service associated with it");
    }
    /** @type {?} */
    var url = service.href;
    if (!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }
    //pick output format for the raster images
    /** @type {?} */
    var format = determineWMSFormat(layer);
    /** @type {?} */
    var supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    //determine proper version of the WMS spec to use
    /** @type {?} */
    var version = '1.1.1';
    /** @type {?} */
    var versions = service.serviceTypeVersions || [];
    if (versions.length && versions.indexOf('1.1.1') < 0) {
        version = versions[0];
    }
    else {
        console.log("Warning: WMS Service doesn't list supported versions, assuming 1.1.1");
    }
    /** @type {?} */
    var opts = {
        layers: layer.layerName,
        transparent: true,
        format: format,
        wmvId: layer.id,
        version: version
    };
    if (Config.leafletPane) {
        ((/** @type {?} */ (opts))).pane = Config.leafletPane;
    }
    return new WMS(url, opts);
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.TileLayer.WMS = WMS;
    L_1.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx1RkFBdUY7O0FBRXZGLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztJQUMzQixNQUFNLEdBQUcsTUFBTTtBQUVyQixPQUFPLEVBQU8sU0FBUyxFQUFxQixJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXpFLE9BQU8sRUFDSCxNQUFNLEVBQ1QsTUFBTSxxQkFBcUIsQ0FBQztBQUk3QjtJQUFrQiwrQkFBYTtJQUkzQixhQUFZLEdBQVksRUFBRSxJQUFXO1FBQXJDLFlBQ0ksa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUVuQjtRQUxPLGNBQVEsR0FBYSxLQUFLLENBQUM7UUFJL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0lBQzFCLENBQUM7Ozs7SUFFRCxrQ0FBb0I7OztJQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxtQ0FBcUI7OztJQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7Ozs7O0lBRUQsc0JBQVE7Ozs7OztJQUFSLFVBQVUsR0FBUztRQUVmLCtDQUErQztRQUMvQyxJQUFHLG1CQUFBLElBQUksRUFB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Q0FBQztLQUN2Rjs7UUFFRyxJQUFJLEdBQVM7UUFDYixNQUFNLEVBQVEsS0FBSyxDQUFDLFNBQVM7UUFDN0IsV0FBVyxFQUFHLElBQUk7UUFDbEIsTUFBTSxFQUFRLE1BQU07UUFDcEIsS0FBSyxFQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sRUFBTyxPQUFPO0tBQ3hCO0lBQ0QsSUFBRyxNQUFNLENBQUMsV0FBVyxFQUFFO1FBQ25CLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztLQUMzQztJQUVELE9BQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTlCLENBQUM7QUFFRCxJQUFJLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUc7O1FBQ2QsR0FBQyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEdBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN0QixHQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDekI7QUFFRCxPQUFPLEVBQ0gsR0FBRyxJQUFJLE9BQU8sRUFDZCxHQUFHLEVBQ0gsR0FBRyxFQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQGdlb3BsYXRmb3JtL2NsaWVudC9kaXN0L3NoYXJlZC9tb2RlbHMuZC50c1wiIC8+XG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIExhdExuZywgVXRpbCwgcG9wdXAgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY2xhc3MgV01TIGV4dGVuZHMgVGlsZUxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9lbmFibGVkIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdHMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5hYmxlR2V0RmVhdHVyZUluZm8gICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlR2V0RmVhdHVyZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSA6IHRoaXMge1xuXG4gICAgICAgIC8vaWYgR0ZJIGlzIGVuYWJsZWQsIGRpc2FibGUgaXQgYmVmb3JlIHJlbW92aW5nXG4gICAgICAgIGlmKHRoaXMuaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQoKSlcbiAgICAgICAgdGhpcy5kaXNhYmxlR2V0RmVhdHVyZUluZm8oKTtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIGEgbWFwLlxuICAgICAgICAvLyAgIFVucmVnaXN0ZXIgYSBjbGljayBsaXN0ZW5lciwgdGhlbiBkbyBhbGwgdGhlIHVwc3RyZWFtIFdNUyB0aGluZ3NcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcblxuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvICAoZXZ0KSB7XG4gICAgICAgIC8vIE1ha2UgYW4gQUpBWCByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgYW5kIGhvcGUgZm9yIHRoZSBiZXN0XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEZlYXR1cmVJbmZvVXJsKGV2dC5sYXRsbmcpLFxuICAgICAgICBwYXJzZUdldEZlYXR1cmVJbmZvID0gdGhpcy5wYXJzZUdldEZlYXR1cmVJbmZvO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgIChkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAgICAgICAgIC8vIHZhciBlcnIgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBudWxsIDogZGF0YTtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUdldEZlYXR1cmVJbmZvKGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8obnVsbCwgZXZ0LmxhdGxuZywgZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yICAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhlcnJvcik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm9VcmwgIChsYXRsbmcgOiBMYXRMbmcpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IGEgR2V0RmVhdHVyZUluZm8gcmVxdWVzdCBVUkwgZ2l2ZW4gYSBwb2ludFxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxuICAgICAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblxuICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgYmJveDogdGhpcy5fbWFwLmdldEJvdW5kcygpLnRvQkJveFN0cmluZygpLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS54LFxuICAgICAgICAgICAgLy8gbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICAvLyBxdWVyeV9sYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIGluZm9fZm9ybWF0OiAndGV4dC94bWwnLFxuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICBpOiBwb2ludC54LCAvLzEuMy4wXG4gICAgICAgICAgICBqOiBwb2ludC55ICAvLzEuMy4wXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHdtdklkID0gKHRoaXMud21zUGFyYW1zIGFzIGFueSkud212SWQ7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3VybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvbGF5ZXJzLycgKyB3bXZJZCArICcvZmVhdHVyZSc7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGFyc2VHZXRGZWF0dXJlSW5mbyAoY29udGVudCkge1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvcih2YXIgZmllbGQgaW4gY29udGVudCkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goWyc8ZGl2PjxzdHJvbmc+JywgZmllbGQsICc6IDwvc3Ryb25nPicsIGNvbnRlbnRbZmllbGRdLCAnPC9kaXY+J10uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZHMubGVuZ3RoID09IDApXG4gICAgICAgIGZpZWxkcy5wdXNoKCc8ZW0+Tm8gZGF0YSBhdmFpbGFibGU8L2VtPicpO1xuICAgICAgICByZXR1cm4gJzxkaXY+JyArIGZpZWxkcy5qb2luKCcgJykgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBzaG93R2V0RmVhdHVyZUluZm8gIChlcnIgOiBFcnJvciwgbGF0bG5nIDogTGF0TG5nLCBjb250ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVycikgeyBjb25zb2xlLmxvZyhlcnIpOyByZXR1cm47IH0gLy8gZG8gbm90aGluZyBpZiB0aGVyZSdzIGFuIGVycm9yXG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgdGhlIGNvbnRlbnQgaW4gYSBwb3B1cCwgb3Igc29tZXRoaW5nLlxuICAgICAgICBwb3B1cCh7IG1heFdpZHRoOiA4MDB9KVxuICAgICAgICAuc2V0TGF0TG5nKGxhdGxuZylcbiAgICAgICAgLnNldENvbnRlbnQoY29udGVudClcbiAgICAgICAgLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIGRldGVybWluZVdNU0Zvcm1hdCggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXRzIDogc3RyaW5nW10gPSBsYXllci5mb3JtYXRzO1xuICAgIGlmKGZvcm1hdHMgJiYgZm9ybWF0cy5sZW5ndGgpIHtcbiAgICAgICAgLy9sb29rIGZvciBjb21tb24gZm9ybWF0cyB0aGF0IG1ha2Ugc2Vuc2UgZmlyc3QuLi5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGxldCBjb21tb24gPSBbICdpbWFnZS9wbmczMicsICdpbWFnZS9wbmcyNCcsICdpbWFnZS9wbmc4JywgJ2ltYWdlL3BuZycsICdpbWFnZS9qcGVnJyBdO1xuICAgICAgICB3aGlsZSggaWR4IDwgY29tbW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYoIGZvcm1hdHMuaW5kZXhPZiggY29tbW9uW2lkeF0gKSA+PSAwICkgcmV0dXJuIGNvbW1vbltpZHhdO1xuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBoYXMgbm8gZm9ybWF0cyBzcGVjaWZpZWQsIFwiICtcbiAgICAgICAgXCJhc3N1bWluZyBhIGRlZmF1bHQgb2YgJ2ltYWdlL3BuZydcIik7XG4gICAgcmV0dXJuICdpbWFnZS9wbmcnO1xufVxuXG5cbi8qKlxuICogc2hvcnQtZm9ybSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIFdNUy1iYXNlZCBMYXllcidzIExlYWZsZXQgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gd21zKGxheWVyIDogTGF5ZXJNb2RlbCkgOiBXTVMge1xuXG4gICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBXTVMgTGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIChsYXllci5sYWJlbCB8fCBsYXllci5pZCkgK1xuICAgICAgICAgICAgXCInIGJlY2F1c2UgbGF5ZXIgaGFzIG5vIHNlcnZpY2UgYXNzb2NpYXRlZCB3aXRoIGl0XCIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBzZXJ2aWNlLmhyZWY7XG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICAvL3BpY2sgb3V0cHV0IGZvcm1hdCBmb3IgdGhlIHJhc3RlciBpbWFnZXNcbiAgICBsZXQgZm9ybWF0ID0gZGV0ZXJtaW5lV01TRm9ybWF0KGxheWVyKTtcblxuICAgIGxldCBzdXBwb3J0ZWRDcnMgPSBsYXllci5jcnMgfHwgW107XG4gICAgaWYoc3VwcG9ydGVkQ3JzICYmIHN1cHBvcnRlZENycy5sZW5ndGggPiAwICYmIH5zdXBwb3J0ZWRDcnMuaW5kZXhPZihcIkVTUEc6Mzg1N1wiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgXCJFUFNHOjM4NTcgU3BoZXJpY2FsIE1lcmNhdG9yIHByb2plY3Rpb24gYW5kIG1heSBub3QgcmVuZGVyIGFwcHJvcHJpYXRlbHkgb3IgYXQgYWxsLlwiKTtcbiAgICB9XG5cbiAgICAvL2RldGVybWluZSBwcm9wZXIgdmVyc2lvbiBvZiB0aGUgV01TIHNwZWMgdG8gdXNlXG4gICAgbGV0IHZlcnNpb24gOiBzdHJpbmcgPSAnMS4xLjEnO1xuICAgIGxldCB2ZXJzaW9ucyA6IHN0cmluZ1tdID0gc2VydmljZS5zZXJ2aWNlVHlwZVZlcnNpb25zIHx8IFtdO1xuICAgIGlmKHZlcnNpb25zLmxlbmd0aCAmJiB2ZXJzaW9ucy5pbmRleE9mKCcxLjEuMScpIDwgMCkge1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBXTVMgU2VydmljZSBkb2Vzbid0IGxpc3Qgc3VwcG9ydGVkIHZlcnNpb25zLCBhc3N1bWluZyAxLjEuMVwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgbGF5ZXJzICAgICAgOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50IDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0ICAgICAgOiBmb3JtYXQsXG4gICAgICAgIHdtdklkICAgICAgIDogbGF5ZXIuaWQsXG4gICAgICAgIHZlcnNpb24gICAgIDogdmVyc2lvblxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSB7XG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNUyh1cmwsIG9wdHMpO1xuXG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TID0gV01TO1xuICAgIEwudGlsZUxheWVyLndtcyA9IHdtcztcbn1cblxuZXhwb3J0IHtcbiAgICBXTVMgYXMgZGVmYXVsdCxcbiAgICBXTVMsXG4gICAgd21zXG59O1xuIl19