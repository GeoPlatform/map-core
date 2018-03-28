


(function (root, factory) {

    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('defaultBaseLayer', [
            "q", "./osm",
            "geoplatform.client/src/services/layer",
            "geoplatform.client/src/http/jq",
            "geoplatform.client/src/shared/config"
        ],
        function(Q, OSM, LayerService, HttpClient, Config) {
            return (root.defaultBaseLayer =
                factory(Q, OSM, LayerService, HttpClient, Config));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.defaultBaseLayer = factory(
                require('q'),
                require('./osm'),
                require('geoplatform.client').LayerService,
                require('geoplatform.client').HttpClient,
                require('geoplatform.client').Config
            )
        );
    } else {
        GeoPlatform.defaultBaseLayer = factory(
            Q, GeoPlatform.OSM,
            GeoPlatform.LayerService,
            GeoPlatform.JQueryHttpClient,
            GeoPlatform
        );
    }
}(this||window, function(Q, OSM, LayerService, HttpClient, GeoPlatform) {

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @param {LayerService} layerService - GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving GeoPlatform Layer object
     */
    return function(layerService) {
        if(!GeoPlatform.defaultBaseLayerId)
            return OSM.get();

        if(!layerService)
            layerService = new LayerService(GeoPlatform.ualUrl, new HttpClient());
        return layerService.get(GeoPlatform.defaultBaseLayerId)
        .catch(e => Q.resolve( OSM.get() ));
    };

}));
