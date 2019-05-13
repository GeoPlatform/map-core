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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJzaGFyZWQvc3R5bGUtcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFNNUMsOEJBQThCLEVBQVc7O0lBQ3JDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixJQUFHLENBQUMsTUFBTSxFQUFFO1FBQ1IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw2REFBNkQsQ0FBQyxDQUFDLENBQUM7UUFDMUYsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0tBQzNCO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxFQUFFLEdBQUcsUUFBUTtRQUNuRCxRQUFRLEVBQUUsTUFBTTtRQUNoQixPQUFPLEVBQUUsVUFBUyxJQUFJO1lBQ2xCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7UUFDRCxLQUFLLEVBQUUsVUFBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU87O1lBQ2hDLElBQUksRUFBRSxHQUFHOzJEQUN1QyxFQUFFLE1BQU0sT0FBTyxFQUFFLENBQUM7O1lBQ2xFLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7S0FDSCxDQUFDLENBQUM7SUFDSCxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7Q0FDM0I7QUFFRCxlQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG4vKipcbiAqIEZldGNoZXMgc3R5bGUgaW5mb3JtYXRpb24gZnJvbSBHZW9QbGF0Zm9ybSBVQUxcbiAqIEBwYXJhbSAgaWQgLSBpZGVudGlmaWVyIG9mIGxheWVyIHRvIHJlc29sdmUgc3R5bGUgZm9yXG4gKi9cbmZ1bmN0aW9uIGZlYXR1cmVTdHlsZVJlc29sdmVyKGlkIDogc3RyaW5nKSA6IFEuUHJvbWlzZTx7fT4ge1xuICAgIGxldCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBmZWF0dXJlIGxheWVyIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH1cbiAgICBqUXVlcnkuYWpheCh7XG4gICAgICAgdXJsOiBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBpZCArICcvc3R5bGUnLFxuICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgIH0sXG4gICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgIGxldCBlbSA9IGBGZWF0dXJlU3R5bGVSZXNvbHZlcigpIC1cbiAgICAgICAgICAgICAgIEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7aWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihlbSk7XG4gICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XG4gICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcbiJdfQ==