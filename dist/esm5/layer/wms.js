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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUNILE1BQU0sRUFDVCxNQUFNLHFCQUFxQixDQUFDO0FBSTdCLElBQUE7SUFBa0IsK0JBQWE7SUFJM0IsYUFBWSxHQUFZLEVBQUUsSUFBVztRQUFyQyxZQUNJLGtCQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FFbkI7eUJBTDRCLEtBQUs7UUFJOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7O0tBQ3pCOzs7O0lBRUQsa0NBQW9COzs7SUFBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELG1DQUFxQjs7O0lBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCxxQ0FBdUI7OztJQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN4Qjs7Ozs7SUFFRCxzQkFBUTs7OztJQUFSLFVBQVUsR0FBUzs7UUFHZixJQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7O1FBSTdC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RTtRQUN0QixPQUFPLEVBQU8sT0FBTztLQUN4QixDQUFDO0lBQ0YsSUFBRyxNQUFNLGlCQUFjO1FBQ25CLG1CQUFDLElBQVcsRUFBQyxDQUFDLElBQUksR0FBRyxNQUFNLGVBQVksQ0FBQztLQUMzQztJQUVELE9BQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBRTdCO0FBRUQsSUFBSSxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUc7O0lBQ3BCLElBQU0sR0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixHQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdEIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ3pCO0FBRUQsT0FBTyxFQUNILEdBQUcsSUFBSSxPQUFPLEVBQ2QsR0FBRyxFQUNILEdBQUcsRUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0BnZW9wbGF0Zm9ybS9jbGllbnQvZGlzdC9zaGFyZWQvbW9kZWxzLmQudHNcIiAvPlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgeyBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBMYXRMbmcsIFV0aWwsIHBvcHVwIH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7XG4gICAgQ29uZmlnLCBMYXllciBhcyBMYXllck1vZGVsLCBTZXJ2aWNlIGFzIFNlcnZpY2VNb2RlbFxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5cbmNsYXNzIFdNUyBleHRlbmRzIFRpbGVMYXllci5XTVMge1xuXG4gICAgcHJpdmF0ZSBfZW5hYmxlZCA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVuYWJsZUdldEZlYXR1cmVJbmZvICAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGlzYWJsZUdldEZlYXR1cmVJbmZvICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzR2V0RmVhdHVyZUluZm9FbmFibGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuXG4gICAgb25SZW1vdmUgKG1hcCA6IE1hcCkgOiB0aGlzIHtcblxuICAgICAgICAvL2lmIEdGSSBpcyBlbmFibGVkLCBkaXNhYmxlIGl0IGJlZm9yZSByZW1vdmluZ1xuICAgICAgICBpZih0aGlzLmlzR2V0RmVhdHVyZUluZm9FbmFibGVkKCkpXG4gICAgICAgIHRoaXMuZGlzYWJsZUdldEZlYXR1cmVJbmZvKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlcmVkIHdoZW4gdGhlIGxheWVyIGlzIHJlbW92ZWQgZnJvbSBhIG1hcC5cbiAgICAgICAgLy8gICBVbnJlZ2lzdGVyIGEgY2xpY2sgbGlzdGVuZXIsIHRoZW4gZG8gYWxsIHRoZSB1cHN0cmVhbSBXTVMgdGhpbmdzXG4gICAgICAgIHJldHVybiBzdXBlci5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mbyAgKGV2dCkge1xuICAgICAgICAvLyBNYWtlIGFuIEFKQVggcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCBob3BlIGZvciB0aGUgYmVzdFxuICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRGZWF0dXJlSW5mb1VybChldnQubGF0bG5nKSxcbiAgICAgICAgcGFyc2VHZXRGZWF0dXJlSW5mbyA9IHRoaXMucGFyc2VHZXRGZWF0dXJlSW5mbztcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBzdWNjZXNzICAoZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZXJyID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gbnVsbCA6IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGRhdGEpICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICBkYXRhID0gcGFyc2VHZXRGZWF0dXJlSW5mbyhkYXRhKTtcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKG51bGwsIGV2dC5sYXRsbmcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciAgKHhociwgc3RhdHVzLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8oZXJyb3IpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvVXJsICAobGF0bG5nIDogTGF0TG5nKSB7XG4gICAgICAgIC8vIENvbnN0cnVjdCBhIEdldEZlYXR1cmVJbmZvIHJlcXVlc3QgVVJMIGdpdmVuIGEgcG9pbnRcbiAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5fbWFwLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQobGF0bG5nKSxcbiAgICAgICAgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCksXG5cbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgc3JzOiAnRVBTRzo0MzI2JyxcbiAgICAgICAgICAgIGJib3g6IHRoaXMuX21hcC5nZXRCb3VuZHMoKS50b0JCb3hTdHJpbmcoKSxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS55LFxuICAgICAgICAgICAgd2lkdGg6IHNpemUueCxcbiAgICAgICAgICAgIC8vIGxheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgLy8gcXVlcnlfbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICBpbmZvX2Zvcm1hdDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICB5OiBwb2ludC55LFxuICAgICAgICAgICAgaTogcG9pbnQueCwgLy8xLjMuMFxuICAgICAgICAgICAgajogcG9pbnQueSAgLy8xLjMuMFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB3bXZJZCA9ICh0aGlzLndtc1BhcmFtcyBhcyBhbnkpLndtdklkO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLl91cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdGhpcy5fdXJsLCB0cnVlKTtcbiAgICAgICAgdmFyIHVybCA9ICcvYXBpL2xheWVycy8nICsgd212SWQgKyAnL2ZlYXR1cmUnO1xuICAgICAgICByZXR1cm4gQ29uZmlnLnVhbFVybCArIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpO1xuICAgIH1cblxuICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gKGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IodmFyIGZpZWxkIGluIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKFsnPGRpdj48c3Ryb25nPicsIGZpZWxkLCAnOiA8L3N0cm9uZz4nLCBjb250ZW50W2ZpZWxkXSwgJzwvZGl2PiddLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmllbGRzLmxlbmd0aCA9PSAwKVxuICAgICAgICBmaWVsZHMucHVzaCgnPGVtPk5vIGRhdGEgYXZhaWxhYmxlPC9lbT4nKTtcbiAgICAgICAgcmV0dXJuICc8ZGl2PicgKyBmaWVsZHMuam9pbignICcpICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgc2hvd0dldEZlYXR1cmVJbmZvICAoZXJyIDogRXJyb3IsIGxhdGxuZyA6IExhdExuZywgY29udGVudDogYW55KSB7XG4gICAgICAgIGlmIChlcnIpIHsgY29uc29sZS5sb2coZXJyKTsgcmV0dXJuOyB9IC8vIGRvIG5vdGhpbmcgaWYgdGhlcmUncyBhbiBlcnJvclxuXG4gICAgICAgIC8vIE90aGVyd2lzZSBzaG93IHRoZSBjb250ZW50IGluIGEgcG9wdXAsIG9yIHNvbWV0aGluZy5cbiAgICAgICAgcG9wdXAoeyBtYXhXaWR0aDogODAwfSlcbiAgICAgICAgLnNldExhdExuZyhsYXRsbmcpXG4gICAgICAgIC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgIC5vcGVuT24odGhpcy5fbWFwKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiBkZXRlcm1pbmVXTVNGb3JtYXQoIGxheWVyIDogTGF5ZXJNb2RlbCApIDogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0cyA6IHN0cmluZ1tdID0gbGF5ZXIuZm9ybWF0cztcbiAgICBpZihmb3JtYXRzICYmIGZvcm1hdHMubGVuZ3RoKSB7XG4gICAgICAgIC8vbG9vayBmb3IgY29tbW9uIGZvcm1hdHMgdGhhdCBtYWtlIHNlbnNlIGZpcnN0Li4uXG4gICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICBsZXQgY29tbW9uID0gWyAnaW1hZ2UvcG5nMzInLCAnaW1hZ2UvcG5nMjQnLCAnaW1hZ2UvcG5nOCcsICdpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZycgXTtcbiAgICAgICAgd2hpbGUoIGlkeCA8IGNvbW1vbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmKCBmb3JtYXRzLmluZGV4T2YoIGNvbW1vbltpZHhdICkgPj0gMCApIHJldHVybiBjb21tb25baWR4XTtcbiAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgaGFzIG5vIGZvcm1hdHMgc3BlY2lmaWVkLCBcIiArXG4gICAgICAgIFwiYXNzdW1pbmcgYSBkZWZhdWx0IG9mICdpbWFnZS9wbmcnXCIpO1xuICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbn1cblxuXG4vKipcbiAqIHNob3J0LWZvcm0gZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBXTVMtYmFzZWQgTGF5ZXIncyBMZWFmbGV0IGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHdtcyhsYXllciA6IExheWVyTW9kZWwpIDogV01TIHtcblxuICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgV01TIExheWVyICdcIiArXG4gICAgICAgICAgICAobGF5ZXIubGFiZWwgfHwgbGF5ZXIuaWQpICtcbiAgICAgICAgICAgIFwiJyBiZWNhdXNlIGxheWVyIGhhcyBubyBzZXJ2aWNlIGFzc29jaWF0ZWQgd2l0aCBpdFwiKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsIDogc3RyaW5nID0gc2VydmljZS5ocmVmO1xuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TIGxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgLy9waWNrIG91dHB1dCBmb3JtYXQgZm9yIHRoZSByYXN0ZXIgaW1hZ2VzXG4gICAgbGV0IGZvcm1hdCA9IGRldGVybWluZVdNU0Zvcm1hdChsYXllcik7XG5cbiAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgfVxuXG4gICAgLy9kZXRlcm1pbmUgcHJvcGVyIHZlcnNpb24gb2YgdGhlIFdNUyBzcGVjIHRvIHVzZVxuICAgIGxldCB2ZXJzaW9uIDogc3RyaW5nID0gJzEuMS4xJztcbiAgICBsZXQgdmVyc2lvbnMgOiBzdHJpbmdbXSA9IHNlcnZpY2Uuc2VydmljZVR5cGVWZXJzaW9ucyB8fCBbXTtcbiAgICBpZih2ZXJzaW9ucy5sZW5ndGggJiYgdmVyc2lvbnMuaW5kZXhPZignMS4xLjEnKSA8IDApIHtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogV01TIFNlcnZpY2UgZG9lc24ndCBsaXN0IHN1cHBvcnRlZCB2ZXJzaW9ucywgYXNzdW1pbmcgMS4xLjFcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIGxheWVycyAgICAgIDogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudCA6IHRydWUsXG4gICAgICAgIGZvcm1hdCAgICAgIDogZm9ybWF0LFxuICAgICAgICB3bXZJZCAgICAgICA6IGxheWVyLmlkLFxuICAgICAgICB2ZXJzaW9uICAgICA6IHZlcnNpb25cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkge1xuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXTVModXJsLCBvcHRzKTtcblxufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNUyA9IFdNUztcbiAgICBMLnRpbGVMYXllci53bXMgPSB3bXM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TIGFzIGRlZmF1bHQsXG4gICAgV01TLFxuICAgIHdtc1xufTtcbiJdfQ==