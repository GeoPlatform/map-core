/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
import { ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed } from './layer/cluster-feature';
import FeatureLayer from './layer/feature';
import { WMS, wms } from './layer/wms';
import { WMST, wmst } from './layer/wmst';
import { WMTS, wmts } from './layer/wmts';
import ESRITileLayer from './layer/esri-tile-layer';
import OSM from './layer/osm';
import MapInstance from './map/instance';
import MapFactory from './map/factory';
import ServiceTypes from './service/types';
import PopupTemplate from './shared/popup-template';
import StyleResolver from './shared/style-resolver';
export { LoadingControl, MeasureControl, MousePositionControl, FeatureEditor, DefaultBaseLayer, LayerFactory, OSMLayerFactory, BaseClusteredFeatureLayer, ClusteredFeatureLayer, clusteredFeatures, geoJsonFeed, FeatureLayer, WMS, wms, WMST, wmst, WMTS, wmts, ESRITileLayer, OSM, MapInstance, MapFactory, ServiceTypes, PopupTemplate, StyleResolver };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsU0FBUyxFQUFFLENBQUM7QUFHWixPQUFPLGNBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLGNBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLG9CQUFvQixNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sZ0JBQWdCLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyx5QkFBeUIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLGlCQUFpQixFQUNqQixXQUFXLEVBQ2QsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLFlBQVksTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEdBQUcsTUFBTSxhQUFhLENBQUM7QUFFOUIsT0FBTyxXQUFXLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sYUFBYSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sYUFBYSxNQUFNLHlCQUF5QixDQUFDO0FBS3BELE9BQU8sRUFDSCxjQUFjLEVBQ2QsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixlQUFlLEVBQ2YseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLFlBQVksRUFDWixHQUFHLEVBQUUsR0FBRyxFQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsSUFBSSxFQUFFLElBQUksRUFDVixhQUFhLEVBQ2IsR0FBRyxFQUNILFdBQVcsRUFDWCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGFBQWEsRUFDYixhQUFhLEVBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBQb2x5ZmlsbHMgZnJvbSBcIi4vcG9seWZpbGxzXCI7XG5Qb2x5ZmlsbHMoKTtcblxuXG5pbXBvcnQgTG9hZGluZ0NvbnRyb2wgZnJvbSAnLi9jb250cm9sL2xvYWRpbmcnO1xuaW1wb3J0IE1lYXN1cmVDb250cm9sIGZyb20gJy4vY29udHJvbC9tZWFzdXJlJztcbmltcG9ydCBNb3VzZVBvc2l0aW9uQ29udHJvbCBmcm9tICcuL2NvbnRyb2wvbW91c2UtcG9zaXRpb24nO1xuaW1wb3J0IEZlYXR1cmVFZGl0b3IgZnJvbSAnLi9jb250cm9sL2ZlYXR1cmUtZWRpdG9yJztcblxuaW1wb3J0IERlZmF1bHRCYXNlTGF5ZXIgZnJvbSAnLi9sYXllci9iYXNlbGF5ZXItZGVmYXVsdCc7XG5pbXBvcnQgTGF5ZXJGYWN0b3J5IGZyb20gJy4vbGF5ZXIvZmFjdG9yeSc7XG5pbXBvcnQgT1NNTGF5ZXJGYWN0b3J5IGZyb20gJy4vbGF5ZXIvb3NtLWZhY3RvcnknO1xuaW1wb3J0IEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIgZnJvbSAnLi9sYXllci9iYXNlLWNsdXN0ZXJlZC1mZWF0dXJlLWxheWVyJztcbmltcG9ydCB7XG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkXG59IGZyb20gJy4vbGF5ZXIvY2x1c3Rlci1mZWF0dXJlJztcbmltcG9ydCBGZWF0dXJlTGF5ZXIgZnJvbSAnLi9sYXllci9mZWF0dXJlJztcbmltcG9ydCB7V01TLCB3bXN9IGZyb20gJy4vbGF5ZXIvd21zJztcbmltcG9ydCB7V01TVCwgd21zdH0gZnJvbSAnLi9sYXllci93bXN0JztcbmltcG9ydCB7V01UUywgd210c30gZnJvbSAnLi9sYXllci93bXRzJztcbmltcG9ydCBFU1JJVGlsZUxheWVyIGZyb20gJy4vbGF5ZXIvZXNyaS10aWxlLWxheWVyJztcbmltcG9ydCBPU00gZnJvbSAnLi9sYXllci9vc20nO1xuXG5pbXBvcnQgTWFwSW5zdGFuY2UgZnJvbSAnLi9tYXAvaW5zdGFuY2UnO1xuaW1wb3J0IE1hcEZhY3RvcnkgZnJvbSAnLi9tYXAvZmFjdG9yeSc7XG5cbmltcG9ydCBTZXJ2aWNlVHlwZXMgZnJvbSAnLi9zZXJ2aWNlL3R5cGVzJztcblxuaW1wb3J0IFBvcHVwVGVtcGxhdGUgZnJvbSAnLi9zaGFyZWQvcG9wdXAtdGVtcGxhdGUnO1xuaW1wb3J0IFN0eWxlUmVzb2x2ZXIgZnJvbSAnLi9zaGFyZWQvc3R5bGUtcmVzb2x2ZXInO1xuXG5cblxuXG5leHBvcnQge1xuICAgIExvYWRpbmdDb250cm9sLFxuICAgIE1lYXN1cmVDb250cm9sLFxuICAgIE1vdXNlUG9zaXRpb25Db250cm9sLFxuICAgIEZlYXR1cmVFZGl0b3IsXG4gICAgRGVmYXVsdEJhc2VMYXllcixcbiAgICBMYXllckZhY3RvcnksXG4gICAgT1NNTGF5ZXJGYWN0b3J5LFxuICAgIEJhc2VDbHVzdGVyZWRGZWF0dXJlTGF5ZXIsXG4gICAgQ2x1c3RlcmVkRmVhdHVyZUxheWVyLFxuICAgIGNsdXN0ZXJlZEZlYXR1cmVzLFxuICAgIGdlb0pzb25GZWVkLFxuICAgIEZlYXR1cmVMYXllcixcbiAgICBXTVMsIHdtcyxcbiAgICBXTVNULCB3bXN0LFxuICAgIFdNVFMsIHdtdHMsXG4gICAgRVNSSVRpbGVMYXllcixcbiAgICBPU00sXG4gICAgTWFwSW5zdGFuY2UsXG4gICAgTWFwRmFjdG9yeSxcbiAgICBTZXJ2aWNlVHlwZXMsXG4gICAgUG9wdXBUZW1wbGF0ZSxcbiAgICBTdHlsZVJlc29sdmVyXG59O1xuIl19