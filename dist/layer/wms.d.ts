import { Map, TileLayer, LatLng } from 'leaflet';
import { Layer as LayerModel } from '@geoplatform/client';
declare class WMS extends TileLayer.WMS {
    private _enabled;
    constructor(url: string, opts?: any);
    enableGetFeatureInfo(): void;
    disableGetFeatureInfo(): void;
    isGetFeatureInfoEnabled(): boolean;
    onRemove(map: Map): this;
    getFeatureInfo(evt: any): void;
    getFeatureInfoUrl(latlng: LatLng): string;
    parseGetFeatureInfo(content: any): string;
    showGetFeatureInfo(err: Error, latlng: LatLng, content: any): void;
}
/**
 * short-form function for instantiating a WMS-based Layer's Leaflet instance
 */
declare function wms(layer: LayerModel): WMS;
export { WMS as default, WMS, wms };
