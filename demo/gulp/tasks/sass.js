'use strict';

var gulp = require('gulp');
var config = require('../config');

var replace = require('gulp-replace');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var gif = require('gulp-if');

gulp.task('sass', function() {
    gulp.src(config.sass.paths)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sass.settings).on('error', handleErrors))
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(replace(/@@assetPath/g, global.assetPath))
        .pipe(minifyCSS())
        .pipe(gif(global.debug, sourcemaps.write('.')))
        .pipe(gulp.dest(config.dist + '/css'))
        .on('error', handleErrors);
});
