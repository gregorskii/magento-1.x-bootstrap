'use strict';

var gulp = require('gulp');
var config = require('../config');

var eslint = require('gulp-eslint');
var gif = require('gulp-if');

var handleErrors = require('../util/handleErrors');

var lintStream = function(src) {
    return gulp.src(src)
        .pipe(eslint())
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(gif(global.isBuild, eslint.failOnError()))
        .on('error', handleErrors);
};

gulp.task('eslint', function() {
    return lintStream([config.js.paths, 'gulpfile.js', './gulp/**/*.js']);
});

module.exports = {
    lintStream: lintStream
};
