declare const _default: {
    /**
     * @param  layer - GeoPlatform Layer object
     * @return boolean, true if is an OSM layer
     */
    test: (layer: any) => number;
    get: (layerService?: any) => any;
};
/**
 * @param layerService - optional, LayerService to use to fetch the layer
 * @return Promise resolving OpenStreet Map GeoPlatform Layer
 */
export default _default;
