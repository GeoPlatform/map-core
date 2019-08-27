/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    const Leaflet = /** @type {?} */ (L);
    //if Leaflet vector grid plugin is not installed, can't render VT Layers
    if (typeof (Leaflet.vectorGrid) === 'undefined' &&
        typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
        console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
        return null;
    }
    /** @type {?} */
    let opts = {
        rendererFactory: (/** @type {?} */ (L.canvas)).tile
    };
    if (Config.leafletPane)
        opts.pane = Config.leafletPane;
    /** @type {?} */
    let result = Leaflet.vectorGrid.protobuf(href, opts);
    /** @type {?} */
    let style = null;
    /** @type {?} */
    let styles = (layer.related || []).map(rel => {
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
        .then((styleDef) => {
        /** @type {?} */
        let layerInst = (/** @type {?} */ (leafletLayer));
        layerInst.options.vectorTileLayerStyles = parseMapBoxStyle(styleDef);
        layerInst.redraw();
    })
        .catch(e => {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBRXBELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztBQUd0RCxNQUFNLGFBQWEsR0FBRztJQUNsQixJQUFJLEVBQUUsa0NBQWtDO0lBQ3hDLEtBQUssRUFBRSx1REFBdUQ7SUFDOUQsTUFBTSxFQUFFLGNBQWM7SUFDdEIsT0FBTyxFQUFFLFNBQVM7Q0FDckIsQ0FBQzs7QUFFRixNQUFNLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCLENBQUM7Ozs7O0FBSUYsK0JBQWdDLEtBQXdCOztJQUVwRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7O0lBRUQsTUFBTSxPQUFPLHFCQUFHLENBQVEsRUFBQzs7SUFHekIsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNwRSxPQUFP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STtLQUNoQixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0NBR2xDO0FBSUQsT0FBTyxFQUNILHFCQUFxQixJQUFJLE9BQU8sRUFDaEMscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBMICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBMYXllciBhcyBMZWFmbGV0TGF5ZXIgfSAgICAgZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCB7XG4gICAgTGF5ZXIgYXMgR2VvUGxhdGZvcm1MYXllciwgQ29uZmlnLCBYSFJIdHRwQ2xpZW50XG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHBhcnNlTWFwQm94U3R5bGUgZnJvbSBcIi4uL3NoYXJlZC9tYXBib3gtc3R5bGVcIjtcblxuXG5jb25zdCBTVFlMRV9DT05DRVBUID0ge1xuICAgIFwiaWRcIjogXCI3OGFkM2VjYzg4M2RlNDQ0YzhhMDY4NDA4N2E2MTc1M1wiLFxuICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3YvZGVmL09ubGluZUZ1bmN0aW9uL3N0eWxpbmdcIixcbiAgICBcInR5cGVcIjogXCJza29zOkNvbmNlcHRcIixcbiAgICBcImxhYmVsXCI6IFwic3R5bGluZ1wiXG59O1xuXG5jb25zdCBERUZBVUxUX1NUWUxFX0NPTkNFUFQgPSB7XG4gICAgXCJpZFwiOiBcIjUzOTgzYzQyOTc4Y2Q1MTBhNWY4NDRlYzBhMGM2YzJiXCIsXG4gICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9kZWYvT25saW5lRnVuY3Rpb24vZGVmYXVsdF9zdHlsaW5nXCIsXG4gICAgXCJ0eXBlXCI6IFwic2tvczpDb25jZXB0XCIsXG4gICAgXCJsYWJlbFwiOiBcImRlZmF1bHQgc3R5bGluZ1wiXG59O1xuXG5cblxuZnVuY3Rpb24gbWFwQm94VmVjdG9yVGlsZUxheWVyKCBsYXllciA6IEdlb1BsYXRmb3JtTGF5ZXIgKSA6IExlYWZsZXRMYXllciB7XG5cbiAgICBsZXQgaHJlZiA9IGxheWVyLmhyZWY7XG4gICAgaWYoIWhyZWYgfHwgaHJlZi5pbmRleE9mKFwiLnBiZlwiKSA8IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMYXllciBkb2VzIG5vdCBkZWZpbmUgYW4gQWNjZXNzIFVSTFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7ICAvL21pc3NpbmcgVVJMXG4gICAgfVxuXG4gICAgY29uc3QgTGVhZmxldCA9IEwgYXMgYW55O1xuXG4gICAgLy9pZiBMZWFmbGV0IHZlY3RvciBncmlkIHBsdWdpbiBpcyBub3QgaW5zdGFsbGVkLCBjYW4ndCByZW5kZXIgVlQgTGF5ZXJzXG4gICAgaWYoIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQpID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMZWFmbGV0IFZlY3RvciBUaWxlcyBwbHVnaW4gbm90IGZvdW5kXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgcmVuZGVyZXJGYWN0b3J5OiAoIEwuY2FudmFzIGFzIGFueSApLnRpbGVcbiAgICAgICAgLy8gLFxuICAgICAgICAvLyBnZXRGZWF0dXJlSWQ6IGZ1bmN0aW9uKCBmZWF0dXJlIDogYW55ICkgeyByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkOyB9XG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCByZXN1bHQgPSBMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYoaHJlZiwgb3B0cyk7XG5cbiAgICAvL0lmIHRoZSBsYXllciBvYmplY3QgZGVmaW5lcyBzdHlsZXMgdG8gdXNlLCByZXNvbHZlIHRoZW0gYW5kIGFwcGx5IHRoZSBzdHlsZShzKVxuICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgbGV0IHN0eWxlcyA9IChsYXllci5yZWxhdGVkIHx8IFtdKS5tYXAoIHJlbCA9PiB7XG4gICAgICAgIGlmKCFyZWwucm9sZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihyZWwucm9sZS51cmkgPT09IERFRkFVTFRfU1RZTEVfQ09OQ0VQVC51cmkpIHtcbiAgICAgICAgICAgIHN0eWxlID0gcmVsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWwucm9sZS51cmkgPT09IFNUWUxFX0NPTkNFUFQudXJpO1xuICAgIH0pO1xuICAgIHN0eWxlID0gc3R5bGUgfHwgKHN0eWxlcy5sZW5ndGggPyBzdHlsZXNbMF0gOiBudWxsKTtcbiAgICBpZiggc3R5bGUgKSB7XG4gICAgICAgIGFwcGx5VmVjdG9yVGlsZVN0eWxlKCBsYXllciwgcmVzdWx0LCBzdHlsZSApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gbGVhZmxldExheWVyIEdyaWRMYXllciBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIEdQIExheWVyIG9iamVjdCBzcGVjaWZpZWRcbiAqIEBwYXJhbSBzdHlsZVJlc291cmNlIEdQIEF1eGlsbGFyeSBSZXNvdXJjZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlWZWN0b3JUaWxlU3R5bGUoXG4gICAgbGF5ZXIgOiBHZW9QbGF0Zm9ybUxheWVyLFxuICAgIGxlYWZsZXRMYXllciA6IExlYWZsZXRMYXllcixcbiAgICBzdHlsZVJlc291cmNlIDogYW55XG4pIHtcblxuICAgIGlmKCFsZWFmbGV0TGF5ZXIuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldhcm46IENvdWxkIG5vdCBhcHBseSBzdHlsZSB0byBsYXllcjsgbGF5ZXIgaXMgbm90IGEgVmVjdG9yR3JpZCBpbnN0YW5jZVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vZmV0Y2ggY2xvYiBkZWZpbml0aW9uIG9mIHN0eWxlIHRvIHVzZS4uLlxuICAgIGZldGNoU3R5bGVEZWZpbml0aW9uKCBsYXllci5pZCwgc3R5bGVSZXNvdXJjZSApXG4gICAgLnRoZW4oIChzdHlsZURlZiA6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbGF5ZXJJbnN0ID0gKGxlYWZsZXRMYXllciBhcyBhbnkpO1xuICAgICAgICBsYXllckluc3Qub3B0aW9ucy52ZWN0b3JUaWxlTGF5ZXJTdHlsZXMgPSBwYXJzZU1hcEJveFN0eWxlKCBzdHlsZURlZiApO1xuICAgICAgICBsYXllckluc3QucmVkcmF3KCk7XG4gICAgfSlcbiAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VycmVkIGZldGNoaW5nIHRoZSBzdHlsZSBkZWZpbml0aW9uIGZvciBsYXllciAnXCIgK1xuICAgICAgICAgICAgbGF5ZXIubGFiZWwgKyBcIicuIFwiICsgZS5tZXNzYWdlICsgXCIuIFVzaW5nIGRlZmF1bHQgTGVhZmxldCBzdHlsZS5cIik7XG4gICAgfSk7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllcklkIHN0cmluZyBpZGVudGlmaWVyIG9mIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIHJlc291cmNlIC0gYXV4aWxsYXJ5IHJlc291cmNlIHJlZmVyZW5jaW5nIHN0eWxlIGRlZmluaXRpb24gdG8gZmV0Y2hcbiAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgZGVmaW5pdGlvblxuICovXG5mdW5jdGlvbiBmZXRjaFN0eWxlRGVmaW5pdGlvbiggbGF5ZXJJZCA6IHN0cmluZywgcmVzb3VyY2UgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgaWYoIWxheWVySWQgfHwgIXJlc291cmNlIHx8ICFyZXNvdXJjZS5jb250ZW50SWQpIHtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmZXRjaCBzdHlsZSBkZWZpbml0aW9uLCBvbmUgb3IgbW9yZSBwYXJhbWV0ZXJzIHdlcmUgaW52YWxpZFwiKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxuICAgIGxldCBjbGllbnQgPSBuZXcgWEhSSHR0cENsaWVudCgpO1xuICAgIGxldCByZXF1ZXN0ID0gY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKHtcbiAgICAgICAgbWV0aG9kIDogXCJHRVRcIixcbiAgICAgICAgdXJsICAgIDogQ29uZmlnLnVhbFVybCArICcvYXBpL2xheWVycy8nICsgbGF5ZXJJZCArICcvc3R5bGVzLycgKyByZXNvdXJjZS5jb250ZW50SWQsXG4gICAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgICAgIGpzb24gICA6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gY2xpZW50LmV4ZWN1dGUocmVxdWVzdCk7XG5cbiAgICAvLyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc291cmNlLmNvbnRlbnQpOyAgIC8vVE9ETyByZW1vdmUgdGhpc1xufVxuXG5cblxuZXhwb3J0IHtcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIsXG4gICAgYXBwbHlWZWN0b3JUaWxlU3R5bGVcbn07XG4iXX0=