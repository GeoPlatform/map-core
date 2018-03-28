
/*
 * Fetches the set of supported Service types from UAL and
 * makes them available via GeoPlatform.ServiceTypes
 */

 (function (root, factory) {

     if(typeof define === "function" && define.amd) {
         // Now we're wrapping the factory and assigning the return
         // value to the root (window) and returning it as well to
         // the AMD loader.
         define('ServiceTypes', [
             "jquery", "q",
             "geoplatform.client/src/services/item",
             "geoplatform.client/src/http/jq",
             "geoplatform.client/src/shared/query-factory",
             "geoplatform.client/src/shared/config"
         ],
         function(jQuery, Q, ItemService, HttpClient, QueryFactory, Config) {
             return (root.ServiceTypes = factory(
                 jQuery, Q, ItemService, HttpClient, QueryFactory, Config));
         });
     } else if(typeof module === "object" && module.exports) {
         // I've not encountered a need for this yet, since I haven't
         // run into a scenario where plain modules depend on CommonJS
         // *and* I happen to be loading in a CJS browser environment
         // but I'm including it for the sake of being thorough
         module.exports = (
             root.ServiceTypes = factory(
                 require("jquery"),
                 require('q'),
                 require('geoplatform.client').ItemService,
                 require('geoplatform.client').HttpClient,
                 require('geoplatform.client').QueryFactory,
                 require('geoplatform.client').Config
             )
         );
     } else {
         GeoPlatform.ServiceTypes = factory(jQuery, Q,
             GeoPlatform.ItemService, GeoPlatform.JQueryHttpClient,
             GeoPlatform.QueryFactory, GeoPlatform);
     }
 }(this||window, function(jQuery, Q, ItemService, HttpClient, QueryFactory, GeoPlatform) {


    const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
    const esriExpr = /Esri REST ([A-Za-z]+) Service/;
    const keyFn = (expr, str) => {
        let m = expr.exec(str);
        return (m && m.length) ? m[1] : null;
    };

    var types = {};

    let url = GeoPlatform.ualUrl;
    if(!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
        return types;
    }

    let query = QueryFactory()
        .types('dct:Standard')
        .resourceTypes('ServiceType')
        .pageSize(50);

    new ItemService(url, new HttpClient()).search(query)
    .then( data => {

        for(let i=0; i<data.results.length; ++i) {

            let type = data.results[i],
                key = null,
                label = type.label;

            if(~label.indexOf("WMS-T")) {
                key = 'WMST';
                type.supported = true;

            } else if(~label.indexOf('OGC')) {
                key = keyFn(ogcExpr, label);
                type.supported = 'WMS' === key || 'WMTS' === key;

            } else if(~label.indexOf('Esri')) {
                key = keyFn(esriExpr, label);
                type.supported = true;
                key = 'ESRI_' + key.toUpperCase() + '_SERVER';

            } else if(~label.indexOf("Feed")) {
                key = "FEED";
                type.supported = true;

            } else {
                key = label;

            }

            types[key] = type;
        }
        // console.log(types);
    })
    .catch( error => {
        console.log("Error loading supported service types: " + error.message);
    });

    return types;

}));
