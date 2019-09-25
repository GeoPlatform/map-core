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
                var _this = this;
                // var err = typeof data === 'string' ? null : data;
                if (typeof (data) !== 'string')
                    data = parseGetFeatureInfo(data);
                (/**
                 * @return {?}
                 */
                function () {
                    _this.showGetFeatureInfo(null, evt.latlng, data);
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSx1RkFBdUY7O0FBRXZGLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztJQUMzQixNQUFNLEdBQUcsTUFBTTtBQUVyQixPQUFPLEVBQU8sU0FBUyxFQUFxQixJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXpFLE9BQU8sRUFDSCxNQUFNLEVBQ1QsTUFBTSxxQkFBcUIsQ0FBQztBQUk3QjtJQUFrQiwrQkFBYTtJQUkzQixhQUFZLEdBQVksRUFBRSxJQUFXO1FBQXJDLFlBQ0ksa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUVuQjtRQUxPLGNBQVEsR0FBYSxLQUFLLENBQUM7UUFJL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0lBQzFCLENBQUM7Ozs7SUFFRCxrQ0FBb0I7OztJQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxtQ0FBcUI7OztJQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7Ozs7O0lBRUQsc0JBQVE7Ozs7OztJQUFSLFVBQVUsR0FBUztRQUVmLCtDQUErQztRQUMvQyxJQUFHLG1CQUFBLElBQUksRUFB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QUcsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0tBQ3ZGOztRQUVHLElBQUksR0FBUztRQUNiLE1BQU0sRUFBUSxLQUFLLENBQUMsU0FBUztRQUM3QixXQUFXLEVBQUcsSUFBSTtRQUNsQixNQUFNLEVBQVEsTUFBTTtRQUNwQixLQUFLLEVBQVMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxFQUFPLE9BQU87S0FDeEI7SUFDRCxJQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDbkIsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQzNDO0lBRUQsT0FBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUIsQ0FBQztBQUVELElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRzs7UUFDZCxHQUFDLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AZ2VvcGxhdGZvcm0vY2xpZW50L2Rpc3Qvc2hhcmVkL21vZGVscy5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWxcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jbGFzcyBXTVMgZXh0ZW5kcyBUaWxlTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2VuYWJsZWQgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0cyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVHZXRGZWF0dXJlSW5mbyAgKCkge1xuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVHZXRGZWF0dXJlSW5mbyAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0dldEZlYXR1cmVJbmZvRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIDogdGhpcyB7XG5cbiAgICAgICAgLy9pZiBHRkkgaXMgZW5hYmxlZCwgZGlzYWJsZSBpdCBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgaWYodGhpcy5pc0dldEZlYXR1cmVJbmZvRW5hYmxlZCgpKVxuICAgICAgICB0aGlzLmRpc2FibGVHZXRGZWF0dXJlSW5mbygpO1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuIHRoZSBsYXllciBpcyByZW1vdmVkIGZyb20gYSBtYXAuXG4gICAgICAgIC8vICAgVW5yZWdpc3RlciBhIGNsaWNrIGxpc3RlbmVyLCB0aGVuIGRvIGFsbCB0aGUgdXBzdHJlYW0gV01TIHRoaW5nc1xuICAgICAgICByZXR1cm4gc3VwZXIub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm8gIChldnQpIHtcbiAgICAgICAgLy8gTWFrZSBhbiBBSkFYIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaG9wZSBmb3IgdGhlIGJlc3RcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0RmVhdHVyZUluZm9VcmwoZXZ0LmxhdGxuZyksXG4gICAgICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gPSB0aGlzLnBhcnNlR2V0RmVhdHVyZUluZm87XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzcyAgKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGVyciA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IG51bGwgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9IHBhcnNlR2V0RmVhdHVyZUluZm8oZGF0YSk7XG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhudWxsLCBldnQubGF0bG5nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGVycm9yKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mb1VybCAgKGxhdGxuZyA6IExhdExuZykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgYSBHZXRGZWF0dXJlSW5mbyByZXF1ZXN0IFVSTCBnaXZlbiBhIHBvaW50XG4gICAgICAgIHZhciBwb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXG4gICAgICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxuXG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNyczogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICBiYm94OiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkudG9CQm94U3RyaW5nKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLngsXG4gICAgICAgICAgICAvLyBsYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIC8vIHF1ZXJ5X2xheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgaW5mb19mb3JtYXQ6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgIGk6IHBvaW50LngsIC8vMS4zLjBcbiAgICAgICAgICAgIGo6IHBvaW50LnkgIC8vMS4zLjBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd212SWQgPSAodGhpcy53bXNQYXJhbXMgYXMgYW55KS53bXZJZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5fdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS9sYXllcnMvJyArIHdtdklkICsgJy9mZWF0dXJlJztcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJzZUdldEZlYXR1cmVJbmZvIChjb250ZW50KSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBmaWVsZCBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICBmaWVsZHMucHVzaChbJzxkaXY+PHN0cm9uZz4nLCBmaWVsZCwgJzogPC9zdHJvbmc+JywgY29udGVudFtmaWVsZF0sICc8L2Rpdj4nXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkcy5sZW5ndGggPT0gMClcbiAgICAgICAgZmllbGRzLnB1c2goJzxlbT5ObyBkYXRhIGF2YWlsYWJsZTwvZW0+Jyk7XG4gICAgICAgIHJldHVybiAnPGRpdj4nICsgZmllbGRzLmpvaW4oJyAnKSArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHNob3dHZXRGZWF0dXJlSW5mbyAgKGVyciA6IEVycm9yLCBsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7IGNvbnNvbGUubG9nKGVycik7IHJldHVybjsgfSAvLyBkbyBub3RoaW5nIGlmIHRoZXJlJ3MgYW4gZXJyb3JcblxuICAgICAgICAvLyBPdGhlcndpc2Ugc2hvdyB0aGUgY29udGVudCBpbiBhIHBvcHVwLCBvciBzb21ldGhpbmcuXG4gICAgICAgIHBvcHVwKHsgbWF4V2lkdGg6IDgwMH0pXG4gICAgICAgIC5zZXRMYXRMbmcobGF0bG5nKVxuICAgICAgICAuc2V0Q29udGVudChjb250ZW50KVxuICAgICAgICAub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gZGV0ZXJtaW5lV01TRm9ybWF0KCBsYXllciA6IExheWVyTW9kZWwgKSA6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHMgOiBzdHJpbmdbXSA9IGxheWVyLmZvcm1hdHM7XG4gICAgaWYoZm9ybWF0cyAmJiBmb3JtYXRzLmxlbmd0aCkge1xuICAgICAgICAvL2xvb2sgZm9yIGNvbW1vbiBmb3JtYXRzIHRoYXQgbWFrZSBzZW5zZSBmaXJzdC4uLlxuICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgbGV0IGNvbW1vbiA9IFsgJ2ltYWdlL3BuZzMyJywgJ2ltYWdlL3BuZzI0JywgJ2ltYWdlL3BuZzgnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnIF07XG4gICAgICAgIHdoaWxlKCBpZHggPCBjb21tb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiggZm9ybWF0cy5pbmRleE9mKCBjb21tb25baWR4XSApID49IDAgKSByZXR1cm4gY29tbW9uW2lkeF07XG4gICAgICAgICAgICBpZHgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGhhcyBubyBmb3JtYXRzIHNwZWNpZmllZCwgXCIgK1xuICAgICAgICBcImFzc3VtaW5nIGEgZGVmYXVsdCBvZiAnaW1hZ2UvcG5nJ1wiKTtcbiAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG59XG5cblxuLyoqXG4gKiBzaG9ydC1mb3JtIGZ1bmN0aW9uIGZvciBpbnN0YW50aWF0aW5nIGEgV01TLWJhc2VkIExheWVyJ3MgTGVhZmxldCBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiB3bXMobGF5ZXIgOiBMYXllck1vZGVsKSA6IFdNUyB7XG5cbiAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIFdNUyBMYXllciAnXCIgK1xuICAgICAgICAgICAgKGxheWVyLmxhYmVsIHx8IGxheWVyLmlkKSArXG4gICAgICAgICAgICBcIicgYmVjYXVzZSBsYXllciBoYXMgbm8gc2VydmljZSBhc3NvY2lhdGVkIHdpdGggaXRcIik7XG4gICAgfVxuXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IHNlcnZpY2UuaHJlZjtcbiAgICBpZighdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldNUyBsYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIC8vcGljayBvdXRwdXQgZm9ybWF0IGZvciB0aGUgcmFzdGVyIGltYWdlc1xuICAgIGxldCBmb3JtYXQgPSBkZXRlcm1pbmVXTVNGb3JtYXQobGF5ZXIpO1xuXG4gICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgIH1cblxuICAgIC8vZGV0ZXJtaW5lIHByb3BlciB2ZXJzaW9uIG9mIHRoZSBXTVMgc3BlYyB0byB1c2VcbiAgICBsZXQgdmVyc2lvbiA6IHN0cmluZyA9ICcxLjEuMSc7XG4gICAgbGV0IHZlcnNpb25zIDogc3RyaW5nW10gPSBzZXJ2aWNlLnNlcnZpY2VUeXBlVmVyc2lvbnMgfHwgW107XG4gICAgaWYodmVyc2lvbnMubGVuZ3RoICYmIHZlcnNpb25zLmluZGV4T2YoJzEuMS4xJykgPCAwKSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmc6IFdNUyBTZXJ2aWNlIGRvZXNuJ3QgbGlzdCBzdXBwb3J0ZWQgdmVyc2lvbnMsIGFzc3VtaW5nIDEuMS4xXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzIDogYW55ID0ge1xuICAgICAgICBsYXllcnMgICAgICA6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQgOiB0cnVlLFxuICAgICAgICBmb3JtYXQgICAgICA6IGZvcm1hdCxcbiAgICAgICAgd212SWQgICAgICAgOiBsYXllci5pZCxcbiAgICAgICAgdmVyc2lvbiAgICAgOiB2ZXJzaW9uXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIHtcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TKHVybCwgb3B0cyk7XG5cbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVMgPSBXTVM7XG4gICAgTC50aWxlTGF5ZXIud21zID0gd21zO1xufVxuXG5leHBvcnQge1xuICAgIFdNUyBhcyBkZWZhdWx0LFxuICAgIFdNUyxcbiAgICB3bXNcbn07XG4iXX0=