/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { Config } from '@geoplatform/client';
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import BaseClusteredFeatureLayer from './base-clustered-feature-layer';
import featureStyleResolver from '../shared/style-resolver';
import featurePopupTemplate from '../shared/popup-template';
const ɵ0 = function (feature, latlng) {
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
        if (Config["leafletPane"])
            (/** @type {?} */ (mopts)).pane = Config["leafletPane"];
        marker = markerFn(latlng, mopts);
    }
    else {
        marker = circleMarkerFn(latlng, style);
    }
    /** @type {?} */
    let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
    marker.bindPopup(popupTemplate(feature));
    return marker;
}, ɵ1 = function (feature, layer) {
    if (!feature || !feature.geometry || feature.geometry.type === 'Point') {
        return;
    }
    layer.bindPopup(featurePopupTemplate(feature));
}, ɵ2 = function (options) {
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
        for (let id in this.cluster._featureGroup._layers) {
            /** @type {?} */
            let layer = this.cluster._featureGroup._layers[id];
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
        for (let id in this._layers) {
            /** @type {?} */
            let layer = this._layers[id];
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
}, ɵ9 = function (style) {
    this.eachFeature(function (layer) {
        this.setFeatureStyle(layer.feature.id, style);
    }, this);
}, ɵ10 = function (gpLayerId) {
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
            return new Promise((resolve, reject) => {
                if (!jQuery) {
                    reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                }
                jQuery.ajax(url, {
                    dataType: 'json',
                    success: function (data) { resolve(data); },
                    error: function (xhr, status, message) {
                        /** @type {?} */
                        let em = `geoJsonFeed() -
                            Error loading style information for layer ${layerId} : ${message}`;
                        reject(new Error(em));
                    }
                });
            });
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
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTdDLE9BQU8sRUFFSCxJQUFJLElBQUksTUFBTSxFQUNkLE1BQU0sSUFBSSxRQUFRLEVBQ2xCLFlBQVksSUFBSSxjQUFjLEVBQzlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUVQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8seUJBQXlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO1dBb0J4QyxVQUFVLE9BQU8sRUFBRSxNQUFNOztJQUVyQyxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFOztRQUVuRCxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtLQUNKO0lBRUQsS0FBSyxH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YXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmltcG9ydCB7XG4gICAgQ29udHJvbCxcbiAgICBpY29uIGFzIGljb25GbixcbiAgICBtYXJrZXIgYXMgbWFya2VyRm4sXG4gICAgY2lyY2xlTWFya2VyIGFzIGNpcmNsZU1hcmtlckZuLFxuICAgIFNWRywgc3ZnLCBDYW52YXMsIGNhbnZhcyxcbiAgICBVdGlsLFxuICAgIExheWVyXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllciBmcm9tICcuL2Jhc2UtY2x1c3RlcmVkLWZlYXR1cmUtbGF5ZXInO1xuaW1wb3J0IGZlYXR1cmVTdHlsZVJlc29sdmVyIGZyb20gJy4uL3NoYXJlZC9zdHlsZS1yZXNvbHZlcic7XG5pbXBvcnQgZmVhdHVyZVBvcHVwVGVtcGxhdGUgZnJvbSAnLi4vc2hhcmVkL3BvcHVwLXRlbXBsYXRlJztcblxuXG4vKipcbiAqIENsdXN0ZXJlZCBGZWF0dXJlIExheWVyXG4gKiBQcm92aWRlcyBjdXN0b20gc3R5bGUgbG9hZGluZyBhbmQgcG9pbnQtaWxpemF0aW9uIGFzIHdlbGxcbiAqIGFzIGFkZGluZyB2aXNpYmlsaXR5IGFuZCBvcGFjaXR5IG1hbmlwdWxhdGlvbiBtZXRob2RzXG4gKi9cbnZhciBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgPSBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLmV4dGVuZCh7XG5cbiAgICBjdXJyZW50VmlzaWJpbGl0eTogdHJ1ZSxcbiAgICBjdXJyZW50T3BhY2l0eTogMS4wLFxuXG4gICAgX2dwU3R5bGUgOiB7IGNvbG9yOiBcIiMwMGZcIiwgd2VpZ2h0OiAyLCBmaWxsQ29sb3I6ICcjMDBmJywgZmlsbE9wYWNpdHk6IDAuMyB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIFBvaW50IEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF0TG5nfSBsYXRsbmdcbiAgICAgKiBAcmV0dXJuIHtMLk1hcmtlcn1cbiAgICAgKi9cbiAgICBwb2ludFRvTGF5ZXJGbjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IGZlYXR1cmUgJiYgZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzLnN0eWxlIDogbnVsbDtcbiAgICAgICAgaWYoIXN0eWxlICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMuc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgbG9jYWwgc3R5bGUgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB1c2luZyBzdHlsZSBmdW5jdGlvbiBpbiBDbHVzdGVyZWRGZWF0dXJlTGF5ZXI6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlID0gc3R5bGUgfHwgdGhpcy5vcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgICAgICBzdHlsZS5yYWRpdXMgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS5yYWRpdXMgfHwgNDtcbiAgICAgICAgc3R5bGUud2VpZ2h0ICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgIHN0eWxlLmNvbG9yICAgICAgID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUub3BhY2l0eSAgICAgPSBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuOTtcbiAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjM7XG4gICAgICAgIHN0eWxlLmZpbGxDb2xvciAgID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLnJlbmRlcmVyICAgID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyOyAgLy9pbXBvcnRhbnQgZm9yIHBhbmUhXG5cbiAgICAgICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmKHN0eWxlLnNoYXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBzdHlsZS53aWR0aCB8fCAxNjtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBzdHlsZS5oZWlnaHQgfHwgMTY7XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGljb25Gbigge1xuICAgICAgICAgICAgICAgIGljb25Vcmw6IHN0eWxlLmNvbnRlbnQsIC8vYmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICBpY29uQW5jaG9yOiBbd2lkdGgqMC41LCBoZWlnaHQqMC41XSxcbiAgICAgICAgICAgICAgICBwb3B1cEFuY2hvcjogWzAsIC0xMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBtb3B0cyA9IHsgaWNvbjogaWNvbiB9O1xuICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAobW9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgbWFya2VyID0gbWFya2VyRm4oIGxhdGxuZywgbW9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFya2VyID0gY2lyY2xlTWFya2VyRm4obGF0bG5nLCBzdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9wdXBUZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wb3B1cFRlbXBsYXRlIHx8IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGZvciBhbGwgbm9uLXBvaW50IGZlYXR1cmVzLCBiaW5kIGEgcG9wdXBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gZmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXllcn0gbGF5ZXIgLSBsYXllciByZXByZXNlbnRpbmcgZmVhdHVyZVxuICAgICAqL1xuICAgIGVhY2hGZWF0dXJlRm46IGZ1bmN0aW9uKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIGlmKCFmZWF0dXJlIHx8ICFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmJpbmRQb3B1cChmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG4gICAgfSxcblxuXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICBvcHRpb25zLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICAgICAgb3B0aW9ucy5wb2ludFRvTGF5ZXIgPSBVdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXJGbiwgdGhpcyk7XG4gICAgICAgIG9wdGlvbnMub25FYWNoRmVhdHVyZSA9IFV0aWwuYmluZCh0aGlzLmVhY2hGZWF0dXJlRm4sIHRoaXMpO1xuICAgICAgICAvLyBvcHRpb25zLmZpZWxkcyA9IFsnRklEJywgJ3R5cGUnLCAndGl0bGUnLCAnZ2VvbWV0cnknXTtcblxuICAgICAgICAvL0luY3JlYXNlIGZyb20gMSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSBmcm9tIHRoZSBjZW50ZXIgdGhhdCBzcGlkZXJmaWVkIG1hcmtlcnMgYXJlIHBsYWNlZC5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBpbmNyZWFzZWQgdG8gZW5zdXJlIGFsbCBtYXJrZXJzIGNhbiBiZSBjbGlja2VkXG4gICAgICAgIC8vIHdoZW4gc3BpZGVyZmllZCAoc29tZSBnZXQgc3R1Y2sgdW5kZXIgdGhlIHNwaWRlciBsZWdzKVxuICAgICAgICBvcHRpb25zLnNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyID0gMjtcblxuICAgICAgICBsZXQgZ2V0R1BTdHlsZSA9ICgpID0+IHsgcmV0dXJuIHRoaXMuX2dwU3R5bGU7IH07XG4gICAgICAgIG9wdGlvbnMuc3R5bGUgPSBvcHRpb25zLnN0eWxlIHx8IGdldEdQU3R5bGU7XG4gICAgICAgIGlmKG9wdGlvbnMuc3R5bGVSZXNvbHZlcikge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVJlc29sdmVyID0gb3B0aW9ucy5zdHlsZVJlc29sdmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pbiBvcmRlciB0byBwdXQgZmVhdHVyZXMtYmFzZWQgbGF5ZXJzIGludG8gc2FtZSBwYW5lIGFzIHRpbGUgbGF5ZXJzLFxuICAgICAgICAvLyBtdXN0IHNwZWNpZnkgcmVuZGVyZXIgYW5kIHNldCBkZXNpcmVkIHBhbmUgb24gdGhhdFxuICAgICAgICBsZXQgc3ZnT3B0cyA9IHsgfTtcbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgKHN2Z09wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSAoU1ZHICYmIHN2ZyhzdmdPcHRzKSkgfHwgKENhbnZhcyAmJiBjYW52YXMoKSk7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy56SW5kZXggIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4KHRoaXMub3B0aW9ucy56SW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMubGF5ZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkU3R5bGUodGhpcy5vcHRpb25zLmxheWVySWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBvdmVycmlkZSBzdXBlciBjbGFzcycgbWV0aG9kIHRvIHNldCB2aXovb3BhYyBhZnRlciBzdWIgbGF5ZXJzIGNyZWF0ZWQgKi9cbiAgICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5jcmVhdGVMYXllcnMuY2FsbCh0aGlzLCBmZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcbiAgICAgICAgdGhpcy5zZXRPcGFjaXR5KHRoaXMuY3VycmVudE9wYWNpdHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2V0WkluZGV4IDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy56SW5kZXggPSBpbmRleDtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcblxuICAgICAgICAgICAgbGV0IGx5ciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICBpZihseXIuc2V0WkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5zZXRaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3VwZGF0ZVpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuX3VwZGF0ZVpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fcmVuZGVyZXIgJiYgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBseXIuX3JlbmRlcmVyLl9jb250YWluZXIuc3R5bGUuekluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2x1c3RlcmVkIGZlYXR1cmUgbGF5ZXIgY2hpbGQgXCIgKyBpZCArIFwiIGRvZXMgbm90IHN1cHBvcnQgb3JkZXJpbmcgdXNpbmcgei1pbmRleFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogKi9cbiAgICB0b2dnbGVWaXNpYmlsaXR5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gIXRoaXMuY3VycmVudFZpc2liaWxpdHk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcblxuICAgICAgICAvLyAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgIC8vICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS50b2dnbGVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0udG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYm9vbCAtIGZsYWdcbiAgICAgKi9cbiAgICBzZXRWaXNpYmlsaXR5OiBmdW5jdGlvbihib29sKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICEhYm9vbDtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMucmVuZGVyZXIuX2NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyLl9jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IGJvb2wgPyAnJyA6ICdub25lJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICAvL3Byb2JhYmx5IGlzIGEgbW9yZSBlZmZpY2llbnQgd2F5IHRvIGRvIHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1dCB0aGlzIHdvcmtzIGN1cnJlbnRseS5cbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBsb29rIGF0IHVzaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vICBtYXJrZXJDbHVzdGVyLnJlZnJlc2hJY29uT3B0aW9ucyh7Y2xhc3NOYW1lOidpbnZpc2libGUnfSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpY29uID0galF1ZXJ5KGxheWVyLl9pY29uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYm9vbCkgaWNvbi5yZW1vdmVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWNvbi5hZGRDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldFZpc2liaWxpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoYm9vbCk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZihsYXllci5zZXRTdHlsZSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0U3R5bGUoe2Rpc3BsYXk6IGJvb2wgPyAnJzonbm9uZSd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3BhY2l0eVxuICAgICAqL1xuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKG9wYWNpdHkpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRPcGFjaXR5ID0gaXNOYU4ob3BhY2l0eSkgPyAxLjAgOiBvcGFjaXR5KjE7XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikuY3NzKHtvcGFjaXR5OiBvcGFjaXR5fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ub24tY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLnNldE9wYWNpdHkpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3R5bGU6IGZ1bmN0aW9uKHN0eWxlKSB7XG4gICAgICAgIHRoaXMuZWFjaEZlYXR1cmUoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICB0aGlzLnNldEZlYXR1cmVTdHlsZShsYXllci5mZWF0dXJlLmlkLCBzdHlsZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBsb2FkU3R5bGU6IGZ1bmN0aW9uKGdwTGF5ZXJJZCkge1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKGdwTGF5ZXJJZClcbiAgICAgICAgICAgIC50aGVuKCBqc29uID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCFqc29uKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoanNvbiAmJiBqc29uLnN0eWxlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlRm4gPSBmdW5jdGlvbihmZWF0dXJlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydHkgfHwgdGhpcy5maWVsZDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IGZlYXR1cmVbcHJvcGVydHldIHx8IChmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXNbcHJvcGVydHldIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMuc3R5bGVzLmZpbmQoIHN3ID0+IHN3LnZhbHVlID09PSB2ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IHdyYXBwZXIuc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnJhZGl1cyA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS5yYWRpdXMgfHwgNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2VpZ2h0ID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLndlaWdodCB8fCAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5jb2xvciA9IHN0eWxlLnN0cm9rZSB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLm9wYWNpdHkgPSBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxDb2xvciA9IHN0eWxlLmZpbGwgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gbWF0Y2hpbmcgc3R5bGUgZm9yIFwiICsgSlNPTi5zdHJpbmdpZnkoZmVhdHVyZS5wcm9wZXJ0aWVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBzdHlsZTogXCIgKyBKU09OLnN0cmluZ2lmeShzdHlsZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVGbiA9ICgpID0+IHsgcmV0dXJuIGZlYXR1cmVGbihqc29uKTsgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGVGbjtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggKGxheWVyLCBzdHlsZSkgPT4geyBsYXllci5zZXRTdHlsZShzdHlsZSk7IH0sIDEwMDAsIHRoaXMsIHN0eWxlRm4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbiAmJiB0eXBlb2YoanNvbi5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9tdWx0aXBsZSBzdHlsZXMgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uWzBdOyAgLy91c2UgZmlyc3QgZm9yIG5vd1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL3VucmVjb2duaXphYmxlIHN0eWxlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3R5bGUuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGpRdWVyeS5leHRlbmQoe30sIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dwU3R5bGUgPSBzdHlsZTtcblxuICAgICAgICAgICAgICAgICAgICAvL3NldFN0eWxlIG9uIENsdXN0ZXIuRmVhdHVyZUxheWVyIGRvZXNuJ3QgYXBwZWFyIHRvIHdvcmsgY29uc2lzdGVudGx5IGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBub24tY2x1c3RlcmVkIGZlYXR1cmVzLlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0eWxlKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIC8vU28gaW5zdGVhZCwgd2UgbWFudWFsbHkgc2V0IGl0IG9uIGFsbCBmZWF0dXJlcyBvZiB0aGUgbGF5ZXIgKHRoYXQgYXJlbid0IGNsdXN0ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnNldFN0eWxlKG9iaik7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGZlYXR1cmUgbGF5ZXIgc3R5bGVcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBjbHVzdGVyZWRGZWF0dXJlcyhsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGNsdXN0ZXJlZEZlYXR1cmVzKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zdHlsZVJlc29sdmVyID9cbiAgICAgICAgb3B0aW9ucy5zdHlsZVJlc29sdmVyIDogZmVhdHVyZVN0eWxlUmVzb2x2ZXI7XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiB1cmwgKyAnLycgKyBsYXllci5sYXllck5hbWUsXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZVJlc29sdmVyLFxuICAgICAgICBsYXllcklkOiBsYXllci5pZFxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtICBsYXllciAtIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtICBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gZ2VvSnNvbkZlZWQobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBnZW9Kc29uRmVlZCgpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IGxheWVyVXJsID0gdXJsICsgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgK1xuICAgICAgICBsYXllci5pZCArICcvRmVhdHVyZVNlcnZlci8nICsgbGF5ZXIubGF5ZXJOYW1lO1xuXG4gICAgbGV0IHN0eWxlVXJsID0gdXJsLnJlcGxhY2UoJ2ZlZWRzJywnc3R5bGVzJykgK1xuICAgICAgICAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArIGxheWVyLmlkO1xuXG4gICAgbGV0IHN0eWxlTG9hZGVyRmFjdG9yeSA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGxheWVySWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIWpRdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVW5hYmxlIHRvIGxvYWQgR2VvSlNPTiBmZWVkIHN0eWxlLCBqUXVlcnkgaXMgbm90IGluc3RhbGxlZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGpRdWVyeS5hamF4KHVybCwge1xuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTonanNvbicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHsgcmVzb2x2ZShkYXRhKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW0gPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtsYXllcklkfSA6ICR7bWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCBuZXcgRXJyb3IoZW0pICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiBsYXllclVybCxcbiAgICAgICAgaXNNb2Rlcm46IHRydWUsICAgICAgICAgLy9mb3JjZSB0byB1c2UgR2VvSlNPTlxuICAgICAgICBsYXllcklkOiBsYXllci5pZCwgICAgLy91c2VkIGJ5IHN0eWxlIGxvYWRlclxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVMb2FkZXJGYWN0b3J5KHN0eWxlVXJsKVxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcblxufVxuXG5cbmV4cG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59O1xuIl19