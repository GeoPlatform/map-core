
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform" ,"ItemService"],
            function(jQuery, Q, L, GeoPlatform, ItemService) {
                return (root.LayerService = factory(jQuery, Q, L, GeoPlatform, ItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerService = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform'),
                require('ItemService')
            )
        );
    } else {
        GeoPlatform.LayerService = factory(jQuery, Q, L/*eaflet*/, GeoPlatform, GeoPlatform.ItemService);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform, ItemService) {

// ( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * Layer Service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate layer objects.
     *
     * @see GeoPlatform.ItemService
     */
    class LayerService extends ItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/layers';
        }


        /**
         * @return {Promise} resolving style JSON object
         */
        style () {
            let d = Q.defer();
            let opts = {
                method: "GET",
                url: this.baseUrl + '/' + id + '/style',
                dataType: 'json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.style() - Error fetching item style: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

        /**
         * @param {Object} options identifying extent, x, y
         * @return {Promise} resolving feature JSON object
         */
        describe( options ) {

            if(!options) {
                let err = new Error("Must provide describe options");
                return Q.reject(err);
            }

            let keys = ['bbox', 'height', 'width', 'x', 'y'];
            let missing = keys.find(key => !options[key]);
            if(missing) {
                return Q.reject(new Error(`Must specify ${missing} in describe options`));
            }

            let params = {
                srs         : 'EPSG:4326',
                bbox        : options.bbox,
                height      : options.height,
                width       : options.width,
                info_format : 'text/xml',
                x           : options.x,
                y           : options.y,
                i           : options.x, //WMS 1.3.0
                j           : options.y  //WMS 1.3.0
            };

            let d = Q.defer();
            let opts = {
                method: "GET",
                url: this.baseUrl + '/' + id + '/describe',
                dataType: 'json',
                data: params,
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.describe() -
                        Error describing layer feature: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

    }

    // GeoPlatform.LayerService = LayerService;
    GeoPlatform.layerService = function() {
        return new LayerService();
    };

// }) (jQuery, Q, L/*eaflet*/, GeoPlatform);

    return LayerService;
}));
