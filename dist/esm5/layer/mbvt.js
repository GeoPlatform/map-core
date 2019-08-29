/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import { Config, XHRHttpClient } from '@geoplatform/client';
import parseMapBoxStyle from "../shared/mapbox-style";
/** @type {?} */
var STYLE_CONCEPT = {
    "id": "78ad3ecc883de444c8a0684087a61753",
    "uri": "http://www.geoplatform.gov/def/OnlineFunction/styling",
    "type": "skos:Concept",
    "label": "styling"
};
/** @type {?} */
var DEFAULT_STYLE_CONCEPT = {
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
    var href = layer.href;
    if (!href || href.indexOf(".pbf") < 0) {
        console.log("LayerFactory - Layer does not define an Access URL");
        return null; //missing URL
    }
    /** @type {?} */
    var Leaflet = /** @type {?} */ (L);
    //if Leaflet vector grid plugin is not installed, can't render VT Layers
    if (typeof (Leaflet.vectorGrid) === 'undefined' &&
        typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
        console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
        return null;
    }
    /** @type {?} */
    var opts = {
        rendererFactory: (/** @type {?} */ (L.canvas)).tile
    };
    if (Config.leafletPane)
        opts.pane = Config.leafletPane;
    /** @type {?} */
    var result = Leaflet.vectorGrid.protobuf(href, opts);
    /** @type {?} */
    var style = null;
    /** @type {?} */
    var styles = (layer.related || []).filter(function (rel) {
        if (!rel.role)
            return false;
        if (rel.role.uri === DEFAULT_STYLE_CONCEPT.uri) {
            style = rel;
            return false;
        }
        return rel.role.uri === STYLE_CONCEPT.uri;
    });
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
        .then(function (styleDef) {
        /** @type {?} */
        var layerInst = (/** @type {?} */ (leafletLayer));
        layerInst.options.vectorTileLayerStyles = parseMapBoxStyle(styleDef);
        layerInst.redraw();
    })
        .catch(function (e) {
        console.log("An error occurred fetching the style definition for layer '" +
            layer.label + "'. " + e.message + ". Using default Leaflet style.");
    });
}
/**
 * @param {?} layerId string identifier of GeoPlatform Layer object
 * @param {?} resource - auxillary resource referencing style definition to fetch
 * @return {?} Promise resolving style definition
 */
function fetchStyleDefinition(layerId, resource) {
    if (!layerId || !resource || !resource.contentId) {
        /** @type {?} */
        var err = new Error("Unable to fetch style definition, one or more parameters were invalid");
        return Promise.reject(err);
    }
    /** @type {?} */
    var client = new XHRHttpClient();
    /** @type {?} */
    var request = client.createRequestOpts({
        method: "GET",
        url: Config.ualUrl + '/api/layers/' + layerId + '/styles/' + resource.contentId,
        timeout: 5000,
        json: true
    });
    return client.execute(request);
    // return Promise.resolve(resource.content);   //TODO remove this
}
export { mapBoxVectorTileLayer as default, mapBoxVectorTileLayer, applyVectorTileStyle };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBRXBELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztBQUd0RCxJQUFNLGFBQWEsR0FBRztJQUNsQixJQUFJLEVBQUUsa0NBQWtDO0lBQ3hDLEtBQUssRUFBRSx1REFBdUQ7SUFDOUQsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFLFNBQVM7Q0FDckIsQ0FBQzs7QUFFRixJQUFNLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCLENBQUM7Ozs7O0FBSUYsK0JBQWdDLEtBQXdCOztJQUVwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsSUFBTSxPQUFPLHFCQUFHLENBQVEsRUFBQzs7SUFHekIsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNwRSxPQUFP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Q0gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztDQUdsQztBQUlELE9BQU8sRUFDSCxxQkFBcUIsSUFBSSxPQUFPLEVBQ2hDLHFCQUFxQixFQUNyQixvQkFBb0IsRUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgTCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgYXMgTGVhZmxldExheWVyIH0gICAgIGZyb20gXCJsZWFmbGV0XCI7XG5pbXBvcnQge1xuICAgIExheWVyIGFzIEdlb1BsYXRmb3JtTGF5ZXIsIENvbmZpZywgWEhSSHR0cENsaWVudFxufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCBwYXJzZU1hcEJveFN0eWxlIGZyb20gXCIuLi9zaGFyZWQvbWFwYm94LXN0eWxlXCI7XG5cblxuY29uc3QgU1RZTEVfQ09OQ0VQVCA9IHtcbiAgICBcImlkXCI6IFwiNzhhZDNlY2M4ODNkZTQ0NGM4YTA2ODQwODdhNjE3NTNcIixcbiAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L2RlZi9PbmxpbmVGdW5jdGlvbi9zdHlsaW5nXCIsXG4gICAgXCJ0eXBlXCI6IFwic2tvczpDb25jZXB0XCIsXG4gICAgXCJsYWJlbFwiOiBcInN0eWxpbmdcIlxufTtcblxuY29uc3QgREVGQVVMVF9TVFlMRV9DT05DRVBUID0ge1xuICAgIFwiaWRcIjogXCI1Mzk4M2M0Mjk3OGNkNTEwYTVmODQ0ZWMwYTBjNmMyYlwiLFxuICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3YvZGVmL09ubGluZUZ1bmN0aW9uL2RlZmF1bHRfc3R5bGluZ1wiLFxuICAgIFwidHlwZVwiOiBcInNrb3M6Q29uY2VwdFwiLFxuICAgIFwibGFiZWxcIjogXCJkZWZhdWx0IHN0eWxpbmdcIlxufTtcblxuXG5cbmZ1bmN0aW9uIG1hcEJveFZlY3RvclRpbGVMYXllciggbGF5ZXIgOiBHZW9QbGF0Zm9ybUxheWVyICkgOiBMZWFmbGV0TGF5ZXIge1xuXG4gICAgbGV0IGhyZWYgPSBsYXllci5ocmVmO1xuICAgIGlmKCFocmVmIHx8IGhyZWYuaW5kZXhPZihcIi5wYmZcIikgPCAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGF5ZXIgZG9lcyBub3QgZGVmaW5lIGFuIEFjY2VzcyBVUkxcIik7XG4gICAgICAgIHJldHVybiBudWxsOyAgLy9taXNzaW5nIFVSTFxuICAgIH1cblxuICAgIGNvbnN0IExlYWZsZXQgPSBMIGFzIGFueTtcblxuICAgIC8vaWYgTGVhZmxldCB2ZWN0b3IgZ3JpZCBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgY2FuJ3QgcmVuZGVyIFZUIExheWVyc1xuICAgIGlmKCB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkKSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZC5wcm90b2J1ZikgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTGF5ZXJGYWN0b3J5IC0gTGVhZmxldCBWZWN0b3IgVGlsZXMgcGx1Z2luIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIHJlbmRlcmVyRmFjdG9yeTogKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlXG4gICAgICAgIC8vICxcbiAgICAgICAgLy8gZ2V0RmVhdHVyZUlkOiBmdW5jdGlvbiggZmVhdHVyZSA6IGFueSApIHsgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcy5pZDsgfVxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgcmVzdWx0ID0gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgLy9JZiB0aGUgbGF5ZXIgb2JqZWN0IGRlZmluZXMgc3R5bGVzIHRvIHVzZSwgcmVzb2x2ZSB0aGVtIGFuZCBhcHBseSB0aGUgc3R5bGUocylcbiAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgIGxldCBzdHlsZXMgPSAobGF5ZXIucmVsYXRlZCB8fCBbXSkuZmlsdGVyKCByZWwgPT4ge1xuICAgICAgICBpZighcmVsLnJvbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYocmVsLnJvbGUudXJpID09PSBERUZBVUxUX1NUWUxFX0NPTkNFUFQudXJpKSB7XG4gICAgICAgICAgICBzdHlsZSA9IHJlbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVsLnJvbGUudXJpID09PSBTVFlMRV9DT05DRVBULnVyaTtcbiAgICB9KTtcbiAgICBzdHlsZSA9IHN0eWxlIHx8IChzdHlsZXMubGVuZ3RoID8gc3R5bGVzWzBdIDogbnVsbCk7XG4gICAgaWYoIHN0eWxlICkge1xuICAgICAgICBhcHBseVZlY3RvclRpbGVTdHlsZSggbGF5ZXIsIHJlc3VsdCwgc3R5bGUgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIGxlYWZsZXRMYXllciBHcmlkTGF5ZXIgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBHUCBMYXllciBvYmplY3Qgc3BlY2lmaWVkXG4gKiBAcGFyYW0gc3R5bGVSZXNvdXJjZSBHUCBBdXhpbGxhcnkgUmVzb3VyY2Ugb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFwcGx5VmVjdG9yVGlsZVN0eWxlKFxuICAgIGxheWVyIDogR2VvUGxhdGZvcm1MYXllcixcbiAgICBsZWFmbGV0TGF5ZXIgOiBMZWFmbGV0TGF5ZXIsXG4gICAgc3R5bGVSZXNvdXJjZSA6IGFueVxuKSB7XG5cbiAgICBpZighbGVhZmxldExheWVyLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuOiBDb3VsZCBub3QgYXBwbHkgc3R5bGUgdG8gbGF5ZXI7IGxheWVyIGlzIG5vdCBhIFZlY3RvckdyaWQgaW5zdGFuY2VcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL2ZldGNoIGNsb2IgZGVmaW5pdGlvbiBvZiBzdHlsZSB0byB1c2UuLi5cbiAgICBmZXRjaFN0eWxlRGVmaW5pdGlvbiggbGF5ZXIuaWQsIHN0eWxlUmVzb3VyY2UgKVxuICAgIC50aGVuKCAoc3R5bGVEZWYgOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGxheWVySW5zdCA9IChsZWFmbGV0TGF5ZXIgYXMgYW55KTtcbiAgICAgICAgbGF5ZXJJbnN0Lm9wdGlvbnMudmVjdG9yVGlsZUxheWVyU3R5bGVzID0gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGVEZWYgKTtcbiAgICAgICAgbGF5ZXJJbnN0LnJlZHJhdygpO1xuICAgIH0pXG4gICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgc3R5bGUgZGVmaW5pdGlvbiBmb3IgbGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIGxheWVyLmxhYmVsICsgXCInLiBcIiArIGUubWVzc2FnZSArIFwiLiBVc2luZyBkZWZhdWx0IExlYWZsZXQgc3R5bGUuXCIpO1xuICAgIH0pO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXJJZCBzdHJpbmcgaWRlbnRpZmllciBvZiBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSByZXNvdXJjZSAtIGF1eGlsbGFyeSByZXNvdXJjZSByZWZlcmVuY2luZyBzdHlsZSBkZWZpbml0aW9uIHRvIGZldGNoXG4gKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0eWxlIGRlZmluaXRpb25cbiAqL1xuZnVuY3Rpb24gZmV0Y2hTdHlsZURlZmluaXRpb24oIGxheWVySWQgOiBzdHJpbmcsIHJlc291cmNlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgIGlmKCFsYXllcklkIHx8ICFyZXNvdXJjZSB8fCAhcmVzb3VyY2UuY29udGVudElkKSB7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmV0Y2ggc3R5bGUgZGVmaW5pdGlvbiwgb25lIG9yIG1vcmUgcGFyYW1ldGVycyB3ZXJlIGludmFsaWRcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbiAgICBsZXQgY2xpZW50ID0gbmV3IFhIUkh0dHBDbGllbnQoKTtcbiAgICBsZXQgcmVxdWVzdCA9IGNsaWVudC5jcmVhdGVSZXF1ZXN0T3B0cyh7XG4gICAgICAgIG1ldGhvZCA6IFwiR0VUXCIsXG4gICAgICAgIHVybCAgICA6IENvbmZpZy51YWxVcmwgKyAnL2FwaS9sYXllcnMvJyArIGxheWVySWQgKyAnL3N0eWxlcy8nICsgcmVzb3VyY2UuY29udGVudElkLFxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgICAgICBqc29uICAgOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIGNsaWVudC5leGVjdXRlKHJlcXVlc3QpO1xuXG4gICAgLy8gcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNvdXJjZS5jb250ZW50KTsgICAvL1RPRE8gcmVtb3ZlIHRoaXNcbn1cblxuXG5cbmV4cG9ydCB7XG4gICAgbWFwQm94VmVjdG9yVGlsZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgbWFwQm94VmVjdG9yVGlsZUxheWVyLFxuICAgIGFwcGx5VmVjdG9yVGlsZVN0eWxlXG59O1xuIl19