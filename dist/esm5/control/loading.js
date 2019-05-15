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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsiY29udHJvbC9sb2FkaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sU0FBUyxDQUFDO1NBa0J0QyxVQUFTLE9BQU87SUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7OztJQUl2QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0tBQy9DO0NBQ0osT0FFTSxVQUFTLEdBQUc7SUFFZixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7SUFJM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUM3QyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ3RDO2FBQU0sSUFBSSxHQUFHLENBQUMsaUJBQWlCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUM7U0FDNUM7S0FDSjs7SUFHRCxJQUFJLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQzs7SUFDeEMsSUFBSSxTQUFTLENBQUM7SUFDZCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7UUFFNUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDOztRQUV4QyxPQUFPLElBQUksZ0RBQWdELENBQUM7S0FDL0Q7U0FDSTs7UUFFRCxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztLQUN6RTtJQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzFELE9BQU8sU0FBUyxDQUFDO0NBQ3BCLE9BRVMsVUFBUyxHQUFHO0lBQ2xCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDakMsT0FFVyxVQUFVLEdBQUc7SUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7OztRQUc1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztLQUNmO1NBQ0k7OztRQUdELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlDO0NBQ0osT0FFVSxVQUFTLEVBQUU7SUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0NBQzFCLE9BRWEsVUFBUyxFQUFFO0lBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Q0FDMUIsT0FFZ0I7SUFDYixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDekI7U0FDSTtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN6QjtDQUNKLE9BRVU7SUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbkMsT0FFYzs7SUFDWCxJQUFJLElBQUksR0FBRyxDQUFDLENBQU07O0lBQWxCLElBQWMsR0FBRyxDQUFDO0lBQ2xCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDM0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNyRDtJQUNELE9BQU8sSUFBSSxDQUFDO0NBQ2YsT0FFZTs7SUFFWixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7O0lBR2hELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksT0FBTyxDQUFDLElBQUksRUFBRTtZQUMxQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLHlCQUF5QixDQUFDLENBQUM7U0FDbkY7S0FDSjtDQUNKLFFBRWU7O0lBRVosT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDOztJQUduRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxZQUFZLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2hGO0tBQ0o7Q0FDSixRQUVlLFVBQVMsQ0FBQztJQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN0QyxRQUVZLFVBQVMsQ0FBQztJQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6QyxRQUVXLFVBQVMsQ0FBQztJQUNsQixJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDTixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7S0FDZjtTQUNJLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7S0FDOUI7SUFDRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0NBQy9CLFFBRVUsVUFBUyxDQUFDO0lBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQUUsT0FBTztJQUNwQyxJQUFJO1FBQ0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ3pCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDWjtJQUNELE9BQU8sU0FBUyxFQUFFO1FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyw2Q0FBNkM7WUFDN0MsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDOUQ7Q0FDSixRQUVtQixVQUFTLEdBQUc7OztJQUc1QixHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVMsS0FBSztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFBRSxPQUFPO1FBQ3RCLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQ3pCLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDWixFQUFFLElBQUksQ0FBQyxDQUFDOzs7SUFJVCxHQUFHLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzVDLFFBRXNCLFVBQVMsR0FBRzs7SUFFL0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFTLEtBQUs7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQUUsT0FBTztRQUN2QixLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ04sT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQzVCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztTQUN6QixFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ1osRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUFHVCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzdDLFFBRWlCLFVBQVMsR0FBRzs7OztJQUkxQixHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ0gsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjO1FBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztRQUMxQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7S0FDaEMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNaLFFBRW9CLFVBQVMsR0FBRztJQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ0osV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjO1FBQ2hDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztRQUMxQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7S0FDaEMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNaOztBQXZOTCxJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2hDLE9BQU8sRUFBRTtRQUNMLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFFBQVEsRUFBRSxLQUFLO1FBQ2YsV0FBVyxFQUFFLElBQUk7UUFDakIsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUU7WUFDSixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztZQUNULE1BQU0sRUFBRSxFQUFFO1lBQ1YsR0FBRyxFQUFFLEtBQUs7U0FDWDtLQUNKO0lBRUQsVUFBVSxJQVNUO0lBRUQsS0FBSyxJQThCSjtJQUVELFFBQVEsSUFHUDtJQUVELFVBQVUsSUFjVDtJQUVELFNBQVMsSUFHUjtJQUVELFlBQVksSUFHWDtJQUVELGVBQWUsSUFPZDtJQUVELFNBQVMsSUFFUjtJQUVELGFBQWEsSUFNWjtJQUVELGNBQWMsSUFVYjtJQUVELGNBQWMsS0FVYjtJQUVELGNBQWMsS0FFYjtJQUVELFdBQVcsS0FFVjtJQUVELFVBQVUsS0FRVDtJQUVELFNBQVMsS0FhUjtJQUVELGtCQUFrQixLQWNqQjtJQUVELHFCQUFxQixLQVlwQjtJQUVELGdCQUFnQixLQVNmO0lBRUQsbUJBQW1CLEtBTWxCO0NBQ0osQ0FBQyxDQUFDO0FBR0gsSUFBSSxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxDQUFDLEVBQUU7O0lBQ25CLElBQU0sR0FBQyxHQUFHLG1CQUFDLE1BQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixHQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDbkMsR0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxPQUFPO1FBQ2hDLE9BQU8sSUFBSSxHQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QyxDQUFDO0NBQ0w7QUFFRCxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDeEM7Q0FDSixDQUFDLENBQUM7QUFFSCxlQUFlLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29udHJvbCwgVXRpbCwgRG9tVXRpbCwgTWFwIH0gZnJvbSAnbGVhZmxldCc7XG5cbnZhciBsb2FkaW5nQ29udHJvbCA9IENvbnRyb2wuZXh0ZW5kKHtcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIHBvc2l0aW9uOiAndG9wbGVmdCcsXG4gICAgICAgIHNlcGFyYXRlOiBmYWxzZSxcbiAgICAgICAgem9vbUNvbnRyb2w6IG51bGwsXG4gICAgICAgIHNwaW5qczogZmFsc2UsXG4gICAgICAgIHNwaW46IHtcbiAgICAgICAgICBsaW5lczogNyxcbiAgICAgICAgICBsZW5ndGg6IDMsXG4gICAgICAgICAgd2lkdGg6IDMsXG4gICAgICAgICAgcmFkaXVzOiA1LFxuICAgICAgICAgIHJvdGF0ZTogMTMsXG4gICAgICAgICAgdG9wOiBcIjgzJVwiXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBVdGlsLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2RhdGFMb2FkZXJzID0ge307XG5cbiAgICAgICAgLy8gVHJ5IHRvIHNldCB0aGUgem9vbSBjb250cm9sIHRoaXMgY29udHJvbCBpcyBhdHRhY2hlZCB0byBmcm9tIHRoZVxuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuem9vbUNvbnRyb2wgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuem9vbUNvbnRyb2wgPSB0aGlzLm9wdGlvbnMuem9vbUNvbnRyb2w7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25BZGQ6IGZ1bmN0aW9uKG1hcCkge1xuXG4gICAgICAgIHRoaXMuX2FkZExheWVyTGlzdGVuZXJzKG1hcCk7XG4gICAgICAgIHRoaXMuX2FkZE1hcExpc3RlbmVycyhtYXApO1xuXG4gICAgICAgIC8vIFRyeSB0byBzZXQgdGhlIHpvb20gY29udHJvbCB0aGlzIGNvbnRyb2wgaXMgYXR0YWNoZWQgdG8gZnJvbSB0aGUgbWFwXG4gICAgICAgIC8vIHRoZSBjb250cm9sIGlzIGJlaW5nIGFkZGVkIHRvXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnNlcGFyYXRlICYmICF0aGlzLnpvb21Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAobWFwLnpvb21Db250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IG1hcC56b29tQ29udHJvbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFwLnpvb21zbGlkZXJDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b29tQ29udHJvbCA9IG1hcC56b29tc2xpZGVyQ29udHJvbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgdmFyIGNsYXNzZXMgPSAnbGVhZmxldC1jb250cm9sLWxvYWRpbmcnO1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBpZiAodGhpcy56b29tQ29udHJvbCAmJiAhdGhpcy5vcHRpb25zLnNlcGFyYXRlKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHpvb20gY29udHJvbCwgaG9vayBpbnRvIHRoZSBib3R0b20gb2YgaXRcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHRoaXMuem9vbUNvbnRyb2wuX2NvbnRhaW5lcjtcbiAgICAgICAgICAgIC8vIFRoZXNlIGNsYXNzZXMgYXJlIG5vIGxvbmdlciB1c2VkIGFzIG9mIExlYWZsZXQgMC42XG4gICAgICAgICAgICBjbGFzc2VzICs9ICcgbGVhZmxldC1iYXItcGFydC1ib3R0b20gbGVhZmxldC1iYXItcGFydCBsYXN0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgaW5kaWNhdG9yXG4gICAgICAgICAgICBjb250YWluZXIgPSBEb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC16b29tIGxlYWZsZXQtYmFyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5kaWNhdG9yID0gRG9tVXRpbC5jcmVhdGUoJ2EnLCBjbGFzc2VzLCBjb250YWluZXIpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUxheWVyTGlzdGVuZXJzKG1hcCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZU1hcExpc3RlbmVycyhtYXApO1xuICAgIH0sXG5cbiAgICByZW1vdmVGcm9tOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sICYmICF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgIC8vIE92ZXJyaWRlIENvbnRyb2wucmVtb3ZlRnJvbSgpIHRvIGF2b2lkIGNsb2JiZXJpbmcgdGhlIGVudGlyZVxuICAgICAgICAgICAgLy8gX2NvbnRhaW5lciwgd2hpY2ggaXMgdGhlIHNhbWUgYXMgem9vbUNvbnRyb2wnc1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuX2luZGljYXRvcik7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZShtYXApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGNvbnRyb2wgaXMgc2VwYXJhdGUgZnJvbSB0aGUgem9vbUNvbnRyb2wsIGNhbGwgdGhlXG4gICAgICAgICAgICAvLyBwYXJlbnQgbWV0aG9kIHNvIHdlIGRvbid0IGxlYXZlIGJlaGluZCBhbiBlbXB0eSBjb250YWluZXJcbiAgICAgICAgICAgIHJldHVybiBDb250cm9sLnByb3RvdHlwZS5yZW1vdmUuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRMb2FkZXI6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHRoaXMuX2RhdGFMb2FkZXJzW2lkXSA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlSW5kaWNhdG9yKCk7XG4gICAgfSxcblxuICAgIHJlbW92ZUxvYWRlcjogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2RhdGFMb2FkZXJzW2lkXTtcbiAgICAgICAgdGhpcy51cGRhdGVJbmRpY2F0b3IoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlSW5kaWNhdG9yOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dJbmRpY2F0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVJbmRpY2F0b3IoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xvYWRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY291bnRMb2FkZXJzKCkgPiAwO1xuICAgIH0sXG5cbiAgICBfY291bnRMb2FkZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNpemUgPSAwLCBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMuX2RhdGFMb2FkZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YUxvYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkgc2l6ZSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaXplO1xuICAgIH0sXG5cbiAgICBfc2hvd0luZGljYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFNob3cgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9pbmRpY2F0b3IsICdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gSWYgem9vbUNvbnRyb2wgZXhpc3RzLCBtYWtlIHRoZSB6b29tLW91dCBidXR0b24gbm90IGxhc3RcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnpvb21Db250cm9sIGluc3RhbmNlb2YgQ29udHJvbC5ab29tKSB7XG4gICAgICAgICAgICAgICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLnpvb21Db250cm9sLl96b29tT3V0QnV0dG9uLCAnbGVhZmxldC1iYXItcGFydC1ib3R0b20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGlkZUluZGljYXRvcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEhpZGUgbG9hZGluZyBpbmRpY2F0b3JcbiAgICAgICAgRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9pbmRpY2F0b3IsICdpcy1sb2FkaW5nJyk7XG5cbiAgICAgICAgLy8gSWYgem9vbUNvbnRyb2wgZXhpc3RzLCBtYWtlIHRoZSB6b29tLW91dCBidXR0b24gbGFzdFxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5zZXBhcmF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuem9vbUNvbnRyb2wgaW5zdGFuY2VvZiBDb250cm9sLlpvb20pIHtcbiAgICAgICAgICAgICAgICBEb21VdGlsLmFkZENsYXNzKHRoaXMuem9vbUNvbnRyb2wuX3pvb21PdXRCdXR0b24sICdsZWFmbGV0LWJhci1wYXJ0LWJvdHRvbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oYW5kbGVMb2FkaW5nOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMuYWRkTG9hZGVyKHRoaXMuZ2V0RXZlbnRJZChlKSk7XG4gICAgfSxcblxuICAgIF9oYW5kbGVMb2FkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTG9hZGVyKHRoaXMuZ2V0RXZlbnRJZChlKSk7XG4gICAgfSxcblxuICAgIGdldEV2ZW50SWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmlkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGUubGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBlLmxheWVyLl9sZWFmbGV0X2lkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlLnRhcmdldC5fbGVhZmxldF9pZDtcbiAgICB9LFxuXG4gICAgX2xheWVyQWRkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS5sYXllciB8fCAhZS5sYXllci5vbikgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZS5sYXllci5vbih7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0wuQ29udHJvbC5Mb2FkaW5nOiBUcmllZCBhbmQgZmFpbGVkIHRvIGFkZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnIGV2ZW50IGhhbmRsZXJzIHRvIGxheWVyJywgZS5sYXllcik7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0wuQ29udHJvbC5Mb2FkaW5nOiBGdWxsIGRldGFpbHMnLCBleGNlcHRpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9hZGRMYXllckxpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgZm9yIGJlZ2luIGFuZCBlbmQgb2YgbG9hZCB0byBhbnkgbGF5ZXJzIGFscmVhZHkgb24gdGhlXG4gICAgICAgIC8vIG1hcFxuICAgICAgICBtYXAuZWFjaExheWVyKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgICAgICBpZiAoIWxheWVyLm9uKSByZXR1cm47XG4gICAgICAgICAgICBsYXllci5vbih7XG4gICAgICAgICAgICAgICAgbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgICAgICBsb2FkOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgLy8gV2hlbiBhIGxheWVyIGlzIGFkZGVkIHRvIHRoZSBtYXAsIGFkZCBsaXN0ZW5lcnMgZm9yIGJlZ2luIGFuZCBlbmRcbiAgICAgICAgLy8gb2YgbG9hZFxuICAgICAgICBtYXAub24oJ2xheWVyYWRkJywgdGhpcy5fbGF5ZXJBZGQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlTGF5ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICAvLyBSZW1vdmUgbGlzdGVuZXJzIGZvciBiZWdpbiBhbmQgZW5kIG9mIGxvYWQgZnJvbSBhbGwgbGF5ZXJzXG4gICAgICAgIG1hcC5lYWNoTGF5ZXIoZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXIub2ZmKSByZXR1cm47XG4gICAgICAgICAgICBsYXllci5vZmYoe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICAgICAgbG9hZDogdGhpcy5faGFuZGxlTG9hZFxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXllcmFkZCBsaXN0ZW5lciBmcm9tIG1hcFxuICAgICAgICBtYXAub2ZmKCdsYXllcmFkZCcsIHRoaXMuX2xheWVyQWRkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX2FkZE1hcExpc3RlbmVyczogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIG1hcCBmb3IgKGN1c3RvbSkgZGF0YWxvYWRpbmcgYW5kIGRhdGFsb2FkXG4gICAgICAgIC8vIGV2ZW50cywgZWcsIGZvciBBSkFYIGNhbGxzIHRoYXQgYWZmZWN0IHRoZSBtYXAgYnV0IHdpbGwgbm90IGJlXG4gICAgICAgIC8vIHJlZmxlY3RlZCBpbiB0aGUgYWJvdmUgbGF5ZXIgZXZlbnRzLlxuICAgICAgICBtYXAub24oe1xuICAgICAgICAgICAgZGF0YWxvYWRpbmc6IHRoaXMuX2hhbmRsZUxvYWRpbmcsXG4gICAgICAgICAgICBkYXRhbG9hZDogdGhpcy5faGFuZGxlTG9hZCxcbiAgICAgICAgICAgIGxheWVycmVtb3ZlOiB0aGlzLl9oYW5kbGVMb2FkXG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlTWFwTGlzdGVuZXJzOiBmdW5jdGlvbihtYXApIHtcbiAgICAgICAgbWFwLm9mZih7XG4gICAgICAgICAgICBkYXRhbG9hZGluZzogdGhpcy5faGFuZGxlTG9hZGluZyxcbiAgICAgICAgICAgIGRhdGFsb2FkOiB0aGlzLl9oYW5kbGVMb2FkLFxuICAgICAgICAgICAgbGF5ZXJyZW1vdmU6IHRoaXMuX2hhbmRsZUxvYWRcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxufSk7XG5cblxuaWYoICh3aW5kb3cgYXMgYW55KS5MKSB7XG4gICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuICAgIEwuQ29udHJvbC5Mb2FkaW5nID0gbG9hZGluZ0NvbnRyb2w7XG4gICAgTC5Db250cm9sLmxvYWRpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgTC5Db250cm9sLkxvYWRpbmcob3B0aW9ucyk7XG4gICAgfTtcbn1cblxuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmxvYWRpbmdDb250cm9sKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0NvbnRyb2wgPSBuZXcgbG9hZGluZ0NvbnRyb2woKTtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMubG9hZGluZ0NvbnRyb2wpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkaW5nQ29udHJvbDtcbiJdfQ==