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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcC8iLCJzb3VyY2VzIjpbImxheWVyL3dtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFHdEIsT0FBTyxFQUFPLFNBQVMsRUFBcUIsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJMUMsSUFBQTtJQUFrQiwrQkFBYTtJQUkzQixhQUFZLEdBQVksRUFBRSxJQUFXO1FBQXJDLFlBQ0ksa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUVuQjt5QkFMNEIsS0FBSztRQUk5QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzs7S0FDekI7Ozs7SUFFRCxrQ0FBb0I7OztJQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3hCOzs7O0lBRUQsbUNBQXFCOzs7SUFBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELHFDQUF1Qjs7O0lBQXZCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3hCOzs7OztJQUVELHNCQUFROzs7O0lBQVIsVUFBVSxHQUFTOztRQUdmLElBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOzs7UUFJN0IsT0FB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QUFJLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFDLENBQUMsRUFBcEMsQ0FBb0MsQ0FBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDeEYsSUFBRyxLQUFLO1lBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQztLQUMvQjs7SUFFRCxJQUFJLElBQUksR0FBRztRQUNQLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUztRQUN2QixXQUFXLEVBQUUsSUFBSTtRQUNqQixNQUFNLEVBQUUsTUFBTTtRQUNkLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNmLE9BQU8sRUFBRSxPQUFPO0tBQ25CLENBQUM7SUFDRixJQUFHLE1BQU0sQ0FBQyxXQUFXO1FBQ2pCLG1CQUFDLElBQVcsRUFBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBRTVDLE9BQU8sSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBRTdCO0FBRUQsSUFBSSxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUc7O0lBQ3BCLElBQU0sR0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixHQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDdEIsR0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0NBQ3pCO0FBRUQsT0FBTyxFQUNILEdBQUcsSUFBSSxPQUFPLEVBQ2QsR0FBRyxFQUNILEdBQUcsRUFDTixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBMYXRMbmcsIFV0aWwsIHBvcHVwIH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cblxuY2xhc3MgV01TIGV4dGVuZHMgVGlsZUxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9lbmFibGVkIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdHMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5hYmxlR2V0RmVhdHVyZUluZm8gICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlR2V0RmVhdHVyZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSA6IHRoaXMge1xuXG4gICAgICAgIC8vaWYgR0ZJIGlzIGVuYWJsZWQsIGRpc2FibGUgaXQgYmVmb3JlIHJlbW92aW5nXG4gICAgICAgIGlmKHRoaXMuaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQoKSlcbiAgICAgICAgdGhpcy5kaXNhYmxlR2V0RmVhdHVyZUluZm8oKTtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIGEgbWFwLlxuICAgICAgICAvLyAgIFVucmVnaXN0ZXIgYSBjbGljayBsaXN0ZW5lciwgdGhlbiBkbyBhbGwgdGhlIHVwc3RyZWFtIFdNUyB0aGluZ3NcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcblxuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvICAoZXZ0KSB7XG4gICAgICAgIC8vIE1ha2UgYW4gQUpBWCByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgYW5kIGhvcGUgZm9yIHRoZSBiZXN0XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEZlYXR1cmVJbmZvVXJsKGV2dC5sYXRsbmcpLFxuICAgICAgICBwYXJzZUdldEZlYXR1cmVJbmZvID0gdGhpcy5wYXJzZUdldEZlYXR1cmVJbmZvO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgIChkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAgICAgICAgIC8vIHZhciBlcnIgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBudWxsIDogZGF0YTtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUdldEZlYXR1cmVJbmZvKGRhdGEpO1xuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8obnVsbCwgZXZ0LmxhdGxuZywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yICAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhlcnJvcik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm9VcmwgIChsYXRsbmcgOiBMYXRMbmcpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IGEgR2V0RmVhdHVyZUluZm8gcmVxdWVzdCBVUkwgZ2l2ZW4gYSBwb2ludFxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxuICAgICAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblxuICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgYmJveDogdGhpcy5fbWFwLmdldEJvdW5kcygpLnRvQkJveFN0cmluZygpLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS54LFxuICAgICAgICAgICAgLy8gbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICAvLyBxdWVyeV9sYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIGluZm9fZm9ybWF0OiAndGV4dC94bWwnLFxuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICBpOiBwb2ludC54LCAvLzEuMy4wXG4gICAgICAgICAgICBqOiBwb2ludC55ICAvLzEuMy4wXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHdtdklkID0gKHRoaXMud21zUGFyYW1zIGFzIGFueSkud212SWQ7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3VybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvbGF5ZXJzLycgKyB3bXZJZCArICcvZmVhdHVyZSc7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGFyc2VHZXRGZWF0dXJlSW5mbyAoY29udGVudCkge1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvcih2YXIgZmllbGQgaW4gY29udGVudCkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goWyc8ZGl2PjxzdHJvbmc+JywgZmllbGQsICc6IDwvc3Ryb25nPicsIGNvbnRlbnRbZmllbGRdLCAnPC9kaXY+J10uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZHMubGVuZ3RoID09IDApXG4gICAgICAgIGZpZWxkcy5wdXNoKCc8ZW0+Tm8gZGF0YSBhdmFpbGFibGU8L2VtPicpO1xuICAgICAgICByZXR1cm4gJzxkaXY+JyArIGZpZWxkcy5qb2luKCcgJykgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBzaG93R2V0RmVhdHVyZUluZm8gIChlcnIgOiBFcnJvciwgbGF0bG5nIDogTGF0TG5nLCBjb250ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVycikgeyBjb25zb2xlLmxvZyhlcnIpOyByZXR1cm47IH0gLy8gZG8gbm90aGluZyBpZiB0aGVyZSdzIGFuIGVycm9yXG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgdGhlIGNvbnRlbnQgaW4gYSBwb3B1cCwgb3Igc29tZXRoaW5nLlxuICAgICAgICBwb3B1cCh7IG1heFdpZHRoOiA4MDB9KVxuICAgICAgICAuc2V0TGF0TG5nKGxhdGxuZylcbiAgICAgICAgLnNldENvbnRlbnQoY29udGVudClcbiAgICAgICAgLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIHdtcyhsYXllcikge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGB3bXMoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsID0gc2VydmljZS5ocmVmO1xuICAgIGxldCBmb3JtYXRzID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyB8fCBbXTtcbiAgICBsZXQgZm9ybWF0ICA9IGZvcm1hdHMubGVuZ3RoID8gZm9ybWF0c1swXSA6IFwiaW1hZ2UvcG5nXCI7XG5cbiAgICBpZighdXJsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldNUyBsYXllcidzIHNlcnZpY2UgZG9lcyBub3QgZGVmaW5lZCBhIHNlcnZpY2UgdXJsXCIpO1xuICAgIH1cblxuICAgIGxldCB2ZXJzaW9uID0gJzEuMS4xJztcbiAgICBpZihzZXJ2aWNlLmFwaSAmJiBzZXJ2aWNlLmFwaS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGlzMTMwID0gc2VydmljZS5hcGkuZmlsdGVyKGFwaSA9PiBhcGkuYWNjZXNzVVJMLmluZGV4T2YoJ3dtcy8xLjMuMCcpPjAgKS5sZW5ndGggPiAwO1xuICAgICAgICBpZihpczEzMCkgdmVyc2lvbiA9ICcxLjMuMCc7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIGxheWVyczogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0OiBmb3JtYXQsXG4gICAgICAgIHdtdklkOiBsYXllci5pZCxcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvblxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IFdNUyh1cmwsIG9wdHMpO1xuXG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TID0gV01TO1xuICAgIEwudGlsZUxheWVyLndtcyA9IHdtcztcbn1cblxuZXhwb3J0IHtcbiAgICBXTVMgYXMgZGVmYXVsdCxcbiAgICBXTVMsXG4gICAgd21zXG59O1xuIl19