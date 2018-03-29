
import jQuery from "jquery";
import Q from "q";
import GeoPlatformClient from 'geoplatform.client';


const ItemService = GeoPlatformClient.ItemService;
const HttpClient = GeoPlatformClient.JQueryHttpClient;
const QueryFactory = GeoPlatformClient.QueryFactory;
const Config = GeoPlatformClient.Config;


const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
const esriExpr = /Esri REST ([A-Za-z]+) Service/;
const keyFn = (expr, str) => {
    let m = expr.exec(str);
    return (m && m.length) ? m[1] : null;
};

var types = {
    //will be populated by function
    //...
    //...
    //...
    refresh: updateList //method to allow refreshing list later
};

function updateList() {
    
    let url = Config.ualUrl;
    if(!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
    } else {

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
    }
}

export default types;
