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
    var props = Object.keys(feature.properties);
    /** @type {?} */
    var pFn = function (list, names) {
        if (!list || !list.find)
            return null;
        /** @type {?} */
        var match = list.find(function (name) {
            /** @type {?} */
            var lc = name.toLowerCase();
            return names.indexOf(lc) >= 0;
        });
        return match;
    };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsic2hhcmVkL3BvcHVwLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsOEJBQThCLE9BQU87O0lBRWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU1QyxJQUFNLEdBQUcsR0FBRyxVQUFTLElBQUksRUFBRSxLQUFLO1FBQzVCLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztRQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLFVBQUEsSUFBSTs7WUFDdkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBRSxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7S0FDaEIsQ0FBQzs7SUFFRixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztJQUNyRCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs7SUFFbkUsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQzs7SUFDbEUsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQzs7SUFFdEYsSUFBSSxNQUFNLEdBQUcsNkJBQTZCO1FBQ3RDLE1BQU0sR0FBRyxLQUFLLEdBQUcsT0FBTztRQUN4QixLQUFLLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQztJQUVqQyxJQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOztRQUM1QixJQUFJLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSw2REFBNkQ7WUFDbkUsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLGVBQWUsQ0FBQztLQUNqRDtJQUVELElBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTs7UUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sSUFBSSxPQUFPO1lBQ2Isc0NBQXNDO1lBQ3RDLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0MsU0FBUztZQUNULFFBQVEsQ0FBQztLQUNoQjtJQUNELElBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTs7UUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sSUFBSSxPQUFPO1lBQ2Isb0NBQW9DO1lBQ3BDLHNCQUFzQjtZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDL0MsU0FBUztZQUNULFFBQVEsQ0FBQztLQUNoQjs7SUFFRCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVELElBQUcsUUFBUSxFQUFFO1FBQ1QsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUNqQixNQUFNLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsNEJBQTRCLENBQUM7S0FDdkY7SUFFRCxNQUFNLElBQUksTUFBTSxDQUFDO0lBRWpCLEtBQUksSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtRQUNoQyxJQUFHLFNBQVMsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLElBQUk7WUFDdEMsUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssSUFBSTtZQUN4QyxTQUFTOztRQUNiLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBRyxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzNCLEtBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFO2dCQUNoQixNQUFNLElBQUksT0FBTztvQkFDYixzQkFBc0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxTQUFTO29CQUNuRCxzQkFBc0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUztvQkFDN0MsUUFBUSxDQUFDO2FBQ2hCO1NBQ0o7YUFBTTtZQUNILE1BQU0sSUFBSSxPQUFPO2dCQUNiLHNCQUFzQixHQUFHLElBQUksR0FBRyxTQUFTO2dCQUN6QyxzQkFBc0IsR0FBRyxLQUFLLEdBQUcsU0FBUztnQkFDMUMsUUFBUSxDQUFDO1NBQ2hCO0tBQ0o7SUFDRCxNQUFNLElBQUksUUFBUSxDQUFDO0lBQ25CLE9BQU8sTUFBTSxDQUFDO0NBQ2pCO0FBRUQsZUFBZSxvQkFBb0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5mdW5jdGlvbiBmZWF0dXJlUG9wdXBUZW1wbGF0ZShmZWF0dXJlKSB7XG5cbiAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhmZWF0dXJlLnByb3BlcnRpZXMpO1xuXG4gICAgY29uc3QgcEZuID0gZnVuY3Rpb24obGlzdCwgbmFtZXMpIHtcbiAgICAgICAgaWYoIWxpc3QgfHwgIWxpc3QuZmluZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGxldCBtYXRjaCA9IGxpc3QuZmluZCggbmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgbGMgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gbmFtZXMuaW5kZXhPZihsYyk+PTA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfTtcblxuICAgIGxldCB0aXRsZVByb3AgPSBwRm4ocHJvcHMsIFsndGl0bGUnLCduYW1lJywnbGFiZWwnXSk7XG4gICAgbGV0IHRpdGxlID0gdGl0bGVQcm9wID8gZmVhdHVyZS5wcm9wZXJ0aWVzW3RpdGxlUHJvcF0gOiBcIlVudGl0bGVkXCI7XG5cbiAgICBsZXQgZGVzY1Byb3AgPSBwRm4ocHJvcHMsIFsnZGVzY3JpcHRpb24nLCAnc3VtbWFyeScsICdkZXNjcmlwdCddKTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjUHJvcCA/IGZlYXR1cmUucHJvcGVydGllc1tkZXNjUHJvcF0gOiBcIk5vIGRlc2NyaXB0aW9uIHByb3ZpZGVkXCI7XG5cbiAgICBsZXQgcmVzdWx0ID0gJzxkaXYgY2xhc3M9XCJmZWF0dXJlLXBvcHVwXCI+JyArXG4gICAgICAgICc8aDU+JyArIHRpdGxlICsgJzwvaDU+JyArXG4gICAgICAgICc8cD4nICsgZGVzY3JpcHRpb24gKyAnPC9wPic7XG5cbiAgICBpZihmZWF0dXJlLnByb3BlcnRpZXMubW9kaWZpZWQpIHtcbiAgICAgICAgbGV0IG1vZGlmaWVkID0gbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzLm1vZGlmaWVkKTtcbiAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PjxzcGFuIGNsYXNzPVwibGFiZWxcIj5VcGRhdGVkPC9zcGFuPjxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICtcbiAgICAgICAgICAgIG1vZGlmaWVkLnRvRGF0ZVN0cmluZygpICsgJzwvc3Bhbj48L2Rpdj4nO1xuICAgIH1cblxuICAgIGlmKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmVmZmVjdGl2ZSddKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzWydjYXA6ZWZmZWN0aXZlJ10pO1xuICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkVmZmVjdGl2ZTwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBkYXRlLnRvRGF0ZVN0cmluZygpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArXG4gICAgICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuICAgIGlmKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmV4cGlyZXMnXSkge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGZlYXR1cmUucHJvcGVydGllc1snY2FwOmV4cGlyZXMnXSk7XG4gICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+RXhwaXJlczwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArXG4gICAgICAgICAgICBkYXRlLnRvRGF0ZVN0cmluZygpICsgJyAnICsgZGF0ZS50b1RpbWVTdHJpbmcoKSArXG4gICAgICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgfVxuXG4gICAgbGV0IGxpbmtQcm9wID0gcEZuKHByb3BzLCBbJ2xhbmRpbmdwYWdlJywnbGluaycsJ3dlYnNpdGUnXSk7XG4gICAgaWYobGlua1Byb3ApIHtcbiAgICAgICAgcmVzdWx0ICs9ICc8YnI+JztcbiAgICAgICAgcmVzdWx0ICs9ICc8YSBocmVmPVwiJyArIGZlYXR1cmUucHJvcGVydGllc1tsaW5rUHJvcF0gKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+bGluazwvYT4nO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSAnPGhyPic7XG5cbiAgICBmb3IobGV0IHByb3AgaW4gZmVhdHVyZS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmKHRpdGxlUHJvcCA9PT0gcHJvcCB8fCBkZXNjUHJvcCA9PT0gcHJvcCB8fFxuICAgICAgICAgICAgbGlua1Byb3AgPT09IHByb3AgfHwgJ21vZGlmaWVkJyA9PT0gcHJvcClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSBmZWF0dXJlLnByb3BlcnRpZXNbcHJvcF07XG4gICAgICAgIGlmKHR5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IobGV0IHAgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gJzxkaXY+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+JyArIHByb3AgKyAnLicgKyBwICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICsgdmFsdWVbcF0gKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPicgKyBwcm9wICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgKyB2YWx1ZSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ICs9ICc8L2Rpdj4nO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVQb3B1cFRlbXBsYXRlO1xuIl19