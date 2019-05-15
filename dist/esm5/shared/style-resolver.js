/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as Q from "q";
import { Config } from '@geoplatform/client';
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
        url: Config["ualUrl"] + '/api/layers/' + id + '/style',
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9zdHlsZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV0QixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU03Qyw4QkFBOEIsRUFBVzs7SUFDckMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLElBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDUixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUMsQ0FBQztRQUMxRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7S0FDM0I7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ1QsR0FBRyxFQUFFLE1BQU0sYUFBVSxjQUFjLEdBQUcsRUFBRSxHQUFHLFFBQVE7UUFDbkQsUUFBUSxFQUFFLE1BQU07UUFDaEIsT0FBTyxFQUFFLFVBQVMsSUFBSTtZQUNsQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsS0FBSyxFQUFFLFVBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPOztZQUNoQyxJQUFJLEVBQUUsR0FBRyx3RkFDdUMsRUFBRSxXQUFNLE9BQVMsQ0FBQzs7WUFDbEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtLQUNILENBQUMsQ0FBQztJQUNILE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztDQUMzQjtBQUVELGVBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSAgaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkIDogc3RyaW5nKSA6IFEuUHJvbWlzZTx7fT4ge1xuICAgIGxldCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBmZWF0dXJlIGxheWVyIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgdXJsOiBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBpZCArICcvc3R5bGUnLFxuICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgIH0sXG4gICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgIGxldCBlbSA9IGBGZWF0dXJlU3R5bGVSZXNvbHZlcigpIC1cbiAgICAgICAgICAgICAgIEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihlbSk7XG4gICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XG4gICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcbiJdfQ==