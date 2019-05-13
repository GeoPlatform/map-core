/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import * as Q from "q";
import { Config } from 'geoplatform.client';
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?} id - identifier of layer to resolve style for
 * @return {?}
 */
function featureStyleResolver(id) {
    /** @type {?} */
    let deferred = Q.defer();
    if (!jQuery) {
        deferred.reject(new Error("Unable to load feature layer style, jQuery is not installed"));
        return deferred.promise;
    }
    jQuery.ajax({
        url: Config.ualUrl + '/api/layers/' + id + '/style',
        dataType: 'json',
        success: function (data) {
            deferred.resolve(data);
        },
        error: function (xhr, status, message) {
            /** @type {?} */
            let em = `FeatureStyleResolver() -
               Error loading style information for layer ${id} : ${message}`;
            /** @type {?} */
            let error = new Error(em);
            deferred.reject(error);
        }
    });
    return deferred.promise;
}
export default featureStyleResolver;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsic2hhcmVkL3N0eWxlLXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBTTVDLDhCQUE4QixFQUFXOztJQUNyQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsSUFBRyxDQUFDLE1BQU0sRUFBRTtRQUNSLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztLQUMzQjtJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsRUFBRSxHQUFHLFFBQVE7UUFDbkQsUUFBUSxFQUFFLE1BQU07UUFDaEIsT0FBTyxFQUFFLFVBQVMsSUFBSTtZQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsS0FBSyxFQUFFLFVBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPOztZQUNoQyxJQUFJLEVBQUUsR0FBRzsyREFDdUMsRUFBRSxNQUFNLE9BQU8sRUFBRSxDQUFDOztZQUNsRSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0tBQ0gsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0NBQzNCO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCA6IHN0cmluZykgOiBRLlByb21pc2U8e30+IHtcbiAgICBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgaWYoIWpRdWVyeSkge1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGxvYWQgZmVhdHVyZSBsYXllciBzdHlsZSwgalF1ZXJ5IGlzIG5vdCBpbnN0YWxsZWRcIikpO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG4gICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgIHVybDogQ29uZmlnLnVhbFVybCArICcvYXBpL2xheWVycy8nICsgaWQgKyAnL3N0eWxlJyxcbiAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICB9LFxuICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgbWVzc2FnZSkge1xuICAgICAgICAgICBsZXQgZW0gPSBgRmVhdHVyZVN0eWxlUmVzb2x2ZXIoKSAtXG4gICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7bWVzc2FnZX1gO1xuICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoZW0pO1xuICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZVN0eWxlUmVzb2x2ZXI7XG4iXX0=