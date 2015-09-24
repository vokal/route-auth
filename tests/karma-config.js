
module.exports = function ( config )
{
    "use strict";

    config.set( {

        basePath:   ".",
        frameworks: [ "jasmine" ],
        autoWatch:  false,
        browsers:   [ "PhantomJS" ],
        reporters:  [ "dots", "coverage" ],
        singleRun:  true,
        captureTimeout: 15000,
        logLevel: config.LOG_DEBUG,
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-coverage"
        ],
        preprocessors: {
            "../source/route_auth.js": [ "coverage" ]
        },
        coverageReporter: {
            dir : "coverage/karma/",
            subdir: ".",
            reporters: [
                { type: "lcov" }
            ]
        },
        files: [
            "../source/components/angular/angular.js",
            "../source/components/angular-mocks/angular-mocks.js",
            "../source/components/angular-local-storage/dist/angular-local-storage.js",
            "../source/route_auth.js",
            "*.spec.js"
        ]

    } );

};

