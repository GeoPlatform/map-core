


( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * GeoPlatform Service service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate service objects.
     *
     * @see GeoPlatform.ItemService
     */

    class ServiceService extends GeoPlatform.ItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/services';
        }


        /**
         * Fetch metadata from the specified GeoPlatform Service's
         * web-accessible implementation using either GetCapabilities
         * or ESRI documentInfo.
         * @param {Object} service - GeoPlatform Service object
         * @return {Promise} resolving service metadata
         */
        about( service ) {

            if(!service) {
                let err = new Error("Must provide service to get metadata about");
                return Q.reject(err);
            }

            let d = Q.defer();
            let opts = {
                method: "POST",
                url: this.baseUrl + '/about',
                dataType: 'json',
                data: service,
                processData: false,
                contentType: 'application/json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ServiceService.about() -
                        Error describing service: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

    }

    GeoPlatform.ServiceService = ServiceService;
    GeoPlatform.serviceService = function() {
        return new GeoPlatform.ServiceService();
    };

}) (jQuery, Q, L/*eaflet*/, GeoPlatform);
