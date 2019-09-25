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
    var layers = {};
    style.layers.forEach((/**
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
        result[id] = styleFunctionFactory(styles);
    }));
    // style.layers.forEach( layer => {
    //     result[ layer.id ] = getLayerStyle(layer); //new LayerStyle( layer ).getStyleFunction()
    // });
    return result;
}
/**
 * @param {?} layerStyles
 * @return {?}
 */
function styleFunctionFactory(layerStyles) {
    /** @type {?} */
    var styles = layerStyles.map((/**
     * @param {?} layerStyle
     * @return {?}
     */
    function (layerStyle) { return getLayerStyle(layerStyle); }));
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
    var filter = parseValue(layerStyle.filter);
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
var getLayerStyle = ((ɵ0));
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyQkFPQzs7O0lBTkcsOEJBQXNCOztJQUN0QiwrQkFBc0I7O0lBQ3RCLDZCQUFzQjs7SUFDdEIsaUNBQXdCOztJQUN4QixtQ0FBc0I7O0lBQ3RCLGlDQUFzQjs7Ozs7QUFHMUIsOEJBRUM7Ozs7QUFFRCwwQkFjQzs7O0lBYkcsOEJBQXNCOztJQUN0QiwyQkFBc0I7O0lBQ3RCLCtCQUFtQjs7SUFDbkIsNkJBQXdCOztJQUN4QiwyQkFBc0I7O0lBQ3RCLDhCQUFzQjs7SUFDdEIsNEJBQXNCOztJQUN0Qiw0QkFBbUI7O0lBQ25CLDhCQUFxQjs7SUFDckIsNkJBQXNCOztJQUN0Qiw2QkFBc0I7O0lBQ3RCLGlDQUFtQjs7SUFDbkIsNkJBQWtDOzs7OztBQUd0QywrQkFXQzs7O0lBVkcsOEJBQXlCOztJQUN6QixnQ0FBK0g7O0lBQy9ILG9DQUFzQjs7SUFDdEIsa0NBQXlCOzs7O0lBRXpCLG1DQUF5Qjs7SUFDekIsbUNBQXlCOztJQUN6QixrQ0FBc0I7O0lBQ3RCLGtDQUFzQjs7SUFDdEIsaUNBQThCOzs7OztBQUdsQywwQkE0QkM7OztJQTNCRyxpQ0FBMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtJLG9CQUFhLE1BQWM7O1lBQ25CLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRzs7OztRQUFFLFVBQUEsR0FBRztZQUM5QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDOUQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCw2QkFBUTs7Ozs7O0lBQVIsVUFBVSxVQUFnQixFQUFFLElBQWEsRUFBRSxZQUFxQjs7WUFDeEQsRUFBRTs7WUFBRSxFQUFFO1FBQ1YsUUFBTyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLEtBQUssS0FBSztnQkFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDMUQsS0FBSyxLQUFLO2dCQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMxRCxLQUFLLE1BQU07Z0JBQ1AsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sQ0FBQyxDQUFFLE9BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxXQUFXLElBQUksRUFBRSxJQUFJLFVBQVUsQ0FBQyxDQUFDO1lBQzlELEtBQUssSUFBSTtnQkFDTCxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELDJDQUEyQztnQkFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3BCLEtBQUssSUFBSTtnQkFDTCxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELDJDQUEyQztnQkFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3BCLEtBQUssR0FBRztnQkFDSixFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNuQixLQUFLLEdBQUc7Z0JBQ0osRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxJQUFJO2dCQUNMLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRCxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3BCLEtBQUssSUFBSTtnQkFDTCxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNwQixLQUFLLE9BQU87Z0JBQ1IsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QixLQUFLLElBQUk7Z0JBQ0wsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3BELEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLE9BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQy9DLEVBQUUsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUV4QyxLQUFLLE1BQU0sQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDO1lBQ3pCLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ2hDLEtBQUssZUFBZSxDQUFDLENBQUMsT0FBTyxZQUFZLENBQUM7WUFDMUMsS0FBSyxPQUFPLEVBQUksK0JBQStCO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztTQUM3RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCwyQkFBTTs7Ozs7OztJQUFOLFVBQU8sS0FBYyxFQUFFLFVBQWdCLEVBQUUsSUFBYSxFQUFFLFlBQXFCOztZQUNyRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBRyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDaEQsK0JBQStCO1lBQy9CLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBRXpEO2FBQU0sSUFBRyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9FLDBEQUEwRDtZQUMxRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNILDhCQUFTOzs7Ozs7SUFBVCxVQUFXLFVBQWdCLEVBQUUsSUFBYSxFQUFFLFlBQXFCO1FBQWpFLGlCQXdCQzs7WUF2Qk8sTUFBTSxHQUFHLElBQUk7O1lBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUM7Ozs7WUFJdkMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1FBQzFELCtEQUErRDtRQUUvRCw2RUFBNkU7UUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPOzs7OztRQUFFLFVBQUMsR0FBRyxFQUFDLENBQUM7WUFDckIsc0VBQXNFO1lBQ3RFLDJDQUEyQztZQUMzQyxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFBRSxPQUFPO1lBQ3BELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRyxFQUFXLHlCQUF5QjtnQkFDekQsSUFBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFFLEVBQUU7b0JBQ3RCLE1BQU0sR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLG1DQUFtQztpQkFDbEU7YUFDSjtpQkFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsRUFBTyxlQUFlO2dCQUMzQyxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBSSxtQ0FBbUM7YUFDbEU7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUcsQ0FBQyxNQUFNO1lBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7UUFDeEUsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCw2QkFBUTs7O0lBQVI7UUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQSxHQUFHO1lBQ2QsT0FBTyxDQUFDLE9BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ3pFLENBQUMsRUFBQyxDQUNMLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFuSUQsSUFtSUM7Ozs7OztJQWpJRyw4QkFBeUI7Ozs7O0lBQ3pCLDBCQUFzQjs7Ozs7O0FBMEkxQixNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFFLEtBQW1CO0lBRXpELGlGQUFpRjtJQUVqRix1Q0FBdUM7SUFDdkMsaURBQWlEO0lBQ2pELHVDQUF1QztJQUV2QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sRUFBRSxDQUFDLENBQUcsY0FBYztLQUM5Qjs7O1FBR0csTUFBTSxHQUFHLEVBQUU7SUFDZixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7SUFBRSxVQUFBLEtBQUs7OztZQUVuQixFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUNuRCxJQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUUsc0JBQXNCOztZQUN6RCxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFjLG1CQUFtQjtJQUMvRCxDQUFDLEVBQUMsQ0FBQzs7O1FBR0MsTUFBTSxHQUFHLEVBQUU7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU87Ozs7SUFBRSxVQUFBLEVBQUU7O1lBQ3ZCLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDLEVBQUMsQ0FBQTtJQUNGLG1DQUFtQztJQUNuQyw4RkFBOEY7SUFDOUYsTUFBTTtJQUNOLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7Ozs7O0FBSUQsU0FBUyxvQkFBb0IsQ0FBRSxXQUFnQzs7UUFFdkQsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHOzs7O0lBQUUsVUFBQSxVQUFVLElBQUksT0FBQSxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQXpCLENBQXlCLEVBQUU7SUFFdkU7Ozs7OztJQUFPLFVBQVUsVUFBZ0IsRUFBRSxJQUFZLEVBQUUsUUFBaUI7O1lBRTFELEtBQUssR0FBUyxNQUFNLENBQUMsSUFBSTs7OztRQUFFLFVBQUEsS0FBSztZQUNoQyxJQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssV0FBVyxFQUFFOzs7b0JBRTFELEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQztnQkFDN0QsbURBQW1EO2dCQUNuRCxzQ0FBc0M7Z0JBQ3RDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxFQUFDOztZQUVFLE1BQU0sR0FBRyxFQUFFO1FBQ2YsSUFBRyxLQUFLLEVBQUU7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUUsVUFBQSxHQUFHOztvQkFDN0IsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUMvQixJQUFJLFFBQVEsSUFBSSxPQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVc7b0JBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7O29CQUMzRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ2hDLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUMsRUFBQztBQUVOLENBQUM7Ozs7O0FBUXFCLFVBQVUsVUFBNkI7Ozs7O1FBS3JELFVBQVU7Ozs7O0lBQUcsVUFBVyxLQUFXLEVBQUUsUUFBZTtRQUNwRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUc7WUFDaEQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUNJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVztZQUFHLE9BQU8sS0FBSyxDQUFDOztZQUNuRSxPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDakMsQ0FBQyxDQUFBOztRQUVHLE1BQU0sR0FBUyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7UUFFNUMsVUFBVSxHQUFrQixVQUFVLENBQUMsS0FBSzs7UUFFNUMsU0FBUyxHQUFLLFVBQVUsQ0FBRSxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUN0RCxPQUFPLEdBQU8sVUFBVSxDQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUM7O1FBQzFELEtBQUssR0FBUyxVQUFVLENBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFNLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUM7O1FBQzdILFdBQVcsR0FBRyxVQUFVLENBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7UUFDOUYsU0FBUyxHQUFLLFVBQVUsQ0FBRSxVQUFVLENBQUMsWUFBWSxDQUFDLElBQU0sVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsTUFBTSxDQUFDOztRQUUvRixLQUFLLEdBQWtCO1FBQ3ZCLEtBQUssRUFBUSxLQUFLOztRQUNsQixPQUFPLEVBQU0sT0FBTzs7UUFDcEIsTUFBTSxFQUFPLFNBQVM7O1FBQ3RCLFdBQVcsRUFBRSxXQUFXOztRQUN4QixTQUFTLEVBQUksU0FBUyxDQUFNLFlBQVk7S0FDM0M7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUUsS0FBSztLQUNmLENBQUM7SUFFRix5RUFBeUU7SUFDekUsdUJBQXVCO0lBQ3ZCLEVBQUU7SUFDRiw4Q0FBOEM7SUFDOUMscUVBQXFFO0lBQ3JFLDZEQUE2RDtJQUM3RCxvREFBb0Q7SUFDcEQsNEJBQTRCO0lBQzVCLFlBQVk7SUFDWix5Q0FBeUM7SUFDekMsUUFBUTtJQUNSLEVBQUU7SUFDRiwyQ0FBMkM7SUFDM0MscUNBQXFDO0lBQ3JDLHFFQUFxRTtJQUNyRSwyRUFBMkU7SUFDM0UsdUNBQXVDO0lBQ3ZDLFVBQVU7SUFDVixxQkFBcUI7SUFDckIsS0FBSztBQUNULENBQUM7Ozs7OztJQXhERyxhQUFhLEdBQUcsTUF3RGxCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbnRlcmZhY2UgTGVhZmxldFN0eWxlIHtcbiAgICB3ZWlnaHQgICAgICA/OiBudW1iZXI7XG4gICAgb3BhY2l0eSAgICAgPzogbnVtYmVyO1xuICAgIGNvbG9yICAgICAgID86IHN0cmluZztcbiAgICBkYXNoQXJyYXkgICA/OiBudW1iZXJbXTtcbiAgICBmaWxsT3BhY2l0eSA/OiBudW1iZXI7XG4gICAgZmlsbENvbG9yICAgPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTGVhZmxldFN0eWxlTWFwIHtcbiAgICBba2V5OnN0cmluZ106IEZ1bmN0aW9uIHwgTGVhZmxldFN0eWxlXG59XG5cbmludGVyZmFjZSBNYXBCb3hTdHlsZSB7XG4gICAgdmVyc2lvbiAgICAgIDogbnVtYmVyOyAgLy9TdHlsZSBzcGVjaWZpY2F0aW9uIHZlcnNpb24gbnVtYmVyLiBNdXN0IGJlIDguXG4gICAgbmFtZSAgICAgICAgPzogc3RyaW5nOyAgLy9BIGh1bWFuLXJlYWRhYmxlIG5hbWUgZm9yIHRoZSBzdHlsZS5cbiAgICBtZXRhZGF0YSAgICA/OiBhbnk7ICAgICAvL0FyYml0cmFyeSBwcm9wZXJ0aWVzIHVzZWZ1bCB0byB0cmFjayB3aXRoIHRoZSBzdHlsZXNoZWV0LCBidXQgZG8gbm90IGluZmx1ZW5jZSByZW5kZXJpbmcuIFByb3BlcnRpZXMgc2hvdWxkIGJlIHByZWZpeGVkIHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgJ21hcGJveDonLlxuICAgIGNlbnRlciAgICAgID86IG51bWJlcltdOyAvL0RlZmF1bHQgbWFwIGNlbnRlciBpbiBsb25naXR1ZGUgYW5kIGxhdGl0dWRlLiBUaGUgc3R5bGUgY2VudGVyIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgem9vbSAgICAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IHpvb20gbGV2ZWwuIFRoZSBzdHlsZSB6b29tIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgYmVhcmluZyAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IGJlYXJpbmcsIGluIGRlZ3JlZXMuIFRoZSBiZWFyaW5nIGlzIHRoZSBjb21wYXNzIGRpcmVjdGlvbiB0aGF0IGlzIFwidXBcIjsgZm9yIGV4YW1wbGUsIGEgYmVhcmluZyBvZiA5MMKwIG9yaWVudHMgdGhlIG1hcCBzbyB0aGF0IGVhc3QgaXMgdXAuIFRoaXMgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBwaXRjaCAgICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgcGl0Y2gsIGluIGRlZ3JlZXMuIFplcm8gaXMgcGVycGVuZGljdWxhciB0byB0aGUgc3VyZmFjZSwgZm9yIGEgbG9vayBzdHJhaWdodCBkb3duIGF0IHRoZSBtYXAsIHdoaWxlIGEgZ3JlYXRlciB2YWx1ZSBsaWtlIDYwIGxvb2tzIGFoZWFkIHRvd2FyZHMgdGhlIGhvcml6b24uIFRoZSBzdHlsZSBwaXRjaCB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIGxpZ2h0ICAgICAgID86IGFueTsgICAgIC8vVGhlIGdsb2JhbCBsaWdodCBzb3VyY2UuXG4gICAgc291cmNlcyAgICAgPzogYW55W107ICAgLy9EYXRhIHNvdXJjZSBzcGVjaWZpY2F0aW9ucy5cbiAgICBzcHJpdGUgICAgICA/OiBzdHJpbmc7ICAvL0EgYmFzZSBVUkwgZm9yIHJldHJpZXZpbmcgdGhlIHNwcml0ZSBpbWFnZSBhbmQgbWV0YWRhdGEuIFRoZSBleHRlbnNpb25zIC5wbmcsIC5qc29uIGFuZCBzY2FsZSBmYWN0b3IgQDJ4LnBuZyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYXBwZW5kZWQuIFRoaXMgcHJvcGVydHkgaXMgcmVxdWlyZWQgaWYgYW55IGxheWVyIHVzZXMgdGhlIGJhY2tncm91bmQtcGF0dGVybiwgZmlsbC1wYXR0ZXJuLCBsaW5lLXBhdHRlcm4sIGZpbGwtZXh0cnVzaW9uLXBhdHRlcm4sIG9yIGljb24taW1hZ2UgcHJvcGVydGllcy4gVGhlIFVSTCBtdXN0IGJlIGFic29sdXRlLCBjb250YWluaW5nIHRoZSBzY2hlbWUsIGF1dGhvcml0eSBhbmQgcGF0aCBjb21wb25lbnRzLlxuICAgIGdseXBocyAgICAgID86IHN0cmluZzsgIC8vQSBVUkwgdGVtcGxhdGUgZm9yIGxvYWRpbmcgc2lnbmVkLWRpc3RhbmNlLWZpZWxkIGdseXBoIHNldHMgaW4gUEJGIGZvcm1hdC4gVGhlIFVSTCBtdXN0IGluY2x1ZGUge2ZvbnRzdGFja30gYW5kIHtyYW5nZX0gdG9rZW5zLiBUaGlzIHByb3BlcnR5IGlzIHJlcXVpcmVkIGlmIGFueSBsYXllciB1c2VzIHRoZSB0ZXh0LWZpZWxkIGxheW91dCBwcm9wZXJ0eS4gVGhlIFVSTCBtdXN0IGJlIGFic29sdXRlLCBjb250YWluaW5nIHRoZSBzY2hlbWUsIGF1dGhvcml0eSBhbmQgcGF0aCBjb21wb25lbnRzLlxuICAgIHRyYW5zaXRpb24gID86IGFueTsgICAgIC8vQSBnbG9iYWwgdHJhbnNpdGlvbiBkZWZpbml0aW9uIHRvIHVzZSBhcyBhIGRlZmF1bHQgYWNyb3NzIHByb3BlcnRpZXMsIHRvIGJlIHVzZWQgZm9yIHRpbWluZyB0cmFuc2l0aW9ucyBiZXR3ZWVuIG9uZSB2YWx1ZSBhbmQgdGhlIG5leHQgd2hlbiBubyBwcm9wZXJ0eS1zcGVjaWZpYyB0cmFuc2l0aW9uIGlzIHNldC4gQ29sbGlzaW9uLWJhc2VkIHN5bWJvbCBmYWRpbmcgaXMgY29udHJvbGxlZCBpbmRlcGVuZGVudGx5IG9mIHRoZSBzdHlsZSdzIHRyYW5zaXRpb24gcHJvcGVydHkuXG4gICAgbGF5ZXJzICAgICAgPzogTWFwQm94U3R5bGVMYXllcltdOyAgIC8vTGF5ZXJzIHdpbGwgYmUgZHJhd24gaW4gdGhlIG9yZGVyIG9mIHRoaXMgYXJyYXkuXG59XG5cbmludGVyZmFjZSBNYXBCb3hTdHlsZUxheWVyIHtcbiAgICBpZCAgICAgICAgICAgICAgOiBzdHJpbmc7ICAgICAgLy9VbmlxdWUgbGF5ZXIgbmFtZS5cbiAgICB0eXBlICAgICAgICAgICAgOiBcImZpbGxcIiB8IFwibGluZVwiIHwgXCJzeW1ib2xcIiB8IFwiY2lyY2xlXCIgfCBcImhlYXRtYXBcIiB8IFwiZmlsbC1leHRydXNpb25cIiB8IFwicmFzdGVyXCIgfCBcImhpbGxzaGFkZVwiIHwgXCJiYWNrZ3JvdW5kXCI7IC8vUmVuZGVyaW5nIHR5cGUgb2YgdGhpcyBsYXllci5cbiAgICBtZXRhZGF0YSAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgbGF5ZXIsIGJ1dCBkbyBub3QgaW5mbHVlbmNlIHJlbmRlcmluZy4gUHJvcGVydGllcyBzaG91bGQgYmUgcHJlZml4ZWQgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSAnbWFwYm94OicuXG4gICAgc291cmNlICAgICAgICAgPzogc3RyaW5nOyAgICAgIC8vTmFtZSBvZiBhIHNvdXJjZSBkZXNjcmlwdGlvbiB0byBiZSB1c2VkIGZvciB0aGlzIGxheWVyLiBSZXF1aXJlZCBmb3IgYWxsIGxheWVyIHR5cGVzIGV4Y2VwdCBiYWNrZ3JvdW5kLlxuICAgICdzb3VyY2UtbGF5ZXInID86IHN0cmluZzsgLy9MYXllciB0byB1c2UgZnJvbSBhIHZlY3RvciB0aWxlIHNvdXJjZS4gUmVxdWlyZWQgZm9yIHZlY3RvciB0aWxlIHNvdXJjZXM7IHByb2hpYml0ZWQgZm9yIGFsbCBvdGhlciBzb3VyY2UgdHlwZXMsIGluY2x1ZGluZyBHZW9KU09OIHNvdXJjZXMuXG4gICAgbWluem9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1pbmltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBsZXNzIHRoYW4gdGhlIG1pbnpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBtYXh6b29tICAgICAgICA/OiBudW1iZXI7ICAgICAgLy9UaGUgbWF4aW11bSB6b29tIGxldmVsIGZvciB0aGUgbGF5ZXIuIEF0IHpvb20gbGV2ZWxzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgbWF4em9vbSwgdGhlIGxheWVyIHdpbGwgYmUgaGlkZGVuLlxuICAgIGZpbHRlciAgICAgICAgID86IGFueTsgICAgICAgICAvL0EgZXhwcmVzc2lvbiBzcGVjaWZ5aW5nIGNvbmRpdGlvbnMgb24gc291cmNlIGZlYXR1cmVzLiBPbmx5IGZlYXR1cmVzIHRoYXQgbWF0Y2ggdGhlIGZpbHRlciBhcmUgZGlzcGxheWVkLiBab29tIGV4cHJlc3Npb25zIGluIGZpbHRlcnMgYXJlIG9ubHkgZXZhbHVhdGVkIGF0IGludGVnZXIgem9vbSBsZXZlbHMuIFRoZSBmZWF0dXJlLXN0YXRlIGV4cHJlc3Npb24gaXMgbm90IHN1cHBvcnRlZCBpbiBmaWx0ZXIgZXhwcmVzc2lvbnMuXG4gICAgbGF5b3V0ICAgICAgICAgPzogYW55OyAgICAgICAgIC8vTGF5b3V0IHByb3BlcnRpZXMgZm9yIHRoZSBsYXllci5cbiAgICBwYWludCAgICAgICAgICA/OiBNYXBCb3hQYWludDsgLy9EZWZhdWx0IHBhaW50IHByb3BlcnRpZXMgZm9yIHRoaXMgbGF5ZXIuXG59XG5cbmludGVyZmFjZSBNYXBCb3hQYWludCB7XG4gICAgdmlzaWJpbGl0eSAgICAgICAgICAgPzogXCJ2aXNpYmxlXCIgfCBcIm5vbmVcIjsgICAvL1doZXRoZXIgdGhpcyBsYXllciBpcyBkaXNwbGF5ZWQuXG4gICAgJ2JhY2tncm91bmQtY29sb3InICAgPzogc3RyaW5nOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgYmFja2dyb3VuZCB3aWxsIGJlIGRyYXduLlxuICAgICdiYWNrZ3JvdW5kLXBhdHRlcm4nID86IHN0cmluZzsgICAgIC8vTmFtZSBvZiBpbWFnZSBpbiBzcHJpdGUgdG8gdXNlIGZvciBkcmF3aW5nIGFuIGltYWdlIGJhY2tncm91bmQuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknID86IG51bWJlcjsgICAgIC8vVGhlIG9wYWNpdHkgYXQgd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnZmlsbC1hbnRpYWxpYXMnICAgICA/OiBib29sZWFuOyAgICAvL1doZXRoZXIgb3Igbm90IHRoZSBmaWxsIHNob3VsZCBiZSBhbnRpYWxpYXNlZC5cbiAgICAnZmlsbC1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IG9mIHRoZSBlbnRpcmUgZmlsbCBsYXllci4gSW4gY29udHJhc3QgdG8gdGhlIGZpbGwtY29sb3IsIHRoaXMgdmFsdWUgd2lsbCBhbHNvIGFmZmVjdCB0aGUgMXB4IHN0cm9rZSBhcm91bmQgdGhlIGZpbGwsIGlmIHRoZSBzdHJva2UgaXMgdXNlZC5cbiAgICAnZmlsbC1jb2xvcicgICAgICAgICA/OiBzdHJpbmd8YW55W107ICAvL1RoZSBjb2xvciBvZiB0aGUgZmlsbGVkIHBhcnQgb2YgdGhpcyBsYXllci4gVGhpcyBjb2xvciBjYW4gYmUgc3BlY2lmaWVkIGFzIHJnYmEgd2l0aCBhbiBhbHBoYSBjb21wb25lbnQgYW5kIHRoZSBjb2xvcidzIG9wYWNpdHkgd2lsbCBub3QgYWZmZWN0IHRoZSBvcGFjaXR5IG9mIHRoZSAxcHggc3Ryb2tlLCBpZiBpdCBpcyB1c2VkLlxuICAgICdmaWxsLW91dGxpbmUtY29sb3InID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIG91dGxpbmUgY29sb3Igb2YgdGhlIGZpbGwuIE1hdGNoZXMgdGhlIHZhbHVlIG9mIGZpbGwtY29sb3IgaWYgdW5zcGVjaWZpZWQuXG4gICAgJ2ZpbGwtdHJhbnNsYXRlJyAgICAgPzogbnVtYmVyW107ICAgLy9UaGUgZ2VvbWV0cnkncyBvZmZzZXQuIFZhbHVlcyBhcmUgW3gsIHldIHdoZXJlIG5lZ2F0aXZlcyBpbmRpY2F0ZSBsZWZ0IGFuZCB1cCwgcmVzcGVjdGl2ZWx5LlxuICAgICdmaWxsLXRyYW5zbGF0ZS1hbmNob3InIDogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBmaWxsLXRyYW5zbGF0ZS5cbiAgICAnZmlsbC1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBmaWxscy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgYSBmYWN0b3Igb2YgdHdvICgyLCA0LCA4LCAuLi4sIDUxMikuIE5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtY2FwJyAgICAgICAgICAgPzogXCJidXR0XCIgfCBcInJvdW5kXCIgfCBcInNxdWFyZVwiOyAvL1RoZSBkaXNwbGF5IG9mIGxpbmUgZW5kaW5ncy5cbiAgICAnbGluZS1qb2luJyAgICAgICAgICA/OiAgXCJiZXZlbFwiIHwgXCJyb3VuZFwiIHwgXCJtaXRlclwiIC8vVGhlIGRpc3BsYXkgb2YgbGluZXMgd2hlbiBqb2luaW5nLlxuICAgICdsaW5lLW1pdGVyLWxpbWl0JyAgID86IG51bWJlcjsgICAgIC8vVXNlZCB0byBhdXRvbWF0aWNhbGx5IGNvbnZlcnQgbWl0ZXIgam9pbnMgdG8gYmV2ZWwgam9pbnMgZm9yIHNoYXJwIGFuZ2xlcy5cbiAgICAnbGluZS1yb3VuZC1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IHJvdW5kIGpvaW5zIHRvIG1pdGVyIGpvaW5zIGZvciBzaGFsbG93IGFuZ2xlcy5cbiAgICAnbGluZS1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBsaW5lIHdpbGwgYmUgZHJhd24uXG4gICAgJ2xpbmUtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnbGluZS10cmFuc2xhdGUtYW5jaG9yJyA/OiBcIm1hcFwiIHwgXCJ2aWV3cG9ydFwiOyAgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBsaW5lLXRyYW5zbGF0ZS5cbiAgICAnbGluZS13aWR0aCcgICAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1N0cm9rZSB0aGlja25lc3MuXG4gICAgJ2xpbmUtZ2FwLXdpZHRoJyAgICAgPzogbnVtYmVyOyAgICAgLy9EcmF3cyBhIGxpbmUgY2FzaW5nIG91dHNpZGUgb2YgYSBsaW5lJ3MgYWN0dWFsIHBhdGguIFZhbHVlIGluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGlubmVyIGdhcC5cbiAgICAnbGluZS1vZmZzZXQnICAgICAgICA/OiBudW1iZXI7ICAgICAvL1RoZSBsaW5lJ3Mgb2Zmc2V0LiBGb3IgbGluZWFyIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIG9mZnNldHMgdGhlIGxpbmUgdG8gdGhlIHJpZ2h0LCByZWxhdGl2ZSB0byB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsaW5lLCBhbmQgYSBuZWdhdGl2ZSB2YWx1ZSB0byB0aGUgbGVmdC4gRm9yIHBvbHlnb24gZmVhdHVyZXMsIGEgcG9zaXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBpbnNldCwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBvdXRzZXQuXG4gICAgJ2xpbmUtYmx1cicgICAgICAgICAgPzogbnVtYmVyOyAgICAgLy9CbHVyIGFwcGxpZWQgdG8gdGhlIGxpbmUsIGluIHBpeGVscy5cbiAgICAnbGluZS1kYXNoYXJyYXknICAgICA/OiBudW1iZXJbXTsgICAvL1NwZWNpZmllcyB0aGUgbGVuZ3RocyBvZiB0aGUgYWx0ZXJuYXRpbmcgZGFzaGVzIGFuZCBnYXBzIHRoYXQgZm9ybSB0aGUgZGFzaCBwYXR0ZXJuLiBUaGUgbGVuZ3RocyBhcmUgbGF0ZXIgc2NhbGVkIGJ5IHRoZSBsaW5lIHdpZHRoLiBUbyBjb252ZXJ0IGEgZGFzaCBsZW5ndGggdG8gcGl4ZWxzLCBtdWx0aXBseSB0aGUgbGVuZ3RoIGJ5IHRoZSBjdXJyZW50IGxpbmUgd2lkdGguIE5vdGUgdGhhdCBHZW9KU09OIHNvdXJjZXMgd2l0aCBsaW5lTWV0cmljczogdHJ1ZSBzcGVjaWZpZWQgd29uJ3QgcmVuZGVyIGRhc2hlZCBsaW5lcyB0byB0aGUgZXhwZWN0ZWQgc2NhbGUuIEFsc28gbm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBsaW5lcy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWdyYWRpZW50JyAgICAgID86IHN0cmluZzsgICAgIC8vRGVmaW5lcyBhIGdyYWRpZW50IHdpdGggd2hpY2ggdG8gY29sb3IgYSBsaW5lIGZlYXR1cmUuIENhbiBvbmx5IGJlIHVzZWQgd2l0aCBHZW9KU09OIHNvdXJjZXMgdGhhdCBzcGVjaWZ5IFwibGluZU1ldHJpY3NcIjogdHJ1ZS5cbiAgICAvL1RPRE8gc3ltYm9sc1xufVxuXG5cblxuXG5cblxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBldmFsdWF0YWJsZSBleHByZXNzaW9uIGFzc29jaWF0ZWQgd2l0aCBhIGxheWVyIHN0eWxlLFxuICogZm9sbG93aW5nIE1hcEJveCBTdHlsZSBTcGVjIGZvcm1hdC5cbiAqIEV4cHJlc3Npb25zIGFyZSBhcnJheXMgb2Y6XG4gKiAgIC0gb3BlcmF0b3Iga2V5ICgnZ2V0JywgJz09JywgJ2hhcycsIGV0YylcbiAqICAgLSBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnMgaW5jbHVkaW5nIG5lc3RlZCBleHByZXNzaW9uc1xuICpcbiAqICBFeGFtcGxlczpcbiAqXG4gKiAgWyAnaGFzJywgJ3Byb3BlcnR5TmFtZScgXSAgIC8vIHNpbXBsZSBleHByZXNzaW9uIGNoZWNraW5nIGZvciBleGlzdGFuY2Ugb2YgYSBzcGVjaWZpYyBmZWF0dXJlIHByb3BlcnR5XG4gKlxuICogIFtcbiAqICAgICc9PScgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBvZiBleHByZXNzaW9uIChlcXVhbGl0eSBjb21wYXJpc29uKVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5QScgXSwgICAvLyBuZXN0ZWQgZXhwcmVzc2lvbiB0byBleHRyYWN0IGZlYXR1cmUncyBwcm9wZXJ0eSB2YWx1ZVxuICogICAgJ2V4cGVjdGVkVmFsdWUnICAgICAgICAgICAvLyB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqICBdXG4gKlxuICogIFtcbiAqICAgICdtYXRjaCcsICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoJ3N3aXRjaCcgc3RhdGVtZW50KVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5TmFtZScgXSwgLy8gZmlyc3QgcGFyYW0gaXMgYW5vdGhlciBleHByZXNzaW9uIHRvIGV4dHJhY3QgYSBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdBJywgJ3ZhbHVlRm9yQScsICAgICAgICAgIC8vIG5leHQgdHdvIHBhcmFtcyBhcmUgZmlyc3QgJ2Nhc2UnIG9mIFwic3dpdGNoXCJcbiAqICAgICdCJywgJ3ZhbHVlRm9yQicsICAgICAgICAgIC8vIHNlY29uZCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgICAnZmFsbGJhY2tWYWx1ZScgICAgICAgICAgICAvLyBkZWZhdWx0ICdjYXNlJyBmb3IgJ3N3aXRjaCdcbiAqICBdXG4gKlxuICovXG5jbGFzcyBFeHByZXNzaW9uIHtcblxuICAgIHByaXZhdGUgb3BlcmF0b3I6IHN0cmluZztcbiAgICBwcml2YXRlIGFyZ3MgPzogYW55W107XG5cbiAgICBjb25zdHJ1Y3RvciggZmlsdGVyIDogYW55W10gKSB7XG4gICAgICAgIGxldCBhcnIgPSBmaWx0ZXIuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBhcnJbMF07XG4gICAgICAgIHRoaXMuYXJncyA9IGFyci5zcGxpY2UoMSkubWFwKCBhcmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoIGFyZyApID8gbmV3IEV4cHJlc3Npb24oIGFyZyApIDogYXJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uXG4gICAgICovXG4gICAgZXZhbHVhdGUoIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHAxLCBwMjtcbiAgICAgICAgc3dpdGNoKHRoaXMub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICBjYXNlICdoYXMnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgY2FzZSAnIWhhcyc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhKCB0eXBlb2YocDEpICE9PSAndW5kZWZpbmVkJyAmJiBwMSBpbiBwcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGNhc2UgJz09JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJHtwMX0gPT0gJHtwMn1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPT0gcDI7XG4gICAgICAgICAgICBjYXNlICchPSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ICE9ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxICE9IHAyO1xuICAgICAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPiBwMjtcbiAgICAgICAgICAgIGNhc2UgJzwnOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDwgcDI7XG4gICAgICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPj0gcDI7XG4gICAgICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPD0gcDI7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHAxKTtcbiAgICAgICAgICAgIGNhc2UgJ2F0JyA6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mKHAxKSA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShwMikgJiZcbiAgICAgICAgICAgICAgICAgICAgcDIubGVuZ3RoID49IHAxID8gcDJbcDFdIDogbnVsbDtcblxuICAgICAgICAgICAgY2FzZSAnem9vbSc6IHJldHVybiB6b29tO1xuICAgICAgICAgICAgY2FzZSAnaWQnOiByZXR1cm4gcHJvcGVydGllcy5pZDtcbiAgICAgICAgICAgIGNhc2UgJ2dlb21ldHJ5LXR5cGUnOiByZXR1cm4gZ2VvbWV0cnlUeXBlO1xuICAgICAgICAgICAgY2FzZSAnbWF0Y2gnIDogIC8vd29ya3MgbGlrZSBhIHN3aXRjaCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTWF0Y2gocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgb2YgdGhlIGFyZ3VtZW50ICh3aGljaCBtYXkgYmUgcmVzdWx0IG9mIGFuIGV4cHJlc3Npb24pXG4gICAgICovXG4gICAgZ2V0QXJnKGluZGV4IDogbnVtYmVyLCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcpIDogYW55IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5hcmdzW2luZGV4XTtcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vYXJnIGlzIGEgbmVzdGVkIGV4cHJlc3Npb24uLi5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuXG4gICAgICAgIH0gZWxzZSBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJyAmJiBwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy9hcmcgaXMgYSBwcm9wZXJ0eSBuYW1lIGluc3RlYWQgb2YgYSBuZXN0ZWQgZXhwcmVzc2lvbi4uLlxuICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXNbdmFsdWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgYXNzb2NpYXRlZCB3aXRoIG1hdGNoaW5nIGNvbmRpdGlvbiBvZiBleHByZXNzaW9uLCBvciBmYWxsYmFjayB2YWx1ZVxuICAgICAqL1xuICAgIGZpbmRNYXRjaCggcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nICkgOiBhbnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbCwgZW5kID0gdGhpcy5hcmdzLmxlbmd0aC0xO1xuXG4gICAgICAgIC8vdGhlIGlucHV0IHZhbHVlIHRvIHRlc3QgYWdhaW5zdFxuICAgICAgICAvLyAgLi4uIHNob3VsZCBiZSB2YWx1ZSBvZiBJbnB1dCBwb3J0aW9uIChpZSwgXCJMYWtlXCIgZm9yIHdldGxhbmRzKVxuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkV4cHJlc3Npb24ubWF0Y2ggLSBcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSApO1xuXG4gICAgICAgIC8vZmluZCB2YWx1ZSBpbnNpZGUgcmVtYWluaW5nIGFyZ3MgdG8gYXNzaWduIHN0eWxlIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlXG4gICAgICAgIHRoaXMuYXJncy5mb3JFYWNoKCAoYXJnLGkpID0+IHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmaXJzdCBhcmcgKHNlZSBhYm92ZSkgYW5kIGxhc3QgYXJnIChpdCdzIHRoZSBmYWxsYmFjayB2YWx1ZSlcbiAgICAgICAgICAgIC8vIGFsc28gc2tpcCBpZiB3ZSd2ZSBhbHJlYWR5IGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgIGlmKCByZXN1bHQgIT09IG51bGwgfHwgaSA9PT0gMCB8fCBpID09PSBlbmQpIHJldHVybjtcbiAgICAgICAgICAgIGlmKCBBcnJheS5pc0FycmF5KGFyZykgKSB7ICAgICAgICAgIC8vYXJyYXkgb2YgbGl0ZXJhbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZih+YXJnLmluZGV4T2YoIHZhbHVlICkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKCBhcmcgPT0gdmFsdWUgKXsgICAgICAvL2xpdGVyYWwgdmFsdWVcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFyZ3NbaSsxXTsgICAgLy9tYXRjaCwgcmV0dXJuIG5leHQgdmFsdWUgaW4gYXJyYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKCFyZXN1bHQpIHJlc3VsdCA9IHRoaXMuYXJnc1tlbmRdOyAvL2xhc3QgYXJnIGlzIGFsd2F5cyBmYWxsYmFjayB2YWx1ZVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk1hdGNoIHJldHVybmVkOiBcIiArIHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5vcGVyYXRvcl0uY29uY2F0KFxuICAgICAgICAgICAgdGhpcy5hcmdzLm1hcCggYXJnID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHR5cGVvZihhcmcuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJykgPyBhcmcudG9TdHJpbmcoKSA6IGFyZztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuam9pbignLCcpO1xuICAgIH1cbn1cblxuXG5cblxuXG4vKipcbiAqIEBwYXJhbSBzdHlsZSBNYXBCb3ggU3R5bGUgZGVmaW5pdGlvblxuICogQHJldHVybiBvYmplY3QgYXNzb2NpYXRpbmcgTGVhZmxldCBzdHlsZXMgd2l0aCBsYXllciBpZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VNYXBCb3hTdHlsZSggc3R5bGUgOiBNYXBCb3hTdHlsZSApIDogeyBba2V5OnN0cmluZ106TGVhZmxldFN0eWxlTWFwIH0ge1xuXG4gICAgLy9UT0RPIHZhbGlkYXRlIHN0eWxlLnZlcnNpb24gdG8gbWFrZSBzdXJlIHdlIGFyZSBwYXJzaW5nIHNvbWV0aGluZyB3ZSB1bmRlcnN0YW5kXG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIlBhcnNpbmcgTWFwQm94IFN0eWxlXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHN0eWxlLCBudWxsLCAnICcpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuXG4gICAgaWYoICFzdHlsZS5sYXllcnMgfHwgIUFycmF5LmlzQXJyYXkoc3R5bGUubGF5ZXJzKSB8fCAhc3R5bGUubGF5ZXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBubyBsYXllciBkZWZpbml0aW9uc1wiKTtcbiAgICAgICAgcmV0dXJuIHt9OyAgIC8vZW1wdHkgc3R5bGVzXG4gICAgfVxuXG4gICAgLy9oYXZlIHRvIGdyb3VwIGxheWVycyB3aXRoIHNhbWUgaWQgYnV0IHdpdGggZGlmZmVyZW50IGZpbHRlcnMgdW5kZXIgdGhlIHNhbWUgc3R5bGUgZnVuY3Rpb25cbiAgICBsZXQgbGF5ZXJzID0ge307XG4gICAgc3R5bGUubGF5ZXJzLmZvckVhY2goIGxheWVyID0+IHtcbiAgICAgICAgLy91c2Ugc291cmNlLWxheWVyIGtleSBmaXJzdCwgZmFsbGJhY2sgdG8gbGF5ZXIgaWRcbiAgICAgICAgbGV0IGlkID0gKGxheWVyWydzb3VyY2UtbGF5ZXInXSB8fCBsYXllci5pZCkudHJpbSgpO1xuICAgICAgICBpZihsYXllcnNbaWRdKSBsYXllcnNbaWRdLnB1c2gobGF5ZXIpOyAgLy9sYXllciBhbHJlYWR5IGV4aXN0c1xuICAgICAgICBlbHNlIGxheWVyc1tpZF0gPSBbbGF5ZXJdOyAgICAgICAgICAgICAgLy9uZXcgbGF5ZXIncyBzdHlsZVxuICAgIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGxheWVycywgbnVsbCwgJyAnKSk7XG5cbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmtleXMobGF5ZXJzKS5mb3JFYWNoKCBpZCA9PiB7XG4gICAgICAgIGxldCBzdHlsZXMgPSBsYXllcnNbaWRdOyAgICAvL2FycmF5IG9mIDEgb3IgbW9yZSBmb3IgZ2l2ZW4gaWQgKGRpZmZlcmVudGlhdGVkIGJ5IGZpbHRlcnMpXG4gICAgICAgIHJlc3VsdFtpZF0gPSBzdHlsZUZ1bmN0aW9uRmFjdG9yeShzdHlsZXMpO1xuICAgIH0pXG4gICAgLy8gc3R5bGUubGF5ZXJzLmZvckVhY2goIGxheWVyID0+IHtcbiAgICAvLyAgICAgcmVzdWx0WyBsYXllci5pZCBdID0gZ2V0TGF5ZXJTdHlsZShsYXllcik7IC8vbmV3IExheWVyU3R5bGUoIGxheWVyICkuZ2V0U3R5bGVGdW5jdGlvbigpXG4gICAgLy8gfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb25GYWN0b3J5KCBsYXllclN0eWxlcyA6IE1hcEJveFN0eWxlTGF5ZXJbXSApIDogRnVuY3Rpb24ge1xuXG4gICAgbGV0IHN0eWxlcyA9IGxheWVyU3R5bGVzLm1hcCggbGF5ZXJTdHlsZSA9PiBnZXRMYXllclN0eWxlKGxheWVyU3R5bGUpICk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oIHByb3BlcnRpZXMgOiBhbnksIHpvb206IG51bWJlciwgZ2VvbVR5cGUgOiBzdHJpbmcgKSB7XG5cbiAgICAgICAgbGV0IG1hdGNoIDogYW55ID0gc3R5bGVzLmZpbmQoIHN0eWxlID0+IHtcbiAgICAgICAgICAgIGlmKHN0eWxlLmZpbHRlciAmJiB0eXBlb2Yoc3R5bGUuZmlsdGVyLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBhIGZpbHRlci4uLiBcIiArIHN0eWxlLmZpbHRlci50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBzdHlsZS5maWx0ZXIuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGlmKCFmb3VuZCkgY29uc29sZS5sb2coXCJGaWx0ZXIgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgICAgICAgICAgICAgLy8gZWxzZSBjb25zb2xlLmxvZyhcIkZpbHRlciBtYXRjaGVzXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIGlmKG1hdGNoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtYXRjaC5zdHlsZSkuZm9yRWFjaCgga2V5ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWwgPSBtYXRjaC5zdHlsZVtrZXldO1xuICAgICAgICAgICAgICAgIGlmKCBzdHlsZVZhbCAmJiB0eXBlb2Yoc3R5bGVWYWwuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBzdHlsZVZhbC5ldmFsdWF0ZShwcm9wZXJ0aWVzLCB6b29tLCBnZW9tVHlwZSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXN1bHRba2V5XSA9IHN0eWxlVmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldhcm5pbmcsIG5vIHN0eWxlIGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxufVxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgTWFwQm94IFN0eWxlIFNwZWMgTGF5ZXIgZGVmaW5pdGlvblxuICogQHJldHVybiBGdW5jdGlvbiBhY2NlcHRpbmcgZmVhdHVyZSBwcm9wZXJ0aWVzLCB6b29tIGxldmVsLCBhbmQgZ2VvbWV0cnkgdHlwZSBhbmQgcmV0dXJuaW5nIGEgTGVhZmxldCBzdHlsZSBvYmplY3RcbiAqL1xudmFyIGdldExheWVyU3R5bGUgPSAoIGZ1bmN0aW9uKCBsYXllclN0eWxlIDogTWFwQm94U3R5bGVMYXllciApIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgbGV0IHBhcnNlVmFsdWUgPSBmdW5jdGlvbiAoIHZhbHVlIDogYW55LCBmYWxsYmFjayA/OiBhbnkgKSB7XG4gICAgICAgIGlmKCB2YWx1ZSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEV4cHJlc3Npb24odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZih2YWx1ZSkgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxsYmFjayB8fCBudWxsO1xuICAgIH1cblxuICAgIGxldCBmaWx0ZXIgOiBhbnkgPSBwYXJzZVZhbHVlKGxheWVyU3R5bGUuZmlsdGVyKTtcblxuICAgIGxldCBsYXllclBhaW50IDogTWFwQm94UGFpbnQgID0gbGF5ZXJTdHlsZS5wYWludDtcblxuICAgIGxldCBsaW5lV2lkdGggICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtd2lkdGgnXSwgMSk7XG4gICAgbGV0IG9wYWNpdHkgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGNvbG9yICAgICAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnZmlsbC1vdXRsaW5lLWNvbG9yJ10gfHwgbGF5ZXJQYWludFsnZmlsbC1jb2xvciddLCAnIzAwMCcpO1xuICAgIGxldCBmaWxsT3BhY2l0eSA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtb3BhY2l0eSddIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtb3BhY2l0eSddLCAxLjApO1xuICAgIGxldCBmaWxsQ29sb3IgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2ZpbGwtY29sb3InXSAgIHx8IGxheWVyUGFpbnRbJ2JhY2tncm91bmQtY29sb3InXSwgJyMwMDAnKTtcblxuICAgIGxldCBzdHlsZSA6IExlYWZsZXRTdHlsZSA9IHtcbiAgICAgICAgY29sb3IgICAgICA6IGNvbG9yLCAgICAgICAgIC8vc3Ryb2tlIGNvbG9yXG4gICAgICAgIG9wYWNpdHkgICAgOiBvcGFjaXR5LCAgICAgICAvL3N0cm9rZSBvcGFjaXR5XG4gICAgICAgIHdlaWdodCAgICAgOiBsaW5lV2lkdGgsICAgICAvL3N0cm9rZSBzaXplXG4gICAgICAgIGZpbGxPcGFjaXR5OiBmaWxsT3BhY2l0eSwgICAvL2ZpbGwgb3BhY2l0eVxuICAgICAgICBmaWxsQ29sb3IgIDogZmlsbENvbG9yICAgICAgLy9maWxsIGNvbG9yXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICB9O1xuXG4gICAgLy8gcmV0dXJuIGZ1bmN0aW9uKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tOiBudW1iZXIsIGdlb21UeXBlIDogc3RyaW5nICkge1xuICAgIC8vICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgLy9cbiAgICAvLyAgICAgaWYoZmlsdGVyICYmIHR5cGVvZihmaWx0ZXIuZXZhbHVhdGUpKSB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIlN0eWxlIGhhcyBhIGZpbHRlci4uLiBcIiArIGZpbHRlci50b1N0cmluZygpKTtcbiAgICAvLyAgICAgICAgIGlmKCFmaWx0ZXIuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgZG9lcyBub3QgbWF0Y2hcIik7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbWF0Y2hlc1wiKTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgIC8vICAgICAgICAgbGV0IHN0eWxlVmFsID0gc3R5bGVba2V5XTtcbiAgICAvLyAgICAgICAgIGlmKCBzdHlsZVZhbCAmJiB0eXBlb2Yoc3R5bGVWYWwuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJylcbiAgICAvLyAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHN0eWxlVmFsLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21UeXBlKTtcbiAgICAvLyAgICAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBzdHlsZVZhbDtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIHJldHVybiByZXN1bHQ7XG4gICAgLy8gfTtcbn0pO1xuIl19