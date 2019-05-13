/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import * as Q from "q";
import { Config } from 'geoplatform.client';
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import { FeatureLayer as EsriClusterFeatureLayer } from './L.esri.Cluster.FeatureLayer';
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
    EsriClusterFeatureLayer.prototype.initialize.call(this, options);
    this.on('load', function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    });
}, ɵ3 = function (map) {
    EsriClusterFeatureLayer.prototype.onAdd.call(this, map);
    if (this.options.layerId) {
        this.loadStyle(this.options.layerId);
    }
}, ɵ4 = function (features) {
    EsriClusterFeatureLayer.prototype.createLayers.call(this, features);
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
var ClusteredFeatureLayer = EsriClusterFeatureLayer.extend({
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
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcC8iLCJzb3VyY2VzIjpbImxheWVyL2NsdXN0ZXItZmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV0QixPQUFPLEtBQUssQ0FBQyxNQUFPLEdBQUcsQ0FBQztBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFNUMsT0FBTyxFQUVILElBQUksSUFBSSxNQUFNLEVBQ2QsTUFBTSxJQUFJLFFBQVEsRUFDbEIsWUFBWSxJQUFJLGNBQWMsRUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUN4QixJQUFJLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLFlBQVksSUFBSSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hGLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztTQW9CeEMsVUFBVSxPQUFPLEVBQUUsTUFBTTs7SUFFckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDNUUsSUFBRyxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTs7UUFFbkQsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQs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LFdBQVcsRUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gIFwicVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnZ2VvcGxhdGZvcm0uY2xpZW50JztcblxuaW1wb3J0IHtcbiAgICBDb250cm9sLFxuICAgIGljb24gYXMgaWNvbkZuLFxuICAgIG1hcmtlciBhcyBtYXJrZXJGbixcbiAgICBjaXJjbGVNYXJrZXIgYXMgY2lyY2xlTWFya2VyRm4sXG4gICAgU1ZHLCBzdmcsIENhbnZhcywgY2FudmFzLFxuICAgIFV0aWwsXG4gICAgTGF5ZXJcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCB7IEZlYXR1cmVMYXllciBhcyBFc3JpQ2x1c3RlckZlYXR1cmVMYXllciB9IGZyb20gJy4vTC5lc3JpLkNsdXN0ZXIuRmVhdHVyZUxheWVyJztcbmltcG9ydCBmZWF0dXJlU3R5bGVSZXNvbHZlciBmcm9tICcuLi9zaGFyZWQvc3R5bGUtcmVzb2x2ZXInO1xuaW1wb3J0IGZlYXR1cmVQb3B1cFRlbXBsYXRlIGZyb20gJy4uL3NoYXJlZC9wb3B1cC10ZW1wbGF0ZSc7XG5cblxuLyoqXG4gKiBDbHVzdGVyZWQgRmVhdHVyZSBMYXllclxuICogUHJvdmlkZXMgY3VzdG9tIHN0eWxlIGxvYWRpbmcgYW5kIHBvaW50LWlsaXphdGlvbiBhcyB3ZWxsXG4gKiBhcyBhZGRpbmcgdmlzaWJpbGl0eSBhbmQgb3BhY2l0eSBtYW5pcHVsYXRpb24gbWV0aG9kc1xuICovXG52YXIgQ2x1c3RlcmVkRmVhdHVyZUxheWVyID0gRXNyaUNsdXN0ZXJGZWF0dXJlTGF5ZXIuZXh0ZW5kKHtcblxuICAgIGN1cnJlbnRWaXNpYmlsaXR5OiB0cnVlLFxuICAgIGN1cnJlbnRPcGFjaXR5OiAxLjAsXG5cbiAgICBfZ3BTdHlsZSA6IHsgY29sb3I6IFwiIzAwZlwiLCB3ZWlnaHQ6IDIsIGZpbGxDb2xvcjogJyMwMGYnLCBmaWxsT3BhY2l0eTogMC4zIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gUG9pbnQgRmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXRMbmd9IGxhdGxuZ1xuICAgICAqIEByZXR1cm4ge0wuTWFya2VyfVxuICAgICAqL1xuICAgIHBvaW50VG9MYXllckZuOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nKSB7XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZmVhdHVyZSAmJiBmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXMuc3R5bGUgOiBudWxsO1xuICAgICAgICBpZighc3R5bGUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBsb2NhbCBzdHlsZSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGUoZmVhdHVyZSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHVzaW5nIHN0eWxlIGZ1bmN0aW9uIGluIENsdXN0ZXJlZEZlYXR1cmVMYXllcjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUgPSBzdHlsZSB8fCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwge307XG4gICAgICAgIHN0eWxlLnJhZGl1cyAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICBzdHlsZS53ZWlnaHQgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgc3R5bGUuY29sb3IgICAgICAgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5vcGFjaXR5ICAgICA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgc3R5bGUuZmlsbENvbG9yICAgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUucmVuZGVyZXIgICAgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7ICAvL2ltcG9ydGFudCBmb3IgcGFuZSFcblxuICAgICAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYoc3R5bGUuc2hhcGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHN0eWxlLndpZHRoIHx8IDE2O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHN0eWxlLmhlaWdodCB8fCAxNjtcbiAgICAgICAgICAgIHZhciBpY29uID0gaWNvbkZuKCB7XG4gICAgICAgICAgICAgICAgaWNvblVybDogc3R5bGUuY29udGVudCwgLy9iYXNlNjQgZW5jb2RlZCBzdHJpbmdcbiAgICAgICAgICAgICAgICBpY29uU2l6ZTogW3dpZHRoLCBoZWlnaHRdLFxuICAgICAgICAgICAgICAgIGljb25BbmNob3I6IFt3aWR0aCowLjUsIGhlaWdodCowLjVdLFxuICAgICAgICAgICAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTExXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IG1vcHRzID0geyBpY29uOiBpY29uIH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChtb3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICBtYXJrZXIgPSBtYXJrZXJGbiggbGF0bG5nLCBtb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXIgPSBjaXJjbGVNYXJrZXJGbihsYXRsbmcsIHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3B1cFRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnBvcHVwVGVtcGxhdGUgfHwgZmVhdHVyZVBvcHVwVGVtcGxhdGU7XG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZm9yIGFsbCBub24tcG9pbnQgZmVhdHVyZXMsIGJpbmQgYSBwb3B1cFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBmZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxheWVyfSBsYXllciAtIGxheWVyIHJlcHJlc2VudGluZyBmZWF0dXJlXG4gICAgICovXG4gICAgZWFjaEZlYXR1cmVGbjogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgaWYoIWZlYXR1cmUgfHwgIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuYmluZFBvcHVwKGZlYXR1cmVQb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcbiAgICB9LFxuXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIG9wdGlvbnMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgICAgICBvcHRpb25zLnBvaW50VG9MYXllciA9IFV0aWwuYmluZCh0aGlzLnBvaW50VG9MYXllckZuLCB0aGlzKTtcbiAgICAgICAgb3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gVXRpbC5iaW5kKHRoaXMuZWFjaEZlYXR1cmVGbiwgdGhpcyk7XG4gICAgICAgIC8vIG9wdGlvbnMuZmllbGRzID0gWydGSUQnLCAndHlwZScsICd0aXRsZScsICdnZW9tZXRyeSddO1xuXG4gICAgICAgIC8vSW5jcmVhc2UgZnJvbSAxIHRvIGluY3JlYXNlIHRoZSBkaXN0YW5jZSBhd2F5IGZyb20gdGhlIGNlbnRlciB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcmUgcGxhY2VkLlxuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGluY3JlYXNlZCB0byBlbnN1cmUgYWxsIG1hcmtlcnMgY2FuIGJlIGNsaWNrZWRcbiAgICAgICAgLy8gd2hlbiBzcGlkZXJmaWVkIChzb21lIGdldCBzdHVjayB1bmRlciB0aGUgc3BpZGVyIGxlZ3MpXG4gICAgICAgIG9wdGlvbnMuc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgPSAyO1xuXG4gICAgICAgIGxldCBnZXRHUFN0eWxlID0gKCkgPT4geyByZXR1cm4gdGhpcy5fZ3BTdHlsZTsgfTtcbiAgICAgICAgb3B0aW9ucy5zdHlsZSA9IG9wdGlvbnMuc3R5bGUgfHwgZ2V0R1BTdHlsZTtcbiAgICAgICAgaWYob3B0aW9ucy5zdHlsZVJlc29sdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zLnN0eWxlUmVzb2x2ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvL2luIG9yZGVyIHRvIHB1dCBmZWF0dXJlcy1iYXNlZCBsYXllcnMgaW50byBzYW1lIHBhbmUgYXMgdGlsZSBsYXllcnMsXG4gICAgICAgIC8vIG11c3Qgc3BlY2lmeSByZW5kZXJlciBhbmQgc2V0IGRlc2lyZWQgcGFuZSBvbiB0aGF0XG4gICAgICAgIGxldCBzdmdPcHRzID0geyB9O1xuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAoc3ZnT3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgIHZhciByZW5kZXJlciA9IChTVkcgJiYgc3ZnKHN2Z09wdHMpKSB8fCAoQ2FudmFzICYmIGNhbnZhcygpKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXG4gICAgICAgIEVzcmlDbHVzdGVyRmVhdHVyZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy56SW5kZXggIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4KHRoaXMub3B0aW9ucy56SW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIEVzcmlDbHVzdGVyRmVhdHVyZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmxheWVySWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFN0eWxlKHRoaXMub3B0aW9ucy5sYXllcklkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogb3ZlcnJpZGUgc3VwZXIgY2xhc3MnIG1ldGhvZCB0byBzZXQgdml6L29wYWMgYWZ0ZXIgc3ViIGxheWVycyBjcmVhdGVkICovXG4gICAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICAgICAgRXNyaUNsdXN0ZXJGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmNyZWF0ZUxheWVycy5jYWxsKHRoaXMsIGZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuICAgICAgICB0aGlzLnNldE9wYWNpdHkodGhpcy5jdXJyZW50T3BhY2l0eSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBzZXRaSW5kZXggOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnpJbmRleCA9IGluZGV4O1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuXG4gICAgICAgICAgICBsZXQgbHlyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgIGlmKGx5ci5zZXRaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLnNldFpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fdXBkYXRlWkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5fdXBkYXRlWkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl9yZW5kZXJlciAmJiBseXIuX3JlbmRlcmVyLl9jb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lci5zdHlsZS56SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDbHVzdGVyZWQgZmVhdHVyZSBsYXllciBjaGlsZCBcIiArIGlkICsgXCIgZG9lcyBub3Qgc3VwcG9ydCBvcmRlcmluZyB1c2luZyB6LWluZGV4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiAqL1xuICAgIHRvZ2dsZVZpc2liaWxpdHk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhdGhpcy5jdXJyZW50VmlzaWJpbGl0eTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuXG4gICAgICAgIC8vIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgLy8gICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLnRvZ2dsZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBib29sIC0gZmxhZ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHk6IGZ1bmN0aW9uKGJvb2wpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gISFib29sO1xuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICAvL3Byb2JhYmx5IGlzIGEgbW9yZSBlZmZpY2llbnQgd2F5IHRvIGRvIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCB0aGlzIHdvcmtzIGN1cnJlbnRseS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBsb29rIGF0IHVzaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vICBtYXJrZXJDbHVzdGVyLnJlZnJlc2hJY29uT3B0aW9ucyh7Y2xhc3NOYW1lOidpbnZpc2libGUnfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0galF1ZXJ5KGxheWVyLl9pY29uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYm9vbCkgaWNvbi5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWNvbi5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldFZpc2liaWxpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoYm9vbCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZihsYXllci5zZXRTdHlsZSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0U3R5bGUoe2Rpc3BsYXk6IGJvb2wgPyAnJzonbm9uZSd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3BhY2l0eVxuICAgICAqL1xuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKG9wYWNpdHkpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPcGFjaXR5ID0gaXNOYU4ob3BhY2l0eSkgPyAxLjAgOiBvcGFjaXR5KjE7XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikuY3NzKHtvcGFjaXR5OiBvcGFjaXR5fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldE9wYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3R5bGU6IGZ1bmN0aW9uKHN0eWxlKSB7XG4gICAgICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBsb2FkU3R5bGU6IGZ1bmN0aW9uKGdwTGF5ZXJJZCkge1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKGdwTGF5ZXJJZClcbiAgICAgICAgICAgIC50aGVuKCBqc29uID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCFqc29uKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoanNvbiAmJiBqc29uLnN0eWxlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlRm4gPSBmdW5jdGlvbihmZWF0dXJlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydHkgfHwgdGhpcy5maWVsZDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IGZlYXR1cmVbcHJvcGVydHldIHx8IChmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXNbcHJvcGVydHldIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMuc3R5bGVzLmZpbmQoIHN3ID0+IHN3LnZhbHVlID09PSB2ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IHdyYXBwZXIuc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnJhZGl1cyA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS5yYWRpdXMgfHwgNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2VpZ2h0ID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLndlaWdodCB8fCAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5jb2xvciA9IHN0eWxlLnN0cm9rZSB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLm9wYWNpdHkgPSBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxDb2xvciA9IHN0eWxlLmZpbGwgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gbWF0Y2hpbmcgc3R5bGUgZm9yIFwiICsgSlNPTi5zdHJpbmdpZnkoZmVhdHVyZS5wcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBzdHlsZTogXCIgKyBKU09OLnN0cmluZ2lmeShzdHlsZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVGbiA9ICgpID0+IHsgcmV0dXJuIGZlYXR1cmVGbihqc29uKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGVGbjtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggKGxheWVyLCBzdHlsZSkgPT4geyBsYXllci5zZXRTdHlsZShzdHlsZSk7IH0sIDEwMDAsIHRoaXMsIHN0eWxlRm4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbiAmJiB0eXBlb2YoanNvbi5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9tdWx0aXBsZSBzdHlsZXMgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uWzBdOyAgLy91c2UgZmlyc3QgZm9yIG5vd1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL3VucmVjb2duaXphYmxlIHN0eWxlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3R5bGUuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGpRdWVyeS5leHRlbmQoe30sIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dwU3R5bGUgPSBzdHlsZTtcblxuICAgICAgICAgICAgICAgICAgICAvL3NldFN0eWxlIG9uIENsdXN0ZXIuRmVhdHVyZUxheWVyIGRvZXNuJ3QgYXBwZWFyIHRvIHdvcmsgY29uc2lzdGVudGx5IGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBub24tY2x1c3RlcmVkIGZlYXR1cmVzLlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0eWxlKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIC8vU28gaW5zdGVhZCwgd2UgbWFudWFsbHkgc2V0IGl0IG9uIGFsbCBmZWF0dXJlcyBvZiB0aGUgbGF5ZXIgKHRoYXQgYXJlbid0IGNsdXN0ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnNldFN0eWxlKG9iaik7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGZlYXR1cmUgbGF5ZXIgc3R5bGVcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGNsdXN0ZXJlZEZlYXR1cmVzKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdHlsZVJlc29sdmVyID9cbiAgICAgICAgb3B0aW9ucy5zdHlsZVJlc29sdmVyIDogZmVhdHVyZVN0eWxlUmVzb2x2ZXI7XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiB1cmwgKyAnLycgKyBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZVJlc29sdmVyLFxuICAgICAgICBsYXllcklkOiBsYXllci5pZFxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtICBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtICBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gZ2VvSnNvbkZlZWQobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IGxheWVyVXJsID0gdXJsICsgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgK1xuICAgICAgICBsYXllci5pZCArICcvRmVhdHVyZVNlcnZlci8nICsgbGF5ZXIubGF5ZXJOYW1lO1xuXG4gICAgbGV0IHN0eWxlVXJsID0gdXJsLnJlcGxhY2UoJ2ZlZWRzJywnc3R5bGVzJykgK1xuICAgICAgICAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArIGxheWVyLmlkO1xuXG4gICAgbGV0IHN0eWxlTG9hZGVyRmFjdG9yeSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGxheWVySWQpIHtcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcbiAgICAgICAgICAgIGlmKCFqUXVlcnkpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGxvYWQgR2VvSlNPTiBmZWVkIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqUXVlcnkuYWpheCh1cmwsIHtcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTonanNvbicsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbSA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgIEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7bGF5ZXJJZH0gOiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yID0gbmV3IEVycm9yKGVtKTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlOyAgICAgICAgICAvL3VzZXMgalF1ZXJ5IHByb21pc2VcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIHVybDogbGF5ZXJVcmwsXG4gICAgICAgIGlzTW9kZXJuOiB0cnVlLCAgICAgICAgIC8vZm9yY2UgdG8gdXNlIEdlb0pTT05cbiAgICAgICAgbGF5ZXJJZDogbGF5ZXIuaWQsICAgIC8vdXNlZCBieSBzdHlsZSBsb2FkZXJcbiAgICAgICAgc3R5bGVMb2FkZXI6IHN0eWxlTG9hZGVyRmFjdG9yeShzdHlsZVVybClcbiAgICB9O1xuXG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBvcHRpb25zLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIob3B0cyk7XG5cbn1cblxuXG5leHBvcnQge1xuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllciBhcyBkZWZhdWx0LFxuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllcixcbiAgICBjbHVzdGVyZWRGZWF0dXJlcyxcbiAgICBnZW9Kc29uRmVlZFxufTtcbiJdfQ==