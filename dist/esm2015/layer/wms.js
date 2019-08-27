/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { TileLayer, Util, popup } from 'leaflet';
import { Config } from '@geoplatform/client';
class WMS extends TileLayer.WMS {
    /**
     * @param {?} url
     * @param {?=} opts
     */
    constructor(url, opts) {
        super(url, opts);
        this._enabled = false;
        this._enabled = false;
    }
    /**
     * @return {?}
     */
    enableGetFeatureInfo() {
        this._map.on('click', this.getFeatureInfo, this);
        this._enabled = true;
    }
    /**
     * @return {?}
     */
    disableGetFeatureInfo() {
        this._map.off('click', this.getFeatureInfo, this);
        this._enabled = false;
    }
    /**
     * @return {?}
     */
    isGetFeatureInfoEnabled() {
        return this._enabled;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onRemove(map) {
        //if GFI is enabled, disable it before removing
        if (this.isGetFeatureInfoEnabled())
            this.disableGetFeatureInfo();
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return super.onRemove.call(this, map);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    getFeatureInfo(evt) {
        /** @type {?} */
        var url = this.getFeatureInfoUrl(evt.latlng);
        /** @type {?} */
        var parseGetFeatureInfo = this.parseGetFeatureInfo;
        jQuery.ajax({
            url: url,
            /**
             * @param {?} data
             * @param {?} status
             * @param {?} xhr
             * @return {?}
             */
            success(data, status, xhr) {
                // var err = typeof data === 'string' ? null : data;
                if (typeof (data) !== 'string')
                    data = parseGetFeatureInfo(data);
                () => {
                    this.showGetFeatureInfo(null, evt.latlng, data);
                };
            },
            /**
             * @param {?} xhr
             * @param {?} status
             * @param {?} error
             * @return {?}
             */
            error(xhr, status, error) {
                () => { this.showGetFeatureInfo(error); };
            }
        });
    }
    /**
     * @param {?} latlng
     * @return {?}
     */
    getFeatureInfoUrl(latlng) {
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
        let wmvId = (/** @type {?} */ (this.wmsParams)).wmvId;
        /** @type {?} */
        var url = '/api/layers/' + wmvId + '/feature';
        return Config.ualUrl + url + Util.getParamString(params, url, true);
    }
    /**
     * @param {?} content
     * @return {?}
     */
    parseGetFeatureInfo(content) {
        /** @type {?} */
        var fields = [];
        for (var field in content) {
            fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
        }
        if (fields.length == 0)
            fields.push('<em>No data available</em>');
        return '<div>' + fields.join(' ') + '</div>';
    }
    /**
     * @param {?} err
     * @param {?} latlng
     * @param {?} content
     * @return {?}
     */
    showGetFeatureInfo(err, latlng, content) {
        if (err) {
            console.log(err);
            return;
        } // do nothing if there's an error
        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800 })
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
    }
}
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
    let formats = layer.formats;
    if (formats && formats.length) {
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        let common = ['image/png32', 'image/png24', 'image/png8', 'image/png', 'image/jpeg'];
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
    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        throw new Error("Cannot create leaflet layer for WMS Layer '" +
            (layer.label || layer.id) +
            "' because layer has no service associated with it");
    }
    /** @type {?} */
    let url = service.href;
    if (!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }
    /** @type {?} */
    let format = determineWMSFormat(layer);
    /** @type {?} */
    let supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    /** @type {?} */
    let version = '1.1.1';
    /** @type {?} */
    let versions = service.serviceTypeVersions || [];
    if (versions.length && versions.indexOf('1.1.1') < 0) {
        version = versions[0];
    }
    else {
        console.log("Warning: WMS Service doesn't list supported versions, assuming 1.1.1");
    }
    /** @type {?} */
    let opts = {
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
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.WMS = WMS;
    L.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxFQUFPLFNBQVMsRUFBcUIsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxPQUFPLEVBQ0gsTUFBTSxFQUNULE1BQU0scUJBQXFCLENBQUM7QUFJN0IsU0FBVSxTQUFRLFNBQVMsQ0FBQyxHQUFHOzs7OztJQUkzQixZQUFZLEdBQVksRUFBRSxJQUFXO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBSFEsS0FBSztRQUk5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7O0lBRUQsUUFBUSxDQUFFLEdBQVM7O1FBR2YsSUFBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7OztRQUk3QixPQUFPLEtBQUssQ0FBQyxRQUFRLENB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QUFFO1FBQ25CLG1CQUFDLElBQVcsRUFBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0tBQzNDO0lBRUQsT0FBTyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FFN0I7QUFFRCxJQUFJLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRzs7SUFDcEIsTUFBTSxDQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDekI7QUFFRCxPQUFPLEVBQ0gsR0FBRyxJQUFJLE9BQU8sRUFDZCxHQUFHLEVBQ0gsR0FBRyxFQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQGdlb3BsYXRmb3JtL2NsaWVudC9kaXN0L3NoYXJlZC9tb2RlbHMuZC50c1wiIC8+XG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIExhdExuZywgVXRpbCwgcG9wdXAgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY2xhc3MgV01TIGV4dGVuZHMgVGlsZUxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9lbmFibGVkIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdHMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5hYmxlR2V0RmVhdHVyZUluZm8gICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlR2V0RmVhdHVyZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSA6IHRoaXMge1xuXG4gICAgICAgIC8vaWYgR0ZJIGlzIGVuYWJsZWQsIGRpc2FibGUgaXQgYmVmb3JlIHJlbW92aW5nXG4gICAgICAgIGlmKHRoaXMuaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQoKSlcbiAgICAgICAgdGhpcy5kaXNhYmxlR2V0RmVhdHVyZUluZm8oKTtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIGEgbWFwLlxuICAgICAgICAvLyAgIFVucmVnaXN0ZXIgYSBjbGljayBsaXN0ZW5lciwgdGhlbiBkbyBhbGwgdGhlIHVwc3RyZWFtIFdNUyB0aGluZ3NcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcblxuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvICAoZXZ0KSB7XG4gICAgICAgIC8vIE1ha2UgYW4gQUpBWCByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgYW5kIGhvcGUgZm9yIHRoZSBiZXN0XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEZlYXR1cmVJbmZvVXJsKGV2dC5sYXRsbmcpLFxuICAgICAgICBwYXJzZUdldEZlYXR1cmVJbmZvID0gdGhpcy5wYXJzZUdldEZlYXR1cmVJbmZvO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgIChkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAgICAgICAgIC8vIHZhciBlcnIgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBudWxsIDogZGF0YTtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUdldEZlYXR1cmVJbmZvKGRhdGEpO1xuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8obnVsbCwgZXZ0LmxhdGxuZywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yICAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhlcnJvcik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm9VcmwgIChsYXRsbmcgOiBMYXRMbmcpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IGEgR2V0RmVhdHVyZUluZm8gcmVxdWVzdCBVUkwgZ2l2ZW4gYSBwb2ludFxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxuICAgICAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblxuICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgYmJveDogdGhpcy5fbWFwLmdldEJvdW5kcygpLnRvQkJveFN0cmluZygpLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS54LFxuICAgICAgICAgICAgLy8gbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICAvLyBxdWVyeV9sYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIGluZm9fZm9ybWF0OiAndGV4dC94bWwnLFxuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICBpOiBwb2ludC54LCAvLzEuMy4wXG4gICAgICAgICAgICBqOiBwb2ludC55ICAvLzEuMy4wXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHdtdklkID0gKHRoaXMud21zUGFyYW1zIGFzIGFueSkud212SWQ7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3VybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvbGF5ZXJzLycgKyB3bXZJZCArICcvZmVhdHVyZSc7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGFyc2VHZXRGZWF0dXJlSW5mbyAoY29udGVudCkge1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvcih2YXIgZmllbGQgaW4gY29udGVudCkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goWyc8ZGl2PjxzdHJvbmc+JywgZmllbGQsICc6IDwvc3Ryb25nPicsIGNvbnRlbnRbZmllbGRdLCAnPC9kaXY+J10uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZHMubGVuZ3RoID09IDApXG4gICAgICAgIGZpZWxkcy5wdXNoKCc8ZW0+Tm8gZGF0YSBhdmFpbGFibGU8L2VtPicpO1xuICAgICAgICByZXR1cm4gJzxkaXY+JyArIGZpZWxkcy5qb2luKCcgJykgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBzaG93R2V0RmVhdHVyZUluZm8gIChlcnIgOiBFcnJvciwgbGF0bG5nIDogTGF0TG5nLCBjb250ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVycikgeyBjb25zb2xlLmxvZyhlcnIpOyByZXR1cm47IH0gLy8gZG8gbm90aGluZyBpZiB0aGVyZSdzIGFuIGVycm9yXG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgdGhlIGNvbnRlbnQgaW4gYSBwb3B1cCwgb3Igc29tZXRoaW5nLlxuICAgICAgICBwb3B1cCh7IG1heFdpZHRoOiA4MDB9KVxuICAgICAgICAuc2V0TGF0TG5nKGxhdGxuZylcbiAgICAgICAgLnNldENvbnRlbnQoY29udGVudClcbiAgICAgICAgLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIGRldGVybWluZVdNU0Zvcm1hdCggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXRzIDogc3RyaW5nW10gPSBsYXllci5mb3JtYXRzO1xuICAgIGlmKGZvcm1hdHMgJiYgZm9ybWF0cy5sZW5ndGgpIHtcbiAgICAgICAgLy9sb29rIGZvciBjb21tb24gZm9ybWF0cyB0aGF0IG1ha2Ugc2Vuc2UgZmlyc3QuLi5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGxldCBjb21tb24gPSBbICdpbWFnZS9wbmczMicsICdpbWFnZS9wbmcyNCcsICdpbWFnZS9wbmc4JywgJ2ltYWdlL3BuZycsICdpbWFnZS9qcGVnJyBdO1xuICAgICAgICB3aGlsZSggaWR4IDwgY29tbW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYoIGZvcm1hdHMuaW5kZXhPZiggY29tbW9uW2lkeF0gKSA+PSAwICkgcmV0dXJuIGNvbW1vbltpZHhdO1xuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBoYXMgbm8gZm9ybWF0cyBzcGVjaWZpZWQsIFwiICtcbiAgICAgICAgXCJhc3N1bWluZyBhIGRlZmF1bHQgb2YgJ2ltYWdlL3BuZydcIik7XG4gICAgcmV0dXJuICdpbWFnZS9wbmcnO1xufVxuXG5cbi8qKlxuICogc2hvcnQtZm9ybSBmdW5jdGlvbiBmb3IgaW5zdGFudGlhdGluZyBhIFdNUy1iYXNlZCBMYXllcidzIExlYWZsZXQgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gd21zKGxheWVyIDogTGF5ZXJNb2RlbCkgOiBXTVMge1xuXG4gICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBXTVMgTGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIChsYXllci5sYWJlbCB8fCBsYXllci5pZCkgK1xuICAgICAgICAgICAgXCInIGJlY2F1c2UgbGF5ZXIgaGFzIG5vIHNlcnZpY2UgYXNzb2NpYXRlZCB3aXRoIGl0XCIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBzZXJ2aWNlLmhyZWY7XG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICAvL3BpY2sgb3V0cHV0IGZvcm1hdCBmb3IgdGhlIHJhc3RlciBpbWFnZXNcbiAgICBsZXQgZm9ybWF0ID0gZGV0ZXJtaW5lV01TRm9ybWF0KGxheWVyKTtcblxuICAgIGxldCBzdXBwb3J0ZWRDcnMgPSBsYXllci5jcnMgfHwgW107XG4gICAgaWYoc3VwcG9ydGVkQ3JzICYmIHN1cHBvcnRlZENycy5sZW5ndGggPiAwICYmIH5zdXBwb3J0ZWRDcnMuaW5kZXhPZihcIkVTUEc6Mzg1N1wiKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyICdcIiArIGxheWVyLmxhYmVsICsgXCInIGRvZXMgbm90IHN1cHBvcnQgXCIgK1xuICAgICAgICAgICAgXCJFUFNHOjM4NTcgU3BoZXJpY2FsIE1lcmNhdG9yIHByb2plY3Rpb24gYW5kIG1heSBub3QgcmVuZGVyIGFwcHJvcHJpYXRlbHkgb3IgYXQgYWxsLlwiKTtcbiAgICB9XG5cbiAgICAvL2RldGVybWluZSBwcm9wZXIgdmVyc2lvbiBvZiB0aGUgV01TIHNwZWMgdG8gdXNlXG4gICAgbGV0IHZlcnNpb24gOiBzdHJpbmcgPSAnMS4xLjEnO1xuICAgIGxldCB2ZXJzaW9ucyA6IHN0cmluZ1tdID0gc2VydmljZS5zZXJ2aWNlVHlwZVZlcnNpb25zIHx8IFtdO1xuICAgIGlmKHZlcnNpb25zLmxlbmd0aCAmJiB2ZXJzaW9ucy5pbmRleE9mKCcxLjEuMScpIDwgMCkge1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbnNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nOiBXTVMgU2VydmljZSBkb2Vzbid0IGxpc3Qgc3VwcG9ydGVkIHZlcnNpb25zLCBhc3N1bWluZyAxLjEuMVwiKTtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgbGF5ZXJzICAgICAgOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50IDogdHJ1ZSxcbiAgICAgICAgZm9ybWF0ICAgICAgOiBmb3JtYXQsXG4gICAgICAgIHdtdklkICAgICAgIDogbGF5ZXIuaWQsXG4gICAgICAgIHZlcnNpb24gICAgIDogdmVyc2lvblxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSB7XG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFdNUyh1cmwsIG9wdHMpO1xuXG59XG5cbmlmKCAod2luZG93IGFzIGFueSkuTCApIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuV01TID0gV01TO1xuICAgIEwudGlsZUxheWVyLndtcyA9IHdtcztcbn1cblxuZXhwb3J0IHtcbiAgICBXTVMgYXMgZGVmYXVsdCxcbiAgICBXTVMsXG4gICAgd21zXG59O1xuIl19