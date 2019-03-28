
import MapInstance from './instance';

var cache = {};

export default {

    get: function(key) {
        if(key && cache[key])
            return cache[key];

        let instance = new MapInstance(key);
        cache[instance._key] = instance;
        return instance;
    },

    dispose: function(key) {
        if(key) {
            cache[key].dispose();
            delete cache[key];
        } else {
            cache = null;
        }
    }
};
