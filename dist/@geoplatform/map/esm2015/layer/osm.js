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
        let query = QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new JQueryHttpClient());
        return layerService.search(query)
            .then(response => response.results.length ? response.results[0] : null)
            .catch(e => Q.reject(e));
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcC8iLCJzb3VyY2VzIjpbImxheWVyL29zbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUN2RCxNQUFPLG9CQUFvQixDQUFDO0FBTzdCLGVBQWU7SUFFWDs7O09BR0c7SUFDSCxJQUFJLEVBQUcsVUFBUyxLQUFLO1FBQ2pCLE9BQVEsS0FBSztZQUNMLEtBQUssQ0FBQyxhQUFhO1lBQ25CLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTTtZQUMxQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELEdBQUcsRUFBRyxVQUFTLFlBQTRCO1FBQ3ZDLElBQUksS0FBSyxHQUFHLFlBQVksRUFBRTthQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsYUFBYSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDeEUsSUFBRyxDQUFDLFlBQVk7WUFDWixZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUMzRSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUksQ0FBRSxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDdkUsS0FBSyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FFSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5pbXBvcnQge1xuICAgIFF1ZXJ5RmFjdG9yeSwgTGF5ZXJTZXJ2aWNlLCBKUXVlcnlIdHRwQ2xpZW50LCBDb25maWcgXG59ICBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5cbi8qKlxuICogQHBhcmFtIHtMYXllclNlcnZpY2V9IGxheWVyU2VydmljZSAtIG9wdGlvbmFsLCBHZW9QbGF0Zm9ybSBMYXllciBzZXJ2aWNlIHRvIHVzZSB0byBmZXRjaCB0aGUgbGF5ZXJcbiAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBPcGVuU3RyZWV0IE1hcCBHZW9QbGF0Zm9ybSBMYXllclxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGlzIGFuIE9TTSBsYXllclxuICAgICAqL1xuICAgIHRlc3QgOiBmdW5jdGlvbihsYXllcikge1xuICAgICAgICByZXR1cm4gIGxheWVyICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcyAmJlxuICAgICAgICAgICAgICAgIGxheWVyLnJlc291cmNlVHlwZXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgfmxheWVyLnJlc291cmNlVHlwZXMuaW5kZXhPZihcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIik7XG4gICAgfSxcblxuICAgIGdldCA6IGZ1bmN0aW9uKGxheWVyU2VydmljZSA/OiBMYXllclNlcnZpY2UpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gUXVlcnlGYWN0b3J5KClcbiAgICAgICAgICAgIC5maWVsZHMoJyonKVxuICAgICAgICAgICAgLnJlc291cmNlVHlwZXMoXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9vbnQvb3BlbmxheWVyL09TTUxheWVyXCIpO1xuICAgICAgICBpZighbGF5ZXJTZXJ2aWNlKVxuICAgICAgICAgICAgbGF5ZXJTZXJ2aWNlID0gbmV3IExheWVyU2VydmljZShDb25maWcudWFsVXJsLCBuZXcgSlF1ZXJ5SHR0cENsaWVudCgpKTtcbiAgICAgICAgcmV0dXJuIGxheWVyU2VydmljZS5zZWFyY2gocXVlcnkpXG4gICAgICAgIC50aGVuKCByZXNwb25zZSA9PiByZXNwb25zZS5yZXN1bHRzLmxlbmd0aCA/IHJlc3BvbnNlLnJlc3VsdHNbMF0gOiBudWxsKVxuICAgICAgICAuY2F0Y2goIGUgPT4gUS5yZWplY3QoZSkpO1xuICAgIH1cblxufTtcbiJdfQ==