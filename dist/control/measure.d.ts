import { Control } from 'leaflet';
declare var measureControl: (new (...args: any[]) => {
    options: {
        position: string;
    };
    onAdd: (map: any) => HTMLElement;
    _createButton: (html: any, title: any, className: any, container: any, fn: any, context: any) => HTMLElement;
    _toggleMeasure: () => void;
    _startMeasuring: () => void;
    _stopMeasuring: () => void;
    _mouseMove: (e: any) => void;
    _mouseClick: (e: any) => void;
    _finishPath: () => void;
    _restartPath: () => void;
    _createTooltip: (position: any) => void;
    _updateTooltipPosition: (position: any) => void;
    _updateTooltipDistance: (total: any, difference: any) => void;
    _round: (val: any) => number;
    _onKeyDown: (e: any) => void;
}) & typeof Control;
export default measureControl;
