
import * as L                        from 'leaflet';
import { Layer as LeafletLayer, SVG }     from "leaflet";
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

    augmentSVGTile();

    let opts : any = {
        rendererFactory: ( L.svg as any ).tile //( L.canvas as any ).tile
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
    let request = client.createRequestOpts({ method: "GET", url: url, timeout: 5000, json: true });
    return client.execute(request).then( (styleDef : any) => {
        if(styleDef.sprite) {
            let spriteUrl = resolveRelativeUrl(url + '/', styleDef.sprite);

            return fetchSpriteInfo(spriteUrl + '.json', client)
            .then( (spriteDef : any) => {
                styleDef.spriteJSON = spriteDef;
                styleDef.spriteURL = spriteUrl + '.png';
                return styleDef;
            });
        }
        return styleDef;
    });
}

/**
 * load sprite JSON and embed inline...
 */
function fetchSpriteInfo(spriteUrl, client) : Promise<any> {
    let request = client.createRequestOpts({method: "GET", url: spriteUrl, timeout: 5000, json: true});
    return client.execute(request);
}

/**
 *
 */
function resolveRelativeUrl(baseUrl, url) {
    if(!url) return baseUrl;
    return new URL(url, baseUrl).href;  //won't work in IE11 but fine elsewhere
}




function augmentSVGTile() {
    const Tile = (SVG as any).Tile;
    if(Tile && !Tile._augmented) {
        console.log("Augmenting Tile Layer");
        Tile.include({

            _augmented : true,

        	_addPath: function (layer) {

                let options = layer.options;
                let hasFillColor = !options.fillPattern && options.fillColor &&
                    options.fillColor !== 'transparent';

                if( this._rootGroup.firstChild && hasFillColor ) {
                    //move a non-fill pattern path to the front of its siblings so it
                    // is rendered BEFORE any fill patterns are.  SVG does not support
                    // z-index within it's elements and ordering is front to back (bottom to top).
                    this._rootGroup.insertBefore(layer._path, this._rootGroup.firstChild);
                } else {
                    this._rootGroup.appendChild(layer._path);
                }
        		this._layers[ (L as any).stamp(layer) ] = layer;
        	}
        });
    }
}







SVG.include({

    _updateStyle: function (layer) {
        var path = layer._path, options = layer.options;

        if (!path) { return; }

        if (options.stroke) {
            path.setAttribute('stroke',         options.color);
            path.setAttribute('stroke-opacity', options.opacity);
            path.setAttribute('stroke-width',   options.weight);
            path.setAttribute('stroke-linecap', options.lineCap);
            path.setAttribute('stroke-linejoin',options.lineJoin);

            if (options.dashArray) {
                path.setAttribute('stroke-dasharray', options.dashArray);
            } else {
                path.removeAttribute('stroke-dasharray');
            }

            if (options.dashOffset) {
                path.setAttribute('stroke-dashoffset', options.dashOffset);
            } else {
                path.removeAttribute('stroke-dashoffset');
            }
        } else {
            path.setAttribute('stroke', 'none');
        }

        if (options.fillPattern || (options.fillColor && options.fillColor !== 'transparent')) {
            if ( options.fillPattern && typeof(options.fillPattern) === "object" ) {
                this.__fillPattern(layer);
            } else {
                path.setAttribute('fill', options.fillColor || options.color);
            }
            path.setAttribute('fill-opacity', options.fillOpacity);
            path.setAttribute('fill-rule', options.fillRule || 'evenodd');
        } else {
            path.setAttribute('fill', 'none');
        }
    },

    __fillPattern: function(layer) {
        var path = layer._path, options = layer.options;

        if (!this._defs) {
            this._defs = SVG.create('defs');
            this._container.appendChild(this._defs);
        }

        var imgUrl = options.fillPattern.url;
        var patternId = options.fillPattern.id + this._tileCoord.z + this._tileCoord.x + this._tileCoord.y;
        var patternEl : any = document.getElementById(patternId);
        if (!patternEl) {

            var imgObj = new Image();
            imgObj.src = imgUrl;

            patternEl = SVG.create('pattern');
            patternEl.setAttribute('id', patternId);
            patternEl.setAttribute('x', options.fillPattern.x);
            patternEl.setAttribute('y', options.fillPattern.y);
            patternEl.setAttribute('patternUnits', 'userSpaceOnUse');
            patternEl.setAttribute('width', options.fillPattern.width);
            patternEl.setAttribute('height', options.fillPattern.height);

            this._defs.appendChild(patternEl);

            var imgEl = SVG.create('image');
            imgEl.setAttribute('x', '0');
            imgEl.setAttribute('y', '0');
            imgEl.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imgUrl);
            imgEl.setAttribute('width', options.fillPattern.width);
            imgEl.setAttribute('height', options.fillPattern.height);
            let tx = options.fillPattern.x > 0 ? ('-'+options.fillPattern.x) : 0;
            let ty = options.fillPattern.y > 0 ? ('-'+options.fillPattern.y) : 0;
            imgEl.setAttribute("transform", "translate(" + tx + " " + ty + ")")
            patternEl.appendChild(imgEl);

            imgObj.onload = function() {
                imgEl.setAttribute('width', imgObj.width+'');
                imgEl.setAttribute('height', imgObj.height+'');
            };
        }

        path.setAttribute('fill', "url(#"+patternId+")");
    }
});














export {
    mapBoxVectorTileLayer as default,
    mapBoxVectorTileLayer,
    applyVectorTileStyle
};
