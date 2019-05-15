
import * as jquery from "jquery";
const jQuery = jquery;

import * as Q from  "q";
import { Config } from '@geoplatform/client';

import {
    Control,
    icon as iconFn,
    marker as markerFn,
    circleMarker as circleMarkerFn,
    SVG, svg, Canvas, canvas,
    Util,
    Layer
} from 'leaflet';

import BaseClusteredFeatureLayer from './base-clustered-feature-layer';
import featureStyleResolver from '../shared/style-resolver';
import featurePopupTemplate from '../shared/popup-template';


/**
 * Clustered Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
 */
var ClusteredFeatureLayer = BaseClusteredFeatureLayer.extend({

    currentVisibility: true,
    currentOpacity: 1.0,

    _gpStyle : { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

    /**
     * @param {object} feature - GeoJSON Point Feature
     * @param {L.LatLng} latlng
     * @return {L.Marker}
     */
    pointToLayerFn: function (feature, latlng) {

        var style = feature && feature.properties ? feature.properties.style : null;
        if(!style && typeof this.options.style === 'function') {
            // console.log("Using local style function");
            try {
                style = this.options.style(feature);
            } catch(e) {
                console.log("error using style function in ClusteredFeatureLayer: " + e.message);
            }
        }

        style = style || this.options.style || {};
        style.radius      = style['stroke-width'] || style.radius || 4;
        style.weight      = style['stroke-width'] || style.weight || 2;
        style.color       = style.stroke || style.color || '#03f';
        style.opacity     = style['stroke-opacity'] || style.opacity || 0.9;
        style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
        style.fillColor   = style.fill || style.color || '#03f';
        style.renderer    = this.options.renderer;  //important for pane!

        let marker = null;
        if(style.shape === 'image') {
            let width = style.width || 16;
            let height = style.height || 16;
            var icon = iconFn( {
                iconUrl: style.content, //base64 encoded string
                iconSize: [width, height],
                iconAnchor: [width*0.5, height*0.5],
                popupAnchor: [0, -11],
            });
            let mopts = { icon: icon };
            if(Config.leafletPane) (mopts as any).pane = Config.leafletPane;
            marker = markerFn( latlng, mopts);
        } else {
            marker = circleMarkerFn(latlng, style);
        }

        let popupTemplate = this.options.popupTemplate || featurePopupTemplate;
        marker.bindPopup(popupTemplate(feature));

        return marker;
    },

    /**
     * for all non-point features, bind a popup
     * @param {object} feature - GeoJSON feature
     * @param {L.Layer} layer - layer representing feature
     */
    eachFeatureFn: function(feature, layer) {
        if(!feature || !feature.geometry || feature.geometry.type === 'Point') {
            return;
        }
        layer.bindPopup(featurePopupTemplate(feature));
    },



    initialize: function (options) {

        var self = this;

        options = options || {};

        if(Config.leafletPane)
            options.pane = Config.leafletPane;

        options.pointToLayer = Util.bind(this.pointToLayerFn, this);
        options.onEachFeature = Util.bind(this.eachFeatureFn, this);
        // options.fields = ['FID', 'type', 'title', 'geometry'];

        //Increase from 1 to increase the distance away from the center that spiderfied markers are placed.
        // This needs to be increased to ensure all markers can be clicked
        // when spiderfied (some get stuck under the spider legs)
        options.spiderfyDistanceMultiplier = 2;

        let getGPStyle = () => { return this._gpStyle; };
        options.style = options.style || getGPStyle;
        if(options.styleResolver) {
            this.styleResolver = options.styleResolver;
        }

        //in order to put features-based layers into same pane as tile layers,
        // must specify renderer and set desired pane on that
        let svgOpts = { };
        if(Config.leafletPane)
            (svgOpts as any).pane = Config.leafletPane;
        var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
        options.renderer = renderer;

        BaseClusteredFeatureLayer.prototype.initialize.call(this, options);

        this.on('load', function() {
            if(typeof this.options.zIndex !== 'undefined')
                this.setZIndex(this.options.zIndex);
        });

    },

    onAdd: function(map) {
        BaseClusteredFeatureLayer.prototype.onAdd.call(this, map);

        if(this.options.layerId) {
            this.loadStyle(this.options.layerId);
        }
    },

    /** override super class' method to set viz/opac after sub layers created */
    createLayers: function (features) {
        BaseClusteredFeatureLayer.prototype.createLayers.call(this, features);
        this.setVisibility(this.currentVisibility);
        this.setOpacity(this.currentOpacity);
    },

    /**
     * @param {integer} index
     */
    setZIndex : function (index) {
        this.options.zIndex = index;
        for(var id in this._layers) {

            let lyr = this._layers[id];
            if(lyr.setZIndex)
                lyr.setZIndex(index);
            else if(lyr._updateZIndex)
                lyr._updateZIndex(index);
            else if(lyr._renderer && lyr._renderer._container){
                lyr._renderer._container.style.zIndex = index;
            } else {
                // console.log("Clustered feature layer child " + id + " does not support ordering using z-index");
            }
        }
    },

    /** */
    toggleVisibility: function() {

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
    },

    /**
     * @param {boolean} bool - flag
     */
    setVisibility: function(bool) {

        this.currentVisibility = !!bool;

        //clustered features
        if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
            for(let id in this.cluster._featureGroup._layers) {
                let layer = this.cluster._featureGroup._layers[id];
                if(layer._icon) {
                    //probably is a more efficient way to do this,
                    // but this works currently.
                    // TODO look at using
                    //  markerCluster.refreshIconOptions({className:'invisible'});
                    var icon = jQuery(layer._icon);
                    if(bool) icon.removeClass('invisible');
                    else icon.addClass('invisible');
                }
            }
        }

        //non-clustered features
        if(this._layers) {
            for(let id in this._layers) {
                let layer = this._layers[id];
                if(layer.setVisibility)
                    layer.setVisibility(bool);
                else if(layer.setStyle)
                    layer.setStyle({display: bool ? '':'none'});
            }
        }
    },

    /**
     * @param {number} opacity
     */
    setOpacity: function(opacity) {

        this.currentOpacity = isNaN(opacity) ? 1.0 : opacity*1;

        //clustered features
        if(this.cluster && this.cluster._featureGroup && this.cluster._featureGroup._layers) {
            for(let id in this.cluster._featureGroup._layers) {
                let layer = this.cluster._featureGroup._layers[id];
                if(layer._icon) {
                    jQuery(layer._icon).css({opacity: opacity});
                }
            }
        }

        //non-clustered features
        if(this._layers) {
            for(let id in this._layers) {
                let layer = this._layers[id];
                if(layer.setOpacity)
                    layer.setOpacity(opacity);
            }
        }
    },

    setStyle: function(style) {
        this.eachFeature(function (layer) {
            this.setFeatureStyle(layer.feature.id, style);
        }, this);
    },

    loadStyle: function(gpLayerId) {

        if(this.options.styleLoader) {
            this.options.styleLoader(gpLayerId)
            .then( json => {

                if(!json) return;

                let style = null;

                if(json && json.styles) {

                    let featureFn = function(feature) {

                        let property = this.property || this.field1;
                        let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                        let style = null;
                        if(this.styles) {
                            let wrapper = this.styles.find( sw => sw.value === v );
                            if(wrapper) {
                                style = wrapper.style;
                                style.radius = style['stroke-width'] || style.radius || 4;
                                style.weight = style['stroke-width'] || style.weight || 2;
                                style.color = style.stroke || style.color || '#03f';
                                style.opacity = style['stroke-opacity'] || style.opacity || 0.9;
                                style.fillOpacity = style['fill-opacity'] || style.opacity || 0.3;
                                style.fillColor = style.fill || style.color || '#03f';
                            } else {
                                console.log("No matching style for " + JSON.stringify(feature.properties));
                            }
                        }
                        // console.log("Using style: " + JSON.stringify(style));
                        return style;
                    };
                    let styleFn = () => { return featureFn(json); };
                    this.options.style = styleFn;
                    setTimeout( (layer, style) => { layer.setStyle(style); }, 1000, this, styleFn);
                    return;

                } else if(json && typeof(json.push) !== 'undefined') {
                    //multiple styles returned
                    style = json[0];  //use first for now

                } else if(json) {
                    style = json;

                } else {
                    return; //unrecognizable style
                }

                if(style.shape) {
                    var obj = jQuery.extend({}, style);
                    obj.style = style;
                    this._gpStyle = style;

                    //setStyle on Cluster.FeatureLayer doesn't appear to work consistently for
                    // non-clustered features.
                    // this.setStyle(obj);
                    //So instead, we manually set it on all features of the layer (that aren't clustered)
                    for(let id in this._layers)
                        this._layers[id].setStyle(obj);

                }
            })
            .catch( e => {
                console.log("Error fetching feature layer style");
                console.log(e);
            });
        }
    }
});




/**
 * @param layer - GeoPlatform Layer object
 * @param options - optional properties
 * @return leaflet layer instance or null
 */
function clusteredFeatures(layer, options) : Layer {

    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if(!service) {
        let msg = `clusteredFeatures() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }

    let url     = service.href,
        format  = layer.supportedFormats ? layer.supportedFormats[0] : null;

    let styleResolver = options && options.styleResolver ?
        options.styleResolver : featureStyleResolver;

    let opts = {
        url: url + '/' + layer.layerName,
        styleLoader: styleResolver,
        layerId: layer.id
    };

    if(Config.leafletPane) (opts as any).pane = Config.leafletPane;
    if(options && options.leafletPane) (opts as any).pane = options.leafletPane;

    return new ClusteredFeatureLayer(opts);
}



/**
 * @param  layer - GeoPlatform Layer object
 * @param  options - optional properties
 * @return leaflet layer instance or null
 */
function geoJsonFeed(layer, options) : Layer {

    let service = layer.services && layer.services.length ?
        layer.services[0] : null;
    if(!service) {
        let msg = `geoJsonFeed() -
                  Cannot create leaflet layer for GP Layer:
                  layer has no service`;
        throw new Error(msg);
    }

    let url     = service.href,
        format  = layer.supportedFormats ? layer.supportedFormats[0] : null;

    let layerUrl = url + (url[url.length-1]==='/'?'':'/') +
        layer.id + '/FeatureServer/' + layer.layerName;

    let styleUrl = url.replace('feeds','styles') +
        (url[url.length-1]==='/'?'':'/') + layer.id;

    let styleLoaderFactory = function(url) {
        return function (layerId) {
            let deferred = Q.defer();
            if(!jQuery) {
                deferred.reject(new Error("Unable to load GeoJSON feed style, jQuery is not installed"));
                return deferred.promise;
            }
            jQuery.ajax(url, {
                dataType:'json',
                success: function(data) {
                    deferred.resolve(data);
                },
                error: function(xhr, status, message) {
                    let em = `geoJsonFeed() -
                        Error loading style information for layer ${layerId} : ${message}`;
                    let error = new Error(em);
                    deferred.reject(error);
                }
            });
            return deferred.promise;          //uses jQuery promise
        };
    };

    let opts = {
        url: layerUrl,
        isModern: true,         //force to use GeoJSON
        layerId: layer.id,    //used by style loader
        styleLoader: styleLoaderFactory(styleUrl)
    };

    if(Config.leafletPane) (opts as any).pane = Config.leafletPane;
    if(options && options.leafletPane) (opts as any).pane = options.leafletPane;

    return new ClusteredFeatureLayer(opts);

}


export {
    ClusteredFeatureLayer as default,
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed
};
