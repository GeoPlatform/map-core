


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "GeoPlatform", "QueryFactory", "LayerService", "JQueryHttpClient"],
            function(Q, GeoPlatform, QueryFactory, LayerService, JQueryHttpClient) {
                return (root.OSM = factory(
                    Q, GeoPlatform, QueryFactory, LayerService, JQueryHttpClient));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.OSM = factory(
                require('q'),
                require('GeoPlatform'),
                require('QueryFactory'),
                require('LayerService'),
                require('JQueryHttpClient')
            )
        );
    } else {
        GeoPlatform.OSM = factory(Q, GeoPlatform,
            GeoPlatform.QueryFactory, GeoPlatform.LayerService,
            GeoPlatform.JQueryHttpClient);
    }
}(this||window, function(Q, GeoPlatform, QueryFactory, LayerService, JQueryHttpClient) {

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
                layerService = new LayerService(GeoPlatform.ualUrl, new JQueryHttpClient());
            return layerService.search(query)
            .then( response => response.results.length ? response.results[0] : null)
            .catch( e => Q.reject(e));
        }

    };

}));
