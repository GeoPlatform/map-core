import * as Q from "q";
import { LayerService } from '@geoplatform/client';
declare const _default: {
    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    test: (layer: any) => number;
    get: (layerService?: LayerService) => Q.Promise<any>;
};
/**
 * @param {LayerService} layerService - optional, GeoPlatform Layer service to use to fetch the layer
 * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
 */
export default _default;
