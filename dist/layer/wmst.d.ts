import { TileLayer } from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
declare const WMST_base: any;
declare class WMST extends WMST_base {
    private _baseLayer;
    constructor(layer: TileLayer.WMS, opts?: any);
    _parseTimeDimensionFromCapabilities(xml: any): any;
    _getTimesFromLayerCapabilities(layer: any): any;
}
declare function wmst(gpLayer: any): WMST;
export { WMST as default, WMST, wmst };
