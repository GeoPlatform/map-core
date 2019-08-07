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
        return Config["ualUrl"] + url + Util.getParamString(params, url, true);
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
    var formats = layer["formats"];
    if (formats && formats.length) {
        /** @type {?} */
        var idx = 0;
        /** @type {?} */
        var common = ['image/png32', 'image/png24', 'image/png8', 'image/png', 'image/jpeg'];
        while (idx < common.length) {
            if (formats.indexOf(common[idx]) >= 0)
                return common[idx];
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
    var service = layer["services"] && layer["services"].length ?
        layer["services"][0] : null;
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
    var supportedCrs = layer["crs"] || [];
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
    if (Config["leafletPane"]) {
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUNILE1BQU0sRUFDVCxNQUFNLHFCQUFxQixDQUFDO0FBSTdCLElBQUE7SUFBa0IsK0JBQWE7SUFJM0IsYUFBWSxHQUFZLEVBQUUsSUFBVztRQUFyQyxZQUNJLGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FFbkI7eUJBTDRCLEtBQUs7UUFJOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0tBQ3pCOzs7O0lBRUQsa0NBQW9COzs7SUFBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELG1DQUFxQjs7O0lBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Ozs7SUFFRCxzQkFBUTs7OztJQUFSLFVBQVUsR0FBUzs7UUFHZixJQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7O1FBSTdC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QU87S0FDeEIsQ0FBQztJQUNGLElBQUcsTUFBTSxpQkFBYztRQUNuQixtQkFBQyxJQUFXLEVBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxlQUFZLENBQUM7S0FDM0M7SUFFRCxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixJQUFNLEdBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AZ2VvcGxhdGZvcm0vY2xpZW50L2Rpc3Qvc2hhcmVkL21vZGVscy5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWxcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jbGFzcyBXTVMgZXh0ZW5kcyBUaWxlTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2VuYWJsZWQgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0cyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVHZXRGZWF0dXJlSW5mbyAgKCkge1xuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVHZXRGZWF0dXJlSW5mbyAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0dldEZlYXR1cmVJbmZvRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIDogdGhpcyB7XG5cbiAgICAgICAgLy9pZiBHRkkgaXMgZW5hYmxlZCwgZGlzYWJsZSBpdCBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgaWYodGhpcy5pc0dldEZlYXR1cmVJbmZvRW5hYmxlZCgpKVxuICAgICAgICB0aGlzLmRpc2FibGVHZXRGZWF0dXJlSW5mbygpO1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuIHRoZSBsYXllciBpcyByZW1vdmVkIGZyb20gYSBtYXAuXG4gICAgICAgIC8vICAgVW5yZWdpc3RlciBhIGNsaWNrIGxpc3RlbmVyLCB0aGVuIGRvIGFsbCB0aGUgdXBzdHJlYW0gV01TIHRoaW5nc1xuICAgICAgICByZXR1cm4gc3VwZXIub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm8gIChldnQpIHtcbiAgICAgICAgLy8gTWFrZSBhbiBBSkFYIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaG9wZSBmb3IgdGhlIGJlc3RcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0RmVhdHVyZUluZm9VcmwoZXZ0LmxhdGxuZyksXG4gICAgICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gPSB0aGlzLnBhcnNlR2V0RmVhdHVyZUluZm87XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzcyAgKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGVyciA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IG51bGwgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9IHBhcnNlR2V0RmVhdHVyZUluZm8oZGF0YSk7XG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhudWxsLCBldnQubGF0bG5nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGVycm9yKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mb1VybCAgKGxhdGxuZyA6IExhdExuZykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgYSBHZXRGZWF0dXJlSW5mbyByZXF1ZXN0IFVSTCBnaXZlbiBhIHBvaW50XG4gICAgICAgIHZhciBwb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXG4gICAgICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxuXG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNyczogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICBiYm94OiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkudG9CQm94U3RyaW5nKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLngsXG4gICAgICAgICAgICAvLyBsYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIC8vIHF1ZXJ5X2xheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgaW5mb19mb3JtYXQ6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgIGk6IHBvaW50LngsIC8vMS4zLjBcbiAgICAgICAgICAgIGo6IHBvaW50LnkgIC8vMS4zLjBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd212SWQgPSAodGhpcy53bXNQYXJhbXMgYXMgYW55KS53bXZJZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5fdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS9sYXllcnMvJyArIHdtdklkICsgJy9mZWF0dXJlJztcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJzZUdldEZlYXR1cmVJbmZvIChjb250ZW50KSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBmaWVsZCBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICBmaWVsZHMucHVzaChbJzxkaXY+PHN0cm9uZz4nLCBmaWVsZCwgJzogPC9zdHJvbmc+JywgY29udGVudFtmaWVsZF0sICc8L2Rpdj4nXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkcy5sZW5ndGggPT0gMClcbiAgICAgICAgZmllbGRzLnB1c2goJzxlbT5ObyBkYXRhIGF2YWlsYWJsZTwvZW0+Jyk7XG4gICAgICAgIHJldHVybiAnPGRpdj4nICsgZmllbGRzLmpvaW4oJyAnKSArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHNob3dHZXRGZWF0dXJlSW5mbyAgKGVyciA6IEVycm9yLCBsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7IGNvbnNvbGUubG9nKGVycik7IHJldHVybjsgfSAvLyBkbyBub3RoaW5nIGlmIHRoZXJlJ3MgYW4gZXJyb3JcblxuICAgICAgICAvLyBPdGhlcndpc2Ugc2hvdyB0aGUgY29udGVudCBpbiBhIHBvcHVwLCBvciBzb21ldGhpbmcuXG4gICAgICAgIHBvcHVwKHsgbWF4V2lkdGg6IDgwMH0pXG4gICAgICAgIC5zZXRMYXRMbmcobGF0bG5nKVxuICAgICAgICAuc2V0Q29udGVudChjb250ZW50KVxuICAgICAgICAub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gZGV0ZXJtaW5lV01TRm9ybWF0KCBsYXllciA6IExheWVyTW9kZWwgKSA6IHN0cmluZyB7XG4gICAgbGV0IGZvcm1hdHMgOiBzdHJpbmdbXSA9IGxheWVyLmZvcm1hdHM7XG4gICAgaWYoZm9ybWF0cyAmJiBmb3JtYXRzLmxlbmd0aCkge1xuICAgICAgICAvL2xvb2sgZm9yIGNvbW1vbiBmb3JtYXRzIHRoYXQgbWFrZSBzZW5zZSBmaXJzdC4uLlxuICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgbGV0IGNvbW1vbiA9IFsgJ2ltYWdlL3BuZzMyJywgJ2ltYWdlL3BuZzI0JywgJ2ltYWdlL3BuZzgnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnIF07XG4gICAgICAgIHdoaWxlKCBpZHggPCBjb21tb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiggZm9ybWF0cy5pbmRleE9mKCBjb21tb25baWR4XSApID49IDAgKSByZXR1cm4gY29tbW9uW2lkeF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBoYXMgbm8gZm9ybWF0cyBzcGVjaWZpZWQsIFwiICtcbiAgICAgICAgXCJhc3N1bWluZyBhIGRlZmF1bHQgb2YgJ2ltYWdlL3BuZydcIik7XG4gICAgcmV0dXJuICdpbWFnZS9wbmcnO1xufVxuXG5cbi8qKlxuICogc2hvcnQtZm9ybSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIFdNUy1iYXNlZCBMYXllcidzIExlYWZsZXQgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gd21zKGxheWVyIDogTGF5ZXJNb2RlbCkgOiBXTVMge1xuXG4gICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBXTVMgTGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIChsYXllci5sYWJlbCB8fCBsYXllci5pZCkgK1xuICAgICAgICAgICAgXCInIGJlY2F1c2UgbGF5ZXIgaGFzIG5vIHNlcnZpY2UgYXNzb2NpYXRlZCB3aXRoIGl0XCIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBzZXJ2aWNlLmhyZWY7XG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICAvL3BpY2sgb3V0cHV0IGZvcm1hdCBmb3IgdGhlIHJhc3RlciBpbWFnZXNcbiAgICBsZXQgZm9ybWF0ID0gZGV0ZXJtaW5lV01TRm9ybWF0KGxheWVyKTtcblxuICAgIGxldCBzdXBwb3J0ZWRDcnMgPSBsYXllci5jcnMgfHwgW107XG4gICAgaWYoc3VwcG9ydGVkQ3JzICYmIHN1cHBvcnRlZENycy5sZW5ndGggPiAwICYmIH5zdXBwb3J0ZWRDcnMuaW5kZXhPZihcIkVTUEc6Mzg1N1wiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgXCJFUFNHOjM4NTcgU3BoZXJpY2FsIE1lcmNhdG9yIHByb2plY3Rpb24gYW5kIG1heSBub3QgcmVuZGVyIGFwcHJvcHJpYXRlbHkgb3IgYXQgYWxsLlwiKTtcbiAgICB9XG5cbiAgICAvL2RldGVybWluZSBwcm9wZXIgdmVyc2lvbiBvZiB0aGUgV01TIHNwZWMgdG8gdXNlXG4gICAgbGV0IHZlcnNpb24gOiBzdHJpbmcgPSAnMS4xLjEnO1xuICAgIGxldCB2ZXJzaW9ucyA6IHN0cmluZ1tdID0gc2VydmljZS5zZXJ2aWNlVHlwZVZlcnNpb25zIHx8IFtdO1xuICAgIGlmKHZlcnNpb25zLmxlbmd0aCAmJiB2ZXJzaW9ucy5pbmRleE9mKCcxLjEuMScpIDwgMCkge1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBXTVMgU2VydmljZSBkb2Vzbid0IGxpc3Qgc3VwcG9ydGVkIHZlcnNpb25zLCBhc3N1bWluZyAxLjEuMVwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgbGF5ZXJzICAgICAgOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50IDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0ICAgICAgOiBmb3JtYXQsXG4gICAgICAgIHdtdklkICAgICAgIDogbGF5ZXIuaWQsXG4gICAgICAgIHZlcnNpb24gICAgIDogdmVyc2lvblxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSB7XG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNUyh1cmwsIG9wdHMpO1xuXG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TID0gV01TO1xuICAgIEwudGlsZUxheWVyLndtcyA9IHdtcztcbn1cblxuZXhwb3J0IHtcbiAgICBXTVMgYXMgZGVmYXVsdCxcbiAgICBXTVMsXG4gICAgd21zXG59O1xuIl19