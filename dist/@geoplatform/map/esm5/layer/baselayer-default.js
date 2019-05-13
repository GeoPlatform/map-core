/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import OSM from './osm';
import { Config, LayerService, JQueryHttpClient } from 'geoplatform.client';
/** @type {?} */
var WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';
var ɵ0 = function (layerService) {
    if (!layerService) {
        layerService = new LayerService(Config.ualUrl, new JQueryHttpClient());
    }
    /** @type {?} */
    var baseLayerId = Config.defaultBaseLayerId || WORLD_STREET_LAYER;
    return layerService.get(baseLayerId)
        .catch(function (e) {
        return OSM.get();
    });
}, ɵ1 = function (layer) {
    /** @type {?} */
    var id = null;
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
    get: ɵ0,
    set: ɵ1
};
export default DefaultBaseLayer;
export { ɵ0, ɵ1 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVyLWRlZmF1bHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsibGF5ZXIvYmFzZWxheWVyLWRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQztBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUc1RSxJQUFNLGtCQUFrQixHQUFHLGtDQUFrQyxDQUFDO1NBSXJELFVBQVMsWUFBMkI7SUFDckMsSUFBRyxDQUFDLFlBQVksRUFBRTtRQUNkLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0tBQzFFOztJQUNELElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQztJQUNsRSxPQUFPLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQy9CLEtBQUssQ0FBRSxVQUFDLENBQVM7UUFDZCxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNwQixDQUFDLENBQUM7Q0FDVixPQUVJLFVBQVMsS0FBVzs7SUFDckIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2QsSUFBRyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUU7UUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztTQUMvQixJQUFHLEtBQUssSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUTtRQUFFLEVBQUUsR0FBRyxLQUFLLENBQUM7SUFDeEQsSUFBRyxFQUFFLEVBQUU7UUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7S0FDdEQ7Q0FDSjs7QUFwQkwsSUFBSSxnQkFBZ0IsR0FBRztJQUVuQixHQUFHLElBU0Y7SUFFRCxHQUFHLElBT0Y7Q0FDSixDQUFDO0FBRUYsZUFBZSxnQkFBZ0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBPU00gZnJvbSAnLi9vc20nO1xuaW1wb3J0IHsgQ29uZmlnLCBMYXllclNlcnZpY2UsIEpRdWVyeUh0dHBDbGllbnQgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cbmNvbnN0IFdPUkxEX1NUUkVFVF9MQVlFUiA9ICc4NmE4YmFiZGUwODY2ODllMjEyNDg2NjliYTRlZDU3OSc7XG5cbnZhciBEZWZhdWx0QmFzZUxheWVyID0ge1xuXG4gICAgZ2V0OiBmdW5jdGlvbihsYXllclNlcnZpY2UgOiBMYXllclNlcnZpY2UpIHtcbiAgICAgICAgaWYoIWxheWVyU2VydmljZSkge1xuICAgICAgICAgICAgbGF5ZXJTZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgSlF1ZXJ5SHR0cENsaWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYmFzZUxheWVySWQgPSBDb25maWcuZGVmYXVsdEJhc2VMYXllcklkIHx8IFdPUkxEX1NUUkVFVF9MQVlFUjtcbiAgICAgICAgcmV0dXJuIGxheWVyU2VydmljZS5nZXQoYmFzZUxheWVySWQpXG4gICAgICAgICAgICAuY2F0Y2goIChlIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1NNLmdldCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNldDogZnVuY3Rpb24obGF5ZXIgOiBhbnkpIHtcbiAgICAgICAgbGV0IGlkID0gbnVsbDtcbiAgICAgICAgaWYobGF5ZXIgJiYgbGF5ZXIuaWQpIGlkID0gbGF5ZXIuaWQ7XG4gICAgICAgIGVsc2UgaWYobGF5ZXIgJiYgdHlwZW9mKGxheWVyKSA9PT0gJ3N0cmluZycpIGlkID0gbGF5ZXI7XG4gICAgICAgIGlmKGlkKSB7XG4gICAgICAgICAgICBDb25maWcuY29uZmlndXJlKHsnZGVmYXVsdEJhc2VMYXllcklkJzogbGF5ZXIuaWR9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IERlZmF1bHRCYXNlTGF5ZXI7XG4iXX0=