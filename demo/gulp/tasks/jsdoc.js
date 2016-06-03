'use strict';

var gulp = require('gulp');
var config = require('../config');

var exec = require('child_process').exec;

gulp.task('jsdoc', function(cb) {
    var cmd;

    if (/^win/.test(process.platform)) {
        cmd = '.\\node_modules\\jsdoc\\jsdoc.js -c {0} -P {1} {2}'
            .replace('{0}', '.\\jsdoc-conf.json')
            .replace('{1}', '.\\package.json')
            .replace('{2}', config.js.folder);
    } else {
        cmd = './node_modules/jsdoc/jsdoc.js -c {0} -P {1} {2}'
            .replace('{0}', './jsdoc-conf.json')
            .replace('{1}', './package.json')
            .replace('{2}', config.js.folder);
    }

    exec(cmd, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
