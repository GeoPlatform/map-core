
// import * as jquery from "jquery";
// const jQuery = jquery;

import * as Q from "q";
import {
    Config, XHRHttpClient, LayerService
} from '@geoplatform/client';

/**
 * Fetches style information from GeoPlatform UAL
 * @param  id - identifier of layer to resolve style for
 */
function featureStyleResolver(id : string) : Promise<any> {

    let service = new LayerService( Config.ualUrl, new XHRHttpClient() );
    return service.style(id).catch( (e:Error) => {
        let err = new Error(`Unable to download style for layer ${id} because of an error; ${e.message}`);
        return Promise.reject(err);
    });

    // return new Promise<any>( (resolve, reject) => {
    //
    //     if(!jQuery) {
    //         reject(new Error("Unable to load feature layer style, jQuery is not installed"));
    //     }
    //     jQuery.ajax({
    //        url: Config.ualUrl + '/api/layers/' + id + '/style',
    //        dataType: 'json',
    //        success: function(data) { resolve(data); },
    //        error: function(xhr, status, message) {
    //            let em = `FeatureStyleResolver() -
    //                Error loading style information for layer ${id} : ${message}`;
    //            reject( new Error(em) );
    //        }
    //     });
    //
    // });
}

export default featureStyleResolver;
