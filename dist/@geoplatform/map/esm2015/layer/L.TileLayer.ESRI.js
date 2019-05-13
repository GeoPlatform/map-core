/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5UaWxlTGF5ZXIuRVNSSS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJsYXllci9MLlRpbGVMYXllci5FU1JJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBR3RCLE9BQU8sRUFBTyxTQUFTLEVBQTRCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFLbEYsbUJBQW9CLFNBQVEsU0FBUzs7Ozs7SUFPakMsWUFBWSxHQUFHLEVBQUUsT0FBTztRQUNwQixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCOzs7Ozs7SUFFRCxVQUFVLENBQUUsR0FBRyxFQUFFLE9BQU87O1FBRXBCLElBQUcsQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxpQkFBaUIsR0FBRztZQUNyQixNQUFNLEVBQVEsRUFBRTs7WUFDaEIsV0FBVyxFQUFHLElBQUk7WUFDbEIsTUFBTSxFQUFRLE9BQU87WUFDckIsQ0FBQyxFQUFhLE9BQU87U0FNeEIsQ0FBQztRQUVGLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7O1lBQzNCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dCQUNULEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDSCxHQUFHLElBQUksU0FBUyxDQUFDO2FBQ3BCO1NBQ0o7UUFD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QUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLE9BQU87UUFDckMsT0FBTyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM3QyxDQUFDO0NBQ0w7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBNYXAsIFRpbGVMYXllciwgdGlsZUxheWVyLCBQb2ludCwgQ29vcmRzLCBCcm93c2VyLCBVdGlsIH0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7Q29uZmlnfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cbmNsYXNzIEVzcmlUaWxlTGF5ZXIgZXh0ZW5kcyBUaWxlTGF5ZXIge1xuXG4gICAgcHJpdmF0ZSBfdXJsIDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2NycyA6IGFueTtcbiAgICBwcml2YXRlIGVzcmlQYXJhbXMgOiBhbnk7XG4gICAgcHJpdmF0ZSBkZWZhdWx0RVNSSVBhcmFtcyA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHVybCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih1cmwsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKHVybCwgb3B0aW9ucykgeyAvLyAoU3RyaW5nLCBPYmplY3QpXG5cbiAgICAgICAgaWYoIXVybCkgdGhyb3cgbmV3IEVycm9yKFwiTGF5ZXIgd2FzIG5vdCBjb25maWd1cmVkIHdpdGggYSBVUkxcIik7XG5cbiAgICAgICAgdGhpcy5kZWZhdWx0RVNSSVBhcmFtcyA9IHtcbiAgICAgICAgICAgIGxheWVyczogICAgICAgJycsIC8vPXNob3c6MCwxLDJcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiAgdHJ1ZSxcbiAgICAgICAgICAgIGZvcm1hdDogICAgICAgJ3BuZzMyJyxcbiAgICAgICAgICAgIGY6ICAgICAgICAgICAgJ2ltYWdlJ1xuICAgICAgICAgICAgLy8gc3JzOiAgICAgICAgICAnNDMyNicsXG4gICAgICAgICAgICAvLyBiYm94c3I6ICAgICAgICc0MzI2JyxcbiAgICAgICAgICAgIC8vIGJib3g6ICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIC8vIHNpemU6ICAgICAgICAgJzI1NiwyNTYnLFxuICAgICAgICAgICAgLy8gaW1hZ2VzcjogICAgICAnNDMyNidcbiAgICAgICAgfTtcblxuICAgICAgICBpZih1cmwuaW5kZXhPZihcIi9leHBvcnRcIikgPCAwKSB7XG4gICAgICAgICAgICBsZXQgcWlkeCA9IHVybC5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgICAgIGlmKHFpZHggPiAwKSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCBxaWR4KSArICcvZXhwb3J0JyArIHVybC5zdWJzdHJpbmcocWlkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVybCArPSAnL2V4cG9ydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXJsID0gdXJsO1xuXG4gICAgICAgIGxldCBlc3JpUGFyYW1zIDogYW55ID0gVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEVTUklQYXJhbXMpLFxuICAgICAgICAgICAgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcblxuICAgICAgICBsZXQgZGltO1xuICAgICAgICBpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgQnJvd3Nlci5yZXRpbmEpIHtcbiAgICAgICAgICAgIGRpbSA9IGVzcmlQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGltID0gZXNyaVBhcmFtcy5oZWlnaHQgPSB0aWxlU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBlc3JpUGFyYW1zLnNpemUgPSBkaW0gKyAnLCcgKyBkaW07XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01TIHBhcmFtc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJ2NycycpIHtcbiAgICAgICAgICAgICAgICBlc3JpUGFyYW1zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGF5ZXIgaWRzXG4gICAgICAgIC8vIGVzcmlQYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgZXNyaVBhcmFtcy5sYXllcnM7XG5cbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zID0gZXNyaVBhcmFtcztcblxuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG5cbiAgICB9XG5cbiAgICBvbkFkZCAobWFwIDogTWFwKSA6IHRoaXMge1xuICAgICAgICB0aGlzLl9jcnMgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuY3JzIHx8IChtYXAub3B0aW9ucyBhcyBhbnkpLmNycztcbiAgICAgICAgdGhpcy5lc3JpUGFyYW1zLnNycyA9IHRoaXMuZXNyaVBhcmFtcy5pbWFnZXNyID0gdGhpcy5lc3JpUGFyYW1zLmJib3hzciA9IHRoaXMuX2Nycy5jb2RlO1xuICAgICAgICByZXR1cm4gc3VwZXIub25BZGQobWFwKTtcbiAgICB9XG5cbiAgICBnZXRUaWxlVXJsICh0aWxlUG9pbnQgOiBDb29yZHMgKSA6IHN0cmluZyB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcblxuICAgICAgICBsZXQgbWFwID0gdGhpcy5fbWFwLFxuICAgICAgICAgICAgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemUgYXMgbnVtYmVyLFxuXG4gICAgICAgIG53UG9pbnQgPSB0aWxlUG9pbnQubXVsdGlwbHlCeSh0aWxlU2l6ZSksXG4gICAgICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChbdGlsZVNpemUsIHRpbGVTaXplXSksXG5cbiAgICAgICAgbncgPSB0aGlzLl9jcnMucHJvamVjdChtYXAudW5wcm9qZWN0KG53UG9pbnQsIHRpbGVQb2ludC56KSksXG4gICAgICAgIHNlID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChzZVBvaW50LCB0aWxlUG9pbnQueikpLFxuICAgICAgICBiYm94ID0gW253LngsIHNlLnksIHNlLngsIG53LnldLmpvaW4oJywnKSxcblxuICAgICAgICB1cmwgPSBVdGlsLnRlbXBsYXRlKHRoaXMuX3VybCwge3M6IHRoaXMuX2dldFN1YmRvbWFpbih0aWxlUG9pbnQpfSk7XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IFV0aWwuZXh0ZW5kKHt9LCB0aGlzLmVzcmlQYXJhbXMpO1xuICAgICAgICBwYXJhbXMubGF5ZXJzID0gXCJzaG93OlwiICsgcGFyYW1zLmxheWVycztcblxuICAgICAgICAvL2NvbnZlcnQgdG8gZXNyaS1zcGVjaWFsIFNSIGZvciBzcGhlcmljYWwgbWVyY2F0b3JcbiAgICAgICAgaWYocGFyYW1zLmJib3hzciA9PT0gJ0VQU0c6Mzg1NycpXG4gICAgICAgICAgICBwYXJhbXMuYmJveHNyID0gJzEwMjEwMCc7XG4gICAgICAgIGlmKHBhcmFtcy5pbWFnZXNyID09PSAnRVBTRzozODU3JylcbiAgICAgICAgICAgIHBhcmFtcy5pbWFnZXNyID0gJzEwMjEwMCc7XG5cbiAgICAgICAgcmV0dXJuIHVybCArIFV0aWwuZ2V0UGFyYW1TdHJpbmcocGFyYW1zLCB1cmwsIHRydWUpICsgJyZCQk9YPScgKyBiYm94O1xuICAgIH1cblxuICAgIHNldFBhcmFtcyAocGFyYW1zLCBub1JlZHJhdykge1xuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLmVzcmlQYXJhbXMsIHBhcmFtcyk7XG4gICAgICAgIGlmICghbm9SZWRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgX2dldFN1YmRvbWFpbiAodGlsZVBvaW50IDogUG9pbnQpIDogc3RyaW5nIHtcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnNbaW5kZXhdO1xuXHR9XG59XG5cbmlmKCh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuVGlsZUxheWVyLkVTUkkgPSBFc3JpVGlsZUxheWVyO1xuICAgIEwudGlsZUxheWVyLmVzcmkgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5UaWxlTGF5ZXIuRVNSSSh1cmwsIG9wdGlvbnMpO1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVzcmlUaWxlTGF5ZXI7XG4iXX0=