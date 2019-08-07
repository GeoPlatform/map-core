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
        return Config["ualUrl"] + url + Util.getParamString(params, url, true);
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
    let formats = layer["formats"];
    if (formats && formats.length) {
        /** @type {?} */
        let idx = 0;
        /** @type {?} */
        let common = ['image/png32', 'image/png24', 'image/png8', 'image/png', 'image/jpeg'];
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
    let service = layer["services"] && layer["services"].length ?
        layer["services"][0] : null;
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
    let supportedCrs = layer["crs"] || [];
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
    if (Config["leafletPane"]) {
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxFQUFPLFNBQVMsRUFBcUIsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxPQUFPLEVBQ0gsTUFBTSxFQUNULE1BQU0scUJBQXFCLENBQUM7QUFJN0IsU0FBVSxTQUFRLFNBQVMsQ0FBQyxHQUFHOzs7OztJQUkzQixZQUFZLEdBQVksRUFBRSxJQUFXO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBSFEsS0FBSztRQUk5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7O0lBRUQsUUFBUSxDQUFFLEdBQVM7O1FBR2YsSUFBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7OztRQUk3QixPQUFPLEtBQUssQ0FBQyxRQUFRLENB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QUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FFN0I7QUFFRCxJQUFJLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsRUFBRzs7SUFDcEIsTUFBTSxDQUFDLEdBQUcsbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDekI7QUFFRCxPQUFPLEVBQ0gsR0FBRyxJQUFJLE9BQU8sRUFDZCxHQUFHLEVBQ0gsR0FBRyxFQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQGdlb3BsYXRmb3JtL2NsaWVudC9kaXN0L3NoYXJlZC9tb2RlbHMuZC50c1wiIC8+XG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIExhdExuZywgVXRpbCwgcG9wdXAgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY2xhc3MgV01TIGV4dGVuZHMgVGlsZUxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9lbmFibGVkIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdHMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5hYmxlR2V0RmVhdHVyZUluZm8gICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlR2V0RmVhdHVyZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSA6IHRoaXMge1xuXG4gICAgICAgIC8vaWYgR0ZJIGlzIGVuYWJsZWQsIGRpc2FibGUgaXQgYmVmb3JlIHJlbW92aW5nXG4gICAgICAgIGlmKHRoaXMuaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQoKSlcbiAgICAgICAgdGhpcy5kaXNhYmxlR2V0RmVhdHVyZUluZm8oKTtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIGEgbWFwLlxuICAgICAgICAvLyAgIFVucmVnaXN0ZXIgYSBjbGljayBsaXN0ZW5lciwgdGhlbiBkbyBhbGwgdGhlIHVwc3RyZWFtIFdNUyB0aGluZ3NcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcblxuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvICAoZXZ0KSB7XG4gICAgICAgIC8vIE1ha2UgYW4gQUpBWCByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgYW5kIGhvcGUgZm9yIHRoZSBiZXN0XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLmdldEZlYXR1cmVJbmZvVXJsKGV2dC5sYXRsbmcpLFxuICAgICAgICBwYXJzZUdldEZlYXR1cmVJbmZvID0gdGhpcy5wYXJzZUdldEZlYXR1cmVJbmZvO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgIChkYXRhLCBzdGF0dXMsIHhocikge1xuICAgICAgICAgICAgICAgIC8vIHZhciBlcnIgPSB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyBudWxsIDogZGF0YTtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUdldEZlYXR1cmVJbmZvKGRhdGEpO1xuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8obnVsbCwgZXZ0LmxhdGxuZywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yICAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XG4gICAgICAgICAgICAgICAgKCkgPT4geyB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhlcnJvcik7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm9VcmwgIChsYXRsbmcgOiBMYXRMbmcpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IGEgR2V0RmVhdHVyZUluZm8gcmVxdWVzdCBVUkwgZ2l2ZW4gYSBwb2ludFxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxuICAgICAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblxuICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgYmJveDogdGhpcy5fbWFwLmdldEJvdW5kcygpLnRvQkJveFN0cmluZygpLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS54LFxuICAgICAgICAgICAgLy8gbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICAvLyBxdWVyeV9sYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIGluZm9fZm9ybWF0OiAndGV4dC94bWwnLFxuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICBpOiBwb2ludC54LCAvLzEuMy4wXG4gICAgICAgICAgICBqOiBwb2ludC55ICAvLzEuMy4wXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHdtdklkID0gKHRoaXMud21zUGFyYW1zIGFzIGFueSkud212SWQ7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3VybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvbGF5ZXJzLycgKyB3bXZJZCArICcvZmVhdHVyZSc7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGFyc2VHZXRGZWF0dXJlSW5mbyAoY29udGVudCkge1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvcih2YXIgZmllbGQgaW4gY29udGVudCkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goWyc8ZGl2PjxzdHJvbmc+JywgZmllbGQsICc6IDwvc3Ryb25nPicsIGNvbnRlbnRbZmllbGRdLCAnPC9kaXY+J10uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZHMubGVuZ3RoID09IDApXG4gICAgICAgIGZpZWxkcy5wdXNoKCc8ZW0+Tm8gZGF0YSBhdmFpbGFibGU8L2VtPicpO1xuICAgICAgICByZXR1cm4gJzxkaXY+JyArIGZpZWxkcy5qb2luKCcgJykgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBzaG93R2V0RmVhdHVyZUluZm8gIChlcnIgOiBFcnJvciwgbGF0bG5nIDogTGF0TG5nLCBjb250ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVycikgeyBjb25zb2xlLmxvZyhlcnIpOyByZXR1cm47IH0gLy8gZG8gbm90aGluZyBpZiB0aGVyZSdzIGFuIGVycm9yXG5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgdGhlIGNvbnRlbnQgaW4gYSBwb3B1cCwgb3Igc29tZXRoaW5nLlxuICAgICAgICBwb3B1cCh7IG1heFdpZHRoOiA4MDB9KVxuICAgICAgICAuc2V0TGF0TG5nKGxhdGxuZylcbiAgICAgICAgLnNldENvbnRlbnQoY29udGVudClcbiAgICAgICAgLm9wZW5Pbih0aGlzLl9tYXApO1xuICAgIH1cblxufVxuXG5cbmZ1bmN0aW9uIGRldGVybWluZVdNU0Zvcm1hdCggbGF5ZXIgOiBMYXllck1vZGVsICkgOiBzdHJpbmcge1xuICAgIGxldCBmb3JtYXRzIDogc3RyaW5nW10gPSBsYXllci5mb3JtYXRzO1xuICAgIGlmKGZvcm1hdHMgJiYgZm9ybWF0cy5sZW5ndGgpIHtcbiAgICAgICAgLy9sb29rIGZvciBjb21tb24gZm9ybWF0cyB0aGF0IG1ha2Ugc2Vuc2UgZmlyc3QuLi5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgIGxldCBjb21tb24gPSBbICdpbWFnZS9wbmczMicsICdpbWFnZS9wbmcyNCcsICdpbWFnZS9wbmc4JywgJ2ltYWdlL3BuZycsICdpbWFnZS9qcGVnJyBdO1xuICAgICAgICB3aGlsZSggaWR4IDwgY29tbW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYoIGZvcm1hdHMuaW5kZXhPZiggY29tbW9uW2lkeF0gKSA+PSAwICkgcmV0dXJuIGNvbW1vbltpZHhdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgaGFzIG5vIGZvcm1hdHMgc3BlY2lmaWVkLCBcIiArXG4gICAgICAgIFwiYXNzdW1pbmcgYSBkZWZhdWx0IG9mICdpbWFnZS9wbmcnXCIpO1xuICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbn1cblxuXG4vKipcbiAqIHNob3J0LWZvcm0gZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBXTVMtYmFzZWQgTGF5ZXIncyBMZWFmbGV0IGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHdtcyhsYXllciA6IExheWVyTW9kZWwpIDogV01TIHtcblxuICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgV01TIExheWVyICdcIiArXG4gICAgICAgICAgICAobGF5ZXIubGFiZWwgfHwgbGF5ZXIuaWQpICtcbiAgICAgICAgICAgIFwiJyBiZWNhdXNlIGxheWVyIGhhcyBubyBzZXJ2aWNlIGFzc29jaWF0ZWQgd2l0aCBpdFwiKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsIDogc3RyaW5nID0gc2VydmljZS5ocmVmO1xuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TIGxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgLy9waWNrIG91dHB1dCBmb3JtYXQgZm9yIHRoZSByYXN0ZXIgaW1hZ2VzXG4gICAgbGV0IGZvcm1hdCA9IGRldGVybWluZVdNU0Zvcm1hdChsYXllcik7XG5cbiAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgfVxuXG4gICAgLy9kZXRlcm1pbmUgcHJvcGVyIHZlcnNpb24gb2YgdGhlIFdNUyBzcGVjIHRvIHVzZVxuICAgIGxldCB2ZXJzaW9uIDogc3RyaW5nID0gJzEuMS4xJztcbiAgICBsZXQgdmVyc2lvbnMgOiBzdHJpbmdbXSA9IHNlcnZpY2Uuc2VydmljZVR5cGVWZXJzaW9ucyB8fCBbXTtcbiAgICBpZih2ZXJzaW9ucy5sZW5ndGggJiYgdmVyc2lvbnMuaW5kZXhPZignMS4xLjEnKSA8IDApIHtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogV01TIFNlcnZpY2UgZG9lc24ndCBsaXN0IHN1cHBvcnRlZCB2ZXJzaW9ucywgYXNzdW1pbmcgMS4xLjFcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIGxheWVycyAgICAgIDogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudCA6IHRydWUsXG4gICAgICAgIGZvcm1hdCAgICAgIDogZm9ybWF0LFxuICAgICAgICB3bXZJZCAgICAgICA6IGxheWVyLmlkLFxuICAgICAgICB2ZXJzaW9uICAgICA6IHZlcnNpb25cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkge1xuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXTVModXJsLCBvcHRzKTtcblxufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNUyA9IFdNUztcbiAgICBMLnRpbGVMYXllci53bXMgPSB3bXM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TIGFzIGRlZmF1bHQsXG4gICAgV01TLFxuICAgIHdtc1xufTtcbiJdfQ==