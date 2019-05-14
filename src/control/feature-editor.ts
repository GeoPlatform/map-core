

import {
    Map, Layer, FeatureGroup, Control, GeoJSON, popup,
    Util, DomUtil, DomEvent, Evented, ControlOptions
} from 'leaflet';
import { Draw } from 'leaflet-draw';
// import * as L from 'leaflet';   //for Leaflet.Draw
// const Draw = L.Draw;
// const EditHandler = Draw.EditToolbar.Edit;



import MapInstance from '../map/instance';



interface EditControlOptions extends ControlOptions {
    featureGroup : FeatureGroup
}

interface FeatureLayer extends Layer {
    feature : any;
    geometry : any;
    properties : {
        [key:string]: any;
        id : string;
    }
    toGeoJSON() : any;
    setStyle( args : any );
}


export default class FeatureEditor {


    private map : MapInstance;
    private feature : FeatureLayer;
    private originalFeature: FeatureLayer;
    private editingLayer : FeatureGroup;
    private tool : EditFeature;
    private visible : boolean;


    constructor( map : MapInstance, feature : FeatureLayer, options ?: any ) {
        this.map = map;
        this.feature = feature;
        this.visible = false;
    }


    /**
     *
     */
    disable () {
        this.doneEditing(false);
        this.unregisterTool();
    }

    /**
     *
     */
    unregisterTool() {
        if(this.tool) {
            this.tool.deactivate();
            let map = this.map.getMap();
            map.removeControl(this.tool);
            map.removeLayer(this.editingLayer);
        }
    }

    /**
     * @param bool - flag specifying the visibility of the original feature being edited
     */
    showOriginalLayer(bool) {
        if(!this.feature) return;
        let id = this.feature.properties.id;
        let layer = this.map.getFeatureLayer(id);
        this.map.setFeatureVisibility(layer, bool);
    }

    /**
     *
     */
    beginEditing() {

        if(!this.visible) return;

        this.originalFeature = GeoJSON.geometryToLayer(this.feature.toGeoJSON()) as FeatureLayer;
        this.feature.properties._editing=true;

        // get Leaflet.Map from instance
        let map = this.map.getMap();

        // find feature layer for specific feature
        let feature = this.map.getFeatureLayer(this.feature.properties.id);
        if(!feature) return;

        //clone feature layer and wrap with FeatureGroup
        // because Leaflet.Draw requires edited features
        // be within a FeatureGroup
        let editingLayer = this.editingLayer = new FeatureGroup().addTo(map);

        //if the feature being edited is a multi-geometry
        // ("MultiPoint", "MultiLineString", "MultiPolygon", "GeometryCollection")
        // then we need to split them up into individual geometries and
        // add them as separate layers which will all be editable
        if (this.feature.geometry.type.indexOf("Multi")===0) {
            let type = this.feature.geometry.type.replace("Multi","");
            this.feature.geometry.coordinates.each( (childCoords) => {
                let shape = {type:type, coordinates: childCoords};
                new GeoJSON(shape, {
                    onEachFeature: (feature, layer) => {
                        editingLayer.addLayer(layer);
                    }
                });
            });

        } else if(this.feature.geometry.type === 'GeometryCollection') {
            this.feature.geometry.geometries.each( (childGeometry) => {
                new GeoJSON(childGeometry, {
                    onEachFeature:   (feature, layer) => {
                        editingLayer.addLayer(layer);
                    }
                });
            });

        } else {
            new GeoJSON(feature.toGeoJSON()).eachLayer( (layer) => {
                editingLayer.addLayer(layer);
            });
        }

        //make this feature invisible
        this.showOriginalLayer(false);

        //register LeafletDraw control with Edit mode only
        // using just the feature layer identified
        this.tool = new EditFeature({
            featureGroup: editingLayer
        } as ControlOptions).addTo(map);
        this.tool.activate();

    }

    /**
     * @param save - flag specifying whether to persist changes to the feature
     */
    doneEditing( save ?: boolean ) {

        this.feature.properties._editing = false;

        if(typeof(save) === 'undefined' || save) {

            //if geometry changed
            if(this.tool && this.tool.hasBeenEdited()) {

                let isMulti = ~this.feature.geometry.type.indexOf("Multi");
                let isGeomColl = this.feature.geometry.type === 'GeometryCollection';
                let geoms = [], coords = [], geometry;
                this.editingLayer.eachLayer( (layer : Layer) => {
                    let feature = (layer as FeatureLayer).toGeoJSON();
                    geometry = feature.geometry;
                    if(isMulti) {
                        coords[coords.length] = geometry.coordinates;
                    } else if(isGeomColl) {
                        geoms[geoms.length] = feature;
                    }
                });

                //update existing feature with edited information
                if(isMulti)
                    this.feature.geometry.coordinates = coords;
                else if(isGeomColl)
                    this.feature.geometry.geometries = geoms;
                else
                    this.feature.geometry = geometry;

                //inform Map of change
                this.map.replaceFeature(this.feature);

            } else {
                //restore original layer
                this.showOriginalLayer(true);

                //redraw feature with new style info
                this.map.updateFeature(this.feature);
            }

        } else {
            //restore original layer (only if feature is to be visible)
            this.showOriginalLayer(this.visible);

            //Redraw feature which has been updated with
            // original style information (reset)
            this.map.updateFeature(this.feature);
        }

        //lastly, break down the editing tool
        if(this.tool) this.unregisterTool();

    }

    /**
     *
     */
    addProperty() {

    }

    /**
     *
     */
    highlightFeature() {
        this.map.focusFeature(this.feature.properties.id);
    }

    /**
     *
     */
    deleteFeature() {
        this.map.removeFeature(this.feature.properties.id);
    }

    /**
     * update rendered feature with latest info
     */
    updateFeature() {

        //if not editing a temporary feature...
        if(!this.editingLayer)
            this.map.updateFeature(this.feature);

        else {

            //don't need to update existing rendered feature
            // because it's been hidden and a temporary 'editing' version
            // is on the map. So we need to update that instead.
            // this.map.updateFeature(this.feature);


            //update 'editing' version of the feature in question

            let style = this.feature.properties.style;
            this.editingLayer.eachLayer( (layer : Layer) => {
                //do nothing for markers
                if((layer as FeatureLayer).feature.geometry.type !== 'Point') {
                    (layer as FeatureLayer).setStyle(style);
                }
            });

        }

    }

    /**
     *
     */
    cancelEditing () {
        this.feature = this.originalFeature;
        this.doneEditing(false);
    }

}









/**
 *
 */
class EditFeature extends Control {

    private map : Map;
    private enabled : boolean;
    private handler : Draw.EditToolbar.Edit;

    constructor( options ?: any ) {
        super( Object.assign( {
                position: 'bottomright',
                draw: false,
                edit: false
            }, options || {})
        );
    }

    onAdd (map : Map) {
        this.map = map;
        this.enabled = false;

        let opts = { };
        //needed or else L.EditToolbar.Edit fails to addHooks for PolyLine features
        (opts as any).selectedPathOptions = {
            dashArray: '10, 10',
            fill: true,
            fillColor: '#fe57a1',
            fillOpacity: 0.1,
            // Whether to user the existing layers color
            maintainColor: false
        };
        (opts as any).featureGroup = (this.options as any).featureGroup;

        this.handler = new Draw.EditToolbar.Edit(map, opts);

        var container = DomUtil.create('div', 'leaflet-edit-feature');
        return container;
    }

    onRemove (map : Map) {
        this.deactivate();
    }

    activate() {
        this.enabled = true;
        this.handler.enable();
    }

    deactivate() {
        this.enabled = false;
        this.handler.disable();
    }

    hasBeenEdited() {
        var result = false;
        if((this.options as any).featureGroup) {
            (this.options as any).featureGroup.eachLayer(function(layer) {
                result = result || layer.edited;
            });
        }
        return result;
    }

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
