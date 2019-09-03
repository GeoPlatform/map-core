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
                p1 = this.getArg(0, properties, zoom, geometryType);
                return properties[p1];
            case 'has':
                p1 = this.getArg(0, properties, zoom, geometryType);
                return p1 in properties;
            case '!has':
                p1 = this.getArg(0, properties, zoom, geometryType);
                return !(p1 in properties);
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
            return value.evaluate(properties, zoom, geometryType);
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
    /** @type {?} */
    var result = {};
    style.layers.forEach((/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        result[layer.id] = styleFunctionFactory(layer); //new LayerStyle( layer ).getStyleFunction()
    }));
    return result;
}
var ɵ0 = /**
 * @param {?} layerStyle
 * @return {?}
 */
function (layerStyle) {
    /**
     *
     * @type {?}
     */
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
    var fillColor = parseValue(layerPaint['fill-color'] || layerPaint['background-color'], '#000');
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
        fillColor: fillColor //fill color
    };
    return (/**
     * @param {?} properties
     * @param {?} zoom
     * @param {?} geomType
     * @return {?}
     */
    function (properties, zoom, geomType) {
        /** @type {?} */
        var result = {};
        Object.keys(style).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            /** @type {?} */
            var styleVal = style[key];
            if (styleVal && typeof (styleVal.evaluate) !== 'undefined')
                result[key] = styleVal.evaluate(properties, zoom, geomType);
            else
                result[key] = styleVal;
        }));
        return result;
    });
};
/**
 * \@param layer MapBox Style Spec Layer definition
 * \@return Function accepting feature properties, zoom level, and geometry type and returning a Leaflet style object
 * @type {?}
 */
var styleFunctionFactory = ((ɵ0));
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyQkFPQzs7O0lBTkcsOEJBQXNCOztJQUN0QiwrQkFBc0I7O0lBQ3RCLDZCQUFzQjs7SUFDdEIsaUNBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLGlDQUFzQjs7Ozs7QUFHMUIsOEJBRUM7Ozs7QUFFRCwwQkFjQzs7O0lBYkcsOEJBQXNCOztJQUN0QiwyQkFBc0I7O0lBQ3RCLCtCQUFtQjs7SUFDbkIsNkJBQXdCOztJQUN4QiwyQkFBc0I7O0lBQ3RCLDhCQUFzQjs7SUFDdEIsNEJBQXNCOztJQUN0Qiw0QkFBbUI7O0lBQ25CLDhCQUFxQjs7SUFDckIsNkJBQXNCOztJQUN0Qiw2QkFBc0I7O0lBQ3RCLGlDQUFtQjs7SUFDbkIsNkJBQWtDOzs7OztBQUd0QywrQkFXQzs7O0lBVkcsOEJBQXlCOztJQUN6QixnQ0FBK0g7O0lBQy9ILG9DQUFzQjs7SUFDdEIsa0NBQXlCOzs7O0lBRXpCLG1DQUF5Qjs7SUFDekIsbUNBQXlCOztJQUN6QixrQ0FBc0I7O0lBQ3RCLGtDQUFzQjs7SUFDdEIsaUNBQThCOzs7OztBQUdsQywwQkE0QkM7OztJQTNCRyxpQ0FBMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtJLG9CQUFhLE1BQWM7O1lBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMs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LENBQUM7O1FBQzdILFdBQVcsR0FBRyxVQUFVLENBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7UUFDOUYsU0FBUyxHQUFLLFVBQVUsQ0FBRSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQU0sVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxDQUFDOztRQUUvRixLQUFLLEdBQWtCO1FBQ3ZCLEtBQUssRUFBUSxLQUFLOztRQUNsQixPQUFPLEVBQU0sT0FBTzs7UUFDcEIsTUFBTSxFQUFPLFNBQVM7O1FBQ3RCLFdBQVcsRUFBRSxXQUFXOztRQUN4QixTQUFTLEVBQUksU0FBUyxDQUFNLFlBQVk7S0FDM0M7SUFFRDs7Ozs7O0lBQU8sVUFBVSxVQUFnQixFQUFFLElBQVksRUFBRSxRQUFpQjs7WUFDMUQsTUFBTSxHQUFHLEVBQUU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU87Ozs7UUFBRSxVQUFBLEdBQUc7O2dCQUN2QixRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN6QixJQUFJLFFBQVEsSUFBSSxPQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVc7Z0JBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7O2dCQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQyxFQUFDO0FBQ04sQ0FBQzs7Ozs7O0lBdkNHLG9CQUFvQixHQUFHLE1BdUN6QiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZSB7XG4gICAgd2VpZ2h0ICAgICAgPzogbnVtYmVyO1xuICAgIG9wYWNpdHkgICAgID86IG51bWJlcjtcbiAgICBjb2xvciAgICAgICA/OiBzdHJpbmc7XG4gICAgZGFzaEFycmF5ICAgPzogbnVtYmVyW107XG4gICAgZmlsbE9wYWNpdHkgPzogbnVtYmVyO1xuICAgIGZpbGxDb2xvciAgID86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIExlYWZsZXRTdHlsZU1hcCB7XG4gICAgW2tleTpzdHJpbmddOiBGdW5jdGlvbiB8IExlYWZsZXRTdHlsZVxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGUge1xuICAgIHZlcnNpb24gICAgICA6IG51bWJlcjsgIC8vU3R5bGUgc3BlY2lmaWNhdGlvbiB2ZXJzaW9uIG51bWJlci4gTXVzdCBiZSA4LlxuICAgIG5hbWUgICAgICAgID86IHN0cmluZzsgIC8vQSBodW1hbi1yZWFkYWJsZSBuYW1lIGZvciB0aGUgc3R5bGUuXG4gICAgbWV0YWRhdGEgICAgPzogYW55OyAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgc3R5bGVzaGVldCwgYnV0IGRvIG5vdCBpbmZsdWVuY2UgcmVuZGVyaW5nLiBQcm9wZXJ0aWVzIHNob3VsZCBiZSBwcmVmaXhlZCB0byBhdm9pZCBjb2xsaXNpb25zLCBsaWtlICdtYXBib3g6Jy5cbiAgICBjZW50ZXIgICAgICA/OiBudW1iZXJbXTsgLy9EZWZhdWx0IG1hcCBjZW50ZXIgaW4gbG9uZ2l0dWRlIGFuZCBsYXRpdHVkZS4gVGhlIHN0eWxlIGNlbnRlciB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIHpvb20gICAgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCB6b29tIGxldmVsLiBUaGUgc3R5bGUgem9vbSB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIGJlYXJpbmcgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCBiZWFyaW5nLCBpbiBkZWdyZWVzLiBUaGUgYmVhcmluZyBpcyB0aGUgY29tcGFzcyBkaXJlY3Rpb24gdGhhdCBpcyBcInVwXCI7IGZvciBleGFtcGxlLCBhIGJlYXJpbmcgb2YgOTDCsCBvcmllbnRzIHRoZSBtYXAgc28gdGhhdCBlYXN0IGlzIHVwLiBUaGlzIHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgcGl0Y2ggICAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IHBpdGNoLCBpbiBkZWdyZWVzLiBaZXJvIGlzIHBlcnBlbmRpY3VsYXIgdG8gdGhlIHN1cmZhY2UsIGZvciBhIGxvb2sgc3RyYWlnaHQgZG93biBhdCB0aGUgbWFwLCB3aGlsZSBhIGdyZWF0ZXIgdmFsdWUgbGlrZSA2MCBsb29rcyBhaGVhZCB0b3dhcmRzIHRoZSBob3Jpem9uLiBUaGUgc3R5bGUgcGl0Y2ggd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBsaWdodCAgICAgICA/OiBhbnk7ICAgICAvL1RoZSBnbG9iYWwgbGlnaHQgc291cmNlLlxuICAgIHNvdXJjZXMgICAgID86IGFueVtdOyAgIC8vRGF0YSBzb3VyY2Ugc3BlY2lmaWNhdGlvbnMuXG4gICAgc3ByaXRlICAgICAgPzogc3RyaW5nOyAgLy9BIGJhc2UgVVJMIGZvciByZXRyaWV2aW5nIHRoZSBzcHJpdGUgaW1hZ2UgYW5kIG1ldGFkYXRhLiBUaGUgZXh0ZW5zaW9ucyAucG5nLCAuanNvbiBhbmQgc2NhbGUgZmFjdG9yIEAyeC5wbmcgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGFwcGVuZGVkLiBUaGlzIHByb3BlcnR5IGlzIHJlcXVpcmVkIGlmIGFueSBsYXllciB1c2VzIHRoZSBiYWNrZ3JvdW5kLXBhdHRlcm4sIGZpbGwtcGF0dGVybiwgbGluZS1wYXR0ZXJuLCBmaWxsLWV4dHJ1c2lvbi1wYXR0ZXJuLCBvciBpY29uLWltYWdlIHByb3BlcnRpZXMuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICBnbHlwaHMgICAgICA/OiBzdHJpbmc7ICAvL0EgVVJMIHRlbXBsYXRlIGZvciBsb2FkaW5nIHNpZ25lZC1kaXN0YW5jZS1maWVsZCBnbHlwaCBzZXRzIGluIFBCRiBmb3JtYXQuIFRoZSBVUkwgbXVzdCBpbmNsdWRlIHtmb250c3RhY2t9IGFuZCB7cmFuZ2V9IHRva2Vucy4gVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpZiBhbnkgbGF5ZXIgdXNlcyB0aGUgdGV4dC1maWVsZCBsYXlvdXQgcHJvcGVydHkuIFRoZSBVUkwgbXVzdCBiZSBhYnNvbHV0ZSwgY29udGFpbmluZyB0aGUgc2NoZW1lLCBhdXRob3JpdHkgYW5kIHBhdGggY29tcG9uZW50cy5cbiAgICB0cmFuc2l0aW9uICA/OiBhbnk7ICAgICAvL0EgZ2xvYmFsIHRyYW5zaXRpb24gZGVmaW5pdGlvbiB0byB1c2UgYXMgYSBkZWZhdWx0IGFjcm9zcyBwcm9wZXJ0aWVzLCB0byBiZSB1c2VkIGZvciB0aW1pbmcgdHJhbnNpdGlvbnMgYmV0d2VlbiBvbmUgdmFsdWUgYW5kIHRoZSBuZXh0IHdoZW4gbm8gcHJvcGVydHktc3BlY2lmaWMgdHJhbnNpdGlvbiBpcyBzZXQuIENvbGxpc2lvbi1iYXNlZCBzeW1ib2wgZmFkaW5nIGlzIGNvbnRyb2xsZWQgaW5kZXBlbmRlbnRseSBvZiB0aGUgc3R5bGUncyB0cmFuc2l0aW9uIHByb3BlcnR5LlxuICAgIGxheWVycyAgICAgID86IE1hcEJveFN0eWxlTGF5ZXJbXTsgICAvL0xheWVycyB3aWxsIGJlIGRyYXduIGluIHRoZSBvcmRlciBvZiB0aGlzIGFycmF5LlxufVxuXG5pbnRlcmZhY2UgTWFwQm94U3R5bGVMYXllciB7XG4gICAgaWQgICAgICAgICAgICAgIDogc3RyaW5nOyAgICAgIC8vVW5pcXVlIGxheWVyIG5hbWUuXG4gICAgdHlwZSAgICAgICAgICAgIDogXCJmaWxsXCIgfCBcImxpbmVcIiB8IFwic3ltYm9sXCIgfCBcImNpcmNsZVwiIHwgXCJoZWF0bWFwXCIgfCBcImZpbGwtZXh0cnVzaW9uXCIgfCBcInJhc3RlclwiIHwgXCJoaWxsc2hhZGVcIiB8IFwiYmFja2dyb3VuZFwiOyAvL1JlbmRlcmluZyB0eXBlIG9mIHRoaXMgbGF5ZXIuXG4gICAgbWV0YWRhdGEgICAgICAgPzogYW55OyAgICAgICAgIC8vQXJiaXRyYXJ5IHByb3BlcnRpZXMgdXNlZnVsIHRvIHRyYWNrIHdpdGggdGhlIGxheWVyLCBidXQgZG8gbm90IGluZmx1ZW5jZSByZW5kZXJpbmcuIFByb3BlcnRpZXMgc2hvdWxkIGJlIHByZWZpeGVkIHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgJ21hcGJveDonLlxuICAgIHNvdXJjZSAgICAgICAgID86IHN0cmluZzsgICAgICAvL05hbWUgb2YgYSBzb3VyY2UgZGVzY3JpcHRpb24gdG8gYmUgdXNlZCBmb3IgdGhpcyBsYXllci4gUmVxdWlyZWQgZm9yIGFsbCBsYXllciB0eXBlcyBleGNlcHQgYmFja2dyb3VuZC5cbiAgICAnc291cmNlLWxheWVyJyA/OiBzdHJpbmc7IC8vTGF5ZXIgdG8gdXNlIGZyb20gYSB2ZWN0b3IgdGlsZSBzb3VyY2UuIFJlcXVpcmVkIGZvciB2ZWN0b3IgdGlsZSBzb3VyY2VzOyBwcm9oaWJpdGVkIGZvciBhbGwgb3RoZXIgc291cmNlIHR5cGVzLCBpbmNsdWRpbmcgR2VvSlNPTiBzb3VyY2VzLlxuICAgIG1pbnpvb20gICAgICAgID86IG51bWJlcjsgICAgICAvL1RoZSBtaW5pbXVtIHpvb20gbGV2ZWwgZm9yIHRoZSBsYXllci4gQXQgem9vbSBsZXZlbHMgbGVzcyB0aGFuIHRoZSBtaW56b29tLCB0aGUgbGF5ZXIgd2lsbCBiZSBoaWRkZW4uXG4gICAgbWF4em9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1heGltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG1heHpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBmaWx0ZXIgICAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BIGV4cHJlc3Npb24gc3BlY2lmeWluZyBjb25kaXRpb25zIG9uIHNvdXJjZSBmZWF0dXJlcy4gT25seSBmZWF0dXJlcyB0aGF0IG1hdGNoIHRoZSBmaWx0ZXIgYXJlIGRpc3BsYXllZC4gWm9vbSBleHByZXNzaW9ucyBpbiBmaWx0ZXJzIGFyZSBvbmx5IGV2YWx1YXRlZCBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLiBUaGUgZmVhdHVyZS1zdGF0ZSBleHByZXNzaW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZmlsdGVyIGV4cHJlc3Npb25zLlxuICAgIGxheW91dCAgICAgICAgID86IGFueTsgICAgICAgICAvL0xheW91dCBwcm9wZXJ0aWVzIGZvciB0aGUgbGF5ZXIuXG4gICAgcGFpbnQgICAgICAgICAgPzogTWFwQm94UGFpbnQ7IC8vRGVmYXVsdCBwYWludCBwcm9wZXJ0aWVzIGZvciB0aGlzIGxheWVyLlxufVxuXG5pbnRlcmZhY2UgTWFwQm94UGFpbnQge1xuICAgIHZpc2liaWxpdHkgICAgICAgICAgID86IFwidmlzaWJsZVwiIHwgXCJub25lXCI7ICAgLy9XaGV0aGVyIHRoaXMgbGF5ZXIgaXMgZGlzcGxheWVkLlxuICAgICdiYWNrZ3JvdW5kLWNvbG9yJyAgID86IHN0cmluZzsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnYmFja2dyb3VuZC1wYXR0ZXJuJyA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBhbiBpbWFnZSBiYWNrZ3JvdW5kLiBGb3Igc2VhbWxlc3MgcGF0dGVybnMsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnYmFja2dyb3VuZC1vcGFjaXR5JyA/OiBudW1iZXI7ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBiYWNrZ3JvdW5kIHdpbGwgYmUgZHJhd24uXG4gICAgJ2ZpbGwtYW50aWFsaWFzJyAgICAgPzogYm9vbGVhbjsgICAgLy9XaGV0aGVyIG9yIG5vdCB0aGUgZmlsbCBzaG91bGQgYmUgYW50aWFsaWFzZWQuXG4gICAgJ2ZpbGwtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBvZiB0aGUgZW50aXJlIGZpbGwgbGF5ZXIuIEluIGNvbnRyYXN0IHRvIHRoZSBmaWxsLWNvbG9yLCB0aGlzIHZhbHVlIHdpbGwgYWxzbyBhZmZlY3QgdGhlIDFweCBzdHJva2UgYXJvdW5kIHRoZSBmaWxsLCBpZiB0aGUgc3Ryb2tlIGlzIHVzZWQuXG4gICAgJ2ZpbGwtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgLy9UaGUgY29sb3Igb2YgdGhlIGZpbGxlZCBwYXJ0IG9mIHRoaXMgbGF5ZXIuIFRoaXMgY29sb3IgY2FuIGJlIHNwZWNpZmllZCBhcyByZ2JhIHdpdGggYW4gYWxwaGEgY29tcG9uZW50IGFuZCB0aGUgY29sb3IncyBvcGFjaXR5IHdpbGwgbm90IGFmZmVjdCB0aGUgb3BhY2l0eSBvZiB0aGUgMXB4IHN0cm9rZSwgaWYgaXQgaXMgdXNlZC5cbiAgICAnZmlsbC1vdXRsaW5lLWNvbG9yJyA/OiBzdHJpbmd8YW55W107ICAgICAvL1RoZSBvdXRsaW5lIGNvbG9yIG9mIHRoZSBmaWxsLiBNYXRjaGVzIHRoZSB2YWx1ZSBvZiBmaWxsLWNvbG9yIGlmIHVuc3BlY2lmaWVkLlxuICAgICdmaWxsLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnZmlsbC10cmFuc2xhdGUtYW5jaG9yJyA6IFwibWFwXCIgfCBcInZpZXdwb3J0XCI7IC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgZmlsbC10cmFuc2xhdGUuXG4gICAgJ2ZpbGwtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgZmlsbHMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWNhcCcgICAgICAgICAgID86IFwiYnV0dFwiIHwgXCJyb3VuZFwiIHwgXCJzcXVhcmVcIjsgLy9UaGUgZGlzcGxheSBvZiBsaW5lIGVuZGluZ3MuXG4gICAgJ2xpbmUtam9pbicgICAgICAgICAgPzogIFwiYmV2ZWxcIiB8IFwicm91bmRcIiB8IFwibWl0ZXJcIiAvL1RoZSBkaXNwbGF5IG9mIGxpbmVzIHdoZW4gam9pbmluZy5cbiAgICAnbGluZS1taXRlci1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IG1pdGVyIGpvaW5zIHRvIGJldmVsIGpvaW5zIGZvciBzaGFycCBhbmdsZXMuXG4gICAgJ2xpbmUtcm91bmQtbGltaXQnICAgPzogbnVtYmVyOyAgICAgLy9Vc2VkIHRvIGF1dG9tYXRpY2FsbHkgY29udmVydCByb3VuZCBqb2lucyB0byBtaXRlciBqb2lucyBmb3Igc2hhbGxvdyBhbmdsZXMuXG4gICAgJ2xpbmUtb3BhY2l0eScgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9UaGUgb3BhY2l0eSBhdCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLWNvbG9yJyAgICAgICAgID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIGxpbmUgd2lsbCBiZSBkcmF3bi5cbiAgICAnbGluZS10cmFuc2xhdGUnICAgICA/OiBudW1iZXJbXTsgICAvL1RoZSBnZW9tZXRyeSdzIG9mZnNldC4gVmFsdWVzIGFyZSBbeCwgeV0gd2hlcmUgbmVnYXRpdmVzIGluZGljYXRlIGxlZnQgYW5kIHVwLCByZXNwZWN0aXZlbHkuXG4gICAgJ2xpbmUtdHJhbnNsYXRlLWFuY2hvcicgPzogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgIC8vQ29udHJvbHMgdGhlIGZyYW1lIG9mIHJlZmVyZW5jZSBmb3IgbGluZS10cmFuc2xhdGUuXG4gICAgJ2xpbmUtd2lkdGgnICAgICAgICAgPzogbnVtYmVyfGFueVtdOyAgICAgLy9TdHJva2UgdGhpY2tuZXNzLlxuICAgICdsaW5lLWdhcC13aWR0aCcgICAgID86IG51bWJlcjsgICAgIC8vRHJhd3MgYSBsaW5lIGNhc2luZyBvdXRzaWRlIG9mIGEgbGluZSdzIGFjdHVhbCBwYXRoLiBWYWx1ZSBpbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBpbm5lciBnYXAuXG4gICAgJ2xpbmUtb2Zmc2V0JyAgICAgICAgPzogbnVtYmVyOyAgICAgLy9UaGUgbGluZSdzIG9mZnNldC4gRm9yIGxpbmVhciBmZWF0dXJlcywgYSBwb3NpdGl2ZSB2YWx1ZSBvZmZzZXRzIHRoZSBsaW5lIHRvIHRoZSByaWdodCwgcmVsYXRpdmUgdG8gdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGluZSwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgdG8gdGhlIGxlZnQuIEZvciBwb2x5Z29uIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gaW5zZXQsIGFuZCBhIG5lZ2F0aXZlIHZhbHVlIHJlc3VsdHMgaW4gYW4gb3V0c2V0LlxuICAgICdsaW5lLWJsdXInICAgICAgICAgID86IG51bWJlcjsgICAgIC8vQmx1ciBhcHBsaWVkIHRvIHRoZSBsaW5lLCBpbiBwaXhlbHMuXG4gICAgJ2xpbmUtZGFzaGFycmF5JyAgICAgPzogbnVtYmVyW107ICAgLy9TcGVjaWZpZXMgdGhlIGxlbmd0aHMgb2YgdGhlIGFsdGVybmF0aW5nIGRhc2hlcyBhbmQgZ2FwcyB0aGF0IGZvcm0gdGhlIGRhc2ggcGF0dGVybi4gVGhlIGxlbmd0aHMgYXJlIGxhdGVyIHNjYWxlZCBieSB0aGUgbGluZSB3aWR0aC4gVG8gY29udmVydCBhIGRhc2ggbGVuZ3RoIHRvIHBpeGVscywgbXVsdGlwbHkgdGhlIGxlbmd0aCBieSB0aGUgY3VycmVudCBsaW5lIHdpZHRoLiBOb3RlIHRoYXQgR2VvSlNPTiBzb3VyY2VzIHdpdGggbGluZU1ldHJpY3M6IHRydWUgc3BlY2lmaWVkIHdvbid0IHJlbmRlciBkYXNoZWQgbGluZXMgdG8gdGhlIGV4cGVjdGVkIHNjYWxlLiBBbHNvIG5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtcGF0dGVybicgICAgICAgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgaW1hZ2UgbGluZXMuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1ncmFkaWVudCcgICAgICA/OiBzdHJpbmc7ICAgICAvL0RlZmluZXMgYSBncmFkaWVudCB3aXRoIHdoaWNoIHRvIGNvbG9yIGEgbGluZSBmZWF0dXJlLiBDYW4gb25seSBiZSB1c2VkIHdpdGggR2VvSlNPTiBzb3VyY2VzIHRoYXQgc3BlY2lmeSBcImxpbmVNZXRyaWNzXCI6IHRydWUuXG4gICAgLy9UT0RPIHN5bWJvbHNcbn1cblxuXG5cblxuXG5cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZhbHVhdGFibGUgZXhwcmVzc2lvbiBhc3NvY2lhdGVkIHdpdGggYSBsYXllciBzdHlsZSxcbiAqIGZvbGxvd2luZyBNYXBCb3ggU3R5bGUgU3BlYyBmb3JtYXQuXG4gKiBFeHByZXNzaW9ucyBhcmUgYXJyYXlzIG9mOlxuICogICAtIG9wZXJhdG9yIGtleSAoJ2dldCcsICc9PScsICdoYXMnLCBldGMpXG4gKiAgIC0gYW55IG51bWJlciBvZiBwYXJhbWV0ZXJzIGluY2x1ZGluZyBuZXN0ZWQgZXhwcmVzc2lvbnNcbiAqXG4gKiAgRXhhbXBsZXM6XG4gKlxuICogIFsgJ2hhcycsICdwcm9wZXJ0eU5hbWUnIF0gICAvLyBzaW1wbGUgZXhwcmVzc2lvbiBjaGVja2luZyBmb3IgZXhpc3RhbmNlIG9mIGEgc3BlY2lmaWMgZmVhdHVyZSBwcm9wZXJ0eVxuICpcbiAqICBbXG4gKiAgICAnPT0nICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoZXF1YWxpdHkgY29tcGFyaXNvbilcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eUEnIF0sICAgLy8gbmVzdGVkIGV4cHJlc3Npb24gdG8gZXh0cmFjdCBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdleHBlY3RlZFZhbHVlJyAgICAgICAgICAgLy8gdmFsdWUgdG8gY29tcGFyZSBhZ2FpbnN0XG4gKiAgXVxuICpcbiAqICBbXG4gKiAgICAnbWF0Y2gnLCAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG9mIGV4cHJlc3Npb24gKCdzd2l0Y2gnIHN0YXRlbWVudClcbiAqICAgIFsgJ2dldCcsICdwcm9wZXJ0eU5hbWUnIF0sIC8vIGZpcnN0IHBhcmFtIGlzIGFub3RoZXIgZXhwcmVzc2lvbiB0byBleHRyYWN0IGEgZmVhdHVyZSdzIHByb3BlcnR5IHZhbHVlXG4gKiAgICAnQScsICd2YWx1ZUZvckEnLCAgICAgICAgICAvLyBuZXh0IHR3byBwYXJhbXMgYXJlIGZpcnN0ICdjYXNlJyBvZiBcInN3aXRjaFwiXG4gKiAgICAnQicsICd2YWx1ZUZvckInLCAgICAgICAgICAvLyBzZWNvbmQgJ2Nhc2UnIGZvciAnc3dpdGNoJ1xuICogICAgJ2ZhbGxiYWNrVmFsdWUnICAgICAgICAgICAgLy8gZGVmYXVsdCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgXVxuICpcbiAqL1xuY2xhc3MgRXhwcmVzc2lvbiB7XG5cbiAgICBwcml2YXRlIG9wZXJhdG9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBhcmdzID86IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IoIGZpbHRlciA6IGFueVtdICkge1xuICAgICAgICBsZXQgYXJyID0gZmlsdGVyLnNsaWNlKDApO1xuICAgICAgICB0aGlzLm9wZXJhdG9yID0gYXJyWzBdO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcnIuc3BsaWNlKDEpLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KCBhcmcgKSA/IG5ldyBFeHByZXNzaW9uKCBhcmcgKSA6IGFyZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIHJlc3VsdCBvZiB0aGUgZXhwcmVzc2lvblxuICAgICAqL1xuICAgIGV2YWx1YXRlKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcgKSA6IGFueSB7XG4gICAgICAgIGxldCBwMSwgcDI7XG4gICAgICAgIHN3aXRjaCh0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlICdnZXQnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydGllc1twMV07XG4gICAgICAgICAgICBjYXNlICdoYXMnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgaW4gcHJvcGVydGllcztcbiAgICAgICAgICAgIGNhc2UgJyFoYXMnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIShwMSBpbiBwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJHtwMX0gPT0gJHtwMn1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPT0gcDI7XG4gICAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ICE9ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxICE9IHAyO1xuICAgICAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPiBwMjtcbiAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDwgcDI7XG4gICAgICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPj0gcDI7XG4gICAgICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPD0gcDI7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHAxKTtcbiAgICAgICAgICAgIGNhc2UgJ2F0JyA6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mKHAxKSA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShwMikgJiZcbiAgICAgICAgICAgICAgICAgICAgcDIubGVuZ3RoID49IHAxID8gcDJbcDFdIDogbnVsbDtcblxuICAgICAgICAgICAgY2FzZSAnem9vbSc6IHJldHVybiB6b29tO1xuICAgICAgICAgICAgY2FzZSAnaWQnOiByZXR1cm4gcHJvcGVydGllcy5pZDtcbiAgICAgICAgICAgIGNhc2UgJ2dlb21ldHJ5LXR5cGUnOiByZXR1cm4gZ2VvbWV0cnlUeXBlO1xuICAgICAgICAgICAgY2FzZSAnbWF0Y2gnIDogIC8vd29ya3MgbGlrZSBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTWF0Y2gocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgb2YgdGhlIGFyZ3VtZW50ICh3aGljaCBtYXkgYmUgcmVzdWx0IG9mIGFuIGV4cHJlc3Npb24pXG4gICAgICovXG4gICAgZ2V0QXJnKGluZGV4IDogbnVtYmVyLCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5hcmdzW2luZGV4XTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgYXNzb2NpYXRlZCB3aXRoIG1hdGNoaW5nIGNvbmRpdGlvbiBvZiBleHByZXNzaW9uLCBvciBmYWxsYmFjayB2YWx1ZVxuICAgICAqL1xuICAgIGZpbmRNYXRjaCggcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nICkgOiBhbnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbCwgZW5kID0gdGhpcy5hcmdzLmxlbmd0aC0xO1xuXG4gICAgICAgIC8vdGhlIGlucHV0IHZhbHVlIHRvIHRlc3QgYWdhaW5zdFxuICAgICAgICAvLyAgLi4uIHNob3VsZCBiZSB2YWx1ZSBvZiBJbnB1dCBwb3J0aW9uIChpZSwgXCJMYWtlXCIgZm9yIHdldGxhbmRzKVxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cHJlc3Npb24ubWF0Y2ggLSBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSApO1xuXG4gICAgICAgIC8vZmluZCB2YWx1ZSBpbnNpZGUgcmVtYWluaW5nIGFyZ3MgdG8gYXNzaWduIHN0eWxlIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlXG4gICAgICAgIHRoaXMuYXJncy5mb3JFYWNoKCAoYXJnLGkpID0+IHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmaXJzdCBhcmcgKHNlZSBhYm92ZSkgYW5kIGxhc3QgYXJnIChpdCdzIHRoZSBmYWxsYmFjayB2YWx1ZSlcbiAgICAgICAgICAgIC8vIGFsc28gc2tpcCBpZiB3ZSd2ZSBhbHJlYWR5IGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgIGlmKCByZXN1bHQgIT09IG51bGwgfHwgaSA9PT0gMCB8fCBpID09PSBlbmQpIHJldHVybjtcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGFyZykgKSB7ICAgICAgICAgIC8vYXJyYXkgb2YgbGl0ZXJhbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZih+YXJnLmluZGV4T2YoIHZhbHVlICkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKCBhcmcgPT0gdmFsdWUgKXsgICAgICAvL2xpdGVyYWwgdmFsdWVcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFyZ3NbaSsxXTsgICAgLy9tYXRjaCwgcmV0dXJuIG5leHQgdmFsdWUgaW4gYXJyYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKCFyZXN1bHQpIHJlc3VsdCA9IHRoaXMuYXJnc1tlbmRdOyAvL2xhc3QgYXJnIGlzIGFsd2F5cyBmYWxsYmFjayB2YWx1ZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1hdGNoIHJldHVybmVkOiBcIiArIHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5vcGVyYXRvcl0uY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5hcmdzLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZihhcmcuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJykgPyBhcmcudG9TdHJpbmcoKSA6IGFyZztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuam9pbignLCcpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBzdHlsZSBNYXBCb3ggU3R5bGUgZGVmaW5pdGlvblxuICogQHJldHVybiBvYmplY3QgYXNzb2NpYXRpbmcgTGVhZmxldCBzdHlsZXMgd2l0aCBsYXllciBpZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGUgOiBNYXBCb3hTdHlsZSApIDogeyBba2V5OnN0cmluZ106TGVhZmxldFN0eWxlTWFwIH0ge1xuXG4gICAgLy9UT0RPIHZhbGlkYXRlIHN0eWxlLnZlcnNpb24gdG8gbWFrZSBzdXJlIHdlIGFyZSBwYXJzaW5nIHNvbWV0aGluZyB3ZSB1bmRlcnN0YW5kXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBhcnNpbmcgTWFwQm94IFN0eWxlXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHN0eWxlLCBudWxsLCAnICcpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gICAgaWYoICFzdHlsZS5sYXllcnMgfHwgIUFycmF5LmlzQXJyYXkoc3R5bGUubGF5ZXJzKSB8fCAhc3R5bGUubGF5ZXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBubyBsYXllciBkZWZpbml0aW9uc1wiKTtcbiAgICAgICAgcmV0dXJuIHt9OyAgIC8vZW1wdHkgc3R5bGVzXG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIHN0eWxlLmxheWVycy5mb3JFYWNoKCBsYXllciA9PiB7XG4gICAgICAgIHJlc3VsdFsgbGF5ZXIuaWQgXSA9IHN0eWxlRnVuY3Rpb25GYWN0b3J5KGxheWVyKTsgLy9uZXcgTGF5ZXJTdHlsZSggbGF5ZXIgKS5nZXRTdHlsZUZ1bmN0aW9uKClcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBsYXllciBNYXBCb3ggU3R5bGUgU3BlYyBMYXllciBkZWZpbml0aW9uXG4gKiBAcmV0dXJuIEZ1bmN0aW9uIGFjY2VwdGluZyBmZWF0dXJlIHByb3BlcnRpZXMsIHpvb20gbGV2ZWwsIGFuZCBnZW9tZXRyeSB0eXBlIGFuZCByZXR1cm5pbmcgYSBMZWFmbGV0IHN0eWxlIG9iamVjdFxuICovXG52YXIgc3R5bGVGdW5jdGlvbkZhY3RvcnkgPSAoIGZ1bmN0aW9uKCBsYXllclN0eWxlIDogTWFwQm94U3R5bGVMYXllciApIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgbGV0IHBhcnNlVmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlIDogYW55LCBmYWxsYmFjayA/OiBhbnkgKSB7XG4gICAgICAgIGlmKCB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHJlc3Npb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZSkgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxsYmFjayB8fCBudWxsO1xuICAgIH1cblxuICAgIGxldCBsYXllclBhaW50IDogTWFwQm94UGFpbnQgID0gbGF5ZXJTdHlsZS5wYWludDtcblxuICAgIGxldCBsaW5lV2lkdGggICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtd2lkdGgnXSwgMSk7XG4gICAgbGV0IG9wYWNpdHkgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGNvbG9yICAgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnZmlsbC1vdXRsaW5lLWNvbG9yJ10gfHwgbGF5ZXJQYWludFsnZmlsbC1jb2xvciddLCAnIzAwMCcpO1xuICAgIGxldCBmaWxsT3BhY2l0eSA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtb3BhY2l0eSddIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtb3BhY2l0eSddLCAxLjApO1xuICAgIGxldCBmaWxsQ29sb3IgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtY29sb3InXSAgIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtY29sb3InXSwgJyMwMDAnKTtcblxuICAgIGxldCBzdHlsZSA6IExlYWZsZXRTdHlsZSA9IHtcbiAgICAgICAgY29sb3IgICAgICA6IGNvbG9yLCAgICAgICAgIC8vc3Ryb2tlIGNvbG9yXG4gICAgICAgIG9wYWNpdHkgICAgOiBvcGFjaXR5LCAgICAgICAvL3N0cm9rZSBvcGFjaXR5XG4gICAgICAgIHdlaWdodCAgICAgOiBsaW5lV2lkdGgsICAgICAvL3N0cm9rZSBzaXplXG4gICAgICAgIGZpbGxPcGFjaXR5OiBmaWxsT3BhY2l0eSwgICAvL2ZpbGwgb3BhY2l0eVxuICAgICAgICBmaWxsQ29sb3IgIDogZmlsbENvbG9yICAgICAgLy9maWxsIGNvbG9yXG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbiggcHJvcGVydGllcyA6IGFueSwgem9vbTogbnVtYmVyLCBnZW9tVHlwZSA6IHN0cmluZyApIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaCgga2V5ID0+IHtcbiAgICAgICAgICAgIGxldCBzdHlsZVZhbCA9IHN0eWxlW2tleV07XG4gICAgICAgICAgICBpZiggc3R5bGVWYWwgJiYgdHlwZW9mKHN0eWxlVmFsLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzdHlsZVZhbC5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tVHlwZSk7XG4gICAgICAgICAgICBlbHNlIHJlc3VsdFtrZXldID0gc3R5bGVWYWw7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59KTtcbiJdfQ==