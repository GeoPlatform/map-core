import { Layer } from "leaflet";
import { LayerService } from 'geoplatform.client';
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
    create(layer: any): Layer;
    init(): void;
}
declare const _default: LayerFactory;
export default _default;
