
import LoadingControl from './control/L.Control.Loading';
import MeasureControl from './control/L.Control.MeasureControl';
import MousePositionControl from './control/L.Control.MousePosition';

import DefaultBaseLayer from './layer/baselayer-default';
import LayerFactory from './layer/factory';
import OSMLayerFactory from './layer/osm-factory';
import ESRIClusterFeatureLayer from './layer/L.esri.Cluster.FeatureLayer';
import {
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed
} from './layer/cluster-feature';
import FeatureLayer from './layer/feature';
import {WMS, wms} from './layer/wms';
import {WMST, wmst} from './layer/wmst';
import {WMTS, wmts} from './layer/wmts';
import ESRITileLayer from './layer/L.TileLayer.ESRI';
import OSM from './layer/osm';

import MapInstance from './map/instance';
import MapFactory from './map/factory';

import ServiceTypes from './service/types';

import PopupTemplate from './shared/popup-template';
import StyleResolver from './shared/style-resolver';



if(typeof(Array.prototype.each) === 'undefined') {
    Array.prototype.each = function(fn) {
        let arr = this, len = arr.length;
        for(let i=0; i<len; ++i) {
            try {
                fn(arr[i]);
            } catch(e) {
                throw e;
            }
        }
    };
}





export default {
    LoadingControl,
    MeasureControl,
    MousePositionControl,
    DefaultBaseLayer,
    LayerFactory,
    OSMLayerFactory,
    ESRIClusterFeatureLayer,
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed,
    FeatureLayer,
    WMS,
    wms,
    WMST,
    wmst,
    WMTS,
    wmts,
    ESRITileLayer,
    OSM,
    MapInstance,
    MapFactory,
    ServiceTypes,
    PopupTemplate,
    StyleResolver
};
