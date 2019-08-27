/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @record
 */
function LeafletStyle() { }
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
/**
 * @record
 */
function LeafletStyleMap() { }
/**
 * @record
 */
function MapBoxStyle() { }
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
/**
 * @record
 */
function MapBoxStyleLayer() { }
/** @type {?} */
MapBoxStyleLayer.prototype.id;
/** @type {?} */
MapBoxStyleLayer.prototype.type;
/** @type {?|undefined} */
MapBoxStyleLayer.prototype.metadata;
/** @type {?|undefined} */
MapBoxStyleLayer.prototype.source;
/* TODO: handle strange member:
'source-layer' ?: string;
*/
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
/**
 * @record
 */
function MapBoxPaint() { }
/** @type {?|undefined} */
MapBoxPaint.prototype.visibility;
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
        this.args = arr.splice(1).map(function (arg) {
            return Array.isArray(arg) ? new Expression(arg) : arg;
        });
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
                //works like a switch statement
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
        /** @type {?} */
        var value = this.getArg(0, properties, zoom, geometryType);
        // console.log("Expression.match - " + JSON.stringify(value) );
        //find value inside remaining args to assign style associated with that value
        this.args.forEach(function (arg, i) {
            // ignore first arg (see above) and last arg (it's the fallback value)
            // also skip if we've already found a match
            if (result !== null || i === 0 || i === end)
                return;
            if (Array.isArray(arg)) { //array of literal values
                //array of literal values
                if (~arg.indexOf(value)) {
                    result = _this.args[i + 1]; //match, return next value in array
                }
            }
            else if (arg == value) { //literal value
                //literal value
                result = _this.args[i + 1]; //match, return next value in array
            }
        });
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
        return [this.operator].concat(this.args.map(function (arg) {
            return (typeof (arg.evaluate) !== 'undefined') ? arg.toString() : arg;
        })).join(',');
    };
    return Expression;
}());
if (false) {
    /** @type {?} */
    Expression.prototype.operator;
    /** @type {?} */
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
    style.layers.forEach(function (layer) {
        result[layer.id] = styleFunctionFactory(layer); //new LayerStyle( layer ).getStyleFunction()
    });
    return result;
}
var ɵ0 = function (layerStyle) {
    /** *
     *
      @type {?} */
    var parseValue = function (value, fallback) {
        if (value && Array.isArray(value) && value.length) {
            return new Expression(value);
        }
        else if (value !== null && typeof (value) !== 'undefined')
            return value;
        else
            return fallback || null;
    };
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
    return function (properties, zoom, geomType) {
        /** @type {?} */
        var result = {};
        Object.keys(style).forEach(function (key) {
            /** @type {?} */
            var styleVal = style[key];
            if (styleVal && typeof (styleVal.evaluate) !== 'undefined')
                result[key] = styleVal.evaluate(properties, zoom, geomType);
            else
                result[key] = styleVal;
        });
        return result;
    };
};
/** *
 * \@param layer MapBox Style Spec Layer definition
 * \@return Function accepting feature properties, zoom level, and geometry type and returning a Leaflet style object
  @type {?} */
var styleFunctionFactory = (ɵ0);
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUtJLG9CQUFhLE1BQWM7O1FBQ3ZCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFBLEdBQUc7WUFDOUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQzdELENBQUMsQ0FBQztLQUNOO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCw2QkFBUTs7Ozs7O0lBQVIsVUFBVSxVQUFnQixFQUFFLElBQWEsRUFBRSxZQUFxQjs7UUFDNUQsSUFBSSxFQUFFLENBQUs7O1FBQVgsSUFBUSxFQUFFLENBQUM7UUFDWCxRQUFPLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsS0FBSyxLQUFLO2dCQUNOLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZ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SUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztnQkFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztTQUMvQixDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztLQUNqQixDQUFDO0NBQ0w7Ozs7O0FBdkNELElBQUksb0JBQW9CLEdBQUcsSUF1Q3pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmludGVyZmFjZSBMZWFmbGV0U3R5bGUge1xuICAgIHdlaWdodCAgICAgID86IG51bWJlcjtcbiAgICBvcGFjaXR5ICAgICA/OiBudW1iZXI7XG4gICAgY29sb3IgICAgICAgPzogc3RyaW5nO1xuICAgIGRhc2hBcnJheSAgID86IG51bWJlcltdO1xuICAgIGZpbGxPcGFjaXR5ID86IG51bWJlcjtcbiAgICBmaWxsQ29sb3IgICA/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBMZWFmbGV0U3R5bGVNYXAge1xuICAgIFtrZXk6c3RyaW5nXTogRnVuY3Rpb24gfCBMZWFmbGV0U3R5bGVcbn1cblxuaW50ZXJmYWNlIE1hcEJveFN0eWxlIHtcbiAgICB2ZXJzaW9uICAgICAgOiBudW1iZXI7ICAvL1N0eWxlIHNwZWNpZmljYXRpb24gdmVyc2lvbiBudW1iZXIuIE11c3QgYmUgOC5cbiAgICBuYW1lICAgICAgICA/OiBzdHJpbmc7ICAvL0EgaHVtYW4tcmVhZGFibGUgbmFtZSBmb3IgdGhlIHN0eWxlLlxuICAgIG1ldGFkYXRhICAgID86IGFueTsgICAgIC8vQXJiaXRyYXJ5IHByb3BlcnRpZXMgdXNlZnVsIHRvIHRyYWNrIHdpdGggdGhlIHN0eWxlc2hlZXQsIGJ1dCBkbyBub3QgaW5mbHVlbmNlIHJlbmRlcmluZy4gUHJvcGVydGllcyBzaG91bGQgYmUgcHJlZml4ZWQgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSAnbWFwYm94OicuXG4gICAgY2VudGVyICAgICAgPzogbnVtYmVyW107IC8vRGVmYXVsdCBtYXAgY2VudGVyIGluIGxvbmdpdHVkZSBhbmQgbGF0aXR1ZGUuIFRoZSBzdHlsZSBjZW50ZXIgd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICB6b29tICAgICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgem9vbSBsZXZlbC4gVGhlIHN0eWxlIHpvb20gd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBiZWFyaW5nICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgYmVhcmluZywgaW4gZGVncmVlcy4gVGhlIGJlYXJpbmcgaXMgdGhlIGNvbXBhc3MgZGlyZWN0aW9uIHRoYXQgaXMgXCJ1cFwiOyBmb3IgZXhhbXBsZSwgYSBiZWFyaW5nIG9mIDkwwrAgb3JpZW50cyB0aGUgbWFwIHNvIHRoYXQgZWFzdCBpcyB1cC4gVGhpcyB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIHBpdGNoICAgICAgID86IG51bWJlcjsgIC8vRGVmYXVsdCBwaXRjaCwgaW4gZGVncmVlcy4gWmVybyBpcyBwZXJwZW5kaWN1bGFyIHRvIHRoZSBzdXJmYWNlLCBmb3IgYSBsb29rIHN0cmFpZ2h0IGRvd24gYXQgdGhlIG1hcCwgd2hpbGUgYSBncmVhdGVyIHZhbHVlIGxpa2UgNjAgbG9va3MgYWhlYWQgdG93YXJkcyB0aGUgaG9yaXpvbi4gVGhlIHN0eWxlIHBpdGNoIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgbGlnaHQgICAgICAgPzogYW55OyAgICAgLy9UaGUgZ2xvYmFsIGxpZ2h0IHNvdXJjZS5cbiAgICBzb3VyY2VzICAgICA/OiBhbnlbXTsgICAvL0RhdGEgc291cmNlIHNwZWNpZmljYXRpb25zLlxuICAgIHNwcml0ZSAgICAgID86IHN0cmluZzsgIC8vQSBiYXNlIFVSTCBmb3IgcmV0cmlldmluZyB0aGUgc3ByaXRlIGltYWdlIGFuZCBtZXRhZGF0YS4gVGhlIGV4dGVuc2lvbnMgLnBuZywgLmpzb24gYW5kIHNjYWxlIGZhY3RvciBAMngucG5nIHdpbGwgYmUgYXV0b21hdGljYWxseSBhcHBlbmRlZC4gVGhpcyBwcm9wZXJ0eSBpcyByZXF1aXJlZCBpZiBhbnkgbGF5ZXIgdXNlcyB0aGUgYmFja2dyb3VuZC1wYXR0ZXJuLCBmaWxsLXBhdHRlcm4sIGxpbmUtcGF0dGVybiwgZmlsbC1leHRydXNpb24tcGF0dGVybiwgb3IgaWNvbi1pbWFnZSBwcm9wZXJ0aWVzLiBUaGUgVVJMIG11c3QgYmUgYWJzb2x1dGUsIGNvbnRhaW5pbmcgdGhlIHNjaGVtZSwgYXV0aG9yaXR5IGFuZCBwYXRoIGNvbXBvbmVudHMuXG4gICAgZ2x5cGhzICAgICAgPzogc3RyaW5nOyAgLy9BIFVSTCB0ZW1wbGF0ZSBmb3IgbG9hZGluZyBzaWduZWQtZGlzdGFuY2UtZmllbGQgZ2x5cGggc2V0cyBpbiBQQkYgZm9ybWF0LiBUaGUgVVJMIG11c3QgaW5jbHVkZSB7Zm9udHN0YWNrfSBhbmQge3JhbmdlfSB0b2tlbnMuIFRoaXMgcHJvcGVydHkgaXMgcmVxdWlyZWQgaWYgYW55IGxheWVyIHVzZXMgdGhlIHRleHQtZmllbGQgbGF5b3V0IHByb3BlcnR5LiBUaGUgVVJMIG11c3QgYmUgYWJzb2x1dGUsIGNvbnRhaW5pbmcgdGhlIHNjaGVtZSwgYXV0aG9yaXR5IGFuZCBwYXRoIGNvbXBvbmVudHMuXG4gICAgdHJhbnNpdGlvbiAgPzogYW55OyAgICAgLy9BIGdsb2JhbCB0cmFuc2l0aW9uIGRlZmluaXRpb24gdG8gdXNlIGFzIGEgZGVmYXVsdCBhY3Jvc3MgcHJvcGVydGllcywgdG8gYmUgdXNlZCBmb3IgdGltaW5nIHRyYW5zaXRpb25zIGJldHdlZW4gb25lIHZhbHVlIGFuZCB0aGUgbmV4dCB3aGVuIG5vIHByb3BlcnR5LXNwZWNpZmljIHRyYW5zaXRpb24gaXMgc2V0LiBDb2xsaXNpb24tYmFzZWQgc3ltYm9sIGZhZGluZyBpcyBjb250cm9sbGVkIGluZGVwZW5kZW50bHkgb2YgdGhlIHN0eWxlJ3MgdHJhbnNpdGlvbiBwcm9wZXJ0eS5cbiAgICBsYXllcnMgICAgICA/OiBNYXBCb3hTdHlsZUxheWVyW107ICAgLy9MYXllcnMgd2lsbCBiZSBkcmF3biBpbiB0aGUgb3JkZXIgb2YgdGhpcyBhcnJheS5cbn1cblxuaW50ZXJmYWNlIE1hcEJveFN0eWxlTGF5ZXIge1xuICAgIGlkICAgICAgICAgICAgICA6IHN0cmluZzsgICAgICAvL1VuaXF1ZSBsYXllciBuYW1lLlxuICAgIHR5cGUgICAgICAgICAgICA6IFwiZmlsbFwiIHwgXCJsaW5lXCIgfCBcInN5bWJvbFwiIHwgXCJjaXJjbGVcIiB8IFwiaGVhdG1hcFwiIHwgXCJmaWxsLWV4dHJ1c2lvblwiIHwgXCJyYXN0ZXJcIiB8IFwiaGlsbHNoYWRlXCIgfCBcImJhY2tncm91bmRcIjsgLy9SZW5kZXJpbmcgdHlwZSBvZiB0aGlzIGxheWVyLlxuICAgIG1ldGFkYXRhICAgICAgID86IGFueTsgICAgICAgICAvL0FyYml0cmFyeSBwcm9wZXJ0aWVzIHVzZWZ1bCB0byB0cmFjayB3aXRoIHRoZSBsYXllciwgYnV0IGRvIG5vdCBpbmZsdWVuY2UgcmVuZGVyaW5nLiBQcm9wZXJ0aWVzIHNob3VsZCBiZSBwcmVmaXhlZCB0byBhdm9pZCBjb2xsaXNpb25zLCBsaWtlICdtYXBib3g6Jy5cbiAgICBzb3VyY2UgICAgICAgICA/OiBzdHJpbmc7ICAgICAgLy9OYW1lIG9mIGEgc291cmNlIGRlc2NyaXB0aW9uIHRvIGJlIHVzZWQgZm9yIHRoaXMgbGF5ZXIuIFJlcXVpcmVkIGZvciBhbGwgbGF5ZXIgdHlwZXMgZXhjZXB0IGJhY2tncm91bmQuXG4gICAgJ3NvdXJjZS1sYXllcicgPzogc3RyaW5nOyAvL0xheWVyIHRvIHVzZSBmcm9tIGEgdmVjdG9yIHRpbGUgc291cmNlLiBSZXF1aXJlZCBmb3IgdmVjdG9yIHRpbGUgc291cmNlczsgcHJvaGliaXRlZCBmb3IgYWxsIG90aGVyIHNvdXJjZSB0eXBlcywgaW5jbHVkaW5nIEdlb0pTT04gc291cmNlcy5cbiAgICBtaW56b29tICAgICAgICA/OiBudW1iZXI7ICAgICAgLy9UaGUgbWluaW11bSB6b29tIGxldmVsIGZvciB0aGUgbGF5ZXIuIEF0IHpvb20gbGV2ZWxzIGxlc3MgdGhhbiB0aGUgbWluem9vbSwgdGhlIGxheWVyIHdpbGwgYmUgaGlkZGVuLlxuICAgIG1heHpvb20gICAgICAgID86IG51bWJlcjsgICAgICAvL1RoZSBtYXhpbXVtIHpvb20gbGV2ZWwgZm9yIHRoZSBsYXllci4gQXQgem9vbSBsZXZlbHMgZXF1YWwgdG8gb3IgZ3JlYXRlciB0aGFuIHRoZSBtYXh6b29tLCB0aGUgbGF5ZXIgd2lsbCBiZSBoaWRkZW4uXG4gICAgZmlsdGVyICAgICAgICAgPzogYW55OyAgICAgICAgIC8vQSBleHByZXNzaW9uIHNwZWNpZnlpbmcgY29uZGl0aW9ucyBvbiBzb3VyY2UgZmVhdHVyZXMuIE9ubHkgZmVhdHVyZXMgdGhhdCBtYXRjaCB0aGUgZmlsdGVyIGFyZSBkaXNwbGF5ZWQuIFpvb20gZXhwcmVzc2lvbnMgaW4gZmlsdGVycyBhcmUgb25seSBldmFsdWF0ZWQgYXQgaW50ZWdlciB6b29tIGxldmVscy4gVGhlIGZlYXR1cmUtc3RhdGUgZXhwcmVzc2lvbiBpcyBub3Qgc3VwcG9ydGVkIGluIGZpbHRlciBleHByZXNzaW9ucy5cbiAgICBsYXlvdXQgICAgICAgICA/OiBhbnk7ICAgICAgICAgLy9MYXlvdXQgcHJvcGVydGllcyBmb3IgdGhlIGxheWVyLlxuICAgIHBhaW50ICAgICAgICAgID86IE1hcEJveFBhaW50OyAvL0RlZmF1bHQgcGFpbnQgcHJvcGVydGllcyBmb3IgdGhpcyBsYXllci5cbn1cblxuaW50ZXJmYWNlIE1hcEJveFBhaW50IHtcbiAgICB2aXNpYmlsaXR5ICAgICAgICAgICA/OiBcInZpc2libGVcIiB8IFwibm9uZVwiOyAgIC8vV2hldGhlciB0aGlzIGxheWVyIGlzIGRpc3BsYXllZC5cbiAgICAnYmFja2dyb3VuZC1jb2xvcicgICA/OiBzdHJpbmc7ICAgICAvL1RoZSBjb2xvciB3aXRoIHdoaWNoIHRoZSBiYWNrZ3JvdW5kIHdpbGwgYmUgZHJhd24uXG4gICAgJ2JhY2tncm91bmQtcGF0dGVybicgPzogc3RyaW5nOyAgICAgLy9OYW1lIG9mIGltYWdlIGluIHNwcml0ZSB0byB1c2UgZm9yIGRyYXdpbmcgYW4gaW1hZ2UgYmFja2dyb3VuZC4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgYSBmYWN0b3Igb2YgdHdvICgyLCA0LCA4LCAuLi4sIDUxMikuIE5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2JhY2tncm91bmQtb3BhY2l0eScgPzogbnVtYmVyOyAgICAgLy9UaGUgb3BhY2l0eSBhdCB3aGljaCB0aGUgYmFja2dyb3VuZCB3aWxsIGJlIGRyYXduLlxuICAgICdmaWxsLWFudGlhbGlhcycgICAgID86IGJvb2xlYW47ICAgIC8vV2hldGhlciBvciBub3QgdGhlIGZpbGwgc2hvdWxkIGJlIGFudGlhbGlhc2VkLlxuICAgICdmaWxsLW9wYWNpdHknICAgICAgID86IG51bWJlcnxhbnlbXTsgICAgIC8vVGhlIG9wYWNpdHkgb2YgdGhlIGVudGlyZSBmaWxsIGxheWVyLiBJbiBjb250cmFzdCB0byB0aGUgZmlsbC1jb2xvciwgdGhpcyB2YWx1ZSB3aWxsIGFsc28gYWZmZWN0IHRoZSAxcHggc3Ryb2tlIGFyb3VuZCB0aGUgZmlsbCwgaWYgdGhlIHN0cm9rZSBpcyB1c2VkLlxuICAgICdmaWxsLWNvbG9yJyAgICAgICAgID86IHN0cmluZ3xhbnlbXTsgIC8vVGhlIGNvbG9yIG9mIHRoZSBmaWxsZWQgcGFydCBvZiB0aGlzIGxheWVyLiBUaGlzIGNvbG9yIGNhbiBiZSBzcGVjaWZpZWQgYXMgcmdiYSB3aXRoIGFuIGFscGhhIGNvbXBvbmVudCBhbmQgdGhlIGNvbG9yJ3Mgb3BhY2l0eSB3aWxsIG5vdCBhZmZlY3QgdGhlIG9wYWNpdHkgb2YgdGhlIDFweCBzdHJva2UsIGlmIGl0IGlzIHVzZWQuXG4gICAgJ2ZpbGwtb3V0bGluZS1jb2xvcicgPzogc3RyaW5nfGFueVtdOyAgICAgLy9UaGUgb3V0bGluZSBjb2xvciBvZiB0aGUgZmlsbC4gTWF0Y2hlcyB0aGUgdmFsdWUgb2YgZmlsbC1jb2xvciBpZiB1bnNwZWNpZmllZC5cbiAgICAnZmlsbC10cmFuc2xhdGUnICAgICA/OiBudW1iZXJbXTsgICAvL1RoZSBnZW9tZXRyeSdzIG9mZnNldC4gVmFsdWVzIGFyZSBbeCwgeV0gd2hlcmUgbmVnYXRpdmVzIGluZGljYXRlIGxlZnQgYW5kIHVwLCByZXNwZWN0aXZlbHkuXG4gICAgJ2ZpbGwtdHJhbnNsYXRlLWFuY2hvcicgOiBcIm1hcFwiIHwgXCJ2aWV3cG9ydFwiOyAvL0NvbnRyb2xzIHRoZSBmcmFtZSBvZiByZWZlcmVuY2UgZm9yIGZpbGwtdHJhbnNsYXRlLlxuICAgICdmaWxsLXBhdHRlcm4nICAgICAgID86IHN0cmluZzsgICAgIC8vTmFtZSBvZiBpbWFnZSBpbiBzcHJpdGUgdG8gdXNlIGZvciBkcmF3aW5nIGltYWdlIGZpbGxzLiBGb3Igc2VhbWxlc3MgcGF0dGVybnMsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBhIGZhY3RvciBvZiB0d28gKDIsIDQsIDgsIC4uLiwgNTEyKS4gTm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1jYXAnICAgICAgICAgICA/OiBcImJ1dHRcIiB8IFwicm91bmRcIiB8IFwic3F1YXJlXCI7IC8vVGhlIGRpc3BsYXkgb2YgbGluZSBlbmRpbmdzLlxuICAgICdsaW5lLWpvaW4nICAgICAgICAgID86ICBcImJldmVsXCIgfCBcInJvdW5kXCIgfCBcIm1pdGVyXCIgLy9UaGUgZGlzcGxheSBvZiBsaW5lcyB3aGVuIGpvaW5pbmcuXG4gICAgJ2xpbmUtbWl0ZXItbGltaXQnICAgPzogbnVtYmVyOyAgICAgLy9Vc2VkIHRvIGF1dG9tYXRpY2FsbHkgY29udmVydCBtaXRlciBqb2lucyB0byBiZXZlbCBqb2lucyBmb3Igc2hhcnAgYW5nbGVzLlxuICAgICdsaW5lLXJvdW5kLWxpbWl0JyAgID86IG51bWJlcjsgICAgIC8vVXNlZCB0byBhdXRvbWF0aWNhbGx5IGNvbnZlcnQgcm91bmQgam9pbnMgdG8gbWl0ZXIgam9pbnMgZm9yIHNoYWxsb3cgYW5nbGVzLlxuICAgICdsaW5lLW9wYWNpdHknICAgICAgID86IG51bWJlcnxhbnlbXTsgICAgIC8vVGhlIG9wYWNpdHkgYXQgd2hpY2ggdGhlIGxpbmUgd2lsbCBiZSBkcmF3bi5cbiAgICAnbGluZS1jb2xvcicgICAgICAgICA/OiBzdHJpbmd8YW55W107ICAgICAvL1RoZSBjb2xvciB3aXRoIHdoaWNoIHRoZSBsaW5lIHdpbGwgYmUgZHJhd24uXG4gICAgJ2xpbmUtdHJhbnNsYXRlJyAgICAgPzogbnVtYmVyW107ICAgLy9UaGUgZ2VvbWV0cnkncyBvZmZzZXQuIFZhbHVlcyBhcmUgW3gsIHldIHdoZXJlIG5lZ2F0aXZlcyBpbmRpY2F0ZSBsZWZ0IGFuZCB1cCwgcmVzcGVjdGl2ZWx5LlxuICAgICdsaW5lLXRyYW5zbGF0ZS1hbmNob3InID86IFwibWFwXCIgfCBcInZpZXdwb3J0XCI7ICAvL0NvbnRyb2xzIHRoZSBmcmFtZSBvZiByZWZlcmVuY2UgZm9yIGxpbmUtdHJhbnNsYXRlLlxuICAgICdsaW5lLXdpZHRoJyAgICAgICAgID86IG51bWJlcnxhbnlbXTsgICAgIC8vU3Ryb2tlIHRoaWNrbmVzcy5cbiAgICAnbGluZS1nYXAtd2lkdGgnICAgICA/OiBudW1iZXI7ICAgICAvL0RyYXdzIGEgbGluZSBjYXNpbmcgb3V0c2lkZSBvZiBhIGxpbmUncyBhY3R1YWwgcGF0aC4gVmFsdWUgaW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgaW5uZXIgZ2FwLlxuICAgICdsaW5lLW9mZnNldCcgICAgICAgID86IG51bWJlcjsgICAgIC8vVGhlIGxpbmUncyBvZmZzZXQuIEZvciBsaW5lYXIgZmVhdHVyZXMsIGEgcG9zaXRpdmUgdmFsdWUgb2Zmc2V0cyB0aGUgbGluZSB0byB0aGUgcmlnaHQsIHJlbGF0aXZlIHRvIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxpbmUsIGFuZCBhIG5lZ2F0aXZlIHZhbHVlIHRvIHRoZSBsZWZ0LiBGb3IgcG9seWdvbiBmZWF0dXJlcywgYSBwb3NpdGl2ZSB2YWx1ZSByZXN1bHRzIGluIGFuIGluc2V0LCBhbmQgYSBuZWdhdGl2ZSB2YWx1ZSByZXN1bHRzIGluIGFuIG91dHNldC5cbiAgICAnbGluZS1ibHVyJyAgICAgICAgICA/OiBudW1iZXI7ICAgICAvL0JsdXIgYXBwbGllZCB0byB0aGUgbGluZSwgaW4gcGl4ZWxzLlxuICAgICdsaW5lLWRhc2hhcnJheScgICAgID86IG51bWJlcltdOyAgIC8vU3BlY2lmaWVzIHRoZSBsZW5ndGhzIG9mIHRoZSBhbHRlcm5hdGluZyBkYXNoZXMgYW5kIGdhcHMgdGhhdCBmb3JtIHRoZSBkYXNoIHBhdHRlcm4uIFRoZSBsZW5ndGhzIGFyZSBsYXRlciBzY2FsZWQgYnkgdGhlIGxpbmUgd2lkdGguIFRvIGNvbnZlcnQgYSBkYXNoIGxlbmd0aCB0byBwaXhlbHMsIG11bHRpcGx5IHRoZSBsZW5ndGggYnkgdGhlIGN1cnJlbnQgbGluZSB3aWR0aC4gTm90ZSB0aGF0IEdlb0pTT04gc291cmNlcyB3aXRoIGxpbmVNZXRyaWNzOiB0cnVlIHNwZWNpZmllZCB3b24ndCByZW5kZXIgZGFzaGVkIGxpbmVzIHRvIHRoZSBleHBlY3RlZCBzY2FsZS4gQWxzbyBub3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLXBhdHRlcm4nICAgICAgID86IHN0cmluZzsgICAgIC8vTmFtZSBvZiBpbWFnZSBpbiBzcHJpdGUgdG8gdXNlIGZvciBkcmF3aW5nIGltYWdlIGxpbmVzLiBGb3Igc2VhbWxlc3MgcGF0dGVybnMsIGltYWdlIHdpZHRoIG11c3QgYmUgYSBmYWN0b3Igb2YgdHdvICgyLCA0LCA4LCAuLi4sIDUxMikuIE5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtZ3JhZGllbnQnICAgICAgPzogc3RyaW5nOyAgICAgLy9EZWZpbmVzIGEgZ3JhZGllbnQgd2l0aCB3aGljaCB0byBjb2xvciBhIGxpbmUgZmVhdHVyZS4gQ2FuIG9ubHkgYmUgdXNlZCB3aXRoIEdlb0pTT04gc291cmNlcyB0aGF0IHNwZWNpZnkgXCJsaW5lTWV0cmljc1wiOiB0cnVlLlxuICAgIC8vVE9ETyBzeW1ib2xzXG59XG5cblxuXG5cblxuXG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGV2YWx1YXRhYmxlIGV4cHJlc3Npb24gYXNzb2NpYXRlZCB3aXRoIGEgbGF5ZXIgc3R5bGUsXG4gKiBmb2xsb3dpbmcgTWFwQm94IFN0eWxlIFNwZWMgZm9ybWF0LlxuICogRXhwcmVzc2lvbnMgYXJlIGFycmF5cyBvZjpcbiAqICAgLSBvcGVyYXRvciBrZXkgKCdnZXQnLCAnPT0nLCAnaGFzJywgZXRjKVxuICogICAtIGFueSBudW1iZXIgb2YgcGFyYW1ldGVycyBpbmNsdWRpbmcgbmVzdGVkIGV4cHJlc3Npb25zXG4gKlxuICogIEV4YW1wbGVzOlxuICpcbiAqICBbICdoYXMnLCAncHJvcGVydHlOYW1lJyBdICAgLy8gc2ltcGxlIGV4cHJlc3Npb24gY2hlY2tpbmcgZm9yIGV4aXN0YW5jZSBvZiBhIHNwZWNpZmljIGZlYXR1cmUgcHJvcGVydHlcbiAqXG4gKiAgW1xuICogICAgJz09JyAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlIG9mIGV4cHJlc3Npb24gKGVxdWFsaXR5IGNvbXBhcmlzb24pXG4gKiAgICBbICdnZXQnLCAncHJvcGVydHlBJyBdLCAgIC8vIG5lc3RlZCBleHByZXNzaW9uIHRvIGV4dHJhY3QgZmVhdHVyZSdzIHByb3BlcnR5IHZhbHVlXG4gKiAgICAnZXhwZWN0ZWRWYWx1ZScgICAgICAgICAgIC8vIHZhbHVlIHRvIGNvbXBhcmUgYWdhaW5zdFxuICogIF1cbiAqXG4gKiAgW1xuICogICAgJ21hdGNoJywgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBvZiBleHByZXNzaW9uICgnc3dpdGNoJyBzdGF0ZW1lbnQpXG4gKiAgICBbICdnZXQnLCAncHJvcGVydHlOYW1lJyBdLCAvLyBmaXJzdCBwYXJhbSBpcyBhbm90aGVyIGV4cHJlc3Npb24gdG8gZXh0cmFjdCBhIGZlYXR1cmUncyBwcm9wZXJ0eSB2YWx1ZVxuICogICAgJ0EnLCAndmFsdWVGb3JBJywgICAgICAgICAgLy8gbmV4dCB0d28gcGFyYW1zIGFyZSBmaXJzdCAnY2FzZScgb2YgXCJzd2l0Y2hcIlxuICogICAgJ0InLCAndmFsdWVGb3JCJywgICAgICAgICAgLy8gc2Vjb25kICdjYXNlJyBmb3IgJ3N3aXRjaCdcbiAqICAgICdmYWxsYmFja1ZhbHVlJyAgICAgICAgICAgIC8vIGRlZmF1bHQgJ2Nhc2UnIGZvciAnc3dpdGNoJ1xuICogIF1cbiAqXG4gKi9cbmNsYXNzIEV4cHJlc3Npb24ge1xuXG4gICAgcHJpdmF0ZSBvcGVyYXRvcjogc3RyaW5nO1xuICAgIHByaXZhdGUgYXJncyA/OiBhbnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKCBmaWx0ZXIgOiBhbnlbXSApIHtcbiAgICAgICAgbGV0IGFyciA9IGZpbHRlci5zbGljZSgwKTtcbiAgICAgICAgdGhpcy5vcGVyYXRvciA9IGFyclswXTtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJyLnNwbGljZSgxKS5tYXAoIGFyZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSggYXJnICkgPyBuZXcgRXhwcmVzc2lvbiggYXJnICkgOiBhcmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzIC0gbWFwIG9mIGZlYXR1cmUgcHJvcGVydGllcyB0byB1c2UgaW4gZXZhbHVhdGluZyB0aGUgZXhwcmVzc2lvbiBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHpvb20gLSB6b29tIGxldmVsIG9mIHRoZSBtYXBcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnlUeXBlIC0gdHlwZSBvZiBnZW9tZXRyeSBmb3IgdGhlIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2UgYmVpbmcgZXZhbHVhdGVkXG4gICAgICogQHJldHVybiB2YWx1ZSByZXN1bHQgb2YgdGhlIGV4cHJlc3Npb25cbiAgICAgKi9cbiAgICBldmFsdWF0ZSggcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nICkgOiBhbnkge1xuICAgICAgICBsZXQgcDEsIHAyO1xuICAgICAgICBzd2l0Y2godGhpcy5vcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSAnZ2V0JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnRpZXNbcDFdO1xuICAgICAgICAgICAgY2FzZSAnaGFzJzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIGluIHByb3BlcnRpZXM7XG4gICAgICAgICAgICBjYXNlICchaGFzJzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEocDEgaW4gcHJvcGVydGllcyk7XG4gICAgICAgICAgICBjYXNlICc9PSc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgQ29tcGFyaW5nICR7cDF9ID09ICR7cDJ9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID09IHAyO1xuICAgICAgICAgICAgY2FzZSAnIT0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYENvbXBhcmluZyAke3AxfSAhPSAke3AyfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSAhPSBwMjtcbiAgICAgICAgICAgIGNhc2UgJz4nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID4gcDI7XG4gICAgICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA8IHAyO1xuICAgICAgICAgICAgY2FzZSAnPj0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxID49IHAyO1xuICAgICAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHAxIDw9IHAyO1xuICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwMSk7XG4gICAgICAgICAgICBjYXNlICdhdCcgOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZihwMSkgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkocDIpICYmXG4gICAgICAgICAgICAgICAgICAgIHAyLmxlbmd0aCA+PSBwMSA/IHAyW3AxXSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNhc2UgJ3pvb20nOiByZXR1cm4gem9vbTtcbiAgICAgICAgICAgIGNhc2UgJ2lkJzogcmV0dXJuIHByb3BlcnRpZXMuaWQ7XG4gICAgICAgICAgICBjYXNlICdnZW9tZXRyeS10eXBlJzogcmV0dXJuIGdlb21ldHJ5VHlwZTtcbiAgICAgICAgICAgIGNhc2UgJ21hdGNoJyA6ICAvL3dvcmtzIGxpa2UgYSBzd2l0Y2ggc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE1hdGNoKHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIG9mIHRoZSBhcmd1bWVudCAod2hpY2ggbWF5IGJlIHJlc3VsdCBvZiBhbiBleHByZXNzaW9uKVxuICAgICAqL1xuICAgIGdldEFyZyhpbmRleCA6IG51bWJlciwgcHJvcGVydGllcyA6IGFueSwgem9vbSA6IG51bWJlciwgZ2VvbWV0cnlUeXBlIDogc3RyaW5nKSA6IGFueSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuYXJnc1tpbmRleF07XG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZS5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBtYXAgb2YgZmVhdHVyZSBwcm9wZXJ0aWVzIHRvIHVzZSBpbiBldmFsdWF0aW5nIHRoZSBleHByZXNzaW9uIGZvciBhIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2VcbiAgICAgKiBAcGFyYW0gem9vbSAtIHpvb20gbGV2ZWwgb2YgdGhlIG1hcFxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVR5cGUgLSB0eXBlIG9mIGdlb21ldHJ5IGZvciB0aGUgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZSBiZWluZyBldmFsdWF0ZWRcbiAgICAgKiBAcmV0dXJuIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBtYXRjaGluZyBjb25kaXRpb24gb2YgZXhwcmVzc2lvbiwgb3IgZmFsbGJhY2sgdmFsdWVcbiAgICAgKi9cbiAgICBmaW5kTWF0Y2goIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGwsIGVuZCA9IHRoaXMuYXJncy5sZW5ndGgtMTtcblxuICAgICAgICAvL3RoZSBpbnB1dCB2YWx1ZSB0byB0ZXN0IGFnYWluc3RcbiAgICAgICAgLy8gIC4uLiBzaG91bGQgYmUgdmFsdWUgb2YgSW5wdXQgcG9ydGlvbiAoaWUsIFwiTGFrZVwiIGZvciB3ZXRsYW5kcylcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJFeHByZXNzaW9uLm1hdGNoIC0gXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgKTtcblxuICAgICAgICAvL2ZpbmQgdmFsdWUgaW5zaWRlIHJlbWFpbmluZyBhcmdzIHRvIGFzc2lnbiBzdHlsZSBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZVxuICAgICAgICB0aGlzLmFyZ3MuZm9yRWFjaCggKGFyZyxpKSA9PiB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZmlyc3QgYXJnIChzZWUgYWJvdmUpIGFuZCBsYXN0IGFyZyAoaXQncyB0aGUgZmFsbGJhY2sgdmFsdWUpXG4gICAgICAgICAgICAvLyBhbHNvIHNraXAgaWYgd2UndmUgYWxyZWFkeSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICBpZiggcmVzdWx0ICE9PSBudWxsIHx8IGkgPT09IDAgfHwgaSA9PT0gZW5kKSByZXR1cm47XG4gICAgICAgICAgICBpZiggQXJyYXkuaXNBcnJheShhcmcpICkgeyAgICAgICAgICAvL2FycmF5IG9mIGxpdGVyYWwgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYofmFyZy5pbmRleE9mKCB2YWx1ZSApKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYXJnc1tpKzFdOyAgICAvL21hdGNoLCByZXR1cm4gbmV4dCB2YWx1ZSBpbiBhcnJheVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiggYXJnID09IHZhbHVlICl7ICAgICAgLy9saXRlcmFsIHZhbHVlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hcmdzW2krMV07ICAgIC8vbWF0Y2gsIHJldHVybiBuZXh0IHZhbHVlIGluIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZighcmVzdWx0KSByZXN1bHQgPSB0aGlzLmFyZ3NbZW5kXTsgLy9sYXN0IGFyZyBpcyBhbHdheXMgZmFsbGJhY2sgdmFsdWVcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYXRjaCByZXR1cm5lZDogXCIgKyByZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMub3BlcmF0b3JdLmNvbmNhdChcbiAgICAgICAgICAgIHRoaXMuYXJncy5tYXAoIGFyZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0eXBlb2YoYXJnLmV2YWx1YXRlKSAhPT0gJ3VuZGVmaW5lZCcpID8gYXJnLnRvU3RyaW5nKCkgOiBhcmc7XG4gICAgICAgICAgICB9KVxuICAgICAgICApLmpvaW4oJywnKTtcbiAgICB9XG59XG5cblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gc3R5bGUgTWFwQm94IFN0eWxlIGRlZmluaXRpb25cbiAqIEByZXR1cm4gb2JqZWN0IGFzc29jaWF0aW5nIExlYWZsZXQgc3R5bGVzIHdpdGggbGF5ZXIgaWRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlTWFwQm94U3R5bGUoIHN0eWxlIDogTWFwQm94U3R5bGUgKSA6IHsgW2tleTpzdHJpbmddOkxlYWZsZXRTdHlsZU1hcCB9IHtcblxuICAgIC8vVE9ETyB2YWxpZGF0ZSBzdHlsZS52ZXJzaW9uIHRvIG1ha2Ugc3VyZSB3ZSBhcmUgcGFyc2luZyBzb21ldGhpbmcgd2UgdW5kZXJzdGFuZFxuXG4gICAgLy8gY29uc29sZS5sb2coXCJQYXJzaW5nIE1hcEJveCBTdHlsZVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShzdHlsZSwgbnVsbCwgJyAnKSk7XG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcblxuICAgIGlmKCAhc3R5bGUubGF5ZXJzIHx8ICFBcnJheS5pc0FycmF5KHN0eWxlLmxheWVycykgfHwgIXN0eWxlLmxheWVycy5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdHlsZSBoYXMgbm8gbGF5ZXIgZGVmaW5pdGlvbnNcIik7XG4gICAgICAgIHJldHVybiB7fTsgICAvL2VtcHR5IHN0eWxlc1xuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICBzdHlsZS5sYXllcnMuZm9yRWFjaCggbGF5ZXIgPT4ge1xuICAgICAgICByZXN1bHRbIGxheWVyLmlkIF0gPSBzdHlsZUZ1bmN0aW9uRmFjdG9yeShsYXllcik7IC8vbmV3IExheWVyU3R5bGUoIGxheWVyICkuZ2V0U3R5bGVGdW5jdGlvbigpXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cblxuLyoqXG4gKiBAcGFyYW0gbGF5ZXIgTWFwQm94IFN0eWxlIFNwZWMgTGF5ZXIgZGVmaW5pdGlvblxuICogQHJldHVybiBGdW5jdGlvbiBhY2NlcHRpbmcgZmVhdHVyZSBwcm9wZXJ0aWVzLCB6b29tIGxldmVsLCBhbmQgZ2VvbWV0cnkgdHlwZSBhbmQgcmV0dXJuaW5nIGEgTGVhZmxldCBzdHlsZSBvYmplY3RcbiAqL1xudmFyIHN0eWxlRnVuY3Rpb25GYWN0b3J5ID0gKCBmdW5jdGlvbiggbGF5ZXJTdHlsZSA6IE1hcEJveFN0eWxlTGF5ZXIgKSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGxldCBwYXJzZVZhbHVlID0gZnVuY3Rpb24gKCB2YWx1ZSA6IGFueSwgZmFsbGJhY2sgPzogYW55ICkge1xuICAgICAgICBpZiggdmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFeHByZXNzaW9uKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YodmFsdWUpICE9PSAndW5kZWZpbmVkJyApIHJldHVybiB2YWx1ZTtcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsbGJhY2sgfHwgbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgbGF5ZXJQYWludCA6IE1hcEJveFBhaW50ICA9IGxheWVyU3R5bGUucGFpbnQ7XG5cbiAgICBsZXQgbGluZVdpZHRoICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydsaW5lLXdpZHRoJ10sIDEpO1xuICAgIGxldCBvcGFjaXR5ICAgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtb3BhY2l0eSddLCAxLjApO1xuICAgIGxldCBjb2xvciAgICAgICA9IHBhcnNlVmFsdWUoIGxheWVyUGFpbnRbJ2xpbmUtY29sb3InXSAgIHx8IGxheWVyUGFpbnRbJ2ZpbGwtb3V0bGluZS1jb2xvciddIHx8IGxheWVyUGFpbnRbJ2ZpbGwtY29sb3InXSwgJyMwMDAnKTtcbiAgICBsZXQgZmlsbE9wYWNpdHkgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydmaWxsLW9wYWNpdHknXSB8fCBsYXllclBhaW50WydiYWNrZ3JvdW5kLW9wYWNpdHknXSwgMS4wKTtcbiAgICBsZXQgZmlsbENvbG9yICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydmaWxsLWNvbG9yJ10gICB8fCBsYXllclBhaW50WydiYWNrZ3JvdW5kLWNvbG9yJ10sICcjMDAwJyk7XG5cbiAgICBsZXQgc3R5bGUgOiBMZWFmbGV0U3R5bGUgPSB7XG4gICAgICAgIGNvbG9yICAgICAgOiBjb2xvciwgICAgICAgICAvL3N0cm9rZSBjb2xvclxuICAgICAgICBvcGFjaXR5ICAgIDogb3BhY2l0eSwgICAgICAgLy9zdHJva2Ugb3BhY2l0eVxuICAgICAgICB3ZWlnaHQgICAgIDogbGluZVdpZHRoLCAgICAgLy9zdHJva2Ugc2l6ZVxuICAgICAgICBmaWxsT3BhY2l0eTogZmlsbE9wYWNpdHksICAgLy9maWxsIG9wYWNpdHlcbiAgICAgICAgZmlsbENvbG9yICA6IGZpbGxDb2xvciAgICAgIC8vZmlsbCBjb2xvclxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oIHByb3BlcnRpZXMgOiBhbnksIHpvb206IG51bWJlciwgZ2VvbVR5cGUgOiBzdHJpbmcgKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goIGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgc3R5bGVWYWwgPSBzdHlsZVtrZXldO1xuICAgICAgICAgICAgaWYoIHN0eWxlVmFsICYmIHR5cGVvZihzdHlsZVZhbC5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc3R5bGVWYWwuZXZhbHVhdGUocHJvcGVydGllcywgem9vbSwgZ2VvbVR5cGUpO1xuICAgICAgICAgICAgZWxzZSByZXN1bHRba2V5XSA9IHN0eWxlVmFsO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufSk7XG4iXX0=