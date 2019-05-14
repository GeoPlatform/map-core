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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1lZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvZmVhdHVyZS1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQ1MsWUFBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQ3BDLE9BQU8sRUFDaEIsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJwQyxJQUFBO0lBV0ksdUJBQWEsR0FBaUIsRUFBRSxPQUFzQixFQUFFLE9BQWM7UUFDbEUsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztLQUN4QjtJQUdEOztPQUVHOzs7OztJQUNILCtCQUFPOzs7O0lBQVA7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6QjtJQUVEOztPQUVHOzs7OztJQUNILHNDQUFjOzs7O0lBQWQ7UUFDSSxJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztZQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3RDO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBaUI7Ozs7SUFBakIsVUFBa0IsSUFBSTtRQUNsQixJQUFHLENBQUMsSUFBSSxD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LEVBQUMsQ0FBQyxZQUFZLEdBQUcsbUJBQUMsSUFBSSxDQUFDLE9BQWMsRUFBQyxDQUFDLFlBQVksQ0FBQztRQUVoRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUVwRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQzlELE9BQU8sU0FBUyxDQUFDO0tBQ3BCOzs7OztJQUVELDhCQUFROzs7O0lBQVIsVUFBVSxHQUFTO1FBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsOEJBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN6Qjs7OztJQUVELGdDQUFVOzs7SUFBVjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDMUI7Ozs7SUFFRCxtQ0FBYTs7O0lBQWI7O1FBQ0ksSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUcsbUJBQUMsSUFBSSxDQUFDLE9BQWMsRUFBQyxDQUFDLFlBQVksRUFBRTtZQUNuQyxtQkFBQyxJQUFJLENBQUMsT0FBYyxFQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFTLEtBQUs7Z0JBQ3ZELE1BQU0sR0FBRyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNuQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sTUFBTSxDQUFDO0tBQ2pCO3NCQS9VTDtFQW9SMEIsT0FBTyxFQTZEaEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQge1xuICAgIE1hcCwgTGF5ZXIsIEZlYXR1cmVHcm91cCwgQ29udHJvbCwgR2VvSlNPTiwgcG9wdXAsXG4gICAgVXRpbCwgRG9tVXRpbCwgRG9tRXZlbnQsIEV2ZW50ZWQsIENvbnRyb2xPcHRpb25zXG59IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgRHJhdyB9IGZyb20gJ2xlYWZsZXQtZHJhdyc7XG4vLyBpbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnOyAgIC8vZm9yIExlYWZsZXQuRHJhd1xuLy8gY29uc3QgRHJhdyA9IEwuRHJhdztcbi8vIGNvbnN0IEVkaXRIYW5kbGVyID0gRHJhdy5FZGl0VG9vbGJhci5FZGl0O1xuXG5cblxuaW1wb3J0IE1hcEluc3RhbmNlIGZyb20gJy4uL21hcC9pbnN0YW5jZSc7XG5cblxuXG5pbnRlcmZhY2UgRWRpdENvbnRyb2xPcHRpb25zIGV4dGVuZHMgQ29udHJvbE9wdGlvbnMge1xuICAgIGZlYXR1cmVHcm91cCA6IEZlYXR1cmVHcm91cFxufVxuXG5pbnRlcmZhY2UgRmVhdHVyZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICAgIGZlYXR1cmUgOiBhbnk7XG4gICAgZ2VvbWV0cnkgOiBhbnk7XG4gICAgcHJvcGVydGllcyA6IHtcbiAgICAgICAgW2tleTpzdHJpbmddOiBhbnk7XG4gICAgICAgIGlkIDogc3RyaW5nO1xuICAgIH1cbiAgICB0b0dlb0pTT04oKSA6IGFueTtcbiAgICBzZXRTdHlsZSggYXJncyA6IGFueSApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlYXR1cmVFZGl0b3Ige1xuXG5cbiAgICBwcml2YXRlIG1hcCA6IE1hcEluc3RhbmNlO1xuICAgIHByaXZhdGUgZmVhdHVyZSA6IEZlYXR1cmVMYXllcjtcbiAgICBwcml2YXRlIG9yaWdpbmFsRmVhdHVyZTogRmVhdHVyZUxheWVyO1xuICAgIHByaXZhdGUgZWRpdGluZ0xheWVyIDogRmVhdHVyZUdyb3VwO1xuICAgIHByaXZhdGUgdG9vbCA6IEVkaXRGZWF0dXJlO1xuICAgIHByaXZhdGUgdmlzaWJsZSA6IGJvb2xlYW47XG5cblxuICAgIGNvbnN0cnVjdG9yKCBtYXAgOiBNYXBJbnN0YW5jZSwgZmVhdHVyZSA6IEZlYXR1cmVMYXllciwgb3B0aW9ucyA/OiBhbnkgKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICB0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuZG9uZUVkaXRpbmcoZmFsc2UpO1xuICAgICAgICB0aGlzLnVucmVnaXN0ZXJUb29sKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyVG9vbCgpIHtcbiAgICAgICAgaWYodGhpcy50b29sKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2wuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgbGV0IG1hcCA9IHRoaXMubWFwLmdldE1hcCgpO1xuICAgICAgICAgICAgbWFwLnJlbW92ZUNvbnRyb2wodGhpcy50b29sKTtcbiAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcih0aGlzLmVkaXRpbmdMYXllcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYm9vbCAtIGZsYWcgc3BlY2lmeWluZyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgb3JpZ2luYWwgZmVhdHVyZSBiZWluZyBlZGl0ZWRcbiAgICAgKi9cbiAgICBzaG93T3JpZ2luYWxMYXllcihib29sKSB7XG4gICAgICAgIGlmKCF0aGlzLmZlYXR1cmUpIHJldHVybjtcbiAgICAgICAgbGV0IGlkID0gdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuaWQ7XG4gICAgICAgIGxldCBsYXllciA9IHRoaXMubWFwLmdldEZlYXR1cmVMYXllcihpZCk7XG4gICAgICAgIHRoaXMubWFwLnNldEZlYXR1cmVWaXNpYmlsaXR5KGxheWVyLCBib29sKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGJlZ2luRWRpdGluZygpIHtcblxuICAgICAgICBpZighdGhpcy52aXNpYmxlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5vcmlnaW5hbEZlYXR1cmUgPSBHZW9KU09OLmdlb21ldHJ5VG9MYXllcih0aGlzLmZlYXR1cmUudG9HZW9KU09OKCkpIGFzIEZlYXR1cmVMYXllcjtcbiAgICAgICAgdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuX2VkaXRpbmc9dHJ1ZTtcblxuICAgICAgICAvLyBnZXQgTGVhZmxldC5NYXAgZnJvbSBpbnN0YW5jZVxuICAgICAgICBsZXQgbWFwID0gdGhpcy5tYXAuZ2V0TWFwKCk7XG5cbiAgICAgICAgLy8gZmluZCBmZWF0dXJlIGxheWVyIGZvciBzcGVjaWZpYyBmZWF0dXJlXG4gICAgICAgIGxldCBmZWF0dXJlID0gdGhpcy5tYXAuZ2V0RmVhdHVyZUxheWVyKHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLmlkKTtcbiAgICAgICAgaWYoIWZlYXR1cmUpIHJldHVybjtcblxuICAgICAgICAvL2Nsb25lIGZlYXR1cmUgbGF5ZXIgYW5kIHdyYXAgd2l0aCBGZWF0dXJlR3JvdXBcbiAgICAgICAgLy8gYmVjYXVzZSBMZWFmbGV0LkRyYXcgcmVxdWlyZXMgZWRpdGVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGJlIHdpdGhpbiBhIEZlYXR1cmVHcm91cFxuICAgICAgICBsZXQgZWRpdGluZ0xheWVyID0gdGhpcy5lZGl0aW5nTGF5ZXIgPSBuZXcgRmVhdHVyZUdyb3VwKCkuYWRkVG8obWFwKTtcblxuICAgICAgICAvL2lmIHRoZSBmZWF0dXJlIGJlaW5nIGVkaXRlZCBpcyBhIG11bHRpLWdlb21ldHJ5XG4gICAgICAgIC8vIChcIk11bHRpUG9pbnRcIiwgXCJNdWx0aUxpbmVTdHJpbmdcIiwgXCJNdWx0aVBvbHlnb25cIiwgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIilcbiAgICAgICAgLy8gdGhlbiB3ZSBuZWVkIHRvIHNwbGl0IHRoZW0gdXAgaW50byBpbmRpdmlkdWFsIGdlb21ldHJpZXMgYW5kXG4gICAgICAgIC8vIGFkZCB0aGVtIGFzIHNlcGFyYXRlIGxheWVycyB3aGljaCB3aWxsIGFsbCBiZSBlZGl0YWJsZVxuICAgICAgICBpZiAodGhpcy5mZWF0dXJlLmdlb21ldHJ5LnR5cGUuaW5kZXhPZihcIk11bHRpXCIpPT09MCkge1xuICAgICAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmZlYXR1cmUuZ2VvbWV0cnkudHlwZS5yZXBsYWNlKFwiTXVsdGlcIixcIlwiKTtcbiAgICAgICAgICAgIHRoaXMuZmVhdHVyZS5nZW9tZXRyeS5jb29yZGluYXRlcy5lYWNoKCAoY2hpbGRDb29yZHMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGUgPSB7dHlwZTp0eXBlLCBjb29yZGluYXRlczogY2hpbGRDb29yZHN9O1xuICAgICAgICAgICAgICAgIG5ldyBHZW9KU09OKHNoYXBlLCB7XG4gICAgICAgICAgICAgICAgICAgIG9uRWFjaEZlYXR1cmU6IChmZWF0dXJlLCBsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGluZ0xheWVyLmFkZExheWVyKGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnR2VvbWV0cnlDb2xsZWN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5mZWF0dXJlLmdlb21ldHJ5Lmdlb21ldHJpZXMuZWFjaCggKGNoaWxkR2VvbWV0cnkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgR2VvSlNPTihjaGlsZEdlb21ldHJ5LCB7XG4gICAgICAgICAgICAgICAgICAgIG9uRWFjaEZlYXR1cmU6ICAgKGZlYXR1cmUsIGxheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW5nTGF5ZXIuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3IEdlb0pTT04oZmVhdHVyZS50b0dlb0pTT04oKSkuZWFjaExheWVyKCAobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0aW5nTGF5ZXIuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL21ha2UgdGhpcyBmZWF0dXJlIGludmlzaWJsZVxuICAgICAgICB0aGlzLnNob3dPcmlnaW5hbExheWVyKGZhbHNlKTtcblxuICAgICAgICAvL3JlZ2lzdGVyIExlYWZsZXREcmF3IGNvbnRyb2wgd2l0aCBFZGl0IG1vZGUgb25seVxuICAgICAgICAvLyB1c2luZyBqdXN0IHRoZSBmZWF0dXJlIGxheWVyIGlkZW50aWZpZWRcbiAgICAgICAgdGhpcy50b29sID0gbmV3IEVkaXRGZWF0dXJlKHtcbiAgICAgICAgICAgIGZlYXR1cmVHcm91cDogZWRpdGluZ0xheWVyXG4gICAgICAgIH0gYXMgQ29udHJvbE9wdGlvbnMpLmFkZFRvKG1hcCk7XG4gICAgICAgIHRoaXMudG9vbC5hY3RpdmF0ZSgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHNhdmUgLSBmbGFnIHNwZWNpZnlpbmcgd2hldGhlciB0byBwZXJzaXN0IGNoYW5nZXMgdG8gdGhlIGZlYXR1cmVcbiAgICAgKi9cbiAgICBkb25lRWRpdGluZyggc2F2ZSA/OiBib29sZWFuICkge1xuXG4gICAgICAgIHRoaXMuZmVhdHVyZS5wcm9wZXJ0aWVzLl9lZGl0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYodHlwZW9mKHNhdmUpID09PSAndW5kZWZpbmVkJyB8fCBzYXZlKSB7XG5cbiAgICAgICAgICAgIC8vaWYgZ2VvbWV0cnkgY2hhbmdlZFxuICAgICAgICAgICAgaWYodGhpcy50b29sICYmIHRoaXMudG9vbC5oYXNCZWVuRWRpdGVkKCkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBpc011bHRpID0gfnRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlLmluZGV4T2YoXCJNdWx0aVwiKTtcbiAgICAgICAgICAgICAgICBsZXQgaXNHZW9tQ29sbCA9IHRoaXMuZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnR2VvbWV0cnlDb2xsZWN0aW9uJztcbiAgICAgICAgICAgICAgICBsZXQgZ2VvbXMgPSBbXSwgY29vcmRzID0gW10sIGdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0xheWVyLmVhY2hMYXllciggKGxheWVyIDogTGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmUgPSAobGF5ZXIgYXMgRmVhdHVyZUxheWVyKS50b0dlb0pTT04oKTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkgPSBmZWF0dXJlLmdlb21ldHJ5O1xuICAgICAgICAgICAgICAgICAgICBpZihpc011bHRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb29yZHNbY29vcmRzLmxlbmd0aF0gPSBnZW9tZXRyeS5jb29yZGluYXRlcztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGlzR2VvbUNvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb21zW2dlb21zLmxlbmd0aF0gPSBmZWF0dXJlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvL3VwZGF0ZSBleGlzdGluZyBmZWF0dXJlIHdpdGggZWRpdGVkIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgaWYoaXNNdWx0aSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlLmdlb21ldHJ5LmNvb3JkaW5hdGVzID0gY29vcmRzO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNHZW9tQ29sbClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlLmdlb21ldHJ5Lmdlb21ldHJpZXMgPSBnZW9tcztcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmVhdHVyZS5nZW9tZXRyeSA9IGdlb21ldHJ5O1xuXG4gICAgICAgICAgICAgICAgLy9pbmZvcm0gTWFwIG9mIGNoYW5nZVxuICAgICAgICAgICAgICAgIHRoaXMubWFwLnJlcGxhY2VGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9yZXN0b3JlIG9yaWdpbmFsIGxheWVyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93T3JpZ2luYWxMYXllcih0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vcmVkcmF3IGZlYXR1cmUgd2l0aCBuZXcgc3R5bGUgaW5mb1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLnVwZGF0ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy9yZXN0b3JlIG9yaWdpbmFsIGxheWVyIChvbmx5IGlmIGZlYXR1cmUgaXMgdG8gYmUgdmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMuc2hvd09yaWdpbmFsTGF5ZXIodGhpcy52aXNpYmxlKTtcblxuICAgICAgICAgICAgLy9SZWRyYXcgZmVhdHVyZSB3aGljaCBoYXMgYmVlbiB1cGRhdGVkIHdpdGhcbiAgICAgICAgICAgIC8vIG9yaWdpbmFsIHN0eWxlIGluZm9ybWF0aW9uIChyZXNldClcbiAgICAgICAgICAgIHRoaXMubWFwLnVwZGF0ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbGFzdGx5LCBicmVhayBkb3duIHRoZSBlZGl0aW5nIHRvb2xcbiAgICAgICAgaWYodGhpcy50b29sKSB0aGlzLnVucmVnaXN0ZXJUb29sKCk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGFkZFByb3BlcnR5KCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBoaWdobGlnaHRGZWF0dXJlKCkge1xuICAgICAgICB0aGlzLm1hcC5mb2N1c0ZlYXR1cmUodGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgZGVsZXRlRmVhdHVyZSgpIHtcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlRmVhdHVyZSh0aGlzLmZlYXR1cmUucHJvcGVydGllcy5pZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlIHJlbmRlcmVkIGZlYXR1cmUgd2l0aCBsYXRlc3QgaW5mb1xuICAgICAqL1xuICAgIHVwZGF0ZUZlYXR1cmUoKSB7XG5cbiAgICAgICAgLy9pZiBub3QgZWRpdGluZyBhIHRlbXBvcmFyeSBmZWF0dXJlLi4uXG4gICAgICAgIGlmKCF0aGlzLmVkaXRpbmdMYXllcilcbiAgICAgICAgICAgIHRoaXMubWFwLnVwZGF0ZUZlYXR1cmUodGhpcy5mZWF0dXJlKTtcblxuICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgLy9kb24ndCBuZWVkIHRvIHVwZGF0ZSBleGlzdGluZyByZW5kZXJlZCBmZWF0dXJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIGl0J3MgYmVlbiBoaWRkZW4gYW5kIGEgdGVtcG9yYXJ5ICdlZGl0aW5nJyB2ZXJzaW9uXG4gICAgICAgICAgICAvLyBpcyBvbiB0aGUgbWFwLiBTbyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGF0IGluc3RlYWQuXG4gICAgICAgICAgICAvLyB0aGlzLm1hcC51cGRhdGVGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG5cblxuICAgICAgICAgICAgLy91cGRhdGUgJ2VkaXRpbmcnIHZlcnNpb24gb2YgdGhlIGZlYXR1cmUgaW4gcXVlc3Rpb25cblxuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5mZWF0dXJlLnByb3BlcnRpZXMuc3R5bGU7XG4gICAgICAgICAgICB0aGlzLmVkaXRpbmdMYXllci5lYWNoTGF5ZXIoIChsYXllciA6IExheWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9kbyBub3RoaW5nIGZvciBtYXJrZXJzXG4gICAgICAgICAgICAgICAgaWYoKGxheWVyIGFzIEZlYXR1cmVMYXllcikuZmVhdHVyZS5nZW9tZXRyeS50eXBlICE9PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIChsYXllciBhcyBGZWF0dXJlTGF5ZXIpLnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGNhbmNlbEVkaXRpbmcgKCkge1xuICAgICAgICB0aGlzLmZlYXR1cmUgPSB0aGlzLm9yaWdpbmFsRmVhdHVyZTtcbiAgICAgICAgdGhpcy5kb25lRWRpdGluZyhmYWxzZSk7XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cblxuXG4vKipcbiAqXG4gKi9cbmNsYXNzIEVkaXRGZWF0dXJlIGV4dGVuZHMgQ29udHJvbCB7XG5cbiAgICBwcml2YXRlIG1hcCA6IE1hcDtcbiAgICBwcml2YXRlIGVuYWJsZWQgOiBib29sZWFuO1xuICAgIHByaXZhdGUgaGFuZGxlciA6IERyYXcuRWRpdFRvb2xiYXIuRWRpdDtcblxuICAgIGNvbnN0cnVjdG9yKCBvcHRpb25zID86IGFueSApIHtcbiAgICAgICAgc3VwZXIoIE9iamVjdC5hc3NpZ24oIHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2JvdHRvbXJpZ2h0JyxcbiAgICAgICAgICAgICAgICBkcmF3OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlZGl0OiBmYWxzZVxuICAgICAgICAgICAgfSwgb3B0aW9ucyB8fCB7fSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbkFkZCAobWFwIDogTWFwKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgb3B0cyA9IHsgfTtcbiAgICAgICAgLy9uZWVkZWQgb3IgZWxzZSBMLkVkaXRUb29sYmFyLkVkaXQgZmFpbHMgdG8gYWRkSG9va3MgZm9yIFBvbHlMaW5lIGZlYXR1cmVzXG4gICAgICAgIChvcHRzIGFzIGFueSkuc2VsZWN0ZWRQYXRoT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGRhc2hBcnJheTogJzEwLCAxMCcsXG4gICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgZmlsbENvbG9yOiAnI2ZlNTdhMScsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMC4xLFxuICAgICAgICAgICAgLy8gV2hldGhlciB0byB1c2VyIHRoZSBleGlzdGluZyBsYXllcnMgY29sb3JcbiAgICAgICAgICAgIG1haW50YWluQ29sb3I6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIChvcHRzIGFzIGFueSkuZmVhdHVyZUdyb3VwID0gKHRoaXMub3B0aW9ucyBhcyBhbnkpLmZlYXR1cmVHcm91cDtcblxuICAgICAgICB0aGlzLmhhbmRsZXIgPSBuZXcgRHJhdy5FZGl0VG9vbGJhci5FZGl0KG1hcCwgb3B0cyk7XG5cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IERvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1lZGl0LWZlYXR1cmUnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBvblJlbW92ZSAobWFwIDogTWFwKSB7XG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmhhbmRsZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGFuZGxlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgaGFzQmVlbkVkaXRlZCgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZigodGhpcy5vcHRpb25zIGFzIGFueSkuZmVhdHVyZUdyb3VwKSB7XG4gICAgICAgICAgICAodGhpcy5vcHRpb25zIGFzIGFueSkuZmVhdHVyZUdyb3VwLmVhY2hMYXllcihmdW5jdGlvbihsYXllcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBsYXllci5lZGl0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8vIGltcG9ydCB7XG4vLyAgICAgTWFwLCBMYXllciwgRmVhdHVyZUdyb3VwLCBDb250cm9sLCBHZW9KU09OLCBwb3B1cCxcbi8vICAgICBVdGlsLCBEb21VdGlsLCBEb21FdmVudCwgRXZlbnRlZFxuLy8gfSBmcm9tICdsZWFmbGV0Jztcbi8vIGltcG9ydCAqIGFzIEVkaXRhYmxlIGZyb20gXCJsZWFmbGV0LWVkaXRhYmxlXCI7XG4vL1xuLy8gaW1wb3J0IE1hcEluc3RhbmNlIGZyb20gJy4uL21hcC9pbnN0YW5jZSc7XG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vIGNvbnN0IENBTExCQUNLUyA9IHtcbi8vICAgICAnbWFya2VyJyAgICA6ICdzdGFydE1hcmtlcicsXG4vLyAgICAgJ2xpbmUnICAgICAgOiAnc3RhcnRQb2x5bGluZScsXG4vLyAgICAgJ3BvbHlnb24nICAgOiAnc3RhcnRQb2x5Z29uJyxcbi8vICAgICAncmVjdGFuZ2xlJyA6ICdzdGFydFJlY3RhbmdsZScsXG4vLyAgICAgJ2NpcmNsZScgICAgOiAnc3RhcnRDaXJjbGUnXG4vLyB9O1xuLy9cbi8vXG4vLyBleHBvcnQgY29uc3QgRXZlbnRzID0ge1xuLy8gICAgIEZFQVRVUkVfQ1JFQVRFRDogJ2ZlYXR1cmU6Y3JlYXRlZCcsXG4vLyAgICAgRkVBVFVSRV9SRU1PVkVEOiAnZmVhdHVyZTpyZW1vdmVkJyxcbi8vICAgICBGRUFUVVJFX0VESVRFRDogJ2ZlYXR1cmU6ZWRpdGVkJ1xuLy8gfTtcbi8vXG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVhdHVyZUVkaXRvciBleHRlbmRzIEV2ZW50ZWQge1xuLy9cbi8vICAgICBwcml2YXRlIG1hcCA6IE1hcEluc3RhbmNlO1xuLy8gICAgIHByaXZhdGUgZWRpdG9yIDogRWRpdGFibGU7XG4vLyAgICAgcHJpdmF0ZSBlZGl0TGF5ZXIgOiBGZWF0dXJlR3JvdXA7XG4vLyAgICAgcHJpdmF0ZSBmZWF0dXJlc0xheWVyIDogRmVhdHVyZUdyb3VwO1xuLy9cbi8vICAgICBjb25zdHJ1Y3RvcihtYXAgOiBNYXBJbnN0YW5jZSwgb3B0aW9ucyA/OiBhbnkpIHtcbi8vICAgICAgICAgc3VwZXIoKTtcbi8vXG4vLyAgICAgICAgIHRoaXMubWFwID0gbWFwO1xuLy9cbi8vICAgICAgICAgbGV0IGxlYWZsZXRNYXAgOiBNYXAgPSBtYXAuZ2V0TWFwKCk7XG4vLyAgICAgICAgIGlmKCFsZWFmbGV0TWFwKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBMZWFmbGV0IG1hcCBpcyBjb25maWd1cmVkXCIpO1xuLy9cbi8vICAgICAgICAgdGhpcy5mZWF0dXJlc0xheWVyID0gbWFwLmdldEZlYXR1cmVMYXllcigpO1xuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIgPSBuZXcgRmVhdHVyZUdyb3VwKCk7XG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLmFkZFRvKGxlYWZsZXRNYXApO1xuLy9cbi8vICAgICAgICAgbGV0IG9wdHMgOiBhbnkgPSB7fTtcbi8vICAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCBvcHRpb25zfHx7fSwge1xuLy8gICAgICAgICAgICAgLy9lZGl0TGF5ZXIgOiAuLi5cbi8vICAgICAgICAgICAgIGZlYXR1cmVzTGF5ZXIgOiB0aGlzLmVkaXRMYXllciAvL21hcC5nZXRGZWF0dXJlTGF5ZXIoKVxuLy8gICAgICAgICAgICAgLy8gZHJhd2luZ0NTU0NsYXNzOiAnbGVhZmxldC1lZGl0YWJsZS1kcmF3aW5nJyxcbi8vICAgICAgICAgICAgIC8vIGRyYXdpbmdDdXJzb3I6ICdjcm9zc2hhaXInLFxuLy8gICAgICAgICAgICAgLy8gc2tpcE1pZGRsZU1hcmtlcnM6IHRydWVcbi8vICAgICAgICAgfSk7XG4vL1xuLy8gICAgICAgICAvL2NyZWF0ZSBhbmQgcmVnaXN0ZXIgZWRpdGFibGUgaW5zdGFuY2Ugb24gbGVhZmxldCBtYXBcbi8vICAgICAgICAgbGV0IGVkaXRvciA9IG5ldyBFZGl0YWJsZShsZWFmbGV0TWFwLCBvcHRzKTtcbi8vICAgICAgICAgKGxlYWZsZXRNYXAgYXMgYW55KS5lZGl0VG9vbHMgPSBlZGl0b3I7XG4vLyAgICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oJ2VkaXRhYmxlOmRyYXdpbmc6ZW5kJywgKGV2ZW50IDogYW55KSA9PiB7XG4vLyAgICAgICAgICAgICAvL2hhdmUgdG8gd3JhcCBoYW5kbGVyIGluIGEgdGltZW91dCBpbiBvcmRlciB0byBub3QgaW5hZHZlcnRlbnRseVxuLy8gICAgICAgICAgICAgLy8gYmxvY2sgdGhlIGNsZWFuIHVwIG9mIGV2ZW50IGhhbmRsZXJzIHdpdGhpbiBFZGl0YWJsZVxuLy8gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMub25GZWF0dXJlQ3JlYXRlZChldmVudCkgfSw1MCk7XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICAgICAvLyB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZWRpdGluZycsIChldmVudCA6IGFueSkgPT4geyB0aGlzLm9uRmVhdHVyZUVkaXRlZChldmVudCkgfSlcbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKCdlZGl0YWJsZTpkcmF3aW5nOnN0YXJ0JywgKGV2ZW50OiBhbnkpID0+IGNvbnNvbGUubG9nKFwiRHJhd2luZyBTdGFydFwiKSApO1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZHJhd2luZzplbmQnLCAoZXZlbnQ6IGFueSkgPT4gY29uc29sZS5sb2coXCJEcmF3aW5nIEVuZFwiKSApO1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZHJhd2luZzpjYW5jZWwnLCAoZXZlbnQ6IGFueSkgPT4gY29uc29sZS5sb2coXCJEcmF3aW5nIENhbmNlbFwiKSApO1xuLy8gICAgICAgICB0aGlzLmVkaXRvci5vbignZWRpdGFibGU6ZHJhd2luZzpjb21taXQnLCAoZXZlbnQ6IGFueSkgPT4gY29uc29sZS5sb2coXCJEcmF3aW5nIENvbW1pdFwiKSApO1xuLy9cbi8vICAgICAgICAgdGhpcy5lZGl0b3Iub24oXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6ZHJhd2luZzpzdGFydCBlZGl0YWJsZTpkcmF3aW5nOmVuZCAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTpkcmF3aW5nOmNhbmNlbCBlZGl0YWJsZTpkcmF3aW5nOmNvbW1pdCAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTpkcmF3aW5nOm1vdXNlZG93biBlZGl0YWJsZTpkcmF3aW5nOm1vdXNldXAgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6ZHJhd2luZzpjbGljayBlZGl0YWJsZTpkcmF3aW5nOm1vdmUgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6ZHJhd2luZzpjbGlja2VkJyxcbi8vICAgICAgICAgICAgIChldmVudCA6IGFueSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWRpdG9yIGV2ZW50OiBcIiArIGV2ZW50LnR5cGUpO1xuLy8gICAgICAgICAgICAgICAgIGlmKGV2ZW50LmxheWVyICYmIGV2ZW50LmxheWVyLm9wdGlvbnMucG9wdXApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGZWF0dXJlUG9wdXAoZXZlbnQubGF5ZXIsIGV2ZW50LmxheWVyLm9wdGlvbnMucG9wdXApO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgKTtcbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdG9yLm9uKFxuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDpuZXcgZWRpdGFibGU6dmVydGV4OmNsaWNrICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDpjbGlja2VkIGVkaXRhYmxlOnZlcnRleDpyYXdjbGljayAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6ZGVsZXRlZCBlZGl0YWJsZTp2ZXJ0ZXg6Y3RybGNsaWNrICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDpzaGlmdGNsaWNrIGVkaXRhYmxlOnZlcnRleDptZXRha2V5Y2xpY2sgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6dmVydGV4OmFsdGNsaWNrIGVkaXRhYmxlOnZlcnRleDpjb250ZXh0bWVudSAnICtcbi8vICAgICAgICAgICAgICdlZGl0YWJsZTp2ZXJ0ZXg6bW91c2Vkb3duIGVkaXRhYmxlOnZlcnRleDpkcmFnICcgK1xuLy8gICAgICAgICAgICAgJ2VkaXRhYmxlOnZlcnRleDpkcmFnc3RhcnQgZWRpdGFibGU6dmVydGV4OmRyYWdlbmQgJyArXG4vLyAgICAgICAgICAgICAnZWRpdGFibGU6bWlkZGxlbWFya2VyOm1vdXNlZG93bicsXG4vLyAgICAgICAgICAgICAoZXZlbnQgOiBhbnkpID0+IHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZlcnRleCBldmVudDogXCIgKyBldmVudC50eXBlKTtcbi8vICAgICAgICAgICAgICAgICAvLyBpZihldmVudC5sYXllciAmJiBldmVudC5sYXllci5vcHRpb25zLnBvcHVwKSB7XG4vLyAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMudXBkYXRlRmVhdHVyZVBvcHVwKGV2ZW50LmxheWVyLCBldmVudC5sYXllci5vcHRpb25zLnBvcHVwKTtcbi8vICAgICAgICAgICAgICAgICAvLyB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICk7XG4vL1xuLy8gICAgICAgICBpZihvcHRzLm1hcmtlcikge1xuLy8gICAgICAgICAgICAgbGVhZmxldE1hcC5hZGRDb250cm9sKG5ldyBFZGl0Q29udHJvbCh7XG4vLyAgICAgICAgICAgICAgICAgcG9zaXRpb246IG9wdHMucG9zaXRpb24gfHwgJ3RvcGxlZnQnLFxuLy8gICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBlZGl0b3JbQ0FMTEJBQ0tTLm1hcmtlcl0sXG4vLyAgICAgICAgICAgICAgICAga2luZDogJ21hcmtlcicsXG4vLyAgICAgICAgICAgICAgICAgaHRtbDogb3B0cy5tYXJrZXIuaWNvbiA/IG9wdHMubWFya2VyLmljb24gOiAn8J+WiCdcbi8vICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZihvcHRzLmxpbmUpIHtcbi8vICAgICAgICAgICAgIGxlYWZsZXRNYXAuYWRkQ29udHJvbChuZXcgRWRpdENvbnRyb2woe1xuLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRzLnBvc2l0aW9uIHx8ICd0b3BsZWZ0Jyxcbi8vICAgICAgICAgICAgICAgICBjYWxsYmFjazogZWRpdG9yW0NBTExCQUNLUy5saW5lXSxcbi8vICAgICAgICAgICAgICAgICBraW5kOiAnbGluZScsXG4vLyAgICAgICAgICAgICAgICAgaHRtbDogb3B0cy5saW5lLmljb24gPyBvcHRzLmxpbmUuaWNvbiA6ICdcXFxcL1xcXFwnXG4vLyAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYob3B0cy5wb2x5Z29uKSB7XG4vLyAgICAgICAgICAgICBsZWFmbGV0TWFwLmFkZENvbnRyb2wobmV3IEVkaXRDb250cm9sKHtcbi8vICAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0cy5wb3NpdGlvbiB8fCAndG9wbGVmdCcsXG4vLyAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGVkaXRvcltDQUxMQkFDS1MucG9seWdvbl0sXG4vLyAgICAgICAgICAgICAgICAga2luZDogJ3BvbHlnb24nLFxuLy8gICAgICAgICAgICAgICAgIGh0bWw6IG9wdHMucG9seWdvbi5pY29uID8gb3B0cy5wb2x5Z29uLmljb24gOiAn4pawJ1xuLy8gICAgICAgICAgICAgfSkpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmKG9wdHMucmVjdGFuZ2xlKSB7XG4vLyAgICAgICAgICAgICBsZWFmbGV0TWFwLmFkZENvbnRyb2wobmV3IEVkaXRDb250cm9sKHtcbi8vICAgICAgICAgICAgICAgICBwb3NpdGlvbjogb3B0cy5wb3NpdGlvbiB8fCAndG9wbGVmdCcsXG4vLyAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGVkaXRvcltDQUxMQkFDS1MucmVjdGFuZ2xlXSxcbi8vICAgICAgICAgICAgICAgICBraW5kOiAncmVjdGFuZ2xlJyxcbi8vICAgICAgICAgICAgICAgICBodG1sOiBvcHRzLnJlY3RhbmdsZS5pY29uID8gb3B0cy5yZWN0YW5nbGUuaWNvbiA6ICfirJsnXG4vLyAgICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYob3B0cy5jaXJjbGUpIHtcbi8vICAgICAgICAgICAgIGxlYWZsZXRNYXAuYWRkQ29udHJvbChuZXcgRWRpdENvbnRyb2woe1xuLy8gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcHRzLnBvc2l0aW9uIHx8ICd0b3BsZWZ0Jyxcbi8vICAgICAgICAgICAgICAgICBjYWxsYmFjazogZWRpdG9yW0NBTExCQUNLUy5jaXJjbGVdLFxuLy8gICAgICAgICAgICAgICAgIGtpbmQ6ICdjaXJjbGUnLFxuLy8gICAgICAgICAgICAgICAgIGh0bWw6IG9wdHMuY2lyY2xlLmljb24gPyBvcHRzLmNpcmNsZS5pY29uIDogJ+KspCdcbi8vICAgICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vXG4vLyAgICAgaXNEcmF3aW5nKCkgOiBib29sZWFuIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yID8gdGhpcy5lZGl0b3IuZHJhd2luZygpIDogZmFsc2U7XG4vLyAgICAgfVxuLy9cbi8vICAgICBjYW5jZWwoKSB7XG4vLyAgICAgICAgIGlmKHRoaXMuZWRpdG9yKSB0aGlzLmVkaXRvci5zdG9wRHJhd2luZygpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSB0byBiZSBlZGl0ZWRcbi8vICAgICAgKi9cbi8vICAgICBlbmFibGVGZWF0dXJlRWRpdCggZmVhdHVyZSA6IGFueSApIHtcbi8vICAgICAgICAgaWYoIWZlYXR1cmUpIHJldHVybjtcbi8vXG4vLyAgICAgICAgIGlmKCFmZWF0dXJlLnByb3BlcnRpZXMpIGZlYXR1cmUucHJvcGVydGllcyA9IHt9O1xuLy9cbi8vICAgICAgICAgbGV0IGZpZCA9ICB0aGlzLmdldEZlYXR1cmVJZChmZWF0dXJlLCB0cnVlKTtcbi8vXG4vLyAgICAgICAgIC8vbWFrZSBhIGNsb25lIG9mIHRoZSBmZWF0dXJlIHRvIGJlIGVkaXRlZFxuLy8gICAgICAgICBsZXQganNvbiA9IChmZWF0dXJlIGFzIGFueSkudG9HZW9KU09OKCk7XG4vLyAgICAgICAgIGxldCBlZGl0ZWRMYXllciA9IEdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGpzb24pO1xuLy8gICAgICAgICBVdGlsLnNldE9wdGlvbnMoZWRpdGVkTGF5ZXIsIHsgb3JpZ2luYWxMYXllcklkIDogZmlkIH0pO1xuLy9cbi8vICAgICAgICAgLy9oaWRlIHRoYXQgZmVhdHVyZSBvbiBmZWF0dXJlc0xheWVyXG4vLyAgICAgICAgIHRoaXMubWFwLnNldEZlYXR1cmVWaXNpYmlsaXR5KGZlYXR1cmUsIGZhbHNlKTtcbi8vXG4vLyAgICAgICAgIC8vYW5kIGFkZCB0aGUgZWRpdGJsZSBjbG9uZSBvZiBpdCB0byB0aGUgZWRpdCBsYXllclxuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5hZGRMYXllcihlZGl0ZWRMYXllcik7XG4vLyAgICAgICAgIChlZGl0ZWRMYXllciBhcyBhbnkpLnRvZ2dsZUVkaXQoKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgYmVpbmcgZWRpdGVkXG4vLyAgICAgICovXG4vLyAgICAgYXBwbHlGZWF0dXJlRWRpdCggZmVhdHVyZSA6IGFueSApIHtcbi8vXG4vLyAgICAgICAgIGxldCBlZGl0ZWRMYXllciA9IHRoaXMuZmluZEVkaXRlZEZlYXR1cmVMYXllcihmZWF0dXJlKTtcbi8vICAgICAgICAgaWYoIWVkaXRlZExheWVyKSByZXR1cm47XG4vL1xuLy8gICAgICAgICAoZWRpdGVkTGF5ZXIgYXMgYW55KS50b2dnbGVFZGl0KCk7ICAgICAgICAgICAgICAgICAgIC8vdHVybiBvZmYgZWRpdG9yXG4vL1xuLy8gICAgICAgICBsZXQganNvbiA9IChlZGl0ZWRMYXllciBhcyBhbnkpLnRvR2VvSlNPTigpO1xuLy8gICAgICAgICB0aGlzLmVkaXRMYXllci5yZW1vdmVMYXllcihlZGl0ZWRMYXllcik7ICAgIC8vcmVtb3ZlIGZyb20gZWRpdCBsYXllclxuLy9cbi8vICAgICAgICAgLy8gbGV0IHVwZGF0ZWRMYXllciA9IEdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGpzb24pO1xuLy8gICAgICAgICB0aGlzLm1hcC5yZXBsYWNlRmVhdHVyZShqc29uKTtcbi8vICAgICAgICAgdGhpcy5tYXAuc2V0RmVhdHVyZVZpc2liaWxpdHkoZmVhdHVyZSwgdHJ1ZSk7XG4vL1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLyoqXG4vLyAgICAgICogQHBhcmFtIGZlYXR1cmUgRmVhdHVyZSBiZWluZyBlZGl0ZWRcbi8vICAgICAgKi9cbi8vICAgICBjYW5jZWxGZWF0dXJlRWRpdCggZmVhdHVyZSA6IGFueSApIHtcbi8vXG4vLyAgICAgICAgIGxldCBlZGl0ZWRMYXllciA9IHRoaXMuZmluZEVkaXRlZEZlYXR1cmVMYXllcihmZWF0dXJlKTtcbi8vICAgICAgICAgaWYoIWVkaXRlZExheWVyKSByZXR1cm47XG4vL1xuLy8gICAgICAgICAoZWRpdGVkTGF5ZXIgYXMgYW55KS50b2dnbGVFZGl0KCk7ICAgICAgICAgICAgICAgICAgIC8vdHVybiBvZmYgZWRpdG9yXG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLnJlbW92ZUxheWVyKGVkaXRlZExheWVyKTsgICAgLy9hbmQgcmVtb3ZlIGZyb20gZWRpdCBsYXllclxuLy9cbi8vICAgICAgICAgLy9yZS1zaG93IHRoZSBvcmlnaW5hbCBmZWF0dXJlIGxheWVyXG4vLyAgICAgICAgIHRoaXMubWFwLnNldEZlYXR1cmVWaXNpYmlsaXR5KGZlYXR1cmUsIHRydWUpO1xuLy9cbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmUgTGF5ZXIgYXNzb2NpYXRlZCB3aXRoIGFuIGVkaXRhYmxlIGZlYXR1cmVcbi8vICAgICAgKiBAcmV0dXJuIGVkaXRhYmxlIEZlYXR1cmUgTGF5ZXIgYXNzb2NhaXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQgcGFyYW1ldGVyIEZlYXR1cmUgTGF5ZXJcbi8vICAgICAgKi9cbi8vICAgICBmaW5kRWRpdGVkRmVhdHVyZUxheWVyKCBmZWF0dXJlIDogYW55ICkgOiBMYXllciB7XG4vLyAgICAgICAgIGxldCBlZGl0ZWRMYXllciA6IExheWVyID0gbnVsbDtcbi8vICAgICAgICAgdGhpcy5lZGl0TGF5ZXIuZWFjaExheWVyKCAobGF5ZXIgOiBhbnkpID0+IHtcbi8vICAgICAgICAgICAgIGxldCBmaWQgPSB0aGlzLmdldEZlYXR1cmVJZChsYXllcik7XG4vLyAgICAgICAgICAgICBpZiggIWVkaXRlZExheWVyICYmIGZpZCA9PSBsYXllci5vcmlnaW5hbExheWVySWQgKSB7XG4vLyAgICAgICAgICAgICAgICAgZWRpdGVkTGF5ZXIgPSBsYXllciBhcyBMYXllcjtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgICAgIHJldHVybiBlZGl0ZWRMYXllcjtcbi8vICAgICB9XG4vL1xuLy8gICAgIC8qKlxuLy8gICAgICAqIEBwYXJhbSBmZWF0dXJlIEZlYXR1cmVcbi8vICAgICAgKiBAcGFyYW0gY3JlYXRlQXNOZWVkZWQgZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gY3JlYXRlIGFuIElEIGlmIGZlYXR1cmUgaGFzIG5vbmVcbi8vICAgICAgKiBAcmV0dXJuIGZlYXR1cmUgaWQgb3IgbnVsbFxuLy8gICAgICAqL1xuLy8gICAgIGdldEZlYXR1cmVJZCggZmVhdHVyZSA6IGFueSAsIGNyZWF0ZUFzTmVlZGVkID86IGJvb2xlYW4pIDogc3RyaW5nIHtcbi8vICAgICAgICAgaWYoIWZlYXR1cmUpIHJldHVybiBudWxsO1xuLy8gICAgICAgICBpZighZmVhdHVyZS5wcm9wZXJ0aWVzKSBmZWF0dXJlLnByb3BlcnRpZXMgPSB7fTtcbi8vICAgICAgICAgbGV0IGZlYXR1cmVJZCA9IGZlYXR1cmUucHJvcGVydGllcy5pZCB8fCBudWxsO1xuLy8gICAgICAgICBpZighZmVhdHVyZUlkICYmIHRydWUgPT09IGNyZWF0ZUFzTmVlZGVkKVxuLy8gICAgICAgICAgICAgZmVhdHVyZUlkID0gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjk5OTkpO1xuLy8gICAgICAgICByZXR1cm4gZmVhdHVyZUlkO1xuLy8gICAgIH1cbi8vXG4vL1xuLy9cbi8vXG4vLyAgICAgb25GZWF0dXJlQ3JlYXRlZChldmVudCA6IGFueSkge1xuLy8gICAgICAgICBsZXQgZmVhdHVyZSA6IGFueSA9IGV2ZW50LmxheWVyO1xuLy9cbi8vICAgICAgICAgaWYoIHR5cGVvZihmZWF0dXJlLmVkaXRFbmFibGVkKSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmVhdHVyZS5lZGl0RW5hYmxlZCgpICkge1xuLy8gICAgICAgICAgICAgZmVhdHVyZS50b2dnbGVFZGl0KCk7XG4vLyAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgIHRoaXMuZWRpdExheWVyLnJlbW92ZUxheWVyKGZlYXR1cmUpO1xuLy8gICAgICAgICBpZih0aGlzLmZlYXR1cmVzTGF5ZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMuZmVhdHVyZXNMYXllci5hZGRMYXllcihmZWF0dXJlKTtcbi8vICAgICAgICAgICAgIGZlYXR1cmUub24oJ2RibGNsaWNrJywgRG9tRXZlbnQuc3RvcCkub24oJ2RibGNsaWNrJywgKCkgPT4ge1xuLy9cbi8vICAgICAgICAgICAgICAgICAoZmVhdHVyZSBhcyBhbnkpLnRvZ2dsZUVkaXQoKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgaWYoZmVhdHVyZS5lZGl0RW5hYmxlZCgpKSB7IC8vJ2VkaXRhYmxlOmVuYWJsZSdcbi8vICAgICAgICAgICAgICAgICAgICAgLy9hZGQgYSBzYXZlIGFuZCBjYW5jZWwgYnRuLi4uXG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgbGF0TG5nID0gbnVsbDtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGZlYXR1cmUuZ2V0TGF0TG5nKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxhdExuZyA9IGZlYXR1cmUuZ2V0TGF0TG5nKCk7XG4vLyAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0eXBlb2YoZmVhdHVyZS5nZXRDZW50ZXIoKSkgIT09ICd1bmRlZmluZWQnKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXRMbmcgPSBmZWF0dXJlLmdldENlbnRlcigpO1xuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgICAgICBsZXQgZnAgPSBwb3B1cCh7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvQ2xvc2U6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkVzY2FwZUtleTogZmFsc2UsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZU9uQ2xpY2s6IGZhbHNlXG4vLyAgICAgICAgICAgICAgICAgICAgIH0pLnNldExhdExuZyhsYXRMbmcpXG4vLyAgICAgICAgICAgICAgICAgICAgIC5zZXRDb250ZW50KCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIj5TYXZlPC9idXR0b24+ICZuYnNwOyZuYnNwOyZuYnNwOyA8YnV0dG9uIHR5cGU9XCJidXR0b25cIj5DYW5jZWw8L2J1dHRvbj4nKVxuLy8gICAgICAgICAgICAgICAgICAgICAub3Blbk9uKHRoaXMubWFwLmdldE1hcCgpKTtcbi8vXG4vLyAgICAgICAgICAgICAgICAgICAgIFV0aWwuc2V0T3B0aW9ucyhmZWF0dXJlLCB7cG9wdXAgOiBmcH0pO1xuLy9cbi8vICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGZlYXR1cmUub3B0aW9ucy5wb3B1cCApIHtcbi8vICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5vcHRpb25zLnBvcHVwLnJlbW92ZSgpO1xuLy8gICAgICAgICAgICAgICAgICAgICAvLyBmZWF0dXJlLmVkaXRvci5vZmYoJ2VkaXRhYmxlOmRyYXdpbmc6c3RhcnQsZWRpdGFibGU6ZHJhd2luZzplbmQsZWRpdGFibGU6ZHJhd2luZzpjYW5jZWwsZWRpdGFibGU6ZHJhd2luZzpjb21taXQsZWRpdGFibGU6ZHJhd2luZzptb3VzZWRvd24sZWRpdGFibGU6ZHJhd2luZzptb3VzZXVwLGVkaXRhYmxlOmRyYXdpbmc6Y2xpY2ssZWRpdGFibGU6ZHJhd2luZzptb3ZlLGVkaXRhYmxlOmRyYXdpbmc6Y2xpY2tlZCcpO1xuLy9cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICB0aGlzLmZpcmUoRXZlbnRzLkZFQVRVUkVfQ1JFQVRFRCwgZmVhdHVyZSk7XG4vLyAgICAgfVxuLy9cbi8vICAgICBvbkZlYXR1cmVFZGl0ZWQoZXZlbnQgOiBhbnkpIHtcbi8vICAgICAgICAgbGV0IGZlYXR1cmUgPSBldmVudC5sYXllcjtcbi8vICAgICAgICAgdGhpcy5maXJlKEV2ZW50cy5GRUFUVVJFX0VESVRFRCwgZmVhdHVyZSk7XG4vLyAgICAgfVxuLy9cbi8vXG4vLyAgICAgdXBkYXRlRmVhdHVyZVBvcHVwKGZlYXR1cmUsIHBvcHVwKSB7XG4vLyAgICAgICAgIGxldCBsYXRMbmcgPSBudWxsO1xuLy8gICAgICAgICBpZih0eXBlb2YoZmVhdHVyZS5nZXRMYXRMbmcpICE9PSAndW5kZWZpbmVkJykge1xuLy8gICAgICAgICAgICAgbGF0TG5nID0gZmVhdHVyZS5nZXRMYXRMbmcoKTtcbi8vICAgICAgICAgfSBlbHNlIGlmKHR5cGVvZihmZWF0dXJlLmdldENlbnRlcigpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbi8vICAgICAgICAgICAgIGxhdExuZyA9IGZlYXR1cmUuZ2V0Q2VudGVyKCk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYobGF0TG5nKVxuLy8gICAgICAgICAgICAgcG9wdXAuc2V0TGF0TG5nKGxhdExuZyk7XG4vLyAgICAgfVxuLy8gfVxuLy9cbi8vXG4vL1xuLy9cbi8vXG4vLyBjbGFzcyBFZGl0Q29udHJvbCBleHRlbmRzIENvbnRyb2wge1xuLy9cbi8vICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID86IGFueSkge1xuLy8gICAgICAgICBzdXBlcihvcHRpb25zKTtcbi8vICAgICB9XG4vL1xuLy8gICAgIGluaXRpYWxpemUgKG9wdGlvbnMgPzogYW55KSB7XG4vLyBcdFx0VXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuLy8gICAgIH1cbi8vXG4vLyAgICAgb25BZGQgKG1hcCA6IE1hcCkge1xuLy8gICAgICAgICBsZXQgY29udGFpbmVyIDogSFRNTEVsZW1lbnQgPSBEb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbCBsZWFmbGV0LWJhcicpLFxuLy8gICAgICAgICAgICAgYWN0aXZhdGVCdG4gOiBIVE1MQW5jaG9yRWxlbWVudCA9IERvbVV0aWwuY3JlYXRlKCdhJywgJycsIGNvbnRhaW5lcikgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4vL1xuLy8gICAgICAgICBhY3RpdmF0ZUJ0bi5ocmVmID0gJyMnO1xuLy8gICAgICAgICBhY3RpdmF0ZUJ0bi50aXRsZSA9ICdDcmVhdGUgYSBuZXcgJyArICh0aGlzLm9wdGlvbnMgYXMgYW55KS5raW5kO1xuLy8gICAgICAgICBhY3RpdmF0ZUJ0bi5pbm5lckhUTUwgPSAodGhpcy5vcHRpb25zIGFzIGFueSkuaHRtbDtcbi8vXG4vLyAgICAgICAgIERvbUV2ZW50Lm9uKGFjdGl2YXRlQnRuLCAnY2xpY2snLCBEb21FdmVudC5zdG9wKVxuLy8gICAgICAgICAub24oYWN0aXZhdGVCdG4sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5MQVlFUiA9IHRoaXMub3B0aW9ucy5jYWxsYmFjay5jYWxsKCAobWFwIGFzIGFueSkuZWRpdFRvb2xzICk7XG4vLyAgICAgICAgIH0sIHRoaXMpO1xuLy9cbi8vICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbi8vICAgICB9XG4vL1xuLy8gfVxuIl19