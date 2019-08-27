
interface LeafletStyle {
    weight      ?: number;
    opacity     ?: number;
    color       ?: string;
    dashArray   ?: number[];
    fillOpacity ?: number;
    fillColor   ?: string;
}

interface LeafletStyleMap {
    [key:string]: Function | LeafletStyle
}

interface MapBoxStyle {
    version      : number;  //Style specification version number. Must be 8.
    name        ?: string;  //A human-readable name for the style.
    metadata    ?: any;     //Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'.
    center      ?: number[]; //Default map center in longitude and latitude. The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    zoom        ?: number;  //Default zoom level. The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    bearing     ?: number;  //Default bearing, in degrees. The bearing is the compass direction that is "up"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    pitch       ?: number;  //Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    light       ?: any;     //The global light source.
    sources     ?: any[];   //Data source specifications.
    sprite      ?: string;  //A base URL for retrieving the sprite image and metadata. The extensions .png, .json and scale factor @2x.png will be automatically appended. This property is required if any layer uses the background-pattern, fill-pattern, line-pattern, fill-extrusion-pattern, or icon-image properties. The URL must be absolute, containing the scheme, authority and path components.
    glyphs      ?: string;  //A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include {fontstack} and {range} tokens. This property is required if any layer uses the text-field layout property. The URL must be absolute, containing the scheme, authority and path components.
    transition  ?: any;     //A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's transition property.
    layers      ?: MapBoxStyleLayer[];   //Layers will be drawn in the order of this array.
}

interface MapBoxStyleLayer {
    id              : string;      //Unique layer name.
    type            : "fill" | "line" | "symbol" | "circle" | "heatmap" | "fill-extrusion" | "raster" | "hillshade" | "background"; //Rendering type of this layer.
    metadata       ?: any;         //Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'.
    source         ?: string;      //Name of a source description to be used for this layer. Required for all layer types except background.
    'source-layer' ?: string; //Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
    minzoom        ?: number;      //The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
    maxzoom        ?: number;      //The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
    filter         ?: any;         //A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
    layout         ?: any;         //Layout properties for the layer.
    paint          ?: MapBoxPaint; //Default paint properties for this layer.
}

interface MapBoxPaint {
    visibility           ?: "visible" | "none";   //Whether this layer is displayed.
    'background-color'   ?: string;     //The color with which the background will be drawn.
    'background-pattern' ?: string;     //Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'background-opacity' ?: number;     //The opacity at which the background will be drawn.
    'fill-antialias'     ?: boolean;    //Whether or not the fill should be antialiased.
    'fill-opacity'       ?: number|any[];     //The opacity of the entire fill layer. In contrast to the fill-color, this value will also affect the 1px stroke around the fill, if the stroke is used.
    'fill-color'         ?: string|any[];  //The color of the filled part of this layer. This color can be specified as rgba with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.
    'fill-outline-color' ?: string|any[];     //The outline color of the fill. Matches the value of fill-color if unspecified.
    'fill-translate'     ?: number[];   //The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
    'fill-translate-anchor' : "map" | "viewport"; //Controls the frame of reference for fill-translate.
    'fill-pattern'       ?: string;     //Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-cap'           ?: "butt" | "round" | "square"; //The display of line endings.
    'line-join'          ?:  "bevel" | "round" | "miter" //The display of lines when joining.
    'line-miter-limit'   ?: number;     //Used to automatically convert miter joins to bevel joins for sharp angles.
    'line-round-limit'   ?: number;     //Used to automatically convert round joins to miter joins for shallow angles.
    'line-opacity'       ?: number|any[];     //The opacity at which the line will be drawn.
    'line-color'         ?: string|any[];     //The color with which the line will be drawn.
    'line-translate'     ?: number[];   //The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
    'line-translate-anchor' ?: "map" | "viewport";  //Controls the frame of reference for line-translate.
    'line-width'         ?: number|any[];     //Stroke thickness.
    'line-gap-width'     ?: number;     //Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.
    'line-offset'        ?: number;     //The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.
    'line-blur'          ?: number;     //Blur applied to the line, in pixels.
    'line-dasharray'     ?: number[];   //Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with lineMetrics: true specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-pattern'       ?: string;     //Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-gradient'      ?: string;     //Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify "lineMetrics": true.
    //TODO symbols
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

    private operator: string;
    private args ?: any[];

    constructor( filter : any[] ) {
        let arr = filter.slice(0);
        this.operator = arr[0];
        this.args = arr.splice(1).map( arg => {
            return Array.isArray( arg ) ? new Expression( arg ) : arg;
        });
    }

    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value result of the expression
     */
    evaluate( properties : any, zoom : number, geometryType : string ) : any {
        let p1, p2;
        switch(this.operator) {
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
            case 'at' :
                p1 = this.getArg(0, properties, zoom, geometryType);
                p2 = this.getArg(1, properties, zoom, geometryType);
                return typeof(p1) === 'number' && Array.isArray(p2) &&
                    p2.length >= p1 ? p2[p1] : null;

            case 'zoom': return zoom;
            case 'id': return properties.id;
            case 'geometry-type': return geometryType;
            case 'match' :  //works like a switch statement
                return this.findMatch(properties, zoom, geometryType);
        }
        return null;
    }

    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value of the argument (which may be result of an expression)
     */
    getArg(index : number, properties : any, zoom : number, geometryType : string) : any {
        let value = this.args[index];
        if(value && typeof(value.evaluate) !== 'undefined') {
            return value.evaluate(properties, zoom, geometryType);
        }
        return value;
    }

    /**
     * @param properties - map of feature properties to use in evaluating the expression for a specific feature instance
     * @param zoom - zoom level of the map
     * @param geometryType - type of geometry for the specific feature instance being evaluated
     * @return value associated with matching condition of expression, or fallback value
     */
    findMatch( properties : any, zoom : number, geometryType : string ) : any {
        let result = null, end = this.args.length-1;

        //the input value to test against
        //  ... should be value of Input portion (ie, "Lake" for wetlands)
        let value = this.getArg(0, properties, zoom, geometryType);
        // console.log("Expression.match - " + JSON.stringify(value) );

        //find value inside remaining args to assign style associated with that value
        this.args.forEach( (arg,i) => {
            // ignore first arg (see above) and last arg (it's the fallback value)
            // also skip if we've already found a match
            if( result !== null || i === 0 || i === end) return;
            if( Array.isArray(arg) ) {          //array of literal values
                if(~arg.indexOf( value )) {
                    result = this.args[i+1];    //match, return next value in array
                }
            } else if( arg == value ){      //literal value
                result = this.args[i+1];    //match, return next value in array
            }
        });
        if(!result) result = this.args[end]; //last arg is always fallback value
        // console.log("Match returned: " + result);
        return result;
    }

    toString() {
        return [this.operator].concat(
            this.args.map( arg => {
                return (typeof(arg.evaluate) !== 'undefined') ? arg.toString() : arg;
            })
        ).join(',');
    }
}





/**
 * @param style MapBox Style definition
 * @return object associating Leaflet styles with layer ids
 */
export default function parseMapBoxStyle( style : MapBoxStyle ) : { [key:string]:LeafletStyleMap } {

    //TODO validate style.version to make sure we are parsing something we understand

    // console.log("Parsing MapBox Style");
    // console.log(JSON.stringify(style, null, ' '));
    // console.log("--------------------");

    if( !style.layers || !Array.isArray(style.layers) || !style.layers.length) {
        console.log("Style has no layer definitions");
        return {};   //empty styles
    }

    let result = {};
    style.layers.forEach( layer => {
        result[ layer.id ] = styleFunctionFactory(layer); //new LayerStyle( layer ).getStyleFunction()
    });
    return result;
}




/**
 * @param layer MapBox Style Spec Layer definition
 * @return Function accepting feature properties, zoom level, and geometry type and returning a Leaflet style object
 */
var styleFunctionFactory = ( function( layerStyle : MapBoxStyleLayer ) {

    /**
     *
     */
    let parseValue = function ( value : any, fallback ?: any ) {
        if( value && Array.isArray(value) && value.length ) {
            return new Expression(value);
        }
        else if( value !== null && typeof(value) !== 'undefined' ) return value;
        else return fallback || null;
    }

    let layerPaint : MapBoxPaint  = layerStyle.paint;

    let lineWidth   = parseValue( layerPaint['line-width'], 1);
    let opacity     = parseValue( layerPaint['line-opacity'], 1.0);
    let color       = parseValue( layerPaint['line-color']   || layerPaint['fill-outline-color'] || layerPaint['fill-color'], '#000');
    let fillOpacity = parseValue( layerPaint['fill-opacity'] || layerPaint['background-opacity'], 1.0);
    let fillColor   = parseValue( layerPaint['fill-color']   || layerPaint['background-color'], '#000');

    let style : LeafletStyle = {
        color      : color,         //stroke color
        opacity    : opacity,       //stroke opacity
        weight     : lineWidth,     //stroke size
        fillOpacity: fillOpacity,   //fill opacity
        fillColor  : fillColor      //fill color
    };

    return function( properties : any, zoom: number, geomType : string ) {
        let result = {};
        Object.keys(style).forEach( key => {
            let styleVal = style[key];
            if( styleVal && typeof(styleVal.evaluate) !== 'undefined')
                result[key] = styleVal.evaluate(properties, zoom, geomType);
            else result[key] = styleVal;
        });
        return result;
    };
});
