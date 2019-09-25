/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ItemService, XHRHttpClient, QueryFactory, Config } from '@geoplatform/client';
/** @type {?} */
const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
/** @type {?} */
const esriExpr = /Esri REST ([A-Za-z]+) Service/;
/** @type {?} */
const keyFn = (/**
 * @param {?} expr
 * @param {?} str
 * @return {?}
 */
(expr, str) => {
    /** @type {?} */
    let m = expr.exec(str);
    return (m && m.length) ? m[1] : null;
});
const ɵ0 = keyFn;
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
    let url = Config.ualUrl;
    if (!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
    }
    else {
        /** @type {?} */
        let query = QueryFactory()
            .types('dct:Standard')
            .resourceTypes('ServiceType')
            .pageSize(50);
        /** @type {?} */
        let svc = null;
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
        data => {
            for (let i = 0; i < data.results.length; ++i) {
                /** @type {?} */
                let type = data.results[i];
                /** @type {?} */
                let key = null;
                /** @type {?} */
                let label = type.label;
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
        error => {
            console.log("Error loading supported service types: " + error.message);
        }));
    }
}
export default types;
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2UvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFDSCxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ25ELE1BQU0scUJBQXFCLENBQUM7O01BSXZCLE9BQU8sR0FBRyxxQkFBcUI7O01BQy9CLFFBQVEsR0FBRywrQkFBK0I7O01BQzFDLEtBQUs7Ozs7O0FBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7O1FBQ3BCLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDekMsQ0FBQyxDQUFBOzs7SUFFRyxLQUFLLEdBQUc7SUFFUixtQkFBbUIsRUFBRTtRQUNqQixJQUFJLEVBQUMsa0NBQWtDO1FBQ3ZDLEtBQUssRUFBQyxtREFBbUQ7UUFDekQsTUFBTSxFQUFDLGNBQWM7UUFDckIsYUFBYSxFQUFDLHFDQUFxQztRQUNuRCxPQUFPLEVBQUMsMkJBQTJCO0tBQ3RDO0lBRUQsaUJBQWlCLEVBQUU7UUFDZixJQUFJLEVBQUMsa0NBQWtDO1FBQ3ZDLEtBQUssRUFBQyxpREFBaUQ7UUFDdkQsTUFBTSxFQUFDLGNBQWM7UUFDckIsYUFBYSxFQUFDLG1DQUFtQztRQUNqRCxPQUFPLEVBQUMseUJBQXlCO0tBQ3BDO0lBRUQsZUFBZSxFQUFFO1FBQ2IsSUFBSSxFQUFDLGtDQUFrQztRQUN2QyxLQUFLLEVBQUMsK0NBQStDO1FBQ3JELE1BQU0sRUFBQyxjQUFjO1FBQ3JCLGFBQWEsRUFBQyxpQ0FBaUM7UUFDL0MsT0FBTyxFQUFDLHVCQUF1QjtLQUNsQztJQUVELGdC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OztRQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0UsQ0FBQyxFQUFDLENBQUM7S0FDTjtBQUNMLENBQUM7QUFFRCxlQUFlLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBJdGVtU2VydmljZSwgWEhSSHR0cENsaWVudCwgUXVlcnlGYWN0b3J5LCBDb25maWdcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuXG5jb25zdCBvZ2NFeHByID0gL09HQy4rXFwoKFtBLVpcXC1dKylcXCkvO1xuY29uc3QgZXNyaUV4cHIgPSAvRXNyaSBSRVNUIChbQS1aYS16XSspIFNlcnZpY2UvO1xuY29uc3Qga2V5Rm4gPSAoZXhwciwgc3RyKSA9PiB7XG4gICAgbGV0IG0gPSBleHByLmV4ZWMoc3RyKTtcbiAgICByZXR1cm4gKG0gJiYgbS5sZW5ndGgpID8gbVsxXSA6IG51bGw7XG59O1xuXG52YXIgdHlwZXMgPSB7XG5cbiAgICBFU1JJX0ZFQVRVUkVfU0VSVkVSOiB7XG4gICAgICAgIFwiaWRcIjpcIjQ4OTgwYzViYWQwYzhkNDY2NmIzOTM4NzRlYjUyNzlhXCIsXG4gICAgICAgIFwidXJpXCI6XCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktZmVhdHVyZS1yZXN0XCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVzcmkgQXJjR0lTIEZlYXR1cmUgU2VydmVyIFJFU1QgQVBJXCIsXG4gICAgICAgIFwibGFiZWxcIjpcIkVzcmkgUkVTVCBGZWF0dXJlIFNlcnZpY2VcIlxuICAgIH0sXG5cbiAgICBFU1JJX0lNQUdFX1NFUlZFUjoge1xuICAgICAgICBcImlkXCI6XCJiY2RmNzY0ZTUyMDY0Yzg0MzIzZjNmMWJhZWE3ZTI0NVwiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9lc3JpLWltYWdlLXJlc3RcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiRXNyaSBBcmNHSVMgSW1hZ2UgU2VydmVyIFJFU1QgQVBJXCIsXG4gICAgICAgIFwibGFiZWxcIjpcIkVzcmkgUkVTVCBJbWFnZSBTZXJ2aWNlXCJcbiAgICB9LFxuXG4gICAgRVNSSV9NQVBfU0VSVkVSOiB7XG4gICAgICAgIFwiaWRcIjpcIjM3MGNmNmNhNWQ5MWMwN2I2MzMyOWI4Mzg0ZmU3NmM3XCIsXG4gICAgICAgIFwidXJpXCI6XCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL2VzcmktbWFwLXJlc3RcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiRXNyaSBBcmNHSVMgTWFwIFNlcnZlciBSRVNUIEFQSVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJFc3JpIFJFU1QgTWFwIFNlcnZpY2VcIlxuICAgIH0sXG5cbiAgICBFU1JJX1RJTEVfU0VSVkVSOiB7XG4gICAgICAgIFwiaWRcIjogXCJjNzU1NzBmZjI1MjNiMWExNjMxYWZlN2RkYWMyN2JlYlwiLFxuICAgICAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L3NwZWMvZXNyaS10aWxlLXJlc3RcIixcbiAgICAgICAgXCJ0eXBlXCI6IFwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJFc3JpIEFyY0dJUyBUaWxlIFNlcnZlciBSRVNUIEFQSVwiLFxuICAgICAgICBcImxhYmVsXCI6IFwiRXNyaSBSRVNUIFRpbGUgU2VydmljZVwiXG4gICAgfSxcblxuICAgIEtNTDoge1xuICAgICAgICBcImlkXCI6XCJjMGIzOWNhMjA0OWJhMjE4NDQ3MmZmMjc0MDhmZmQ3ZVwiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL29wZW5naXMubmV0L3NwZWMva21sXCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk9HQyBLZXlob2xlIE1hcmt1cCBMYW5ndWFnZSAoS01MKVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJPR0MgS2V5aG9sZSBNYXJrdXAgTGFuZ3VhZ2UgKEtNTClcIlxuICAgIH0sXG5cbiAgICBDU1c6IHtcbiAgICAgICAgXCJpZFwiOlwiNjBkZTZhNDIyNDc1NDkzYjc5MDFhZTQ1M2Q2ZjQ1NjJcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL2Nzd1wiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJPR0MgV2ViIENhdGFsb2cgU2VydmljZSAoQ1NXKVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJPR0MgV2ViIENhdGFsb2cgU2VydmljZSAoQ1NXKVwiXG4gICAgfSxcblxuICAgIFdDUzoge1xuICAgICAgICBcImlkXCI6XCJhN2U1YTJkODFhODNkNGVhZTliZjkxMzhmMjRkMGEzMlwiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL29wZW5naXMubmV0L3NwZWMvd2NzXCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk9HQyBXZWIgQ292ZXJhZ2UgU2VydmljZSAoV0NTKVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJPR0MgV2ViIENvdmVyYWdlIFNlcnZpY2UgKFdDUylcIlxuICAgIH0sXG5cbiAgICBXRlM6IHtcbiAgICAgICAgXCJpZFwiOlwiZTcwZTQzZWQ1MmY4MzYzNDI4NWEwOWU5NTk3MzRiZmZcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL3dmc1wiLFxuICAgICAgICBcInR5cGVcIjpcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJPR0MgV2ViIEZlYXR1cmUgU2VydmljZSAoV0ZTKVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJPR0MgV2ViIEZlYXR1cmUgU2VydmljZSAoV0ZTKVwiXG4gICAgfSxcblxuICAgIFdNUzoge1xuICAgICAgICBcImlkXCI6XCJhYmVkNWEwMGM1MzZmYjJkNzAxOTA5MmMzN2VkNjM0Y1wiLFxuICAgICAgICBcInVyaVwiOlwiaHR0cDovL29wZW5naXMubmV0L3NwZWMvd21zXCIsXG4gICAgICAgIFwidHlwZVwiOlwiZGN0OlN0YW5kYXJkXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk9HQyBXZWIgTWFwIFNlcnZpY2UgKFdNUylcIixcbiAgICAgICAgXCJsYWJlbFwiOlwiT0dDIFdlYiBNYXAgU2VydmljZSAoV01TKVwiXG4gICAgfSxcblxuICAgIFdNVFM6IHtcbiAgICAgICAgXCJpZFwiOlwiNzU3ODU4YWU3N2NmOGM2MDJiMzkyOTRjMjc2MzJkZDdcIixcbiAgICAgICAgXCJ1cmlcIjpcImh0dHA6Ly9vcGVuZ2lzLm5ldC9zcGVjL3dtdHNcIixcbiAgICAgICAgXCJ0eXBlXCI6XCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiT0dDIFdlYiBNYXAgVGlsZSBTZXJ2aWNlIChXTVRTKVwiLFxuICAgICAgICBcImxhYmVsXCI6XCJPR0MgV2ViIE1hcCBUaWxlIFNlcnZpY2UgKFdNVFMpXCJcbiAgICB9LFxuXG4gICAgV01TVDoge1xuICAgICAgICBcImlkXCI6IFwiZmFhZTViZmY0OWIxMTQ0ZDUwMDM4MGNiYzA1NWMxZTVcIixcbiAgICAgICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9zcGVjL29nYy13bXMtdFwiLFxuICAgICAgICBcInR5cGVcIjogXCJkY3Q6U3RhbmRhcmRcIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIk9HQyBXTVMgc3VwcG9ydCBmb3IgdGVtcG9yYWwgYWNjb3JkaW5nIHRvIE9HQyBCZXN0IFByYWN0aWNlIGd1aWRhbmNlXCIsXG4gICAgICAgIFwibGFiZWxcIjogXCJPR0MgV01TLVQgU2VydmljZVwiXG4gICAgfSxcblxuICAgIEZFRUQ6IHtcbiAgICAgICAgXCJpZFwiOiBcIjhlZGM2MTg3MGU1MzRhMWYyM2RjOTY3NzUzZGEzYjcyXCIsXG4gICAgICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvc3BlYy9mZWVkXCIsXG4gICAgICAgIFwidHlwZVwiOiBcImRjdDpTdGFuZGFyZFwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiR2VvUGxhdGZvcm0gR2VvSlNPTiBGZWVkIFNlcnZpY2UgY29udmVydHMgYW4gQXRvbS9SU1MgZmVlZCAoaW5jbHVkaW5nIEdlb1JTUyBhbmQgQ0FQIGV4dGVuc2lvbnMpIHRvIEdlb0pTT05cIixcbiAgICAgICAgXCJsYWJlbFwiOiBcIkdlb1BsYXRmb3JtIEdlb0pTT04gRmVlZCBTZXJ2aWNlXCJcbiAgICB9LFxuXG4gICAgLy9cbiAgICAvL21ldGhvZCB0byBhbGxvdyByZWZyZXNoaW5nIGxpc3QgbGF0ZXJcbiAgICByZWZyZXNoOiB1cGRhdGVMaXN0XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVMaXN0KHNlcnZpY2UgOiBJdGVtU2VydmljZSkge1xuXG4gICAgbGV0IHVybCA9IENvbmZpZy51YWxVcmw7XG4gICAgaWYoIXVybCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldBUk4gOiBTZXJ2aWNlVHlwZXMgLSBubyBHZW9QbGF0Zm9ybSBBUEkgVVJMIGNvbmZpZ3VyZWQsIHVuYWJsZSB0byBsb2FkIHNlcnZpY2UgdHlwZXNcIik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBsZXQgcXVlcnkgPSBRdWVyeUZhY3RvcnkoKVxuICAgICAgICAgICAgLnR5cGVzKCdkY3Q6U3RhbmRhcmQnKVxuICAgICAgICAgICAgLnJlc291cmNlVHlwZXMoJ1NlcnZpY2VUeXBlJylcbiAgICAgICAgICAgIC5wYWdlU2l6ZSg1MCk7XG5cblxuICAgICAgICBsZXQgc3ZjID0gbnVsbDtcbiAgICAgICAgLy9pZiBhIHNlcnZpY2Ugd2FzIHByb3ZpZGVkIHRvIGJlIHVzZWQsIHVzZSBpdFxuICAgICAgICBpZihzZXJ2aWNlICYmIHR5cGVvZihzZXJ2aWNlLnNlYXJjaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBzdmMgPSBzZXJ2aWNlO1xuICAgICAgICB9IGVsc2UgeyAvLyBvdGhlcndpc2UsIHVzZSBkZWZhdWx0c1xuICAgICAgICAgICAgc3ZjID0gbmV3IEl0ZW1TZXJ2aWNlKHVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdmMuc2VhcmNoKHF1ZXJ5KS50aGVuKCBkYXRhID0+IHtcblxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8ZGF0YS5yZXN1bHRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGRhdGEucmVzdWx0c1tpXSxcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0eXBlLmxhYmVsO1xuXG4gICAgICAgICAgICAgICAgaWYofmxhYmVsLmluZGV4T2YoXCJXTVMtVFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSAnV01TVCc7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUuc3VwcG9ydGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih+bGFiZWwuaW5kZXhPZignT0dDJykpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5Rm4ob2djRXhwciwgbGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlLnN1cHBvcnRlZCA9ICdXTVMnID09PSBrZXkgfHwgJ1dNVFMnID09PSBrZXk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYofmxhYmVsLmluZGV4T2YoJ0VzcmknKSkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlGbihlc3JpRXhwciwgbGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICB0eXBlLnN1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9ICdFU1JJXycgKyBrZXkudG9VcHBlckNhc2UoKSArICdfU0VSVkVSJztcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih+bGFiZWwuaW5kZXhPZihcIkZlZWRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJGRUVEXCI7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUuc3VwcG9ydGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGxhYmVsO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdHlwZXNba2V5XSA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlcyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBsb2FkaW5nIHN1cHBvcnRlZCBzZXJ2aWNlIHR5cGVzOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVzO1xuIl19