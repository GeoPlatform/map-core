
import * as jquery from "jquery";
const jQuery = jquery;

import * as Q from "q";
import { Config } from '@geoplatform/client';

/**
 * Fetches style information from GeoPlatform UAL
 * @param  id - identifier of layer to resolve style for
 */
function featureStyleResolver(id : string) : Promise<{}> {

    return new Promise<{}>( (resolve, reject) => {

        if(!jQuery) {
            reject(new Error("Unable to load feature layer style, jQuery is not installed"));
        }
        jQuery.ajax({
           url: Config.ualUrl + '/api/layers/' + id + '/style',
           dataType: 'json',
           success: function(data) { resolve(data); },
           error: function(xhr, status, message) {
               let em = `FeatureStyleResolver() -
                   Error loading style information for layer ${id} : ${message}`;
               reject( new Error(em) );
           }
        });

    });
}

export default featureStyleResolver;
