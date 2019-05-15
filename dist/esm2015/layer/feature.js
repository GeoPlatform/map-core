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
import { Config } from "@geoplatform/client";
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
        if (Config["leafletPane"])
            (/** @type {?} */ (mopts)).pane = Config["leafletPane"];
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
    if (Config["leafletPane"])
        options.pane = Config["leafletPane"];
    /** @type {?} */
    let getGPStyle = () => { return this._gpStyle; };
    options.style = options.style || getGPStyle();
    /** @type {?} */
    let svgOpts = {};
    if (Config["leafletPane"])
        (/** @type {?} */ (svgOpts)).pane = Config["leafletPane"];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUl0QixPQUFPLEVBQ0gsSUFBSSxJQUFJLE1BQU0sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLFlBQVksSUFBSSxjQUFjLEVBQ2xFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUNQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDOztBQUNyQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFFekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7V0FnQnhDLFVBQVUsT0FBTyxFQUFFLE1BQU07O0lBSXJDLElBQUksS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVFLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7O1FBRW5ELElBQUk7WUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BGO0tBQ0o7SUFFRCxLQUFLLEdBQUcsS0FB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QWUsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqcXVlcnkgZnJvbSBcImpxdWVyeVwiO1xuY29uc3QgalF1ZXJ5ID0ganF1ZXJ5O1xuXG5pbXBvcnQgKiBhcyBRIGZyb20gXCJxXCI7XG5cbmltcG9ydCB7XG4gICAgaWNvbiBhcyBpY29uRm4sIG1hcmtlciBhcyBtYXJrZXJGbiwgY2lyY2xlTWFya2VyIGFzIGNpcmNsZU1hcmtlckZuLFxuICAgIFNWRywgc3ZnLCBDYW52YXMsIGNhbnZhcyxcbiAgICBVdGlsXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5pbXBvcnQgKiBhcyBlc3JpIGZyb20gXCJlc3JpLWxlYWZsZXRcIjtcbnZhciBFc3JpRmVhdHVyZUxheWVyID0gZXNyaS5GZWF0dXJlTGF5ZXI7XG5cbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5pbXBvcnQgZmVhdHVyZVBvcHVwVGVtcGxhdGUgZnJvbSAnLi4vc2hhcmVkL3BvcHVwLXRlbXBsYXRlJztcblxuLyoqXG4gKiBGZWF0dXJlIExheWVyXG4gKiBQcm92aWRlcyBjdXN0b20gc3R5bGUgbG9hZGluZyBhbmQgcG9pbnQtaWxpemF0aW9uIGFzIHdlbGxcbiAqIGFzIGFkZGluZyB2aXNpYmlsaXR5IGFuZCBvcGFjaXR5IG1hbmlwdWxhdGlvbiBtZXRob2RzXG4gKi9cbnZhciBGZWF0dXJlTGF5ZXIgPSBFc3JpRmVhdHVyZUxheWVyLmV4dGVuZCh7XG5cbiAgICBfZ3BTdHlsZSA6IHsgY29sb3I6IFwiIzAwZlwiLCB3ZWlnaHQ6IDIsIGZpbGxDb2xvcjogJyMwMGYnLCBmaWxsT3BhY2l0eTogMC4zIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZmVhdHVyZSAtIEdlb0pTT04gUG9pbnQgRmVhdHVyZVxuICAgICAqIEBwYXJhbSB7TC5MYXRMbmd9IGxhdGxuZ1xuICAgICAqIEByZXR1cm4ge0wuTWFya2VyfVxuICAgICAqL1xuICAgIHBvaW50VG9MYXllckZuOiBmdW5jdGlvbiAoZmVhdHVyZSwgbGF0bG5nKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJGZWF0dXJlOiBcIiArIGZlYXR1cmUuaWQpO1xuXG4gICAgICAgIHZhciBzdHlsZSA9IGZlYXR1cmUgJiYgZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzLnN0eWxlIDogbnVsbDtcbiAgICAgICAgaWYoIXN0eWxlICYmIHR5cGVvZiB0aGlzLm9wdGlvbnMuc3R5bGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVXNpbmcgbG9jYWwgc3R5bGUgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlKGZlYXR1cmUpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciB1c2luZyBzdHlsZSBmdW5jdGlvbiBpbiBDbHVzdGVyZWRGZWF0dXJlTGF5ZXI6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0eWxlID0gc3R5bGUgfHwgdGhpcy5vcHRpb25zLnN0eWxlIHx8IHt9O1xuXG4gICAgICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgICAgICBpZihzdHlsZS5zaGFwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gc3R5bGUud2lkdGggfHwgMTY7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gc3R5bGUuaGVpZ2h0IHx8IDE2O1xuICAgICAgICAgICAgdmFyIGljb24gPSBpY29uRm4oIHtcbiAgICAgICAgICAgICAgICBpY29uVXJsOiBzdHlsZS5jb250ZW50LCAvL2Jhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICAgICAgICAgICAgICAgIGljb25TaXplOiBbd2lkdGgsIGhlaWdodF0sXG4gICAgICAgICAgICAgICAgaWNvbkFuY2hvcjogW3dpZHRoKjAuNSwgaGVpZ2h0KjAuNV0sXG4gICAgICAgICAgICAgICAgcG9wdXBBbmNob3I6IFswLCAtMTFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgbW9wdHMgPSB7IGljb246IGljb24gfTtcbiAgICAgICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgKG1vcHRzIGFzIGFueSkucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcbiAgICAgICAgICAgIG1hcmtlciA9IG1hcmtlckZuKCBsYXRsbmcsIG1vcHRzKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUucmFkaXVzID0gc3R5bGUucmFkaXVzIHx8IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCA0O1xuICAgICAgICAgICAgc3R5bGUud2VpZ2h0ID0gc3R5bGUud2VpZ2h0IHx8IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCAyO1xuICAgICAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5jb2xvciB8fCBzdHlsZS5zdHJva2UgfHwgJyMwM2YnO1xuICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlLm9wYWNpdHkgfHwgc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgMC45O1xuICAgICAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5IHx8IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCAwLjM7XG4gICAgICAgICAgICBzdHlsZS5maWxsQ29sb3IgPSBzdHlsZS5jb2xvciB8fCBzdHlsZS5maWxsO1xuICAgICAgICAgICAgc3R5bGUucmVuZGVyZXIgPSB0aGlzLm9wdGlvbnMucmVuZGVyZXI7ICAvL2ltcG9ydGFudCBmb3IgcGFuZSFcbiAgICAgICAgICAgIG1hcmtlciA9IGNpcmNsZU1hcmtlckZuKGxhdGxuZywgc3R5bGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBvcHVwVGVtcGxhdGUgPSB0aGlzLm9wdGlvbnMucG9wdXBUZW1wbGF0ZSB8fCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiAgICAgICAgbWFya2VyLmJpbmRQb3B1cChwb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZm9yIGFsbCBub24tcG9pbnQgZmVhdHVyZXMsIGJpbmQgYSBwb3B1cFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBmZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxheWVyfSBsYXllciAtIGxheWVyIHJlcHJlc2VudGluZyBmZWF0dXJlXG4gICAgICovXG4gICAgZWFjaEZlYXR1cmVGbjogZnVuY3Rpb24oZmVhdHVyZSwgbGF5ZXIpIHtcbiAgICAgICAgaWYoIWZlYXR1cmUgfHwgIWZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5nZW9tZXRyeS50eXBlID09PSAnUG9pbnQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuYmluZFBvcHVwKGZlYXR1cmVQb3B1cFRlbXBsYXRlKGZlYXR1cmUpKTtcbiAgICB9LFxuXG5cblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICBvcHRpb25zLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICAgICAgbGV0IGdldEdQU3R5bGUgPSAoKSA9PiB7IHJldHVybiB0aGlzLl9ncFN0eWxlOyB9O1xuICAgICAgICBvcHRpb25zLnN0eWxlID0gb3B0aW9ucy5zdHlsZSB8fCBnZXRHUFN0eWxlKCk7XG5cbiAgICAgICAgLy9pbiBvcmRlciB0byBwdXQgZmVhdHVyZXMtYmFzZWQgbGF5ZXJzIGludG8gc2FtZSBwYW5lIGFzIHRpbGUgbGF5ZXJzLFxuICAgICAgICAvLyBtdXN0IHNwZWNpZnkgcmVuZGVyZXIgYW5kIHNldCBkZXNpcmVkIHBhbmUgb24gdGhhdFxuICAgICAgICBsZXQgc3ZnT3B0cyA9IHsgfTtcbiAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKVxuICAgICAgICAgICAgKHN2Z09wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSAoU1ZHICYmIHN2ZyhzdmdPcHRzKSkgfHwgKENhbnZhcyAmJiBjYW52YXMoKSk7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyZXIgPSByZW5kZXJlcjtcblxuICAgICAgICBvcHRpb25zLnBvaW50VG9MYXllciA9IFV0aWwuYmluZCh0aGlzLnBvaW50VG9MYXllckZuLCB0aGlzKTtcbiAgICAgICAgb3B0aW9ucy5vbkVhY2hGZWF0dXJlID0gVXRpbC5iaW5kKHRoaXMuZWFjaEZlYXR1cmVGbiwgdGhpcyk7XG5cbiAgICAgICAgLy8gb3B0aW9ucy5maWVsZHMgPSBbJ0ZJRCcsICd0eXBlJywgJ3RpdGxlJywgJ2dlb21ldHJ5J107XG5cbiAgICAgICAgRmVhdHVyZUxheWVyLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMub3B0aW9ucy56SW5kZXggIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0WkluZGV4KHRoaXMub3B0aW9ucy56SW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzZXRaSW5kZXggOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnpJbmRleCA9IGluZGV4O1xuICAgICAgICBmb3IodmFyIGlkIGluIHRoaXMuX2xheWVycylcbiAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0uc2V0WkluZGV4KGluZGV4KTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlVmlzaWJpbGl0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgaWYobGF5ZXIudG9nZ2xlVmlzaWJpbGl0eSlcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRPcGFjaXR5OiBmdW5jdGlvbihvcGFjaXR5KSB7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICBsZXQgbGF5ZXIgPSB0aGlzLl9sYXllcnNbaWRdO1xuICAgICAgICAgICAgaWYobGF5ZXIuc2V0T3BhY2l0eSlcbiAgICAgICAgICAgICAgICBsYXllci5zZXRPcGFjaXR5KG9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxvYWRTdHlsZTogZnVuY3Rpb24oZ3BMYXllcklkKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBpZih0aGlzLm9wdGlvbnMuc3R5bGVMb2FkZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcihncExheWVySWQpXG4gICAgICAgICAgICAudGhlbigganNvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZighanNvbikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmKGpzb24gJiYganNvbi5zdHlsZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZUZuID0gZnVuY3Rpb24oZmVhdHVyZSA6IGFueSkgOiBhbnkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLnByb3BlcnR5IHx8IHRoaXMuZmllbGQxO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSBmZWF0dXJlW3Byb3BlcnR5XSB8fCAoZmVhdHVyZS5wcm9wZXJ0aWVzID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSA6IG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnN0eWxlcy5maW5kKCBzdyA9PiBzdy52YWx1ZSA9PT0gdiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHdyYXBwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSB3cmFwcGVyLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5yYWRpdXMgPSBzdHlsZS5yYWRpdXMgfHwgc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLndlaWdodCA9IHN0eWxlLndlaWdodCB8fCBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuY29sb3IgPSBzdHlsZS5jb2xvciAgIHx8IHN0eWxlLnN0cm9rZSB8fCAnIzAzZic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLm9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5IHx8IHN0eWxlWydzdHJva2Utb3BhY2l0eSddIHx8IDAuOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbE9wYWNpdHkgPSBzdHlsZS5vcGFjaXR5IHx8IHN0eWxlWydmaWxsLW9wYWNpdHknXSB8fCAwLjM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLmZpbGxDb2xvciA9IHN0eWxlLmNvbG9yIHx8IHN0eWxlLmZpbGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBzdHlsZTogXCIgKyBKU09OLnN0cmluZ2lmeShzdHlsZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlRm4gPSAoKSA9PiB7IHJldHVybiBmZWF0dXJlRm4oanNvbik7IH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0gc3R5bGVGbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZShzdHlsZUZuKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24gJiYgdHlwZW9mKGpzb24ucHVzaCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vbXVsdGlwbGUgc3R5bGVzIHJldHVybmVkXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvblswXTsgIC8vdXNlIGZpcnN0IGZvciBub3dcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ganNvbjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy91bnJlY29nbml6YWJsZSBzdHlsZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHN0eWxlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBqUXVlcnkuZXh0ZW5kKHt9LCBzdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIG9iai5zdHlsZSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ncFN0eWxlID0gc3R5bGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9zZXRTdHlsZSBvbiBDbHVzdGVyLkZlYXR1cmVMYXllciBkb2Vzbid0IGFwcGVhciB0byB3b3JrIGNvbnNpc3RlbnRseSBmb3JcbiAgICAgICAgICAgICAgICAgICAgLy8gbm9uLWNsdXN0ZXJlZCBmZWF0dXJlcy5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdHlsZShvYmopO1xuICAgICAgICAgICAgICAgICAgICAvL1NvIGluc3RlYWQsIHdlIG1hbnVhbGx5IHNldCBpdCBvbiBhbGwgZmVhdHVyZXMgb2YgdGhlIGxheWVyICh0aGF0IGFyZW4ndCBjbHVzdGVyZWQpXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRTdHlsZShvYmopO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBmZXRjaGluZyBmZWF0dXJlIGxheWVyIHN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlTGF5ZXI7XG4iXX0=