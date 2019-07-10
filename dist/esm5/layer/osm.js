/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { LayerResourceTypes } from "../shared/resource-types";
import { QueryFactory, LayerService, XHRHttpClient, Config } from '@geoplatform/client';
export default {
    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    test: function (layer) {
        return layer &&
            layer.resourceTypes &&
            layer.resourceTypes.length &&
            ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM);
    },
    get: function (layerService) {
        var query = QueryFactory()
            .fields('*')
            .resourceTypes(LayerResourceTypes.OSM);
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
            .then(function (response) { return response.results.length ? response.results[0] : null; });
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9vc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFDSCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQ3BELE1BQU8scUJBQXFCLENBQUM7QUFPOUIsZUFBZTtJQUVYOzs7T0FHRztJQUNILElBQUksRUFBRyxVQUFTLEtBQUs7UUFDakIsT0FBUSxLQUFLO1lBQ0wsS0FBSyxDQUFDLGFBQWE7WUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELEdBQUcsRUFBRyxVQUFTLFlBQTRCO1FBQ3ZDLElBQUksS0FBSyxHQUFHLFlBQVksRUFBRTthQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUcsQ0FBQyxZQUFZO1lBQ1osWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDaEMsSUFBSSxDQUFFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FFSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQgeyBMYXllclJlc291cmNlVHlwZXMgfSBmcm9tIFwiLi4vc2hhcmVkL3Jlc291cmNlLXR5cGVzXCI7XG5pbXBvcnQge1xuICAgIFF1ZXJ5RmFjdG9yeSwgTGF5ZXJTZXJ2aWNlLCBYSFJIdHRwQ2xpZW50LCBDb25maWdcbn0gIGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbi8qKlxuICogQHBhcmFtIHtMYXllclNlcnZpY2V9IGxheWVyU2VydmljZSAtIG9wdGlvbmFsLCBHZW9QbGF0Zm9ybSBMYXllciBzZXJ2aWNlIHRvIHVzZSB0byBmZXRjaCB0aGUgbGF5ZXJcbiAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBPcGVuU3RyZWV0IE1hcCBHZW9QbGF0Zm9ybSBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGlzIGFuIE9TTSBsYXllclxuICAgICAqL1xuICAgIHRlc3QgOiBmdW5jdGlvbihsYXllcikge1xuICAgICAgICByZXR1cm4gIGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihMYXllclJlc291cmNlVHlwZXMuT1NNKTtcbiAgICB9LFxuXG4gICAgZ2V0IDogZnVuY3Rpb24obGF5ZXJTZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBhbnkge1xuICAgICAgICBsZXQgcXVlcnkgPSBRdWVyeUZhY3RvcnkoKVxuICAgICAgICAgICAgLmZpZWxkcygnKicpXG4gICAgICAgICAgICAucmVzb3VyY2VUeXBlcyhMYXllclJlc291cmNlVHlwZXMuT1NNKTtcbiAgICAgICAgaWYoIWxheWVyU2VydmljZSlcbiAgICAgICAgICAgIGxheWVyU2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IFhIUkh0dHBDbGllbnQoKSk7XG4gICAgICAgIHJldHVybiBsYXllclNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UucmVzdWx0cy5sZW5ndGggPyByZXNwb25zZS5yZXN1bHRzWzBdIDogbnVsbCk7XG4gICAgfVxuXG59O1xuIl19