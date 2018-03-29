
import Q from "q";
import GeoPlatformClient from 'geoplatform.client';

const QueryFactory = GeoPlatformClient.QueryFactory;
const LayerService = GeoPlatformClient.LayerService;
const HttpClient = GeoPlatformClient.JQueryHttpClient;
const Config = GeoPlatformClient.Config;

/**
 * @param {LayerService} layerService - optional, GeoPlatform Layer service to use to fetch the layer
 * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
 */
export default {

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    test : function(layer) {
        return  layer &&
                layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
    },

    get : function(layerService) {
        let query = QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        if(!layerService)
            layerService = new LayerService(Config.ualUrl, new HttpClient());
        return layerService.search(query)
        .then( response => response.results.length ? response.results[0] : null)
        .catch( e => Q.reject(e));
    }

};
