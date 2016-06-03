'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('fonts', function() {
    return gulp.src(config.fonts.paths)
        .pipe(gulp.dest(config.dist + '/fonts'));
});

gulp.task('common', ['fonts']);
