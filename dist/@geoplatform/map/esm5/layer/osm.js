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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcC8iLCJzb3VyY2VzIjpbImxheWVyL29zbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUN2RCxNQUFPLG9CQUFvQixDQUFDO0FBTzdCLGVBQWU7SUFFWDs7O09BR0c7SUFDSCxJQUFJLEVBQUcsVUFBUyxLQUFLO1FBQ2pCLE9BQVEsS0FBSztZQUNMLEtBQUssQ0FBQyxhQUFhO1lBQ25CLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTTtZQUMxQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELEdBQUcsRUFBRyxVQUFTLFlBQTRCO1FBQ3ZDLElBQUksS0FBSyxHQUFHLFlBQVksRUFBRTthQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsYUFBYSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDeEUsSUFBRyxDQUFDLFlBQVk7WUFDWixZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUMzRSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUksQ0FBRSxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQXBELENBQW9ELENBQUM7YUFDdkUsS0FBSyxDQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBRUosQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgUSBmcm9tIFwicVwiO1xuaW1wb3J0IHtcbiAgICBRdWVyeUZhY3RvcnksIExheWVyU2VydmljZSwgSlF1ZXJ5SHR0cENsaWVudCwgQ29uZmlnIFxufSAgZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuXG4vKipcbiAqIEBwYXJhbSB7TGF5ZXJTZXJ2aWNlfSBsYXllclNlcnZpY2UgLSBvcHRpb25hbCwgR2VvUGxhdGZvcm0gTGF5ZXIgc2VydmljZSB0byB1c2UgdG8gZmV0Y2ggdGhlIGxheWVyXG4gKiBAcmV0dXJuIHtQcm9taXNlfSByZXNvbHZpbmcgT3BlblN0cmVldCBNYXAgR2VvUGxhdGZvcm0gTGF5ZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpcyBhbiBPU00gbGF5ZXJcbiAgICAgKi9cbiAgICB0ZXN0IDogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuICBsYXllciAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgIH5sYXllci5yZXNvdXJjZVR5cGVzLmluZGV4T2YoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpO1xuICAgIH0sXG5cbiAgICBnZXQgOiBmdW5jdGlvbihsYXllclNlcnZpY2UgPzogTGF5ZXJTZXJ2aWNlKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGxldCBxdWVyeSA9IFF1ZXJ5RmFjdG9yeSgpXG4gICAgICAgICAgICAuZmllbGRzKCcqJylcbiAgICAgICAgICAgIC5yZXNvdXJjZVR5cGVzKFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvb250L29wZW5sYXllci9PU01MYXllclwiKTtcbiAgICAgICAgaWYoIWxheWVyU2VydmljZSlcbiAgICAgICAgICAgIGxheWVyU2VydmljZSA9IG5ldyBMYXllclNlcnZpY2UoQ29uZmlnLnVhbFVybCwgbmV3IEpRdWVyeUh0dHBDbGllbnQoKSk7XG4gICAgICAgIHJldHVybiBsYXllclNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAudGhlbiggcmVzcG9uc2UgPT4gcmVzcG9uc2UucmVzdWx0cy5sZW5ndGggPyByZXNwb25zZS5yZXN1bHRzWzBdIDogbnVsbClcbiAgICAgICAgLmNhdGNoKCBlID0+IFEucmVqZWN0KGUpKTtcbiAgICB9XG5cbn07XG4iXX0=