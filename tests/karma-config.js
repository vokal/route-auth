"use strict";

var istanbul = require( "browserify-istanbul" );

module.exports = function ( config )
{
    config.set( {

        basePath:   ".",
        frameworks: [ "browserify", "jasmine" ],
        autoWatch:  false,
        browsers:   [ "PhantomJS" ],
        reporters:  [ "dots", "coverage" ],
        singleRun:  true,
        captureTimeout: 15000,
        logLevel: config.LOG_DEBUG,
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-coverage",
            "karma-browserify"
        ],
        preprocessors: {
            "./harness.js": [ "browserify" ]
        },
        coverageReporter: {
            dir : "coverage/karma/",
            subdir: ".",
            reporters: [
                { type: "lcov" }
            ]
        },
        browserify: {
            debug: true,
            transform: [ istanbul( {} ) ]
        },
        files: [
            "*.spec.js",
            "./harness.js"
        ]

    } );

};
