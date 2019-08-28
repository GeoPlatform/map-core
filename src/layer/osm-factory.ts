
import { TileLayer } from 'leaflet';
import { Config } from '@geoplatform/client';


/**
 * @param layer - GeoPlatform Layer
 * @return
 */
function OSMLayerFactory() : TileLayer {

    let opts : any = {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    };
    if(Config.leafletPane) opts.pane = Config.leafletPane;
    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', opts);
}

export default OSMLayerFactory;
