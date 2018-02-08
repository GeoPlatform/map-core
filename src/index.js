
/**
 * Defines the L.GeoPlatform namespace object for later usage
 * in containing the various Leaflet extensions GeoPlatform
 * makes available
 */

 (function (root, factory) {
     if(typeof define === "function" && define.amd) {
         // Now we're wrapping the factory and assigning the return
         // value to the root (window) and returning it as well to
         // the AMD loader.
         define(["L"/*eaflet*/], function(L) {
             return (root.L_GeoPlatform = factory(L));
         });
     } else if(typeof module === "object" && module.exports) {
         // I've not encountered a need for this yet, since I haven't
         // run into a scenario where plain modules depend on CommonJS
         // *and* I happen to be loading in a CJS browser environment
         // but I'm including it for the sake of being thorough
         module.exports = (
             root.L_GeoPlatform = factory(require('L'))
         );
     } else {
         GeoPlatform.L_GeoPlatform = factory(L/*eaflet*/);
     }
 }(this||window, function(L/*eaflet*/) {

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
        };
    }

    return L.GeoPlatform;

}));
