


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["q", "angular", "GeoPlatform", "NGItemService"],
            function(Q, angular, GeoPlatform, NGItemService) {
                return (root.NGLayerService = factory(Q, angular, GeoPlatform, NGItemService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGLayerService = factory(
                require('q'),
                require("angular"),
                require('GeoPlatform'),
                require('NGItemService')
            )
        );
    } else {
        GeoPlatform.NGLayerService = factory(Q, angular, GeoPlatform, GeoPlatform.NGItemService);
    }
}(this||window, function(Q, angular, GeoPlatform, NGItemService) {

    'use strict';

    /**
     * GeoPlatform Map service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.NGItemService
     */

    class NGLayerService extends NGItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/layers';
        }

        /**
         * @return {Promise} resolving style JSON object
         */
        style () {
            let url = this.baseUrl + '/' + id + '/style';
            let $http = angular.injector().get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http.get(url).catch( e => {
                let m = `GeoPlatform.NGLayerService.style() - Error getting layer style: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
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


            let opts = {
                method: "GET",
                url: this.baseUrl + '/' + id + '/describe',
                data: params,
                timeout: this.timeout
            };
            let $http = angular.injector().get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http(opts).catch( e => {
                let m = `GeoPlatform.NGLayerService.get() - Error describing layer feature: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

    }

    return NGLayerService;

}));
