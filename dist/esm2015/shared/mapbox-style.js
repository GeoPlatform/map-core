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
class Expression {
    /**
     * @param {?} filter
     */
    constructor(filter) {
        /** @type {?} */
        let arr = filter.slice(0);
        this.operator = arr[0];
        this.args = arr.splice(1).map(arg => {
            return Array.isArray(arg) ? new Expression(arg) : arg;
        });
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
            return value.evaluate(properties, zoom, geometryType);
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
        /** @type {?} */
        let value = this.getArg(0, properties, zoom, geometryType);
        // console.log("Expression.match - " + JSON.stringify(value) );
        //find value inside remaining args to assign style associated with that value
        this.args.forEach((arg, i) => {
            // ignore first arg (see above) and last arg (it's the fallback value)
            // also skip if we've already found a match
            if (result !== null || i === 0 || i === end)
                return;
            if (Array.isArray(arg)) { //array of literal values
                //array of literal values
                if (~arg.indexOf(value)) {
                    result = this.args[i + 1]; //match, return next value in array
                }
            }
            else if (arg == value) { //literal value
                //literal value
                result = this.args[i + 1]; //match, return next value in array
            }
        });
        if (!result)
            result = this.args[end]; //last arg is always fallback value
        // console.log("Match returned: " + result);
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        return [this.operator].concat(this.args.map(arg => {
            return (typeof (arg.evaluate) !== 'undefined') ? arg.toString() : arg;
        })).join(',');
    }
}
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
    let result = {};
    style.layers.forEach(layer => {
        result[layer.id] = styleFunctionFactory(layer); //new LayerStyle( layer ).getStyleFunction()
    });
    return result;
}
const ɵ0 = function (layerStyle) {
    /** *
     *
      @type {?} */
    let parseValue = function (value, fallback) {
        if (value && Array.isArray(value) && value.length) {
            return new Expression(value);
        }
        else if (value !== null && typeof (value) !== 'undefined')
            return value;
        else
            return fallback || null;
    };
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
    return function (properties, zoom, geomType) {
        /** @type {?} */
        let result = {};
        Object.keys(style).forEach(key => {
            /** @type {?} */
            let styleVal = style[key];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwYm94LXN0eWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJzaGFyZWQvbWFwYm94LXN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlHQTs7OztJQUtJLFlBQWEsTUFBYzs7UUFDdkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUUsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUM3RCxDQUFDLENBQUM7S0FDTjs7Ozs7OztJQVFELFFBQVEsQ0FBRSxVQUFnQixFQUFFLElBQWEsRUFBRSxZQUFxQjs7UUFDNUQsSUFBSSxFQUFFLENBQUs7O1FBQVgsSUFBUSxFQUFFLENBQUM7UUFDWCxRQUFPLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsS0FBSyxLQUFLO2dCQUNOLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixLQUFLLEtBQUs7Z0JBQ04sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENB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akIsQ0FBQztDQUNMOzs7OztBQXZDRCxJQUFJLG9CQUFvQixHQUFHLElBdUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbnRlcmZhY2UgTGVhZmxldFN0eWxlIHtcbiAgICB3ZWlnaHQgICAgICA/OiBudW1iZXI7XG4gICAgb3BhY2l0eSAgICAgPzogbnVtYmVyO1xuICAgIGNvbG9yICAgICAgID86IHN0cmluZztcbiAgICBkYXNoQXJyYXkgICA/OiBudW1iZXJbXTtcbiAgICBmaWxsT3BhY2l0eSA/OiBudW1iZXI7XG4gICAgZmlsbENvbG9yICAgPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgTGVhZmxldFN0eWxlTWFwIHtcbiAgICBba2V5OnN0cmluZ106IEZ1bmN0aW9uIHwgTGVhZmxldFN0eWxlXG59XG5cbmludGVyZmFjZSBNYXBCb3hTdHlsZSB7XG4gICAgdmVyc2lvbiAgICAgIDogbnVtYmVyOyAgLy9TdHlsZSBzcGVjaWZpY2F0aW9uIHZlcnNpb24gbnVtYmVyLiBNdXN0IGJlIDguXG4gICAgbmFtZSAgICAgICAgPzogc3RyaW5nOyAgLy9BIGh1bWFuLXJlYWRhYmxlIG5hbWUgZm9yIHRoZSBzdHlsZS5cbiAgICBtZXRhZGF0YSAgICA/OiBhbnk7ICAgICAvL0FyYml0cmFyeSBwcm9wZXJ0aWVzIHVzZWZ1bCB0byB0cmFjayB3aXRoIHRoZSBzdHlsZXNoZWV0LCBidXQgZG8gbm90IGluZmx1ZW5jZSByZW5kZXJpbmcuIFByb3BlcnRpZXMgc2hvdWxkIGJlIHByZWZpeGVkIHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgJ21hcGJveDonLlxuICAgIGNlbnRlciAgICAgID86IG51bWJlcltdOyAvL0RlZmF1bHQgbWFwIGNlbnRlciBpbiBsb25naXR1ZGUgYW5kIGxhdGl0dWRlLiBUaGUgc3R5bGUgY2VudGVyIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgem9vbSAgICAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IHpvb20gbGV2ZWwuIFRoZSBzdHlsZSB6b29tIHdpbGwgYmUgdXNlZCBvbmx5IGlmIHRoZSBtYXAgaGFzIG5vdCBiZWVuIHBvc2l0aW9uZWQgYnkgb3RoZXIgbWVhbnMgKGUuZy4gbWFwIG9wdGlvbnMgb3IgdXNlciBpbnRlcmFjdGlvbikuXG4gICAgYmVhcmluZyAgICAgPzogbnVtYmVyOyAgLy9EZWZhdWx0IGJlYXJpbmcsIGluIGRlZ3JlZXMuIFRoZSBiZWFyaW5nIGlzIHRoZSBjb21wYXNzIGRpcmVjdGlvbiB0aGF0IGlzIFwidXBcIjsgZm9yIGV4YW1wbGUsIGEgYmVhcmluZyBvZiA5MMKwIG9yaWVudHMgdGhlIG1hcCBzbyB0aGF0IGVhc3QgaXMgdXAuIFRoaXMgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgaWYgdGhlIG1hcCBoYXMgbm90IGJlZW4gcG9zaXRpb25lZCBieSBvdGhlciBtZWFucyAoZS5nLiBtYXAgb3B0aW9ucyBvciB1c2VyIGludGVyYWN0aW9uKS5cbiAgICBwaXRjaCAgICAgICA/OiBudW1iZXI7ICAvL0RlZmF1bHQgcGl0Y2gsIGluIGRlZ3JlZXMuIFplcm8gaXMgcGVycGVuZGljdWxhciB0byB0aGUgc3VyZmFjZSwgZm9yIGEgbG9vayBzdHJhaWdodCBkb3duIGF0IHRoZSBtYXAsIHdoaWxlIGEgZ3JlYXRlciB2YWx1ZSBsaWtlIDYwIGxvb2tzIGFoZWFkIHRvd2FyZHMgdGhlIGhvcml6b24uIFRoZSBzdHlsZSBwaXRjaCB3aWxsIGJlIHVzZWQgb25seSBpZiB0aGUgbWFwIGhhcyBub3QgYmVlbiBwb3NpdGlvbmVkIGJ5IG90aGVyIG1lYW5zIChlLmcuIG1hcCBvcHRpb25zIG9yIHVzZXIgaW50ZXJhY3Rpb24pLlxuICAgIGxpZ2h0ICAgICAgID86IGFueTsgICAgIC8vVGhlIGdsb2JhbCBsaWdodCBzb3VyY2UuXG4gICAgc291cmNlcyAgICAgPzogYW55W107ICAgLy9EYXRhIHNvdXJjZSBzcGVjaWZpY2F0aW9ucy5cbiAgICBzcHJpdGUgICAgICA/OiBzdHJpbmc7ICAvL0EgYmFzZSBVUkwgZm9yIHJldHJpZXZpbmcgdGhlIHNwcml0ZSBpbWFnZSBhbmQgbWV0YWRhdGEuIFRoZSBleHRlbnNpb25zIC5wbmcsIC5qc29uIGFuZCBzY2FsZSBmYWN0b3IgQDJ4LnBuZyB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYXBwZW5kZWQuIFRoaXMgcHJvcGVydHkgaXMgcmVxdWlyZWQgaWYgYW55IGxheWVyIHVzZXMgdGhlIGJhY2tncm91bmQtcGF0dGVybiwgZmlsbC1wYXR0ZXJuLCBsaW5lLXBhdHRlcm4sIGZpbGwtZXh0cnVzaW9uLXBhdHRlcm4sIG9yIGljb24taW1hZ2UgcHJvcGVydGllcy4gVGhlIFVSTCBtdXN0IGJlIGFic29sdXRlLCBjb250YWluaW5nIHRoZSBzY2hlbWUsIGF1dGhvcml0eSBhbmQgcGF0aCBjb21wb25lbnRzLlxuICAgIGdseXBocyAgICAgID86IHN0cmluZzsgIC8vQSBVUkwgdGVtcGxhdGUgZm9yIGxvYWRpbmcgc2lnbmVkLWRpc3RhbmNlLWZpZWxkIGdseXBoIHNldHMgaW4gUEJGIGZvcm1hdC4gVGhlIFVSTCBtdXN0IGluY2x1ZGUge2ZvbnRzdGFja30gYW5kIHtyYW5nZX0gdG9rZW5zLiBUaGlzIHByb3BlcnR5IGlzIHJlcXVpcmVkIGlmIGFueSBsYXllciB1c2VzIHRoZSB0ZXh0LWZpZWxkIGxheW91dCBwcm9wZXJ0eS4gVGhlIFVSTCBtdXN0IGJlIGFic29sdXRlLCBjb250YWluaW5nIHRoZSBzY2hlbWUsIGF1dGhvcml0eSBhbmQgcGF0aCBjb21wb25lbnRzLlxuICAgIHRyYW5zaXRpb24gID86IGFueTsgICAgIC8vQSBnbG9iYWwgdHJhbnNpdGlvbiBkZWZpbml0aW9uIHRvIHVzZSBhcyBhIGRlZmF1bHQgYWNyb3NzIHByb3BlcnRpZXMsIHRvIGJlIHVzZWQgZm9yIHRpbWluZyB0cmFuc2l0aW9ucyBiZXR3ZWVuIG9uZSB2YWx1ZSBhbmQgdGhlIG5leHQgd2hlbiBubyBwcm9wZXJ0eS1zcGVjaWZpYyB0cmFuc2l0aW9uIGlzIHNldC4gQ29sbGlzaW9uLWJhc2VkIHN5bWJvbCBmYWRpbmcgaXMgY29udHJvbGxlZCBpbmRlcGVuZGVudGx5IG9mIHRoZSBzdHlsZSdzIHRyYW5zaXRpb24gcHJvcGVydHkuXG4gICAgbGF5ZXJzICAgICAgPzogTWFwQm94U3R5bGVMYXllcltdOyAgIC8vTGF5ZXJzIHdpbGwgYmUgZHJhd24gaW4gdGhlIG9yZGVyIG9mIHRoaXMgYXJyYXkuXG59XG5cbmludGVyZmFjZSBNYXBCb3hTdHlsZUxheWVyIHtcbiAgICBpZCAgICAgICAgICAgICAgOiBzdHJpbmc7ICAgICAgLy9VbmlxdWUgbGF5ZXIgbmFtZS5cbiAgICB0eXBlICAgICAgICAgICAgOiBcImZpbGxcIiB8IFwibGluZVwiIHwgXCJzeW1ib2xcIiB8IFwiY2lyY2xlXCIgfCBcImhlYXRtYXBcIiB8IFwiZmlsbC1leHRydXNpb25cIiB8IFwicmFzdGVyXCIgfCBcImhpbGxzaGFkZVwiIHwgXCJiYWNrZ3JvdW5kXCI7IC8vUmVuZGVyaW5nIHR5cGUgb2YgdGhpcyBsYXllci5cbiAgICBtZXRhZGF0YSAgICAgICA/OiBhbnk7ICAgICAgICAgLy9BcmJpdHJhcnkgcHJvcGVydGllcyB1c2VmdWwgdG8gdHJhY2sgd2l0aCB0aGUgbGF5ZXIsIGJ1dCBkbyBub3QgaW5mbHVlbmNlIHJlbmRlcmluZy4gUHJvcGVydGllcyBzaG91bGQgYmUgcHJlZml4ZWQgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSAnbWFwYm94OicuXG4gICAgc291cmNlICAgICAgICAgPzogc3RyaW5nOyAgICAgIC8vTmFtZSBvZiBhIHNvdXJjZSBkZXNjcmlwdGlvbiB0byBiZSB1c2VkIGZvciB0aGlzIGxheWVyLiBSZXF1aXJlZCBmb3IgYWxsIGxheWVyIHR5cGVzIGV4Y2VwdCBiYWNrZ3JvdW5kLlxuICAgICdzb3VyY2UtbGF5ZXInID86IHN0cmluZzsgLy9MYXllciB0byB1c2UgZnJvbSBhIHZlY3RvciB0aWxlIHNvdXJjZS4gUmVxdWlyZWQgZm9yIHZlY3RvciB0aWxlIHNvdXJjZXM7IHByb2hpYml0ZWQgZm9yIGFsbCBvdGhlciBzb3VyY2UgdHlwZXMsIGluY2x1ZGluZyBHZW9KU09OIHNvdXJjZXMuXG4gICAgbWluem9vbSAgICAgICAgPzogbnVtYmVyOyAgICAgIC8vVGhlIG1pbmltdW0gem9vbSBsZXZlbCBmb3IgdGhlIGxheWVyLiBBdCB6b29tIGxldmVscyBsZXNzIHRoYW4gdGhlIG1pbnpvb20sIHRoZSBsYXllciB3aWxsIGJlIGhpZGRlbi5cbiAgICBtYXh6b29tICAgICAgICA/OiBudW1iZXI7ICAgICAgLy9UaGUgbWF4aW11bSB6b29tIGxldmVsIGZvciB0aGUgbGF5ZXIuIEF0IHpvb20gbGV2ZWxzIGVxdWFsIHRvIG9yIGdyZWF0ZXIgdGhhbiB0aGUgbWF4em9vbSwgdGhlIGxheWVyIHdpbGwgYmUgaGlkZGVuLlxuICAgIGZpbHRlciAgICAgICAgID86IGFueTsgICAgICAgICAvL0EgZXhwcmVzc2lvbiBzcGVjaWZ5aW5nIGNvbmRpdGlvbnMgb24gc291cmNlIGZlYXR1cmVzLiBPbmx5IGZlYXR1cmVzIHRoYXQgbWF0Y2ggdGhlIGZpbHRlciBhcmUgZGlzcGxheWVkLiBab29tIGV4cHJlc3Npb25zIGluIGZpbHRlcnMgYXJlIG9ubHkgZXZhbHVhdGVkIGF0IGludGVnZXIgem9vbSBsZXZlbHMuIFRoZSBmZWF0dXJlLXN0YXRlIGV4cHJlc3Npb24gaXMgbm90IHN1cHBvcnRlZCBpbiBmaWx0ZXIgZXhwcmVzc2lvbnMuXG4gICAgbGF5b3V0ICAgICAgICAgPzogYW55OyAgICAgICAgIC8vTGF5b3V0IHByb3BlcnRpZXMgZm9yIHRoZSBsYXllci5cbiAgICBwYWludCAgICAgICAgICA/OiBNYXBCb3hQYWludDsgLy9EZWZhdWx0IHBhaW50IHByb3BlcnRpZXMgZm9yIHRoaXMgbGF5ZXIuXG59XG5cbmludGVyZmFjZSBNYXBCb3hQYWludCB7XG4gICAgdmlzaWJpbGl0eSAgICAgICAgICAgPzogXCJ2aXNpYmxlXCIgfCBcIm5vbmVcIjsgICAvL1doZXRoZXIgdGhpcyBsYXllciBpcyBkaXNwbGF5ZWQuXG4gICAgJ2JhY2tncm91bmQtY29sb3InICAgPzogc3RyaW5nOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgYmFja2dyb3VuZCB3aWxsIGJlIGRyYXduLlxuICAgICdiYWNrZ3JvdW5kLXBhdHRlcm4nID86IHN0cmluZzsgICAgIC8vTmFtZSBvZiBpbWFnZSBpbiBzcHJpdGUgdG8gdXNlIGZvciBkcmF3aW5nIGFuIGltYWdlIGJhY2tncm91bmQuIEZvciBzZWFtbGVzcyBwYXR0ZXJucywgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdiYWNrZ3JvdW5kLW9wYWNpdHknID86IG51bWJlcjsgICAgIC8vVGhlIG9wYWNpdHkgYXQgd2hpY2ggdGhlIGJhY2tncm91bmQgd2lsbCBiZSBkcmF3bi5cbiAgICAnZmlsbC1hbnRpYWxpYXMnICAgICA/OiBib29sZWFuOyAgICAvL1doZXRoZXIgb3Igbm90IHRoZSBmaWxsIHNob3VsZCBiZSBhbnRpYWxpYXNlZC5cbiAgICAnZmlsbC1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IG9mIHRoZSBlbnRpcmUgZmlsbCBsYXllci4gSW4gY29udHJhc3QgdG8gdGhlIGZpbGwtY29sb3IsIHRoaXMgdmFsdWUgd2lsbCBhbHNvIGFmZmVjdCB0aGUgMXB4IHN0cm9rZSBhcm91bmQgdGhlIGZpbGwsIGlmIHRoZSBzdHJva2UgaXMgdXNlZC5cbiAgICAnZmlsbC1jb2xvcicgICAgICAgICA/OiBzdHJpbmd8YW55W107ICAvL1RoZSBjb2xvciBvZiB0aGUgZmlsbGVkIHBhcnQgb2YgdGhpcyBsYXllci4gVGhpcyBjb2xvciBjYW4gYmUgc3BlY2lmaWVkIGFzIHJnYmEgd2l0aCBhbiBhbHBoYSBjb21wb25lbnQgYW5kIHRoZSBjb2xvcidzIG9wYWNpdHkgd2lsbCBub3QgYWZmZWN0IHRoZSBvcGFjaXR5IG9mIHRoZSAxcHggc3Ryb2tlLCBpZiBpdCBpcyB1c2VkLlxuICAgICdmaWxsLW91dGxpbmUtY29sb3InID86IHN0cmluZ3xhbnlbXTsgICAgIC8vVGhlIG91dGxpbmUgY29sb3Igb2YgdGhlIGZpbGwuIE1hdGNoZXMgdGhlIHZhbHVlIG9mIGZpbGwtY29sb3IgaWYgdW5zcGVjaWZpZWQuXG4gICAgJ2ZpbGwtdHJhbnNsYXRlJyAgICAgPzogbnVtYmVyW107ICAgLy9UaGUgZ2VvbWV0cnkncyBvZmZzZXQuIFZhbHVlcyBhcmUgW3gsIHldIHdoZXJlIG5lZ2F0aXZlcyBpbmRpY2F0ZSBsZWZ0IGFuZCB1cCwgcmVzcGVjdGl2ZWx5LlxuICAgICdmaWxsLXRyYW5zbGF0ZS1hbmNob3InIDogXCJtYXBcIiB8IFwidmlld3BvcnRcIjsgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBmaWxsLXRyYW5zbGF0ZS5cbiAgICAnZmlsbC1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBmaWxscy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgYSBmYWN0b3Igb2YgdHdvICgyLCA0LCA4LCAuLi4sIDUxMikuIE5vdGUgdGhhdCB6b29tLWRlcGVuZGVudCBleHByZXNzaW9ucyB3aWxsIGJlIGV2YWx1YXRlZCBvbmx5IGF0IGludGVnZXIgem9vbSBsZXZlbHMuXG4gICAgJ2xpbmUtY2FwJyAgICAgICAgICAgPzogXCJidXR0XCIgfCBcInJvdW5kXCIgfCBcInNxdWFyZVwiOyAvL1RoZSBkaXNwbGF5IG9mIGxpbmUgZW5kaW5ncy5cbiAgICAnbGluZS1qb2luJyAgICAgICAgICA/OiAgXCJiZXZlbFwiIHwgXCJyb3VuZFwiIHwgXCJtaXRlclwiIC8vVGhlIGRpc3BsYXkgb2YgbGluZXMgd2hlbiBqb2luaW5nLlxuICAgICdsaW5lLW1pdGVyLWxpbWl0JyAgID86IG51bWJlcjsgICAgIC8vVXNlZCB0byBhdXRvbWF0aWNhbGx5IGNvbnZlcnQgbWl0ZXIgam9pbnMgdG8gYmV2ZWwgam9pbnMgZm9yIHNoYXJwIGFuZ2xlcy5cbiAgICAnbGluZS1yb3VuZC1saW1pdCcgICA/OiBudW1iZXI7ICAgICAvL1VzZWQgdG8gYXV0b21hdGljYWxseSBjb252ZXJ0IHJvdW5kIGpvaW5zIHRvIG1pdGVyIGpvaW5zIGZvciBzaGFsbG93IGFuZ2xlcy5cbiAgICAnbGluZS1vcGFjaXR5JyAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1RoZSBvcGFjaXR5IGF0IHdoaWNoIHRoZSBsaW5lIHdpbGwgYmUgZHJhd24uXG4gICAgJ2xpbmUtY29sb3InICAgICAgICAgPzogc3RyaW5nfGFueVtdOyAgICAgLy9UaGUgY29sb3Igd2l0aCB3aGljaCB0aGUgbGluZSB3aWxsIGJlIGRyYXduLlxuICAgICdsaW5lLXRyYW5zbGF0ZScgICAgID86IG51bWJlcltdOyAgIC8vVGhlIGdlb21ldHJ5J3Mgb2Zmc2V0LiBWYWx1ZXMgYXJlIFt4LCB5XSB3aGVyZSBuZWdhdGl2ZXMgaW5kaWNhdGUgbGVmdCBhbmQgdXAsIHJlc3BlY3RpdmVseS5cbiAgICAnbGluZS10cmFuc2xhdGUtYW5jaG9yJyA/OiBcIm1hcFwiIHwgXCJ2aWV3cG9ydFwiOyAgLy9Db250cm9scyB0aGUgZnJhbWUgb2YgcmVmZXJlbmNlIGZvciBsaW5lLXRyYW5zbGF0ZS5cbiAgICAnbGluZS13aWR0aCcgICAgICAgICA/OiBudW1iZXJ8YW55W107ICAgICAvL1N0cm9rZSB0aGlja25lc3MuXG4gICAgJ2xpbmUtZ2FwLXdpZHRoJyAgICAgPzogbnVtYmVyOyAgICAgLy9EcmF3cyBhIGxpbmUgY2FzaW5nIG91dHNpZGUgb2YgYSBsaW5lJ3MgYWN0dWFsIHBhdGguIFZhbHVlIGluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGlubmVyIGdhcC5cbiAgICAnbGluZS1vZmZzZXQnICAgICAgICA/OiBudW1iZXI7ICAgICAvL1RoZSBsaW5lJ3Mgb2Zmc2V0LiBGb3IgbGluZWFyIGZlYXR1cmVzLCBhIHBvc2l0aXZlIHZhbHVlIG9mZnNldHMgdGhlIGxpbmUgdG8gdGhlIHJpZ2h0LCByZWxhdGl2ZSB0byB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsaW5lLCBhbmQgYSBuZWdhdGl2ZSB2YWx1ZSB0byB0aGUgbGVmdC4gRm9yIHBvbHlnb24gZmVhdHVyZXMsIGEgcG9zaXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBpbnNldCwgYW5kIGEgbmVnYXRpdmUgdmFsdWUgcmVzdWx0cyBpbiBhbiBvdXRzZXQuXG4gICAgJ2xpbmUtYmx1cicgICAgICAgICAgPzogbnVtYmVyOyAgICAgLy9CbHVyIGFwcGxpZWQgdG8gdGhlIGxpbmUsIGluIHBpeGVscy5cbiAgICAnbGluZS1kYXNoYXJyYXknICAgICA/OiBudW1iZXJbXTsgICAvL1NwZWNpZmllcyB0aGUgbGVuZ3RocyBvZiB0aGUgYWx0ZXJuYXRpbmcgZGFzaGVzIGFuZCBnYXBzIHRoYXQgZm9ybSB0aGUgZGFzaCBwYXR0ZXJuLiBUaGUgbGVuZ3RocyBhcmUgbGF0ZXIgc2NhbGVkIGJ5IHRoZSBsaW5lIHdpZHRoLiBUbyBjb252ZXJ0IGEgZGFzaCBsZW5ndGggdG8gcGl4ZWxzLCBtdWx0aXBseSB0aGUgbGVuZ3RoIGJ5IHRoZSBjdXJyZW50IGxpbmUgd2lkdGguIE5vdGUgdGhhdCBHZW9KU09OIHNvdXJjZXMgd2l0aCBsaW5lTWV0cmljczogdHJ1ZSBzcGVjaWZpZWQgd29uJ3QgcmVuZGVyIGRhc2hlZCBsaW5lcyB0byB0aGUgZXhwZWN0ZWQgc2NhbGUuIEFsc28gbm90ZSB0aGF0IHpvb20tZGVwZW5kZW50IGV4cHJlc3Npb25zIHdpbGwgYmUgZXZhbHVhdGVkIG9ubHkgYXQgaW50ZWdlciB6b29tIGxldmVscy5cbiAgICAnbGluZS1wYXR0ZXJuJyAgICAgICA/OiBzdHJpbmc7ICAgICAvL05hbWUgb2YgaW1hZ2UgaW4gc3ByaXRlIHRvIHVzZSBmb3IgZHJhd2luZyBpbWFnZSBsaW5lcy4gRm9yIHNlYW1sZXNzIHBhdHRlcm5zLCBpbWFnZSB3aWR0aCBtdXN0IGJlIGEgZmFjdG9yIG9mIHR3byAoMiwgNCwgOCwgLi4uLCA1MTIpLiBOb3RlIHRoYXQgem9vbS1kZXBlbmRlbnQgZXhwcmVzc2lvbnMgd2lsbCBiZSBldmFsdWF0ZWQgb25seSBhdCBpbnRlZ2VyIHpvb20gbGV2ZWxzLlxuICAgICdsaW5lLWdyYWRpZW50JyAgICAgID86IHN0cmluZzsgICAgIC8vRGVmaW5lcyBhIGdyYWRpZW50IHdpdGggd2hpY2ggdG8gY29sb3IgYSBsaW5lIGZlYXR1cmUuIENhbiBvbmx5IGJlIHVzZWQgd2l0aCBHZW9KU09OIHNvdXJjZXMgdGhhdCBzcGVjaWZ5IFwibGluZU1ldHJpY3NcIjogdHJ1ZS5cbiAgICAvL1RPRE8gc3ltYm9sc1xufVxuXG5cblxuXG5cblxuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBldmFsdWF0YWJsZSBleHByZXNzaW9uIGFzc29jaWF0ZWQgd2l0aCBhIGxheWVyIHN0eWxlLFxuICogZm9sbG93aW5nIE1hcEJveCBTdHlsZSBTcGVjIGZvcm1hdC5cbiAqIEV4cHJlc3Npb25zIGFyZSBhcnJheXMgb2Y6XG4gKiAgIC0gb3BlcmF0b3Iga2V5ICgnZ2V0JywgJz09JywgJ2hhcycsIGV0YylcbiAqICAgLSBhbnkgbnVtYmVyIG9mIHBhcmFtZXRlcnMgaW5jbHVkaW5nIG5lc3RlZCBleHByZXNzaW9uc1xuICpcbiAqICBFeGFtcGxlczpcbiAqXG4gKiAgWyAnaGFzJywgJ3Byb3BlcnR5TmFtZScgXSAgIC8vIHNpbXBsZSBleHByZXNzaW9uIGNoZWNraW5nIGZvciBleGlzdGFuY2Ugb2YgYSBzcGVjaWZpYyBmZWF0dXJlIHByb3BlcnR5XG4gKlxuICogIFtcbiAqICAgICc9PScgICAgICAgICAgICAgICAgICAgICAgLy8gdHlwZSBvZiBleHByZXNzaW9uIChlcXVhbGl0eSBjb21wYXJpc29uKVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5QScgXSwgICAvLyBuZXN0ZWQgZXhwcmVzc2lvbiB0byBleHRyYWN0IGZlYXR1cmUncyBwcm9wZXJ0eSB2YWx1ZVxuICogICAgJ2V4cGVjdGVkVmFsdWUnICAgICAgICAgICAvLyB2YWx1ZSB0byBjb21wYXJlIGFnYWluc3RcbiAqICBdXG4gKlxuICogIFtcbiAqICAgICdtYXRjaCcsICAgICAgICAgICAgICAgICAgIC8vIHR5cGUgb2YgZXhwcmVzc2lvbiAoJ3N3aXRjaCcgc3RhdGVtZW50KVxuICogICAgWyAnZ2V0JywgJ3Byb3BlcnR5TmFtZScgXSwgLy8gZmlyc3QgcGFyYW0gaXMgYW5vdGhlciBleHByZXNzaW9uIHRvIGV4dHJhY3QgYSBmZWF0dXJlJ3MgcHJvcGVydHkgdmFsdWVcbiAqICAgICdBJywgJ3ZhbHVlRm9yQScsICAgICAgICAgIC8vIG5leHQgdHdvIHBhcmFtcyBhcmUgZmlyc3QgJ2Nhc2UnIG9mIFwic3dpdGNoXCJcbiAqICAgICdCJywgJ3ZhbHVlRm9yQicsICAgICAgICAgIC8vIHNlY29uZCAnY2FzZScgZm9yICdzd2l0Y2gnXG4gKiAgICAnZmFsbGJhY2tWYWx1ZScgICAgICAgICAgICAvLyBkZWZhdWx0ICdjYXNlJyBmb3IgJ3N3aXRjaCdcbiAqICBdXG4gKlxuICovXG5jbGFzcyBFeHByZXNzaW9uIHtcblxuICAgIHByaXZhdGUgb3BlcmF0b3I6IHN0cmluZztcbiAgICBwcml2YXRlIGFyZ3MgPzogYW55W107XG5cbiAgICBjb25zdHJ1Y3RvciggZmlsdGVyIDogYW55W10gKSB7XG4gICAgICAgIGxldCBhcnIgPSBmaWx0ZXIuc2xpY2UoMCk7XG4gICAgICAgIHRoaXMub3BlcmF0b3IgPSBhcnJbMF07XG4gICAgICAgIHRoaXMuYXJncyA9IGFyci5zcGxpY2UoMSkubWFwKCBhcmcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoIGFyZyApID8gbmV3IEV4cHJlc3Npb24oIGFyZyApIDogYXJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIG1hcCBvZiBmZWF0dXJlIHByb3BlcnRpZXMgdG8gdXNlIGluIGV2YWx1YXRpbmcgdGhlIGV4cHJlc3Npb24gZm9yIGEgc3BlY2lmaWMgZmVhdHVyZSBpbnN0YW5jZVxuICAgICAqIEBwYXJhbSB6b29tIC0gem9vbSBsZXZlbCBvZiB0aGUgbWFwXG4gICAgICogQHBhcmFtIGdlb21ldHJ5VHlwZSAtIHR5cGUgb2YgZ2VvbWV0cnkgZm9yIHRoZSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlIGJlaW5nIGV2YWx1YXRlZFxuICAgICAqIEByZXR1cm4gdmFsdWUgcmVzdWx0IG9mIHRoZSBleHByZXNzaW9uXG4gICAgICovXG4gICAgZXZhbHVhdGUoIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZyApIDogYW55IHtcbiAgICAgICAgbGV0IHAxLCBwMjtcbiAgICAgICAgc3dpdGNoKHRoaXMub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgJ2dldCc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzW3AxXTtcbiAgICAgICAgICAgIGNhc2UgJ2hhcyc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSBpbiBwcm9wZXJ0aWVzO1xuICAgICAgICAgICAgY2FzZSAnIWhhcyc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhKHAxIGluIHByb3BlcnRpZXMpO1xuICAgICAgICAgICAgY2FzZSAnPT0nOlxuICAgICAgICAgICAgICAgIHAxID0gdGhpcy5nZXRBcmcoMCwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICBwMiA9IHRoaXMuZ2V0QXJnKDEsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYENvbXBhcmluZyAke3AxfSA9PSAke3AyfWApO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA9PSBwMjtcbiAgICAgICAgICAgIGNhc2UgJyE9JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDb21wYXJpbmcgJHtwMX0gIT0gJHtwMn1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgIT0gcDI7XG4gICAgICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA+IHAyO1xuICAgICAgICAgICAgY2FzZSAnPCc6XG4gICAgICAgICAgICAgICAgcDEgPSB0aGlzLmdldEFyZygwLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHAyID0gdGhpcy5nZXRBcmcoMSwgcHJvcGVydGllcywgem9vbSwgZ2VvbWV0cnlUeXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcDEgPCBwMjtcbiAgICAgICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA+PSBwMjtcbiAgICAgICAgICAgIGNhc2UgJzw9JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwMSA8PSBwMjtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocDEpO1xuICAgICAgICAgICAgY2FzZSAnYXQnIDpcbiAgICAgICAgICAgICAgICBwMSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgcDIgPSB0aGlzLmdldEFyZygxLCBwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YocDEpID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KHAyKSAmJlxuICAgICAgICAgICAgICAgICAgICBwMi5sZW5ndGggPj0gcDEgPyBwMltwMV0gOiBudWxsO1xuXG4gICAgICAgICAgICBjYXNlICd6b29tJzogcmV0dXJuIHpvb207XG4gICAgICAgICAgICBjYXNlICdpZCc6IHJldHVybiBwcm9wZXJ0aWVzLmlkO1xuICAgICAgICAgICAgY2FzZSAnZ2VvbWV0cnktdHlwZSc6IHJldHVybiBnZW9tZXRyeVR5cGU7XG4gICAgICAgICAgICBjYXNlICdtYXRjaCcgOiAgLy93b3JrcyBsaWtlIGEgc3dpdGNoIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRNYXRjaChwcm9wZXJ0aWVzLCB6b29tLCBnZW9tZXRyeVR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzIC0gbWFwIG9mIGZlYXR1cmUgcHJvcGVydGllcyB0byB1c2UgaW4gZXZhbHVhdGluZyB0aGUgZXhwcmVzc2lvbiBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHpvb20gLSB6b29tIGxldmVsIG9mIHRoZSBtYXBcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnlUeXBlIC0gdHlwZSBvZiBnZW9tZXRyeSBmb3IgdGhlIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2UgYmVpbmcgZXZhbHVhdGVkXG4gICAgICogQHJldHVybiB2YWx1ZSBvZiB0aGUgYXJndW1lbnQgKHdoaWNoIG1heSBiZSByZXN1bHQgb2YgYW4gZXhwcmVzc2lvbilcbiAgICAgKi9cbiAgICBnZXRBcmcoaW5kZXggOiBudW1iZXIsIHByb3BlcnRpZXMgOiBhbnksIHpvb20gOiBudW1iZXIsIGdlb21ldHJ5VHlwZSA6IHN0cmluZykgOiBhbnkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmFyZ3NbaW5kZXhdO1xuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwcm9wZXJ0aWVzIC0gbWFwIG9mIGZlYXR1cmUgcHJvcGVydGllcyB0byB1c2UgaW4gZXZhbHVhdGluZyB0aGUgZXhwcmVzc2lvbiBmb3IgYSBzcGVjaWZpYyBmZWF0dXJlIGluc3RhbmNlXG4gICAgICogQHBhcmFtIHpvb20gLSB6b29tIGxldmVsIG9mIHRoZSBtYXBcbiAgICAgKiBAcGFyYW0gZ2VvbWV0cnlUeXBlIC0gdHlwZSBvZiBnZW9tZXRyeSBmb3IgdGhlIHNwZWNpZmljIGZlYXR1cmUgaW5zdGFuY2UgYmVpbmcgZXZhbHVhdGVkXG4gICAgICogQHJldHVybiB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggbWF0Y2hpbmcgY29uZGl0aW9uIG9mIGV4cHJlc3Npb24sIG9yIGZhbGxiYWNrIHZhbHVlXG4gICAgICovXG4gICAgZmluZE1hdGNoKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tIDogbnVtYmVyLCBnZW9tZXRyeVR5cGUgOiBzdHJpbmcgKSA6IGFueSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsLCBlbmQgPSB0aGlzLmFyZ3MubGVuZ3RoLTE7XG5cbiAgICAgICAgLy90aGUgaW5wdXQgdmFsdWUgdG8gdGVzdCBhZ2FpbnN0XG4gICAgICAgIC8vICAuLi4gc2hvdWxkIGJlIHZhbHVlIG9mIElucHV0IHBvcnRpb24gKGllLCBcIkxha2VcIiBmb3Igd2V0bGFuZHMpXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0QXJnKDAsIHByb3BlcnRpZXMsIHpvb20sIGdlb21ldHJ5VHlwZSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRXhwcmVzc2lvbi5tYXRjaCAtIFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpICk7XG5cbiAgICAgICAgLy9maW5kIHZhbHVlIGluc2lkZSByZW1haW5pbmcgYXJncyB0byBhc3NpZ24gc3R5bGUgYXNzb2NpYXRlZCB3aXRoIHRoYXQgdmFsdWVcbiAgICAgICAgdGhpcy5hcmdzLmZvckVhY2goIChhcmcsaSkgPT4ge1xuICAgICAgICAgICAgLy8gaWdub3JlIGZpcnN0IGFyZyAoc2VlIGFib3ZlKSBhbmQgbGFzdCBhcmcgKGl0J3MgdGhlIGZhbGxiYWNrIHZhbHVlKVxuICAgICAgICAgICAgLy8gYWxzbyBza2lwIGlmIHdlJ3ZlIGFscmVhZHkgZm91bmQgYSBtYXRjaFxuICAgICAgICAgICAgaWYoIHJlc3VsdCAhPT0gbnVsbCB8fCBpID09PSAwIHx8IGkgPT09IGVuZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXJnKSApIHsgICAgICAgICAgLy9hcnJheSBvZiBsaXRlcmFsIHZhbHVlc1xuICAgICAgICAgICAgICAgIGlmKH5hcmcuaW5kZXhPZiggdmFsdWUgKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFyZ3NbaSsxXTsgICAgLy9tYXRjaCwgcmV0dXJuIG5leHQgdmFsdWUgaW4gYXJyYXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoIGFyZyA9PSB2YWx1ZSApeyAgICAgIC8vbGl0ZXJhbCB2YWx1ZVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYXJnc1tpKzFdOyAgICAvL21hdGNoLCByZXR1cm4gbmV4dCB2YWx1ZSBpbiBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoIXJlc3VsdCkgcmVzdWx0ID0gdGhpcy5hcmdzW2VuZF07IC8vbGFzdCBhcmcgaXMgYWx3YXlzIGZhbGxiYWNrIHZhbHVlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTWF0Y2ggcmV0dXJuZWQ6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLm9wZXJhdG9yXS5jb25jYXQoXG4gICAgICAgICAgICB0aGlzLmFyZ3MubWFwKCBhcmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZW9mKGFyZy5ldmFsdWF0ZSkgIT09ICd1bmRlZmluZWQnKSA/IGFyZy50b1N0cmluZygpIDogYXJnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKS5qb2luKCcsJyk7XG4gICAgfVxufVxuXG5cblxuXG5cbi8qKlxuICogQHBhcmFtIHN0eWxlIE1hcEJveCBTdHlsZSBkZWZpbml0aW9uXG4gKiBAcmV0dXJuIG9iamVjdCBhc3NvY2lhdGluZyBMZWFmbGV0IHN0eWxlcyB3aXRoIGxheWVyIGlkc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZU1hcEJveFN0eWxlKCBzdHlsZSA6IE1hcEJveFN0eWxlICkgOiB7IFtrZXk6c3RyaW5nXTpMZWFmbGV0U3R5bGVNYXAgfSB7XG5cbiAgICAvL1RPRE8gdmFsaWRhdGUgc3R5bGUudmVyc2lvbiB0byBtYWtlIHN1cmUgd2UgYXJlIHBhcnNpbmcgc29tZXRoaW5nIHdlIHVuZGVyc3RhbmRcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyc2luZyBNYXBCb3ggU3R5bGVcIik7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoc3R5bGUsIG51bGwsICcgJykpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG5cbiAgICBpZiggIXN0eWxlLmxheWVycyB8fCAhQXJyYXkuaXNBcnJheShzdHlsZS5sYXllcnMpIHx8ICFzdHlsZS5sYXllcnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU3R5bGUgaGFzIG5vIGxheWVyIGRlZmluaXRpb25zXCIpO1xuICAgICAgICByZXR1cm4ge307ICAgLy9lbXB0eSBzdHlsZXNcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgc3R5bGUubGF5ZXJzLmZvckVhY2goIGxheWVyID0+IHtcbiAgICAgICAgcmVzdWx0WyBsYXllci5pZCBdID0gc3R5bGVGdW5jdGlvbkZhY3RvcnkobGF5ZXIpOyAvL25ldyBMYXllclN0eWxlKCBsYXllciApLmdldFN0eWxlRnVuY3Rpb24oKVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIE1hcEJveCBTdHlsZSBTcGVjIExheWVyIGRlZmluaXRpb25cbiAqIEByZXR1cm4gRnVuY3Rpb24gYWNjZXB0aW5nIGZlYXR1cmUgcHJvcGVydGllcywgem9vbSBsZXZlbCwgYW5kIGdlb21ldHJ5IHR5cGUgYW5kIHJldHVybmluZyBhIExlYWZsZXQgc3R5bGUgb2JqZWN0XG4gKi9cbnZhciBzdHlsZUZ1bmN0aW9uRmFjdG9yeSA9ICggZnVuY3Rpb24oIGxheWVyU3R5bGUgOiBNYXBCb3hTdHlsZUxheWVyICkge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBsZXQgcGFyc2VWYWx1ZSA9IGZ1bmN0aW9uICggdmFsdWUgOiBhbnksIGZhbGxiYWNrID86IGFueSApIHtcbiAgICAgICAgaWYoIHZhbHVlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXhwcmVzc2lvbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mKHZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gdmFsdWU7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbGxiYWNrIHx8IG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGxheWVyUGFpbnQgOiBNYXBCb3hQYWludCAgPSBsYXllclN0eWxlLnBhaW50O1xuXG4gICAgbGV0IGxpbmVXaWR0aCAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnbGluZS13aWR0aCddLCAxKTtcbiAgICBsZXQgb3BhY2l0eSAgICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydsaW5lLW9wYWNpdHknXSwgMS4wKTtcbiAgICBsZXQgY29sb3IgICAgICAgPSBwYXJzZVZhbHVlKCBsYXllclBhaW50WydsaW5lLWNvbG9yJ10gICB8fCBsYXllclBhaW50WydmaWxsLW91dGxpbmUtY29sb3InXSB8fCBsYXllclBhaW50WydmaWxsLWNvbG9yJ10sICcjMDAwJyk7XG4gICAgbGV0IGZpbGxPcGFjaXR5ID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnZmlsbC1vcGFjaXR5J10gfHwgbGF5ZXJQYWludFsnYmFja2dyb3VuZC1vcGFjaXR5J10sIDEuMCk7XG4gICAgbGV0IGZpbGxDb2xvciAgID0gcGFyc2VWYWx1ZSggbGF5ZXJQYWludFsnZmlsbC1jb2xvciddICAgfHwgbGF5ZXJQYWludFsnYmFja2dyb3VuZC1jb2xvciddLCAnIzAwMCcpO1xuXG4gICAgbGV0IHN0eWxlIDogTGVhZmxldFN0eWxlID0ge1xuICAgICAgICBjb2xvciAgICAgIDogY29sb3IsICAgICAgICAgLy9zdHJva2UgY29sb3JcbiAgICAgICAgb3BhY2l0eSAgICA6IG9wYWNpdHksICAgICAgIC8vc3Ryb2tlIG9wYWNpdHlcbiAgICAgICAgd2VpZ2h0ICAgICA6IGxpbmVXaWR0aCwgICAgIC8vc3Ryb2tlIHNpemVcbiAgICAgICAgZmlsbE9wYWNpdHk6IGZpbGxPcGFjaXR5LCAgIC8vZmlsbCBvcGFjaXR5XG4gICAgICAgIGZpbGxDb2xvciAgOiBmaWxsQ29sb3IgICAgICAvL2ZpbGwgY29sb3JcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCBwcm9wZXJ0aWVzIDogYW55LCB6b29tOiBudW1iZXIsIGdlb21UeXBlIDogc3RyaW5nICkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0eWxlVmFsID0gc3R5bGVba2V5XTtcbiAgICAgICAgICAgIGlmKCBzdHlsZVZhbCAmJiB0eXBlb2Yoc3R5bGVWYWwuZXZhbHVhdGUpICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHN0eWxlVmFsLmV2YWx1YXRlKHByb3BlcnRpZXMsIHpvb20sIGdlb21UeXBlKTtcbiAgICAgICAgICAgIGVsc2UgcmVzdWx0W2tleV0gPSBzdHlsZVZhbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbn0pO1xuIl19