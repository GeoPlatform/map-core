


(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define(["jquery", "q", "L"/*eaflet*/, "GeoPlatform", "JQueryLayerService"],
            function(jQuery, Q, L, GeoPlatform, JQueryLayerService) {
                return (root.LayerFactory = factory(jQuery, Q, L, GeoPlatform, JQueryLayerService));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerFactory = factory(
                require("jquery"),
                require('q'),
                require('L'),
                require('GeoPlatform'),
                require('JQueryLayerService')
            )
        );
    } else {
        GeoPlatform.LayerFactory = factory(
            jQuery, Q, L/*eaflet*/, GeoPlatform, GeoPlatform.JQueryLayerService);
    }
}(this||window, function(jQuery, Q, L/*eaflet*/, GeoPlatform, JQueryLayerService) {

// (function(jQuery, Q, L/*eaflet*/, GeoPlatform) {

    /**
     * @param {Object} layer - GeoPlatform Layer object
     * @return {boolean} true if is an OSM layer
     */
    GeoPlatform.isOSM = function(layer) {
        return  layer &&
                layer.resourceTypes &&
                layer.resourceTypes.length &&
                ~layer.resourceTypes.indexOf("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
    };

    /**
     * @return {Promise} resolving OpenStreet Map GeoPlatform Layer
     */
    GeoPlatform.osm = function() {
        let query = GeoPlatform.QueryFactory()
            .fields('*')
            .resourceTypes("http://www.geoplatform.gov/ont/openlayer/OSMLayer");
        return new JQueryLayerService().search(query)
        .then( response => response.results.length ? response.results[0] : null)
        .catch( e => Q.reject(e));
    };

    /**
     * If a default base layer is defined using the 'defaultBaseLayer'
     * environment value, fetch it. Otherwise, fetch the OpenStreet Map layer.
     * @return {Promise} resolving GeoPlatform Layer object
     */
    GeoPlatform.defaultBaseLayer = function() {
        if(GeoPlatform.defaultBaseLayer) {
            return new JQueryLayerService().get(GeoPlatform.defaultBaseLayer)
            .catch(e => Q.resolve(GeoPlatform.osm()));
        } else {
            return GeoPlatform.osm();
        }
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
        if(GeoPlatform.isOSM(layer)) {
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

// })(jQuery, Q, L/*eaflet*/, GeoPlatform);

    return L.GeoPlatform.LayerFactory;

}));
