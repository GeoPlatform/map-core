/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import { Config, XHRHttpClient } from '@geoplatform/client';
import parseMapBoxStyle from "../shared/mapbox-style";
/** @type {?} */
const STYLE_CONCEPT = {
    "id": "78ad3ecc883de444c8a0684087a61753",
    "uri": "http://www.geoplatform.gov/def/OnlineFunction/styling",
    "type": "skos:Concept",
    "label": "styling"
};
/** @type {?} */
const DEFAULT_STYLE_CONCEPT = {
    "id": "53983c42978cd510a5f844ec0a0c6c2b",
    "uri": "http://www.geoplatform.gov/def/OnlineFunction/default_styling",
    "type": "skos:Concept",
    "label": "default styling"
};
/**
 * @param {?} layer
 * @return {?}
 */
function mapBoxVectorTileLayer(layer) {
    /** @type {?} */
    let href = layer.href;
    if (!href || href.indexOf(".pbf") < 0) {
        console.log("LayerFactory - Layer does not define an Access URL");
        return null; //missing URL
    }
    /** @type {?} */
    const Leaflet = (/** @type {?} */ (L));
    //if Leaflet vector grid plugin is not installed, can't render VT Layers
    if (typeof (Leaflet.vectorGrid) === 'undefined' &&
        typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
        console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
        return null;
    }
    /** @type {?} */
    let opts = {
        rendererFactory: ((/** @type {?} */ (L.canvas))).tile
        // ,
        // getFeatureId: function( feature : any ) { return feature.properties.id; }
    };
    if (Config.leafletPane)
        opts.pane = Config.leafletPane;
    /** @type {?} */
    let result = Leaflet.vectorGrid.protobuf(href, opts);
    //If the layer object defines styles to use, resolve them and apply the style(s)
    /** @type {?} */
    let style = null;
    /** @type {?} */
    let styles = (layer.related || []).filter((/**
     * @param {?} rel
     * @return {?}
     */
    rel => {
        if (!rel.role)
            return false;
        if (rel.role.uri === DEFAULT_STYLE_CONCEPT.uri) {
            style = rel;
            return false;
        }
        return rel.role.uri === STYLE_CONCEPT.uri;
    }));
    style = style || (styles.length ? styles[0] : null);
    if (style) {
        applyVectorTileStyle(layer, result, style);
    }
    return result;
}
/**
 * @param {?} layer GeoPlatform Layer object
 * @param {?} leafletLayer GridLayer instance representing the GP Layer object specified
 * @param {?} styleResource GP Auxillary Resource object
 * @return {?}
 */
function applyVectorTileStyle(layer, leafletLayer, styleResource) {
    if (!leafletLayer.hasOwnProperty('options')) {
        console.log("Warn: Could not apply style to layer; layer is not a VectorGrid instance");
        return;
    }
    //fetch clob definition of style to use...
    fetchStyleDefinition(layer.id, styleResource)
        .then((/**
     * @param {?} styleDef
     * @return {?}
     */
    (styleDef) => {
        /** @type {?} */
        let layerInst = ((/** @type {?} */ (leafletLayer)));
        layerInst.options.vectorTileLayerStyles = parseMapBoxStyle(styleDef);
        layerInst.redraw();
    }))
        .catch((/**
     * @param {?} e
     * @return {?}
     */
    e => {
        console.log("An error occurred fetching the style definition for layer '" +
            layer.label + "'. " + e.message + ". Using default Leaflet style.");
    }));
}
/**
 * @param {?} layerId string identifier of GeoPlatform Layer object
 * @param {?} resource - auxillary resource referencing style definition to fetch
 * @return {?} Promise resolving style definition
 */
function fetchStyleDefinition(layerId, resource) {
    if (!layerId || !resource || !resource.contentId) {
        /** @type {?} */
        let err = new Error("Unable to fetch style definition, one or more parameters were invalid");
        return Promise.reject(err);
    }
    /** @type {?} */
    let client = new XHRHttpClient();
    /** @type {?} */
    let request = client.createRequestOpts({
        method: "GET",
        url: Config.ualUrl + '/api/layers/' + layerId + '/styles/' + resource.contentId,
        timeout: 5000,
        json: true
    });
    return client.execute(request);
    // return Promise.resolve(resource.content);   //TODO remove this
}
export { mapBoxVectorTileLayer as default, mapBoxVectorTileLayer, applyVectorTileStyle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBRXBELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztNQUdoRCxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxLQUFLLEVBQUUsdURBQXVEO0lBQzlELE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRSxTQUFTO0NBQ3JCOztNQUVLLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCOzs7OztBQUlELFNBQVMscUJBQXFCLENBQUUsS0FBd0I7O1FBRWhELElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTtJQUNyQixJQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxDQUFFLGFBQWE7S0FDOUI7O1VBRUssT0FBTyxHQUFHLG1CQUFBLENBQUMsRUFBTztJQUV4Qix3RUFBd0U7SUFDeEUsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNwRSxP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QUNuRixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBSyxJQUFJO0tBQ2hCLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFL0IsaUVBQWlFO0FBQ3JFLENBQUM7QUFJRCxPQUFPLEVBQ0gscUJBQXFCLElBQUksT0FBTyxFQUNoQyxxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIEwgICAgICAgICAgICAgICAgICAgICAgICBmcm9tICdsZWFmbGV0JztcbmltcG9ydCB7IExheWVyIGFzIExlYWZsZXRMYXllciB9ICAgICBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0IHtcbiAgICBMYXllciBhcyBHZW9QbGF0Zm9ybUxheWVyLCBDb25maWcsIFhIUkh0dHBDbGllbnRcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgcGFyc2VNYXBCb3hTdHlsZSBmcm9tIFwiLi4vc2hhcmVkL21hcGJveC1zdHlsZVwiO1xuXG5cbmNvbnN0IFNUWUxFX0NPTkNFUFQgPSB7XG4gICAgXCJpZFwiOiBcIjc4YWQzZWNjODgzZGU0NDRjOGEwNjg0MDg3YTYxNzUzXCIsXG4gICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9kZWYvT25saW5lRnVuY3Rpb24vc3R5bGluZ1wiLFxuICAgIFwidHlwZVwiOiBcInNrb3M6Q29uY2VwdFwiLFxuICAgIFwibGFiZWxcIjogXCJzdHlsaW5nXCJcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RZTEVfQ09OQ0VQVCA9IHtcbiAgICBcImlkXCI6IFwiNTM5ODNjNDI5NzhjZDUxMGE1Zjg0NGVjMGEwYzZjMmJcIixcbiAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L2RlZi9PbmxpbmVGdW5jdGlvbi9kZWZhdWx0X3N0eWxpbmdcIixcbiAgICBcInR5cGVcIjogXCJza29zOkNvbmNlcHRcIixcbiAgICBcImxhYmVsXCI6IFwiZGVmYXVsdCBzdHlsaW5nXCJcbn07XG5cblxuXG5mdW5jdGlvbiBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIoIGxheWVyIDogR2VvUGxhdGZvcm1MYXllciApIDogTGVhZmxldExheWVyIHtcblxuICAgIGxldCBocmVmID0gbGF5ZXIuaHJlZjtcbiAgICBpZighaHJlZiB8fCBocmVmLmluZGV4T2YoXCIucGJmXCIpIDwgMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExheWVyIGRvZXMgbm90IGRlZmluZSBhbiBBY2Nlc3MgVVJMXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDsgIC8vbWlzc2luZyBVUkxcbiAgICB9XG5cbiAgICBjb25zdCBMZWFmbGV0ID0gTCBhcyBhbnk7XG5cbiAgICAvL2lmIExlYWZsZXQgdmVjdG9yIGdyaWQgcGx1Z2luIGlzIG5vdCBpbnN0YWxsZWQsIGNhbid0IHJlbmRlciBWVCBMYXllcnNcbiAgICBpZiggdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZCkgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExlYWZsZXQgVmVjdG9yIFRpbGVzIHBsdWdpbiBub3QgZm91bmRcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBvcHRzIDogYW55ID0ge1xuICAgICAgICByZW5kZXJlckZhY3Rvcnk6ICggTC5jYW52YXMgYXMgYW55ICkudGlsZVxuICAgICAgICAvLyAsXG4gICAgICAgIC8vIGdldEZlYXR1cmVJZDogZnVuY3Rpb24oIGZlYXR1cmUgOiBhbnkgKSB7IHJldHVybiBmZWF0dXJlLnByb3BlcnRpZXMuaWQ7IH1cbiAgICB9O1xuICAgIGlmKENvbmZpZy5sZWFmbGV0UGFuZSkgb3B0cy5wYW5lID0gQ29uZmlnLmxlYWZsZXRQYW5lO1xuXG4gICAgbGV0IHJlc3VsdCA9IExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZihocmVmLCBvcHRzKTtcblxuICAgIC8vSWYgdGhlIGxheWVyIG9iamVjdCBkZWZpbmVzIHN0eWxlcyB0byB1c2UsIHJlc29sdmUgdGhlbSBhbmQgYXBwbHkgdGhlIHN0eWxlKHMpXG4gICAgbGV0IHN0eWxlID0gbnVsbDtcbiAgICBsZXQgc3R5bGVzID0gKGxheWVyLnJlbGF0ZWQgfHwgW10pLmZpbHRlciggcmVsID0+IHtcbiAgICAgICAgaWYoIXJlbC5yb2xlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKHJlbC5yb2xlLnVyaSA9PT0gREVGQVVMVF9TVFlMRV9DT05DRVBULnVyaSkge1xuICAgICAgICAgICAgc3R5bGUgPSByZWw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbC5yb2xlLnVyaSA9PT0gU1RZTEVfQ09OQ0VQVC51cmk7XG4gICAgfSk7XG4gICAgc3R5bGUgPSBzdHlsZSB8fCAoc3R5bGVzLmxlbmd0aCA/IHN0eWxlc1swXSA6IG51bGwpO1xuICAgIGlmKCBzdHlsZSApIHtcbiAgICAgICAgYXBwbHlWZWN0b3JUaWxlU3R5bGUoIGxheWVyLCByZXN1bHQsIHN0eWxlICk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSBsZWFmbGV0TGF5ZXIgR3JpZExheWVyIGluc3RhbmNlIHJlcHJlc2VudGluZyB0aGUgR1AgTGF5ZXIgb2JqZWN0IHNwZWNpZmllZFxuICogQHBhcmFtIHN0eWxlUmVzb3VyY2UgR1AgQXV4aWxsYXJ5IFJlc291cmNlIG9iamVjdFxuICovXG5mdW5jdGlvbiBhcHBseVZlY3RvclRpbGVTdHlsZShcbiAgICBsYXllciA6IEdlb1BsYXRmb3JtTGF5ZXIsXG4gICAgbGVhZmxldExheWVyIDogTGVhZmxldExheWVyLFxuICAgIHN0eWxlUmVzb3VyY2UgOiBhbnlcbikge1xuXG4gICAgaWYoIWxlYWZsZXRMYXllci5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV2FybjogQ291bGQgbm90IGFwcGx5IHN0eWxlIHRvIGxheWVyOyBsYXllciBpcyBub3QgYSBWZWN0b3JHcmlkIGluc3RhbmNlXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9mZXRjaCBjbG9iIGRlZmluaXRpb24gb2Ygc3R5bGUgdG8gdXNlLi4uXG4gICAgZmV0Y2hTdHlsZURlZmluaXRpb24oIGxheWVyLmlkLCBzdHlsZVJlc291cmNlIClcbiAgICAudGhlbiggKHN0eWxlRGVmIDogYW55KSA9PiB7XG4gICAgICAgIGxldCBsYXllckluc3QgPSAobGVhZmxldExheWVyIGFzIGFueSk7XG4gICAgICAgIGxheWVySW5zdC5vcHRpb25zLnZlY3RvclRpbGVMYXllclN0eWxlcyA9IHBhcnNlTWFwQm94U3R5bGUoIHN0eWxlRGVmICk7XG4gICAgICAgIGxheWVySW5zdC5yZWRyYXcoKTtcbiAgICB9KVxuICAgIC5jYXRjaCggZSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQW4gZXJyb3Igb2NjdXJyZWQgZmV0Y2hpbmcgdGhlIHN0eWxlIGRlZmluaXRpb24gZm9yIGxheWVyICdcIiArXG4gICAgICAgICAgICBsYXllci5sYWJlbCArIFwiJy4gXCIgKyBlLm1lc3NhZ2UgKyBcIi4gVXNpbmcgZGVmYXVsdCBMZWFmbGV0IHN0eWxlLlwiKTtcbiAgICB9KTtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVySWQgc3RyaW5nIGlkZW50aWZpZXIgb2YgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gcmVzb3VyY2UgLSBhdXhpbGxhcnkgcmVzb3VyY2UgcmVmZXJlbmNpbmcgc3R5bGUgZGVmaW5pdGlvbiB0byBmZXRjaFxuICogQHJldHVybiBQcm9taXNlIHJlc29sdmluZyBzdHlsZSBkZWZpbml0aW9uXG4gKi9cbmZ1bmN0aW9uIGZldGNoU3R5bGVEZWZpbml0aW9uKCBsYXllcklkIDogc3RyaW5nLCByZXNvdXJjZSA6IGFueSApIDogUHJvbWlzZTxhbnk+IHtcbiAgICBpZighbGF5ZXJJZCB8fCAhcmVzb3VyY2UgfHwgIXJlc291cmNlLmNvbnRlbnRJZCkge1xuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKFwiVW5hYmxlIHRvIGZldGNoIHN0eWxlIGRlZmluaXRpb24sIG9uZSBvciBtb3JlIHBhcmFtZXRlcnMgd2VyZSBpbnZhbGlkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG4gICAgbGV0IGNsaWVudCA9IG5ldyBYSFJIdHRwQ2xpZW50KCk7XG4gICAgbGV0IHJlcXVlc3QgPSBjbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMoe1xuICAgICAgICBtZXRob2QgOiBcIkdFVFwiLFxuICAgICAgICB1cmwgICAgOiBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBsYXllcklkICsgJy9zdHlsZXMvJyArIHJlc291cmNlLmNvbnRlbnRJZCxcbiAgICAgICAgdGltZW91dDogNTAwMCxcbiAgICAgICAganNvbiAgIDogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBjbGllbnQuZXhlY3V0ZShyZXF1ZXN0KTtcblxuICAgIC8vIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzb3VyY2UuY29udGVudCk7ICAgLy9UT0RPIHJlbW92ZSB0aGlzXG59XG5cblxuXG5leHBvcnQge1xuICAgIG1hcEJveFZlY3RvclRpbGVMYXllciBhcyBkZWZhdWx0LFxuICAgIG1hcEJveFZlY3RvclRpbGVMYXllcixcbiAgICBhcHBseVZlY3RvclRpbGVTdHlsZVxufTtcbiJdfQ==