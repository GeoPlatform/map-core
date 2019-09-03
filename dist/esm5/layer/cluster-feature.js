/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
var jQuery = jquery;
import { Config } from '@geoplatform/client';
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import BaseClusteredFeatureLayer from './base-clustered-feature-layer';
import featureStyleResolver from '../shared/style-resolver';
import featurePopupTemplate from '../shared/popup-template';
var ɵ0 = /**
 * @param {?} feature
 * @param {?} latlng
 * @return {?}
 */
function (feature, latlng) {
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
    style.renderer = this.options.renderer; //important for pane!
    //important for pane!
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
            ((/** @type {?} */ (mopts))).pane = Config.leafletPane;
        marker = markerFn(latlng, mopts);
    }
    else {
        marker = circleMarkerFn(latlng, style);
    }
    /** @type {?} */
    var popupTemplate = this.options.popupTemplate || featurePopupTemplate;
    marker.bindPopup(popupTemplate(feature));
    return marker;
}, ɵ1 = /**
 * @param {?} feature
 * @param {?} layer
 * @return {?}
 */
function (feature, layer) {
    if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
        return;
    }
    layer.bindPopup(featurePopupTemplate(feature));
}, ɵ2 = /**
 * @param {?} options
 * @return {?}
 */
function (options) {
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
    var getGPStyle = (/**
     * @return {?}
     */
    function () { return _this._gpStyle; });
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    //in order to put features-based layers into same pane as tile layers,
    // must specify renderer and set desired pane on that
    /** @type {?} */
    var svgOpts = {};
    if (Config.leafletPane)
        ((/** @type {?} */ (svgOpts))).pane = Config.leafletPane;
    /** @type {?} */
    var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
    options.renderer = renderer;
    BaseClusteredFeatureLayer.prototype.initialize.call(this, options);
    this.on('load', (/**
     * @return {?}
     */
    function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    }));
}, ɵ3 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    BaseClusteredFeatureLayer.prototype.onAdd.call(this, map);
    if (this.options.layerId) {
        this.loadStyle(this.options.layerId);
    }
}, ɵ4 = /**
 * @param {?} features
 * @return {?}
 */
function (features) {
    BaseClusteredFeatureLayer.prototype.createLayers.call(this, features);
    this.setVisibility(this.currentVisibility);
    this.setOpacity(this.currentOpacity);
}, ɵ5 = /**
 * @param {?} index
 * @return {?}
 */
function (index) {
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
}, ɵ6 = /**
 * @return {?}
 */
function () {
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
}, ɵ7 = /**
 * @param {?} bool
 * @return {?}
 */
function (bool) {
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
                //probably is a more efficient way to do this,
                // but this works currently.
                // TODO look at using
                //  markerCluster.refreshIconOptions({className:'invisible'});
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
}, ɵ8 = /**
 * @param {?} opacity
 * @return {?}
 */
function (opacity) {
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
}, ɵ9 = /**
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
}, ɵ10 = /**
 * @param {?} gpLayerId
 * @return {?}
 */
function (gpLayerId) {
    var _this = this;
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId)
            .then((/**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (!json)
                return;
            /** @type {?} */
            var style = null;
            if (json && json.styles) {
                /** @type {?} */
                var featureFn_1 = (/**
                 * @param {?} feature
                 * @return {?}
                 */
                function (feature) {
                    /** @type {?} */
                    var property = this.property || this.field1;
                    /** @type {?} */
                    var v = feature[property] || (feature.properties ? feature.properties[property] : null);
                    /** @type {?} */
                    var style = null;
                    if (this.styles) {
                        /** @type {?} */
                        var wrapper = this.styles.find((/**
                         * @param {?} sw
                         * @return {?}
                         */
                        function (sw) { return sw.value === v; }));
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
                });
                /** @type {?} */
                var styleFn = (/**
                 * @return {?}
                 */
                function () { return featureFn_1(json); });
                _this.options.style = styleFn;
                setTimeout((/**
                 * @param {?} layer
                 * @param {?} style
                 * @return {?}
                 */
                function (layer, style) { layer.setStyle(style); }), 1000, _this, styleFn);
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
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.log("Error fetching feature layer style");
            console.log(e);
        }));
    }
};
/**
 * Clustered Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
 * @type {?}
 */
var ClusteredFeatureLayer = BaseClusteredFeatureLayer.extend({
    currentVisibility: true,
    currentOpacity: 1.0,
    _gpStyle: { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },
    /**
     * @param feature - GeoJSON Point Feature
     * @param latlng - L.LatLng
     * @return L.Marker
     */
    pointToLayerFn: (ɵ0),
    /**
     * for all non-point features, bind a popup
     * @param feature - GeoJSON feature
     * @param layer - L.Layer representing feature
     */
    eachFeatureFn: (ɵ1),
    initialize: (ɵ2),
    onAdd: (ɵ3),
    /**
     * override super class' method to set viz/opac after sub layers created
     */
    createLayers: (ɵ4),
    /**
     * @param index
     */
    setZIndex: (ɵ5),
    /**
     *
     */
    toggleVisibility: (ɵ6),
    /**
     * @param bool - flag
     */
    setVisibility: (ɵ7),
    /**
     * @param opacity
     */
    setOpacity: (ɵ8),
    setStyle: (ɵ9),
    loadStyle: (ɵ10)
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
        ((/** @type {?} */ (opts))).pane = Config.leafletPane;
    if (options && options.leafletPane)
        ((/** @type {?} */ (opts))).pane = options.leafletPane;
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
    var styleLoaderFactory = (/**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return (/**
         * @param {?} layerId
         * @return {?}
         */
        function (layerId) {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                if (!jQuery) {
                    reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                }
                jQuery.ajax(url, {
                    dataType: 'json',
                    success: (/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { resolve(data); }),
                    error: (/**
                     * @param {?} xhr
                     * @param {?} status
                     * @param {?} message
                     * @return {?}
                     */
                    function (xhr, status, message) {
                        /** @type {?} */
                        var em = "geoJsonFeed() -\n                            Error loading style information for layer " + layerId + " : " + message;
                        reject(new Error(em));
                    })
                });
            }));
        });
    });
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
        ((/** @type {?} */ (opts))).pane = Config.leafletPane;
    if (options && options.leafletPane)
        ((/** @type {?} */ (opts))).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztJQUMzQixNQUFNLEdBQUcsTUFBTTtBQUVyQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUVILElBQUksSUFBSSxNQUFNLEVBQ2QsTUFBTSxJQUFJLFFBQVEsRUFDbEIsWUFBWSxJQUFJLGNBQWMsRUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUN4QixJQUFJLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyx5QkFBeUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQW9CeEMsVUFBVSxPQUFPLEVBQUUsTUFBTTs7UUFFakMsS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtJQUMzRSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1FBQ25ELDZDQUE2QztRQUM3QyxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtLQUNKO0lBRUQsS0FBSyxHQUFH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USxDQUFDO0tBQzVDO0lBRUQsSUFBRyxNQUFNLENBQUMsV0FBVztRQUFFLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMvRCxJQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsV0FBVztRQUFFLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUU1RSxPQUFPLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFM0MsQ0FBQztBQUdELE9BQU8sRUFDSCxxQkFBcUIsSUFBSSxPQUFPLEVBQ2hDLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsV0FBVyxFQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQge1xuICAgIENvbnRyb2wsXG4gICAgaWNvbiBhcyBpY29uRm4sXG4gICAgbWFya2VyIGFzIG1hcmtlckZuLFxuICAgIGNpcmNsZU1hcmtlciBhcyBjaXJjbGVNYXJrZXJGbixcbiAgICBTVkcsIHN2ZywgQ2FudmFzLCBjYW52YXMsXG4gICAgVXRpbCxcbiAgICBMYXllclxufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgZnJvbSAnLi9iYXNlLWNsdXN0ZXJlZC1mZWF0dXJlLWxheWVyJztcbmltcG9ydCBmZWF0dXJlU3R5bGVSZXNvbHZlciBmcm9tICcuLi9zaGFyZWQvc3R5bGUtcmVzb2x2ZXInO1xuaW1wb3J0IGZlYXR1cmVQb3B1cFRlbXBsYXRlIGZyb20gJy4uL3NoYXJlZC9wb3B1cC10ZW1wbGF0ZSc7XG5cblxuLyoqXG4gKiBDbHVzdGVyZWQgRmVhdHVyZSBMYXllclxuICogUHJvdmlkZXMgY3VzdG9tIHN0eWxlIGxvYWRpbmcgYW5kIHBvaW50LWlsaXphdGlvbiBhcyB3ZWxsXG4gKiBhcyBhZGRpbmcgdmlzaWJpbGl0eSBhbmQgb3BhY2l0eSBtYW5pcHVsYXRpb24gbWV0aG9kc1xuICovXG52YXIgQ2x1c3RlcmVkRmVhdHVyZUxheWVyID0gQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5leHRlbmQoe1xuXG4gICAgY3VycmVudFZpc2liaWxpdHk6IHRydWUsXG4gICAgY3VycmVudE9wYWNpdHk6IDEuMCxcblxuICAgIF9ncFN0eWxlIDogeyBjb2xvcjogXCIjMDBmXCIsIHdlaWdodDogMiwgZmlsbENvbG9yOiAnIzAwZicsIGZpbGxPcGFjaXR5OiAwLjMgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgZmVhdHVyZSAtIEdlb0pTT04gUG9pbnQgRmVhdHVyZVxuICAgICAqIEBwYXJhbSBsYXRsbmcgLSBMLkxhdExuZ1xuICAgICAqIEByZXR1cm4gTC5NYXJrZXJcbiAgICAgKi9cbiAgICBwb2ludFRvTGF5ZXJGbjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IGZlYXR1cmUgJiYgZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzLnN0eWxlIDogbnVsbDtcbiAgICAgICAgaWYoIXN0eWxlICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMuc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgbG9jYWwgc3R5bGUgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB1c2luZyBzdHlsZSBmdW5jdGlvbiBpbiBDbHVzdGVyZWRGZWF0dXJlTGF5ZXI6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlID0gc3R5bGUgfHwgdGhpcy5vcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgICAgICBzdHlsZS5yYWRpdXMgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS5yYWRpdXMgfHwgNDtcbiAgICAgICAgc3R5bGUud2VpZ2h0ICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgIHN0eWxlLmNvbG9yICAgICAgID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUub3BhY2l0eSAgICAgPSBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuOTtcbiAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjM7XG4gICAgICAgIHN0eWxlLmZpbGxDb2xvciAgID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLnJlbmRlcmVyICAgID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyOyAgLy9pbXBvcnRhbnQgZm9yIHBhbmUhXG5cbiAgICAgICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmKHN0eWxlLnNoYXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBzdHlsZS53aWR0aCB8fCAxNjtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBzdHlsZS5oZWlnaHQgfHwgMTY7XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGljb25Gbigge1xuICAgICAgICAgICAgICAgIGljb25Vcmw6IHN0eWxlLmNvbnRlbnQsIC8vYmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICBpY29uQW5jaG9yOiBbd2lkdGgqMC41LCBoZWlnaHQqMC41XSxcbiAgICAgICAgICAgICAgICBwb3B1cEFuY2hvcjogWzAsIC0xMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBtb3B0cyA9IHsgaWNvbjogaWNvbiB9O1xuICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAobW9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgbWFya2VyID0gbWFya2VyRm4oIGxhdGxuZywgbW9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFya2VyID0gY2lyY2xlTWFya2VyRm4obGF0bG5nLCBzdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9wdXBUZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wb3B1cFRlbXBsYXRlIHx8IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGZvciBhbGwgbm9uLXBvaW50IGZlYXR1cmVzLCBiaW5kIGEgcG9wdXBcbiAgICAgKiBAcGFyYW0gIGZlYXR1cmUgLSBHZW9KU09OIGZlYXR1cmVcbiAgICAgKiBAcGFyYW0gbGF5ZXIgLSBMLkxheWVyIHJlcHJlc2VudGluZyBmZWF0dXJlXG4gICAgICovXG4gICAgZWFjaEZlYXR1cmVGbjogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgaWYoIWZlYXR1cmUgfHwgIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuYmluZFBvcHVwKGZlYXR1cmVQb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcbiAgICB9LFxuXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIG9wdGlvbnMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgICAgICBvcHRpb25zLnBvaW50VG9MYXllciA9IFV0aWwuYmluZCh0aGlzLnBvaW50VG9MYXllckZuLCB0aGlzKTtcbiAgICAgICAgb3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gVXRpbC5iaW5kKHRoaXMuZWFjaEZlYXR1cmVGbiwgdGhpcyk7XG4gICAgICAgIC8vIG9wdGlvbnMuZmllbGRzID0gWydGSUQnLCAndHlwZScsICd0aXRsZScsICdnZW9tZXRyeSddO1xuXG4gICAgICAgIC8vSW5jcmVhc2UgZnJvbSAxIHRvIGluY3JlYXNlIHRoZSBkaXN0YW5jZSBhd2F5IGZyb20gdGhlIGNlbnRlciB0aGF0IHNwaWRlcmZpZWQgbWFya2VycyBhcmUgcGxhY2VkLlxuICAgICAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGluY3JlYXNlZCB0byBlbnN1cmUgYWxsIG1hcmtlcnMgY2FuIGJlIGNsaWNrZWRcbiAgICAgICAgLy8gd2hlbiBzcGlkZXJmaWVkIChzb21lIGdldCBzdHVjayB1bmRlciB0aGUgc3BpZGVyIGxlZ3MpXG4gICAgICAgIG9wdGlvbnMuc3BpZGVyZnlEaXN0YW5jZU11bHRpcGxpZXIgPSAyO1xuXG4gICAgICAgIGxldCBnZXRHUFN0eWxlID0gKCkgPT4geyByZXR1cm4gdGhpcy5fZ3BTdHlsZTsgfTtcbiAgICAgICAgb3B0aW9ucy5zdHlsZSA9IG9wdGlvbnMuc3R5bGUgfHwgZ2V0R1BTdHlsZTtcbiAgICAgICAgaWYob3B0aW9ucy5zdHlsZVJlc29sdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zLnN0eWxlUmVzb2x2ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAvL2luIG9yZGVyIHRvIHB1dCBmZWF0dXJlcy1iYXNlZCBsYXllcnMgaW50byBzYW1lIHBhbmUgYXMgdGlsZSBsYXllcnMsXG4gICAgICAgIC8vIG11c3Qgc3BlY2lmeSByZW5kZXJlciBhbmQgc2V0IGRlc2lyZWQgcGFuZSBvbiB0aGF0XG4gICAgICAgIGxldCBzdmdPcHRzID0geyB9O1xuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAoc3ZnT3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgIHZhciByZW5kZXJlciA9IChTVkcgJiYgc3ZnKHN2Z09wdHMpKSB8fCAoQ2FudmFzICYmIGNhbnZhcygpKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRaSW5kZXgodGhpcy5vcHRpb25zLnpJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUub25BZGQuY2FsbCh0aGlzLCBtYXApO1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5sYXllcklkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdHlsZSh0aGlzLm9wdGlvbnMubGF5ZXJJZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIG92ZXJyaWRlIHN1cGVyIGNsYXNzJyBtZXRob2QgdG8gc2V0IHZpei9vcGFjIGFmdGVyIHN1YiBsYXllcnMgY3JlYXRlZCAqL1xuICAgIGNyZWF0ZUxheWVyczogZnVuY3Rpb24gKGZlYXR1cmVzKSB7XG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmNyZWF0ZUxheWVycy5jYWxsKHRoaXMsIGZlYXR1cmVzKTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuICAgICAgICB0aGlzLnNldE9wYWNpdHkodGhpcy5jdXJyZW50T3BhY2l0eSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBpbmRleFxuICAgICAqL1xuICAgIHNldFpJbmRleCA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuekluZGV4ID0gaW5kZXg7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cbiAgICAgICAgICAgIGxldCBseXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgaWYobHlyLnNldFpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuc2V0WkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl91cGRhdGVaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLl91cGRhdGVaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3JlbmRlcmVyICYmIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNsdXN0ZXJlZCBmZWF0dXJlIGxheWVyIGNoaWxkIFwiICsgaWQgKyBcIiBkb2VzIG5vdCBzdXBwb3J0IG9yZGVyaW5nIHVzaW5nIHotaW5kZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqICovXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICF0aGlzLmN1cnJlbnRWaXNpYmlsaXR5O1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG5cbiAgICAgICAgLy8gLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAvLyAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikudG9nZ2xlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYm9vbCAtIGZsYWdcbiAgICAgKi9cbiAgICBzZXRWaXNpYmlsaXR5OiBmdW5jdGlvbihib29sKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICEhYm9vbDtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMucmVuZGVyZXIuX2NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyLl9jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IGJvb2wgPyAnJyA6ICdub25lJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICAvL3Byb2JhYmx5IGlzIGEgbW9yZSBlZmZpY2llbnQgd2F5IHRvIGRvIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCB0aGlzIHdvcmtzIGN1cnJlbnRseS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBsb29rIGF0IHVzaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vICBtYXJrZXJDbHVzdGVyLnJlZnJlc2hJY29uT3B0aW9ucyh7Y2xhc3NOYW1lOidpbnZpc2libGUnfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0galF1ZXJ5KGxheWVyLl9pY29uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYm9vbCkgaWNvbi5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWNvbi5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldFZpc2liaWxpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoYm9vbCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZihsYXllci5zZXRTdHlsZSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0U3R5bGUoe2Rpc3BsYXk6IGJvb2wgPyAnJzonbm9uZSd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIG9wYWNpdHlcbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbihvcGFjaXR5KSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3BhY2l0eSA9IGlzTmFOKG9wYWNpdHkpID8gMS4wIDogb3BhY2l0eSoxO1xuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLmNzcyh7b3BhY2l0eTogb3BhY2l0eX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRPcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0eWxlOiBmdW5jdGlvbihzdHlsZSkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCwgc3R5bGUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgbG9hZFN0eWxlOiBmdW5jdGlvbihncExheWVySWQpIHtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcihncExheWVySWQpXG4gICAgICAgICAgICAudGhlbigganNvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighanNvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGpzb24gJiYganNvbi5zdHlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZUZuID0gZnVuY3Rpb24oZmVhdHVyZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnR5IHx8IHRoaXMuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBmZWF0dXJlW3Byb3BlcnR5XSB8fCAoZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnN0eWxlcy5maW5kKCBzdyA9PiBzdy52YWx1ZSA9PT0gdiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSB3cmFwcGVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5yYWRpdXMgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndlaWdodCA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5vcGFjaXR5ID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsQ29sb3IgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIG1hdGNoaW5nIHN0eWxlIGZvciBcIiArIEpTT04uc3RyaW5naWZ5KGZlYXR1cmUucHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgc3R5bGU6IFwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRm4gPSAoKSA9PiB7IHJldHVybiBmZWF0dXJlRm4oanNvbik7IH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlRm47XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIChsYXllciwgc3R5bGUpID0+IHsgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpOyB9LCAxMDAwLCB0aGlzLCBzdHlsZUZuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24gJiYgdHlwZW9mKGpzb24ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbXVsdGlwbGUgc3R5bGVzIHJldHVybmVkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvblswXTsgIC8vdXNlIGZpcnN0IGZvciBub3dcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvbjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy91bnJlY29nbml6YWJsZSBzdHlsZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN0eWxlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBqUXVlcnkuZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncFN0eWxlID0gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXRTdHlsZSBvbiBDbHVzdGVyLkZlYXR1cmVMYXllciBkb2Vzbid0IGFwcGVhciB0byB3b3JrIGNvbnNpc3RlbnRseSBmb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9uLWNsdXN0ZXJlZCBmZWF0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdHlsZShvYmopO1xuICAgICAgICAgICAgICAgICAgICAvL1NvIGluc3RlYWQsIHdlIG1hbnVhbGx5IHNldCBpdCBvbiBhbGwgZmVhdHVyZXMgb2YgdGhlIGxheWVyICh0aGF0IGFyZW4ndCBjbHVzdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRTdHlsZShvYmopO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBmZWF0dXJlIGxheWVyIHN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBjbHVzdGVyZWRGZWF0dXJlcygpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IHN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA/XG4gICAgICAgIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA6IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIHVybDogdXJsICsgJy8nICsgbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVSZXNvbHZlcixcbiAgICAgICAgbGF5ZXJJZDogbGF5ZXIuaWRcbiAgICB9O1xuXG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBvcHRpb25zLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIob3B0cyk7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSAgbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSAgb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGdlb0pzb25GZWVkKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBsYXllclVybCA9IHVybCArICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICtcbiAgICAgICAgbGF5ZXIuaWQgKyAnL0ZlYXR1cmVTZXJ2ZXIvJyArIGxheWVyLmxheWVyTmFtZTtcblxuICAgIGxldCBzdHlsZVVybCA9IHVybC5yZXBsYWNlKCdmZWVkcycsJ3N0eWxlcycpICtcbiAgICAgICAgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgKyBsYXllci5pZDtcblxuICAgIGxldCBzdHlsZUxvYWRlckZhY3RvcnkgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsYXllcklkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PiggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFqUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIEdlb0pTT04gZmVlZCBzdHlsZSwgalF1ZXJ5IGlzIG5vdCBpbnN0YWxsZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqUXVlcnkuYWpheCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7IHJlc29sdmUoZGF0YSk7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVtID0gYGdlb0pzb25GZWVkKCkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVycm9yIGxvYWRpbmcgc3R5bGUgaW5mb3JtYXRpb24gZm9yIGxheWVyICR7bGF5ZXJJZH0gOiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCggbmV3IEVycm9yKGVtKSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIHVybDogbGF5ZXJVcmwsXG4gICAgICAgIGlzTW9kZXJuOiB0cnVlLCAgICAgICAgIC8vZm9yY2UgdG8gdXNlIEdlb0pTT05cbiAgICAgICAgbGF5ZXJJZDogbGF5ZXIuaWQsICAgIC8vdXNlZCBieSBzdHlsZSBsb2FkZXJcbiAgICAgICAgc3R5bGVMb2FkZXI6IHN0eWxlTG9hZGVyRmFjdG9yeShzdHlsZVVybClcbiAgICB9O1xuXG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBvcHRpb25zLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIob3B0cyk7XG5cbn1cblxuXG5leHBvcnQge1xuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllciBhcyBkZWZhdWx0LFxuICAgIENsdXN0ZXJlZEZlYXR1cmVMYXllcixcbiAgICBjbHVzdGVyZWRGZWF0dXJlcyxcbiAgICBnZW9Kc29uRmVlZFxufTtcbiJdfQ==