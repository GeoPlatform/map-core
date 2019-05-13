
import * as jquery from "jquery";
const jQuery = jquery;

import * as Q from "q";
import { Config } from 'geoplatform.client';

/**
 * Fetches style information from GeoPlatform UAL
 * @param  id - identifier of layer to resolve style for
 */
function featureStyleResolver(id : string) : Q.Promise<{}> {
    let deferred = Q.defer();
    if(!jQuery) {
        deferred.reject(new Error("Unable to load feature layer style, jQuery is not installed"));
        return deferred.promise;
    }
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
}

export default featureStyleResolver;
