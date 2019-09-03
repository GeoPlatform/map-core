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
    let props = Object.keys(feature.properties);
    /** @type {?} */
    const pFn = (/**
     * @param {?} list
     * @param {?} names
     * @return {?}
     */
    function (list, names) {
        if (!list || !list.find)
            return null;
        /** @type {?} */
        let match = list.find((/**
         * @param {?} name
         * @return {?}
         */
        name => {
            /** @type {?} */
            let lc = name.toLowerCase();
            return names.indexOf(lc) >= 0;
        }));
        return match;
    });
    /** @type {?} */
    let titleProp = pFn(props, ['title', 'name', 'label']);
    /** @type {?} */
    let title = titleProp ? feature.properties[titleProp] : "Untitled";
    /** @type {?} */
    let descProp = pFn(props, ['description', 'summary', 'descript']);
    /** @type {?} */
    let description = descProp ? feature.properties[descProp] : "No description provided";
    /** @type {?} */
    let result = '<div class="feature-popup">' +
        '<h5>' + title + '</h5>' +
        '<p>' + description + '</p>';
    if (feature.properties.modified) {
        /** @type {?} */
        let modified = new Date(feature.properties.modified);
        result += '<div><span class="label">Updated</span><span class="value">' +
            modified.toDateString() + '</span></div>';
    }
    if (feature.properties['cap:effective']) {
        /** @type {?} */
        let date = new Date(feature.properties['cap:effective']);
        result += '<div>' +
            '<span class="label">Effective</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    if (feature.properties['cap:expires']) {
        /** @type {?} */
        let date = new Date(feature.properties['cap:expires']);
        result += '<div>' +
            '<span class="label">Expires</span>' +
            '<span class="value">' +
            date.toDateString() + ' ' + date.toTimeString() +
            '</span>' +
            '</div>';
    }
    /** @type {?} */
    let linkProp = pFn(props, ['landingpage', 'link', 'website']);
    if (linkProp) {
        result += '<br>';
        result += '<a href="' + feature.properties[linkProp] + '" target="_blank">link</a>';
    }
    result += '<hr>';
    for (let prop in feature.properties) {
        if (titleProp === prop || descProp === prop ||
            linkProp === prop || 'modified' === prop)
            continue;
        /** @type {?} */
        let value = feature.properties[prop];
        if (typeof (value) === 'object') {
            for (let p in value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwY29yZS8iLCJzb3VyY2VzIjpbInNoYXJlZC9wb3B1cC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLFNBQVMsb0JBQW9CLENBQUMsT0FBTzs7UUFFN0IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7VUFFckMsR0FBRzs7Ozs7SUFBRyxVQUFTLElBQUksRUFBRSxLQUFLO1FBQzVCLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztZQUNoQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUk7Ozs7UUFBRSxJQUFJLENBQUMsRUFBRTs7Z0JBQ3RCLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFBOztRQUVHLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQzs7UUFDaEQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTs7UUFFOUQsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDOztRQUM3RCxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7O1FBRWpGLE1BQU0sR0FBRyw2QkFBNkI7UUFDdEMsTUFBTSxHQUFHLEtBQUssR0FBRyxPQUFPO1FBQ3hCLEtBQUssR0FBRyxXQUFXLEdBQUcsTUFBTTtJQUVoQyxJQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOztZQUN4QixRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEQsTUFBTSxJQUFJLDZEQUE2RDtZQUNuRSxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsZUFBZSxDQUFDO0tBQ2pEO0lBRUQsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztZQUNoQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxNQUFNLElBQUksT0FBTztZQUNiLHNDQUFzQztZQUN0QyxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9DLFNBQVM7WUFDVCxRQUFRLENBQUM7S0FDaEI7SUFDRCxJQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7O1lBQzlCLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sSUFBSSxPQUFPO1lBQ2Isb0NBQW9DO1lBQ3BDLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0MsU0FBUztZQUNULFFBQVEsQ0FBQztLQUNoQjs7UUFFRyxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsSUFBRyxRQUFRLEVBQUU7UUFDVCxNQUFNLElBQUksTUFBTSxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyw0QkFBNEIsQ0FBQztLQUN2RjtJQUVELE1BQU0sSUFBSSxNQUFNLENBQUM7SUFFakIsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ2hDLElBQUcsU0FBUyxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSTtZQUN0QyxRQUFRLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxJQUFJO1lBQ3hDLFNBQVM7O1lBQ1QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUMzQixLQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxJQUFJLE9BQU87b0JBQ2Isc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsU0FBUztvQkFDbkQsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVM7b0JBQzdDLFFBQVEsQ0FBQzthQUNoQjtTQUNKO2FBQU07WUFDSCxNQUFNLElBQUksT0FBTztnQkFDYixzQkFBc0IsR0FBRyxJQUFJLEdBQUcsU0FBUztnQkFDekMsc0JBQXNCLEdBQUcsS0FBSyxHQUFHLFNBQVM7Z0JBQzFDLFFBQVEsQ0FBQztTQUNoQjtLQUNKO0lBQ0QsTUFBTSxJQUFJLFFBQVEsQ0FBQztJQUNuQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5mdW5jdGlvbiBmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSB7XG5cbiAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhmZWF0dXJlLnByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgcEZuID0gZnVuY3Rpb24obGlzdCwgbmFtZXMpIHtcbiAgICAgICAgaWYoIWxpc3QgfHwgIWxpc3QuZmluZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBtYXRjaCA9IGxpc3QuZmluZCggbmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgbGMgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gbmFtZXMuaW5kZXhPZihsYyk+PTA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfTtcblxuICAgIGxldCB0aXRsZVByb3AgPSBwRm4ocHJvcHMsIFsndGl0bGUnLCduYW1lJywnbGFiZWwnXSk7XG4gICAgbGV0IHRpdGxlID0gdGl0bGVQcm9wID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3RpdGxlUHJvcF0gOiBcIlVudGl0bGVkXCI7XG5cbiAgICBsZXQgZGVzY1Byb3AgPSBwRm4ocHJvcHMsIFsnZGVzY3JpcHRpb24nLCAnc3VtbWFyeScsICdkZXNjcmlwdCddKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjUHJvcCA/IGZlYXR1cmUucHJvcGVydGllc1tkZXNjUHJvcF0gOiBcIk5vIGRlc2NyaXB0aW9uIHByb3ZpZGVkXCI7XG5cbiAgICBsZXQgcmVzdWx0ID0gJzxkaXYgY2xhc3M9XCJmZWF0dXJlLXBvcHVwXCI+JyArXG4gICAgICAgICc8aDU+JyArIHRpdGxlICsgJzwvaDU+JyArXG4gICAgICAgICc8cD4nICsgZGVzY3JpcHRpb24gKyAnPC9wPic7XG5cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXMubW9kaWZpZWQpIHtcbiAgICAgICAgbGV0IG1vZGlmaWVkID0gbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzLm1vZGlmaWVkKTtcbiAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PjxzcGFuIGNsYXNzPVwibGFiZWxcIj5VcGRhdGVkPC9zcGFuPjxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICtcbiAgICAgICAgICAgIG1vZGlmaWVkLnRvRGF0ZVN0cmluZygpICsgJzwvc3Bhbj48L2Rpdj4nO1xuICAgIH1cblxuICAgIGlmKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmVmZmVjdGl2ZSddKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzWydjYXA6ZWZmZWN0aXZlJ10pO1xuICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkVmZmVjdGl2ZTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBkYXRlLnRvRGF0ZVN0cmluZygpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArXG4gICAgICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIGlmKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmV4cGlyZXMnXSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmV4cGlyZXMnXSk7XG4gICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+RXhwaXJlczwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBkYXRlLnRvRGF0ZVN0cmluZygpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArXG4gICAgICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgbGV0IGxpbmtQcm9wID0gcEZuKHByb3BzLCBbJ2xhbmRpbmdwYWdlJywnbGluaycsJ3dlYnNpdGUnXSk7XG4gICAgaWYobGlua1Byb3ApIHtcbiAgICAgICAgcmVzdWx0ICs9ICc8YnI+JztcbiAgICAgICAgcmVzdWx0ICs9ICc8YSBocmVmPVwiJyArIGZlYXR1cmUucHJvcGVydGllc1tsaW5rUHJvcF0gKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bGluazwvYT4nO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSAnPGhyPic7XG5cbiAgICBmb3IobGV0IHByb3AgaW4gZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmKHRpdGxlUHJvcCA9PT0gcHJvcCB8fCBkZXNjUHJvcCA9PT0gcHJvcCB8fFxuICAgICAgICAgICAgbGlua1Byb3AgPT09IHByb3AgfHwgJ21vZGlmaWVkJyA9PT0gcHJvcClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSBmZWF0dXJlLnByb3BlcnRpZXNbcHJvcF07XG4gICAgICAgIGlmKHR5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IobGV0IHAgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+JyArIHByb3AgKyAnLicgKyBwICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICsgdmFsdWVbcF0gKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgKyB2YWx1ZSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc8L2Rpdj4nO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuIl19