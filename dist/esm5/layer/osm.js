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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9vc20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFDdkQsTUFBTyxvQkFBb0IsQ0FBQztBQU83QixlQUFlO0lBRVg7OztPQUdHO0lBQ0gsSUFBSSxFQUFHLFVBQVMsS0FBSztRQUNqQixPQUFRLEtBQUs7WUFDTCxLQUFLLENBQUMsYUFBYTtZQUNuQixLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDMUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxHQUFHLEVBQUcsVUFBUyxZQUE0QjtRQUN2QyxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQUU7YUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLGFBQWEsQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3hFLElBQUcsQ0FBQyxZQUFZO1lBQ1osWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDM0UsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNoQyxJQUFJLENBQUUsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFwRCxDQUFvRCxDQUFDO2FBQ3ZFLEtBQUssQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUVKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcbmltcG9ydCB7XG4gICAgUXVlcnlGYWN0b3J5LCBMYXllclNlcnZpY2UsIEpRdWVyeUh0dHBDbGllbnQsIENvbmZpZyBcbn0gIGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cblxuLyoqXG4gKiBAcGFyYW0ge0xheWVyU2VydmljZX0gbGF5ZXJTZXJ2aWNlIC0gb3B0aW9uYWwsIEdlb1BsYXRmb3JtIExheWVyIHNlcnZpY2UgdG8gdXNlIHRvIGZldGNoIHRoZSBsYXllclxuICogQHJldHVybiB7UHJvbWlzZX0gcmVzb2x2aW5nIE9wZW5TdHJlZXQgTWFwIEdlb1BsYXRmb3JtIExheWVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgaXMgYW4gT1NNIGxheWVyXG4gICAgICovXG4gICAgdGVzdCA6IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgIHJldHVybiAgbGF5ZXIgJiZcbiAgICAgICAgICAgICAgICBsYXllci5yZXNvdXJjZVR5cGVzICYmXG4gICAgICAgICAgICAgICAgbGF5ZXIucmVzb3VyY2VUeXBlcy5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICB+bGF5ZXIucmVzb3VyY2VUeXBlcy5pbmRleE9mKFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3Yvb250L29wZW5sYXllci9PU01MYXllclwiKTtcbiAgICB9LFxuXG4gICAgZ2V0IDogZnVuY3Rpb24obGF5ZXJTZXJ2aWNlID86IExheWVyU2VydmljZSkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgcXVlcnkgPSBRdWVyeUZhY3RvcnkoKVxuICAgICAgICAgICAgLmZpZWxkcygnKicpXG4gICAgICAgICAgICAucmVzb3VyY2VUeXBlcyhcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L29udC9vcGVubGF5ZXIvT1NNTGF5ZXJcIik7XG4gICAgICAgIGlmKCFsYXllclNlcnZpY2UpXG4gICAgICAgICAgICBsYXllclNlcnZpY2UgPSBuZXcgTGF5ZXJTZXJ2aWNlKENvbmZpZy51YWxVcmwsIG5ldyBKUXVlcnlIdHRwQ2xpZW50KCkpO1xuICAgICAgICByZXR1cm4gbGF5ZXJTZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAgLnRoZW4oIHJlc3BvbnNlID0+IHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoID8gcmVzcG9uc2UucmVzdWx0c1swXSA6IG51bGwpXG4gICAgICAgIC5jYXRjaCggZSA9PiBRLnJlamVjdChlKSk7XG4gICAgfVxuXG59O1xuIl19