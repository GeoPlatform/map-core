/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} feature
 * @return {?}
 */
function featurePopupTemplate(feature) {
    /** @type {?} */
    let props = Object.keys(feature.properties);
    /** @type {?} */
    const pFn = function (list, names) {
        if (!list || !list.find)
            return null;
        /** @type {?} */
        let match = list.find(name => {
            /** @type {?} */
            let lc = name.toLowerCase();
            return names.indexOf(lc) >= 0;
        });
        return match;
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9nZW9wbGF0Zm9ybS5tYXAvIiwic291cmNlcyI6WyJzaGFyZWQvcG9wdXAtdGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSw4QkFBOEIsT0FBTzs7SUFFakMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBRTVDLE1BQU0sR0FBRyxHQUFHLFVBQVMsSUFBSSxFQUFFLEtBQUs7UUFDNUIsSUFBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7O1FBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLEVBQUU7O1lBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0tBQ2hCLENBQUM7O0lBRUYsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7SUFDckQsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7O0lBRW5FLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7O0lBQ2xFLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMseUJBQXlCLENBQUM7O0lBRXRGLElBQUksTUFBTSxHQUFHLDZCQUE2QjtRQUN0QyxNQUFNLEdBQUcsS0FBSyxHQUFHLE9BQU87UUFDeEIsS0FBSyxHQUFHLFdBQVcsR0FBRyxNQUFNLENBQUM7SUFFakMsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7UUFDNUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCxNQUFNLElBQUksNkRBQTZEO1lBQ25FLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxlQUFlLENBQUM7S0FDakQ7SUFFRCxJQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7O1FBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksT0FBTztZQUNiLHNDQUFzQztZQUN0QyxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9DLFNBQVM7WUFDVCxRQUFRLENBQUM7S0FDaEI7SUFDRCxJQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7O1FBQ2xDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksT0FBTztZQUNiLG9DQUFvQztZQUNwQyxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9DLFNBQVM7WUFDVCxRQUFRLENBQUM7S0FDaEI7O0lBRUQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBQyxNQUFNLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUM1RCxJQUFHLFFBQVEsRUFBRTtRQUNULE1BQU0sSUFBSSxNQUFNLENBQUM7UUFDakIsTUFBTSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLDRCQUE0QixDQUFDO0tBQ3ZGO0lBRUQsTUFBTSxJQUFJLE1BQU0sQ0FBQztJQUVqQixLQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7UUFDaEMsSUFBRyxTQUFTLEtBQUssSUFBSSxJQUFJLFFBQVEsS0FBSyxJQUFJO1lBQ3RDLFFBQVEsS0FBSyxJQUFJLElBQUksVUFBVSxLQUFLLElBQUk7WUFDeEMsU0FBUzs7UUFDYixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUMzQixLQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDaEIsTUFBTSxJQUFJLE9BQU87b0JBQ2Isc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsU0FBUztvQkFDbkQsc0JBQXNCLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVM7b0JBQzdDLFFBQVEsQ0FBQzthQUNoQjtTQUNKO2FBQU07WUFDSCxNQUFNLElBQUksT0FBTztnQkFDYixzQkFBc0IsR0FBRyxJQUFJLEdBQUcsU0FBUztnQkFDekMsc0JBQXNCLEdBQUcsS0FBSyxHQUFHLFNBQVM7Z0JBQzFDLFFBQVEsQ0FBQztTQUNoQjtLQUNKO0lBQ0QsTUFBTSxJQUFJLFFBQVEsQ0FBQztJQUNuQixPQUFPLE1BQU0sQ0FBQztDQUNqQjtBQUVELGVBQWUsb0JBQW9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZnVuY3Rpb24gZmVhdHVyZVBvcHVwVGVtcGxhdGUoZmVhdHVyZSkge1xuXG4gICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZmVhdHVyZS5wcm9wZXJ0aWVzKTtcblxuICAgIGNvbnN0IHBGbiA9IGZ1bmN0aW9uKGxpc3QsIG5hbWVzKSB7XG4gICAgICAgIGlmKCFsaXN0IHx8ICFsaXN0LmZpbmQpIHJldHVybiBudWxsO1xuICAgICAgICBsZXQgbWF0Y2ggPSBsaXN0LmZpbmQoIG5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IGxjID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmluZGV4T2YobGMpPj0wO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH07XG5cbiAgICBsZXQgdGl0bGVQcm9wID0gcEZuKHByb3BzLCBbJ3RpdGxlJywnbmFtZScsJ2xhYmVsJ10pO1xuICAgIGxldCB0aXRsZSA9IHRpdGxlUHJvcCA/IGZlYXR1cmUucHJvcGVydGllc1t0aXRsZVByb3BdIDogXCJVbnRpdGxlZFwiO1xuXG4gICAgbGV0IGRlc2NQcm9wID0gcEZuKHByb3BzLCBbJ2Rlc2NyaXB0aW9uJywgJ3N1bW1hcnknLCAnZGVzY3JpcHQnXSk7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZGVzY1Byb3AgPyBmZWF0dXJlLnByb3BlcnRpZXNbZGVzY1Byb3BdIDogXCJObyBkZXNjcmlwdGlvbiBwcm92aWRlZFwiO1xuXG4gICAgbGV0IHJlc3VsdCA9ICc8ZGl2IGNsYXNzPVwiZmVhdHVyZS1wb3B1cFwiPicgK1xuICAgICAgICAnPGg1PicgKyB0aXRsZSArICc8L2g1PicgK1xuICAgICAgICAnPHA+JyArIGRlc2NyaXB0aW9uICsgJzwvcD4nO1xuXG4gICAgaWYoZmVhdHVyZS5wcm9wZXJ0aWVzLm1vZGlmaWVkKSB7XG4gICAgICAgIGxldCBtb2RpZmllZCA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllcy5tb2RpZmllZCk7XG4gICAgICAgIHJlc3VsdCArPSAnPGRpdj48c3BhbiBjbGFzcz1cImxhYmVsXCI+VXBkYXRlZDwvc3Bhbj48c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBtb2RpZmllZC50b0RhdGVTdHJpbmcoKSArICc8L3NwYW4+PC9kaXY+JztcbiAgICB9XG5cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDplZmZlY3RpdmUnXSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmVmZmVjdGl2ZSddKTtcbiAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj5FZmZlY3RpdmU8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgK1xuICAgICAgICAgICAgZGF0ZS50b0RhdGVTdHJpbmcoKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCkgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDpleHBpcmVzJ10pIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDpleHBpcmVzJ10pO1xuICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkV4cGlyZXM8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgK1xuICAgICAgICAgICAgZGF0ZS50b0RhdGVTdHJpbmcoKSArICcgJyArIGRhdGUudG9UaW1lU3RyaW5nKCkgK1xuICAgICAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgIH1cblxuICAgIGxldCBsaW5rUHJvcCA9IHBGbihwcm9wcywgWydsYW5kaW5ncGFnZScsJ2xpbmsnLCd3ZWJzaXRlJ10pO1xuICAgIGlmKGxpbmtQcm9wKSB7XG4gICAgICAgIHJlc3VsdCArPSAnPGJyPic7XG4gICAgICAgIHJlc3VsdCArPSAnPGEgaHJlZj1cIicgKyBmZWF0dXJlLnByb3BlcnRpZXNbbGlua1Byb3BdICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPmxpbms8L2E+JztcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gJzxocj4nO1xuXG4gICAgZm9yKGxldCBwcm9wIGluIGZlYXR1cmUucHJvcGVydGllcykge1xuICAgICAgICBpZih0aXRsZVByb3AgPT09IHByb3AgfHwgZGVzY1Byb3AgPT09IHByb3AgfHxcbiAgICAgICAgICAgIGxpbmtQcm9wID09PSBwcm9wIHx8ICdtb2RpZmllZCcgPT09IHByb3ApXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgbGV0IHZhbHVlID0gZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BdO1xuICAgICAgICBpZih0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yKGxldCBwIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wICsgJy4nICsgcCArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArIHZhbHVlW3BdICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj4nICsgcHJvcCArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICsgdmFsdWUgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCArPSAnPC9kaXY+JztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmZWF0dXJlUG9wdXBUZW1wbGF0ZTtcbiJdfQ==