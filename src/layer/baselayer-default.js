
import Q from 'q';
import OSM from './osm';
import GeoPlatformClient from 'geoplatform.client';

const LayerService = GeoPlatformClient.LayerService;
const HttpClient = GeoPlatformClient.JQueryHttpClient;

const WORLD_STREET_LAYER = '54332da33818de0ca72cd210f3e68832';

var DefaultBaseLayer = {

    get: function(layerService) {
        if(!layerService) {
            layerService = new LayerService(GeoPlatformClient.Config.ualUrl, new HttpClient());
        }
        let baseLayerId = GeoPlatformClient.Config.defaultBaseLayerId || WORLD_STREET_LAYER;
        return layerService.get(baseLayerId).catch(e => Q.resolve( OSM.get() ));
    },

    set: function(layer) {
        let id = null;
        if(layer && layer.id) id = layer.id;
        else if(layer && typeof(layer) === 'string') id = layer;
        if(id) {
            GeoPlatformClient.Config.configure({'defaultBaseLayerId': layer.id});
        }
    }
};

export default DefaultBaseLayer;
