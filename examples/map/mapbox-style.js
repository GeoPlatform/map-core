
//configure geoplatform env variables needed to interact with the API
geoplatform.client.Config.configure({
    ualUrl : 'https://ual.geoplatform.gov'
});

const properties = {
    WETLAND_TYPE: "Lake"
};


let src = MAPBOX_STYLE;

let result = geoplatform.mapcore.parseMapBoxStyle(src);

Object.keys(result).forEach(key => {
    let style = result[key](properties, 1, 'polygon');

    console.log("Layer " + key + " Style:");
    console.log(JSON.stringify(style, null, ' '));
});

// console.log(JSON.stringify(result, null, ' '));
