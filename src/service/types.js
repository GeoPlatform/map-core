
/*
 * Fetches the set of supported Service types from UAL and
 * makes them available via GeoPlatform.ServiceTypes
 */

( function(jQuery, Q, GeoPlatform) {

    const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
    const esriExpr = /Esri REST ([A-Za-z]+) Service/;
    const keyFn = (expr, str) => {
        let m = expr.exec(str);
        return (m && m.length) ? m[1] : null;
    };

    var types = {};

    let query = GeoPlatform.QueryFactory()
        .types('dct:Standard')
        .resourceTypes('ServiceType')
        .pageSize(50)

    GeoPlatform.itemService().search(query)
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

    // const url = GeoPlatform.ualUrl + '/api/items?' +
    //     'type:dct:Standard&resourceType=ServiceType&' +
    //     'size=50&sort=label,asc';


    // jQuery.ajax({ url: url, dataType: 'json',
    //     success: function(data) {
    //
    //         data.results.each( (type) => {
    //
    //             let key = null;
    //             let label = type.label;
    //
    //             if(~label.indexOf("WMS-T")) {
    //                 key = 'WMST';
    //                 type.supported = true;
    //
    //             } else if(~label.indexOf('OGC')) {
    //                 key = keyFn(ogcExpr, label);
    //                 type.supported = 'WMS' === key || 'WMTS' === key;
    //
    //             } else if(~label.indexOf('Esri')) {
    //                 key = keyFn(esriExpr, label);
    //                 type.supported = true;
    //                 key = 'ESRI_' + key.toUpperCase() + '_SERVER';
    //
    //             } else if(~label.indexOf("Feed")) {
    //                 key = "FEED";
    //                 type.supported = true;
    //
    //             } else {
    //                 key = label;
    //
    //             }
    //
    //             types[key] = type;
    //         });
    //         // console.log(types);
    //     },
    //     error: function(xhr, status, message) {
    //         console.log("Error loading supported service types: " + message);
    //     }
    // });

    GeoPlatform.ServiceTypes = types;

}) (jQuery, Q, GeoPlatform);
