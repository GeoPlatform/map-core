/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import { SVG } from "leaflet";
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
    var Leaflet = (/** @type {?} */ (L));
    //if Leaflet vector grid plugin is not installed, can't render VT Layers
    if (typeof (Leaflet.vectorGrid) === 'undefined' &&
        typeof (Leaflet.vectorGrid.protobuf) === 'undefined') {
        console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
        return null;
    }
    augmentSVGTile();
    /** @type {?} */
    var opts = {
        rendererFactory: ((/** @type {?} */ (L.svg))).tile //( L.canvas as any ).tile
        // ,
        // getFeatureId: function( feature : any ) { return feature.properties.id; }
    };
    if (Config.leafletPane)
        opts.pane = Config.leafletPane;
    /** @type {?} */
    var result = Leaflet.vectorGrid.protobuf(href, opts);
    //If the layer object defines styles to use, resolve them and apply the style(s)
    /** @type {?} */
    var style = null;
    /** @type {?} */
    var styles = (layer.related || []).filter((/**
     * @param {?} rel
     * @return {?}
     */
    function (rel) {
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
    function (styleDef) {
        /** @type {?} */
        var layerInst = ((/** @type {?} */ (leafletLayer)));
        /** @type {?} */
        var style = parseMapBoxStyle(styleDef);
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
    function (e) {
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
        var err = new Error("Unable to fetch style definition, one or more parameters were invalid");
        return Promise.reject(err);
    }
    if (!resource.contentId && !resource.href) {
        /** @type {?} */
        var err = new Error("Unable to fetch style definition, missing id or url to style");
        return Promise.reject(err);
    }
    /** @type {?} */
    var url = null;
    if (resource.contentId) {
        url = Config.ualUrl + '/api/layers/' + layerId + '/styles/' + resource.contentId;
    }
    else if (resource.href) {
        url = resource.href;
    }
    /** @type {?} */
    var client = new XHRHttpClient();
    /** @type {?} */
    var request = client.createRequestOpts({ method: "GET", url: url, timeout: 5000, json: true });
    return client.execute(request).then((/**
     * @param {?} styleDef
     * @return {?}
     */
    function (styleDef) {
        if (styleDef.sprite) {
            /** @type {?} */
            var spriteUrl_1 = resolveRelativeUrl(url + '/', styleDef.sprite);
            return fetchSpriteInfo(spriteUrl_1 + '.json', client)
                .then((/**
             * @param {?} spriteDef
             * @return {?}
             */
            function (spriteDef) {
                styleDef.spriteJSON = spriteDef;
                styleDef.spriteURL = spriteUrl_1 + '.png';
                return styleDef;
            }));
        }
        return styleDef;
    }));
}
/**
 * load sprite JSON and embed inline...
 * @param {?} spriteUrl
 * @param {?} client
 * @return {?}
 */
function fetchSpriteInfo(spriteUrl, client) {
    /** @type {?} */
    var request = client.createRequestOpts({ method: "GET", url: spriteUrl, timeout: 5000, json: true });
    return client.execute(request);
}
/**
 *
 * @param {?} baseUrl
 * @param {?} url
 * @return {?}
 */
function resolveRelativeUrl(baseUrl, url) {
    if (!url)
        return baseUrl;
    return new URL(url, baseUrl).href; //won't work in IE11 but fine elsewhere
}
/**
 * @return {?}
 */
function augmentSVGTile() {
    /** @type {?} */
    var Tile = ((/** @type {?} */ (SVG))).Tile;
    if (Tile && !Tile._augmented) {
        console.log("Augmenting Tile Layer");
        Tile.include({
            _augmented: true,
            _addPath: (/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                /** @type {?} */
                var options = layer.options;
                /** @type {?} */
                var hasFillColor = !options.fillPattern && options.fillColor &&
                    options.fillColor !== 'transparent';
                if (this._rootGroup.firstChild && hasFillColor) {
                    //move a non-fill pattern path to the front of its siblings so it
                    // is rendered BEFORE any fill patterns are.  SVG does not support
                    // z-index within it's elements and ordering is front to back (bottom to top).
                    this._rootGroup.insertBefore(layer._path, this._rootGroup.firstChild);
                }
                else {
                    this._rootGroup.appendChild(layer._path);
                }
                this._layers[((/** @type {?} */ (L))).stamp(layer)] = layer;
            })
        });
    }
}
SVG.include({
    _updateStyle: (/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var path = layer._path;
        /** @type {?} */
        var options = layer.options;
        if (!path) {
            return;
        }
        if (options.stroke) {
            path.setAttribute('stroke', options.color);
            path.setAttribute('stroke-opacity', options.opacity);
            path.setAttribute('stroke-width', options.weight);
            path.setAttribute('stroke-linecap', options.lineCap);
            path.setAttribute('stroke-linejoin', options.lineJoin);
            if (options.dashArray) {
                path.setAttribute('stroke-dasharray', options.dashArray);
            }
            else {
                path.removeAttribute('stroke-dasharray');
            }
            if (options.dashOffset) {
                path.setAttribute('stroke-dashoffset', options.dashOffset);
            }
            else {
                path.removeAttribute('stroke-dashoffset');
            }
        }
        else {
            path.setAttribute('stroke', 'none');
        }
        if (options.fillPattern || (options.fillColor && options.fillColor !== 'transparent')) {
            if (options.fillPattern && typeof (options.fillPattern) === "object") {
                this.__fillPattern(layer);
            }
            else {
                path.setAttribute('fill', options.fillColor || options.color);
            }
            path.setAttribute('fill-opacity', options.fillOpacity);
            path.setAttribute('fill-rule', options.fillRule || 'evenodd');
        }
        else {
            path.setAttribute('fill', 'none');
        }
    }),
    __fillPattern: (/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var path = layer._path;
        /** @type {?} */
        var options = layer.options;
        if (!this._defs) {
            this._defs = SVG.create('defs');
            this._container.appendChild(this._defs);
        }
        /** @type {?} */
        var imgUrl = options.fillPattern.url;
        /** @type {?} */
        var patternId = options.fillPattern.id + this._tileCoord.z + this._tileCoord.x + this._tileCoord.y;
        /** @type {?} */
        var patternEl = document.getElementById(patternId);
        if (!patternEl) {
            /** @type {?} */
            var imgObj = new Image();
            imgObj.src = imgUrl;
            patternEl = SVG.create('pattern');
            patternEl.setAttribute('id', patternId);
            patternEl.setAttribute('x', options.fillPattern.x);
            patternEl.setAttribute('y', options.fillPattern.y);
            patternEl.setAttribute('patternUnits', 'userSpaceOnUse');
            patternEl.setAttribute('width', options.fillPattern.width);
            patternEl.setAttribute('height', options.fillPattern.height);
            this._defs.appendChild(patternEl);
            /** @type {?} */
            var imgEl = SVG.create('image');
            imgEl.setAttribute('x', '0');
            imgEl.setAttribute('y', '0');
            imgEl.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgUrl);
            imgEl.setAttribute('width', options.fillPattern.width);
            imgEl.setAttribute('height', options.fillPattern.height);
            /** @type {?} */
            var tx = options.fillPattern.x > 0 ? ('-' + options.fillPattern.x) : 0;
            /** @type {?} */
            var ty = options.fillPattern.y > 0 ? ('-' + options.fillPattern.y) : 0;
            imgEl.setAttribute("transform", "translate(" + tx + " " + ty + ")");
            patternEl.appendChild(imgEl);
            imgObj.onload = (/**
             * @return {?}
             */
            function () {
                imgEl.setAttribute('width', imgObj.width + '');
                imgEl.setAttribute('height', imgObj.height + '');
            });
        }
        path.setAttribute('fill', "url(#" + patternId + ")");
    })
});
export { mapBoxVectorTileLayer as default, mapBoxVectorTileLayer, applyVectorTileStyle };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBQ3BELE9BQU8sRUFBeUIsR0FBRyxFQUFFLE1BQVUsU0FBUyxDQUFDO0FBQ3pELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztJQUdoRCxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxLQUFLLEVBQUUsdURBQXVEO0lBQzlELE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRSxTQUFTO0NBQ3JCOztJQUVLLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCOzs7OztBQUlELFNBQVMscUJBQXFCLENBQUUsS0FBd0I7O1FBRWhELElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTtJQUNyQixJQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxDQUFFLGFBQWE7S0FDOUI7O1FBRUssT0FBTyxHQUFHLG1CQUFBLENBQUMsRUFBTztJQUV4Qix3RUFBd0U7SUFDeEUsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9B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Q0FBQyxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxNQUFNOzs7WUFBRztnQkFDWixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQSxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUMsU0FBUyxHQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQTtDQUNKLENBQUMsQ0FBQztBQWVILE9BQU8sRUFDSCxxQkFBcUIsSUFBSSxPQUFPLEVBQ2hDLHFCQUFxQixFQUNyQixvQkFBb0IsRUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0ICogYXMgTCAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgTGF5ZXIgYXMgTGVhZmxldExheWVyLCBTVkcgfSAgICAgZnJvbSBcImxlYWZsZXRcIjtcbmltcG9ydCB7XG4gICAgTGF5ZXIgYXMgR2VvUGxhdGZvcm1MYXllciwgQ29uZmlnLCBYSFJIdHRwQ2xpZW50XG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHBhcnNlTWFwQm94U3R5bGUgZnJvbSBcIi4uL3NoYXJlZC9tYXBib3gtc3R5bGVcIjtcblxuXG5jb25zdCBTVFlMRV9DT05DRVBUID0ge1xuICAgIFwiaWRcIjogXCI3OGFkM2VjYzg4M2RlNDQ0YzhhMDY4NDA4N2E2MTc1M1wiLFxuICAgIFwidXJpXCI6IFwiaHR0cDovL3d3dy5nZW9wbGF0Zm9ybS5nb3YvZGVmL09ubGluZUZ1bmN0aW9uL3N0eWxpbmdcIixcbiAgICBcInR5cGVcIjogXCJza29zOkNvbmNlcHRcIixcbiAgICBcImxhYmVsXCI6IFwic3R5bGluZ1wiXG59O1xuXG5jb25zdCBERUZBVUxUX1NUWUxFX0NPTkNFUFQgPSB7XG4gICAgXCJpZFwiOiBcIjUzOTgzYzQyOTc4Y2Q1MTBhNWY4NDRlYzBhMGM2YzJiXCIsXG4gICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9kZWYvT25saW5lRnVuY3Rpb24vZGVmYXVsdF9zdHlsaW5nXCIsXG4gICAgXCJ0eXBlXCI6IFwic2tvczpDb25jZXB0XCIsXG4gICAgXCJsYWJlbFwiOiBcImRlZmF1bHQgc3R5bGluZ1wiXG59O1xuXG5cblxuZnVuY3Rpb24gbWFwQm94VmVjdG9yVGlsZUxheWVyKCBsYXllciA6IEdlb1BsYXRmb3JtTGF5ZXIgKSA6IExlYWZsZXRMYXllciB7XG5cbiAgICBsZXQgaHJlZiA9IGxheWVyLmhyZWY7XG4gICAgaWYoIWhyZWYgfHwgaHJlZi5pbmRleE9mKFwiLnBiZlwiKSA8IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMYXllciBkb2VzIG5vdCBkZWZpbmUgYW4gQWNjZXNzIFVSTFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7ICAvL21pc3NpbmcgVVJMXG4gICAgfVxuXG4gICAgY29uc3QgTGVhZmxldCA9IEwgYXMgYW55O1xuXG4gICAgLy9pZiBMZWFmbGV0IHZlY3RvciBncmlkIHBsdWdpbiBpcyBub3QgaW5zdGFsbGVkLCBjYW4ndCByZW5kZXIgVlQgTGF5ZXJzXG4gICAgaWYoIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQpID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YoTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMYXllckZhY3RvcnkgLSBMZWFmbGV0IFZlY3RvciBUaWxlcyBwbHVnaW4gbm90IGZvdW5kXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBhdWdtZW50U1ZHVGlsZSgpO1xuXG4gICAgbGV0IG9wdHMgOiBhbnkgPSB7XG4gICAgICAgIHJlbmRlcmVyRmFjdG9yeTogKCBMLnN2ZyBhcyBhbnkgKS50aWxlIC8vKCBMLmNhbnZhcyBhcyBhbnkgKS50aWxlXG4gICAgICAgIC8vICxcbiAgICAgICAgLy8gZ2V0RmVhdHVyZUlkOiBmdW5jdGlvbiggZmVhdHVyZSA6IGFueSApIHsgcmV0dXJuIGZlYXR1cmUucHJvcGVydGllcy5pZDsgfVxuICAgIH07XG4gICAgaWYoQ29uZmlnLmxlYWZsZXRQYW5lKSBvcHRzLnBhbmUgPSBDb25maWcubGVhZmxldFBhbmU7XG5cbiAgICBsZXQgcmVzdWx0ID0gTGVhZmxldC52ZWN0b3JHcmlkLnByb3RvYnVmKGhyZWYsIG9wdHMpO1xuXG4gICAgLy9JZiB0aGUgbGF5ZXIgb2JqZWN0IGRlZmluZXMgc3R5bGVzIHRvIHVzZSwgcmVzb2x2ZSB0aGVtIGFuZCBhcHBseSB0aGUgc3R5bGUocylcbiAgICBsZXQgc3R5bGUgPSBudWxsO1xuICAgIGxldCBzdHlsZXMgPSAobGF5ZXIucmVsYXRlZCB8fCBbXSkuZmlsdGVyKCByZWwgPT4ge1xuICAgICAgICBpZighcmVsLnJvbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYocmVsLnJvbGUudXJpID09PSBERUZBVUxUX1NUWUxFX0NPTkNFUFQudXJpKSB7XG4gICAgICAgICAgICBzdHlsZSA9IHJlbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVsLnJvbGUudXJpID09PSBTVFlMRV9DT05DRVBULnVyaTtcbiAgICB9KTtcbiAgICBzdHlsZSA9IHN0eWxlIHx8IChzdHlsZXMubGVuZ3RoID8gc3R5bGVzWzBdIDogbnVsbCk7XG4gICAgaWYoIHN0eWxlICkge1xuICAgICAgICBhcHBseVZlY3RvclRpbGVTdHlsZSggbGF5ZXIsIHJlc3VsdCwgc3R5bGUgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIGxlYWZsZXRMYXllciBHcmlkTGF5ZXIgaW5zdGFuY2UgcmVwcmVzZW50aW5nIHRoZSBHUCBMYXllciBvYmplY3Qgc3BlY2lmaWVkXG4gKiBAcGFyYW0gc3R5bGVSZXNvdXJjZSBHUCBBdXhpbGxhcnkgUmVzb3VyY2Ugb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFwcGx5VmVjdG9yVGlsZVN0eWxlKFxuICAgIGxheWVyIDogR2VvUGxhdGZvcm1MYXllcixcbiAgICBsZWFmbGV0TGF5ZXIgOiBMZWFmbGV0TGF5ZXIsXG4gICAgc3R5bGVSZXNvdXJjZSA6IGFueVxuKSB7XG5cbiAgICBpZighbGVhZmxldExheWVyLmhhc093blByb3BlcnR5KCdvcHRpb25zJykpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYXJuOiBDb3VsZCBub3QgYXBwbHkgc3R5bGUgdG8gbGF5ZXI7IGxheWVyIGlzIG5vdCBhIFZlY3RvckdyaWQgaW5zdGFuY2VcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL2ZldGNoIGNsb2IgZGVmaW5pdGlvbiBvZiBzdHlsZSB0byB1c2UuLi5cbiAgICBmZXRjaFN0eWxlRGVmaW5pdGlvbiggbGF5ZXIuaWQsIHN0eWxlUmVzb3VyY2UgKVxuICAgIC50aGVuKCAoc3R5bGVEZWYgOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGxheWVySW5zdCA9IChsZWFmbGV0TGF5ZXIgYXMgYW55KTtcbiAgICAgICAgbGV0IHN0eWxlID0gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGVEZWYgKTtcbiAgICAgICAgaWYoc3R5bGUgJiYgdHlwZW9mKHN0eWxlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGxheWVySW5zdC5vcHRpb25zLnZlY3RvclRpbGVMYXllclN0eWxlcyA9IHN0eWxlO1xuICAgICAgICAgICAgbGF5ZXJJbnN0LnJlZHJhdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbV0FSTl0gVW5hYmxlIHRvIHBhcnNlIE1hcEJveC1zdHlsZSBTdHlsZSBkZWZpbml0aW9ucyBmcm9tOiBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdHlsZVJlc291cmNlLCBudWxsLCAnICcpKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKCBlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cnJlZCBmZXRjaGluZyB0aGUgc3R5bGUgZGVmaW5pdGlvbiBmb3IgbGF5ZXIgJ1wiICtcbiAgICAgICAgICAgIGxheWVyLmxhYmVsICsgXCInLiBcIiArIGUubWVzc2FnZSArIFwiLiBVc2luZyBkZWZhdWx0IExlYWZsZXQgc3R5bGUuXCIpO1xuICAgIH0pO1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXJJZCBzdHJpbmcgaWRlbnRpZmllciBvZiBHZW9QbGF0Zm9ybSBMYXllciBvYmplY3RcbiAqIEBwYXJhbSByZXNvdXJjZSAtIGF1eGlsbGFyeSByZXNvdXJjZSByZWZlcmVuY2luZyBzdHlsZSBkZWZpbml0aW9uIHRvIGZldGNoXG4gKiBAcmV0dXJuIFByb21pc2UgcmVzb2x2aW5nIHN0eWxlIGRlZmluaXRpb25cbiAqL1xuZnVuY3Rpb24gZmV0Y2hTdHlsZURlZmluaXRpb24oIGxheWVySWQgOiBzdHJpbmcsIHJlc291cmNlIDogYW55ICkgOiBQcm9taXNlPGFueT4ge1xuICAgIGlmKCFsYXllcklkIHx8ICFyZXNvdXJjZSkge1xuICAgICAgICBsZXQgZXJyID0gbmV3IEVycm9yKFwiVW5hYmxlIHRvIGZldGNoIHN0eWxlIGRlZmluaXRpb24sIG9uZSBvciBtb3JlIHBhcmFtZXRlcnMgd2VyZSBpbnZhbGlkXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBpZighcmVzb3VyY2UuY29udGVudElkICYmICFyZXNvdXJjZS5ocmVmKSB7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmV0Y2ggc3R5bGUgZGVmaW5pdGlvbiwgbWlzc2luZyBpZCBvciB1cmwgdG8gc3R5bGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSBudWxsO1xuICAgIGlmKHJlc291cmNlLmNvbnRlbnRJZCkge1xuICAgICAgICB1cmwgPSBDb25maWcudWFsVXJsICsgJy9hcGkvbGF5ZXJzLycgKyBsYXllcklkICsgJy9zdHlsZXMvJyArIHJlc291cmNlLmNvbnRlbnRJZDtcbiAgICB9IGVsc2UgaWYocmVzb3VyY2UuaHJlZikge1xuICAgICAgICB1cmwgPSByZXNvdXJjZS5ocmVmO1xuICAgIH1cblxuICAgIGxldCBjbGllbnQgPSBuZXcgWEhSSHR0cENsaWVudCgpO1xuICAgIGxldCByZXF1ZXN0ID0gY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKHsgbWV0aG9kOiBcIkdFVFwiLCB1cmw6IHVybCwgdGltZW91dDogNTAwMCwganNvbjogdHJ1ZSB9KTtcbiAgICByZXR1cm4gY2xpZW50LmV4ZWN1dGUocmVxdWVzdCkudGhlbiggKHN0eWxlRGVmIDogYW55KSA9PiB7XG4gICAgICAgIGlmKHN0eWxlRGVmLnNwcml0ZSkge1xuICAgICAgICAgICAgbGV0IHNwcml0ZVVybCA9IHJlc29sdmVSZWxhdGl2ZVVybCh1cmwgKyAnLycsIHN0eWxlRGVmLnNwcml0ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmZXRjaFNwcml0ZUluZm8oc3ByaXRlVXJsICsgJy5qc29uJywgY2xpZW50KVxuICAgICAgICAgICAgLnRoZW4oIChzcHJpdGVEZWYgOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBzdHlsZURlZi5zcHJpdGVKU09OID0gc3ByaXRlRGVmO1xuICAgICAgICAgICAgICAgIHN0eWxlRGVmLnNwcml0ZVVSTCA9IHNwcml0ZVVybCArICcucG5nJztcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVEZWY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVEZWY7XG4gICAgfSk7XG59XG5cbi8qKlxuICogbG9hZCBzcHJpdGUgSlNPTiBhbmQgZW1iZWQgaW5saW5lLi4uXG4gKi9cbmZ1bmN0aW9uIGZldGNoU3ByaXRlSW5mbyhzcHJpdGVVcmwsIGNsaWVudCkgOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCByZXF1ZXN0ID0gY2xpZW50LmNyZWF0ZVJlcXVlc3RPcHRzKHttZXRob2Q6IFwiR0VUXCIsIHVybDogc3ByaXRlVXJsLCB0aW1lb3V0OiA1MDAwLCBqc29uOiB0cnVlfSk7XG4gICAgcmV0dXJuIGNsaWVudC5leGVjdXRlKHJlcXVlc3QpO1xufVxuXG4vKipcbiAqXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVSZWxhdGl2ZVVybChiYXNlVXJsLCB1cmwpIHtcbiAgICBpZighdXJsKSByZXR1cm4gYmFzZVVybDtcbiAgICByZXR1cm4gbmV3IFVSTCh1cmwsIGJhc2VVcmwpLmhyZWY7ICAvL3dvbid0IHdvcmsgaW4gSUUxMSBidXQgZmluZSBlbHNld2hlcmVcbn1cblxuXG5cblxuZnVuY3Rpb24gYXVnbWVudFNWR1RpbGUoKSB7XG4gICAgY29uc3QgVGlsZSA9IChTVkcgYXMgYW55KS5UaWxlO1xuICAgIGlmKFRpbGUgJiYgIVRpbGUuX2F1Z21lbnRlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1Z21lbnRpbmcgVGlsZSBMYXllclwiKTtcbiAgICAgICAgVGlsZS5pbmNsdWRlKHtcblxuICAgICAgICAgICAgX2F1Z21lbnRlZCA6IHRydWUsXG5cbiAgICAgICAgXHRfYWRkUGF0aDogZnVuY3Rpb24gKGxheWVyKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgbGV0IGhhc0ZpbGxDb2xvciA9ICFvcHRpb25zLmZpbGxQYXR0ZXJuICYmIG9wdGlvbnMuZmlsbENvbG9yICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsbENvbG9yICE9PSAndHJhbnNwYXJlbnQnO1xuXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuX3Jvb3RHcm91cC5maXJzdENoaWxkICYmIGhhc0ZpbGxDb2xvciApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9tb3ZlIGEgbm9uLWZpbGwgcGF0dGVybiBwYXRoIHRvIHRoZSBmcm9udCBvZiBpdHMgc2libGluZ3Mgc28gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gaXMgcmVuZGVyZWQgQkVGT1JFIGFueSBmaWxsIHBhdHRlcm5zIGFyZS4gIFNWRyBkb2VzIG5vdCBzdXBwb3J0XG4gICAgICAgICAgICAgICAgICAgIC8vIHotaW5kZXggd2l0aGluIGl0J3MgZWxlbWVudHMgYW5kIG9yZGVyaW5nIGlzIGZyb250IHRvIGJhY2sgKGJvdHRvbSB0byB0b3ApLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb290R3JvdXAuaW5zZXJ0QmVmb3JlKGxheWVyLl9wYXRoLCB0aGlzLl9yb290R3JvdXAuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdEdyb3VwLmFwcGVuZENoaWxkKGxheWVyLl9wYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFx0XHR0aGlzLl9sYXllcnNbIChMIGFzIGFueSkuc3RhbXAobGF5ZXIpIF0gPSBsYXllcjtcbiAgICAgICAgXHR9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cblxuXG5cblxuU1ZHLmluY2x1ZGUoe1xuXG4gICAgX3VwZGF0ZVN0eWxlOiBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgdmFyIHBhdGggPSBsYXllci5fcGF0aCwgb3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKCFwYXRoKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLnN0cm9rZSkge1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICAgICAgICAgb3B0aW9ucy5jb2xvcik7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLW9wYWNpdHknLCBvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsICAgb3B0aW9ucy53ZWlnaHQpO1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lY2FwJywgb3B0aW9ucy5saW5lQ2FwKTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWpvaW4nLG9wdGlvbnMubGluZUpvaW4pO1xuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYXNoQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScsIG9wdGlvbnMuZGFzaEFycmF5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aC5yZW1vdmVBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGFzaE9mZnNldCkge1xuICAgICAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaG9mZnNldCcsIG9wdGlvbnMuZGFzaE9mZnNldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhdGgucmVtb3ZlQXR0cmlidXRlKCdzdHJva2UtZGFzaG9mZnNldCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsICdub25lJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5maWxsUGF0dGVybiB8fCAob3B0aW9ucy5maWxsQ29sb3IgJiYgb3B0aW9ucy5maWxsQ29sb3IgIT09ICd0cmFuc3BhcmVudCcpKSB7XG4gICAgICAgICAgICBpZiAoIG9wdGlvbnMuZmlsbFBhdHRlcm4gJiYgdHlwZW9mKG9wdGlvbnMuZmlsbFBhdHRlcm4pID09PSBcIm9iamVjdFwiICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19maWxsUGF0dGVybihsYXllcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgb3B0aW9ucy5maWxsQ29sb3IgfHwgb3B0aW9ucy5jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5Jywgb3B0aW9ucy5maWxsT3BhY2l0eSk7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbC1ydWxlJywgb3B0aW9ucy5maWxsUnVsZSB8fCAnZXZlbm9kZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9fZmlsbFBhdHRlcm46IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgIHZhciBwYXRoID0gbGF5ZXIuX3BhdGgsIG9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xuXG4gICAgICAgIGlmICghdGhpcy5fZGVmcykge1xuICAgICAgICAgICAgdGhpcy5fZGVmcyA9IFNWRy5jcmVhdGUoJ2RlZnMnKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9kZWZzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbWdVcmwgPSBvcHRpb25zLmZpbGxQYXR0ZXJuLnVybDtcbiAgICAgICAgdmFyIHBhdHRlcm5JZCA9IG9wdGlvbnMuZmlsbFBhdHRlcm4uaWQgKyB0aGlzLl90aWxlQ29vcmQueiArIHRoaXMuX3RpbGVDb29yZC54ICsgdGhpcy5fdGlsZUNvb3JkLnk7XG4gICAgICAgIHZhciBwYXR0ZXJuRWwgOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXR0ZXJuSWQpO1xuICAgICAgICBpZiAoIXBhdHRlcm5FbCkge1xuXG4gICAgICAgICAgICB2YXIgaW1nT2JqID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWdPYmouc3JjID0gaW1nVXJsO1xuXG4gICAgICAgICAgICBwYXR0ZXJuRWwgPSBTVkcuY3JlYXRlKCdwYXR0ZXJuJyk7XG4gICAgICAgICAgICBwYXR0ZXJuRWwuc2V0QXR0cmlidXRlKCdpZCcsIHBhdHRlcm5JZCk7XG4gICAgICAgICAgICBwYXR0ZXJuRWwuc2V0QXR0cmlidXRlKCd4Jywgb3B0aW9ucy5maWxsUGF0dGVybi54KTtcbiAgICAgICAgICAgIHBhdHRlcm5FbC5zZXRBdHRyaWJ1dGUoJ3knLCBvcHRpb25zLmZpbGxQYXR0ZXJuLnkpO1xuICAgICAgICAgICAgcGF0dGVybkVsLnNldEF0dHJpYnV0ZSgncGF0dGVyblVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJyk7XG4gICAgICAgICAgICBwYXR0ZXJuRWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG9wdGlvbnMuZmlsbFBhdHRlcm4ud2lkdGgpO1xuICAgICAgICAgICAgcGF0dGVybkVsLnNldEF0dHJpYnV0ZSgnaGVpZ2h0Jywgb3B0aW9ucy5maWxsUGF0dGVybi5oZWlnaHQpO1xuXG4gICAgICAgICAgICB0aGlzLl9kZWZzLmFwcGVuZENoaWxkKHBhdHRlcm5FbCk7XG5cbiAgICAgICAgICAgIHZhciBpbWdFbCA9IFNWRy5jcmVhdGUoJ2ltYWdlJyk7XG4gICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ3gnLCAnMCcpO1xuICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKCd5JywgJzAnKTtcbiAgICAgICAgICAgIGltZ0VsLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ2hyZWYnLCBpbWdVcmwpO1xuICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsIG9wdGlvbnMuZmlsbFBhdHRlcm4ud2lkdGgpO1xuICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBvcHRpb25zLmZpbGxQYXR0ZXJuLmhlaWdodCk7XG4gICAgICAgICAgICBsZXQgdHggPSBvcHRpb25zLmZpbGxQYXR0ZXJuLnggPiAwID8gKCctJytvcHRpb25zLmZpbGxQYXR0ZXJuLngpIDogMDtcbiAgICAgICAgICAgIGxldCB0eSA9IG9wdGlvbnMuZmlsbFBhdHRlcm4ueSA+IDAgPyAoJy0nK29wdGlvbnMuZmlsbFBhdHRlcm4ueSkgOiAwO1xuICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgdHggKyBcIiBcIiArIHR5ICsgXCIpXCIpXG4gICAgICAgICAgICBwYXR0ZXJuRWwuYXBwZW5kQ2hpbGQoaW1nRWwpO1xuXG4gICAgICAgICAgICBpbWdPYmoub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGltZ09iai53aWR0aCsnJyk7XG4gICAgICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbWdPYmouaGVpZ2h0KycnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIFwidXJsKCNcIitwYXR0ZXJuSWQrXCIpXCIpO1xuICAgIH1cbn0pO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmV4cG9ydCB7XG4gICAgbWFwQm94VmVjdG9yVGlsZUxheWVyIGFzIGRlZmF1bHQsXG4gICAgbWFwQm94VmVjdG9yVGlsZUxheWVyLFxuICAgIGFwcGx5VmVjdG9yVGlsZVN0eWxlXG59O1xuIl19