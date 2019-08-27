/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { Config } from '@geoplatform/client';
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import BaseClusteredFeatureLayer from './base-clustered-feature-layer';
import featureStyleResolver from '../shared/style-resolver';
import featurePopupTemplate from '../shared/popup-template';
var ɵ0 = function (feature, latlng) {
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
    var marker = null;
    if (style.shape === 'image') {
        /** @type {?} */
        var width = style.width || 16;
        /** @type {?} */
        var height = style.height || 16;
        /** @type {?} */
        var icon = iconFn({
            iconUrl: style.content,
            //base64 encoded string
            iconSize: [width, height],
            iconAnchor: [width * 0.5, height * 0.5],
            popupAnchor: [0, -11],
        });
        /** @type {?} */
        var mopts = { icon: icon };
        if (Config.leafletPane)
            (/** @type {?} */ (mopts)).pane = Config.leafletPane;
        marker = markerFn(latlng, mopts);
    }
    else {
        marker = circleMarkerFn(latlng, style);
    }
    /** @type {?} */
    var popupTemplate = this.options.popupTemplate || featurePopupTemplate;
    marker.bindPopup(popupTemplate(feature));
    return marker;
}, ɵ1 = function (feature, layer) {
    if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
        return;
    }
    layer.bindPopup(featurePopupTemplate(feature));
}, ɵ2 = function (options) {
    var _this = this;
    /** @type {?} */
    var self = this;
    options = options || {};
    if (Config.leafletPane)
        options.pane = Config.leafletPane;
    options.pointToLayer = Util.bind(this.pointToLayerFn, this);
    options.onEachFeature = Util.bind(this.eachFeatureFn, this);
    // options.fields = ['FID', 'type', 'title', 'geometry'];
    //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
    // This needs to be increased to ensure all markers can be clicked
    // when spiderfied (some get stuck under the spider legs)
    options.spiderfyDistanceMultiplier = 2;
    /** @type {?} */
    var getGPStyle = function () { return _this._gpStyle; };
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    /** @type {?} */
    var svgOpts = {};
    if (Config.leafletPane)
        (/** @type {?} */ (svgOpts)).pane = Config.leafletPane;
    /** @type {?} */
    var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
    options.renderer = renderer;
    BaseClusteredFeatureLayer.prototype.initialize.call(this, options);
    this.on('load', function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    });
}, ɵ3 = function (map) {
    BaseClusteredFeatureLayer.prototype.onAdd.call(this, map);
    if (this.options.layerId) {
        this.loadStyle(this.options.layerId);
    }
}, ɵ4 = function (features) {
    BaseClusteredFeatureLayer.prototype.createLayers.call(this, features);
    this.setVisibility(this.currentVisibility);
    this.setOpacity(this.currentOpacity);
}, ɵ5 = function (index) {
    this.options.zIndex = index;
    for (var id in this._layers) {
        /** @type {?} */
        var lyr = this._layers[id];
        if (lyr.setZIndex)
            lyr.setZIndex(index);
        else if (lyr._updateZIndex)
            lyr._updateZIndex(index);
        else if (lyr._renderer && lyr._renderer._container) {
            lyr._renderer._container.style.zIndex = index;
        }
        else {
            // console.log("Clustered feature layer child " + id + " does not support ordering using z-index");
        }
    }
}, ɵ6 = function () {
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
}, ɵ7 = function (bool) {
    this.currentVisibility = !!bool;
    if (this.options.renderer._container) {
        this.options.renderer._container.style.display = bool ? '' : 'none';
    }
    //clustered features
    if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
        for (var id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            var layer = this.cluster._featureGroup._layers[id];
            if (layer._icon) {
                /** @type {?} */
                var icon = jQuery(layer._icon);
                if (bool)
                    icon.removeClass('invisible');
                else
                    icon.addClass('invisible');
            }
        }
    }
    //non-clustered features
    if (this._layers) {
        for (var id in this._layers) {
            /** @type {?} */
            var layer = this._layers[id];
            if (layer.setVisibility)
                layer.setVisibility(bool);
            else if (layer.setStyle)
                layer.setStyle({ display: bool ? '' : 'none' });
        }
    }
}, ɵ8 = function (opacity) {
    this.currentOpacity = isNaN(opacity) ? 1.0 : opacity * 1;
    //clustered features
    if (this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
        for (var id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            var layer = this.cluster._featureGroup._layers[id];
            if (layer._icon) {
                jQuery(layer._icon).css({ opacity: opacity });
            }
        }
    }
    //non-clustered features
    if (this._layers) {
        for (var id in this._layers) {
            /** @type {?} */
            var layer = this._layers[id];
            if (layer.setOpacity)
                layer.setOpacity(opacity);
        }
    }
}, ɵ9 = function (style) {
    this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }, this);
}, ɵ10 = function (gpLayerId) {
    var _this = this;
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId)
            .then(function (json) {
            if (!json)
                return;
            /** @type {?} */
            var style = null;
            if (json && json.styles) {
                /** @type {?} */
                var featureFn_1 = function (feature) {
                    /** @type {?} */
                    var property = this.property || this.field1;
                    /** @type {?} */
                    var v = feature[property] || (feature.properties ? feature.properties[property] : null);
                    /** @type {?} */
                    var style = null;
                    if (this.styles) {
                        /** @type {?} */
                        var wrapper = this.styles.find(function (sw) { return sw.value === v; });
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
                var styleFn = function () { return featureFn_1(json); };
                _this.options.style = styleFn;
                setTimeout(function (layer, style) { layer.setStyle(style); }, 1000, _this, styleFn);
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
                var obj = jQuery.extend({}, style);
                obj.style = style;
                _this._gpStyle = style;
                //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                // non-clustered features.
                // this.setStyle(obj);
                //So instead, we manually set it on all features of the layer (that aren't clustered)
                for (var id in _this._layers)
                    _this._layers[id].setStyle(obj);
            }
        })
            .catch(function (e) {
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
    pointToLayerFn: ɵ0,
    /**
         * for all non-point features, bind a popup
         * @param {object} feature - GeoJSON feature
         * @param {L.Layer} layer - layer representing feature
         */
    eachFeatureFn: ɵ1,
    initialize: ɵ2,
    onAdd: ɵ3,
    /** override super class' method to set viz/opac after sub layers created */
    createLayers: ɵ4,
    /**
         * @param {integer} index
         */
    setZIndex: ɵ5,
    /** */
    toggleVisibility: ɵ6,
    /**
         * @param {boolean} bool - flag
         */
    setVisibility: ɵ7,
    /**
         * @param {number} opacity
         */
    setOpacity: ɵ8,
    setStyle: ɵ9,
    loadStyle: ɵ10
});
/**
 * @param {?} layer - GeoPlatform Layer object
 * @param {?} options - optional properties
 * @return {?} leaflet layer instance or null
 */
function clusteredFeatures(layer, options) {
    /** @type {?} */
    var service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        var msg = "clusteredFeatures() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
        throw new Error(msg);
    }
    /** @type {?} */
    var url = service.href;
    /** @type {?} */
    var format = layer.supportedFormats ? layer.supportedFormats[0] : null;
    /** @type {?} */
    var styleResolver = options && options.styleResolver ?
        options.styleResolver : featureStyleResolver;
    /** @type {?} */
    var opts = {
        url: url + '/' + layer.layerName,
        styleLoader: styleResolver,
        layerId: layer.id
    };
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
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
    var service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if (!service) {
        /** @type {?} */
        var msg = "geoJsonFeed() -\n                  Cannot create leaflet layer for GP Layer:\n                  layer has no service";
        throw new Error(msg);
    }
    /** @type {?} */
    var url = service.href;
    /** @type {?} */
    var format = layer.supportedFormats ? layer.supportedFormats[0] : null;
    /** @type {?} */
    var layerUrl = url + (url[url.length - 1] === '/' ? '' : '/') +
        layer.id + '/FeatureServer/' + layer.layerName;
    /** @type {?} */
    var styleUrl = url.replace('feeds', 'styles') +
        (url[url.length - 1] === '/' ? '' : '/') + layer.id;
    /** @type {?} */
    var styleLoaderFactory = function (url) {
        return function (layerId) {
            return new Promise(function (resolve, reject) {
                if (!jQuery) {
                    reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                }
                jQuery.ajax(url, {
                    dataType: 'json',
                    success: function (data) { resolve(data); },
                    error: function (xhr, status, message) {
                        /** @type {?} */
                        var em = "geoJsonFeed() -\n                            Error loading style information for layer " + layerId + " : " + message;
                        reject(new Error(em));
                    }
                });
            });
        };
    };
    /** @type {?} */
    var opts = {
        url: layerUrl,
        isModern: true,
        //force to use GeoJSON
        layerId: layer.id,
        //used by style loader
        styleLoader: styleLoaderFactory(styleUrl)
    };
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFFSCxJQUFJLElBQUksTUFBTSxFQUNkLE1BQU0sSUFBSSxRQUFRLEVBQ2xCLFlBQVksSUFBSSxjQUFjLEVBQzlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUVQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8seUJBQXlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO1NBb0J4QyxVQUFVLE9BQU8sRUFBRSxNQUFNOztJQUVyQyxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFOztRQUVuRCxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtLQUNKO0lBRUQsS0FBSyxH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QWlCLEVBQ2pCLFdBQVcsRUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IHtcbiAgICBDb250cm9sLFxuICAgIGljb24gYXMgaWNvbkZuLFxuICAgIG1hcmtlciBhcyBtYXJrZXJGbixcbiAgICBjaXJjbGVNYXJrZXIgYXMgY2lyY2xlTWFya2VyRm4sXG4gICAgU1ZHLCBzdmcsIENhbnZhcywgY2FudmFzLFxuICAgIFV0aWwsXG4gICAgTGF5ZXJcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyIGZyb20gJy4vYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllcic7XG5pbXBvcnQgZmVhdHVyZVN0eWxlUmVzb2x2ZXIgZnJvbSAnLi4vc2hhcmVkL3N0eWxlLXJlc29sdmVyJztcbmltcG9ydCBmZWF0dXJlUG9wdXBUZW1wbGF0ZSBmcm9tICcuLi9zaGFyZWQvcG9wdXAtdGVtcGxhdGUnO1xuXG5cbi8qKlxuICogQ2x1c3RlcmVkIEZlYXR1cmUgTGF5ZXJcbiAqIFByb3ZpZGVzIGN1c3RvbSBzdHlsZSBsb2FkaW5nIGFuZCBwb2ludC1pbGl6YXRpb24gYXMgd2VsbFxuICogYXMgYWRkaW5nIHZpc2liaWxpdHkgYW5kIG9wYWNpdHkgbWFuaXB1bGF0aW9uIG1ldGhvZHNcbiAqL1xudmFyIENsdXN0ZXJlZEZlYXR1cmVMYXllciA9IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIuZXh0ZW5kKHtcblxuICAgIGN1cnJlbnRWaXNpYmlsaXR5OiB0cnVlLFxuICAgIGN1cnJlbnRPcGFjaXR5OiAxLjAsXG5cbiAgICBfZ3BTdHlsZSA6IHsgY29sb3I6IFwiIzAwZlwiLCB3ZWlnaHQ6IDIsIGZpbGxDb2xvcjogJyMwMGYnLCBmaWxsT3BhY2l0eTogMC4zIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gUG9pbnQgRmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXRMbmd9IGxhdGxuZ1xuICAgICAqIEByZXR1cm4ge0wuTWFya2VyfVxuICAgICAqL1xuICAgIHBvaW50VG9MYXllckZuOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nKSB7XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZmVhdHVyZSAmJiBmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXMuc3R5bGUgOiBudWxsO1xuICAgICAgICBpZighc3R5bGUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBsb2NhbCBzdHlsZSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGUoZmVhdHVyZSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHVzaW5nIHN0eWxlIGZ1bmN0aW9uIGluIENsdXN0ZXJlZEZlYXR1cmVMYXllcjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUgPSBzdHlsZSB8fCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwge307XG4gICAgICAgIHN0eWxlLnJhZGl1cyAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICBzdHlsZS53ZWlnaHQgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgc3R5bGUuY29sb3IgICAgICAgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5vcGFjaXR5ICAgICA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgc3R5bGUuZmlsbENvbG9yICAgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUucmVuZGVyZXIgICAgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7ICAvL2ltcG9ydGFudCBmb3IgcGFuZSFcblxuICAgICAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYoc3R5bGUuc2hhcGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHN0eWxlLndpZHRoIHx8IDE2O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHN0eWxlLmhlaWdodCB8fCAxNjtcbiAgICAgICAgICAgIHZhciBpY29uID0gaWNvbkZuKCB7XG4gICAgICAgICAgICAgICAgaWNvblVybDogc3R5bGUuY29udGVudCwgLy9iYXNlNjQgZW5jb2RlZCBzdHJpbmdcbiAgICAgICAgICAgICAgICBpY29uU2l6ZTogW3dpZHRoLCBoZWlnaHRdLFxuICAgICAgICAgICAgICAgIGljb25BbmNob3I6IFt3aWR0aCowLjUsIGhlaWdodCowLjVdLFxuICAgICAgICAgICAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTExXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IG1vcHRzID0geyBpY29uOiBpY29uIH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChtb3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICBtYXJrZXIgPSBtYXJrZXJGbiggbGF0bG5nLCBtb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXIgPSBjaXJjbGVNYXJrZXJGbihsYXRsbmcsIHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3B1cFRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnBvcHVwVGVtcGxhdGUgfHwgZmVhdHVyZVBvcHVwVGVtcGxhdGU7XG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZm9yIGFsbCBub24tcG9pbnQgZmVhdHVyZXMsIGJpbmQgYSBwb3B1cFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBmZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxheWVyfSBsYXllciAtIGxheWVyIHJlcHJlc2VudGluZyBmZWF0dXJlXG4gICAgICovXG4gICAgZWFjaEZlYXR1cmVGbjogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgaWYoIWZlYXR1cmUgfHwgIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuYmluZFBvcHVwKGZlYXR1cmVQb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcbiAgICB9LFxuXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIG9wdGlvbnMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgICAgICBvcHRpb25zLnBvaW50VG9MYXllciA9IFV0aWwuYmluZCh0aGlzLnBvaW50VG9MYXllckZuLCB0aGlzKTtcbiAgICAgICAgb3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gVXRpbC5iaW5kKHRoaXMuZWFjaEZlYXR1cmVGbiwgdGhpcyk7XG4gICAgICAgIC8vIG9wdGlvbnMuZmllbGRzID0gWydGSUQnLCAndHlwZScsICd0aXRsZScsICdnZW9tZXRyeSddO1xuXG4gICAgICAgIC8vSW5jcmVhc2UgZnJvbSAxIHRvIGluY3JlYXNlIHRoZSBkaXN0YW5jZSBhd2F5IGZyb20gdGhlIGNlbnRlciB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcmUgcGxhY2VkLlxuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGluY3JlYXNlZCB0byBlbnN1cmUgYWxsIG1hcmtlcnMgY2FuIGJlIGNsaWNrZWRcbiAgICAgICAgLy8gd2hlbiBzcGlkZXJmaWVkIChzb21lIGdldCBzdHVjayB1bmRlciB0aGUgc3BpZGVyIGxlZ3MpXG4gICAgICAgIG9wdGlvbnMuc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgPSAyO1xuXG4gICAgICAgIGxldCBnZXRHUFN0eWxlID0gKCkgPT4geyByZXR1cm4gdGhpcy5fZ3BTdHlsZTsgfTtcbiAgICAgICAgb3B0aW9ucy5zdHlsZSA9IG9wdGlvbnMuc3R5bGUgfHwgZ2V0R1BTdHlsZTtcbiAgICAgICAgaWYob3B0aW9ucy5zdHlsZVJlc29sdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zLnN0eWxlUmVzb2x2ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvL2luIG9yZGVyIHRvIHB1dCBmZWF0dXJlcy1iYXNlZCBsYXllcnMgaW50byBzYW1lIHBhbmUgYXMgdGlsZSBsYXllcnMsXG4gICAgICAgIC8vIG11c3Qgc3BlY2lmeSByZW5kZXJlciBhbmQgc2V0IGRlc2lyZWQgcGFuZSBvbiB0aGF0XG4gICAgICAgIGxldCBzdmdPcHRzID0geyB9O1xuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAoc3ZnT3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgIHZhciByZW5kZXJlciA9IChTVkcgJiYgc3ZnKHN2Z09wdHMpKSB8fCAoQ2FudmFzICYmIGNhbnZhcygpKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRaSW5kZXgodGhpcy5vcHRpb25zLnpJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5sYXllcklkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdHlsZSh0aGlzLm9wdGlvbnMubGF5ZXJJZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIG92ZXJyaWRlIHN1cGVyIGNsYXNzJyBtZXRob2QgdG8gc2V0IHZpei9vcGFjIGFmdGVyIHN1YiBsYXllcnMgY3JlYXRlZCAqL1xuICAgIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmNyZWF0ZUxheWVycy5jYWxsKHRoaXMsIGZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuICAgICAgICB0aGlzLnNldE9wYWNpdHkodGhpcy5jdXJyZW50T3BhY2l0eSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZXRaSW5kZXggOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnpJbmRleCA9IGluZGV4O1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuXG4gICAgICAgICAgICBsZXQgbHlyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgIGlmKGx5ci5zZXRaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLnNldFpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fdXBkYXRlWkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5fdXBkYXRlWkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl9yZW5kZXJlciAmJiBseXIuX3JlbmRlcmVyLl9jb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lci5zdHlsZS56SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDbHVzdGVyZWQgZmVhdHVyZSBsYXllciBjaGlsZCBcIiArIGlkICsgXCIgZG9lcyBub3Qgc3VwcG9ydCBvcmRlcmluZyB1c2luZyB6LWluZGV4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiAqL1xuICAgIHRvZ2dsZVZpc2liaWxpdHk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhdGhpcy5jdXJyZW50VmlzaWJpbGl0eTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuXG4gICAgICAgIC8vIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgLy8gICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLnRvZ2dsZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBib29sIC0gZmxhZ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHk6IGZ1bmN0aW9uKGJvb2wpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gISFib29sO1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5yZW5kZXJlci5fY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVuZGVyZXIuX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gYm9vbCA/ICcnIDogJ25vbmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJvYmFibHkgaXMgYSBtb3JlIGVmZmljaWVudCB3YXkgdG8gZG8gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHRoaXMgd29ya3MgY3VycmVudGx5LlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGxvb2sgYXQgdXNpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gIG1hcmtlckNsdXN0ZXIucmVmcmVzaEljb25PcHRpb25zKHtjbGFzc05hbWU6J2ludmlzaWJsZSd9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGljb24gPSBqUXVlcnkobGF5ZXIuX2ljb24pO1xuICAgICAgICAgICAgICAgICAgICBpZihib29sKSBpY29uLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0VmlzaWJpbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShib29sKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGxheWVyLnNldFN0eWxlKVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRTdHlsZSh7ZGlzcGxheTogYm9vbCA/ICcnOidub25lJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcGFjaXR5XG4gICAgICovXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24ob3BhY2l0eSkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudE9wYWNpdHkgPSBpc05hTihvcGFjaXR5KSA/IDEuMCA6IG9wYWNpdHkqMTtcblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS5jc3Moe29wYWNpdHk6IG9wYWNpdHl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0T3BhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdHlsZTogZnVuY3Rpb24oc3R5bGUpIHtcbiAgICAgICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIGxvYWRTdHlsZTogZnVuY3Rpb24oZ3BMYXllcklkKSB7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIoZ3BMYXllcklkKVxuICAgICAgICAgICAgLnRoZW4oIGpzb24gPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIWpzb24pIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihqc29uICYmIGpzb24uc3R5bGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVGbiA9IGZ1bmN0aW9uKGZlYXR1cmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0eSB8fCB0aGlzLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZmVhdHVyZVtwcm9wZXJ0eV0gfHwgKGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllc1twcm9wZXJ0eV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5zdHlsZXMuZmluZCggc3cgPT4gc3cudmFsdWUgPT09IHYgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gd3JhcHBlci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBtYXRjaGluZyBzdHlsZSBmb3IgXCIgKyBKU09OLnN0cmluZ2lmeShmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIHN0eWxlOiBcIiArIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUZuID0gKCkgPT4geyByZXR1cm4gZmVhdHVyZUZuKGpzb24pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAobGF5ZXIsIHN0eWxlKSA9PiB7IGxheWVyLnNldFN0eWxlKHN0eWxlKTsgfSwgMTAwMCwgdGhpcywgc3R5bGVGbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uICYmIHR5cGVvZihqc29uLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL211bHRpcGxlIHN0eWxlcyByZXR1cm5lZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb25bMF07ICAvL3VzZSBmaXJzdCBmb3Igbm93XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb247XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vdW5yZWNvZ25pemFibGUgc3R5bGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdHlsZS5zaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0galF1ZXJ5LmV4dGVuZCh7fSwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBvYmouc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3BTdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0U3R5bGUgb24gQ2x1c3Rlci5GZWF0dXJlTGF5ZXIgZG9lc24ndCBhcHBlYXIgdG8gd29yayBjb25zaXN0ZW50bHkgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vbi1jbHVzdGVyZWQgZmVhdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3R5bGUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy9TbyBpbnN0ZWFkLCB3ZSBtYW51YWxseSBzZXQgaXQgb24gYWxsIGZlYXR1cmVzIG9mIHRoZSBsYXllciAodGhhdCBhcmVuJ3QgY2x1c3RlcmVkKVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0uc2V0U3R5bGUob2JqKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZmVhdHVyZSBsYXllciBzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgY2x1c3RlcmVkRmVhdHVyZXMoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBzdHlsZVJlc29sdmVyID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgP1xuICAgICAgICBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgOiBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IHVybCArICcvJyArIGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgc3R5bGVMb2FkZXI6IHN0eWxlUmVzb2x2ZXIsXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBnZW9Kc29uRmVlZChsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGdlb0pzb25GZWVkKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgbGF5ZXJVcmwgPSB1cmwgKyAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArXG4gICAgICAgIGxheWVyLmlkICsgJy9GZWF0dXJlU2VydmVyLycgKyBsYXllci5sYXllck5hbWU7XG5cbiAgICBsZXQgc3R5bGVVcmwgPSB1cmwucmVwbGFjZSgnZmVlZHMnLCdzdHlsZXMnKSArXG4gICAgICAgICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICsgbGF5ZXIuaWQ7XG5cbiAgICBsZXQgc3R5bGVMb2FkZXJGYWN0b3J5ID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobGF5ZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBHZW9KU09OIGZlZWQgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmFqYXgodXJsLCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOidqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkgeyByZXNvbHZlKGRhdGEpOyB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbSA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2xheWVySWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvcihlbSkgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IGxheWVyVXJsLFxuICAgICAgICBpc01vZGVybjogdHJ1ZSwgICAgICAgICAvL2ZvcmNlIHRvIHVzZSBHZW9KU09OXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkLCAgICAvL3VzZWQgYnkgc3R5bGUgbG9hZGVyXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZUxvYWRlckZhY3Rvcnkoc3R5bGVVcmwpXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xuXG59XG5cblxuZXhwb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn07XG4iXX0=