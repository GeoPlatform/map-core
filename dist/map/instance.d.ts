import { Map, Layer, LatLngBounds, FeatureGroup } from 'leaflet';
import { ItemService, MapService } from '@geoplatform/client';
declare class Listener {
    _listeners: any;
    constructor();
    on(type: any, listener: any): void;
    off(type: any, listener: any): void;
    notify(type: any, ...options: any[]): void;
}
export default class MapInstance extends Listener {
    private svcCache;
    private serviceFactory;
    private httpClient;
    _key: string;
    private _mapId;
    private _mapDef;
    private _mapInstance;
    private _defaultExtent;
    private _baseLayerDef;
    private _baseLayer;
    private _layerStates;
    private _layerCache;
    private _layerErrors;
    private _layerErrorHandler;
    private _featureLayer;
    private _featureLayerVisible;
    private _tools;
    private state;
    private _geoJsonLayerOpts;
    constructor(key: any);
    dispose(): void;
    getKey(): string;
    /**
     * Override default (JQuery-based) map service used by this instance
     * @param mapService - service to use to CRUD map objects
     * @deprecated use setServiceFactory instead
     */
    setService(mapService: MapService): void;
    /**
     * @param factory - GeoPlatform ServiceFactory to instantiate services for maps and layers
     */
    setServiceFactory(factory: any): void;
    /**
     * @param httpClient - HttpClient impl to use with the new factory
     */
    setHttpClient(httpClient: any): void;
    /**
     * @param type - GeoPlatform Object model type to support ("Map", "Layer", etc)
     * @return item service implementation for the requested type
     */
    getService(type: string): ItemService;
    /**
     * @param fn - callback when an error is encountered
     */
    setErrorHandler(fn: any): void;
    getLayerStateIndex(layerId: any): number;
    getLayerState(layerId: any): any;
    initializeMapDefinition(): {
        type: any;
        title: string;
        label: string;
        description: string;
        createdBy: any;
        baseLayer: any;
        layers: any[];
        keywords: any[];
        themes: any[];
        resourceTypes: string[];
    };
    /**
     * @param metadata object
     * @return object definition of the current map suitable for sending to WMVR
     */
    getMapResourceContent(metadata?: any): any;
    /**
     * @return Leaflet toolbar
     */
    getDrawControlToolbar(): any;
    /**
     * @param error Leaflet tile load error (.target is layer, .tile is image)
     */
    handleLayerError(error: any): void;
    /**
     * Given a Leaflet tile load error and the responsible layer id,
     * Try to isolate the cause of the error using the proxy
     * and notify listeners that an error has occurred
     */
    processLayerError(error: Error, id: string): void;
    /**
     * @param layerId - identifier of layer generating the error
     * @param errorMsg - message of the error
     */
    logLayerError(layerId: any, errorMsg: any): {
        id: any;
        message: any;
    };
    touch(event?: any, ...options: any[]): void;
    clean(): void;
    setMap(map: Map): void;
    /**
     * @return  map instance
     */
    getMap(): Map;
    /** @return definition of map */
    getMapDefinition(): any;
    /** @return identifier of map */
    getMapId(): string;
    /**
     * Focuses the map on the specified lat/lng coordinate
     * @param lat number
     * @param lng number
     * @param zoom number (optional)
     */
    setView(lat: number, lng: number, zoom?: number): void;
    /**
     * Retrieve the current center of the map
     * @return [lat,lng]
     */
    getView(): number[];
    /**
     * @return integer current zoom level of the map
     */
    getZoom(): number;
    /**
     * Zoom to the map's default extent
     * If the map is saved, this will be the saved viewport
     * otherwise, it will be CONUS
     */
    zoomToDefault(): void;
    /**
     * @param extent - either a GP extent object or Leaflet LatLngBounds object
     */
    setExtent(extent: LatLngBounds | any): void;
    /**
     * @param layer Leaflet Layer instance or object definition
     */
    setBaseLayer(layer: any): void;
    /**
     * @return array of base layers definitions that can be used
     */
    getBaseLayer(): any;
    /**
     * @return list of layer states containing layer information
     */
    getLayers(): any[];
    getLayerErrors(): any[];
    clearLayerErrors(): void;
    clearOverlays(): void;
    /**
     * @param layers - list of layers (NOTE: not wrapped by layer states, this method applies that)
     */
    addLayers(layers: any | any[]): void;
    /**
     * @param layer - GeoPlatform Layer instance
     * @param state - GeoPlatform Layer State
     */
    addLayerWithState(layer: any, state: any): void;
    /**
     * @param from - position of layer being moved
     * @param to - desired position to move layer to
     */
    moveLayer(from: number, to: number): void;
    /**
     * set the z-index of each layer on the map based upon their position in the
     * list of layers on the map
     */
    updateZIndices(): void;
    /**
     *
     */
    removeLayer(id: any): void;
    /**
     *
     */
    toggleLayerVisibility(id: any): void;
    /**
     * Note: this does not update layer definition state. Use
     * MapInstance.toggleLayerVisibility to do that and adjust
     * rendered layer's visibility.
     *
     * @param layerInstance - leaflet layer instance
     * @param visible - flag indicating visibility of layer
     */
    setLayerVisibility(layerInstance: Layer, visible: boolean): void;
    /**
     *
     */
    updateLayerOpacity(id: string, opacity: number): void;
    /**
     * Note: this method does not update the associated Layer Definition
     * state value for opacity. Use MapInstance.updateLayerOpacity() to
     * both update state and adjust rendered layer.
     *
     * @param layerInstance - leaflet layer instance
     * @param opacity - value between 0 and 1.0 or 0 and 100
     * @return normalized opacity value between 0 and 1.0
     */
    setLayerOpacity(layerInstance: Layer, opacity: number): number;
    /**
     * @param GeoPlatform Layer instance
     * @return Leaflet layer instance representing that layer or null
     */
    getLeafletLayerFor(gpLayer: any): Layer;
    /**
     *
     */
    toggleGetFeatureInfo(layerId: string): void;
    /**
     * @return array of features on the map
     */
    getFeatures(): any[];
    /**
     * @param json geojson object or array of geojson objects
     */
    addFeatures(json: any): void;
    /**
     * @param json geojson object
     */
    addFeature(json: any, fireEvent?: boolean): void;
    /**
     * @param featureJson object defining a GeoJSON feature
     */
    updateFeature(featureJson: any): void;
    /**
     * Replace an existing L.Path-based layer with one using
     * the supplied Feature GeoJSON object.  Removes the existing
     * layer and adds a new one created from the GeoJSON.
     *
     * @param featureJson object defining GeoJSON feature
     */
    replaceFeature(featureJson: any): void;
    /**
     * @param featureId identifier of feature to focus the map on
     */
    focusFeature(featureId: string): void;
    /**
     * @param featureId : string
     */
    removeFeature(featureId: any): void;
    /**
     *
     */
    removeFeatures(): void;
    /**
     *
     */
    getFeatureLayer(featureId?: string): FeatureGroup;
    toggleFeaturesLayer(): boolean;
    /**
     * @param  feature - Leaflet feature instance
     * @param  visibility - flag
     */
    setFeatureVisibility(feature: any, visibility: boolean): void;
    getFeaturesLayerVisibility(): boolean;
    addFeatureLayer(layer: any): void;
    /**
     * Internal method, use 'addFeatureLayer' instead
     * @param layer
     */
    _addFeatureLayer(layer: Layer): void;
    setFeatureLayerVisibility(layer: any, visibility: any): void;
    /**
     * @param metadata
     * @return resolving persisted map
     */
    save(metadata: any): Promise<any>;
    /**
     * @param md object containing metadata properties for map
     */
    saveMap(md: any): Promise<any>;
    /**
     * Retrieve a map's descriptor from the registry
     * @param mapId identifier of map
     * @return resolving the map object
     */
    fetchMap(mapId: string): any;
    /**
     * Retrieve a map's descriptor and load it as the
     * current map managed by this service
     * @param mapId identifier of map
     * @return resolving the map object
     */
    loadMap(mapId: string): any;
    /**
     * Load a map from its descriptor as the current
     * map managed by this service
     * @param map object
     */
    loadMapFromObj(map: any): void;
    /**
     * @param extent
     * @return corrected or default extent
     */
    ensureExtent(extent: any): any;
    /**
     *
     */
    destroyMap(): void;
    /**
     * Used to take an existing map that is already persisted on the
     * server and unlink it here in the client so that it will be saved
     * as a completely new map when mapService.saveMap(...) is next called
     */
    setAsNewMap(mapToUse: any): void;
    registerTool(id: any, tool: any): void;
    unregisterTool(id: any): void;
    enableTool(id: any, finish: any): boolean;
    cacheMap(): void;
    restoreMap(): void;
}
export {};
