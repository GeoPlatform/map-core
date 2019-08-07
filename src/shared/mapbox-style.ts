
interface LeafletPaint {
    weight ?: number;
    opacity ?: number;
    color ?: string;
    dashArray ?: number[];
    fillOpacity ?: number;
    fillColor ?: string;
}

interface LeafletStyle {
    [key:string]: Function | LeafletPaint
}

interface MapBoxStyle {
    version : number;   //Style specification version number. Must be 8.
    name ?: string;     //A human-readable name for the style.
    metadata ?: any;    //Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'.
    center ?: number[]; //Default map center in longitude and latitude. The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    zoom ?: number;     //Default zoom level. The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    bearing ?: number;  //Default bearing, in degrees. The bearing is the compass direction that is "up"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    pitch ?: number;    //Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).
    light ?: any;       //The global light source.
    sources ?: any[];   //Data source specifications.
    sprite ?: string;   //A base URL for retrieving the sprite image and metadata. The extensions .png, .json and scale factor @2x.png will be automatically appended. This property is required if any layer uses the background-pattern, fill-pattern, line-pattern, fill-extrusion-pattern, or icon-image properties. The URL must be absolute, containing the scheme, authority and path components.
    glyphs ?: string;   //A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include {fontstack} and {range} tokens. This property is required if any layer uses the text-field layout property. The URL must be absolute, containing the scheme, authority and path components.
    transition ?: any;  //A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's transition property.
    layers ?: MapBoxStyleLayer[];   //Layers will be drawn in the order of this array.
}

interface MapBoxStyleLayer {
    id : string; //Unique layer name.
    type : "fill" | "line" | "symbol" | "circle" | "heatmap" | "fill-extrusion" | "raster" | "hillshade" | "background"; //Rendering type of this layer.
    metadata ?: any;    //Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'.
    source ?: string;   //Name of a source description to be used for this layer. Required for all layer types except background.
    'source-layer' ?: string; //Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources.
    minzoom ?: number; //The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden.
    maxzoom ?: number; //The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden.
    filter ?: any; //A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The feature-state expression is not supported in filter expressions.
    layout ?: any; //Layout properties for the layer.
    paint ?: MapBoxPaint; //Default paint properties for this layer.
}

interface MapBoxPaint {
    visibility ?: "visible" | "none";   //Whether this layer is displayed.
    'background-color' ?: string;       //The color with which the background will be drawn.
    'background-pattern' ?: string;     //Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'background-opacity' ?: number;     //The opacity at which the background will be drawn.
    'fill-antialias' ?: boolean;        //Whether or not the fill should be antialiased.
    'fill-opacity'  ?: number;          //The opacity of the entire fill layer. In contrast to the fill-color, this value will also affect the 1px stroke around the fill, if the stroke is used.
    'fill-color' ?: string;             //The color of the filled part of this layer. This color can be specified as rgba with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.
    'fill-outline-color' ?: string;     //The outline color of the fill. Matches the value of fill-color if unspecified.
    'fill-translate' ?: number[];       //The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
    'fill-translate-anchor' : "map" | "viewport"; //Controls the frame of reference for fill-translate.
    'fill-pattern' ?: string;           //Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-cap' ?: "butt" | "round" | "square"; //The display of line endings.
    'line-join' ?:  "bevel" | "round" | "miter" //The display of lines when joining.
    'line-miter-limit'  ?: number;      //Used to automatically convert miter joins to bevel joins for sharp angles.
    'line-round-limit' ?: number;       //Used to automatically convert round joins to miter joins for shallow angles.
    'line-opacity' ?: number;           //The opacity at which the line will be drawn.
    'line-color' ?: string;             //The color with which the line will be drawn.
    'line-translate' ?: number[];       //The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.
    'line-translate-anchor' ?: "map" | "viewport";  //Controls the frame of reference for line-translate.
    'line-width' ?: number;             //Stroke thickness.
    'line-gap-width' ?: number;         //Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.
    'line-offset' ?: number;            //The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.
    'line-blur' ?: number;              //Blur applied to the line, in pixels.
    'line-dasharray' ?: number[];       //Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with lineMetrics: true specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-pattern' ?: string;           //Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.
    'line-gradient' ?: string;          //Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify "lineMetrics": true.
    //TODO symbols
}





class Expression {

    private operator: string;
    private args ?: any[];

    constructor(filter : any[]) {
        this.operator = filter[0];

        let args = [];
        if(filter.length>1) {
            for(let i=1; i<filter.length; ++i) {
                if(Array.isArray(filter[i])) {
                    args.push(new Expression(filter[i]));
                } else {
                    args.push(filter[i]);
                }
            }
        }
        this.args = args;
    }

    evaluate(obj : any, zoom : number, geometryType : string) : any {
        let p1, p2;
        switch(this.operator) {
            case '==':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                // console.log(`Comparing ${p1} == ${p2}`);
                return p1 == p2;
            case '!=':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                // console.log(`Comparing ${p1} != ${p2}`);
                return p1 != p2;
            case '>':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                return p1 > p2;
            case '<':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                return p1 < p2;
            case '>=':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                return p1 >= p2;
            case '<=':
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                return p1 <= p2;
            case 'array':
                p1 = this.getArg(0, obj, zoom, geometryType);
                return Array.isArray(p1);
            case 'at' :
                p1 = this.getArg(0, obj, zoom, geometryType);
                p2 = this.getArg(1, obj, zoom, geometryType);
                return typeof(p1) === 'number' && Array.isArray(p2) &&
                    p2.length >= p1 ? p2[p1] : null;
            case 'get':
                p1 = this.getArg(0, obj, zoom, geometryType);
                return obj[p1];
            case 'has':
                p1 = this.getArg(0, obj, zoom, geometryType);
                return p1 in obj;
            case '!has':
                p1 = this.getArg(0, obj, zoom, geometryType);
                return !(p1 in obj);

            case 'zoom': return zoom;
            case 'id': return obj.id;
            case 'geometry-type': return geometryType;
        }
        return null;
    }

    getArg(index : number, obj : any, zoom : number, geometryType : string) : any {
        let value = this.args[index];
        if(this.args[index] && this.args[index].evaluate) {
            value = this.args[index].evaluate(obj, zoom, geometryType);
        }
        return value;
    }

    toString() {
        let result = [this.operator].concat(
            this.args.map( arg => {
                if(typeof(arg.evaluate) !== 'undefined') {
                    return arg.toString();
                }
                return arg;
            })
        );
        return result;
    }
}









export default function parseMapBoxStyle( json : MapBoxStyle ) : { [key:string]:LeafletStyle } {

    //TODO validate json.version to make sure we are parsing something we understand

    if(!json.layers) { return {}; } //empty styles

    //var styles = {
    //  "nc_wetlands" : styleFn,
    //  "va_wetlands": styleFn
    //};
    let result = parseLayers(json.layers);
    return result;
}



/**
 * @param layersArray - list of MapBox Style Layer definitions
 * @return object defining style functions for each layer defined
 */
function parseLayers( layersArray : MapBoxStyleLayer[] ) : { [key:string]:LeafletStyle } {
    let result = {};

    //group all MBL objects by their "source-layer" (VT) or "source" (other)
    // generate one StyleFunc for each grouped set of layers

    let layers = {};
    layersArray.forEach( layer => {
                  //vector tile            //everything else
        let key = layer['source-layer'] || layer.source;
        layers[key] = layers[key] || [];
        layers[key].push({
            id: layer.id,
            filter: layer.filter,
            paint: layer.paint
        });
    });

    Object.keys(layers).forEach( key => {
        console.log("Parsing layer group "+ key);
        result[key] = parseLayerStyles(layers[key]);
    });

    return result;
}





/**

 * @return Function defining style for layer
 */
function parseLayerStyles( layers : any[] ) : Function | LeafletPaint {
    // console.log("Parsing Style for " + (layers.map(l=>l.id).join(', ')));

    let styleFn = function(layers, featureProperties, zoom, geometryType) {

        // console.log("Style function " + (layers.map(l=>l.id).join(', ')));

        let matches = layers.filter( layer => {
            if(layer.filter) {
                // console.log("Layer " + layer.id + " has a filter");
                let expr = new Expression(layer.filter);
                let evResult = expr.evaluate(featureProperties, zoom, geometryType);
                return (evResult !== false && evResult !== null);
            } else {
                // console.log("Layer " + layer.id + " has NO filter");
                return true;
            }
        });

        let style : LeafletPaint = {};

        if(matches && matches.length) {
            let paint : MapBoxPaint = matches[0].paint;
            style.weight    = paint['line-width'] || 1;
            style.opacity   = paint['line-opacity'] || 1.0;
            style.color     = paint['line-color'] || '#000';
            style.dashArray = paint['line-dashArray'];
            style.fillOpacity = paint['fill-opacity'] || paint['background-opacity'] || 1.0;
            style.fillColor = paint['fill-color'] || paint['background-color'] || '#000';
        }

        return style;
    };

    return styleFn.bind(null, layers);
}

























// /**
//  * @param layer - MapBox Style Layer definition
//  * @return Function defining style for layer
//  */
// function parseLayerStyle( layer : MapBoxStyleLayer ) : Function | LeafletPaint {
//
//     if(!layer || !layer.paint) return {} as LeafletPaint;   //use default style
//
//     let style : LeafletPaint = {};
//     let paint : MapBoxPaint = layer.paint;
//     style.weight    = paint['line-width'] || 1;
//     style.opacity   = paint['line-opacity'] || 1.0;
//     style.color     = paint['line-color'] || '#000';
//     style.dashArray = paint['line-dashArray'];
//     style.fillOpacity = paint['fill-opacity'] || paint['background-opacity'] || 1.0;
//     style.fillColor = paint['fill-color'] || paint['background-color'] || '#000';
//
//     if(layer.filter) {  //features may be styled using conditional expression
//         console.log("Parsing Filter for Layer " + layer.id);
//         /*
//         Expressions are represented as JSON arrays.
//         The first element of an expression array is a string naming the expression operator, e.g. "*"or "case".
//         Subsequent elements (if any) are the arguments to the expression.
//         Each argument is either a literal value (a string, number, boolean, or null), or another expression array.
//         */
//
//         let expr = new Expression(layer.filter);
//         let styleFn = function(featureProperties, zoom, geometryType) {
//             let evResult = expr.evaluate(featureProperties, zoom, geometryType);
//             if(evResult !== false && evResult !== null) {
//                 return style;
//             }
//         }
//         return styleFn;
//     }
//
//     //no filtering on features in layer, style all the same
//     return style;
// }
