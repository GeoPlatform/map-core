var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps');

require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('jshint', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(jshint({
            // laxbreak: true,
            // laxcomma: true,
            esversion: 6, //JSHint Harmony/ES6
            // eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter('default'))
        // .pipe(livereload());
});


gulp.task('js', 'Concat, Uglify JavaScript into a single file', function() {

    //include module first, then other src files which depend on module
    gulp.src([
        'src/index.js',
        'src/shared/**/*.js',
        'src/service/**/*.js',
        'src/control/**/*.js',
        'src/layer/L.GeoPlatform.WMS.js',
        'src/layer/L.GeoPlatform.WMTS.js',
        'src/layer/L.GeoPlatform.WMST.js',
        'src/layer/L.TileLayer.ESRI.js',
        'src/layer/L.GeoPlatform.FeatureLayer.js',
        'src/layer/L.esri.Cluster.FeatureLayer.js',
        'src/layer/L.GeoPlatform.ClusteredFeatureLayer.js',
        'src/layer/factory.js',
        'src/layer/service.js',
        'src/map/service.js',
        'src/map/instance.js'
        ])
        // .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: ["es2015"]}))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        // .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify('Uglified JavaScript'));
});

gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['src/**/*.less', 'src/**/*.css'])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('Compiled styles'));
});


gulp.task('default', ['jshint', 'js', 'less']);
