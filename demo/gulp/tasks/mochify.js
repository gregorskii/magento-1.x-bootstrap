'use strict';

var gulp = require('gulp');
var config = require('../config');

var _ = require('underscore');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var through = require('through2');
var mochify = require('mochify');
var istanbul = require('mochify-istanbul');

gulp.task('test', function() {

    var bundle;
    var bundler;
    var argumentOpts = {};

    if (argv.grep) {
        argumentOpts.grep = argv.grep;
    }

    if (argv.watch) {
        argumentOpts.watch = argv.watch;
    }

    bundler = function() {
        var mb = mochify('./test/**/*.js', _.extend({}, config.mochify.bundle, argumentOpts));
        return mb.bundle();
    };

    bundle = function() {
        return through()
            .pipe(bundler())
            .on('error', function(err) {
                if (err) {
                    gutil.log(err);
                }
            });
    };

    return bundle();

});

gulp.task('coverage', function() {
    var bundler = function() {
        var mb = mochify('./test/**/*.js', config.mochify.bundle)
            .plugin(istanbul, config.mochify.coverage);
        return mb.bundle();
    };

    var bundle = function() {
        return through()
            .pipe(bundler())
            .on('error', function(err) {
                if (err) {
                    gutil.log(err);
                }
            });
    };

    return bundle();

});
