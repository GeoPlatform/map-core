import { Layer } from "leaflet";
import { LayerService, Layer as LayerModel } from '@geoplatform/client';
/**
 * Layer Factory
 *
 * Used to instantiate GeoPlatform Layer objects as Leaflet layer instances
 * capable of being rendered on Leaflet maps.
 *
 * Usage:
 *      let leafletLayer = LayerFactory.create(gpLayerObj);
 *
 *
 * Basic layer support is built in, but additional layer types can be supported
 * by registering new factory methods.
 *
 * Example:
 *      LayerFactory.register( (gpLayerObj) => {
 *          let isSupported = false;
 *          //implement test to verify supported layer type
 *          // ...
 *          if(isSupported) {
 *              return new MyCustomLayerClass(gpLayerObj);
 *          }
 *          return null;
 *      });
 *
 */
declare class LayerFactory {
    private factories;
    private service;
    constructor();
    register(fn: Function): void;
    setLayerService(service: LayerService): void;
    /**
     */
    getStyleResolver(): Function;
    /**
     * @param layer - GP Layer object
     * @return leaflet layer instance or null
     */
    create(layer: LayerModel): Layer;
    init(): void;
}
declare const _default: LayerFactory;
export default _default;
