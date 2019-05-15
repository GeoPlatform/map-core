/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
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
            ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
    },
    get: function (layerService) {
        let query = QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
            .then(response => response.results.length ? response.results[0] : null)
            .catch(e => Q.reject(e));
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9vc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQ3BELE1BQU8scUJBQXFCLENBQUM7QUFPOUIsZUFBZTtJQUVYOzs7T0FHRztJQUNILElBQUksRUFBRyxVQUFTLEtBQUs7UUFDakIsT0FBUSxLQUFLO1lBQ0wsS0FBSyxDQUFDLGFBQWE7WUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsR0FBRyxFQUFHLFVBQVMsWUFBNEI7UUFDdkMsSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFO2FBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxhQUFhLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN4RSxJQUFHLENBQUMsWUFBWTtZQUNaLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUksQ0FBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDdkUsS0FBSyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FFSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQge1xuICAgIFF1ZXJ5RmFjdG9yeSwgTGF5ZXJTZXJ2aWNlLCBYSFJIdHRwQ2xpZW50LCBDb25maWdcbn0gIGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5cbi8qKlxuICogQHBhcmFtIHtMYXllclNlcnZpY2V9IGxheWVyU2VydmljZSAtIG9wdGlvbmFsLCBHZW9QbGF0Zm9ybSBMYXllciBzZXJ2aWNlIHRvIHVzZSB0byBmZXRjaCB0aGUgbGF5ZXJcbiAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBPcGVuU3RyZWV0IE1hcCBHZW9QbGF0Zm9ybSBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGlzIGFuIE9TTSBsYXllclxuICAgICAqL1xuICAgIHRlc3QgOiBmdW5jdGlvbihsYXllcikge1xuICAgICAgICByZXR1cm4gIGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIik7XG4gICAgfSxcblxuICAgIGdldCA6IGZ1bmN0aW9uKGxheWVyU2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogUS5Qcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcXVlcnkgPSBRdWVyeUZhY3RvcnkoKVxuICAgICAgICAgICAgLmZpZWxkcygnKicpXG4gICAgICAgICAgICAucmVzb3VyY2VUeXBlcyhcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIik7XG4gICAgICAgIGlmKCFsYXllclNlcnZpY2UpXG4gICAgICAgICAgICBsYXllclNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIG5ldyBYSFJIdHRwQ2xpZW50KCkpO1xuICAgICAgICByZXR1cm4gbGF5ZXJTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoID8gcmVzcG9uc2UucmVzdWx0c1swXSA6IG51bGwpXG4gICAgICAgIC5jYXRjaCggZSA9PiBRLnJlamVjdChlKSk7XG4gICAgfVxuXG59O1xuIl19