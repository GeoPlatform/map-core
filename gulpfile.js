var pkg         = require('./package.json'),
    gulp        = require('gulp'),
    concat      = require('gulp-concat');


require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['src/**/*.less', 'src/**/*.css'])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify('Compiled styles'));
});


gulp.task('default', ['less']);
