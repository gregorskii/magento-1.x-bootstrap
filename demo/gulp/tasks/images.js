'use strict';

var gulp = require('gulp');
var config = require('../config');

var browserSync = require('browser-sync');

gulp.task('images', function() {
    return gulp.src(config.images.paths)
        .pipe(gulp.dest(config.dist + '/images'))
        .pipe(browserSync.reload({stream: true}));
});
