import { Map, TileLayer, LatLng } from 'leaflet';
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
declare function wms(layer: any): WMS;
export { WMS as default, WMS, wms };
