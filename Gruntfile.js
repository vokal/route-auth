"use strict";

module.exports = function ( grunt )
{
    grunt.initConfig( {
        clean: {
            coverage: [ "coverage/" ],
            dist: [ "dist/" ]
        }
    } );

    grunt.loadNpmTasks( "grunt-contrib-clean" );

    grunt.registerTask( "default", [ "clean" ] );
};
