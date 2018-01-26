
/**
 *
 */

(function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    if(!L) {
        throw new Error("Missing Leaflet");
    }
    if(!L.GeoPlatform) {
        throw new Error("Missing GeoPlatform extensions to Leaflet");
    }

    /**
     * Fetches style information from GeoPlatform UAL
     * @param {string} id - identifier of layer to resolve style for
     */
    L.GeoPlatform.FeatureStyleResolver = function(id) {
        let deferred = Q.defer();
        jQuery.ajax({
            url: GeoPlatform.ualUrl + '/api/layers/' + id + '/style',
            dataType: 'json',
            success: function(data) {
                deferred.resolve(data);
            },
            error: function(xhr, status, message) {
                let em = `L.GeoPlatform.FeatureStyleResolver() -
                    Error loading style information for layer ${id} : ${message}`;
                let error = new Error(em);
                deferred.reject(error);
            }
        });
        return deferred.promise;
    };

})(jQuery, Q, L/*eaflet*/, GeoPlatform);
