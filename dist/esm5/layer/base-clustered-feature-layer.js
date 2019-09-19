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
var ɵ0 = /**
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
            // this.resetStyle(newLayer.feature.id);
            /** @type {?} */
            var style = typeof (this.options.style) === 'function' ?
                this.options.style(newLayer.feature) : this.options.style;
            newLayer.setStyle(style);
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
    this.options.style = style;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsT0FBTyx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM1RCxPQUFPLEtBQUssSUFBSSxNQUFNLGNBQWMsQ0FBQzs7Ozs7SUFNakMsT0FBTyxHQUFHLE9BQU87Ozs7O0FBYVAsVUFBVSxPQUFPO0lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTdELE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV6QyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQzs7OztBQU1NLFVBQVUsR0FBRztJQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxH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dEtDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBRXpELE9BQU8sRUFBRTtRQUNQLE1BQU0sRUFBRSw4RUFBOEU7UUFDdEYsYUFBYSxFQUFFLG1HQUFtRztLQUNuSDs7OztJQU1ELFVBQVUsTUFZVDs7OztJQU1ELEtBQUssTUFPSjtJQUVELFFBQVEsTUFHUDs7OztJQU1ELFlBQVksTUF5Q1g7SUFFRCxTQUFTLE1BVVI7SUFFRCxZQUFZLE1BZVg7Ozs7SUFNRCxVQUFVLE1BU1Q7SUFFRCxRQUFRLE1BTVA7SUFFRCxlQUFlLE1BU2Q7Ozs7SUFNRCxXQUFXLE1BS1Y7SUFFRCxVQUFVLE9BRVQ7Q0FDRixDQUFDOzs7Ozs7Ozs7O0FBWUYsZUFBZSx5QkFBeUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuaW1wb3J0ICogYXMgTWFya2VyQ2x1c3RlciBmcm9tICdsZWFmbGV0Lm1hcmtlcmNsdXN0ZXInO1xuaW1wb3J0IFwibGVhZmxldC5tYXJrZXJjbHVzdGVyXCI7XG5pbXBvcnQgeyBVdGlsLCBNYXJrZXJDbHVzdGVyR3JvdXAsIEdlb0pTT04gfSBmcm9tICdsZWFmbGV0JztcbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xuXG4vKiBlc3JpLWxlYWZsZXQtY2x1c3RlciAtIHYyLjAuMCAtIFRodSBBdWcgMTggMjAxNiAxNzoxMjo0MyBHTVQtMDcwMCAoUERUKVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEVudmlyb25tZW50YWwgU3lzdGVtcyBSZXNlYXJjaCBJbnN0aXR1dGUsIEluYy5cbiAqIEFwYWNoZS0yLjAgKi9cblxudmFyIHZlcnNpb24gPSBcIjIuMC4wXCI7XG5cbnZhciBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyID0gZXNyaS5GZWF0dXJlTWFuYWdlci5leHRlbmQoe1xuXG4gIHN0YXRpY3M6IHtcbiAgICBFVkVOVFM6ICdjbGljayBkYmxjbGljayBtb3VzZW92ZXIgbW91c2VvdXQgbW91c2Vtb3ZlIGNvbnRleHRtZW51IHBvcHVwb3BlbiBwb3B1cGNsb3NlJyxcbiAgICBDTFVTVEVSRVZFTlRTOiAnY2x1c3RlcmNsaWNrIGNsdXN0ZXJkYmxjbGljayBjbHVzdGVybW91c2VvdmVyIGNsdXN0ZXJtb3VzZW91dCBjbHVzdGVybW91c2Vtb3ZlIGNsdXN0ZXJjb250ZXh0bWVudSdcbiAgfSxcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG5cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBlc3JpLkZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICBvcHRpb25zID0gVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG4gICAgdGhpcy5fbGVhZmxldElkcyA9IHt9O1xuXG4gICAgdGhpcy5jbHVzdGVyID0gbmV3IE1hcmtlckNsdXN0ZXJHcm91cChvcHRpb25zKTtcbiAgICB0aGlzLl9rZXkgPSAnYycgKyAoTWF0aC5yYW5kb20oKSAqIDFlOSkudG9TdHJpbmcoMzYpLnJlcGxhY2UoJy4nLCAnXycpO1xuXG4gICAgdGhpcy5jbHVzdGVyLmFkZEV2ZW50UGFyZW50KHRoaXMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBMYXllciBJbnRlcmZhY2VcbiAgICovXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBlc3JpLkZlYXR1cmVNYW5hZ2VyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gICAgdGhpcy5fbWFwLmFkZExheWVyKHRoaXMuY2x1c3Rlcik7XG5cbiAgICAvLyBOT1RFICEhISEhISFcbiAgICAvLyBVc2luZyB0aGlzIHR5cGUgb2YgbGF5ZXIgcmVxdWlyZXMgbWFwLm1heFpvb20gdG8gYmUgc2V0IGR1cmluZyBtYXAgY3JlYXRpb24hXG4gICAgLy8gISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIVxuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZXNyaS5GZWF0dXJlTWFuYWdlci5wcm90b3R5cGUub25SZW1vdmUuY2FsbCh0aGlzLCBtYXApO1xuICAgIHRoaXMuX21hcC5yZW1vdmVMYXllcih0aGlzLmNsdXN0ZXIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZWF0dXJlIE1hbmFnZW1lbnQgTWV0aG9kc1xuICAgKi9cblxuICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgIHZhciBtYXJrZXJzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gZmVhdHVyZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBnZW9qc29uID0gZmVhdHVyZXNbaV07XG4gICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbZ2VvanNvbi5pZF07XG5cbiAgICAgIGlmICghbGF5ZXIpIHtcbiAgICAgICAgdmFyIG5ld0xheWVyIDogYW55ID0gR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgbmV3TGF5ZXIuZmVhdHVyZSA9IEdlb0pTT04uYXNGZWF0dXJlKGdlb2pzb24pO1xuICAgICAgICBuZXdMYXllci5kZWZhdWx0T3B0aW9ucyA9IG5ld0xheWVyLm9wdGlvbnM7XG4gICAgICAgIG5ld0xheWVyLl9sZWFmbGV0X2lkID0gdGhpcy5fa2V5ICsgJ18nICsgZ2VvanNvbi5pZDtcblxuICAgICAgICAvLyB0aGlzLnJlc2V0U3R5bGUobmV3TGF5ZXIuZmVhdHVyZS5pZCk7XG4gICAgICAgIGxldCBzdHlsZSA9IHR5cGVvZih0aGlzLm9wdGlvbnMuc3R5bGUpID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZShuZXdMYXllci5mZWF0dXJlKSA6IHRoaXMub3B0aW9ucy5zdHlsZTtcbiAgICAgICAgbmV3TGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBsYXllclxuICAgICAgICB0aGlzLl9sYXllcnNbbmV3TGF5ZXIuZmVhdHVyZS5pZF0gPSBuZXdMYXllcjtcblxuICAgICAgICB0aGlzLl9sZWFmbGV0SWRzW25ld0xheWVyLl9sZWFmbGV0X2lkXSA9IGdlb2pzb24uaWQ7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUobmV3TGF5ZXIuZmVhdHVyZSwgbmV3TGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiBpdCBpcyB3aXRoaW4gdGhlIHRpbWUgYm91bmRzIG9yIG91ciBsYXllciBpcyBub3QgdGltZSBlbmFibGVkXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnRpbWVGaWVsZCB8fCAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCAmJiB0aGlzLl9mZWF0dXJlV2l0aGluVGltZVJhbmdlKGdlb2pzb24pKSkge1xuICAgICAgICAgIG1hcmtlcnMucHVzaChuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFya2Vycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2x1c3Rlci5hZGRMYXllcnMobWFya2Vycyk7XG4gICAgfVxuICB9LFxuXG4gIGFkZExheWVyczogZnVuY3Rpb24gKGlkcykge1xuICAgIHZhciBsYXllcnNUb0FkZCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZHNbaV1dO1xuICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvQWRkLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIuYWRkTGF5ZXJzKGxheWVyc1RvQWRkKTtcbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIHZhciBsYXllcnNUb1JlbW92ZSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2xheWVyc1tpZF0gJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIucmVtb3ZlTGF5ZXJzKGxheWVyc1RvUmVtb3ZlKTtcbiAgfSxcblxuICAvKipcbiAgICogU3R5bGluZyBNZXRob2RzXG4gICAqL1xuXG4gIHJlc2V0U3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG5cbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIGxheWVyLm9wdGlvbnMgPSBsYXllci5kZWZhdWx0T3B0aW9ucztcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGU7XG4gICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcblxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XG4gICAgfVxuICAgIGlmIChsYXllci5zZXRTdHlsZSkge1xuICAgICAgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVXRpbGl0eSBNZXRob2RzXG4gICAqL1xuXG4gIGVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRGZWF0dXJlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgfVxufSk7XG5cbi8vIGZ1bmN0aW9uIGZlYXR1cmVMYXllciAob3B0aW9ucykge1xuLy8gICByZXR1cm4gbmV3IEZlYXR1cmVMYXllcihvcHRpb25zKTtcbi8vIH1cbi8vXG4vLyBleHBvcnQge1xuLy8gICAgIEZlYXR1cmVMYXllcixcbi8vICAgICBmZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbi8vICAgICB2ZXJzaW9uIGFzIFZFUlNJT05cbi8vIH1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllcjtcbiJdfQ==