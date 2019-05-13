/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import MapInstance from './instance';
/** @type {?} */
var cache = {};
export default {
    get: function (key) {
        if (key && cache[key])
            return cache[key];
        let instance = new MapInstance(key);
        cache[instance._key] = instance;
        return instance;
    },
    dispose: function (key) {
        if (key) {
            cache[key].dispose();
            delete cache[key];
        }
        else {
            cache = null;
        }
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9tYXAvIiwic291cmNlcyI6WyJtYXAvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxXQUFXLE1BQU0sWUFBWSxDQUFDOztBQUVyQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFFZixlQUFlO0lBRVgsR0FBRyxFQUFFLFVBQVMsR0FBRztRQUNiLElBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDaEIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDaEMsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELE9BQU8sRUFBRSxVQUFTLEdBQUc7UUFDakIsSUFBRyxHQUFHLEVBQUU7WUFDSixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckI7YUFBTTtZQUNILEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7SUFDTCxDQUFDO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE1hcEluc3RhbmNlIGZyb20gJy4vaW5zdGFuY2UnO1xuXG52YXIgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgZ2V0OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYoa2V5ICYmIGNhY2hlW2tleV0pXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcblxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgTWFwSW5zdGFuY2Uoa2V5KTtcbiAgICAgICAgY2FjaGVbaW5zdGFuY2UuX2tleV0gPSBpbnN0YW5jZTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH0sXG5cbiAgICBkaXNwb3NlOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYoa2V5KSB7XG4gICAgICAgICAgICBjYWNoZVtrZXldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVtrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufTtcbiJdfQ==