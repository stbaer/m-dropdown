var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    meta = require('../package.json');

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function () {

    return gulp.src([
        './src/styles/main.less'
    ])
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.rename(function (path) {
            path.basename = meta.name;
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(plugins.size({
            gzip: true,
            showFiles: true
        }))
        .pipe(plugins.csso())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(plugins.size({
            showFiles: true
        }))
        .pipe(plugins.size({
            gzip: true,
            showFiles: true
        }));

});
