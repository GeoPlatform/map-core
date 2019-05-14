/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as jquery from "jquery";
/** @type {?} */
const jQuery = jquery;
import { icon as iconFn, marker as markerFn, circleMarker as circleMarkerFn, SVG, svg, Canvas, canvas, Util } from 'leaflet';
import * as esri from "esri-leaflet";
/** @type {?} */
var EsriFeatureLayer = esri.FeatureLayer;
import { Config } from "geoplatform.client";
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
        style.radius = style.radius || style['stroke-width'] || 4;
        style.weight = style.weight || style['stroke-width'] || 2;
        style.color = style.color || style.stroke || '#03f';
        style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
        style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
        style.fillColor = style.color || style.fill;
        style.renderer = this.options.renderer; //important for pane!
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
    /** @type {?} */
    let getGPStyle = () => { return this._gpStyle; };
    options.style = options.style || getGPStyle();
    /** @type {?} */
    let svgOpts = {};
    if (Config.leafletPane)
        (/** @type {?} */ (svgOpts)).pane = Config.leafletPane;
    /** @type {?} */
    var renderer = (SVG && svg(svgOpts)) || (Canvas && canvas());
    options.renderer = renderer;
    options.pointToLayer = Util.bind(this.pointToLayerFn, this);
    options.onEachFeature = Util.bind(this.eachFeatureFn, this);
    // options.fields = ['FID', 'type', 'title', 'geometry'];
    FeatureLayer.prototype.initialize.call(this, options);
    this.on('load', function () {
        if (typeof this.options.zIndex !== 'undefined')
            this.setZIndex(this.options.zIndex);
    });
}, ɵ3 = function (index) {
    this.options.zIndex = index;
    for (var id in this._layers)
        this._layers[id].setZIndex(index);
}, ɵ4 = function () {
    for (var id in this._layers) {
        /** @type {?} */
        let layer = this._layers[id];
        if (layer.toggleVisibility)
            this._layers[id].toggleVisibility();
    }
}, ɵ5 = function (opacity) {
    for (var id in this._layers) {
        /** @type {?} */
        let layer = this._layers[id];
        if (layer.setOpacity)
            layer.setOpacity(opacity);
    }
}, ɵ6 = function (gpLayerId) {
    /** @type {?} */
    var self = this;
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
                            style.radius = style.radius || style['stroke-width'] || 4;
                            style.weight = style.weight || style['stroke-width'] || 2;
                            style.color = style.color || style.stroke || '#03f';
                            style.opacity = style.opacity || style['stroke-opacity'] || 0.9;
                            style.fillOpacity = style.opacity || style['fill-opacity'] || 0.3;
                            style.fillColor = style.color || style.fill;
                        }
                    }
                    // console.log("Using style: " + JSON.stringify(style));
                    return style;
                };
                /** @type {?} */
                let styleFn = () => { return featureFn(json); };
                this.options.style = styleFn;
                this.setStyle(styleFn);
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
 * Feature Layer
 * Provides custom style loading and point-ilization as well
 * as adding visibility and opacity manipulation methods
  @type {?} */
var FeatureLayer = EsriFeatureLayer.extend({
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
    setZIndex: ɵ3,
    toggleVisibility: ɵ4,
    setOpacity: ɵ5,
    loadStyle: ɵ6
});
export default FeatureLayer;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUl0QixPQUFPLEVBQ0gsSUFBSSxJQUFJLE1BQU0sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLFlBQVksSUFBSSxjQUFjLEVBQ2xFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUNQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDOztBQUNyQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFFekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7V0FnQnhDLFVBQVUsT0FBTyxFQUFFLE1BQU07O0lBSXJDLElBQUksS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVFLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7O1FBRW5ELElBQUk7WUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BGO0tBQ0o7SUFFRCxLQUFLLEdBQUcsS0FB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QUFVLElBTVQ7SUFFRCxTQUFTLElBcUVSO0NBRUosQ0FBQyxDQUFDO0FBRUgsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcblxuaW1wb3J0IHtcbiAgICBpY29uIGFzIGljb25GbiwgbWFya2VyIGFzIG1hcmtlckZuLCBjaXJjbGVNYXJrZXIgYXMgY2lyY2xlTWFya2VyRm4sXG4gICAgU1ZHLCBzdmcsIENhbnZhcywgY2FudmFzLFxuICAgIFV0aWxcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xudmFyIEVzcmlGZWF0dXJlTGF5ZXIgPSBlc3JpLkZlYXR1cmVMYXllcjtcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcImdlb3BsYXRmb3JtLmNsaWVudFwiO1xuaW1wb3J0IGZlYXR1cmVQb3B1cFRlbXBsYXRlIGZyb20gJy4uL3NoYXJlZC9wb3B1cC10ZW1wbGF0ZSc7XG5cbi8qKlxuICogRmVhdHVyZSBMYXllclxuICogUHJvdmlkZXMgY3VzdG9tIHN0eWxlIGxvYWRpbmcgYW5kIHBvaW50LWlsaXphdGlvbiBhcyB3ZWxsXG4gKiBhcyBhZGRpbmcgdmlzaWJpbGl0eSBhbmQgb3BhY2l0eSBtYW5pcHVsYXRpb24gbWV0aG9kc1xuICovXG52YXIgRmVhdHVyZUxheWVyID0gRXNyaUZlYXR1cmVMYXllci5leHRlbmQoe1xuXG4gICAgX2dwU3R5bGUgOiB7IGNvbG9yOiBcIiMwMGZcIiwgd2VpZ2h0OiAyLCBmaWxsQ29sb3I6ICcjMDBmJywgZmlsbE9wYWNpdHk6IDAuMyB9LFxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIFBvaW50IEZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF0TG5nfSBsYXRsbmdcbiAgICAgKiBAcmV0dXJuIHtMLk1hcmtlcn1cbiAgICAgKi9cbiAgICBwb2ludFRvTGF5ZXJGbjogZnVuY3Rpb24gKGZlYXR1cmUsIGxhdGxuZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmVhdHVyZTogXCIgKyBmZWF0dXJlLmlkKTtcblxuICAgICAgICB2YXIgc3R5bGUgPSBmZWF0dXJlICYmIGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllcy5zdHlsZSA6IG51bGw7XG4gICAgICAgIGlmKCFzdHlsZSAmJiB0eXBlb2YgdGhpcy5vcHRpb25zLnN0eWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIGxvY2FsIHN0eWxlIGZ1bmN0aW9uXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IHRoaXMub3B0aW9ucy5zdHlsZShmZWF0dXJlKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgdXNpbmcgc3R5bGUgZnVuY3Rpb24gaW4gQ2x1c3RlcmVkRmVhdHVyZUxheWVyOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdHlsZSA9IHN0eWxlIHx8IHRoaXMub3B0aW9ucy5zdHlsZSB8fCB7fTtcblxuICAgICAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICAgICAgaWYoc3R5bGUuc2hhcGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHN0eWxlLndpZHRoIHx8IDE2O1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IHN0eWxlLmhlaWdodCB8fCAxNjtcbiAgICAgICAgICAgIHZhciBpY29uID0gaWNvbkZuKCB7XG4gICAgICAgICAgICAgICAgaWNvblVybDogc3R5bGUuY29udGVudCwgLy9iYXNlNjQgZW5jb2RlZCBzdHJpbmdcbiAgICAgICAgICAgICAgICBpY29uU2l6ZTogW3dpZHRoLCBoZWlnaHRdLFxuICAgICAgICAgICAgICAgIGljb25BbmNob3I6IFt3aWR0aCowLjUsIGhlaWdodCowLjVdLFxuICAgICAgICAgICAgICAgIHBvcHVwQW5jaG9yOiBbMCwgLTExXSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGV0IG1vcHRzID0geyBpY29uOiBpY29uIH07XG4gICAgICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpIChtb3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgICAgICBtYXJrZXIgPSBtYXJrZXJGbiggbGF0bG5nLCBtb3B0cyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLnJhZGl1cyA9IHN0eWxlLnJhZGl1cyB8fCBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgNDtcbiAgICAgICAgICAgIHN0eWxlLndlaWdodCA9IHN0eWxlLndlaWdodCB8fCBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgMjtcbiAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuY29sb3IgfHwgc3R5bGUuc3Ryb2tlIHx8ICcjMDNmJztcbiAgICAgICAgICAgIHN0eWxlLm9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5IHx8IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IDAuOTtcbiAgICAgICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGUub3BhY2l0eSB8fCBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgMC4zO1xuICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuY29sb3IgfHwgc3R5bGUuZmlsbDtcbiAgICAgICAgICAgIHN0eWxlLnJlbmRlcmVyID0gdGhpcy5vcHRpb25zLnJlbmRlcmVyOyAgLy9pbXBvcnRhbnQgZm9yIHBhbmUhXG4gICAgICAgICAgICBtYXJrZXIgPSBjaXJjbGVNYXJrZXJGbihsYXRsbmcsIHN0eWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwb3B1cFRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnBvcHVwVGVtcGxhdGUgfHwgZmVhdHVyZVBvcHVwVGVtcGxhdGU7XG4gICAgICAgIG1hcmtlci5iaW5kUG9wdXAocG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGZvciBhbGwgbm9uLXBvaW50IGZlYXR1cmVzLCBiaW5kIGEgcG9wdXBcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gZmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXllcn0gbGF5ZXIgLSBsYXllciByZXByZXNlbnRpbmcgZmVhdHVyZVxuICAgICAqL1xuICAgIGVhY2hGZWF0dXJlRm46IGZ1bmN0aW9uKGZlYXR1cmUsIGxheWVyKSB7XG4gICAgICAgIGlmKCFmZWF0dXJlIHx8ICFmZWF0dXJlLmdlb21ldHJ5IHx8IGZlYXR1cmUuZ2VvbWV0cnkudHlwZSA9PT0gJ1BvaW50Jykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmJpbmRQb3B1cChmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSk7XG4gICAgfSxcblxuXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgb3B0aW9ucy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgICAgIGxldCBnZXRHUFN0eWxlID0gKCkgPT4geyByZXR1cm4gdGhpcy5fZ3BTdHlsZTsgfTtcbiAgICAgICAgb3B0aW9ucy5zdHlsZSA9IG9wdGlvbnMuc3R5bGUgfHwgZ2V0R1BTdHlsZSgpO1xuXG4gICAgICAgIC8vaW4gb3JkZXIgdG8gcHV0IGZlYXR1cmVzLWJhc2VkIGxheWVycyBpbnRvIHNhbWUgcGFuZSBhcyB0aWxlIGxheWVycyxcbiAgICAgICAgLy8gbXVzdCBzcGVjaWZ5IHJlbmRlcmVyIGFuZCBzZXQgZGVzaXJlZCBwYW5lIG9uIHRoYXRcbiAgICAgICAgbGV0IHN2Z09wdHMgPSB7IH07XG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIChzdmdPcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gKFNWRyAmJiBzdmcoc3ZnT3B0cykpIHx8IChDYW52YXMgJiYgY2FudmFzKCkpO1xuICAgICAgICBvcHRpb25zLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cbiAgICAgICAgb3B0aW9ucy5wb2ludFRvTGF5ZXIgPSBVdGlsLmJpbmQodGhpcy5wb2ludFRvTGF5ZXJGbiwgdGhpcyk7XG4gICAgICAgIG9wdGlvbnMub25FYWNoRmVhdHVyZSA9IFV0aWwuYmluZCh0aGlzLmVhY2hGZWF0dXJlRm4sIHRoaXMpO1xuXG4gICAgICAgIC8vIG9wdGlvbnMuZmllbGRzID0gWydGSUQnLCAndHlwZScsICd0aXRsZScsICdnZW9tZXRyeSddO1xuXG4gICAgICAgIEZlYXR1cmVMYXllci5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLm9wdGlvbnMuekluZGV4ICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICB0aGlzLnNldFpJbmRleCh0aGlzLm9wdGlvbnMuekluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgc2V0WkluZGV4IDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy56SW5kZXggPSBpbmRleDtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnNldFpJbmRleChpbmRleCk7XG4gICAgfSxcblxuICAgIHRvZ2dsZVZpc2liaWxpdHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgIGlmKGxheWVyLnRvZ2dsZVZpc2liaWxpdHkpXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0T3BhY2l0eTogZnVuY3Rpb24ob3BhY2l0eSkge1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycykge1xuICAgICAgICAgICAgbGV0IGxheWVyID0gdGhpcy5fbGF5ZXJzW2lkXTtcbiAgICAgICAgICAgIGlmKGxheWVyLnNldE9wYWNpdHkpXG4gICAgICAgICAgICAgICAgbGF5ZXIuc2V0T3BhY2l0eShvcGFjaXR5KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsb2FkU3R5bGU6IGZ1bmN0aW9uKGdwTGF5ZXJJZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYodGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIoZ3BMYXllcklkKVxuICAgICAgICAgICAgLnRoZW4oIGpzb24gPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoIWpzb24pIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZihqc29uICYmIGpzb24uc3R5bGVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVGbiA9IGZ1bmN0aW9uKGZlYXR1cmUgOiBhbnkpIDogYW55IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5wcm9wZXJ0eSB8fCB0aGlzLmZpZWxkMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2ID0gZmVhdHVyZVtwcm9wZXJ0eV0gfHwgKGZlYXR1cmUucHJvcGVydGllcyA/IGZlYXR1cmUucHJvcGVydGllc1twcm9wZXJ0eV0gOiBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0eWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5zdHlsZXMuZmluZCggc3cgPT4gc3cudmFsdWUgPT09IHYgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih3cmFwcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gd3JhcHBlci5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGUucmFkaXVzIHx8IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZS53ZWlnaHQgfHwgc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gc3R5bGUuY29sb3IgICB8fCBzdHlsZS5zdHJva2UgfHwgJyMwM2YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5vcGFjaXR5ID0gc3R5bGUub3BhY2l0eSB8fCBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCAwLjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxPcGFjaXR5ID0gc3R5bGUub3BhY2l0eSB8fCBzdHlsZVsnZmlsbC1vcGFjaXR5J10gfHwgMC4zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsQ29sb3IgPSBzdHlsZS5jb2xvciB8fCBzdHlsZS5maWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgc3R5bGU6IFwiICsgSlNPTi5zdHJpbmdpZnkoc3R5bGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUZuID0gKCkgPT4geyByZXR1cm4gZmVhdHVyZUZuKGpzb24pOyB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHN0eWxlRm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoc3R5bGVGbik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uICYmIHR5cGVvZihqc29uLnB1c2gpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvL211bHRpcGxlIHN0eWxlcyByZXR1cm5lZFxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb25bMF07ICAvL3VzZSBmaXJzdCBmb3Igbm93XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbikge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IGpzb247XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vdW5yZWNvZ25pemFibGUgc3R5bGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzdHlsZS5zaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0galF1ZXJ5LmV4dGVuZCh7fSwgc3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBvYmouc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ3BTdHlsZSA9IHN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0U3R5bGUgb24gQ2x1c3Rlci5GZWF0dXJlTGF5ZXIgZG9lc24ndCBhcHBlYXIgdG8gd29yayBjb25zaXN0ZW50bHkgZm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vbi1jbHVzdGVyZWQgZmVhdHVyZXMuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3R5bGUob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgLy9TbyBpbnN0ZWFkLCB3ZSBtYW51YWxseSBzZXQgaXQgb24gYWxsIGZlYXR1cmVzIG9mIHRoZSBsYXllciAodGhhdCBhcmVuJ3QgY2x1c3RlcmVkKVxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0uc2V0U3R5bGUob2JqKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZmV0Y2hpbmcgZmVhdHVyZSBsYXllciBzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRmVhdHVyZUxheWVyO1xuIl19