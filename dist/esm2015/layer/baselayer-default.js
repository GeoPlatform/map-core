/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OSM from './osm';
import { Config, LayerService, XHRHttpClient } from '@geoplatform/client';
/** @type {?} */
const WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';
const ɵ0 = /**
 * @param {?} layerService
 * @return {?}
 */
function (layerService) {
    if (!layerService) {
        layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
    }
    /** @type {?} */
    let baseLayerId = Config.defaultBaseLayerId || WORLD_STREET_LAYER;
    return layerService.get(baseLayerId)
        .catch((/**
     * @param {?} e
     * @return {?}
     */
    (e) => {
        return OSM.get();
    }));
}, ɵ1 = /**
 * @param {?} layer
 * @return {?}
 */
function (layer) {
    /** @type {?} */
    let id = null;
    if (layer && layer.id)
        id = layer.id;
    else if (layer && typeof (layer) === 'string')
        id = layer;
    if (id) {
        Config.configure({ 'defaultBaseLayerId': layer.id });
    }
};
/** @type {?} */
var DefaultBaseLayer = {
    get: (ɵ0),
    set: (ɵ1)
};
export default DefaultBaseLayer;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVyLWRlZmF1bHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImxheWVyL2Jhc2VsYXllci1kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O01BR3BFLGtCQUFrQixHQUFHLGtDQUFrQzs7Ozs7QUFJcEQsVUFBUyxZQUEyQjtJQUNyQyxJQUFHLENBQUMsWUFBWSxFQUFFO1FBQ2QsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZFOztRQUNHLFdBQVcsR0FBRyxNQUFNLENBQUMsa0JBQWtCLElBQUksa0JBQWtCO0lBQ2pFLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDL0IsS0FBSzs7OztJQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQyxFQUFDLENBQUM7QUFDWCxDQUFDOzs7O0FBRUksVUFBUyxLQUFXOztRQUNqQixFQUFFLEdBQUcsSUFBSTtJQUNiLElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDL0IsSUFBRyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVE7UUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3hELElBQUcsRUFBRSxFQUFFO1FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ3REO0FBQ0wsQ0FBQzs7SUFwQkQsZ0JBQWdCLEdBQUc7SUFFbkIsR0FBRyxNQVNGO0lBRUQsR0FBRyxNQU9GO0NBQ0o7QUFFRCxlQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gJ3EnO1xuaW1wb3J0IE9TTSBmcm9tICcuL29zbSc7XG5pbXBvcnQgeyBDb25maWcsIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbmNvbnN0IFdPUkxEX1NUUkVFVF9MQVlFUiA9ICc4NmE4YmFiZGUwODY2ODllMjEyNDg2NjliYTRlZDU3OSc7XG5cbnZhciBEZWZhdWx0QmFzZUxheWVyID0ge1xuXG4gICAgZ2V0OiBmdW5jdGlvbihsYXllclNlcnZpY2UgOiBMYXllclNlcnZpY2UpIHtcbiAgICAgICAgaWYoIWxheWVyU2VydmljZSkge1xuICAgICAgICAgICAgbGF5ZXJTZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYmFzZUxheWVySWQgPSBDb25maWcuZGVmYXVsdEJhc2VMYXllcklkIHx8IFdPUkxEX1NUUkVFVF9MQVlFUjtcbiAgICAgICAgcmV0dXJuIGxheWVyU2VydmljZS5nZXQoYmFzZUxheWVySWQpXG4gICAgICAgICAgICAuY2F0Y2goIChlIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNLmdldCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24obGF5ZXIgOiBhbnkpIHtcbiAgICAgICAgbGV0IGlkID0gbnVsbDtcbiAgICAgICAgaWYobGF5ZXIgJiYgbGF5ZXIuaWQpIGlkID0gbGF5ZXIuaWQ7XG4gICAgICAgIGVsc2UgaWYobGF5ZXIgJiYgdHlwZW9mKGxheWVyKSA9PT0gJ3N0cmluZycpIGlkID0gbGF5ZXI7XG4gICAgICAgIGlmKGlkKSB7XG4gICAgICAgICAgICBDb25maWcuY29uZmlndXJlKHsnZGVmYXVsdEJhc2VMYXllcklkJzogbGF5ZXIuaWR9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRCYXNlTGF5ZXI7XG4iXX0=