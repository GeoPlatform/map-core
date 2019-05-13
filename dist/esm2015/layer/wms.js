/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { TileLayer, Util, popup } from 'leaflet';
import { Config } from 'geoplatform.client';
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
function wms(layer) {
    /** @type {?} */
    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        let msg = `wms() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }
    /** @type {?} */
    let url = service.href;
    /** @type {?} */
    let formats = layer.supportedFormats || [];
    /** @type {?} */
    let format = formats.length ? formats[0] : "image/png";
    if (!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }
    /** @type {?} */
    let version = '1.1.1';
    if (service.api && service.api.length) {
        /** @type {?} */
        let is130 = service.api.filter(api => api.accessURL.indexOf('wms/1.3.0') > 0).length > 0;
        if (is130)
            version = '1.3.0';
    }
    /** @type {?} */
    let opts = {
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
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.WMS = WMS;
    L.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2VvcGxhdGZvcm0ubWFwLyIsInNvdXJjZXMiOlsibGF5ZXIvd21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sRUFBTyxTQUFTLEVBQXFCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFekUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSTFDLFNBQVUsU0FBUSxTQUFTLENBQUMsR0FBRzs7Ozs7SUFJM0IsWUFBWSxHQUFZLEVBQUUsSUFBVztRQUNqQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUhRLEtBQUs7UUFJOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCxvQkFBb0I7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDeEI7Ozs7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDekI7Ozs7SUFFRCx1QkFBdUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3hCOzs7OztJQUVELFFBQVEsQ0FBRSxHQUFTOztRQUdmLElBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOzs7UUFJN0IsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLElB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Q0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3hGLElBQUcsS0FBSztZQUFFLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDL0I7O0lBRUQsSUFBSSxJQUFJLEdBQUc7UUFDUCxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVM7UUFDdkIsV0FBVyxFQUFFLElBQUk7UUFDakIsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDZixPQUFPLEVBQUUsT0FBTztLQUNuQixDQUFDO0lBQ0YsSUFBRyxNQUFNLENBQUMsV0FBVztRQUNqQixtQkFBQyxJQUFXLEVBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUU1QyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixNQUFNLENBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuXG5cbmNsYXNzIFdNUyBleHRlbmRzIFRpbGVMYXllci5XTVMge1xuXG4gICAgcHJpdmF0ZSBfZW5hYmxlZCA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCA6IHN0cmluZywgb3B0cyA/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVuYWJsZUdldEZlYXR1cmVJbmZvICAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZGlzYWJsZUdldEZlYXR1cmVJbmZvICgpIHtcbiAgICAgICAgdGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLmdldEZlYXR1cmVJbmZvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlzR2V0RmVhdHVyZUluZm9FbmFibGVkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgfVxuXG4gICAgb25SZW1vdmUgKG1hcCA6IE1hcCkgOiB0aGlzIHtcblxuICAgICAgICAvL2lmIEdGSSBpcyBlbmFibGVkLCBkaXNhYmxlIGl0IGJlZm9yZSByZW1vdmluZ1xuICAgICAgICBpZih0aGlzLmlzR2V0RmVhdHVyZUluZm9FbmFibGVkKCkpXG4gICAgICAgIHRoaXMuZGlzYWJsZUdldEZlYXR1cmVJbmZvKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlcmVkIHdoZW4gdGhlIGxheWVyIGlzIHJlbW92ZWQgZnJvbSBhIG1hcC5cbiAgICAgICAgLy8gICBVbnJlZ2lzdGVyIGEgY2xpY2sgbGlzdGVuZXIsIHRoZW4gZG8gYWxsIHRoZSB1cHN0cmVhbSBXTVMgdGhpbmdzXG4gICAgICAgIHJldHVybiBzdXBlci5vblJlbW92ZS5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mbyAgKGV2dCkge1xuICAgICAgICAvLyBNYWtlIGFuIEFKQVggcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCBob3BlIGZvciB0aGUgYmVzdFxuICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRGZWF0dXJlSW5mb1VybChldnQubGF0bG5nKSxcbiAgICAgICAgcGFyc2VHZXRGZWF0dXJlSW5mbyA9IHRoaXMucGFyc2VHZXRGZWF0dXJlSW5mbztcbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBzdWNjZXNzICAoZGF0YSwgc3RhdHVzLCB4aHIpIHtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZXJyID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gbnVsbCA6IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGRhdGEpICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICBkYXRhID0gcGFyc2VHZXRGZWF0dXJlSW5mbyhkYXRhKTtcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKG51bGwsIGV2dC5sYXRsbmcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciAgKHhociwgc3RhdHVzLCBlcnJvcikge1xuICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5zaG93R2V0RmVhdHVyZUluZm8oZXJyb3IpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZlYXR1cmVJbmZvVXJsICAobGF0bG5nIDogTGF0TG5nKSB7XG4gICAgICAgIC8vIENvbnN0cnVjdCBhIEdldEZlYXR1cmVJbmZvIHJlcXVlc3QgVVJMIGdpdmVuIGEgcG9pbnRcbiAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5fbWFwLmxhdExuZ1RvQ29udGFpbmVyUG9pbnQobGF0bG5nKSxcbiAgICAgICAgc2l6ZSA9IHRoaXMuX21hcC5nZXRTaXplKCksXG5cbiAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgc3JzOiAnRVBTRzo0MzI2JyxcbiAgICAgICAgICAgIGJib3g6IHRoaXMuX21hcC5nZXRCb3VuZHMoKS50b0JCb3hTdHJpbmcoKSxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS55LFxuICAgICAgICAgICAgd2lkdGg6IHNpemUueCxcbiAgICAgICAgICAgIC8vIGxheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgLy8gcXVlcnlfbGF5ZXJzOiB0aGlzLndtc1BhcmFtcy5sYXllcnMsXG4gICAgICAgICAgICBpbmZvX2Zvcm1hdDogJ3RleHQveG1sJyxcbiAgICAgICAgICAgIHg6IHBvaW50LngsXG4gICAgICAgICAgICB5OiBwb2ludC55LFxuICAgICAgICAgICAgaTogcG9pbnQueCwgLy8xLjMuMFxuICAgICAgICAgICAgajogcG9pbnQueSAgLy8xLjMuMFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB3bXZJZCA9ICh0aGlzLndtc1BhcmFtcyBhcyBhbnkpLndtdklkO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGlzLl91cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdGhpcy5fdXJsLCB0cnVlKTtcbiAgICAgICAgdmFyIHVybCA9ICcvYXBpL2xheWVycy8nICsgd212SWQgKyAnL2ZlYXR1cmUnO1xuICAgICAgICByZXR1cm4gQ29uZmlnLnVhbFVybCArIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpO1xuICAgIH1cblxuICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gKGNvbnRlbnQpIHtcbiAgICAgICAgdmFyIGZpZWxkcyA9IFtdO1xuICAgICAgICBmb3IodmFyIGZpZWxkIGluIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGZpZWxkcy5wdXNoKFsnPGRpdj48c3Ryb25nPicsIGZpZWxkLCAnOiA8L3N0cm9uZz4nLCBjb250ZW50W2ZpZWxkXSwgJzwvZGl2PiddLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZmllbGRzLmxlbmd0aCA9PSAwKVxuICAgICAgICBmaWVsZHMucHVzaCgnPGVtPk5vIGRhdGEgYXZhaWxhYmxlPC9lbT4nKTtcbiAgICAgICAgcmV0dXJuICc8ZGl2PicgKyBmaWVsZHMuam9pbignICcpICsgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgc2hvd0dldEZlYXR1cmVJbmZvICAoZXJyIDogRXJyb3IsIGxhdGxuZyA6IExhdExuZywgY29udGVudDogYW55KSB7XG4gICAgICAgIGlmIChlcnIpIHsgY29uc29sZS5sb2coZXJyKTsgcmV0dXJuOyB9IC8vIGRvIG5vdGhpbmcgaWYgdGhlcmUncyBhbiBlcnJvclxuXG4gICAgICAgIC8vIE90aGVyd2lzZSBzaG93IHRoZSBjb250ZW50IGluIGEgcG9wdXAsIG9yIHNvbWV0aGluZy5cbiAgICAgICAgcG9wdXAoeyBtYXhXaWR0aDogODAwfSlcbiAgICAgICAgLnNldExhdExuZyhsYXRsbmcpXG4gICAgICAgIC5zZXRDb250ZW50KGNvbnRlbnQpXG4gICAgICAgIC5vcGVuT24odGhpcy5fbWFwKTtcbiAgICB9XG5cbn1cblxuXG5mdW5jdGlvbiB3bXMobGF5ZXIpIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgd21zKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IHNlcnZpY2UuaHJlZjtcbiAgICBsZXQgZm9ybWF0cyA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgfHwgW107XG4gICAgbGV0IGZvcm1hdCAgPSBmb3JtYXRzLmxlbmd0aCA/IGZvcm1hdHNbMF0gOiBcImltYWdlL3BuZ1wiO1xuXG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICBsZXQgdmVyc2lvbiA9ICcxLjEuMSc7XG4gICAgaWYoc2VydmljZS5hcGkgJiYgc2VydmljZS5hcGkubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpczEzMCA9IHNlcnZpY2UuYXBpLmZpbHRlcihhcGkgPT4gYXBpLmFjY2Vzc1VSTC5pbmRleE9mKCd3bXMvMS4zLjAnKT4wICkubGVuZ3RoID4gMDtcbiAgICAgICAgaWYoaXMxMzApIHZlcnNpb24gPSAnMS4zLjAnO1xuICAgIH1cblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICBsYXllcnM6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICB3bXZJZDogbGF5ZXIuaWQsXG4gICAgICAgIHZlcnNpb246IHZlcnNpb25cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBXTVModXJsLCBvcHRzKTtcblxufVxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwgKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLldNUyA9IFdNUztcbiAgICBMLnRpbGVMYXllci53bXMgPSB3bXM7XG59XG5cbmV4cG9ydCB7XG4gICAgV01TIGFzIGRlZmF1bHQsXG4gICAgV01TLFxuICAgIHdtc1xufTtcbiJdfQ==