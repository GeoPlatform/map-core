
import jQuery from 'jquery';
import Q from "q";
import {Config} from 'geoplatform.client';

/**
 * Fetches style information from GeoPlatform UAL
 * @param {string} id - identifier of layer to resolve style for
 */
function featureStyleResolver(id) {
    let deferred = Q.defer();
    jQuery.ajax({
       url: Config.ualUrl + '/api/layers/' + id + '/style',
       dataType: 'json',
       success: function(data) {
           deferred.resolve(data);
       },
       error: function(xhr, status, message) {
           let em = `FeatureStyleResolver() -
               Error loading style information for layer ${id} : ${message}`;
           let error = new Error(em);
           deferred.reject(error);
       }
    });
    return deferred.promise;
};

export default featureStyleResolver;
