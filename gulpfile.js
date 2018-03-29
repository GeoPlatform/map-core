var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps'),
    rollup      = require('rollup');

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
    return rollup.rollup({ input: './src/index.js', plugins: [] })
    .then(bundle => {
        return bundle.write({
          file: './dist/js/' + pkg.name + '.js',
          format: 'umd',
          name: 'GeoPlatformMapCore',
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
