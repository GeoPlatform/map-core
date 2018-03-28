


(function (root, factory) {

    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('LayerFactory', [
            "q", "leaflet", "../service/types", "./osm", 'geoplatform.client/src/shared/config'],
            function(Q, L, ServiceTypes, OSM, Config) {
                return (root.LayerFactory = factory(Q, L, ServiceTypes, OSM, Config));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.LayerFactory = factory(
                require('q'),
                require('leaflet'),
                require('../service/types'),
                require('./osm'),
                require('geoplatform.client').Config
            )
        );
    } else {
        GeoPlatform.LayerFactory = factory(
            Q, L/*eaflet*/,
            GeoPlatform.ServiceTypes,
            GeoPlatform.OSM, GeoPlatform);
    }
}(this||window, function(Q, L/*eaflet*/, ServiceTypes, OSM, GeoPlatform) {


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
        if(OSM.test(layer)) {
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
            srs     = layer.supportedCRS ? layer.supportedCRS[0] : null,
            format  = layer.supportedFormats ? layer.supportedFormats[0] : null,
            opts = {};


        if(ServiceTypes.ESRI_MAP_SERVER &&
            ServiceTypes.ESRI_MAP_SERVER.uri === typeUri) {
            opts = {
                layers: layer.layerName,
                transparent: true,
                format: format || "png32"
            };
            if(srs) opts.srs = srs;
            if(GeoPlatform.leafletPane)
                opts.pane = GeoPlatform.leafletPane;
            return L.tileLayer.esri(url, opts);

        } else if(ServiceTypes.ESRI_FEATURE_SERVER &&
            ServiceTypes.ESRI_FEATURE_SERVER.uri === typeUri) {
            return L.GeoPlatform.clusteredFeatures(layer);

        } else if(ServiceTypes.ESRI_TILE_SERVER &&
            ServiceTypes.ESRI_TILE_SERVER.uri === typeUri) {
            opts = { url: url, useCors: true };
            if(GeoPlatform.leafletPane)
                opts.pane = GeoPlatform.leafletPane;
            return L.esri.tiledMapLayer(opts);

        } else if(ServiceTypes.FEED && ServiceTypes.FEED.uri === typeUri) {
            return L.GeoPlatform.geoJsonFeed(layer);

        } else if(ServiceTypes.WMS && ServiceTypes.WMS.uri === typeUri) {
            return L.GeoPlatform.wms(layer);

        } else if(ServiceTypes.WMST && ServiceTypes.WMST.uri === typeUri) {
            return L.GeoPlatform.wmst(layer);

        } else if(ServiceTypes.WMTS && ServiceTypes.WMTS.uri === typeUri) {
            return L.GeoPlatform.wmts(layer);

        } else {
            console.log("LayerFactory() - Could not create Leaflet layer for " +
                "GeoPlatform Layer with service type: " + typeUri);
            return null;
        }


        // switch(typeUri) {
        //
        //     case ServiceTypes.ESRI_MAP_SERVER.uri:
        //         opts = {
        //             layers: layer.layerName,
        //             transparent: true,
        //             format: format || "png32"
        //         };
        //         if(srs) opts.srs = srs;
        //         if(GeoPlatform.leafletPane)
        //             opts.pane = GeoPlatform.leafletPane;
        //         return L.tileLayer.esri(url, opts);
        //
        //     case ServiceTypes.ESRI_FEATURE_SERVER.uri:
        //         return L.GeoPlatform.clusteredFeatures(layer);
        //
        //     case ServiceTypes.ESRI_TILE_SERVER.uri:
        //         opts = { url: url, useCors: true };
        //         if(GeoPlatform.leafletPane)
        //             opts.pane = GeoPlatform.leafletPane;
        //         return L.esri.tiledMapLayer(opts);
        //
        //     case ServiceTypes.FEED.uri:
        //         return L.GeoPlatform.geoJsonFeed(layer);
        //
        //     case ServiceTypes.WMS.uri:
        //         return L.GeoPlatform.wms(layer);
        //
        //     case ServiceTypes.WMST.uri:
        //         return L.GeoPlatform.wmst(layer);
        //
        //     case ServiceTypes.WMTS.uri:
        //         return L.GeoPlatform.wmts(layer);
        //
        //     case ServiceTypes.WFS.uri:
        //
        //     case ServiceTypes.WCS.uri:
        //
        //         return null;
        //
        //     default: return null;
        // }
    };

    return L.GeoPlatform.LayerFactory;

}));
