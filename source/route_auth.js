"use strict";

angular.module( "vokal.RouteAuth", [] )

.provider( "RouteAuth", function ()
{
    var roles = null;
    var redirectPath = "/sign-in";
    var storageMedium = window.localStorage;
    var storageKey = "routeauth:roles";

    this.setRedirectPath = function ( path )
    {
        redirectPath = path;
    };

    this.$get = [ "$q", "$location", "$rootScope",

        function ( $q, $location, $rootScope )
        {
            var service = {
                swapStorage: function ( newMedium )
                {
                    newMedium.setItem( storageKey, service.loadRoles() );
                    service.storeRoles( [] );
                    storageMedium = newMedium;
                },
                loadRoles: function ()
                {
                    roles = storageMedium.getItem( storageKey ) || [];
                },
                storeRoles: function ( newRoles )
                {
                    roles = newRoles;
                    storageMedium.setItem( storageKey, newRoles );
                },
                addRole: function ( newRole )
                {
                    if( !service.hasRoles( [ newRole ] ) )
                    {
                        roles.push( newRole );
                        storageMedium.setItem( storageKey, roles );
                    }
                },
                hasRoles: function ( checkRoles )
                {
                    if( roles === null )
                    {
                        service.loadRoles();
                    }

                    return checkRoles.some( function ( check )
                    {
                        return roles.indexOf( check ) >= 0;
                    } );
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
