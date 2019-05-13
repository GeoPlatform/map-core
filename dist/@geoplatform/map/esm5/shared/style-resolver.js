/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as Q from "q";
import { Config } from 'geoplatform.client';
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?} id - identifier of layer to resolve style for
 * @return {?}
 */
function featureStyleResolver(id) {
    /** @type {?} */
    var deferred = Q.defer();
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
            var em = "FeatureStyleResolver() -\n               Error loading style information for layer " + id + " : " + message;
            /** @type {?} */
            var error = new Error(em);
            deferred.reject(error);
        }
    });
    return deferred.promise;
}
export default featureStyleResolver;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsic2hhcmVkL3N0eWxlLXJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFDakMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBRXRCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBTTVDLDhCQUE4QixFQUFXOztJQUNyQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsSUFBRyxDQUFDLE1BQU0sRUFBRTtRQUNSLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNkRBQTZELENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztLQUMzQjtJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsRUFBRSxHQUFHLFFBQVE7UUFDbkQsUUFBUSxFQUFFLE1BQU07UUFDaEIsT0FBTyxFQUFFLFVBQVMsSUFBSTtZQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsS0FBSyxFQUFFLFVBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPOztZQUNoQyxJQUFJLEVBQUUsR0FBRyx3RkFDdUMsRUFBRSxXQUFNLE9BQVMsQ0FBQzs7WUFDbEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtLQUNILENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztDQUMzQjtBQUVELGVBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtICBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQgOiBzdHJpbmcpIDogUS5Qcm9taXNlPHt9PiB7XG4gICAgbGV0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGlmKCFqUXVlcnkpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIGZlYXR1cmUgbGF5ZXIgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICB1cmw6IENvbmZpZy51YWxVcmwgKyAnL2FwaS9sYXllcnMvJyArIGlkICsgJy9zdHlsZScsXG4gICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgfSxcbiAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgbGV0IGVtID0gYEZlYXR1cmVTdHlsZVJlc29sdmVyKCkgLVxuICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKGVtKTtcbiAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuIl19