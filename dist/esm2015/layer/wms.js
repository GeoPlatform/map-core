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
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    return new WMS(url, opts);
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.WMS = WMS;
    L.tileLayer.wms = wms;
}
export { WMS as default, WMS, wms };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFHdEIsT0FBTyxFQUFPLFNBQVMsRUFBcUIsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFJM0MsU0FBVSxTQUFRLFNBQVMsQ0FBQyxHQUFHOzs7OztJQUkzQixZQUFZLEdBQVksRUFBRSxJQUFXO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBSFEsS0FBSztRQUk5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7O0lBRUQsUUFBUSxDQUFFLEdBQVM7O1FBR2YsSUFBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7OztRQUk3QixPQUFPLEtBQUssQ0FBQyxRQUFRLENB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TUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4RixJQUFHLEtBQUs7WUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQy9COztJQUVELElBQUksSUFBSSxHQUFHO1FBQ1AsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTO1FBQ3ZCLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ2YsT0FBTyxFQUFFLE9BQU87S0FDbkIsQ0FBQztJQUNGLElBQUcsTUFBTTtRQUNMLG1CQUFDLElBQVcsRUFBQyxDQUFDLElBQUksR0FBRyxNQUFNLGVBQVksQ0FBQztJQUU1QyxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixNQUFNLENBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jbGFzcyBXTVMgZXh0ZW5kcyBUaWxlTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2VuYWJsZWQgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0cyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVHZXRGZWF0dXJlSW5mbyAgKCkge1xuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVHZXRGZWF0dXJlSW5mbyAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0dldEZlYXR1cmVJbmZvRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIDogdGhpcyB7XG5cbiAgICAgICAgLy9pZiBHRkkgaXMgZW5hYmxlZCwgZGlzYWJsZSBpdCBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgaWYodGhpcy5pc0dldEZlYXR1cmVJbmZvRW5hYmxlZCgpKVxuICAgICAgICB0aGlzLmRpc2FibGVHZXRGZWF0dXJlSW5mbygpO1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuIHRoZSBsYXllciBpcyByZW1vdmVkIGZyb20gYSBtYXAuXG4gICAgICAgIC8vICAgVW5yZWdpc3RlciBhIGNsaWNrIGxpc3RlbmVyLCB0aGVuIGRvIGFsbCB0aGUgdXBzdHJlYW0gV01TIHRoaW5nc1xuICAgICAgICByZXR1cm4gc3VwZXIub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm8gIChldnQpIHtcbiAgICAgICAgLy8gTWFrZSBhbiBBSkFYIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaG9wZSBmb3IgdGhlIGJlc3RcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0RmVhdHVyZUluZm9VcmwoZXZ0LmxhdGxuZyksXG4gICAgICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gPSB0aGlzLnBhcnNlR2V0RmVhdHVyZUluZm87XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzcyAgKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGVyciA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IG51bGwgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9IHBhcnNlR2V0RmVhdHVyZUluZm8oZGF0YSk7XG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhudWxsLCBldnQubGF0bG5nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGVycm9yKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mb1VybCAgKGxhdGxuZyA6IExhdExuZykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgYSBHZXRGZWF0dXJlSW5mbyByZXF1ZXN0IFVSTCBnaXZlbiBhIHBvaW50XG4gICAgICAgIHZhciBwb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXG4gICAgICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxuXG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNyczogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICBiYm94OiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkudG9CQm94U3RyaW5nKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLngsXG4gICAgICAgICAgICAvLyBsYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIC8vIHF1ZXJ5X2xheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgaW5mb19mb3JtYXQ6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgIGk6IHBvaW50LngsIC8vMS4zLjBcbiAgICAgICAgICAgIGo6IHBvaW50LnkgIC8vMS4zLjBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd212SWQgPSAodGhpcy53bXNQYXJhbXMgYXMgYW55KS53bXZJZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5fdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS9sYXllcnMvJyArIHdtdklkICsgJy9mZWF0dXJlJztcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJzZUdldEZlYXR1cmVJbmZvIChjb250ZW50KSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBmaWVsZCBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICBmaWVsZHMucHVzaChbJzxkaXY+PHN0cm9uZz4nLCBmaWVsZCwgJzogPC9zdHJvbmc+JywgY29udGVudFtmaWVsZF0sICc8L2Rpdj4nXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkcy5sZW5ndGggPT0gMClcbiAgICAgICAgZmllbGRzLnB1c2goJzxlbT5ObyBkYXRhIGF2YWlsYWJsZTwvZW0+Jyk7XG4gICAgICAgIHJldHVybiAnPGRpdj4nICsgZmllbGRzLmpvaW4oJyAnKSArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHNob3dHZXRGZWF0dXJlSW5mbyAgKGVyciA6IEVycm9yLCBsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7IGNvbnNvbGUubG9nKGVycik7IHJldHVybjsgfSAvLyBkbyBub3RoaW5nIGlmIHRoZXJlJ3MgYW4gZXJyb3JcblxuICAgICAgICAvLyBPdGhlcndpc2Ugc2hvdyB0aGUgY29udGVudCBpbiBhIHBvcHVwLCBvciBzb21ldGhpbmcuXG4gICAgICAgIHBvcHVwKHsgbWF4V2lkdGg6IDgwMH0pXG4gICAgICAgIC5zZXRMYXRMbmcobGF0bG5nKVxuICAgICAgICAuc2V0Q29udGVudChjb250ZW50KVxuICAgICAgICAub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gd21zKGxheWVyKSB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYHdtcygpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBzZXJ2aWNlLmhyZWY7XG4gICAgbGV0IGZvcm1hdHMgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzIHx8IFtdO1xuICAgIGxldCBmb3JtYXQgID0gZm9ybWF0cy5sZW5ndGggPyBmb3JtYXRzWzBdIDogXCJpbWFnZS9wbmdcIjtcblxuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV01TIGxheWVyJ3Mgc2VydmljZSBkb2VzIG5vdCBkZWZpbmVkIGEgc2VydmljZSB1cmxcIik7XG4gICAgfVxuXG4gICAgbGV0IHZlcnNpb24gPSAnMS4xLjEnO1xuICAgIGlmKHNlcnZpY2UuYXBpICYmIHNlcnZpY2UuYXBpLmxlbmd0aCkge1xuICAgICAgICBsZXQgaXMxMzAgPSBzZXJ2aWNlLmFwaS5maWx0ZXIoYXBpID0+IGFwaS5hY2Nlc3NVUkwuaW5kZXhPZignd21zLzEuMy4wJyk+MCApLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmKGlzMTMwKSB2ZXJzaW9uID0gJzEuMy4wJztcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgbGF5ZXJzOiBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICAgICAgd212SWQ6IGxheWVyLmlkLFxuICAgICAgICB2ZXJzaW9uOiB2ZXJzaW9uXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgV01TKHVybCwgb3B0cyk7XG5cbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVMgPSBXTVM7XG4gICAgTC50aWxlTGF5ZXIud21zID0gd21zO1xufVxuXG5leHBvcnQge1xuICAgIFdNUyBhcyBkZWZhdWx0LFxuICAgIFdNUyxcbiAgICB3bXNcbn07XG4iXX0=