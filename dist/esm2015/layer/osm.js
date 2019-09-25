/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { LayerResourceTypes } from "../shared/resource-types";
import { QueryFactory, LayerService, XHRHttpClient, Config } from '@geoplatform/client';
/**
 * @param layerService - optional, LayerService to use to fetch the layer
 * @return Promise resolving OpenStreet Map GeoPlatform Layer
 */
export default {
    /**
     * @param layer - GeoPlatform Layer object
     * @return boolean, true if is an OSM layer
     */
    test: (/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        return layer &&
            layer.resourceTypes &&
            layer.resourceTypes.length &&
            ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM);
    }),
    get: (/**
     * @param {?=} layerService
     * @return {?}
     */
    function (layerService) {
        /** @type {?} */
        let query = QueryFactory()
            .fields('*')
            .resourceTypes(LayerResourceTypes.OSM);
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
            .then((/**
         * @param {?} response
         * @return {?}
         */
        response => response.results.length ? response.results[0] : null));
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9vc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFDSCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQ3BELE1BQU8scUJBQXFCLENBQUM7Ozs7O0FBTzlCLGVBQWU7Ozs7O0lBTVgsSUFBSTs7OztJQUFHLFVBQVMsS0FBSztRQUNqQixPQUFRLEtBQUs7WUFDTCxLQUFLLENBQUMsYUFBYTtZQUNuQixLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDMUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUE7SUFFRCxHQUFHOzs7O0lBQUcsVUFBUyxZQUE0Qjs7WUFDbkMsS0FBSyxHQUFHLFlBQVksRUFBRTthQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztRQUMxQyxJQUFHLENBQUMsWUFBWTtZQUNaLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUk7Ozs7UUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQztJQUM3RSxDQUFDLENBQUE7Q0FFSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBMYXllclJlc291cmNlVHlwZXMgfSBmcm9tIFwiLi4vc2hhcmVkL3Jlc291cmNlLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIFF1ZXJ5RmFjdG9yeSwgTGF5ZXJTZXJ2aWNlLCBYSFJIdHRwQ2xpZW50LCBDb25maWdcbn0gIGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyU2VydmljZSAtIG9wdGlvbmFsLCBMYXllclNlcnZpY2UgdG8gdXNlIHRvIGZldGNoIHRoZSBsYXllclxuICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBPcGVuU3RyZWV0IE1hcCBHZW9QbGF0Zm9ybSBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiBib29sZWFuLCB0cnVlIGlmIGlzIGFuIE9TTSBsYXllclxuICAgICAqL1xuICAgIHRlc3QgOiBmdW5jdGlvbihsYXllcikge1xuICAgICAgICByZXR1cm4gIGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuT1NNKTtcbiAgICB9LFxuXG4gICAgZ2V0IDogZnVuY3Rpb24obGF5ZXJTZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuICAgICAgICBsZXQgcXVlcnkgPSBRdWVyeUZhY3RvcnkoKVxuICAgICAgICAgICAgLmZpZWxkcygnKicpXG4gICAgICAgICAgICAucmVzb3VyY2VUeXBlcyhMYXllclJlc291cmNlVHlwZXMuT1NNKTtcbiAgICAgICAgaWYoIWxheWVyU2VydmljZSlcbiAgICAgICAgICAgIGxheWVyU2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIHJldHVybiBsYXllclNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UucmVzdWx0cy5sZW5ndGggPyByZXNwb25zZS5yZXN1bHRzWzBdIDogbnVsbCk7XG4gICAgfVxuXG59O1xuIl19