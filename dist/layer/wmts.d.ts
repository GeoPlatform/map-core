import { Map, TileLayer, Point } from 'leaflet';
declare class WMTS extends TileLayer {
    private _url;
    private _crs;
    private matrixIds;
    private wmtsParams;
    private defaultWmtsParams;
    constructor(url: string, options?: any);
    initialize(url: any, options: any): void;
    onAdd(map: Map): this;
    getTileUrl(coords: Point): string;
    setParams(params: any, noRedraw: any): this;
    getDefaultMatrix(): any[];
    _getSubdomain(tilePoint: Point): string;
}
declare function wmts(layer: any): WMTS;
export { WMTS as default, WMTS, wmts };
