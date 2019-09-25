/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Control, Util, DomUtil, Map } from 'leaflet';
var ɵ0 = /**
 * @param {?} options
 * @return {?}
 */
function (options) {
    Util.setOptions(this, options);
    this._dataLoaders = {};
    // Try to set the zoom control this control is attached to from the
    // options
    if (this.options.zoomControl !== null) {
        this.zoomControl = this.options.zoomControl;
    }
}, ɵ1 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    this._addLayerListeners(map);
    this._addMapListeners(map);
    // Try to set the zoom control this control is attached to from the map
    // the control is being added to
    if (!this.options.separate && !this.zoomControl) {
        if (map.zoomControl) {
            this.zoomControl = map.zoomControl;
        }
        else if (map.zoomsliderControl) {
            this.zoomControl = map.zoomsliderControl;
        }
    }
    // Create the loading indicator
    /** @type {?} */
    var classes = 'leaflet-control-loading';
    /** @type {?} */
    var container;
    if (this.zoomControl && !this.options.separate) {
        // If there is a zoom control, hook into the bottom of it
        container = this.zoomControl._container;
        // These classes are no longer used as of Leaflet 0.6
        classes += ' leaflet-bar-part-bottom leaflet-bar-part last';
    }
    else {
        // Otherwise, create a container for the indicator
        container = DomUtil.create('div', 'leaflet-control-zoom leaflet-bar');
    }
    this._indicator = DomUtil.create('a', classes, container);
    return container;
}, ɵ2 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    this._removeLayerListeners(map);
    this._removeMapListeners(map);
}, ɵ3 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    if (this.zoomControl && !this.options.separate) {
        // Override Control.removeFrom() to avoid clobbering the entire
        // _container, which is the same as zoomControl's
        this._container.removeChild(this._indicator);
        this._map = null;
        this.onRemove(map);
        return this;
    }
    else {
        // If this control is separate from the zoomControl, call the
        // parent method so we don't leave behind an empty container
        return Control.prototype.remove.call(this);
    }
}, ɵ4 = /**
 * @param {?} id
 * @return {?}
 */
function (id) {
    this._dataLoaders[id] = true;
    this.updateIndicator();
}, ɵ5 = /**
 * @param {?} id
 * @return {?}
 */
function (id) {
    delete this._dataLoaders[id];
    this.updateIndicator();
}, ɵ6 = /**
 * @return {?}
 */
function () {
    if (this.isLoading()) {
        this._showIndicator();
    }
    else {
        this._hideIndicator();
    }
}, ɵ7 = /**
 * @return {?}
 */
function () {
    return this._countLoaders() > 0;
}, ɵ8 = /**
 * @return {?}
 */
function () {
    /** @type {?} */
    var size = 0;
    /** @type {?} */
    var key;
    for (key in this._dataLoaders) {
        if (this._dataLoaders.hasOwnProperty(key))
            size++;
    }
    return size;
}, ɵ9 = /**
 * @return {?}
 */
function () {
    // Show loading indicator
    DomUtil.addClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button not last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ10 = /**
 * @return {?}
 */
function () {
    // Hide loading indicator
    DomUtil.removeClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ11 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    this.addLoader(this.getEventId(e));
}, ɵ12 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    this.removeLoader(this.getEventId(e));
}, ɵ13 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    if (e.id) {
        return e.id;
    }
    else if (e.layer) {
        return e.layer._leaflet_id;
    }
    return e.target._leaflet_id;
}, ɵ14 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
    if (!e.layer || !e.layer.on)
        return;
    try {
        e.layer.on({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }
    catch (exception) {
        console.warn('L.Control.Loading: Tried and failed to add ' +
            ' event handlers to layer', e.layer);
        console.warn('L.Control.Loading: Full details', exception);
    }
}, ɵ15 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    // Add listeners for begin and end of load to any layers already on the
    // map
    map.eachLayer((/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        if (!layer.on)
            return;
        layer.on({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }), this);
    // When a layer is added to the map, add listeners for begin and end
    // of load
    map.on('layeradd', this._layerAdd, this);
}, ɵ16 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    // Remove listeners for begin and end of load from all layers
    map.eachLayer((/**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        if (!layer.off)
            return;
        layer.off({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }), this);
    // Remove layeradd listener from map
    map.off('layeradd', this._layerAdd, this);
}, ɵ17 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    // Add listeners to the map for (custom) dataloading and dataload
    // events, eg, for AJAX calls that affect the map but will not be
    // reflected in the above layer events.
    map.on({
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
    }, this);
}, ɵ18 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    map.off({
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
    }, this);
};
/** @type {?} */
var loadingControl = Control.extend({
    options: {
        position: 'topleft',
        separate: false,
        zoomControl: null,
        spinjs: false,
        spin: {
            lines: 7,
            length: 3,
            width: 3,
            radius: 5,
            rotate: 13,
            top: "83%"
        }
    },
    initialize: (ɵ0),
    onAdd: (ɵ1),
    onRemove: (ɵ2),
    removeFrom: (ɵ3),
    addLoader: (ɵ4),
    removeLoader: (ɵ5),
    updateIndicator: (ɵ6),
    isLoading: (ɵ7),
    _countLoaders: (ɵ8),
    _showIndicator: (ɵ9),
    _hideIndicator: (ɵ10),
    _handleLoading: (ɵ11),
    _handleLoad: (ɵ12),
    getEventId: (ɵ13),
    _layerAdd: (ɵ14),
    _addLayerListeners: (ɵ15),
    _removeLayerListeners: (ɵ16),
    _addMapListeners: (ɵ17),
    _removeMapListeners: (ɵ18)
});
if (((/** @type {?} */ (window))).L) {
    /** @type {?} */
    var L_1 = ((/** @type {?} */ (window))).L;
    L_1.Control.Loading = loadingControl;
    L_1.Control.loading = (/**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return new L_1.Control.Loading(options);
    });
}
Map.addInitHook((/**
 * @return {?}
 */
function () {
    if (this.options.loadingControl) {
        this.loadingControl = new loadingControl();
        this.addControl(this.loadingControl);
    }
}));
export default loadingControl;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsiY29udHJvbC9sb2FkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7OztBQWtCdEMsVUFBUyxPQUFPO0lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXZCLG1FQUFtRTtJQUNuRSxVQUFVO0lBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztLQUMvQztBQUNMLENBQUM7Ozs7QUFFTSxVQUFTLEdBQUc7SUFFZixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTNCLHVFQUF1RTtJQUN2RSxnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUM3QyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUM7U0FDNUM7S0FDSjs7O1FBR0csT0FBTyxHQUFHLHlCQUF5Qjs7UUFDbkMsU0FBUztJQUNiLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxD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QUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDYixHQUFDLEdBQUcsQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0IsR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0lBQ25DLEdBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztJQUFHLFVBQVMsT0FBTztRQUNoQyxPQUFPLElBQUksR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFBLENBQUM7Q0FDTDtBQUVELEdBQUcsQ0FBQyxXQUFXOzs7QUFBQztJQUNaLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3hDO0FBQ0wsQ0FBQyxFQUFDLENBQUM7QUFFSCxlQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29udHJvbCwgVXRpbCwgRG9tVXRpbCwgTWFwIH0gZnJvbSAnbGVhZmxldCc7XG5cbnZhciBsb2FkaW5nQ29udHJvbCA9IENvbnRyb2wuZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgICAgIHNlcGFyYXRlOiBmYWxzZSxcbiAgICAgICAgem9vbUNvbnRyb2w6IG51bGwsXG4gICAgICAgIHNwaW5qczogZmFsc2UsXG4gICAgICAgIHNwaW46IHtcbiAgICAgICAgICBsaW5lczogNyxcbiAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgcmFkaXVzOiA1LFxuICAgICAgICAgIHJvdGF0ZTogMTMsXG4gICAgICAgICAgdG9wOiBcIjgzJVwiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RhdGFMb2FkZXJzID0ge307XG5cbiAgICAgICAgLy8gVHJ5IHRvIHNldCB0aGUgem9vbSBjb250cm9sIHRoaXMgY29udHJvbCBpcyBhdHRhY2hlZCB0byBmcm9tIHRoZVxuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbUNvbnRyb2wgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSB0aGlzLm9wdGlvbnMuem9vbUNvbnRyb2w7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuXG4gICAgICAgIHRoaXMuX2FkZExheWVyTGlzdGVuZXJzKG1hcCk7XG4gICAgICAgIHRoaXMuX2FkZE1hcExpc3RlbmVycyhtYXApO1xuXG4gICAgICAgIC8vIFRyeSB0byBzZXQgdGhlIHpvb20gY29udHJvbCB0aGlzIGNvbnRyb2wgaXMgYXR0YWNoZWQgdG8gZnJvbSB0aGUgbWFwXG4gICAgICAgIC8vIHRoZSBjb250cm9sIGlzIGJlaW5nIGFkZGVkIHRvXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNlcGFyYXRlICYmICF0aGlzLnpvb21Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAobWFwLnpvb21Db250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IG1hcC56b29tQ29udHJvbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwLnpvb21zbGlkZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IG1hcC56b29tc2xpZGVyQ29udHJvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgdmFyIGNsYXNzZXMgPSAnbGVhZmxldC1jb250cm9sLWxvYWRpbmcnO1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCAmJiAhdGhpcy5vcHRpb25zLnNlcGFyYXRlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHpvb20gY29udHJvbCwgaG9vayBpbnRvIHRoZSBib3R0b20gb2YgaXRcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuem9vbUNvbnRyb2wuX2NvbnRhaW5lcjtcbiAgICAgICAgICAgIC8vIFRoZXNlIGNsYXNzZXMgYXJlIG5vIGxvbmdlciB1c2VkIGFzIG9mIExlYWZsZXQgMC42XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgbGVhZmxldC1iYXItcGFydC1ib3R0b20gbGVhZmxldC1iYXItcGFydCBsYXN0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgaW5kaWNhdG9yXG4gICAgICAgICAgICBjb250YWluZXIgPSBEb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC16b29tIGxlYWZsZXQtYmFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5kaWNhdG9yID0gRG9tVXRpbC5jcmVhdGUoJ2EnLCBjbGFzc2VzLCBjb250YWluZXIpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUxheWVyTGlzdGVuZXJzKG1hcCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZU1hcExpc3RlbmVycyhtYXApO1xuICAgIH0sXG5cbiAgICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgIC8vIE92ZXJyaWRlIENvbnRyb2wucmVtb3ZlRnJvbSgpIHRvIGF2b2lkIGNsb2JiZXJpbmcgdGhlIGVudGlyZVxuICAgICAgICAgICAgLy8gX2NvbnRhaW5lciwgd2hpY2ggaXMgdGhlIHNhbWUgYXMgem9vbUNvbnRyb2wnc1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuX2luZGljYXRvcik7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZShtYXApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGNvbnRyb2wgaXMgc2VwYXJhdGUgZnJvbSB0aGUgem9vbUNvbnRyb2wsIGNhbGwgdGhlXG4gICAgICAgICAgICAvLyBwYXJlbnQgbWV0aG9kIHNvIHdlIGRvbid0IGxlYXZlIGJlaGluZCBhbiBlbXB0eSBjb250YWluZXJcbiAgICAgICAgICAgIHJldHVybiBDb250cm9sLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRMb2FkZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHRoaXMuX2RhdGFMb2FkZXJzW2lkXSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlSW5kaWNhdG9yKCk7XG4gICAgfSxcblxuICAgIHJlbW92ZUxvYWRlcjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFMb2FkZXJzW2lkXTtcbiAgICAgICAgdGhpcy51cGRhdGVJbmRpY2F0b3IoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSW5kaWNhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dJbmRpY2F0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVJbmRpY2F0b3IoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xvYWRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY291bnRMb2FkZXJzKCkgPiAwO1xuICAgIH0sXG5cbiAgICBfY291bnRMb2FkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNpemUgPSAwLCBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMuX2RhdGFMb2FkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUxvYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgc2l6ZSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH0sXG5cbiAgICBfc2hvd0luZGljYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbmRpY2F0b3IsICdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gSWYgem9vbUNvbnRyb2wgZXhpc3RzLCBtYWtlIHRoZSB6b29tLW91dCBidXR0b24gbm90IGxhc3RcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sIGluc3RhbmNlb2YgQ29udHJvbC5ab29tKSB7XG4gICAgICAgICAgICAgICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLnpvb21Db250cm9sLl96b29tT3V0QnV0dG9uLCAnbGVhZmxldC1iYXItcGFydC1ib3R0b20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGlkZUluZGljYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbmRpY2F0b3IsICdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gSWYgem9vbUNvbnRyb2wgZXhpc3RzLCBtYWtlIHRoZSB6b29tLW91dCBidXR0b24gbGFzdFxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5zZXBhcmF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUNvbnRyb2wgaW5zdGFuY2VvZiBDb250cm9sLlpvb20pIHtcbiAgICAgICAgICAgICAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuem9vbUNvbnRyb2wuX3pvb21PdXRCdXR0b24sICdsZWFmbGV0LWJhci1wYXJ0LWJvdHRvbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oYW5kbGVMb2FkaW5nOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuYWRkTG9hZGVyKHRoaXMuZ2V0RXZlbnRJZChlKSk7XG4gICAgfSxcblxuICAgIF9oYW5kbGVMb2FkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTG9hZGVyKHRoaXMuZ2V0RXZlbnRJZChlKSk7XG4gICAgfSxcblxuICAgIGdldEV2ZW50SWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGUubGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxheWVyLl9sZWFmbGV0X2lkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlLnRhcmdldC5fbGVhZmxldF9pZDtcbiAgICB9LFxuXG4gICAgX2xheWVyQWRkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS5sYXllciB8fCAhZS5sYXllci5vbikgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZS5sYXllci5vbih7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0wuQ29udHJvbC5Mb2FkaW5nOiBUcmllZCBhbmQgZmFpbGVkIHRvIGFkZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnIGV2ZW50IGhhbmRsZXJzIHRvIGxheWVyJywgZS5sYXllcik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0wuQ29udHJvbC5Mb2FkaW5nOiBGdWxsIGRldGFpbHMnLCBleGNlcHRpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9hZGRMYXllckxpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgZm9yIGJlZ2luIGFuZCBlbmQgb2YgbG9hZCB0byBhbnkgbGF5ZXJzIGFscmVhZHkgb24gdGhlXG4gICAgICAgIC8vIG1hcFxuICAgICAgICBtYXAuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIWxheWVyLm9uKSByZXR1cm47XG4gICAgICAgICAgICBsYXllci5vbih7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8gV2hlbiBhIGxheWVyIGlzIGFkZGVkIHRvIHRoZSBtYXAsIGFkZCBsaXN0ZW5lcnMgZm9yIGJlZ2luIGFuZCBlbmRcbiAgICAgICAgLy8gb2YgbG9hZFxuICAgICAgICBtYXAub24oJ2xheWVyYWRkJywgdGhpcy5fbGF5ZXJBZGQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlTGF5ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGZvciBiZWdpbiBhbmQgZW5kIG9mIGxvYWQgZnJvbSBhbGwgbGF5ZXJzXG4gICAgICAgIG1hcC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXIub2ZmKSByZXR1cm47XG4gICAgICAgICAgICBsYXllci5vZmYoe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgbG9hZDogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXllcmFkZCBsaXN0ZW5lciBmcm9tIG1hcFxuICAgICAgICBtYXAub2ZmKCdsYXllcmFkZCcsIHRoaXMuX2xheWVyQWRkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX2FkZE1hcExpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIG1hcCBmb3IgKGN1c3RvbSkgZGF0YWxvYWRpbmcgYW5kIGRhdGFsb2FkXG4gICAgICAgIC8vIGV2ZW50cywgZWcsIGZvciBBSkFYIGNhbGxzIHRoYXQgYWZmZWN0IHRoZSBtYXAgYnV0IHdpbGwgbm90IGJlXG4gICAgICAgIC8vIHJlZmxlY3RlZCBpbiB0aGUgYWJvdmUgbGF5ZXIgZXZlbnRzLlxuICAgICAgICBtYXAub24oe1xuICAgICAgICAgICAgZGF0YWxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICBkYXRhbG9hZDogdGhpcy5faGFuZGxlTG9hZCxcbiAgICAgICAgICAgIGxheWVycmVtb3ZlOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlTWFwTGlzdGVuZXJzOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgbWFwLm9mZih7XG4gICAgICAgICAgICBkYXRhbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgIGRhdGFsb2FkOiB0aGlzLl9oYW5kbGVMb2FkLFxuICAgICAgICAgICAgbGF5ZXJyZW1vdmU6IHRoaXMuX2hhbmRsZUxvYWRcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxufSk7XG5cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuQ29udHJvbC5Mb2FkaW5nID0gbG9hZGluZ0NvbnRyb2w7XG4gICAgTC5Db250cm9sLmxvYWRpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5Db250cm9sLkxvYWRpbmcob3B0aW9ucyk7XG4gICAgfTtcbn1cblxuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmxvYWRpbmdDb250cm9sKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0NvbnRyb2wgPSBuZXcgbG9hZGluZ0NvbnRyb2woKTtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMubG9hZGluZ0NvbnRyb2wpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkaW5nQ29udHJvbDtcbiJdfQ==