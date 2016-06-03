/*eslint "no-process-exit": 0, "dot-notation": 0*/
'use strict';

var gulp = require('gulp');
var config = require('../config');

var gutil = require('gulp-util');
var argv = require('yargs').argv;
var _ = require('underscore');
var gzip = require('gulp-gzip');

gulp.task('cdn:replace', function() {
    // default
    global.assetPath = config.cdn['dev'];

    // argument
    if (argv.env) {
        if (!_.has(config.cdn, argv.env)) {
            gutil.log(gutil.colors.red('Environment key not found'));
            process.exit(1);
        }
        global.assetPath = config.cdn[argv.env];
    }

    gutil.log(gutil.colors.blue(
        global.assetPath ? '(CDN) Asset prefix set to: ' + global.assetPath : '(CDN) Asset prefix set to: None'
    ));
});

gulp.task('cdn:gzip:js', function() {
    gulp.src(config.dist + '/scripts/' + config.extensionGlobs.js)
        .pipe(gzip({ append: true }))
        .pipe(gulp.dest(config.dist + '/scripts'));
});

gulp.task('cdn:gzip:css', function() {
    gulp.src(config.dist + '/styles/' + config.extensionGlobs.css)
        .pipe(gzip({ append: true }))
        .pipe(gulp.dest(config.dist + '/styles'));
});

gulp.task('cdn:gzip', ['cdn:gzip:js', 'cdn:gzip:css']);
