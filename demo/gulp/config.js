'use strict';

var _ = require('underscore');
var path = require('path');
var jsonfile = require('jsonfile');
var serverConfig = jsonfile.readFileSync('./browserSyncConfig.json');

/*
 *  Getting combined packages from package.json and bower.json
 */
var packageJSON = jsonfile.readFileSync('./package.json');
var bowerJSON = jsonfile.readFileSync('./bower.json');
var vendorModules = _.union(_.keys(packageJSON.dependencies), _.keys(bowerJSON.dependencies));

var src = './resources';
var dist = './skin/frontend/demo/default';

var browserifyBase = {
    paths: [
        path.join(__dirname, '../resources/scripts')
    ]
};

var extensionGlobs = {
    fonts: '*.{ttf,woff,eof,svg,woff2,eot}',
    images: '*.{jpg,png,gif,svg}',
    sass: '*.{scss,sass}',
    js: '*.js',
    css: '*.css'
};

module.exports = {
    src: src,
    dist: dist,
    extensionGlobs: extensionGlobs,
    libs: 'libs',
    cdn: {
        'dev': ''
    },
    clean: {
        paths: [
            dist + '/**/*',
            '!' + dist + '/.htaccess',
            '!' + dist + '/index.php',
            '!' + dist + '/favicon.ico'
        ]
    },
    sass: {
        paths: src + '/styles/**/' + extensionGlobs.sass,
        settings: {
            outputStyle: 'expanded',
            precision: 10
        },
        autoprefixer: {
            browsers: ['last 2 versions'],
            cascade: false
        }
    },
    fonts: {
        paths: [
            src + '/fonts/**/' + extensionGlobs.fonts
        ]
    },
    images: {
        paths: src + '/images/**/' + extensionGlobs.images
    },
    js: {
        paths: src + '/scripts/**/' + extensionGlobs.js,
        folder: src + '/scripts'
    },
    jsdoc: {
        configFile: './jsdoc-conf.json',
        packageFile: './package.json'
    },
    browserify: {
        bundles: [
            _.extend({}, browserifyBase, {
                entries: path.join(__dirname, '../resources/scripts/vendor.js'),
                transform: [],
                require: vendorModules,
                outputName: 'vendor.js'
            }),
            _.extend({}, browserifyBase, {
                entries: path.join(__dirname, '../resources/scripts/main.js'),
                transform: [],
                // Makes typing .hbs optional
                extensions: ['.hbs'],
                external: vendorModules,
                outputName: 'main.js'
            })
        ]
    },
    mochify: {
        bundle: {
            reporter: 'spec',
            phantomjs: path.join(__dirname, '../node_modules/.bin/phantomjs'),
            //debug: true,
            //'web-security': false,
            browserifyOptions: {
                paths: [
                    path.join(__dirname, '../resources/scripts'),
                    path.join(__dirname, '../test_partials')
                ],
                require: vendorModules,
                transform: [],
                // Makes typing .hbs optional
                extensions: ['.hbs']
            }
        },
        coverage: {
            // Intrumenter options
            exclude: ['**/test/**/*', '**/node_modules/**/*', '**/*.hbs'],
            // Reporter options
            report: ['text'],
            dir: './coverage'
        }
    },
    uglify: {
        settings: {
            compress: {
                drop_debugger: true,
                drop_console: true
            },
            beautify: {}
        }
    },
    browserSyncConfig: {
        notify: false,
        proxy: (serverConfig ? serverConfig.path : undefined),
        startPath: '/',
        ghostMode: false
    }
};
