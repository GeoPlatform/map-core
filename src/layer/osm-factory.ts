
import { TileLayer } from 'leaflet';


/**
 * @param layer - GeoPlatform Layer
 * @return
 */
function OSMLayerFactory() : TileLayer {

    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
}

export default OSMLayerFactory;
