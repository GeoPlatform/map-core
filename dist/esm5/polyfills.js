/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
export default function () {
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: (/**
             * @param {?} target
             * @param {?} varArgs
             * @return {?}
             */
            function assign(target, varArgs) {
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                /** @type {?} */
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    /** @type {?} */
                    var nextSource = arguments[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            }),
            writable: true,
            configurable: true
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL21hcGNvcmUvIiwic291cmNlcyI6WyJwb2x5ZmlsbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE1BQU0sQ0FBQyxPQUFPO0lBRVYsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxFQUFFO1FBQ3BDLGdFQUFnRTtRQUNoRSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUU7WUFDcEMsS0FBSzs7Ozs7WUFBRSxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTztnQkFDbEMsWUFBWSxDQUFDO2dCQUNiLElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxFQUFFLGlDQUFpQztvQkFDbkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2lCQUNyRTs7b0JBRUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBRXZCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFOzt3QkFDL0MsVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBRWpDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRSxFQUFFLGlDQUFpQzt3QkFDdkQsS0FBSyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUU7NEJBQzVCLDZDQUE2Qzs0QkFDN0MsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dDQUMzRCxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUNyQzt5QkFDSjtxQkFDSjtpQkFDSjtnQkFDRCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQTtZQUNELFFBQVEsRUFBRSxJQUFJO1lBQ2QsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0tBQ047QUFFTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgdmFyQXJncykgeyAvLyAubGVuZ3RoIG9mIGZ1bmN0aW9uIGlzIDJcbiAgICAgICAgICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7IC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0U291cmNlLCBuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0bztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==