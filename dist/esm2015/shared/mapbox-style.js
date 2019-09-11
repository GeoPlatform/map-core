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
    /** @type {?|undefined} */
    LeafletStyle.prototype.fillPattern;
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
    /** @type {?|undefined} */
    MapBoxStyle.prototype.spriteJSON;
    /** @type {?|undefined} */
    MapBoxStyle.prototype.spriteURL;
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
 * @param {?} styleDef
 * @return {?} object associating Leaflet styles with layer ids
 */
export default function parseMapBoxStyle(styleDef) {
    //TODO validate styleDef.version to make sure we are parsing something we understand
    // console.log("Parsing MapBox Style");
    // console.log(JSON.stringify(styleDef, null, ' '));
    // console.log("--------------------");
    if (!styleDef.layers || !Array.isArray(styleDef.layers) || !styleDef.layers.length) {
        console.log("Style has no layer definitions");
        return {}; //empty styles
    }
    //have to group layers with same id but with different filters under the same style function
    /** @type {?} */
    let layers = {};
    styleDef.layers.forEach((/**
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
        result[id] = styleFunctionFactory(styles, styleDef);
    }));
    return result;
}
/**
 * @param {?} layerStyles
 * @param {?} styleDef
 * @return {?}
 */
function styleFunctionFactory(layerStyles, styleDef) {
    /** @type {?} */
    let styles = layerStyles.map((/**
     * @param {?} layerStyle
     * @return {?}
     */
    layerStyle => getLayerStyle(layerStyle, styleDef)));
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
/**
 * @param {?} layerStyle MapBox Style Spec Layer definition
 * @param {?} styleDef MapBox Style document
 * @return {?} Function accepting feature properties, zoom level, and geometry type and returning a Leaflet style object
 */
function getLayerStyle(layerStyle, styleDef) {
    /** @type {?} */
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
    let fillColor = parseValue(layerPaint['fill-color'] || layerPaint['background-color'], 'transparent');
    /** @type {?} */
    let fillPattern = parseValue(layerPaint['fill-pattern']);
    if (fillPattern && styleDef.spriteJSON && styleDef.spriteJSON[fillPattern]) {
        /** @type {?} */
        let pid = fillPattern.toLowerCase().replace(/\-/g, '').replace(/\\/g, '').replace(/\//g, '').replace(/\s+/g, '');
        //fill uses sprite referenced by the style doc
        // (fillPattern value is the key of the sprite entry)
        /** @type {?} */
        let pattern = styleDef.spriteJSON[fillPattern];
        fillPattern = Object.assign({ id: pid, url: styleDef.spriteURL }, pattern);
    }
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
        fillColor: fillColor,
        //fill color
        fillPattern: fillPattern
    };
    return {
        filter: parseValue(layerStyle.filter),
        style: style
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyQkFRQzs7O0lBUEcsOEJBQXNCOztJQUN0QiwrQkFBc0I7O0lBQ3RCLDZCQUFzQjs7SUFDdEIsaUNBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLGlDQUFzQjs7SUFDdEIsbUNBQW1COzs7OztBQUd2Qiw4QkFFQzs7OztBQUVELDBCQWlCQzs7O0lBaEJHLDhCQUFzQjs7SUFDdEIsMkJBQXNCOztJQUN0QiwrQkFBbUI7O0lBQ25CLDZCQUF3Qjs7SUFDeEIsMkJBQXNCOztJQUN0Qiw4QkFBc0I7O0lBQ3RCLDRCQUFzQjs7SUFDdEIsNEJBQW1COztJQUNuQiw4QkFBcUI7O0lBQ3JCLDZCQUFzQjs7SUFDdEIsNkJBQXNCOztJQUN0QixpQ0FBbUI7O0lBQ25CLDZCQUFrQzs7SUFFbEMsaUNBQW1COztJQUNuQixnQ0FBc0I7Ozs7O0FBRzFCLCtCQVdDOzs7SUFWRyw4QkFBeUI7O0lBQ3pCLGdDQUErSDs7SUFDL0gsb0NBQXNCOztJQUN0QixrQ0FBeUI7Ozs7SUFFekIsbUNBQXlCOztJQUN6QixtQ0FBeUI7O0lBQ3pCLGtDQUFzQjs7SUFDdEIsa0NBQXNCOztJQUN0QixpQ0FBOEI7Ozs7O0FBR2xDLDBCQTRCQzs7O0lBM0JHLGlDQUEyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkQvQyxNQUFNLFVBQVU7Ozs7SUFLWixZQUFhLE1BQWM7O1lBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMs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QUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDOzs7O1lBR3hHLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUM5QyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM5RTs7UUFFRyxLQUFLLEdBQWtCO1FBQ3ZCLEtBQUssRUFBUyxLQUFLOztRQUNuQixPQUFPLEVBQU8sT0FBTzs7UUFDckIsTUFBTSxFQUFRLFNBQVM7O1FBQ3ZCLFdBQVcsRUFBRyxXQUFXOztRQUN6QixTQUFTLEVBQUssU0FBUzs7UUFDdkIsV0FBVyxFQUFHLFdBQVc7S0FDNUI7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEtBQUssRUFBRSxLQUFLO0tBQ2YsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmludGVyZmFjZSBMZWFmbGV0U3R5bGUge1xuICAgIHdlaWdodCAgICAgID86IG51bWJlcjtcbiAgICBvcGFjaXR5ICAgICA/OiBudW1iZXI7XG4gICAgY29sb3IgICAgICAgPzogc3RyaW5nO1xuICAgIGRhc2hBcnJheSAgID86IG51bWJlcltdO1xuICAgIGZpbGxPcGFjaXR5ID86IG51bWJlcjtcbiAgICBmaWxsQ29sb3IgICA/OiBzdHJpbmc7XG4gICAgZmlsbFBhdHRlcm4gPzogYW55OyAvL2N1c3RvbSBleHRlbnNpb24gZm9yIHNwcml0ZSBmaWxsIHBhdHRlcm5zXG59XG5cbmludGVyZmFjZSBMZWFmbGV0U3R5bGVNYXAge1xuICAgIFtrZXk6c3RyaW5nXTogRnVuY3Rpb24gfCBMZWFmbGV0U3R5bGVcbn1cblxuaW50ZXJmYWNlIE1hcEJveFN0eWxlIHtcbiAgICB2ZXJzaW9uICAgICAgOiBudW1iZXI7ICAvL1N0eWxlIHNwZWNpZmljYXRpb24gdmVyc2lvbiBudW1iZXIuIE11c3QgYmUgOC5cbiAgICBuYW1lICAgICAgICA/OiBzdHJpbmc7ICAvL0EgaHVtYW4tcmVhZGFibGUgbmFtZSBmb3IgdGhlIHN0eWxlLlxuICAgIG1ldGFkYXRhICAgID86IGFueTsgICAgIC8vQXJiaXRyYXJ5IHByb3BlcnRpZXMgdXNlZnVsIHRvIHRyYWNrIHdpdGggdGhlIHN0eWxlc2hlZXQsIGJ1dCBkbyBub3QgaW5mbHVlbmNlIHJlbmRlcmluZy4gUHJvcGVydGllcyBzaG91bGQgYmUgcHJlZml4ZWQgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSAnbWFwYm94OicuXG4gICAgY2VudGVyICAgICAgPzogbnVtYmVyW107IC8vRGVmYXVsdCBtYXAgY2VudGVyIGluIGxvbmdpdHVkZSBhbmQgbGF0aXR1ZGUuIFRoZSBzdHlsZSBjZW50ZXIgd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICB6b29tICAgICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgem9vbSBsZXZlbC4gVGhlIHN0eWxlIHpvb20gd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBiZWFyaW5nICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgYmVhcmluZywgaW4gZGVncmVlcy4gVGhlIGJlYXJpbmcgaXMgdGhlIGNvbXBhc3MgZGlyZWN0aW9uIHRoYXQgaXMgXCJ1cFwiOyBmb3IgZXhhbXBsZSwgYSBiZWFyaW5nIG9mIDkwwrAgb3JpZW50cyB0aGUgbWFwIHNvIHRoYXQgZWFzdCBpcyB1cC4gVGhpcyB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIHBpdGNoICAgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCBwaXRjaCwgaW4gZGVncmVlcy4gWmVybyBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBzdXJmYWNlLCBmb3IgYSBsb29rIHN0cmFpZ2h0IGRvd24gYXQgdGhlIG1hcCwgd2hpbGUgYSBncmVhdGVyIHZhbHVlIGxpa2UgNjAgbG9va3MgYWhlYWQgdG93YXJkcyB0aGUgaG9yaXpvbi4gVGhlIHN0eWxlIHBpdGNoIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgbGlnaHQgICAgICAgPzogYW55OyAgICAgLy9UaGUgZ2xvYmFsIGxpZ2h0IHNvdXJjZS5cbiAgICBzb3VyY2VzICAgICA/OiBhbnlbXTsgICAvL0RhdGEgc291cmNlIHNwZWNpZmljYXRpb25zLlxuICAgIHNwcml0ZSAgICAgID86IHN0cmluZzsgIC8vQSBiYXNlIFVSTCBmb3IgcmV0cmlldmluZyB0aGUgc3ByaXRlIGltYWdlIGFuZCBtZXRhZGF0YS4gVGhlIGV4dGVuc2lvbnMgLnBuZywgLmpzb24gYW5kIHNjYWxlIGZhY3RvciBAMngucG5nIHdpbGwgYmUgYXV0b21hdGljYWxseSBhcHBlbmRlZC4gVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpZiBhbnkgbGF5ZXIgdXNlcyB0aGUgYmFja2dyb3VuZC1wYXR0ZXJuLCBmaWxsLXBhdHRlcm4sIGxpbmUtcGF0dGVybiwgZmlsbC1leHRydXNpb24tcGF0dGVybiwgb3IgaWNvbi1pbWFnZSBwcm9wZXJ0aWVzLiBUaGUgVVJMIG11c3QgYmUgYWJzb2x1dGUsIGNvbnRhaW5pbmcgdGhlIHNjaGVtZSwgYXV0aG9yaXR5IGFuZCBwYXRoIGNvbXBvbmVudHMuXG4gICAgZ2x5cGhzICAgICAgPzogc3RyaW5nOyAgLy9BIFVSTCB0ZW1wbGF0ZSBmb3IgbG9hZGluZyBzaWduZWQtZGlzdGFuY2UtZmllbGQgZ2x5cGggc2V0cyBpbiBQQkYgZm9ybWF0LiBUaGUgVVJMIG11c3QgaW5jbHVkZSB7Zm9udHN0YWNrfSBhbmQge3JhbmdlfSB0b2tlbnMuIFRoaXMgcHJvcGVydHkgaXMgcmVxdWlyZWQgaWYgYW55IGxheWVyIHVzZXMgdGhlIHRleHQtZmllbGQgbGF5b3V0IHByb3BlcnR5LiBUaGUgVVJMIG11c3QgYmUgYWJzb2x1dGUsIGNvbnRhaW5pbmcgdGhlIHNjaGVtZSwgYXV0aG9yaXR5IGFuZCBwYXRoIGNvbXBvbmVudHMuXG4gICAgdHJhbnNpdGlvbiAgPzogYW55OyAgICAgLy9BIGdsb2JhbCB0cmFuc2l0aW9uIGRlZmluaXRpb24gdG8gdXNlIGFzIGEgZGVmYXVsdCBhY3Jvc3MgcHJvcGVydGllcywgdG8gYmUgdXNlZCBmb3IgdGltaW5nIHRyYW5zaXRpb25zIGJldHdlZW4gb25lIHZhbHVlIGFuZCB0aGUgbmV4dCB3aGVuIG5vIHByb3BlcnR5LXNwZWNpZmljIHRyYW5zaXRpb24gaXMgc2V0LiBDb2xsaXNpb24tYmFzZWQgc3ltYm9sIGZhZGluZyBpcyBjb250cm9sbGVkIGluZGVwZW5kZW50bHkgb2YgdGhlIHN0eWxlJ3MgdHJhbnNpdGlvbiBwcm9wZXJ0eS5cbiAgICBsYXllcnMgICAgICA/OiBNYXBCb3hTdHlsZUxheWVyW107ICAgLy9MYXllcnMgd2lsbCBiZSBkcmF3biBpbiB0aGUgb3JkZXIgb2YgdGhpcyBhcnJheS5cblxuICAgIHNwcml0ZUpTT04gID86IGFueTsgICAgIC8vY3VzdG9tIGV4dGVuc2lvbiBvZiBwYXJzZWQgc3ByaXRlIEpTT04gZGVmaW5pdGlvblxuICAgIHNwcml0ZVVSTCAgID86IHN0cmluZzsgIC8vY3VzdG9tIGV4dGVuc2lvbiBvZiBzcHJpdGUgSU1HIFVSTFxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGVMYXllciB7XG4gICAgaWQgICAgICAgICAgICAgIDogc3RyaW5nOyAgICAgIC8vVW5pcXVlIGxheWVyIG5hbWUuXG4gICAgdHlwZSAgICAgICAgICAgIDogXCJmaWxsXCIgfCBcImxpbmVcIiB8IFwic3ltYm9sXCIgfCBcImNpcmNsZVwiIHwgXCJoZWF0bWFwXCIgfCBcImZpbGwtZXh0cnVzaW9uXCIgfCBcInJhc3RlclwiIHwgXCJoaWxsc2hhZGVcIiB8IFwiYmFja2dyb3VuZFwiOyAvL1JlbmRlcmluZyB0eXBlIG9mIHRoaXMgbGF5ZXIuXG4gICAgbWV0YWRhdGEgICAgICAgPzogYW55OyAgICAgICAgIC8vQXJiaXRyYXJ5IHByb3BlcnRpZXMgdXNlZnVsIHRvIHRyYWNrIHdpdGggdGhlIGxheWVyLCBidXQgZG8gbm90IGluZmx1ZW5jZSByZW5kZXJpbmcuIFByb3BlcnRpZXMgc2hvdWxkIGJlIHByZWZpeGVkIHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgJ21hcGJveDonLlxuICAgIHNvdXJjZSAgICAgICAgID86IHN0cmluZzsgICAgICAvL05hbWUgb2YgYSBzb3VyY2UgZGVzY3JpcHRpb24gdG8gYmUgdXNlZCBmb3IgdGhpcyBsYXllci4gUmVxdWlyZWQgZm9yIGFsbCBsYXllciB0eXBlcyBleGNlcHQgYmFja2dyb3VuZC5cbiAgICAnc291cmNlLWxheWVyJyA/OiBzdHJpbmc7IC8vTGF5ZXIgdG8gdXNlIGZyb20gYSB2ZWN0b3IgdGlsZSBzb3VyY2UuIFJlcXVpcmVkIGZvciB2ZWN0b3IgdGlsZSBzb3VyY2VzOyBwcm9oaWJpdGVkIGZvciBhbGwgb3RoZXIgc291cmNlIHR5cGVzLCBpbmNsdWRpbmcgR2VvSlNPTiBzb3VyY2VzLlxuICAgIG1pbnpvb20gICAgICAgID86IG51bWJlcjsgICAgICAvL1RoZSBtaW5pbXVtIHpvb20gbGV2ZWwgZm9yIHRoZSBsYXllci4gQXQgem9vbSBsZXZlbHMgbGVzcyB0aGFuIHRoZSBtaW56b29tLCB0aGUgbGF5ZXIgd2lsbCBiZSBoaWRkZW4uXG4gICAgbWF4em9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1heGltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1heHpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBmaWx0ZXIgICAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BIGV4cHJlc3Npb24gc3BlY2lmeWluZyBjb25kaXRpb25zIG9uIHNvdXJjZSBmZWF0dXJlcy4gT25seSBmZWF0dXJlcyB0aGF0IG1hdGNoIHRoZSBmaWx0ZXIgYXJlIGRpc3BsYXllZC4gWm9vbSBleHByZXNzaW9ucyBpbiBmaWx0ZXJzIGFyZSBvbmx5IGV2YWx1YXRlZCBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLiBUaGUgZmVhdHVyZS1zdGF0ZSBleHByZXNzaW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZmlsdGVyIGV4cHJlc3Npb25zLlxuICAgIGxheW91dCAgICAgICAgID86IGFueTsgICAgICAgICAvL0xheW91dCBwcm9wZXJ0aWVzIGZvciB0aGUgbGF5ZXIuXG4gICAgcGFpbnQgICAgICAgICAgPzogTWFwQm94UGFpbnQ7IC8vRGVmYXVsdCBwYWludCBwcm9wZXJ0aWVzIGZvciB0aGlzIGxheWVyLlxufVxuXG5pbnRlcmZhY2UgTWFwQm94UGFpbnQge1xuICAgIHZpc2liaWxpdHkgICAgICAgICAgID86IFwidmlzaWJsZVwiIHwgXCJub25lXCI7ICAgLy9XaGV0aGVyIHRoaXMgbGF5ZXIgaXMgZGlzcGxheWVkLlxuICAgICdiYWNrZ3JvdW5kLWNvbG9yJyAgID86IHN0cmluZzsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnYmFja2dyb3VuZC1wYXR0ZXJuJyA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBhbiBpbWFnZSBiYWNrZ3JvdW5kLiBGb3Igc2VhbWxlc3MgcGF0dGVybnMsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnYmFja2dyb3VuZC1vcGFjaXR5JyA/OiBudW1iZXI7ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBiYWNrZ3JvdW5kIHdpbGwgYmUgZHJhd24uXG4gICAgJ2ZpbGwtYW50aWFsaWFzJyAgICAgPzogYm9vbGVhbjsgICAgLy9XaGV0aGVyIG9yIG5vdCB0aGUgZmlsbCBzaG91bGQgYmUgYW50aWFsaWFzZWQuXG4gICAgJ2ZpbGwtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBvZiB0aGUgZW50aXJlIGZpbGwgbGF5ZXIuIEluIGNvbnRyYXN0IHRvIHRoZSBmaWxsLWNvbG9yLCB0aGlzIHZhbHVlIHdpbGwgYWxzbyBhZmZlY3QgdGhlIDFweCBzdHJva2UgYXJvdW5kIHRoZSBmaWxsLCBpZiB0aGUgc3Ryb2tlIGlzIHVzZWQuXG4gICAgJ2ZpbGwtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgLy9UaGUgY29sb3Igb2YgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoaXMgbGF5ZXIuIFRoaXMgY29sb3IgY2FuIGJlIHNwZWNpZmllZCBhcyByZ2JhIHdpdGggYW4gYWxwaGEgY29tcG9uZW50IGFuZCB0aGUgY29sb3IncyBvcGFjaXR5IHdpbGwgbm90IGFmZmVjdCB0aGUgb3BhY2l0eSBvZiB0aGUgMXB4IHN0cm9rZSwgaWYgaXQgaXMgdXNlZC5cbiAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJyA/OiBzdHJpbmd8YW55W107ICAgICAvL1RoZSBvdXRsaW5lIGNvbG9yIG9mIHRoZSBmaWxsLiBNYXRjaGVzIHRoZSB2YWx1ZSBvZiBmaWxsLWNvbG9yIGlmIHVuc3BlY2lmaWVkLlxuICAgICdmaWxsLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnZmlsbC10cmFuc2xhdGUtYW5jaG9yJyA6IFwibWFwXCIgfCBcInZpZXdwb3J0XCI7IC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgZmlsbC10cmFuc2xhdGUuXG4gICAgJ2ZpbGwtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgZmlsbHMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWNhcCcgICAgICAgICAgID86IFwiYnV0dFwiIHwgXCJyb3VuZFwiIHwgXCJzcXVhcmVcIjsgLy9UaGUgZGlzcGxheSBvZiBsaW5lIGVuZGluZ3MuXG4gICAgJ2xpbmUtam9pbicgICAgICAgICAgPzogIFwiYmV2ZWxcIiB8IFwicm91bmRcIiB8IFwibWl0ZXJcIiAvL1RoZSBkaXNwbGF5IG9mIGxpbmVzIHdoZW4gam9pbmluZy5cbiAgICAnbGluZS1taXRlci1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IG1pdGVyIGpvaW5zIHRvIGJldmVsIGpvaW5zIGZvciBzaGFycCBhbmdsZXMuXG4gICAgJ2xpbmUtcm91bmQtbGltaXQnICAgPzogbnVtYmVyOyAgICAgLy9Vc2VkIHRvIGF1dG9tYXRpY2FsbHkgY29udmVydCByb3VuZCBqb2lucyB0byBtaXRlciBqb2lucyBmb3Igc2hhbGxvdyBhbmdsZXMuXG4gICAgJ2xpbmUtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBhdCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLWNvbG9yJyAgICAgICAgID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGxpbmUgd2lsbCBiZSBkcmF3bi5cbiAgICAnbGluZS10cmFuc2xhdGUnICAgICA/OiBudW1iZXJbXTsgICAvL1RoZSBnZW9tZXRyeSdzIG9mZnNldC4gVmFsdWVzIGFyZSBbeCwgeV0gd2hlcmUgbmVnYXRpdmVzIGluZGljYXRlIGxlZnQgYW5kIHVwLCByZXNwZWN0aXZlbHkuXG4gICAgJ2xpbmUtdHJhbnNsYXRlLWFuY2hvcicgPzogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgIC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgbGluZS10cmFuc2xhdGUuXG4gICAgJ2xpbmUtd2lkdGgnICAgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9TdHJva2UgdGhpY2tuZXNzLlxuICAgICdsaW5lLWdhcC13aWR0aCcgICAgID86IG51bWJlcjsgICAgIC8vRHJhd3MgYSBsaW5lIGNhc2luZyBvdXRzaWRlIG9mIGEgbGluZSdzIGFjdHVhbCBwYXRoLiBWYWx1ZSBpbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBpbm5lciBnYXAuXG4gICAgJ2xpbmUtb2Zmc2V0JyAgICAgICAgPzogbnVtYmVyOyAgICAgLy9UaGUgbGluZSdzIG9mZnNldC4gRm9yIGxpbmVhciBmZWF0dXJlcywgYSBwb3NpdGl2ZSB2YWx1ZSBvZmZzZXRzIHRoZSBsaW5lIHRvIHRoZSByaWdodCwgcmVsYXRpdmUgdG8gdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGluZSwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgdG8gdGhlIGxlZnQuIEZvciBwb2x5Z29uIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gaW5zZXQsIGFuZCBhIG5lZ2F0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gb3V0c2V0LlxuICAgICdsaW5lLWJsdXInICAgICAgICAgID86IG51bWJlcjsgICAgIC8vQmx1ciBhcHBsaWVkIHRvIHRoZSBsaW5lLCBpbiBwaXhlbHMuXG4gICAgJ2xpbmUtZGFzaGFycmF5JyAgICAgPzogbnVtYmVyW107ICAgLy9TcGVjaWZpZXMgdGhlIGxlbmd0aHMgb2YgdGhlIGFsdGVybmF0aW5nIGRhc2hlcyBhbmQgZ2FwcyB0aGF0IGZvcm0gdGhlIGRhc2ggcGF0dGVybi4gVGhlIGxlbmd0aHMgYXJlIGxhdGVyIHNjYWxlZCBieSB0aGUgbGluZSB3aWR0aC4gVG8gY29udmVydCBhIGRhc2ggbGVuZ3RoIHRvIHBpeGVscywgbXVsdGlwbHkgdGhlIGxlbmd0aCBieSB0aGUgY3VycmVudCBsaW5lIHdpZHRoLiBOb3RlIHRoYXQgR2VvSlNPTiBzb3VyY2VzIHdpdGggbGluZU1ldHJpY3M6IHRydWUgc3BlY2lmaWVkIHdvbid0IHJlbmRlciBkYXNoZWQgbGluZXMgdG8gdGhlIGV4cGVjdGVkIHNjYWxlLiBBbHNvIG5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgbGluZXMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1ncmFkaWVudCcgICAgICA/OiBzdHJpbmc7ICAgICAvL0RlZmluZXMgYSBncmFkaWVudCB3aXRoIHdoaWNoIHRvIGNvbG9yIGEgbGluZSBmZWF0dXJlLiBDYW4gb25seSBiZSB1c2VkIHdpdGggR2VvSlNPTiBzb3VyY2VzIHRoYXQgc3BlY2lmeSBcImxpbmVNZXRyaWNzXCI6IHRydWUuXG4gICAgLy9UT0RPIHN5bWJvbHNcbn1cblxuXG5cblxuXG5cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZhbHVhdGFibGUgZXhwcmVzc2lvbiBhc3NvY2lhdGVkIHdpdGggYSBsYXllciBzdHlsZSxcbiAqIGZvbGxvd2luZyBNYXBCb3ggU3R5bGUgU3BlYyBmb3JtYXQuXG4gKiBFeHByZXNzaW9ucyBhcmUgYXJyYXlzIG9mOlxuICogICAtIG9wZXJhdG9yIGtleSAoJ2dldCcsICc9PScsICdoYXMnLCBldGMpXG4gKiAgIC0gYW55IG51bWJlciBvZiBwYXJhbWV0ZXJzIGluY2x1ZGluZyBuZXN0ZWQgZXhwcmVzc2lvbnNcbiAqXG4gKiAgRXhhbXBsZXM6XG4gKlxuICogIFsgJ2hhcycsICdwcm9wZXJ0eU5hbWUnIF0gICAvLyBzaW1wbGUgZXhwcmVzc2lvbiBjaGVja2luZyBmb3IgZXhpc3RhbmNlIG9mIGEgc3BlY2lmaWMgZmVhdHVyZSBwcm9wZXJ0eVxuICpcbiAqICBbXG4gKiAgICAnPT0nICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoZXF1YWxpdHkgY29tcGFyaXNvbilcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eUEnIF0sICAgLy8gbmVzdGVkIGV4cHJlc3Npb24gdG8gZXh0cmFjdCBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdleHBlY3RlZFZhbHVlJyAgICAgICAgICAgLy8gdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiAgXVxuICpcbiAqICBbXG4gKiAgICAnbWF0Y2gnLCAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG9mIGV4cHJlc3Npb24gKCdzd2l0Y2gnIHN0YXRlbWVudClcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eU5hbWUnIF0sIC8vIGZpcnN0IHBhcmFtIGlzIGFub3RoZXIgZXhwcmVzc2lvbiB0byBleHRyYWN0IGEgZmVhdHVyZSdzIHByb3BlcnR5IHZhbHVlXG4gKiAgICAnQScsICd2YWx1ZUZvckEnLCAgICAgICAgICAvLyBuZXh0IHR3byBwYXJhbXMgYXJlIGZpcnN0ICdjYXNlJyBvZiBcInN3aXRjaFwiXG4gKiAgICAnQicsICd2YWx1ZUZvckInLCAgICAgICAgICAvLyBzZWNvbmQgJ2Nhc2UnIGZvciAnc3dpdGNoJ1xuICogICAgJ2ZhbGxiYWNrVmFsdWUnICAgICAgICAgICAgLy8gZGVmYXVsdCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgXVxuICpcbiAqL1xuY2xhc3MgRXhwcmVzc2lvbiB7XG5cbiAgICBwcml2YXRlIG9wZXJhdG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBhcmdzID86IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IoIGZpbHRlciA6IGFueVtdICkge1xuICAgICAgICBsZXQgYXJyID0gZmlsdGVyLnNsaWNlKDApO1xuICAgICAgICB0aGlzLm9wZXJhdG9yID0gYXJyWzBdO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcnIuc3BsaWNlKDEpLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KCBhcmcgKSA/IG5ldyBFeHByZXNzaW9uKCBhcmcgKSA6IGFyZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIHJlc3VsdCBvZiB0aGUgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIGV2YWx1YXRlKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcgKSA6IGFueSB7XG4gICAgICAgIGxldCBwMSwgcDI7XG4gICAgICAgIHN3aXRjaCh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlICdnZXQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgY2FzZSAnaGFzJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgIGNhc2UgJyFoYXMnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISggdHlwZW9mKHAxKSAhPT0gJ3VuZGVmaW5lZCcgJiYgcDEgaW4gcHJvcGVydGllcyk7XG4gICAgICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ID09ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID09IHAyO1xuICAgICAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYENvbXBhcmluZyAke3AxfSAhPSAke3AyfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSAhPSBwMjtcbiAgICAgICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID4gcDI7XG4gICAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA8IHAyO1xuICAgICAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID49IHAyO1xuICAgICAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDw9IHAyO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwMSk7XG4gICAgICAgICAgICBjYXNlICdhdCcgOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZihwMSkgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkocDIpICYmXG4gICAgICAgICAgICAgICAgICAgIHAyLmxlbmd0aCA+PSBwMSA/IHAyW3AxXSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNhc2UgJ3pvb20nOiByZXR1cm4gem9vbTtcbiAgICAgICAgICAgIGNhc2UgJ2lkJzogcmV0dXJuIHByb3BlcnRpZXMuaWQ7XG4gICAgICAgICAgICBjYXNlICdnZW9tZXRyeS10eXBlJzogcmV0dXJuIGdlb21ldHJ5VHlwZTtcbiAgICAgICAgICAgIGNhc2UgJ21hdGNoJyA6ICAvL3dvcmtzIGxpa2UgYSBzd2l0Y2ggc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE1hdGNoKHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIG9mIHRoZSBhcmd1bWVudCAod2hpY2ggbWF5IGJlIHJlc3VsdCBvZiBhbiBleHByZXNzaW9uKVxuICAgICAqL1xuICAgIGdldEFyZyhpbmRleCA6IG51bWJlciwgcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuYXJnc1tpbmRleF07XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZS5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvL2FyZyBpcyBhIG5lc3RlZCBleHByZXNzaW9uLi4uXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcblxuICAgICAgICB9IGVsc2UgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKSA9PT0gJ3N0cmluZycgJiYgcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vYXJnIGlzIGEgcHJvcGVydHkgbmFtZSBpbnN0ZWFkIG9mIGEgbmVzdGVkIGV4cHJlc3Npb24uLi5cbiAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBtYXRjaGluZyBjb25kaXRpb24gb2YgZXhwcmVzc2lvbiwgb3IgZmFsbGJhY2sgdmFsdWVcbiAgICAgKi9cbiAgICBmaW5kTWF0Y2goIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGwsIGVuZCA9IHRoaXMuYXJncy5sZW5ndGgtMTtcblxuICAgICAgICAvL3RoZSBpbnB1dCB2YWx1ZSB0byB0ZXN0IGFnYWluc3RcbiAgICAgICAgLy8gIC4uLiBzaG91bGQgYmUgdmFsdWUgb2YgSW5wdXQgcG9ydGlvbiAoaWUsIFwiTGFrZVwiIGZvciB3ZXRsYW5kcylcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJFeHByZXNzaW9uLm1hdGNoIC0gXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKTtcblxuICAgICAgICAvL2ZpbmQgdmFsdWUgaW5zaWRlIHJlbWFpbmluZyBhcmdzIHRvIGFzc2lnbiBzdHlsZSBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZVxuICAgICAgICB0aGlzLmFyZ3MuZm9yRWFjaCggKGFyZyxpKSA9PiB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZmlyc3QgYXJnIChzZWUgYWJvdmUpIGFuZCBsYXN0IGFyZyAoaXQncyB0aGUgZmFsbGJhY2sgdmFsdWUpXG4gICAgICAgICAgICAvLyBhbHNvIHNraXAgaWYgd2UndmUgYWxyZWFkeSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICBpZiggcmVzdWx0ICE9PSBudWxsIHx8IGkgPT09IDAgfHwgaSA9PT0gZW5kKSByZXR1cm47XG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheShhcmcpICkgeyAgICAgICAgICAvL2FycmF5IG9mIGxpdGVyYWwgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYofmFyZy5pbmRleE9mKCB2YWx1ZSApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYXJnc1tpKzFdOyAgICAvL21hdGNoLCByZXR1cm4gbmV4dCB2YWx1ZSBpbiBhcnJheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiggYXJnID09IHZhbHVlICl7ICAgICAgLy9saXRlcmFsIHZhbHVlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZighcmVzdWx0KSByZXN1bHQgPSB0aGlzLmFyZ3NbZW5kXTsgLy9sYXN0IGFyZyBpcyBhbHdheXMgZmFsbGJhY2sgdmFsdWVcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYXRjaCByZXR1cm5lZDogXCIgKyByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMub3BlcmF0b3JdLmNvbmNhdChcbiAgICAgICAgICAgIHRoaXMuYXJncy5tYXAoIGFyZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YoYXJnLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpID8gYXJnLnRvU3RyaW5nKCkgOiBhcmc7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLmpvaW4oJywnKTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gc3R5bGUgTWFwQm94IFN0eWxlIGRlZmluaXRpb25cbiAqIEByZXR1cm4gb2JqZWN0IGFzc29jaWF0aW5nIExlYWZsZXQgc3R5bGVzIHdpdGggbGF5ZXIgaWRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlTWFwQm94U3R5bGUoIHN0eWxlRGVmIDogTWFwQm94U3R5bGUgKSA6IHsgW2tleTpzdHJpbmddOkxlYWZsZXRTdHlsZU1hcCB9IHtcblxuICAgIC8vVE9ETyB2YWxpZGF0ZSBzdHlsZURlZi52ZXJzaW9uIHRvIG1ha2Ugc3VyZSB3ZSBhcmUgcGFyc2luZyBzb21ldGhpbmcgd2UgdW5kZXJzdGFuZFxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQYXJzaW5nIE1hcEJveCBTdHlsZVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdHlsZURlZiwgbnVsbCwgJyAnKSk7XG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAgIGlmKCAhc3R5bGVEZWYubGF5ZXJzIHx8ICFBcnJheS5pc0FycmF5KHN0eWxlRGVmLmxheWVycykgfHwgIXN0eWxlRGVmLmxheWVycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdHlsZSBoYXMgbm8gbGF5ZXIgZGVmaW5pdGlvbnNcIik7XG4gICAgICAgIHJldHVybiB7fTsgICAvL2VtcHR5IHN0eWxlc1xuICAgIH1cblxuICAgIC8vaGF2ZSB0byBncm91cCBsYXllcnMgd2l0aCBzYW1lIGlkIGJ1dCB3aXRoIGRpZmZlcmVudCBmaWx0ZXJzIHVuZGVyIHRoZSBzYW1lIHN0eWxlIGZ1bmN0aW9uXG4gICAgbGV0IGxheWVycyA9IHt9O1xuICAgIHN0eWxlRGVmLmxheWVycy5mb3JFYWNoKCBsYXllciA9PiB7XG4gICAgICAgIC8vdXNlIHNvdXJjZS1sYXllciBrZXkgZmlyc3QsIGZhbGxiYWNrIHRvIGxheWVyIGlkXG4gICAgICAgIGxldCBpZCA9IChsYXllclsnc291cmNlLWxheWVyJ10gfHwgbGF5ZXIuaWQpLnRyaW0oKTtcbiAgICAgICAgaWYobGF5ZXJzW2lkXSkgbGF5ZXJzW2lkXS5wdXNoKGxheWVyKTsgIC8vbGF5ZXIgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgZWxzZSBsYXllcnNbaWRdID0gW2xheWVyXTsgICAgICAgICAgICAgIC8vbmV3IGxheWVyJ3Mgc3R5bGVcbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShsYXllcnMsIG51bGwsICcgJykpO1xuXG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGxheWVycykuZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICBsZXQgc3R5bGVzID0gbGF5ZXJzW2lkXTsgICAgLy9hcnJheSBvZiAxIG9yIG1vcmUgZm9yIGdpdmVuIGlkIChkaWZmZXJlbnRpYXRlZCBieSBmaWx0ZXJzKVxuICAgICAgICByZXN1bHRbaWRdID0gc3R5bGVGdW5jdGlvbkZhY3Rvcnkoc3R5bGVzLCBzdHlsZURlZik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb25GYWN0b3J5KFxuICAgIGxheWVyU3R5bGVzIDogTWFwQm94U3R5bGVMYXllcltdLCBzdHlsZURlZiA6IE1hcEJveFN0eWxlXG4pIDogRnVuY3Rpb24ge1xuXG4gICAgbGV0IHN0eWxlcyA9IGxheWVyU3R5bGVzLm1hcCggbGF5ZXJTdHlsZSA9PiBnZXRMYXllclN0eWxlKGxheWVyU3R5bGUsIHN0eWxlRGVmKSApO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tOiBudW1iZXIsIGdlb21UeXBlIDogc3RyaW5nICkge1xuXG4gICAgICAgIGxldCBtYXRjaCA6IGFueSA9IHN0eWxlcy5maW5kKCBzdHlsZSA9PiB7XG4gICAgICAgICAgICBpZihzdHlsZS5maWx0ZXIgJiYgdHlwZW9mKHN0eWxlLmZpbHRlci5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTdHlsZSBoYXMgYSBmaWx0ZXIuLi4gXCIgKyBzdHlsZS5maWx0ZXIudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gc3R5bGUuZmlsdGVyLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21UeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBpZighZm91bmQpIGNvbnNvbGUubG9nKFwiRmlsdGVyIGRvZXMgbm90IG1hdGNoXCIpO1xuICAgICAgICAgICAgICAgIC8vIGVsc2UgY29uc29sZS5sb2coXCJGaWx0ZXIgbWF0Y2hlc1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBpZihtYXRjaCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMobWF0Y2guc3R5bGUpLmZvckVhY2goIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlVmFsID0gbWF0Y2guc3R5bGVba2V5XTtcbiAgICAgICAgICAgICAgICBpZiggc3R5bGVWYWwgJiYgdHlwZW9mKHN0eWxlVmFsLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc3R5bGVWYWwuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpO1xuICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBzdHlsZVZhbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXYXJuaW5nLCBubyBzdHlsZSBmb3VuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbn1cblxuXG5cbi8qKlxuICogQHBhcmFtICBsYXllclN0eWxlIE1hcEJveCBTdHlsZSBTcGVjIExheWVyIGRlZmluaXRpb25cbiAqIEBwYXJhbSAgc3R5bGVEZWYgTWFwQm94IFN0eWxlIGRvY3VtZW50XG4gKiBAcmV0dXJuIEZ1bmN0aW9uIGFjY2VwdGluZyBmZWF0dXJlIHByb3BlcnRpZXMsIHpvb20gbGV2ZWwsIGFuZCBnZW9tZXRyeSB0eXBlIGFuZCByZXR1cm5pbmcgYSBMZWFmbGV0IHN0eWxlIG9iamVjdFxuICovXG5mdW5jdGlvbiBnZXRMYXllclN0eWxlKCBsYXllclN0eWxlIDogTWFwQm94U3R5bGVMYXllciwgc3R5bGVEZWY6IE1hcEJveFN0eWxlICkge1xuXG4gICAgbGV0IHBhcnNlVmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlIDogYW55LCBmYWxsYmFjayA/OiBhbnkgKSB7XG4gICAgICAgIGlmKCB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHJlc3Npb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZSkgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxsYmFjayB8fCBudWxsO1xuICAgIH1cblxuXG4gICAgbGV0IGxheWVyUGFpbnQgOiBNYXBCb3hQYWludCAgPSBsYXllclN0eWxlLnBhaW50O1xuICAgIGxldCBsaW5lV2lkdGggICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtd2lkdGgnXSwgMSk7XG4gICAgbGV0IG9wYWNpdHkgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGNvbG9yICAgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnZmlsbC1vdXRsaW5lLWNvbG9yJ10gfHwgbGF5ZXJQYWludFsnZmlsbC1jb2xvciddLCAnIzAwMCcpO1xuICAgIGxldCBmaWxsT3BhY2l0eSA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtb3BhY2l0eSddIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtb3BhY2l0eSddLCAxLjApO1xuICAgIGxldCBmaWxsQ29sb3IgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtY29sb3InXSAgIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtY29sb3InXSwgJ3RyYW5zcGFyZW50Jyk7XG4gICAgbGV0IGZpbGxQYXR0ZXJuID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnZmlsbC1wYXR0ZXJuJ10gKTtcblxuICAgIGlmKGZpbGxQYXR0ZXJuICYmIHN0eWxlRGVmLnNwcml0ZUpTT04gJiYgc3R5bGVEZWYuc3ByaXRlSlNPTltmaWxsUGF0dGVybl0pIHtcbiAgICAgICAgbGV0IHBpZCA9IGZpbGxQYXR0ZXJuLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFwtL2csJycpLnJlcGxhY2UoL1xcXFwvZywnJykucmVwbGFjZSgvXFwvL2csJycpLnJlcGxhY2UoL1xccysvZywnJyk7XG4gICAgICAgIC8vZmlsbCB1c2VzIHNwcml0ZSByZWZlcmVuY2VkIGJ5IHRoZSBzdHlsZSBkb2NcbiAgICAgICAgLy8gKGZpbGxQYXR0ZXJuIHZhbHVlIGlzIHRoZSBrZXkgb2YgdGhlIHNwcml0ZSBlbnRyeSlcbiAgICAgICAgbGV0IHBhdHRlcm4gPSBzdHlsZURlZi5zcHJpdGVKU09OW2ZpbGxQYXR0ZXJuXTtcbiAgICAgICAgZmlsbFBhdHRlcm4gPSBPYmplY3QuYXNzaWduKHsgaWQ6IHBpZCwgdXJsOiBzdHlsZURlZi5zcHJpdGVVUkwgfSwgcGF0dGVybik7XG4gICAgfVxuXG4gICAgbGV0IHN0eWxlIDogTGVhZmxldFN0eWxlID0ge1xuICAgICAgICBjb2xvciAgICAgICA6IGNvbG9yLCAgICAgICAgIC8vc3Ryb2tlIGNvbG9yXG4gICAgICAgIG9wYWNpdHkgICAgIDogb3BhY2l0eSwgICAgICAgLy9zdHJva2Ugb3BhY2l0eVxuICAgICAgICB3ZWlnaHQgICAgICA6IGxpbmVXaWR0aCwgICAgIC8vc3Ryb2tlIHNpemVcbiAgICAgICAgZmlsbE9wYWNpdHkgOiBmaWxsT3BhY2l0eSwgICAvL2ZpbGwgb3BhY2l0eVxuICAgICAgICBmaWxsQ29sb3IgICA6IGZpbGxDb2xvciwgICAgIC8vZmlsbCBjb2xvclxuICAgICAgICBmaWxsUGF0dGVybiA6IGZpbGxQYXR0ZXJuXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlcjogcGFyc2VWYWx1ZShsYXllclN0eWxlLmZpbHRlciksXG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgIH07XG59XG4iXX0=