'use strict';

var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
    browserSync(config.dist + '/styles/*.css', config.browserSyncConfig);
});
