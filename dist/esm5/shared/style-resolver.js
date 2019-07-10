/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { Config } from '@geoplatform/client';
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?} id - identifier of layer to resolve style for
 * @return {?}
 */
function featureStyleResolver(id) {
    return new Promise(function (resolve, reject) {
        if (!jQuery) {
            reject(new Error("Unable to load feature layer style, jQuery is not installed"));
        }
        jQuery.ajax({
            url: Config["ualUrl"] + '/api/layers/' + id + '/style',
            dataType: 'json',
            success: function (data) { resolve(data); },
            error: function (xhr, status, message) {
                /** @type {?} */
                var em = "FeatureStyleResolver() -\n                   Error loading style information for layer " + id + " : " + message;
                reject(new Error(em));
            }
        });
    });
}
export default featureStyleResolver;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9zdHlsZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUd0QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU03Qyw4QkFBOEIsRUFBVztJQUVyQyxPQUFPLElBQUksT0FBTyxDQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07UUFFcEMsSUFBRyxDQUFDLE1BQU0sRUFBRTtZQUNSLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDLENBQUM7U0FDcEY7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1QsR0FBRyxFQUFFLE1BQU0sYUFBVSxjQUFjLEdBQUcsRUFBRSxHQUFHLFFBQVE7WUFDbkQsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLFVBQVMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzFDLEtBQUssRUFBRSxVQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTzs7Z0JBQ2hDLElBQUksRUFBRSxHQUFHLDRGQUN1QyxFQUFFLFdBQU0sT0FBUyxDQUFDO2dCQUNsRSxNQUFNLENBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQzthQUMzQjtTQUNILENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQztDQUNOO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbi8qKlxuICogRmV0Y2hlcyBzdHlsZSBpbmZvcm1hdGlvbiBmcm9tIEdlb1BsYXRmb3JtIFVBTFxuICogQHBhcmFtICBpZCAtIGlkZW50aWZpZXIgb2YgbGF5ZXIgdG8gcmVzb2x2ZSBzdHlsZSBmb3JcbiAqL1xuZnVuY3Rpb24gZmVhdHVyZVN0eWxlUmVzb2x2ZXIoaWQgOiBzdHJpbmcpIDogUHJvbWlzZTx7fT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHt9PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgIGlmKCFqUXVlcnkpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBmZWF0dXJlIGxheWVyIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgalF1ZXJ5LmFqYXgoe1xuICAgICAgICAgICB1cmw6IENvbmZpZy51YWxVcmwgKyAnL2FwaS9sYXllcnMvJyArIGlkICsgJy9zdHlsZScsXG4gICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHsgcmVzb2x2ZShkYXRhKTsgfSxcbiAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICBsZXQgZW0gPSBgRmVhdHVyZVN0eWxlUmVzb2x2ZXIoKSAtXG4gICAgICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtpZH0gOiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgIHJlamVjdCggbmV3IEVycm9yKGVtKSApO1xuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuIl19