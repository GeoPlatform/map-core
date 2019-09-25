import { Control } from 'leaflet';
declare var loadingControl: (new (...args: any[]) => {
    options: {
        position: string;
        separate: boolean;
        zoomControl: any;
        spinjs: boolean;
        spin: {
            lines: number;
            length: number;
            width: number;
            radius: number;
            rotate: number;
            top: string;
        };
    };
    initialize: (options: any) => void;
    onAdd: (map: any) => any;
    onRemove: (map: any) => void;
    removeFrom: (map: any) => any;
    addLoader: (id: any) => void;
    removeLoader: (id: any) => void;
    updateIndicator: () => void;
    isLoading: () => boolean;
    _countLoaders: () => number;
    _showIndicator: () => void;
    _hideIndicator: () => void;
    _handleLoading: (e: any) => void;
    _handleLoad: (e: any) => void;
    getEventId: (e: any) => any;
    _layerAdd: (e: any) => void;
    _addLayerListeners: (map: any) => void;
    _removeLayerListeners: (map: any) => void;
    _addMapListeners: (map: any) => void;
    _removeMapListeners: (map: any) => void;
}) & typeof Control;
export default loadingControl;
