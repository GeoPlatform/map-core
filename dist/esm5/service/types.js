/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ItemService, XHRHttpClient, QueryFactory, Config } from '@geoplatform/client';
/** @type {?} */
var ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
/** @type {?} */
var esriExpr = /Esri REST ([A-Za-z]+) Service/;
/** @type {?} */
var keyFn = (/**
 * @param {?} expr
 * @param {?} str
 * @return {?}
 */
function (expr, str) {
    /** @type {?} */
    var m = expr.exec(str);
    return (m && m.length) ? m[1] : null;
});
var ɵ0 = keyFn;
/** @type {?} */
var types = {
    ESRI_FEATURE_SERVER: {
        "id": "48980c5bad0c8d4666b393874eb5279a",
        "uri": "http://www.geoplatform.gov/spec/esri-feature-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Feature Server REST API",
        "label": "Esri REST Feature Service"
    },
    ESRI_IMAGE_SERVER: {
        "id": "bcdf764e52064c84323f3f1baea7e245",
        "uri": "http://www.geoplatform.gov/spec/esri-image-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Image Server REST API",
        "label": "Esri REST Image Service"
    },
    ESRI_MAP_SERVER: {
        "id": "370cf6ca5d91c07b63329b8384fe76c7",
        "uri": "http://www.geoplatform.gov/spec/esri-map-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Map Server REST API",
        "label": "Esri REST Map Service"
    },
    ESRI_TILE_SERVER: {
        "id": "c75570ff2523b1a1631afe7ddac27beb",
        "uri": "http://www.geoplatform.gov/spec/esri-tile-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Tile Server REST API",
        "label": "Esri REST Tile Service"
    },
    KML: {
        "id": "c0b39ca2049ba2184472ff27408ffd7e",
        "uri": "http://opengis.net/spec/kml",
        "type": "dct:Standard",
        "description": "OGC Keyhole Markup Language (KML)",
        "label": "OGC Keyhole Markup Language (KML)"
    },
    CSW: {
        "id": "60de6a422475493b7901ae453d6f4562",
        "uri": "http://opengis.net/spec/csw",
        "type": "dct:Standard",
        "description": "OGC Web Catalog Service (CSW)",
        "label": "OGC Web Catalog Service (CSW)"
    },
    WCS: {
        "id": "a7e5a2d81a83d4eae9bf9138f24d0a32",
        "uri": "http://opengis.net/spec/wcs",
        "type": "dct:Standard",
        "description": "OGC Web Coverage Service (WCS)",
        "label": "OGC Web Coverage Service (WCS)"
    },
    WFS: {
        "id": "e70e43ed52f83634285a09e959734bff",
        "uri": "http://opengis.net/spec/wfs",
        "type": "dct:Standard",
        "description": "OGC Web Feature Service (WFS)",
        "label": "OGC Web Feature Service (WFS)"
    },
    WMS: {
        "id": "abed5a00c536fb2d7019092c37ed634c",
        "uri": "http://opengis.net/spec/wms",
        "type": "dct:Standard",
        "description": "OGC Web Map Service (WMS)",
        "label": "OGC Web Map Service (WMS)"
    },
    WMTS: {
        "id": "757858ae77cf8c602b39294c27632dd7",
        "uri": "http://opengis.net/spec/wmts",
        "type": "dct:Standard",
        "description": "OGC Web Map Tile Service (WMTS)",
        "label": "OGC Web Map Tile Service (WMTS)"
    },
    WMST: {
        "id": "faae5bff49b1144d500380cbc055c1e5",
        "uri": "http://www.geoplatform.gov/spec/ogc-wms-t",
        "type": "dct:Standard",
        "description": "OGC WMS support for temporal according to OGC Best Practice guidance",
        "label": "OGC WMS-T Service"
    },
    FEED: {
        "id": "8edc61870e534a1f23dc967753da3b72",
        "uri": "http://www.geoplatform.gov/spec/feed",
        "type": "dct:Standard",
        "description": "GeoPlatform GeoJSON Feed Service converts an Atom/RSS feed (including GeoRSS and CAP extensions) to GeoJSON",
        "label": "GeoPlatform GeoJSON Feed Service"
    },
    //
    //method to allow refreshing list later
    refresh: updateList
};
/**
 * @param {?} service
 * @return {?}
 */
function updateList(service) {
    /** @type {?} */
    var url = Config.ualUrl;
    if (!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
    }
    else {
        /** @type {?} */
        var query = QueryFactory()
            .types('dct:Standard')
            .resourceTypes('ServiceType')
            .pageSize(50);
        /** @type {?} */
        var svc = null;
        //if a service was provided to be used, use it
        if (service && typeof (service.search) !== 'undefined') {
            svc = service;
        }
        else { // otherwise, use defaults
            svc = new ItemService(url, new XHRHttpClient());
        }
        svc.search(query).then((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            for (var i = 0; i < data.results.length; ++i) {
                /** @type {?} */
                var type = data.results[i];
                /** @type {?} */
                var key = null;
                /** @type {?} */
                var label = type.label;
                if (~label.indexOf("WMS-T")) {
                    key = 'WMST';
                    type.supported = true;
                }
                else if (~label.indexOf('OGC')) {
                    key = keyFn(ogcExpr, label);
                    type.supported = 'WMS' === key || 'WMTS' === key;
                }
                else if (~label.indexOf('Esri')) {
                    key = keyFn(esriExpr, label);
                    type.supported = true;
                    key = 'ESRI_' + key.toUpperCase() + '_SERVER';
                }
                else if (~label.indexOf("Feed")) {
                    key = "FEED";
                    type.supported = true;
                }
                else {
                    key = label;
                }
                types[key] = type;
            }
            // console.log(types);
        }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Error loading supported service types: " + error.message);
        }));
    }
}
export default types;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDSCxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ25ELE1BQU0scUJBQXFCLENBQUM7O0lBSXZCLE9BQU8sR0FBRyxxQkFBcUI7O0lBQy9CLFFBQVEsR0FBRywrQkFBK0I7O0lBQzFDLEtBQUs7Ozs7O0FBQUcsVUFBQyxJQUFJLEVBQUUsR0FBRzs7UUFDaEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3RCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUN6QyxDQUFDLENBQUE7OztJQUVHLEtBQUssR0FBRztJQUVSLG1CQUFtQixFQUFFO1FBQ2pCLElBQUksRUFBQyxrQ0FBa0M7UUFDdkMsS0FBSyxFQUFDLG1EQUFtRDtRQUN6RCxNQUFNLEVBQUMsY0FBYztRQUNyQixhQUFhLEVBQUMscUNBQXFDO1FBQ25ELE9BQU8sRUFBQywyQkFBMkI7S0FDdEM7SUFFRCxpQkFBaUIsRUFBRTtRQUNmLElBQUksRUFBQyxrQ0FBa0M7UUFDdkMsS0FBSyxFQUFDLGlEQUFpRDtRQUN2RCxNQUFNLEVBQUMsY0FBYztRQUNyQixhQUFhLEVBQUMsbUNBQW1DO1FBQ2pELE9BQU8sRUFBQyx5QkFBeUI7S0FDcEM7SUFFRCxlQUFlLEVBQUU7UUFDYixJQUFJLEVBQUMsa0NBQWtDO1FBQ3ZDLEtBQUssRUFBQywrQ0FBK0M7UUFDckQsTUFBTSxFQUFDLGNBQWM7UUFDckIsYUFBYSxFQUFDLGlDQUFpQztRQUMvQyxPQUFPLEVBQUMsdUJBQXVCO0tBQ2xDO0lBRUQsZ0JBQWdCLEVBQUU7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SztZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNFLENBQUMsRUFBQyxDQUFDO0tBQ047QUFDTCxDQUFDO0FBRUQsZUFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7XG4gICAgSXRlbVNlcnZpY2UsIFhIUkh0dHBDbGllbnQsIFF1ZXJ5RmFjdG9yeSwgQ29uZmlnXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cblxuY29uc3Qgb2djRXhwciA9IC9PR0MuK1xcKChbQS1aXFwtXSspXFwpLztcbmNvbnN0IGVzcmlFeHByID0gL0VzcmkgUkVTVCAoW0EtWmEtel0rKSBTZXJ2aWNlLztcbmNvbnN0IGtleUZuID0gKGV4cHIsIHN0cikgPT4ge1xuICAgIGxldCBtID0gZXhwci5leGVjKHN0cik7XG4gICAgcmV0dXJuIChtICYmIG0ubGVuZ3RoKSA/IG1bMV0gOiBudWxsO1xufTtcblxudmFyIHR5cGVzID0ge1xuXG4gICAgRVNSSV9GRUFUVVJFX1NFUlZFUjoge1xuICAgICAgICBcImlkXCI6XCI0ODk4MGM1YmFkMGM4ZDQ2NjZiMzkzODc0ZWI1Mjc5YVwiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLWZlYXR1cmUtcmVzdFwiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJFc3JpIEFyY0dJUyBGZWF0dXJlIFNlcnZlciBSRVNUIEFQSVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJFc3JpIFJFU1QgRmVhdHVyZSBTZXJ2aWNlXCJcbiAgICB9LFxuXG4gICAgRVNSSV9JTUFHRV9TRVJWRVI6IHtcbiAgICAgICAgXCJpZFwiOlwiYmNkZjc2NGU1MjA2NGM4NDMyM2YzZjFiYWVhN2UyNDVcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L3NwZWMvZXNyaS1pbWFnZS1yZXN0XCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVzcmkgQXJjR0lTIEltYWdlIFNlcnZlciBSRVNUIEFQSVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJFc3JpIFJFU1QgSW1hZ2UgU2VydmljZVwiXG4gICAgfSxcblxuICAgIEVTUklfTUFQX1NFUlZFUjoge1xuICAgICAgICBcImlkXCI6XCIzNzBjZjZjYTVkOTFjMDdiNjMzMjliODM4NGZlNzZjN1wiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLW1hcC1yZXN0XCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVzcmkgQXJjR0lTIE1hcCBTZXJ2ZXIgUkVTVCBBUElcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiRXNyaSBSRVNUIE1hcCBTZXJ2aWNlXCJcbiAgICB9LFxuXG4gICAgRVNSSV9USUxFX1NFUlZFUjoge1xuICAgICAgICBcImlkXCI6IFwiYzc1NTcwZmYyNTIzYjFhMTYzMWFmZTdkZGFjMjdiZWJcIixcbiAgICAgICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktdGlsZS1yZXN0XCIsXG4gICAgICAgIFwidHlwZVwiOiBcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiRXNyaSBBcmNHSVMgVGlsZSBTZXJ2ZXIgUkVTVCBBUElcIixcbiAgICAgICAgXCJsYWJlbFwiOiBcIkVzcmkgUkVTVCBUaWxlIFNlcnZpY2VcIlxuICAgIH0sXG5cbiAgICBLTUw6IHtcbiAgICAgICAgXCJpZFwiOlwiYzBiMzljYTIwNDliYTIxODQ0NzJmZjI3NDA4ZmZkN2VcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL2ttbFwiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJPR0MgS2V5aG9sZSBNYXJrdXAgTGFuZ3VhZ2UgKEtNTClcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIEtleWhvbGUgTWFya3VwIExhbmd1YWdlIChLTUwpXCJcbiAgICB9LFxuXG4gICAgQ1NXOiB7XG4gICAgICAgIFwiaWRcIjpcIjYwZGU2YTQyMjQ3NTQ5M2I3OTAxYWU0NTNkNmY0NTYyXCIsXG4gICAgICAgIFwidXJpXCI6XCJodHRwOi8vb3Blbmdpcy5uZXQvc3BlYy9jc3dcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiT0dDIFdlYiBDYXRhbG9nIFNlcnZpY2UgKENTVylcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIFdlYiBDYXRhbG9nIFNlcnZpY2UgKENTVylcIlxuICAgIH0sXG5cbiAgICBXQ1M6IHtcbiAgICAgICAgXCJpZFwiOlwiYTdlNWEyZDgxYTgzZDRlYWU5YmY5MTM4ZjI0ZDBhMzJcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL3djc1wiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJPR0MgV2ViIENvdmVyYWdlIFNlcnZpY2UgKFdDUylcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIFdlYiBDb3ZlcmFnZSBTZXJ2aWNlIChXQ1MpXCJcbiAgICB9LFxuXG4gICAgV0ZTOiB7XG4gICAgICAgIFwiaWRcIjpcImU3MGU0M2VkNTJmODM2MzQyODVhMDllOTU5NzM0YmZmXCIsXG4gICAgICAgIFwidXJpXCI6XCJodHRwOi8vb3Blbmdpcy5uZXQvc3BlYy93ZnNcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiT0dDIFdlYiBGZWF0dXJlIFNlcnZpY2UgKFdGUylcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIFdlYiBGZWF0dXJlIFNlcnZpY2UgKFdGUylcIlxuICAgIH0sXG5cbiAgICBXTVM6IHtcbiAgICAgICAgXCJpZFwiOlwiYWJlZDVhMDBjNTM2ZmIyZDcwMTkwOTJjMzdlZDYzNGNcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL3dtc1wiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJPR0MgV2ViIE1hcCBTZXJ2aWNlIChXTVMpXCIsXG4gICAgICAgIFwibGFiZWxcIjpcIk9HQyBXZWIgTWFwIFNlcnZpY2UgKFdNUylcIlxuICAgIH0sXG5cbiAgICBXTVRTOiB7XG4gICAgICAgIFwiaWRcIjpcIjc1Nzg1OGFlNzdjZjhjNjAyYjM5Mjk0YzI3NjMyZGQ3XCIsXG4gICAgICAgIFwidXJpXCI6XCJodHRwOi8vb3Blbmdpcy5uZXQvc3BlYy93bXRzXCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk9HQyBXZWIgTWFwIFRpbGUgU2VydmljZSAoV01UUylcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIFdlYiBNYXAgVGlsZSBTZXJ2aWNlIChXTVRTKVwiXG4gICAgfSxcblxuICAgIFdNU1Q6IHtcbiAgICAgICAgXCJpZFwiOiBcImZhYWU1YmZmNDliMTE0NGQ1MDAzODBjYmMwNTVjMWU1XCIsXG4gICAgICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9vZ2Mtd21zLXRcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJPR0MgV01TIHN1cHBvcnQgZm9yIHRlbXBvcmFsIGFjY29yZGluZyB0byBPR0MgQmVzdCBQcmFjdGljZSBndWlkYW5jZVwiLFxuICAgICAgICBcImxhYmVsXCI6IFwiT0dDIFdNUy1UIFNlcnZpY2VcIlxuICAgIH0sXG5cbiAgICBGRUVEOiB7XG4gICAgICAgIFwiaWRcIjogXCI4ZWRjNjE4NzBlNTM0YTFmMjNkYzk2Nzc1M2RhM2I3MlwiLFxuICAgICAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L3NwZWMvZmVlZFwiLFxuICAgICAgICBcInR5cGVcIjogXCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkdlb1BsYXRmb3JtIEdlb0pTT04gRmVlZCBTZXJ2aWNlIGNvbnZlcnRzIGFuIEF0b20vUlNTIGZlZWQgKGluY2x1ZGluZyBHZW9SU1MgYW5kIENBUCBleHRlbnNpb25zKSB0byBHZW9KU09OXCIsXG4gICAgICAgIFwibGFiZWxcIjogXCJHZW9QbGF0Zm9ybSBHZW9KU09OIEZlZWQgU2VydmljZVwiXG4gICAgfSxcblxuICAgIC8vXG4gICAgLy9tZXRob2QgdG8gYWxsb3cgcmVmcmVzaGluZyBsaXN0IGxhdGVyXG4gICAgcmVmcmVzaDogdXBkYXRlTGlzdFxufTtcblxuZnVuY3Rpb24gdXBkYXRlTGlzdChzZXJ2aWNlIDogSXRlbVNlcnZpY2UpIHtcblxuICAgIGxldCB1cmwgPSBDb25maWcudWFsVXJsO1xuICAgIGlmKCF1cmwpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXQVJOIDogU2VydmljZVR5cGVzIC0gbm8gR2VvUGxhdGZvcm0gQVBJIFVSTCBjb25maWd1cmVkLCB1bmFibGUgdG8gbG9hZCBzZXJ2aWNlIHR5cGVzXCIpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbGV0IHF1ZXJ5ID0gUXVlcnlGYWN0b3J5KClcbiAgICAgICAgICAgIC50eXBlcygnZGN0OlN0YW5kYXJkJylcbiAgICAgICAgICAgIC5yZXNvdXJjZVR5cGVzKCdTZXJ2aWNlVHlwZScpXG4gICAgICAgICAgICAucGFnZVNpemUoNTApO1xuXG5cbiAgICAgICAgbGV0IHN2YyA9IG51bGw7XG4gICAgICAgIC8vaWYgYSBzZXJ2aWNlIHdhcyBwcm92aWRlZCB0byBiZSB1c2VkLCB1c2UgaXRcbiAgICAgICAgaWYoc2VydmljZSAmJiB0eXBlb2Yoc2VydmljZS5zZWFyY2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc3ZjID0gc2VydmljZTtcbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlLCB1c2UgZGVmYXVsdHNcbiAgICAgICAgICAgIHN2YyA9IG5ldyBJdGVtU2VydmljZSh1cmwsIG5ldyBYSFJIdHRwQ2xpZW50KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ZjLnNlYXJjaChxdWVyeSkudGhlbiggZGF0YSA9PiB7XG5cbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGRhdGEucmVzdWx0cy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBkYXRhLnJlc3VsdHNbaV0sXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdHlwZS5sYWJlbDtcblxuICAgICAgICAgICAgICAgIGlmKH5sYWJlbC5pbmRleE9mKFwiV01TLVRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gJ1dNU1QnO1xuICAgICAgICAgICAgICAgICAgICB0eXBlLnN1cHBvcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYofmxhYmVsLmluZGV4T2YoJ09HQycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleUZuKG9nY0V4cHIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZS5zdXBwb3J0ZWQgPSAnV01TJyA9PT0ga2V5IHx8ICdXTVRTJyA9PT0ga2V5O1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKH5sYWJlbC5pbmRleE9mKCdFc3JpJykpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5Rm4oZXNyaUV4cHIsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgdHlwZS5zdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSAnRVNSSV8nICsga2V5LnRvVXBwZXJDYXNlKCkgKyAnX1NFUlZFUic7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYofmxhYmVsLmluZGV4T2YoXCJGZWVkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiRkVFRFwiO1xuICAgICAgICAgICAgICAgICAgICB0eXBlLnN1cHBvcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBsYWJlbDtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHR5cGVzW2tleV0gPSB0eXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codHlwZXMpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9hZGluZyBzdXBwb3J0ZWQgc2VydmljZSB0eXBlczogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB0eXBlcztcbiJdfQ==