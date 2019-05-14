
import { Control, Util, DomUtil, Map } from 'leaflet';

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

    initialize: function(options) {
        Util.setOptions(this, options);
        this._dataLoaders = {};

        // Try to set the zoom control this control is attached to from the
        // options
        if (this.options.zoomControl !== null) {
            this.zoomControl = this.options.zoomControl;
        }
    },

    onAdd: function(map) {

        this._addLayerListeners(map);
        this._addMapListeners(map);

        // Try to set the zoom control this control is attached to from the map
        // the control is being added to
        if (!this.options.separate && !this.zoomControl) {
            if (map.zoomControl) {
                this.zoomControl = map.zoomControl;
            } else if (map.zoomsliderControl) {
                this.zoomControl = map.zoomsliderControl;
            }
        }

        // Create the loading indicator
        var classes = 'leaflet-control-loading';
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
    },

    onRemove: function(map) {
        this._removeLayerListeners(map);
        this._removeMapListeners(map);
    },

    removeFrom: function (map) {
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
    },

    addLoader: function(id) {
        this._dataLoaders[id] = true;
        this.updateIndicator();
    },

    removeLoader: function(id) {
        delete this._dataLoaders[id];
        this.updateIndicator();
    },

    updateIndicator: function() {
        if (this.isLoading()) {
            this._showIndicator();
        }
        else {
            this._hideIndicator();
        }
    },

    isLoading: function() {
        return this._countLoaders() > 0;
    },

    _countLoaders: function() {
        var size = 0, key;
        for (key in this._dataLoaders) {
            if (this._dataLoaders.hasOwnProperty(key)) size++;
        }
        return size;
    },

    _showIndicator: function() {
        // Show loading indicator
        DomUtil.addClass(this._indicator, 'is-loading');

        // If zoomControl exists, make the zoom-out button not last
        if (!this.options.separate) {
            if (this.zoomControl instanceof Control.Zoom) {
                DomUtil.removeClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
            }
        }
    },

    _hideIndicator: function() {
        // Hide loading indicator
        DomUtil.removeClass(this._indicator, 'is-loading');

        // If zoomControl exists, make the zoom-out button last
        if (!this.options.separate) {
            if (this.zoomControl instanceof Control.Zoom) {
                DomUtil.addClass(this.zoomControl._zoomOutButton, 'leaflet-bar-part-bottom');
            }
        }
    },

    _handleLoading: function(e) {
        this.addLoader(this.getEventId(e));
    },

    _handleLoad: function(e) {
        this.removeLoader(this.getEventId(e));
    },

    getEventId: function(e) {
        if (e.id) {
            return e.id;
        }
        else if (e.layer) {
            return e.layer._leaflet_id;
        }
        return e.target._leaflet_id;
    },

    _layerAdd: function(e) {
        if (!e.layer || !e.layer.on) return;
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
    },

    _addLayerListeners: function(map) {
        // Add listeners for begin and end of load to any layers already on the
        // map
        map.eachLayer(function(layer) {
            if (!layer.on) return;
            layer.on({
                loading: this._handleLoading,
                load: this._handleLoad
            }, this);
        }, this);

        // When a layer is added to the map, add listeners for begin and end
        // of load
        map.on('layeradd', this._layerAdd, this);
    },

    _removeLayerListeners: function(map) {
        // Remove listeners for begin and end of load from all layers
        map.eachLayer(function(layer) {
            if (!layer.off) return;
            layer.off({
                loading: this._handleLoading,
                load: this._handleLoad
            }, this);
        }, this);

        // Remove layeradd listener from map
        map.off('layeradd', this._layerAdd, this);
    },

    _addMapListeners: function(map) {
        // Add listeners to the map for (custom) dataloading and dataload
        // events, eg, for AJAX calls that affect the map but will not be
        // reflected in the above layer events.
        map.on({
            dataloading: this._handleLoading,
            dataload: this._handleLoad,
            layerremove: this._handleLoad
        }, this);
    },

    _removeMapListeners: function(map) {
        map.off({
            dataloading: this._handleLoading,
            dataload: this._handleLoad,
            layerremove: this._handleLoad
        }, this);
    }
});


if( (window as any).L) {
    const L = (window as any).L;
    L.Control.Loading = loadingControl;
    L.Control.loading = function(options) {
        return new L.Control.Loading(options);
    };
}

Map.addInitHook(function () {
    if (this.options.loadingControl) {
        this.loadingControl = new loadingControl();
        this.addControl(this.loadingControl);
    }
});

export default loadingControl;
