/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import OSM from './osm';
import { Config, LayerService, XHRHttpClient } from '@geoplatform/client';
/** @type {?} */
var WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';
var ɵ0 = /**
 * @param {?} layerService
 * @return {?}
 */
function (layerService) {
    if (!layerService) {
        layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
    }
    /** @type {?} */
    var baseLayerId = Config.defaultBaseLayerId || WORLD_STREET_LAYER;
    return layerService.get(baseLayerId)
        .catch((/**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return OSM.get();
    }));
}, ɵ1 = /**
 * @param {?} layer
 * @return {?}
 */
function (layer) {
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
    get: (ɵ0),
    set: (ɵ1)
};
export default DefaultBaseLayer;
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVyLWRlZmF1bHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImxheWVyL2Jhc2VsYXllci1kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBR3BFLGtCQUFrQixHQUFHLGtDQUFrQzs7Ozs7QUFJcEQsVUFBUyxZQUEyQjtJQUNyQyxJQUFHLENBQUMsWUFBWSxFQUFFO1FBQ2QsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZFOztRQUNHLFdBQVcsR0FBRyxNQUFNLENBQUMsa0JBQWtCLElBQUksa0JBQWtCO0lBQ2pFLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDL0IsS0FBSzs7OztJQUFFLFVBQUMsQ0FBUztRQUNkLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUMsRUFBQyxDQUFDO0FBQ1gsQ0FBQzs7OztBQUVJLFVBQVMsS0FBVzs7UUFDakIsRUFBRSxHQUFHLElBQUk7SUFDYixJQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsRUFBRTtRQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQy9CLElBQUcsS0FBSyxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRO1FBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUN4RCxJQUFHLEVBQUUsRUFBRTtRQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztLQUN0RDtBQUNMLENBQUM7O0lBcEJELGdCQUFnQixHQUFHO0lBRW5CLEdBQUcsTUFTRjtJQUVELEdBQUcsTUFPRjtDQUNKO0FBRUQsZUFBZSxnQkFBZ0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tICdxJztcbmltcG9ydCBPU00gZnJvbSAnLi9vc20nO1xuaW1wb3J0IHsgQ29uZmlnLCBMYXllclNlcnZpY2UsIFhIUkh0dHBDbGllbnQgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG5jb25zdCBXT1JMRF9TVFJFRVRfTEFZRVIgPSAnODZhOGJhYmRlMDg2Njg5ZTIxMjQ4NjY5YmE0ZWQ1NzknO1xuXG52YXIgRGVmYXVsdEJhc2VMYXllciA9IHtcblxuICAgIGdldDogZnVuY3Rpb24obGF5ZXJTZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIGlmKCFsYXllclNlcnZpY2UpIHtcbiAgICAgICAgICAgIGxheWVyU2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJhc2VMYXllcklkID0gQ29uZmlnLmRlZmF1bHRCYXNlTGF5ZXJJZCB8fCBXT1JMRF9TVFJFRVRfTEFZRVI7XG4gICAgICAgIHJldHVybiBsYXllclNlcnZpY2UuZ2V0KGJhc2VMYXllcklkKVxuICAgICAgICAgICAgLmNhdGNoKCAoZSA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTS5nZXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKGxheWVyIDogYW55KSB7XG4gICAgICAgIGxldCBpZCA9IG51bGw7XG4gICAgICAgIGlmKGxheWVyICYmIGxheWVyLmlkKSBpZCA9IGxheWVyLmlkO1xuICAgICAgICBlbHNlIGlmKGxheWVyICYmIHR5cGVvZihsYXllcikgPT09ICdzdHJpbmcnKSBpZCA9IGxheWVyO1xuICAgICAgICBpZihpZCkge1xuICAgICAgICAgICAgQ29uZmlnLmNvbmZpZ3VyZSh7J2RlZmF1bHRCYXNlTGF5ZXJJZCc6IGxheWVyLmlkfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0QmFzZUxheWVyO1xuIl19