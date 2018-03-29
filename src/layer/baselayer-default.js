
import Q from 'q';
import OSM from './osm';
import GeoPlatformClient from 'geoplatform.client';


const url = GeoPlatformClient.Config.ualUrl;
const baseLayerId = GeoPlatformClient.Config.defaultBaseLayerId;
const LayerService = GeoPlatformClient.LayerService;
const HttpClient = GeoPlatformClient.JQueryHttpClient;

/**
 * If a default base layer is defined using the 'defaultBaseLayer'
 * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
 * @param {LayerService} layerService - GeoPlatform Layer service to use to fetch the layer
 * @return {Promise} resolving GeoPlatform Layer object
 */
export default function(layerService) {
    if(!GeoPlatformClient.Config.defaultBaseLayerId)
        return OSM.get();

    if(!layerService)
        layerService = new LayerService(url, new HttpClient());
    return layerService.get(baseLayerId)
    .catch(e => Q.resolve( OSM.get() ));
}
