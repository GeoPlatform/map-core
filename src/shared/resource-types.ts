
const MapResourceTypes = {
    GeoPlatformMap: "http://www.geoplatform.gov/ont/openmap/GeoplatformMap",
    AGOL: 'http://www.geoplatform.gov/ont/openmap/AGOLMap'
};

const LayerResourceTypes = {
    MapBoxVectorTile : 'http://www.geoplatform.gov/ont/openlayer/MapBoxVectorTileLayer',
    OSM: 'http://www.geoplatform.gov/ont/openlayer/OSMLayer',
    BaseLayer: 'http://www.geoplatform.gov/ont/openlayer/BaseLayer'
};

const ServiceResourceTypes = {
    WMS: 'http://opengis.net/spec/wms',
    WMTS: 'http://opengis.net/spec/wmts',
    WMST: 'http://www.geoplatform.gov/spec/ogc-wms-t',
    WFS: 'http://opengis.net/spec/wfs',
    WCS: 'http://opengis.net/spec/wcs',
    CSW: 'http://opengis.net/spec/csw',
    FEED: 'http://www.geoplatform.gov/spec/feed',
    EsriTile: 'http://www.geoplatform.gov/spec/esri-tile-rest',
    EsriMap: 'http://www.geoplatform.gov/spec/esri-map-rest',
    EsriImage: 'http://www.geoplatform.gov/spec/esri-image-rest',
    EsriFeature: 'http://www.geoplatform.gov/spec/esri-feature-rest'
};

export {
    MapResourceTypes,
    LayerResourceTypes,
    ServiceResourceTypes
}
