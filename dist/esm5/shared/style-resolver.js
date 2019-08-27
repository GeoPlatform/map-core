/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    var service = new LayerService(Config.ualUrl, new XHRHttpClient());
    return service.style(id).catch(function (e) {
        /** @type {?} */
        var err = new Error("Unable to download style for layer " + id + " because of an error; " + e.message);
        return Promise.reject(err);
    });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9zdHlsZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxPQUFPLEVBQ0gsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQ3RDLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU03Qiw4QkFBOEIsRUFBVzs7SUFFckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLGFBQWEsRUFBRSxDQUFFLENBQUM7SUFDckUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBRSxVQUFDLENBQU87O1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLHdDQUFzQyxFQUFFLDhCQUF5QixDQUFDLENBQUMsT0FBUyxDQUFDLENBQUM7UUFDbEcsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJOO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbi8vIGNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBDb25maWcsIFhIUkh0dHBDbGllbnQsIExheWVyU2VydmljZVxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuLyoqXG4gKiBGZXRjaGVzIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gR2VvUGxhdGZvcm0gVUFMXG4gKiBAcGFyYW0gIGlkIC0gaWRlbnRpZmllciBvZiBsYXllciB0byByZXNvbHZlIHN0eWxlIGZvclxuICovXG5mdW5jdGlvbiBmZWF0dXJlU3R5bGVSZXNvbHZlcihpZCA6IHN0cmluZykgOiBQcm9taXNlPGFueT4ge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKCBDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpICk7XG4gICAgcmV0dXJuIHNlcnZpY2Uuc3R5bGUoaWQpLmNhdGNoKCAoZTpFcnJvcikgPT4ge1xuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKGBVbmFibGUgdG8gZG93bmxvYWQgc3R5bGUgZm9yIGxheWVyICR7aWR9IGJlY2F1c2Ugb2YgYW4gZXJyb3I7ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9KTtcblxuICAgIC8vIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy9cbiAgICAvLyAgICAgaWYoIWpRdWVyeSkge1xuICAgIC8vICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIGZlYXR1cmUgbGF5ZXIgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBqUXVlcnkuYWpheCh7XG4gICAgLy8gICAgICAgIHVybDogQ29uZmlnLnVhbFVybCArICcvYXBpL2xheWVycy8nICsgaWQgKyAnL3N0eWxlJyxcbiAgICAvLyAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAvLyAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkgeyByZXNvbHZlKGRhdGEpOyB9LFxuICAgIC8vICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAvLyAgICAgICAgICAgIGxldCBlbSA9IGBGZWF0dXJlU3R5bGVSZXNvbHZlcigpIC1cbiAgICAvLyAgICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2lkfSA6ICR7bWVzc2FnZX1gO1xuICAgIC8vICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoZW0pICk7XG4gICAgLy8gICAgICAgIH1cbiAgICAvLyAgICAgfSk7XG4gICAgLy9cbiAgICAvLyB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZVN0eWxlUmVzb2x2ZXI7XG4iXX0=