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
        /** @type {?} */
        let style = parseMapBoxStyle(styleDef);
        if (style && typeof (style) !== 'undefined') {
            layerInst.options.vectorTileLayerStyles = style;
            layerInst.redraw();
        }
        else {
            console.log("[WARN] Unable to parse MapBox-style Style definitions from: ");
            console.log(JSON.stringify(styleResource, null, ' '));
        }
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
    if (!layerId || !resource) {
        /** @type {?} */
        let err = new Error("Unable to fetch style definition, one or more parameters were invalid");
        return Promise.reject(err);
    }
    if (!resource.contentId && !resource.href) {
        /** @type {?} */
        let err = new Error("Unable to fetch style definition, missing id or url to style");
        return Promise.reject(err);
    }
    /** @type {?} */
    let url = null;
    if (resource.contentId) {
        url = Config.ualUrl + '/api/layers/' + layerId + '/styles/' + resource.contentId;
    }
    else if (resource.href) {
        url = resource.href;
    }
    /** @type {?} */
    let client = new XHRHttpClient();
    /** @type {?} */
    let request = client.createRequestOpts({
        method: "GET",
        url: url,
        timeout: 5000,
        json: true
    });
    return client.execute(request);
}
export { mapBoxVectorTileLayer as default, mapBoxVectorTileLayer, applyVectorTileStyle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBRXBELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztNQUdoRCxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxLQUFLLEVBQUUsdURBQXVEO0lBQzlELE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRSxTQUFTO0NBQ3JCOztNQUVLLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCOzs7OztBQUlELFNBQVMscUJBQXFCLENBQUUsS0FBd0I7O1FBRWhELElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTtJQUNyQixJQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxDQUFFLGFBQWE7S0FDOUI7O1VBRUssT0FBTyxHQUFHLG1CQUFBLENBQUMsRUFBTztJQUV4Qix3RUFBd0U7SUFDeEUsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNwRSxP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QUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0lBRUQsSUFBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFOztZQUNsQyxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsOERBQThELENBQUM7UUFDbkYsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCOztRQUVHLEdBQUcsR0FBRyxJQUFJO0lBQ2QsSUFBRyxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLEdBQUcsVUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7S0FDcEY7U0FBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDckIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDdkI7O1FBRUcsTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFOztRQUM1QixPQUFPLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1FBQ25DLE1BQU0sRUFBRyxLQUFLO1FBQ2QsR0FBRyxFQUFNLEdBQUc7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLElBQUksRUFBSyxJQUFJO0tBQ2hCLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUlELE9BQU8sRUFDSCxxQkFBcUIsSUFBSSxPQUFPLEVBQ2hDLHFCQUFxQixFQUNyQixvQkFBb0IsRUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgTCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgYXMgTGVhZmxldExheWVyIH0gICAgIGZyb20gXCJsZWFmbGV0XCI7XG5pbXBvcnQge1xuICAgIExheWVyIGFzIEdlb1BsYXRmb3JtTGF5ZXIsIENvbmZpZywgWEhSSHR0cENsaWVudFxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCBwYXJzZU1hcEJveFN0eWxlIGZyb20gXCIuLi9zaGFyZWQvbWFwYm94LXN0eWxlXCI7XG5cblxuY29uc3QgU1RZTEVfQ09OQ0VQVCA9IHtcbiAgICBcImlkXCI6IFwiNzhhZDNlY2M4ODNkZTQ0NGM4YTA2ODQwODdhNjE3NTNcIixcbiAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L2RlZi9PbmxpbmVGdW5jdGlvbi9zdHlsaW5nXCIsXG4gICAgXCJ0eXBlXCI6IFwic2tvczpDb25jZXB0XCIsXG4gICAgXCJsYWJlbFwiOiBcInN0eWxpbmdcIlxufTtcblxuY29uc3QgREVGQVVMVF9TVFlMRV9DT05DRVBUID0ge1xuICAgIFwiaWRcIjogXCI1Mzk4M2M0Mjk3OGNkNTEwYTVmODQ0ZWMwYTBjNmMyYlwiLFxuICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3YvZGVmL09ubGluZUZ1bmN0aW9uL2RlZmF1bHRfc3R5bGluZ1wiLFxuICAgIFwidHlwZVwiOiBcInNrb3M6Q29uY2VwdFwiLFxuICAgIFwibGFiZWxcIjogXCJkZWZhdWx0IHN0eWxpbmdcIlxufTtcblxuXG5cbmZ1bmN0aW9uIG1hcEJveFZlY3RvclRpbGVMYXllciggbGF5ZXIgOiBHZW9QbGF0Zm9ybUxheWVyICkgOiBMZWFmbGV0TGF5ZXIge1xuXG4gICAgbGV0IGhyZWYgPSBsYXllci5ocmVmO1xuICAgIGlmKCFocmVmIHx8IGhyZWYuaW5kZXhPZihcIi5wYmZcIikgPCAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGF5ZXIgZG9lcyBub3QgZGVmaW5lIGFuIEFjY2VzcyBVUkxcIik7XG4gICAgICAgIHJldHVybiBudWxsOyAgLy9taXNzaW5nIFVSTFxuICAgIH1cblxuICAgIGNvbnN0IExlYWZsZXQgPSBMIGFzIGFueTtcblxuICAgIC8vaWYgTGVhZmxldCB2ZWN0b3IgZ3JpZCBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgY2FuJ3QgcmVuZGVyIFZUIExheWVyc1xuICAgIGlmKCB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkKSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGVhZmxldCBWZWN0b3IgVGlsZXMgcGx1Z2luIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIHJlbmRlcmVyRmFjdG9yeTogKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlXG4gICAgICAgIC8vICxcbiAgICAgICAgLy8gZ2V0RmVhdHVyZUlkOiBmdW5jdGlvbiggZmVhdHVyZSA6IGFueSApIHsgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcy5pZDsgfVxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgcmVzdWx0ID0gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgLy9JZiB0aGUgbGF5ZXIgb2JqZWN0IGRlZmluZXMgc3R5bGVzIHRvIHVzZSwgcmVzb2x2ZSB0aGVtIGFuZCBhcHBseSB0aGUgc3R5bGUocylcbiAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgIGxldCBzdHlsZXMgPSAobGF5ZXIucmVsYXRlZCB8fCBbXSkuZmlsdGVyKCByZWwgPT4ge1xuICAgICAgICBpZighcmVsLnJvbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYocmVsLnJvbGUudXJpID09PSBERUZBVUxUX1NUWUxFX0NPTkNFUFQudXJpKSB7XG4gICAgICAgICAgICBzdHlsZSA9IHJlbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVsLnJvbGUudXJpID09PSBTVFlMRV9DT05DRVBULnVyaTtcbiAgICB9KTtcbiAgICBzdHlsZSA9IHN0eWxlIHx8IChzdHlsZXMubGVuZ3RoID8gc3R5bGVzWzBdIDogbnVsbCk7XG4gICAgaWYoIHN0eWxlICkge1xuICAgICAgICBhcHBseVZlY3RvclRpbGVTdHlsZSggbGF5ZXIsIHJlc3VsdCwgc3R5bGUgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIGxlYWZsZXRMYXllciBHcmlkTGF5ZXIgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBHUCBMYXllciBvYmplY3Qgc3BlY2lmaWVkXG4gKiBAcGFyYW0gc3R5bGVSZXNvdXJjZSBHUCBBdXhpbGxhcnkgUmVzb3VyY2Ugb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFwcGx5VmVjdG9yVGlsZVN0eWxlKFxuICAgIGxheWVyIDogR2VvUGxhdGZvcm1MYXllcixcbiAgICBsZWFmbGV0TGF5ZXIgOiBMZWFmbGV0TGF5ZXIsXG4gICAgc3R5bGVSZXNvdXJjZSA6IGFueVxuKSB7XG5cbiAgICBpZighbGVhZmxldExheWVyLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuOiBDb3VsZCBub3QgYXBwbHkgc3R5bGUgdG8gbGF5ZXI7IGxheWVyIGlzIG5vdCBhIFZlY3RvckdyaWQgaW5zdGFuY2VcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL2ZldGNoIGNsb2IgZGVmaW5pdGlvbiBvZiBzdHlsZSB0byB1c2UuLi5cbiAgICBmZXRjaFN0eWxlRGVmaW5pdGlvbiggbGF5ZXIuaWQsIHN0eWxlUmVzb3VyY2UgKVxuICAgIC50aGVuKCAoc3R5bGVEZWYgOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGxheWVySW5zdCA9IChsZWFmbGV0TGF5ZXIgYXMgYW55KTtcbiAgICAgICAgbGV0IHN0eWxlID0gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGVEZWYgKTtcbiAgICAgICAgaWYoc3R5bGUgJiYgdHlwZW9mKHN0eWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGxheWVySW5zdC5vcHRpb25zLnZlY3RvclRpbGVMYXllclN0eWxlcyA9IHN0eWxlO1xuICAgICAgICAgICAgbGF5ZXJJbnN0LnJlZHJhdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbV0FSTl0gVW5hYmxlIHRvIHBhcnNlIE1hcEJveC1zdHlsZSBTdHlsZSBkZWZpbml0aW9ucyBmcm9tOiBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdHlsZVJlc291cmNlLCBudWxsLCAnICcpKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgc3R5bGUgZGVmaW5pdGlvbiBmb3IgbGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIGxheWVyLmxhYmVsICsgXCInLiBcIiArIGUubWVzc2FnZSArIFwiLiBVc2luZyBkZWZhdWx0IExlYWZsZXQgc3R5bGUuXCIpO1xuICAgIH0pO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXJJZCBzdHJpbmcgaWRlbnRpZmllciBvZiBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSByZXNvdXJjZSAtIGF1eGlsbGFyeSByZXNvdXJjZSByZWZlcmVuY2luZyBzdHlsZSBkZWZpbml0aW9uIHRvIGZldGNoXG4gKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0eWxlIGRlZmluaXRpb25cbiAqL1xuZnVuY3Rpb24gZmV0Y2hTdHlsZURlZmluaXRpb24oIGxheWVySWQgOiBzdHJpbmcsIHJlc291cmNlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgIGlmKCFsYXllcklkIHx8ICFyZXNvdXJjZSkge1xuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKFwiVW5hYmxlIHRvIGZldGNoIHN0eWxlIGRlZmluaXRpb24sIG9uZSBvciBtb3JlIHBhcmFtZXRlcnMgd2VyZSBpbnZhbGlkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBpZighcmVzb3VyY2UuY29udGVudElkICYmICFyZXNvdXJjZS5ocmVmKSB7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmV0Y2ggc3R5bGUgZGVmaW5pdGlvbiwgbWlzc2luZyBpZCBvciB1cmwgdG8gc3R5bGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBudWxsO1xuICAgIGlmKHJlc291cmNlLmNvbnRlbnRJZCkge1xuICAgICAgICB1cmwgPSBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBsYXllcklkICsgJy9zdHlsZXMvJyArIHJlc291cmNlLmNvbnRlbnRJZDtcbiAgICB9IGVsc2UgaWYocmVzb3VyY2UuaHJlZikge1xuICAgICAgICB1cmwgPSByZXNvdXJjZS5ocmVmO1xuICAgIH1cblxuICAgIGxldCBjbGllbnQgPSBuZXcgWEhSSHR0cENsaWVudCgpO1xuICAgIGxldCByZXF1ZXN0ID0gY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKHtcbiAgICAgICAgbWV0aG9kIDogXCJHRVRcIixcbiAgICAgICAgdXJsICAgIDogdXJsLFxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICBqc29uICAgOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGNsaWVudC5leGVjdXRlKHJlcXVlc3QpO1xufVxuXG5cblxuZXhwb3J0IHtcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIsXG4gICAgYXBwbHlWZWN0b3JUaWxlU3R5bGVcbn07XG4iXX0=