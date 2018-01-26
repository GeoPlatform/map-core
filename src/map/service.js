
( function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    'use strict';

    /*
     * Ex Fetch Map:
     *      GeoPlatform.MapService.get(mapId).then(map=>{...}).catch(e=>{...});
     * Ex Saving Map:
     *      GeoPlatform.MapService.save(map).then(map=>{...}).catch(e=>{...});
     * Ex Deleting Map:
     *      GeoPlatform.MapService.remove(mapId).then(()=>{...}).catch(e=>{...});
     * Ex Patching Map:
     *      GeoPlatform.MapService.patch(mapId,patch).then(map=>{...}).catch(e=>{...});
     */

    GeoPlatform.MapService = {

        /**
         * @param {string} id - identifier of map to fetch
         * @return {Promise} resolving Map object or an error
         */
        get: function(id) {
            let d = Q.defer();
            let opts = {
                method: "GET",
                url: GeoPlatform.ualUrl + '/api/maps/' + id,
                dataType: 'json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.MapService.save() - Error fetching map: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        },

        /**
         * @param {Object} mapObj - map to create or update
         * @return {Promise} resolving Map object or an error
         */
        save: function(mapObj) {
            let d = Q.defer();
            let opts = {
                method: "POST",
                url: GeoPlatform.ualUrl + '/api/maps',
                dataType: 'json',
                data: mapObj,
                processData: false,
                contentType: 'application/json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.MapService.save() - Error saving map: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            if(mapObj.id) {
                opts.method = "PUT";
                opts.url += '/' + mapObj.id;
            }
            jQuery.ajax(opts);
            return d.promise;
        },

        /**
         * @param {string} id - identifier of map to delete
         * @return {Promise} resolving true if successful or an error
         */
        remove: function(id) {
            let d = Q.defer();
            let opts = {
                method: "DELETE",
                url: GeoPlatform.ualUrl + '/api/maps/' + id,
                success: function(data) { d.resolve(true); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.MapService.save() - Error deleting map: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        },

        /**
         * @param {string} id - identifier of map to patch
         * @param {Object} patch - HTTP-PATCH compliant set of properties to patch
         * @return {Promise} resolving Map object or an error
         */
        patch: function(id, patch) {
            let d = Q.defer();
            let opts = {
                method: "PATCH",
                url: GeoPlatform.ualUrl + '/api/maps/' + id,
                dataType: 'json',
                data: patch,
                processData: false,
                contentType: 'application/json',
                success: function(data) { d.resolve(data); },
                error: function(xhr, status, message) {
                    let m = `GeoPlatform.MapService.save() - Error patching map: ${message}`;
                    let err = new Error(m);
                    d.reject(err);
                }
            };
            jQuery.ajax(opts);
            return d.promise;
        }

    };

}) (jQuery, Q, L/*eaflet*/, GeoPlatform);
