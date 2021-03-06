
import * as Q from "q";
import { LayerResourceTypes } from "../shared/resource-types";
import {
    QueryFactory, LayerService, XHRHttpClient, Config
}  from '@geoplatform/client';


/**
 * @param layerService - optional, LayerService to use to fetch the layer
 * @return Promise resolving OpenStreet Map GeoPlatform Layer
 */
export default {

    /**
     * @param  layer - GeoPlatform Layer object
     * @return boolean, true if is an OSM layer
     */
    test : function(layer) {
        return  layer &&
                layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM);
    },

    get : function(layerService ?: LayerService) : any {
        let query = QueryFactory()
            .fields('*')
            .resourceTypes(LayerResourceTypes.OSM);
        if(!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
        .then( response => response.results.length ? response.results[0] : null);
    }

};
