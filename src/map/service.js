
// ( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform", "ItemService"],
            function(jQuery, Q, L, GeoPlatform, ItemService){
                return (root.MapService = factory(jQuery, Q, L, GeoPlatform, ItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.MapService = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform'),
                require('ItemService')
            )
        );
    } else {
        GeoPlatform.MapService = factory(jQuery, Q, L/*eaflet*/, GeoPlatform, GeoPlatform.ItemService);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform, ItemService) {

    'use strict';

    /**
     * Map Service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class MapService extends ItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/maps';
        }

    }

    // GeoPlatform.MapService = MapService;
    GeoPlatform.mapService = function() {
        return new MapService();
    };

// }) (jQuery, Q, L/*eaflet*/, GeoPlatform);

    return MapService;

}));
