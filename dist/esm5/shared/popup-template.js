/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} feature
 * @return {?}
 */
function featurePopupTemplate(feature) {
    /** @type {?} */
    var props = Object.keys(feature.properties);
    /** @type {?} */
    var pFn = (/**
     * @param {?} list
     * @param {?} names
     * @return {?}
     */
    function (list, names) {
        if (!list || !list.find)
            return null;
        /** @type {?} */
        var match = list.find((/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            /** @type {?} */
            var lc = name.toLowerCase();
            return names.indexOf(lc) >= 0;
        }));
        return match;
    });
    /** @type {?} */
    var titleProp = pFn(props, ['title', 'name', 'label']);
    /** @type {?} */
    var title = titleProp ? feature.properties[titleProp] : "Untitled";
    /** @type {?} */
    var descProp = pFn(props, ['description', 'summary', 'descript']);
    /** @type {?} */
    var description = descProp ? feature.properties[descProp] : "No description provided";
    /** @type {?} */
    var result = '<div class="feature-popup">' +
        '<h5>' + title + '</h5>' +
        '<p>' + description + '</p>';
    if (feature.properties.modified) {
        /** @type {?} */
        var modified = new Date(feature.properties.modified);
        result += '<div><span class="label">Updated</span><span class="value">' +
            modified.toDateString() + '</span></div>';
    }
    if (feature.properties['cap:effective']) {
        /** @type {?} */
        var date = new Date(feature.properties['cap:effective']);
        result += '<div>' +
            '<span class="label">Effective</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    if (feature.properties['cap:expires']) {
        /** @type {?} */
        var date = new Date(feature.properties['cap:expires']);
        result += '<div>' +
            '<span class="label">Expires</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    /** @type {?} */
    var linkProp = pFn(props, ['landingpage', 'link', 'website']);
    if (linkProp) {
        result += '<br>';
        result += '<a href="' + feature.properties[linkProp] + '" target="_blank">link</a>';
    }
    result += '<hr>';
    for (var prop in feature.properties) {
        if (titleProp === prop || descProp === prop ||
            linkProp === prop || 'modified' === prop)
            continue;
        /** @type {?} */
        var value = feature.properties[prop];
        if (typeof (value) === 'object') {
            for (var p in value) {
                result += '<div>' +
                    '<span class="label">' + prop + '.' + p + '</span>' +
                    '<span class="value">' + value[p] + '</span>' +
                    '</div>';
            }
        }
        else {
            result += '<div>' +
                '<span class="label">' + prop + '</span>' +
                '<span class="value">' + value + '</span>' +
                '</div>';
        }
    }
    result += '</div>';
    return result;
}
export default featurePopupTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9wb3B1cC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLFNBQVMsb0JBQW9CLENBQUMsT0FBTzs7UUFFN0IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7UUFFckMsR0FBRzs7Ozs7SUFBRyxVQUFTLElBQUksRUFBRSxLQUFLO1FBQzVCLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztZQUNoQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUk7Ozs7UUFBRSxVQUFBLElBQUk7O2dCQUNuQixFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBQztRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUMsQ0FBQTs7UUFFRyxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUM7O1FBQ2hELEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVU7O1FBRTlELFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7UUFDN0QsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQXlCOztRQUVqRixNQUFNLEdBQUcsNkJBQTZCO1FBQ3RDLE1BQU0sR0FBRyxLQUFLLEdBQUcsT0FBTztRQUN4QixLQUFLLEdBQUcsV0FBVyxHQUFHLE1BQU07SUFFaEMsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7WUFDeEIsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3BELE1BQU0sSUFBSSw2REFBNkQ7WUFDbkUsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLGVBQWUsQ0FBQztLQUNqRDtJQUVELElBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTs7WUFDaEMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsTUFBTSxJQUFJLE9BQU87WUFDYixzQ0FBc0M7WUFDdEMsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMvQyxTQUFTO1lBQ1QsUUFBUSxDQUFDO0tBQ2hCO0lBQ0QsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztZQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxNQUFNLElBQUksT0FBTztZQUNiLG9DQUFvQztZQUNwQyxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9DLFNBQVM7WUFDVCxRQUFRLENBQUM7S0FDaEI7O1FBRUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNELElBQUcsUUFBUSxFQUFFO1FBQ1QsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUNqQixNQUFNLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsNEJBQTRCLENBQUM7S0FDdkY7SUFFRCxNQUFNLElBQUksTUFBTSxDQUFDO0lBRWpCLEtBQUksSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUNoQyxJQUFHLFNBQVMsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLElBQUk7WUFDdEMsUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssSUFBSTtZQUN4QyxTQUFTOztZQUNULEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDM0IsS0FBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxPQUFPO29CQUNiLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFNBQVM7b0JBQ25ELHNCQUFzQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTO29CQUM3QyxRQUFRLENBQUM7YUFDaEI7U0FDSjthQUFNO1lBQ0gsTUFBTSxJQUFJLE9BQU87Z0JBQ2Isc0JBQXNCLEdBQUcsSUFBSSxHQUFHLFNBQVM7Z0JBQ3pDLHNCQUFzQixHQUFHLEtBQUssR0FBRyxTQUFTO2dCQUMxQyxRQUFRLENBQUM7U0FDaEI7S0FDSjtJQUNELE1BQU0sSUFBSSxRQUFRLENBQUM7SUFDbkIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELGVBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZnVuY3Rpb24gZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkge1xuXG4gICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZmVhdHVyZS5wcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IHBGbiA9IGZ1bmN0aW9uKGxpc3QsIG5hbWVzKSB7XG4gICAgICAgIGlmKCFsaXN0IHx8ICFsaXN0LmZpbmQpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbWF0Y2ggPSBsaXN0LmZpbmQoIG5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IGxjID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmluZGV4T2YobGMpPj0wO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH07XG5cbiAgICBsZXQgdGl0bGVQcm9wID0gcEZuKHByb3BzLCBbJ3RpdGxlJywnbmFtZScsJ2xhYmVsJ10pO1xuICAgIGxldCB0aXRsZSA9IHRpdGxlUHJvcCA/IGZlYXR1cmUucHJvcGVydGllc1t0aXRsZVByb3BdIDogXCJVbnRpdGxlZFwiO1xuXG4gICAgbGV0IGRlc2NQcm9wID0gcEZuKHByb3BzLCBbJ2Rlc2NyaXB0aW9uJywgJ3N1bW1hcnknLCAnZGVzY3JpcHQnXSk7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY1Byb3AgPyBmZWF0dXJlLnByb3BlcnRpZXNbZGVzY1Byb3BdIDogXCJObyBkZXNjcmlwdGlvbiBwcm92aWRlZFwiO1xuXG4gICAgbGV0IHJlc3VsdCA9ICc8ZGl2IGNsYXNzPVwiZmVhdHVyZS1wb3B1cFwiPicgK1xuICAgICAgICAnPGg1PicgKyB0aXRsZSArICc8L2g1PicgK1xuICAgICAgICAnPHA+JyArIGRlc2NyaXB0aW9uICsgJzwvcD4nO1xuXG4gICAgaWYoZmVhdHVyZS5wcm9wZXJ0aWVzLm1vZGlmaWVkKSB7XG4gICAgICAgIGxldCBtb2RpZmllZCA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllcy5tb2RpZmllZCk7XG4gICAgICAgIHJlc3VsdCArPSAnPGRpdj48c3BhbiBjbGFzcz1cImxhYmVsXCI+VXBkYXRlZDwvc3Bhbj48c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBtb2RpZmllZC50b0RhdGVTdHJpbmcoKSArICc8L3NwYW4+PC9kaXY+JztcbiAgICB9XG5cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDplZmZlY3RpdmUnXSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmVmZmVjdGl2ZSddKTtcbiAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj5FZmZlY3RpdmU8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgK1xuICAgICAgICAgICAgZGF0ZS50b0RhdGVTdHJpbmcoKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCkgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDpleHBpcmVzJ10pIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDpleHBpcmVzJ10pO1xuICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkV4cGlyZXM8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgK1xuICAgICAgICAgICAgZGF0ZS50b0RhdGVTdHJpbmcoKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCkgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIGxldCBsaW5rUHJvcCA9IHBGbihwcm9wcywgWydsYW5kaW5ncGFnZScsJ2xpbmsnLCd3ZWJzaXRlJ10pO1xuICAgIGlmKGxpbmtQcm9wKSB7XG4gICAgICAgIHJlc3VsdCArPSAnPGJyPic7XG4gICAgICAgIHJlc3VsdCArPSAnPGEgaHJlZj1cIicgKyBmZWF0dXJlLnByb3BlcnRpZXNbbGlua1Byb3BdICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPmxpbms8L2E+JztcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gJzxocj4nO1xuXG4gICAgZm9yKGxldCBwcm9wIGluIGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICBpZih0aXRsZVByb3AgPT09IHByb3AgfHwgZGVzY1Byb3AgPT09IHByb3AgfHxcbiAgICAgICAgICAgIGxpbmtQcm9wID09PSBwcm9wIHx8ICdtb2RpZmllZCcgPT09IHByb3ApXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgbGV0IHZhbHVlID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICBpZih0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yKGxldCBwIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wICsgJy4nICsgcCArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArIHZhbHVlW3BdICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj4nICsgcHJvcCArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICsgdmFsdWUgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPC9kaXY+JztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiJdfQ==