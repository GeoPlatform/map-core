/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { FeatureGroup, Control, GeoJSON, DomUtil } from 'leaflet';
import { Draw } from 'leaflet-draw';
/**
 * @record
 */
function EditControlOptions() { }
/** @type {?} */
EditControlOptions.prototype.featureGroup;
/**
 * @record
 */
function FeatureLayer() { }
/** @type {?} */
FeatureLayer.prototype.feature;
/** @type {?} */
FeatureLayer.prototype.geometry;
/** @type {?} */
FeatureLayer.prototype.properties;
/** @type {?} */
FeatureLayer.prototype.toGeoJSON;
/** @type {?} */
FeatureLayer.prototype.setStyle;
export default class FeatureEditor {
    /**
     * @param {?} map
     * @param {?} feature
     * @param {?=} options
     */
    constructor(map, feature, options) {
        this.map = map;
        this.feature = feature;
        this.visible = false;
    }
    /**
     *
     * @return {?}
     */
    disable() {
        this.doneEditing(false);
        this.unregisterTool();
    }
    /**
     *
     * @return {?}
     */
    unregisterTool() {
        if (this.tool) {
            this.tool.deactivate();
            /** @type {?} */
            let map = this.map.getMap();
            map.removeControl(this.tool);
            map.removeLayer(this.editingLayer);
        }
    }
    /**
     * @param {?} bool - flag specifying the visibility of the original feature being edited
     * @return {?}
     */
    showOriginalLayer(bool) {
        if (!this.feature)
            return;
        /** @type {?} */
        let id = this.feature.properties.id;
        /** @type {?} */
        let layer = this.map.getFeatureLayer(id);
        this.map.setFeatureVisibility(layer, bool);
    }
    /**
     *
     * @return {?}
     */
    beginEditing() {
        if (!this.visible)
            return;
        this.originalFeature = /** @type {?} */ (GeoJSON.geometryToLayer(this.feature.toGeoJSON()));
        this.feature.properties["_editing"] = true;
        /** @type {?} */
        let map = this.map.getMap();
        /** @type {?} */
        let feature = this.map.getFeatureLayer(this.feature.properties.id);
        if (!feature)
            return;
        /** @type {?} */
        let editingLayer = this.editingLayer = new FeatureGroup().addTo(map);
        //if the feature being edited is a multi-geometry
        // ("MultiPoint", "MultiLineString", "MultiPolygon", "GeometryCollection")
        // then we need to split them up into individual geometries and
        // add them as separate layers which will all be editable
        if (this.feature.geometry.type.indexOf("Multi") === 0) {
            /** @type {?} */
            let type = this.feature.geometry.type.replace("Multi", "");
            this.feature.geometry.coordinates.each((childCoords) => {
                /** @type {?} */
                let shape = { type: type, coordinates: childCoords };
                new GeoJSON(shape, {
                    onEachFeature: (feature, layer) => {
                        editingLayer.addLayer(layer);
                    }
                });
            });
        }
        else if (this.feature.geometry.type === 'GeometryCollection') {
            this.feature.geometry.geometries.each((childGeometry) => {
                new GeoJSON(childGeometry, {
                    onEachFeature: (feature, layer) => {
                        editingLayer.addLayer(layer);
                    }
                });
            });
        }
        else {
            new GeoJSON(feature.toGeoJSON()).eachLayer((layer) => {
                editingLayer.addLayer(layer);
            });
        }
        //make this feature invisible
        this.showOriginalLayer(false);
        //register LeafletDraw control with Edit mode only
        // using just the feature layer identified
        this.tool = new EditFeature(/** @type {?} */ ({
            featureGroup: editingLayer
        })).addTo(map);
        this.tool.activate();
    }
    /**
     * @param {?=} save - flag specifying whether to persist changes to the feature
     * @return {?}
     */
    doneEditing(save) {
        this.feature.properties["_editing"] = false;
        if (typeof (save) === 'undefined' || save) {
            //if geometry changed
            if (this.tool && this.tool.hasBeenEdited()) {
                /** @type {?} */
                let isMulti = ~this.feature.geometry.type.indexOf("Multi");
                /** @type {?} */
                let isGeomColl = this.feature.geometry.type === 'GeometryCollection';
                /** @type {?} */
                let geoms = [];
                /** @type {?} */
                let coords = [];
                /** @type {?} */
                let geometry;
                this.editingLayer.eachLayer((layer) => {
                    /** @type {?} */
                    let feature = (/** @type {?} */ (layer)).toGeoJSON();
                    geometry = feature.geometry;
                    if (isMulti) {
                        coords[coords.length] = geometry.coordinates;
                    }
                    else if (isGeomColl) {
                        geoms[geoms.length] = feature;
                    }
                });
                //update existing feature with edited information
                if (isMulti)
                    this.feature.geometry.coordinates = coords;
                else if (isGeomColl)
                    this.feature.geometry.geometries = geoms;
                else
                    this.feature.geometry = geometry;
                //inform Map of change
                this.map.replaceFeature(this.feature);
            }
            else {
                //restore original layer
                this.showOriginalLayer(true);
                //redraw feature with new style info
                this.map.updateFeature(this.feature);
            }
        }
        else {
            //restore original layer (only if feature is to be visible)
            this.showOriginalLayer(this.visible);
            //Redraw feature which has been updated with
            // original style information (reset)
            this.map.updateFeature(this.feature);
        }
        //lastly, break down the editing tool
        if (this.tool)
            this.unregisterTool();
    }
    /**
     *
     * @return {?}
     */
    addProperty() {
    }
    /**
     *
     * @return {?}
     */
    highlightFeature() {
        this.map.focusFeature(this.feature.properties.id);
    }
    /**
     *
     * @return {?}
     */
    deleteFeature() {
        this.map.removeFeature(this.feature.properties.id);
    }
    /**
     * update rendered feature with latest info
     * @return {?}
     */
    updateFeature() {
        //if not editing a temporary feature...
        if (!this.editingLayer)
            this.map.updateFeature(this.feature);
        else {
            /** @type {?} */
            let style = this.feature.properties["style"];
            this.editingLayer.eachLayer((layer) => {
                //do nothing for markers
                if ((/** @type {?} */ (layer)).feature.geometry.type !== 'Point') {
                    (/** @type {?} */ (layer)).setStyle(style);
                }
            });
        }
    }
    /**
     *
     * @return {?}
     */
    cancelEditing() {
        this.feature = this.originalFeature;
        this.doneEditing(false);
    }
}
if (false) {
    /** @type {?} */
    FeatureEditor.prototype.map;
    /** @type {?} */
    FeatureEditor.prototype.feature;
    /** @type {?} */
    FeatureEditor.prototype.originalFeature;
    /** @type {?} */
    FeatureEditor.prototype.editingLayer;
    /** @type {?} */
    FeatureEditor.prototype.tool;
    /** @type {?} */
    FeatureEditor.prototype.visible;
}
/**
 *
 */
class EditFeature extends Control {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super(Object.assign({
            position: 'bottomright',
            draw: false,
            edit: false
        }, options || {}));
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        this.map = map;
        this.enabled = false;
        /** @type {?} */
        let opts = {};
        //needed or else L.EditToolbar.Edit fails to addHooks for PolyLine features
        (/** @type {?} */ (opts)).selectedPathOptions = {
            dashArray: '10, 10',
            fill: true,
            fillColor: '#fe57a1',
            fillOpacity: 0.1,
            // Whether to user the existing layers color
            maintainColor: false
        };
        (/** @type {?} */ (opts)).featureGroup = (/** @type {?} */ (this.options)).featureGroup;
        this.handler = new Draw.EditToolbar.Edit(map, opts);
        /** @type {?} */
        var container = DomUtil.create('div', 'leaflet-edit-feature');
        return container;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onRemove(map) {
        this.deactivate();
    }
    /**
     * @return {?}
     */
    activate() {
        this.enabled = true;
        this.handler.enable();
    }
    /**
     * @return {?}
     */
    deactivate() {
        this.enabled = false;
        this.handler.disable();
    }
    /**
     * @return {?}
     */
    hasBeenEdited() {
        /** @type {?} */
        var result = false;
        if ((/** @type {?} */ (this.options)).featureGroup) {
            (/** @type {?} */ (this.options)).featureGroup.eachLayer(function (layer) {
                result = result || layer.edited;
            });
        }
        return result;
    }
}
if (false) {
    /** @type {?} */
    EditFeature.prototype.map;
    /** @type {?} */
    EditFeature.prototype.enabled;
    /** @type {?} */
    EditFeature.prototype.handler;
}
// import {
//     Map, Layer, FeatureGroup, Control, GeoJSON, popup,
//     Util, DomUtil, DomEvent, Evented
// } from 'leaflet';
// import * as Editable from "leaflet-editable";
//
// import MapInstance from '../map/instance';
//
//
//
//
//
// const CALLBACKS = {
//     'marker'    : 'startMarker',
//     'line'      : 'startPolyline',
//     'polygon'   : 'startPolygon',
//     'rectangle' : 'startRectangle',
//     'circle'    : 'startCircle'
// };
//
//
// export const Events = {
//     FEATURE_CREATED: 'feature:created',
//     FEATURE_REMOVED: 'feature:removed',
//     FEATURE_EDITED: 'feature:edited'
// };
//
//
// export default class FeatureEditor extends Evented {
//
//     private map : MapInstance;
//     private editor : Editable;
//     private editLayer : FeatureGroup;
//     private featuresLayer : FeatureGroup;
//
//     constructor(map : MapInstance, options ?: any) {
//         super();
//
//         this.map = map;
//
//         let leafletMap : Map = map.getMap();
//         if(!leafletMap) throw new Error("No Leaflet map is configured");
//
//         this.featuresLayer = map.getFeatureLayer();
//
//         this.editLayer = new FeatureGroup();
//         this.editLayer.addTo(leafletMap);
//
//         let opts : any = {};
//         Object.assign(opts, options||{}, {
//             //editLayer : ...
//             featuresLayer : this.editLayer //map.getFeatureLayer()
//             // drawingCSSClass: 'leaflet-editable-drawing',
//             // drawingCursor: 'crosshair',
//             // skipMiddleMarkers: true
//         });
//
//         //create and register editable instance on leaflet map
//         let editor = new Editable(leafletMap, opts);
//         (leafletMap as any).editTools = editor;
//         this.editor = editor;
//
//         this.editor.on('editable:drawing:end', (event : any) => {
//             //have to wrap handler in a timeout in order to not inadvertently
//             // block the clean up of event handlers within Editable
//             setTimeout(() => { this.onFeatureCreated(event) },50);
//         });
//         // this.editor.on('editable:editing', (event : any) => { this.onFeatureEdited(event) })
//
//         this.editor.on('editable:drawing:start', (event: any) => console.log("Drawing Start") );
//         this.editor.on('editable:drawing:end', (event: any) => console.log("Drawing End") );
//         this.editor.on('editable:drawing:cancel', (event: any) => console.log("Drawing Cancel") );
//         this.editor.on('editable:drawing:commit', (event: any) => console.log("Drawing Commit") );
//
//         this.editor.on(
//             'editable:drawing:start editable:drawing:end ' +
//             'editable:drawing:cancel editable:drawing:commit ' +
//             'editable:drawing:mousedown editable:drawing:mouseup ' +
//             'editable:drawing:click editable:drawing:move ' +
//             'editable:drawing:clicked',
//             (event : any) => {
//                 console.log("Editor event: " + event.type);
//                 if(event.layer && event.layer.options.popup) {
//                     this.updateFeaturePopup(event.layer, event.layer.options.popup);
//                 }
//             }
//         );
//
//         this.editor.on(
//             'editable:vertex:new editable:vertex:click ' +
//             'editable:vertex:clicked editable:vertex:rawclick ' +
//             'editable:vertex:deleted editable:vertex:ctrlclick ' +
//             'editable:vertex:shiftclick editable:vertex:metakeyclick ' +
//             'editable:vertex:altclick editable:vertex:contextmenu ' +
//             'editable:vertex:mousedown editable:vertex:drag ' +
//             'editable:vertex:dragstart editable:vertex:dragend ' +
//             'editable:middlemarker:mousedown',
//             (event : any) => {
//                 console.log("Vertex event: " + event.type);
//                 // if(event.layer && event.layer.options.popup) {
//                 //     this.updateFeaturePopup(event.layer, event.layer.options.popup);
//                 // }
//             }
//         );
//
//         if(opts.marker) {
//             leafletMap.addControl(new EditControl({
//                 position: opts.position || 'topleft',
//                 callback: editor[CALLBACKS.marker],
//                 kind: 'marker',
//                 html: opts.marker.icon ? opts.marker.icon : '🖈'
//             }));
//         }
//         if(opts.line) {
//             leafletMap.addControl(new EditControl({
//                 position: opts.position || 'topleft',
//                 callback: editor[CALLBACKS.line],
//                 kind: 'line',
//                 html: opts.line.icon ? opts.line.icon : '\\/\\'
//             }));
//         }
//         if(opts.polygon) {
//             leafletMap.addControl(new EditControl({
//                 position: opts.position || 'topleft',
//                 callback: editor[CALLBACKS.polygon],
//                 kind: 'polygon',
//                 html: opts.polygon.icon ? opts.polygon.icon : '▰'
//             }));
//         }
//         if(opts.rectangle) {
//             leafletMap.addControl(new EditControl({
//                 position: opts.position || 'topleft',
//                 callback: editor[CALLBACKS.rectangle],
//                 kind: 'rectangle',
//                 html: opts.rectangle.icon ? opts.rectangle.icon : '⬛'
//             }));
//         }
//         if(opts.circle) {
//             leafletMap.addControl(new EditControl({
//                 position: opts.position || 'topleft',
//                 callback: editor[CALLBACKS.circle],
//                 kind: 'circle',
//                 html: opts.circle.icon ? opts.circle.icon : '⬤'
//             }));
//         }
//     }
//
//     isDrawing() : boolean {
//         return this.editor ? this.editor.drawing() : false;
//     }
//
//     cancel() {
//         if(this.editor) this.editor.stopDrawing();
//     }
//
//     /**
//      * @param feature Feature to be edited
//      */
//     enableFeatureEdit( feature : any ) {
//         if(!feature) return;
//
//         if(!feature.properties) feature.properties = {};
//
//         let fid =  this.getFeatureId(feature, true);
//
//         //make a clone of the feature to be edited
//         let json = (feature as any).toGeoJSON();
//         let editedLayer = GeoJSON.geometryToLayer(json);
//         Util.setOptions(editedLayer, { originalLayerId : fid });
//
//         //hide that feature on featuresLayer
//         this.map.setFeatureVisibility(feature, false);
//
//         //and add the editble clone of it to the edit layer
//         this.editLayer.addLayer(editedLayer);
//         (editedLayer as any).toggleEdit();
//     }
//
//     /**
//      * @param feature Feature being edited
//      */
//     applyFeatureEdit( feature : any ) {
//
//         let editedLayer = this.findEditedFeatureLayer(feature);
//         if(!editedLayer) return;
//
//         (editedLayer as any).toggleEdit();                   //turn off editor
//
//         let json = (editedLayer as any).toGeoJSON();
//         this.editLayer.removeLayer(editedLayer);    //remove from edit layer
//
//         // let updatedLayer = GeoJSON.geometryToLayer(json);
//         this.map.replaceFeature(json);
//         this.map.setFeatureVisibility(feature, true);
//
//     }
//
//     /**
//      * @param feature Feature being edited
//      */
//     cancelFeatureEdit( feature : any ) {
//
//         let editedLayer = this.findEditedFeatureLayer(feature);
//         if(!editedLayer) return;
//
//         (editedLayer as any).toggleEdit();                   //turn off editor
//         this.editLayer.removeLayer(editedLayer);    //and remove from edit layer
//
//         //re-show the original feature layer
//         this.map.setFeatureVisibility(feature, true);
//
//     }
//
//     /**
//      * @param feature Feature Layer associated with an editable feature
//      * @return editable Feature Layer assocaited with the specified parameter Feature Layer
//      */
//     findEditedFeatureLayer( feature : any ) : Layer {
//         let editedLayer : Layer = null;
//         this.editLayer.eachLayer( (layer : any) => {
//             let fid = this.getFeatureId(layer);
//             if( !editedLayer && fid == layer.originalLayerId ) {
//                 editedLayer = layer as Layer;
//             }
//         });
//         return editedLayer;
//     }
//
//     /**
//      * @param feature Feature
//      * @param createAsNeeded flag indicating whether to create an ID if feature has none
//      * @return feature id or null
//      */
//     getFeatureId( feature : any , createAsNeeded ?: boolean) : string {
//         if(!feature) return null;
//         if(!feature.properties) feature.properties = {};
//         let featureId = feature.properties.id || null;
//         if(!featureId && true === createAsNeeded)
//             featureId = feature.properties.id = Math.round(Math.random()*9999);
//         return featureId;
//     }
//
//
//
//
//     onFeatureCreated(event : any) {
//         let feature : any = event.layer;
//
//         if( typeof(feature.editEnabled) !== 'undefined' && feature.editEnabled() ) {
//             feature.toggleEdit();
//         }
//
//         this.editLayer.removeLayer(feature);
//         if(this.featuresLayer) {
//             this.featuresLayer.addLayer(feature);
//             feature.on('dblclick', DomEvent.stop).on('dblclick', () => {
//
//                 (feature as any).toggleEdit();
//
//                 if(feature.editEnabled()) { //'editable:enable'
//                     //add a save and cancel btn...
//
//                     let latLng = null;
//                     if(typeof(feature.getLatLng) !== 'undefined') {
//                         latLng = feature.getLatLng();
//                     } else if(typeof(feature.getCenter()) !== 'undefined') {
//                         latLng = feature.getCenter();
//                     }
//
//                     let fp = popup({
//                         autoClose: false,
//                         closeButton: false,
//                         closeOnEscapeKey: false,
//                         closeOnClick: false
//                     }).setLatLng(latLng)
//                     .setContent('<button type="button">Save</button> &nbsp;&nbsp;&nbsp; <button type="button">Cancel</button>')
//                     .openOn(this.map.getMap());
//
//                     Util.setOptions(feature, {popup : fp});
//
//                 } else if( feature.options.popup ) {
//                     feature.options.popup.remove();
//                     // feature.editor.off('editable:drawing:start,editable:drawing:end,editable:drawing:cancel,editable:drawing:commit,editable:drawing:mousedown,editable:drawing:mouseup,editable:drawing:click,editable:drawing:move,editable:drawing:clicked');
//
//                 }
//             });
//         }
//         this.fire(Events.FEATURE_CREATED, feature);
//     }
//
//     onFeatureEdited(event : any) {
//         let feature = event.layer;
//         this.fire(Events.FEATURE_EDITED, feature);
//     }
//
//
//     updateFeaturePopup(feature, popup) {
//         let latLng = null;
//         if(typeof(feature.getLatLng) !== 'undefined') {
//             latLng = feature.getLatLng();
//         } else if(typeof(feature.getCenter()) !== 'undefined') {
//             latLng = feature.getCenter();
//         }
//         if(latLng)
//             popup.setLatLng(latLng);
//     }
// }
//
//
//
//
//
// class EditControl extends Control {
//
//     constructor(options ?: any) {
//         super(options);
//     }
//
//     initialize (options ?: any) {
// 		Util.setOptions(this, options);
//     }
//
//     onAdd (map : Map) {
//         let container : HTMLElement = DomUtil.create('div', 'leaflet-control leaflet-bar'),
//             activateBtn : HTMLAnchorElement = DomUtil.create('a', '', container) as HTMLAnchorElement;
//
//         activateBtn.href = '#';
//         activateBtn.title = 'Create a new ' + (this.options as any).kind;
//         activateBtn.innerHTML = (this.options as any).html;
//
//         DomEvent.on(activateBtn, 'click', DomEvent.stop)
//         .on(activateBtn, 'click', function () {
//             (window as any).LAYER = this.options.callback.call( (map as any).editTools );
//         }, this);
//
//         return container;
//     }
//
// }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5Db250cm9sLkZlYXR1cmVFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJjb250cm9sL0wuQ29udHJvbC5GZWF0dXJlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQ1MsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQ3BDLE9BQU8sRUFDaEIsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJwQyxNQUFNLENBQUMsT0FBTzs7Ozs7O0lBV1YsWUFBYSxHQUFpQixFQUFFLE9BQXNCLEVBQUUsT0FBYztRQUNsRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3hCOzs7OztJQU1ELE9BQU87UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6Qjs7Ozs7SUFLRCxjQUFjO1FBQ1YsSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0QztLQUNKOzs7OztJQUtELGlCQUFpQixDQUFDLElBQUk7UUFDbEIsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTzs7UUFDekIsSUFBSSxFQUFF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RSxJQUFJLENBQUMsQ0FBQzs7UUFFcEQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUM5RCxPQUFPLFNBQVMsQ0FBQztLQUNwQjs7Ozs7SUFFRCxRQUFRLENBQUUsR0FBUztRQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3pCOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFRCxhQUFhOztRQUNULElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFHLG1CQUFDLElBQUksQ0FBQyxPQUFjLEVBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDbkMsbUJBQUMsSUFBSSxDQUFDLE9BQWMsRUFBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBUyxLQUFLO2dCQUN2RCxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNqQjtDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCB7XG4gICAgTWFwLCBMYXllciwgRmVhdHVyZUdyb3VwLCBDb250cm9sLCBHZW9KU09OLCBwb3B1cCxcbiAgICBVdGlsLCBEb21VdGlsLCBEb21FdmVudCwgRXZlbnRlZCwgQ29udHJvbE9wdGlvbnNcbn0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBEcmF3IH0gZnJvbSAnbGVhZmxldC1kcmF3Jztcbi8vIGltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7ICAgLy9mb3IgTGVhZmxldC5EcmF3XG4vLyBjb25zdCBEcmF3ID0gTC5EcmF3O1xuLy8gY29uc3QgRWRpdEhhbmRsZXIgPSBEcmF3LkVkaXRUb29sYmFyLkVkaXQ7XG5cblxuXG5pbXBvcnQgTWFwSW5zdGFuY2UgZnJvbSAnLi4vbWFwL2luc3RhbmNlJztcblxuXG5cbmludGVyZmFjZSBFZGl0Q29udHJvbE9wdGlvbnMgZXh0ZW5kcyBDb250cm9sT3B0aW9ucyB7XG4gICAgZmVhdHVyZUdyb3VwIDogRmVhdHVyZUdyb3VwXG59XG5cbmludGVyZmFjZSBGZWF0dXJlTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gICAgZmVhdHVyZSA6IGFueTtcbiAgICBnZW9tZXRyeSA6IGFueTtcbiAgICBwcm9wZXJ0aWVzIDoge1xuICAgICAgICBba2V5OnN0cmluZ106IGFueTtcbiAgICAgICAgaWQgOiBzdHJpbmc7XG4gICAgfVxuICAgIHRvR2VvSlNPTigpIDogYW55O1xuICAgIHNldFN0eWxlKCBhcmdzIDogYW55ICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVhdHVyZUVkaXRvciB7XG5cblxuICAgIHByaXZhdGUgbWFwIDogTWFwSW5zdGFuY2U7XG4gICAgcHJpdmF0ZSBmZWF0dXJlIDogRmVhdHVyZUxheWVyO1xuICAgIHByaXZhdGUgb3JpZ2luYWxGZWF0dXJlOiBGZWF0dXJlTGF5ZXI7XG4gICAgcHJpdmF0ZSBlZGl0aW5nTGF5ZXIgOiBGZWF0dXJlR3JvdXA7XG4gICAgcHJpdmF0ZSB0b29sIDogRWRpdEZlYXR1cmU7XG4gICAgcHJpdmF0ZSB2aXNpYmxlIDogYm9vbGVhbjtcblxuXG4gICAgY29uc3RydWN0b3IoIG1hcCA6IE1hcEluc3RhbmNlLCBmZWF0dXJlIDogRmVhdHVyZUxheWVyLCBvcHRpb25zID86IGFueSApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBkaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5kb25lRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHRoaXMudW5yZWdpc3RlclRvb2woKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHVucmVnaXN0ZXJUb29sKCkge1xuICAgICAgICBpZih0aGlzLnRvb2wpIHtcbiAgICAgICAgICAgIHRoaXMudG9vbC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICBsZXQgbWFwID0gdGhpcy5tYXAuZ2V0TWFwKCk7XG4gICAgICAgICAgICBtYXAucmVtb3ZlQ29udHJvbCh0aGlzLnRvb2wpO1xuICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKHRoaXMuZWRpdGluZ0xheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBib29sIC0gZmxhZyBzcGVjaWZ5aW5nIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvcmlnaW5hbCBmZWF0dXJlIGJlaW5nIGVkaXRlZFxuICAgICAqL1xuICAgIHNob3dPcmlnaW5hbExheWVyKGJvb2wpIHtcbiAgICAgICAgaWYoIXRoaXMuZmVhdHVyZSkgcmV0dXJuO1xuICAgICAgICBsZXQgaWQgPSB0aGlzLmZlYXR1cmUucHJvcGVydGllcy5pZDtcbiAgICAgICAgbGV0IGxheWVyID0gdGhpcy5tYXAuZ2V0RmVhdHVyZUxheWVyKGlkKTtcbiAgICAgICAgdGhpcy5tYXAuc2V0RmVhdHVyZVZpc2liaWxpdHkobGF5ZXIsIGJvb2wpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYmVnaW5FZGl0aW5nKCkge1xuXG4gICAgICAgIGlmKCF0aGlzLnZpc2libGUpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9yaWdpbmFsRmVhdHVyZSA9IEdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKHRoaXMuZmVhdHVyZS50b0dlb0pTT04oKSkgYXMgRmVhdHVyZUxheWVyO1xuICAgICAgICB0aGlzLmZlYXR1cmUucHJvcGVydGllcy5fZWRpdGluZz10cnVlO1xuXG4gICAgICAgIC8vIGdldCBMZWFmbGV0Lk1hcCBmcm9tIGluc3RhbmNlXG4gICAgICAgIGxldCBtYXAgPSB0aGlzLm1hcC5nZXRNYXAoKTtcblxuICAgICAgICAvLyBmaW5kIGZlYXR1cmUgbGF5ZXIgZm9yIHNwZWNpZmljIGZlYXR1cmVcbiAgICAgICAgbGV0IGZlYXR1cmUgPSB0aGlzLm1hcC5nZXRGZWF0dXJlTGF5ZXIodGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgICAgICBpZighZmVhdHVyZSkgcmV0dXJuO1xuXG4gICAgICAgIC8vY2xvbmUgZmVhdHVyZSBsYXllciBhbmQgd3JhcCB3aXRoIEZlYXR1cmVHcm91cFxuICAgICAgICAvLyBiZWNhdXNlIExlYWZsZXQuRHJhdyByZXF1aXJlcyBlZGl0ZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gYmUgd2l0aGluIGEgRmVhdHVyZUdyb3VwXG4gICAgICAgIGxldCBlZGl0aW5nTGF5ZXIgPSB0aGlzLmVkaXRpbmdMYXllciA9IG5ldyBGZWF0dXJlR3JvdXAoKS5hZGRUbyhtYXApO1xuXG4gICAgICAgIC8vaWYgdGhlIGZlYXR1cmUgYmVpbmcgZWRpdGVkIGlzIGEgbXVsdGktZ2VvbWV0cnlcbiAgICAgICAgLy8gKFwiTXVsdGlQb2ludFwiLCBcIk11bHRpTGluZVN0cmluZ1wiLCBcIk11bHRpUG9seWdvblwiLCBcIkdlb21ldHJ5Q29sbGVjdGlvblwiKVxuICAgICAgICAvLyB0aGVuIHdlIG5lZWQgdG8gc3BsaXQgdGhlbSB1cCBpbnRvIGluZGl2aWR1YWwgZ2VvbWV0cmllcyBhbmRcbiAgICAgICAgLy8gYWRkIHRoZW0gYXMgc2VwYXJhdGUgbGF5ZXJzIHdoaWNoIHdpbGwgYWxsIGJlIGVkaXRhYmxlXG4gICAgICAgIGlmICh0aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZS5pbmRleE9mKFwiTXVsdGlcIik9PT0wKSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlLnJlcGxhY2UoXCJNdWx0aVwiLFwiXCIpO1xuICAgICAgICAgICAgdGhpcy5mZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzLmVhY2goIChjaGlsZENvb3JkcykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzaGFwZSA9IHt0eXBlOnR5cGUsIGNvb3JkaW5hdGVzOiBjaGlsZENvb3Jkc307XG4gICAgICAgICAgICAgICAgbmV3IEdlb0pTT04oc2hhcGUsIHtcbiAgICAgICAgICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogKGZlYXR1cmUsIGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nTGF5ZXIuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYodGhpcy5mZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdHZW9tZXRyeUNvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkuZ2VvbWV0cmllcy5lYWNoKCAoY2hpbGRHZW9tZXRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIG5ldyBHZW9KU09OKGNoaWxkR2VvbWV0cnksIHtcbiAgICAgICAgICAgICAgICAgICAgb25FYWNoRmVhdHVyZTogICAoZmVhdHVyZSwgbGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmdMYXllci5hZGRMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgR2VvSlNPTihmZWF0dXJlLnRvR2VvSlNPTigpKS5lYWNoTGF5ZXIoIChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGVkaXRpbmdMYXllci5hZGRMYXllcihsYXllcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbWFrZSB0aGlzIGZlYXR1cmUgaW52aXNpYmxlXG4gICAgICAgIHRoaXMuc2hvd09yaWdpbmFsTGF5ZXIoZmFsc2UpO1xuXG4gICAgICAgIC8vcmVnaXN0ZXIgTGVhZmxldERyYXcgY29udHJvbCB3aXRoIEVkaXQgbW9kZSBvbmx5XG4gICAgICAgIC8vIHVzaW5nIGp1c3QgdGhlIGZlYXR1cmUgbGF5ZXIgaWRlbnRpZmllZFxuICAgICAgICB0aGlzLnRvb2wgPSBuZXcgRWRpdEZlYXR1cmUoe1xuICAgICAgICAgICAgZmVhdHVyZUdyb3VwOiBlZGl0aW5nTGF5ZXJcbiAgICAgICAgfSBhcyBDb250cm9sT3B0aW9ucykuYWRkVG8obWFwKTtcbiAgICAgICAgdGhpcy50b29sLmFjdGl2YXRlKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc2F2ZSAtIGZsYWcgc3BlY2lmeWluZyB3aGV0aGVyIHRvIHBlcnNpc3QgY2hhbmdlcyB0byB0aGUgZmVhdHVyZVxuICAgICAqL1xuICAgIGRvbmVFZGl0aW5nKCBzYXZlID86IGJvb2xlYW4gKSB7XG5cbiAgICAgICAgdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuX2VkaXRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZih0eXBlb2Yoc2F2ZSkgPT09ICd1bmRlZmluZWQnIHx8IHNhdmUpIHtcblxuICAgICAgICAgICAgLy9pZiBnZW9tZXRyeSBjaGFuZ2VkXG4gICAgICAgICAgICBpZih0aGlzLnRvb2wgJiYgdGhpcy50b29sLmhhc0JlZW5FZGl0ZWQoKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlzTXVsdGkgPSB+dGhpcy5mZWF0dXJlLmdlb21ldHJ5LnR5cGUuaW5kZXhPZihcIk11bHRpXCIpO1xuICAgICAgICAgICAgICAgIGxldCBpc0dlb21Db2xsID0gdGhpcy5mZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdHZW9tZXRyeUNvbGxlY3Rpb24nO1xuICAgICAgICAgICAgICAgIGxldCBnZW9tcyA9IFtdLCBjb29yZHMgPSBbXSwgZ2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nTGF5ZXIuZWFjaExheWVyKCAobGF5ZXIgOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZSA9IChsYXllciBhcyBGZWF0dXJlTGF5ZXIpLnRvR2VvSlNPTigpO1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IGZlYXR1cmUuZ2VvbWV0cnk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGlzTXVsdGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb3Jkc1tjb29yZHMubGVuZ3RoXSA9IGdlb21ldHJ5LmNvb3JkaW5hdGVzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaXNHZW9tQ29sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbXNbZ2VvbXMubGVuZ3RoXSA9IGZlYXR1cmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vdXBkYXRlIGV4aXN0aW5nIGZlYXR1cmUgd2l0aCBlZGl0ZWQgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICBpZihpc011bHRpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMgPSBjb29yZHM7XG4gICAgICAgICAgICAgICAgZWxzZSBpZihpc0dlb21Db2xsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkuZ2VvbWV0cmllcyA9IGdlb21zO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlLmdlb21ldHJ5ID0gZ2VvbWV0cnk7XG5cbiAgICAgICAgICAgICAgICAvL2luZm9ybSBNYXAgb2YgY2hhbmdlXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAucmVwbGFjZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3Jlc3RvcmUgb3JpZ2luYWwgbGF5ZXJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPcmlnaW5hbExheWVyKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgLy9yZWRyYXcgZmVhdHVyZSB3aXRoIG5ldyBzdHlsZSBpbmZvXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAudXBkYXRlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3Jlc3RvcmUgb3JpZ2luYWwgbGF5ZXIgKG9ubHkgaWYgZmVhdHVyZSBpcyB0byBiZSB2aXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5zaG93T3JpZ2luYWxMYXllcih0aGlzLnZpc2libGUpO1xuXG4gICAgICAgICAgICAvL1JlZHJhdyBmZWF0dXJlIHdoaWNoIGhhcyBiZWVuIHVwZGF0ZWQgd2l0aFxuICAgICAgICAgICAgLy8gb3JpZ2luYWwgc3R5bGUgaW5mb3JtYXRpb24gKHJlc2V0KVxuICAgICAgICAgICAgdGhpcy5tYXAudXBkYXRlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sYXN0bHksIGJyZWFrIGRvd24gdGhlIGVkaXRpbmcgdG9vbFxuICAgICAgICBpZih0aGlzLnRvb2wpIHRoaXMudW5yZWdpc3RlclRvb2woKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYWRkUHJvcGVydHkoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGhpZ2hsaWdodEZlYXR1cmUoKSB7XG4gICAgICAgIHRoaXMubWFwLmZvY3VzRmVhdHVyZSh0aGlzLmZlYXR1cmUucHJvcGVydGllcy5pZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBkZWxldGVGZWF0dXJlKCkge1xuICAgICAgICB0aGlzLm1hcC5yZW1vdmVGZWF0dXJlKHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgcmVuZGVyZWQgZmVhdHVyZSB3aXRoIGxhdGVzdCBpbmZvXG4gICAgICovXG4gICAgdXBkYXRlRmVhdHVyZSgpIHtcblxuICAgICAgICAvL2lmIG5vdCBlZGl0aW5nIGEgdGVtcG9yYXJ5IGZlYXR1cmUuLi5cbiAgICAgICAgaWYoIXRoaXMuZWRpdGluZ0xheWVyKVxuICAgICAgICAgICAgdGhpcy5tYXAudXBkYXRlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuXG4gICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAvL2Rvbid0IG5lZWQgdG8gdXBkYXRlIGV4aXN0aW5nIHJlbmRlcmVkIGZlYXR1cmVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgaXQncyBiZWVuIGhpZGRlbiBhbmQgYSB0ZW1wb3JhcnkgJ2VkaXRpbmcnIHZlcnNpb25cbiAgICAgICAgICAgIC8vIGlzIG9uIHRoZSBtYXAuIFNvIHdlIG5lZWQgdG8gdXBkYXRlIHRoYXQgaW5zdGVhZC5cbiAgICAgICAgICAgIC8vIHRoaXMubWFwLnVwZGF0ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcblxuXG4gICAgICAgICAgICAvL3VwZGF0ZSAnZWRpdGluZycgdmVyc2lvbiBvZiB0aGUgZmVhdHVyZSBpbiBxdWVzdGlvblxuXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLmZlYXR1cmUucHJvcGVydGllcy5zdHlsZTtcbiAgICAgICAgICAgIHRoaXMuZWRpdGluZ0xheWVyLmVhY2hMYXllciggKGxheWVyIDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvL2RvIG5vdGhpbmcgZm9yIG1hcmtlcnNcbiAgICAgICAgICAgICAgICBpZigobGF5ZXIgYXMgRmVhdHVyZUxheWVyKS5mZWF0dXJlLmdlb21ldHJ5LnR5cGUgIT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgICAgICAgICAgKGxheWVyIGFzIEZlYXR1cmVMYXllcikuc2V0U3R5bGUoc3R5bGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgY2FuY2VsRWRpdGluZyAoKSB7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IHRoaXMub3JpZ2luYWxGZWF0dXJlO1xuICAgICAgICB0aGlzLmRvbmVFZGl0aW5nKGZhbHNlKTtcbiAgICB9XG5cbn1cblxuXG5cblxuXG5cblxuXG5cbi8qKlxuICpcbiAqL1xuY2xhc3MgRWRpdEZlYXR1cmUgZXh0ZW5kcyBDb250cm9sIHtcblxuICAgIHByaXZhdGUgbWFwIDogTWFwO1xuICAgIHByaXZhdGUgZW5hYmxlZCA6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBoYW5kbGVyIDogRHJhdy5FZGl0VG9vbGJhci5FZGl0O1xuXG4gICAgY29uc3RydWN0b3IoIG9wdGlvbnMgPzogYW55ICkge1xuICAgICAgICBzdXBlciggT2JqZWN0LmFzc2lnbigge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYm90dG9tcmlnaHQnLFxuICAgICAgICAgICAgICAgIGRyYXc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVkaXQ6IGZhbHNlXG4gICAgICAgICAgICB9LCBvcHRpb25zIHx8IHt9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uQWRkIChtYXAgOiBNYXApIHtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBvcHRzID0geyB9O1xuICAgICAgICAvL25lZWRlZCBvciBlbHNlIEwuRWRpdFRvb2xiYXIuRWRpdCBmYWlscyB0byBhZGRIb29rcyBmb3IgUG9seUxpbmUgZmVhdHVyZXNcbiAgICAgICAgKG9wdHMgYXMgYW55KS5zZWxlY3RlZFBhdGhPcHRpb25zID0ge1xuICAgICAgICAgICAgZGFzaEFycmF5OiAnMTAsIDEwJyxcbiAgICAgICAgICAgIGZpbGw6IHRydWUsXG4gICAgICAgICAgICBmaWxsQ29sb3I6ICcjZmU1N2ExJyxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjEsXG4gICAgICAgICAgICAvLyBXaGV0aGVyIHRvIHVzZXIgdGhlIGV4aXN0aW5nIGxheWVycyBjb2xvclxuICAgICAgICAgICAgbWFpbnRhaW5Db2xvcjogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgKG9wdHMgYXMgYW55KS5mZWF0dXJlR3JvdXAgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuZmVhdHVyZUdyb3VwO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IG5ldyBEcmF3LkVkaXRUb29sYmFyLkVkaXQobWFwLCBvcHRzKTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWVkaXQtZmVhdHVyZScpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlIChtYXAgOiBNYXApIHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFuZGxlci5lbmFibGUoKTtcbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oYW5kbGVyLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICBoYXNCZWVuRWRpdGVkKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmKCh0aGlzLm9wdGlvbnMgYXMgYW55KS5mZWF0dXJlR3JvdXApIHtcbiAgICAgICAgICAgICh0aGlzLm9wdGlvbnMgYXMgYW55KS5mZWF0dXJlR3JvdXAuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0IHx8IGxheWVyLmVkaXRlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gaW1wb3J0IHtcbi8vICAgICBNYXAsIExheWVyLCBGZWF0dXJlR3JvdXAsIENvbnRyb2wsIEdlb0pTT04sIHBvcHVwLFxuLy8gICAgIFV0aWwsIERvbVV0aWwsIERvbUV2ZW50LCBFdmVudGVkXG4vLyB9IGZyb20gJ2xlYWZsZXQnO1xuLy8gaW1wb3J0ICogYXMgRWRpdGFibGUgZnJvbSBcImxlYWZsZXQtZWRpdGFibGVcIjtcbi8vXG4vLyBpbXBvcnQgTWFwSW5zdGFuY2UgZnJvbSAnLi4vbWFwL2luc3RhbmNlJztcbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8gY29uc3QgQ0FMTEJBQ0tTID0ge1xuLy8gICAgICdtYXJrZXInICAgIDogJ3N0YXJ0TWFya2VyJyxcbi8vICAgICAnbGluZScgICAgICA6ICdzdGFydFBvbHlsaW5lJyxcbi8vICAgICAncG9seWdvbicgICA6ICdzdGFydFBvbHlnb24nLFxuLy8gICAgICdyZWN0YW5nbGUnIDogJ3N0YXJ0UmVjdGFuZ2xlJyxcbi8vICAgICAnY2lyY2xlJyAgICA6ICdzdGFydENpcmNsZSdcbi8vIH07XG4vL1xuLy9cbi8vIGV4cG9ydCBjb25zdCBFdmVudHMgPSB7XG4vLyAgICAgRkVBVFVSRV9DUkVBVEVEOiAnZmVhdHVyZTpjcmVhdGVkJyxcbi8vICAgICBGRUFUVVJFX1JFTU9WRUQ6ICdmZWF0dXJlOnJlbW92ZWQnLFxuLy8gICAgIEZFQVRVUkVfRURJVEVEOiAnZmVhdHVyZTplZGl0ZWQnXG4vLyB9O1xuLy9cbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBjbGFzcyBGZWF0dXJlRWRpdG9yIGV4dGVuZHMgRXZlbnRlZCB7XG4vL1xuLy8gICAgIHByaXZhdGUgbWFwIDogTWFwSW5zdGFuY2U7XG4vLyAgICAgcHJpdmF0ZSBlZGl0b3IgOiBFZGl0YWJsZTtcbi8vICAgICBwcml2YXRlIGVkaXRMYXllciA6IEZlYXR1cmVHcm91cDtcbi8vICAgICBwcml2YXRlIGZlYXR1cmVzTGF5ZXIgOiBGZWF0dXJlR3JvdXA7XG4vL1xuLy8gICAgIGNvbnN0cnVjdG9yKG1hcCA6IE1hcEluc3RhbmNlLCBvcHRpb25zID86IGFueSkge1xuLy8gICAgICAgICBzdXBlcigpO1xuLy9cbi8vICAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4vL1xuLy8gICAgICAgICBsZXQgbGVhZmxldE1hcCA6IE1hcCA9IG1hcC5nZXRNYXAoKTtcbi8vICAgICAgICAgaWYoIWxlYWZsZXRNYXApIHRocm93IG5ldyBFcnJvcihcIk5vIExlYWZsZXQgbWFwIGlzIGNvbmZpZ3VyZWRcIik7XG4vL1xuLy8gICAgICAgICB0aGlzLmZlYXR1cmVzTGF5ZXIgPSBtYXAuZ2V0RmVhdHVyZUxheWVyKCk7XG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRMYXllciA9IG5ldyBGZWF0dXJlR3JvdXAoKTtcbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIuYWRkVG8obGVhZmxldE1hcCk7XG4vL1xuLy8gICAgICAgICBsZXQgb3B0cyA6IGFueSA9IHt9O1xuLy8gICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIG9wdGlvbnN8fHt9LCB7XG4vLyAgICAgICAgICAgICAvL2VkaXRMYXllciA6IC4uLlxuLy8gICAgICAgICAgICAgZmVhdHVyZXNMYXllciA6IHRoaXMuZWRpdExheWVyIC8vbWFwLmdldEZlYXR1cmVMYXllcigpXG4vLyAgICAgICAgICAgICAvLyBkcmF3aW5nQ1NTQ2xhc3M6ICdsZWFmbGV0LWVkaXRhYmxlLWRyYXdpbmcnLFxuLy8gICAgICAgICAgICAgLy8gZHJhd2luZ0N1cnNvcjogJ2Nyb3NzaGFpcicsXG4vLyAgICAgICAgICAgICAvLyBza2lwTWlkZGxlTWFya2VyczogdHJ1ZVxuLy8gICAgICAgICB9KTtcbi8vXG4vLyAgICAgICAgIC8vY3JlYXRlIGFuZCByZWdpc3RlciBlZGl0YWJsZSBpbnN0YW5jZSBvbiBsZWFmbGV0IG1hcFxuLy8gICAgICAgICBsZXQgZWRpdG9yID0gbmV3IEVkaXRhYmxlKGxlYWZsZXRNYXAsIG9wdHMpO1xuLy8gICAgICAgICAobGVhZmxldE1hcCBhcyBhbnkpLmVkaXRUb29scyA9IGVkaXRvcjtcbi8vICAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZHJhd2luZzplbmQnLCAoZXZlbnQgOiBhbnkpID0+IHtcbi8vICAgICAgICAgICAgIC8vaGF2ZSB0byB3cmFwIGhhbmRsZXIgaW4gYSB0aW1lb3V0IGluIG9yZGVyIHRvIG5vdCBpbmFkdmVydGVudGx5XG4vLyAgICAgICAgICAgICAvLyBibG9jayB0aGUgY2xlYW4gdXAgb2YgZXZlbnQgaGFuZGxlcnMgd2l0aGluIEVkaXRhYmxlXG4vLyAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5vbkZlYXR1cmVDcmVhdGVkKGV2ZW50KSB9LDUwKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIC8vIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTplZGl0aW5nJywgKGV2ZW50IDogYW55KSA9PiB7IHRoaXMub25GZWF0dXJlRWRpdGVkKGV2ZW50KSB9KVxuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmRyYXdpbmc6c3RhcnQnLCAoZXZlbnQ6IGFueSkgPT4gY29uc29sZS5sb2coXCJEcmF3aW5nIFN0YXJ0XCIpICk7XG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTpkcmF3aW5nOmVuZCcsIChldmVudDogYW55KSA9PiBjb25zb2xlLmxvZyhcIkRyYXdpbmcgRW5kXCIpICk7XG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTpkcmF3aW5nOmNhbmNlbCcsIChldmVudDogYW55KSA9PiBjb25zb2xlLmxvZyhcIkRyYXdpbmcgQ2FuY2VsXCIpICk7XG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTpkcmF3aW5nOmNvbW1pdCcsIChldmVudDogYW55KSA9PiBjb25zb2xlLmxvZyhcIkRyYXdpbmcgQ29tbWl0XCIpICk7XG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbihcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTpkcmF3aW5nOnN0YXJ0IGVkaXRhYmxlOmRyYXdpbmc6ZW5kICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOmRyYXdpbmc6Y2FuY2VsIGVkaXRhYmxlOmRyYXdpbmc6Y29tbWl0ICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOmRyYXdpbmc6bW91c2Vkb3duIGVkaXRhYmxlOmRyYXdpbmc6bW91c2V1cCAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTpkcmF3aW5nOmNsaWNrIGVkaXRhYmxlOmRyYXdpbmc6bW92ZSAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTpkcmF3aW5nOmNsaWNrZWQnLFxuLy8gICAgICAgICAgICAgKGV2ZW50IDogYW55KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFZGl0b3IgZXZlbnQ6IFwiICsgZXZlbnQudHlwZSk7XG4vLyAgICAgICAgICAgICAgICAgaWYoZXZlbnQubGF5ZXIgJiYgZXZlbnQubGF5ZXIub3B0aW9ucy5wb3B1cCkge1xuLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZlYXR1cmVQb3B1cChldmVudC5sYXllciwgZXZlbnQubGF5ZXIub3B0aW9ucy5wb3B1cCk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICApO1xuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4Om5ldyBlZGl0YWJsZTp2ZXJ0ZXg6Y2xpY2sgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4OmNsaWNrZWQgZWRpdGFibGU6dmVydGV4OnJhd2NsaWNrICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDpkZWxldGVkIGVkaXRhYmxlOnZlcnRleDpjdHJsY2xpY2sgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4OnNoaWZ0Y2xpY2sgZWRpdGFibGU6dmVydGV4Om1ldGFrZXljbGljayAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6YWx0Y2xpY2sgZWRpdGFibGU6dmVydGV4OmNvbnRleHRtZW51ICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDptb3VzZWRvd24gZWRpdGFibGU6dmVydGV4OmRyYWcgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4OmRyYWdzdGFydCBlZGl0YWJsZTp2ZXJ0ZXg6ZHJhZ2VuZCAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTptaWRkbGVtYXJrZXI6bW91c2Vkb3duJyxcbi8vICAgICAgICAgICAgIChldmVudCA6IGFueSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVmVydGV4IGV2ZW50OiBcIiArIGV2ZW50LnR5cGUpO1xuLy8gICAgICAgICAgICAgICAgIC8vIGlmKGV2ZW50LmxheWVyICYmIGV2ZW50LmxheWVyLm9wdGlvbnMucG9wdXApIHtcbi8vICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy51cGRhdGVGZWF0dXJlUG9wdXAoZXZlbnQubGF5ZXIsIGV2ZW50LmxheWVyLm9wdGlvbnMucG9wdXApO1xuLy8gICAgICAgICAgICAgICAgIC8vIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgKTtcbi8vXG4vLyAgICAgICAgIGlmKG9wdHMubWFya2VyKSB7XG4vLyAgICAgICAgICAgICBsZWFmbGV0TWFwLmFkZENvbnRyb2wobmV3IEVkaXRDb250cm9sKHtcbi8vICAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0cy5wb3NpdGlvbiB8fCAndG9wbGVmdCcsXG4vLyAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGVkaXRvcltDQUxMQkFDS1MubWFya2VyXSxcbi8vICAgICAgICAgICAgICAgICBraW5kOiAnbWFya2VyJyxcbi8vICAgICAgICAgICAgICAgICBodG1sOiBvcHRzLm1hcmtlci5pY29uID8gb3B0cy5tYXJrZXIuaWNvbiA6ICfwn5aIJ1xuLy8gICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmKG9wdHMubGluZSkge1xuLy8gICAgICAgICAgICAgbGVhZmxldE1hcC5hZGRDb250cm9sKG5ldyBFZGl0Q29udHJvbCh7XG4vLyAgICAgICAgICAgICAgICAgcG9zaXRpb246IG9wdHMucG9zaXRpb24gfHwgJ3RvcGxlZnQnLFxuLy8gICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBlZGl0b3JbQ0FMTEJBQ0tTLmxpbmVdLFxuLy8gICAgICAgICAgICAgICAgIGtpbmQ6ICdsaW5lJyxcbi8vICAgICAgICAgICAgICAgICBodG1sOiBvcHRzLmxpbmUuaWNvbiA/IG9wdHMubGluZS5pY29uIDogJ1xcXFwvXFxcXCdcbi8vICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihvcHRzLnBvbHlnb24pIHtcbi8vICAgICAgICAgICAgIGxlYWZsZXRNYXAuYWRkQ29udHJvbChuZXcgRWRpdENvbnRyb2woe1xuLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRzLnBvc2l0aW9uIHx8ICd0b3BsZWZ0Jyxcbi8vICAgICAgICAgICAgICAgICBjYWxsYmFjazogZWRpdG9yW0NBTExCQUNLUy5wb2x5Z29uXSxcbi8vICAgICAgICAgICAgICAgICBraW5kOiAncG9seWdvbicsXG4vLyAgICAgICAgICAgICAgICAgaHRtbDogb3B0cy5wb2x5Z29uLmljb24gPyBvcHRzLnBvbHlnb24uaWNvbiA6ICfilrAnXG4vLyAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYob3B0cy5yZWN0YW5nbGUpIHtcbi8vICAgICAgICAgICAgIGxlYWZsZXRNYXAuYWRkQ29udHJvbChuZXcgRWRpdENvbnRyb2woe1xuLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRzLnBvc2l0aW9uIHx8ICd0b3BsZWZ0Jyxcbi8vICAgICAgICAgICAgICAgICBjYWxsYmFjazogZWRpdG9yW0NBTExCQUNLUy5yZWN0YW5nbGVdLFxuLy8gICAgICAgICAgICAgICAgIGtpbmQ6ICdyZWN0YW5nbGUnLFxuLy8gICAgICAgICAgICAgICAgIGh0bWw6IG9wdHMucmVjdGFuZ2xlLmljb24gPyBvcHRzLnJlY3RhbmdsZS5pY29uIDogJ+Ksmydcbi8vICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihvcHRzLmNpcmNsZSkge1xuLy8gICAgICAgICAgICAgbGVhZmxldE1hcC5hZGRDb250cm9sKG5ldyBFZGl0Q29udHJvbCh7XG4vLyAgICAgICAgICAgICAgICAgcG9zaXRpb246IG9wdHMucG9zaXRpb24gfHwgJ3RvcGxlZnQnLFxuLy8gICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBlZGl0b3JbQ0FMTEJBQ0tTLmNpcmNsZV0sXG4vLyAgICAgICAgICAgICAgICAga2luZDogJ2NpcmNsZScsXG4vLyAgICAgICAgICAgICAgICAgaHRtbDogb3B0cy5jaXJjbGUuaWNvbiA/IG9wdHMuY2lyY2xlLmljb24gOiAn4qykJ1xuLy8gICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy9cbi8vICAgICBpc0RyYXdpbmcoKSA6IGJvb2xlYW4ge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IgPyB0aGlzLmVkaXRvci5kcmF3aW5nKCkgOiBmYWxzZTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGNhbmNlbCgpIHtcbi8vICAgICAgICAgaWYodGhpcy5lZGl0b3IpIHRoaXMuZWRpdG9yLnN0b3BEcmF3aW5nKCk7XG4vLyAgICAgfVxuLy9cbi8vICAgICAvKipcbi8vICAgICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIHRvIGJlIGVkaXRlZFxuLy8gICAgICAqL1xuLy8gICAgIGVuYWJsZUZlYXR1cmVFZGl0KCBmZWF0dXJlIDogYW55ICkge1xuLy8gICAgICAgICBpZighZmVhdHVyZSkgcmV0dXJuO1xuLy9cbi8vICAgICAgICAgaWYoIWZlYXR1cmUucHJvcGVydGllcykgZmVhdHVyZS5wcm9wZXJ0aWVzID0ge307XG4vL1xuLy8gICAgICAgICBsZXQgZmlkID0gIHRoaXMuZ2V0RmVhdHVyZUlkKGZlYXR1cmUsIHRydWUpO1xuLy9cbi8vICAgICAgICAgLy9tYWtlIGEgY2xvbmUgb2YgdGhlIGZlYXR1cmUgdG8gYmUgZWRpdGVkXG4vLyAgICAgICAgIGxldCBqc29uID0gKGZlYXR1cmUgYXMgYW55KS50b0dlb0pTT04oKTtcbi8vICAgICAgICAgbGV0IGVkaXRlZExheWVyID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoanNvbik7XG4vLyAgICAgICAgIFV0aWwuc2V0T3B0aW9ucyhlZGl0ZWRMYXllciwgeyBvcmlnaW5hbExheWVySWQgOiBmaWQgfSk7XG4vL1xuLy8gICAgICAgICAvL2hpZGUgdGhhdCBmZWF0dXJlIG9uIGZlYXR1cmVzTGF5ZXJcbi8vICAgICAgICAgdGhpcy5tYXAuc2V0RmVhdHVyZVZpc2liaWxpdHkoZmVhdHVyZSwgZmFsc2UpO1xuLy9cbi8vICAgICAgICAgLy9hbmQgYWRkIHRoZSBlZGl0YmxlIGNsb25lIG9mIGl0IHRvIHRoZSBlZGl0IGxheWVyXG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLmFkZExheWVyKGVkaXRlZExheWVyKTtcbi8vICAgICAgICAgKGVkaXRlZExheWVyIGFzIGFueSkudG9nZ2xlRWRpdCgpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBiZWluZyBlZGl0ZWRcbi8vICAgICAgKi9cbi8vICAgICBhcHBseUZlYXR1cmVFZGl0KCBmZWF0dXJlIDogYW55ICkge1xuLy9cbi8vICAgICAgICAgbGV0IGVkaXRlZExheWVyID0gdGhpcy5maW5kRWRpdGVkRmVhdHVyZUxheWVyKGZlYXR1cmUpO1xuLy8gICAgICAgICBpZighZWRpdGVkTGF5ZXIpIHJldHVybjtcbi8vXG4vLyAgICAgICAgIChlZGl0ZWRMYXllciBhcyBhbnkpLnRvZ2dsZUVkaXQoKTsgICAgICAgICAgICAgICAgICAgLy90dXJuIG9mZiBlZGl0b3Jcbi8vXG4vLyAgICAgICAgIGxldCBqc29uID0gKGVkaXRlZExheWVyIGFzIGFueSkudG9HZW9KU09OKCk7XG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLnJlbW92ZUxheWVyKGVkaXRlZExheWVyKTsgICAgLy9yZW1vdmUgZnJvbSBlZGl0IGxheWVyXG4vL1xuLy8gICAgICAgICAvLyBsZXQgdXBkYXRlZExheWVyID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoanNvbik7XG4vLyAgICAgICAgIHRoaXMubWFwLnJlcGxhY2VGZWF0dXJlKGpzb24pO1xuLy8gICAgICAgICB0aGlzLm1hcC5zZXRGZWF0dXJlVmlzaWJpbGl0eShmZWF0dXJlLCB0cnVlKTtcbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICAvKipcbi8vICAgICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIGJlaW5nIGVkaXRlZFxuLy8gICAgICAqL1xuLy8gICAgIGNhbmNlbEZlYXR1cmVFZGl0KCBmZWF0dXJlIDogYW55ICkge1xuLy9cbi8vICAgICAgICAgbGV0IGVkaXRlZExheWVyID0gdGhpcy5maW5kRWRpdGVkRmVhdHVyZUxheWVyKGZlYXR1cmUpO1xuLy8gICAgICAgICBpZighZWRpdGVkTGF5ZXIpIHJldHVybjtcbi8vXG4vLyAgICAgICAgIChlZGl0ZWRMYXllciBhcyBhbnkpLnRvZ2dsZUVkaXQoKTsgICAgICAgICAgICAgICAgICAgLy90dXJuIG9mZiBlZGl0b3Jcbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIucmVtb3ZlTGF5ZXIoZWRpdGVkTGF5ZXIpOyAgICAvL2FuZCByZW1vdmUgZnJvbSBlZGl0IGxheWVyXG4vL1xuLy8gICAgICAgICAvL3JlLXNob3cgdGhlIG9yaWdpbmFsIGZlYXR1cmUgbGF5ZXJcbi8vICAgICAgICAgdGhpcy5tYXAuc2V0RmVhdHVyZVZpc2liaWxpdHkoZmVhdHVyZSwgdHJ1ZSk7XG4vL1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBMYXllciBhc3NvY2lhdGVkIHdpdGggYW4gZWRpdGFibGUgZmVhdHVyZVxuLy8gICAgICAqIEByZXR1cm4gZWRpdGFibGUgRmVhdHVyZSBMYXllciBhc3NvY2FpdGVkIHdpdGggdGhlIHNwZWNpZmllZCBwYXJhbWV0ZXIgRmVhdHVyZSBMYXllclxuLy8gICAgICAqL1xuLy8gICAgIGZpbmRFZGl0ZWRGZWF0dXJlTGF5ZXIoIGZlYXR1cmUgOiBhbnkgKSA6IExheWVyIHtcbi8vICAgICAgICAgbGV0IGVkaXRlZExheWVyIDogTGF5ZXIgPSBudWxsO1xuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5lYWNoTGF5ZXIoIChsYXllciA6IGFueSkgPT4ge1xuLy8gICAgICAgICAgICAgbGV0IGZpZCA9IHRoaXMuZ2V0RmVhdHVyZUlkKGxheWVyKTtcbi8vICAgICAgICAgICAgIGlmKCAhZWRpdGVkTGF5ZXIgJiYgZmlkID09IGxheWVyLm9yaWdpbmFsTGF5ZXJJZCApIHtcbi8vICAgICAgICAgICAgICAgICBlZGl0ZWRMYXllciA9IGxheWVyIGFzIExheWVyO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgcmV0dXJuIGVkaXRlZExheWVyO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZVxuLy8gICAgICAqIEBwYXJhbSBjcmVhdGVBc05lZWRlZCBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0byBjcmVhdGUgYW4gSUQgaWYgZmVhdHVyZSBoYXMgbm9uZVxuLy8gICAgICAqIEByZXR1cm4gZmVhdHVyZSBpZCBvciBudWxsXG4vLyAgICAgICovXG4vLyAgICAgZ2V0RmVhdHVyZUlkKCBmZWF0dXJlIDogYW55ICwgY3JlYXRlQXNOZWVkZWQgPzogYm9vbGVhbikgOiBzdHJpbmcge1xuLy8gICAgICAgICBpZighZmVhdHVyZSkgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgIGlmKCFmZWF0dXJlLnByb3BlcnRpZXMpIGZlYXR1cmUucHJvcGVydGllcyA9IHt9O1xuLy8gICAgICAgICBsZXQgZmVhdHVyZUlkID0gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkIHx8IG51bGw7XG4vLyAgICAgICAgIGlmKCFmZWF0dXJlSWQgJiYgdHJ1ZSA9PT0gY3JlYXRlQXNOZWVkZWQpXG4vLyAgICAgICAgICAgICBmZWF0dXJlSWQgPSBmZWF0dXJlLnByb3BlcnRpZXMuaWQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqOTk5OSk7XG4vLyAgICAgICAgIHJldHVybiBmZWF0dXJlSWQ7XG4vLyAgICAgfVxuLy9cbi8vXG4vL1xuLy9cbi8vICAgICBvbkZlYXR1cmVDcmVhdGVkKGV2ZW50IDogYW55KSB7XG4vLyAgICAgICAgIGxldCBmZWF0dXJlIDogYW55ID0gZXZlbnQubGF5ZXI7XG4vL1xuLy8gICAgICAgICBpZiggdHlwZW9mKGZlYXR1cmUuZWRpdEVuYWJsZWQpICE9PSAndW5kZWZpbmVkJyAmJiBmZWF0dXJlLmVkaXRFbmFibGVkKCkgKSB7XG4vLyAgICAgICAgICAgICBmZWF0dXJlLnRvZ2dsZUVkaXQoKTtcbi8vICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIucmVtb3ZlTGF5ZXIoZmVhdHVyZSk7XG4vLyAgICAgICAgIGlmKHRoaXMuZmVhdHVyZXNMYXllcikge1xuLy8gICAgICAgICAgICAgdGhpcy5mZWF0dXJlc0xheWVyLmFkZExheWVyKGZlYXR1cmUpO1xuLy8gICAgICAgICAgICAgZmVhdHVyZS5vbignZGJsY2xpY2snLCBEb21FdmVudC5zdG9wKS5vbignZGJsY2xpY2snLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgICAgICAgICAgIChmZWF0dXJlIGFzIGFueSkudG9nZ2xlRWRpdCgpO1xuLy9cbi8vICAgICAgICAgICAgICAgICBpZihmZWF0dXJlLmVkaXRFbmFibGVkKCkpIHsgLy8nZWRpdGFibGU6ZW5hYmxlJ1xuLy8gICAgICAgICAgICAgICAgICAgICAvL2FkZCBhIHNhdmUgYW5kIGNhbmNlbCBidG4uLi5cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBsYXRMbmcgPSBudWxsO1xuLy8gICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoZmVhdHVyZS5nZXRMYXRMbmcpICE9PSAndW5kZWZpbmVkJykge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0TG5nID0gZmVhdHVyZS5nZXRMYXRMbmcoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihmZWF0dXJlLmdldENlbnRlcigpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxhdExuZyA9IGZlYXR1cmUuZ2V0Q2VudGVyKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCBmcCA9IHBvcHVwKHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9DbG9zZTogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uRXNjYXBlS2V5OiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25DbGljazogZmFsc2Vcbi8vICAgICAgICAgICAgICAgICAgICAgfSkuc2V0TGF0TG5nKGxhdExuZylcbi8vICAgICAgICAgICAgICAgICAgICAgLnNldENvbnRlbnQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiPlNhdmU8L2J1dHRvbj4gJm5ic3A7Jm5ic3A7Jm5ic3A7IDxidXR0b24gdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPicpXG4vLyAgICAgICAgICAgICAgICAgICAgIC5vcGVuT24odGhpcy5tYXAuZ2V0TWFwKCkpO1xuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgVXRpbC5zZXRPcHRpb25zKGZlYXR1cmUsIHtwb3B1cCA6IGZwfSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggZmVhdHVyZS5vcHRpb25zLnBvcHVwICkge1xuLy8gICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLm9wdGlvbnMucG9wdXAucmVtb3ZlKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIC8vIGZlYXR1cmUuZWRpdG9yLm9mZignZWRpdGFibGU6ZHJhd2luZzpzdGFydCxlZGl0YWJsZTpkcmF3aW5nOmVuZCxlZGl0YWJsZTpkcmF3aW5nOmNhbmNlbCxlZGl0YWJsZTpkcmF3aW5nOmNvbW1pdCxlZGl0YWJsZTpkcmF3aW5nOm1vdXNlZG93bixlZGl0YWJsZTpkcmF3aW5nOm1vdXNldXAsZWRpdGFibGU6ZHJhd2luZzpjbGljayxlZGl0YWJsZTpkcmF3aW5nOm1vdmUsZWRpdGFibGU6ZHJhd2luZzpjbGlja2VkJyk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIHRoaXMuZmlyZShFdmVudHMuRkVBVFVSRV9DUkVBVEVELCBmZWF0dXJlKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIG9uRmVhdHVyZUVkaXRlZChldmVudCA6IGFueSkge1xuLy8gICAgICAgICBsZXQgZmVhdHVyZSA9IGV2ZW50LmxheWVyO1xuLy8gICAgICAgICB0aGlzLmZpcmUoRXZlbnRzLkZFQVRVUkVfRURJVEVELCBmZWF0dXJlKTtcbi8vICAgICB9XG4vL1xuLy9cbi8vICAgICB1cGRhdGVGZWF0dXJlUG9wdXAoZmVhdHVyZSwgcG9wdXApIHtcbi8vICAgICAgICAgbGV0IGxhdExuZyA9IG51bGw7XG4vLyAgICAgICAgIGlmKHR5cGVvZihmZWF0dXJlLmdldExhdExuZykgIT09ICd1bmRlZmluZWQnKSB7XG4vLyAgICAgICAgICAgICBsYXRMbmcgPSBmZWF0dXJlLmdldExhdExuZygpO1xuLy8gICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGZlYXR1cmUuZ2V0Q2VudGVyKCkpICE9PSAndW5kZWZpbmVkJykge1xuLy8gICAgICAgICAgICAgbGF0TG5nID0gZmVhdHVyZS5nZXRDZW50ZXIoKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihsYXRMbmcpXG4vLyAgICAgICAgICAgICBwb3B1cC5zZXRMYXRMbmcobGF0TG5nKTtcbi8vICAgICB9XG4vLyB9XG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vIGNsYXNzIEVkaXRDb250cm9sIGV4dGVuZHMgQ29udHJvbCB7XG4vL1xuLy8gICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPzogYW55KSB7XG4vLyAgICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgaW5pdGlhbGl6ZSAob3B0aW9ucyA/OiBhbnkpIHtcbi8vIFx0XHRVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBvbkFkZCAobWFwIDogTWFwKSB7XG4vLyAgICAgICAgIGxldCBjb250YWluZXIgOiBIVE1MRWxlbWVudCA9IERvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sIGxlYWZsZXQtYmFyJyksXG4vLyAgICAgICAgICAgICBhY3RpdmF0ZUJ0biA6IEhUTUxBbmNob3JFbGVtZW50ID0gRG9tVXRpbC5jcmVhdGUoJ2EnLCAnJywgY29udGFpbmVyKSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcbi8vXG4vLyAgICAgICAgIGFjdGl2YXRlQnRuLmhyZWYgPSAnIyc7XG4vLyAgICAgICAgIGFjdGl2YXRlQnRuLnRpdGxlID0gJ0NyZWF0ZSBhIG5ldyAnICsgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmtpbmQ7XG4vLyAgICAgICAgIGFjdGl2YXRlQnRuLmlubmVySFRNTCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5odG1sO1xuLy9cbi8vICAgICAgICAgRG9tRXZlbnQub24oYWN0aXZhdGVCdG4sICdjbGljaycsIERvbUV2ZW50LnN0b3ApXG4vLyAgICAgICAgIC5vbihhY3RpdmF0ZUJ0biwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLkxBWUVSID0gdGhpcy5vcHRpb25zLmNhbGxiYWNrLmNhbGwoIChtYXAgYXMgYW55KS5lZGl0VG9vbHMgKTtcbi8vICAgICAgICAgfSwgdGhpcyk7XG4vL1xuLy8gICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuLy8gICAgIH1cbi8vXG4vLyB9XG4iXX0=