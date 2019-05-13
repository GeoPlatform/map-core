/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { TileLayer } from 'leaflet';
/**
 * @return {?}
 */
function OSMLayerFactory() {
    return new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1, maxZoom: 19,
        attribution: 'Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
}
export default OSMLayerFactory;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJsYXllci9vc20tZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7OztBQU9wQztJQUVJLE9BQU8sSUFBSSxTQUFTLENBQUMsb0RBQW9ELEVBQUU7UUFDdkUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUN2QixXQUFXLEVBQUUsZ0ZBQWdGO0tBQ2hHLENBQUMsQ0FBQztDQUNOO0FBRUQsZUFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuXG5cbi8qKlxuICogQHBhcmFtIGxheWVyIC0gR2VvUGxhdGZvcm0gTGF5ZXJcbiAqIEByZXR1cm5cbiAqL1xuZnVuY3Rpb24gT1NNTGF5ZXJGYWN0b3J5KCkgOiBUaWxlTGF5ZXIge1xuXG4gICAgcmV0dXJuIG5ldyBUaWxlTGF5ZXIoJ2h0dHBzOi8ve3N9LnRpbGUub3BlbnN0cmVldG1hcC5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICAgICAgICBtaW5ab29tOiAxLCBtYXhab29tOiAxOSxcbiAgICAgICAgYXR0cmlidXRpb246ICdNYXAgZGF0YSAoYykgPGEgaHJlZj1cImh0dHA6Ly9vcGVuc3RyZWV0bWFwLm9yZ1wiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgT1NNTGF5ZXJGYWN0b3J5O1xuIl19