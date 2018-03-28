

(function (root, factory) {

    if(typeof define === "function" && define.amd) {
        // Now we're wrapping the factory and assigning the return
        // value to the root (window) and returning it as well to
        // the AMD loader.
        define('MousePositionControl', ["leaflet"],
            function(L) {
                return (root.MousePositionControl = factory(L));
            });
    } else if(typeof module === "object" && module.exports) {
        // I've not encountered a need for this yet, since I haven't
        // run into a scenario where plain modules depend on CommonJS
        // *and* I happen to be loading in a CJS browser environment
        // but I'm including it for the sake of being thorough
        module.exports = (
            root.MousePositionControl = factory(require('leaflet'))
        );
    } else {
        GeoPlatform.MousePositionControl = factory(L/*eaflet*/);
    }
}(this||window, function(L/*eaflet*/) {

//(function (L/*eaflet*/) {

    L.Control.MousePosition = L.Control.extend({
      options: {
        position: 'bottomleft',
        separator: ' : ',
        emptyString: 'Unavailable',
        lngFirst: false,
        numDigits: 6,
        lngFormatter: undefined,
        latFormatter: undefined,
        prefix: ""
      },

      onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML=this.options.emptyString;
        return this._container;
      },

      onRemove: function (map) {
        map.off('mousemove', this._onMouseMove);
      },

      _onMouseMove: function (e) {
        var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
        var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
        var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
        var prefixAndValue = this.options.prefix + ' ' + value;
        this._container.innerHTML = prefixAndValue;
      }

    });

    L.Map.mergeOptions({
        positionControl: false
    });

    L.Map.addInitHook(function () {
        if (this.options.positionControl) {
            this.positionControl = new L.Control.MousePosition();
            this.addControl(this.positionControl);
        }
    });

    L.control.mousePosition = function (options) {
        return new L.Control.MousePosition(options);
    };

// }) (L/*eaflet*/);

    return L.Control.MousePosition;

}));
