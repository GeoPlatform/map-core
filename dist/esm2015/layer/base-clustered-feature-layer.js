/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import "leaflet.markercluster";
import { Util, MarkerClusterGroup, GeoJSON } from 'leaflet';
import * as esri from "esri-leaflet";
/* esri-leaflet-cluster - v2.0.0 - Thu Aug 18 2016 17:12:43 GMT-0700 (PDT)
 * Copyright (c) 2016 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/** @type {?} */
var version = "2.0.0";
const ɵ0 = /**
 * @param {?} options
 * @return {?}
 */
function (options) {
    esri.FeatureManager.prototype.initialize.call(this, options);
    options = Util.setOptions(this, options);
    this._layers = {};
    this._leafletIds = {};
    this.cluster = new MarkerClusterGroup(options);
    this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');
    this.cluster.addEventParent(this);
}, ɵ1 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    esri.FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.cluster);
    // NOTE !!!!!!!
    // Using this type of layer requires map.maxZoom to be set during map creation!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}, ɵ2 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    esri.FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.cluster);
}, ɵ3 = /**
 * @param {?} features
 * @return {?}
 */
function (features) {
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
}, ɵ4 = /**
 * @param {?} ids
 * @return {?}
 */
function (ids) {
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
}, ɵ5 = /**
 * @param {?} ids
 * @param {?} permanent
 * @return {?}
 */
function (ids, permanent) {
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
}, ɵ6 = /**
 * @param {?} id
 * @return {?}
 */
function (id) {
    /** @type {?} */
    var layer = this._layers[id];
    if (layer) {
        layer.options = layer.defaultOptions;
        this.setFeatureStyle(layer.feature.id, this.options.style);
    }
    return this;
}, ɵ7 = /**
 * @param {?} style
 * @return {?}
 */
function (style) {
    this.eachFeature((/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }), this);
    return this;
}, ɵ8 = /**
 * @param {?} id
 * @param {?} style
 * @return {?}
 */
function (id, style) {
    /** @type {?} */
    var layer = this._layers[id];
    if (typeof style === 'function') {
        style = style(layer.feature);
    }
    if (layer.setStyle) {
        layer.setStyle(style);
    }
}, ɵ9 = /**
 * @param {?} fn
 * @param {?} context
 * @return {?}
 */
function (fn, context) {
    for (var i in this._layers) {
        fn.call(context, this._layers[i]);
    }
    return this;
}, ɵ10 = /**
 * @param {?} id
 * @return {?}
 */
function (id) {
    return this._layers[id];
};
/** @type {?} */
var BaseClusteredFeatureLayer = esri.FeatureManager.extend({
    statics: {
        EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
        CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
    },
    /**
     * Constructor
     */
    initialize: (ɵ0),
    /**
     * Layer Interface
     */
    onAdd: (ɵ1),
    onRemove: (ɵ2),
    /**
     * Feature Management Methods
     */
    createLayers: (ɵ3),
    addLayers: (ɵ4),
    removeLayers: (ɵ5),
    /**
     * Styling Methods
     */
    resetStyle: (ɵ6),
    setStyle: (ɵ7),
    setFeatureStyle: (ɵ8),
    /**
     * Utility Methods
     */
    eachFeature: (ɵ9),
    getFeature: (ɵ10)
});
// function featureLayer (options) {
//   return new FeatureLayer(options);
// }
//
// export {
//     FeatureLayer,
//     featureLayer as default,
//     version as VERSION
// }
export default BaseClusteredFeatureLayer;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQzs7Ozs7SUFNakMsT0FBTyxHQUFHLE9BQU87Ozs7O0FBYVAsVUFBVSxPQUFPO0lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTdELE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7OztBQU1NLFVBQVUsR0FBRztJQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxH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WUFBWSxNQWVYOzs7O0lBTUQsVUFBVSxNQVNUO0lBRUQsUUFBUSxNQUtQO0lBRUQsZUFBZSxNQVNkOzs7O0lBTUQsV0FBVyxNQUtWO0lBRUQsVUFBVSxPQUVUO0NBQ0YsQ0FBQzs7Ozs7Ozs7OztBQVlGLGVBQWUseUJBQXlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cbmltcG9ydCAqIGFzIE1hcmtlckNsdXN0ZXIgZnJvbSAnbGVhZmxldC5tYXJrZXJjbHVzdGVyJztcbmltcG9ydCBcImxlYWZsZXQubWFya2VyY2x1c3RlclwiO1xuaW1wb3J0IHsgVXRpbCwgTWFya2VyQ2x1c3Rlckdyb3VwLCBHZW9KU09OIH0gZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgKiBhcyBlc3JpIGZyb20gXCJlc3JpLWxlYWZsZXRcIjtcblxuLyogZXNyaS1sZWFmbGV0LWNsdXN0ZXIgLSB2Mi4wLjAgLSBUaHUgQXVnIDE4IDIwMTYgMTc6MTI6NDMgR01ULTA3MDAgKFBEVClcbiAqIENvcHlyaWdodCAoYykgMjAxNiBFbnZpcm9ubWVudGFsIFN5c3RlbXMgUmVzZWFyY2ggSW5zdGl0dXRlLCBJbmMuXG4gKiBBcGFjaGUtMi4wICovXG5cbnZhciB2ZXJzaW9uID0gXCIyLjAuMFwiO1xuXG52YXIgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllciA9IGVzcmkuRmVhdHVyZU1hbmFnZXIuZXh0ZW5kKHtcblxuICBzdGF0aWNzOiB7XG4gICAgRVZFTlRTOiAnY2xpY2sgZGJsY2xpY2sgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBjb250ZXh0bWVudSBwb3B1cG9wZW4gcG9wdXBjbG9zZScsXG4gICAgQ0xVU1RFUkVWRU5UUzogJ2NsdXN0ZXJjbGljayBjbHVzdGVyZGJsY2xpY2sgY2x1c3Rlcm1vdXNlb3ZlciBjbHVzdGVybW91c2VvdXQgY2x1c3Rlcm1vdXNlbW92ZSBjbHVzdGVyY29udGV4dG1lbnUnXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgZXNyaS5GZWF0dXJlTWFuYWdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucyA9IFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuICAgIHRoaXMuX2xlYWZsZXRJZHMgPSB7fTtcblxuICAgIHRoaXMuY2x1c3RlciA9IG5ldyBNYXJrZXJDbHVzdGVyR3JvdXAob3B0aW9ucyk7XG4gICAgdGhpcy5fa2V5ID0gJ2MnICsgKE1hdGgucmFuZG9tKCkgKiAxZTkpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKCcuJywgJ18nKTtcblxuICAgIHRoaXMuY2x1c3Rlci5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZXNyaS5GZWF0dXJlTWFuYWdlci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICAgIHRoaXMuX21hcC5hZGRMYXllcih0aGlzLmNsdXN0ZXIpO1xuXG4gICAgLy8gTk9URSAhISEhISEhXG4gICAgLy8gVXNpbmcgdGhpcyB0eXBlIG9mIGxheWVyIHJlcXVpcmVzIG1hcC5tYXhab29tIHRvIGJlIHNldCBkdXJpbmcgbWFwIGNyZWF0aW9uIVxuICAgIC8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGVzcmkuRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5jbHVzdGVyKTtcbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50IE1ldGhvZHNcbiAgICovXG5cbiAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICB2YXIgbWFya2VycyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2dlb2pzb24uaWRdO1xuXG4gICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgIHZhciBuZXdMYXllciA6IGFueSA9IEdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBHZW9KU09OLmFzRmVhdHVyZShnZW9qc29uKTtcbiAgICAgICAgbmV3TGF5ZXIuZGVmYXVsdE9wdGlvbnMgPSBuZXdMYXllci5vcHRpb25zO1xuICAgICAgICBuZXdMYXllci5fbGVhZmxldF9pZCA9IHRoaXMuX2tleSArICdfJyArIGdlb2pzb24uaWQ7XG5cbiAgICAgICAgdGhpcy5yZXNldFN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQpO1xuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBsYXllclxuICAgICAgICB0aGlzLl9sYXllcnNbbmV3TGF5ZXIuZmVhdHVyZS5pZF0gPSBuZXdMYXllcjtcblxuICAgICAgICB0aGlzLl9sZWFmbGV0SWRzW25ld0xheWVyLl9sZWFmbGV0X2lkXSA9IGdlb2pzb24uaWQ7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUobmV3TGF5ZXIuZmVhdHVyZSwgbmV3TGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiBpdCBpcyB3aXRoaW4gdGhlIHRpbWUgYm91bmRzIG9yIG91ciBsYXllciBpcyBub3QgdGltZSBlbmFibGVkXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnRpbWVGaWVsZCB8fCAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCAmJiB0aGlzLl9mZWF0dXJlV2l0aGluVGltZVJhbmdlKGdlb2pzb24pKSkge1xuICAgICAgICAgIG1hcmtlcnMucHVzaChuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFya2Vycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2x1c3Rlci5hZGRMYXllcnMobWFya2Vycyk7XG4gICAgfVxuICB9LFxuXG4gIGFkZExheWVyczogZnVuY3Rpb24gKGlkcykge1xuICAgIHZhciBsYXllcnNUb0FkZCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZHNbaV1dO1xuICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvQWRkLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIuYWRkTGF5ZXJzKGxheWVyc1RvQWRkKTtcbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIHZhciBsYXllcnNUb1JlbW92ZSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2xheWVyc1tpZF0gJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIucmVtb3ZlTGF5ZXJzKGxheWVyc1RvUmVtb3ZlKTtcbiAgfSxcblxuICAvKipcbiAgICogU3R5bGluZyBNZXRob2RzXG4gICAqL1xuXG4gIHJlc2V0U3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG5cbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIGxheWVyLm9wdGlvbnMgPSBsYXllci5kZWZhdWx0T3B0aW9ucztcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcblxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XG4gICAgfVxuICAgIGlmIChsYXllci5zZXRTdHlsZSkge1xuICAgICAgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVXRpbGl0eSBNZXRob2RzXG4gICAqL1xuXG4gIGVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRGZWF0dXJlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgfVxufSk7XG5cbi8vIGZ1bmN0aW9uIGZlYXR1cmVMYXllciAob3B0aW9ucykge1xuLy8gICByZXR1cm4gbmV3IEZlYXR1cmVMYXllcihvcHRpb25zKTtcbi8vIH1cbi8vXG4vLyBleHBvcnQge1xuLy8gICAgIEZlYXR1cmVMYXllcixcbi8vICAgICBmZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbi8vICAgICB2ZXJzaW9uIGFzIFZFUlNJT05cbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllcjtcbiJdfQ==