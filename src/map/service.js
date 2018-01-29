
( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * Map Service
     * service for working with the GeoPlatform API to
     * retrieve and manipulate map objects.
     *
     * @see GeoPlatform.ItemService
     */

    class MapService extends GeoPlatform.ItemService {

        constructor() {
            super();
            this.baseUrl = GeoPlatform.ualUrl + '/api/maps';
        }

    }

    GeoPlatform.MapService = MapService;
    GeoPlatform.mapService = function() {
        return new GeoPlatform.MapService();
    };

}) (jQuery, Q, L/*eaflet*/, GeoPlatform);
