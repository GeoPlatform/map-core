
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




    if(typeof(Array.prototype.each) === 'undefined') {
        Array.prototype.each = function(fn) {
            let arr = this, len = arr.length;
            for(let i=0; i<len; ++i) {
                try {
                    fn(arr[i]);
                } catch(e) { }
            }
        }
    }


})(jQuery, L/*eaflet*/, GeoPlatform);
