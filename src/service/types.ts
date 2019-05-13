
import * as jquery from "jquery";
const jQuery = jquery;

import * as Q from "q";
import {
    ItemService, JQueryHttpClient, QueryFactory, Config
} from 'geoplatform.client';



const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
const esriExpr = /Esri REST ([A-Za-z]+) Service/;
const keyFn = (expr, str) => {
    let m = expr.exec(str);
    return (m && m.length) ? m[1] : null;
};

var types = {

    ESRI_FEATURE_SERVER: {
        "id":"48980c5bad0c8d4666b393874eb5279a",
        "uri":"http://www.geoplatform.gov/spec/esri-feature-rest",
        "type":"dct:Standard",
        "description":"Esri ArcGIS Feature Server REST API",
        "label":"Esri REST Feature Service"
    },

    ESRI_IMAGE_SERVER: {
        "id":"bcdf764e52064c84323f3f1baea7e245",
        "uri":"http://www.geoplatform.gov/spec/esri-image-rest",
        "type":"dct:Standard",
        "description":"Esri ArcGIS Image Server REST API",
        "label":"Esri REST Image Service"
    },

    ESRI_MAP_SERVER: {
        "id":"370cf6ca5d91c07b63329b8384fe76c7",
        "uri":"http://www.geoplatform.gov/spec/esri-map-rest",
        "type":"dct:Standard",
        "description":"Esri ArcGIS Map Server REST API",
        "label":"Esri REST Map Service"
    },

    ESRI_TILE_SERVER: {
        "id": "c75570ff2523b1a1631afe7ddac27beb",
        "uri": "http://www.geoplatform.gov/spec/esri-tile-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Tile Server REST API",
        "label": "Esri REST Tile Service"
    },

    KML: {
        "id":"c0b39ca2049ba2184472ff27408ffd7e",
        "uri":"http://opengis.net/spec/kml",
        "type":"dct:Standard",
        "description":"OGC Keyhole Markup Language (KML)",
        "label":"OGC Keyhole Markup Language (KML)"
    },

    CSW: {
        "id":"60de6a422475493b7901ae453d6f4562",
        "uri":"http://opengis.net/spec/csw",
        "type":"dct:Standard",
        "description":"OGC Web Catalog Service (CSW)",
        "label":"OGC Web Catalog Service (CSW)"
    },

    WCS: {
        "id":"a7e5a2d81a83d4eae9bf9138f24d0a32",
        "uri":"http://opengis.net/spec/wcs",
        "type":"dct:Standard",
        "description":"OGC Web Coverage Service (WCS)",
        "label":"OGC Web Coverage Service (WCS)"
    },

    WFS: {
        "id":"e70e43ed52f83634285a09e959734bff",
        "uri":"http://opengis.net/spec/wfs",
        "type":"dct:Standard",
        "description":"OGC Web Feature Service (WFS)",
        "label":"OGC Web Feature Service (WFS)"
    },

    WMS: {
        "id":"abed5a00c536fb2d7019092c37ed634c",
        "uri":"http://opengis.net/spec/wms",
        "type":"dct:Standard",
        "description":"OGC Web Map Service (WMS)",
        "label":"OGC Web Map Service (WMS)"
    },

    WMTS: {
        "id":"757858ae77cf8c602b39294c27632dd7",
        "uri":"http://opengis.net/spec/wmts",
        "type":"dct:Standard",
        "description":"OGC Web Map Tile Service (WMTS)",
        "label":"OGC Web Map Tile Service (WMTS)"
    },

    WMST: {
        "id": "faae5bff49b1144d500380cbc055c1e5",
        "uri": "http://www.geoplatform.gov/spec/ogc-wms-t",
        "type": "dct:Standard",
        "description": "OGC WMS support for temporal according to OGC Best Practice guidance",
        "label": "OGC WMS-T Service"
    },

    FEED: {
        "id": "8edc61870e534a1f23dc967753da3b72",
        "uri": "http://www.geoplatform.gov/spec/feed",
        "type": "dct:Standard",
        "description": "GeoPlatform GeoJSON Feed Service converts an Atom/RSS feed (including GeoRSS and CAP extensions) to GeoJSON",
        "label": "GeoPlatform GeoJSON Feed Service"
    },

    //
    //method to allow refreshing list later
    refresh: updateList
};

function updateList(service : ItemService) {

    let url = Config.ualUrl;
    if(!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
    } else {

        let query = QueryFactory()
            .types('dct:Standard')
            .resourceTypes('ServiceType')
            .pageSize(50);


        let svc = null;
        //if a service was provided to be used, use it
        if(service && typeof(service.search) !== 'undefined') {
            svc = service;
        } else { // otherwise, use defaults
            svc = new ItemService(url, new JQueryHttpClient());
        }

        svc.search(query).then( data => {

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
