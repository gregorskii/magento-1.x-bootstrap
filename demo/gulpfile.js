/*eslint "no-process-exit": 0*/
'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');
var config = require('./gulp/config');
var argv = require('yargs').argv;

// Require all tasks in gulp, including subfolders
requireDir('./gulp', { recurse: true });

/**
 * Bundle Task: gulp bundle
 */
gulp.task('bundle', gulpSequence(
    'clean',
    'cdn:replace',
    ['browserify', 'sass', 'fonts', 'images']
));

/**
 * Default Task: gulp
 */
gulp.task('default', gulpSequence('default-start', 'bundle'));
gulp.task('default-start', function(cb) {
    global.isBuild = true;
    global.debug = true;
    cb();
});

/**
 * Build Task: gulp build --env={env}
 */
gulp.task('build', gulpSequence('build-start', 'bundle', ['cdn:gzip']));
gulp.task('build-start', function(cb) {
    global.isBuild = true;
    if (argv.env) {
        if (argv.env === 'dev') {
            global.debug = true;
        }
    } else {
        gutil.log(gutil.colors.red('--env={env} is required'));
        process.exit(1);
    }
    cb();
});

/**
 * Serve Task: gulp serve
 */
gulp.task('serve', gulpSequence('serve-start', 'bundle', 'serve-setup', 'browserSync'));
gulp.task('serve-start', function(cb) {
    global.isServe = true;
    global.debug = true;
    cb();
});
gulp.task('serve-setup', function(cb) {
    gutil.log(gutil.colors.bgGreen('Watching for changes...'));

    // Do not need to do anything for browserify, watchify is already re-bundling on change
    gulp.watch(config.images.paths, ['images']);
    gulp.watch(config.sass.paths, ['sass']);

    cb();
});
