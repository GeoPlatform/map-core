/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as L from 'leaflet';
import { SVG } from "leaflet";
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
    augmentSVGTile();
    /** @type {?} */
    let opts = {
        rendererFactory: ((/** @type {?} */ (L.svg))).tile //( L.canvas as any ).tile
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
    let request = client.createRequestOpts({ method: "GET", url: url, timeout: 5000, json: true });
    return client.execute(request).then((/**
     * @param {?} styleDef
     * @return {?}
     */
    (styleDef) => {
        if (styleDef.sprite) {
            /** @type {?} */
            let spriteUrl = resolveRelativeUrl(url + '/', styleDef.sprite);
            return fetchSpriteInfo(spriteUrl + '.json', client)
                .then((/**
             * @param {?} spriteDef
             * @return {?}
             */
            (spriteDef) => {
                styleDef.spriteJSON = spriteDef;
                styleDef.spriteURL = spriteUrl + '.png';
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
    let request = client.createRequestOpts({ method: "GET", url: spriteUrl, timeout: 5000, json: true });
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
    const Tile = ((/** @type {?} */ (SVG))).Tile;
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
                let options = layer.options;
                /** @type {?} */
                let hasFillColor = !options.fillPattern && options.fillColor &&
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
            let tx = options.fillPattern.x > 0 ? ('-' + options.fillPattern.x) : 0;
            /** @type {?} */
            let ty = options.fillPattern.y > 0 ? ('-' + options.fillPattern.y) : 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWJ2dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibGF5ZXIvbWJ2dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLENBQUMsTUFBNkIsU0FBUyxDQUFDO0FBQ3BELE9BQU8sRUFBeUIsR0FBRyxFQUFFLE1BQVUsU0FBUyxDQUFDO0FBQ3pELE9BQU8sRUFDd0IsTUFBTSxFQUFFLGFBQWEsRUFDbkQsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDOztNQUdoRCxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxLQUFLLEVBQUUsdURBQXVEO0lBQzlELE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRSxTQUFTO0NBQ3JCOztNQUVLLHFCQUFxQixHQUFHO0lBQzFCLElBQUksRUFBRSxrQ0FBa0M7SUFDeEMsS0FBSyxFQUFFLCtEQUErRDtJQUN0RSxNQUFNLEVBQUUsY0FBYztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0NBQzdCOzs7OztBQUlELFNBQVMscUJBQXFCLENBQUUsS0FBd0I7O1FBRWhELElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTtJQUNyQixJQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNsRSxPQUFPLElBQUksQ0FBQyxDQUFFLGFBQWE7S0FDOUI7O1VBRUssT0FBTyxHQUFHLG1CQUFBLENBQUMsRUFBTztJQUV4Qix3RUFBd0U7SUFDeEUsSUFBSSxPQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLFdBQVc7UUFDMUMsT0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFO1FBQ3JELE9B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Q0FBQyxDQUFBO1lBQ25FLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFN0IsTUFBTSxDQUFDLE1BQU07OztZQUFHO2dCQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFBLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sR0FBQyxTQUFTLEdBQUMsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQyxDQUFBO0NBQ0osQ0FBQyxDQUFDO0FBZUgsT0FBTyxFQUNILHFCQUFxQixJQUFJLE9BQU8sRUFDaEMscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBMICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnbGVhZmxldCc7XG5pbXBvcnQgeyBMYXllciBhcyBMZWFmbGV0TGF5ZXIsIFNWRyB9ICAgICBmcm9tIFwibGVhZmxldFwiO1xuaW1wb3J0IHtcbiAgICBMYXllciBhcyBHZW9QbGF0Zm9ybUxheWVyLCBDb25maWcsIFhIUkh0dHBDbGllbnRcbn0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgcGFyc2VNYXBCb3hTdHlsZSBmcm9tIFwiLi4vc2hhcmVkL21hcGJveC1zdHlsZVwiO1xuXG5cbmNvbnN0IFNUWUxFX0NPTkNFUFQgPSB7XG4gICAgXCJpZFwiOiBcIjc4YWQzZWNjODgzZGU0NDRjOGEwNjg0MDg3YTYxNzUzXCIsXG4gICAgXCJ1cmlcIjogXCJodHRwOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdi9kZWYvT25saW5lRnVuY3Rpb24vc3R5bGluZ1wiLFxuICAgIFwidHlwZVwiOiBcInNrb3M6Q29uY2VwdFwiLFxuICAgIFwibGFiZWxcIjogXCJzdHlsaW5nXCJcbn07XG5cbmNvbnN0IERFRkFVTFRfU1RZTEVfQ09OQ0VQVCA9IHtcbiAgICBcImlkXCI6IFwiNTM5ODNjNDI5NzhjZDUxMGE1Zjg0NGVjMGEwYzZjMmJcIixcbiAgICBcInVyaVwiOiBcImh0dHA6Ly93d3cuZ2VvcGxhdGZvcm0uZ292L2RlZi9PbmxpbmVGdW5jdGlvbi9kZWZhdWx0X3N0eWxpbmdcIixcbiAgICBcInR5cGVcIjogXCJza29zOkNvbmNlcHRcIixcbiAgICBcImxhYmVsXCI6IFwiZGVmYXVsdCBzdHlsaW5nXCJcbn07XG5cblxuXG5mdW5jdGlvbiBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIoIGxheWVyIDogR2VvUGxhdGZvcm1MYXllciApIDogTGVhZmxldExheWVyIHtcblxuICAgIGxldCBocmVmID0gbGF5ZXIuaHJlZjtcbiAgICBpZighaHJlZiB8fCBocmVmLmluZGV4T2YoXCIucGJmXCIpIDwgMCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExheWVyIGRvZXMgbm90IGRlZmluZSBhbiBBY2Nlc3MgVVJMXCIpO1xuICAgICAgICByZXR1cm4gbnVsbDsgIC8vbWlzc2luZyBVUkxcbiAgICB9XG5cbiAgICBjb25zdCBMZWFmbGV0ID0gTCBhcyBhbnk7XG5cbiAgICAvL2lmIExlYWZsZXQgdmVjdG9yIGdyaWQgcGx1Z2luIGlzIG5vdCBpbnN0YWxsZWQsIGNhbid0IHJlbmRlciBWVCBMYXllcnNcbiAgICBpZiggdHlwZW9mKExlYWZsZXQudmVjdG9yR3JpZCkgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZihMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxheWVyRmFjdG9yeSAtIExlYWZsZXQgVmVjdG9yIFRpbGVzIHBsdWdpbiBub3QgZm91bmRcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGF1Z21lbnRTVkdUaWxlKCk7XG5cbiAgICBsZXQgb3B0cyA6IGFueSA9IHtcbiAgICAgICAgcmVuZGVyZXJGYWN0b3J5OiAoIEwuc3ZnIGFzIGFueSApLnRpbGUgLy8oIEwuY2FudmFzIGFzIGFueSApLnRpbGVcbiAgICAgICAgLy8gLFxuICAgICAgICAvLyBnZXRGZWF0dXJlSWQ6IGZ1bmN0aW9uKCBmZWF0dXJlIDogYW55ICkgeyByZXR1cm4gZmVhdHVyZS5wcm9wZXJ0aWVzLmlkOyB9XG4gICAgfTtcbiAgICBpZihDb25maWcubGVhZmxldFBhbmUpIG9wdHMucGFuZSA9IENvbmZpZy5sZWFmbGV0UGFuZTtcblxuICAgIGxldCByZXN1bHQgPSBMZWFmbGV0LnZlY3RvckdyaWQucHJvdG9idWYoaHJlZiwgb3B0cyk7XG5cbiAgICAvL0lmIHRoZSBsYXllciBvYmplY3QgZGVmaW5lcyBzdHlsZXMgdG8gdXNlLCByZXNvbHZlIHRoZW0gYW5kIGFwcGx5IHRoZSBzdHlsZShzKVxuICAgIGxldCBzdHlsZSA9IG51bGw7XG4gICAgbGV0IHN0eWxlcyA9IChsYXllci5yZWxhdGVkIHx8IFtdKS5maWx0ZXIoIHJlbCA9PiB7XG4gICAgICAgIGlmKCFyZWwucm9sZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihyZWwucm9sZS51cmkgPT09IERFRkFVTFRfU1RZTEVfQ09OQ0VQVC51cmkpIHtcbiAgICAgICAgICAgIHN0eWxlID0gcmVsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWwucm9sZS51cmkgPT09IFNUWUxFX0NPTkNFUFQudXJpO1xuICAgIH0pO1xuICAgIHN0eWxlID0gc3R5bGUgfHwgKHN0eWxlcy5sZW5ndGggPyBzdHlsZXNbMF0gOiBudWxsKTtcbiAgICBpZiggc3R5bGUgKSB7XG4gICAgICAgIGFwcGx5VmVjdG9yVGlsZVN0eWxlKCBsYXllciwgcmVzdWx0LCBzdHlsZSApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgR2VvUGxhdGZvcm0gTGF5ZXIgb2JqZWN0XG4gKiBAcGFyYW0gbGVhZmxldExheWVyIEdyaWRMYXllciBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIEdQIExheWVyIG9iamVjdCBzcGVjaWZpZWRcbiAqIEBwYXJhbSBzdHlsZVJlc291cmNlIEdQIEF1eGlsbGFyeSBSZXNvdXJjZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlWZWN0b3JUaWxlU3R5bGUoXG4gICAgbGF5ZXIgOiBHZW9QbGF0Zm9ybUxheWVyLFxuICAgIGxlYWZsZXRMYXllciA6IExlYWZsZXRMYXllcixcbiAgICBzdHlsZVJlc291cmNlIDogYW55XG4pIHtcblxuICAgIGlmKCFsZWFmbGV0TGF5ZXIuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIldhcm46IENvdWxkIG5vdCBhcHBseSBzdHlsZSB0byBsYXllcjsgbGF5ZXIgaXMgbm90IGEgVmVjdG9yR3JpZCBpbnN0YW5jZVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vZmV0Y2ggY2xvYiBkZWZpbml0aW9uIG9mIHN0eWxlIHRvIHVzZS4uLlxuICAgIGZldGNoU3R5bGVEZWZpbml0aW9uKCBsYXllci5pZCwgc3R5bGVSZXNvdXJjZSApXG4gICAgLnRoZW4oIChzdHlsZURlZiA6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbGF5ZXJJbnN0ID0gKGxlYWZsZXRMYXllciBhcyBhbnkpO1xuICAgICAgICBsZXQgc3R5bGUgPSBwYXJzZU1hcEJveFN0eWxlKCBzdHlsZURlZiApO1xuICAgICAgICBpZihzdHlsZSAmJiB0eXBlb2Yoc3R5bGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbGF5ZXJJbnN0Lm9wdGlvbnMudmVjdG9yVGlsZUxheWVyU3R5bGVzID0gc3R5bGU7XG4gICAgICAgICAgICBsYXllckluc3QucmVkcmF3KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltXQVJOXSBVbmFibGUgdG8gcGFyc2UgTWFwQm94LXN0eWxlIFN0eWxlIGRlZmluaXRpb25zIGZyb206IFwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHN0eWxlUmVzb3VyY2UsIG51bGwsICcgJykpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goIGUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VycmVkIGZldGNoaW5nIHRoZSBzdHlsZSBkZWZpbml0aW9uIGZvciBsYXllciAnXCIgK1xuICAgICAgICAgICAgbGF5ZXIubGFiZWwgKyBcIicuIFwiICsgZS5tZXNzYWdlICsgXCIuIFVzaW5nIGRlZmF1bHQgTGVhZmxldCBzdHlsZS5cIik7XG4gICAgfSk7XG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllcklkIHN0cmluZyBpZGVudGlmaWVyIG9mIEdlb1BsYXRmb3JtIExheWVyIG9iamVjdFxuICogQHBhcmFtIHJlc291cmNlIC0gYXV4aWxsYXJ5IHJlc291cmNlIHJlZmVyZW5jaW5nIHN0eWxlIGRlZmluaXRpb24gdG8gZmV0Y2hcbiAqIEByZXR1cm4gUHJvbWlzZSByZXNvbHZpbmcgc3R5bGUgZGVmaW5pdGlvblxuICovXG5mdW5jdGlvbiBmZXRjaFN0eWxlRGVmaW5pdGlvbiggbGF5ZXJJZCA6IHN0cmluZywgcmVzb3VyY2UgOiBhbnkgKSA6IFByb21pc2U8YW55PiB7XG4gICAgaWYoIWxheWVySWQgfHwgIXJlc291cmNlKSB7XG4gICAgICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmV0Y2ggc3R5bGUgZGVmaW5pdGlvbiwgb25lIG9yIG1vcmUgcGFyYW1ldGVycyB3ZXJlIGludmFsaWRcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGlmKCFyZXNvdXJjZS5jb250ZW50SWQgJiYgIXJlc291cmNlLmhyZWYpIHtcbiAgICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcihcIlVuYWJsZSB0byBmZXRjaCBzdHlsZSBkZWZpbml0aW9uLCBtaXNzaW5nIGlkIG9yIHVybCB0byBzdHlsZVwiKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IG51bGw7XG4gICAgaWYocmVzb3VyY2UuY29udGVudElkKSB7XG4gICAgICAgIHVybCA9IENvbmZpZy51YWxVcmwgKyAnL2FwaS9sYXllcnMvJyArIGxheWVySWQgKyAnL3N0eWxlcy8nICsgcmVzb3VyY2UuY29udGVudElkO1xuICAgIH0gZWxzZSBpZihyZXNvdXJjZS5ocmVmKSB7XG4gICAgICAgIHVybCA9IHJlc291cmNlLmhyZWY7XG4gICAgfVxuXG4gICAgbGV0IGNsaWVudCA9IG5ldyBYSFJIdHRwQ2xpZW50KCk7XG4gICAgbGV0IHJlcXVlc3QgPSBjbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMoeyBtZXRob2Q6IFwiR0VUXCIsIHVybDogdXJsLCB0aW1lb3V0OiA1MDAwLCBqc29uOiB0cnVlIH0pO1xuICAgIHJldHVybiBjbGllbnQuZXhlY3V0ZShyZXF1ZXN0KS50aGVuKCAoc3R5bGVEZWYgOiBhbnkpID0+IHtcbiAgICAgICAgaWYoc3R5bGVEZWYuc3ByaXRlKSB7XG4gICAgICAgICAgICBsZXQgc3ByaXRlVXJsID0gcmVzb2x2ZVJlbGF0aXZlVXJsKHVybCArICcvJywgc3R5bGVEZWYuc3ByaXRlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZldGNoU3ByaXRlSW5mbyhzcHJpdGVVcmwgKyAnLmpzb24nLCBjbGllbnQpXG4gICAgICAgICAgICAudGhlbiggKHNwcml0ZURlZiA6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHN0eWxlRGVmLnNwcml0ZUpTT04gPSBzcHJpdGVEZWY7XG4gICAgICAgICAgICAgICAgc3R5bGVEZWYuc3ByaXRlVVJMID0gc3ByaXRlVXJsICsgJy5wbmcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZURlZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHlsZURlZjtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBsb2FkIHNwcml0ZSBKU09OIGFuZCBlbWJlZCBpbmxpbmUuLi5cbiAqL1xuZnVuY3Rpb24gZmV0Y2hTcHJpdGVJbmZvKHNwcml0ZVVybCwgY2xpZW50KSA6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IHJlcXVlc3QgPSBjbGllbnQuY3JlYXRlUmVxdWVzdE9wdHMoe21ldGhvZDogXCJHRVRcIiwgdXJsOiBzcHJpdGVVcmwsIHRpbWVvdXQ6IDUwMDAsIGpzb246IHRydWV9KTtcbiAgICByZXR1cm4gY2xpZW50LmV4ZWN1dGUocmVxdWVzdCk7XG59XG5cbi8qKlxuICpcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVJlbGF0aXZlVXJsKGJhc2VVcmwsIHVybCkge1xuICAgIGlmKCF1cmwpIHJldHVybiBiYXNlVXJsO1xuICAgIHJldHVybiBuZXcgVVJMKHVybCwgYmFzZVVybCkuaHJlZjsgIC8vd29uJ3Qgd29yayBpbiBJRTExIGJ1dCBmaW5lIGVsc2V3aGVyZVxufVxuXG5cblxuXG5mdW5jdGlvbiBhdWdtZW50U1ZHVGlsZSgpIHtcbiAgICBjb25zdCBUaWxlID0gKFNWRyBhcyBhbnkpLlRpbGU7XG4gICAgaWYoVGlsZSAmJiAhVGlsZS5fYXVnbWVudGVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXVnbWVudGluZyBUaWxlIExheWVyXCIpO1xuICAgICAgICBUaWxlLmluY2x1ZGUoe1xuXG4gICAgICAgICAgICBfYXVnbWVudGVkIDogdHJ1ZSxcblxuICAgICAgICBcdF9hZGRQYXRoOiBmdW5jdGlvbiAobGF5ZXIpIHtcblxuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0gbGF5ZXIub3B0aW9ucztcbiAgICAgICAgICAgICAgICBsZXQgaGFzRmlsbENvbG9yID0gIW9wdGlvbnMuZmlsbFBhdHRlcm4gJiYgb3B0aW9ucy5maWxsQ29sb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5maWxsQ29sb3IgIT09ICd0cmFuc3BhcmVudCc7XG5cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5fcm9vdEdyb3VwLmZpcnN0Q2hpbGQgJiYgaGFzRmlsbENvbG9yICkge1xuICAgICAgICAgICAgICAgICAgICAvL21vdmUgYSBub24tZmlsbCBwYXR0ZXJuIHBhdGggdG8gdGhlIGZyb250IG9mIGl0cyBzaWJsaW5ncyBzbyBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBpcyByZW5kZXJlZCBCRUZPUkUgYW55IGZpbGwgcGF0dGVybnMgYXJlLiAgU1ZHIGRvZXMgbm90IHN1cHBvcnRcbiAgICAgICAgICAgICAgICAgICAgLy8gei1pbmRleCB3aXRoaW4gaXQncyBlbGVtZW50cyBhbmQgb3JkZXJpbmcgaXMgZnJvbnQgdG8gYmFjayAoYm90dG9tIHRvIHRvcCkuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RHcm91cC5pbnNlcnRCZWZvcmUobGF5ZXIuX3BhdGgsIHRoaXMuX3Jvb3RHcm91cC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb290R3JvdXAuYXBwZW5kQ2hpbGQobGF5ZXIuX3BhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXHRcdHRoaXMuX2xheWVyc1sgKEwgYXMgYW55KS5zdGFtcChsYXllcikgXSA9IGxheWVyO1xuICAgICAgICBcdH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuXG5cblxuXG5TVkcuaW5jbHVkZSh7XG5cbiAgICBfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICB2YXIgcGF0aCA9IGxheWVyLl9wYXRoLCBvcHRpb25zID0gbGF5ZXIub3B0aW9ucztcblxuICAgICAgICBpZiAoIXBhdGgpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc3Ryb2tlKSB7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgICAgICAgICBvcHRpb25zLmNvbG9yKTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2Utb3BhY2l0eScsIG9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgICBvcHRpb25zLndlaWdodCk7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWxpbmVjYXAnLCBvcHRpb25zLmxpbmVDYXApO1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lam9pbicsb3B0aW9ucy5saW5lSm9pbik7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmRhc2hBcnJheSkge1xuICAgICAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5Jywgb3B0aW9ucy5kYXNoQXJyYXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXRoLnJlbW92ZUF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5kYXNoT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNob2Zmc2V0Jywgb3B0aW9ucy5kYXNoT2Zmc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aC5yZW1vdmVBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNob2Zmc2V0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgJ25vbmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRpb25zLmZpbGxQYXR0ZXJuIHx8IChvcHRpb25zLmZpbGxDb2xvciAmJiBvcHRpb25zLmZpbGxDb2xvciAhPT0gJ3RyYW5zcGFyZW50JykpIHtcbiAgICAgICAgICAgIGlmICggb3B0aW9ucy5maWxsUGF0dGVybiAmJiB0eXBlb2Yob3B0aW9ucy5maWxsUGF0dGVybikgPT09IFwib2JqZWN0XCIgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2ZpbGxQYXR0ZXJuKGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwnLCBvcHRpb25zLmZpbGxDb2xvciB8fCBvcHRpb25zLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsLW9wYWNpdHknLCBvcHRpb25zLmZpbGxPcGFjaXR5KTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsLXJ1bGUnLCBvcHRpb25zLmZpbGxSdWxlIHx8ICdldmVub2RkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsICdub25lJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX19maWxsUGF0dGVybjogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgdmFyIHBhdGggPSBsYXllci5fcGF0aCwgb3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9kZWZzKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZzID0gU1ZHLmNyZWF0ZSgnZGVmcycpO1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX2RlZnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGltZ1VybCA9IG9wdGlvbnMuZmlsbFBhdHRlcm4udXJsO1xuICAgICAgICB2YXIgcGF0dGVybklkID0gb3B0aW9ucy5maWxsUGF0dGVybi5pZCArIHRoaXMuX3RpbGVDb29yZC56ICsgdGhpcy5fdGlsZUNvb3JkLnggKyB0aGlzLl90aWxlQ29vcmQueTtcbiAgICAgICAgdmFyIHBhdHRlcm5FbCA6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhdHRlcm5JZCk7XG4gICAgICAgIGlmICghcGF0dGVybkVsKSB7XG5cbiAgICAgICAgICAgIHZhciBpbWdPYmogPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZ09iai5zcmMgPSBpbWdVcmw7XG5cbiAgICAgICAgICAgIHBhdHRlcm5FbCA9IFNWRy5jcmVhdGUoJ3BhdHRlcm4nKTtcbiAgICAgICAgICAgIHBhdHRlcm5FbC5zZXRBdHRyaWJ1dGUoJ2lkJywgcGF0dGVybklkKTtcbiAgICAgICAgICAgIHBhdHRlcm5FbC5zZXRBdHRyaWJ1dGUoJ3gnLCBvcHRpb25zLmZpbGxQYXR0ZXJuLngpO1xuICAgICAgICAgICAgcGF0dGVybkVsLnNldEF0dHJpYnV0ZSgneScsIG9wdGlvbnMuZmlsbFBhdHRlcm4ueSk7XG4gICAgICAgICAgICBwYXR0ZXJuRWwuc2V0QXR0cmlidXRlKCdwYXR0ZXJuVW5pdHMnLCAndXNlclNwYWNlT25Vc2UnKTtcbiAgICAgICAgICAgIHBhdHRlcm5FbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgb3B0aW9ucy5maWxsUGF0dGVybi53aWR0aCk7XG4gICAgICAgICAgICBwYXR0ZXJuRWwuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBvcHRpb25zLmZpbGxQYXR0ZXJuLmhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RlZnMuYXBwZW5kQ2hpbGQocGF0dGVybkVsKTtcblxuICAgICAgICAgICAgdmFyIGltZ0VsID0gU1ZHLmNyZWF0ZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGltZ0VsLnNldEF0dHJpYnV0ZSgneCcsICcwJyk7XG4gICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ3knLCAnMCcpO1xuICAgICAgICAgICAgaW1nRWwuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCAnaHJlZicsIGltZ1VybCk7XG4gICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgb3B0aW9ucy5maWxsUGF0dGVybi53aWR0aCk7XG4gICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG9wdGlvbnMuZmlsbFBhdHRlcm4uaGVpZ2h0KTtcbiAgICAgICAgICAgIGxldCB0eCA9IG9wdGlvbnMuZmlsbFBhdHRlcm4ueCA+IDAgPyAoJy0nK29wdGlvbnMuZmlsbFBhdHRlcm4ueCkgOiAwO1xuICAgICAgICAgICAgbGV0IHR5ID0gb3B0aW9ucy5maWxsUGF0dGVybi55ID4gMCA/ICgnLScrb3B0aW9ucy5maWxsUGF0dGVybi55KSA6IDA7XG4gICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB0eCArIFwiIFwiICsgdHkgKyBcIilcIilcbiAgICAgICAgICAgIHBhdHRlcm5FbC5hcHBlbmRDaGlsZChpbWdFbCk7XG5cbiAgICAgICAgICAgIGltZ09iai5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nT2JqLndpZHRoKycnKTtcbiAgICAgICAgICAgICAgICBpbWdFbC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZ09iai5oZWlnaHQrJycpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgXCJ1cmwoI1wiK3BhdHRlcm5JZCtcIilcIik7XG4gICAgfVxufSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuZXhwb3J0IHtcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIgYXMgZGVmYXVsdCxcbiAgICBtYXBCb3hWZWN0b3JUaWxlTGF5ZXIsXG4gICAgYXBwbHlWZWN0b3JUaWxlU3R5bGVcbn07XG4iXX0=