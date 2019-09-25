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
 * @param {?} gpLayerId
 * @return {?}
 */
function (gpLayerId) {
    var _this = this;
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId).then((/**
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (!json)
                return;
            /** @type {?} */
            var style = null;
            if (json && json.styles) { //old style function, not sure if being used currently
                console.log("Layer " + gpLayerId + " using older json.styles definition");
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
                // multiple styles returned...
                // generate a function which will use those filters to assign styles per feature
                /** @type {?} */
                var styleFn = _this.styleFunctionFactory(json);
                _this.options.style = styleFn;
                setTimeout((/**
                 * @param {?} layer
                 * @param {?} style
                 * @return {?}
                 */
                function (layer, style) {
                    layer.setStyle(style);
                }), 1000, _this, styleFn);
                return;
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
            console.log("[ERROR] Error fetching FeatureLayer (" + gpLayerId + ") style:");
            console.log(e.message);
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
    /**
     * @param gpLayerId - identifier of GP Layer Asset to load style for
     */
    loadStyle: (ɵ9),
    styleFunctionFactory: /**
     * @param {?} styles
     * @return {?}
     */
    function (styles) {
        return (/**
         * @param {?} feature
         * @return {?}
         */
        function (feature) {
            if (!styles.length) {
                console.log("[WARN] No styles defined");
                return null; //empty styles
            }
            //if a default style is defined, remember it just in case
            /** @type {?} */
            var defaultStyle = styles[0];
            //TODO look for 'defaultSymbol'
            /** @type {?} */
            var match = styles.find((/**
             * @param {?} style
             * @return {?}
             */
            function (style) {
                if (!style.filter) {
                    // console.log("Styles have no filter");
                    return defaultStyle; //just return default
                }
                if (!style.filter.property) {
                    // console.log("No filterable property defined");
                    return defaultStyle; //just return default
                }
                /** @type {?} */
                var actual = feature.properties[style.filter.property];
                if (actual === undefined || actual === null) {
                    // console.log("No filterable property value present");
                    return defaultStyle; //just return default
                }
                /** @type {?} */
                var min = isNaN(style.filter.min) ? null : style.filter.min * 1;
                /** @type {?} */
                var max = isNaN(style.filter.max) ? null : style.filter.max * 1;
                /** @type {?} */
                var expected = style.filter.value;
                // console.log(`Comparing '${actual}' to '${expected}' and '${min}' - '${max}'`);
                if (expected !== undefined && expected !== null && actual == expected) {
                    return style;
                }
                else if ((min !== null || max !== null) && !isNaN(actual)) {
                    if (min !== null && max !== null && min <= actual && actual <= max) {
                        return style;
                    }
                    else if (min !== null && min <= actual) {
                        return style;
                    }
                    else if (max !== null && actual <= max) {
                        return style;
                    }
                }
                return null; //don't return default here, just null (inside loop)
            }));
            return match || defaultStyle;
        });
    }
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
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztJQUMzQixNQUFNLEdBQUcsTUFBTTtBQUVyQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUVILElBQUksSUFBSSxNQUFNLEVBQ2QsTUFBTSxJQUFJLFFBQVEsRUFDbEIsWUFBWSxJQUFJLGNBQWMsRUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUN4QixJQUFJLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyx5QkFBeUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQXFCeEMsVUFBVSxPQUFPLEVBQUUsTUFBTTs7UUFFakMsS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtJQUMzRSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1FBQ25ELDZDQUE2QztRQUM3QyxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtLQUNKO0lBRUQsS0FBSyxHQUFH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QUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUU1RSxPQUFPLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFM0MsQ0FBQztBQUdELE9BQU8sRUFDSCxxQkFBcUIsSUFBSSxPQUFPLEVBQ2hDLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsV0FBVyxFQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQge1xuICAgIENvbnRyb2wsXG4gICAgaWNvbiBhcyBpY29uRm4sXG4gICAgbWFya2VyIGFzIG1hcmtlckZuLFxuICAgIGNpcmNsZU1hcmtlciBhcyBjaXJjbGVNYXJrZXJGbixcbiAgICBTVkcsIHN2ZywgQ2FudmFzLCBjYW52YXMsXG4gICAgVXRpbCxcbiAgICBMYXllclxufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgZnJvbSAnLi9iYXNlLWNsdXN0ZXJlZC1mZWF0dXJlLWxheWVyJztcbmltcG9ydCBmZWF0dXJlU3R5bGVSZXNvbHZlciBmcm9tICcuLi9zaGFyZWQvc3R5bGUtcmVzb2x2ZXInO1xuaW1wb3J0IGZlYXR1cmVQb3B1cFRlbXBsYXRlIGZyb20gJy4uL3NoYXJlZC9wb3B1cC10ZW1wbGF0ZSc7XG5cblxuXG4vKipcbiAqIENsdXN0ZXJlZCBGZWF0dXJlIExheWVyXG4gKiBQcm92aWRlcyBjdXN0b20gc3R5bGUgbG9hZGluZyBhbmQgcG9pbnQtaWxpemF0aW9uIGFzIHdlbGxcbiAqIGFzIGFkZGluZyB2aXNpYmlsaXR5IGFuZCBvcGFjaXR5IG1hbmlwdWxhdGlvbiBtZXRob2RzXG4gKi9cbnZhciBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgPSBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLmV4dGVuZCh7XG5cbiAgICBjdXJyZW50VmlzaWJpbGl0eTogdHJ1ZSxcbiAgICBjdXJyZW50T3BhY2l0eTogMS4wLFxuXG4gICAgX2dwU3R5bGUgOiB7IGNvbG9yOiBcIiMwMGZcIiwgd2VpZ2h0OiAyLCBmaWxsQ29sb3I6ICcjMDBmJywgZmlsbE9wYWNpdHk6IDAuMyB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICBmZWF0dXJlIC0gR2VvSlNPTiBQb2ludCBGZWF0dXJlXG4gICAgICogQHBhcmFtIGxhdGxuZyAtIEwuTGF0TG5nXG4gICAgICogQHJldHVybiBMLk1hcmtlclxuICAgICAqL1xuICAgIHBvaW50VG9MYXllckZuOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nKSB7XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZmVhdHVyZSAmJiBmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXMuc3R5bGUgOiBudWxsO1xuICAgICAgICBpZighc3R5bGUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBsb2NhbCBzdHlsZSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGUoZmVhdHVyZSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHVzaW5nIHN0eWxlIGZ1bmN0aW9uIGluIENsdXN0ZXJlZEZlYXR1cmVMYXllcjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUgPSBzdHlsZSB8fCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwge307XG4gICAgICAgIHN0eWxlLnJhZGl1cyAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICBzdHlsZS53ZWlnaHQgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgc3R5bGUuY29sb3IgICAgICAgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5vcGFjaXR5ICAgICA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgc3R5bGUuZmlsbENvbG9yICAgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUucmVuZGVyZXIgICAgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7ICAvL2ltcG9ydGFudCBmb3IgcGFuZSFcblxuICAgICAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYoc3R5bGUuc2hhcGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHN0eWxlLndpZHRoIHx8IDE2O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHN0eWxlLmhlaWdodCB8fCAxNjtcbiAgICAgICAgICAgIHZhciBpY29uID0gaWNvbkZuKCB7XG4gICAgICAgICAgICAgICAgaWNvblVybDogc3R5bGUuY29udGVudCwgLy9iYXNlNjQgZW5jb2RlZCBzdHJpbmdcbiAgICAgICAgICAgICAgICBpY29uU2l6ZTogW3dpZHRoLCBoZWlnaHRdLFxuICAgICAgICAgICAgICAgIGljb25BbmNob3I6IFt3aWR0aCowLjUsIGhlaWdodCowLjVdLFxuICAgICAgICAgICAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTExXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IG1vcHRzID0geyBpY29uOiBpY29uIH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChtb3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICBtYXJrZXIgPSBtYXJrZXJGbiggbGF0bG5nLCBtb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXIgPSBjaXJjbGVNYXJrZXJGbihsYXRsbmcsIHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3B1cFRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnBvcHVwVGVtcGxhdGUgfHwgZmVhdHVyZVBvcHVwVGVtcGxhdGU7XG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZm9yIGFsbCBub24tcG9pbnQgZmVhdHVyZXMsIGJpbmQgYSBwb3B1cFxuICAgICAqIEBwYXJhbSAgZmVhdHVyZSAtIEdlb0pTT04gZmVhdHVyZVxuICAgICAqIEBwYXJhbSBsYXllciAtIEwuTGF5ZXIgcmVwcmVzZW50aW5nIGZlYXR1cmVcbiAgICAgKi9cbiAgICBlYWNoRmVhdHVyZUZuOiBmdW5jdGlvbihmZWF0dXJlLCBsYXllcikge1xuICAgICAgICBpZighZmVhdHVyZSB8fCAhZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5iaW5kUG9wdXAoZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuICAgIH0sXG5cblxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgb3B0aW9ucy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgICAgIG9wdGlvbnMucG9pbnRUb0xheWVyID0gVXRpbC5iaW5kKHRoaXMucG9pbnRUb0xheWVyRm4sIHRoaXMpO1xuICAgICAgICBvcHRpb25zLm9uRWFjaEZlYXR1cmUgPSBVdGlsLmJpbmQodGhpcy5lYWNoRmVhdHVyZUZuLCB0aGlzKTtcbiAgICAgICAgLy8gb3B0aW9ucy5maWVsZHMgPSBbJ0ZJRCcsICd0eXBlJywgJ3RpdGxlJywgJ2dlb21ldHJ5J107XG5cbiAgICAgICAgLy9JbmNyZWFzZSBmcm9tIDEgdG8gaW5jcmVhc2UgdGhlIGRpc3RhbmNlIGF3YXkgZnJvbSB0aGUgY2VudGVyIHRoYXQgc3BpZGVyZmllZCBtYXJrZXJzIGFyZSBwbGFjZWQuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgaW5jcmVhc2VkIHRvIGVuc3VyZSBhbGwgbWFya2VycyBjYW4gYmUgY2xpY2tlZFxuICAgICAgICAvLyB3aGVuIHNwaWRlcmZpZWQgKHNvbWUgZ2V0IHN0dWNrIHVuZGVyIHRoZSBzcGlkZXIgbGVncylcbiAgICAgICAgb3B0aW9ucy5zcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgbGV0IGdldEdQU3R5bGUgPSAoKSA9PiB7IHJldHVybiB0aGlzLl9ncFN0eWxlOyB9O1xuICAgICAgICBvcHRpb25zLnN0eWxlID0gb3B0aW9ucy5zdHlsZSB8fCBnZXRHUFN0eWxlO1xuICAgICAgICBpZihvcHRpb25zLnN0eWxlUmVzb2x2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMuc3R5bGVSZXNvbHZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaW4gb3JkZXIgdG8gcHV0IGZlYXR1cmVzLWJhc2VkIGxheWVycyBpbnRvIHNhbWUgcGFuZSBhcyB0aWxlIGxheWVycyxcbiAgICAgICAgLy8gbXVzdCBzcGVjaWZ5IHJlbmRlcmVyIGFuZCBzZXQgZGVzaXJlZCBwYW5lIG9uIHRoYXRcbiAgICAgICAgbGV0IHN2Z09wdHMgPSB7IH07XG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIChzdmdPcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gKFNWRyAmJiBzdmcoc3ZnT3B0cykpIHx8IChDYW52YXMgJiYgY2FudmFzKCkpO1xuICAgICAgICBvcHRpb25zLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMuekluZGV4ICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLnNldFpJbmRleCh0aGlzLm9wdGlvbnMuekluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLmxheWVySWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFN0eWxlKHRoaXMub3B0aW9ucy5sYXllcklkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogb3ZlcnJpZGUgc3VwZXIgY2xhc3MnIG1ldGhvZCB0byBzZXQgdml6L29wYWMgYWZ0ZXIgc3ViIGxheWVycyBjcmVhdGVkICovXG4gICAgY3JlYXRlTGF5ZXJzOiBmdW5jdGlvbiAoZmVhdHVyZXMpIHtcbiAgICAgICAgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllci5wcm90b3R5cGUuY3JlYXRlTGF5ZXJzLmNhbGwodGhpcywgZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG4gICAgICAgIHRoaXMuc2V0T3BhY2l0eSh0aGlzLmN1cnJlbnRPcGFjaXR5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGluZGV4XG4gICAgICovXG4gICAgc2V0WkluZGV4IDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy56SW5kZXggPSBpbmRleDtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcblxuICAgICAgICAgICAgbGV0IGx5ciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICBpZihseXIuc2V0WkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5zZXRaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3VwZGF0ZVpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuX3VwZGF0ZVpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fcmVuZGVyZXIgJiYgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBseXIuX3JlbmRlcmVyLl9jb250YWluZXIuc3R5bGUuekluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2x1c3RlcmVkIGZlYXR1cmUgbGF5ZXIgY2hpbGQgXCIgKyBpZCArIFwiIGRvZXMgbm90IHN1cHBvcnQgb3JkZXJpbmcgdXNpbmcgei1pbmRleFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogKi9cbiAgICB0b2dnbGVWaXNpYmlsaXR5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gIXRoaXMuY3VycmVudFZpc2liaWxpdHk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcblxuICAgICAgICAvLyAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgIC8vICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS50b2dnbGVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0udG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBib29sIC0gZmxhZ1xuICAgICAqL1xuICAgIHNldFZpc2liaWxpdHk6IGZ1bmN0aW9uKGJvb2wpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gISFib29sO1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5yZW5kZXJlci5fY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucmVuZGVyZXIuX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gYm9vbCA/ICcnIDogJ25vbmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJvYmFibHkgaXMgYSBtb3JlIGVmZmljaWVudCB3YXkgdG8gZG8gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHRoaXMgd29ya3MgY3VycmVudGx5LlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGxvb2sgYXQgdXNpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gIG1hcmtlckNsdXN0ZXIucmVmcmVzaEljb25PcHRpb25zKHtjbGFzc05hbWU6J2ludmlzaWJsZSd9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGljb24gPSBqUXVlcnkobGF5ZXIuX2ljb24pO1xuICAgICAgICAgICAgICAgICAgICBpZihib29sKSBpY29uLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0VmlzaWJpbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShib29sKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGxheWVyLnNldFN0eWxlKVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRTdHlsZSh7ZGlzcGxheTogYm9vbCA/ICcnOidub25lJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAgb3BhY2l0eVxuICAgICAqL1xuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKG9wYWNpdHkpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPcGFjaXR5ID0gaXNOYU4ob3BhY2l0eSkgPyAxLjAgOiBvcGFjaXR5KjE7XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikuY3NzKHtvcGFjaXR5OiBvcGFjaXR5fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldE9wYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdwTGF5ZXJJZCAtIGlkZW50aWZpZXIgb2YgR1AgTGF5ZXIgQXNzZXQgdG8gbG9hZCBzdHlsZSBmb3JcbiAgICAgKi9cbiAgICBsb2FkU3R5bGU6IGZ1bmN0aW9uKGdwTGF5ZXJJZCkge1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcikge1xuXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIoZ3BMYXllcklkKS50aGVuKCBqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpZighanNvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGpzb24gJiYganNvbi5zdHlsZXMpIHsgICAvL29sZCBzdHlsZSBmdW5jdGlvbiwgbm90IHN1cmUgaWYgYmVpbmcgdXNlZCBjdXJyZW50bHlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMYXllciBcIiArIGdwTGF5ZXJJZCArIFwiIHVzaW5nIG9sZGVyIGpzb24uc3R5bGVzIGRlZmluaXRpb25cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVGbiA9IGZ1bmN0aW9uKGZlYXR1cmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0eSB8fCB0aGlzLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZmVhdHVyZVtwcm9wZXJ0eV0gfHwgKGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllc1twcm9wZXJ0eV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5zdHlsZXMuZmluZCggc3cgPT4gc3cudmFsdWUgPT09IHYgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gd3JhcHBlci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBtYXRjaGluZyBzdHlsZSBmb3IgXCIgKyBKU09OLnN0cmluZ2lmeShmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIHN0eWxlOiBcIiArIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUZuID0gKCkgPT4geyByZXR1cm4gZmVhdHVyZUZuKGpzb24pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAobGF5ZXIsIHN0eWxlKSA9PiB7IGxheWVyLnNldFN0eWxlKHN0eWxlKTsgfSwgMTAwMCwgdGhpcywgc3R5bGVGbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uICYmIHR5cGVvZihqc29uLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBtdWx0aXBsZSBzdHlsZXMgcmV0dXJuZWQuLi5cbiAgICAgICAgICAgICAgICAgICAgLy8gZ2VuZXJhdGUgYSBmdW5jdGlvbiB3aGljaCB3aWxsIHVzZSB0aG9zZSBmaWx0ZXJzIHRvIGFzc2lnbiBzdHlsZXMgcGVyIGZlYXR1cmVcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRm4gPSB0aGlzLnN0eWxlRnVuY3Rpb25GYWN0b3J5KGpzb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAobGF5ZXIsIHN0eWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRTdHlsZShzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDAsIHRoaXMsIHN0eWxlRm4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb247XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vdW5yZWNvZ25pemFibGUgc3R5bGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdHlsZS5zaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0galF1ZXJ5LmV4dGVuZCh7fSwgc3R5bGUpOyAvL1RPRE8gcmVtb3ZlIGpRdWVyeSBkZXBlbmRlbmN5XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncFN0eWxlID0gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXRTdHlsZSBvbiBDbHVzdGVyLkZlYXR1cmVMYXllciBkb2Vzbid0IGFwcGVhciB0byB3b3JrIGNvbnNpc3RlbnRseSBmb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9uLWNsdXN0ZXJlZCBmZWF0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdHlsZShvYmopO1xuICAgICAgICAgICAgICAgICAgICAvL1NvIGluc3RlYWQsIHdlIG1hbnVhbGx5IHNldCBpdCBvbiBhbGwgZmVhdHVyZXMgb2YgdGhlIGxheWVyICh0aGF0IGFyZW4ndCBjbHVzdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRTdHlsZShvYmopO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbRVJST1JdIEVycm9yIGZldGNoaW5nIEZlYXR1cmVMYXllciAoXCIgKyBncExheWVySWQgKyBcIikgc3R5bGU6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHlsZUZ1bmN0aW9uRmFjdG9yeShzdHlsZXMpIHtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZmVhdHVyZSkge1xuXG4gICAgICAgICAgICBpZiggIXN0eWxlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbV0FSTl0gTm8gc3R5bGVzIGRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7ICAgLy9lbXB0eSBzdHlsZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9pZiBhIGRlZmF1bHQgc3R5bGUgaXMgZGVmaW5lZCwgcmVtZW1iZXIgaXQganVzdCBpbiBjYXNlXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFN0eWxlID0gc3R5bGVzWzBdOyAgIC8vVE9ETyBsb29rIGZvciAnZGVmYXVsdFN5bWJvbCdcblxuICAgICAgICAgICAgbGV0IG1hdGNoID0gc3R5bGVzLmZpbmQoIHN0eWxlID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCAhc3R5bGUuZmlsdGVyICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0eWxlcyBoYXZlIG5vIGZpbHRlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRTdHlsZTsgICAgLy9qdXN0IHJldHVybiBkZWZhdWx0XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoICFzdHlsZS5maWx0ZXIucHJvcGVydHkgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gZmlsdGVyYWJsZSBwcm9wZXJ0eSBkZWZpbmVkXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFN0eWxlOyAgIC8vanVzdCByZXR1cm4gZGVmYXVsdFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBhY3R1YWwgPSBmZWF0dXJlLnByb3BlcnRpZXNbc3R5bGUuZmlsdGVyLnByb3BlcnR5XTtcbiAgICAgICAgICAgICAgICBpZiggYWN0dWFsID09PSB1bmRlZmluZWQgfHwgYWN0dWFsID09PSBudWxsICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk5vIGZpbHRlcmFibGUgcHJvcGVydHkgdmFsdWUgcHJlc2VudFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRTdHlsZTsgICAvL2p1c3QgcmV0dXJuIGRlZmF1bHRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgbWluID0gaXNOYU4oc3R5bGUuZmlsdGVyLm1pbikgPyBudWxsIDogc3R5bGUuZmlsdGVyLm1pbioxO1xuICAgICAgICAgICAgICAgIGxldCBtYXggPSBpc05hTihzdHlsZS5maWx0ZXIubWF4KSA/IG51bGwgOiBzdHlsZS5maWx0ZXIubWF4KjE7XG4gICAgICAgICAgICAgICAgbGV0IGV4cGVjdGVkID0gc3R5bGUuZmlsdGVyLnZhbHVlO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJyR7YWN0dWFsfScgdG8gJyR7ZXhwZWN0ZWR9JyBhbmQgJyR7bWlufScgLSAnJHttYXh9J2ApO1xuXG4gICAgICAgICAgICAgICAgaWYoIGV4cGVjdGVkICE9PSB1bmRlZmluZWQgJiYgZXhwZWN0ZWQgIT09IG51bGwgJiYgYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggKG1pbiAhPT0gbnVsbCB8fCBtYXggIT09IG51bGwpICYmICFpc05hTihhY3R1YWwpICkge1xuICAgICAgICAgICAgICAgICAgICBpZihtaW4gIT09IG51bGwgJiYgbWF4ICE9PSBudWxsICYmIG1pbiA8PSBhY3R1YWwgJiYgYWN0dWFsIDw9IG1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWluICE9PSBudWxsICYmIG1pbiA8PSBhY3R1YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1heCAhPT0gbnVsbCAmJiBhY3R1YWwgPD0gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDsgICAgLy9kb24ndCByZXR1cm4gZGVmYXVsdCBoZXJlLCBqdXN0IG51bGwgKGluc2lkZSBsb29wKVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYXRjaCB8fCBkZWZhdWx0U3R5bGU7XG4gICAgICAgIH07XG4gICAgfVxufSk7XG5cblxuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGNsdXN0ZXJlZEZlYXR1cmVzKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdHlsZVJlc29sdmVyID9cbiAgICAgICAgb3B0aW9ucy5zdHlsZVJlc29sdmVyIDogZmVhdHVyZVN0eWxlUmVzb2x2ZXI7XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiB1cmwgKyAnLycgKyBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZVJlc29sdmVyLFxuICAgICAgICBsYXllcklkOiBsYXllci5pZFxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtICBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtICBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gZ2VvSnNvbkZlZWQobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IGxheWVyVXJsID0gdXJsICsgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgK1xuICAgICAgICBsYXllci5pZCArICcvRmVhdHVyZVNlcnZlci8nICsgbGF5ZXIubGF5ZXJOYW1lO1xuXG4gICAgbGV0IHN0eWxlVXJsID0gdXJsLnJlcGxhY2UoJ2ZlZWRzJywnc3R5bGVzJykgK1xuICAgICAgICAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArIGxheWVyLmlkO1xuXG4gICAgbGV0IHN0eWxlTG9hZGVyRmFjdG9yeSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGxheWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIWpRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGxvYWQgR2VvSlNPTiBmZWVkIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGpRdWVyeS5hamF4KHVybCwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTonanNvbicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHsgcmVzb2x2ZShkYXRhKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW0gPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtsYXllcklkfSA6ICR7bWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoZW0pICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiBsYXllclVybCxcbiAgICAgICAgaXNNb2Rlcm46IHRydWUsICAgICAgICAgLy9mb3JjZSB0byB1c2UgR2VvSlNPTlxuICAgICAgICBsYXllcklkOiBsYXllci5pZCwgICAgLy91c2VkIGJ5IHN0eWxlIGxvYWRlclxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVMb2FkZXJGYWN0b3J5KHN0eWxlVXJsKVxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcblxufVxuXG5cbmV4cG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59O1xuIl19