/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Control, Util, DomUtil, Map } from 'leaflet';
var ɵ0 = function (options) {
    Util.setOptions(this, options);
    this._dataLoaders = {};
    // Try to set the zoom control this control is attached to from the
    // options
    if (this.options.zoomControl !== null) {
        this.zoomControl = this.options.zoomControl;
    }
}, ɵ1 = function (map) {
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
}, ɵ2 = function (map) {
    this._removeLayerListeners(map);
    this._removeMapListeners(map);
}, ɵ3 = function (map) {
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
}, ɵ4 = function (id) {
    this._dataLoaders[id] = true;
    this.updateIndicator();
}, ɵ5 = function (id) {
    delete this._dataLoaders[id];
    this.updateIndicator();
}, ɵ6 = function () {
    if (this.isLoading()) {
        this._showIndicator();
    }
    else {
        this._hideIndicator();
    }
}, ɵ7 = function () {
    return this._countLoaders() > 0;
}, ɵ8 = function () {
    /** @type {?} */
    var size = 0;
    /** @type {?} */
    var key;
    for (key in this._dataLoaders) {
        if (this._dataLoaders.hasOwnProperty(key))
            size++;
    }
    return size;
}, ɵ9 = function () {
    // Show loading indicator
    DomUtil.addClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button not last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ10 = function () {
    // Hide loading indicator
    DomUtil.removeClass(this._indicator, 'is-loading');
    // If zoomControl exists, make the zoom-out button last
    if (!this.options.separate) {
        if (this.zoomControl instanceof Control.Zoom) {
            DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
        }
    }
}, ɵ11 = function (e) {
    this.addLoader(this.getEventId(e));
}, ɵ12 = function (e) {
    this.removeLoader(this.getEventId(e));
}, ɵ13 = function (e) {
    if (e.id) {
        return e.id;
    }
    else if (e.layer) {
        return e.layer._leaflet_id;
    }
    return e.target._leaflet_id;
}, ɵ14 = function (e) {
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
}, ɵ15 = function (map) {
    // Add listeners for begin and end of load to any layers already on the
    // map
    map.eachLayer(function (layer) {
        if (!layer.on)
            return;
        layer.on({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }, this);
    // When a layer is added to the map, add listeners for begin and end
    // of load
    map.on('layeradd', this._layerAdd, this);
}, ɵ16 = function (map) {
    // Remove listeners for begin and end of load from all layers
    map.eachLayer(function (layer) {
        if (!layer.off)
            return;
        layer.off({
            loading: this._handleLoading,
            load: this._handleLoad
        }, this);
    }, this);
    // Remove layeradd listener from map
    map.off('layeradd', this._layerAdd, this);
}, ɵ17 = function (map) {
    // Add listeners to the map for (custom) dataloading and dataload
    // events, eg, for AJAX calls that affect the map but will not be
    // reflected in the above layer events.
    map.on({
        dataloading: this._handleLoading,
        dataload: this._handleLoad,
        layerremove: this._handleLoad
    }, this);
}, ɵ18 = function (map) {
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
    initialize: ɵ0,
    onAdd: ɵ1,
    onRemove: ɵ2,
    removeFrom: ɵ3,
    addLoader: ɵ4,
    removeLoader: ɵ5,
    updateIndicator: ɵ6,
    isLoading: ɵ7,
    _countLoaders: ɵ8,
    _showIndicator: ɵ9,
    _hideIndicator: ɵ10,
    _handleLoading: ɵ11,
    _handleLoad: ɵ12,
    getEventId: ɵ13,
    _layerAdd: ɵ14,
    _addLayerListeners: ɵ15,
    _removeLayerListeners: ɵ16,
    _addMapListeners: ɵ17,
    _removeMapListeners: ɵ18
});
if ((/** @type {?} */ (window)).L) {
    /** @type {?} */
    var L_1 = (/** @type {?} */ (window)).L;
    L_1.Control.Loading = loadingControl;
    L_1.Control.loading = function (options) {
        return new L_1.Control.Loading(options);
    };
}
Map.addInitHook(function () {
    if (this.options.loadingControl) {
        this.loadingControl = new loadingControl();
        this.addControl(this.loadingControl);
    }
});
export default loadingControl;
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5Db250cm9sLkxvYWRpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsiY29udHJvbC9MLkNvbnRyb2wuTG9hZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQztTQWtCdEMsVUFBUyxPQUFPO0lBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDOzs7SUFJdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztLQUMvQztDQUNKLE9BRU0sVUFBUyxHQUFHO0lBRWYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0lBSTNCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDN0MsSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUN0QzthQUFNLElBQUksR0FBRyxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1NBQzVDO0tBQ0o7O0lBR0QsSUFBSSxPQUFPLEdBQUcseUJBQXlCLENBQUM7O0lBQ3hDLElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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Q0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3hDO0NBQ0osQ0FBQyxDQUFDO0FBRUgsZUFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbnRyb2wsIFV0aWwsIERvbVV0aWwsIE1hcCB9IGZyb20gJ2xlYWZsZXQnO1xuXG52YXIgbG9hZGluZ0NvbnRyb2wgPSBDb250cm9sLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxuICAgICAgICBzZXBhcmF0ZTogZmFsc2UsXG4gICAgICAgIHpvb21Db250cm9sOiBudWxsLFxuICAgICAgICBzcGluanM6IGZhbHNlLFxuICAgICAgICBzcGluOiB7XG4gICAgICAgICAgbGluZXM6IDcsXG4gICAgICAgICAgbGVuZ3RoOiAzLFxuICAgICAgICAgIHdpZHRoOiAzLFxuICAgICAgICAgIHJhZGl1czogNSxcbiAgICAgICAgICByb3RhdGU6IDEzLFxuICAgICAgICAgIHRvcDogXCI4MyVcIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kYXRhTG9hZGVycyA9IHt9O1xuXG4gICAgICAgIC8vIFRyeSB0byBzZXQgdGhlIHpvb20gY29udHJvbCB0aGlzIGNvbnRyb2wgaXMgYXR0YWNoZWQgdG8gZnJvbSB0aGVcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnpvb21Db250cm9sICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnpvb21Db250cm9sID0gdGhpcy5vcHRpb25zLnpvb21Db250cm9sO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQWRkOiBmdW5jdGlvbihtYXApIHtcblxuICAgICAgICB0aGlzLl9hZGRMYXllckxpc3RlbmVycyhtYXApO1xuICAgICAgICB0aGlzLl9hZGRNYXBMaXN0ZW5lcnMobWFwKTtcblxuICAgICAgICAvLyBUcnkgdG8gc2V0IHRoZSB6b29tIGNvbnRyb2wgdGhpcyBjb250cm9sIGlzIGF0dGFjaGVkIHRvIGZyb20gdGhlIG1hcFxuICAgICAgICAvLyB0aGUgY29udHJvbCBpcyBiZWluZyBhZGRlZCB0b1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5zZXBhcmF0ZSAmJiAhdGhpcy56b29tQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKG1hcC56b29tQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSBtYXAuem9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hcC56b29tc2xpZGVyQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSBtYXAuem9vbXNsaWRlckNvbnRyb2w7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICAgIHZhciBjbGFzc2VzID0gJ2xlYWZsZXQtY29udHJvbC1sb2FkaW5nJztcbiAgICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgICAgaWYgKHRoaXMuem9vbUNvbnRyb2wgJiYgIXRoaXMub3B0aW9ucy5zZXBhcmF0ZSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSB6b29tIGNvbnRyb2wsIGhvb2sgaW50byB0aGUgYm90dG9tIG9mIGl0XG4gICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLnpvb21Db250cm9sLl9jb250YWluZXI7XG4gICAgICAgICAgICAvLyBUaGVzZSBjbGFzc2VzIGFyZSBubyBsb25nZXIgdXNlZCBhcyBvZiBMZWFmbGV0IDAuNlxuICAgICAgICAgICAgY2xhc3NlcyArPSAnIGxlYWZsZXQtYmFyLXBhcnQtYm90dG9tIGxlYWZsZXQtYmFyLXBhcnQgbGFzdCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGNyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIGluZGljYXRvclxuICAgICAgICAgICAgY29udGFpbmVyID0gRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wtem9vbSBsZWFmbGV0LWJhcicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2luZGljYXRvciA9IERvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NlcywgY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9LFxuXG4gICAgb25SZW1vdmU6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVMYXllckxpc3RlbmVycyhtYXApO1xuICAgICAgICB0aGlzLl9yZW1vdmVNYXBMaXN0ZW5lcnMobWFwKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlRnJvbTogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCAmJiAhdGhpcy5vcHRpb25zLnNlcGFyYXRlKSB7XG4gICAgICAgICAgICAvLyBPdmVycmlkZSBDb250cm9sLnJlbW92ZUZyb20oKSB0byBhdm9pZCBjbG9iYmVyaW5nIHRoZSBlbnRpcmVcbiAgICAgICAgICAgIC8vIF9jb250YWluZXIsIHdoaWNoIGlzIHRoZSBzYW1lIGFzIHpvb21Db250cm9sJ3NcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9pbmRpY2F0b3IpO1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmUobWFwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgdGhpcyBjb250cm9sIGlzIHNlcGFyYXRlIGZyb20gdGhlIHpvb21Db250cm9sLCBjYWxsIHRoZVxuICAgICAgICAgICAgLy8gcGFyZW50IG1ldGhvZCBzbyB3ZSBkb24ndCBsZWF2ZSBiZWhpbmQgYW4gZW1wdHkgY29udGFpbmVyXG4gICAgICAgICAgICByZXR1cm4gQ29udHJvbC5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkTG9hZGVyOiBmdW5jdGlvbihpZCkge1xuICAgICAgICB0aGlzLl9kYXRhTG9hZGVyc1tpZF0gPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUluZGljYXRvcigpO1xuICAgIH0sXG5cbiAgICByZW1vdmVMb2FkZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhTG9hZGVyc1tpZF07XG4gICAgICAgIHRoaXMudXBkYXRlSW5kaWNhdG9yKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUluZGljYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93SW5kaWNhdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9oaWRlSW5kaWNhdG9yKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNMb2FkaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50TG9hZGVycygpID4gMDtcbiAgICB9LFxuXG4gICAgX2NvdW50TG9hZGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzaXplID0gMCwga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiB0aGlzLl9kYXRhTG9hZGVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFMb2FkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHNpemUrKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICB9LFxuXG4gICAgX3Nob3dJbmRpY2F0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBTaG93IGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICAgIERvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW5kaWNhdG9yLCAnaXMtbG9hZGluZycpO1xuXG4gICAgICAgIC8vIElmIHpvb21Db250cm9sIGV4aXN0cywgbWFrZSB0aGUgem9vbS1vdXQgYnV0dG9uIG5vdCBsYXN0XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNlcGFyYXRlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCBpbnN0YW5jZW9mIENvbnRyb2wuWm9vbSkge1xuICAgICAgICAgICAgICAgIERvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy56b29tQ29udHJvbC5fem9vbU91dEJ1dHRvbiwgJ2xlYWZsZXQtYmFyLXBhcnQtYm90dG9tJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2hpZGVJbmRpY2F0b3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBIaWRlIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICAgIERvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5faW5kaWNhdG9yLCAnaXMtbG9hZGluZycpO1xuXG4gICAgICAgIC8vIElmIHpvb21Db250cm9sIGV4aXN0cywgbWFrZSB0aGUgem9vbS1vdXQgYnV0dG9uIGxhc3RcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sIGluc3RhbmNlb2YgQ29udHJvbC5ab29tKSB7XG4gICAgICAgICAgICAgICAgRG9tVXRpbC5hZGRDbGFzcyh0aGlzLnpvb21Db250cm9sLl96b29tT3V0QnV0dG9uLCAnbGVhZmxldC1iYXItcGFydC1ib3R0b20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGFuZGxlTG9hZGluZzogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLmFkZExvYWRlcih0aGlzLmdldEV2ZW50SWQoZSkpO1xuICAgIH0sXG5cbiAgICBfaGFuZGxlTG9hZDogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUxvYWRlcih0aGlzLmdldEV2ZW50SWQoZSkpO1xuICAgIH0sXG5cbiAgICBnZXRFdmVudElkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5pZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlLmxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZS5sYXllci5fbGVhZmxldF9pZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZS50YXJnZXQuX2xlYWZsZXRfaWQ7XG4gICAgfSxcblxuICAgIF9sYXllckFkZDogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWUubGF5ZXIgfHwgIWUubGF5ZXIub24pIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGUubGF5ZXIub24oe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgbG9hZDogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdMLkNvbnRyb2wuTG9hZGluZzogVHJpZWQgYW5kIGZhaWxlZCB0byBhZGQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJyBldmVudCBoYW5kbGVycyB0byBsYXllcicsIGUubGF5ZXIpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdMLkNvbnRyb2wuTG9hZGluZzogRnVsbCBkZXRhaWxzJywgZXhjZXB0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfYWRkTGF5ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIGZvciBiZWdpbiBhbmQgZW5kIG9mIGxvYWQgdG8gYW55IGxheWVycyBhbHJlYWR5IG9uIHRoZVxuICAgICAgICAvLyBtYXBcbiAgICAgICAgbWFwLmVhY2hMYXllcihmdW5jdGlvbihsYXllcikge1xuICAgICAgICAgICAgaWYgKCFsYXllci5vbikgcmV0dXJuO1xuICAgICAgICAgICAgbGF5ZXIub24oe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgbG9hZDogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIFdoZW4gYSBsYXllciBpcyBhZGRlZCB0byB0aGUgbWFwLCBhZGQgbGlzdGVuZXJzIGZvciBiZWdpbiBhbmQgZW5kXG4gICAgICAgIC8vIG9mIGxvYWRcbiAgICAgICAgbWFwLm9uKCdsYXllcmFkZCcsIHRoaXMuX2xheWVyQWRkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZUxheWVyTGlzdGVuZXJzOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgLy8gUmVtb3ZlIGxpc3RlbmVycyBmb3IgYmVnaW4gYW5kIGVuZCBvZiBsb2FkIGZyb20gYWxsIGxheWVyc1xuICAgICAgICBtYXAuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIWxheWVyLm9mZikgcmV0dXJuO1xuICAgICAgICAgICAgbGF5ZXIub2ZmKHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0aGlzLl9oYW5kbGVMb2FkaW5nLFxuICAgICAgICAgICAgICAgIGxvYWQ6IHRoaXMuX2hhbmRsZUxvYWRcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGF5ZXJhZGQgbGlzdGVuZXIgZnJvbSBtYXBcbiAgICAgICAgbWFwLm9mZignbGF5ZXJhZGQnLCB0aGlzLl9sYXllckFkZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9hZGRNYXBMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIHRvIHRoZSBtYXAgZm9yIChjdXN0b20pIGRhdGFsb2FkaW5nIGFuZCBkYXRhbG9hZFxuICAgICAgICAvLyBldmVudHMsIGVnLCBmb3IgQUpBWCBjYWxscyB0aGF0IGFmZmVjdCB0aGUgbWFwIGJ1dCB3aWxsIG5vdCBiZVxuICAgICAgICAvLyByZWZsZWN0ZWQgaW4gdGhlIGFib3ZlIGxheWVyIGV2ZW50cy5cbiAgICAgICAgbWFwLm9uKHtcbiAgICAgICAgICAgIGRhdGFsb2FkaW5nOiB0aGlzLl9oYW5kbGVMb2FkaW5nLFxuICAgICAgICAgICAgZGF0YWxvYWQ6IHRoaXMuX2hhbmRsZUxvYWQsXG4gICAgICAgICAgICBsYXllcnJlbW92ZTogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3JlbW92ZU1hcExpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIG1hcC5vZmYoe1xuICAgICAgICAgICAgZGF0YWxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICBkYXRhbG9hZDogdGhpcy5faGFuZGxlTG9hZCxcbiAgICAgICAgICAgIGxheWVycmVtb3ZlOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbn0pO1xuXG5cbmlmKCAod2luZG93IGFzIGFueSkuTCkge1xuICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbiAgICBMLkNvbnRyb2wuTG9hZGluZyA9IGxvYWRpbmdDb250cm9sO1xuICAgIEwuQ29udHJvbC5sb2FkaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IEwuQ29udHJvbC5Mb2FkaW5nKG9wdGlvbnMpO1xuICAgIH07XG59XG5cbk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5sb2FkaW5nQ29udHJvbCkge1xuICAgICAgICB0aGlzLmxvYWRpbmdDb250cm9sID0gbmV3IGxvYWRpbmdDb250cm9sKCk7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbCh0aGlzLmxvYWRpbmdDb250cm9sKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZGluZ0NvbnRyb2w7XG4iXX0=