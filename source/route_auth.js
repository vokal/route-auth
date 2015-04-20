angular.module( "vokal.RouteAuth", [ "LocalStorageModule" ] )

.provider( "RouteAuth", function ()
{
    "use strict";

    var roles        = null;
    var redirectPath = "/sign-in";

    this.setRedirectPath = function ( path )
    {
        redirectPath = path;
    };

    this.$get = [ "$q", "$location", "$rootScope", "localStorageService",

        function ( $q, $location, $rootScope, localStorageService )
        {
            var service = {

                loadRoles: function ()
                {
                    roles = localStorageService.get( "user:roles" ) || [];
                },
                storeRoles: function ( newRoles )
                {
                    roles = newRoles;
                    localStorageService.set( "user:roles", newRoles );
                },
                hasRoles: function ( checkRoles )
                {
                    var allow = false;

                    if( roles === null )
                    {
                        service.loadRoles();
                    }

                    for( var i = 0; allow === false && i < checkRoles.length; i++ )
                    {
                        allow = roles.indexOf( checkRoles[ i ] ) >= 0;
                    }

                    return allow;
                },
                hasNoRoles: function ()
                {
                    if( roles === null )
                    {
                        service.loadRoles();
                    }

                    return roles.length === 0;
                },
                auth: function ( allowedRoles, options )
                {
                    var deferred = $q.defer();
                    options      = options || {};

                    if( service.hasRoles( allowedRoles ) || ( allowedRoles.length === 0 && service.hasNoRoles() ) )
                    {
                        deferred.resolve();
                    }
                    else
                    {
                        deferred.reject();
                        $location.path( options.redirectPath || redirectPath );
                    }

                    return deferred.promise;
                }

            };

            return service;

        } ];

} );
