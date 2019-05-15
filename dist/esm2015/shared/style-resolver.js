/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import * as Q from "q";
import { Config } from '@geoplatform/client';
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
        url: Config["ualUrl"] + '/api/layers/' + id + '/style',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9zdHlsZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV0QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU03Qyw4QkFBOEIsRUFBVzs7SUFDckMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLElBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDUixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUMsQ0FBQztRQUMxRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7S0FDM0I7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1QsR0FBRyxFQUFFLE1BQU0sYUFBVSxjQUFjLEdBQUcsRUFBRSxHQUFHLFFBQVE7UUFDbkQsUUFBUSxFQUFFLE1BQU07UUFDaEIsT0FBTyxFQUFFLFVBQVMsSUFBSTtZQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsS0FBSyxFQUFFLFVBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPOztZQUNoQyxJQUFJLEVBQUUsR0FBRzsyREFDdUMsRUFBRSxNQUFNLE9BQU8sRUFBRSxDQUFDOztZQUNsRSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO0tBQ0gsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0NBQzNCO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtICBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQgOiBzdHJpbmcpIDogUS5Qcm9taXNlPHt9PiB7XG4gICAgbGV0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgIGlmKCFqUXVlcnkpIHtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIGZlYXR1cmUgbGF5ZXIgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgfVxuICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICB1cmw6IENvbmZpZy51YWxVcmwgKyAnL2FwaS9sYXllcnMvJyArIGlkICsgJy9zdHlsZScsXG4gICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgfSxcbiAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgbGV0IGVtID0gYEZlYXR1cmVTdHlsZVJlc29sdmVyKCkgLVxuICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKGVtKTtcbiAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuIl19