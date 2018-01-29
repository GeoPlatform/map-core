
( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /**
     * ItemService
     * service for working with the GeoPlatform API to
     * retrieve and manipulate items.
     *
     * Ex Searching Items
     *      let params = { q: 'test' };
     *      GeoPlatform.ItemService.search(params).then(response=>{
     *          console.log(response.results.length + " of " + response.totalResults);
     *      }).catch(e=>{...});
     *
     * Ex Fetch Item:
     *      GeoPlatform.ItemService.get(itemId).then(item=>{...}).catch(e=>{...});
     *
     * Ex Saving Item:
     *      GeoPlatform.ItemService.save(item).then(item=>{...}).catch(e=>{...});
     *
     * Ex Deleting Item:
     *      GeoPlatform.ItemService.remove(itemId).then(()=>{...}).catch(e=>{...});
     *
     * Ex Patching Item:
     *      GeoPlatform.ItemService.patch(itemId,patch).then(item=>{...}).catch(e=>{...});
     *
     */
    class ItemService {

        constructor() {
            this.baseUrl = GeoPlatform.ualUrl + '/api/items';
        }

        /**
         * @param {string} id - identifier of item to fetch
         * @return {Promise} resolving Item object or an error
         */
        get (id) {
            let d = Q.defer();
            let opts = {
                method: "GET",
                url: this.baseUrl + '/' + id,
                dataType: 'json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.save() - Error fetching item: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

        /**
         * @param {Object} itemObj - item to create or update
         * @return {Promise} resolving Item object or an error
         */
        save (itemObj) {
            let d = Q.defer();
            let opts = {
                method: "POST",
                url: this.baseUrl,
                dataType: 'json',
                data: itemObj,
                processData: false,
                contentType: 'application/json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.save() - Error saving item: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            if(itemObj.id) {
                opts.method = "PUT";
                opts.url += '/' + itemObj.id;
            }
            jQuery.ajax(opts);
            return d.promise;
        }

        /**
         * @param {string} id - identifier of item to delete
         * @return {Promise} resolving true if successful or an error
         */
        remove (id) {
            let d = Q.defer();
            let opts = {
                method: "DELETE",
                url: this.baseUrl + '/' + id,
                success: function(data) { d.resolve(true); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.save() - Error deleting item: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

        /**
         * @param {string} id - identifier of item to patch
         * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
         * @return {Promise} resolving Item object or an error
         */
        patch (id, patch) {
            let d = Q.defer();
            let opts = {
                method: "PATCH",
                url: this.baseUrl + '/' + id,
                dataType: 'json',
                data: patch,
                processData: false,
                contentType: 'application/json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.save() - Error patching item: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

        search (arg) {

            let params = arg;

            if(arg && typeof(arg.getQuery) !== 'undefined') {
                //if passed a GeoPlatform.Query object,
                // convert to parameters object
                params = arg.getQuery();
            }

            let d = Q.defer();
            let opts = {
                method: "GET",
                url: this.baseUrl,
                dataType: 'json',
                data: params||{},
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.ItemService.search() - Error searching items: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

    }


    GeoPlatform.ItemService = ItemService;
    GeoPlatform.itemService = function() {
        return new GeoPlatform.ItemService();
    };


}) (jQuery, Q, L/*eaflet*/, GeoPlatform);
