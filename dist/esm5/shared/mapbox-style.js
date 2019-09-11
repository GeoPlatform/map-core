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
var /**
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
Expression = /** @class */ (function () {
    function Expression(filter) {
        /** @type {?} */
        var arr = filter.slice(0);
        this.operator = arr[0];
        this.args = arr.splice(1).map((/**
         * @param {?} arg
         * @return {?}
         */
        function (arg) {
            return Array.isArray(arg) ? new Expression(arg) : arg;
        }));
    }
    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value result of the expression
     */
    /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value result of the expression
     */
    Expression.prototype.evaluate = /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value result of the expression
     */
    function (properties, zoom, geometryType) {
        /** @type {?} */
        var p1;
        /** @type {?} */
        var p2;
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
    };
    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value of the argument (which may be result of an expression)
     */
    /**
     * @param {?} index
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value of the argument (which may be result of an expression)
     */
    Expression.prototype.getArg = /**
     * @param {?} index
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value of the argument (which may be result of an expression)
     */
    function (index, properties, zoom, geometryType) {
        /** @type {?} */
        var value = this.args[index];
        if (value && typeof (value.evaluate) !== 'undefined') {
            //arg is a nested expression...
            return value.evaluate(properties, zoom, geometryType);
        }
        else if (value && typeof (value) === 'string' && properties.hasOwnProperty(value)) {
            //arg is a property name instead of a nested expression...
            return properties[value];
        }
        return value;
    };
    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value associated with matching condition of expression, or fallback value
     */
    /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value associated with matching condition of expression, or fallback value
     */
    Expression.prototype.findMatch = /**
     * @param {?} properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param {?} zoom - zoom level of the map
     * @param {?} geometryType - type of geometry for the specific feature instance being evaluated
     * @return {?} value associated with matching condition of expression, or fallback value
     */
    function (properties, zoom, geometryType) {
        var _this = this;
        /** @type {?} */
        var result = null;
        /** @type {?} */
        var end = this.args.length - 1;
        //the input value to test against
        //  ... should be value of Input portion (ie, "Lake" for wetlands)
        /** @type {?} */
        var value = this.getArg(0, properties, zoom, geometryType);
        // console.log("Expression.match - " + JSON.stringify(value) );
        //find value inside remaining args to assign style associated with that value
        this.args.forEach((/**
         * @param {?} arg
         * @param {?} i
         * @return {?}
         */
        function (arg, i) {
            // ignore first arg (see above) and last arg (it's the fallback value)
            // also skip if we've already found a match
            if (result !== null || i === 0 || i === end)
                return;
            if (Array.isArray(arg)) { //array of literal values
                if (~arg.indexOf(value)) {
                    result = _this.args[i + 1]; //match, return next value in array
                }
            }
            else if (arg == value) { //literal value
                result = _this.args[i + 1]; //match, return next value in array
            }
        }));
        if (!result)
            result = this.args[end]; //last arg is always fallback value
        // console.log("Match returned: " + result);
        return result;
    };
    /**
     * @return {?}
     */
    Expression.prototype.toString = /**
     * @return {?}
     */
    function () {
        return [this.operator].concat(this.args.map((/**
         * @param {?} arg
         * @return {?}
         */
        function (arg) {
            return (typeof (arg.evaluate) !== 'undefined') ? arg.toString() : arg;
        }))).join(',');
    };
    return Expression;
}());
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
    var layers = {};
    styleDef.layers.forEach((/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        //use source-layer key first, fallback to layer id
        /** @type {?} */
        var id = (layer['source-layer'] || layer.id).trim();
        if (layers[id])
            layers[id].push(layer); //layer already exists
        else
            layers[id] = [layer]; //new layer's style
    }));
    // console.log(JSON.stringify(layers, null, ' '));
    /** @type {?} */
    var result = {};
    Object.keys(layers).forEach((/**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var styles = layers[id];
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
    var styles = layerStyles.map((/**
     * @param {?} layerStyle
     * @return {?}
     */
    function (layerStyle) { return getLayerStyle(layerStyle, styleDef); }));
    return (/**
     * @param {?} properties
     * @param {?} zoom
     * @param {?} geomType
     * @return {?}
     */
    function (properties, zoom, geomType) {
        /** @type {?} */
        var match = styles.find((/**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            if (style.filter && typeof (style.filter.evaluate) !== 'undefined') {
                // console.log("Style has a filter... " + style.filter.toString());
                /** @type {?} */
                var found = style.filter.evaluate(properties, zoom, geomType);
                // if(!found) console.log("Filter does not match");
                // else console.log("Filter matches");
                return found;
            }
            return true;
        }));
        /** @type {?} */
        var result = {};
        if (match) {
            Object.keys(match.style).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var styleVal = match.style[key];
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
    var parseValue = (/**
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
    var layerPaint = layerStyle.paint;
    /** @type {?} */
    var lineWidth = parseValue(layerPaint['line-width'], 1);
    /** @type {?} */
    var opacity = parseValue(layerPaint['line-opacity'], 1.0);
    /** @type {?} */
    var color = parseValue(layerPaint['line-color'] || layerPaint['fill-outline-color'] || layerPaint['fill-color'], '#000');
    /** @type {?} */
    var fillOpacity = parseValue(layerPaint['fill-opacity'] || layerPaint['background-opacity'], 1.0);
    /** @type {?} */
    var fillColor = parseValue(layerPaint['fill-color'] || layerPaint['background-color'], 'transparent');
    /** @type {?} */
    var fillPattern = parseValue(layerPaint['fill-pattern']);
    if (fillPattern && styleDef.spriteJSON && styleDef.spriteJSON[fillPattern]) {
        /** @type {?} */
        var pid = fillPattern.toLowerCase().replace(/\-/g, '').replace(/\\/g, '').replace(/\//g, '').replace(/\s+/g, '');
        //fill uses sprite referenced by the style doc
        // (fillPattern value is the key of the sprite entry)
        /** @type {?} */
        var pattern = styleDef.spriteJSON[fillPattern];
        fillPattern = Object.assign({ id: pid, url: styleDef.spriteURL }, pattern);
    }
    /** @type {?} */
    var style = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyQkFRQzs7O0lBUEcsOEJBQXNCOztJQUN0QiwrQkFBc0I7O0lBQ3RCLDZCQUFzQjs7SUFDdEIsaUNBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLGlDQUFzQjs7SUFDdEIsbUNBQW1COzs7OztBQUd2Qiw4QkFFQzs7OztBQUVELDBCQWlCQzs7O0lBaEJHLDhCQUFzQjs7SUFDdEIsMkJBQXNCOztJQUN0QiwrQkFBbUI7O0lBQ25CLDZCQUF3Qjs7SUFDeEIsMkJBQXNCOztJQUN0Qiw4QkFBc0I7O0lBQ3RCLDRCQUFzQjs7SUFDdEIsNEJBQW1COztJQUNuQiw4QkFBcUI7O0lBQ3JCLDZCQUFzQjs7SUFDdEIsNkJBQXNCOztJQUN0QixpQ0FBbUI7O0lBQ25CLDZCQUFrQzs7SUFFbEMsaUNBQW1COztJQUNuQixnQ0FBc0I7Ozs7O0FBRzFCLCtCQVdDOzs7SUFWRyw4QkFBeUI7O0lBQ3pCLGdDQUErSDs7SUFDL0gsb0NBQXNCOztJQUN0QixrQ0FBeUI7Ozs7SUFFekIsbUNBQXlCOztJQUN6QixtQ0FBeUI7O0lBQ3pCLGtDQUFzQjs7SUFDdEIsa0NBQXNCOztJQUN0QixpQ0FBOEI7Ozs7O0FBR2xDLDBCQTRCQzs7O0lBM0JHLGlDQUEyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkQvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBS0ksb0JBQWEsTUFBYzs7WUFDbkIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FB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LENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7O1lBQ25FLEdBQUcsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUM7Ozs7WUFHeEcsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzlDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlFOztRQUVHLEtBQUssR0FBa0I7UUFDdkIsS0FBSyxFQUFTLEtBQUs7O1FBQ25CLE9BQU8sRUFBTyxPQUFPOztRQUNyQixNQUFNLEVBQVEsU0FBUzs7UUFDdkIsV0FBVyxFQUFHLFdBQVc7O1FBQ3pCLFNBQVMsRUFBSyxTQUFTOztRQUN2QixXQUFXLEVBQUcsV0FBVztLQUM1QjtJQUVELE9BQU87UUFDSCxNQUFNLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDckMsS0FBSyxFQUFFLEtBQUs7S0FDZixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZSB7XG4gICAgd2VpZ2h0ICAgICAgPzogbnVtYmVyO1xuICAgIG9wYWNpdHkgICAgID86IG51bWJlcjtcbiAgICBjb2xvciAgICAgICA/OiBzdHJpbmc7XG4gICAgZGFzaEFycmF5ICAgPzogbnVtYmVyW107XG4gICAgZmlsbE9wYWNpdHkgPzogbnVtYmVyO1xuICAgIGZpbGxDb2xvciAgID86IHN0cmluZztcbiAgICBmaWxsUGF0dGVybiA/OiBhbnk7IC8vY3VzdG9tIGV4dGVuc2lvbiBmb3Igc3ByaXRlIGZpbGwgcGF0dGVybnNcbn1cblxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZU1hcCB7XG4gICAgW2tleTpzdHJpbmddOiBGdW5jdGlvbiB8IExlYWZsZXRTdHlsZVxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGUge1xuICAgIHZlcnNpb24gICAgICA6IG51bWJlcjsgIC8vU3R5bGUgc3BlY2lmaWNhdGlvbiB2ZXJzaW9uIG51bWJlci4gTXVzdCBiZSA4LlxuICAgIG5hbWUgICAgICAgID86IHN0cmluZzsgIC8vQSBodW1hbi1yZWFkYWJsZSBuYW1lIGZvciB0aGUgc3R5bGUuXG4gICAgbWV0YWRhdGEgICAgPzogYW55OyAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgc3R5bGVzaGVldCwgYnV0IGRvIG5vdCBpbmZsdWVuY2UgcmVuZGVyaW5nLiBQcm9wZXJ0aWVzIHNob3VsZCBiZSBwcmVmaXhlZCB0byBhdm9pZCBjb2xsaXNpb25zLCBsaWtlICdtYXBib3g6Jy5cbiAgICBjZW50ZXIgICAgICA/OiBudW1iZXJbXTsgLy9EZWZhdWx0IG1hcCBjZW50ZXIgaW4gbG9uZ2l0dWRlIGFuZCBsYXRpdHVkZS4gVGhlIHN0eWxlIGNlbnRlciB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIHpvb20gICAgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCB6b29tIGxldmVsLiBUaGUgc3R5bGUgem9vbSB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIGJlYXJpbmcgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCBiZWFyaW5nLCBpbiBkZWdyZWVzLiBUaGUgYmVhcmluZyBpcyB0aGUgY29tcGFzcyBkaXJlY3Rpb24gdGhhdCBpcyBcInVwXCI7IGZvciBleGFtcGxlLCBhIGJlYXJpbmcgb2YgOTDCsCBvcmllbnRzIHRoZSBtYXAgc28gdGhhdCBlYXN0IGlzIHVwLiBUaGlzIHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgcGl0Y2ggICAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IHBpdGNoLCBpbiBkZWdyZWVzLiBaZXJvIGlzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIHN1cmZhY2UsIGZvciBhIGxvb2sgc3RyYWlnaHQgZG93biBhdCB0aGUgbWFwLCB3aGlsZSBhIGdyZWF0ZXIgdmFsdWUgbGlrZSA2MCBsb29rcyBhaGVhZCB0b3dhcmRzIHRoZSBob3Jpem9uLiBUaGUgc3R5bGUgcGl0Y2ggd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBsaWdodCAgICAgICA/OiBhbnk7ICAgICAvL1RoZSBnbG9iYWwgbGlnaHQgc291cmNlLlxuICAgIHNvdXJjZXMgICAgID86IGFueVtdOyAgIC8vRGF0YSBzb3VyY2Ugc3BlY2lmaWNhdGlvbnMuXG4gICAgc3ByaXRlICAgICAgPzogc3RyaW5nOyAgLy9BIGJhc2UgVVJMIGZvciByZXRyaWV2aW5nIHRoZSBzcHJpdGUgaW1hZ2UgYW5kIG1ldGFkYXRhLiBUaGUgZXh0ZW5zaW9ucyAucG5nLCAuanNvbiBhbmQgc2NhbGUgZmFjdG9yIEAyeC5wbmcgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFwcGVuZGVkLiBUaGlzIHByb3BlcnR5IGlzIHJlcXVpcmVkIGlmIGFueSBsYXllciB1c2VzIHRoZSBiYWNrZ3JvdW5kLXBhdHRlcm4sIGZpbGwtcGF0dGVybiwgbGluZS1wYXR0ZXJuLCBmaWxsLWV4dHJ1c2lvbi1wYXR0ZXJuLCBvciBpY29uLWltYWdlIHByb3BlcnRpZXMuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICBnbHlwaHMgICAgICA/OiBzdHJpbmc7ICAvL0EgVVJMIHRlbXBsYXRlIGZvciBsb2FkaW5nIHNpZ25lZC1kaXN0YW5jZS1maWVsZCBnbHlwaCBzZXRzIGluIFBCRiBmb3JtYXQuIFRoZSBVUkwgbXVzdCBpbmNsdWRlIHtmb250c3RhY2t9IGFuZCB7cmFuZ2V9IHRva2Vucy4gVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpZiBhbnkgbGF5ZXIgdXNlcyB0aGUgdGV4dC1maWVsZCBsYXlvdXQgcHJvcGVydHkuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICB0cmFuc2l0aW9uICA/OiBhbnk7ICAgICAvL0EgZ2xvYmFsIHRyYW5zaXRpb24gZGVmaW5pdGlvbiB0byB1c2UgYXMgYSBkZWZhdWx0IGFjcm9zcyBwcm9wZXJ0aWVzLCB0byBiZSB1c2VkIGZvciB0aW1pbmcgdHJhbnNpdGlvbnMgYmV0d2VlbiBvbmUgdmFsdWUgYW5kIHRoZSBuZXh0IHdoZW4gbm8gcHJvcGVydHktc3BlY2lmaWMgdHJhbnNpdGlvbiBpcyBzZXQuIENvbGxpc2lvbi1iYXNlZCBzeW1ib2wgZmFkaW5nIGlzIGNvbnRyb2xsZWQgaW5kZXBlbmRlbnRseSBvZiB0aGUgc3R5bGUncyB0cmFuc2l0aW9uIHByb3BlcnR5LlxuICAgIGxheWVycyAgICAgID86IE1hcEJveFN0eWxlTGF5ZXJbXTsgICAvL0xheWVycyB3aWxsIGJlIGRyYXduIGluIHRoZSBvcmRlciBvZiB0aGlzIGFycmF5LlxuXG4gICAgc3ByaXRlSlNPTiAgPzogYW55OyAgICAgLy9jdXN0b20gZXh0ZW5zaW9uIG9mIHBhcnNlZCBzcHJpdGUgSlNPTiBkZWZpbml0aW9uXG4gICAgc3ByaXRlVVJMICAgPzogc3RyaW5nOyAgLy9jdXN0b20gZXh0ZW5zaW9uIG9mIHNwcml0ZSBJTUcgVVJMXG59XG5cbmludGVyZmFjZSBNYXBCb3hTdHlsZUxheWVyIHtcbiAgICBpZCAgICAgICAgICAgICAgOiBzdHJpbmc7ICAgICAgLy9VbmlxdWUgbGF5ZXIgbmFtZS5cbiAgICB0eXBlICAgICAgICAgICAgOiBcImZpbGxcIiB8IFwibGluZVwiIHwgXCJzeW1ib2xcIiB8IFwiY2lyY2xlXCIgfCBcImhlYXRtYXBcIiB8IFwiZmlsbC1leHRydXNpb25cIiB8IFwicmFzdGVyXCIgfCBcImhpbGxzaGFkZVwiIHwgXCJiYWNrZ3JvdW5kXCI7IC8vUmVuZGVyaW5nIHR5cGUgb2YgdGhpcyBsYXllci5cbiAgICBtZXRhZGF0YSAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgbGF5ZXIsIGJ1dCBkbyBub3QgaW5mbHVlbmNlIHJlbmRlcmluZy4gUHJvcGVydGllcyBzaG91bGQgYmUgcHJlZml4ZWQgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSAnbWFwYm94OicuXG4gICAgc291cmNlICAgICAgICAgPzogc3RyaW5nOyAgICAgIC8vTmFtZSBvZiBhIHNvdXJjZSBkZXNjcmlwdGlvbiB0byBiZSB1c2VkIGZvciB0aGlzIGxheWVyLiBSZXF1aXJlZCBmb3IgYWxsIGxheWVyIHR5cGVzIGV4Y2VwdCBiYWNrZ3JvdW5kLlxuICAgICdzb3VyY2UtbGF5ZXInID86IHN0cmluZzsgLy9MYXllciB0byB1c2UgZnJvbSBhIHZlY3RvciB0aWxlIHNvdXJjZS4gUmVxdWlyZWQgZm9yIHZlY3RvciB0aWxlIHNvdXJjZXM7IHByb2hpYml0ZWQgZm9yIGFsbCBvdGhlciBzb3VyY2UgdHlwZXMsIGluY2x1ZGluZyBHZW9KU09OIHNvdXJjZXMuXG4gICAgbWluem9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1pbmltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBsZXNzIHRoYW4gdGhlIG1pbnpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBtYXh6b29tICAgICAgICA/OiBudW1iZXI7ICAgICAgLy9UaGUgbWF4aW11bSB6b29tIGxldmVsIGZvciB0aGUgbGF5ZXIuIEF0IHpvb20gbGV2ZWxzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgbWF4em9vbSwgdGhlIGxheWVyIHdpbGwgYmUgaGlkZGVuLlxuICAgIGZpbHRlciAgICAgICAgID86IGFueTsgICAgICAgICAvL0EgZXhwcmVzc2lvbiBzcGVjaWZ5aW5nIGNvbmRpdGlvbnMgb24gc291cmNlIGZlYXR1cmVzLiBPbmx5IGZlYXR1cmVzIHRoYXQgbWF0Y2ggdGhlIGZpbHRlciBhcmUgZGlzcGxheWVkLiBab29tIGV4cHJlc3Npb25zIGluIGZpbHRlcnMgYXJlIG9ubHkgZXZhbHVhdGVkIGF0IGludGVnZXIgem9vbSBsZXZlbHMuIFRoZSBmZWF0dXJlLXN0YXRlIGV4cHJlc3Npb24gaXMgbm90IHN1cHBvcnRlZCBpbiBmaWx0ZXIgZXhwcmVzc2lvbnMuXG4gICAgbGF5b3V0ICAgICAgICAgPzogYW55OyAgICAgICAgIC8vTGF5b3V0IHByb3BlcnRpZXMgZm9yIHRoZSBsYXllci5cbiAgICBwYWludCAgICAgICAgICA/OiBNYXBCb3hQYWludDsgLy9EZWZhdWx0IHBhaW50IHByb3BlcnRpZXMgZm9yIHRoaXMgbGF5ZXIuXG59XG5cbmludGVyZmFjZSBNYXBCb3hQYWludCB7XG4gICAgdmlzaWJpbGl0eSAgICAgICAgICAgPzogXCJ2aXNpYmxlXCIgfCBcIm5vbmVcIjsgICAvL1doZXRoZXIgdGhpcyBsYXllciBpcyBkaXNwbGF5ZWQuXG4gICAgJ2JhY2tncm91bmQtY29sb3InICAgPzogc3RyaW5nOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgYmFja2dyb3VuZCB3aWxsIGJlIGRyYXduLlxuICAgICdiYWNrZ3JvdW5kLXBhdHRlcm4nID86IHN0cmluZzsgICAgIC8vTmFtZSBvZiBpbWFnZSBpbiBzcHJpdGUgdG8gdXNlIGZvciBkcmF3aW5nIGFuIGltYWdlIGJhY2tncm91bmQuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknID86IG51bWJlcjsgICAgIC8vVGhlIG9wYWNpdHkgYXQgd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnZmlsbC1hbnRpYWxpYXMnICAgICA/OiBib29sZWFuOyAgICAvL1doZXRoZXIgb3Igbm90IHRoZSBmaWxsIHNob3VsZCBiZSBhbnRpYWxpYXNlZC5cbiAgICAnZmlsbC1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IG9mIHRoZSBlbnRpcmUgZmlsbCBsYXllci4gSW4gY29udHJhc3QgdG8gdGhlIGZpbGwtY29sb3IsIHRoaXMgdmFsdWUgd2lsbCBhbHNvIGFmZmVjdCB0aGUgMXB4IHN0cm9rZSBhcm91bmQgdGhlIGZpbGwsIGlmIHRoZSBzdHJva2UgaXMgdXNlZC5cbiAgICAnZmlsbC1jb2xvcicgICAgICAgICA/OiBzdHJpbmd8YW55W107ICAvL1RoZSBjb2xvciBvZiB0aGUgZmlsbGVkIHBhcnQgb2YgdGhpcyBsYXllci4gVGhpcyBjb2xvciBjYW4gYmUgc3BlY2lmaWVkIGFzIHJnYmEgd2l0aCBhbiBhbHBoYSBjb21wb25lbnQgYW5kIHRoZSBjb2xvcidzIG9wYWNpdHkgd2lsbCBub3QgYWZmZWN0IHRoZSBvcGFjaXR5IG9mIHRoZSAxcHggc3Ryb2tlLCBpZiBpdCBpcyB1c2VkLlxuICAgICdmaWxsLW91dGxpbmUtY29sb3InID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIG91dGxpbmUgY29sb3Igb2YgdGhlIGZpbGwuIE1hdGNoZXMgdGhlIHZhbHVlIG9mIGZpbGwtY29sb3IgaWYgdW5zcGVjaWZpZWQuXG4gICAgJ2ZpbGwtdHJhbnNsYXRlJyAgICAgPzogbnVtYmVyW107ICAgLy9UaGUgZ2VvbWV0cnkncyBvZmZzZXQuIFZhbHVlcyBhcmUgW3gsIHldIHdoZXJlIG5lZ2F0aXZlcyBpbmRpY2F0ZSBsZWZ0IGFuZCB1cCwgcmVzcGVjdGl2ZWx5LlxuICAgICdmaWxsLXRyYW5zbGF0ZS1hbmNob3InIDogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBmaWxsLXRyYW5zbGF0ZS5cbiAgICAnZmlsbC1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBmaWxscy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgYSBmYWN0b3Igb2YgdHdvICgyLCA0LCA4LCAuLi4sIDUxMikuIE5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtY2FwJyAgICAgICAgICAgPzogXCJidXR0XCIgfCBcInJvdW5kXCIgfCBcInNxdWFyZVwiOyAvL1RoZSBkaXNwbGF5IG9mIGxpbmUgZW5kaW5ncy5cbiAgICAnbGluZS1qb2luJyAgICAgICAgICA/OiAgXCJiZXZlbFwiIHwgXCJyb3VuZFwiIHwgXCJtaXRlclwiIC8vVGhlIGRpc3BsYXkgb2YgbGluZXMgd2hlbiBqb2luaW5nLlxuICAgICdsaW5lLW1pdGVyLWxpbWl0JyAgID86IG51bWJlcjsgICAgIC8vVXNlZCB0byBhdXRvbWF0aWNhbGx5IGNvbnZlcnQgbWl0ZXIgam9pbnMgdG8gYmV2ZWwgam9pbnMgZm9yIHNoYXJwIGFuZ2xlcy5cbiAgICAnbGluZS1yb3VuZC1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IHJvdW5kIGpvaW5zIHRvIG1pdGVyIGpvaW5zIGZvciBzaGFsbG93IGFuZ2xlcy5cbiAgICAnbGluZS1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBsaW5lIHdpbGwgYmUgZHJhd24uXG4gICAgJ2xpbmUtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnbGluZS10cmFuc2xhdGUtYW5jaG9yJyA/OiBcIm1hcFwiIHwgXCJ2aWV3cG9ydFwiOyAgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBsaW5lLXRyYW5zbGF0ZS5cbiAgICAnbGluZS13aWR0aCcgICAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1N0cm9rZSB0aGlja25lc3MuXG4gICAgJ2xpbmUtZ2FwLXdpZHRoJyAgICAgPzogbnVtYmVyOyAgICAgLy9EcmF3cyBhIGxpbmUgY2FzaW5nIG91dHNpZGUgb2YgYSBsaW5lJ3MgYWN0dWFsIHBhdGguIFZhbHVlIGluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGlubmVyIGdhcC5cbiAgICAnbGluZS1vZmZzZXQnICAgICAgICA/OiBudW1iZXI7ICAgICAvL1RoZSBsaW5lJ3Mgb2Zmc2V0LiBGb3IgbGluZWFyIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIG9mZnNldHMgdGhlIGxpbmUgdG8gdGhlIHJpZ2h0LCByZWxhdGl2ZSB0byB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsaW5lLCBhbmQgYSBuZWdhdGl2ZSB2YWx1ZSB0byB0aGUgbGVmdC4gRm9yIHBvbHlnb24gZmVhdHVyZXMsIGEgcG9zaXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBpbnNldCwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBvdXRzZXQuXG4gICAgJ2xpbmUtYmx1cicgICAgICAgICAgPzogbnVtYmVyOyAgICAgLy9CbHVyIGFwcGxpZWQgdG8gdGhlIGxpbmUsIGluIHBpeGVscy5cbiAgICAnbGluZS1kYXNoYXJyYXknICAgICA/OiBudW1iZXJbXTsgICAvL1NwZWNpZmllcyB0aGUgbGVuZ3RocyBvZiB0aGUgYWx0ZXJuYXRpbmcgZGFzaGVzIGFuZCBnYXBzIHRoYXQgZm9ybSB0aGUgZGFzaCBwYXR0ZXJuLiBUaGUgbGVuZ3RocyBhcmUgbGF0ZXIgc2NhbGVkIGJ5IHRoZSBsaW5lIHdpZHRoLiBUbyBjb252ZXJ0IGEgZGFzaCBsZW5ndGggdG8gcGl4ZWxzLCBtdWx0aXBseSB0aGUgbGVuZ3RoIGJ5IHRoZSBjdXJyZW50IGxpbmUgd2lkdGguIE5vdGUgdGhhdCBHZW9KU09OIHNvdXJjZXMgd2l0aCBsaW5lTWV0cmljczogdHJ1ZSBzcGVjaWZpZWQgd29uJ3QgcmVuZGVyIGRhc2hlZCBsaW5lcyB0byB0aGUgZXhwZWN0ZWQgc2NhbGUuIEFsc28gbm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBsaW5lcy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWdyYWRpZW50JyAgICAgID86IHN0cmluZzsgICAgIC8vRGVmaW5lcyBhIGdyYWRpZW50IHdpdGggd2hpY2ggdG8gY29sb3IgYSBsaW5lIGZlYXR1cmUuIENhbiBvbmx5IGJlIHVzZWQgd2l0aCBHZW9KU09OIHNvdXJjZXMgdGhhdCBzcGVjaWZ5IFwibGluZU1ldHJpY3NcIjogdHJ1ZS5cbiAgICAvL1RPRE8gc3ltYm9sc1xufVxuXG5cblxuXG5cblxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBldmFsdWF0YWJsZSBleHByZXNzaW9uIGFzc29jaWF0ZWQgd2l0aCBhIGxheWVyIHN0eWxlLFxuICogZm9sbG93aW5nIE1hcEJveCBTdHlsZSBTcGVjIGZvcm1hdC5cbiAqIEV4cHJlc3Npb25zIGFyZSBhcnJheXMgb2Y6XG4gKiAgIC0gb3BlcmF0b3Iga2V5ICgnZ2V0JywgJz09JywgJ2hhcycsIGV0YylcbiAqICAgLSBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnMgaW5jbHVkaW5nIG5lc3RlZCBleHByZXNzaW9uc1xuICpcbiAqICBFeGFtcGxlczpcbiAqXG4gKiAgWyAnaGFzJywgJ3Byb3BlcnR5TmFtZScgXSAgIC8vIHNpbXBsZSBleHByZXNzaW9uIGNoZWNraW5nIGZvciBleGlzdGFuY2Ugb2YgYSBzcGVjaWZpYyBmZWF0dXJlIHByb3BlcnR5XG4gKlxuICogIFtcbiAqICAgICc9PScgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBvZiBleHByZXNzaW9uIChlcXVhbGl0eSBjb21wYXJpc29uKVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5QScgXSwgICAvLyBuZXN0ZWQgZXhwcmVzc2lvbiB0byBleHRyYWN0IGZlYXR1cmUncyBwcm9wZXJ0eSB2YWx1ZVxuICogICAgJ2V4cGVjdGVkVmFsdWUnICAgICAgICAgICAvLyB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqICBdXG4gKlxuICogIFtcbiAqICAgICdtYXRjaCcsICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoJ3N3aXRjaCcgc3RhdGVtZW50KVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5TmFtZScgXSwgLy8gZmlyc3QgcGFyYW0gaXMgYW5vdGhlciBleHByZXNzaW9uIHRvIGV4dHJhY3QgYSBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdBJywgJ3ZhbHVlRm9yQScsICAgICAgICAgIC8vIG5leHQgdHdvIHBhcmFtcyBhcmUgZmlyc3QgJ2Nhc2UnIG9mIFwic3dpdGNoXCJcbiAqICAgICdCJywgJ3ZhbHVlRm9yQicsICAgICAgICAgIC8vIHNlY29uZCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgICAnZmFsbGJhY2tWYWx1ZScgICAgICAgICAgICAvLyBkZWZhdWx0ICdjYXNlJyBmb3IgJ3N3aXRjaCdcbiAqICBdXG4gKlxuICovXG5jbGFzcyBFeHByZXNzaW9uIHtcblxuICAgIHByaXZhdGUgb3BlcmF0b3I6IHN0cmluZztcbiAgICBwcml2YXRlIGFyZ3MgPzogYW55W107XG5cbiAgICBjb25zdHJ1Y3RvciggZmlsdGVyIDogYW55W10gKSB7XG4gICAgICAgIGxldCBhcnIgPSBmaWx0ZXIuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBhcnJbMF07XG4gICAgICAgIHRoaXMuYXJncyA9IGFyci5zcGxpY2UoMSkubWFwKCBhcmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoIGFyZyApID8gbmV3IEV4cHJlc3Npb24oIGFyZyApIDogYXJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uXG4gICAgICovXG4gICAgZXZhbHVhdGUoIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHAxLCBwMjtcbiAgICAgICAgc3dpdGNoKHRoaXMub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICBjYXNlICdoYXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgY2FzZSAnIWhhcyc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhKCB0eXBlb2YocDEpICE9PSAndW5kZWZpbmVkJyAmJiBwMSBpbiBwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJHtwMX0gPT0gJHtwMn1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPT0gcDI7XG4gICAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ICE9ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxICE9IHAyO1xuICAgICAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPiBwMjtcbiAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDwgcDI7XG4gICAgICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPj0gcDI7XG4gICAgICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPD0gcDI7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHAxKTtcbiAgICAgICAgICAgIGNhc2UgJ2F0JyA6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mKHAxKSA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShwMikgJiZcbiAgICAgICAgICAgICAgICAgICAgcDIubGVuZ3RoID49IHAxID8gcDJbcDFdIDogbnVsbDtcblxuICAgICAgICAgICAgY2FzZSAnem9vbSc6IHJldHVybiB6b29tO1xuICAgICAgICAgICAgY2FzZSAnaWQnOiByZXR1cm4gcHJvcGVydGllcy5pZDtcbiAgICAgICAgICAgIGNhc2UgJ2dlb21ldHJ5LXR5cGUnOiByZXR1cm4gZ2VvbWV0cnlUeXBlO1xuICAgICAgICAgICAgY2FzZSAnbWF0Y2gnIDogIC8vd29ya3MgbGlrZSBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTWF0Y2gocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgb2YgdGhlIGFyZ3VtZW50ICh3aGljaCBtYXkgYmUgcmVzdWx0IG9mIGFuIGV4cHJlc3Npb24pXG4gICAgICovXG4gICAgZ2V0QXJnKGluZGV4IDogbnVtYmVyLCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5hcmdzW2luZGV4XTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vYXJnIGlzIGEgbmVzdGVkIGV4cHJlc3Npb24uLi5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuXG4gICAgICAgIH0gZWxzZSBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJyAmJiBwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy9hcmcgaXMgYSBwcm9wZXJ0eSBuYW1lIGluc3RlYWQgb2YgYSBuZXN0ZWQgZXhwcmVzc2lvbi4uLlxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXNbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgYXNzb2NpYXRlZCB3aXRoIG1hdGNoaW5nIGNvbmRpdGlvbiBvZiBleHByZXNzaW9uLCBvciBmYWxsYmFjayB2YWx1ZVxuICAgICAqL1xuICAgIGZpbmRNYXRjaCggcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nICkgOiBhbnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbCwgZW5kID0gdGhpcy5hcmdzLmxlbmd0aC0xO1xuXG4gICAgICAgIC8vdGhlIGlucHV0IHZhbHVlIHRvIHRlc3QgYWdhaW5zdFxuICAgICAgICAvLyAgLi4uIHNob3VsZCBiZSB2YWx1ZSBvZiBJbnB1dCBwb3J0aW9uIChpZSwgXCJMYWtlXCIgZm9yIHdldGxhbmRzKVxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cHJlc3Npb24ubWF0Y2ggLSBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSApO1xuXG4gICAgICAgIC8vZmluZCB2YWx1ZSBpbnNpZGUgcmVtYWluaW5nIGFyZ3MgdG8gYXNzaWduIHN0eWxlIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlXG4gICAgICAgIHRoaXMuYXJncy5mb3JFYWNoKCAoYXJnLGkpID0+IHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmaXJzdCBhcmcgKHNlZSBhYm92ZSkgYW5kIGxhc3QgYXJnIChpdCdzIHRoZSBmYWxsYmFjayB2YWx1ZSlcbiAgICAgICAgICAgIC8vIGFsc28gc2tpcCBpZiB3ZSd2ZSBhbHJlYWR5IGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgIGlmKCByZXN1bHQgIT09IG51bGwgfHwgaSA9PT0gMCB8fCBpID09PSBlbmQpIHJldHVybjtcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGFyZykgKSB7ICAgICAgICAgIC8vYXJyYXkgb2YgbGl0ZXJhbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZih+YXJnLmluZGV4T2YoIHZhbHVlICkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKCBhcmcgPT0gdmFsdWUgKXsgICAgICAvL2xpdGVyYWwgdmFsdWVcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFyZ3NbaSsxXTsgICAgLy9tYXRjaCwgcmV0dXJuIG5leHQgdmFsdWUgaW4gYXJyYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKCFyZXN1bHQpIHJlc3VsdCA9IHRoaXMuYXJnc1tlbmRdOyAvL2xhc3QgYXJnIGlzIGFsd2F5cyBmYWxsYmFjayB2YWx1ZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1hdGNoIHJldHVybmVkOiBcIiArIHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5vcGVyYXRvcl0uY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5hcmdzLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZihhcmcuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJykgPyBhcmcudG9TdHJpbmcoKSA6IGFyZztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuam9pbignLCcpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBzdHlsZSBNYXBCb3ggU3R5bGUgZGVmaW5pdGlvblxuICogQHJldHVybiBvYmplY3QgYXNzb2NpYXRpbmcgTGVhZmxldCBzdHlsZXMgd2l0aCBsYXllciBpZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGVEZWYgOiBNYXBCb3hTdHlsZSApIDogeyBba2V5OnN0cmluZ106TGVhZmxldFN0eWxlTWFwIH0ge1xuXG4gICAgLy9UT0RPIHZhbGlkYXRlIHN0eWxlRGVmLnZlcnNpb24gdG8gbWFrZSBzdXJlIHdlIGFyZSBwYXJzaW5nIHNvbWV0aGluZyB3ZSB1bmRlcnN0YW5kXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBhcnNpbmcgTWFwQm94IFN0eWxlXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHN0eWxlRGVmLCBudWxsLCAnICcpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gICAgaWYoICFzdHlsZURlZi5sYXllcnMgfHwgIUFycmF5LmlzQXJyYXkoc3R5bGVEZWYubGF5ZXJzKSB8fCAhc3R5bGVEZWYubGF5ZXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBubyBsYXllciBkZWZpbml0aW9uc1wiKTtcbiAgICAgICAgcmV0dXJuIHt9OyAgIC8vZW1wdHkgc3R5bGVzXG4gICAgfVxuXG4gICAgLy9oYXZlIHRvIGdyb3VwIGxheWVycyB3aXRoIHNhbWUgaWQgYnV0IHdpdGggZGlmZmVyZW50IGZpbHRlcnMgdW5kZXIgdGhlIHNhbWUgc3R5bGUgZnVuY3Rpb25cbiAgICBsZXQgbGF5ZXJzID0ge307XG4gICAgc3R5bGVEZWYubGF5ZXJzLmZvckVhY2goIGxheWVyID0+IHtcbiAgICAgICAgLy91c2Ugc291cmNlLWxheWVyIGtleSBmaXJzdCwgZmFsbGJhY2sgdG8gbGF5ZXIgaWRcbiAgICAgICAgbGV0IGlkID0gKGxheWVyWydzb3VyY2UtbGF5ZXInXSB8fCBsYXllci5pZCkudHJpbSgpO1xuICAgICAgICBpZihsYXllcnNbaWRdKSBsYXllcnNbaWRdLnB1c2gobGF5ZXIpOyAgLy9sYXllciBhbHJlYWR5IGV4aXN0c1xuICAgICAgICBlbHNlIGxheWVyc1tpZF0gPSBbbGF5ZXJdOyAgICAgICAgICAgICAgLy9uZXcgbGF5ZXIncyBzdHlsZVxuICAgIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxheWVycywgbnVsbCwgJyAnKSk7XG5cbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMobGF5ZXJzKS5mb3JFYWNoKCBpZCA9PiB7XG4gICAgICAgIGxldCBzdHlsZXMgPSBsYXllcnNbaWRdOyAgICAvL2FycmF5IG9mIDEgb3IgbW9yZSBmb3IgZ2l2ZW4gaWQgKGRpZmZlcmVudGlhdGVkIGJ5IGZpbHRlcnMpXG4gICAgICAgIHJlc3VsdFtpZF0gPSBzdHlsZUZ1bmN0aW9uRmFjdG9yeShzdHlsZXMsIHN0eWxlRGVmKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuZnVuY3Rpb24gc3R5bGVGdW5jdGlvbkZhY3RvcnkoXG4gICAgbGF5ZXJTdHlsZXMgOiBNYXBCb3hTdHlsZUxheWVyW10sIHN0eWxlRGVmIDogTWFwQm94U3R5bGVcbikgOiBGdW5jdGlvbiB7XG5cbiAgICBsZXQgc3R5bGVzID0gbGF5ZXJTdHlsZXMubWFwKCBsYXllclN0eWxlID0+IGdldExheWVyU3R5bGUobGF5ZXJTdHlsZSwgc3R5bGVEZWYpICk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oIHByb3BlcnRpZXMgOiBhbnksIHpvb206IG51bWJlciwgZ2VvbVR5cGUgOiBzdHJpbmcgKSB7XG5cbiAgICAgICAgbGV0IG1hdGNoIDogYW55ID0gc3R5bGVzLmZpbmQoIHN0eWxlID0+IHtcbiAgICAgICAgICAgIGlmKHN0eWxlLmZpbHRlciAmJiB0eXBlb2Yoc3R5bGUuZmlsdGVyLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBhIGZpbHRlci4uLiBcIiArIHN0eWxlLmZpbHRlci50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBzdHlsZS5maWx0ZXIuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGlmKCFmb3VuZCkgY29uc29sZS5sb2coXCJGaWx0ZXIgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICAgICAgLy8gZWxzZSBjb25zb2xlLmxvZyhcIkZpbHRlciBtYXRjaGVzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIGlmKG1hdGNoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtYXRjaC5zdHlsZSkuZm9yRWFjaCgga2V5ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWwgPSBtYXRjaC5zdHlsZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmKCBzdHlsZVZhbCAmJiB0eXBlb2Yoc3R5bGVWYWwuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzdHlsZVZhbC5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tVHlwZSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXN1bHRba2V5XSA9IHN0eWxlVmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmcsIG5vIHN0eWxlIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gIGxheWVyU3R5bGUgTWFwQm94IFN0eWxlIFNwZWMgTGF5ZXIgZGVmaW5pdGlvblxuICogQHBhcmFtICBzdHlsZURlZiBNYXBCb3ggU3R5bGUgZG9jdW1lbnRcbiAqIEByZXR1cm4gRnVuY3Rpb24gYWNjZXB0aW5nIGZlYXR1cmUgcHJvcGVydGllcywgem9vbSBsZXZlbCwgYW5kIGdlb21ldHJ5IHR5cGUgYW5kIHJldHVybmluZyBhIExlYWZsZXQgc3R5bGUgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGdldExheWVyU3R5bGUoIGxheWVyU3R5bGUgOiBNYXBCb3hTdHlsZUxheWVyLCBzdHlsZURlZjogTWFwQm94U3R5bGUgKSB7XG5cbiAgICBsZXQgcGFyc2VWYWx1ZSA9IGZ1bmN0aW9uICggdmFsdWUgOiBhbnksIGZhbGxiYWNrID86IGFueSApIHtcbiAgICAgICAgaWYoIHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXhwcmVzc2lvbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbGxiYWNrIHx8IG51bGw7XG4gICAgfVxuXG5cbiAgICBsZXQgbGF5ZXJQYWludCA6IE1hcEJveFBhaW50ICA9IGxheWVyU3R5bGUucGFpbnQ7XG4gICAgbGV0IGxpbmVXaWR0aCAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS13aWR0aCddLCAxKTtcbiAgICBsZXQgb3BhY2l0eSAgICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydsaW5lLW9wYWNpdHknXSwgMS4wKTtcbiAgICBsZXQgY29sb3IgICAgICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydsaW5lLWNvbG9yJ10gICB8fCBsYXllclBhaW50WydmaWxsLW91dGxpbmUtY29sb3InXSB8fCBsYXllclBhaW50WydmaWxsLWNvbG9yJ10sICcjMDAwJyk7XG4gICAgbGV0IGZpbGxPcGFjaXR5ID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnZmlsbC1vcGFjaXR5J10gfHwgbGF5ZXJQYWludFsnYmFja2dyb3VuZC1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGZpbGxDb2xvciAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnZmlsbC1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnYmFja2dyb3VuZC1jb2xvciddLCAndHJhbnNwYXJlbnQnKTtcbiAgICBsZXQgZmlsbFBhdHRlcm4gPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydmaWxsLXBhdHRlcm4nXSApO1xuXG4gICAgaWYoZmlsbFBhdHRlcm4gJiYgc3R5bGVEZWYuc3ByaXRlSlNPTiAmJiBzdHlsZURlZi5zcHJpdGVKU09OW2ZpbGxQYXR0ZXJuXSkge1xuICAgICAgICBsZXQgcGlkID0gZmlsbFBhdHRlcm4udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC0vZywnJykucmVwbGFjZSgvXFxcXC9nLCcnKS5yZXBsYWNlKC9cXC8vZywnJykucmVwbGFjZSgvXFxzKy9nLCcnKTtcbiAgICAgICAgLy9maWxsIHVzZXMgc3ByaXRlIHJlZmVyZW5jZWQgYnkgdGhlIHN0eWxlIGRvY1xuICAgICAgICAvLyAoZmlsbFBhdHRlcm4gdmFsdWUgaXMgdGhlIGtleSBvZiB0aGUgc3ByaXRlIGVudHJ5KVxuICAgICAgICBsZXQgcGF0dGVybiA9IHN0eWxlRGVmLnNwcml0ZUpTT05bZmlsbFBhdHRlcm5dO1xuICAgICAgICBmaWxsUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oeyBpZDogcGlkLCB1cmw6IHN0eWxlRGVmLnNwcml0ZVVSTCB9LCBwYXR0ZXJuKTtcbiAgICB9XG5cbiAgICBsZXQgc3R5bGUgOiBMZWFmbGV0U3R5bGUgPSB7XG4gICAgICAgIGNvbG9yICAgICAgIDogY29sb3IsICAgICAgICAgLy9zdHJva2UgY29sb3JcbiAgICAgICAgb3BhY2l0eSAgICAgOiBvcGFjaXR5LCAgICAgICAvL3N0cm9rZSBvcGFjaXR5XG4gICAgICAgIHdlaWdodCAgICAgIDogbGluZVdpZHRoLCAgICAgLy9zdHJva2Ugc2l6ZVxuICAgICAgICBmaWxsT3BhY2l0eSA6IGZpbGxPcGFjaXR5LCAgIC8vZmlsbCBvcGFjaXR5XG4gICAgICAgIGZpbGxDb2xvciAgIDogZmlsbENvbG9yLCAgICAgLy9maWxsIGNvbG9yXG4gICAgICAgIGZpbGxQYXR0ZXJuIDogZmlsbFBhdHRlcm5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyOiBwYXJzZVZhbHVlKGxheWVyU3R5bGUuZmlsdGVyKSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgfTtcbn1cbiJdfQ==