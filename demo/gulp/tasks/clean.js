'use strict';

var gulp = require('gulp');
var config = require('../config');

var del = require('del');

gulp.task('clean', function(callback) {
    del(config.clean.paths, callback);
});
