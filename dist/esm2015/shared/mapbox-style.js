/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LeafletStyle() { }
if (false) {
    /** @type {?|undefined} */
    LeafletStyle.prototype.weight;
    /** @type {?|undefined} */
    LeafletStyle.prototype.opacity;
    /** @type {?|undefined} */
    LeafletStyle.prototype.color;
    /** @type {?|undefined} */
    LeafletStyle.prototype.dashArray;
    /** @type {?|undefined} */
    LeafletStyle.prototype.fillOpacity;
    /** @type {?|undefined} */
    LeafletStyle.prototype.fillColor;
}
/**
 * @record
 */
function LeafletStyleMap() { }
/**
 * @record
 */
function MapBoxStyle() { }
if (false) {
    /** @type {?} */
    MapBoxStyle.prototype.version;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.name;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.metadata;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.center;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.zoom;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.bearing;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.pitch;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.light;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.sources;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.sprite;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.glyphs;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.transition;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.layers;
}
/**
 * @record
 */
function MapBoxStyleLayer() { }
if (false) {
    /** @type {?} */
    MapBoxStyleLayer.prototype.id;
    /** @type {?} */
    MapBoxStyleLayer.prototype.type;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.metadata;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.source;
    /* Skipping unnamed member:
    'source-layer' ?: string;*/
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.minzoom;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.maxzoom;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.filter;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.layout;
    /** @type {?|undefined} */
    MapBoxStyleLayer.prototype.paint;
}
/**
 * @record
 */
function MapBoxPaint() { }
if (false) {
    /** @type {?|undefined} */
    MapBoxPaint.prototype.visibility;
    /* Skipping unnamed member:
    'background-color'   ?: string;*/
    /* Skipping unnamed member:
    'background-pattern' ?: string;*/
    /* Skipping unnamed member:
    'background-opacity' ?: number;*/
    /* Skipping unnamed member:
    'fill-antialias'     ?: boolean;*/
    /* Skipping unnamed member:
    'fill-opacity'       ?: number|any[];*/
    /* Skipping unnamed member:
    'fill-color'         ?: string|any[];*/
    /* Skipping unnamed member:
    'fill-outline-color' ?: string|any[];*/
    /* Skipping unnamed member:
    'fill-translate'     ?: number[];*/
    /* Skipping unnamed member:
    'fill-translate-anchor' : "map" | "viewport";*/
    /* Skipping unnamed member:
    'fill-pattern'       ?: string;*/
    /* Skipping unnamed member:
    'line-cap'           ?: "butt" | "round" | "square";*/
    /* Skipping unnamed member:
    'line-join'          ?:  "bevel" | "round" | "miter"*/
    /* Skipping unnamed member:
    'line-miter-limit'   ?: number;*/
    /* Skipping unnamed member:
    'line-round-limit'   ?: number;*/
    /* Skipping unnamed member:
    'line-opacity'       ?: number|any[];*/
    /* Skipping unnamed member:
    'line-color'         ?: string|any[];*/
    /* Skipping unnamed member:
    'line-translate'     ?: number[];*/
    /* Skipping unnamed member:
    'line-translate-anchor' ?: "map" | "viewport";*/
    /* Skipping unnamed member:
    'line-width'         ?: number|any[];*/
    /* Skipping unnamed member:
    'line-gap-width'     ?: number;*/
    /* Skipping unnamed member:
    'line-offset'        ?: number;*/
    /* Skipping unnamed member:
    'line-blur'          ?: number;*/
    /* Skipping unnamed member:
    'line-dasharray'     ?: number[];*/
    /* Skipping unnamed member:
    'line-pattern'       ?: string;*/
    /* Skipping unnamed member:
    'line-gradient'      ?: string;*/
}
/**
 * Class representing an evaluatable expression associated with a layer style,
 * following MapBox Style Spec format.
 * Expressions are arrays of:
 *   - operator key ('get', '==', 'has', etc)
 *   - any number of parameters including nested expressions
 *
 *  Examples:
 *
 *  [ 'has', 'propertyName' ]   // simple expression checking for existance of a specific feature property
 *
 *  [
 *    '=='                      // type of expression (equality comparison)
 *    [ 'get', 'propertyA' ],   // nested expression to extract feature's property value
 *    'expectedValue'           // value to compare against
 *  ]
 *
 *  [
 *    'match',                   // type of expression ('switch' statement)
 *    [ 'get', 'propertyName' ], // first param is another expression to extract a feature's property value
 *    'A', 'valueForA',          // next two params are first 'case' of "switch"
 *    'B', 'valueForB',          // second 'case' for 'switch'
 *    'fallbackValue'            // default 'case' for 'switch'
 *  ]
 *
 */
class Expression {
    /**
     * @param {?} filter
     */
    constructor(filter) {
        /** @type {?} */
        let arr = filter.slice(0);
        this.operator = arr[0];
        this.args = arr.splice(1).map((/**
         * @param {?} arg
         * @return {?}
         */
        arg => {
            return Array.isArray(arg) ? new Expression(arg) : arg;
        }));
    }
    /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value result of the expression
     */
    evaluate(properties, zoom, geometryType) {
        /** @type {?} */
        let p1;
        /** @type {?} */
        let p2;
        switch (this.operator) {
            case 'get':
                return this.getArg(0, properties, zoom, geometryType);
            case 'has':
                return this.getArg(0, properties, zoom, geometryType);
            case '!has':
                p1 = this.getArg(0, properties, zoom, geometryType);
                return !(typeof (p1) !== 'undefined' && p1 in properties);
            case '==':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                // console.log(`Comparing ${p1} == ${p2}`);
                return p1 == p2;
            case '!=':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                // console.log(`Comparing ${p1} != ${p2}`);
                return p1 != p2;
            case '>':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return p1 > p2;
            case '<':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return p1 < p2;
            case '>=':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return p1 >= p2;
            case '<=':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return p1 <= p2;
            case 'array':
                p1 = this.getArg(0, properties, zoom, geometryType);
                return Array.isArray(p1);
            case 'at':
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return typeof (p1) === 'number' && Array.isArray(p2) &&
                    p2.length >= p1 ? p2[p1] : null;
            case 'zoom': return zoom;
            case 'id': return properties.id;
            case 'geometry-type': return geometryType;
            case 'match': //works like a switch statement
                return this.findMatch(properties, zoom, geometryType);
        }
        return null;
    }
    /**
     * @param {?} index
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value of the argument (which may be result of an expression)
     */
    getArg(index, properties, zoom, geometryType) {
        /** @type {?} */
        let value = this.args[index];
        if (value && typeof (value.evaluate) !== 'undefined') {
            //arg is a nested expression...
            return value.evaluate(properties, zoom, geometryType);
        }
        else if (value && typeof (value) === 'string' && properties.hasOwnProperty(value)) {
            //arg is a property name instead of a nested expression...
            return properties[value];
        }
        return value;
    }
    /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value associated with matching condition of expression, or fallback value
     */
    findMatch(properties, zoom, geometryType) {
        /** @type {?} */
        let result = null;
        /** @type {?} */
        let end = this.args.length - 1;
        //the input value to test against
        //  ... should be value of Input portion (ie, "Lake" for wetlands)
        /** @type {?} */
        let value = this.getArg(0, properties, zoom, geometryType);
        // console.log("Expression.match - " + JSON.stringify(value) );
        //find value inside remaining args to assign style associated with that value
        this.args.forEach((/**
         * @param {?} arg
         * @param {?} i
         * @return {?}
         */
        (arg, i) => {
            // ignore first arg (see above) and last arg (it's the fallback value)
            // also skip if we've already found a match
            if (result !== null || i === 0 || i === end)
                return;
            if (Array.isArray(arg)) { //array of literal values
                if (~arg.indexOf(value)) {
                    result = this.args[i + 1]; //match, return next value in array
                }
            }
            else if (arg == value) { //literal value
                result = this.args[i + 1]; //match, return next value in array
            }
        }));
        if (!result)
            result = this.args[end]; //last arg is always fallback value
        // console.log("Match returned: " + result);
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        return [this.operator].concat(this.args.map((/**
         * @param {?} arg
         * @return {?}
         */
        arg => {
            return (typeof (arg.evaluate) !== 'undefined') ? arg.toString() : arg;
        }))).join(',');
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    Expression.prototype.operator;
    /**
     * @type {?}
     * @private
     */
    Expression.prototype.args;
}
/**
 * @param {?} style MapBox Style definition
 * @return {?} object associating Leaflet styles with layer ids
 */
export default function parseMapBoxStyle(style) {
    //TODO validate style.version to make sure we are parsing something we understand
    // console.log("Parsing MapBox Style");
    // console.log(JSON.stringify(style, null, ' '));
    // console.log("--------------------");
    if (!style.layers || !Array.isArray(style.layers) || !style.layers.length) {
        console.log("Style has no layer definitions");
        return {}; //empty styles
    }
    //have to group layers with same id but with different filters under the same style function
    /** @type {?} */
    let layers = {};
    style.layers.forEach((/**
     * @param {?} layer
     * @return {?}
     */
    layer => {
        //use source-layer key first, fallback to layer id
        /** @type {?} */
        let id = (layer['source-layer'] || layer.id).trim();
        if (layers[id])
            layers[id].push(layer); //layer already exists
        else
            layers[id] = [layer]; //new layer's style
    }));
    // console.log(JSON.stringify(layers, null, ' '));
    /** @type {?} */
    let result = {};
    Object.keys(layers).forEach((/**
     * @param {?} id
     * @return {?}
     */
    id => {
        /** @type {?} */
        let styles = layers[id];
        result[id] = doThis(styles);
    }));
    // style.layers.forEach( layer => {
    //     result[ layer.id ] = styleFunctionFactory(layer); //new LayerStyle( layer ).getStyleFunction()
    // });
    return result;
}
/**
 * @param {?} layerStyles
 * @return {?}
 */
function doThis(layerStyles) {
    /** @type {?} */
    let styles = layerStyles.map((/**
     * @param {?} layerStyle
     * @return {?}
     */
    layerStyle => styleFunctionFactory(layerStyle)));
    return (/**
     * @param {?} properties
     * @param {?} zoom
     * @param {?} geomType
     * @return {?}
     */
    function (properties, zoom, geomType) {
        /** @type {?} */
        let match = styles.find((/**
         * @param {?} style
         * @return {?}
         */
        style => {
            if (style.filter && typeof (style.filter.evaluate) !== 'undefined') {
                // console.log("Style has a filter... " + style.filter.toString());
                /** @type {?} */
                let found = style.filter.evaluate(properties, zoom, geomType);
                // if(!found) console.log("Filter does not match");
                // else console.log("Filter matches");
                return found;
            }
            return true;
        }));
        /** @type {?} */
        let result = {};
        if (match) {
            Object.keys(match.style).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                /** @type {?} */
                let styleVal = match.style[key];
                if (styleVal && typeof (styleVal.evaluate) !== 'undefined')
                    result[key] = styleVal.evaluate(properties, zoom, geomType);
                else
                    result[key] = styleVal;
            }));
        }
        else {
            console.log("Warning, no style found");
        }
        return result;
    });
}
const ɵ0 = /**
 * @param {?} layerStyle
 * @return {?}
 */
function (layerStyle) {
    /**
     *
     * @type {?}
     */
    let parseValue = (/**
     * @param {?} value
     * @param {?=} fallback
     * @return {?}
     */
    function (value, fallback) {
        if (value && Array.isArray(value) && value.length) {
            return new Expression(value);
        }
        else if (value !== null && typeof (value) !== 'undefined')
            return value;
        else
            return fallback || null;
    });
    /** @type {?} */
    let filter = parseValue(layerStyle.filter);
    /** @type {?} */
    let layerPaint = layerStyle.paint;
    /** @type {?} */
    let lineWidth = parseValue(layerPaint['line-width'], 1);
    /** @type {?} */
    let opacity = parseValue(layerPaint['line-opacity'], 1.0);
    /** @type {?} */
    let color = parseValue(layerPaint['line-color'] || layerPaint['fill-outline-color'] || layerPaint['fill-color'], '#000');
    /** @type {?} */
    let fillOpacity = parseValue(layerPaint['fill-opacity'] || layerPaint['background-opacity'], 1.0);
    /** @type {?} */
    let fillColor = parseValue(layerPaint['fill-color'] || layerPaint['background-color'], '#000');
    /** @type {?} */
    let style = {
        color: color,
        //stroke color
        opacity: opacity,
        //stroke opacity
        weight: lineWidth,
        //stroke size
        fillOpacity: fillOpacity,
        //fill opacity
        fillColor: fillColor //fill color
    };
    return {
        filter: filter,
        style: style
    };
    // return function( properties : any, zoom: number, geomType : string ) {
    //     let result = {};
    //
    //     if(filter && typeof(filter.evaluate)) {
    //         console.log("Style has a filter... " + filter.toString());
    //         if(!filter.evaluate(properties, zoom, geomType)) {
    //             console.log("Filter does not match");
    //             return false;
    //         }
    //         console.log("Filter matches");
    //     }
    //
    //     Object.keys(style).forEach( key => {
    //         let styleVal = style[key];
    //         if( styleVal && typeof(styleVal.evaluate) !== 'undefined')
    //             result[key] = styleVal.evaluate(properties, zoom, geomType);
    //         else result[key] = styleVal;
    //     });
    //     return result;
    // };
};
/**
 * \@param layer MapBox Style Spec Layer definition
 * \@return Function accepting feature properties, zoom level, and geometry type and returning a Leaflet style object
 * @type {?}
 */
var styleFunctionFactory = ((ɵ0));
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyQkFPQzs7O0lBTkcsOEJBQXNCOztJQUN0QiwrQkFBc0I7O0lBQ3RCLDZCQUFzQjs7SUFDdEIsaUNBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLGlDQUFzQjs7Ozs7QUFHMUIsOEJBRUM7Ozs7QUFFRCwwQkFjQzs7O0lBYkcsOEJBQXNCOztJQUN0QiwyQkFBc0I7O0lBQ3RCLCtCQUFtQjs7SUFDbkIsNkJBQXdCOztJQUN4QiwyQkFBc0I7O0lBQ3RCLDhCQUFzQjs7SUFDdEIsNEJBQXNCOztJQUN0Qiw0QkFBbUI7O0lBQ25CLDhCQUFxQjs7SUFDckIsNkJBQXNCOztJQUN0Qiw2QkFBc0I7O0lBQ3RCLGlDQUFtQjs7SUFDbkIsNkJBQWtDOzs7OztBQUd0QywrQkFXQzs7O0lBVkcsOEJBQXlCOztJQUN6QixnQ0FBK0g7O0lBQy9ILG9DQUFzQjs7SUFDdEIsa0NBQXlCOzs7O0lBRXpCLG1DQUF5Qjs7SUFDekIsbUNBQXlCOztJQUN6QixrQ0FBc0I7O0lBQ3RCLGtDQUFzQjs7SUFDdEIsaUNBQThCOzs7OztBQUdsQywwQkE0QkM7OztJQTNCRyxpQ0FBMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEL0MsTUFBTSxVQUFVOzs7O0lBS1osWUFBYSxNQUFjOztZQUNuQixHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFD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QztJQUVGLHlFQUF5RTtJQUN6RSx1QkFBdUI7SUFDdkIsRUFBRTtJQUNGLDhDQUE4QztJQUM5QyxxRUFBcUU7SUFDckUsNkRBQTZEO0lBQzdELG9EQUFvRDtJQUNwRCw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLHlDQUF5QztJQUN6QyxRQUFRO0lBQ1IsRUFBRTtJQUNGLDJDQUEyQztJQUMzQyxxQ0FBcUM7SUFDckMscUVBQXFFO0lBQ3JFLDJFQUEyRTtJQUMzRSx1Q0FBdUM7SUFDdkMsVUFBVTtJQUNWLHFCQUFxQjtJQUNyQixLQUFLO0FBQ1QsQ0FBQzs7Ozs7O0lBeERHLG9CQUFvQixHQUFHLE1Bd0R6QiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZSB7XG4gICAgd2VpZ2h0ICAgICAgPzogbnVtYmVyO1xuICAgIG9wYWNpdHkgICAgID86IG51bWJlcjtcbiAgICBjb2xvciAgICAgICA/OiBzdHJpbmc7XG4gICAgZGFzaEFycmF5ICAgPzogbnVtYmVyW107XG4gICAgZmlsbE9wYWNpdHkgPzogbnVtYmVyO1xuICAgIGZpbGxDb2xvciAgID86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZU1hcCB7XG4gICAgW2tleTpzdHJpbmddOiBGdW5jdGlvbiB8IExlYWZsZXRTdHlsZVxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGUge1xuICAgIHZlcnNpb24gICAgICA6IG51bWJlcjsgIC8vU3R5bGUgc3BlY2lmaWNhdGlvbiB2ZXJzaW9uIG51bWJlci4gTXVzdCBiZSA4LlxuICAgIG5hbWUgICAgICAgID86IHN0cmluZzsgIC8vQSBodW1hbi1yZWFkYWJsZSBuYW1lIGZvciB0aGUgc3R5bGUuXG4gICAgbWV0YWRhdGEgICAgPzogYW55OyAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgc3R5bGVzaGVldCwgYnV0IGRvIG5vdCBpbmZsdWVuY2UgcmVuZGVyaW5nLiBQcm9wZXJ0aWVzIHNob3VsZCBiZSBwcmVmaXhlZCB0byBhdm9pZCBjb2xsaXNpb25zLCBsaWtlICdtYXBib3g6Jy5cbiAgICBjZW50ZXIgICAgICA/OiBudW1iZXJbXTsgLy9EZWZhdWx0IG1hcCBjZW50ZXIgaW4gbG9uZ2l0dWRlIGFuZCBsYXRpdHVkZS4gVGhlIHN0eWxlIGNlbnRlciB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIHpvb20gICAgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCB6b29tIGxldmVsLiBUaGUgc3R5bGUgem9vbSB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIGJlYXJpbmcgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCBiZWFyaW5nLCBpbiBkZWdyZWVzLiBUaGUgYmVhcmluZyBpcyB0aGUgY29tcGFzcyBkaXJlY3Rpb24gdGhhdCBpcyBcInVwXCI7IGZvciBleGFtcGxlLCBhIGJlYXJpbmcgb2YgOTDCsCBvcmllbnRzIHRoZSBtYXAgc28gdGhhdCBlYXN0IGlzIHVwLiBUaGlzIHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgcGl0Y2ggICAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IHBpdGNoLCBpbiBkZWdyZWVzLiBaZXJvIGlzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIHN1cmZhY2UsIGZvciBhIGxvb2sgc3RyYWlnaHQgZG93biBhdCB0aGUgbWFwLCB3aGlsZSBhIGdyZWF0ZXIgdmFsdWUgbGlrZSA2MCBsb29rcyBhaGVhZCB0b3dhcmRzIHRoZSBob3Jpem9uLiBUaGUgc3R5bGUgcGl0Y2ggd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBsaWdodCAgICAgICA/OiBhbnk7ICAgICAvL1RoZSBnbG9iYWwgbGlnaHQgc291cmNlLlxuICAgIHNvdXJjZXMgICAgID86IGFueVtdOyAgIC8vRGF0YSBzb3VyY2Ugc3BlY2lmaWNhdGlvbnMuXG4gICAgc3ByaXRlICAgICAgPzogc3RyaW5nOyAgLy9BIGJhc2UgVVJMIGZvciByZXRyaWV2aW5nIHRoZSBzcHJpdGUgaW1hZ2UgYW5kIG1ldGFkYXRhLiBUaGUgZXh0ZW5zaW9ucyAucG5nLCAuanNvbiBhbmQgc2NhbGUgZmFjdG9yIEAyeC5wbmcgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFwcGVuZGVkLiBUaGlzIHByb3BlcnR5IGlzIHJlcXVpcmVkIGlmIGFueSBsYXllciB1c2VzIHRoZSBiYWNrZ3JvdW5kLXBhdHRlcm4sIGZpbGwtcGF0dGVybiwgbGluZS1wYXR0ZXJuLCBmaWxsLWV4dHJ1c2lvbi1wYXR0ZXJuLCBvciBpY29uLWltYWdlIHByb3BlcnRpZXMuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICBnbHlwaHMgICAgICA/OiBzdHJpbmc7ICAvL0EgVVJMIHRlbXBsYXRlIGZvciBsb2FkaW5nIHNpZ25lZC1kaXN0YW5jZS1maWVsZCBnbHlwaCBzZXRzIGluIFBCRiBmb3JtYXQuIFRoZSBVUkwgbXVzdCBpbmNsdWRlIHtmb250c3RhY2t9IGFuZCB7cmFuZ2V9IHRva2Vucy4gVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpZiBhbnkgbGF5ZXIgdXNlcyB0aGUgdGV4dC1maWVsZCBsYXlvdXQgcHJvcGVydHkuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICB0cmFuc2l0aW9uICA/OiBhbnk7ICAgICAvL0EgZ2xvYmFsIHRyYW5zaXRpb24gZGVmaW5pdGlvbiB0byB1c2UgYXMgYSBkZWZhdWx0IGFjcm9zcyBwcm9wZXJ0aWVzLCB0byBiZSB1c2VkIGZvciB0aW1pbmcgdHJhbnNpdGlvbnMgYmV0d2VlbiBvbmUgdmFsdWUgYW5kIHRoZSBuZXh0IHdoZW4gbm8gcHJvcGVydHktc3BlY2lmaWMgdHJhbnNpdGlvbiBpcyBzZXQuIENvbGxpc2lvbi1iYXNlZCBzeW1ib2wgZmFkaW5nIGlzIGNvbnRyb2xsZWQgaW5kZXBlbmRlbnRseSBvZiB0aGUgc3R5bGUncyB0cmFuc2l0aW9uIHByb3BlcnR5LlxuICAgIGxheWVycyAgICAgID86IE1hcEJveFN0eWxlTGF5ZXJbXTsgICAvL0xheWVycyB3aWxsIGJlIGRyYXduIGluIHRoZSBvcmRlciBvZiB0aGlzIGFycmF5LlxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGVMYXllciB7XG4gICAgaWQgICAgICAgICAgICAgIDogc3RyaW5nOyAgICAgIC8vVW5pcXVlIGxheWVyIG5hbWUuXG4gICAgdHlwZSAgICAgICAgICAgIDogXCJmaWxsXCIgfCBcImxpbmVcIiB8IFwic3ltYm9sXCIgfCBcImNpcmNsZVwiIHwgXCJoZWF0bWFwXCIgfCBcImZpbGwtZXh0cnVzaW9uXCIgfCBcInJhc3RlclwiIHwgXCJoaWxsc2hhZGVcIiB8IFwiYmFja2dyb3VuZFwiOyAvL1JlbmRlcmluZyB0eXBlIG9mIHRoaXMgbGF5ZXIuXG4gICAgbWV0YWRhdGEgICAgICAgPzogYW55OyAgICAgICAgIC8vQXJiaXRyYXJ5IHByb3BlcnRpZXMgdXNlZnVsIHRvIHRyYWNrIHdpdGggdGhlIGxheWVyLCBidXQgZG8gbm90IGluZmx1ZW5jZSByZW5kZXJpbmcuIFByb3BlcnRpZXMgc2hvdWxkIGJlIHByZWZpeGVkIHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgJ21hcGJveDonLlxuICAgIHNvdXJjZSAgICAgICAgID86IHN0cmluZzsgICAgICAvL05hbWUgb2YgYSBzb3VyY2UgZGVzY3JpcHRpb24gdG8gYmUgdXNlZCBmb3IgdGhpcyBsYXllci4gUmVxdWlyZWQgZm9yIGFsbCBsYXllciB0eXBlcyBleGNlcHQgYmFja2dyb3VuZC5cbiAgICAnc291cmNlLWxheWVyJyA/OiBzdHJpbmc7IC8vTGF5ZXIgdG8gdXNlIGZyb20gYSB2ZWN0b3IgdGlsZSBzb3VyY2UuIFJlcXVpcmVkIGZvciB2ZWN0b3IgdGlsZSBzb3VyY2VzOyBwcm9oaWJpdGVkIGZvciBhbGwgb3RoZXIgc291cmNlIHR5cGVzLCBpbmNsdWRpbmcgR2VvSlNPTiBzb3VyY2VzLlxuICAgIG1pbnpvb20gICAgICAgID86IG51bWJlcjsgICAgICAvL1RoZSBtaW5pbXVtIHpvb20gbGV2ZWwgZm9yIHRoZSBsYXllci4gQXQgem9vbSBsZXZlbHMgbGVzcyB0aGFuIHRoZSBtaW56b29tLCB0aGUgbGF5ZXIgd2lsbCBiZSBoaWRkZW4uXG4gICAgbWF4em9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1heGltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1heHpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBmaWx0ZXIgICAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BIGV4cHJlc3Npb24gc3BlY2lmeWluZyBjb25kaXRpb25zIG9uIHNvdXJjZSBmZWF0dXJlcy4gT25seSBmZWF0dXJlcyB0aGF0IG1hdGNoIHRoZSBmaWx0ZXIgYXJlIGRpc3BsYXllZC4gWm9vbSBleHByZXNzaW9ucyBpbiBmaWx0ZXJzIGFyZSBvbmx5IGV2YWx1YXRlZCBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLiBUaGUgZmVhdHVyZS1zdGF0ZSBleHByZXNzaW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZmlsdGVyIGV4cHJlc3Npb25zLlxuICAgIGxheW91dCAgICAgICAgID86IGFueTsgICAgICAgICAvL0xheW91dCBwcm9wZXJ0aWVzIGZvciB0aGUgbGF5ZXIuXG4gICAgcGFpbnQgICAgICAgICAgPzogTWFwQm94UGFpbnQ7IC8vRGVmYXVsdCBwYWludCBwcm9wZXJ0aWVzIGZvciB0aGlzIGxheWVyLlxufVxuXG5pbnRlcmZhY2UgTWFwQm94UGFpbnQge1xuICAgIHZpc2liaWxpdHkgICAgICAgICAgID86IFwidmlzaWJsZVwiIHwgXCJub25lXCI7ICAgLy9XaGV0aGVyIHRoaXMgbGF5ZXIgaXMgZGlzcGxheWVkLlxuICAgICdiYWNrZ3JvdW5kLWNvbG9yJyAgID86IHN0cmluZzsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnYmFja2dyb3VuZC1wYXR0ZXJuJyA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBhbiBpbWFnZSBiYWNrZ3JvdW5kLiBGb3Igc2VhbWxlc3MgcGF0dGVybnMsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnYmFja2dyb3VuZC1vcGFjaXR5JyA/OiBudW1iZXI7ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBiYWNrZ3JvdW5kIHdpbGwgYmUgZHJhd24uXG4gICAgJ2ZpbGwtYW50aWFsaWFzJyAgICAgPzogYm9vbGVhbjsgICAgLy9XaGV0aGVyIG9yIG5vdCB0aGUgZmlsbCBzaG91bGQgYmUgYW50aWFsaWFzZWQuXG4gICAgJ2ZpbGwtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBvZiB0aGUgZW50aXJlIGZpbGwgbGF5ZXIuIEluIGNvbnRyYXN0IHRvIHRoZSBmaWxsLWNvbG9yLCB0aGlzIHZhbHVlIHdpbGwgYWxzbyBhZmZlY3QgdGhlIDFweCBzdHJva2UgYXJvdW5kIHRoZSBmaWxsLCBpZiB0aGUgc3Ryb2tlIGlzIHVzZWQuXG4gICAgJ2ZpbGwtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgLy9UaGUgY29sb3Igb2YgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoaXMgbGF5ZXIuIFRoaXMgY29sb3IgY2FuIGJlIHNwZWNpZmllZCBhcyByZ2JhIHdpdGggYW4gYWxwaGEgY29tcG9uZW50IGFuZCB0aGUgY29sb3IncyBvcGFjaXR5IHdpbGwgbm90IGFmZmVjdCB0aGUgb3BhY2l0eSBvZiB0aGUgMXB4IHN0cm9rZSwgaWYgaXQgaXMgdXNlZC5cbiAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJyA/OiBzdHJpbmd8YW55W107ICAgICAvL1RoZSBvdXRsaW5lIGNvbG9yIG9mIHRoZSBmaWxsLiBNYXRjaGVzIHRoZSB2YWx1ZSBvZiBmaWxsLWNvbG9yIGlmIHVuc3BlY2lmaWVkLlxuICAgICdmaWxsLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnZmlsbC10cmFuc2xhdGUtYW5jaG9yJyA6IFwibWFwXCIgfCBcInZpZXdwb3J0XCI7IC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgZmlsbC10cmFuc2xhdGUuXG4gICAgJ2ZpbGwtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgZmlsbHMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWNhcCcgICAgICAgICAgID86IFwiYnV0dFwiIHwgXCJyb3VuZFwiIHwgXCJzcXVhcmVcIjsgLy9UaGUgZGlzcGxheSBvZiBsaW5lIGVuZGluZ3MuXG4gICAgJ2xpbmUtam9pbicgICAgICAgICAgPzogIFwiYmV2ZWxcIiB8IFwicm91bmRcIiB8IFwibWl0ZXJcIiAvL1RoZSBkaXNwbGF5IG9mIGxpbmVzIHdoZW4gam9pbmluZy5cbiAgICAnbGluZS1taXRlci1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IG1pdGVyIGpvaW5zIHRvIGJldmVsIGpvaW5zIGZvciBzaGFycCBhbmdsZXMuXG4gICAgJ2xpbmUtcm91bmQtbGltaXQnICAgPzogbnVtYmVyOyAgICAgLy9Vc2VkIHRvIGF1dG9tYXRpY2FsbHkgY29udmVydCByb3VuZCBqb2lucyB0byBtaXRlciBqb2lucyBmb3Igc2hhbGxvdyBhbmdsZXMuXG4gICAgJ2xpbmUtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBhdCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLWNvbG9yJyAgICAgICAgID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGxpbmUgd2lsbCBiZSBkcmF3bi5cbiAgICAnbGluZS10cmFuc2xhdGUnICAgICA/OiBudW1iZXJbXTsgICAvL1RoZSBnZW9tZXRyeSdzIG9mZnNldC4gVmFsdWVzIGFyZSBbeCwgeV0gd2hlcmUgbmVnYXRpdmVzIGluZGljYXRlIGxlZnQgYW5kIHVwLCByZXNwZWN0aXZlbHkuXG4gICAgJ2xpbmUtdHJhbnNsYXRlLWFuY2hvcicgPzogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgIC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgbGluZS10cmFuc2xhdGUuXG4gICAgJ2xpbmUtd2lkdGgnICAgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9TdHJva2UgdGhpY2tuZXNzLlxuICAgICdsaW5lLWdhcC13aWR0aCcgICAgID86IG51bWJlcjsgICAgIC8vRHJhd3MgYSBsaW5lIGNhc2luZyBvdXRzaWRlIG9mIGEgbGluZSdzIGFjdHVhbCBwYXRoLiBWYWx1ZSBpbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBpbm5lciBnYXAuXG4gICAgJ2xpbmUtb2Zmc2V0JyAgICAgICAgPzogbnVtYmVyOyAgICAgLy9UaGUgbGluZSdzIG9mZnNldC4gRm9yIGxpbmVhciBmZWF0dXJlcywgYSBwb3NpdGl2ZSB2YWx1ZSBvZmZzZXRzIHRoZSBsaW5lIHRvIHRoZSByaWdodCwgcmVsYXRpdmUgdG8gdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGluZSwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgdG8gdGhlIGxlZnQuIEZvciBwb2x5Z29uIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gaW5zZXQsIGFuZCBhIG5lZ2F0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gb3V0c2V0LlxuICAgICdsaW5lLWJsdXInICAgICAgICAgID86IG51bWJlcjsgICAgIC8vQmx1ciBhcHBsaWVkIHRvIHRoZSBsaW5lLCBpbiBwaXhlbHMuXG4gICAgJ2xpbmUtZGFzaGFycmF5JyAgICAgPzogbnVtYmVyW107ICAgLy9TcGVjaWZpZXMgdGhlIGxlbmd0aHMgb2YgdGhlIGFsdGVybmF0aW5nIGRhc2hlcyBhbmQgZ2FwcyB0aGF0IGZvcm0gdGhlIGRhc2ggcGF0dGVybi4gVGhlIGxlbmd0aHMgYXJlIGxhdGVyIHNjYWxlZCBieSB0aGUgbGluZSB3aWR0aC4gVG8gY29udmVydCBhIGRhc2ggbGVuZ3RoIHRvIHBpeGVscywgbXVsdGlwbHkgdGhlIGxlbmd0aCBieSB0aGUgY3VycmVudCBsaW5lIHdpZHRoLiBOb3RlIHRoYXQgR2VvSlNPTiBzb3VyY2VzIHdpdGggbGluZU1ldHJpY3M6IHRydWUgc3BlY2lmaWVkIHdvbid0IHJlbmRlciBkYXNoZWQgbGluZXMgdG8gdGhlIGV4cGVjdGVkIHNjYWxlLiBBbHNvIG5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgbGluZXMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1ncmFkaWVudCcgICAgICA/OiBzdHJpbmc7ICAgICAvL0RlZmluZXMgYSBncmFkaWVudCB3aXRoIHdoaWNoIHRvIGNvbG9yIGEgbGluZSBmZWF0dXJlLiBDYW4gb25seSBiZSB1c2VkIHdpdGggR2VvSlNPTiBzb3VyY2VzIHRoYXQgc3BlY2lmeSBcImxpbmVNZXRyaWNzXCI6IHRydWUuXG4gICAgLy9UT0RPIHN5bWJvbHNcbn1cblxuXG5cblxuXG5cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZhbHVhdGFibGUgZXhwcmVzc2lvbiBhc3NvY2lhdGVkIHdpdGggYSBsYXllciBzdHlsZSxcbiAqIGZvbGxvd2luZyBNYXBCb3ggU3R5bGUgU3BlYyBmb3JtYXQuXG4gKiBFeHByZXNzaW9ucyBhcmUgYXJyYXlzIG9mOlxuICogICAtIG9wZXJhdG9yIGtleSAoJ2dldCcsICc9PScsICdoYXMnLCBldGMpXG4gKiAgIC0gYW55IG51bWJlciBvZiBwYXJhbWV0ZXJzIGluY2x1ZGluZyBuZXN0ZWQgZXhwcmVzc2lvbnNcbiAqXG4gKiAgRXhhbXBsZXM6XG4gKlxuICogIFsgJ2hhcycsICdwcm9wZXJ0eU5hbWUnIF0gICAvLyBzaW1wbGUgZXhwcmVzc2lvbiBjaGVja2luZyBmb3IgZXhpc3RhbmNlIG9mIGEgc3BlY2lmaWMgZmVhdHVyZSBwcm9wZXJ0eVxuICpcbiAqICBbXG4gKiAgICAnPT0nICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoZXF1YWxpdHkgY29tcGFyaXNvbilcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eUEnIF0sICAgLy8gbmVzdGVkIGV4cHJlc3Npb24gdG8gZXh0cmFjdCBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdleHBlY3RlZFZhbHVlJyAgICAgICAgICAgLy8gdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiAgXVxuICpcbiAqICBbXG4gKiAgICAnbWF0Y2gnLCAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG9mIGV4cHJlc3Npb24gKCdzd2l0Y2gnIHN0YXRlbWVudClcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eU5hbWUnIF0sIC8vIGZpcnN0IHBhcmFtIGlzIGFub3RoZXIgZXhwcmVzc2lvbiB0byBleHRyYWN0IGEgZmVhdHVyZSdzIHByb3BlcnR5IHZhbHVlXG4gKiAgICAnQScsICd2YWx1ZUZvckEnLCAgICAgICAgICAvLyBuZXh0IHR3byBwYXJhbXMgYXJlIGZpcnN0ICdjYXNlJyBvZiBcInN3aXRjaFwiXG4gKiAgICAnQicsICd2YWx1ZUZvckInLCAgICAgICAgICAvLyBzZWNvbmQgJ2Nhc2UnIGZvciAnc3dpdGNoJ1xuICogICAgJ2ZhbGxiYWNrVmFsdWUnICAgICAgICAgICAgLy8gZGVmYXVsdCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgXVxuICpcbiAqL1xuY2xhc3MgRXhwcmVzc2lvbiB7XG5cbiAgICBwcml2YXRlIG9wZXJhdG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBhcmdzID86IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IoIGZpbHRlciA6IGFueVtdICkge1xuICAgICAgICBsZXQgYXJyID0gZmlsdGVyLnNsaWNlKDApO1xuICAgICAgICB0aGlzLm9wZXJhdG9yID0gYXJyWzBdO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcnIuc3BsaWNlKDEpLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KCBhcmcgKSA/IG5ldyBFeHByZXNzaW9uKCBhcmcgKSA6IGFyZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIHJlc3VsdCBvZiB0aGUgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIGV2YWx1YXRlKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcgKSA6IGFueSB7XG4gICAgICAgIGxldCBwMSwgcDI7XG4gICAgICAgIHN3aXRjaCh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlICdnZXQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgY2FzZSAnaGFzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgIGNhc2UgJyFoYXMnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISggdHlwZW9mKHAxKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcDEgaW4gcHJvcGVydGllcyk7XG4gICAgICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ID09ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID09IHAyO1xuICAgICAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYENvbXBhcmluZyAke3AxfSAhPSAke3AyfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSAhPSBwMjtcbiAgICAgICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID4gcDI7XG4gICAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA8IHAyO1xuICAgICAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID49IHAyO1xuICAgICAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDw9IHAyO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwMSk7XG4gICAgICAgICAgICBjYXNlICdhdCcgOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZihwMSkgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkocDIpICYmXG4gICAgICAgICAgICAgICAgICAgIHAyLmxlbmd0aCA+PSBwMSA/IHAyW3AxXSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNhc2UgJ3pvb20nOiByZXR1cm4gem9vbTtcbiAgICAgICAgICAgIGNhc2UgJ2lkJzogcmV0dXJuIHByb3BlcnRpZXMuaWQ7XG4gICAgICAgICAgICBjYXNlICdnZW9tZXRyeS10eXBlJzogcmV0dXJuIGdlb21ldHJ5VHlwZTtcbiAgICAgICAgICAgIGNhc2UgJ21hdGNoJyA6ICAvL3dvcmtzIGxpa2UgYSBzd2l0Y2ggc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE1hdGNoKHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIG9mIHRoZSBhcmd1bWVudCAod2hpY2ggbWF5IGJlIHJlc3VsdCBvZiBhbiBleHByZXNzaW9uKVxuICAgICAqL1xuICAgIGdldEFyZyhpbmRleCA6IG51bWJlciwgcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuYXJnc1tpbmRleF07XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZS5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvL2FyZyBpcyBhIG5lc3RlZCBleHByZXNzaW9uLi4uXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcblxuICAgICAgICB9IGVsc2UgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ3N0cmluZycgJiYgcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vYXJnIGlzIGEgcHJvcGVydHkgbmFtZSBpbnN0ZWFkIG9mIGEgbmVzdGVkIGV4cHJlc3Npb24uLi5cbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBtYXRjaGluZyBjb25kaXRpb24gb2YgZXhwcmVzc2lvbiwgb3IgZmFsbGJhY2sgdmFsdWVcbiAgICAgKi9cbiAgICBmaW5kTWF0Y2goIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGwsIGVuZCA9IHRoaXMuYXJncy5sZW5ndGgtMTtcblxuICAgICAgICAvL3RoZSBpbnB1dCB2YWx1ZSB0byB0ZXN0IGFnYWluc3RcbiAgICAgICAgLy8gIC4uLiBzaG91bGQgYmUgdmFsdWUgb2YgSW5wdXQgcG9ydGlvbiAoaWUsIFwiTGFrZVwiIGZvciB3ZXRsYW5kcylcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJFeHByZXNzaW9uLm1hdGNoIC0gXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKTtcblxuICAgICAgICAvL2ZpbmQgdmFsdWUgaW5zaWRlIHJlbWFpbmluZyBhcmdzIHRvIGFzc2lnbiBzdHlsZSBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZVxuICAgICAgICB0aGlzLmFyZ3MuZm9yRWFjaCggKGFyZyxpKSA9PiB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZmlyc3QgYXJnIChzZWUgYWJvdmUpIGFuZCBsYXN0IGFyZyAoaXQncyB0aGUgZmFsbGJhY2sgdmFsdWUpXG4gICAgICAgICAgICAvLyBhbHNvIHNraXAgaWYgd2UndmUgYWxyZWFkeSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICBpZiggcmVzdWx0ICE9PSBudWxsIHx8IGkgPT09IDAgfHwgaSA9PT0gZW5kKSByZXR1cm47XG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheShhcmcpICkgeyAgICAgICAgICAvL2FycmF5IG9mIGxpdGVyYWwgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYofmFyZy5pbmRleE9mKCB2YWx1ZSApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYXJnc1tpKzFdOyAgICAvL21hdGNoLCByZXR1cm4gbmV4dCB2YWx1ZSBpbiBhcnJheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiggYXJnID09IHZhbHVlICl7ICAgICAgLy9saXRlcmFsIHZhbHVlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZighcmVzdWx0KSByZXN1bHQgPSB0aGlzLmFyZ3NbZW5kXTsgLy9sYXN0IGFyZyBpcyBhbHdheXMgZmFsbGJhY2sgdmFsdWVcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYXRjaCByZXR1cm5lZDogXCIgKyByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMub3BlcmF0b3JdLmNvbmNhdChcbiAgICAgICAgICAgIHRoaXMuYXJncy5tYXAoIGFyZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YoYXJnLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpID8gYXJnLnRvU3RyaW5nKCkgOiBhcmc7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLmpvaW4oJywnKTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gc3R5bGUgTWFwQm94IFN0eWxlIGRlZmluaXRpb25cbiAqIEByZXR1cm4gb2JqZWN0IGFzc29jaWF0aW5nIExlYWZsZXQgc3R5bGVzIHdpdGggbGF5ZXIgaWRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlTWFwQm94U3R5bGUoIHN0eWxlIDogTWFwQm94U3R5bGUgKSA6IHsgW2tleTpzdHJpbmddOkxlYWZsZXRTdHlsZU1hcCB9IHtcblxuICAgIC8vVE9ETyB2YWxpZGF0ZSBzdHlsZS52ZXJzaW9uIHRvIG1ha2Ugc3VyZSB3ZSBhcmUgcGFyc2luZyBzb21ldGhpbmcgd2UgdW5kZXJzdGFuZFxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQYXJzaW5nIE1hcEJveCBTdHlsZVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdHlsZSwgbnVsbCwgJyAnKSk7XG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAgIGlmKCAhc3R5bGUubGF5ZXJzIHx8ICFBcnJheS5pc0FycmF5KHN0eWxlLmxheWVycykgfHwgIXN0eWxlLmxheWVycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdHlsZSBoYXMgbm8gbGF5ZXIgZGVmaW5pdGlvbnNcIik7XG4gICAgICAgIHJldHVybiB7fTsgICAvL2VtcHR5IHN0eWxlc1xuICAgIH1cblxuICAgIC8vaGF2ZSB0byBncm91cCBsYXllcnMgd2l0aCBzYW1lIGlkIGJ1dCB3aXRoIGRpZmZlcmVudCBmaWx0ZXJzIHVuZGVyIHRoZSBzYW1lIHN0eWxlIGZ1bmN0aW9uXG4gICAgbGV0IGxheWVycyA9IHt9O1xuICAgIHN0eWxlLmxheWVycy5mb3JFYWNoKCBsYXllciA9PiB7XG4gICAgICAgIC8vdXNlIHNvdXJjZS1sYXllciBrZXkgZmlyc3QsIGZhbGxiYWNrIHRvIGxheWVyIGlkXG4gICAgICAgIGxldCBpZCA9IChsYXllclsnc291cmNlLWxheWVyJ10gfHwgbGF5ZXIuaWQpLnRyaW0oKTtcbiAgICAgICAgaWYobGF5ZXJzW2lkXSkgbGF5ZXJzW2lkXS5wdXNoKGxheWVyKTsgIC8vbGF5ZXIgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgZWxzZSBsYXllcnNbaWRdID0gW2xheWVyXTsgICAgICAgICAgICAgIC8vbmV3IGxheWVyJ3Mgc3R5bGVcbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsYXllcnMsIG51bGwsICcgJykpO1xuXG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGxheWVycykuZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICBsZXQgc3R5bGVzID0gbGF5ZXJzW2lkXTsgICAgLy9hcnJheSBvZiAxIG9yIG1vcmUgZm9yIGdpdmVuIGlkIChkaWZmZXJlbnRpYXRlZCBieSBmaWx0ZXJzKVxuICAgICAgICByZXN1bHRbaWRdID0gZG9UaGlzKHN0eWxlcyk7XG4gICAgfSlcbiAgICAvLyBzdHlsZS5sYXllcnMuZm9yRWFjaCggbGF5ZXIgPT4ge1xuICAgIC8vICAgICByZXN1bHRbIGxheWVyLmlkIF0gPSBzdHlsZUZ1bmN0aW9uRmFjdG9yeShsYXllcik7IC8vbmV3IExheWVyU3R5bGUoIGxheWVyICkuZ2V0U3R5bGVGdW5jdGlvbigpXG4gICAgLy8gfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbmZ1bmN0aW9uIGRvVGhpcyggbGF5ZXJTdHlsZXMgOiBNYXBCb3hTdHlsZUxheWVyW10gKSA6IEZ1bmN0aW9uIHtcblxuICAgIGxldCBzdHlsZXMgPSBsYXllclN0eWxlcy5tYXAoIGxheWVyU3R5bGUgPT4gc3R5bGVGdW5jdGlvbkZhY3RvcnkobGF5ZXJTdHlsZSkgKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiggcHJvcGVydGllcyA6IGFueSwgem9vbTogbnVtYmVyLCBnZW9tVHlwZSA6IHN0cmluZyApIHtcblxuICAgICAgICBsZXQgbWF0Y2ggOiBhbnkgPSBzdHlsZXMuZmluZCggc3R5bGUgPT4ge1xuICAgICAgICAgICAgaWYoc3R5bGUuZmlsdGVyICYmIHR5cGVvZihzdHlsZS5maWx0ZXIuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU3R5bGUgaGFzIGEgZmlsdGVyLi4uIFwiICsgc3R5bGUuZmlsdGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IHN0eWxlLmZpbHRlci5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tVHlwZSk7XG4gICAgICAgICAgICAgICAgLy8gaWYoIWZvdW5kKSBjb25zb2xlLmxvZyhcIkZpbHRlciBkb2VzIG5vdCBtYXRjaFwiKTtcbiAgICAgICAgICAgICAgICAvLyBlbHNlIGNvbnNvbGUubG9nKFwiRmlsdGVyIG1hdGNoZXNcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgaWYobWF0Y2gpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG1hdGNoLnN0eWxlKS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbCA9IG1hdGNoLnN0eWxlW2tleV07XG4gICAgICAgICAgICAgICAgaWYoIHN0eWxlVmFsICYmIHR5cGVvZihzdHlsZVZhbC5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHN0eWxlVmFsLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21UeXBlKTtcbiAgICAgICAgICAgICAgICBlbHNlIHJlc3VsdFtrZXldID0gc3R5bGVWYWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2FybmluZywgbm8gc3R5bGUgZm91bmRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG59XG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciBNYXBCb3ggU3R5bGUgU3BlYyBMYXllciBkZWZpbml0aW9uXG4gKiBAcmV0dXJuIEZ1bmN0aW9uIGFjY2VwdGluZyBmZWF0dXJlIHByb3BlcnRpZXMsIHpvb20gbGV2ZWwsIGFuZCBnZW9tZXRyeSB0eXBlIGFuZCByZXR1cm5pbmcgYSBMZWFmbGV0IHN0eWxlIG9iamVjdFxuICovXG52YXIgc3R5bGVGdW5jdGlvbkZhY3RvcnkgPSAoIGZ1bmN0aW9uKCBsYXllclN0eWxlIDogTWFwQm94U3R5bGVMYXllciApIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgbGV0IHBhcnNlVmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlIDogYW55LCBmYWxsYmFjayA/OiBhbnkgKSB7XG4gICAgICAgIGlmKCB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHJlc3Npb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZSkgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxsYmFjayB8fCBudWxsO1xuICAgIH1cblxuICAgIGxldCBmaWx0ZXIgOiBhbnkgPSBwYXJzZVZhbHVlKGxheWVyU3R5bGUuZmlsdGVyKTtcblxuICAgIGxldCBsYXllclBhaW50IDogTWFwQm94UGFpbnQgID0gbGF5ZXJTdHlsZS5wYWludDtcblxuICAgIGxldCBsaW5lV2lkdGggICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtd2lkdGgnXSwgMSk7XG4gICAgbGV0IG9wYWNpdHkgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGNvbG9yICAgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnZmlsbC1vdXRsaW5lLWNvbG9yJ10gfHwgbGF5ZXJQYWludFsnZmlsbC1jb2xvciddLCAnIzAwMCcpO1xuICAgIGxldCBmaWxsT3BhY2l0eSA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtb3BhY2l0eSddIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtb3BhY2l0eSddLCAxLjApO1xuICAgIGxldCBmaWxsQ29sb3IgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtY29sb3InXSAgIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtY29sb3InXSwgJyMwMDAnKTtcblxuICAgIGxldCBzdHlsZSA6IExlYWZsZXRTdHlsZSA9IHtcbiAgICAgICAgY29sb3IgICAgICA6IGNvbG9yLCAgICAgICAgIC8vc3Ryb2tlIGNvbG9yXG4gICAgICAgIG9wYWNpdHkgICAgOiBvcGFjaXR5LCAgICAgICAvL3N0cm9rZSBvcGFjaXR5XG4gICAgICAgIHdlaWdodCAgICAgOiBsaW5lV2lkdGgsICAgICAvL3N0cm9rZSBzaXplXG4gICAgICAgIGZpbGxPcGFjaXR5OiBmaWxsT3BhY2l0eSwgICAvL2ZpbGwgb3BhY2l0eVxuICAgICAgICBmaWxsQ29sb3IgIDogZmlsbENvbG9yICAgICAgLy9maWxsIGNvbG9yXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICB9O1xuXG4gICAgLy8gcmV0dXJuIGZ1bmN0aW9uKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tOiBudW1iZXIsIGdlb21UeXBlIDogc3RyaW5nICkge1xuICAgIC8vICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgLy9cbiAgICAvLyAgICAgaWYoZmlsdGVyICYmIHR5cGVvZihmaWx0ZXIuZXZhbHVhdGUpKSB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBhIGZpbHRlci4uLiBcIiArIGZpbHRlci50b1N0cmluZygpKTtcbiAgICAvLyAgICAgICAgIGlmKCFmaWx0ZXIuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbWF0Y2hlc1wiKTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgIC8vICAgICAgICAgbGV0IHN0eWxlVmFsID0gc3R5bGVba2V5XTtcbiAgICAvLyAgICAgICAgIGlmKCBzdHlsZVZhbCAmJiB0eXBlb2Yoc3R5bGVWYWwuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJylcbiAgICAvLyAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHN0eWxlVmFsLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21UeXBlKTtcbiAgICAvLyAgICAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBzdHlsZVZhbDtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIHJldHVybiByZXN1bHQ7XG4gICAgLy8gfTtcbn0pO1xuIl19