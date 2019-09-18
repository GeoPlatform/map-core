/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { Config } from '@geoplatform/client';
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import BaseClusteredFeatureLayer from './base-clustered-feature-layer';
import featureStyleResolver from '../shared/style-resolver';
import featurePopupTemplate from '../shared/popup-template';
const ɵ0 = /**
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
    let marker = null;
    if (style.shape === 'image') {
        /** @type {?} */
        let width = style.width || 16;
        /** @type {?} */
        let height = style.height || 16;
        /** @type {?} */
        var icon = iconFn({
            iconUrl: style.content,
            //base64 encoded string
            iconSize: [width, height],
            iconAnchor: [width * 0.5, height * 0.5],
            popupAnchor: [0, -11],
        });
        /** @type {?} */
        let mopts = { icon: icon };
        if (Config.leafletPane)
            ((/** @type {?} */ (mopts))).pane = Config.leafletPane;
        marker = markerFn(latlng, mopts);
    }
    else {
        marker = circleMarkerFn(latlng, style);
    }
    /** @type {?} */
    let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
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
    let getGPStyle = (/**
     * @return {?}
     */
    () => { return this._gpStyle; });
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    //in order to put features-based layers into same pane as tile layers,
    // must specify renderer and set desired pane on that
    /** @type {?} */
    let svgOpts = {};
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
        let lyr = this._layers[id];
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
        for (let id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            let layer = this.cluster._featureGroup._layers[id];
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
        for (let id in this._layers) {
            /** @type {?} */
            let layer = this._layers[id];
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
        for (let id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            let layer = this.cluster._featureGroup._layers[id];
            if (layer._icon) {
                jQuery(layer._icon).css({ opacity: opacity });
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
    if (this.options.styleLoader) {
        this.options.styleLoader(gpLayerId).then((/**
         * @param {?} json
         * @return {?}
         */
        json => {
            if (!json)
                return;
            /** @type {?} */
            let style = null;
            if (json && json.styles) {
                /** @type {?} */
                let featureFn = (/**
                 * @param {?} feature
                 * @return {?}
                 */
                function (feature) {
                    /** @type {?} */
                    let property = this.property || this.field1;
                    /** @type {?} */
                    let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                    /** @type {?} */
                    let style = null;
                    if (this.styles) {
                        /** @type {?} */
                        let wrapper = this.styles.find((/**
                         * @param {?} sw
                         * @return {?}
                         */
                        sw => sw.value === v));
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
                let styleFn = (/**
                 * @return {?}
                 */
                () => { return featureFn(json); });
                this.options.style = styleFn;
                setTimeout((/**
                 * @param {?} layer
                 * @param {?} style
                 * @return {?}
                 */
                (layer, style) => { layer.setStyle(style); }), 1000, this, styleFn);
                return;
            }
            else if (json && typeof (json.push) !== 'undefined') {
                //multiple styles returned
                if (json[0].filter) { //if the styles have filters associated...
                    //if the styles have filters associated...
                    //generate a function which will use those filters to assign styles per feature
                    /** @type {?} */
                    let styleFn = (/**
                     * @param {?} feature
                     * @return {?}
                     */
                    (feature) => {
                        /** @type {?} */
                        let match = json.find((/**
                         * @param {?} stl
                         * @return {?}
                         */
                        stl => {
                            /** @type {?} */
                            let actual = feature.properties[stl.filter.property];
                            if (actual === undefined || actual === null)
                                return null;
                            /** @type {?} */
                            let min = isNaN(stl.filter.min) ? null : stl.filter.min * 1;
                            /** @type {?} */
                            let max = isNaN(stl.filter.max) ? null : stl.filter.max * 1;
                            /** @type {?} */
                            let expected = stl.filter.value;
                            if (expected !== undefined && expected !== null && actual == expected) {
                                return stl;
                            }
                            else if ((min !== null || max !== null) && !isNaN(actual)) {
                                if (min !== null && max !== null && min <= actual && actual <= max) {
                                    return stl;
                                }
                                else if (min !== null && min <= actual) {
                                    return stl;
                                }
                                else if (max !== null && actual <= max) {
                                    return stl;
                                }
                            }
                            return null;
                        }));
                        return match;
                    });
                    this.options.style = styleFn;
                    setTimeout((/**
                     * @param {?} layer
                     * @param {?} style
                     * @return {?}
                     */
                    (layer, style) => { layer.setStyle(style); }), 1000, this, styleFn);
                    return;
                }
                else {
                    style = json[0]; //use first for now
                }
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
                this._gpStyle = style;
                //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                // non-clustered features.
                // this.setStyle(obj);
                //So instead, we manually set it on all features of the layer (that aren't clustered)
                for (let id in this._layers)
                    this._layers[id].setStyle(obj);
            }
        }))
            .catch((/**
         * @param {?} e
         * @return {?}
         */
        e => {
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
    let styleLoaderFactory = (/**
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
            (resolve, reject) => {
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
                        let em = `geoJsonFeed() -
                            Error loading style information for layer ${layerId} : ${message}`;
                        reject(new Error(em));
                    })
                });
            }));
        });
    });
    /** @type {?} */
    let opts = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztNQUMzQixNQUFNLEdBQUcsTUFBTTtBQUVyQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUVILElBQUksSUFBSSxNQUFNLEVBQ2QsTUFBTSxJQUFJLFFBQVEsRUFDbEIsWUFBWSxJQUFJLGNBQWMsRUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUN4QixJQUFJLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyx5QkFBeUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN2RSxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztBQW9CeEMsVUFBVSxPQUFPLEVBQUUsTUFBTTs7UUFFakMsS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtJQUMzRSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1FBQ25ELDZDQUE2QztRQUM3QyxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtLQUNKO0lBRUQsS0FBSyxHQUFH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Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2IsUUFBUSxFQUFDLE1BQU07b0JBQ2YsT0FBTzs7OztvQkFBRSxVQUFTLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzFDLEtBQUs7Ozs7OztvQkFBRSxVQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTzs7NEJBQzVCLEVBQUUsR0FBRzt3RUFDdUMsT0FBTyxNQUFNLE9BQU8sRUFBRTt3QkFDdEUsTUFBTSxDQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7b0JBQzVCLENBQUMsQ0FBQTtpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQztJQUNOLENBQUMsQ0FBQTs7UUFFRyxJQUFJLEdBQUc7UUFDUCxHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxJQUFJOztRQUNkLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTs7UUFDakIsV0FBVyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztLQUM1QztJQUVELElBQUcsTUFBTSxDQUFDLFdBQVc7UUFBRSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDL0QsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVc7UUFBRSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFFNUUsT0FBTyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBRTNDLENBQUM7QUFHRCxPQUFPLEVBQ0gscUJBQXFCLElBQUksT0FBTyxFQUNoQyxxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IHtcbiAgICBDb250cm9sLFxuICAgIGljb24gYXMgaWNvbkZuLFxuICAgIG1hcmtlciBhcyBtYXJrZXJGbixcbiAgICBjaXJjbGVNYXJrZXIgYXMgY2lyY2xlTWFya2VyRm4sXG4gICAgU1ZHLCBzdmcsIENhbnZhcywgY2FudmFzLFxuICAgIFV0aWwsXG4gICAgTGF5ZXJcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyIGZyb20gJy4vYmFzZS1jbHVzdGVyZWQtZmVhdHVyZS1sYXllcic7XG5pbXBvcnQgZmVhdHVyZVN0eWxlUmVzb2x2ZXIgZnJvbSAnLi4vc2hhcmVkL3N0eWxlLXJlc29sdmVyJztcbmltcG9ydCBmZWF0dXJlUG9wdXBUZW1wbGF0ZSBmcm9tICcuLi9zaGFyZWQvcG9wdXAtdGVtcGxhdGUnO1xuXG5cbi8qKlxuICogQ2x1c3RlcmVkIEZlYXR1cmUgTGF5ZXJcbiAqIFByb3ZpZGVzIGN1c3RvbSBzdHlsZSBsb2FkaW5nIGFuZCBwb2ludC1pbGl6YXRpb24gYXMgd2VsbFxuICogYXMgYWRkaW5nIHZpc2liaWxpdHkgYW5kIG9wYWNpdHkgbWFuaXB1bGF0aW9uIG1ldGhvZHNcbiAqL1xudmFyIENsdXN0ZXJlZEZlYXR1cmVMYXllciA9IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIuZXh0ZW5kKHtcblxuICAgIGN1cnJlbnRWaXNpYmlsaXR5OiB0cnVlLFxuICAgIGN1cnJlbnRPcGFjaXR5OiAxLjAsXG5cbiAgICBfZ3BTdHlsZSA6IHsgY29sb3I6IFwiIzAwZlwiLCB3ZWlnaHQ6IDIsIGZpbGxDb2xvcjogJyMwMGYnLCBmaWxsT3BhY2l0eTogMC4zIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIGZlYXR1cmUgLSBHZW9KU09OIFBvaW50IEZlYXR1cmVcbiAgICAgKiBAcGFyYW0gbGF0bG5nIC0gTC5MYXRMbmdcbiAgICAgKiBAcmV0dXJuIEwuTWFya2VyXG4gICAgICovXG4gICAgcG9pbnRUb0xheWVyRm46IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcblxuICAgICAgICB2YXIgc3R5bGUgPSBmZWF0dXJlICYmIGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllcy5zdHlsZSA6IG51bGw7XG4gICAgICAgIGlmKCFzdHlsZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIGxvY2FsIHN0eWxlIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZShmZWF0dXJlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgdXNpbmcgc3R5bGUgZnVuY3Rpb24gaW4gQ2x1c3RlcmVkRmVhdHVyZUxheWVyOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZSA9IHN0eWxlIHx8IHRoaXMub3B0aW9ucy5zdHlsZSB8fCB7fTtcbiAgICAgICAgc3R5bGUucmFkaXVzICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgIHN0eWxlLndlaWdodCAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLndlaWdodCB8fCAyO1xuICAgICAgICBzdHlsZS5jb2xvciAgICAgICA9IHN0eWxlLnN0cm9rZSB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLm9wYWNpdHkgICAgID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICBzdHlsZS5maWxsQ29sb3IgICA9IHN0eWxlLmZpbGwgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5yZW5kZXJlciAgICA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjsgIC8vaW1wb3J0YW50IGZvciBwYW5lIVxuXG4gICAgICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgICAgICBpZihzdHlsZS5zaGFwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gc3R5bGUud2lkdGggfHwgMTY7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gc3R5bGUuaGVpZ2h0IHx8IDE2O1xuICAgICAgICAgICAgdmFyIGljb24gPSBpY29uRm4oIHtcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBzdHlsZS5jb250ZW50LCAvL2Jhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICAgICAgICAgICAgICAgIGljb25TaXplOiBbd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgaWNvbkFuY2hvcjogW3dpZHRoKjAuNSwgaGVpZ2h0KjAuNV0sXG4gICAgICAgICAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgbW9wdHMgPSB7IGljb246IGljb24gfTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG1vcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgIG1hcmtlciA9IG1hcmtlckZuKCBsYXRsbmcsIG1vcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlciA9IGNpcmNsZU1hcmtlckZuKGxhdGxuZywgc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvcHVwVGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucG9wdXBUZW1wbGF0ZSB8fCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChwb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBmb3IgYWxsIG5vbi1wb2ludCBmZWF0dXJlcywgYmluZCBhIHBvcHVwXG4gICAgICogQHBhcmFtICBmZWF0dXJlIC0gR2VvSlNPTiBmZWF0dXJlXG4gICAgICogQHBhcmFtIGxheWVyIC0gTC5MYXllciByZXByZXNlbnRpbmcgZmVhdHVyZVxuICAgICAqL1xuICAgIGVhY2hGZWF0dXJlRm46IGZ1bmN0aW9uKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIGlmKCFmZWF0dXJlIHx8ICFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmJpbmRQb3B1cChmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG4gICAgfSxcblxuXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICBvcHRpb25zLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICAgICAgb3B0aW9ucy5wb2ludFRvTGF5ZXIgPSBVdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXJGbiwgdGhpcyk7XG4gICAgICAgIG9wdGlvbnMub25FYWNoRmVhdHVyZSA9IFV0aWwuYmluZCh0aGlzLmVhY2hGZWF0dXJlRm4sIHRoaXMpO1xuICAgICAgICAvLyBvcHRpb25zLmZpZWxkcyA9IFsnRklEJywgJ3R5cGUnLCAndGl0bGUnLCAnZ2VvbWV0cnknXTtcblxuICAgICAgICAvL0luY3JlYXNlIGZyb20gMSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSBmcm9tIHRoZSBjZW50ZXIgdGhhdCBzcGlkZXJmaWVkIG1hcmtlcnMgYXJlIHBsYWNlZC5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBpbmNyZWFzZWQgdG8gZW5zdXJlIGFsbCBtYXJrZXJzIGNhbiBiZSBjbGlja2VkXG4gICAgICAgIC8vIHdoZW4gc3BpZGVyZmllZCAoc29tZSBnZXQgc3R1Y2sgdW5kZXIgdGhlIHNwaWRlciBsZWdzKVxuICAgICAgICBvcHRpb25zLnNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyID0gMjtcblxuICAgICAgICBsZXQgZ2V0R1BTdHlsZSA9ICgpID0+IHsgcmV0dXJuIHRoaXMuX2dwU3R5bGU7IH07XG4gICAgICAgIG9wdGlvbnMuc3R5bGUgPSBvcHRpb25zLnN0eWxlIHx8IGdldEdQU3R5bGU7XG4gICAgICAgIGlmKG9wdGlvbnMuc3R5bGVSZXNvbHZlcikge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVJlc29sdmVyID0gb3B0aW9ucy5zdHlsZVJlc29sdmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pbiBvcmRlciB0byBwdXQgZmVhdHVyZXMtYmFzZWQgbGF5ZXJzIGludG8gc2FtZSBwYW5lIGFzIHRpbGUgbGF5ZXJzLFxuICAgICAgICAvLyBtdXN0IHNwZWNpZnkgcmVuZGVyZXIgYW5kIHNldCBkZXNpcmVkIHBhbmUgb24gdGhhdFxuICAgICAgICBsZXQgc3ZnT3B0cyA9IHsgfTtcbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgKHN2Z09wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSAoU1ZHICYmIHN2ZyhzdmdPcHRzKSkgfHwgKENhbnZhcyAmJiBjYW52YXMoKSk7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy56SW5kZXggIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4KHRoaXMub3B0aW9ucy56SW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMubGF5ZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkU3R5bGUodGhpcy5vcHRpb25zLmxheWVySWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBvdmVycmlkZSBzdXBlciBjbGFzcycgbWV0aG9kIHRvIHNldCB2aXovb3BhYyBhZnRlciBzdWIgbGF5ZXJzIGNyZWF0ZWQgKi9cbiAgICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5jcmVhdGVMYXllcnMuY2FsbCh0aGlzLCBmZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcbiAgICAgICAgdGhpcy5zZXRPcGFjaXR5KHRoaXMuY3VycmVudE9wYWNpdHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBzZXRaSW5kZXggOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnpJbmRleCA9IGluZGV4O1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuXG4gICAgICAgICAgICBsZXQgbHlyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgIGlmKGx5ci5zZXRaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLnNldFpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fdXBkYXRlWkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5fdXBkYXRlWkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl9yZW5kZXJlciAmJiBseXIuX3JlbmRlcmVyLl9jb250YWluZXIpe1xuICAgICAgICAgICAgICAgIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lci5zdHlsZS56SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJDbHVzdGVyZWQgZmVhdHVyZSBsYXllciBjaGlsZCBcIiArIGlkICsgXCIgZG9lcyBub3Qgc3VwcG9ydCBvcmRlcmluZyB1c2luZyB6LWluZGV4XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiAqL1xuICAgIHRvZ2dsZVZpc2liaWxpdHk6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhdGhpcy5jdXJyZW50VmlzaWJpbGl0eTtcbiAgICAgICAgdGhpcy5zZXRWaXNpYmlsaXR5KHRoaXMuY3VycmVudFZpc2liaWxpdHkpO1xuXG4gICAgICAgIC8vIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgLy8gICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAvLyAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLnRvZ2dsZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIC8vIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGJvb2wgLSBmbGFnXG4gICAgICovXG4gICAgc2V0VmlzaWJpbGl0eTogZnVuY3Rpb24oYm9vbCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhIWJvb2w7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnJlbmRlcmVyLl9jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5yZW5kZXJlci5fY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBib29sID8gJycgOiAnbm9uZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9iYWJseSBpcyBhIG1vcmUgZWZmaWNpZW50IHdheSB0byBkbyB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgdGhpcyB3b3JrcyBjdXJyZW50bHkuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbG9vayBhdCB1c2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyAgbWFya2VyQ2x1c3Rlci5yZWZyZXNoSWNvbk9wdGlvbnMoe2NsYXNzTmFtZTonaW52aXNpYmxlJ30pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGpRdWVyeShsYXllci5faWNvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJvb2wpIGljb24ucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGljb24uYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRWaXNpYmlsaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGJvb2wpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYobGF5ZXIuc2V0U3R5bGUpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFN0eWxlKHtkaXNwbGF5OiBib29sID8gJyc6J25vbmUnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICBvcGFjaXR5XG4gICAgICovXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24ob3BhY2l0eSkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudE9wYWNpdHkgPSBpc05hTihvcGFjaXR5KSA/IDEuMCA6IG9wYWNpdHkqMTtcblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS5jc3Moe29wYWNpdHk6IG9wYWNpdHl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0T3BhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdHlsZTogZnVuY3Rpb24oc3R5bGUpIHtcbiAgICAgICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIGxvYWRTdHlsZTogZnVuY3Rpb24oZ3BMYXllcklkKSB7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKSB7XG5cbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcihncExheWVySWQpLnRoZW4oIGpzb24gPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIWpzb24pIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihqc29uICYmIGpzb24uc3R5bGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVGbiA9IGZ1bmN0aW9uKGZlYXR1cmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0eSB8fCB0aGlzLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZmVhdHVyZVtwcm9wZXJ0eV0gfHwgKGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllc1twcm9wZXJ0eV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5zdHlsZXMuZmluZCggc3cgPT4gc3cudmFsdWUgPT09IHYgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gd3JhcHBlci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBtYXRjaGluZyBzdHlsZSBmb3IgXCIgKyBKU09OLnN0cmluZ2lmeShmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIHN0eWxlOiBcIiArIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUZuID0gKCkgPT4geyByZXR1cm4gZmVhdHVyZUZuKGpzb24pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAobGF5ZXIsIHN0eWxlKSA9PiB7IGxheWVyLnNldFN0eWxlKHN0eWxlKTsgfSwgMTAwMCwgdGhpcywgc3R5bGVGbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uICYmIHR5cGVvZihqc29uLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL211bHRpcGxlIHN0eWxlcyByZXR1cm5lZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGpzb25bMF0uZmlsdGVyKSB7ICAgIC8vaWYgdGhlIHN0eWxlcyBoYXZlIGZpbHRlcnMgYXNzb2NpYXRlZC4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dlbmVyYXRlIGEgZnVuY3Rpb24gd2hpY2ggd2lsbCB1c2UgdGhvc2UgZmlsdGVycyB0byBhc3NpZ24gc3R5bGVzIHBlciBmZWF0dXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVGbiA9IChmZWF0dXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoID0ganNvbi5maW5kKCBzdGwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0dWFsID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3N0bC5maWx0ZXIucHJvcGVydHldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhY3R1YWwgPT09IHVuZGVmaW5lZCB8fCBhY3R1YWwgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWluID0gaXNOYU4oc3RsLmZpbHRlci5taW4pID8gbnVsbCA6IHN0bC5maWx0ZXIubWluKjE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtYXggPSBpc05hTihzdGwuZmlsdGVyLm1heCkgPyBudWxsIDogc3RsLmZpbHRlci5tYXgqMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4cGVjdGVkID0gc3RsLmZpbHRlci52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggZXhwZWN0ZWQgIT09IHVuZGVmaW5lZCAmJiBleHBlY3RlZCAhPT0gbnVsbCAmJiBhY3R1YWwgPT0gZXhwZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAobWluICE9PSBudWxsIHx8IG1heCAhPT0gbnVsbCkgJiYgIWlzTmFOKGFjdHVhbCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtaW4gIT09IG51bGwgJiYgbWF4ICE9PSBudWxsICYmIG1pbiA8PSBhY3R1YWwgJiYgYWN0dWFsIDw9IG1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobWluICE9PSBudWxsICYmIG1pbiA8PSBhY3R1YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1heCAhPT0gbnVsbCAmJiBhY3R1YWwgPD0gbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0bDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGVGbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIChsYXllciwgc3R5bGUpID0+IHsgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpOyB9LCAxMDAwLCB0aGlzLCBzdHlsZUZuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uWzBdOyAgLy91c2UgZmlyc3QgZm9yIG5vd1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb247XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vdW5yZWNvZ25pemFibGUgc3R5bGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdHlsZS5zaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0galF1ZXJ5LmV4dGVuZCh7fSwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBvYmouc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3BTdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0U3R5bGUgb24gQ2x1c3Rlci5GZWF0dXJlTGF5ZXIgZG9lc24ndCBhcHBlYXIgdG8gd29yayBjb25zaXN0ZW50bHkgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vbi1jbHVzdGVyZWQgZmVhdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3R5bGUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy9TbyBpbnN0ZWFkLCB3ZSBtYW51YWxseSBzZXQgaXQgb24gYWxsIGZlYXR1cmVzIG9mIHRoZSBsYXllciAodGhhdCBhcmVuJ3QgY2x1c3RlcmVkKVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0uc2V0U3R5bGUob2JqKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZmVhdHVyZSBsYXllciBzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgY2x1c3RlcmVkRmVhdHVyZXMoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBzdHlsZVJlc29sdmVyID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgP1xuICAgICAgICBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgOiBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IHVybCArICcvJyArIGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgc3R5bGVMb2FkZXI6IHN0eWxlUmVzb2x2ZXIsXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBnZW9Kc29uRmVlZChsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGdlb0pzb25GZWVkKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgbGF5ZXJVcmwgPSB1cmwgKyAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArXG4gICAgICAgIGxheWVyLmlkICsgJy9GZWF0dXJlU2VydmVyLycgKyBsYXllci5sYXllck5hbWU7XG5cbiAgICBsZXQgc3R5bGVVcmwgPSB1cmwucmVwbGFjZSgnZmVlZHMnLCdzdHlsZXMnKSArXG4gICAgICAgICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICsgbGF5ZXIuaWQ7XG5cbiAgICBsZXQgc3R5bGVMb2FkZXJGYWN0b3J5ID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobGF5ZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBHZW9KU09OIGZlZWQgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgalF1ZXJ5LmFqYXgodXJsLCB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOidqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkgeyByZXNvbHZlKGRhdGEpOyB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbSA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2xheWVySWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoIG5ldyBFcnJvcihlbSkgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IGxheWVyVXJsLFxuICAgICAgICBpc01vZGVybjogdHJ1ZSwgICAgICAgICAvL2ZvcmNlIHRvIHVzZSBHZW9KU09OXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkLCAgICAvL3VzZWQgYnkgc3R5bGUgbG9hZGVyXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZUxvYWRlckZhY3Rvcnkoc3R5bGVVcmwpXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xuXG59XG5cblxuZXhwb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn07XG4iXX0=