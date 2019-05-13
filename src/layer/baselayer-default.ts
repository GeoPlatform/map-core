
import * as Q from 'q';
import OSM from './osm';
import { Config, LayerService, JQueryHttpClient } from 'geoplatform.client';


const WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';

var DefaultBaseLayer = {

    get: function(layerService : LayerService) {
        if(!layerService) {
            layerService = new LayerService(Config.ualUrl, new JQueryHttpClient());
        }
        let baseLayerId = Config.defaultBaseLayerId || WORLD_STREET_LAYER;
        return layerService.get(baseLayerId)
            .catch( (e : Error) => {
                return OSM.get();
            });
    },

    set: function(layer : any) {
        let id = null;
        if(layer && layer.id) id = layer.id;
        else if(layer && typeof(layer) === 'string') id = layer;
        if(id) {
            Config.configure({'defaultBaseLayerId': layer.id});
        }
    }
};

export default DefaultBaseLayer;
