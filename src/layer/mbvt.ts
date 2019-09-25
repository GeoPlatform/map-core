
import * as L                        from 'leaflet';
import { Layer as LeafletLayer }     from "leaflet";
import {
    Layer as GeoPlatformLayer, Config, XHRHttpClient
} from '@geoplatform/client';
import parseMapBoxStyle from "../shared/mapbox-style";


const STYLE_CONCEPT = {
    "id": "78ad3ecc883de444c8a0684087a61753",
    "uri": "http://www.geoplatform.gov/def/OnlineFunction/styling",
    "type": "skos:Concept",
    "label": "styling"
};

const DEFAULT_STYLE_CONCEPT = {
    "id": "53983c42978cd510a5f844ec0a0c6c2b",
    "uri": "http://www.geoplatform.gov/def/OnlineFunction/default_styling",
    "type": "skos:Concept",
    "label": "default styling"
};



function mapBoxVectorTileLayer( layer : GeoPlatformLayer ) : LeafletLayer {

    let href = layer.href;
    if(!href || href.indexOf(".pbf") < 0) {
        console.log("LayerFactory - Layer does not define an Access URL");
        return null;  //missing URL
    }

    const Leaflet = L as any;

    //if Leaflet vector grid plugin is not installed, can't render VT Layers
    if( typeof(Leaflet.vectorGrid) === 'undefined' &&
        typeof(Leaflet.vectorGrid.protobuf) === 'undefined') {
        console.log("LayerFactory - Leaflet Vector Tiles plugin not found");
        return null;
    }

    let opts : any = {
        rendererFactory: ( L.canvas as any ).tile
        // ,
        // getFeatureId: function( feature : any ) { return feature.properties.id; }
    };
    if(Config.leafletPane) opts.pane = Config.leafletPane;

    let result = Leaflet.vectorGrid.protobuf(href, opts);

    //If the layer object defines styles to use, resolve them and apply the style(s)
    let style = null;
    let styles = (layer.related || []).filter( rel => {
        if(!rel.role) return false;
        if(rel.role.uri === DEFAULT_STYLE_CONCEPT.uri) {
            style = rel;
            return false;
        }
        return rel.role.uri === STYLE_CONCEPT.uri;
    });
    style = style || (styles.length ? styles[0] : null);
    if( style ) {
        applyVectorTileStyle( layer, result, style );
    }
    return result;
}



/**
 * @param layer GeoPlatform Layer object
 * @param leafletLayer GridLayer instance representing the GP Layer object specified
 * @param styleResource GP Auxillary Resource object
 */
function applyVectorTileStyle(
    layer : GeoPlatformLayer,
    leafletLayer : LeafletLayer,
    styleResource : any
) {

    if(!leafletLayer.hasOwnProperty('options')) {
        console.log("Warn: Could not apply style to layer; layer is not a VectorGrid instance");
        return;
    }

    //fetch clob definition of style to use...
    fetchStyleDefinition( layer.id, styleResource )
    .then( (styleDef : any) => {
        let layerInst = (leafletLayer as any);
        let style = parseMapBoxStyle( styleDef );
        if(style && typeof(style) !== 'undefined') {
            layerInst.options.vectorTileLayerStyles = style;
            layerInst.redraw();
        } else {
            console.log("[WARN] Unable to parse MapBox-style Style definitions from: ");
            console.log(JSON.stringify(styleResource, null, ' '));
        }
    })
    .catch( e => {
        console.log("An error occurred fetching the style definition for layer '" +
            layer.label + "'. " + e.message + ". Using default Leaflet style.");
    });
}



/**
 * @param layerId string identifier of GeoPlatform Layer object
 * @param resource - auxillary resource referencing style definition to fetch
 * @return Promise resolving style definition
 */
function fetchStyleDefinition( layerId : string, resource : any ) : Promise<any> {
    if(!layerId || !resource) {
        let err = new Error("Unable to fetch style definition, one or more parameters were invalid");
        return Promise.reject(err);
    }

    if(!resource.contentId && !resource.href) {
        let err = new Error("Unable to fetch style definition, missing id or url to style");
        return Promise.reject(err);
    }

    let url = null;
    if(resource.contentId) {
        url = Config.ualUrl + '/api/layers/' + layerId + '/styles/' + resource.contentId;
    } else if(resource.href) {
        url = resource.href;
    }

    let client = new XHRHttpClient();
    let request = client.createRequestOpts({
        method : "GET",
        url    : url,
        timeout: 5000,
        json   : true
    });
    return client.execute(request);
}



export {
    mapBoxVectorTileLayer as default,
    mapBoxVectorTileLayer,
    applyVectorTileStyle
};
