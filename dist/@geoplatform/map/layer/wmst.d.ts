import { TileLayer } from 'leaflet';
import * as TimeDimension from 'leaflet-timedimension/dist/leaflet.timedimension.min';
declare class WMST extends TimeDimension.Layer.WMS {
    private _baseLayer;
    constructor(layer: TileLayer.WMS, opts?: any);
    _parseTimeDimensionFromCapabilities(xml: any): any;
    _getTimesFromLayerCapabilities(layer: any): any;
}
declare function wmst(gpLayer: any): WMST;
export { WMST as default, WMST, wmst };
