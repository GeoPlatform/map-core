import { Map, TileLayer, Point, Coords } from 'leaflet';
declare class EsriTileLayer extends TileLayer {
    private _url;
    private _crs;
    private esriParams;
    private defaultESRIParams;
    constructor(url: any, options: any);
    initialize(url: any, options: any): void;
    onAdd(map: Map): this;
    getTileUrl(tilePoint: Coords): string;
    setParams(params: any, noRedraw: any): this;
    _getSubdomain(tilePoint: Point): string;
}
export default EsriTileLayer;
