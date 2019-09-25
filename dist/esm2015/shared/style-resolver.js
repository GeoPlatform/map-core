/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import * as jquery from "jquery";
// const jQuery = jquery;
import { Config, XHRHttpClient, LayerService } from '@geoplatform/client';
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?} id - identifier of layer to resolve style for
 * @return {?}
 */
function featureStyleResolver(id) {
    /** @type {?} */
    let service = new LayerService(Config.ualUrl, new XHRHttpClient());
    return service.style(id).catch((/**
     * @param {?} e
     * @return {?}
     */
    (e) => {
        /** @type {?} */
        let err = new Error(`Unable to download style for layer ${id} because of an error; ${e.message}`);
        return Promise.reject(err);
    }));
    // return new Promise<any>( (resolve, reject) => {
    //
    //     if(!jQuery) {
    //         reject(new Error("Unable to load feature layer style, jQuery is not installed"));
    //     }
    //     jQuery.ajax({
    //        url: Config.ualUrl + '/api/layers/' + id + '/style',
    //        dataType: 'json',
    //        success: function(data) { resolve(data); },
    //        error: function(xhr, status, message) {
    //            let em = `FeatureStyleResolver() -
    //                Error loading style information for layer ${id} : ${message}`;
    //            reject( new Error(em) );
    //        }
    //     });
    //
    // });
}
export default featureStyleResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9zdHlsZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxPQUFPLEVBQ0gsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQ3RDLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU03QixTQUFTLG9CQUFvQixDQUFDLEVBQVc7O1FBRWpDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBRSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksYUFBYSxFQUFFLENBQUU7SUFDcEUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Ozs7SUFBRSxDQUFDLENBQU8sRUFBRSxFQUFFOztZQUNwQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsc0NBQXNDLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqRyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxFQUFDLENBQUM7SUFFSCxrREFBa0Q7SUFDbEQsRUFBRTtJQUNGLG9CQUFvQjtJQUNwQiw0RkFBNEY7SUFDNUYsUUFBUTtJQUNSLG9CQUFvQjtJQUNwQiw4REFBOEQ7SUFDOUQsMkJBQTJCO0lBQzNCLHFEQUFxRDtJQUNyRCxpREFBaUQ7SUFDakQsZ0RBQWdEO0lBQ2hELGdGQUFnRjtJQUNoRixzQ0FBc0M7SUFDdEMsV0FBVztJQUNYLFVBQVU7SUFDVixFQUFFO0lBQ0YsTUFBTTtBQUNWLENBQUM7QUFFRCxlQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBpbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuLy8gY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQge1xuICAgIENvbmZpZywgWEhSSHR0cENsaWVudCwgTGF5ZXJTZXJ2aWNlXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSAgaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkIDogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG5cbiAgICBsZXQgc2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoIENvbmZpZy51YWxVcmwsIG5ldyBYSFJIdHRwQ2xpZW50KCkgKTtcbiAgICByZXR1cm4gc2VydmljZS5zdHlsZShpZCkuY2F0Y2goIChlOkVycm9yKSA9PiB7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoYFVuYWJsZSB0byBkb3dubG9hZCBzdHlsZSBmb3IgbGF5ZXIgJHtpZH0gYmVjYXVzZSBvZiBhbiBlcnJvcjsgJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvL1xuICAgIC8vICAgICBpZighalF1ZXJ5KSB7XG4gICAgLy8gICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGxvYWQgZmVhdHVyZSBsYXllciBzdHlsZSwgalF1ZXJ5IGlzIG5vdCBpbnN0YWxsZWRcIikpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGpRdWVyeS5hamF4KHtcbiAgICAvLyAgICAgICAgdXJsOiBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBpZCArICcvc3R5bGUnLFxuICAgIC8vICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgIC8vICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7IHJlc29sdmUoZGF0YSk7IH0sXG4gICAgLy8gICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgbWVzc2FnZSkge1xuICAgIC8vICAgICAgICAgICAgbGV0IGVtID0gYEZlYXR1cmVTdHlsZVJlc29sdmVyKCkgLVxuICAgIC8vICAgICAgICAgICAgICAgIEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHttZXNzYWdlfWA7XG4gICAgLy8gICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvcihlbSkgKTtcbiAgICAvLyAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvL1xuICAgIC8vIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcbiJdfQ==