/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { TileLayer, Util, popup } from 'leaflet';
import { Config } from 'geoplatform.client';
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
function wms(layer) {
    /** @type {?} */
    var service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        var msg = "wms() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
        throw new Error(msg);
    }
    /** @type {?} */
    var url = service.href;
    /** @type {?} */
    var formats = layer.supportedFormats || [];
    /** @type {?} */
    var format = formats.length ? formats[0] : "image/png";
    if (!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }
    /** @type {?} */
    var version = '1.1.1';
    if (service.api && service.api.length) {
        /** @type {?} */
        var is130 = service.api.filter(function (api) { return api.accessURL.indexOf('wms/1.3.0') > 0; }).length > 0;
        if (is130)
            version = '1.3.0';
    }
    /** @type {?} */
    var opts = {
        layers: layer.layerName,
        transparent: true,
        format: format,
        wmvId: layer.id,
        version: version
    };
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    return new WMS(url, opts);
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.TileLayer.WMS = WMS;
    L_1.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSTFDLElBQUE7SUFBa0IsK0JBQWE7SUFJM0IsYUFBWSxHQUFZLEVBQUUsSUFBVztRQUFyQyxZQUNJLGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FFbkI7eUJBTDRCLEtBQUs7UUFJOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0tBQ3pCOzs7O0lBRUQsa0NBQW9COzs7SUFBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELG1DQUFxQjs7O0lBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Ozs7SUFFRCxzQkFBUTs7OztJQUFSLFVBQVUsR0FBUzs7UUFHZixJQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7O1FBSTdC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bEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hGLElBQUcsS0FBSztZQUFFLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDL0I7O0lBRUQsSUFBSSxJQUFJLEdBQUc7UUFDUCxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVM7UUFDdkIsV0FBVyxFQUFFLElBQUk7UUFDakIsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDZixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDO0lBQ0YsSUFBRyxNQUFNLENBQUMsV0FBVztRQUNqQixtQkFBQyxJQUFXLEVBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUU1QyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixJQUFNLEdBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLEdBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuXG5cbmNsYXNzIFdNUyBleHRlbmRzIFRpbGVMYXllci5XTVMge1xuXG4gICAgcHJpdmF0ZSBfZW5hYmxlZCA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVuYWJsZUdldEZlYXR1cmVJbmZvICAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGlzYWJsZUdldEZlYXR1cmVJbmZvICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzR2V0RmVhdHVyZUluZm9FbmFibGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuXG4gICAgb25SZW1vdmUgKG1hcCA6IE1hcCkgOiB0aGlzIHtcblxuICAgICAgICAvL2lmIEdGSSBpcyBlbmFibGVkLCBkaXNhYmxlIGl0IGJlZm9yZSByZW1vdmluZ1xuICAgICAgICBpZih0aGlzLmlzR2V0RmVhdHVyZUluZm9FbmFibGVkKCkpXG4gICAgICAgIHRoaXMuZGlzYWJsZUdldEZlYXR1cmVJbmZvKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlcmVkIHdoZW4gdGhlIGxheWVyIGlzIHJlbW92ZWQgZnJvbSBhIG1hcC5cbiAgICAgICAgLy8gICBVbnJlZ2lzdGVyIGEgY2xpY2sgbGlzdGVuZXIsIHRoZW4gZG8gYWxsIHRoZSB1cHN0cmVhbSBXTVMgdGhpbmdzXG4gICAgICAgIHJldHVybiBzdXBlci5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mbyAgKGV2dCkge1xuICAgICAgICAvLyBNYWtlIGFuIEFKQVggcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCBob3BlIGZvciB0aGUgYmVzdFxuICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRGZWF0dXJlSW5mb1VybChldnQubGF0bG5nKSxcbiAgICAgICAgcGFyc2VHZXRGZWF0dXJlSW5mbyA9IHRoaXMucGFyc2VHZXRGZWF0dXJlSW5mbztcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBzdWNjZXNzICAoZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZXJyID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gbnVsbCA6IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGRhdGEpICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICBkYXRhID0gcGFyc2VHZXRGZWF0dXJlSW5mbyhkYXRhKTtcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKG51bGwsIGV2dC5sYXRsbmcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciAgKHhociwgc3RhdHVzLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8oZXJyb3IpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvVXJsICAobGF0bG5nIDogTGF0TG5nKSB7XG4gICAgICAgIC8vIENvbnN0cnVjdCBhIEdldEZlYXR1cmVJbmZvIHJlcXVlc3QgVVJMIGdpdmVuIGEgcG9pbnRcbiAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5fbWFwLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQobGF0bG5nKSxcbiAgICAgICAgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCksXG5cbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgc3JzOiAnRVBTRzo0MzI2JyxcbiAgICAgICAgICAgIGJib3g6IHRoaXMuX21hcC5nZXRCb3VuZHMoKS50b0JCb3hTdHJpbmcoKSxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS55LFxuICAgICAgICAgICAgd2lkdGg6IHNpemUueCxcbiAgICAgICAgICAgIC8vIGxheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgLy8gcXVlcnlfbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICBpbmZvX2Zvcm1hdDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICB5OiBwb2ludC55LFxuICAgICAgICAgICAgaTogcG9pbnQueCwgLy8xLjMuMFxuICAgICAgICAgICAgajogcG9pbnQueSAgLy8xLjMuMFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB3bXZJZCA9ICh0aGlzLndtc1BhcmFtcyBhcyBhbnkpLndtdklkO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLl91cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdGhpcy5fdXJsLCB0cnVlKTtcbiAgICAgICAgdmFyIHVybCA9ICcvYXBpL2xheWVycy8nICsgd212SWQgKyAnL2ZlYXR1cmUnO1xuICAgICAgICByZXR1cm4gQ29uZmlnLnVhbFVybCArIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpO1xuICAgIH1cblxuICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gKGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IodmFyIGZpZWxkIGluIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKFsnPGRpdj48c3Ryb25nPicsIGZpZWxkLCAnOiA8L3N0cm9uZz4nLCBjb250ZW50W2ZpZWxkXSwgJzwvZGl2PiddLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmllbGRzLmxlbmd0aCA9PSAwKVxuICAgICAgICBmaWVsZHMucHVzaCgnPGVtPk5vIGRhdGEgYXZhaWxhYmxlPC9lbT4nKTtcbiAgICAgICAgcmV0dXJuICc8ZGl2PicgKyBmaWVsZHMuam9pbignICcpICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgc2hvd0dldEZlYXR1cmVJbmZvICAoZXJyIDogRXJyb3IsIGxhdGxuZyA6IExhdExuZywgY29udGVudDogYW55KSB7XG4gICAgICAgIGlmIChlcnIpIHsgY29uc29sZS5sb2coZXJyKTsgcmV0dXJuOyB9IC8vIGRvIG5vdGhpbmcgaWYgdGhlcmUncyBhbiBlcnJvclxuXG4gICAgICAgIC8vIE90aGVyd2lzZSBzaG93IHRoZSBjb250ZW50IGluIGEgcG9wdXAsIG9yIHNvbWV0aGluZy5cbiAgICAgICAgcG9wdXAoeyBtYXhXaWR0aDogODAwfSlcbiAgICAgICAgLnNldExhdExuZyhsYXRsbmcpXG4gICAgICAgIC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgIC5vcGVuT24odGhpcy5fbWFwKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiB3bXMobGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgd21zKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IHNlcnZpY2UuaHJlZjtcbiAgICBsZXQgZm9ybWF0cyA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgfHwgW107XG4gICAgbGV0IGZvcm1hdCAgPSBmb3JtYXRzLmxlbmd0aCA/IGZvcm1hdHNbMF0gOiBcImltYWdlL3BuZ1wiO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICBsZXQgdmVyc2lvbiA9ICcxLjEuMSc7XG4gICAgaWYoc2VydmljZS5hcGkgJiYgc2VydmljZS5hcGkubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpczEzMCA9IHNlcnZpY2UuYXBpLmZpbHRlcihhcGkgPT4gYXBpLmFjY2Vzc1VSTC5pbmRleE9mKCd3bXMvMS4zLjAnKT4wICkubGVuZ3RoID4gMDtcbiAgICAgICAgaWYoaXMxMzApIHZlcnNpb24gPSAnMS4zLjAnO1xuICAgIH1cblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICB3bXZJZDogbGF5ZXIuaWQsXG4gICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBXTVModXJsLCBvcHRzKTtcblxufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNUyA9IFdNUztcbiAgICBMLnRpbGVMYXllci53bXMgPSB3bXM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TIGFzIGRlZmF1bHQsXG4gICAgV01TLFxuICAgIHdtc1xufTtcbiJdfQ==