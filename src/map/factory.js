
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["MapInstance"],function(MapInstance){
            return (root.MapInstance = factory(MapInstance));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.MapInstance = factory(require('MapInstance'))
        );
    } else {
        GeoPlatform.MapFactory = factory(GeoPlatform.MapInstance);
    }
}(this||window, function(MapInstance) {

    var cache = {};

    return {

        get: function(key) {
            if(key && cache[key])
                return cache[key];

            let instance = new MapInstance(key);
            cache[instance._key] = instance;
            return instance;
        },

        dispose: function(key) {
            if(key) {
                cache[key].destroyMap();
                delete cache[key];
            } else {
                cache = null;
            }
        }
    };

}));
