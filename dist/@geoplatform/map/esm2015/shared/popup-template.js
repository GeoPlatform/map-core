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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtdGVtcGxhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vbWFwLyIsInNvdXJjZXMiOlsic2hhcmVkL3BvcHVwLXRlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsOEJBQThCLE9BQU87O0lBRWpDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUU1QyxNQUFNLEdBQUcsR0FBRyxVQUFTLElBQUksRUFBRSxLQUFLO1FBQzVCLElBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDOztRQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxFQUFFOztZQUMxQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQztTQUMvQixDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztLQUNoQixDQUFDOztJQUVGLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O0lBQ3JELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDOztJQUVuRSxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDOztJQUNsRSxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDOztJQUV0RixJQUFJLE1BQU0sR0FBRyw2QkFBNkI7UUFDdEMsTUFBTSxHQUFHLEtBQUssR0FBRyxPQUFPO1FBQ3hCLEtBQUssR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBRWpDLElBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7O1FBQzVCLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLDZEQUE2RDtZQUNuRSxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsZUFBZSxDQUFDO0tBQ2pEO0lBRUQsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztRQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxJQUFJLE9BQU87WUFDYixzQ0FBc0M7WUFDdEMsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMvQyxTQUFTO1lBQ1QsUUFBUSxDQUFDO0tBQ2hCO0lBQ0QsSUFBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztRQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLE9BQU87WUFDYixvQ0FBb0M7WUFDcEMsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMvQyxTQUFTO1lBQ1QsUUFBUSxDQUFDO0tBQ2hCOztJQUVELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsSUFBRyxRQUFRLEVBQUU7UUFDVCxNQUFNLElBQUksTUFBTSxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyw0QkFBNEIsQ0FBQztLQUN2RjtJQUVELE1BQU0sSUFBSSxNQUFNLENBQUM7SUFFakIsS0FBSSxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1FBQ2hDLElBQUcsU0FBUyxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSTtZQUN0QyxRQUFRLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxJQUFJO1lBQ3hDLFNBQVM7O1FBQ2IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFHLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDM0IsS0FBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxPQUFPO29CQUNiLHNCQUFzQixHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFNBQVM7b0JBQ25ELHNCQUFzQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTO29CQUM3QyxRQUFRLENBQUM7YUFDaEI7U0FDSjthQUFNO1lBQ0gsTUFBTSxJQUFJLE9BQU87Z0JBQ2Isc0JBQXNCLEdBQUcsSUFBSSxHQUFHLFNBQVM7Z0JBQ3pDLHNCQUFzQixHQUFHLEtBQUssR0FBRyxTQUFTO2dCQUMxQyxRQUFRLENBQUM7U0FDaEI7S0FDSjtJQUNELE1BQU0sSUFBSSxRQUFRLENBQUM7SUFDbkIsT0FBTyxNQUFNLENBQUM7Q0FDakI7QUFFRCxlQUFlLG9CQUFvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmZ1bmN0aW9uIGZlYXR1cmVQb3B1cFRlbXBsYXRlKGZlYXR1cmUpIHtcblxuICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGZlYXR1cmUucHJvcGVydGllcyk7XG5cbiAgICBjb25zdCBwRm4gPSBmdW5jdGlvbihsaXN0LCBuYW1lcykge1xuICAgICAgICBpZighbGlzdCB8fCAhbGlzdC5maW5kKSByZXR1cm4gbnVsbDtcbiAgICAgICAgbGV0IG1hdGNoID0gbGlzdC5maW5kKCBuYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBsYyA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lcy5pbmRleE9mKGxjKT49MDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9O1xuXG4gICAgbGV0IHRpdGxlUHJvcCA9IHBGbihwcm9wcywgWyd0aXRsZScsJ25hbWUnLCdsYWJlbCddKTtcbiAgICBsZXQgdGl0bGUgPSB0aXRsZVByb3AgPyBmZWF0dXJlLnByb3BlcnRpZXNbdGl0bGVQcm9wXSA6IFwiVW50aXRsZWRcIjtcblxuICAgIGxldCBkZXNjUHJvcCA9IHBGbihwcm9wcywgWydkZXNjcmlwdGlvbicsICdzdW1tYXJ5JywgJ2Rlc2NyaXB0J10pO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NQcm9wID8gZmVhdHVyZS5wcm9wZXJ0aWVzW2Rlc2NQcm9wXSA6IFwiTm8gZGVzY3JpcHRpb24gcHJvdmlkZWRcIjtcblxuICAgIGxldCByZXN1bHQgPSAnPGRpdiBjbGFzcz1cImZlYXR1cmUtcG9wdXBcIj4nICtcbiAgICAgICAgJzxoNT4nICsgdGl0bGUgKyAnPC9oNT4nICtcbiAgICAgICAgJzxwPicgKyBkZXNjcmlwdGlvbiArICc8L3A+JztcblxuICAgIGlmKGZlYXR1cmUucHJvcGVydGllcy5tb2RpZmllZCkge1xuICAgICAgICBsZXQgbW9kaWZpZWQgPSBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXMubW9kaWZpZWQpO1xuICAgICAgICByZXN1bHQgKz0gJzxkaXY+PHNwYW4gY2xhc3M9XCJsYWJlbFwiPlVwZGF0ZWQ8L3NwYW4+PHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgK1xuICAgICAgICAgICAgbW9kaWZpZWQudG9EYXRlU3RyaW5nKCkgKyAnPC9zcGFuPjwvZGl2Pic7XG4gICAgfVxuXG4gICAgaWYoZmVhdHVyZS5wcm9wZXJ0aWVzWydjYXA6ZWZmZWN0aXZlJ10pIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShmZWF0dXJlLnByb3BlcnRpZXNbJ2NhcDplZmZlY3RpdmUnXSk7XG4gICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+RWZmZWN0aXZlPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICtcbiAgICAgICAgICAgIGRhdGUudG9EYXRlU3RyaW5nKCkgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpICtcbiAgICAgICAgICAgICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG4gICAgaWYoZmVhdHVyZS5wcm9wZXJ0aWVzWydjYXA6ZXhwaXJlcyddKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZmVhdHVyZS5wcm9wZXJ0aWVzWydjYXA6ZXhwaXJlcyddKTtcbiAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj5FeHBpcmVzPC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nICtcbiAgICAgICAgICAgIGRhdGUudG9EYXRlU3RyaW5nKCkgKyAnICcgKyBkYXRlLnRvVGltZVN0cmluZygpICtcbiAgICAgICAgICAgICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICB9XG5cbiAgICBsZXQgbGlua1Byb3AgPSBwRm4ocHJvcHMsIFsnbGFuZGluZ3BhZ2UnLCdsaW5rJywnd2Vic2l0ZSddKTtcbiAgICBpZihsaW5rUHJvcCkge1xuICAgICAgICByZXN1bHQgKz0gJzxicj4nO1xuICAgICAgICByZXN1bHQgKz0gJzxhIGhyZWY9XCInICsgZmVhdHVyZS5wcm9wZXJ0aWVzW2xpbmtQcm9wXSArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj5saW5rPC9hPic7XG4gICAgfVxuXG4gICAgcmVzdWx0ICs9ICc8aHI+JztcblxuICAgIGZvcihsZXQgcHJvcCBpbiBmZWF0dXJlLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYodGl0bGVQcm9wID09PSBwcm9wIHx8IGRlc2NQcm9wID09PSBwcm9wIHx8XG4gICAgICAgICAgICBsaW5rUHJvcCA9PT0gcHJvcCB8fCAnbW9kaWZpZWQnID09PSBwcm9wKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGxldCB2YWx1ZSA9IGZlYXR1cmUucHJvcGVydGllc1twcm9wXTtcbiAgICAgICAgaWYodHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcCBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSAnPGRpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwibGFiZWxcIj4nICsgcHJvcCArICcuJyArIHAgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPicgKyB2YWx1ZVtwXSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ICs9ICc8ZGl2PicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+JyArIHByb3AgKyAnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cInZhbHVlXCI+JyArIHZhbHVlICsgJzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJzwvZGl2Pic7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmVhdHVyZVBvcHVwVGVtcGxhdGU7XG4iXX0=