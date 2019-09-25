const   { src, dest, pipe, watch, task, series } = require('gulp');

var pkg     = require('./package.json'),
    concat  = require('gulp-concat'),
    gap     = require('gulp-append-prepend');


function license1Task() {
    return src('dist/bundles/geoplatform-mapcore.umd.js')
    .pipe( gap.prependFile('LICENSE.txt') )
    .pipe( dest('dist/bundles') );
}
function license2Task() {
    return src('dist/bundles/geoplatform-mapcore.umd.min.js')
    .pipe( gap.prependFile('LICENSE.txt') )
    .pipe( dest('dist/bundles') );
}

var licenseTask = series( license1Task, license2Task );

function stylesTask() {
    return src('src/**/*.css')
    .pipe( concat('geoplatform-mapcore.css') )
    .pipe( dest('dist/bundles/') )
}


exports.license = licenseTask;
exports.styles = stylesTask;
exports.default = series( licenseTask, stylesTask );
