
/**
 * Defines the L.GeoPlatform namespace object for later usage
 * in containing the various Leaflet extensions GeoPlatform
 * makes available
 */

(function(jQuery, L/*eaflet*/, GeoPlatform) {

    if(!L)
        throw new Error("Missing Leaflet");


    //if GeoPlatform extensions to Leaflet don't exist
    // create the container
    if(!L.GeoPlatform)
        L.GeoPlatform = {};


})(jQuery, L/*eaflet*/, GeoPlatform);
