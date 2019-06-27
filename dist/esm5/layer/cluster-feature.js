/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as Q from "q";
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
        if (Config["leafletPane"])
            (/** @type {?} */ (mopts)).pane = Config["leafletPane"];
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
    var getGPStyle = function () { return _this._gpStyle; };
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    /** @type {?} */
    var svgOpts = {};
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
            /** @type {?} */
            var deferred = Q.defer();
            if (!jQuery) {
                deferred.reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                return deferred.promise;
            }
            jQuery.ajax(url, {
                dataType: 'json',
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (xhr, status, message) {
                    /** @type {?} */
                    var em = "geoJsonFeed() -\n                        Error loading style information for layer " + layerId + " : " + message;
                    /** @type {?} */
                    var error = new Error(em);
                    deferred.reject(error);
                }
            });
            return deferred.promise; //uses jQuery promise
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
    if (Config["leafletPane"])
        (/** @type {?} */ (opts)).pane = Config["leafletPane"];
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxLQUFLLENBQUMsTUFBTyxHQUFHLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFFSCxJQUFJLElBQUksTUFBTSxFQUNkLE1BQU0sSUFBSSxRQUFRLEVBQ2xCLFlBQVksSUFBSSxjQUFjLEVBQzlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUVQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8seUJBQXlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO1NBb0J4QyxVQUFVLE9BQU8sRUFBRSxNQUFNOztJQUVyQyxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFOztRQUVuRCxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxP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Q0FBQyxDQUFDO0NBRTFDO0FBR0QsT0FBTyxFQUNILHFCQUFxQixJQUFJLE9BQU8sRUFDaEMscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixXQUFXLEVBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tICBcInFcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQge1xuICAgIENvbnRyb2wsXG4gICAgaWNvbiBhcyBpY29uRm4sXG4gICAgbWFya2VyIGFzIG1hcmtlckZuLFxuICAgIGNpcmNsZU1hcmtlciBhcyBjaXJjbGVNYXJrZXJGbixcbiAgICBTVkcsIHN2ZywgQ2FudmFzLCBjYW52YXMsXG4gICAgVXRpbCxcbiAgICBMYXllclxufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgZnJvbSAnLi9iYXNlLWNsdXN0ZXJlZC1mZWF0dXJlLWxheWVyJztcbmltcG9ydCBmZWF0dXJlU3R5bGVSZXNvbHZlciBmcm9tICcuLi9zaGFyZWQvc3R5bGUtcmVzb2x2ZXInO1xuaW1wb3J0IGZlYXR1cmVQb3B1cFRlbXBsYXRlIGZyb20gJy4uL3NoYXJlZC9wb3B1cC10ZW1wbGF0ZSc7XG5cblxuLyoqXG4gKiBDbHVzdGVyZWQgRmVhdHVyZSBMYXllclxuICogUHJvdmlkZXMgY3VzdG9tIHN0eWxlIGxvYWRpbmcgYW5kIHBvaW50LWlsaXphdGlvbiBhcyB3ZWxsXG4gKiBhcyBhZGRpbmcgdmlzaWJpbGl0eSBhbmQgb3BhY2l0eSBtYW5pcHVsYXRpb24gbWV0aG9kc1xuICovXG52YXIgQ2x1c3RlcmVkRmVhdHVyZUxheWVyID0gQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5leHRlbmQoe1xuXG4gICAgY3VycmVudFZpc2liaWxpdHk6IHRydWUsXG4gICAgY3VycmVudE9wYWNpdHk6IDEuMCxcblxuICAgIF9ncFN0eWxlIDogeyBjb2xvcjogXCIjMDBmXCIsIHdlaWdodDogMiwgZmlsbENvbG9yOiAnIzAwZicsIGZpbGxPcGFjaXR5OiAwLjMgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBQb2ludCBGZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxhdExuZ30gbGF0bG5nXG4gICAgICogQHJldHVybiB7TC5NYXJrZXJ9XG4gICAgICovXG4gICAgcG9pbnRUb0xheWVyRm46IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcblxuICAgICAgICB2YXIgc3R5bGUgPSBmZWF0dXJlICYmIGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllcy5zdHlsZSA6IG51bGw7XG4gICAgICAgIGlmKCFzdHlsZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIGxvY2FsIHN0eWxlIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZShmZWF0dXJlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgdXNpbmcgc3R5bGUgZnVuY3Rpb24gaW4gQ2x1c3RlcmVkRmVhdHVyZUxheWVyOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZSA9IHN0eWxlIHx8IHRoaXMub3B0aW9ucy5zdHlsZSB8fCB7fTtcbiAgICAgICAgc3R5bGUucmFkaXVzICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgIHN0eWxlLndlaWdodCAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLndlaWdodCB8fCAyO1xuICAgICAgICBzdHlsZS5jb2xvciAgICAgICA9IHN0eWxlLnN0cm9rZSB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLm9wYWNpdHkgICAgID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICBzdHlsZS5maWxsQ29sb3IgICA9IHN0eWxlLmZpbGwgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5yZW5kZXJlciAgICA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjsgIC8vaW1wb3J0YW50IGZvciBwYW5lIVxuXG4gICAgICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgICAgICBpZihzdHlsZS5zaGFwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gc3R5bGUud2lkdGggfHwgMTY7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gc3R5bGUuaGVpZ2h0IHx8IDE2O1xuICAgICAgICAgICAgdmFyIGljb24gPSBpY29uRm4oIHtcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBzdHlsZS5jb250ZW50LCAvL2Jhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICAgICAgICAgICAgICAgIGljb25TaXplOiBbd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgaWNvbkFuY2hvcjogW3dpZHRoKjAuNSwgaGVpZ2h0KjAuNV0sXG4gICAgICAgICAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgbW9wdHMgPSB7IGljb246IGljb24gfTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG1vcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgIG1hcmtlciA9IG1hcmtlckZuKCBsYXRsbmcsIG1vcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlciA9IGNpcmNsZU1hcmtlckZuKGxhdGxuZywgc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvcHVwVGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucG9wdXBUZW1wbGF0ZSB8fCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChwb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBmb3IgYWxsIG5vbi1wb2ludCBmZWF0dXJlcywgYmluZCBhIHBvcHVwXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIGZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF5ZXJ9IGxheWVyIC0gbGF5ZXIgcmVwcmVzZW50aW5nIGZlYXR1cmVcbiAgICAgKi9cbiAgICBlYWNoRmVhdHVyZUZuOiBmdW5jdGlvbihmZWF0dXJlLCBsYXllcikge1xuICAgICAgICBpZighZmVhdHVyZSB8fCAhZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5iaW5kUG9wdXAoZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuICAgIH0sXG5cblxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgb3B0aW9ucy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgICAgIG9wdGlvbnMucG9pbnRUb0xheWVyID0gVXRpbC5iaW5kKHRoaXMucG9pbnRUb0xheWVyRm4sIHRoaXMpO1xuICAgICAgICBvcHRpb25zLm9uRWFjaEZlYXR1cmUgPSBVdGlsLmJpbmQodGhpcy5lYWNoRmVhdHVyZUZuLCB0aGlzKTtcbiAgICAgICAgLy8gb3B0aW9ucy5maWVsZHMgPSBbJ0ZJRCcsICd0eXBlJywgJ3RpdGxlJywgJ2dlb21ldHJ5J107XG5cbiAgICAgICAgLy9JbmNyZWFzZSBmcm9tIDEgdG8gaW5jcmVhc2UgdGhlIGRpc3RhbmNlIGF3YXkgZnJvbSB0aGUgY2VudGVyIHRoYXQgc3BpZGVyZmllZCBtYXJrZXJzIGFyZSBwbGFjZWQuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgaW5jcmVhc2VkIHRvIGVuc3VyZSBhbGwgbWFya2VycyBjYW4gYmUgY2xpY2tlZFxuICAgICAgICAvLyB3aGVuIHNwaWRlcmZpZWQgKHNvbWUgZ2V0IHN0dWNrIHVuZGVyIHRoZSBzcGlkZXIgbGVncylcbiAgICAgICAgb3B0aW9ucy5zcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgbGV0IGdldEdQU3R5bGUgPSAoKSA9PiB7IHJldHVybiB0aGlzLl9ncFN0eWxlOyB9O1xuICAgICAgICBvcHRpb25zLnN0eWxlID0gb3B0aW9ucy5zdHlsZSB8fCBnZXRHUFN0eWxlO1xuICAgICAgICBpZihvcHRpb25zLnN0eWxlUmVzb2x2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMuc3R5bGVSZXNvbHZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaW4gb3JkZXIgdG8gcHV0IGZlYXR1cmVzLWJhc2VkIGxheWVycyBpbnRvIHNhbWUgcGFuZSBhcyB0aWxlIGxheWVycyxcbiAgICAgICAgLy8gbXVzdCBzcGVjaWZ5IHJlbmRlcmVyIGFuZCBzZXQgZGVzaXJlZCBwYW5lIG9uIHRoYXRcbiAgICAgICAgbGV0IHN2Z09wdHMgPSB7IH07XG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIChzdmdPcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gKFNWRyAmJiBzdmcoc3ZnT3B0cykpIHx8IChDYW52YXMgJiYgY2FudmFzKCkpO1xuICAgICAgICBvcHRpb25zLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMuekluZGV4ICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLnNldFpJbmRleCh0aGlzLm9wdGlvbnMuekluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmxheWVySWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFN0eWxlKHRoaXMub3B0aW9ucy5sYXllcklkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogb3ZlcnJpZGUgc3VwZXIgY2xhc3MnIG1ldGhvZCB0byBzZXQgdml6L29wYWMgYWZ0ZXIgc3ViIGxheWVycyBjcmVhdGVkICovXG4gICAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUuY3JlYXRlTGF5ZXJzLmNhbGwodGhpcywgZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG4gICAgICAgIHRoaXMuc2V0T3BhY2l0eSh0aGlzLmN1cnJlbnRPcGFjaXR5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleFxuICAgICAqL1xuICAgIHNldFpJbmRleCA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuekluZGV4ID0gaW5kZXg7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cbiAgICAgICAgICAgIGxldCBseXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgaWYobHlyLnNldFpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuc2V0WkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl91cGRhdGVaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLl91cGRhdGVaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3JlbmRlcmVyICYmIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNsdXN0ZXJlZCBmZWF0dXJlIGxheWVyIGNoaWxkIFwiICsgaWQgKyBcIiBkb2VzIG5vdCBzdXBwb3J0IG9yZGVyaW5nIHVzaW5nIHotaW5kZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqICovXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICF0aGlzLmN1cnJlbnRWaXNpYmlsaXR5O1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG5cbiAgICAgICAgLy8gLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAvLyAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikudG9nZ2xlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJvb2wgLSBmbGFnXG4gICAgICovXG4gICAgc2V0VmlzaWJpbGl0eTogZnVuY3Rpb24oYm9vbCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhIWJvb2w7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnJlbmRlcmVyLl9jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZW5kZXJlci5fY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBib29sID8gJycgOiAnbm9uZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9iYWJseSBpcyBhIG1vcmUgZWZmaWNpZW50IHdheSB0byBkbyB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgdGhpcyB3b3JrcyBjdXJyZW50bHkuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbG9vayBhdCB1c2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyAgbWFya2VyQ2x1c3Rlci5yZWZyZXNoSWNvbk9wdGlvbnMoe2NsYXNzTmFtZTonaW52aXNpYmxlJ30pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGpRdWVyeShsYXllci5faWNvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJvb2wpIGljb24ucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGljb24uYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRWaXNpYmlsaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGJvb2wpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYobGF5ZXIuc2V0U3R5bGUpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFN0eWxlKHtkaXNwbGF5OiBib29sID8gJyc6J25vbmUnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHlcbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbihvcGFjaXR5KSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3BhY2l0eSA9IGlzTmFOKG9wYWNpdHkpID8gMS4wIDogb3BhY2l0eSoxO1xuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLmNzcyh7b3BhY2l0eTogb3BhY2l0eX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRPcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0eWxlOiBmdW5jdGlvbihzdHlsZSkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCwgc3R5bGUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgbG9hZFN0eWxlOiBmdW5jdGlvbihncExheWVySWQpIHtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcihncExheWVySWQpXG4gICAgICAgICAgICAudGhlbigganNvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighanNvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGpzb24gJiYganNvbi5zdHlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZUZuID0gZnVuY3Rpb24oZmVhdHVyZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnR5IHx8IHRoaXMuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBmZWF0dXJlW3Byb3BlcnR5XSB8fCAoZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnN0eWxlcy5maW5kKCBzdyA9PiBzdy52YWx1ZSA9PT0gdiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSB3cmFwcGVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5yYWRpdXMgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndlaWdodCA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5vcGFjaXR5ID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsQ29sb3IgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIG1hdGNoaW5nIHN0eWxlIGZvciBcIiArIEpTT04uc3RyaW5naWZ5KGZlYXR1cmUucHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgc3R5bGU6IFwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRm4gPSAoKSA9PiB7IHJldHVybiBmZWF0dXJlRm4oanNvbik7IH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlRm47XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIChsYXllciwgc3R5bGUpID0+IHsgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpOyB9LCAxMDAwLCB0aGlzLCBzdHlsZUZuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24gJiYgdHlwZW9mKGpzb24ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbXVsdGlwbGUgc3R5bGVzIHJldHVybmVkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvblswXTsgIC8vdXNlIGZpcnN0IGZvciBub3dcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvbjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy91bnJlY29nbml6YWJsZSBzdHlsZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN0eWxlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBqUXVlcnkuZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncFN0eWxlID0gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXRTdHlsZSBvbiBDbHVzdGVyLkZlYXR1cmVMYXllciBkb2Vzbid0IGFwcGVhciB0byB3b3JrIGNvbnNpc3RlbnRseSBmb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9uLWNsdXN0ZXJlZCBmZWF0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdHlsZShvYmopO1xuICAgICAgICAgICAgICAgICAgICAvL1NvIGluc3RlYWQsIHdlIG1hbnVhbGx5IHNldCBpdCBvbiBhbGwgZmVhdHVyZXMgb2YgdGhlIGxheWVyICh0aGF0IGFyZW4ndCBjbHVzdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRTdHlsZShvYmopO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBmZWF0dXJlIGxheWVyIHN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBjbHVzdGVyZWRGZWF0dXJlcygpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IHN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA/XG4gICAgICAgIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA6IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIHVybDogdXJsICsgJy8nICsgbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVSZXNvbHZlcixcbiAgICAgICAgbGF5ZXJJZDogbGF5ZXIuaWRcbiAgICB9O1xuXG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBvcHRpb25zLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIob3B0cyk7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSAgbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSAgb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGdlb0pzb25GZWVkKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBsYXllclVybCA9IHVybCArICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICtcbiAgICAgICAgbGF5ZXIuaWQgKyAnL0ZlYXR1cmVTZXJ2ZXIvJyArIGxheWVyLmxheWVyTmFtZTtcblxuICAgIGxldCBzdHlsZVVybCA9IHVybC5yZXBsYWNlKCdmZWVkcycsJ3N0eWxlcycpICtcbiAgICAgICAgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgKyBsYXllci5pZDtcblxuICAgIGxldCBzdHlsZUxvYWRlckZhY3RvcnkgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsYXllcklkKSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIEdlb0pTT04gZmVlZCBzdHlsZSwgalF1ZXJ5IGlzIG5vdCBpbnN0YWxsZWRcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgalF1ZXJ5LmFqYXgodXJsLCB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW0gPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2xheWVySWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihlbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTsgICAgICAgICAgLy91c2VzIGpRdWVyeSBwcm9taXNlXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IGxheWVyVXJsLFxuICAgICAgICBpc01vZGVybjogdHJ1ZSwgICAgICAgICAvL2ZvcmNlIHRvIHVzZSBHZW9KU09OXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkLCAgICAvL3VzZWQgYnkgc3R5bGUgbG9hZGVyXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZUxvYWRlckZhY3Rvcnkoc3R5bGVVcmwpXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xuXG59XG5cblxuZXhwb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn07XG4iXX0=