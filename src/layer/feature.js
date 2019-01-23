
import jQuery from "jquery";
import Q from "q";

import {
    icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn,
    SVG, svg, Canvas, canvas,
    bind, Util
} from 'leaflet';

import * as esri from "esri-leaflet";

import {Config} from "geoplatform.client";
import featurePopupTemplate from '../shared/popup-template';

/**
 * Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
 * @extends L.esri.FeatureLayer
 */
var FeatureLayer = esri.FeatureLayer.extend({

    _gpStyle : { color: "#00f", weight: 2, fillColor: '#00f', fillOpacity: 0.3 },

    /**
     * @param {object} feature - GeoJSON Point Feature
     * @param {L.LatLng} latlng
     * @return {L.Marker}
     */
    pointToLayerFn: function (feature, latlng) {

        // console.log("Feature: " + feature.id);

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
            if(Config.leafletPane) mopts.pane = Config.leafletPane;
            marker = markerFn( latlng, mopts);

        } else {
            style.radius = style.radius || style['stroke-width'] || 4;
            style.weight = style.weight || style['stroke-width'] || 2;
            style.color = style.color || style.stroke || '#03f';
            style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
            style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
            style.fillColor = style.color || style.fill;
            style.renderer = this.options.renderer;  //important for pane!
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

        let getGPStyle = () => { return this._gpStyle; };
        options.style = options.style || getGPStyle();

        //in order to put features-based layers into same pane as tile layers,
        // must specify renderer and set desired pane on that
        let svgOpts = {};
        if(Config.leafletPane)
            svgOpts.pane = Config.leafletPane;
        var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
        options.renderer = renderer;

        options.pointToLayer = bind(this.pointToLayerFn, this);
        options.onEachFeature = bind(this.eachFeatureFn, this);

        // options.fields = ['FID', 'type', 'title', 'geometry'];

        FeatureLayer.prototype.initialize.call(this, options);

        this.on('load', function() {
            if(typeof this.options.zIndex !== 'undefined')
                this.setZIndex(this.options.zIndex);
        });

    },

    setZIndex : function (index) {
        this.options.zIndex = index;
        for(var id in this._layers)
            this._layers[id].setZIndex(index);
    },

    toggleVisibility: function() {
        for(var id in this._layers) {
            let layer = this._layers[id];
            if(layer.toggleVisibility)
                this._layers[id].toggleVisibility();
        }
    },

    setOpacity: function(opacity) {
        for(var id in this._layers) {
            let layer = this._layers[id];
            if(layer.setOpacity)
                layer.setOpacity(opacity);
        }
    },

    loadStyle: function(gpLayerId) {
        var self = this;

        if(this.options.styleLoader) {
            this.options.styleLoader(gpLayerId)
            .then( json => {

                if(!json) return;

                let style = null;

                if(json && json.styles) {

                    let styleFn = Util.bind(function(feature) {

                        let property = this.property || this.field1;
                        let v = feature[property] || (feature.properties ? feature.properties[property] : null);
                        let style = null;
                        if(this.styles) {
                            let wrapper = this.styles.find( sw => sw.value === v );
                            if(wrapper) {
                                style = wrapper.style;
                                style.radius = style.radius || style['stroke-width'] || 4;
                                style.weight = style.weight || style['stroke-width'] || 2;
                                style.color = style.color   || style.stroke || '#03f';
                                style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                                style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                                style.fillColor = style.color || style.fill;
                            }
                        }
                        // console.log("Using style: " + JSON.stringify(style));
                        return style;
                    }, json);
                    this.options.style = styleFn;
                    this.setStyle(styleFn);
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


export default FeatureLayer;
