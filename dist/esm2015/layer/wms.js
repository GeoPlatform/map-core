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
    let formats = layer.supportedFormats || [];
    /** @type {?} */
    let format = formats.length ? formats[0] : "image/png";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci93bXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFHdEIsT0FBTyxFQUFPLFNBQVMsRUFBcUIsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxPQUFPLEVBQ0gsTUFBTSxFQUNULE1BQU0scUJBQXFCLENBQUM7QUFJN0IsU0FBVSxTQUFRLFNBQVMsQ0FBQyxHQUFHOzs7OztJQUkzQixZQUFZLEdBQVksRUFBRSxJQUFXO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBSFEsS0FBSztRQUk5QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztLQUN4Qjs7OztJQUVELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztLQUN6Qjs7OztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDeEI7Ozs7O0lBRUQsUUFBUSxDQUFFLEdBQVM7O1FBR2YsSUFBRyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7OztRQUk3QixPQUFPLEtBQUssQ0FBQyxRQUFRLENB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QUM5Rjs7SUFHRCxJQUFJLE9BQU8sR0FBWSxPQUFPLENBQUM7O0lBQy9CLElBQUksUUFBUSxHQUFjLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7SUFDNUQsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2pELE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsc0VBQXNFLENBQUMsQ0FBQztLQUN2Rjs7SUFFRCxJQUFJLElBQUksR0FBUztRQUNiLE1BQU0sRUFBUSxLQUFLLENBQUMsU0FBUztRQUM3QixXQUFXLEVBQUcsSUFBSTtRQUNsQixNQUFNLEVBQVEsTUFBTTtRQUNwQixLQUFLLEVBQVMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxFQUFPLE9BQU87S0FDeEIsQ0FBQztJQUNGLElBQUcsTUFBTSxpQkFBYztRQUNuQixtQkFBQyxJQUFXLEVBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxlQUFZLENBQUM7S0FDM0M7SUFFRCxPQUFPLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUU3QjtBQUVELElBQUksbUJBQUMsTUFBYSxFQUFDLENBQUMsQ0FBQyxFQUFHOztJQUNwQixNQUFNLENBQUMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztDQUN6QjtBQUVELE9BQU8sRUFDSCxHQUFHLElBQUksT0FBTyxFQUNkLEdBQUcsRUFDSCxHQUFHLEVBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AZ2VvcGxhdGZvcm0vY2xpZW50L2Rpc3Qvc2hhcmVkL21vZGVscy5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgTGF0TG5nLCBVdGlsLCBwb3B1cCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge1xuICAgIENvbmZpZywgTGF5ZXIgYXMgTGF5ZXJNb2RlbCwgU2VydmljZSBhcyBTZXJ2aWNlTW9kZWxcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jbGFzcyBXTVMgZXh0ZW5kcyBUaWxlTGF5ZXIuV01TIHtcblxuICAgIHByaXZhdGUgX2VuYWJsZWQgOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwgOiBzdHJpbmcsIG9wdHMgPzogYW55KSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0cyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVHZXRGZWF0dXJlSW5mbyAgKCkge1xuICAgICAgICB0aGlzLl9tYXAub24oJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVHZXRGZWF0dXJlSW5mbyAoKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoJ2NsaWNrJywgdGhpcy5nZXRGZWF0dXJlSW5mbywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpc0dldEZlYXR1cmVJbmZvRW5hYmxlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIDogdGhpcyB7XG5cbiAgICAgICAgLy9pZiBHRkkgaXMgZW5hYmxlZCwgZGlzYWJsZSBpdCBiZWZvcmUgcmVtb3ZpbmdcbiAgICAgICAgaWYodGhpcy5pc0dldEZlYXR1cmVJbmZvRW5hYmxlZCgpKVxuICAgICAgICB0aGlzLmRpc2FibGVHZXRGZWF0dXJlSW5mbygpO1xuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuIHRoZSBsYXllciBpcyByZW1vdmVkIGZyb20gYSBtYXAuXG4gICAgICAgIC8vICAgVW5yZWdpc3RlciBhIGNsaWNrIGxpc3RlbmVyLCB0aGVuIGRvIGFsbCB0aGUgdXBzdHJlYW0gV01TIHRoaW5nc1xuICAgICAgICByZXR1cm4gc3VwZXIub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgfVxuXG4gICAgZ2V0RmVhdHVyZUluZm8gIChldnQpIHtcbiAgICAgICAgLy8gTWFrZSBhbiBBSkFYIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBhbmQgaG9wZSBmb3IgdGhlIGJlc3RcbiAgICAgICAgdmFyIHVybCA9IHRoaXMuZ2V0RmVhdHVyZUluZm9VcmwoZXZ0LmxhdGxuZyksXG4gICAgICAgIHBhcnNlR2V0RmVhdHVyZUluZm8gPSB0aGlzLnBhcnNlR2V0RmVhdHVyZUluZm87XG4gICAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgc3VjY2VzcyAgKGRhdGEsIHN0YXR1cywgeGhyKSB7XG4gICAgICAgICAgICAgICAgLy8gdmFyIGVyciA9IHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/IG51bGwgOiBkYXRhO1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkYXRhKSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9IHBhcnNlR2V0RmVhdHVyZUluZm8oZGF0YSk7XG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dHZXRGZWF0dXJlSW5mbyhudWxsLCBldnQubGF0bG5nLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuc2hvd0dldEZlYXR1cmVJbmZvKGVycm9yKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGZWF0dXJlSW5mb1VybCAgKGxhdGxuZyA6IExhdExuZykge1xuICAgICAgICAvLyBDb25zdHJ1Y3QgYSBHZXRGZWF0dXJlSW5mbyByZXF1ZXN0IFVSTCBnaXZlbiBhIHBvaW50XG4gICAgICAgIHZhciBwb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXG4gICAgICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxuXG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNyczogJ0VQU0c6NDMyNicsXG4gICAgICAgICAgICBiYm94OiB0aGlzLl9tYXAuZ2V0Qm91bmRzKCkudG9CQm94U3RyaW5nKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUueSxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLngsXG4gICAgICAgICAgICAvLyBsYXllcnM6IHRoaXMud21zUGFyYW1zLmxheWVycyxcbiAgICAgICAgICAgIC8vIHF1ZXJ5X2xheWVyczogdGhpcy53bXNQYXJhbXMubGF5ZXJzLFxuICAgICAgICAgICAgaW5mb19mb3JtYXQ6ICd0ZXh0L3htbCcsXG4gICAgICAgICAgICB4OiBwb2ludC54LFxuICAgICAgICAgICAgeTogcG9pbnQueSxcbiAgICAgICAgICAgIGk6IHBvaW50LngsIC8vMS4zLjBcbiAgICAgICAgICAgIGo6IHBvaW50LnkgIC8vMS4zLjBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgd212SWQgPSAodGhpcy53bXNQYXJhbXMgYXMgYW55KS53bXZJZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhpcy5fdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHRoaXMuX3VybCwgdHJ1ZSk7XG4gICAgICAgIHZhciB1cmwgPSAnL2FwaS9sYXllcnMvJyArIHdtdklkICsgJy9mZWF0dXJlJztcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwYXJzZUdldEZlYXR1cmVJbmZvIChjb250ZW50KSB7XG4gICAgICAgIHZhciBmaWVsZHMgPSBbXTtcbiAgICAgICAgZm9yKHZhciBmaWVsZCBpbiBjb250ZW50KSB7XG4gICAgICAgICAgICBmaWVsZHMucHVzaChbJzxkaXY+PHN0cm9uZz4nLCBmaWVsZCwgJzogPC9zdHJvbmc+JywgY29udGVudFtmaWVsZF0sICc8L2Rpdj4nXS5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGZpZWxkcy5sZW5ndGggPT0gMClcbiAgICAgICAgZmllbGRzLnB1c2goJzxlbT5ObyBkYXRhIGF2YWlsYWJsZTwvZW0+Jyk7XG4gICAgICAgIHJldHVybiAnPGRpdj4nICsgZmllbGRzLmpvaW4oJyAnKSArICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIHNob3dHZXRGZWF0dXJlSW5mbyAgKGVyciA6IEVycm9yLCBsYXRsbmcgOiBMYXRMbmcsIGNvbnRlbnQ6IGFueSkge1xuICAgICAgICBpZiAoZXJyKSB7IGNvbnNvbGUubG9nKGVycik7IHJldHVybjsgfSAvLyBkbyBub3RoaW5nIGlmIHRoZXJlJ3MgYW4gZXJyb3JcblxuICAgICAgICAvLyBPdGhlcndpc2Ugc2hvdyB0aGUgY29udGVudCBpbiBhIHBvcHVwLCBvciBzb21ldGhpbmcuXG4gICAgICAgIHBvcHVwKHsgbWF4V2lkdGg6IDgwMH0pXG4gICAgICAgIC5zZXRMYXRMbmcobGF0bG5nKVxuICAgICAgICAuc2V0Q29udGVudChjb250ZW50KVxuICAgICAgICAub3Blbk9uKHRoaXMuX21hcCk7XG4gICAgfVxuXG59XG5cblxuZnVuY3Rpb24gd21zKGxheWVyIDogTGF5ZXJNb2RlbCkgOiBXTVMge1xuXG4gICAgbGV0IHNlcnZpY2UgOiBTZXJ2aWNlTW9kZWwgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBXTVMgTGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIChsYXllci5sYWJlbCB8fCBsYXllci5pZCkgK1xuICAgICAgICAgICAgXCInIGJlY2F1c2UgbGF5ZXIgaGFzIG5vIHNlcnZpY2UgYXNzb2NpYXRlZCB3aXRoIGl0XCIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgOiBzdHJpbmcgPSBzZXJ2aWNlLmhyZWY7XG4gICAgaWYoIXVybCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXTVMgbGF5ZXIncyBzZXJ2aWNlIGRvZXMgbm90IGRlZmluZWQgYSBzZXJ2aWNlIHVybFwiKTtcbiAgICB9XG5cbiAgICBsZXQgZm9ybWF0cyA6IHN0cmluZ1tdID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyB8fCBbXTtcbiAgICBsZXQgZm9ybWF0IDogc3RyaW5nICA9IGZvcm1hdHMubGVuZ3RoID8gZm9ybWF0c1swXSA6IFwiaW1hZ2UvcG5nXCI7XG5cbiAgICBsZXQgc3VwcG9ydGVkQ3JzID0gbGF5ZXIuY3JzIHx8IFtdO1xuICAgIGlmKHN1cHBvcnRlZENycyAmJiBzdXBwb3J0ZWRDcnMubGVuZ3RoID4gMCAmJiB+c3VwcG9ydGVkQ3JzLmluZGV4T2YoXCJFU1BHOjM4NTdcIikpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllciAnXCIgKyBsYXllci5sYWJlbCArIFwiJyBkb2VzIG5vdCBzdXBwb3J0IFwiICsgXG4gICAgICAgICAgICBcIkVQU0c6Mzg1NyBTcGhlcmljYWwgTWVyY2F0b3IgcHJvamVjdGlvbiBhbmQgbWF5IG5vdCByZW5kZXIgYXBwcm9wcmlhdGVseSBvciBhdCBhbGwuXCIpO1xuICAgIH1cblxuICAgIC8vZGV0ZXJtaW5lIHByb3BlciB2ZXJzaW9uIG9mIHRoZSBXTVMgc3BlYyB0byB1c2VcbiAgICBsZXQgdmVyc2lvbiA6IHN0cmluZyA9ICcxLjEuMSc7XG4gICAgbGV0IHZlcnNpb25zIDogc3RyaW5nW10gPSBzZXJ2aWNlLnNlcnZpY2VUeXBlVmVyc2lvbnMgfHwgW107XG4gICAgaWYodmVyc2lvbnMubGVuZ3RoICYmIHZlcnNpb25zLmluZGV4T2YoJzEuMS4xJykgPCAwKSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmc6IFdNUyBTZXJ2aWNlIGRvZXNuJ3QgbGlzdCBzdXBwb3J0ZWQgdmVyc2lvbnMsIGFzc3VtaW5nIDEuMS4xXCIpO1xuICAgIH1cblxuICAgIGxldCBvcHRzIDogYW55ID0ge1xuICAgICAgICBsYXllcnMgICAgICA6IGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgdHJhbnNwYXJlbnQgOiB0cnVlLFxuICAgICAgICBmb3JtYXQgICAgICA6IGZvcm1hdCxcbiAgICAgICAgd212SWQgICAgICAgOiBsYXllci5pZCxcbiAgICAgICAgdmVyc2lvbiAgICAgOiB2ZXJzaW9uXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIHtcbiAgICAgICAgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgV01TKHVybCwgb3B0cyk7XG5cbn1cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MICkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5XTVMgPSBXTVM7XG4gICAgTC50aWxlTGF5ZXIud21zID0gd21zO1xufVxuXG5leHBvcnQge1xuICAgIFdNUyBhcyBkZWZhdWx0LFxuICAgIFdNUyxcbiAgICB3bXNcbn07XG4iXX0=