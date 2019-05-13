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
import { FeatureLayer as EsriClusterFeatureLayer } from './L.esri.Cluster.FeatureLayer';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1mZWF0dXJlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcC8iLCJzb3VyY2VzIjpbImxheWVyL2NsdXN0ZXItZmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUV0QixPQUFPLEtBQUssQ0FBQyxNQUFPLEdBQUcsQ0FBQztBQUN4QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFNUMsT0FBTyxFQUVILElBQUksSUFBSSxNQUFNLEVBQ2QsTUFBTSxJQUFJLFFBQVEsRUFDbEIsWUFBWSxJQUFJLGNBQWMsRUFDOUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUN4QixJQUFJLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFFakIsT0FBTyxFQUFFLFlBQVksSUFBSSx1QkFBdUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hGLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxvQkFBb0IsTUFBTSwwQkFBMEIsQ0FBQztXQW9CeEMsVUFBVSxPQUFPLEVBQUUsTUFBTTs7SUFFckMsSUFBSSxLQUFLLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDNUUsSUFBRyxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFBRTs7UUFFbkQsSUFBSTtZQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QztRQUFDLE9BQU0sQ0FBQyxFQUFFO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQs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QkFBaUIsRUFDakIsV0FBVyxFQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSAgXCJxXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdnZW9wbGF0Zm9ybS5jbGllbnQnO1xuXG5pbXBvcnQge1xuICAgIENvbnRyb2wsXG4gICAgaWNvbiBhcyBpY29uRm4sXG4gICAgbWFya2VyIGFzIG1hcmtlckZuLFxuICAgIGNpcmNsZU1hcmtlciBhcyBjaXJjbGVNYXJrZXJGbixcbiAgICBTVkcsIHN2ZywgQ2FudmFzLCBjYW52YXMsXG4gICAgVXRpbCxcbiAgICBMYXllclxufSBmcm9tICdsZWFmbGV0JztcblxuaW1wb3J0IHsgRmVhdHVyZUxheWVyIGFzIEVzcmlDbHVzdGVyRmVhdHVyZUxheWVyIH0gZnJvbSAnLi9MLmVzcmkuQ2x1c3Rlci5GZWF0dXJlTGF5ZXInO1xuaW1wb3J0IGZlYXR1cmVTdHlsZVJlc29sdmVyIGZyb20gJy4uL3NoYXJlZC9zdHlsZS1yZXNvbHZlcic7XG5pbXBvcnQgZmVhdHVyZVBvcHVwVGVtcGxhdGUgZnJvbSAnLi4vc2hhcmVkL3BvcHVwLXRlbXBsYXRlJztcblxuXG4vKipcbiAqIENsdXN0ZXJlZCBGZWF0dXJlIExheWVyXG4gKiBQcm92aWRlcyBjdXN0b20gc3R5bGUgbG9hZGluZyBhbmQgcG9pbnQtaWxpemF0aW9uIGFzIHdlbGxcbiAqIGFzIGFkZGluZyB2aXNpYmlsaXR5IGFuZCBvcGFjaXR5IG1hbmlwdWxhdGlvbiBtZXRob2RzXG4gKi9cbnZhciBDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgPSBFc3JpQ2x1c3RlckZlYXR1cmVMYXllci5leHRlbmQoe1xuXG4gICAgY3VycmVudFZpc2liaWxpdHk6IHRydWUsXG4gICAgY3VycmVudE9wYWNpdHk6IDEuMCxcblxuICAgIF9ncFN0eWxlIDogeyBjb2xvcjogXCIjMDBmXCIsIHdlaWdodDogMiwgZmlsbENvbG9yOiAnIzAwZicsIGZpbGxPcGFjaXR5OiAwLjMgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBQb2ludCBGZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxhdExuZ30gbGF0bG5nXG4gICAgICogQHJldHVybiB7TC5NYXJrZXJ9XG4gICAgICovXG4gICAgcG9pbnRUb0xheWVyRm46IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcblxuICAgICAgICB2YXIgc3R5bGUgPSBmZWF0dXJlICYmIGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllcy5zdHlsZSA6IG51bGw7XG4gICAgICAgIGlmKCFzdHlsZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIGxvY2FsIHN0eWxlIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZShmZWF0dXJlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgdXNpbmcgc3R5bGUgZnVuY3Rpb24gaW4gQ2x1c3RlcmVkRmVhdHVyZUxheWVyOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZSA9IHN0eWxlIHx8IHRoaXMub3B0aW9ucy5zdHlsZSB8fCB7fTtcbiAgICAgICAgc3R5bGUucmFkaXVzICAgICAgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUucmFkaXVzIHx8IDQ7XG4gICAgICAgIHN0eWxlLndlaWdodCAgICAgID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLndlaWdodCB8fCAyO1xuICAgICAgICBzdHlsZS5jb2xvciAgICAgICA9IHN0eWxlLnN0cm9rZSB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgIHN0eWxlLm9wYWNpdHkgICAgID0gc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgc3R5bGUub3BhY2l0eSB8fCAwLjk7XG4gICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC4zO1xuICAgICAgICBzdHlsZS5maWxsQ29sb3IgICA9IHN0eWxlLmZpbGwgfHwgc3R5bGUuY29sb3IgfHwgJyMwM2YnO1xuICAgICAgICBzdHlsZS5yZW5kZXJlciAgICA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjsgIC8vaW1wb3J0YW50IGZvciBwYW5lIVxuXG4gICAgICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgICAgICBpZihzdHlsZS5zaGFwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gc3R5bGUud2lkdGggfHwgMTY7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gc3R5bGUuaGVpZ2h0IHx8IDE2O1xuICAgICAgICAgICAgdmFyIGljb24gPSBpY29uRm4oIHtcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBzdHlsZS5jb250ZW50LCAvL2Jhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICAgICAgICAgICAgICAgIGljb25TaXplOiBbd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgaWNvbkFuY2hvcjogW3dpZHRoKjAuNSwgaGVpZ2h0KjAuNV0sXG4gICAgICAgICAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgbW9wdHMgPSB7IGljb246IGljb24gfTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG1vcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgIG1hcmtlciA9IG1hcmtlckZuKCBsYXRsbmcsIG1vcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlciA9IGNpcmNsZU1hcmtlckZuKGxhdGxuZywgc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvcHVwVGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucG9wdXBUZW1wbGF0ZSB8fCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChwb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcblxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBmb3IgYWxsIG5vbi1wb2ludCBmZWF0dXJlcywgYmluZCBhIHBvcHVwXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIGZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF5ZXJ9IGxheWVyIC0gbGF5ZXIgcmVwcmVzZW50aW5nIGZlYXR1cmVcbiAgICAgKi9cbiAgICBlYWNoRmVhdHVyZUZuOiBmdW5jdGlvbihmZWF0dXJlLCBsYXllcikge1xuICAgICAgICBpZighZmVhdHVyZSB8fCAhZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5iaW5kUG9wdXAoZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuICAgIH0sXG5cblxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgb3B0aW9ucy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgICAgIG9wdGlvbnMucG9pbnRUb0xheWVyID0gVXRpbC5iaW5kKHRoaXMucG9pbnRUb0xheWVyRm4sIHRoaXMpO1xuICAgICAgICBvcHRpb25zLm9uRWFjaEZlYXR1cmUgPSBVdGlsLmJpbmQodGhpcy5lYWNoRmVhdHVyZUZuLCB0aGlzKTtcbiAgICAgICAgLy8gb3B0aW9ucy5maWVsZHMgPSBbJ0ZJRCcsICd0eXBlJywgJ3RpdGxlJywgJ2dlb21ldHJ5J107XG5cbiAgICAgICAgLy9JbmNyZWFzZSBmcm9tIDEgdG8gaW5jcmVhc2UgdGhlIGRpc3RhbmNlIGF3YXkgZnJvbSB0aGUgY2VudGVyIHRoYXQgc3BpZGVyZmllZCBtYXJrZXJzIGFyZSBwbGFjZWQuXG4gICAgICAgIC8vIFRoaXMgbmVlZHMgdG8gYmUgaW5jcmVhc2VkIHRvIGVuc3VyZSBhbGwgbWFya2VycyBjYW4gYmUgY2xpY2tlZFxuICAgICAgICAvLyB3aGVuIHNwaWRlcmZpZWQgKHNvbWUgZ2V0IHN0dWNrIHVuZGVyIHRoZSBzcGlkZXIgbGVncylcbiAgICAgICAgb3B0aW9ucy5zcGlkZXJmeURpc3RhbmNlTXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgbGV0IGdldEdQU3R5bGUgPSAoKSA9PiB7IHJldHVybiB0aGlzLl9ncFN0eWxlOyB9O1xuICAgICAgICBvcHRpb25zLnN0eWxlID0gb3B0aW9ucy5zdHlsZSB8fCBnZXRHUFN0eWxlO1xuICAgICAgICBpZihvcHRpb25zLnN0eWxlUmVzb2x2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVSZXNvbHZlciA9IG9wdGlvbnMuc3R5bGVSZXNvbHZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaW4gb3JkZXIgdG8gcHV0IGZlYXR1cmVzLWJhc2VkIGxheWVycyBpbnRvIHNhbWUgcGFuZSBhcyB0aWxlIGxheWVycyxcbiAgICAgICAgLy8gbXVzdCBzcGVjaWZ5IHJlbmRlcmVyIGFuZCBzZXQgZGVzaXJlZCBwYW5lIG9uIHRoYXRcbiAgICAgICAgbGV0IHN2Z09wdHMgPSB7IH07XG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIChzdmdPcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gKFNWRyAmJiBzdmcoc3ZnT3B0cykpIHx8IChDYW52YXMgJiYgY2FudmFzKCkpO1xuICAgICAgICBvcHRpb25zLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cbiAgICAgICAgRXNyaUNsdXN0ZXJGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRaSW5kZXgodGhpcy5vcHRpb25zLnpJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgRXNyaUNsdXN0ZXJGZWF0dXJlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMubGF5ZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkU3R5bGUodGhpcy5vcHRpb25zLmxheWVySWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKiBvdmVycmlkZSBzdXBlciBjbGFzcycgbWV0aG9kIHRvIHNldCB2aXovb3BhYyBhZnRlciBzdWIgbGF5ZXJzIGNyZWF0ZWQgKi9cbiAgICBjcmVhdGVMYXllcnM6IGZ1bmN0aW9uIChmZWF0dXJlcykge1xuICAgICAgICBFc3JpQ2x1c3RlckZlYXR1cmVMYXllci5wcm90b3R5cGUuY3JlYXRlTGF5ZXJzLmNhbGwodGhpcywgZmVhdHVyZXMpO1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG4gICAgICAgIHRoaXMuc2V0T3BhY2l0eSh0aGlzLmN1cnJlbnRPcGFjaXR5KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBpbmRleFxuICAgICAqL1xuICAgIHNldFpJbmRleCA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuekluZGV4ID0gaW5kZXg7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG5cbiAgICAgICAgICAgIGxldCBseXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgaWYobHlyLnNldFpJbmRleClcbiAgICAgICAgICAgICAgICBseXIuc2V0WkluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIGVsc2UgaWYobHlyLl91cGRhdGVaSW5kZXgpXG4gICAgICAgICAgICAgICAgbHlyLl91cGRhdGVaSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgZWxzZSBpZihseXIuX3JlbmRlcmVyICYmIGx5ci5fcmVuZGVyZXIuX2NvbnRhaW5lcil7XG4gICAgICAgICAgICAgICAgbHlyLl9yZW5kZXJlci5fY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkNsdXN0ZXJlZCBmZWF0dXJlIGxheWVyIGNoaWxkIFwiICsgaWQgKyBcIiBkb2VzIG5vdCBzdXBwb3J0IG9yZGVyaW5nIHVzaW5nIHotaW5kZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqICovXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlzaWJpbGl0eSA9ICF0aGlzLmN1cnJlbnRWaXNpYmlsaXR5O1xuICAgICAgICB0aGlzLnNldFZpc2liaWxpdHkodGhpcy5jdXJyZW50VmlzaWJpbGl0eSk7XG5cbiAgICAgICAgLy8gLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAvLyAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAvLyAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGpRdWVyeShsYXllci5faWNvbikudG9nZ2xlQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICAvL1xuICAgICAgICAvLyAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgLy8gaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJvb2wgLSBmbGFnXG4gICAgICovXG4gICAgc2V0VmlzaWJpbGl0eTogZnVuY3Rpb24oYm9vbCkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudFZpc2liaWxpdHkgPSAhIWJvb2w7XG5cbiAgICAgICAgLy9jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5jbHVzdGVyICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwICYmIHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuY2x1c3Rlci5fZmVhdHVyZUdyb3VwLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgICAgIGlmKGxheWVyLl9pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vcHJvYmFibHkgaXMgYSBtb3JlIGVmZmljaWVudCB3YXkgdG8gZG8gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IHRoaXMgd29ya3MgY3VycmVudGx5LlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGxvb2sgYXQgdXNpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gIG1hcmtlckNsdXN0ZXIucmVmcmVzaEljb25PcHRpb25zKHtjbGFzc05hbWU6J2ludmlzaWJsZSd9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGljb24gPSBqUXVlcnkobGF5ZXIuX2ljb24pO1xuICAgICAgICAgICAgICAgICAgICBpZihib29sKSBpY29uLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpY29uLmFkZENsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0VmlzaWJpbGl0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShib29sKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGxheWVyLnNldFN0eWxlKVxuICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRTdHlsZSh7ZGlzcGxheTogYm9vbCA/ICcnOidub25lJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcGFjaXR5XG4gICAgICovXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24ob3BhY2l0eSkge1xuXG4gICAgICAgIHRoaXMuY3VycmVudE9wYWNpdHkgPSBpc05hTihvcGFjaXR5KSA/IDEuMCA6IG9wYWNpdHkqMTtcblxuICAgICAgICAvL2NsdXN0ZXJlZCBmZWF0dXJlc1xuICAgICAgICBpZih0aGlzLmNsdXN0ZXIgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAgJiYgdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLmNsdXN0ZXIuX2ZlYXR1cmVHcm91cC5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5jbHVzdGVyLl9mZWF0dXJlR3JvdXAuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuX2ljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KGxheWVyLl9pY29uKS5jc3Moe29wYWNpdHk6IG9wYWNpdHl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL25vbi1jbHVzdGVyZWQgZmVhdHVyZXNcbiAgICAgICAgaWYodGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICAgICAgaWYobGF5ZXIuc2V0T3BhY2l0eSlcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRTdHlsZTogZnVuY3Rpb24oc3R5bGUpIHtcbiAgICAgICAgdGhpcy5lYWNoRmVhdHVyZShmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RmVhdHVyZVN0eWxlKGxheWVyLmZlYXR1cmUuaWQsIHN0eWxlKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIGxvYWRTdHlsZTogZnVuY3Rpb24oZ3BMYXllcklkKSB7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIoZ3BMYXllcklkKVxuICAgICAgICAgICAgLnRoZW4oIGpzb24gPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIWpzb24pIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihqc29uICYmIGpzb24uc3R5bGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVGbiA9IGZ1bmN0aW9uKGZlYXR1cmUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0eSB8fCB0aGlzLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZmVhdHVyZVtwcm9wZXJ0eV0gfHwgKGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllc1twcm9wZXJ0eV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5zdHlsZXMuZmluZCggc3cgPT4gc3cudmFsdWUgPT09IHYgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gd3JhcHBlci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IHN0eWxlLnJhZGl1cyB8fCA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgc3R5bGUud2VpZ2h0IHx8IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuc3Ryb2tlIHx8IHN0eWxlLmNvbG9yIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IHN0eWxlLm9wYWNpdHkgfHwgMC45O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCBzdHlsZS5vcGFjaXR5IHx8IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuZmlsbCB8fCBzdHlsZS5jb2xvciB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBtYXRjaGluZyBzdHlsZSBmb3IgXCIgKyBKU09OLnN0cmluZ2lmeShmZWF0dXJlLnByb3BlcnRpZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIHN0eWxlOiBcIiArIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUZuID0gKCkgPT4geyByZXR1cm4gZmVhdHVyZUZuKGpzb24pOyB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAobGF5ZXIsIHN0eWxlKSA9PiB7IGxheWVyLnNldFN0eWxlKHN0eWxlKTsgfSwgMTAwMCwgdGhpcywgc3R5bGVGbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uICYmIHR5cGVvZihqc29uLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL211bHRpcGxlIHN0eWxlcyByZXR1cm5lZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb25bMF07ICAvL3VzZSBmaXJzdCBmb3Igbm93XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb247XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vdW5yZWNvZ25pemFibGUgc3R5bGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdHlsZS5zaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0galF1ZXJ5LmV4dGVuZCh7fSwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBvYmouc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3BTdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0U3R5bGUgb24gQ2x1c3Rlci5GZWF0dXJlTGF5ZXIgZG9lc24ndCBhcHBlYXIgdG8gd29yayBjb25zaXN0ZW50bHkgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vbi1jbHVzdGVyZWQgZmVhdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3R5bGUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy9TbyBpbnN0ZWFkLCB3ZSBtYW51YWxseSBzZXQgaXQgb24gYWxsIGZlYXR1cmVzIG9mIHRoZSBsYXllciAodGhhdCBhcmVuJ3QgY2x1c3RlcmVkKVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0uc2V0U3R5bGUob2JqKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZmVhdHVyZSBsYXllciBzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gb3B0aW9ucyAtIG9wdGlvbmFsIHByb3BlcnRpZXNcbiAqIEByZXR1cm4gbGVhZmxldCBsYXllciBpbnN0YW5jZSBvciBudWxsXG4gKi9cbmZ1bmN0aW9uIGNsdXN0ZXJlZEZlYXR1cmVzKGxheWVyLCBvcHRpb25zKSA6IExheWVyIHtcblxuICAgIGxldCBzZXJ2aWNlID0gbGF5ZXIuc2VydmljZXMgJiYgbGF5ZXIuc2VydmljZXMubGVuZ3RoID9cbiAgICAgICAgbGF5ZXIuc2VydmljZXNbMF0gOiBudWxsO1xuICAgIGlmKCFzZXJ2aWNlKSB7XG4gICAgICAgIGxldCBtc2cgPSBgY2x1c3RlcmVkRmVhdHVyZXMoKSAtXG4gICAgICAgICAgICAgICAgICBDYW5ub3QgY3JlYXRlIGxlYWZsZXQgbGF5ZXIgZm9yIEdQIExheWVyOlxuICAgICAgICAgICAgICAgICAgbGF5ZXIgaGFzIG5vIHNlcnZpY2VgO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgdXJsICAgICA9IHNlcnZpY2UuaHJlZixcbiAgICAgICAgZm9ybWF0ICA9IGxheWVyLnN1cHBvcnRlZEZvcm1hdHMgPyBsYXllci5zdXBwb3J0ZWRGb3JtYXRzWzBdIDogbnVsbDtcblxuICAgIGxldCBzdHlsZVJlc29sdmVyID0gb3B0aW9ucyAmJiBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgP1xuICAgICAgICBvcHRpb25zLnN0eWxlUmVzb2x2ZXIgOiBmZWF0dXJlU3R5bGVSZXNvbHZlcjtcblxuICAgIGxldCBvcHRzID0ge1xuICAgICAgICB1cmw6IHVybCArICcvJyArIGxheWVyLmxheWVyTmFtZSxcbiAgICAgICAgc3R5bGVMb2FkZXI6IHN0eWxlUmVzb2x2ZXIsXG4gICAgICAgIGxheWVySWQ6IGxheWVyLmlkXG4gICAgfTtcblxuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5sZWFmbGV0UGFuZSkgKG9wdHMgYXMgYW55KS5wYW5lID0gb3B0aW9ucy5sZWFmbGV0UGFuZTtcblxuICAgIHJldHVybiBuZXcgQ2x1c3RlcmVkRmVhdHVyZUxheWVyKG9wdHMpO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gIG9wdGlvbnMgLSBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJuIGxlYWZsZXQgbGF5ZXIgaW5zdGFuY2Ugb3IgbnVsbFxuICovXG5mdW5jdGlvbiBnZW9Kc29uRmVlZChsYXllciwgb3B0aW9ucykgOiBMYXllciB7XG5cbiAgICBsZXQgc2VydmljZSA9IGxheWVyLnNlcnZpY2VzICYmIGxheWVyLnNlcnZpY2VzLmxlbmd0aCA/XG4gICAgICAgIGxheWVyLnNlcnZpY2VzWzBdIDogbnVsbDtcbiAgICBpZighc2VydmljZSkge1xuICAgICAgICBsZXQgbXNnID0gYGdlb0pzb25GZWVkKCkgLVxuICAgICAgICAgICAgICAgICAgQ2Fubm90IGNyZWF0ZSBsZWFmbGV0IGxheWVyIGZvciBHUCBMYXllcjpcbiAgICAgICAgICAgICAgICAgIGxheWVyIGhhcyBubyBzZXJ2aWNlYDtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbGV0IHVybCAgICAgPSBzZXJ2aWNlLmhyZWYsXG4gICAgICAgIGZvcm1hdCAgPSBsYXllci5zdXBwb3J0ZWRGb3JtYXRzID8gbGF5ZXIuc3VwcG9ydGVkRm9ybWF0c1swXSA6IG51bGw7XG5cbiAgICBsZXQgbGF5ZXJVcmwgPSB1cmwgKyAodXJsW3VybC5sZW5ndGgtMV09PT0nLyc/Jyc6Jy8nKSArXG4gICAgICAgIGxheWVyLmlkICsgJy9GZWF0dXJlU2VydmVyLycgKyBsYXllci5sYXllck5hbWU7XG5cbiAgICBsZXQgc3R5bGVVcmwgPSB1cmwucmVwbGFjZSgnZmVlZHMnLCdzdHlsZXMnKSArXG4gICAgICAgICh1cmxbdXJsLmxlbmd0aC0xXT09PScvJz8nJzonLycpICsgbGF5ZXIuaWQ7XG5cbiAgICBsZXQgc3R5bGVMb2FkZXJGYWN0b3J5ID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAobGF5ZXJJZCkge1xuICAgICAgICAgICAgbGV0IGRlZmVycmVkID0gUS5kZWZlcigpO1xuICAgICAgICAgICAgaWYoIWpRdWVyeSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChuZXcgRXJyb3IoXCJVbmFibGUgdG8gbG9hZCBHZW9KU09OIGZlZWQgc3R5bGUsIGpRdWVyeSBpcyBub3QgaW5zdGFsbGVkXCIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGpRdWVyeS5hamF4KHVybCwge1xuICAgICAgICAgICAgICAgIGRhdGFUeXBlOidqc29uJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVtID0gYGdlb0pzb25GZWVkKCkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3IgbG9hZGluZyBzdHlsZSBpbmZvcm1hdGlvbiBmb3IgbGF5ZXIgJHtsYXllcklkfSA6ICR7bWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoZW0pO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7ICAgICAgICAgIC8vdXNlcyBqUXVlcnkgcHJvbWlzZVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgdXJsOiBsYXllclVybCxcbiAgICAgICAgaXNNb2Rlcm46IHRydWUsICAgICAgICAgLy9mb3JjZSB0byB1c2UgR2VvSlNPTlxuICAgICAgICBsYXllcklkOiBsYXllci5pZCwgICAgLy91c2VkIGJ5IHN0eWxlIGxvYWRlclxuICAgICAgICBzdHlsZUxvYWRlcjogc3R5bGVMb2FkZXJGYWN0b3J5KHN0eWxlVXJsKVxuICAgIH07XG5cbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICBpZihvcHRpb25zICYmIG9wdGlvbnMubGVhZmxldFBhbmUpIChvcHRzIGFzIGFueSkucGFuZSA9IG9wdGlvbnMubGVhZmxldFBhbmU7XG5cbiAgICByZXR1cm4gbmV3IENsdXN0ZXJlZEZlYXR1cmVMYXllcihvcHRzKTtcblxufVxuXG5cbmV4cG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59O1xuIl19