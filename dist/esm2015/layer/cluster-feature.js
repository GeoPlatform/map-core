/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import * as Q from "q";
import { Config } from 'geoplatform.client';
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
        if (Config.leafletPane)
            (/** @type {?} */ (mopts)).pane = Config.leafletPane;
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
    let getGPStyle = () => { return this._gpStyle; };
    options.style = options.style || getGPStyle;
    if (options.styleResolver) {
        this.styleResolver = options.styleResolver;
    }
    /** @type {?} */
    let svgOpts = {};
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
            /** @type {?} */
            let deferred = Q.defer();
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
                    let em = `geoJsonFeed() -
                        Error loading style information for layer ${layerId} : ${message}`;
                    /** @type {?} */
                    let error = new Error(em);
                    deferred.reject(error);
                }
            });
            return deferred.promise; //uses jQuery promise
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
    if (Config.leafletPane)
        (/** @type {?} */ (opts)).pane = Config.leafletPane;
    if (options && options.leafletPane)
        (/** @type {?} */ (opts)).pane = options.leafletPane;
    return new ClusteredFeatureLayer(opts);
}
export { ClusteredFeatureLayer as default, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJsYXllci9jbHVzdGVyLWZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sUUFBUSxDQUFDOztBQUNqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFFdEIsT0FBTyxLQUFLLENBQUMsTUFBTyxHQUFHLENBQUM7QUFDeEIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTVDLE9BQU8sRUFFSCxJQUFJLElBQUksTUFBTSxFQUNkLE1BQU0sSUFBSSxRQUFRLEVBQ2xCLFlBQVksSUFBSSxjQUFjLEVBQzlCLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUVQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8seUJBQXlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDdkUsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO1dBb0J4QyxVQUFVLE9BQU8sRUFBRSxNQUFNOztJQUVyQyxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1RSxJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFOztRQUVuRCxJQUFJO1lBQ0EsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTSxDQUFDLEVBQUU7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVEQUF1RCxHQUFHLENBQUMsQ0FBQyxP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LEVBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMganF1ZXJ5IGZyb20gXCJqcXVlcnlcIjtcbmNvbnN0IGpRdWVyeSA9IGpxdWVyeTtcblxuaW1wb3J0ICogYXMgUSBmcm9tICBcInFcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ2dlb3BsYXRmb3JtLmNsaWVudCc7XG5cbmltcG9ydCB7XG4gICAgQ29udHJvbCxcbiAgICBpY29uIGFzIGljb25GbixcbiAgICBtYXJrZXIgYXMgbWFya2VyRm4sXG4gICAgY2lyY2xlTWFya2VyIGFzIGNpcmNsZU1hcmtlckZuLFxuICAgIFNWRywgc3ZnLCBDYW52YXMsIGNhbnZhcyxcbiAgICBVdGlsLFxuICAgIExheWVyXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgQmFzZUNsdXN0ZXJlZEZlYXR1cmVMYXllciBmcm9tICcuL2Jhc2UtY2x1c3RlcmVkLWZlYXR1cmUtbGF5ZXInO1xuaW1wb3J0IGZlYXR1cmVTdHlsZVJlc29sdmVyIGZyb20gJy4uL3NoYXJlZC9zdHlsZS1yZXNvbHZlcic7XG5pbXBvcnQgZmVhdHVyZVBvcHVwVGVtcGxhdGUgZnJvbSAnLi4vc2hhcmVkL3BvcHVwLXRlbXBsYXRlJztcblxuXG4vKipcbiAqIENsdXN0ZXJlZCBGZWF0dXJlIExheWVyXG4gKiBQcm92aWRlcyBjdXN0b20gc3R5bGUgbG9hZGluZyBhbmQgcG9pbnQtaWxpemF0aW9uIGFzIHdlbGxcbiAqIGFzIGFkZGluZyB2aXNpYmlsaXR5IGFuZCBvcGFjaXR5IG1hbmlwdWxhdGlvbiBtZXRob2RzXG4gKi9cbnZhciBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgPSBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLmV4dGVuZCh7XG5cbiAgICBjdXJyZW50VmlzaWJpbGl0eTogdHJ1ZSxcbiAgICBjdXJyZW50T3BhY2l0eTogMS4wLFxuXG4gICAgX2dwU3R5bGUgOiB7IGNvbG9yOiBcIiMwMGZcIiwgd2VpZ2h0OiAyLCBmaWxsQ29sb3I6ICcjMDBmJywgZmlsbE9wYWNpdHk6IDAuMyB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIFBvaW50IEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF0TG5nfSBsYXRsbmdcbiAgICAgKiBAcmV0dXJuIHtMLk1hcmtlcn1cbiAgICAgKi9cbiAgICBwb2ludFRvTGF5ZXJGbjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xuXG4gICAgICAgIHZhciBzdHlsZSA9IGZlYXR1cmUgJiYgZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzLnN0eWxlIDogbnVsbDtcbiAgICAgICAgaWYoIXN0eWxlICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMuc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgbG9jYWwgc3R5bGUgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB1c2luZyBzdHlsZSBmdW5jdGlvbiBpbiBDbHVzdGVyZWRGZWF0dXJlTGF5ZXI6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlID0gc3R5bGUgfHwgdGhpcy5vcHRpb25zLnN0eWxlIHx8IHt9O1xuICAgICAgICBzdHlsZS5yYWRpdXMgICAgICA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS5yYWRpdXMgfHwgNDtcbiAgICAgICAgc3R5bGUud2VpZ2h0ICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgIHN0eWxlLmNvbG9yICAgICAgID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgc3R5bGUub3BhY2l0eSAgICAgPSBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuOTtcbiAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjM7XG4gICAgICAgIHN0eWxlLmZpbGxDb2xvciAgID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLnJlbmRlcmVyICAgID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyOyAgLy9pbXBvcnRhbnQgZm9yIHBhbmUhXG5cbiAgICAgICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmKHN0eWxlLnNoYXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBzdHlsZS53aWR0aCB8fCAxNjtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBzdHlsZS5oZWlnaHQgfHwgMTY7XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGljb25Gbigge1xuICAgICAgICAgICAgICAgIGljb25Vcmw6IHN0eWxlLmNvbnRlbnQsIC8vYmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICBpY29uQW5jaG9yOiBbd2lkdGgqMC41LCBoZWlnaHQqMC41XSxcbiAgICAgICAgICAgICAgICBwb3B1cEFuY2hvcjogWzAsIC0xMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBtb3B0cyA9IHsgaWNvbjogaWNvbiB9O1xuICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAobW9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgbWFya2VyID0gbWFya2VyRm4oIGxhdGxuZywgbW9wdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFya2VyID0gY2lyY2xlTWFya2VyRm4obGF0bG5nLCBzdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9wdXBUZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wb3B1cFRlbXBsYXRlIHx8IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGZvciBhbGwgbm9uLXBvaW50IGZlYXR1cmVzLCBiaW5kIGEgcG9wdXBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gZmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXllcn0gbGF5ZXIgLSBsYXllciByZXByZXNlbnRpbmcgZmVhdHVyZVxuICAgICAqL1xuICAgIGVhY2hGZWF0dXJlRm46IGZ1bmN0aW9uKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIGlmKCFmZWF0dXJlIHx8ICFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmJpbmRQb3B1cChmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG4gICAgfSxcblxuXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICBvcHRpb25zLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICAgICAgb3B0aW9ucy5wb2ludFRvTGF5ZXIgPSBVdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXJGbiwgdGhpcyk7XG4gICAgICAgIG9wdGlvbnMub25FYWNoRmVhdHVyZSA9IFV0aWwuYmluZCh0aGlzLmVhY2hGZWF0dXJlRm4sIHRoaXMpO1xuICAgICAgICAvLyBvcHRpb25zLmZpZWxkcyA9IFsnRklEJywgJ3R5cGUnLCAndGl0bGUnLCAnZ2VvbWV0cnknXTtcblxuICAgICAgICAvL0luY3JlYXNlIGZyb20gMSB0byBpbmNyZWFzZSB0aGUgZGlzdGFuY2UgYXdheSBmcm9tIHRoZSBjZW50ZXIgdGhhdCBzcGlkZXJmaWVkIG1hcmtlcnMgYXJlIHBsYWNlZC5cbiAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBpbmNyZWFzZWQgdG8gZW5zdXJlIGFsbCBtYXJrZXJzIGNhbiBiZSBjbGlja2VkXG4gICAgICAgIC8vIHdoZW4gc3BpZGVyZmllZCAoc29tZSBnZXQgc3R1Y2sgdW5kZXIgdGhlIHNwaWRlciBsZWdzKVxuICAgICAgICBvcHRpb25zLnNwaWRlcmZ5RGlzdGFuY2VNdWx0aXBsaWVyID0gMjtcblxuICAgICAgICBsZXQgZ2V0R1BTdHlsZSA9ICgpID0+IHsgcmV0dXJuIHRoaXMuX2dwU3R5bGU7IH07XG4gICAgICAgIG9wdGlvbnMuc3R5bGUgPSBvcHRpb25zLnN0eWxlIHx8IGdldEdQU3R5bGU7XG4gICAgICAgIGlmKG9wdGlvbnMuc3R5bGVSZXNvbHZlcikge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVJlc29sdmVyID0gb3B0aW9ucy5zdHlsZVJlc29sdmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pbiBvcmRlciB0byBwdXQgZmVhdHVyZXMtYmFzZWQgbGF5ZXJzIGludG8gc2FtZSBwYW5lIGFzIHRpbGUgbGF5ZXJzLFxuICAgICAgICAvLyBtdXN0IHNwZWNpZnkgcmVuZGVyZXIgYW5kIHNldCBkZXNpcmVkIHBhbmUgb24gdGhhdFxuICAgICAgICBsZXQgc3ZnT3B0cyA9IHsgfTtcbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgKHN2Z09wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSAoU1ZHICYmIHN2ZyhzdmdPcHRzKSkgfHwgKENhbnZhcyAmJiBjYW52YXMoKSk7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy56SW5kZXggIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4KHRoaXMub3B0aW9ucy56SW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMubGF5ZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkU3R5bGUodGhpcy5vcHRpb25zLmxheWVySWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBvdmVycmlkZSBzdXBlciBjbGFzcycgbWV0aG9kIHRvIHNldCB2aXovb3BhYyBhZnRlciBzdWIgbGF5ZXJzIGNyZWF0ZWQgKi9cbiAgICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICBCYXNlQ2x1c3RlcmVkRmVhdHVyZUxheWVyLnByb3RvdHlwZS5jcmVhdGVMYXllcnMuY2FsbCh0aGlzLCBmZWF0dXJlcyk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcbiAgICAgICAgdGhpcy5zZXRPcGFjaXR5KHRoaXMuY3VycmVudE9wYWNpdHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ludGVnZXJ9IGluZGV4XG4gICAgICovXG4gICAgc2V0WkluZGV4IDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy56SW5kZXggPSBpbmRleDtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcblxuICAgICAgICAgICAgbGV0IGx5ciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICBpZihseXIuc2V0WkluZGV4KVxuICAgICAgICAgICAgICAgIGx5ci5zZXRaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3VwZGF0ZVpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuX3VwZGF0ZVpJbmRleChpbmRleCk7XG4gICAgICAgICAgICBlbHNlIGlmKGx5ci5fcmVuZGVyZXIgJiYgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyKXtcbiAgICAgICAgICAgICAgICBseXIuX3JlbmRlcmVyLl9jb250YWluZXIuc3R5bGUuekluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiQ2x1c3RlcmVkIGZlYXR1cmUgbGF5ZXIgY2hpbGQgXCIgKyBpZCArIFwiIGRvZXMgbm90IHN1cHBvcnQgb3JkZXJpbmcgdXNpbmcgei1pbmRleFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKiogKi9cbiAgICB0b2dnbGVWaXNpYmlsaXR5OiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaXNpYmlsaXR5ID0gIXRoaXMuY3VycmVudFZpc2liaWxpdHk7XG4gICAgICAgIHRoaXMuc2V0VmlzaWJpbGl0eSh0aGlzLmN1cnJlbnRWaXNpYmlsaXR5KTtcblxuICAgICAgICAvLyAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgIC8vICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS50b2dnbGVDbGFzcygnaW52aXNpYmxlJyk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICAvLyBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0udG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYm9vbCAtIGZsYWdcbiAgICAgKi9cbiAgICBzZXRWaXNpYmlsaXR5OiBmdW5jdGlvbihib29sKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICEhYm9vbDtcblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9iYWJseSBpcyBhIG1vcmUgZWZmaWNpZW50IHdheSB0byBkbyB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgdGhpcyB3b3JrcyBjdXJyZW50bHkuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gbG9vayBhdCB1c2luZ1xuICAgICAgICAgICAgICAgICAgICAvLyAgbWFya2VyQ2x1c3Rlci5yZWZyZXNoSWNvbk9wdGlvbnMoe2NsYXNzTmFtZTonaW52aXNpYmxlJ30pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGpRdWVyeShsYXllci5faWNvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJvb2wpIGljb24ucmVtb3ZlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGljb24uYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRWaXNpYmlsaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGJvb2wpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYobGF5ZXIuc2V0U3R5bGUpXG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFN0eWxlKHtkaXNwbGF5OiBib29sID8gJyc6J25vbmUnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHlcbiAgICAgKi9cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbihvcGFjaXR5KSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50T3BhY2l0eSA9IGlzTmFOKG9wYWNpdHkpID8gMS4wIDogb3BhY2l0eSoxO1xuXG4gICAgICAgIC8vY2x1c3RlcmVkIGZlYXR1cmVzXG4gICAgICAgIGlmKHRoaXMuY2x1c3RlciAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cCAmJiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5faWNvbikge1xuICAgICAgICAgICAgICAgICAgICBqUXVlcnkobGF5ZXIuX2ljb24pLmNzcyh7b3BhY2l0eTogb3BhY2l0eX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9uLWNsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZihsYXllci5zZXRPcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0eWxlOiBmdW5jdGlvbihzdHlsZSkge1xuICAgICAgICB0aGlzLmVhY2hGZWF0dXJlKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgdGhpcy5zZXRGZWF0dXJlU3R5bGUobGF5ZXIuZmVhdHVyZS5pZCwgc3R5bGUpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgbG9hZFN0eWxlOiBmdW5jdGlvbihncExheWVySWQpIHtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcihncExheWVySWQpXG4gICAgICAgICAgICAudGhlbigganNvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighanNvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGpzb24gJiYganNvbi5zdHlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZUZuID0gZnVuY3Rpb24oZmVhdHVyZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnR5IHx8IHRoaXMuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBmZWF0dXJlW3Byb3BlcnR5XSB8fCAoZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnN0eWxlcy5maW5kKCBzdyA9PiBzdy52YWx1ZSA9PT0gdiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSB3cmFwcGVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5yYWRpdXMgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndlaWdodCA9IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCBzdHlsZS53ZWlnaHQgfHwgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5zdHJva2UgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5vcGFjaXR5ID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsQ29sb3IgPSBzdHlsZS5maWxsIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIG1hdGNoaW5nIHN0eWxlIGZvciBcIiArIEpTT04uc3RyaW5naWZ5KGZlYXR1cmUucHJvcGVydGllcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgc3R5bGU6IFwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRm4gPSAoKSA9PiB7IHJldHVybiBmZWF0dXJlRm4oanNvbik7IH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlRm47XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoIChsYXllciwgc3R5bGUpID0+IHsgbGF5ZXIuc2V0U3R5bGUoc3R5bGUpOyB9LCAxMDAwLCB0aGlzLCBzdHlsZUZuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24gJiYgdHlwZW9mKGpzb24ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbXVsdGlwbGUgc3R5bGVzIHJldHVybmVkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvblswXTsgIC8vdXNlIGZpcnN0IGZvciBub3dcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvbjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy91bnJlY29nbml6YWJsZSBzdHlsZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN0eWxlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBqUXVlcnkuZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncFN0eWxlID0gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXRTdHlsZSBvbiBDbHVzdGVyLkZlYXR1cmVMYXllciBkb2Vzbid0IGFwcGVhciB0byB3b3JrIGNvbnNpc3RlbnRseSBmb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9uLWNsdXN0ZXJlZCBmZWF0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdHlsZShvYmopO1xuICAgICAgICAgICAgICAgICAgICAvL1NvIGluc3RlYWQsIHdlIG1hbnVhbGx5IHNldCBpdCBvbiBhbGwgZmVhdHVyZXMgb2YgdGhlIGxheWVyICh0aGF0IGFyZW4ndCBjbHVzdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRTdHlsZShvYmopO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBmZWF0dXJlIGxheWVyIHN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSBvcHRpb25zIC0gb3B0aW9uYWwgcHJvcGVydGllc1xuICogQHJldHVybiBsZWFmbGV0IGxheWVyIGluc3RhbmNlIG9yIG51bGxcbiAqL1xuZnVuY3Rpb24gY2x1c3RlcmVkRmVhdHVyZXMobGF5ZXIsIG9wdGlvbnMpIDogTGF5ZXIge1xuXG4gICAgbGV0IHNlcnZpY2UgPSBsYXllci5zZXJ2aWNlcyAmJiBsYXllci5zZXJ2aWNlcy5sZW5ndGggP1xuICAgICAgICBsYXllci5zZXJ2aWNlc1swXSA6IG51bGw7XG4gICAgaWYoIXNlcnZpY2UpIHtcbiAgICAgICAgbGV0IG1zZyA9IGBjbHVzdGVyZWRGZWF0dXJlcygpIC1cbiAgICAgICAgICAgICAgICAgIENhbm5vdCBjcmVhdGUgbGVhZmxldCBsYXllciBmb3IgR1AgTGF5ZXI6XG4gICAgICAgICAgICAgICAgICBsYXllciBoYXMgbm8gc2VydmljZWA7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCB1cmwgICAgID0gc2VydmljZS5ocmVmLFxuICAgICAgICBmb3JtYXQgID0gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0cyA/IGxheWVyLnN1cHBvcnRlZEZvcm1hdHNbMF0gOiBudWxsO1xuXG4gICAgbGV0IHN0eWxlUmVzb2x2ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA/XG4gICAgICAgIG9wdGlvbnMuc3R5bGVSZXNvbHZlciA6IGZlYXR1cmVTdHlsZVJlc29sdmVyO1xuXG4gICAgbGV0IG9wdHMgPSB7XG4gICAgICAgIHVybDogdXJsICsgJy8nICsgbGF5ZXIubGF5ZXJOYW1lLFxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVSZXNvbHZlcixcbiAgICAgICAgbGF5ZXJJZDogbGF5ZXIuaWRcbiAgICB9O1xuXG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmxlYWZsZXRQYW5lKSAob3B0cyBhcyBhbnkpLnBhbmUgPSBvcHRpb25zLmxlYWZsZXRQYW5lO1xuXG4gICAgcmV0dXJuIG5ldyBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIob3B0cyk7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSAgbGF5ZXIgLSBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSAgb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGdlb0pzb25GZWVkKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBsYXllclVybCA9IHVybCArICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICtcbiAgICAgICAgbGF5ZXIuaWQgKyAnL0ZlYXR1cmVTZXJ2ZXIvJyArIGxheWVyLmxheWVyTmFtZTtcblxuICAgIGxldCBzdHlsZVVybCA9IHVybC5yZXBsYWNlKCdmZWVkcycsJ3N0eWxlcycpICtcbiAgICAgICAgKHVybFt1cmwubGVuZ3RoLTFdPT09Jy8nPycnOicvJykgKyBsYXllci5pZDtcblxuICAgIGxldCBzdHlsZUxvYWRlckZhY3RvcnkgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsYXllcklkKSB7XG4gICAgICAgICAgICBsZXQgZGVmZXJyZWQgPSBRLmRlZmVyKCk7XG4gICAgICAgICAgICBpZighalF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KG5ldyBFcnJvcihcIlVuYWJsZSB0byBsb2FkIEdlb0pTT04gZmVlZCBzdHlsZSwgalF1ZXJ5IGlzIG5vdCBpbnN0YWxsZWRcIikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgalF1ZXJ5LmFqYXgodXJsLCB7XG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW0gPSBgZ2VvSnNvbkZlZWQoKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICBFcnJvciBsb2FkaW5nIHN0eWxlIGluZm9ybWF0aW9uIGZvciBsYXllciAke2xheWVySWR9IDogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihlbSk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTsgICAgICAgICAgLy91c2VzIGpRdWVyeSBwcm9taXNlXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IGxheWVyVXJsLFxuICAgICAgICBpc01vZGVybjogdHJ1ZSwgICAgICAgICAvL2ZvcmNlIHRvIHVzZSBHZW9KU09OXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkLCAgICAvL3VzZWQgYnkgc3R5bGUgbG9hZGVyXG4gICAgICAgIHN0eWxlTG9hZGVyOiBzdHlsZUxvYWRlckZhY3Rvcnkoc3R5bGVVcmwpXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xuXG59XG5cblxuZXhwb3J0IHtcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgY2x1c3RlcmVkRmVhdHVyZXMsXG4gICAgZ2VvSnNvbkZlZWRcbn07XG4iXX0=