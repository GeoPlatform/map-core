/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as Q from "q";
import { QueryFactory, LayerService, JQueryHttpClient, Config } from 'geoplatform.client';
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
        var query = QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new JQueryHttpClient());
        return layerService.search(query)
            .then(function (response) { return response.results.length ? response.results[0] : null; })
            .catch(function (e) { return Q.reject(e); });
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2VvcGxhdGZvcm0ubWFwLyIsInNvdXJjZXMiOlsibGF5ZXIvb3NtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQ3ZELE1BQU8sb0JBQW9CLENBQUM7QUFPN0IsZUFBZTtJQUVYOzs7T0FHRztJQUNILElBQUksRUFBRyxVQUFTLEtBQUs7UUFDakIsT0FBUSxLQUFLO1lBQ0wsS0FBSyxDQUFDLGFBQWE7WUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsR0FBRyxFQUFHLFVBQVMsWUFBNEI7UUFDdkMsSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFO2FBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxhQUFhLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN4RSxJQUFHLENBQUMsWUFBWTtZQUNaLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDaEMsSUFBSSxDQUFFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBcEQsQ0FBb0QsQ0FBQzthQUN2RSxLQUFLLENBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFYLENBQVcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FFSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQge1xuICAgIFF1ZXJ5RmFjdG9yeSwgTGF5ZXJTZXJ2aWNlLCBKUXVlcnlIdHRwQ2xpZW50LCBDb25maWcgXG59ICBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cbi8qKlxuICogQHBhcmFtIHtMYXllclNlcnZpY2V9IGxheWVyU2VydmljZSAtIG9wdGlvbmFsLCBHZW9QbGF0Zm9ybSBMYXllciBzZXJ2aWNlIHRvIHVzZSB0byBmZXRjaCB0aGUgbGF5ZXJcbiAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBPcGVuU3RyZWV0IE1hcCBHZW9QbGF0Zm9ybSBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGlzIGFuIE9TTSBsYXllclxuICAgICAqL1xuICAgIHRlc3QgOiBmdW5jdGlvbihsYXllcikge1xuICAgICAgICByZXR1cm4gIGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIik7XG4gICAgfSxcblxuICAgIGdldCA6IGZ1bmN0aW9uKGxheWVyU2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gUXVlcnlGYWN0b3J5KClcbiAgICAgICAgICAgIC5maWVsZHMoJyonKVxuICAgICAgICAgICAgLnJlc291cmNlVHlwZXMoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpO1xuICAgICAgICBpZighbGF5ZXJTZXJ2aWNlKVxuICAgICAgICAgICAgbGF5ZXJTZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgSlF1ZXJ5SHR0cENsaWVudCgpKTtcbiAgICAgICAgcmV0dXJuIGxheWVyU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5yZXN1bHRzLmxlbmd0aCA/IHJlc3BvbnNlLnJlc3VsdHNbMF0gOiBudWxsKVxuICAgICAgICAuY2F0Y2goIGUgPT4gUS5yZWplY3QoZSkpO1xuICAgIH1cblxufTtcbiJdfQ==