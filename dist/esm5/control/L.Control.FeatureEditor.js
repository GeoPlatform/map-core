/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var FeatureEditor = /** @class */ (function () {
    function FeatureEditor(map, feature, options) {
        this.map = map;
        this.feature = feature;
        this.visible = false;
    }
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.disable = /**
     *
     * @return {?}
     */
    function () {
        this.doneEditing(false);
        this.unregisterTool();
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.unregisterTool = /**
     *
     * @return {?}
     */
    function () {
        if (this.tool) {
            this.tool.deactivate();
            /** @type {?} */
            var map = this.map.getMap();
            map.removeControl(this.tool);
            map.removeLayer(this.editingLayer);
        }
    };
    /**
     * @param bool - flag specifying the visibility of the original feature being edited
     */
    /**
     * @param {?} bool - flag specifying the visibility of the original feature being edited
     * @return {?}
     */
    FeatureEditor.prototype.showOriginalLayer = /**
     * @param {?} bool - flag specifying the visibility of the original feature being edited
     * @return {?}
     */
    function (bool) {
        if (!this.feature)
            return;
        /** @type {?} */
        var id = this.feature.properties.id;
        /** @type {?} */
        var layer = this.map.getFeatureLayer(id);
        this.map.setFeatureVisibility(layer, bool);
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.beginEditing = /**
     *
     * @return {?}
     */
    function () {
        if (!this.visible)
            return;
        this.originalFeature = /** @type {?} */ (GeoJSON.geometryToLayer(this.feature.toGeoJSON()));
        this.feature.properties["_editing"] = true;
        /** @type {?} */
        var map = this.map.getMap();
        /** @type {?} */
        var feature = this.map.getFeatureLayer(this.feature.properties.id);
        if (!feature)
            return;
        /** @type {?} */
        var editingLayer = this.editingLayer = new FeatureGroup().addTo(map);
        //if the feature being edited is a multi-geometry
        // ("MultiPoint", "MultiLineString", "MultiPolygon", "GeometryCollection")
        // then we need to split them up into individual geometries and
        // add them as separate layers which will all be editable
        if (this.feature.geometry.type.indexOf("Multi") === 0) {
            /** @type {?} */
            var type_1 = this.feature.geometry.type.replace("Multi", "");
            this.feature.geometry.coordinates.each(function (childCoords) {
                /** @type {?} */
                var shape = { type: type_1, coordinates: childCoords };
                new GeoJSON(shape, {
                    onEachFeature: function (feature, layer) {
                        editingLayer.addLayer(layer);
                    }
                });
            });
        }
        else if (this.feature.geometry.type === 'GeometryCollection') {
            this.feature.geometry.geometries.each(function (childGeometry) {
                new GeoJSON(childGeometry, {
                    onEachFeature: function (feature, layer) {
                        editingLayer.addLayer(layer);
                    }
                });
            });
        }
        else {
            new GeoJSON(feature.toGeoJSON()).eachLayer(function (layer) {
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
    };
    /**
     * @param save - flag specifying whether to persist changes to the feature
     */
    /**
     * @param {?=} save - flag specifying whether to persist changes to the feature
     * @return {?}
     */
    FeatureEditor.prototype.doneEditing = /**
     * @param {?=} save - flag specifying whether to persist changes to the feature
     * @return {?}
     */
    function (save) {
        this.feature.properties["_editing"] = false;
        if (typeof (save) === 'undefined' || save) {
            //if geometry changed
            if (this.tool && this.tool.hasBeenEdited()) {
                /** @type {?} */
                var isMulti_1 = ~this.feature.geometry.type.indexOf("Multi");
                /** @type {?} */
                var isGeomColl_1 = this.feature.geometry.type === 'GeometryCollection';
                /** @type {?} */
                var geoms_1 = [];
                /** @type {?} */
                var coords_1 = [];
                /** @type {?} */
                var geometry_1 = void 0;
                this.editingLayer.eachLayer(function (layer) {
                    /** @type {?} */
                    var feature = (/** @type {?} */ (layer)).toGeoJSON();
                    geometry_1 = feature.geometry;
                    if (isMulti_1) {
                        coords_1[coords_1.length] = geometry_1.coordinates;
                    }
                    else if (isGeomColl_1) {
                        geoms_1[geoms_1.length] = feature;
                    }
                });
                //update existing feature with edited information
                if (isMulti_1)
                    this.feature.geometry.coordinates = coords_1;
                else if (isGeomColl_1)
                    this.feature.geometry.geometries = geoms_1;
                else
                    this.feature.geometry = geometry_1;
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
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.addProperty = /**
     *
     * @return {?}
     */
    function () {
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.highlightFeature = /**
     *
     * @return {?}
     */
    function () {
        this.map.focusFeature(this.feature.properties.id);
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.deleteFeature = /**
     *
     * @return {?}
     */
    function () {
        this.map.removeFeature(this.feature.properties.id);
    };
    /**
     * update rendered feature with latest info
     */
    /**
     * update rendered feature with latest info
     * @return {?}
     */
    FeatureEditor.prototype.updateFeature = /**
     * update rendered feature with latest info
     * @return {?}
     */
    function () {
        //if not editing a temporary feature...
        if (!this.editingLayer)
            this.map.updateFeature(this.feature);
        else {
            /** @type {?} */
            var style_1 = this.feature.properties["style"];
            this.editingLayer.eachLayer(function (layer) {
                //do nothing for markers
                if ((/** @type {?} */ (layer)).feature.geometry.type !== 'Point') {
                    (/** @type {?} */ (layer)).setStyle(style_1);
                }
            });
        }
    };
    /**
     *
     */
    /**
     *
     * @return {?}
     */
    FeatureEditor.prototype.cancelEditing = /**
     *
     * @return {?}
     */
    function () {
        this.feature = this.originalFeature;
        this.doneEditing(false);
    };
    return FeatureEditor;
}());
export default FeatureEditor;
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
var /**
 *
 */
EditFeature = /** @class */ (function (_super) {
    tslib_1.__extends(EditFeature, _super);
    function EditFeature(options) {
        return _super.call(this, Object.assign({
            position: 'bottomright',
            draw: false,
            edit: false
        }, options || {})) || this;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    EditFeature.prototype.onAdd = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this.map = map;
        this.enabled = false;
        /** @type {?} */
        var opts = {};
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
    };
    /**
     * @param {?} map
     * @return {?}
     */
    EditFeature.prototype.onRemove = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        this.deactivate();
    };
    /**
     * @return {?}
     */
    EditFeature.prototype.activate = /**
     * @return {?}
     */
    function () {
        this.enabled = true;
        this.handler.enable();
    };
    /**
     * @return {?}
     */
    EditFeature.prototype.deactivate = /**
     * @return {?}
     */
    function () {
        this.enabled = false;
        this.handler.disable();
    };
    /**
     * @return {?}
     */
    EditFeature.prototype.hasBeenEdited = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = false;
        if ((/** @type {?} */ (this.options)).featureGroup) {
            (/** @type {?} */ (this.options)).featureGroup.eachLayer(function (layer) {
                result = result || layer.edited;
            });
        }
        return result;
    };
    return EditFeature;
}(Control));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5Db250cm9sLkZlYXR1cmVFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJjb250cm9sL0wuQ29udHJvbC5GZWF0dXJlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUNTLFlBQVksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUNwQyxPQUFPLEVBQ2hCLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCcEMsSUFBQTtJQVdJLHVCQUFhLEdBQWlCLEVBQUUsT0FBc0IsRUFBRSxPQUFjO1FBQ2xFLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7S0FDeEI7SUFHRDs7T0FFRzs7Ozs7SUFDSCwrQkFBTzs7OztJQUFQO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDekI7SUFFRDs7T0FFRzs7Ozs7SUFDSCxzQ0FBYzs7OztJQUFkO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQWlCOzs7O0lBQWpCLFVBQWtCLElBQUk7UUFDbEIsSUFB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Q0YsbUJBQUMsSUFBVyxFQUFDLENBQUMsWUFBWSxHQUFHLG1CQUFDLElBQUksQ0FBQyxPQUFjLEVBQUMsQ0FBQyxZQUFZLENBQUM7UUFFaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7UUFFcEQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUM5RCxPQUFPLFNBQVMsQ0FBQztLQUNwQjs7Ozs7SUFFRCw4QkFBUTs7OztJQUFSLFVBQVUsR0FBUztRQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELDhCQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDekI7Ozs7SUFFRCxnQ0FBVTs7O0lBQVY7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzFCOzs7O0lBRUQsbUNBQWE7OztJQUFiOztRQUNJLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFHLG1CQUFDLElBQUksQ0FBQyxPQUFjLEVBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDbkMsbUJBQUMsSUFBSSxDQUFDLE9BQWMsRUFBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBUyxLQUFLO2dCQUN2RCxNQUFNLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLE1BQU0sQ0FBQztLQUNqQjtzQkEvVUw7RUFvUjBCLE9BQU8sRUE2RGhDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHtcbiAgICBNYXAsIExheWVyLCBGZWF0dXJlR3JvdXAsIENvbnRyb2wsIEdlb0pTT04sIHBvcHVwLFxuICAgIFV0aWwsIERvbVV0aWwsIERvbUV2ZW50LCBFdmVudGVkLCBDb250cm9sT3B0aW9uc1xufSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IERyYXcgfSBmcm9tICdsZWFmbGV0LWRyYXcnO1xuLy8gaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JzsgICAvL2ZvciBMZWFmbGV0LkRyYXdcbi8vIGNvbnN0IERyYXcgPSBMLkRyYXc7XG4vLyBjb25zdCBFZGl0SGFuZGxlciA9IERyYXcuRWRpdFRvb2xiYXIuRWRpdDtcblxuXG5cbmltcG9ydCBNYXBJbnN0YW5jZSBmcm9tICcuLi9tYXAvaW5zdGFuY2UnO1xuXG5cblxuaW50ZXJmYWNlIEVkaXRDb250cm9sT3B0aW9ucyBleHRlbmRzIENvbnRyb2xPcHRpb25zIHtcbiAgICBmZWF0dXJlR3JvdXAgOiBGZWF0dXJlR3JvdXBcbn1cblxuaW50ZXJmYWNlIEZlYXR1cmVMYXllciBleHRlbmRzIExheWVyIHtcbiAgICBmZWF0dXJlIDogYW55O1xuICAgIGdlb21ldHJ5IDogYW55O1xuICAgIHByb3BlcnRpZXMgOiB7XG4gICAgICAgIFtrZXk6c3RyaW5nXTogYW55O1xuICAgICAgICBpZCA6IHN0cmluZztcbiAgICB9XG4gICAgdG9HZW9KU09OKCkgOiBhbnk7XG4gICAgc2V0U3R5bGUoIGFyZ3MgOiBhbnkgKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWF0dXJlRWRpdG9yIHtcblxuXG4gICAgcHJpdmF0ZSBtYXAgOiBNYXBJbnN0YW5jZTtcbiAgICBwcml2YXRlIGZlYXR1cmUgOiBGZWF0dXJlTGF5ZXI7XG4gICAgcHJpdmF0ZSBvcmlnaW5hbEZlYXR1cmU6IEZlYXR1cmVMYXllcjtcbiAgICBwcml2YXRlIGVkaXRpbmdMYXllciA6IEZlYXR1cmVHcm91cDtcbiAgICBwcml2YXRlIHRvb2wgOiBFZGl0RmVhdHVyZTtcbiAgICBwcml2YXRlIHZpc2libGUgOiBib29sZWFuO1xuXG5cbiAgICBjb25zdHJ1Y3RvciggbWFwIDogTWFwSW5zdGFuY2UsIGZlYXR1cmUgOiBGZWF0dXJlTGF5ZXIsIG9wdGlvbnMgPzogYW55ICkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLmRvbmVFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgdGhpcy51bnJlZ2lzdGVyVG9vbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgdW5yZWdpc3RlclRvb2woKSB7XG4gICAgICAgIGlmKHRoaXMudG9vbCkge1xuICAgICAgICAgICAgdGhpcy50b29sLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLm1hcC5nZXRNYXAoKTtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVDb250cm9sKHRoaXMudG9vbCk7XG4gICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcy5lZGl0aW5nTGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJvb2wgLSBmbGFnIHNwZWNpZnlpbmcgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG9yaWdpbmFsIGZlYXR1cmUgYmVpbmcgZWRpdGVkXG4gICAgICovXG4gICAgc2hvd09yaWdpbmFsTGF5ZXIoYm9vbCkge1xuICAgICAgICBpZighdGhpcy5mZWF0dXJlKSByZXR1cm47XG4gICAgICAgIGxldCBpZCA9IHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkO1xuICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLm1hcC5nZXRGZWF0dXJlTGF5ZXIoaWQpO1xuICAgICAgICB0aGlzLm1hcC5zZXRGZWF0dXJlVmlzaWJpbGl0eShsYXllciwgYm9vbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBiZWdpbkVkaXRpbmcoKSB7XG5cbiAgICAgICAgaWYoIXRoaXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMub3JpZ2luYWxGZWF0dXJlID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIodGhpcy5mZWF0dXJlLnRvR2VvSlNPTigpKSBhcyBGZWF0dXJlTGF5ZXI7XG4gICAgICAgIHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLl9lZGl0aW5nPXRydWU7XG5cbiAgICAgICAgLy8gZ2V0IExlYWZsZXQuTWFwIGZyb20gaW5zdGFuY2VcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMubWFwLmdldE1hcCgpO1xuXG4gICAgICAgIC8vIGZpbmQgZmVhdHVyZSBsYXllciBmb3Igc3BlY2lmaWMgZmVhdHVyZVxuICAgICAgICBsZXQgZmVhdHVyZSA9IHRoaXMubWFwLmdldEZlYXR1cmVMYXllcih0aGlzLmZlYXR1cmUucHJvcGVydGllcy5pZCk7XG4gICAgICAgIGlmKCFmZWF0dXJlKSByZXR1cm47XG5cbiAgICAgICAgLy9jbG9uZSBmZWF0dXJlIGxheWVyIGFuZCB3cmFwIHdpdGggRmVhdHVyZUdyb3VwXG4gICAgICAgIC8vIGJlY2F1c2UgTGVhZmxldC5EcmF3IHJlcXVpcmVzIGVkaXRlZCBmZWF0dXJlc1xuICAgICAgICAvLyBiZSB3aXRoaW4gYSBGZWF0dXJlR3JvdXBcbiAgICAgICAgbGV0IGVkaXRpbmdMYXllciA9IHRoaXMuZWRpdGluZ0xheWVyID0gbmV3IEZlYXR1cmVHcm91cCgpLmFkZFRvKG1hcCk7XG5cbiAgICAgICAgLy9pZiB0aGUgZmVhdHVyZSBiZWluZyBlZGl0ZWQgaXMgYSBtdWx0aS1nZW9tZXRyeVxuICAgICAgICAvLyAoXCJNdWx0aVBvaW50XCIsIFwiTXVsdGlMaW5lU3RyaW5nXCIsIFwiTXVsdGlQb2x5Z29uXCIsIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCIpXG4gICAgICAgIC8vIHRoZW4gd2UgbmVlZCB0byBzcGxpdCB0aGVtIHVwIGludG8gaW5kaXZpZHVhbCBnZW9tZXRyaWVzIGFuZFxuICAgICAgICAvLyBhZGQgdGhlbSBhcyBzZXBhcmF0ZSBsYXllcnMgd2hpY2ggd2lsbCBhbGwgYmUgZWRpdGFibGVcbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlLmluZGV4T2YoXCJNdWx0aVwiKT09PTApIHtcbiAgICAgICAgICAgIGxldCB0eXBlID0gdGhpcy5mZWF0dXJlLmdlb21ldHJ5LnR5cGUucmVwbGFjZShcIk11bHRpXCIsXCJcIik7XG4gICAgICAgICAgICB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkuY29vcmRpbmF0ZXMuZWFjaCggKGNoaWxkQ29vcmRzKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNoYXBlID0ge3R5cGU6dHlwZSwgY29vcmRpbmF0ZXM6IGNoaWxkQ29vcmRzfTtcbiAgICAgICAgICAgICAgICBuZXcgR2VvSlNPTihzaGFwZSwge1xuICAgICAgICAgICAgICAgICAgICBvbkVhY2hGZWF0dXJlOiAoZmVhdHVyZSwgbGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmdMYXllci5hZGRMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ0dlb21ldHJ5Q29sbGVjdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuZmVhdHVyZS5nZW9tZXRyeS5nZW9tZXRyaWVzLmVhY2goIChjaGlsZEdlb21ldHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3IEdlb0pTT04oY2hpbGRHZW9tZXRyeSwge1xuICAgICAgICAgICAgICAgICAgICBvbkVhY2hGZWF0dXJlOiAgIChmZWF0dXJlLCBsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGluZ0xheWVyLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ldyBHZW9KU09OKGZlYXR1cmUudG9HZW9KU09OKCkpLmVhY2hMYXllciggKGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZWRpdGluZ0xheWVyLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9tYWtlIHRoaXMgZmVhdHVyZSBpbnZpc2libGVcbiAgICAgICAgdGhpcy5zaG93T3JpZ2luYWxMYXllcihmYWxzZSk7XG5cbiAgICAgICAgLy9yZWdpc3RlciBMZWFmbGV0RHJhdyBjb250cm9sIHdpdGggRWRpdCBtb2RlIG9ubHlcbiAgICAgICAgLy8gdXNpbmcganVzdCB0aGUgZmVhdHVyZSBsYXllciBpZGVudGlmaWVkXG4gICAgICAgIHRoaXMudG9vbCA9IG5ldyBFZGl0RmVhdHVyZSh7XG4gICAgICAgICAgICBmZWF0dXJlR3JvdXA6IGVkaXRpbmdMYXllclxuICAgICAgICB9IGFzIENvbnRyb2xPcHRpb25zKS5hZGRUbyhtYXApO1xuICAgICAgICB0aGlzLnRvb2wuYWN0aXZhdGUoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzYXZlIC0gZmxhZyBzcGVjaWZ5aW5nIHdoZXRoZXIgdG8gcGVyc2lzdCBjaGFuZ2VzIHRvIHRoZSBmZWF0dXJlXG4gICAgICovXG4gICAgZG9uZUVkaXRpbmcoIHNhdmUgPzogYm9vbGVhbiApIHtcblxuICAgICAgICB0aGlzLmZlYXR1cmUucHJvcGVydGllcy5fZWRpdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmKHR5cGVvZihzYXZlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc2F2ZSkge1xuXG4gICAgICAgICAgICAvL2lmIGdlb21ldHJ5IGNoYW5nZWRcbiAgICAgICAgICAgIGlmKHRoaXMudG9vbCAmJiB0aGlzLnRvb2wuaGFzQmVlbkVkaXRlZCgpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaXNNdWx0aSA9IH50aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZS5pbmRleE9mKFwiTXVsdGlcIik7XG4gICAgICAgICAgICAgICAgbGV0IGlzR2VvbUNvbGwgPSB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ0dlb21ldHJ5Q29sbGVjdGlvbic7XG4gICAgICAgICAgICAgICAgbGV0IGdlb21zID0gW10sIGNvb3JkcyA9IFtdLCBnZW9tZXRyeTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdMYXllci5lYWNoTGF5ZXIoIChsYXllciA6IExheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlID0gKGxheWVyIGFzIEZlYXR1cmVMYXllcikudG9HZW9KU09OKCk7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5ID0gZmVhdHVyZS5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNNdWx0aSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmRzW2Nvb3Jkcy5sZW5ndGhdID0gZ2VvbWV0cnkuY29vcmRpbmF0ZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihpc0dlb21Db2xsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9tc1tnZW9tcy5sZW5ndGhdID0gZmVhdHVyZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy91cGRhdGUgZXhpc3RpbmcgZmVhdHVyZSB3aXRoIGVkaXRlZCBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIGlmKGlzTXVsdGkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcyA9IGNvb3JkcztcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGlzR2VvbUNvbGwpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZS5nZW9tZXRyeS5nZW9tZXRyaWVzID0gZ2VvbXM7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcblxuICAgICAgICAgICAgICAgIC8vaW5mb3JtIE1hcCBvZiBjaGFuZ2VcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZXBsYWNlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vcmVzdG9yZSBvcmlnaW5hbCBsYXllclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd09yaWdpbmFsTGF5ZXIodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAvL3JlZHJhdyBmZWF0dXJlIHdpdGggbmV3IHN0eWxlIGluZm9cbiAgICAgICAgICAgICAgICB0aGlzLm1hcC51cGRhdGVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vcmVzdG9yZSBvcmlnaW5hbCBsYXllciAob25seSBpZiBmZWF0dXJlIGlzIHRvIGJlIHZpc2libGUpXG4gICAgICAgICAgICB0aGlzLnNob3dPcmlnaW5hbExheWVyKHRoaXMudmlzaWJsZSk7XG5cbiAgICAgICAgICAgIC8vUmVkcmF3IGZlYXR1cmUgd2hpY2ggaGFzIGJlZW4gdXBkYXRlZCB3aXRoXG4gICAgICAgICAgICAvLyBvcmlnaW5hbCBzdHlsZSBpbmZvcm1hdGlvbiAocmVzZXQpXG4gICAgICAgICAgICB0aGlzLm1hcC51cGRhdGVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xhc3RseSwgYnJlYWsgZG93biB0aGUgZWRpdGluZyB0b29sXG4gICAgICAgIGlmKHRoaXMudG9vbCkgdGhpcy51bnJlZ2lzdGVyVG9vbCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBhZGRQcm9wZXJ0eSgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgaGlnaGxpZ2h0RmVhdHVyZSgpIHtcbiAgICAgICAgdGhpcy5tYXAuZm9jdXNGZWF0dXJlKHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGRlbGV0ZUZlYXR1cmUoKSB7XG4gICAgICAgIHRoaXMubWFwLnJlbW92ZUZlYXR1cmUodGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSByZW5kZXJlZCBmZWF0dXJlIHdpdGggbGF0ZXN0IGluZm9cbiAgICAgKi9cbiAgICB1cGRhdGVGZWF0dXJlKCkge1xuXG4gICAgICAgIC8vaWYgbm90IGVkaXRpbmcgYSB0ZW1wb3JhcnkgZmVhdHVyZS4uLlxuICAgICAgICBpZighdGhpcy5lZGl0aW5nTGF5ZXIpXG4gICAgICAgICAgICB0aGlzLm1hcC51cGRhdGVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG5cbiAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIC8vZG9uJ3QgbmVlZCB0byB1cGRhdGUgZXhpc3RpbmcgcmVuZGVyZWQgZmVhdHVyZVxuICAgICAgICAgICAgLy8gYmVjYXVzZSBpdCdzIGJlZW4gaGlkZGVuIGFuZCBhIHRlbXBvcmFyeSAnZWRpdGluZycgdmVyc2lvblxuICAgICAgICAgICAgLy8gaXMgb24gdGhlIG1hcC4gU28gd2UgbmVlZCB0byB1cGRhdGUgdGhhdCBpbnN0ZWFkLlxuICAgICAgICAgICAgLy8gdGhpcy5tYXAudXBkYXRlRmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuXG5cbiAgICAgICAgICAgIC8vdXBkYXRlICdlZGl0aW5nJyB2ZXJzaW9uIG9mIHRoZSBmZWF0dXJlIGluIHF1ZXN0aW9uXG5cbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLnN0eWxlO1xuICAgICAgICAgICAgdGhpcy5lZGl0aW5nTGF5ZXIuZWFjaExheWVyKCAobGF5ZXIgOiBMYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIC8vZG8gbm90aGluZyBmb3IgbWFya2Vyc1xuICAgICAgICAgICAgICAgIGlmKChsYXllciBhcyBGZWF0dXJlTGF5ZXIpLmZlYXR1cmUuZ2VvbWV0cnkudHlwZSAhPT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgICAgICAgICAobGF5ZXIgYXMgRmVhdHVyZUxheWVyKS5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjYW5jZWxFZGl0aW5nICgpIHtcbiAgICAgICAgdGhpcy5mZWF0dXJlID0gdGhpcy5vcmlnaW5hbEZlYXR1cmU7XG4gICAgICAgIHRoaXMuZG9uZUVkaXRpbmcoZmFsc2UpO1xuICAgIH1cblxufVxuXG5cblxuXG5cblxuXG5cblxuLyoqXG4gKlxuICovXG5jbGFzcyBFZGl0RmVhdHVyZSBleHRlbmRzIENvbnRyb2wge1xuXG4gICAgcHJpdmF0ZSBtYXAgOiBNYXA7XG4gICAgcHJpdmF0ZSBlbmFibGVkIDogYm9vbGVhbjtcbiAgICBwcml2YXRlIGhhbmRsZXIgOiBEcmF3LkVkaXRUb29sYmFyLkVkaXQ7XG5cbiAgICBjb25zdHJ1Y3Rvciggb3B0aW9ucyA/OiBhbnkgKSB7XG4gICAgICAgIHN1cGVyKCBPYmplY3QuYXNzaWduKCB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdib3R0b21yaWdodCcsXG4gICAgICAgICAgICAgICAgZHJhdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZWRpdDogZmFsc2VcbiAgICAgICAgICAgIH0sIG9wdGlvbnMgfHwge30pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25BZGQgKG1hcCA6IE1hcCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG9wdHMgPSB7IH07XG4gICAgICAgIC8vbmVlZGVkIG9yIGVsc2UgTC5FZGl0VG9vbGJhci5FZGl0IGZhaWxzIHRvIGFkZEhvb2tzIGZvciBQb2x5TGluZSBmZWF0dXJlc1xuICAgICAgICAob3B0cyBhcyBhbnkpLnNlbGVjdGVkUGF0aE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBkYXNoQXJyYXk6ICcxMCwgMTAnLFxuICAgICAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgICAgIGZpbGxDb2xvcjogJyNmZTU3YTEnLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuMSxcbiAgICAgICAgICAgIC8vIFdoZXRoZXIgdG8gdXNlciB0aGUgZXhpc3RpbmcgbGF5ZXJzIGNvbG9yXG4gICAgICAgICAgICBtYWludGFpbkNvbG9yOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICAob3B0cyBhcyBhbnkpLmZlYXR1cmVHcm91cCA9ICh0aGlzLm9wdGlvbnMgYXMgYW55KS5mZWF0dXJlR3JvdXA7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IERyYXcuRWRpdFRvb2xiYXIuRWRpdChtYXAsIG9wdHMpO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBEb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtZWRpdC1mZWF0dXJlJyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgb25SZW1vdmUgKG1hcCA6IE1hcCkge1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYW5kbGVyLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIGRlYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhbmRsZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIGhhc0JlZW5FZGl0ZWQoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYoKHRoaXMub3B0aW9ucyBhcyBhbnkpLmZlYXR1cmVHcm91cCkge1xuICAgICAgICAgICAgKHRoaXMub3B0aW9ucyBhcyBhbnkpLmZlYXR1cmVHcm91cC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgbGF5ZXIuZWRpdGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBpbXBvcnQge1xuLy8gICAgIE1hcCwgTGF5ZXIsIEZlYXR1cmVHcm91cCwgQ29udHJvbCwgR2VvSlNPTiwgcG9wdXAsXG4vLyAgICAgVXRpbCwgRG9tVXRpbCwgRG9tRXZlbnQsIEV2ZW50ZWRcbi8vIH0gZnJvbSAnbGVhZmxldCc7XG4vLyBpbXBvcnQgKiBhcyBFZGl0YWJsZSBmcm9tIFwibGVhZmxldC1lZGl0YWJsZVwiO1xuLy9cbi8vIGltcG9ydCBNYXBJbnN0YW5jZSBmcm9tICcuLi9tYXAvaW5zdGFuY2UnO1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLyBjb25zdCBDQUxMQkFDS1MgPSB7XG4vLyAgICAgJ21hcmtlcicgICAgOiAnc3RhcnRNYXJrZXInLFxuLy8gICAgICdsaW5lJyAgICAgIDogJ3N0YXJ0UG9seWxpbmUnLFxuLy8gICAgICdwb2x5Z29uJyAgIDogJ3N0YXJ0UG9seWdvbicsXG4vLyAgICAgJ3JlY3RhbmdsZScgOiAnc3RhcnRSZWN0YW5nbGUnLFxuLy8gICAgICdjaXJjbGUnICAgIDogJ3N0YXJ0Q2lyY2xlJ1xuLy8gfTtcbi8vXG4vL1xuLy8gZXhwb3J0IGNvbnN0IEV2ZW50cyA9IHtcbi8vICAgICBGRUFUVVJFX0NSRUFURUQ6ICdmZWF0dXJlOmNyZWF0ZWQnLFxuLy8gICAgIEZFQVRVUkVfUkVNT1ZFRDogJ2ZlYXR1cmU6cmVtb3ZlZCcsXG4vLyAgICAgRkVBVFVSRV9FRElURUQ6ICdmZWF0dXJlOmVkaXRlZCdcbi8vIH07XG4vL1xuLy9cbi8vIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlYXR1cmVFZGl0b3IgZXh0ZW5kcyBFdmVudGVkIHtcbi8vXG4vLyAgICAgcHJpdmF0ZSBtYXAgOiBNYXBJbnN0YW5jZTtcbi8vICAgICBwcml2YXRlIGVkaXRvciA6IEVkaXRhYmxlO1xuLy8gICAgIHByaXZhdGUgZWRpdExheWVyIDogRmVhdHVyZUdyb3VwO1xuLy8gICAgIHByaXZhdGUgZmVhdHVyZXNMYXllciA6IEZlYXR1cmVHcm91cDtcbi8vXG4vLyAgICAgY29uc3RydWN0b3IobWFwIDogTWFwSW5zdGFuY2UsIG9wdGlvbnMgPzogYW55KSB7XG4vLyAgICAgICAgIHN1cGVyKCk7XG4vL1xuLy8gICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbi8vXG4vLyAgICAgICAgIGxldCBsZWFmbGV0TWFwIDogTWFwID0gbWFwLmdldE1hcCgpO1xuLy8gICAgICAgICBpZighbGVhZmxldE1hcCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gTGVhZmxldCBtYXAgaXMgY29uZmlndXJlZFwiKTtcbi8vXG4vLyAgICAgICAgIHRoaXMuZmVhdHVyZXNMYXllciA9IG1hcC5nZXRGZWF0dXJlTGF5ZXIoKTtcbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyID0gbmV3IEZlYXR1cmVHcm91cCgpO1xuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5hZGRUbyhsZWFmbGV0TWFwKTtcbi8vXG4vLyAgICAgICAgIGxldCBvcHRzIDogYW55ID0ge307XG4vLyAgICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgb3B0aW9uc3x8e30sIHtcbi8vICAgICAgICAgICAgIC8vZWRpdExheWVyIDogLi4uXG4vLyAgICAgICAgICAgICBmZWF0dXJlc0xheWVyIDogdGhpcy5lZGl0TGF5ZXIgLy9tYXAuZ2V0RmVhdHVyZUxheWVyKClcbi8vICAgICAgICAgICAgIC8vIGRyYXdpbmdDU1NDbGFzczogJ2xlYWZsZXQtZWRpdGFibGUtZHJhd2luZycsXG4vLyAgICAgICAgICAgICAvLyBkcmF3aW5nQ3Vyc29yOiAnY3Jvc3NoYWlyJyxcbi8vICAgICAgICAgICAgIC8vIHNraXBNaWRkbGVNYXJrZXJzOiB0cnVlXG4vLyAgICAgICAgIH0pO1xuLy9cbi8vICAgICAgICAgLy9jcmVhdGUgYW5kIHJlZ2lzdGVyIGVkaXRhYmxlIGluc3RhbmNlIG9uIGxlYWZsZXQgbWFwXG4vLyAgICAgICAgIGxldCBlZGl0b3IgPSBuZXcgRWRpdGFibGUobGVhZmxldE1hcCwgb3B0cyk7XG4vLyAgICAgICAgIChsZWFmbGV0TWFwIGFzIGFueSkuZWRpdFRvb2xzID0gZWRpdG9yO1xuLy8gICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTpkcmF3aW5nOmVuZCcsIChldmVudCA6IGFueSkgPT4ge1xuLy8gICAgICAgICAgICAgLy9oYXZlIHRvIHdyYXAgaGFuZGxlciBpbiBhIHRpbWVvdXQgaW4gb3JkZXIgdG8gbm90IGluYWR2ZXJ0ZW50bHlcbi8vICAgICAgICAgICAgIC8vIGJsb2NrIHRoZSBjbGVhbiB1cCBvZiBldmVudCBoYW5kbGVycyB3aXRoaW4gRWRpdGFibGVcbi8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLm9uRmVhdHVyZUNyZWF0ZWQoZXZlbnQpIH0sNTApO1xuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgLy8gdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmVkaXRpbmcnLCAoZXZlbnQgOiBhbnkpID0+IHsgdGhpcy5vbkZlYXR1cmVFZGl0ZWQoZXZlbnQpIH0pXG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZHJhd2luZzpzdGFydCcsIChldmVudDogYW55KSA9PiBjb25zb2xlLmxvZyhcIkRyYXdpbmcgU3RhcnRcIikgKTtcbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmRyYXdpbmc6ZW5kJywgKGV2ZW50OiBhbnkpID0+IGNvbnNvbGUubG9nKFwiRHJhd2luZyBFbmRcIikgKTtcbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmRyYXdpbmc6Y2FuY2VsJywgKGV2ZW50OiBhbnkpID0+IGNvbnNvbGUubG9nKFwiRHJhd2luZyBDYW5jZWxcIikgKTtcbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmRyYXdpbmc6Y29tbWl0JywgKGV2ZW50OiBhbnkpID0+IGNvbnNvbGUubG9nKFwiRHJhd2luZyBDb21taXRcIikgKTtcbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKFxuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOmRyYXdpbmc6c3RhcnQgZWRpdGFibGU6ZHJhd2luZzplbmQgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6ZHJhd2luZzpjYW5jZWwgZWRpdGFibGU6ZHJhd2luZzpjb21taXQgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6ZHJhd2luZzptb3VzZWRvd24gZWRpdGFibGU6ZHJhd2luZzptb3VzZXVwICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOmRyYXdpbmc6Y2xpY2sgZWRpdGFibGU6ZHJhd2luZzptb3ZlICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOmRyYXdpbmc6Y2xpY2tlZCcsXG4vLyAgICAgICAgICAgICAoZXZlbnQgOiBhbnkpID0+IHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVkaXRvciBldmVudDogXCIgKyBldmVudC50eXBlKTtcbi8vICAgICAgICAgICAgICAgICBpZihldmVudC5sYXllciAmJiBldmVudC5sYXllci5vcHRpb25zLnBvcHVwKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRmVhdHVyZVBvcHVwKGV2ZW50LmxheWVyLCBldmVudC5sYXllci5vcHRpb25zLnBvcHVwKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICk7XG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbihcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6bmV3IGVkaXRhYmxlOnZlcnRleDpjbGljayAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6Y2xpY2tlZCBlZGl0YWJsZTp2ZXJ0ZXg6cmF3Y2xpY2sgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4OmRlbGV0ZWQgZWRpdGFibGU6dmVydGV4OmN0cmxjbGljayAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6c2hpZnRjbGljayBlZGl0YWJsZTp2ZXJ0ZXg6bWV0YWtleWNsaWNrICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDphbHRjbGljayBlZGl0YWJsZTp2ZXJ0ZXg6Y29udGV4dG1lbnUgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4Om1vdXNlZG93biBlZGl0YWJsZTp2ZXJ0ZXg6ZHJhZyAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6ZHJhZ3N0YXJ0IGVkaXRhYmxlOnZlcnRleDpkcmFnZW5kICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOm1pZGRsZW1hcmtlcjptb3VzZWRvd24nLFxuLy8gICAgICAgICAgICAgKGV2ZW50IDogYW55KSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWZXJ0ZXggZXZlbnQ6IFwiICsgZXZlbnQudHlwZSk7XG4vLyAgICAgICAgICAgICAgICAgLy8gaWYoZXZlbnQubGF5ZXIgJiYgZXZlbnQubGF5ZXIub3B0aW9ucy5wb3B1cCkge1xuLy8gICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnVwZGF0ZUZlYXR1cmVQb3B1cChldmVudC5sYXllciwgZXZlbnQubGF5ZXIub3B0aW9ucy5wb3B1cCk7XG4vLyAgICAgICAgICAgICAgICAgLy8gfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICApO1xuLy9cbi8vICAgICAgICAgaWYob3B0cy5tYXJrZXIpIHtcbi8vICAgICAgICAgICAgIGxlYWZsZXRNYXAuYWRkQ29udHJvbChuZXcgRWRpdENvbnRyb2woe1xuLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRzLnBvc2l0aW9uIHx8ICd0b3BsZWZ0Jyxcbi8vICAgICAgICAgICAgICAgICBjYWxsYmFjazogZWRpdG9yW0NBTExCQUNLUy5tYXJrZXJdLFxuLy8gICAgICAgICAgICAgICAgIGtpbmQ6ICdtYXJrZXInLFxuLy8gICAgICAgICAgICAgICAgIGh0bWw6IG9wdHMubWFya2VyLmljb24gPyBvcHRzLm1hcmtlci5pY29uIDogJ/CflognXG4vLyAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYob3B0cy5saW5lKSB7XG4vLyAgICAgICAgICAgICBsZWFmbGV0TWFwLmFkZENvbnRyb2wobmV3IEVkaXRDb250cm9sKHtcbi8vICAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0cy5wb3NpdGlvbiB8fCAndG9wbGVmdCcsXG4vLyAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGVkaXRvcltDQUxMQkFDS1MubGluZV0sXG4vLyAgICAgICAgICAgICAgICAga2luZDogJ2xpbmUnLFxuLy8gICAgICAgICAgICAgICAgIGh0bWw6IG9wdHMubGluZS5pY29uID8gb3B0cy5saW5lLmljb24gOiAnXFxcXC9cXFxcJ1xuLy8gICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmKG9wdHMucG9seWdvbikge1xuLy8gICAgICAgICAgICAgbGVhZmxldE1hcC5hZGRDb250cm9sKG5ldyBFZGl0Q29udHJvbCh7XG4vLyAgICAgICAgICAgICAgICAgcG9zaXRpb246IG9wdHMucG9zaXRpb24gfHwgJ3RvcGxlZnQnLFxuLy8gICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBlZGl0b3JbQ0FMTEJBQ0tTLnBvbHlnb25dLFxuLy8gICAgICAgICAgICAgICAgIGtpbmQ6ICdwb2x5Z29uJyxcbi8vICAgICAgICAgICAgICAgICBodG1sOiBvcHRzLnBvbHlnb24uaWNvbiA/IG9wdHMucG9seWdvbi5pY29uIDogJ+KWsCdcbi8vICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihvcHRzLnJlY3RhbmdsZSkge1xuLy8gICAgICAgICAgICAgbGVhZmxldE1hcC5hZGRDb250cm9sKG5ldyBFZGl0Q29udHJvbCh7XG4vLyAgICAgICAgICAgICAgICAgcG9zaXRpb246IG9wdHMucG9zaXRpb24gfHwgJ3RvcGxlZnQnLFxuLy8gICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBlZGl0b3JbQ0FMTEJBQ0tTLnJlY3RhbmdsZV0sXG4vLyAgICAgICAgICAgICAgICAga2luZDogJ3JlY3RhbmdsZScsXG4vLyAgICAgICAgICAgICAgICAgaHRtbDogb3B0cy5yZWN0YW5nbGUuaWNvbiA/IG9wdHMucmVjdGFuZ2xlLmljb24gOiAn4qybJ1xuLy8gICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmKG9wdHMuY2lyY2xlKSB7XG4vLyAgICAgICAgICAgICBsZWFmbGV0TWFwLmFkZENvbnRyb2wobmV3IEVkaXRDb250cm9sKHtcbi8vICAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0cy5wb3NpdGlvbiB8fCAndG9wbGVmdCcsXG4vLyAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGVkaXRvcltDQUxMQkFDS1MuY2lyY2xlXSxcbi8vICAgICAgICAgICAgICAgICBraW5kOiAnY2lyY2xlJyxcbi8vICAgICAgICAgICAgICAgICBodG1sOiBvcHRzLmNpcmNsZS5pY29uID8gb3B0cy5jaXJjbGUuaWNvbiA6ICfirKQnXG4vLyAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vL1xuLy8gICAgIGlzRHJhd2luZygpIDogYm9vbGVhbiB7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLmVkaXRvciA/IHRoaXMuZWRpdG9yLmRyYXdpbmcoKSA6IGZhbHNlO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgY2FuY2VsKCkge1xuLy8gICAgICAgICBpZih0aGlzLmVkaXRvcikgdGhpcy5lZGl0b3Iuc3RvcERyYXdpbmcoKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgdG8gYmUgZWRpdGVkXG4vLyAgICAgICovXG4vLyAgICAgZW5hYmxlRmVhdHVyZUVkaXQoIGZlYXR1cmUgOiBhbnkgKSB7XG4vLyAgICAgICAgIGlmKCFmZWF0dXJlKSByZXR1cm47XG4vL1xuLy8gICAgICAgICBpZighZmVhdHVyZS5wcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbi8vXG4vLyAgICAgICAgIGxldCBmaWQgPSAgdGhpcy5nZXRGZWF0dXJlSWQoZmVhdHVyZSwgdHJ1ZSk7XG4vL1xuLy8gICAgICAgICAvL21ha2UgYSBjbG9uZSBvZiB0aGUgZmVhdHVyZSB0byBiZSBlZGl0ZWRcbi8vICAgICAgICAgbGV0IGpzb24gPSAoZmVhdHVyZSBhcyBhbnkpLnRvR2VvSlNPTigpO1xuLy8gICAgICAgICBsZXQgZWRpdGVkTGF5ZXIgPSBHZW9KU09OLmdlb21ldHJ5VG9MYXllcihqc29uKTtcbi8vICAgICAgICAgVXRpbC5zZXRPcHRpb25zKGVkaXRlZExheWVyLCB7IG9yaWdpbmFsTGF5ZXJJZCA6IGZpZCB9KTtcbi8vXG4vLyAgICAgICAgIC8vaGlkZSB0aGF0IGZlYXR1cmUgb24gZmVhdHVyZXNMYXllclxuLy8gICAgICAgICB0aGlzLm1hcC5zZXRGZWF0dXJlVmlzaWJpbGl0eShmZWF0dXJlLCBmYWxzZSk7XG4vL1xuLy8gICAgICAgICAvL2FuZCBhZGQgdGhlIGVkaXRibGUgY2xvbmUgb2YgaXQgdG8gdGhlIGVkaXQgbGF5ZXJcbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIuYWRkTGF5ZXIoZWRpdGVkTGF5ZXIpO1xuLy8gICAgICAgICAoZWRpdGVkTGF5ZXIgYXMgYW55KS50b2dnbGVFZGl0KCk7XG4vLyAgICAgfVxuLy9cbi8vICAgICAvKipcbi8vICAgICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIGJlaW5nIGVkaXRlZFxuLy8gICAgICAqL1xuLy8gICAgIGFwcGx5RmVhdHVyZUVkaXQoIGZlYXR1cmUgOiBhbnkgKSB7XG4vL1xuLy8gICAgICAgICBsZXQgZWRpdGVkTGF5ZXIgPSB0aGlzLmZpbmRFZGl0ZWRGZWF0dXJlTGF5ZXIoZmVhdHVyZSk7XG4vLyAgICAgICAgIGlmKCFlZGl0ZWRMYXllcikgcmV0dXJuO1xuLy9cbi8vICAgICAgICAgKGVkaXRlZExheWVyIGFzIGFueSkudG9nZ2xlRWRpdCgpOyAgICAgICAgICAgICAgICAgICAvL3R1cm4gb2ZmIGVkaXRvclxuLy9cbi8vICAgICAgICAgbGV0IGpzb24gPSAoZWRpdGVkTGF5ZXIgYXMgYW55KS50b0dlb0pTT04oKTtcbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIucmVtb3ZlTGF5ZXIoZWRpdGVkTGF5ZXIpOyAgICAvL3JlbW92ZSBmcm9tIGVkaXQgbGF5ZXJcbi8vXG4vLyAgICAgICAgIC8vIGxldCB1cGRhdGVkTGF5ZXIgPSBHZW9KU09OLmdlb21ldHJ5VG9MYXllcihqc29uKTtcbi8vICAgICAgICAgdGhpcy5tYXAucmVwbGFjZUZlYXR1cmUoanNvbik7XG4vLyAgICAgICAgIHRoaXMubWFwLnNldEZlYXR1cmVWaXNpYmlsaXR5KGZlYXR1cmUsIHRydWUpO1xuLy9cbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgYmVpbmcgZWRpdGVkXG4vLyAgICAgICovXG4vLyAgICAgY2FuY2VsRmVhdHVyZUVkaXQoIGZlYXR1cmUgOiBhbnkgKSB7XG4vL1xuLy8gICAgICAgICBsZXQgZWRpdGVkTGF5ZXIgPSB0aGlzLmZpbmRFZGl0ZWRGZWF0dXJlTGF5ZXIoZmVhdHVyZSk7XG4vLyAgICAgICAgIGlmKCFlZGl0ZWRMYXllcikgcmV0dXJuO1xuLy9cbi8vICAgICAgICAgKGVkaXRlZExheWVyIGFzIGFueSkudG9nZ2xlRWRpdCgpOyAgICAgICAgICAgICAgICAgICAvL3R1cm4gb2ZmIGVkaXRvclxuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5yZW1vdmVMYXllcihlZGl0ZWRMYXllcik7ICAgIC8vYW5kIHJlbW92ZSBmcm9tIGVkaXQgbGF5ZXJcbi8vXG4vLyAgICAgICAgIC8vcmUtc2hvdyB0aGUgb3JpZ2luYWwgZmVhdHVyZSBsYXllclxuLy8gICAgICAgICB0aGlzLm1hcC5zZXRGZWF0dXJlVmlzaWJpbGl0eShmZWF0dXJlLCB0cnVlKTtcbi8vXG4vLyAgICAgfVxuLy9cbi8vICAgICAvKipcbi8vICAgICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlIExheWVyIGFzc29jaWF0ZWQgd2l0aCBhbiBlZGl0YWJsZSBmZWF0dXJlXG4vLyAgICAgICogQHJldHVybiBlZGl0YWJsZSBGZWF0dXJlIExheWVyIGFzc29jYWl0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHBhcmFtZXRlciBGZWF0dXJlIExheWVyXG4vLyAgICAgICovXG4vLyAgICAgZmluZEVkaXRlZEZlYXR1cmVMYXllciggZmVhdHVyZSA6IGFueSApIDogTGF5ZXIge1xuLy8gICAgICAgICBsZXQgZWRpdGVkTGF5ZXIgOiBMYXllciA9IG51bGw7XG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLmVhY2hMYXllciggKGxheWVyIDogYW55KSA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgZmlkID0gdGhpcy5nZXRGZWF0dXJlSWQobGF5ZXIpO1xuLy8gICAgICAgICAgICAgaWYoICFlZGl0ZWRMYXllciAmJiBmaWQgPT0gbGF5ZXIub3JpZ2luYWxMYXllcklkICkge1xuLy8gICAgICAgICAgICAgICAgIGVkaXRlZExheWVyID0gbGF5ZXIgYXMgTGF5ZXI7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICByZXR1cm4gZWRpdGVkTGF5ZXI7XG4vLyAgICAgfVxuLy9cbi8vICAgICAvKipcbi8vICAgICAgKiBAcGFyYW0gZmVhdHVyZSBGZWF0dXJlXG4vLyAgICAgICogQHBhcmFtIGNyZWF0ZUFzTmVlZGVkIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGNyZWF0ZSBhbiBJRCBpZiBmZWF0dXJlIGhhcyBub25lXG4vLyAgICAgICogQHJldHVybiBmZWF0dXJlIGlkIG9yIG51bGxcbi8vICAgICAgKi9cbi8vICAgICBnZXRGZWF0dXJlSWQoIGZlYXR1cmUgOiBhbnkgLCBjcmVhdGVBc05lZWRlZCA/OiBib29sZWFuKSA6IHN0cmluZyB7XG4vLyAgICAgICAgIGlmKCFmZWF0dXJlKSByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgaWYoIWZlYXR1cmUucHJvcGVydGllcykgZmVhdHVyZS5wcm9wZXJ0aWVzID0ge307XG4vLyAgICAgICAgIGxldCBmZWF0dXJlSWQgPSBmZWF0dXJlLnByb3BlcnRpZXMuaWQgfHwgbnVsbDtcbi8vICAgICAgICAgaWYoIWZlYXR1cmVJZCAmJiB0cnVlID09PSBjcmVhdGVBc05lZWRlZClcbi8vICAgICAgICAgICAgIGZlYXR1cmVJZCA9IGZlYXR1cmUucHJvcGVydGllcy5pZCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSo5OTk5KTtcbi8vICAgICAgICAgcmV0dXJuIGZlYXR1cmVJZDtcbi8vICAgICB9XG4vL1xuLy9cbi8vXG4vL1xuLy8gICAgIG9uRmVhdHVyZUNyZWF0ZWQoZXZlbnQgOiBhbnkpIHtcbi8vICAgICAgICAgbGV0IGZlYXR1cmUgOiBhbnkgPSBldmVudC5sYXllcjtcbi8vXG4vLyAgICAgICAgIGlmKCB0eXBlb2YoZmVhdHVyZS5lZGl0RW5hYmxlZCkgIT09ICd1bmRlZmluZWQnICYmIGZlYXR1cmUuZWRpdEVuYWJsZWQoKSApIHtcbi8vICAgICAgICAgICAgIGZlYXR1cmUudG9nZ2xlRWRpdCgpO1xuLy8gICAgICAgICB9XG4vL1xuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5yZW1vdmVMYXllcihmZWF0dXJlKTtcbi8vICAgICAgICAgaWYodGhpcy5mZWF0dXJlc0xheWVyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLmZlYXR1cmVzTGF5ZXIuYWRkTGF5ZXIoZmVhdHVyZSk7XG4vLyAgICAgICAgICAgICBmZWF0dXJlLm9uKCdkYmxjbGljaycsIERvbUV2ZW50LnN0b3ApLm9uKCdkYmxjbGljaycsICgpID0+IHtcbi8vXG4vLyAgICAgICAgICAgICAgICAgKGZlYXR1cmUgYXMgYW55KS50b2dnbGVFZGl0KCk7XG4vL1xuLy8gICAgICAgICAgICAgICAgIGlmKGZlYXR1cmUuZWRpdEVuYWJsZWQoKSkgeyAvLydlZGl0YWJsZTplbmFibGUnXG4vLyAgICAgICAgICAgICAgICAgICAgIC8vYWRkIGEgc2F2ZSBhbmQgY2FuY2VsIGJ0bi4uLlxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGxhdExuZyA9IG51bGw7XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihmZWF0dXJlLmdldExhdExuZykgIT09ICd1bmRlZmluZWQnKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXRMbmcgPSBmZWF0dXJlLmdldExhdExuZygpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKGZlYXR1cmUuZ2V0Q2VudGVyKCkpICE9PSAndW5kZWZpbmVkJykge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0TG5nID0gZmVhdHVyZS5nZXRDZW50ZXIoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGZwID0gcG9wdXAoe1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlT25Fc2NhcGVLZXk6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNsaWNrOiBmYWxzZVxuLy8gICAgICAgICAgICAgICAgICAgICB9KS5zZXRMYXRMbmcobGF0TG5nKVxuLy8gICAgICAgICAgICAgICAgICAgICAuc2V0Q29udGVudCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+U2F2ZTwvYnV0dG9uPiAmbmJzcDsmbmJzcDsmbmJzcDsgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+Jylcbi8vICAgICAgICAgICAgICAgICAgICAgLm9wZW5Pbih0aGlzLm1hcC5nZXRNYXAoKSk7XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBVdGlsLnNldE9wdGlvbnMoZmVhdHVyZSwge3BvcHVwIDogZnB9KTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBmZWF0dXJlLm9wdGlvbnMucG9wdXAgKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUub3B0aW9ucy5wb3B1cC5yZW1vdmUoKTtcbi8vICAgICAgICAgICAgICAgICAgICAgLy8gZmVhdHVyZS5lZGl0b3Iub2ZmKCdlZGl0YWJsZTpkcmF3aW5nOnN0YXJ0LGVkaXRhYmxlOmRyYXdpbmc6ZW5kLGVkaXRhYmxlOmRyYXdpbmc6Y2FuY2VsLGVkaXRhYmxlOmRyYXdpbmc6Y29tbWl0LGVkaXRhYmxlOmRyYXdpbmc6bW91c2Vkb3duLGVkaXRhYmxlOmRyYXdpbmc6bW91c2V1cCxlZGl0YWJsZTpkcmF3aW5nOmNsaWNrLGVkaXRhYmxlOmRyYXdpbmc6bW92ZSxlZGl0YWJsZTpkcmF3aW5nOmNsaWNrZWQnKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgdGhpcy5maXJlKEV2ZW50cy5GRUFUVVJFX0NSRUFURUQsIGZlYXR1cmUpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgb25GZWF0dXJlRWRpdGVkKGV2ZW50IDogYW55KSB7XG4vLyAgICAgICAgIGxldCBmZWF0dXJlID0gZXZlbnQubGF5ZXI7XG4vLyAgICAgICAgIHRoaXMuZmlyZShFdmVudHMuRkVBVFVSRV9FRElURUQsIGZlYXR1cmUpO1xuLy8gICAgIH1cbi8vXG4vL1xuLy8gICAgIHVwZGF0ZUZlYXR1cmVQb3B1cChmZWF0dXJlLCBwb3B1cCkge1xuLy8gICAgICAgICBsZXQgbGF0TG5nID0gbnVsbDtcbi8vICAgICAgICAgaWYodHlwZW9mKGZlYXR1cmUuZ2V0TGF0TG5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICAgICAgICAgIGxhdExuZyA9IGZlYXR1cmUuZ2V0TGF0TG5nKCk7XG4vLyAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoZmVhdHVyZS5nZXRDZW50ZXIoKSkgIT09ICd1bmRlZmluZWQnKSB7XG4vLyAgICAgICAgICAgICBsYXRMbmcgPSBmZWF0dXJlLmdldENlbnRlcigpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmKGxhdExuZylcbi8vICAgICAgICAgICAgIHBvcHVwLnNldExhdExuZyhsYXRMbmcpO1xuLy8gICAgIH1cbi8vIH1cbi8vXG4vL1xuLy9cbi8vXG4vL1xuLy8gY2xhc3MgRWRpdENvbnRyb2wgZXh0ZW5kcyBDb250cm9sIHtcbi8vXG4vLyAgICAgY29uc3RydWN0b3Iob3B0aW9ucyA/OiBhbnkpIHtcbi8vICAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBpbml0aWFsaXplIChvcHRpb25zID86IGFueSkge1xuLy8gXHRcdFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIG9uQWRkIChtYXAgOiBNYXApIHtcbi8vICAgICAgICAgbGV0IGNvbnRhaW5lciA6IEhUTUxFbGVtZW50ID0gRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wgbGVhZmxldC1iYXInKSxcbi8vICAgICAgICAgICAgIGFjdGl2YXRlQnRuIDogSFRNTEFuY2hvckVsZW1lbnQgPSBEb21VdGlsLmNyZWF0ZSgnYScsICcnLCBjb250YWluZXIpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xuLy9cbi8vICAgICAgICAgYWN0aXZhdGVCdG4uaHJlZiA9ICcjJztcbi8vICAgICAgICAgYWN0aXZhdGVCdG4udGl0bGUgPSAnQ3JlYXRlIGEgbmV3ICcgKyAodGhpcy5vcHRpb25zIGFzIGFueSkua2luZDtcbi8vICAgICAgICAgYWN0aXZhdGVCdG4uaW5uZXJIVE1MID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmh0bWw7XG4vL1xuLy8gICAgICAgICBEb21FdmVudC5vbihhY3RpdmF0ZUJ0biwgJ2NsaWNrJywgRG9tRXZlbnQuc3RvcClcbi8vICAgICAgICAgLm9uKGFjdGl2YXRlQnRuLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAod2luZG93IGFzIGFueSkuTEFZRVIgPSB0aGlzLm9wdGlvbnMuY2FsbGJhY2suY2FsbCggKG1hcCBhcyBhbnkpLmVkaXRUb29scyApO1xuLy8gICAgICAgICB9LCB0aGlzKTtcbi8vXG4vLyAgICAgICAgIHJldHVybiBjb250YWluZXI7XG4vLyAgICAgfVxuLy9cbi8vIH1cbiJdfQ==