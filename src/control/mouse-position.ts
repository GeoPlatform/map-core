
import {
    Control, control, DomUtil, DomEvent, Util, Map
} from 'leaflet';


var positionControl = Control.extend({
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
    this._container = DomUtil.create('div', 'leaflet-control-mouseposition');
    DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML=this.options.emptyString;
    return this._container;
  },

  onRemove: function (map) {
    map.off('mousemove', this._onMouseMove);
  },

  _onMouseMove: function (e) {
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : Util.formatNum(e.latlng.lng, this.options.numDigits);
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : Util.formatNum(e.latlng.lat, this.options.numDigits);
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
  }

});

// if( (window as any).L) {
//     const L = (window as any).L;
//     L.Control.MousePosition =  positionControl;
//     L.control.mousePosition = function (options) {
//         return new L.Control.MousePosition(options);
//     };
// }
(Control as any).MousePosition =  positionControl;
(control as any).mousePosition = function (options) {
    return new (Control as any).MousePosition(options);
};

Map.mergeOptions({
    positionControl: false
});

Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new positionControl();
        this.addControl(this.positionControl);
    }
});

export default positionControl;
