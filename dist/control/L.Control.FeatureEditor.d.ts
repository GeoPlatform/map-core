import { Layer } from 'leaflet';
import MapInstance from '../map/instance';
interface FeatureLayer extends Layer {
    feature: any;
    geometry: any;
    properties: {
        [key: string]: any;
        id: string;
    };
    toGeoJSON(): any;
    setStyle(args: any): any;
}
export default class FeatureEditor {
    private map;
    private feature;
    private originalFeature;
    private editingLayer;
    private tool;
    private visible;
    constructor(map: MapInstance, feature: FeatureLayer, options?: any);
    /**
     *
     */
    disable(): void;
    /**
     *
     */
    unregisterTool(): void;
    /**
     * @param bool - flag specifying the visibility of the original feature being edited
     */
    showOriginalLayer(bool: any): void;
    /**
     *
     */
    beginEditing(): void;
    /**
     * @param save - flag specifying whether to persist changes to the feature
     */
    doneEditing(save?: boolean): void;
    /**
     *
     */
    addProperty(): void;
    /**
     *
     */
    highlightFeature(): void;
    /**
     *
     */
    deleteFeature(): void;
    /**
     * update rendered feature with latest info
     */
    updateFeature(): void;
    /**
     *
     */
    cancelEditing(): void;
}
export {};
