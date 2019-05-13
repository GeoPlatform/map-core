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
        var instance = new MapInstance(key);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2dlb3BsYXRmb3JtLm1hcC8iLCJzb3VyY2VzIjpbIm1hcC9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLFdBQVcsTUFBTSxZQUFZLENBQUM7O0FBRXJDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUVmLGVBQWU7SUFFWCxHQUFHLEVBQUUsVUFBUyxHQUFHO1FBQ2IsSUFBRyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNoQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFJLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUNoQyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxFQUFFLFVBQVMsR0FBRztRQUNqQixJQUFHLEdBQUcsRUFBRTtZQUNKLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjthQUFNO1lBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNoQjtJQUNMLENBQUM7Q0FDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTWFwSW5zdGFuY2UgZnJvbSAnLi9pbnN0YW5jZSc7XG5cbnZhciBjYWNoZSA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZihrZXkgJiYgY2FjaGVba2V5XSlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZVtrZXldO1xuXG4gICAgICAgIGxldCBpbnN0YW5jZSA9IG5ldyBNYXBJbnN0YW5jZShrZXkpO1xuICAgICAgICBjYWNoZVtpbnN0YW5jZS5fa2V5XSA9IGluc3RhbmNlO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfSxcblxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZihrZXkpIHtcbiAgICAgICAgICAgIGNhY2hlW2tleV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl19