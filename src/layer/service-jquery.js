


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "GeoPlatform", "JQueryItemService"],
            function(jQuery, Q, GeoPlatform, JQueryItemService) {
                return (root.JQueryLayerService = factory(jQuery, Q, GeoPlatform, JQueryItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.JQueryLayerService = factory(
                require("jquery"),
                require('q'),
                require('GeoPlatform'),
                require('JQueryItemService')
            )
        );
    } else {
        GeoPlatform.JQueryLayerService = factory(jQuery, Q, GeoPlatform, GeoPlatform.JQueryItemService);
    }
}(this||window, function(jQuery, Q, GeoPlatform, JQueryItemService) {


    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.JQueryItemService
     */

    class JQueryLayerService extends JQueryItemService {

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
                timeout: this.timeout,
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.LayerService.style() - Error fetching item style: ${message}`;
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
                timeout: this.timeout,
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.LayerService.describe() -
                        Error describing layer feature: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

    }

    return JQueryLayerService;

}));
