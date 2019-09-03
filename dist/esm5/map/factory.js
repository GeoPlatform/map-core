/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import MapInstance from './instance';
/** @type {?} */
var cache = {};
export default {
    get: (/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key && cache[key])
            return cache[key];
        /** @type {?} */
        var instance = new MapInstance(key);
        cache[instance._key] = instance;
        return instance;
    }),
    dispose: (/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key) {
            cache[key].dispose();
            delete cache[key];
        }
        else {
            cache = null;
        }
    })
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXBjb3JlLyIsInNvdXJjZXMiOlsibWFwL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQzs7SUFFakMsS0FBSyxHQUFHLEVBQUU7QUFFZCxlQUFlO0lBRVgsR0FBRzs7OztJQUFFLFVBQVMsR0FBRztRQUNiLElBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDaEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBRWxCLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDaEMsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQyxDQUFBO0lBRUQsT0FBTzs7OztJQUFFLFVBQVMsR0FBRztRQUNqQixJQUFHLEdBQUcsRUFBRTtZQUNKLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtJQUNMLENBQUMsQ0FBQTtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBNYXBJbnN0YW5jZSBmcm9tICcuL2luc3RhbmNlJztcblxudmFyIGNhY2hlID0ge307XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGdldDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmKGtleSAmJiBjYWNoZVtrZXldKVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG5cbiAgICAgICAgbGV0IGluc3RhbmNlID0gbmV3IE1hcEluc3RhbmNlKGtleSk7XG4gICAgICAgIGNhY2hlW2luc3RhbmNlLl9rZXldID0gaW5zdGFuY2U7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9LFxuXG4gICAgZGlzcG9zZTogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmKGtleSkge1xuICAgICAgICAgICAgY2FjaGVba2V5XS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgY2FjaGVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=