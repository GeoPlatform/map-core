import { Layer } from 'leaflet';
/**
 * Clustered Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
 */
declare var ClusteredFeatureLayer: any;
/**
 * @param layer - GeoPlatform Layer object
 * @param options - optional properties
 * @return leaflet layer instance or null
 */
declare function clusteredFeatures(layer: any, options: any): Layer;
/**
 * @param  layer - GeoPlatform Layer object
 * @param  options - optional properties
 * @return leaflet layer instance or null
 */
declare function geoJsonFeed(layer: any, options: any): Layer;
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
