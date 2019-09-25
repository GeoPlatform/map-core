/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TileLayer } from 'leaflet';
import { Config } from '@geoplatform/client';
/**
 * @return {?}
 */
function OSMLayerFactory() {
    /** @type {?} */
    let opts = {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
    if (Config.leafletPane)
        opts.pane = Config.leafletPane;
    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', opts);
}
export default OSMLayerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImxheWVyL29zbS1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQU83QyxTQUFTLGVBQWU7O1FBRWhCLElBQUksR0FBUztRQUNiLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDdkIsV0FBVyxFQUFFLGdGQUFnRjtLQUNoRztJQUNELElBQUcsTUFBTSxDQUFDLFdBQVc7UUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDdEQsT0FBTyxJQUFJLFNBQVMsQ0FBQyxvREFBb0QsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllclxuICogQHJldHVyblxuICovXG5mdW5jdGlvbiBPU01MYXllckZhY3RvcnkoKSA6IFRpbGVMYXllciB7XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgbWluWm9vbTogMSwgbWF4Wm9vbTogMTksXG4gICAgICAgIGF0dHJpYnV0aW9uOiAnTWFwIGRhdGEgKGMpIDxhIGhyZWY9XCJodHRwOi8vb3BlbnN0cmVldG1hcC5vcmdcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICByZXR1cm4gbmV3IFRpbGVMYXllcignaHR0cHM6Ly97c30udGlsZS5vcGVuc3RyZWV0bWFwLm9yZy97en0ve3h9L3t5fS5wbmcnLCBvcHRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgT1NNTGF5ZXJGYWN0b3J5O1xuIl19