
/**
 *
 */

 (function (root, factory) {
     if(typeof define === "function" && define.amd) {
         // Now we're wrapping the factory and assigning the return
         // value to the root (window) and returning it as well to
         // the AMD loader.
         define(["q", "L"/*eaflet*/, "GeoPlatform"],
             function(Q, L, GeoPlatform) {
                 return (root.FeatureStyleResolver = factory(Q, L, GeoPlatform));
             });
     } else if(typeof module === "object" && module.exports) {
         // I've not encountered a need for this yet, since I haven't
         // run into a scenario where plain modules depend on CommonJS
         // *and* I happen to be loading in a CJS browser environment
         // but I'm including it for the sake of being thorough
         module.exports = (
             root.FeatureStyleResolver = factory(
                 require('q'),
                 require('L'),
                 require('GeoPlatform')
             )
         );
     } else {
         GeoPlatform.FeatureStyleResolver = factory(Q, L/*eaflet*/, GeoPlatform);
     }
 }(this||window, function(Q, L/*eaflet*/, GeoPlatform) {

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
    L.GeoPlatform.featureStyleResolver = function(id) {
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

    return L.GeoPlatform.FeatureStyleResolver;

}));
