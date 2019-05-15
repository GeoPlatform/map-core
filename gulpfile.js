var pkg     = require('./package.json'),
    gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    gap     = require('gulp-append-prepend');


gulp.task('license', function() {
    gulp.src('dist/bundles/geoplatform-mapcore.umd.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
    gulp.src('dist/bundles/geoplatform-mapcore.umd.min.js')
        .pipe( gap.prependFile('LICENSE.txt') )
        .pipe(gulp.dest('dist/bundles'));
});

gulp.task('styles', function() {
    gulp.src('src/**/*.css')
    .pipe(concat('geoplatform-mapcore.css'))
    .pipe(gulp.dest('dist/bundles/'))
});


gulp.task('default', ['license', "styles"]);
