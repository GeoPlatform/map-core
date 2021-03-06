/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Control, control, DomUtil, DomEvent, Util, Map } from 'leaflet';
var ɵ0 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    this._container = DomUtil.create('div', 'leaflet-control-mouseposition');
    DomEvent.disableClickPropagation(this._container);
    map.on('mousemove', this._onMouseMove, this);
    this._container.innerHTML = this.options.emptyString;
    return this._container;
}, ɵ1 = /**
 * @param {?} map
 * @return {?}
 */
function (map) {
    map.off('mousemove', this._onMouseMove);
}, ɵ2 = /**
 * @param {?} e
 * @return {?}
 */
function (e) {
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
    onAdd: (ɵ0),
    onRemove: (ɵ1),
    _onMouseMove: (ɵ2)
});
// if( (window as any).L) {
//     const L = (window as any).L;
//     L.Control.MousePosition =  positionControl;
//     L.control.mousePosition = function (options) {
//         return new L.Control.MousePosition(options);
//     };
// }
((/** @type {?} */ (Control))).MousePosition = positionControl;
((/** @type {?} */ (control))).mousePosition = (/**
 * @param {?} options
 * @return {?}
 */
function (options) {
    return new ((/** @type {?} */ (Control))).MousePosition(options);
});
Map.mergeOptions({
    positionControl: false
});
Map.addInitHook((/**
 * @return {?}
 */
function () {
    if (this.options.positionControl) {
        this.positionControl = new positionControl();
        this.addControl(this.positionControl);
    }
}));
export default positionControl;
export { ɵ0, ɵ1, ɵ2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2UtcG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvbW91c2UtcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFDakQsTUFBTSxTQUFTLENBQUM7Ozs7O0FBZVIsVUFBVSxHQUFHO0lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsK0JBQStCLENBQUMsQ0FBQztJQUN6RSxRQUFRLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDbkQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3pCLENBQUM7Ozs7QUFFUyxVQUFVLEdBQUc7SUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7QUFFYSxVQUFVLENBQUM7O1FBQ25CLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7UUFDaEksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztRQUNoSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHOztRQUN2RyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUs7SUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQzdDLENBQUM7O0lBOUJDLGVBQWUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ25DLE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsU0FBUyxFQUFFLENBQUM7UUFDWixZQUFZLEVBQUUsU0FBUztRQUN2QixZQUFZLEVBQUUsU0FBUztRQUN2QixNQUFNLEVBQUUsRUFBRTtLQUNYO0lBRUQsS0FBSyxNQU1KO0lBRUQsUUFBUSxNQUVQO0lBRUQsWUFBWSxNQU1YO0NBRUYsQ0FBQzs7Ozs7Ozs7QUFTRixDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsYUFBYSxHQUFJLGVBQWUsQ0FBQztBQUNsRCxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsYUFBYTs7OztBQUFHLFVBQVUsT0FBTztJQUM5QyxPQUFPLElBQUksQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxDQUFDLENBQUEsQ0FBQztBQUVGLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDYixlQUFlLEVBQUUsS0FBSztDQUN6QixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsV0FBVzs7O0FBQUM7SUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO1FBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN6QztBQUNMLENBQUMsRUFBQyxDQUFDO0FBRUgsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG4gICAgQ29udHJvbCwgY29udHJvbCwgRG9tVXRpbCwgRG9tRXZlbnQsIFV0aWwsIE1hcFxufSBmcm9tICdsZWFmbGV0JztcblxuXG52YXIgcG9zaXRpb25Db250cm9sID0gQ29udHJvbC5leHRlbmQoe1xuICBvcHRpb25zOiB7XG4gICAgcG9zaXRpb246ICdib3R0b21sZWZ0JyxcbiAgICBzZXBhcmF0b3I6ICcgOiAnLFxuICAgIGVtcHR5U3RyaW5nOiAnVW5hdmFpbGFibGUnLFxuICAgIGxuZ0ZpcnN0OiBmYWxzZSxcbiAgICBudW1EaWdpdHM6IDYsXG4gICAgbG5nRm9ybWF0dGVyOiB1bmRlZmluZWQsXG4gICAgbGF0Rm9ybWF0dGVyOiB1bmRlZmluZWQsXG4gICAgcHJlZml4OiBcIlwiXG4gIH0sXG5cbiAgb25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBEb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtY29udHJvbC1tb3VzZXBvc2l0aW9uJyk7XG4gICAgRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fY29udGFpbmVyKTtcbiAgICBtYXAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uTW91c2VNb3ZlLCB0aGlzKTtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MPXRoaXMub3B0aW9ucy5lbXB0eVN0cmluZztcbiAgICByZXR1cm4gdGhpcy5fY29udGFpbmVyO1xuICB9LFxuXG4gIG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XG4gICAgbWFwLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpO1xuICB9LFxuXG4gIF9vbk1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbG5nID0gdGhpcy5vcHRpb25zLmxuZ0Zvcm1hdHRlciA/IHRoaXMub3B0aW9ucy5sbmdGb3JtYXR0ZXIoZS5sYXRsbmcubG5nKSA6IFV0aWwuZm9ybWF0TnVtKGUubGF0bG5nLmxuZywgdGhpcy5vcHRpb25zLm51bURpZ2l0cyk7XG4gICAgdmFyIGxhdCA9IHRoaXMub3B0aW9ucy5sYXRGb3JtYXR0ZXIgPyB0aGlzLm9wdGlvbnMubGF0Rm9ybWF0dGVyKGUubGF0bG5nLmxhdCkgOiBVdGlsLmZvcm1hdE51bShlLmxhdGxuZy5sYXQsIHRoaXMub3B0aW9ucy5udW1EaWdpdHMpO1xuICAgIHZhciB2YWx1ZSA9IHRoaXMub3B0aW9ucy5sbmdGaXJzdCA/IGxuZyArIHRoaXMub3B0aW9ucy5zZXBhcmF0b3IgKyBsYXQgOiBsYXQgKyB0aGlzLm9wdGlvbnMuc2VwYXJhdG9yICsgbG5nO1xuICAgIHZhciBwcmVmaXhBbmRWYWx1ZSA9IHRoaXMub3B0aW9ucy5wcmVmaXggKyAnICcgKyB2YWx1ZTtcbiAgICB0aGlzLl9jb250YWluZXIuaW5uZXJIVE1MID0gcHJlZml4QW5kVmFsdWU7XG4gIH1cblxufSk7XG5cbi8vIGlmKCAod2luZG93IGFzIGFueSkuTCkge1xuLy8gICAgIGNvbnN0IEwgPSAod2luZG93IGFzIGFueSkuTDtcbi8vICAgICBMLkNvbnRyb2wuTW91c2VQb3NpdGlvbiA9ICBwb3NpdGlvbkNvbnRyb2w7XG4vLyAgICAgTC5jb250cm9sLm1vdXNlUG9zaXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuLy8gICAgICAgICByZXR1cm4gbmV3IEwuQ29udHJvbC5Nb3VzZVBvc2l0aW9uKG9wdGlvbnMpO1xuLy8gICAgIH07XG4vLyB9XG4oQ29udHJvbCBhcyBhbnkpLk1vdXNlUG9zaXRpb24gPSAgcG9zaXRpb25Db250cm9sO1xuKGNvbnRyb2wgYXMgYW55KS5tb3VzZVBvc2l0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IChDb250cm9sIGFzIGFueSkuTW91c2VQb3NpdGlvbihvcHRpb25zKTtcbn07XG5cbk1hcC5tZXJnZU9wdGlvbnMoe1xuICAgIHBvc2l0aW9uQ29udHJvbDogZmFsc2Vcbn0pO1xuXG5NYXAuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucG9zaXRpb25Db250cm9sKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25Db250cm9sID0gbmV3IHBvc2l0aW9uQ29udHJvbCgpO1xuICAgICAgICB0aGlzLmFkZENvbnRyb2wodGhpcy5wb3NpdGlvbkNvbnRyb2wpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBwb3NpdGlvbkNvbnRyb2w7XG4iXX0=