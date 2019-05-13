/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import OSM from './osm';
import { Config, LayerService, JQueryHttpClient } from 'geoplatform.client';
/** @type {?} */
const WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';
const ɵ0 = function (layerService) {
    if (!layerService) {
        layerService = new LayerService(Config.ualUrl, new JQueryHttpClient());
    }
    /** @type {?} */
    let baseLayerId = Config.defaultBaseLayerId || WORLD_STREET_LAYER;
    return layerService.get(baseLayerId)
        .catch((e) => {
        return OSM.get();
    });
}, ɵ1 = function (layer) {
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
    get: ɵ0,
    set: ɵ1
};
export default DefaultBaseLayer;
export { ɵ0, ɵ1 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVyLWRlZmF1bHQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJsYXllci9iYXNlbGF5ZXItZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDO0FBQ3hCLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRzVFLE1BQU0sa0JBQWtCLEdBQUcsa0NBQWtDLENBQUM7V0FJckQsVUFBUyxZQUEyQjtJQUNyQyxJQUFHLENBQUMsWUFBWSxFQUFFO1FBQ2QsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7S0FDMUU7O0lBQ0QsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDO0lBQ2xFLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7U0FDL0IsS0FBSyxDQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUU7UUFDbEIsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDcEIsQ0FBQyxDQUFDO0NBQ1YsT0FFSSxVQUFTLEtBQVc7O0lBQ3JCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUNkLElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDL0IsSUFBRyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVE7UUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3hELElBQUcsRUFBRSxFQUFFO1FBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ3REO0NBQ0o7O0FBcEJMLElBQUksZ0JBQWdCLEdBQUc7SUFFbkIsR0FBRyxJQVNGO0lBRUQsR0FBRyxJQU9GO0NBQ0osQ0FBQztBQUVGLGVBQWUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSAncSc7XG5pbXBvcnQgT1NNIGZyb20gJy4vb3NtJztcbmltcG9ydCB7IENvbmZpZywgTGF5ZXJTZXJ2aWNlLCBKUXVlcnlIdHRwQ2xpZW50IH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuXG5jb25zdCBXT1JMRF9TVFJFRVRfTEFZRVIgPSAnODZhOGJhYmRlMDg2Njg5ZTIxMjQ4NjY5YmE0ZWQ1NzknO1xuXG52YXIgRGVmYXVsdEJhc2VMYXllciA9IHtcblxuICAgIGdldDogZnVuY3Rpb24obGF5ZXJTZXJ2aWNlIDogTGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIGlmKCFsYXllclNlcnZpY2UpIHtcbiAgICAgICAgICAgIGxheWVyU2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IEpRdWVyeUh0dHBDbGllbnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJhc2VMYXllcklkID0gQ29uZmlnLmRlZmF1bHRCYXNlTGF5ZXJJZCB8fCBXT1JMRF9TVFJFRVRfTEFZRVI7XG4gICAgICAgIHJldHVybiBsYXllclNlcnZpY2UuZ2V0KGJhc2VMYXllcklkKVxuICAgICAgICAgICAgLmNhdGNoKCAoZSA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9TTS5nZXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzZXQ6IGZ1bmN0aW9uKGxheWVyIDogYW55KSB7XG4gICAgICAgIGxldCBpZCA9IG51bGw7XG4gICAgICAgIGlmKGxheWVyICYmIGxheWVyLmlkKSBpZCA9IGxheWVyLmlkO1xuICAgICAgICBlbHNlIGlmKGxheWVyICYmIHR5cGVvZihsYXllcikgPT09ICdzdHJpbmcnKSBpZCA9IGxheWVyO1xuICAgICAgICBpZihpZCkge1xuICAgICAgICAgICAgQ29uZmlnLmNvbmZpZ3VyZSh7J2RlZmF1bHRCYXNlTGF5ZXJJZCc6IGxheWVyLmlkfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0QmFzZUxheWVyO1xuIl19