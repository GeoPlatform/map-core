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
        var query = QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
            .then(function (response) { return response.results.length ? response.results[0] : null; })
            .catch(function (e) { return Q.reject(e); });
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9vc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQ3BELE1BQU8scUJBQXFCLENBQUM7QUFPOUIsZUFBZTtJQUVYOzs7T0FHRztJQUNILElBQUksRUFBRyxVQUFTLEtBQUs7UUFDakIsT0FBUSxLQUFLO1lBQ0wsS0FBSyxDQUFDLGFBQWE7WUFDbkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNO1lBQzFCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsbURBQW1ELENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsR0FBRyxFQUFHLFVBQVMsWUFBNEI7UUFDdkMsSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFO2FBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDWCxhQUFhLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN4RSxJQUFHLENBQUMsWUFBWTtZQUNaLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN4RSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQXBELENBQW9ELENBQUM7YUFDdkUsS0FBSyxDQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBRUosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBRdWVyeUZhY3RvcnksIExheWVyU2VydmljZSwgWEhSSHR0cENsaWVudCwgQ29uZmlnXG59ICBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuXG4vKipcbiAqIEBwYXJhbSB7TGF5ZXJTZXJ2aWNlfSBsYXllclNlcnZpY2UgLSBvcHRpb25hbCwgR2VvUGxhdGZvcm0gTGF5ZXIgc2VydmljZSB0byB1c2UgdG8gZmV0Y2ggdGhlIGxheWVyXG4gKiBAcmV0dXJuIHtQcm9taXNlfSByZXNvbHZpbmcgT3BlblN0cmVldCBNYXAgR2VvUGxhdGZvcm0gTGF5ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpcyBhbiBPU00gbGF5ZXJcbiAgICAgKi9cbiAgICB0ZXN0IDogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuICBsYXllciAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpO1xuICAgIH0sXG5cbiAgICBnZXQgOiBmdW5jdGlvbihsYXllclNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IFEuUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gUXVlcnlGYWN0b3J5KClcbiAgICAgICAgICAgIC5maWVsZHMoJyonKVxuICAgICAgICAgICAgLnJlc291cmNlVHlwZXMoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpO1xuICAgICAgICBpZighbGF5ZXJTZXJ2aWNlKVxuICAgICAgICAgICAgbGF5ZXJTZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgWEhSSHR0cENsaWVudCgpKTtcbiAgICAgICAgcmV0dXJuIGxheWVyU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5yZXN1bHRzLmxlbmd0aCA/IHJlc3BvbnNlLnJlc3VsdHNbMF0gOiBudWxsKVxuICAgICAgICAuY2F0Y2goIGUgPT4gUS5yZWplY3QoZSkpO1xuICAgIH1cblxufTtcbiJdfQ==