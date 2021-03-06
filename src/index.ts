
import Polyfills from "./polyfills";
Polyfills();


import LoadingControl from './control/loading';
import MeasureControl from './control/measure';
import MousePositionControl from './control/mouse-position';
import FeatureEditor from './control/feature-editor';

import DefaultBaseLayer from './layer/baselayer-default';
import LayerFactory from './layer/factory';
import OSMLayerFactory from './layer/osm-factory';
import BaseClusteredFeatureLayer from './layer/base-clustered-feature-layer';
import {
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed
} from './layer/cluster-feature';
import FeatureLayer from './layer/feature';
import {WMS, wms} from './layer/wms';
import {WMST, wmst} from './layer/wmst';
import {WMTS, wmts} from './layer/wmts';
import ESRITileLayer from './layer/esri-tile-layer';
import OSM from './layer/osm';
import { mapBoxVectorTileLayer } from './layer/mbvt';

import MapInstance from './map/instance';
import MapFactory from './map/factory';

import ServiceTypes from './service/types';

import PopupTemplate from './shared/popup-template';
import StyleResolver from './shared/style-resolver';
import parseMapBoxStyle from './shared/mapbox-style';



export {
    LoadingControl,
    MeasureControl,
    MousePositionControl,
    FeatureEditor,
    DefaultBaseLayer,
    LayerFactory,
    OSMLayerFactory,
    BaseClusteredFeatureLayer,
    ClusteredFeatureLayer,
    clusteredFeatures,
    geoJsonFeed,
    FeatureLayer,
    WMS, wms,
    WMST, wmst,
    WMTS, wmts,
    ESRITileLayer,
    OSM,
    mapBoxVectorTileLayer,
    MapInstance,
    MapFactory,
    ServiceTypes,
    PopupTemplate,
    StyleResolver,
    parseMapBoxStyle
};
