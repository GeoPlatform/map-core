/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// <reference path="../../node_modules/@geoplatform/client/dist/shared/models.d.ts" />
/// <reference path="../../node_modules/@geoplatform/client/dist/shared/models.d.ts" />
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
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    onRemove(map) {
        //if GFI is enabled, disable it before removing
        if ((/** @type {?} */ (this)).isGetFeatureInfoEnabled())
            (/** @type {?} */ (this)).disableGetFeatureInfo();
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return super.onRemove.call((/** @type {?} */ (this)), map);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    getFeatureInfo(evt) {
        // Make an AJAX request to the server and hope for the best
        /** @type {?} */
        let url = this.getFeatureInfoUrl(evt.latlng);
        jQuery.ajax({
            url: url,
            success: (/**
             * @param {?} data
             * @param {?} status
             * @param {?} xhr
             * @return {?}
             */
            (data, status, xhr) => {
                if (typeof (data) !== 'string')
                    data = this.parseGetFeatureInfo(data);
                this.showGetFeatureInfo(evt.latlng, data);
            }),
            error: (/**
             * @param {?} xhr
             * @param {?} status
             * @param {?} error
             * @return {?}
             */
            (xhr, status, error) => {
                console.log(error);
            })
        });
    }
    /**
     * @param {?} latlng
     * @return {?}
     */
    getFeatureInfoUrl(latlng) {
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
        let wmvId = ((/** @type {?} */ (this.wmsParams))).wmvId;
        // return this._url + Util.getParamString(params, this._url, true);
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
     * @param {?} latlng
     * @param {?} content
     * @return {?}
     */
    showGetFeatureInfo(latlng, content) {
        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800 })
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
    }
}
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
    let formats = layer.formats;
    if (formats && formats.length) {
        //look for common formats that make sense first...
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
    //pick output format for the raster images
    /** @type {?} */
    let format = determineWMSFormat(layer);
    /** @type {?} */
    let supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    //determine proper version of the WMS spec to use
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
        ((/** @type {?} */ (opts))).pane = Config.leafletPane;
    }
    return new WMS(url, opts);
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    const L = ((/** @type {?} */ (window))).L;
    L.TileLayer.WMS = WMS;
    L.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLHVGQUF1Rjs7QUFFdkYsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O01BQzNCLE1BQU0sR0FBRyxNQUFNO0FBRXJCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUNILE1BQU0sRUFDVCxNQUFNLHFCQUFxQixDQUFDO0FBSTdCLE1BQU0sR0FBSSxTQUFRLFNBQVMsQ0FBQyxHQUFHOzs7OztJQUkzQixZQUFZLEdBQVksRUFBRSxJQUFXO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFIYixhQUFRLEdBQWEsS0FBSyxDQUFDO1FBSS9CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsdUJBQXVCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7Ozs7O0lBRUQsUUFBUSxDQUFFLEdBQVM7UUFFZiwrQ0FBK0M7UUFDL0MsSUFBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyx1QkFBdUIs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QUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTlCLENBQUM7QUFFRCxJQUFJLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUc7O1VBQ2QsQ0FBQyxHQUFHLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN0QixDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDekI7QUFFRCxPQUFPLEVBQ0gsR0FBRyxJQUFJLE9BQU8sRUFDZCxHQUFHLEVBQ0gsR0FBRyxFQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQGdlb3BsYXRmb3JtL2NsaWVudC9kaXN0L3NoYXJlZC9tb2RlbHMuZC50c1wiIC8+XG5cbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IE1hcCwgVGlsZUxheWVyLCB0aWxlTGF5ZXIsIExhdExuZywgVXRpbCwgcG9wdXAgfSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHtcbiAgICBDb25maWcsIExheWVyIGFzIExheWVyTW9kZWwsIFNlcnZpY2UgYXMgU2VydmljZU1vZGVsXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY2xhc3MgV01TIGV4dGVuZHMgVGlsZUxheWVyLldNUyB7XG5cbiAgICBwcml2YXRlIF9lbmFibGVkIDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodXJsIDogc3RyaW5nLCBvcHRzID86IGFueSkge1xuICAgICAgICBzdXBlcih1cmwsIG9wdHMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5hYmxlR2V0RmVhdHVyZUluZm8gICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9uKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkaXNhYmxlR2V0RmVhdHVyZUluZm8gKCkge1xuICAgICAgICB0aGlzLl9tYXAub2ZmKCdjbGljaycsIHRoaXMuZ2V0RmVhdHVyZUluZm8sIHRoaXMpO1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSA6IHRoaXMge1xuXG4gICAgICAgIC8vaWYgR0ZJIGlzIGVuYWJsZWQsIGRpc2FibGUgaXQgYmVmb3JlIHJlbW92aW5nXG4gICAgICAgIGlmKHRoaXMuaXNHZXRGZWF0dXJlSW5mb0VuYWJsZWQoKSlcbiAgICAgICAgdGhpcy5kaXNhYmxlR2V0RmVhdHVyZUluZm8oKTtcblxuICAgICAgICAvLyBUcmlnZ2VyZWQgd2hlbiB0aGUgbGF5ZXIgaXMgcmVtb3ZlZCBmcm9tIGEgbWFwLlxuICAgICAgICAvLyAgIFVucmVnaXN0ZXIgYSBjbGljayBsaXN0ZW5lciwgdGhlbiBkbyBhbGwgdGhlIHVwc3RyZWFtIFdNUyB0aGluZ3NcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcblxuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvICAoZXZ0KSB7XG4gICAgICAgIC8vIE1ha2UgYW4gQUpBWCByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgYW5kIGhvcGUgZm9yIHRoZSBiZXN0XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldEZlYXR1cmVJbmZvVXJsKGV2dC5sYXRsbmcpO1xuICAgICAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiAoZGF0YSwgc3RhdHVzLCB4aHIpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZGF0YSkgIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5wYXJzZUdldEZlYXR1cmVJbmZvKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGV2dC5sYXRsbmcsIGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogKHhociwgc3RhdHVzLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm9VcmwgIChsYXRsbmcgOiBMYXRMbmcpIHtcbiAgICAgICAgLy8gQ29uc3RydWN0IGEgR2V0RmVhdHVyZUluZm8gcmVxdWVzdCBVUkwgZ2l2ZW4gYSBwb2ludFxuICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9Db250YWluZXJQb2ludChsYXRsbmcpLFxuICAgICAgICBzaXplID0gdGhpcy5fbWFwLmdldFNpemUoKSxcblxuICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzcnM6ICdFUFNHOjQzMjYnLFxuICAgICAgICAgICAgYmJveDogdGhpcy5fbWFwLmdldEJvdW5kcygpLnRvQkJveFN0cmluZygpLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLnksXG4gICAgICAgICAgICB3aWR0aDogc2l6ZS54LFxuICAgICAgICAgICAgLy8gbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICAvLyBxdWVyeV9sYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIGluZm9fZm9ybWF0OiAndGV4dC94bWwnLFxuICAgICAgICAgICAgeDogcG9pbnQueCxcbiAgICAgICAgICAgIHk6IHBvaW50LnksXG4gICAgICAgICAgICBpOiBwb2ludC54LCAvLzEuMy4wXG4gICAgICAgICAgICBqOiBwb2ludC55ICAvLzEuMy4wXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHdtdklkID0gKHRoaXMud21zUGFyYW1zIGFzIGFueSkud212SWQ7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuX3VybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB0aGlzLl91cmwsIHRydWUpO1xuICAgICAgICB2YXIgdXJsID0gJy9hcGkvbGF5ZXJzLycgKyB3bXZJZCArICcvZmVhdHVyZSc7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGFyc2VHZXRGZWF0dXJlSW5mbyAoY29udGVudCkge1xuICAgICAgICB2YXIgZmllbGRzID0gW107XG4gICAgICAgIGZvcih2YXIgZmllbGQgaW4gY29udGVudCkge1xuICAgICAgICAgICAgZmllbGRzLnB1c2goWyc8ZGl2PjxzdHJvbmc+JywgZmllbGQsICc6IDwvc3Ryb25nPicsIGNvbnRlbnRbZmllbGRdLCAnPC9kaXY+J10uam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZihmaWVsZHMubGVuZ3RoID09IDApXG4gICAgICAgIGZpZWxkcy5wdXNoKCc8ZW0+Tm8gZGF0YSBhdmFpbGFibGU8L2VtPicpO1xuICAgICAgICByZXR1cm4gJzxkaXY+JyArIGZpZWxkcy5qb2luKCcgJykgKyAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBzaG93R2V0RmVhdHVyZUluZm8gIChsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuXG4gICAgICAgIC8vIE90aGVyd2lzZSBzaG93IHRoZSBjb250ZW50IGluIGEgcG9wdXAsIG9yIHNvbWV0aGluZy5cbiAgICAgICAgcG9wdXAoeyBtYXhXaWR0aDogODAwfSlcbiAgICAgICAgLnNldExhdExuZyhsYXRsbmcpXG4gICAgICAgIC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgIC5vcGVuT24odGhpcy5fbWFwKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiBkZXRlcm1pbmVXTVNGb3JtYXQoIGxheWVyIDogTGF5ZXJNb2RlbCApIDogc3RyaW5nIHtcbiAgICBsZXQgZm9ybWF0cyA6IHN0cmluZ1tdID0gbGF5ZXIuZm9ybWF0cztcbiAgICBpZihmb3JtYXRzICYmIGZvcm1hdHMubGVuZ3RoKSB7XG4gICAgICAgIC8vbG9vayBmb3IgY29tbW9uIGZvcm1hdHMgdGhhdCBtYWtlIHNlbnNlIGZpcnN0Li4uXG4gICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICBsZXQgY29tbW9uID0gWyAnaW1hZ2UvcG5nMzInLCAnaW1hZ2UvcG5nMjQnLCAnaW1hZ2UvcG5nOCcsICdpbWFnZS9wbmcnLCAnaW1hZ2UvanBlZycgXTtcbiAgICAgICAgd2hpbGUoIGlkeCA8IGNvbW1vbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmKCBmb3JtYXRzLmluZGV4T2YoIGNvbW1vbltpZHhdICkgPj0gMCApIHJldHVybiBjb21tb25baWR4XTtcbiAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiTGF5ZXIgJ1wiICsgbGF5ZXIubGFiZWwgKyBcIicgaGFzIG5vIGZvcm1hdHMgc3BlY2lmaWVkLCBcIiArXG4gICAgICAgIFwiYXNzdW1pbmcgYSBkZWZhdWx0IG9mICdpbWFnZS9wbmcnXCIpO1xuICAgIHJldHVybiAnaW1hZ2UvcG5nJztcbn1cblxuXG4vKipcbiAqIHNob3J0LWZvcm0gZnVuY3Rpb24gZm9yIGluc3RhbnRpYXRpbmcgYSBXTVMtYmFzZWQgTGF5ZXIncyBMZWFmbGV0IGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHdtcyhsYXllciA6IExheWVyTW9kZWwpIDogV01TIHtcblxuICAgIGxldCBzZXJ2aWNlIDogU2VydmljZU1vZGVsID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgV01TIExheWVyICdcIiArXG4gICAgICAgICAgICAobGF5ZXIubGFiZWwgfHwgbGF5ZXIuaWQpICtcbiAgICAgICAgICAgIFwiJyBiZWNhdXNlIGxheWVyIGhhcyBubyBzZXJ2aWNlIGFzc29jaWF0ZWQgd2l0aCBpdFwiKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsIDogc3RyaW5nID0gc2VydmljZS5ocmVmO1xuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TIGxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgLy9waWNrIG91dHB1dCBmb3JtYXQgZm9yIHRoZSByYXN0ZXIgaW1hZ2VzXG4gICAgbGV0IGZvcm1hdCA9IGRldGVybWluZVdNU0Zvcm1hdChsYXllcik7XG5cbiAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICtcbiAgICAgICAgICAgIFwiRVBTRzozODU3IFNwaGVyaWNhbCBNZXJjYXRvciBwcm9qZWN0aW9uIGFuZCBtYXkgbm90IHJlbmRlciBhcHByb3ByaWF0ZWx5IG9yIGF0IGFsbC5cIik7XG4gICAgfVxuXG4gICAgLy9kZXRlcm1pbmUgcHJvcGVyIHZlcnNpb24gb2YgdGhlIFdNUyBzcGVjIHRvIHVzZVxuICAgIGxldCB2ZXJzaW9uIDogc3RyaW5nID0gJzEuMS4xJztcbiAgICBsZXQgdmVyc2lvbnMgOiBzdHJpbmdbXSA9IHNlcnZpY2Uuc2VydmljZVR5cGVWZXJzaW9ucyB8fCBbXTtcbiAgICBpZih2ZXJzaW9ucy5sZW5ndGggJiYgdmVyc2lvbnMuaW5kZXhPZignMS4xLjEnKSA8IDApIHtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb25zWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZzogV01TIFNlcnZpY2UgZG9lc24ndCBsaXN0IHN1cHBvcnRlZCB2ZXJzaW9ucywgYXNzdW1pbmcgMS4xLjFcIik7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIGxheWVycyAgICAgIDogbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICB0cmFuc3BhcmVudCA6IHRydWUsXG4gICAgICAgIGZvcm1hdCAgICAgIDogZm9ybWF0LFxuICAgICAgICB3bXZJZCAgICAgICA6IGxheWVyLmlkLFxuICAgICAgICB2ZXJzaW9uICAgICA6IHZlcnNpb25cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkge1xuICAgICAgICAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXTVModXJsLCBvcHRzKTtcblxufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNUyA9IFdNUztcbiAgICBMLnRpbGVMYXllci53bXMgPSB3bXM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TIGFzIGRlZmF1bHQsXG4gICAgV01TLFxuICAgIHdtc1xufTtcbiJdfQ==