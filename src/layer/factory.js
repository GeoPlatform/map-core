


(function(jQuery, Q, L/*eaflet*/, GeoPlatform) {


    /**
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    GeoPlatform.osm = function() {
        let query = GeoPlatform.QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        return GeoPlatform.layerService().search(query)
        .then( response => response.results.length ? response.results[0] : null)
        .catch( e => Q.reject(e));
    };

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    L.GeoPlatform.isOSM = function(layer) {
        return  layer &&
                layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
    };

    /**
     * @param {Object} layer - GeoPlatform Layer
     * @return {L.TileLayer}
     */
    L.GeoPlatform.osm = function(layer) {
        return new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 1, maxZoom: 19,
            attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });
    };

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {L.Layer} Leaflet layer instance
     */
    L.GeoPlatform.LayerFactory = function(layer) {

        if(!layer) {
            throw new Error(`
                L.GeoPlatform.LayerFactory() -
                Invalid argument: must provide a layer object
            `);
        }

        //OSM layers have no "services" so we have to treat them differently
        if(L.GeoPlatform.isOSM(layer)) {
            return L.GeoPlatform.osm(layer);
        }

        if(!layer.services || !layer.services.length) {
            throw new Error(`
                L.GeoPlatform.LayerFactory() -
                Cannot create Leaflet layer for GP Layer ${layer.id},
                layer has no services defined!
            `);
        }

        let service = layer.services[0],
            url     = service.href,
            typeUri = service.serviceType.uri,
            srs  = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
            opts = {};

        switch(typeUri) {

            case GeoPlatform.ServiceTypes.ESRI_MAP_SERVER.uri:
                opts = {
                    layers: layer.layerName,
                    transparent: true,
                    format: format || "png32"
                };
                if(srs) opts.srs = srs;
                if(GeoPlatform.leafletPane)
                    opts.pane = GeoPlatform.leafletPane;
                return L.tileLayer.esri(url, opts);

            case GeoPlatform.ServiceTypes.ESRI_FEATURE_SERVER.uri:
                return L.GeoPlatform.clusteredFeatures(layer);

            case GeoPlatform.ServiceTypes.ESRI_TILE_SERVER.uri:
                opts = { url: url, useCors: true };
                if(GeoPlatform.leafletPane)
                    opts.pane = GeoPlatform.leafletPane;
                return L.esri.tiledMapLayer(opts);

            case GeoPlatform.ServiceTypes.FEED.uri:
                return L.GeoPlatform.geoJsonFeed(layer);

            case GeoPlatform.ServiceTypes.WMS.uri:
                return L.GeoPlatform.wms(layer);

            case GeoPlatform.ServiceTypes.WMST.uri:
                return L.GeoPlatform.wmst(layer);

            case GeoPlatform.ServiceTypes.WMTS.uri:
                return L.GeoPlatform.wmts(layer);

            case GeoPlatform.ServiceTypes.WFS.uri:

            case GeoPlatform.ServiceTypes.WCS.uri:

                return null;

            default: return null;
        }
    };

})(jQuery, Q, L/*eaflet*/, GeoPlatform);
