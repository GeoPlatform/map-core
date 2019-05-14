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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2UtcG9zaXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbImNvbnRyb2wvbW91c2UtcG9zaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFDakQsTUFBTSxTQUFTLENBQUM7V0FlUixVQUFVLEdBQUc7SUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO0lBQ3pFLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNuRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7Q0FDeEIsT0FFUyxVQUFVLEdBQUc7SUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0NBQ3pDLE9BRWEsVUFBVSxDQUFDOztJQUN2QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNySSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNySSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQzs7SUFDNUcsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7Q0FDNUM7O0FBOUJILElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDbkMsT0FBTyxFQUFFO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsV0FBVyxFQUFFLGFBQWE7UUFDMUIsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsQ0FBQztRQUNaLFlBQVksRUFBRSxTQUFTO1FBQ3ZCLFlBQVksRUFBRSxTQUFTO1FBQ3ZCLE1BQU0sRUFBRSxFQUFFO0tBQ1g7SUFFRCxLQUFLLElBTUo7SUFFRCxRQUFRLElBRVA7SUFFRCxZQUFZLElBTVg7Q0FFRixDQUFDLENBQUM7Ozs7Ozs7O0FBU0gsbUJBQUMsT0FBYyxFQUFDLENBQUMsYUFBYSxHQUFJLGVBQWUsQ0FBQztBQUNsRCxtQkFBQyxPQUFjLEVBQUMsQ0FBQyxhQUFhLEdBQUcsVUFBVSxPQUFPO0lBQzlDLE9BQU8sSUFBSSxtQkFBQyxPQUFjLEVBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDdEQsQ0FBQztBQUVGLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDYixlQUFlLEVBQUUsS0FBSztDQUN6QixDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQ1osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRTtRQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDekM7Q0FDSixDQUFDLENBQUM7QUFFSCxlQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtcbiAgICBDb250cm9sLCBjb250cm9sLCBEb21VdGlsLCBEb21FdmVudCwgVXRpbCwgTWFwXG59IGZyb20gJ2xlYWZsZXQnO1xuXG5cbnZhciBwb3NpdGlvbkNvbnRyb2wgPSBDb250cm9sLmV4dGVuZCh7XG4gIG9wdGlvbnM6IHtcbiAgICBwb3NpdGlvbjogJ2JvdHRvbWxlZnQnLFxuICAgIHNlcGFyYXRvcjogJyA6ICcsXG4gICAgZW1wdHlTdHJpbmc6ICdVbmF2YWlsYWJsZScsXG4gICAgbG5nRmlyc3Q6IGZhbHNlLFxuICAgIG51bURpZ2l0czogNixcbiAgICBsbmdGb3JtYXR0ZXI6IHVuZGVmaW5lZCxcbiAgICBsYXRGb3JtYXR0ZXI6IHVuZGVmaW5lZCxcbiAgICBwcmVmaXg6IFwiXCJcbiAgfSxcblxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IERvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sLW1vdXNlcG9zaXRpb24nKTtcbiAgICBEb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih0aGlzLl9jb250YWluZXIpO1xuICAgIG1hcC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUsIHRoaXMpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUw9dGhpcy5vcHRpb25zLmVtcHR5U3RyaW5nO1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXI7XG4gIH0sXG5cbiAgb25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcbiAgICBtYXAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG4gIH0sXG5cbiAgX29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBsbmcgPSB0aGlzLm9wdGlvbnMubG5nRm9ybWF0dGVyID8gdGhpcy5vcHRpb25zLmxuZ0Zvcm1hdHRlcihlLmxhdGxuZy5sbmcpIDogVXRpbC5mb3JtYXROdW0oZS5sYXRsbmcubG5nLCB0aGlzLm9wdGlvbnMubnVtRGlnaXRzKTtcbiAgICB2YXIgbGF0ID0gdGhpcy5vcHRpb25zLmxhdEZvcm1hdHRlciA/IHRoaXMub3B0aW9ucy5sYXRGb3JtYXR0ZXIoZS5sYXRsbmcubGF0KSA6IFV0aWwuZm9ybWF0TnVtKGUubGF0bG5nLmxhdCwgdGhpcy5vcHRpb25zLm51bURpZ2l0cyk7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5vcHRpb25zLmxuZ0ZpcnN0ID8gbG5nICsgdGhpcy5vcHRpb25zLnNlcGFyYXRvciArIGxhdCA6IGxhdCArIHRoaXMub3B0aW9ucy5zZXBhcmF0b3IgKyBsbmc7XG4gICAgdmFyIHByZWZpeEFuZFZhbHVlID0gdGhpcy5vcHRpb25zLnByZWZpeCArICcgJyArIHZhbHVlO1xuICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBwcmVmaXhBbmRWYWx1ZTtcbiAgfVxuXG59KTtcblxuLy8gaWYoICh3aW5kb3cgYXMgYW55KS5MKSB7XG4vLyAgICAgY29uc3QgTCA9ICh3aW5kb3cgYXMgYW55KS5MO1xuLy8gICAgIEwuQ29udHJvbC5Nb3VzZVBvc2l0aW9uID0gIHBvc2l0aW9uQ29udHJvbDtcbi8vICAgICBMLmNvbnRyb2wubW91c2VQb3NpdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4vLyAgICAgICAgIHJldHVybiBuZXcgTC5Db250cm9sLk1vdXNlUG9zaXRpb24ob3B0aW9ucyk7XG4vLyAgICAgfTtcbi8vIH1cbihDb250cm9sIGFzIGFueSkuTW91c2VQb3NpdGlvbiA9ICBwb3NpdGlvbkNvbnRyb2w7XG4oY29udHJvbCBhcyBhbnkpLm1vdXNlUG9zaXRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgKENvbnRyb2wgYXMgYW55KS5Nb3VzZVBvc2l0aW9uKG9wdGlvbnMpO1xufTtcblxuTWFwLm1lcmdlT3B0aW9ucyh7XG4gICAgcG9zaXRpb25Db250cm9sOiBmYWxzZVxufSk7XG5cbk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wb3NpdGlvbkNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5wb3NpdGlvbkNvbnRyb2wgPSBuZXcgcG9zaXRpb25Db250cm9sKCk7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbCh0aGlzLnBvc2l0aW9uQ29udHJvbCk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc2l0aW9uQ29udHJvbDtcbiJdfQ==