/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        if (!url)
            throw new Error("Layer was not configured with a URL");
        this.defaultESRIParams = {
            layers: '',
            //=show:0,1,2
            transparent: true,
            format: 'png32',
            f: 'image'
            // srs:          '4326',
            // bboxsr:       '4326',
            // bbox:         null,
            // size:         '256,256',
            // imagesr:      '4326'
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
     * @template THIS
     * @this {THIS}
     * @param {?} map
     * @return {THIS}
     */
    onAdd(map) {
        (/** @type {?} */ (this))._crs = ((/** @type {?} */ ((/** @type {?} */ (this)).options))).crs || ((/** @type {?} */ (map.options))).crs;
        (/** @type {?} */ (this)).esriParams.srs = (/** @type {?} */ (this)).esriParams.imagesr = (/** @type {?} */ (this)).esriParams.bboxsr = (/** @type {?} */ (this))._crs.code;
        return super.onAdd(map);
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    getTileUrl(tilePoint) {
        // (Point, Number) -> String
        /** @type {?} */
        let map = this._map;
        /** @type {?} */
        let tileSize = (/** @type {?} */ (this.options.tileSize));
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
     * @template THIS
     * @this {THIS}
     * @param {?} params
     * @param {?} noRedraw
     * @return {THIS}
     */
    setParams(params, noRedraw) {
        Util.extend((/** @type {?} */ (this)).esriParams, params);
        if (!noRedraw) {
            (/** @type {?} */ (this)).redraw();
        }
        return (/** @type {?} */ (this));
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
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype._url;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype._crs;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype.esriParams;
    /**
     * @type {?}
     * @private
     */
    EsriTileLayer.prototype.defaultESRIParams;
}
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    const L = ((/** @type {?} */ (window))).L;
    L.TileLayer.ESRI = EsriTileLayer;
    L.tileLayer.esri = (/**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    function (url, options) {
        return new L.TileLayer.ESRI(url, options);
    });
}
export default EsriTileLayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNyaS10aWxlLWxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9lc3JpLXRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBTyxTQUFTLEVBQTRCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFLbEYsTUFBTSxhQUFjLFNBQVEsU0FBUzs7Ozs7SUFPakMsWUFBWSxHQUFHLEVBQUUsT0FBTztRQUNwQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUVELFVBQVUsQ0FBRSxHQUFHLEVBQUUsT0FBTztRQUVwQixJQUFHLENBQUMsR0FBRztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsaUJBQWlCLEdBQUc7WUFDckIsTUFBTSxFQUFRLEVBQUU7O1lBQ2hCLFdBQVcsRUFBRyxJQUFJO1lBQ2xCLE1BQU0sRUFBUSxPQUFPO1lBQ3JCLENBQUMsRUFBYSxPQUFPO1lBQ3JCLHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDeEIsc0JBQXNCO1lBQ3RCLDJCQUEyQjtZQUMzQix1QkFBdUI7U0FDMUIsQ0FBQztRQUVGLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNULEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDSCxHQUFHLElBQUksU0FBUyxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxJ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QUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7VUFDWixDQUFDLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSTs7Ozs7SUFBRyxVQUFVLEdBQUcsRUFBRSxPQUFPO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFBLENBQUM7Q0FDTDtBQUVELGVBQWUsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBQb2ludCwgQ29vcmRzLCBCcm93c2VyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jbGFzcyBFc3JpVGlsZUxheWVyIGV4dGVuZHMgVGlsZUxheWVyIHtcblxuICAgIHByaXZhdGUgX3VybCA6IHN0cmluZztcbiAgICBwcml2YXRlIF9jcnMgOiBhbnk7XG4gICAgcHJpdmF0ZSBlc3JpUGFyYW1zIDogYW55O1xuICAgIHByaXZhdGUgZGVmYXVsdEVTUklQYXJhbXMgOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIodXJsLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplICh1cmwsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgT2JqZWN0KVxuXG4gICAgICAgIGlmKCF1cmwpIHRocm93IG5ldyBFcnJvcihcIkxheWVyIHdhcyBub3QgY29uZmlndXJlZCB3aXRoIGEgVVJMXCIpO1xuXG4gICAgICAgIHRoaXMuZGVmYXVsdEVTUklQYXJhbXMgPSB7XG4gICAgICAgICAgICBsYXllcnM6ICAgICAgICcnLCAvLz1zaG93OjAsMSwyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogIHRydWUsXG4gICAgICAgICAgICBmb3JtYXQ6ICAgICAgICdwbmczMicsXG4gICAgICAgICAgICBmOiAgICAgICAgICAgICdpbWFnZSdcbiAgICAgICAgICAgIC8vIHNyczogICAgICAgICAgJzQzMjYnLFxuICAgICAgICAgICAgLy8gYmJveHNyOiAgICAgICAnNDMyNicsXG4gICAgICAgICAgICAvLyBiYm94OiAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAvLyBzaXplOiAgICAgICAgICcyNTYsMjU2JyxcbiAgICAgICAgICAgIC8vIGltYWdlc3I6ICAgICAgJzQzMjYnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYodXJsLmluZGV4T2YoXCIvZXhwb3J0XCIpIDwgMCkge1xuICAgICAgICAgICAgbGV0IHFpZHggPSB1cmwuaW5kZXhPZihcIj9cIik7XG4gICAgICAgICAgICBpZihxaWR4ID4gMCkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgcWlkeCkgKyAnL2V4cG9ydCcgKyB1cmwuc3Vic3RyaW5nKHFpZHgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmwgKz0gJy9leHBvcnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VybCA9IHVybDtcblxuICAgICAgICBsZXQgZXNyaVBhcmFtcyA6IGFueSA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRFU1JJUGFyYW1zKSxcbiAgICAgICAgICAgIHRpbGVTaXplID0gb3B0aW9ucy50aWxlU2l6ZSB8fCB0aGlzLm9wdGlvbnMudGlsZVNpemU7XG5cbiAgICAgICAgbGV0IGRpbTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEJyb3dzZXIucmV0aW5hKSB7XG4gICAgICAgICAgICBkaW0gPSBlc3JpUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplICogMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpbSA9IGVzcmlQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemU7XG4gICAgICAgIH1cbiAgICAgICAgZXNyaVBhcmFtcy5zaXplID0gZGltICsgJywnICsgZGltO1xuXG4gICAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgLy8gYWxsIGtleXMgdGhhdCBhcmUgbm90IFRpbGVMYXllciBvcHRpb25zIGdvIHRvIFdNUyBwYXJhbXNcbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLmhhc093blByb3BlcnR5KGkpICYmIGkgIT09ICdjcnMnKSB7XG4gICAgICAgICAgICAgICAgZXNyaVBhcmFtc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2xheWVyIGlkc1xuICAgICAgICAvLyBlc3JpUGFyYW1zLmxheWVycyA9IFwic2hvdzpcIiArIGVzcmlQYXJhbXMubGF5ZXJzO1xuXG4gICAgICAgIHRoaXMuZXNyaVBhcmFtcyA9IGVzcmlQYXJhbXM7XG5cbiAgICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgfVxuXG4gICAgb25BZGQgKG1hcCA6IE1hcCkgOiB0aGlzIHtcbiAgICAgICAgdGhpcy5fY3JzID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmNycyB8fCAobWFwLm9wdGlvbnMgYXMgYW55KS5jcnM7XG4gICAgICAgIHRoaXMuZXNyaVBhcmFtcy5zcnMgPSB0aGlzLmVzcmlQYXJhbXMuaW1hZ2VzciA9IHRoaXMuZXNyaVBhcmFtcy5iYm94c3IgPSB0aGlzLl9jcnMuY29kZTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLm9uQWRkKG1hcCk7XG4gICAgfVxuXG4gICAgZ2V0VGlsZVVybCAodGlsZVBvaW50IDogQ29vcmRzICkgOiBzdHJpbmcgeyAvLyAoUG9pbnQsIE51bWJlcikgLT4gU3RyaW5nXG5cbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX21hcCxcbiAgICAgICAgICAgIHRpbGVTaXplID0gdGhpcy5vcHRpb25zLnRpbGVTaXplIGFzIG51bWJlcixcblxuICAgICAgICBud1BvaW50ID0gdGlsZVBvaW50Lm11bHRpcGx5QnkodGlsZVNpemUpLFxuICAgICAgICBzZVBvaW50ID0gbndQb2ludC5hZGQoW3RpbGVTaXplLCB0aWxlU2l6ZV0pLFxuXG4gICAgICAgIG53ID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChud1BvaW50LCB0aWxlUG9pbnQueikpLFxuICAgICAgICBzZSA9IHRoaXMuX2Nycy5wcm9qZWN0KG1hcC51bnByb2plY3Qoc2VQb2ludCwgdGlsZVBvaW50LnopKSxcbiAgICAgICAgYmJveCA9IFtudy54LCBzZS55LCBzZS54LCBudy55XS5qb2luKCcsJyksXG5cbiAgICAgICAgdXJsID0gVXRpbC50ZW1wbGF0ZSh0aGlzLl91cmwsIHtzOiB0aGlzLl9nZXRTdWJkb21haW4odGlsZVBvaW50KX0pO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSBVdGlsLmV4dGVuZCh7fSwgdGhpcy5lc3JpUGFyYW1zKTtcbiAgICAgICAgcGFyYW1zLmxheWVycyA9IFwic2hvdzpcIiArIHBhcmFtcy5sYXllcnM7XG5cbiAgICAgICAgLy9jb252ZXJ0IHRvIGVzcmktc3BlY2lhbCBTUiBmb3Igc3BoZXJpY2FsIG1lcmNhdG9yXG4gICAgICAgIGlmKHBhcmFtcy5iYm94c3IgPT09ICdFUFNHOjM4NTcnKVxuICAgICAgICAgICAgcGFyYW1zLmJib3hzciA9ICcxMDIxMDAnO1xuICAgICAgICBpZihwYXJhbXMuaW1hZ2VzciA9PT0gJ0VQU0c6Mzg1NycpXG4gICAgICAgICAgICBwYXJhbXMuaW1hZ2VzciA9ICcxMDIxMDAnO1xuXG4gICAgICAgIHJldHVybiB1cmwgKyBVdGlsLmdldFBhcmFtU3RyaW5nKHBhcmFtcywgdXJsLCB0cnVlKSArICcmQkJPWD0nICsgYmJveDtcbiAgICB9XG5cbiAgICBzZXRQYXJhbXMgKHBhcmFtcywgbm9SZWRyYXcpIHtcbiAgICAgICAgVXRpbC5leHRlbmQodGhpcy5lc3JpUGFyYW1zLCBwYXJhbXMpO1xuICAgICAgICBpZiAoIW5vUmVkcmF3KSB7XG4gICAgICAgICAgICB0aGlzLnJlZHJhdygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIF9nZXRTdWJkb21haW4gKHRpbGVQb2ludCA6IFBvaW50KSA6IHN0cmluZyB7XG5cdFx0dmFyIGluZGV4ID0gTWF0aC5hYnModGlsZVBvaW50LnggKyB0aWxlUG9pbnQueSkgJSB0aGlzLm9wdGlvbnMuc3ViZG9tYWlucy5sZW5ndGg7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5zdWJkb21haW5zW2luZGV4XTtcblx0fVxufVxuXG5pZigod2luZG93IGFzIGFueSkuTCkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLlRpbGVMYXllci5FU1JJID0gRXNyaVRpbGVMYXllcjtcbiAgICBMLnRpbGVMYXllci5lc3JpID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IEwuVGlsZUxheWVyLkVTUkkodXJsLCBvcHRpb25zKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFc3JpVGlsZUxheWVyO1xuIl19