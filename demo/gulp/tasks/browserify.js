'use strict';

var gulp = require('gulp');
var config = require('../config');

var mergeStream = require('merge-stream');
var bundleLogger = require('../util/bundleLogger');
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var _ = require('underscore');
var gif = require('gulp-if');
var replace = require('gulp-replace');

var lintStreamFn = require('./eslint').lintStream;

var browserifyTask = function() {
    var browserifyThis = function(bundleConfig) {

        var b;
        var bundle;
        var bundledStream;
        var lintStream;
        var _bundleConfig = bundleConfig;

        // If Serve add watchify options
        if (global.isServe) {
            // Add watchify args and debug (sourcemaps) option
            _.extend(_bundleConfig, { cache: {}, packageCache: {} });
        }

        // If Debug add sourcemaps option
        if (global.debug) {
            _.extend(_bundleConfig, { debug: true });
        }

        b = browserify(_bundleConfig);

        bundle = function(changedFiles) {

            // Log when bundling starts
            bundleLogger.start(_bundleConfig.outputName);

            bundledStream = b
                .bundle()
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specify the
                // desired output filename here.
                .pipe(source(_bundleConfig.outputName))
                .pipe(buffer())
                .pipe(gif(global.debug, sourcemaps.init({loadMaps: true})))
                .pipe(uglify(config.uglify.settings))
                .pipe(gif(global.debug, sourcemaps.write('./')))
                // Specify the output destination
                .pipe(replace(/@@assetPath/g, global.assetPath))
                .pipe(gulp.dest(config.dist + '/js'))
                .pipe(browserSync.reload({stream: true}))
                // Report compile errors
                .on('error', handleErrors);

            // Lint changed files
            if (changedFiles) {
                lintStream = lintStreamFn(changedFiles);
                return mergeStream(lintStream, bundledStream);
            }

            return bundledStream;
        };

        if (global.isServe) {
            // Wrap with watchify and rebundle on changes
            b = watchify(b);
            // Rebundle on update
            b.on('update', bundle);
            bundleLogger.watch(_bundleConfig.outputName);
        }

        // Sort out shared dependencies.
        // b.require exposes modules externally
        if (_bundleConfig.require) b.require(_bundleConfig.require);
        // b.external excludes modules from the bundle, and expects
        // they'll be available externally
        if (_bundleConfig.external) b.external(_bundleConfig.external);

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    return mergeStream.apply(gulp, _.map(config.browserify.bundles, browserifyThis));
};

gulp.task('browserify', ['eslint'], function() {
    return browserifyTask();
});
