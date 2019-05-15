/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { TileLayer, Browser, Util } from 'leaflet';
class EsriTileLayer extends TileLayer {
    /**
     * @param {?} url
     * @param {?} options
     */
    constructor(url, options) {
        super(url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    initialize(url, options) {
        // (String, Object)
        if (!url)
            throw new Error("Layer was not configured with a URL");
        this.defaultESRIParams = {
            layers: '',
            //=show:0,1,2
            transparent: true,
            format: 'png32',
            f: 'image'
        };
        if (url.indexOf("/export") < 0) {
            /** @type {?} */
            let qidx = url.indexOf("?");
            if (qidx > 0) {
                url = url.substring(0, qidx) + '/export' + url.substring(qidx);
            }
            else {
                url += '/export';
            }
        }
        this._url = url;
        /** @type {?} */
        let esriParams = Util.extend({}, this.defaultESRIParams);
        /** @type {?} */
        let tileSize = options.tileSize || this.options.tileSize;
        /** @type {?} */
        let dim;
        if (options.detectRetina && Browser.retina) {
            dim = esriParams.height = tileSize * 2;
        }
        else {
            dim = esriParams.height = tileSize;
        }
        esriParams.size = dim + ',' + dim;
        for (var i in options) {
            // all keys that are not TileLayer options go to WMS params
            if (!this.options.hasOwnProperty(i) && i !== 'crs') {
                esriParams[i] = options[i];
            }
        }
        //layer ids
        // esriParams.layers = "show:" + esriParams.layers;
        this.esriParams = esriParams;
        Util.setOptions(this, options);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
        this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
        return super.onAdd(map);
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    getTileUrl(tilePoint) {
        /** @type {?} */
        let map = this._map;
        /** @type {?} */
        let tileSize = /** @type {?} */ (this.options.tileSize);
        /** @type {?} */
        let nwPoint = tilePoint.multiplyBy(tileSize);
        /** @type {?} */
        let sePoint = nwPoint.add([tileSize, tileSize]);
        /** @type {?} */
        let nw = this._crs.project(map.unproject(nwPoint, tilePoint.z));
        /** @type {?} */
        let se = this._crs.project(map.unproject(sePoint, tilePoint.z));
        /** @type {?} */
        let bbox = [nw.x, se.y, se.x, nw.y].join(',');
        /** @type {?} */
        let url = Util.template(this._url, { s: this._getSubdomain(tilePoint) });
        /** @type {?} */
        let params = Util.extend({}, this.esriParams);
        params.layers = "show:" + params.layers;
        //convert to esri-special SR for spherical mercator
        if (params.bboxsr === 'EPSG:3857')
            params.bboxsr = '102100';
        if (params.imagesr === 'EPSG:3857')
            params.imagesr = '102100';
        return url + Util.getParamString(params, url, true) + '&BBOX=' + bbox;
    }
    /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    setParams(params, noRedraw) {
        Util.extend(this.esriParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    _getSubdomain(tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
}
if (false) {
    /** @type {?} */
    EsriTileLayer.prototype._url;
    /** @type {?} */
    EsriTileLayer.prototype._crs;
    /** @type {?} */
    EsriTileLayer.prototype.esriParams;
    /** @type {?} */
    EsriTileLayer.prototype.defaultESRIParams;
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L = (/** @type {?} */ (window)).L;
    L.TileLayer.ESRI = EsriTileLayer;
    L.tileLayer.esri = function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    };
}
export default EsriTileLayer;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS10aWxlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9lc3JpLXRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBTyxTQUFTLEVBQTRCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFLbEYsbUJBQW9CLFNBQVEsU0FBUzs7Ozs7SUFPakMsWUFBWSxHQUFHLEVBQUUsT0FBTztRQUNwQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7SUFFRCxVQUFVLENBQUUsR0FBRyxFQUFFLE9BQU87O1FBRXBCLElBQUcsQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxpQkFBaUIsR0FBRztZQUNyQixNQUFNLEVBQVEsRUFBRTs7WUFDaEIsV0FBVyxFQUFHLElBQUk7WUFDbEIsTUFBTSxFQUFRLE9BQU87WUFDckIsQ0FBQyxFQUFhLE9BQU87U0FNeEIsQ0FBQztRQUVGLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7O1lBQzNCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNULEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDSCxHQUFHLElBQUksU0FBUyxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7UUFFaEIsSUFBSSxVQUFVLEdBQVMsSUFBSSxDQUFDLE1B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QUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM3QyxDQUFDO0NBQ0w7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIHRpbGVMYXllciwgUG9pbnQsIENvb3JkcywgQnJvd3NlciwgVXRpbCB9IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQge0NvbmZpZ30gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuY2xhc3MgRXNyaVRpbGVMYXllciBleHRlbmRzIFRpbGVMYXllciB7XG5cbiAgICBwcml2YXRlIF91cmwgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfY3JzIDogYW55O1xuICAgIHByaXZhdGUgZXNyaVBhcmFtcyA6IGFueTtcbiAgICBwcml2YXRlIGRlZmF1bHRFU1JJUGFyYW1zIDogYW55O1xuXG4gICAgY29uc3RydWN0b3IodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHVybCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAodXJsLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIE9iamVjdClcblxuICAgICAgICBpZighdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJMYXllciB3YXMgbm90IGNvbmZpZ3VyZWQgd2l0aCBhIFVSTFwiKTtcblxuICAgICAgICB0aGlzLmRlZmF1bHRFU1JJUGFyYW1zID0ge1xuICAgICAgICAgICAgbGF5ZXJzOiAgICAgICAnJywgLy89c2hvdzowLDEsMlxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6ICB0cnVlLFxuICAgICAgICAgICAgZm9ybWF0OiAgICAgICAncG5nMzInLFxuICAgICAgICAgICAgZjogICAgICAgICAgICAnaW1hZ2UnXG4gICAgICAgICAgICAvLyBzcnM6ICAgICAgICAgICc0MzI2JyxcbiAgICAgICAgICAgIC8vIGJib3hzcjogICAgICAgJzQzMjYnLFxuICAgICAgICAgICAgLy8gYmJveDogICAgICAgICBudWxsLFxuICAgICAgICAgICAgLy8gc2l6ZTogICAgICAgICAnMjU2LDI1NicsXG4gICAgICAgICAgICAvLyBpbWFnZXNyOiAgICAgICc0MzI2J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmKHVybC5pbmRleE9mKFwiL2V4cG9ydFwiKSA8IDApIHtcbiAgICAgICAgICAgIGxldCBxaWR4ID0gdXJsLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICAgICAgaWYocWlkeCA+IDApIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHFpZHgpICsgJy9leHBvcnQnICsgdXJsLnN1YnN0cmluZyhxaWR4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsICs9ICcvZXhwb3J0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG5cbiAgICAgICAgbGV0IGVzcmlQYXJhbXMgOiBhbnkgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0RVNSSVBhcmFtcyksXG4gICAgICAgICAgICB0aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgdGhpcy5vcHRpb25zLnRpbGVTaXplO1xuXG4gICAgICAgIGxldCBkaW07XG4gICAgICAgIGlmIChvcHRpb25zLmRldGVjdFJldGluYSAmJiBCcm93c2VyLnJldGluYSkge1xuICAgICAgICAgICAgZGltID0gZXNyaVBhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZSAqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaW0gPSBlc3JpUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xuICAgICAgICB9XG4gICAgICAgIGVzcmlQYXJhbXMuc2l6ZSA9IGRpbSArICcsJyArIGRpbTtcblxuICAgICAgICBmb3IgKHZhciBpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGFsbCBrZXlzIHRoYXQgYXJlIG5vdCBUaWxlTGF5ZXIgb3B0aW9ucyBnbyB0byBXTVMgcGFyYW1zXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAnY3JzJykge1xuICAgICAgICAgICAgICAgIGVzcmlQYXJhbXNbaV0gPSBvcHRpb25zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9sYXllciBpZHNcbiAgICAgICAgLy8gZXNyaVBhcmFtcy5sYXllcnMgPSBcInNob3c6XCIgKyBlc3JpUGFyYW1zLmxheWVycztcblxuICAgICAgICB0aGlzLmVzcmlQYXJhbXMgPSBlc3JpUGFyYW1zO1xuXG4gICAgICAgIFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIH1cblxuICAgIG9uQWRkIChtYXAgOiBNYXApIDogdGhpcyB7XG4gICAgICAgIHRoaXMuX2NycyA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5jcnMgfHwgKG1hcC5vcHRpb25zIGFzIGFueSkuY3JzO1xuICAgICAgICB0aGlzLmVzcmlQYXJhbXMuc3JzID0gdGhpcy5lc3JpUGFyYW1zLmltYWdlc3IgPSB0aGlzLmVzcmlQYXJhbXMuYmJveHNyID0gdGhpcy5fY3JzLmNvZGU7XG4gICAgICAgIHJldHVybiBzdXBlci5vbkFkZChtYXApO1xuICAgIH1cblxuICAgIGdldFRpbGVVcmwgKHRpbGVQb2ludCA6IENvb3JkcyApIDogc3RyaW5nIHsgLy8gKFBvaW50LCBOdW1iZXIpIC0+IFN0cmluZ1xuXG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9tYXAsXG4gICAgICAgICAgICB0aWxlU2l6ZSA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZSBhcyBudW1iZXIsXG5cbiAgICAgICAgbndQb2ludCA9IHRpbGVQb2ludC5tdWx0aXBseUJ5KHRpbGVTaXplKSxcbiAgICAgICAgc2VQb2ludCA9IG53UG9pbnQuYWRkKFt0aWxlU2l6ZSwgdGlsZVNpemVdKSxcblxuICAgICAgICBudyA9IHRoaXMuX2Nycy5wcm9qZWN0KG1hcC51bnByb2plY3QobndQb2ludCwgdGlsZVBvaW50LnopKSxcbiAgICAgICAgc2UgPSB0aGlzLl9jcnMucHJvamVjdChtYXAudW5wcm9qZWN0KHNlUG9pbnQsIHRpbGVQb2ludC56KSksXG4gICAgICAgIGJib3ggPSBbbncueCwgc2UueSwgc2UueCwgbncueV0uam9pbignLCcpLFxuXG4gICAgICAgIHVybCA9IFV0aWwudGVtcGxhdGUodGhpcy5fdXJsLCB7czogdGhpcy5fZ2V0U3ViZG9tYWluKHRpbGVQb2ludCl9KTtcblxuICAgICAgICBsZXQgcGFyYW1zID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZXNyaVBhcmFtcyk7XG4gICAgICAgIHBhcmFtcy5sYXllcnMgPSBcInNob3c6XCIgKyBwYXJhbXMubGF5ZXJzO1xuXG4gICAgICAgIC8vY29udmVydCB0byBlc3JpLXNwZWNpYWwgU1IgZm9yIHNwaGVyaWNhbCBtZXJjYXRvclxuICAgICAgICBpZihwYXJhbXMuYmJveHNyID09PSAnRVBTRzozODU3JylcbiAgICAgICAgICAgIHBhcmFtcy5iYm94c3IgPSAnMTAyMTAwJztcbiAgICAgICAgaWYocGFyYW1zLmltYWdlc3IgPT09ICdFUFNHOjM4NTcnKVxuICAgICAgICAgICAgcGFyYW1zLmltYWdlc3IgPSAnMTAyMTAwJztcblxuICAgICAgICByZXR1cm4gdXJsICsgVXRpbC5nZXRQYXJhbVN0cmluZyhwYXJhbXMsIHVybCwgdHJ1ZSkgKyAnJkJCT1g9JyArIGJib3g7XG4gICAgfVxuXG4gICAgc2V0UGFyYW1zIChwYXJhbXMsIG5vUmVkcmF3KSB7XG4gICAgICAgIFV0aWwuZXh0ZW5kKHRoaXMuZXNyaVBhcmFtcywgcGFyYW1zKTtcbiAgICAgICAgaWYgKCFub1JlZHJhdykge1xuICAgICAgICAgICAgdGhpcy5yZWRyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBfZ2V0U3ViZG9tYWluICh0aWxlUG9pbnQgOiBQb2ludCkgOiBzdHJpbmcge1xuXHRcdHZhciBpbmRleCA9IE1hdGguYWJzKHRpbGVQb2ludC54ICsgdGlsZVBvaW50LnkpICUgdGhpcy5vcHRpb25zLnN1YmRvbWFpbnMubGVuZ3RoO1xuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuc3ViZG9tYWluc1tpbmRleF07XG5cdH1cbn1cblxuaWYoKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5UaWxlTGF5ZXIuRVNSSSA9IEVzcmlUaWxlTGF5ZXI7XG4gICAgTC50aWxlTGF5ZXIuZXNyaSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMLlRpbGVMYXllci5FU1JJKHVybCwgb3B0aW9ucyk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXNyaVRpbGVMYXllcjtcbiJdfQ==