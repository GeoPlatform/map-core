import { Control } from 'leaflet';
declare var positionControl: (new (...args: any[]) => {
    options: {
        position: string;
        separator: string;
        emptyString: string;
        lngFirst: boolean;
        numDigits: number;
        lngFormatter: any;
        latFormatter: any;
        prefix: string;
    };
    onAdd: (map: any) => any;
    onRemove: (map: any) => void;
    _onMouseMove: (e: any) => void;
}) & typeof Control;
export default positionControl;
