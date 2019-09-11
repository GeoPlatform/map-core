interface LeafletStyle {
    weight?: number;
    opacity?: number;
    color?: string;
    dashArray?: number[];
    fillOpacity?: number;
    fillColor?: string;
    fillPattern?: any;
}
interface LeafletStyleMap {
    [key: string]: Function | LeafletStyle;
}
interface MapBoxStyle {
    version: number;
    name?: string;
    metadata?: any;
    center?: number[];
    zoom?: number;
    bearing?: number;
    pitch?: number;
    light?: any;
    sources?: any[];
    sprite?: string;
    glyphs?: string;
    transition?: any;
    layers?: MapBoxStyleLayer[];
    spriteJSON?: any;
    spriteURL?: string;
}
interface MapBoxStyleLayer {
    id: string;
    type: "fill" | "line" | "symbol" | "circle" | "heatmap" | "fill-extrusion" | "raster" | "hillshade" | "background";
    metadata?: any;
    source?: string;
    'source-layer'?: string;
    minzoom?: number;
    maxzoom?: number;
    filter?: any;
    layout?: any;
    paint?: MapBoxPaint;
}
interface MapBoxPaint {
    visibility?: "visible" | "none";
    'background-color'?: string;
    'background-pattern'?: string;
    'background-opacity'?: number;
    'fill-antialias'?: boolean;
    'fill-opacity'?: number | any[];
    'fill-color'?: string | any[];
    'fill-outline-color'?: string | any[];
    'fill-translate'?: number[];
    'fill-translate-anchor': "map" | "viewport";
    'fill-pattern'?: string;
    'line-cap'?: "butt" | "round" | "square";
    'line-join'?: "bevel" | "round" | "miter";
    'line-miter-limit'?: number;
    'line-round-limit'?: number;
    'line-opacity'?: number | any[];
    'line-color'?: string | any[];
    'line-translate'?: number[];
    'line-translate-anchor'?: "map" | "viewport";
    'line-width'?: number | any[];
    'line-gap-width'?: number;
    'line-offset'?: number;
    'line-blur'?: number;
    'line-dasharray'?: number[];
    'line-pattern'?: string;
    'line-gradient'?: string;
}
/**
 * @param style MapBox Style definition
 * @return object associating Leaflet styles with layer ids
 */
export default function parseMapBoxStyle(styleDef: MapBoxStyle): {
    [key: string]: LeafletStyleMap;
};
export {};
