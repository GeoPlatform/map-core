
(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["Q", "angular", "GeoPlatform", "ItemService"], function(Q, angular, GeoPlatform, ItemService){
            return (root.NGItemService = factory(Q, angular, GeoPlatform, ItemService));
        });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.NGItemService = factory(
                require('Q'),
                require('angular'),
                require('GeoPlatform'),
                require('ItemService')
            )
        );
    } else {
        GeoPlatform.NGItemService = factory(Q, angular, GeoPlatform, GeoPlatform.ItemService);
    }
}(this||window, function(Q, angular, GeoPlatform, ItemService) {

    /**
     * NGItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      itemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      itemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      itemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      itemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      itemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     */
    class NGItemService extends ItemService {

        constructor() {
            super();
            if(typeof(angular) === 'undefined')
                throw new Error("Angular not defined");
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @return {Promise} resolving Item object or an error
         */
        get (id) {
            let $http = angular.injector(['ng']).get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http.get(this.baseUrl + '/' + id)
            .then(response=>response.data)
            .catch( e => {
                let m = `NGItemService.get() - Error fetching item: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

        /**
         * @param {Object} itemObj - item to create or update
         * @return {Promise} resolving Item object or an error
         */
        save (itemObj) {
            let opts = {
                method: "POST",
                url: this.baseUrl,
                data: itemObj,
                timeout: this.timeout
            };
            if(itemObj.id) {
                opts.method = "PUT";
                opts.url += '/' + itemObj.id;
            }
            let $http = angular.injector(['ng']).get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http(opts)
            .then(response=>response.data)
            .catch( e => {
                let m = `NGItemService.save() - Error saving item: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of item to delete
         * @return {Promise} resolving true if successful or an error
         */
        remove (id) {
            let opts = {
                method: "DELETE",
                url: this.baseUrl + '/' + id,
                timeout: this.timeout
            };
            let $http = angular.injector(['ng']).get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http(opts).catch( e => {
                let m = `NGItemService.remove() - Error deleting item: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

        /**
         * @param {string} id - identifier of item to patch
         * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
         * @return {Promise} resolving Item object or an error
         */
        patch (id, patch) {
            let opts = {
                method: "PATCH",
                url: this.baseUrl + '/' + id,
                data: patch,
                timeout: this.timeout
            };
            let $http = angular.injector(['ng']).get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http(opts)
            .then(response=>response.data)
            .catch( e => {
                let m = `NGItemService.patch() - Error patching item: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

        search (arg) {

            let params = arg;

            if(arg && typeof(arg.getQuery) !== 'undefined') {
                //if passed a Query object,
                // convert to parameters object
                params = arg.getQuery();
            }

            let opts = {
                method: "GET",
                url: this.baseUrl,
                data: params||{},
                timeout: this.timeout
            };
            let $http = angular.injector(['ng']).get('$http');
            if(typeof($http) === 'undefined')
                throw new Error("Angular $http not resolved");
            return $http(opts)
            .then(response=>response.data)
            .catch( e => {
                let m = `NGItemService.search() - Error searching items: ${e.message}`;
                let err = new Error(m);
                return Q.reject(err);
            });
        }

    }

    return NGItemService;

}));
