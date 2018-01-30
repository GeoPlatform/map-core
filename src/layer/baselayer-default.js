


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "GeoPlatform", "OSM", "JQueryLayerService"],
            function(Q, GeoPlatform, OSM, JQueryLayerService) {
                return (root.getDefaultBaseLayer = factory(Q, GeoPlatform, OSM, JQueryLayerService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.getDefaultBaseLayer = factory(
                require('q'),
                require('GeoPlatform'),
                require('OSM'),
                require('JQueryLayerService')
            )
        );
    } else {
        GeoPlatform.getDefaultBaseLayer = factory(
            Q, GeoPlatform, GeoPlatform.OSM,
            GeoPlatform.JQueryLayerService);
    }
}(this||window, function(Q, GeoPlatform, OSM, JQueryLayerService) {

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @param {LayerService} layerService - GeoPlatform Layer service to use to fetch the layer
     * @return {Promise} resolving GeoPlatform Layer object
     */
    return function(layerService) {
        if(!GeoPlatform.defaultBaseLayer)
            return OSM.get();

        let svc = layerService || new JQueryLayerService();
        return svc.get(GeoPlatform.defaultBaseLayer)
        .catch(e => Q.resolve( OSM.get() ));
    };

}));
