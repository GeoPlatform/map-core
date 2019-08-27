import { Layer as LeafletLayer } from "leaflet";
import { Layer as GeoPlatformLayer } from '@geoplatform/client';
declare function mapBoxVectorTileLayer(layer: GeoPlatformLayer): LeafletLayer;
/**
 * @param layer GeoPlatform Layer object
 * @param leafletLayer GridLayer instance representing the GP Layer object specified
 * @param styleResource GP Auxillary Resource object
 */
declare function applyVectorTileStyle(layer: GeoPlatformLayer, leafletLayer: LeafletLayer, styleResource: any): void;
export { mapBoxVectorTileLayer as default, mapBoxVectorTileLayer, applyVectorTileStyle };
