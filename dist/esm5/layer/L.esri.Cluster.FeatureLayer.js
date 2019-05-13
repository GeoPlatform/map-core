/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import "leaflet.markercluster";
import { Util, MarkerClusterGroup, GeoJSON } from 'leaflet';
import * as esri from "esri-leaflet";
/** @type {?} */
var version = "2.0.0";
var ɵ0 = function (options) {
    esri.FeatureManager.prototype.initialize.call(this, options);
    options = Util.setOptions(this, options);
    this._layers = {};
    this._leafletIds = {};
    this.cluster = new MarkerClusterGroup(options);
    this._key = 'c' + (Math.random() * 1e9).toString(36).replace('.', '_');
    this.cluster.addEventParent(this);
}, ɵ1 = function (map) {
    esri.FeatureManager.prototype.onAdd.call(this, map);
    this._map.addLayer(this.cluster);
    // NOTE !!!!!!!
    // Using this type of layer requires map.maxZoom to be set during map creation!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}, ɵ2 = function (map) {
    esri.FeatureManager.prototype.onRemove.call(this, map);
    this._map.removeLayer(this.cluster);
}, ɵ3 = function (features) {
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
}, ɵ4 = function (ids) {
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
}, ɵ5 = function (ids, permanent) {
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
}, ɵ6 = function (id) {
    /** @type {?} */
    var layer = this._layers[id];
    if (layer) {
        layer.options = layer.defaultOptions;
        this.setFeatureStyle(layer.feature.id, this.options.style);
    }
    return this;
}, ɵ7 = function (style) {
    this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }, this);
    return this;
}, ɵ8 = function (id, style) {
    /** @type {?} */
    var layer = this._layers[id];
    if (typeof style === 'function') {
        style = style(layer.feature);
    }
    if (layer.setStyle) {
        layer.setStyle(style);
    }
}, ɵ9 = function (fn, context) {
    for (var i in this._layers) {
        fn.call(context, this._layers[i]);
    }
    return this;
}, ɵ10 = function (id) {
    return this._layers[id];
};
/** @type {?} */
var FeatureLayer = esri.FeatureManager.extend({
    statics: {
        EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose',
        CLUSTEREVENTS: 'clusterclick clusterdblclick clustermouseover clustermouseout clustermousemove clustercontextmenu'
    },
    /**
       * Constructor
       */
    initialize: ɵ0,
    /**
       * Layer Interface
       */
    onAdd: ɵ1,
    onRemove: ɵ2,
    /**
       * Feature Management Methods
       */
    createLayers: ɵ3,
    addLayers: ɵ4,
    removeLayers: ɵ5,
    /**
       * Styling Methods
       */
    resetStyle: ɵ6,
    setStyle: ɵ7,
    setFeatureStyle: ɵ8,
    /**
       * Utility Methods
       */
    eachFeature: ɵ9,
    getFeature: ɵ10
});
/**
 * @param {?} options
 * @return {?}
 */
function featureLayer(options) {
    return new FeatureLayer(options);
}
export { FeatureLayer, featureLayer as default, version as VERSION };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5lc3JpLkNsdXN0ZXIuRmVhdHVyZUxheWVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZ2VvcGxhdGZvcm0ubWFwLyIsInNvdXJjZXMiOlsibGF5ZXIvTC5lc3JpLkNsdXN0ZXIuRmVhdHVyZUxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzVELE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDOztBQU1yQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7U0FhUixVQUFVLE9BQU87SUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFN0QsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV2RSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNuQyxPQU1NLFVBQVUsR0FBRztJQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FB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QUVELGVBQWUsSUFTZDs7OztJQU1ELFdBQVcsSUFLVjtJQUVELFVBQVUsS0FFVDtDQUNGLENBQUMsQ0FBQzs7Ozs7QUFFSCxzQkFBdUIsT0FBTztJQUM1QixPQUFPLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ2xDO0FBRUQsT0FBTyxFQUNILFlBQVksRUFDWixZQUFZLElBQUksT0FBTyxFQUN2QixPQUFPLElBQUksT0FBTyxFQUNyQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXG5pbXBvcnQgKiBhcyBNYXJrZXJDbHVzdGVyIGZyb20gJ2xlYWZsZXQubWFya2VyY2x1c3Rlcic7XG5pbXBvcnQgXCJsZWFmbGV0Lm1hcmtlcmNsdXN0ZXJcIjtcbmltcG9ydCB7IFV0aWwsIE1hcmtlckNsdXN0ZXJHcm91cCwgR2VvSlNPTiB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0ICogYXMgZXNyaSBmcm9tIFwiZXNyaS1sZWFmbGV0XCI7XG5cbi8qIGVzcmktbGVhZmxldC1jbHVzdGVyIC0gdjIuMC4wIC0gVGh1IEF1ZyAxOCAyMDE2IDE3OjEyOjQzIEdNVC0wNzAwIChQRFQpXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgRW52aXJvbm1lbnRhbCBTeXN0ZW1zIFJlc2VhcmNoIEluc3RpdHV0ZSwgSW5jLlxuICogQXBhY2hlLTIuMCAqL1xuXG52YXIgdmVyc2lvbiA9IFwiMi4wLjBcIjtcblxudmFyIEZlYXR1cmVMYXllciA9IGVzcmkuRmVhdHVyZU1hbmFnZXIuZXh0ZW5kKHtcblxuICBzdGF0aWNzOiB7XG4gICAgRVZFTlRTOiAnY2xpY2sgZGJsY2xpY2sgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBjb250ZXh0bWVudSBwb3B1cG9wZW4gcG9wdXBjbG9zZScsXG4gICAgQ0xVU1RFUkVWRU5UUzogJ2NsdXN0ZXJjbGljayBjbHVzdGVyZGJsY2xpY2sgY2x1c3Rlcm1vdXNlb3ZlciBjbHVzdGVybW91c2VvdXQgY2x1c3Rlcm1vdXNlbW92ZSBjbHVzdGVyY29udGV4dG1lbnUnXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgZXNyaS5GZWF0dXJlTWFuYWdlci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgb3B0aW9ucyA9IFV0aWwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuICAgIHRoaXMuX2xlYWZsZXRJZHMgPSB7fTtcblxuICAgIHRoaXMuY2x1c3RlciA9IG5ldyBNYXJrZXJDbHVzdGVyR3JvdXAob3B0aW9ucyk7XG4gICAgdGhpcy5fa2V5ID0gJ2MnICsgKE1hdGgucmFuZG9tKCkgKiAxZTkpLnRvU3RyaW5nKDM2KS5yZXBsYWNlKCcuJywgJ18nKTtcblxuICAgIHRoaXMuY2x1c3Rlci5hZGRFdmVudFBhcmVudCh0aGlzKTtcbiAgfSxcblxuICAvKipcbiAgICogTGF5ZXIgSW50ZXJmYWNlXG4gICAqL1xuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgZXNyaS5GZWF0dXJlTWFuYWdlci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuICAgIHRoaXMuX21hcC5hZGRMYXllcih0aGlzLmNsdXN0ZXIpO1xuXG4gICAgLy8gTk9URSAhISEhISEhXG4gICAgLy8gVXNpbmcgdGhpcyB0eXBlIG9mIGxheWVyIHJlcXVpcmVzIG1hcC5tYXhab29tIHRvIGJlIHNldCBkdXJpbmcgbWFwIGNyZWF0aW9uIVxuICAgIC8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIGVzcmkuRmVhdHVyZU1hbmFnZXIucHJvdG90eXBlLm9uUmVtb3ZlLmNhbGwodGhpcywgbWFwKTtcbiAgICB0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5jbHVzdGVyKTtcbiAgfSxcblxuICAvKipcbiAgICogRmVhdHVyZSBNYW5hZ2VtZW50IE1ldGhvZHNcbiAgICovXG5cbiAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICB2YXIgbWFya2VycyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IGZlYXR1cmVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZ2VvanNvbiA9IGZlYXR1cmVzW2ldO1xuICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2dlb2pzb24uaWRdO1xuXG4gICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgIHZhciBuZXdMYXllciA6IGFueSA9IEdlb0pTT04uZ2VvbWV0cnlUb0xheWVyKGdlb2pzb24sIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIG5ld0xheWVyLmZlYXR1cmUgPSBHZW9KU09OLmFzRmVhdHVyZShnZW9qc29uKTtcbiAgICAgICAgbmV3TGF5ZXIuZGVmYXVsdE9wdGlvbnMgPSBuZXdMYXllci5vcHRpb25zO1xuICAgICAgICBuZXdMYXllci5fbGVhZmxldF9pZCA9IHRoaXMuX2tleSArICdfJyArIGdlb2pzb24uaWQ7XG5cbiAgICAgICAgdGhpcy5yZXNldFN0eWxlKG5ld0xheWVyLmZlYXR1cmUuaWQpO1xuXG4gICAgICAgIC8vIGNhY2hlIHRoZSBsYXllclxuICAgICAgICB0aGlzLl9sYXllcnNbbmV3TGF5ZXIuZmVhdHVyZS5pZF0gPSBuZXdMYXllcjtcblxuICAgICAgICB0aGlzLl9sZWFmbGV0SWRzW25ld0xheWVyLl9sZWFmbGV0X2lkXSA9IGdlb2pzb24uaWQ7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm9uRWFjaEZlYXR1cmUobmV3TGF5ZXIuZmVhdHVyZSwgbmV3TGF5ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdjcmVhdGVmZWF0dXJlJywge1xuICAgICAgICAgIGZlYXR1cmU6IG5ld0xheWVyLmZlYXR1cmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBsYXllciBpZiBpdCBpcyB3aXRoaW4gdGhlIHRpbWUgYm91bmRzIG9yIG91ciBsYXllciBpcyBub3QgdGltZSBlbmFibGVkXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnRpbWVGaWVsZCB8fCAodGhpcy5vcHRpb25zLnRpbWVGaWVsZCAmJiB0aGlzLl9mZWF0dXJlV2l0aGluVGltZVJhbmdlKGdlb2pzb24pKSkge1xuICAgICAgICAgIG1hcmtlcnMucHVzaChuZXdMYXllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFya2Vycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2x1c3Rlci5hZGRMYXllcnMobWFya2Vycyk7XG4gICAgfVxuICB9LFxuXG4gIGFkZExheWVyczogZnVuY3Rpb24gKGlkcykge1xuICAgIHZhciBsYXllcnNUb0FkZCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZHNbaV1dO1xuICAgICAgdGhpcy5maXJlKCdhZGRmZWF0dXJlJywge1xuICAgICAgICBmZWF0dXJlOiBsYXllci5mZWF0dXJlXG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvQWRkLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIuYWRkTGF5ZXJzKGxheWVyc1RvQWRkKTtcbiAgfSxcblxuICByZW1vdmVMYXllcnM6IGZ1bmN0aW9uIChpZHMsIHBlcm1hbmVudCkge1xuICAgIHZhciBsYXllcnNUb1JlbW92ZSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBpZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBpZCA9IGlkc1tpXTtcbiAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICB0aGlzLmZpcmUoJ3JlbW92ZWZlYXR1cmUnLCB7XG4gICAgICAgIGZlYXR1cmU6IGxheWVyLmZlYXR1cmUsXG4gICAgICAgIHBlcm1hbmVudDogcGVybWFuZW50XG4gICAgICB9KTtcbiAgICAgIGxheWVyc1RvUmVtb3ZlLnB1c2gobGF5ZXIpO1xuICAgICAgaWYgKHRoaXMuX2xheWVyc1tpZF0gJiYgcGVybWFuZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsdXN0ZXIucmVtb3ZlTGF5ZXJzKGxheWVyc1RvUmVtb3ZlKTtcbiAgfSxcblxuICAvKipcbiAgICogU3R5bGluZyBNZXRob2RzXG4gICAqL1xuXG4gIHJlc2V0U3R5bGU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG5cbiAgICBpZiAobGF5ZXIpIHtcbiAgICAgIGxheWVyLm9wdGlvbnMgPSBsYXllci5kZWZhdWx0T3B0aW9ucztcbiAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHRoaXMub3B0aW9ucy5zdHlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xuICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgfSwgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgc2V0RmVhdHVyZVN0eWxlOiBmdW5jdGlvbiAoaWQsIHN0eWxlKSB7XG4gICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcblxuICAgIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHN0eWxlID0gc3R5bGUobGF5ZXIuZmVhdHVyZSk7XG4gICAgfVxuICAgIGlmIChsYXllci5zZXRTdHlsZSkge1xuICAgICAgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogVXRpbGl0eSBNZXRob2RzXG4gICAqL1xuXG4gIGVhY2hGZWF0dXJlOiBmdW5jdGlvbiAoZm4sIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xuICAgICAgZm4uY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRGZWF0dXJlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGZlYXR1cmVMYXllciAob3B0aW9ucykge1xuICByZXR1cm4gbmV3IEZlYXR1cmVMYXllcihvcHRpb25zKTtcbn1cblxuZXhwb3J0IHtcbiAgICBGZWF0dXJlTGF5ZXIsXG4gICAgZmVhdHVyZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgdmVyc2lvbiBhcyBWRVJTSU9OXG59XG4iXX0=