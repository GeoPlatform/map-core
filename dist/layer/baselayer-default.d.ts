import * as Q from 'q';
import { LayerService } from '@geoplatform/client';
declare var DefaultBaseLayer: {
    get: (layerService: LayerService) => Q.Promise<any>;
    set: (layer: any) => void;
};
export default DefaultBaseLayer;
