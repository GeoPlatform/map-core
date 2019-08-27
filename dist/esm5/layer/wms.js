/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
     * @param {?} map
     * @return {?}
     */
    WMS.prototype.onRemove = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        //if GFI is enabled, disable it before removing
        if (this.isGetFeatureInfoEnabled())
            this.disableGetFeatureInfo();
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return _super.prototype.onRemove.call(this, map);
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
                (function () {
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
                (function () { _this.showGetFeatureInfo(error); });
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
        var wmvId = (/** @type {?} */ (this.wmsParams)).wmvId;
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
    /** @type {?} */
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
    /** @type {?} */
    var format = determineWMSFormat(layer);
    /** @type {?} */
    var supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
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
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    }
    return new WMS(url, opts);
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.TileLayer.WMS = WMS;
    L_1.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUNILE1BQU0sRUFDVCxNQUFNLHFCQUFxQixDQUFDO0FBSTdCLElBQUE7SUFBa0IsK0JBQWE7SUFJM0IsYUFBWSxHQUFZLEVBQUUsSUFBVztRQUFyQyxZQUNJLGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FFbkI7eUJBTDRCLEtBQUs7UUFJOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0tBQ3pCOzs7O0lBRUQsa0NBQW9COzs7SUFBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELG1DQUFxQjs7O0lBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Ozs7SUFFRCxzQkFBUTs7OztJQUFSLFVBQVUsR0FBUzs7UUFHZixJQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7O1FBSTdC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QUFHLElBQUk7UUFDbEIsTUFBTSxFQUFRLE1BQU07UUFDcEIsS0FBSyxFQUFTLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sRUFBTyxPQUFPO0tBQ3hCLENBQUM7SUFDRixJQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDbkIsbUJBQUMsSUFBVyxFQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7S0FDM0M7SUFFRCxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixJQUFNLEdBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AZ2VvcGxhdGZvcm0vY2xpZW50L2Rpc3Qvc2hhcmVkL21vZGVscy5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWxcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jbGFzcyBXTVMgZXh0ZW5kcyBUaWxlTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2VuYWJsZWQgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0cyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVHZXRGZWF0dXJlSW5mbyAgKCkge1xuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVHZXRGZWF0dXJlSW5mbyAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0dldEZlYXR1cmVJbmZvRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIDogdGhpcyB7XG5cbiAgICAgICAgLy9pZiBHRkkgaXMgZW5hYmxlZCwgZGlzYWJsZSBpdCBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgaWYodGhpcy5pc0dldEZlYXR1cmVJbmZvRW5hYmxlZCgpKVxuICAgICAgICB0aGlzLmRpc2FibGVHZXRGZWF0dXJlSW5mbygpO1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuIHRoZSBsYXllciBpcyByZW1vdmVkIGZyb20gYSBtYXAuXG4gICAgICAgIC8vICAgVW5yZWdpc3RlciBhIGNsaWNrIGxpc3RlbmVyLCB0aGVuIGRvIGFsbCB0aGUgdXBzdHJlYW0gV01TIHRoaW5nc1xuICAgICAgICByZXR1cm4gc3VwZXIub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm8gIChldnQpIHtcbiAgICAgICAgLy8gTWFrZSBhbiBBSkFYIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaG9wZSBmb3IgdGhlIGJlc3RcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0RmVhdHVyZUluZm9VcmwoZXZ0LmxhdGxuZyksXG4gICAgICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gPSB0aGlzLnBhcnNlR2V0RmVhdHVyZUluZm87XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzcyAgKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGVyciA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IG51bGwgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9IHBhcnNlR2V0RmVhdHVyZUluZm8oZGF0YSk7XG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhudWxsLCBldnQubGF0bG5nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGVycm9yKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mb1VybCAgKGxhdGxuZyA6IExhdExuZykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgYSBHZXRGZWF0dXJlSW5mbyByZXF1ZXN0IFVSTCBnaXZlbiBhIHBvaW50XG4gICAgICAgIHZhciBwb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXG4gICAgICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxuXG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNyczogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICBiYm94OiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkudG9CQm94U3RyaW5nKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLngsXG4gICAgICAgICAgICAvLyBsYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIC8vIHF1ZXJ5X2xheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgaW5mb19mb3JtYXQ6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgIGk6IHBvaW50LngsIC8vMS4zLjBcbiAgICAgICAgICAgIGo6IHBvaW50LnkgIC8vMS4zLjBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd212SWQgPSAodGhpcy53bXNQYXJhbXMgYXMgYW55KS53bXZJZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5fdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS9sYXllcnMvJyArIHdtdklkICsgJy9mZWF0dXJlJztcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJzZUdldEZlYXR1cmVJbmZvIChjb250ZW50KSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBmaWVsZCBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICBmaWVsZHMucHVzaChbJzxkaXY+PHN0cm9uZz4nLCBmaWVsZCwgJzogPC9zdHJvbmc+JywgY29udGVudFtmaWVsZF0sICc8L2Rpdj4nXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkcy5sZW5ndGggPT0gMClcbiAgICAgICAgZmllbGRzLnB1c2goJzxlbT5ObyBkYXRhIGF2YWlsYWJsZTwvZW0+Jyk7XG4gICAgICAgIHJldHVybiAnPGRpdj4nICsgZmllbGRzLmpvaW4oJyAnKSArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHNob3dHZXRGZWF0dXJlSW5mbyAgKGVyciA6IEVycm9yLCBsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7IGNvbnNvbGUubG9nKGVycik7IHJldHVybjsgfSAvLyBkbyBub3RoaW5nIGlmIHRoZXJlJ3MgYW4gZXJyb3JcblxuICAgICAgICAvLyBPdGhlcndpc2Ugc2hvdyB0aGUgY29udGVudCBpbiBhIHBvcHVwLCBvciBzb21ldGhpbmcuXG4gICAgICAgIHBvcHVwKHsgbWF4V2lkdGg6IDgwMH0pXG4gICAgICAgIC5zZXRMYXRMbmcobGF0bG5nKVxuICAgICAgICAuc2V0Q29udGVudChjb250ZW50KVxuICAgICAgICAub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gZGV0ZXJtaW5lV01TRm9ybWF0KCBsYXllciA6IExheWVyTW9kZWwgKSA6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHMgOiBzdHJpbmdbXSA9IGxheWVyLmZvcm1hdHM7XG4gICAgaWYoZm9ybWF0cyAmJiBmb3JtYXRzLmxlbmd0aCkge1xuICAgICAgICAvL2xvb2sgZm9yIGNvbW1vbiBmb3JtYXRzIHRoYXQgbWFrZSBzZW5zZSBmaXJzdC4uLlxuICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgbGV0IGNvbW1vbiA9IFsgJ2ltYWdlL3BuZzMyJywgJ2ltYWdlL3BuZzI0JywgJ2ltYWdlL3BuZzgnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnIF07XG4gICAgICAgIHdoaWxlKCBpZHggPCBjb21tb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiggZm9ybWF0cy5pbmRleE9mKCBjb21tb25baWR4XSApID49IDAgKSByZXR1cm4gY29tbW9uW2lkeF07XG4gICAgICAgICAgICBpZHgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGhhcyBubyBmb3JtYXRzIHNwZWNpZmllZCwgXCIgK1xuICAgICAgICBcImFzc3VtaW5nIGEgZGVmYXVsdCBvZiAnaW1hZ2UvcG5nJ1wiKTtcbiAgICByZXR1cm4gJ2ltYWdlL3BuZyc7XG59XG5cblxuLyoqXG4gKiBzaG9ydC1mb3JtIGZ1bmN0aW9uIGZvciBpbnN0YW50aWF0aW5nIGEgV01TLWJhc2VkIExheWVyJ3MgTGVhZmxldCBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiB3bXMobGF5ZXIgOiBMYXllck1vZGVsKSA6IFdNUyB7XG5cbiAgICBsZXQgc2VydmljZSA6IFNlcnZpY2VNb2RlbCA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIFdNUyBMYXllciAnXCIgK1xuICAgICAgICAgICAgKGxheWVyLmxhYmVsIHx8IGxheWVyLmlkKSArXG4gICAgICAgICAgICBcIicgYmVjYXVzZSBsYXllciBoYXMgbm8gc2VydmljZSBhc3NvY2lhdGVkIHdpdGggaXRcIik7XG4gICAgfVxuXG4gICAgbGV0IHVybCA6IHN0cmluZyA9IHNlcnZpY2UuaHJlZjtcbiAgICBpZighdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldNUyBsYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIC8vcGljayBvdXRwdXQgZm9ybWF0IGZvciB0aGUgcmFzdGVyIGltYWdlc1xuICAgIGxldCBmb3JtYXQgPSBkZXRlcm1pbmVXTVNGb3JtYXQobGF5ZXIpO1xuXG4gICAgbGV0IHN1cHBvcnRlZENycyA9IGxheWVyLmNycyB8fCBbXTtcbiAgICBpZihzdXBwb3J0ZWRDcnMgJiYgc3VwcG9ydGVkQ3JzLmxlbmd0aCA+IDAgJiYgfnN1cHBvcnRlZENycy5pbmRleE9mKFwiRVNQRzozODU3XCIpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgZG9lcyBub3Qgc3VwcG9ydCBcIiArXG4gICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgIH1cblxuICAgIC8vZGV0ZXJtaW5lIHByb3BlciB2ZXJzaW9uIG9mIHRoZSBXTVMgc3BlYyB0byB1c2VcbiAgICBsZXQgdmVyc2lvbiA6IHN0cmluZyA9ICcxLjEuMSc7XG4gICAgbGV0IHZlcnNpb25zIDogc3RyaW5nW10gPSBzZXJ2aWNlLnNlcnZpY2VUeXBlVmVyc2lvbnMgfHwgW107XG4gICAgaWYodmVyc2lvbnMubGVuZ3RoICYmIHZlcnNpb25zLmluZGV4T2YoJzEuMS4xJykgPCAwKSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmc6IFdNUyBTZXJ2aWNlIGRvZXNuJ3QgbGlzdCBzdXBwb3J0ZWQgdmVyc2lvbnMsIGFzc3VtaW5nIDEuMS4xXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzIDogYW55ID0ge1xuICAgICAgICBsYXllcnMgICAgICA6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQgOiB0cnVlLFxuICAgICAgICBmb3JtYXQgICAgICA6IGZvcm1hdCxcbiAgICAgICAgd212SWQgICAgICAgOiBsYXllci5pZCxcbiAgICAgICAgdmVyc2lvbiAgICAgOiB2ZXJzaW9uXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIHtcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TKHVybCwgb3B0cyk7XG5cbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVMgPSBXTVM7XG4gICAgTC50aWxlTGF5ZXIud21zID0gd21zO1xufVxuXG5leHBvcnQge1xuICAgIFdNUyBhcyBkZWZhdWx0LFxuICAgIFdNUyxcbiAgICB3bXNcbn07XG4iXX0=