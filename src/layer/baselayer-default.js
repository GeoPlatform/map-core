


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "GeoPlatform", "OSM", "LayerService", "JQueryHttpClient"],
            function(Q, GeoPlatform, OSM, LayerService, JQueryHttpClient) {
                return (root.defaultBaseLayer =
                    factory(Q, GeoPlatform, OSM, LayerService, JQueryHttpClient));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.defaultBaseLayer = factory(
                require('q'),
                require('GeoPlatform'),
                require('OSM'),
                require('LayerService'),
                require('JQueryHttpClient')
            )
        );
    } else {
        GeoPlatform.defaultBaseLayer = factory(
            Q, GeoPlatform, GeoPlatform.OSM,
            GeoPlatform.LayerService,
            GeoPlatform.JQueryHttpClient);
    }
}(this||window, function(Q, GeoPlatform, OSM, LayerService, JQueryHttpClient) {

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
            layerService = new LayerService(GeoPlatform.ualUrl, new JQueryHttpClient());
        return layerService.get(GeoPlatform.defaultBaseLayerId)
        .catch(e => Q.resolve( OSM.get() ));
    };

}));
