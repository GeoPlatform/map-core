/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Control, control, DomUtil, DomEvent, Util, Map } from 'leaflet';
const ɵ0 = function (map) {
    this._container = DomUtil.create('div', 'leaflet-control-mouseposition');
    DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
}, ɵ1 = function (map) {
    map.off('mousemove', this._onMouseMove);
}, ɵ2 = function (e) {
    /** @type {?} */
    var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : Util.formatNum(e.latlng.lng, this.options.numDigits);
    /** @type {?} */
    var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : Util.formatNum(e.latlng.lat, this.options.numDigits);
    /** @type {?} */
    var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
    /** @type {?} */
    var prefixAndValue = this.options.prefix + ' ' + value;
    this._container.innerHTML = prefixAndValue;
};
/** @type {?} */
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
    onAdd: ɵ0,
    onRemove: ɵ1,
    _onMouseMove: ɵ2
});
// if( (window as any).L) {
//     const L = (window as any).L;
//     L.Control.MousePosition =  positionControl;
//     L.control.mousePosition = function (options) {
//         return new L.Control.MousePosition(options);
//     };
// }
(/** @type {?} */ (Control)).MousePosition = positionControl;
(/** @type {?} */ (control)).mousePosition = function (options) {
    return new (/** @type {?} */ (Control)).MousePosition(options);
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
export { ɵ0, ɵ1, ɵ2 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTC5Db250cm9sLk1vdXNlUG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsiY29udHJvbC9MLkNvbnRyb2wuTW91c2VQb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNILE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUNqRCxNQUFNLFNBQVMsQ0FBQztXQWVSLFVBQVUsR0FBRztJQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLCtCQUErQixDQUFDLENBQUM7SUFDekUsUUFBUSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0lBQ25ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztDQUN4QixPQUVTLFVBQVUsR0FBRztJQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Q0FDekMsT0FFYSxVQUFVLENBQUM7O0lBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3JJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3JJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDOztJQUM1RyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztDQUM1Qzs7QUE5QkgsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUNuQyxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQUUsWUFBWTtRQUN0QixTQUFTLEVBQUUsS0FBSztRQUNoQixXQUFXLEVBQUUsYUFBYTtRQUMxQixRQUFRLEVBQUUsS0FBSztRQUNmLFNBQVMsRUFBRSxDQUFDO1FBQ1osWUFBWSxFQUFFLFNBQVM7UUFDdkIsWUFBWSxFQUFFLFNBQVM7UUFDdkIsTUFBTSxFQUFFLEVBQUU7S0FDWDtJQUVELEtBQUssSUFNSjtJQUVELFFBQVEsSUFFUDtJQUVELFlBQVksSUFNWDtDQUVGLENBQUMsQ0FBQzs7Ozs7Ozs7QUFTSCxtQkFBQyxPQUFjLEVBQUMsQ0FBQyxhQUFhLEdBQUksZUFBZSxDQUFDO0FBQ2xELG1CQUFDLE9BQWMsRUFBQyxDQUFDLGFBQWEsR0FBRyxVQUFVLE9BQU87SUFDOUMsT0FBTyxJQUFJLG1CQUFDLE9BQWMsRUFBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztDQUN0RCxDQUFDO0FBRUYsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUNiLGVBQWUsRUFBRSxLQUFLO0NBQ3pCLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO1FBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN6QztDQUNKLENBQUMsQ0FBQztBQUVILGVBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuICAgIENvbnRyb2wsIGNvbnRyb2wsIERvbVV0aWwsIERvbUV2ZW50LCBVdGlsLCBNYXBcbn0gZnJvbSAnbGVhZmxldCc7XG5cblxudmFyIHBvc2l0aW9uQ29udHJvbCA9IENvbnRyb2wuZXh0ZW5kKHtcbiAgb3B0aW9uczoge1xuICAgIHBvc2l0aW9uOiAnYm90dG9tbGVmdCcsXG4gICAgc2VwYXJhdG9yOiAnIDogJyxcbiAgICBlbXB0eVN0cmluZzogJ1VuYXZhaWxhYmxlJyxcbiAgICBsbmdGaXJzdDogZmFsc2UsXG4gICAgbnVtRGlnaXRzOiA2LFxuICAgIGxuZ0Zvcm1hdHRlcjogdW5kZWZpbmVkLFxuICAgIGxhdEZvcm1hdHRlcjogdW5kZWZpbmVkLFxuICAgIHByZWZpeDogXCJcIlxuICB9LFxuXG4gIG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wtbW91c2Vwb3NpdGlvbicpO1xuICAgIERvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKHRoaXMuX2NvbnRhaW5lcik7XG4gICAgbWFwLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSwgdGhpcyk7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTD10aGlzLm9wdGlvbnMuZW1wdHlTdHJpbmc7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcbiAgfSxcblxuICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgIG1hcC5vZmYoJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlKTtcbiAgfSxcblxuICBfb25Nb3VzZU1vdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGxuZyA9IHRoaXMub3B0aW9ucy5sbmdGb3JtYXR0ZXIgPyB0aGlzLm9wdGlvbnMubG5nRm9ybWF0dGVyKGUubGF0bG5nLmxuZykgOiBVdGlsLmZvcm1hdE51bShlLmxhdGxuZy5sbmcsIHRoaXMub3B0aW9ucy5udW1EaWdpdHMpO1xuICAgIHZhciBsYXQgPSB0aGlzLm9wdGlvbnMubGF0Rm9ybWF0dGVyID8gdGhpcy5vcHRpb25zLmxhdEZvcm1hdHRlcihlLmxhdGxuZy5sYXQpIDogVXRpbC5mb3JtYXROdW0oZS5sYXRsbmcubGF0LCB0aGlzLm9wdGlvbnMubnVtRGlnaXRzKTtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLm9wdGlvbnMubG5nRmlyc3QgPyBsbmcgKyB0aGlzLm9wdGlvbnMuc2VwYXJhdG9yICsgbGF0IDogbGF0ICsgdGhpcy5vcHRpb25zLnNlcGFyYXRvciArIGxuZztcbiAgICB2YXIgcHJlZml4QW5kVmFsdWUgPSB0aGlzLm9wdGlvbnMucHJlZml4ICsgJyAnICsgdmFsdWU7XG4gICAgdGhpcy5fY29udGFpbmVyLmlubmVySFRNTCA9IHByZWZpeEFuZFZhbHVlO1xuICB9XG5cbn0pO1xuXG4vLyBpZiggKHdpbmRvdyBhcyBhbnkpLkwpIHtcbi8vICAgICBjb25zdCBMID0gKHdpbmRvdyBhcyBhbnkpLkw7XG4vLyAgICAgTC5Db250cm9sLk1vdXNlUG9zaXRpb24gPSAgcG9zaXRpb25Db250cm9sO1xuLy8gICAgIEwuY29udHJvbC5tb3VzZVBvc2l0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbi8vICAgICAgICAgcmV0dXJuIG5ldyBMLkNvbnRyb2wuTW91c2VQb3NpdGlvbihvcHRpb25zKTtcbi8vICAgICB9O1xuLy8gfVxuKENvbnRyb2wgYXMgYW55KS5Nb3VzZVBvc2l0aW9uID0gIHBvc2l0aW9uQ29udHJvbDtcbihjb250cm9sIGFzIGFueSkubW91c2VQb3NpdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyAoQ29udHJvbCBhcyBhbnkpLk1vdXNlUG9zaXRpb24ob3B0aW9ucyk7XG59O1xuXG5NYXAubWVyZ2VPcHRpb25zKHtcbiAgICBwb3NpdGlvbkNvbnRyb2w6IGZhbHNlXG59KTtcblxuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBvc2l0aW9uQ29udHJvbCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uQ29udHJvbCA9IG5ldyBwb3NpdGlvbkNvbnRyb2woKTtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sKHRoaXMucG9zaXRpb25Db250cm9sKTtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcG9zaXRpb25Db250cm9sO1xuIl19