/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Control, Map, DomUtil, DomEvent, layerGroup, polyline, CircleMarker, divIcon, marker } from 'leaflet';
var ɵ0 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    /** @type {?} */
    var className = 'leaflet-control-zoom leaflet-bar leaflet-control';
    /** @type {?} */
    var container = DomUtil.create('div', className);
    this._createButton('&#8674;', 'Measure', 'leaflet-control-measure leaflet-bar-part leaflet-bar-part-top-and-bottom', container, this._toggleMeasure, this);
    return container;
}, ɵ1 = /**
 * @param {?} html
 * @param {?} title
 * @param {?} className
 * @param {?} container
 * @param {?} fn
 * @param {?} context
 * @return {?}
 */
function (html, title, className, container, fn, context) {
    /** @type {?} */
    var link = DomUtil.create('a', className, container);
    link.innerHTML = html;
    ((/** @type {?} */ (link))).href = '#';
    link.title = title;
    DomEvent
        .on(link, 'click', DomEvent.stopPropagation)
        .on(link, 'click', DomEvent.preventDefault)
        .on(link, 'click', fn, context)
        .on(link, 'dblclick', DomEvent.stopPropagation);
    return link;
}, ɵ2 = /**
 * @return {?}
 */
function () {
    this._measuring = !this._measuring;
    if (this._measuring) {
        DomUtil.addClass(this._container, 'leaflet-control-measure-on');
        this._startMeasuring();
    }
    else {
        DomUtil.removeClass(this._container, 'leaflet-control-measure-on');
        this._stopMeasuring();
    }
}, ɵ3 = /**
 * @return {?}
 */
function () {
    this._oldCursor = this._map._container.style.cursor;
    this._map._container.style.cursor = 'crosshair';
    this._doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();
    DomEvent
        .on(this._map, 'mousemove', this._mouseMove, this)
        .on(this._map, 'click', this._mouseClick, this)
        .on(this._map, 'dblclick', this._finishPath, this);
    //.on( (document as Document), 'keydown', this._onKeyDown, this);
    if (!this._layerPaint) {
        this._layerPaint = layerGroup().addTo(this._map);
    }
    if (!this._points) {
        this._points = [];
    }
}, ɵ4 = /**
 * @return {?}
 */
function () {
    this._map._container.style.cursor = this._oldCursor;
    DomEvent
        //.off((document as Document), 'keydown', this._onKeyDown, this)
        .off(this._map, 'mousemove', this._mouseMove, this)
        .off(this._map, 'click', this._mouseClick, this)
        .off(this._map, 'dblclick', this._mouseClick, this);
    if (this._doubleClickZoom) {
        this._map.doubleClickZoom.enable();
    }
    if (this._layerPaint) {
        this._layerPaint.clearLayers();
    }
    this._restartPath();
}, ɵ5 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    if (!e.latlng || !this._lastPoint) {
        return;
    }
    if (!this._layerPaintPathTemp) {
        /** @type {?} */
        var opts = (/** @type {?} */ ({
            color: 'black',
            weight: 1.5,
            clickable: false,
            dashArray: '6,3'
        }));
        this._layerPaintPathTemp = polyline([this._lastPoint, e.latlng], opts)
            .addTo(this._layerPaint);
    }
    else {
        this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
    }
    if (this._tooltip) {
        if (!this._distance) {
            this._distance = 0;
        }
        this._updateTooltipPosition(e.latlng);
        /** @type {?} */
        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._distance + distance, distance);
    }
}, ɵ6 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    // Skip if no coordinates
    if (!e.latlng) {
        return;
    }
    // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
    if (this._lastPoint && this._tooltip) {
        if (!this._distance) {
            this._distance = 0;
        }
        this._updateTooltipPosition(e.latlng);
        /** @type {?} */
        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._distance + distance, distance);
        this._distance += distance;
    }
    this._createTooltip(e.latlng);
    // If this is already the second click, add the location to the fix path (create one first if we don't have one)
    if (this._lastPoint && !this._layerPaintPath) {
        /** @type {?} */
        var opts = (/** @type {?} */ ({
            color: 'black',
            weight: 2,
            clickable: false
        }));
        this._layerPaintPath = polyline([this._lastPoint], opts).addTo(this._layerPaint);
    }
    if (this._layerPaintPath) {
        this._layerPaintPath.addLatLng(e.latlng);
    }
    // Upate the end marker to the current location
    if (this._lastCircle) {
        this._layerPaint.removeLayer(this._lastCircle);
    }
    /** @type {?} */
    var markerOpts = (/** @type {?} */ ({
        color: 'black',
        opacity: 1,
        weight: 1,
        fill: true,
        fillOpacity: 1,
        radius: 2,
        clickable: this._lastCircle ? true : false
    }));
    this._lastCircle = new CircleMarker(e.latlng, markerOpts).addTo(this._layerPaint);
    this._lastCircle.on('click', (/**
     * @return {?}
     */
    function () { this._finishPath(); }), this);
    // Save current location as last location
    this._lastPoint = e.latlng;
}, ɵ7 = /**
 * @return {?}
 */
function () {
    // Remove the last end marker as well as the last (moving tooltip)
    if (this._lastCircle) {
        this._layerPaint.removeLayer(this._lastCircle);
    }
    if (this._tooltip) {
        this._layerPaint.removeLayer(this._tooltip);
    }
    if (this._layerPaint && this._layerPaintPathTemp) {
        this._layerPaint.removeLayer(this._layerPaintPathTemp);
    }
    // Reset everything
    this._restartPath();
}, ɵ8 = /**
 * @return {?}
 */
function () {
    this._distance = 0;
    this._tooltip = undefined;
    this._lastCircle = undefined;
    this._lastPoint = undefined;
    this._layerPaintPath = undefined;
    this._layerPaintPathTemp = undefined;
}, ɵ9 = /**
 * @param {?} position
 * @return {?}
 */
function (position) {
    /** @type {?} */
    var icon = divIcon({
        className: 'leaflet-measure-tooltip',
        iconAnchor: [-5, -5]
    });
    /** @type {?} */
    var opts = {
        icon: icon,
        clickable: false
    };
    this._tooltip = marker(position, (/** @type {?} */ (opts))).addTo(this._layerPaint);
}, ɵ10 = /**
 * @param {?} position
 * @return {?}
 */
function (position) {
    this._tooltip.setLatLng(position);
}, ɵ11 = /**
 * @param {?} total
 * @param {?} difference
 * @return {?}
 */
function (total, difference) {
    /** @type {?} */
    var totalRound = this._round(total);
    /** @type {?} */
    var differenceRound = this._round(difference);
    /** @type {?} */
    var text = '<div class="leaflet-measure-tooltip-total">' + totalRound + ' nm</div>';
    if (differenceRound > 0 && totalRound != differenceRound) {
        text += '<div class="leaflet-measure-tooltip-difference">(+' + differenceRound + ' nm)</div>';
    }
    this._tooltip._icon.innerHTML = text;
}, ɵ12 = /**
 * @param {?} val
 * @return {?}
 */
function (val) {
    return Math.round((val / 1852) * 10) / 10;
}, ɵ13 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    if (e.keyCode == 27) {
        // If not in path exit measuring mode, else just finish path
        if (!this._lastPoint) {
            this._toggleMeasure();
        }
        else {
            this._finishPath();
        }
    }
};
/** @type {?} */
var measureControl = Control.extend({
    options: {
        position: 'topleft'
    },
    onAdd: (ɵ0),
    _createButton: (ɵ1),
    _toggleMeasure: (ɵ2),
    _startMeasuring: (ɵ3),
    _stopMeasuring: (ɵ4),
    _mouseMove: (ɵ5),
    _mouseClick: (ɵ6),
    _finishPath: (ɵ7),
    _restartPath: (ɵ8),
    _createTooltip: (ɵ9),
    _updateTooltipPosition: (ɵ10),
    _updateTooltipDistance: (ɵ11),
    _round: (ɵ12),
    _onKeyDown: (ɵ13)
});
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.Control.Measure = measureControl;
    L_1.control.measure = (/**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return new L_1.Control.Measure(options);
    });
}
Map.mergeOptions({
    measureControl: false
});
Map.addInitHook((/**
 * @return {?}
 */
function () {
    if (this.options.measureControl) {
        this.measureControl = new measureControl();
        this.addControl(this.measureControl);
    }
}));
export default measureControl;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsiY29udHJvbC9tZWFzdXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsT0FBTyxFQUNQLEdBQUcsRUFDSCxPQUFPLEVBQUUsUUFBUSxFQUNqQixVQUFVLEVBQ1YsUUFBUSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUUxQyxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFRTixVQUFVLEdBQUc7O1FBQ1osU0FBUyxHQUFHLGtEQUFrRDs7UUFDOUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQztJQUVoRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsMEVBQTBFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFM0osT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQzs7Ozs7Ozs7O0FBRWMsVUFBVSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU87O1FBQy9ELElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0lBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUMsbUJBQUEsSUFBSSxFQUFxQixDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUVuQixRQUFRO1NBQ0gsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQztTQUMzQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDO1NBQzFDLEVBQUUsQ0FBQyxJ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QUFDO0NBQ0w7QUFFRCxHQUFHLENBQUMsWUFBWSxDQUFDO0lBQ2IsY0FBYyxFQUFFLEtBQUs7Q0FDeEIsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLFdBQVc7OztBQUFDO0lBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDeEM7QUFDTCxDQUFDLEVBQUMsQ0FBQztBQUdILGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuICAgIENvbnRyb2wsIGNvbnRyb2wsXG4gICAgTWFwLFxuICAgIERvbVV0aWwsIERvbUV2ZW50LFxuICAgIGxheWVyR3JvdXAsXG4gICAgcG9seWxpbmUsIENpcmNsZU1hcmtlciwgZGl2SWNvbiwgbWFya2VyLFxuICAgIFBvbHlsaW5lT3B0aW9ucywgQ2lyY2xlTWFya2VyT3B0aW9uc1xufSBmcm9tICdsZWFmbGV0JztcblxuXG52YXIgbWVhc3VyZUNvbnRyb2wgPSBDb250cm9sLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcGxlZnQnXG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC1jb250cm9sLXpvb20gbGVhZmxldC1iYXIgbGVhZmxldC1jb250cm9sJyxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IERvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUpO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZUJ1dHRvbignJiM4Njc0OycsICdNZWFzdXJlJywgJ2xlYWZsZXQtY29udHJvbC1tZWFzdXJlIGxlYWZsZXQtYmFyLXBhcnQgbGVhZmxldC1iYXItcGFydC10b3AtYW5kLWJvdHRvbScsIGNvbnRhaW5lciwgdGhpcy5fdG9nZ2xlTWVhc3VyZSwgdGhpcyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuXG4gICAgX2NyZWF0ZUJ1dHRvbjogZnVuY3Rpb24gKGh0bWwsIHRpdGxlLCBjbGFzc05hbWUsIGNvbnRhaW5lciwgZm4sIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBEb21VdGlsLmNyZWF0ZSgnYScsIGNsYXNzTmFtZSwgY29udGFpbmVyKTtcbiAgICAgICAgbGluay5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAobGluayBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZiA9ICcjJztcbiAgICAgICAgbGluay50aXRsZSA9IHRpdGxlO1xuXG4gICAgICAgIERvbUV2ZW50XG4gICAgICAgICAgICAub24obGluaywgJ2NsaWNrJywgRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIERvbUV2ZW50LnByZXZlbnREZWZhdWx0KVxuICAgICAgICAgICAgLm9uKGxpbmssICdjbGljaycsIGZuLCBjb250ZXh0KVxuICAgICAgICAgICAgLm9uKGxpbmssICdkYmxjbGljaycsIERvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgfSxcblxuICAgIF90b2dnbGVNZWFzdXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX21lYXN1cmluZyA9ICF0aGlzLl9tZWFzdXJpbmc7XG5cbiAgICAgICAgaWYodGhpcy5fbWVhc3VyaW5nKSB7XG4gICAgICAgICAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuX2NvbnRhaW5lciwgJ2xlYWZsZXQtY29udHJvbC1tZWFzdXJlLW9uJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGFydE1lYXN1cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9jb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wtbWVhc3VyZS1vbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RvcE1lYXN1cmluZygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zdGFydE1lYXN1cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX29sZEN1cnNvciA9IHRoaXMuX21hcC5fY29udGFpbmVyLnN0eWxlLmN1cnNvcjtcbiAgICAgICAgdGhpcy5fbWFwLl9jb250YWluZXIuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG5cbiAgICAgICAgdGhpcy5fZG91YmxlQ2xpY2tab29tID0gdGhpcy5fbWFwLmRvdWJsZUNsaWNrWm9vbS5lbmFibGVkKCk7XG4gICAgICAgIHRoaXMuX21hcC5kb3VibGVDbGlja1pvb20uZGlzYWJsZSgpO1xuXG4gICAgICAgIERvbUV2ZW50XG4gICAgICAgICAgICAub24odGhpcy5fbWFwLCAnbW91c2Vtb3ZlJywgdGhpcy5fbW91c2VNb3ZlLCB0aGlzKVxuICAgICAgICAgICAgLm9uKHRoaXMuX21hcCwgJ2NsaWNrJywgdGhpcy5fbW91c2VDbGljaywgdGhpcylcbiAgICAgICAgICAgIC5vbih0aGlzLl9tYXAsICdkYmxjbGljaycsIHRoaXMuX2ZpbmlzaFBhdGgsIHRoaXMpXG4gICAgICAgICAgICAvLy5vbiggKGRvY3VtZW50IGFzIERvY3VtZW50KSwgJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24sIHRoaXMpO1xuXG4gICAgICAgIGlmKCF0aGlzLl9sYXllclBhaW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclBhaW50ID0gbGF5ZXJHcm91cCgpLmFkZFRvKHRoaXMuX21hcCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5fcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc3RvcE1lYXN1cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX21hcC5fY29udGFpbmVyLnN0eWxlLmN1cnNvciA9IHRoaXMuX29sZEN1cnNvcjtcblxuICAgICAgICBEb21FdmVudFxuICAgICAgICAgICAgLy8ub2ZmKChkb2N1bWVudCBhcyBEb2N1bWVudCksICdrZXlkb3duJywgdGhpcy5fb25LZXlEb3duLCB0aGlzKVxuICAgICAgICAgICAgLm9mZih0aGlzLl9tYXAsICdtb3VzZW1vdmUnLCB0aGlzLl9tb3VzZU1vdmUsIHRoaXMpXG4gICAgICAgICAgICAub2ZmKHRoaXMuX21hcCwgJ2NsaWNrJywgdGhpcy5fbW91c2VDbGljaywgdGhpcylcbiAgICAgICAgICAgIC5vZmYodGhpcy5fbWFwLCAnZGJsY2xpY2snLCB0aGlzLl9tb3VzZUNsaWNrLCB0aGlzKTtcblxuICAgICAgICBpZih0aGlzLl9kb3VibGVDbGlja1pvb20pIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5kb3VibGVDbGlja1pvb20uZW5hYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9sYXllclBhaW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclBhaW50LmNsZWFyTGF5ZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZXN0YXJ0UGF0aCgpO1xuICAgIH0sXG5cbiAgICBfbW91c2VNb3ZlOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKCFlLmxhdGxuZyB8fCAhdGhpcy5fbGFzdFBvaW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5fbGF5ZXJQYWludFBhdGhUZW1wKSB7XG4gICAgICAgICAgICBsZXQgb3B0cyA9IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IDEuNSxcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRhc2hBcnJheTogJzYsMydcbiAgICAgICAgICAgIH0gYXMgUG9seWxpbmVPcHRpb25zO1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXJQYWludFBhdGhUZW1wID0gcG9seWxpbmUoW3RoaXMuX2xhc3RQb2ludCwgZS5sYXRsbmddLCBvcHRzKVxuICAgICAgICAgICAgICAgIC5hZGRUbyh0aGlzLl9sYXllclBhaW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUGFpbnRQYXRoVGVtcC5zcGxpY2VMYXRMbmdzKDAsIDIsIHRoaXMuX2xhc3RQb2ludCwgZS5sYXRsbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fdG9vbHRpcCkge1xuICAgICAgICAgICAgaWYoIXRoaXMuX2Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzdGFuY2UgPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUb29sdGlwUG9zaXRpb24oZS5sYXRsbmcpO1xuXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBlLmxhdGxuZy5kaXN0YW5jZVRvKHRoaXMuX2xhc3RQb2ludCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUb29sdGlwRGlzdGFuY2UodGhpcy5fZGlzdGFuY2UgKyBkaXN0YW5jZSwgZGlzdGFuY2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9tb3VzZUNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8vIFNraXAgaWYgbm8gY29vcmRpbmF0ZXNcbiAgICAgICAgaWYoIWUubGF0bG5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgdG9vbHRpcCwgdXBkYXRlIHRoZSBkaXN0YW5jZSBhbmQgY3JlYXRlIGEgbmV3IHRvb2x0aXAsIGxlYXZpbmcgdGhlIG9sZCBvbmUgZXhhY3RseSB3aGVyZSBpdCBpcyAoaS5lLiB3aGVyZSB0aGUgdXNlciBoYXMgY2xpY2tlZClcbiAgICAgICAgaWYodGhpcy5fbGFzdFBvaW50ICYmIHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgIGlmKCF0aGlzLl9kaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3RhbmNlID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVG9vbHRpcFBvc2l0aW9uKGUubGF0bG5nKTtcblxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gZS5sYXRsbmcuZGlzdGFuY2VUbyh0aGlzLl9sYXN0UG9pbnQpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVG9vbHRpcERpc3RhbmNlKHRoaXMuX2Rpc3RhbmNlICsgZGlzdGFuY2UsIGRpc3RhbmNlKTtcblxuICAgICAgICAgICAgdGhpcy5fZGlzdGFuY2UgKz0gZGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3JlYXRlVG9vbHRpcChlLmxhdGxuZyk7XG5cblxuICAgICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgdGhlIHNlY29uZCBjbGljaywgYWRkIHRoZSBsb2NhdGlvbiB0byB0aGUgZml4IHBhdGggKGNyZWF0ZSBvbmUgZmlyc3QgaWYgd2UgZG9uJ3QgaGF2ZSBvbmUpXG4gICAgICAgIGlmKHRoaXMuX2xhc3RQb2ludCAmJiAhdGhpcy5fbGF5ZXJQYWludFBhdGgpIHtcbiAgICAgICAgICAgIGxldCBvcHRzID0ge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgICAgICAgIHdlaWdodDogMixcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IGZhbHNlXG4gICAgICAgICAgICB9IGFzIFBvbHlsaW5lT3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUGFpbnRQYXRoID0gcG9seWxpbmUoW3RoaXMuX2xhc3RQb2ludF0sIG9wdHMpLmFkZFRvKHRoaXMuX2xheWVyUGFpbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fbGF5ZXJQYWludFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUGFpbnRQYXRoLmFkZExhdExuZyhlLmxhdGxuZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGF0ZSB0aGUgZW5kIG1hcmtlciB0byB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICAgICBpZih0aGlzLl9sYXN0Q2lyY2xlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclBhaW50LnJlbW92ZUxheWVyKHRoaXMuX2xhc3RDaXJjbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1hcmtlck9wdHMgPSB7XG4gICAgICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB3ZWlnaHQ6IDEsXG4gICAgICAgICAgICBmaWxsOiB0cnVlLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgICAgICAgICByYWRpdXM6MixcbiAgICAgICAgICAgIGNsaWNrYWJsZTogdGhpcy5fbGFzdENpcmNsZSA/IHRydWUgOiBmYWxzZVxuICAgICAgICB9IGFzIENpcmNsZU1hcmtlck9wdGlvbnM7XG4gICAgICAgIHRoaXMuX2xhc3RDaXJjbGUgPSBuZXcgQ2lyY2xlTWFya2VyKGUubGF0bG5nLCBtYXJrZXJPcHRzKS5hZGRUbyh0aGlzLl9sYXllclBhaW50KTtcblxuICAgICAgICB0aGlzLl9sYXN0Q2lyY2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkgeyB0aGlzLl9maW5pc2hQYXRoKCk7IH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIFNhdmUgY3VycmVudCBsb2NhdGlvbiBhcyBsYXN0IGxvY2F0aW9uXG4gICAgICAgIHRoaXMuX2xhc3RQb2ludCA9IGUubGF0bG5nO1xuICAgIH0sXG5cbiAgICBfZmluaXNoUGF0aDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgbGFzdCBlbmQgbWFya2VyIGFzIHdlbGwgYXMgdGhlIGxhc3QgKG1vdmluZyB0b29sdGlwKVxuICAgICAgICBpZih0aGlzLl9sYXN0Q2lyY2xlKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXllclBhaW50LnJlbW92ZUxheWVyKHRoaXMuX2xhc3RDaXJjbGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuX3Rvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUGFpbnQucmVtb3ZlTGF5ZXIodGhpcy5fdG9vbHRpcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5fbGF5ZXJQYWludCAmJiB0aGlzLl9sYXllclBhaW50UGF0aFRlbXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xheWVyUGFpbnQucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJQYWludFBhdGhUZW1wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc2V0IGV2ZXJ5dGhpbmdcbiAgICAgICAgdGhpcy5fcmVzdGFydFBhdGgoKTtcbiAgICB9LFxuXG4gICAgX3Jlc3RhcnRQYXRoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fZGlzdGFuY2UgPSAwO1xuICAgICAgICB0aGlzLl90b29sdGlwID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9sYXN0Q2lyY2xlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9sYXN0UG9pbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2xheWVyUGFpbnRQYXRoID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9sYXllclBhaW50UGF0aFRlbXAgPSB1bmRlZmluZWQ7XG4gICAgfSxcblxuICAgIF9jcmVhdGVUb29sdGlwOiBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgaWNvbiA9IGRpdkljb24oe1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGVhZmxldC1tZWFzdXJlLXRvb2x0aXAnLFxuICAgICAgICAgICAgaWNvbkFuY2hvcjogWy01LCAtNV1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG9wdHM6IGFueSA9IHtcbiAgICAgICAgICAgIGljb246IGljb24sXG4gICAgICAgICAgICBjbGlja2FibGU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3Rvb2x0aXAgPSBtYXJrZXIocG9zaXRpb24sIG9wdHMgYXMgQ2lyY2xlTWFya2VyT3B0aW9ucykuYWRkVG8odGhpcy5fbGF5ZXJQYWludCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVUb29sdGlwUG9zaXRpb246IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXAuc2V0TGF0TG5nKHBvc2l0aW9uKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVRvb2x0aXBEaXN0YW5jZTogZnVuY3Rpb24odG90YWwsIGRpZmZlcmVuY2UpIHtcbiAgICAgICAgdmFyIHRvdGFsUm91bmQgPSB0aGlzLl9yb3VuZCh0b3RhbCksXG4gICAgICAgICAgICBkaWZmZXJlbmNlUm91bmQgPSB0aGlzLl9yb3VuZChkaWZmZXJlbmNlKTtcblxuICAgICAgICB2YXIgdGV4dCA9ICc8ZGl2IGNsYXNzPVwibGVhZmxldC1tZWFzdXJlLXRvb2x0aXAtdG90YWxcIj4nICsgdG90YWxSb3VuZCArICcgbm08L2Rpdj4nO1xuICAgICAgICBpZihkaWZmZXJlbmNlUm91bmQgPiAwICYmIHRvdGFsUm91bmQgIT0gZGlmZmVyZW5jZVJvdW5kKSB7XG4gICAgICAgICAgICB0ZXh0ICs9ICc8ZGl2IGNsYXNzPVwibGVhZmxldC1tZWFzdXJlLXRvb2x0aXAtZGlmZmVyZW5jZVwiPigrJyArIGRpZmZlcmVuY2VSb3VuZCArICcgbm0pPC9kaXY+JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Rvb2x0aXAuX2ljb24uaW5uZXJIVE1MID0gdGV4dDtcbiAgICB9LFxuXG4gICAgX3JvdW5kOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoKHZhbCAvIDE4NTIpICogMTApIC8gMTA7XG4gICAgfSxcblxuICAgIF9vbktleURvd246IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgICAgLy8gSWYgbm90IGluIHBhdGggZXhpdCBtZWFzdXJpbmcgbW9kZSwgZWxzZSBqdXN0IGZpbmlzaCBwYXRoXG4gICAgICAgICAgICBpZighdGhpcy5fbGFzdFBvaW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlTWVhc3VyZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maW5pc2hQYXRoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5pZiggKHdpbmRvdyBhcyBhbnkpLkwpIHtcbiAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4gICAgTC5Db250cm9sLk1lYXN1cmUgPSBtZWFzdXJlQ29udHJvbDtcbiAgICBMLmNvbnRyb2wubWVhc3VyZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5Db250cm9sLk1lYXN1cmUob3B0aW9ucyk7XG4gICAgfTtcbn1cblxuTWFwLm1lcmdlT3B0aW9ucyh7XG4gICAgbWVhc3VyZUNvbnRyb2w6IGZhbHNlXG59KTtcblxuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm1lYXN1cmVDb250cm9sKSB7XG4gICAgICAgIHRoaXMubWVhc3VyZUNvbnRyb2wgPSBuZXcgbWVhc3VyZUNvbnRyb2woKTtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMubWVhc3VyZUNvbnRyb2wpO1xuICAgIH1cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IG1lYXN1cmVDb250cm9sO1xuIl19