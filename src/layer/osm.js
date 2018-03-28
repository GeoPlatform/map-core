


(function (root, factory) {

    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('OSM', [
            "q",
            "geoplatform.client/src/shared/query-factory",
            "geoplatform.client/src/services/layer",
            "geoplatform.client/src/http/jq",
            'geoplatform.client/src/shared/config'
        ],
        function(Q, QueryFactory, LayerService, HttpClient, Config) {
            return (root.OSM = factory(Q, QueryFactory, LayerService, HttpClient, Config));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.OSM = factory(
                require('q'),
                require('geoplatform.client').QueryFactory,
                require('geoplatform.client').LayerService,
                require('geoplatform.client').HttpClient,
                require('geoplatform.client').Config
            )
        );
    } else {
        GeoPlatform.OSM = factory(Q,
            GeoPlatform.QueryFactory, GeoPlatform.LayerService,
            GeoPlatform.JQueryHttpClient, GeoPlatform);
    }
}(this||window, function(Q, QueryFactory, LayerService, HttpClient, GeoPlatform) {

    /**
     * @param {LayerService} layerService - optional, GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    return {

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
                layerService = new LayerService(GeoPlatform.ualUrl, new HttpClient());
            return layerService.search(query)
            .then( response => response.results.length ? response.results[0] : null)
            .catch( e => Q.reject(e));
        }

    };

}));
