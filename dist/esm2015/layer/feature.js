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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvZmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE1BQU0sTUFBTSxRQUFRLENBQUM7O0FBQ2pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUl0QixPQUFPLEVBQ0gsSUFBSSxJQUFJLE1BQU0sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLFlBQVksSUFBSSxjQUFjLEVBQ2xFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFDeEIsSUFBSSxFQUNQLE1BQU0sU0FBUyxDQUFDO0FBRWpCLE9BQU8sS0FBSyxJQUFJLE1BQU0sY0FBYyxDQUFDOztBQUNyQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFFekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sb0JBQW9CLE1BQU0sMEJBQTBCLENBQUM7V0FnQnhDLFVBQVUsT0FBTyxFQUFFLE1BQU07O0lBSXJDLElBQUksS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVFLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7O1FBRW5ELElBQUk7WUFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFNLENBQUMsRUFBRTtZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsdURBQXVELEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BGO0tBQ0o7SUFFRCxLQUFLLEdBQUcsS0FB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QUFVLElBTVQ7SUFFRCxTQUFTLElBcUVSO0NBRUosQ0FBQyxDQUFDO0FBRUgsZUFBZSxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGpxdWVyeSBmcm9tIFwianF1ZXJ5XCI7XG5jb25zdCBqUXVlcnkgPSBqcXVlcnk7XG5cbmltcG9ydCAqIGFzIFEgZnJvbSBcInFcIjtcblxuaW1wb3J0IHtcbiAgICBpY29uIGFzIGljb25GbiwgbWFya2VyIGFzIG1hcmtlckZuLCBjaXJjbGVNYXJrZXIgYXMgY2lyY2xlTWFya2VyRm4sXG4gICAgU1ZHLCBzdmcsIENhbnZhcywgY2FudmFzLFxuICAgIFV0aWxcbn0gZnJvbSAnbGVhZmxldCc7XG5cbmltcG9ydCAqIGFzIGVzcmkgZnJvbSBcImVzcmktbGVhZmxldFwiO1xudmFyIEVzcmlGZWF0dXJlTGF5ZXIgPSBlc3JpLkZlYXR1cmVMYXllcjtcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcbmltcG9ydCBmZWF0dXJlUG9wdXBUZW1wbGF0ZSBmcm9tICcuLi9zaGFyZWQvcG9wdXAtdGVtcGxhdGUnO1xuXG4vKipcbiAqIEZlYXR1cmUgTGF5ZXJcbiAqIFByb3ZpZGVzIGN1c3RvbSBzdHlsZSBsb2FkaW5nIGFuZCBwb2ludC1pbGl6YXRpb24gYXMgd2VsbFxuICogYXMgYWRkaW5nIHZpc2liaWxpdHkgYW5kIG9wYWNpdHkgbWFuaXB1bGF0aW9uIG1ldGhvZHNcbiAqL1xudmFyIEZlYXR1cmVMYXllciA9IEVzcmlGZWF0dXJlTGF5ZXIuZXh0ZW5kKHtcblxuICAgIF9ncFN0eWxlIDogeyBjb2xvcjogXCIjMDBmXCIsIHdlaWdodDogMiwgZmlsbENvbG9yOiAnIzAwZicsIGZpbGxPcGFjaXR5OiAwLjMgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBmZWF0dXJlIC0gR2VvSlNPTiBQb2ludCBGZWF0dXJlXG4gICAgICogQHBhcmFtIHtMLkxhdExuZ30gbGF0bG5nXG4gICAgICogQHJldHVybiB7TC5NYXJrZXJ9XG4gICAgICovXG4gICAgcG9pbnRUb0xheWVyRm46IGZ1bmN0aW9uIChmZWF0dXJlLCBsYXRsbmcpIHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZlYXR1cmU6IFwiICsgZmVhdHVyZS5pZCk7XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZmVhdHVyZSAmJiBmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXMuc3R5bGUgOiBudWxsO1xuICAgICAgICBpZighc3R5bGUgJiYgdHlwZW9mIHRoaXMub3B0aW9ucy5zdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVc2luZyBsb2NhbCBzdHlsZSBmdW5jdGlvblwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSB0aGlzLm9wdGlvbnMuc3R5bGUoZmVhdHVyZSk7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIHVzaW5nIHN0eWxlIGZ1bmN0aW9uIGluIENsdXN0ZXJlZEZlYXR1cmVMYXllcjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3R5bGUgPSBzdHlsZSB8fCB0aGlzLm9wdGlvbnMuc3R5bGUgfHwge307XG5cbiAgICAgICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgICAgIGlmKHN0eWxlLnNoYXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBzdHlsZS53aWR0aCB8fCAxNjtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSBzdHlsZS5oZWlnaHQgfHwgMTY7XG4gICAgICAgICAgICB2YXIgaWNvbiA9IGljb25Gbigge1xuICAgICAgICAgICAgICAgIGljb25Vcmw6IHN0eWxlLmNvbnRlbnQsIC8vYmFzZTY0IGVuY29kZWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWNvblNpemU6IFt3aWR0aCwgaGVpZ2h0XSxcbiAgICAgICAgICAgICAgICBpY29uQW5jaG9yOiBbd2lkdGgqMC41LCBoZWlnaHQqMC41XSxcbiAgICAgICAgICAgICAgICBwb3B1cEFuY2hvcjogWzAsIC0xMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxldCBtb3B0cyA9IHsgaWNvbjogaWNvbiB9O1xuICAgICAgICAgICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSAobW9wdHMgYXMgYW55KS5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuICAgICAgICAgICAgbWFya2VyID0gbWFya2VyRm4oIGxhdGxuZywgbW9wdHMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5yYWRpdXMgPSBzdHlsZS5yYWRpdXMgfHwgc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IDQ7XG4gICAgICAgICAgICBzdHlsZS53ZWlnaHQgPSBzdHlsZS53ZWlnaHQgfHwgc3R5bGVbJ3N0cm9rZS13aWR0aCddIHx8IDI7XG4gICAgICAgICAgICBzdHlsZS5jb2xvciA9IHN0eWxlLmNvbG9yIHx8IHN0eWxlLnN0cm9rZSB8fCAnIzAzZic7XG4gICAgICAgICAgICBzdHlsZS5vcGFjaXR5ID0gc3R5bGUub3BhY2l0eSB8fCBzdHlsZVsnc3Ryb2tlLW9wYWNpdHknXSB8fCAwLjk7XG4gICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlLm9wYWNpdHkgfHwgc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IDAuMztcbiAgICAgICAgICAgIHN0eWxlLmZpbGxDb2xvciA9IHN0eWxlLmNvbG9yIHx8IHN0eWxlLmZpbGw7XG4gICAgICAgICAgICBzdHlsZS5yZW5kZXJlciA9IHRoaXMub3B0aW9ucy5yZW5kZXJlcjsgIC8vaW1wb3J0YW50IGZvciBwYW5lIVxuICAgICAgICAgICAgbWFya2VyID0gY2lyY2xlTWFya2VyRm4obGF0bG5nLCBzdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9wdXBUZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy5wb3B1cFRlbXBsYXRlIHx8IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuICAgICAgICBtYXJrZXIuYmluZFBvcHVwKHBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBmb3IgYWxsIG5vbi1wb2ludCBmZWF0dXJlcywgYmluZCBhIHBvcHVwXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZlYXR1cmUgLSBHZW9KU09OIGZlYXR1cmVcbiAgICAgKiBAcGFyYW0ge0wuTGF5ZXJ9IGxheWVyIC0gbGF5ZXIgcmVwcmVzZW50aW5nIGZlYXR1cmVcbiAgICAgKi9cbiAgICBlYWNoRmVhdHVyZUZuOiBmdW5jdGlvbihmZWF0dXJlLCBsYXllcikge1xuICAgICAgICBpZighZmVhdHVyZSB8fCAhZmVhdHVyZS5nZW9tZXRyeSB8fCBmZWF0dXJlLmdlb21ldHJ5LnR5cGUgPT09ICdQb2ludCcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5iaW5kUG9wdXAoZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkpO1xuICAgIH0sXG5cblxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSlcbiAgICAgICAgICAgIG9wdGlvbnMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgICAgICBsZXQgZ2V0R1BTdHlsZSA9ICgpID0+IHsgcmV0dXJuIHRoaXMuX2dwU3R5bGU7IH07XG4gICAgICAgIG9wdGlvbnMuc3R5bGUgPSBvcHRpb25zLnN0eWxlIHx8IGdldEdQU3R5bGUoKTtcblxuICAgICAgICAvL2luIG9yZGVyIHRvIHB1dCBmZWF0dXJlcy1iYXNlZCBsYXllcnMgaW50byBzYW1lIHBhbmUgYXMgdGlsZSBsYXllcnMsXG4gICAgICAgIC8vIG11c3Qgc3BlY2lmeSByZW5kZXJlciBhbmQgc2V0IGRlc2lyZWQgcGFuZSBvbiB0aGF0XG4gICAgICAgIGxldCBzdmdPcHRzID0geyB9O1xuICAgICAgICBpZihDb25maWcubGVhZmxldFBhbmUpXG4gICAgICAgICAgICAoc3ZnT3B0cyBhcyBhbnkpLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG4gICAgICAgIHZhciByZW5kZXJlciA9IChTVkcgJiYgc3ZnKHN2Z09wdHMpKSB8fCAoQ2FudmFzICYmIGNhbnZhcygpKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXG4gICAgICAgIG9wdGlvbnMucG9pbnRUb0xheWVyID0gVXRpbC5iaW5kKHRoaXMucG9pbnRUb0xheWVyRm4sIHRoaXMpO1xuICAgICAgICBvcHRpb25zLm9uRWFjaEZlYXR1cmUgPSBVdGlsLmJpbmQodGhpcy5lYWNoRmVhdHVyZUZuLCB0aGlzKTtcblxuICAgICAgICAvLyBvcHRpb25zLmZpZWxkcyA9IFsnRklEJywgJ3R5cGUnLCAndGl0bGUnLCAnZ2VvbWV0cnknXTtcblxuICAgICAgICBGZWF0dXJlTGF5ZXIucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzLCBvcHRpb25zKTtcblxuICAgICAgICB0aGlzLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5vcHRpb25zLnpJbmRleCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRaSW5kZXgodGhpcy5vcHRpb25zLnpJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHNldFpJbmRleCA6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuekluZGV4ID0gaW5kZXg7XG4gICAgICAgIGZvcih2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKVxuICAgICAgICAgICAgdGhpcy5fbGF5ZXJzW2lkXS5zZXRaSW5kZXgoaW5kZXgpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVWaXNpYmlsaXR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICBpZihsYXllci50b2dnbGVWaXNpYmlsaXR5KVxuICAgICAgICAgICAgICAgIHRoaXMuX2xheWVyc1tpZF0udG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldE9wYWNpdHk6IGZ1bmN0aW9uKG9wYWNpdHkpIHtcbiAgICAgICAgZm9yKHZhciBpZCBpbiB0aGlzLl9sYXllcnMpIHtcbiAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX2xheWVyc1tpZF07XG4gICAgICAgICAgICBpZihsYXllci5zZXRPcGFjaXR5KVxuICAgICAgICAgICAgICAgIGxheWVyLnNldE9wYWNpdHkob3BhY2l0eSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbG9hZFN0eWxlOiBmdW5jdGlvbihncExheWVySWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5zdHlsZUxvYWRlcikge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlTG9hZGVyKGdwTGF5ZXJJZClcbiAgICAgICAgICAgIC50aGVuKCBqc29uID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKCFqc29uKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoanNvbiAmJiBqc29uLnN0eWxlcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZWF0dXJlRm4gPSBmdW5jdGlvbihmZWF0dXJlIDogYW55KSA6IGFueSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMucHJvcGVydHkgfHwgdGhpcy5maWVsZDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IGZlYXR1cmVbcHJvcGVydHldIHx8IChmZWF0dXJlLnByb3BlcnRpZXMgPyBmZWF0dXJlLnByb3BlcnRpZXNbcHJvcGVydHldIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMuc3R5bGVzLmZpbmQoIHN3ID0+IHN3LnZhbHVlID09PSB2ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYod3JhcHBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IHdyYXBwZXIuc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlLnJhZGl1cyA9IHN0eWxlLnJhZGl1cyB8fCBzdHlsZVsnc3Ryb2tlLXdpZHRoJ10gfHwgNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUud2VpZ2h0ID0gc3R5bGUud2VpZ2h0IHx8IHN0eWxlWydzdHJva2Utd2lkdGgnXSB8fCAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5jb2xvciA9IHN0eWxlLmNvbG9yICAgfHwgc3R5bGUuc3Ryb2tlIHx8ICcjMDNmJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUub3BhY2l0eSA9IHN0eWxlLm9wYWNpdHkgfHwgc3R5bGVbJ3N0cm9rZS1vcGFjaXR5J10gfHwgMC45O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZS5maWxsT3BhY2l0eSA9IHN0eWxlLm9wYWNpdHkgfHwgc3R5bGVbJ2ZpbGwtb3BhY2l0eSddIHx8IDAuMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUuZmlsbENvbG9yID0gc3R5bGUuY29sb3IgfHwgc3R5bGUuZmlsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlVzaW5nIHN0eWxlOiBcIiArIEpTT04uc3RyaW5naWZ5KHN0eWxlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVGbiA9ICgpID0+IHsgcmV0dXJuIGZlYXR1cmVGbihqc29uKTsgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSBzdHlsZUZuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0eWxlKHN0eWxlRm4pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoanNvbiAmJiB0eXBlb2YoanNvbi5wdXNoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9tdWx0aXBsZSBzdHlsZXMgcmV0dXJuZWRcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uWzBdOyAgLy91c2UgZmlyc3QgZm9yIG5vd1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBqc29uO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvL3VucmVjb2duaXphYmxlIHN0eWxlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc3R5bGUuc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGpRdWVyeS5leHRlbmQoe30sIHN0eWxlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnN0eWxlID0gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dwU3R5bGUgPSBzdHlsZTtcblxuICAgICAgICAgICAgICAgICAgICAvL3NldFN0eWxlIG9uIENsdXN0ZXIuRmVhdHVyZUxheWVyIGRvZXNuJ3QgYXBwZWFyIHRvIHdvcmsgY29uc2lzdGVudGx5IGZvclxuICAgICAgICAgICAgICAgICAgICAvLyBub24tY2x1c3RlcmVkIGZlYXR1cmVzLlxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0eWxlKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIC8vU28gaW5zdGVhZCwgd2UgbWFudWFsbHkgc2V0IGl0IG9uIGFsbCBmZWF0dXJlcyBvZiB0aGUgbGF5ZXIgKHRoYXQgYXJlbid0IGNsdXN0ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLl9sYXllcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnNldFN0eWxlKG9iaik7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGZldGNoaW5nIGZlYXR1cmUgbGF5ZXIgc3R5bGVcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVMYXllcjtcbiJdfQ==