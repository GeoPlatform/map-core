import { Draw } from 'leaflet-draw';
import 'leaflet.markercluster';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import { FeatureManager, tiledMapLayer, imageMapLayer, FeatureLayer } from 'esri-leaflet';
import * as jquery from 'jquery';
import { reject, defer, resolve } from 'q';
import * as L from 'leaflet';
import { Control, Util, DomUtil, Map, DomEvent, layerGroup, polyline, CircleMarker, divIcon, marker, control, FeatureGroup, GeoJSON, MarkerClusterGroup, icon, circleMarker, SVG, svg, Canvas, canvas, TileLayer, popup, Browser, Point, LatLng, TimeDimension, Layer, featureGroup, geoJSON, LayerGroup } from 'leaflet';
import { QueryFactory, LayerService, XHRHttpClient, Config, ItemService, ItemTypes, ServiceFactory } from '@geoplatform/client';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function Polyfills () {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                if (target == null) { // TypeError if undefined or null
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                /** @type {?} */
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    /** @type {?} */
                    var nextSource = arguments[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0 = function (options) {
    Util.setOptions(this, options);
    this._dataLoaders = {};
    // Try to set the zoom control this control is attached to from the
    // options
    if (this.options.zoomControl !== null) {
        this.zoomControl = this.options.zoomControl;
    }
}, ɵ1 = function (map) {
    this._addLayerListeners(map);
    this._addMapListeners(map);
    // Try to set the zoom control this control is attached to from the map
    // the control is being added to
    if (!this.options.separate && !this.zoomControl) {
        if (map.zoomControl) {
            this.zoomControl = map.zoomControl;
        }
        else if (map.zoomsliderControl) {
            this.zoomControl = map.zoomsliderControl;
        }
    }
    /** @type {?} */
    var classes = 'leaflet-control-loading';
    /** @type {?} */
    var container;
    if (this.zoomControl && !this.options.separate) {
        // If there is a zoom control, hook into the bottom of it
        container = this.zoomControl._container;
        // These classes are no longer used as of Leaflet 0.6
        classes += ' leaflet-bar-part-bottom leaflet-bar-part last';
    }
    else {
        // Otherwise, create a container for the indicator
        container = DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
    }
    this._indicator = DomUtil.create('a', classes, container);
    return container;
}, ɵ2 = function (map) {
    this._removeLayerListeners(map);
    this._removeMapListeners(map);
}, ɵ3 = function (map) {
    if (this.zoomControl && !this.options.separate) {
        // Override Control.removeFrom() to avoid clobbering the entire
        // _container, which is the same as zoomControl's
        this._container.removeChild(this._indicator);
        this._map = null;
        this.onRemove(map);
        return this;
    }
    else {
        // If this control is separate from the zoomControl, call the
        // parent method so we don't leave behind an empty container
        return Control.prototype.remove.call(this);
    }
}, ɵ4 = function (id) {
    this._dataLoaders[id] = true;
    this.updateIndicator();
}, ɵ5 = function (id) {
    delete this._dataLoaders[id];
    this.updateIndicator();
}, ɵ6 = function () {
    if (this.isLoading()) {
        this._showIndicator();
    }
    else {
        this._hideIndicator();
    }
}, ɵ7 = function () {
    return this._countLoaders() > 0;
}, ɵ8 = function () {
    /** @type {?} */
    var size = 0;
    /** @type {?} */
    var key;
    for (key in this._dataLoaders) {
        if (this._dataLoaders.hasOwnProperty(key))
            size++;
    }
    return size;
}, ɵ9 = function () {
    // Show loading indicator
    DomUtil.addClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button not last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ10 = function () {
    // Hide loading indicator
    DomUtil.removeClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ11 = function (e) {
    this.addLoader(this.getEventId(e));
}, ɵ12 = function (e) {
    this.removeLoader(this.getEventId(e));
}, ɵ13 = function (e) {
    if (e.id) {
        return e.id;
    }
    else if (e.layer) {
        return e.layer._leaflet_id;
    }
    return e.target._leaflet_id;
}, ɵ14 = function (e) {
    if (!e.layer || !e.layer.on)
        return;
    try {
        e.layer.on({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }
    catch (exception) {
        console.warn('L.Control.Loading: Tried and failed to add ' +
            ' event handlers to layer', e.layer);
        console.warn('L.Control.Loading: Full details', exception);
    }
}, ɵ15 = function (map) {
    // Add listeners for begin and end of load to any layers already on the
    // map
    map.eachLayer(function (layer) {
        if (!layer.on)
            return;
        layer.on({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }, this);
    // When a layer is added to the map, add listeners for begin and end
    // of load
    map.on('layeradd', this._layerAdd, this);
}, ɵ16 = function (map) {
    // Remove listeners for begin and end of load from all layers
    map.eachLayer(function (layer) {
        if (!layer.off)
            return;
        layer.off({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }, this);
    // Remove layeradd listener from map
    map.off('layeradd', this._layerAdd, this);
}, ɵ17 = function (map) {
    // Add listeners to the map for (custom) dataloading and dataload
    // events, eg, for AJAX calls that affect the map but will not be
    // reflected in the above layer events.
    map.on({
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
    }, this);
}, ɵ18 = function (map) {
    map.off({
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
    }, this);
};
/** @type {?} */
var loadingControl = Control.extend({
    options: {
        position: 'topleft',
        separate: false,
        zoomControl: null,
        spinjs: false,
        spin: {
            lines: 7,
            length: 3,
            width: 3,
            radius: 5,
            rotate: 13,
            top: "83%"
        }
    },
    initialize: ɵ0,
    onAdd: ɵ1,
    onRemove: ɵ2,
    removeFrom: ɵ3,
    addLoader: ɵ4,
    removeLoader: ɵ5,
    updateIndicator: ɵ6,
    isLoading: ɵ7,
    _countLoaders: ɵ8,
    _showIndicator: ɵ9,
    _hideIndicator: ɵ10,
    _handleLoading: ɵ11,
    _handleLoad: ɵ12,
    getEventId: ɵ13,
    _layerAdd: ɵ14,
    _addLayerListeners: ɵ15,
    _removeLayerListeners: ɵ16,
    _addMapListeners: ɵ17,
    _removeMapListeners: ɵ18
});
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.Control.Loading = loadingControl;
    L$$1.Control.loading = function (options) {
        return new L$$1.Control.Loading(options);
    };
}
Map.addInitHook(function () {
    if (this.options.loadingControl) {
        this.loadingControl = new loadingControl();
        this.addControl(this.loadingControl);
    }
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$1 = function (map) {
    /** @type {?} */
    var className = 'leaflet-control-zoom leaflet-bar leaflet-control';
    /** @type {?} */
    var container = DomUtil.create('div', className);
    this._createButton('&#8674;', 'Measure', 'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom', container, this._toggleMeasure, this);
    return container;
}, ɵ1$1 = function (html, title, className, container, fn, context) {
    /** @type {?} */
    var link = DomUtil.create('a', className, container);
    link.innerHTML = html;
    (/** @type {?} */ (link)).href = '#';
    link.title = title;
    DomEvent
        .on(link, 'click', DomEvent.stopPropagation)
        .on(link, 'click', DomEvent.preventDefault)
        .on(link, 'click', fn, context)
        .on(link, 'dblclick', DomEvent.stopPropagation);
    return link;
}, ɵ2$1 = function () {
    this._measuring = !this._measuring;
    if (this._measuring) {
        DomUtil.addClass(this._container, 'leaflet-control-measure-on');
        this._startMeasuring();
    }
    else {
        DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
        this._stopMeasuring();
    }
}, ɵ3$1 = function () {
    this._oldCursor = this._map._container.style.cursor;
    this._map._container.style.cursor = 'crosshair';
    this._doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();
    DomEvent
        .on(this._map, 'mousemove', this._mouseMove, this)
        .on(this._map, 'click', this._mouseClick, this)
        .on(this._map, 'dblclick', this._finishPath, this);
    //.on( (document as Document), 'keydown', this._onKeyDown, this);
    if (!this._layerPaint) {
        this._layerPaint = layerGroup().addTo(this._map);
    }
    if (!this._points) {
        this._points = [];
    }
}, ɵ4$1 = function () {
    this._map._container.style.cursor = this._oldCursor;
    DomEvent
        //.off((document as Document), 'keydown', this._onKeyDown, this)
        .off(this._map, 'mousemove', this._mouseMove, this)
        .off(this._map, 'click', this._mouseClick, this)
        .off(this._map, 'dblclick', this._mouseClick, this);
    if (this._doubleClickZoom) {
        this._map.doubleClickZoom.enable();
    }
    if (this._layerPaint) {
        this._layerPaint.clearLayers();
    }
    this._restartPath();
}, ɵ5$1 = function (e) {
    if (!e.latlng || !this._lastPoint) {
        return;
    }
    if (!this._layerPaintPathTemp) {
        /** @type {?} */
        let opts = /** @type {?} */ ({
            color: 'black',
            weight: 1.5,
            clickable: false,
            dashArray: '6,3'
        });
        this._layerPaintPathTemp = polyline([this._lastPoint, e.latlng], opts)
            .addTo(this._layerPaint);
    }
    else {
        this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
    }
    if (this._tooltip) {
        if (!this._distance) {
            this._distance = 0;
        }
        this._updateTooltipPosition(e.latlng);
        /** @type {?} */
        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._distance + distance, distance);
    }
}, ɵ6$1 = function (e) {
    // Skip if no coordinates
    if (!e.latlng) {
        return;
    }
    // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
    if (this._lastPoint && this._tooltip) {
        if (!this._distance) {
            this._distance = 0;
        }
        this._updateTooltipPosition(e.latlng);
        /** @type {?} */
        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._distance + distance, distance);
        this._distance += distance;
    }
    this._createTooltip(e.latlng);
    // If this is already the second click, add the location to the fix path (create one first if we don't have one)
    if (this._lastPoint && !this._layerPaintPath) {
        /** @type {?} */
        let opts = /** @type {?} */ ({
            color: 'black',
            weight: 2,
            clickable: false
        });
        this._layerPaintPath = polyline([this._lastPoint], opts).addTo(this._layerPaint);
    }
    if (this._layerPaintPath) {
        this._layerPaintPath.addLatLng(e.latlng);
    }
    // Upate the end marker to the current location
    if (this._lastCircle) {
        this._layerPaint.removeLayer(this._lastCircle);
    }
    /** @type {?} */
    let markerOpts = /** @type {?} */ ({
        color: 'black',
        opacity: 1,
        weight: 1,
        fill: true,
        fillOpacity: 1,
        radius: 2,
        clickable: this._lastCircle ? true : false
    });
    this._lastCircle = new CircleMarker(e.latlng, markerOpts).addTo(this._layerPaint);
    this._lastCircle.on('click', function () { this._finishPath(); }, this);
    // Save current location as last location
    this._lastPoint = e.latlng;
}, ɵ7$1 = function () {
    // Remove the last end marker as well as the last (moving tooltip)
    if (this._lastCircle) {
        this._layerPaint.removeLayer(this._lastCircle);
    }
    if (this._tooltip) {
        this._layerPaint.removeLayer(this._tooltip);
    }
    if (this._layerPaint && this._layerPaintPathTemp) {
        this._layerPaint.removeLayer(this._layerPaintPathTemp);
    }
    // Reset everything
    this._restartPath();
}, ɵ8$1 = function () {
    this._distance = 0;
    this._tooltip = undefined;
    this._lastCircle = undefined;
    this._lastPoint = undefined;
    this._layerPaintPath = undefined;
    this._layerPaintPathTemp = undefined;
}, ɵ9$1 = function (position) {
    /** @type {?} */
    var icon$$1 = divIcon({
        className: 'leaflet-measure-tooltip',
        iconAnchor: [-5, -5]
    });
    this._tooltip = marker(position, {
        icon: icon$$1,
        clickable: false
    }).addTo(this._layerPaint);
}, ɵ10$1 = function (position) {
    this._tooltip.setLatLng(position);
}, ɵ11$1 = function (total, difference) {
    /** @type {?} */
    var totalRound = this._round(total);
    /** @type {?} */
    var differenceRound = this._round(difference);
    /** @type {?} */
    var text = '<div class="leaflet-measure-tooltip-total">' + totalRound + ' nm</div>';
    if (differenceRound > 0 && totalRound != differenceRound) {
        text += '<div class="leaflet-measure-tooltip-difference">(+' + differenceRound + ' nm)</div>';
    }
    this._tooltip._icon.innerHTML = text;
}, ɵ12$1 = function (val) {
    return Math.round((val / 1852) * 10) / 10;
}, ɵ13$1 = function (e) {
    if (e.keyCode == 27) {
        // If not in path exit measuring mode, else just finish path
        if (!this._lastPoint) {
            this._toggleMeasure();
        }
        else {
            this._finishPath();
        }
    }
};
/** @type {?} */
var measureControl = Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: ɵ0$1,
    _createButton: ɵ1$1,
    _toggleMeasure: ɵ2$1,
    _startMeasuring: ɵ3$1,
    _stopMeasuring: ɵ4$1,
    _mouseMove: ɵ5$1,
    _mouseClick: ɵ6$1,
    _finishPath: ɵ7$1,
    _restartPath: ɵ8$1,
    _createTooltip: ɵ9$1,
    _updateTooltipPosition: ɵ10$1,
    _updateTooltipDistance: ɵ11$1,
    _round: ɵ12$1,
    _onKeyDown: ɵ13$1
});
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.Control.Measure = measureControl;
    L$$1.control.measure = function (options) {
        return new L$$1.Control.Measure(options);
    };
}
Map.mergeOptions({
    measureControl: false
});
Map.addInitHook(function () {
    if (this.options.measureControl) {
        this.measureControl = new measureControl();
        this.addControl(this.measureControl);
    }
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$2 = function (map) {
    this._container = DomUtil.create('div', 'leaflet-control-mouseposition');
    DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
}, ɵ1$2 = function (map) {
    map.off('mousemove', this._onMouseMove);
}, ɵ2$2 = function (e) {
    /** @type {?} */
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : Util.formatNum(e.latlng.lng, this.options.numDigits);
    /** @type {?} */
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : Util.formatNum(e.latlng.lat, this.options.numDigits);
    /** @type {?} */
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    /** @type {?} */
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
};
/** @type {?} */
var positionControl = Control.extend({
    options: {
        position: 'bottomleft',
        separator: ' : ',
        emptyString: 'Unavailable',
        lngFirst: false,
        numDigits: 6,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
    },
    onAdd: ɵ0$2,
    onRemove: ɵ1$2,
    _onMouseMove: ɵ2$2
});
// if( (window as any).L) {
//     const L = (window as any).L;
//     L.Control.MousePosition =  positionControl;
//     L.control.mousePosition = function (options) {
//         return new L.Control.MousePosition(options);
//     };
// }
(/** @type {?} */ (Control)).MousePosition = positionControl;
(/** @type {?} */ (control)).mousePosition = function (options) {
    return new (/** @type {?} */ (Control)).MousePosition(options);
};
Map.mergeOptions({
    positionControl: false
});
Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new positionControl();
        this.addControl(this.positionControl);
    }
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FeatureEditor {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const LayerResourceTypes = {
    MapBoxVectorTile: 'http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer',
    OSM: 'http://www.geoplatform.gov/ont/openlayer/OSMLayer',
    BaseLayer: 'http://www.geoplatform.gov/ont/openlayer/BaseLayer'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var OSM = {
    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    test: function (layer) {
        return layer &&
            layer.resourceTypes &&
            layer.resourceTypes.length &&
            ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM);
    },
    get: function (layerService) {
        let query = QueryFactory()
            .fields('*')
            .resourceTypes(LayerResourceTypes.OSM);
        if (!layerService)
            layerService = new LayerService(Config.ualUrl, new XHRHttpClient());
        return layerService.search(query)
            .then(response => response.results.length ? response.results[0] : null)
            .catch(e => reject(e));
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const WORLD_STREET_LAYER = '86a8babde086689e21248669ba4ed579';
const ɵ0$3 = function (layerService) {
    if (!layerService) {
        layerService = new LayerService(Config["ualUrl"], new XHRHttpClient());
    }
    /** @type {?} */
    let baseLayerId = Config["defaultBaseLayerId"] || WORLD_STREET_LAYER;
    return layerService.get(baseLayerId)
        .catch((e) => {
        return OSM.get();
    });
}, ɵ1$3 = function (layer) {
    /** @type {?} */
    let id = null;
    if (layer && layer.id)
        id = layer.id;
    else if (layer && typeof (layer) === 'string')
        id = layer;
    if (id) {
        Config["configure"]({ 'defaultBaseLayerId': layer.id });
    }
};
/** @type {?} */
var DefaultBaseLayer = {
    get: ɵ0$3,
    set: ɵ1$3
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const ogcExpr = /OGC.+\(([A-Z\-]+)\)/;
/** @type {?} */
const esriExpr = /Esri REST ([A-Za-z]+) Service/;
/** @type {?} */
const keyFn = (expr, str) => {
    /** @type {?} */
    let m = expr.exec(str);
    return (m && m.length) ? m[1] : null;
};
/** @type {?} */
var types = {
    ESRI_FEATURE_SERVER: {
        "id": "48980c5bad0c8d4666b393874eb5279a",
        "uri": "http://www.geoplatform.gov/spec/esri-feature-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Feature Server REST API",
        "label": "Esri REST Feature Service"
    },
    ESRI_IMAGE_SERVER: {
        "id": "bcdf764e52064c84323f3f1baea7e245",
        "uri": "http://www.geoplatform.gov/spec/esri-image-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Image Server REST API",
        "label": "Esri REST Image Service"
    },
    ESRI_MAP_SERVER: {
        "id": "370cf6ca5d91c07b63329b8384fe76c7",
        "uri": "http://www.geoplatform.gov/spec/esri-map-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Map Server REST API",
        "label": "Esri REST Map Service"
    },
    ESRI_TILE_SERVER: {
        "id": "c75570ff2523b1a1631afe7ddac27beb",
        "uri": "http://www.geoplatform.gov/spec/esri-tile-rest",
        "type": "dct:Standard",
        "description": "Esri ArcGIS Tile Server REST API",
        "label": "Esri REST Tile Service"
    },
    KML: {
        "id": "c0b39ca2049ba2184472ff27408ffd7e",
        "uri": "http://opengis.net/spec/kml",
        "type": "dct:Standard",
        "description": "OGC Keyhole Markup Language (KML)",
        "label": "OGC Keyhole Markup Language (KML)"
    },
    CSW: {
        "id": "60de6a422475493b7901ae453d6f4562",
        "uri": "http://opengis.net/spec/csw",
        "type": "dct:Standard",
        "description": "OGC Web Catalog Service (CSW)",
        "label": "OGC Web Catalog Service (CSW)"
    },
    WCS: {
        "id": "a7e5a2d81a83d4eae9bf9138f24d0a32",
        "uri": "http://opengis.net/spec/wcs",
        "type": "dct:Standard",
        "description": "OGC Web Coverage Service (WCS)",
        "label": "OGC Web Coverage Service (WCS)"
    },
    WFS: {
        "id": "e70e43ed52f83634285a09e959734bff",
        "uri": "http://opengis.net/spec/wfs",
        "type": "dct:Standard",
        "description": "OGC Web Feature Service (WFS)",
        "label": "OGC Web Feature Service (WFS)"
    },
    WMS: {
        "id": "abed5a00c536fb2d7019092c37ed634c",
        "uri": "http://opengis.net/spec/wms",
        "type": "dct:Standard",
        "description": "OGC Web Map Service (WMS)",
        "label": "OGC Web Map Service (WMS)"
    },
    WMTS: {
        "id": "757858ae77cf8c602b39294c27632dd7",
        "uri": "http://opengis.net/spec/wmts",
        "type": "dct:Standard",
        "description": "OGC Web Map Tile Service (WMTS)",
        "label": "OGC Web Map Tile Service (WMTS)"
    },
    WMST: {
        "id": "faae5bff49b1144d500380cbc055c1e5",
        "uri": "http://www.geoplatform.gov/spec/ogc-wms-t",
        "type": "dct:Standard",
        "description": "OGC WMS support for temporal according to OGC Best Practice guidance",
        "label": "OGC WMS-T Service"
    },
    FEED: {
        "id": "8edc61870e534a1f23dc967753da3b72",
        "uri": "http://www.geoplatform.gov/spec/feed",
        "type": "dct:Standard",
        "description": "GeoPlatform GeoJSON Feed Service converts an Atom/RSS feed (including GeoRSS and CAP extensions) to GeoJSON",
        "label": "GeoPlatform GeoJSON Feed Service"
    },
    //
    //method to allow refreshing list later
    refresh: updateList
};
/**
 * @param {?} service
 * @return {?}
 */
function updateList(service) {
    /** @type {?} */
    let url = Config["ualUrl"];
    if (!url) {
        console.log("WARN : ServiceTypes - no GeoPlatform API URL configured, unable to load service types");
    }
    else {
        /** @type {?} */
        let query = QueryFactory()
            .types('dct:Standard')
            .resourceTypes('ServiceType')
            .pageSize(50);
        /** @type {?} */
        let svc = null;
        //if a service was provided to be used, use it
        if (service && typeof (service.search) !== 'undefined') {
            svc = service;
        }
        else { // otherwise, use defaults
            // otherwise, use defaults
            svc = new ItemService(url, new XHRHttpClient());
        }
        svc.search(query).then(data => {
            for (let i = 0; i < data.results.length; ++i) {
                /** @type {?} */
                let type = data.results[i];
                /** @type {?} */
                let key = null;
                /** @type {?} */
                let label = type.label;
                if (~label.indexOf("WMS-T")) {
                    key = 'WMST';
                    type.supported = true;
                }
                else if (~label.indexOf('OGC')) {
                    key = keyFn(ogcExpr, label);
                    type.supported = 'WMS' === key || 'WMTS' === key;
                }
                else if (~label.indexOf('Esri')) {
                    key = keyFn(esriExpr, label);
                    type.supported = true;
                    key = 'ESRI_' + key.toUpperCase() + '_SERVER';
                }
                else if (~label.indexOf("Feed")) {
                    key = "FEED";
                    type.supported = true;
                }
                else {
                    key = label;
                }
                types[key] = type;
            }
            // console.log(types);
        })
            .catch(error => {
            console.log("Error loading supported service types: " + error.message);
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
const ɵ0$5 = function (options) {
    FeatureManager.prototype.initialize.call(this, options);
    options = Util.setOptions(this, options);
    this._layers = {};
    this._leafletIds = {};
    this.cluster = new MarkerClusterGroup(options);
    this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');
    this.cluster.addEventParent(this);
}, ɵ1$4 = function (map) {
    FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.cluster);
    // NOTE !!!!!!!
    // Using this type of layer requires map.maxZoom to be set during map creation!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}, ɵ2$3 = function (map) {
    FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.cluster);
}, ɵ3$2 = function (features) {
    /** @type {?} */
    var markers = [];
    for (var i = features.length - 1; i >= 0; i--) {
        /** @type {?} */
        var geojson = features[i];
        /** @type {?} */
        var layer = this._layers[geojson.id];
        if (!layer) {
            /** @type {?} */
            var newLayer = GeoJSON.geometryToLayer(geojson, this.options);
            newLayer.feature = GeoJSON.asFeature(geojson);
            newLayer.defaultOptions = newLayer.options;
            newLayer._leaflet_id = this._key + '_' + geojson.id;
            this.resetStyle(newLayer.feature.id);
            // cache the layer
            this._layers[newLayer.feature.id] = newLayer;
            this._leafletIds[newLayer._leaflet_id] = geojson.id;
            if (this.options.onEachFeature) {
                this.options.onEachFeature(newLayer.feature, newLayer);
            }
            this.fire('createfeature', {
                feature: newLayer.feature
            });
            // add the layer if it is within the time bounds or our layer is not time enabled
            if (!this.options.timeField || (this.options.timeField && this._featureWithinTimeRange(geojson))) {
                markers.push(newLayer);
            }
        }
    }
    if (markers.length) {
        this.cluster.addLayers(markers);
    }
}, ɵ4$2 = function (ids) {
    /** @type {?} */
    var layersToAdd = [];
    for (var i = ids.length - 1; i >= 0; i--) {
        /** @type {?} */
        var layer = this._layers[ids[i]];
        this.fire('addfeature', {
            feature: layer.feature
        });
        layersToAdd.push(layer);
    }
    this.cluster.addLayers(layersToAdd);
}, ɵ5$2 = function (ids, permanent) {
    /** @type {?} */
    var layersToRemove = [];
    for (var i = ids.length - 1; i >= 0; i--) {
        /** @type {?} */
        var id = ids[i];
        /** @type {?} */
        var layer = this._layers[id];
        this.fire('removefeature', {
            feature: layer.feature,
            permanent: permanent
        });
        layersToRemove.push(layer);
        if (this._layers[id] && permanent) {
            delete this._layers[id];
        }
    }
    this.cluster.removeLayers(layersToRemove);
}, ɵ6$2 = function (id) {
    /** @type {?} */
    var layer = this._layers[id];
    if (layer) {
        layer.options = layer.defaultOptions;
        this.setFeatureStyle(layer.feature.id, this.options.style);
    }
    return this;
}, ɵ7$2 = function (style) {
    this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }, this);
    return this;
}, ɵ8$2 = function (id, style) {
    /** @type {?} */
    var layer = this._layers[id];
    if (typeof style === 'function') {
        style = style(layer.feature);
    }
    if (layer.setStyle) {
        layer.setStyle(style);
    }
}, ɵ9$2 = function (fn, context) {
    for (var i in this._layers) {
        fn.call(context, this._layers[i]);
    }
    return this;
}, ɵ10$2 = function (id) {
    return this._layers[id];
};
/** @type {?} */
var BaseClusteredFeatureLayer = FeatureManager.extend({
    statics: {
        EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
        CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
    },
    /**
       * Constructor
       */
    initialize: ɵ0$5,
    /**
       * Layer Interface
       */
    onAdd: ɵ1$4,
    onRemove: ɵ2$3,
    /**
       * Feature Management Methods
       */
    createLayers: ɵ3$2,
    addLayers: ɵ4$2,
    removeLayers: ɵ5$2,
    /**
       * Styling Methods
       */
    resetStyle: ɵ6$2,
    setStyle: ɵ7$2,
    setFeatureStyle: ɵ8$2,
    /**
       * Utility Methods
       */
    eachFeature: ɵ9$2,
    getFeature: ɵ10$2
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const jQuery = jquery;
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?} id - identifier of layer to resolve style for
 * @return {?}
 */
function featureStyleResolver(id) {
    /** @type {?} */
    let deferred = defer();
    if (!jQuery) {
        deferred.reject(new Error("Unable to load feature layer style, jQuery is not installed"));
        return deferred.promise;
    }
    jQuery.ajax({
        url: Config["ualUrl"] + '/api/layers/' + id + '/style',
        dataType: 'json',
        success: function (data) {
            deferred.resolve(data);
        },
        error: function (xhr, status, message) {
            /** @type {?} */
            let em = `FeatureStyleResolver() -
               Error loading style information for layer ${id} : ${message}`;
            /** @type {?} */
            let error = new Error(em);
            deferred.reject(error);
        }
    });
    return deferred.promise;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} feature
 * @return {?}
 */
function featurePopupTemplate(feature) {
    /** @type {?} */
    let props = Object.keys(feature.properties);
    /** @type {?} */
    const pFn = function (list, names) {
        if (!list || !list.find)
            return null;
        /** @type {?} */
        let match = list.find(name => {
            /** @type {?} */
            let lc = name.toLowerCase();
            return names.indexOf(lc) >= 0;
        });
        return match;
    };
    /** @type {?} */
    let titleProp = pFn(props, ['title', 'name', 'label']);
    /** @type {?} */
    let title = titleProp ? feature.properties[titleProp] : "Untitled";
    /** @type {?} */
    let descProp = pFn(props, ['description', 'summary', 'descript']);
    /** @type {?} */
    let description = descProp ? feature.properties[descProp] : "No description provided";
    /** @type {?} */
    let result = '<div class="feature-popup">' +
        '<h5>' + title + '</h5>' +
        '<p>' + description + '</p>';
    if (feature.properties.modified) {
        /** @type {?} */
        let modified = new Date(feature.properties.modified);
        result += '<div><span class="label">Updated</span><span class="value">' +
            modified.toDateString() + '</span></div>';
    }
    if (feature.properties['cap:effective']) {
        /** @type {?} */
        let date = new Date(feature.properties['cap:effective']);
        result += '<div>' +
            '<span class="label">Effective</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    if (feature.properties['cap:expires']) {
        /** @type {?} */
        let date = new Date(feature.properties['cap:expires']);
        result += '<div>' +
            '<span class="label">Expires</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    /** @type {?} */
    let linkProp = pFn(props, ['landingpage', 'link', 'website']);
    if (linkProp) {
        result += '<br>';
        result += '<a href="' + feature.properties[linkProp] + '" target="_blank">link</a>';
    }
    result += '<hr>';
    for (let prop in feature.properties) {
        if (titleProp === prop || descProp === prop ||
            linkProp === prop || 'modified' === prop)
            continue;
        /** @type {?} */
        let value = feature.properties[prop];
        if (typeof (value) === 'object') {
            for (let p in value) {
                result += '<div>' +
                    '<span class="label">' + prop + '.' + p + '</span>' +
                    '<span class="value">' + value[p] + '</span>' +
                    '</div>';
            }
        }
        else {
            result += '<div>' +
                '<span class="label">' + prop + '</span>' +
                '<span class="value">' + value + '</span>' +
                '</div>';
        }
    }
    result += '</div>';
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const jQuery$1 = jquery;
const ɵ0$6 = function (feature, latlng) {
    /** @type {?} */
    var style = feature && feature.properties ? feature.properties.style : null;
    if (!style && typeof this.options.style === 'function') {
        // console.log("Using local style function");
        try {
            style = this.options.style(feature);
        }
        catch (e) {
            console.log("error using style function in ClusteredFeatureLayer: " + e.message);
        }
    }
    style = style || this.options.style || {};
    style.radius = style['stroke-width'] || style.radius || 4;
    style.weight = style['stroke-width'] || style.weight || 2;
    style.color = style.stroke || style.color || '#03f';
    style.opacity = style['stroke-opacity'] || style.opacity || 0.9;
    style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
    style.fillColor = style.fill || style.color || '#03f';
    style.renderer = this.options.renderer;
    /** @type {?} */
    let marker$$1 = null;
    if (style.shape === 'image') {
        /** @type {?} */
        let width = style.width || 16;
        /** @type {?} */
        let height = style.height || 16;
        /** @type {?} */
        var icon$$1 = icon({
            iconUrl: style.content,
            //base64 encoded string
            iconSize: [width, height],
            iconAnchor: [width * 0.5, height * 0.5],
            popupAnchor: [0, -11],
        });
        /** @type {?} */
        let mopts = { icon: icon$$1 };
        if (Config["leafletPane"])
            (/** @type {?} */ (mopts)).pane = Config["leafletPane"];
        marker$$1 = marker(latlng, mopts);
    }
    else {
        marker$$1 = circleMarker(latlng, style);
    }
    /** @type {?} */
    let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
    marker$$1.bindPopup(popupTemplate(feature));
    return marker$$1;
}, ɵ1$5 = function (feature, layer) {
    if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
        return;
    }
    layer.bindPopup(featurePopupTemplate(feature));
}, ɵ2$4 = function (options) {
    options = options || {};
    if (Config["leafletPane"])
        options.pane = Config["leafletPane"];
    options.pointToLayer = Util.bind(this.pointToLayerFn, this);
    options.onEachFeature = Util.bind(this.eachFeatureFn, this);
    // options.fields = ['FID', 'type', 'title', 'geometry'];
    //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
    // This needs to be increased to ensure all markers can be clicked
    // when spiderfied (some get stuck under the spider legs)
    options.spiderfyDistanceMultiplier = 2;
    /** @type {?} */
    let getGPStyle = () => { return this._gpStyle; };
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    /** @type {?} */
    let svgOpts = {};
    if (Config["leafletPane"])
        (/** @type {?} */ (svgOpts)).pane = Config["leafletPane"];
    /** @type {?} */
    var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
    options.renderer = renderer;
    BaseClusteredFeatureLayer.prototype.initialize.call(this, options);
    this.on('load', function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    });
}, ɵ3$3 = function (map) {
    BaseClusteredFeatureLayer.prototype.onAdd.call(this, map);
    if (this.options.layerId) {
        this.loadStyle(this.options.layerId);
    }
}, ɵ4$3 = function (features) {
    BaseClusteredFeatureLayer.prototype.createLayers.call(this, features);
    this.setVisibility(this.currentVisibility);
    this.setOpacity(this.currentOpacity);
}, ɵ5$3 = function (index) {
    this.options.zIndex = index;
    for (var id in this._layers) {
        /** @type {?} */
        let lyr = this._layers[id];
        if (lyr.setZIndex)
            lyr.setZIndex(index);
        else if (lyr._updateZIndex)
            lyr._updateZIndex(index);
        else if (lyr._renderer && lyr._renderer._container) {
            lyr._renderer._container.style.zIndex = index;
        }
    }
}, ɵ6$3 = function () {
    this.currentVisibility = !this.currentVisibility;
    this.setVisibility(this.currentVisibility);
    // //clustered features
    // if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
    //     for(let id in this.cluster._featureGroup._layers) {
    //         let layer = this.cluster._featureGroup._layers[id];
    //         if(layer._icon) {
    //             jQuery(layer._icon).toggleClass('invisible');
    //         }
    //     }
    // }
    //
    // //non-clustered features
    // if(this._layers) {
    //     for(let id in this._layers)
    //         this._layers[id].toggleVisibility();
    // }
}, ɵ7$3 = function (bool) {
    this.currentVisibility = !!bool;
    if (this.options.renderer._container) {
        this.options.renderer._container.style.display = bool ? '' : 'none';
    }
    //clustered features
    if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
        for (let id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            let layer = this.cluster._featureGroup._layers[id];
            if (layer._icon) {
                /** @type {?} */
                var icon$$1 = jQuery$1(layer._icon);
                if (bool)
                    icon$$1.removeClass('invisible');
                else
                    icon$$1.addClass('invisible');
            }
        }
    }
    //non-clustered features
    if (this._layers) {
        for (let id in this._layers) {
            /** @type {?} */
            let layer = this._layers[id];
            if (layer.setVisibility)
                layer.setVisibility(bool);
            else if (layer.setStyle)
                layer.setStyle({ display: bool ? '' : 'none' });
        }
    }
}, ɵ8$3 = function (opacity) {
    this.currentOpacity = isNaN(opacity) ? 1.0 : opacity * 1;
    //clustered features
    if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
        for (let id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            let layer = this.cluster._featureGroup._layers[id];
            if (layer._icon) {
                jQuery$1(layer._icon).css({ opacity: opacity });
            }
        }
    }
    //non-clustered features
    if (this._layers) {
        for (let id in this._layers) {
            /** @type {?} */
            let layer = this._layers[id];
            if (layer.setOpacity)
                layer.setOpacity(opacity);
        }
    }
}, ɵ9$3 = function (style) {
    this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }, this);
}, ɵ10$3 = function (gpLayerId) {
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId)
            .then(json => {
            if (!json)
                return;
            /** @type {?} */
            let style = null;
            if (json && json.styles) {
                /** @type {?} */
                let featureFn = function (feature) {
                    /** @type {?} */
                    let property = this.property || this.field1;
                    /** @type {?} */
                    let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                    /** @type {?} */
                    let style = null;
                    if (this.styles) {
                        /** @type {?} */
                        let wrapper = this.styles.find(sw => sw.value === v);
                        if (wrapper) {
                            style = wrapper.style;
                            style.radius = style['stroke-width'] || style.radius || 4;
                            style.weight = style['stroke-width'] || style.weight || 2;
                            style.color = style.stroke || style.color || '#03f';
                            style.opacity = style['stroke-opacity'] || style.opacity || 0.9;
                            style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
                            style.fillColor = style.fill || style.color || '#03f';
                        }
                        else {
                            console.log("No matching style for " + JSON.stringify(feature.properties));
                        }
                    }
                    // console.log("Using style: " + JSON.stringify(style));
                    return style;
                };
                /** @type {?} */
                let styleFn = () => { return featureFn(json); };
                this.options.style = styleFn;
                setTimeout((layer, style) => { layer.setStyle(style); }, 1000, this, styleFn);
                return;
            }
            else if (json && typeof (json.push) !== 'undefined') {
                //multiple styles returned
                style = json[0]; //use first for now
            }
            else if (json) {
                style = json;
            }
            else {
                return; //unrecognizable style
            }
            if (style.shape) {
                /** @type {?} */
                var obj = jQuery$1.extend({}, style);
                obj.style = style;
                this._gpStyle = style;
                //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                // non-clustered features.
                // this.setStyle(obj);
                //So instead, we manually set it on all features of the layer (that aren't clustered)
                for (let id in this._layers)
                    this._layers[id].setStyle(obj);
            }
        })
            .catch(e => {
            console.log("Error fetching feature layer style");
            console.log(e);
        });
    }
};
/** *
 * Clustered Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
  @type {?} */
var ClusteredFeatureLayer = BaseClusteredFeatureLayer.extend({
    currentVisibility: true,
    currentOpacity: 1.0,
    _gpStyle: { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },
    /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
    pointToLayerFn: ɵ0$6,
    /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
    eachFeatureFn: ɵ1$5,
    initialize: ɵ2$4,
    onAdd: ɵ3$3,
    /** override super class' method to set viz/opac after sub layers created */
    createLayers: ɵ4$3,
    /**
         * @param {integer} index
         */
    setZIndex: ɵ5$3,
    /** */
    toggleVisibility: ɵ6$3,
    /**
         * @param {boolean} bool - flag
         */
    setVisibility: ɵ7$3,
    /**
         * @param {number} opacity
         */
    setOpacity: ɵ8$3,
    setStyle: ɵ9$3,
    loadStyle: ɵ10$3
});
/**
 * @param {?} layer - GeoPlatform Layer object
 * @param {?} options - optional properties
 * @return {?} leaflet layer instance or null
 */
function clusteredFeatures(layer, options) {
    /** @type {?} */
    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        let msg = `clusteredFeatures() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }
    /** @type {?} */
    let url = service.href;
    /** @type {?} */
    let format = layer.supportedFormats ? layer.supportedFormats[0] : null;
    /** @type {?} */
    let styleResolver = options && options.styleResolver ?
        options.styleResolver : featureStyleResolver;
    /** @type {?} */
    let opts = {
        url: url + '/' + layer.layerName,
        styleLoader: styleResolver,
        layerId: layer.id
    };
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
/**
 * @param {?} layer - GeoPlatform Layer object
 * @param {?} options - optional properties
 * @return {?} leaflet layer instance or null
 */
function geoJsonFeed(layer, options) {
    /** @type {?} */
    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        let msg = `geoJsonFeed() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }
    /** @type {?} */
    let url = service.href;
    /** @type {?} */
    let format = layer.supportedFormats ? layer.supportedFormats[0] : null;
    /** @type {?} */
    let layerUrl = url + (url[url.length - 1] === '/' ? '' : '/') +
        layer.id + '/FeatureServer/' + layer.layerName;
    /** @type {?} */
    let styleUrl = url.replace('feeds', 'styles') +
        (url[url.length - 1] === '/' ? '' : '/') + layer.id;
    /** @type {?} */
    let styleLoaderFactory = function (url) {
        return function (layerId) {
            /** @type {?} */
            let deferred = defer();
            if (!jQuery$1) {
                deferred.reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                return deferred.promise;
            }
            jQuery$1.ajax(url, {
                dataType: 'json',
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (xhr, status, message) {
                    /** @type {?} */
                    let em = `geoJsonFeed() -
                        Error loading style information for layer ${layerId} : ${message}`;
                    /** @type {?} */
                    let error = new Error(em);
                    deferred.reject(error);
                }
            });
            return deferred.promise; //uses jQuery promise
        };
    };
    /** @type {?} */
    let opts = {
        url: layerUrl,
        isModern: true,
        //force to use GeoJSON
        layerId: layer.id,
        //used by style loader
        styleLoader: styleLoaderFactory(styleUrl)
    };
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const jQuery$2 = jquery;
class WMS extends TileLayer.WMS {
    /**
     * @param {?} url
     * @param {?=} opts
     */
    constructor(url, opts) {
        super(url, opts);
        this._enabled = false;
        this._enabled = false;
    }
    /**
     * @return {?}
     */
    enableGetFeatureInfo() {
        this._map.on('click', this.getFeatureInfo, this);
        this._enabled = true;
    }
    /**
     * @return {?}
     */
    disableGetFeatureInfo() {
        this._map.off('click', this.getFeatureInfo, this);
        this._enabled = false;
    }
    /**
     * @return {?}
     */
    isGetFeatureInfoEnabled() {
        return this._enabled;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onRemove(map) {
        //if GFI is enabled, disable it before removing
        if (this.isGetFeatureInfoEnabled())
            this.disableGetFeatureInfo();
        // Triggered when the layer is removed from a map.
        //   Unregister a click listener, then do all the upstream WMS things
        return super.onRemove.call(this, map);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    getFeatureInfo(evt) {
        /** @type {?} */
        var url = this.getFeatureInfoUrl(evt.latlng);
        /** @type {?} */
        var parseGetFeatureInfo = this.parseGetFeatureInfo;
        jQuery$2.ajax({
            url: url,
            /**
             * @param {?} data
             * @param {?} status
             * @param {?} xhr
             * @return {?}
             */
            success(data, status, xhr) {
                // var err = typeof data === 'string' ? null : data;
                if (typeof (data) !== 'string')
                    data = parseGetFeatureInfo(data);
            },
            /**
             * @param {?} xhr
             * @param {?} status
             * @param {?} error
             * @return {?}
             */
            error(xhr, status, error) {
            }
        });
    }
    /**
     * @param {?} latlng
     * @return {?}
     */
    getFeatureInfoUrl(latlng) {
        /** @type {?} */
        var point = this._map.latLngToContainerPoint(latlng);
        /** @type {?} */
        var size = this._map.getSize();
        /** @type {?} */
        var params = {
            srs: 'EPSG:4326',
            bbox: this._map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            // layers: this.wmsParams.layers,
            // query_layers: this.wmsParams.layers,
            info_format: 'text/xml',
            x: point.x,
            y: point.y,
            i: point.x,
            //1.3.0
            j: point.y //1.3.0
        };
        /** @type {?} */
        let wmvId = (/** @type {?} */ (this.wmsParams)).wmvId;
        /** @type {?} */
        var url = '/api/layers/' + wmvId + '/feature';
        return Config["ualUrl"] + url + Util.getParamString(params, url, true);
    }
    /**
     * @param {?} content
     * @return {?}
     */
    parseGetFeatureInfo(content) {
        /** @type {?} */
        var fields = [];
        for (var field in content) {
            fields.push(['<div><strong>', field, ': </strong>', content[field], '</div>'].join(' '));
        }
        if (fields.length == 0)
            fields.push('<em>No data available</em>');
        return '<div>' + fields.join(' ') + '</div>';
    }
    /**
     * @param {?} err
     * @param {?} latlng
     * @param {?} content
     * @return {?}
     */
    showGetFeatureInfo(err, latlng, content) {
        if (err) {
            console.log(err);
            return;
        } // do nothing if there's an error
        // Otherwise show the content in a popup, or something.
        popup({ maxWidth: 800 })
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
    }
}
/**
 * @param {?} layer
 * @return {?}
 */
function wms(layer) {
    /** @type {?} */
    let service = layer["services"] && layer["services"].length ?
        layer["services"][0] : null;
    if (!service) {
        throw new Error("Cannot create leaflet layer for WMS Layer '" +
            (layer.label || layer.id) +
            "' because layer has no service associated with it");
    }
    /** @type {?} */
    let url = service.href;
    if (!url) {
        throw new Error("WMS layer's service does not defined a service url");
    }
    /** @type {?} */
    let formats = layer.supportedFormats || [];
    /** @type {?} */
    let format = formats.length ? formats[0] : "image/png";
    /** @type {?} */
    let supportedCrs = layer["crs"] || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    /** @type {?} */
    let version = '1.1.1';
    /** @type {?} */
    let versions = service.serviceTypeVersions || [];
    if (versions.length && versions.indexOf('1.1.1') < 0) {
        version = versions[0];
    }
    else {
        console.log("Warning: WMS Service doesn't list supported versions, assuming 1.1.1");
    }
    /** @type {?} */
    let opts = {
        layers: layer.layerName,
        transparent: true,
        format: format,
        wmvId: layer.id,
        version: version
    };
    if (Config["leafletPane"]) {
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    }
    return new WMS(url, opts);
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.TileLayer.WMS = WMS;
    L$$1.tileLayer.wms = wms;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class WMST extends TimeDimension.Layer.WMS {
    /**
     * @param {?} layer
     * @param {?=} opts
     */
    constructor(layer, opts) {
        super(layer, opts);
    }
    /**
     * @param {?} xml
     * @return {?}
     */
    _parseTimeDimensionFromCapabilities(xml) {
        /** @type {?} */
        var layers = xml.querySelectorAll('Layer');
        /** @type {?} */
        var layerName = this._baseLayer.wmsParams.layers;
        /** @type {?} */
        var layer = null;
        /** @type {?} */
        var times = null;
        layers.forEach(function (current) {
            if (current.querySelector("Name").innerHTML === layerName) {
                layer = current;
            }
        });
        if (layer) {
            times = this._getTimesFromLayerCapabilities(layer);
            if (!times) {
                times = this._getTimesFromLayerCapabilities(layer.parentNode);
            }
        }
        return times;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    _getTimesFromLayerCapabilities(layer) {
        /** @type {?} */
        var times = null;
        /** @type {?} */
        var dimensions = layer.querySelectorAll("Dimension[name='time']");
        if (dimensions && dimensions.length && dimensions[0].textContent.length) {
            times = dimensions[0].textContent.trim();
        }
        if (!times || !times.length) {
            /** @type {?} */
            var extents = layer.querySelectorAll("Extent[name='time']");
            if (extents && extents.length && extents[0].textContent.length) {
                times = extents[0].textContent.trim();
            }
        }
        if (times && ~times.indexOf("current")) {
            times = times.replace('current', new Date().toISOString());
        }
        return times;
    }
}
/**
 * @param {?} gpLayer
 * @return {?}
 */
function wmst(gpLayer) {
    /** @type {?} */
    let service = gpLayer.services[0];
    /** @type {?} */
    let url = service.href;
    if (!url) {
        throw new Error("WMST Layer's service does not defined a service url");
    }
    /** @type {?} */
    let opts = {
        layers: gpLayer.layerName,
        transparent: true,
        format: "image/png",
        wmvId: gpLayer.layerId
    };
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    /** @type {?} */
    let leafletLayer = new WMS(url, opts);
    /** @type {?} */
    let proxyUrl = Config["ualUrl"] + '/api/services/' +
        service.id + '/proxy/capabilities';
    /** @type {?} */
    let tdOpts = { times: null };
    if (gpLayer.temporal) {
        /** @type {?} */
        let d1 = gpLayer.temporal.startDate ?
            new Date(gpLayer.temporal.startDate) : new Date();
        /** @type {?} */
        let d2 = gpLayer.temporal.endDate ?
            new Date(gpLayer.temporal.endDate) : new Date();
        tdOpts.times = d1.toISOString() + '/' + d2.toISOString() + '/P1D';
    }
    return new WMST(leafletLayer, {
        timeDimension: new TimeDimension(tdOpts),
        proxy: proxyUrl
    });
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.TileLayer.WMST = WMST;
    L$$1.tileLayer.wmst = wmst;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const paramRe = /\{ *([\w_-]+) *\}/g;
/**
 * @param {?} str
 * @param {?} data
 * @return {?}
 */
function template(str, data) {
    return str.replace(paramRe, function (str, key) {
        /** @type {?} */
        var value = data[key];
        if (value === undefined) {
            value = data[key.toLowerCase()];
        }
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        }
        else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    });
}
class WMTS extends TileLayer {
    /**
     * @param {?} url
     * @param {?=} options
     */
    constructor(url, options) {
        super(url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    initialize(url, options) {
        // (String, Object)
        this._url = url;
        this.defaultWmtsParams = {
            service: 'WMTS',
            request: 'GetTile',
            version: '1.0.0',
            layers: '',
            styles: '',
            tileMatrixSet: '',
            format: 'image/png'
        };
        /** @type {?} */
        var wmtsParams = Util.extend({}, this.defaultWmtsParams);
        /** @type {?} */
        var tileSize = options.tileSize || this.options.tileSize;
        if (options.detectRetina && Browser.retina) {
            wmtsParams.width = wmtsParams.height = tileSize * 2;
        }
        else {
            wmtsParams.width = wmtsParams.height = tileSize;
        }
        for (var i in options) {
            // all keys that are not TileLayer options go to WMTS params
            if (!this.options.hasOwnProperty(i) && i != "matrixIds") {
                wmtsParams[i] = options[i];
            }
        }
        this.wmtsParams = wmtsParams;
        this.matrixIds = options.matrixIds || this.getDefaultMatrix();
        Util.setOptions(this, options);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
        return super.onAdd(map);
    }
    /**
     * @param {?} coords
     * @return {?}
     */
    getTileUrl(coords) {
        /** @type {?} */
        var tileSize = /** @type {?} */ (this.options.tileSize);
        /** @type {?} */
        var nwPoint = coords.multiplyBy(tileSize);
        nwPoint.x += 1;
        nwPoint.y -= 1;
        /** @type {?} */
        var sePoint = nwPoint.add(new Point(tileSize, tileSize));
        /** @type {?} */
        var zoom = this._tileZoom;
        /** @type {?} */
        var nw = this._crs.project(this._map.unproject(nwPoint, zoom));
        /** @type {?} */
        var se = this._crs.project(this._map.unproject(sePoint, zoom));
        /** @type {?} */
        var tilewidth = se.x - nw.x;
        /** @type {?} */
        var ident = this.matrixIds[zoom].identifier;
        /** @type {?} */
        var tileMatrix = this.wmtsParams.tileMatrixSet + ":" + ident;
        /** @type {?} */
        var X0 = this.matrixIds[zoom].topLeftCorner.lng;
        /** @type {?} */
        var Y0 = this.matrixIds[zoom].topLeftCorner.lat;
        /** @type {?} */
        var tilecol = Math.floor((nw.x - X0) / tilewidth);
        /** @type {?} */
        var tilerow = -Math.floor((nw.y - Y0) / tilewidth);
        /** @type {?} */
        let url = this._url;
        /** @type {?} */
        let isTileMatrixTemplated = url.indexOf('{TileMatrix}');
        /** @type {?} */
        let isTileRowTemplated = url.indexOf('{TileRow}');
        /** @type {?} */
        let isTileColTemplated = url.indexOf('{TileCol}');
        /** @type {?} */
        let o = Object.assign({ s: this._getSubdomain(coords) }, this.wmtsParams);
        if (isTileMatrixTemplated > 0)
            o.TileMatrix = ident;
        if (isTileRowTemplated > 0)
            o.TileRow = tilerow;
        if (isTileColTemplated > 0)
            o.TileCol = tilecol;
        for (let k in o) {
            o[k.toLowerCase()] = o[k];
        }
        // url = Util.template(url.toLowerCase(), o);
        url = template(url, o);
        /** @type {?} */
        let qsi = url.indexOf("?");
        if (qsi < 0 || (isTileMatrixTemplated < qsi && isTileRowTemplated < qsi || isTileColTemplated < qsi)) ;
        else {
            url = url + Util.getParamString(this.wmtsParams, url);
            if (isTileMatrixTemplated < 0)
                url += "&TileMatrix=" + ident; //tileMatrixSet
            if (isTileRowTemplated < 0)
                url += "&TileRow=" + tilerow;
            if (isTileColTemplated < 0)
                url += "&TileCol=" + tilecol;
        }
        return url;
    }
    /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    setParams(params, noRedraw) {
        Util.extend(this.wmtsParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }
    /**
     * @return {?}
     */
    getDefaultMatrix() {
        /** *
         * the matrix3857 represents the projection
         * for in the IGN WMTS for the google coordinates.
          @type {?} */
        var matrixIds3857 = new Array(22);
        for (var i = 0; i < 22; i++) {
            matrixIds3857[i] = {
                identifier: "" + i,
                topLeftCorner: new LatLng(20037508.3428, -20037508.3428)
            };
        }
        return matrixIds3857;
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    _getSubdomain(tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
}
/**
 * @param {?} layer
 * @return {?}
 */
function wmts(layer) {
    /** @type {?} */
    let url = layer.services && layer.services.length ? layer.services[0].href : null;
    /** @type {?} */
    let supportedCrs = layer.crs || [];
    if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
        console.log("Layer '" + layer.label + "' does not support " +
            "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
    }
    /** @type {?} */
    let options = {
        layer: layer.layerName,
        style: 'default',
        tileMatrixSet: "default",
        format: "image/png"
    };
    if (Config["leafletPane"])
        (/** @type {?} */ (options)).pane = Config["leafletPane"];
    /** @type {?} */
    let distro = (layer.distributions || []).find(dist => {
        //ensure dist isn't 'null'
        return dist && dist.href && (dist.mediaType === 'image/png' || dist.mediaType === 'image/jpeg');
    });
    if (distro) {
        url = distro.href;
        options.format = distro.mediaType;
        /** @type {?} */
        let params = distro.parameters || [];
        params.forEach(param => {
            /** @type {?} */
            let plc = param.name.toLowerCase();
            if ("tilematrix" === plc || "tilerow" === plc || "tilecol" === plc)
                return;
            /** @type {?} */
            let value = param.defaultValue || param.values && param.values.length && param.values[0];
            if (value !== null && value !== undefined) {
                url = url.replace('{' + param.name + '}', value);
            }
        });
    }
    else {
        throw new Error("WTMS Layer - layer " + layer.id +
            " has no distribution(s) usable to make WMTS requests");
    }
    if (!url)
        throw new Error("Unable to determine WMTS URL for layer " + layer.id +
            ". Please make sure it is defined by either the service or a distribution on the layer itself.");
    return new WMTS(url, options);
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.TileLayer.WMTS = WMTS;
    L$$1.tileLayer.wmts = wmts;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class EsriTileLayer extends TileLayer {
    /**
     * @param {?} url
     * @param {?} options
     */
    constructor(url, options) {
        super(url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    initialize(url, options) {
        // (String, Object)
        if (!url)
            throw new Error("Layer was not configured with a URL");
        this.defaultESRIParams = {
            layers: '',
            //=show:0,1,2
            transparent: true,
            format: 'png32',
            f: 'image'
        };
        if (url.indexOf("/export") < 0) {
            /** @type {?} */
            let qidx = url.indexOf("?");
            if (qidx > 0) {
                url = url.substring(0, qidx) + '/export' + url.substring(qidx);
            }
            else {
                url += '/export';
            }
        }
        this._url = url;
        /** @type {?} */
        let esriParams = Util.extend({}, this.defaultESRIParams);
        /** @type {?} */
        let tileSize = options.tileSize || this.options.tileSize;
        /** @type {?} */
        let dim;
        if (options.detectRetina && Browser.retina) {
            dim = esriParams.height = tileSize * 2;
        }
        else {
            dim = esriParams.height = tileSize;
        }
        esriParams.size = dim + ',' + dim;
        for (var i in options) {
            // all keys that are not TileLayer options go to WMS params
            if (!this.options.hasOwnProperty(i) && i !== 'crs') {
                esriParams[i] = options[i];
            }
        }
        //layer ids
        // esriParams.layers = "show:" + esriParams.layers;
        this.esriParams = esriParams;
        Util.setOptions(this, options);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    onAdd(map) {
        this._crs = (/** @type {?} */ (this.options)).crs || (/** @type {?} */ (map.options)).crs;
        this.esriParams.srs = this.esriParams.imagesr = this.esriParams.bboxsr = this._crs.code;
        return super.onAdd(map);
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    getTileUrl(tilePoint) {
        /** @type {?} */
        let map = this._map;
        /** @type {?} */
        let tileSize = /** @type {?} */ (this.options.tileSize);
        /** @type {?} */
        let nwPoint = tilePoint.multiplyBy(tileSize);
        /** @type {?} */
        let sePoint = nwPoint.add([tileSize, tileSize]);
        /** @type {?} */
        let nw = this._crs.project(map.unproject(nwPoint, tilePoint.z));
        /** @type {?} */
        let se = this._crs.project(map.unproject(sePoint, tilePoint.z));
        /** @type {?} */
        let bbox = [nw.x, se.y, se.x, nw.y].join(',');
        /** @type {?} */
        let url = Util.template(this._url, { s: this._getSubdomain(tilePoint) });
        /** @type {?} */
        let params = Util.extend({}, this.esriParams);
        params.layers = "show:" + params.layers;
        //convert to esri-special SR for spherical mercator
        if (params.bboxsr === 'EPSG:3857')
            params.bboxsr = '102100';
        if (params.imagesr === 'EPSG:3857')
            params.imagesr = '102100';
        return url + Util.getParamString(params, url, true) + '&BBOX=' + bbox;
    }
    /**
     * @param {?} params
     * @param {?} noRedraw
     * @return {?}
     */
    setParams(params, noRedraw) {
        Util.extend(this.esriParams, params);
        if (!noRedraw) {
            this.redraw();
        }
        return this;
    }
    /**
     * @param {?} tilePoint
     * @return {?}
     */
    _getSubdomain(tilePoint) {
        /** @type {?} */
        var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
        return this.options.subdomains[index];
    }
}
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    const L$$1 = (/** @type {?} */ (window)).L;
    L$$1.TileLayer.ESRI = EsriTileLayer;
    L$$1.tileLayer.esri = function (url, options) {
        return new L$$1.TileLayer.ESRI(url, options);
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function OSMLayerFactory() {
    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * Extend base Leaflet layer class to ensure there's always a function
 * available for modifying zindex and opacity, even if nothing actually
 * happens inside.
 */
Layer.include({
    // Redefining a method
    setZIndex: function (value) {
        //do nothing in this abstract class, let impls do the work
    },
    setOpacity: function (value) {
        //do nothing in this abstract class, let impls do the work
    }
});
/**
 * Fetches style information from GeoPlatform UAL
 * @param {?=} service
 * @return {?}
 */
function styleResolverFactory(service) {
    if (!service || typeof (service.style) !== 'function') {
        throw new Error("Must provide a LayerService instance");
    }
    return function featureStyleResolver(id) {
        return service.style(id).catch(e => {
            /** @type {?} */
            let msg = `Error loading style information for layer ${id} : ${e.message}`;
            return reject(new Error(msg));
        });
    };
}
/**
 * Layer Factory
 *
 * Used to instantiate GeoPlatform Layer objects as Leaflet layer instances
 * capable of being rendered on Leaflet maps.
 *
 * Usage:
 *      let leafletLayer = LayerFactory.create(gpLayerObj);
 *
 *
 * Basic layer support is built in, but additional layer types can be supported
 * by registering new factory methods.
 *
 * Example:
 *      LayerFactory.register( (gpLayerObj) => {
 *          let isSupported = false;
 *          //implement test to verify supported layer type
 *          // ...
 *          if(isSupported) {
 *              return new MyCustomLayerClass(gpLayerObj);
 *          }
 *          return null;
 *      });
 *
 */
class LayerFactory {
    constructor() {
        this.factories = []; // A list of configured factory functors to instantiate layers
        this.init();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    register(fn) {
        if (typeof (fn) === 'function') {
            this.factories.push(fn);
        }
    }
    /**
     * @param {?} service
     * @return {?}
     */
    setLayerService(service) {
        this.service = service;
    }
    /**
     *
     * @return {?}
     */
    getStyleResolver() {
        if (!this.service || typeof (this.service.style) === 'undefined') {
            this.service = new LayerService(Config["ualUrl"], new XHRHttpClient());
        }
        return styleResolverFactory(this.service);
    }
    /**
     * @param {?} layer - GP Layer object
     * @return {?} leaflet layer instance or null
     */
    create(layer) {
        if (!layer) {
            throw new Error("LayerFactory expects a layer object");
        }
        for (let i = 0; i < this.factories.length; ++i) {
            /** @type {?} */
            let fn = this.factories[i];
            /** @type {?} */
            let result = fn && typeof (fn) === 'function' && fn(layer);
            if (result)
                return result;
        }
        return null;
    }
    /**
     * @return {?}
     */
    init() {
        //OSM factory
        this.register((layer) => {
            if (layer && layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf(LayerResourceTypes.OSM)) {
                return OSMLayerFactory();
            }
        });
        // ESRI factory
        this.register((layer) => {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
            /** @type {?} */
            let url = service.href;
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
            /** @type {?} */
            let 
            // srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format = layer.supportedFormats ? layer.supportedFormats[0] : null;
            /** @type {?} */
            let opts;
            /**
             * @param {?} url
             * @return {?}
             */
            function checkUrl(url) {
                if (!url)
                    throw new Error("Layer's service does not define a service url");
            }
            if (types.ESRI_MAP_SERVER &&
                types.ESRI_MAP_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = /** @type {?} */ ({
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                });
                /** @type {?} */
                let supportedCrs = layer["crs"] || [];
                if (supportedCrs && supportedCrs.length > 0 && ~supportedCrs.indexOf("ESPG:3857")) {
                    console.log("Layer '" + layer.label + "' does not support " +
                        "EPSG:3857 Spherical Mercator projection and may not render appropriately or at all.");
                }
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return new EsriTileLayer(url, opts);
            }
            else if (types.ESRI_FEATURE_SERVER &&
                types.ESRI_FEATURE_SERVER.uri === typeUri) {
                checkUrl(url);
                return clusteredFeatures(layer, {
                    styleResolver: this.getStyleResolver()
                });
            }
            else if (types.ESRI_TILE_SERVER &&
                types.ESRI_TILE_SERVER.uri === typeUri) {
                checkUrl(url);
                opts = { url: url, useCors: true };
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return tiledMapLayer(opts);
            }
            else if (types.ESRI_IMAGE_SERVER &&
                types.ESRI_IMAGE_SERVER.uri === typeUri) {
                opts = { url: url, useCors: true };
                if (Config["leafletPane"])
                    opts.pane = Config["leafletPane"];
                return imageMapLayer(opts);
            }
            return null;
        });
        // OGC factory
        this.register((layer) => {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
            if (types.WMS && types.WMS.uri === typeUri) {
                return wms(layer);
            }
            else if (types.WMST && types.WMST.uri === typeUri) {
                return wmst(layer);
            }
            else if (types.WMTS && types.WMTS.uri === typeUri) {
                return wmts(layer);
            }
            return null;
        });
        this.register((layer) => {
            if (!layer || !layer["services"] || !layer["services"].length)
                return null;
            /** @type {?} */
            let service = layer["services"][0];
            /** @type {?} */
            let svcType = service.serviceType;
            /** @type {?} */
            let typeUri = svcType ? svcType.uri : null;
            if (types.FEED && types.FEED.uri === typeUri) {
                return geoJsonFeed(layer, {
                    styleResolver: this.getStyleResolver()
                });
            }
            return null;
        });
        this.register((layer) => {
            if (!layer)
                return null;
            /** @type {?} */
            let resourceTypes = layer.resourceTypes || [];
            if (resourceTypes.indexOf(LayerResourceTypes.MapBoxVectorTile) < 0) { //not tagged as VT layer
                //not tagged as VT layer
                return null;
            }
            /** @type {?} */
            let href = layer.href;
            if (!href || href.indexOf(".pbf") < 0) {
                console.log("LayerFactory - Layer does not define an Access URL");
                return null; //missing URL
            }
            /** @type {?} */
            const Leaflet = /** @type {?} */ (L);
            //if Leaflet vector grid plugin is not installed, can't render VT Layers
            if (typeof (Leaflet.vectorGrid) === 'undefined' &&
                typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
                console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
                return null;
            }
            /** @type {?} */
            var opts = {
                rendererFactory: (/** @type {?} */ (canvas)).tile
            };
            if (Config["leafletPane"])
                opts.pane = Config["leafletPane"];
            return Leaflet.vectorGrid.protobuf(href, opts);
        });
    }
}
var LayerFactory$1 = new LayerFactory();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const jQuery$3 = jquery;
/** @type {?} */
var EsriFeatureLayer = FeatureLayer;
const ɵ0$7 = function (feature, latlng) {
    /** @type {?} */
    var style = feature && feature.properties ? feature.properties.style : null;
    if (!style && typeof this.options.style === 'function') {
        // console.log("Using local style function");
        try {
            style = this.options.style(feature);
        }
        catch (e) {
            console.log("error using style function in ClusteredFeatureLayer: " + e.message);
        }
    }
    style = style || this.options.style || {};
    /** @type {?} */
    let marker$$1 = null;
    if (style.shape === 'image') {
        /** @type {?} */
        let width = style.width || 16;
        /** @type {?} */
        let height = style.height || 16;
        /** @type {?} */
        var icon$$1 = icon({
            iconUrl: style.content,
            //base64 encoded string
            iconSize: [width, height],
            iconAnchor: [width * 0.5, height * 0.5],
            popupAnchor: [0, -11],
        });
        /** @type {?} */
        let mopts = { icon: icon$$1 };
        if (Config["leafletPane"])
            (/** @type {?} */ (mopts)).pane = Config["leafletPane"];
        marker$$1 = marker(latlng, mopts);
    }
    else {
        style.radius = style.radius || style['stroke-width'] || 4;
        style.weight = style.weight || style['stroke-width'] || 2;
        style.color = style.color || style.stroke || '#03f';
        style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
        style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
        style.fillColor = style.color || style.fill;
        style.renderer = this.options.renderer; //important for pane!
        marker$$1 = circleMarker(latlng, style);
    }
    /** @type {?} */
    let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
    marker$$1.bindPopup(popupTemplate(feature));
    return marker$$1;
}, ɵ1$6 = function (feature, layer) {
    if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
        return;
    }
    layer.bindPopup(featurePopupTemplate(feature));
}, ɵ2$5 = function (options) {
    options = options || {};
    if (Config["leafletPane"])
        options.pane = Config["leafletPane"];
    /** @type {?} */
    let getGPStyle = () => { return this._gpStyle; };
    options.style = options.style || getGPStyle();
    /** @type {?} */
    let svgOpts = {};
    if (Config["leafletPane"])
        (/** @type {?} */ (svgOpts)).pane = Config["leafletPane"];
    /** @type {?} */
    var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
    options.renderer = renderer;
    options.pointToLayer = Util.bind(this.pointToLayerFn, this);
    options.onEachFeature = Util.bind(this.eachFeatureFn, this);
    // options.fields = ['FID', 'type', 'title', 'geometry'];
    FeatureLayer$2.prototype.initialize.call(this, options);
    this.on('load', function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    });
}, ɵ3$4 = function (index) {
    this.options.zIndex = index;
    for (var id in this._layers)
        this._layers[id].setZIndex(index);
}, ɵ4$4 = function () {
    for (var id in this._layers) {
        /** @type {?} */
        let layer = this._layers[id];
        if (layer.toggleVisibility)
            this._layers[id].toggleVisibility();
    }
}, ɵ5$4 = function (opacity) {
    for (var id in this._layers) {
        /** @type {?} */
        let layer = this._layers[id];
        if (layer.setOpacity)
            layer.setOpacity(opacity);
    }
}, ɵ6$4 = function (gpLayerId) {
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId)
            .then(json => {
            if (!json)
                return;
            /** @type {?} */
            let style = null;
            if (json && json.styles) {
                /** @type {?} */
                let featureFn = function (feature) {
                    /** @type {?} */
                    let property = this.property || this.field1;
                    /** @type {?} */
                    let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                    /** @type {?} */
                    let style = null;
                    if (this.styles) {
                        /** @type {?} */
                        let wrapper = this.styles.find(sw => sw.value === v);
                        if (wrapper) {
                            style = wrapper.style;
                            style.radius = style.radius || style['stroke-width'] || 4;
                            style.weight = style.weight || style['stroke-width'] || 2;
                            style.color = style.color || style.stroke || '#03f';
                            style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                            style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                            style.fillColor = style.color || style.fill;
                        }
                    }
                    // console.log("Using style: " + JSON.stringify(style));
                    return style;
                };
                /** @type {?} */
                let styleFn = () => { return featureFn(json); };
                this.options.style = styleFn;
                this.setStyle(styleFn);
                return;
            }
            else if (json && typeof (json.push) !== 'undefined') {
                //multiple styles returned
                style = json[0]; //use first for now
            }
            else if (json) {
                style = json;
            }
            else {
                return; //unrecognizable style
            }
            if (style.shape) {
                /** @type {?} */
                var obj = jQuery$3.extend({}, style);
                obj.style = style;
                this._gpStyle = style;
                //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                // non-clustered features.
                // this.setStyle(obj);
                //So instead, we manually set it on all features of the layer (that aren't clustered)
                for (let id in this._layers)
                    this._layers[id].setStyle(obj);
            }
        })
            .catch(e => {
            console.log("Error fetching feature layer style");
            console.log(e);
        });
    }
};
/** *
 * Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
  @type {?} */
var FeatureLayer$2 = EsriFeatureLayer.extend({
    _gpStyle: { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },
    /**
         * @param {object} feature - GeoJSON Point Feature
         * @param {L.LatLng} latlng
         * @return {L.Marker}
         */
    pointToLayerFn: ɵ0$7,
    /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
    eachFeatureFn: ɵ1$6,
    initialize: ɵ2$5,
    setZIndex: ɵ3$4,
    toggleVisibility: ɵ4$4,
    setOpacity: ɵ5$4,
    loadStyle: ɵ6$4
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
const jQuery$4 = jquery;
class Listener {
    constructor() {
        //listeners to be unregistered upon destroy
        this._listeners = {};
    }
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    on(type, listener) {
        if (!this._listeners[type])
            this._listeners[type] = [];
        this._listeners[type].push(listener);
    }
    /**
     * @param {?} type
     * @param {?} listener
     * @return {?}
     */
    off(type, listener) {
        if (!type)
            this._listeners = {};
        if (!this._listeners[type])
            return;
        if (!listener)
            this._listeners[type] = [];
        else {
            /** @type {?} */
            var idx = this._listeners[type].indexOf(listener);
            if (idx >= 0)
                this._listeners[type].splice(idx, 1);
        }
    }
    /**
     * @param {?} type
     * @param {...?} options
     * @return {?}
     */
    notify(type, ...options) {
        if (!this._listeners[type])
            return;
        /** @type {?} */
        var args = Array.prototype.slice.call(arguments, 1);
        this._listeners[type].forEach(function (l) { l.apply(null, args); });
    }
}
class MapInstance extends Listener {
    /**
     * @param {?} key
     */
    constructor(key) {
        super();
        this.setHttpClient(new XHRHttpClient());
        this.setServiceFactory(ServiceFactory);
        //generate random key (see factory below)
        this._key = key || Math.ceil(Math.random() * 9999);
        //registry id of current map if available
        this._mapId = null,
            //definition of map (ie, from server)
            this._mapDef = this.initializeMapDefinition(),
            //primary map instance (ie, leaflet)
            this._mapInstance = null,
            //default map extent (if map doesn't have one for being saved)
            this._defaultExtent = null,
            //current base layer object and leaflet instance
            this._baseLayerDef = null,
            this._baseLayer = null,
            //set definitions of layer states (including layer info) on map
            this._layerStates = [],
            //map layer def ids with leaflet instances
            this._layerCache = {},
            //errors generated by layers loading
            this._layerErrors = [],
            this._layerErrorHandler = function (e) {
                console.log(`MapInstance.defaultLayerErrorHandler() - ${e.id} : ${e.message}`);
            },
            //layer used to store features on map
            this._featureLayer = null,
            this._featureLayerVisible = true,
            //set of registered map tools
            this._tools = [],
            //state management
            this.state = { dirty: false }; // jshint ignore:line
        this._geoJsonLayerOpts = {
            style: function (feature) {
                if (feature.properties.style)
                    return feature.properties.style;
            },
            onEachFeature: function (feature, layer) {
                /** @type {?} */
                var style = { weight: 2, color: '#03f', opacity: 0.9, radius: 4, fillColor: '#03f', fillOpacity: 0.5 };
                if (~feature.geometry.type.indexOf('Point')) {
                    style.fillOpacity = 0.9;
                }
                /** @type {?} */
                var props = feature.properties = feature.properties || {};
                if (feature.properties.id === undefined || feature.properties.id === null)
                    feature.properties.id = Math.floor(Math.random() * 999999);
                feature.properties.label = props.label || props.title || props.name || "Untitled " + feature.geometry.type + " Feature";
                feature.properties.description = props.description || props.desc || "This feature needs a description!";
                feature.properties.style = props.style || style;
                layer.bindTooltip(props.label);
                /*
                                toggle: setLabelNoHide(bool)
                                it may only exist on markers!
                                */
            },
            pointToLayer: function (feature, latlng) {
                /** @type {?} */
                var style = feature.properties.style || {};
                style.radius = style.radius || 4;
                style.weight = style.weight || 2;
                style.color = style.color || '#03f';
                style.opacity = style.opacity || 0.9;
                style.fillOpacity = style.opacity;
                style.fillColor = style.color;
                return circleMarker(latlng, style);
            }
        };
    }
    /**
     * @return {?}
     */
    dispose() {
        this.destroyMap();
        this.svcCache = null;
        this.serviceFactory = null;
        this.httpClient = null;
        this._key = null;
        this._mapId = null;
        this._mapDef = null;
        this._mapInstance = null;
        this._defaultExtent = null;
        this._baseLayerDef = null;
        this._baseLayer = null;
        this._layerStates = null;
        this._layerCache = null;
        this._layerErrors = null;
        this._featureLayer = null;
        this._featureLayerVisible = true;
        this._tools = null;
        this.state = null;
        this._geoJsonLayerOpts = null;
    }
    /**
     * @return {?}
     */
    getKey() {
        return this._key;
    }
    /**
     * Override default (JQuery-based) map service used by this instance
     * @deprecated use setServiceFactory instead
     * @param {?} mapService - service to use to CRUD map objects
     * @return {?}
     */
    setService(mapService) {
        // this.mapService = mapService;
    }
    /**
     * @param {?} factory - GeoPlatform ServiceFactory to instantiate services for maps and layers
     * @return {?}
     */
    setServiceFactory(factory) {
        this.svcCache = {}; //wipe out cached services
        this.serviceFactory = factory;
    }
    /**
     * @param {?} httpClient - HttpClient impl to use with the new factory
     * @return {?}
     */
    setHttpClient(httpClient) {
        this.svcCache = {}; //wipe out cached services
        this.httpClient = httpClient;
    }
    /**
     * @param {?} type - GeoPlatform Object model type to support ("Map", "Layer", etc)
     * @return {?} item service implementation for the requested type
     */
    getService(type) {
        if (!this.svcCache[type])
            this.svcCache[type] = this.serviceFactory(type, Config["ualUrl"], this.httpClient);
        return this.svcCache[type];
    }
    /**
     * @param {?} fn - callback when an error is encountered
     * @return {?}
     */
    setErrorHandler(fn) {
        this._layerErrorHandler = fn;
    }
    /**
     * @param {?} layerId
     * @return {?}
     */
    getLayerStateIndex(layerId) {
        if (!layerId)
            return -1;
        for (let i = 0; i < this._layerStates.length; ++i) {
            if (this._layerStates[i].layer && layerId === this._layerStates[i].layer.id) {
                return i;
            }
        }
        return -1;
        // return this._layerStates.indexOfObj(layerId, (id, state) => state.layer.id === id );
    }
    /**
     * @param {?} layerId
     * @return {?}
     */
    getLayerState(layerId) {
        /** @type {?} */
        let index = this.getLayerStateIndex(layerId);
        return index >= 0 ? this._layerStates[index] : null;
    }
    /**
     * @return {?}
     */
    initializeMapDefinition() {
        return {
            type: ItemTypes.MAP,
            title: "My New Map",
            label: "My New Map",
            description: "This map needs a description",
            createdBy: null,
            baseLayer: this._baseLayerDef,
            layers: [],
            keywords: [],
            themes: [],
            resourceTypes: ['http://www.geoplatform.gov/ont/openmap/GeoplatformMap']
        };
    }
    /**
     * @param {?=} metadata object
     * @return {?} object definition of the current map suitable for sending to WMVR
     */
    getMapResourceContent(metadata) {
        metadata = metadata || {};
        //map layers
        metadata.layers = this._layerStates.map(state => {
            /** @type {?} */
            let result = {
                visibility: state.visibility || true,
                opacity: isNaN(state.opacity) ? 1.0 : state.opacity * 1,
                layer: {
                    id: state.layer.id,
                    uri: state.layer.uri,
                    label: state.layer.label
                }
            };
            return result;
        });
        // ... UAL should support accepting just an id here, so we'll do just that
        metadata.baseLayer = {
            id: this._baseLayerDef.id,
            uri: this._baseLayerDef.uri,
            label: this._baseLayerDef.label
        };
        metadata.annotations = this._featureLayer ?
            { title: "Map Features", geoJSON: this._featureLayer.toGeoJSON() } : null;
        /** @type {?} */
        let extent = this._mapInstance.getBounds();
        metadata.extent = {
            minx: extent.getWest(),
            miny: extent.getSouth(),
            maxx: extent.getEast(),
            maxy: extent.getNorth()
        };
        return metadata;
    }
    /**
     * @return {?} Leaflet toolbar
     */
    getDrawControlToolbar() {
        if (!(/** @type {?} */ (this._mapInstance)).drawControl)
            return null;
        /** @type {?} */
        var toolbars = (/** @type {?} */ (this._mapInstance)).drawControl._toolbars;
        /** @type {?} */
        var toolbar = null;
        for (var key in toolbars) {
            if (toolbars.hasOwnProperty(key)) {
                if (toolbars[key]._modes) {
                    toolbar = toolbars[key];
                    break;
                }
            }
        }
        return toolbar;
    }
    /**
     * @param {?} error Leaflet tile load error (.target is layer, .tile is image)
     * @return {?}
     */
    handleLayerError(error) {
        // console.log("MapInstance.handleLayerError() - " +
        //     "Layer's tile failed to load: " + error.tile.src);
        if (!this._layerCache) {
            console.log("Unable to find layer in layer cache. Layer error is " + error);
            return;
        }
        /** @type {?} */
        var layer = error.target;
        for (var id in this._layerCache) {
            if (this._layerCache[id] === layer) {
                this.processLayerError(error, id);
                break;
            }
        }
    }
    /**
     * Given a Leaflet tile load error and the responsible layer id,
     * Try to isolate the cause of the error using the proxy
     * and notify listeners that an error has occurred
     * @param {?} error
     * @param {?} id
     * @return {?}
     */
    processLayerError(error, id) {
        /** @type {?} */
        var finder = (l) => { return l.id === id || (l.layer && l.layer.id === id); };
        if (!this._layerErrors.find(finder)) {
            /** @type {?} */
            let obj = this.logLayerError(id, "Layer ('" + id + "') failed to completely load. " +
                "It may be inaccessible or misconfigured.");
            /** @type {?} */
            var url = (/** @type {?} */ (error)).tile.src;
            /** @type {?} */
            var params = { id: id };
            url.substring(url.indexOf("?") + 1, url.length).split('&').forEach(function (param) {
                /** @type {?} */
                var p = param.split('=');
                params[p[0]] = p[1];
            });
            /** @type {?} */
            let layerService = /** @type {?} */ (this.getService(ItemTypes.LAYER));
            if (layerService) {
                layerService.validate(id, params)
                    .catch(e => {
                    /** @type {?} */
                    var def = this._layerStates.find(finder);
                    if (def) {
                        obj.message = "Layer '" + def.layer.label + "' failed to completely load. " +
                            "Reported cause: " + e.message;
                    }
                    this.notify('layer:error', obj);
                });
            }
        }
    }
    /**
     * @param {?} layerId - identifier of layer generating the error
     * @param {?} errorMsg - message of the error
     * @return {?}
     */
    logLayerError(layerId, errorMsg) {
        /** @type {?} */
        let err = { id: layerId, message: errorMsg };
        this._layerErrors.push(err);
        if (this._layerErrorHandler) {
            this._layerErrorHandler(err);
        }
        return err;
    }
    /**
     * @param {?=} event
     * @param {...?} options
     * @return {?}
     */
    touch(event, ...options) {
        this.state.dirty = true;
        if (event) {
            if (arguments.length > 1) {
                this.notify.apply(this, Array.prototype.slice.call(arguments));
            }
            else
                this.notify(event);
            // console.log("Dirtying map for " + event);
        }
        // else console.log("Dirtying map");
    }
    /**
     * @return {?}
     */
    clean() {
        // console.log("Cleaning map");
        this.state.dirty = false;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map) { this._mapInstance = map; }
    /**
     * @return {?} map instance
     */
    getMap() { return this._mapInstance; }
    /**
     * @return {?} definition of map
     */
    getMapDefinition() { return this._mapDef; }
    /**
     * @return {?} identifier of map
     */
    getMapId() { return this._mapId; }
    /**
     * Focuses the map on the specified lat/lng coordinate
     * @param {?} lat number
     * @param {?} lng number
     * @param {?=} zoom number (optional)
     * @return {?}
     */
    setView(lat, lng, zoom) {
        /** @type {?} */
        let z = zoom;
        if (typeof (z) === 'undefined')
            z = this._mapInstance.getZoom();
        this._mapInstance.setView([lat, lng], z);
        this.touch('map:view:changed');
    }
    /**
     * Retrieve the current center of the map
     * @return {?} [lat,lng]
     */
    getView() {
        /** @type {?} */
        var latLng = this._mapInstance.getCenter();
        return [latLng.lat, latLng.lng];
    }
    /**
     * @return {?} integer current zoom level of the map
     */
    getZoom() {
        return this._mapInstance.getZoom();
    }
    /**
     * Zoom to the map's default extent
     * If the map is saved, this will be the saved viewport
     * otherwise, it will be CONUS
     * @return {?}
     */
    zoomToDefault() {
        if (!this._mapInstance)
            return;
        if (this._defaultExtent) {
            this._mapInstance.fitBounds([
                [this._defaultExtent.miny, this._defaultExtent.minx],
                [this._defaultExtent.maxy, this._defaultExtent.maxx]
            ]);
        }
        else {
            console.log("MapInstance.zoomToDefault() - No default extent specified");
            this._mapInstance.setView([38, -96], 5);
        }
        try {
            this.touch('map:view:changed');
        }
        catch (e) { }
    }
    /**
     * @param {?} extent - either a GP extent object or Leaflet LatLngBounds object
     * @return {?}
     */
    setExtent(extent) {
        if (!extent)
            return;
        if (typeof (extent.minx) !== 'undefined' &&
            typeof (extent.miny) !== 'undefined' &&
            typeof (extent.maxx) !== 'undefined' &&
            typeof (extent.maxy) !== 'undefined') {
            //GP model extent
            this._mapInstance.fitBounds([
                [extent.miny, extent.minx],
                [extent.maxy, extent.maxx]
            ]);
        }
        else if (typeof (extent.getWest) !== 'undefined') {
            //L.LatLngBounds
            this._mapInstance.fitBounds(extent);
        }
    }
    /**
     * @param {?} layer Leaflet Layer instance or object definition
     * @return {?}
     */
    setBaseLayer(layer) {
        /** @type {?} */
        let promise = null;
        if (!layer) {
            /** @type {?} */
            let svc = /** @type {?} */ (this.getService(ItemTypes.LAYER));
            promise = DefaultBaseLayer.get(svc);
        }
        else
            promise = resolve(layer);
        promise.then(layer => {
            /** @type {?} */
            let leafletLayer = LayerFactory$1.create(layer);
            if (!leafletLayer) {
                console.log("Warning: MapInstance could not create base " +
                    "layer for '" + layer.id + "'");
                return;
            }
            this._mapInstance.addLayer(leafletLayer);
            (/** @type {?} */ (leafletLayer)).setZIndex(0);
            /** @type {?} */
            let oldBaseLayer = this._baseLayer;
            if (oldBaseLayer) {
                this._mapInstance.removeLayer(oldBaseLayer);
            }
            //remember new base layer
            this._baseLayer = leafletLayer;
            this._baseLayerDef = layer;
            //will notify listeners
            this.touch('baselayer:changed', layer, leafletLayer);
            // this.notify('baselayer:changed', layer, leafletLayer);
        })
            .catch(e => {
            console.log(`MapInstance.setBaseLayer() - Error getting base layer for map : ${e.message}`);
            this.logLayerError(layer.id, "Error setting baselayer on map " +
                "because of the following error(s): " + e.message);
        });
    }
    /**
     * @return {?} array of base layers definitions that can be used
     */
    getBaseLayer() { return this._baseLayerDef; }
    /**
     * @return {?} list of layer states containing layer information
     */
    getLayers() { return this._layerStates; }
    /**
     * @return {?}
     */
    getLayerErrors() { return this._layerErrors; }
    /**
     * @return {?}
     */
    clearLayerErrors() {
        this._layerErrors = [];
        this.notify('layer:error');
    }
    /**
     * @return {?}
     */
    clearOverlays() {
        if (!this._layerCache)
            return;
        for (var i = this._layerStates.length - 1; i >= 0; --i) {
            /** @type {?} */
            var state = this._layerStates[i];
            /** @type {?} */
            var layerInstance = this._layerCache[state.layer.id];
            if (layerInstance) {
                layerInstance.off("layer:error");
                this._layerCache[state.layer.id] = null;
                this._mapInstance.removeLayer(layerInstance);
            }
        }
        this._layerStates = [];
        this.touch('layers:changed');
        //TODO stop listening for layer events
    }
    /**
     * @param {?} layers - list of layers (NOTE: not wrapped by layer states, this method applies that)
     * @return {?}
     */
    addLayers(layers) {
        if (!this._layerCache) {
            console.log("WARN: attempting to add layers to an empty cache");
            return;
        }
        if (!this._layerCache) {
            console.log("WARN: Attempting to add layers to a map with no layer cache");
            return;
        }
        if (!layers)
            return;
        if (typeof (layers.push) === 'undefined') {
            layers = [layers];
        }
        layers.forEach((obj, index) => {
            /** @type {?} */
            let layer = null;
            /** @type {?} */
            let state = null;
            if (obj.type && obj.type === ItemTypes.LAYER) { //is a layer
                //is a layer
                layer = obj;
            }
            else if (obj.layer) { //is layer state
                //is layer state
                layer = obj.layer; // containing a layer
                state = obj;
            }
            if (!layer) {
                console.log("MapInstance.addLayers() - layer (" + index +
                    ") is not a Layer or a Layer state. Ignoring...");
                return; //layer info is missing, skip it
            }
            //DT-442 prevent adding layer that already exists on map
            if (this._layerCache[layer.id])
                return;
            if (!state) {
                try {
                    /** @type {?} */
                    let layerCopy = JSON.parse(JSON.stringify(layer));
                    state = {
                        opacity: 1,
                        visibility: true,
                        layer: layerCopy
                    };
                }
                catch (e) {
                    throw new Error("Unable to add layer to map because of " + e.message);
                }
            }
            /** @type {?} */
            let z = layers.length - index;
            state.zIndex = z;
            this.addLayerWithState(layer, state);
        });
        this.touch('layers:changed');
    }
    /**
     * @param {?} layer - GeoPlatform Layer instance
     * @param {?} state - GeoPlatform Layer State
     * @return {?}
     */
    addLayerWithState(layer, state) {
        /** @type {?} */
        var leafletLayer = null;
        try {
            if (!layer || !state)
                throw new Error("Invalid argument, missing layer and or state");
            leafletLayer = LayerFactory$1.create(layer);
            if (!leafletLayer) {
                /** @type {?} */
                let msg = "Could not create leaflet instance for GP Layer '" + layer.id + "'.";
                if (!layer.services || !layer.services.length) {
                    msg += '  The layer instance has no services included, ' +
                        'which will prevent most layers from being displayed.';
                }
                throw new Error(msg);
            }
        }
        catch (e) {
            this.logLayerError(layer.id, "Layer '" + layer.label + "' could not be added to the " +
                "map instance; " + e.message);
        }
        if (!leafletLayer)
            return;
        //cache leaflet object first
        if (this._layerCache)
            this._layerCache[layer.id] = leafletLayer;
        //listen for layer errors so we can inform the user
        // that a layer hasn't been loaded in a useful way
        leafletLayer.on('tileerror', (e) => { this.handleLayerError(e); });
        this._mapInstance.addLayer(leafletLayer);
        if (!isNaN(state.zIndex) && leafletLayer.setZIndex)
            leafletLayer.setZIndex(state.zIndex);
        this._layerStates.push(state);
        this.notify('layer:added', layer, leafletLayer);
        // if layer is initially "off" or...
        // if layer is initially not 100% opaque
        if (!state.visibility || state.opacity < 1) {
            // initialize layer visibility and opacity async, or else
            // some of the layers won't get properly initialized
            setTimeout((layer, state) => {
                this.setLayerVisibility(layer, state.visibility);
                this.setLayerOpacity(layer, state.opacity);
                //TODO notify of change
                //DT-2102 timeout needs to be large enough or else
                // feature layers won't get opacity updated on map load
            }, 2000, leafletLayer, state);
        }
    }
    /**
     * @param {?} from - position of layer being moved
     * @param {?} to - desired position to move layer to
     * @return {?}
     */
    moveLayer(from, to) {
        if (!this._layerCache)
            return;
        if (!this._layerCache)
            return;
        if (isNaN(from))
            return;
        //end of list
        if (isNaN(to))
            to = this._layerStates.length - 1;
        /** @type {?} */
        let copy = this._layerStates.splice(from, 1)[0]; //grab layer being moved
        this._layerStates.splice(to, 0, copy);
        for (let z = 1, i = this._layerStates.length - 1; i >= 0; --i, ++z) {
            /** @type {?} */
            let layerState = this._layerStates[i];
            /** @type {?} */
            let layerInstance = this._layerCache[layerState.layer.id];
            if (layerInstance) {
                layerInstance.setZIndex(z);
                layerState.zIndex = z;
            }
        }
        this.touch('layers:changed', this.getLayers());
    }
    /**
     *
     * @param {?} id
     * @return {?}
     */
    removeLayer(id) {
        if (!this._layerCache)
            return;
        /** @type {?} */
        var layerInstance = this._layerCache[id];
        if (layerInstance) {
            /** @type {?} */
            let index = this.getLayerStateIndex(id);
            // console.log("MapInstance.removeLayer(" + id + ")");
            if (index >= 0 && index < this._layerStates.length)
                this._layerStates.splice(index, 1);
            //stop listening for errors
            layerInstance.off("layer:error");
            //remove layer from map
            this._mapInstance.removeLayer(layerInstance);
            //remove layer from cache
            this._layerCache[id] = null;
        }
        this.touch('layers:changed');
    }
    /**
     *
     * @param {?} id
     * @return {?}
     */
    toggleLayerVisibility(id) {
        if (!this._layerCache)
            return;
        /** @type {?} */
        var layerInstance = this._layerCache[id];
        if (layerInstance) {
            /** @type {?} */
            let state = this.getLayerState(id);
            state.visibility = !state.visibility;
            if (layerInstance._currentImage) {
                //ESRI Image Service layers have an IMG element
                // that gets modified and replaced every map event (zoom/pan)
                // so we can't just toggle classes like on other layers.
                //Instead, we need to use the ESRI setOpacity method to toggle
                // but need to update layer state as well.
                layerInstance.setOpacity(state.visibility ? 1 : 0);
                state.opacity = layerInstance.getOpacity();
                return;
            }
            this.setLayerVisibility(layerInstance, state.visibility);
        }
    }
    /**
     * Note: this does not update layer definition state. Use
     * MapInstance.toggleLayerVisibility to do that and adjust
     * rendered layer's visibility.
     *
     * @param {?} layerInstance - leaflet layer instance
     * @param {?} visible - flag indicating visibility of layer
     * @return {?}
     */
    setLayerVisibility(layerInstance, visible) {
        if ((/** @type {?} */ (layerInstance)).setVisibility) {
            //using custom method provided in src/layer/module.js
            (/** @type {?} */ (layerInstance)).setVisibility(visible);
        }
        else if ((/** @type {?} */ (layerInstance))._container) {
            /** @type {?} */
            let el = jQuery$4((/** @type {?} */ (layerInstance))._container);
            // if(visible) el.removeClass("invisible");
            // else el.addClass('invisible');
            el.css({ 'display': visible ? '' : 'none' });
        }
        this.touch('map:layer:changed');
    }
    /**
     *
     * @param {?} id
     * @param {?} opacity
     * @return {?}
     */
    updateLayerOpacity(id, opacity) {
        if (!this._layerCache)
            return;
        /** @type {?} */
        var layerInstance = this._layerCache[id];
        //if layer id is for base layer...
        if (!layerInstance && this._baseLayerDef.id === id) {
            layerInstance = this._baseLayer;
        }
        //adjust rendered leaflet layer
        opacity = this.setLayerOpacity(layerInstance, opacity);
        /** @type {?} */
        let state = this.getLayerState(id);
        if (state)
            state.opacity = opacity;
    }
    /**
     * Note: this method does not update the associated Layer Definition
     * state value for opacity. Use MapInstance.updateLayerOpacity() to
     * both update state and adjust rendered layer.
     *
     * @param {?} layerInstance - leaflet layer instance
     * @param {?} opacity - value between 0 and 1.0 or 0 and 100
     * @return {?} normalized opacity value between 0 and 1.0
     */
    setLayerOpacity(layerInstance, opacity) {
        if (layerInstance && (/** @type {?} */ (layerInstance)).setOpacity) {
            if (opacity > 1.0)
                opacity = opacity / 100.0;
            (/** @type {?} */ (layerInstance)).setOpacity(opacity);
            this.touch('map:layer:changed');
        }
        return opacity;
    }
    /**
     * @param {?} gpLayer
     * @return {?} Leaflet layer instance representing that layer or null
     */
    getLeafletLayerFor(gpLayer) {
        if (!gpLayer || !this._layerCache)
            return null;
        /** @type {?} */
        let leafletLayer = this._layerCache[gpLayer.id];
        return leafletLayer || null;
    }
    /**
     *
     * @param {?} layerId
     * @return {?}
     */
    toggleGetFeatureInfo(layerId) {
        if (!this._layerCache)
            return;
        /** @type {?} */
        var layerInstance = this._layerCache[layerId];
        if (layerInstance) {
            if (typeof (layerInstance.enableGetFeatureInfo) !== 'undefined') {
                if (layerInstance.isGetFeatureInfoEnabled()) {
                    layerInstance.disableGetFeatureInfo();
                    jQuery$4((/** @type {?} */ (this._mapInstance))._container).removeClass('selectable-cursor');
                }
                else {
                    layerInstance.enableGetFeatureInfo();
                    jQuery$4((/** @type {?} */ (this._mapInstance))._container).addClass('selectable-cursor');
                }
            }
        }
    }
    /**
     * @return {?} array of features on the map
     */
    getFeatures() {
        if (this._featureLayer) {
            /** @type {?} */
            let geojson = this._featureLayer.toGeoJSON();
            return (/** @type {?} */ (geojson)).features;
        }
        return [];
    }
    /**
     * @param {?} json geojson object or array of geojson objects
     * @return {?}
     */
    addFeatures(json) {
        if (!json)
            return;
        if (typeof (json.push) !== 'undefined') {
            //array of features
            for (var i = 0; i < json.length; ++i)
                this.addFeature(json[i], false);
            this.touch('features:changed');
        }
        else if (json.features) {
            this.addFeatures(json.features);
        }
        else { //single feature
            //single feature
            this.addFeature(json, true);
        }
    }
    /**
     * @param {?} json geojson object
     * @param {?=} fireEvent
     * @return {?}
     */
    addFeature(json, fireEvent) {
        // var type = json.type;
        // var coordinates = json.coordinates;
        if (!this._featureLayer) {
            // _featureLayer = geoJSON([], _geoJsonLayerOpts).addTo(_mapInstance);
            this._featureLayer = featureGroup().addTo(this._mapInstance);
        }
        /** @type {?} */
        var opts = jQuery$4.extend({}, this._geoJsonLayerOpts);
        geoJSON(json, opts).eachLayer((l) => this.addFeatureLayer(l));
        if (typeof (fireEvent) === 'undefined' || fireEvent === true)
            this.touch('features:changed');
        else
            this.touch();
        // console.log(JSON.stringify(_featureLayer.toGeoJSON()));
    }
    /**
     * @param {?} featureJson object defining a GeoJSON feature
     * @return {?}
     */
    updateFeature(featureJson) {
        /** @type {?} */
        var layer = this.getFeatureLayer(featureJson.properties.id);
        if (layer) {
            (/** @type {?} */ (layer)).feature = featureJson;
            //update style
            layer.setStyle(featureJson.properties.style);
            /** @type {?} */
            var label = featureJson.properties.label ||
                "Untitled " + featureJson.geometry.type + " Feature";
            layer.bindTooltip(label);
            // layer.redraw();
            this.touch("map:feature:changed");
        }
    }
    /**
     * Replace an existing L.Path-based layer with one using
     * the supplied Feature GeoJSON object.  Removes the existing
     * layer and adds a new one created from the GeoJSON.
     *
     * @param {?} featureJson object defining GeoJSON feature
     * @return {?}
     */
    replaceFeature(featureJson) {
        /** @type {?} */
        var layer = this.getFeatureLayer(featureJson.properties.id);
        if (layer) {
            //remove existing
            this._featureLayer.removeLayer(layer);
            //add replacement
            geoJSON(featureJson, this._geoJsonLayerOpts)
                .eachLayer((l) => this.addFeatureLayer(l));
            this.touch("map:feature:changed");
        }
    }
    /**
     * @param {?} featureId identifier of feature to focus the map on
     * @return {?}
     */
    focusFeature(featureId) {
        /** @type {?} */
        var layer = this.getFeatureLayer(featureId);
        if (layer) {
            if (typeof (layer.getBounds) !== 'undefined') {
                /** @type {?} */
                let extent = layer.getBounds();
                this._mapInstance.fitBounds(extent);
            }
            else if (typeof ((/** @type {?} */ (layer)).getLatLng) !== 'undefined') {
                /** @type {?} */
                let latLng = (/** @type {?} */ (layer)).getLatLng();
                this._mapInstance.panTo(latLng);
            }
            else {
                console.log("MapInstance.focusFeature() - Cannot focus feature because it has no bounds or lat/lng");
            }
        }
        else {
            console.log("MapInstance.focusFeature() - Cannot focus feature because it has no layer");
        }
    }
    /**
     * @param {?} featureId : string
     * @return {?}
     */
    removeFeature(featureId) {
        /** @type {?} */
        var layer = this.getFeatureLayer(featureId);
        if (layer && this._featureLayer) {
            this._featureLayer.removeLayer(layer);
            this.touch('features:changed');
        }
    }
    /**
     *
     * @return {?}
     */
    removeFeatures() {
        if (this._featureLayer) {
            this._featureLayer.clearLayers();
            this.touch("features:changed");
        }
    }
    /**
     *
     * @param {?=} featureId
     * @return {?}
     */
    getFeatureLayer(featureId) {
        //if no feature was specified, return root feature layer
        if (!featureId)
            return this._featureLayer;
        //otherwise, find feature...
        if (!this._featureLayer)
            return null;
        /** @type {?} */
        var features = this._featureLayer.getLayers();
        for (var i = 0; i < features.length; ++i) {
            if ((/** @type {?} */ (features[i])).feature &&
                (/** @type {?} */ (features[i])).feature.properties.id === featureId) {
                return (/** @type {?} */ (features[i]));
            }
        }
        return null;
    }
    /**
     * @return {?}
     */
    toggleFeaturesLayer() {
        if (!this._featureLayer)
            return false; //ignore if not rendered yet
        this._featureLayerVisible = !this._featureLayerVisible;
        this.setFeatureLayerVisibility(this._featureLayer, this._featureLayerVisible);
        return this._featureLayerVisible;
    }
    /**
     * @param {?} feature - Leaflet feature instance
     * @param {?} visibility - flag
     * @return {?}
     */
    setFeatureVisibility(feature, visibility) {
        this.setFeatureLayerVisibility(feature, visibility);
    }
    /**
     * @return {?}
     */
    getFeaturesLayerVisibility() {
        return this._featureLayerVisible;
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    addFeatureLayer(layer) {
        this._addFeatureLayer(layer);
        this.touch("features:changed");
    }
    /**
     * Internal method, use 'addFeatureLayer' instead
     * @param {?} layer
     * @return {?}
     */
    _addFeatureLayer(layer) {
        if (!(/** @type {?} */ (layer)).feature && layer instanceof LayerGroup) {
            layer.eachLayer((child) => {
                this._addFeatureLayer(child);
            });
        }
        else {
            this._featureLayer.addLayer(layer);
        }
    }
    /**
     * @param {?} layer
     * @param {?} visibility
     * @return {?}
     */
    setFeatureLayerVisibility(layer, visibility) {
        if (!layer)
            return;
        this._featureLayerVisible = visibility;
        if (layer.getLayers) {
            layer.getLayers().forEach((child) => {
                this.setFeatureLayerVisibility(child, visibility);
            });
        }
        else {
            /** @type {?} */
            let container = layer._container || layer._path;
            if (container)
                container.style.display = visibility ? '' : 'none';
        }
    }
    /**
     * @param {?} metadata
     * @return {?} resolving persisted map
     */
    save(metadata) {
        return this.saveMap(metadata);
    }
    /**
     * @param {?} md object containing metadata properties for map
     * @return {?}
     */
    saveMap(md) {
        /** @type {?} */
        let metadata = md || {};
        /** @type {?} */
        const gpMapType = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
        metadata.resourceTypes = metadata.resourceTypes || [];
        if (metadata.resourceTypes.indexOf(gpMapType) < 0)
            metadata.resourceTypes.push(gpMapType);
        /** @type {?} */
        var content = this.getMapResourceContent(metadata);
        //ensure the two name properties line up
        if (content.title && content.title !== content.label) {
            content.label = content.title;
        }
        else if (content.label && !content.title) {
            content.title = content.label;
        }
        // console.log("Updating: " + JSON.stringify(map));
        return this.getService(ItemTypes.MAP)
            .save(content)
            .then(result => {
            //track new map's info so we can update it with next save
            if (!this._mapId)
                this._mapId = result.id;
            this._mapDef = result;
            this._defaultExtent = result["extent"];
            this.clean();
            return result;
        })
            .catch(err => {
            console.log("MapCore MapInstance.saveMap() - " +
                "The requested map could not be saved because: " + err.message);
            /** @type {?} */
            let e = new Error("The requested map could not be saved because of the following error(s): " +
                err.message);
            return reject(e);
        });
    }
    /**
     * Retrieve a map's descriptor from the registry
     * @param {?} mapId identifier of map
     * @return {?} resolving the map object
     */
    fetchMap(mapId) {
        //Having to send cache busting parameter to avoid CORS header cache
        // not sending correct Origin value
        return this.getService(ItemTypes.MAP).get(mapId);
    }
    /**
     * Retrieve a map's descriptor and load it as the
     * current map managed by this service
     * @param {?} mapId identifier of map
     * @return {?} resolving the map object
     */
    loadMap(mapId) {
        return this.fetchMap(mapId).then(map => {
            if (!map) {
                throw new Error("The requested map ('" + mapId +
                    "') came back null");
            }
            else if (typeof (map) === 'string') {
                throw new Error("The requested map ('" + mapId +
                    "') came back as a string");
            }
            else if ((/** @type {?} */ (map)).message) {
                throw new Error("There was an error loading the requested map ('" +
                    mapId + "'): " + (/** @type {?} */ (map)).message);
            }
            //loading a map by its ID, so we need to increment it's view count
            if ('development' !== Config["env"]) {
                setTimeout((map) => {
                    /** @type {?} */
                    let views = map.statistics ? (map.statistics.numViews || 0) : 0;
                    /** @type {?} */
                    let patch = [{ op: 'replace', path: '/statistics/numViews', value: views + 1 }];
                    this.getService(ItemTypes.MAP).patch(map.id, patch)
                        // this.mapService.patch(map.id, patch)
                        .then(updated => { map.statistics = updated["statistics"]; })
                        .catch(e => {
                        console.log("MapInstance.saveMap() - Error updating view " +
                            "count for map ('" + mapId + "'): " + e);
                    });
                }, 1000, map);
            }
            //load the map into the viewer
            this.loadMapFromObj(map);
            return map;
        })
            .catch(err => {
            console.log("MapInstance.loadMap() - " +
                "The requested map could not be loaded because " + err.message);
            /** @type {?} */
            let e = new Error("The requested map ('" + mapId +
                "') could not be loaded because of the following error(s): " +
                err.message);
            return reject(e);
        });
    }
    /**
     * Load a map from its descriptor as the current
     * map managed by this service
     * @param {?} map object
     * @return {?}
     */
    loadMapFromObj(map) {
        // console.log("Loading Map Object");
        // console.log(map);
        this._mapId = map.id;
        this._mapDef = map;
        map.extent = this.ensureExtent(map.extent);
        //set extent from loaded map
        this._defaultExtent = map.extent;
        /** @type {?} */
        var extent = map.extent;
        //remove existing layers
        this._mapInstance.eachLayer((l) => {
            this._mapInstance.removeLayer(l);
        });
        this._layerCache = {};
        this._layerStates = [];
        //set new base layer
        this.setBaseLayer(map.baseLayer);
        //add layers from loaded map
        this.addLayers(map.layers);
        //add features
        if (map.annotations && map.annotations.geoJSON) {
            /** @type {?} */
            let fc = map.annotations.geoJSON;
            if (fc.features)
                this.addFeatures(fc.features);
            else
                this.addFeatures([fc]);
        }
        this._mapInstance.fitBounds([
            [extent.miny, extent.minx],
            [extent.maxy, extent.maxx]
        ]);
        this.clean();
        this.notify('map:loaded', map);
    }
    /**
     * @param {?} extent
     * @return {?} corrected or default extent
     */
    ensureExtent(extent) {
        /** @type {?} */
        let west = !extent || isNaN(extent.minx) ? -179.0 : extent.minx * 1.0;
        /** @type {?} */
        let east = !extent || isNaN(extent.maxx) ? 179.0 : extent.maxx * 1.0;
        /** @type {?} */
        let south = !extent || isNaN(extent.miny) ? -89.0 : extent.miny * 1.0;
        /** @type {?} */
        let north = !extent || isNaN(extent.maxy) ? 89.0 : extent.maxy * 1.0;
        /** @type {?} */
        let t;
        if (west > east) {
            t = Math.min(west, east);
            east = Math.max(west, east);
            west = t;
        }
        if (south > north) {
            t = Math.min(south, north);
            north = Math.max(south, north);
            south = t;
        }
        //prevent out-of-bounds extents
        if (west < -180.0)
            west = -179.0;
        if (east > 180.0)
            east = 179.0;
        if (south < -90.0)
            south = -89.0;
        if (north > 90.0)
            north = 89.0;
        return { minx: west, miny: south, maxx: east, maxy: north };
    }
    /**
     *
     * @return {?}
     */
    destroyMap() {
        // console.log("Destroying Map");
        this._mapInstance = null;
        this._layerCache = null;
        this._layerStates = null;
        this._featureLayer = null;
    }
    /**
     * Used to take an existing map that is already persisted on the
     * server and unlink it here in the client so that it will be saved
     * as a completely new map when mapService.saveMap(...) is next called
     * @param {?} mapToUse
     * @return {?}
     */
    setAsNewMap(mapToUse) {
        this._mapId = null;
        this._mapDef = mapToUse || this.initializeMapDefinition();
    }
    /**
     * @param {?} id
     * @param {?} tool
     * @return {?}
     */
    registerTool(id, tool) {
        this._tools[id] = tool;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    unregisterTool(id) {
        this._tools[id] = null;
    }
    /**
     * @param {?} id
     * @param {?} finish
     * @return {?}
     */
    enableTool(id, finish) {
        if (!this._tools[id])
            return false;
        this._tools[id].activate(function () {
            this.notify('tool:disabled', id);
        });
        this.notify('tool:enabled', id);
    }
    /**
     * @return {?}
     */
    cacheMap() {
        if (this.state && this.state.dirty) {
            /** @type {?} */
            var map = this.getMapResourceContent();
            //use exploded layer info
            map.layers = this._layerStates.slice(0);
            // $sessionStorage.map = map;
        }
    }
    /**
     * @return {?}
     */
    restoreMap() {
        // if($sessionStorage.map) {
        //     console.log("Restoring cached map");
        //     let map = $sessionStorage.map;
        //     // console.log(JSON.stringify(map));
        //     $sessionStorage.map = null;
        //     this.loadMapFromObj(map);
        // }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var cache = {};
var factory = {
    get: function (key) {
        if (key && cache[key])
            return cache[key];
        let instance = new MapInstance(key);
        cache[instance._key] = instance;
        return instance;
    },
    dispose: function (key) {
        if (key) {
            cache[key].dispose();
            delete cache[key];
        }
        else {
            cache = null;
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
Polyfills();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { loadingControl as LoadingControl, measureControl as MeasureControl, positionControl as MousePositionControl, FeatureEditor, DefaultBaseLayer, LayerFactory$1 as LayerFactory, OSMLayerFactory, BaseClusteredFeatureLayer, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed, FeatureLayer$2 as FeatureLayer, WMS, wms, WMST, wmst, WMTS, wmts, EsriTileLayer as ESRITileLayer, OSM, MapInstance, factory as MapFactory, types as ServiceTypes, featurePopupTemplate as PopupTemplate, featureStyleResolver as StyleResolver };

//# sourceMappingURL=geoplatform-mapcore.js.map