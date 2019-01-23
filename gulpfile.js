var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps'),
    rollup      = require('rollup'),
    path        = require('path');


const rollupBabel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const builtIns = require('rollup-plugin-node-builtins');


require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('jshint', function () {
    gulp.src(['src/**/*.js'])
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
    return rollup.rollup({
        input: './src/index.js',
        external: [
            'Q', 'q',
            'jquery', 'jQuery',
            'leaflet', 'Leaflet', 'L',
            'esri-leaflet',
            'leaflet.markercluster',
            'geoplatform.client'
        ],
        output: {
            format: 'umd',
            globals: {
                'q': 'Q',
                'jquery': 'jQuery',
                'leaflet': 'L',
                "esri-leaflet": "L.esri",
                'leaflet.markercluster': 'L.markerCluster',
                'geoplatform.client': 'GeoPlatformClient'
            }
        },
        plugins: [
            builtIns(),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            rollupBabel({ exclude: 'node_modules/**' })
        ]
    })
    .then(bundle => {
        return bundle.write({
          file: './dist/js/' + pkg.name + '.js',
          format: 'umd',
          name: 'GeoPlatformMapCore',
          banner: '/* This software has been approved for release by the U.S. Department of the Interior. Although the software has been subjected to rigorous review, the DOI reserves the right to update the software as needed pursuant to further analysis and review. No warranty, expressed or implied, is made by the DOI or the U.S. Government as to the functionality of the software and related material nor shall the fact of release constitute any such warranty. Furthermore, the software is released on condition that neither the DOI nor the U.S. Government shall be held liable for any damages resulting from its authorized or unauthorized use. */',
          globals: {
              'q': 'Q',
              'jquery': 'jQuery',
              'leaflet': 'L',
              "esri-leaflet": "L.esri",
              'leaflet.markercluster': 'L.markerCluster',
              'geoplatform.client': 'GeoPlatformClient'
          },
          sourcemap: true
        });
    });
});

gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['src/**/*.less', 'src/**/*.css'])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('Compiled styles'));
});


gulp.task('default', ['jshint', 'js', 'less']);
