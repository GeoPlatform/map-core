import { ItemService } from 'geoplatform.client';
declare var types: {
    ESRI_FEATURE_SERVER: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    ESRI_IMAGE_SERVER: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    ESRI_MAP_SERVER: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    ESRI_TILE_SERVER: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    KML: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    CSW: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    WCS: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    WFS: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    WMS: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    WMTS: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    WMST: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    FEED: {
        "id": string;
        "uri": string;
        "type": string;
        "description": string;
        "label": string;
    };
    refresh: typeof updateList;
};
declare function updateList(service: ItemService): void;
export default types;
