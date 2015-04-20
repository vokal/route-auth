#Route Auth

> Easy to use route authorization provider

* [Usage](#section-usage)
* [Interface](#section-interface)

## <a name="section-usage"></a>Usage

Include the file found in the `dist` directory.

When creating your main angular module, include `vokal.majora` in the list of included modules, e.g.
```js
angular.module( "myApp", [ "vokal.majora" ] );
```

Add a resolve to a route like so:
$routeProvider.when( "/edit-account", { templateUrl: partialPath( "edit-account.html" ),
	resolve: { 
		auth: [ "RouteAuth", function ( RouteAuth )
		{
			return RouteAuth.auth( [ "user" ] );
		} ]
	} 
} );

The array of strings passed to RouteAuth.auth are the permissions that are allowable for the route

Somewhere else in your code, such as after authentication, you need to tell RouteAuth what roles the
current user has, if any. This looks like RouteAuth.storeRoles( [ "role1", "role2", "etc" ] ).
Roles are stored with local storage, to clear the store just call RouteAuth.storeRoles( [] ).

Security:
Because roles are stored in plain text in local storage where they can be directly edited, this
route authorization does not replace in any way authorization on the server side.

## <a name="section-interface"></a>Interface

The following methods can be called on the `RouteAuth` service once injected into your Angular code.

* [loadRoles( )](#method-loadRoles)
* [storeRoles( newRoles )](#method-storeRoles)
* [hasRoles( checkRoles )](#method-hasRoles)
* [hasNoRoles(  )](#method-hasNoRoles)
* [auth( allowedRoles, options )](#method-auth)

### Methods

#### <a name="method-loadRoles"></a>`loadRoles()`

Load the user's roles from localStorage, or set them as an empty list if there are no roles in localStorage.

* * *

#### <a name="method-storeRoles"></a>`storeRoles( newRoles )`

Overwrite the user's current roles with `newRoles`

##### Arguments

1. `newRoles` | *Array* | the new user roles to be set

##### Example

```js
RouteAuth.storeRoles( [ 'user', 'premiumUser', 'purpleDiamondUltraEliteClass' ] );
```

* * *

#### <a name="method-hasRoles"></a>`hasRoles( checkRoles )`

Check to see if the user has any of the roles in `checkRoles`

##### Arguments

1. `checkRoles` | *Array* | the list of roles to check for

##### Returns

*Bool* | `true` if the user has any of the roles in `checkRoles`, otherwise `false`

##### Example

```js
function showSettingsDialog()
{
	if( RouteAuth.hasRoles( [ "admin", "superuser" ] ) )
	{
		showAdminSettings();
	}
	else
	{
		showNormalSettings();
	}
}
```

* * *

#### <a name="method-hasNoRoles"></a>`hasNoRoles()`

Check to see if the user has no roles.

##### Returns

*Bool* | `true` if user has no set roles, otherwise `false`

##### Example

```js
function adjustAdLevel()
{
	if( RouteAuth.hasNoRoles() )
	{
		showAllTheAds();
	}
	else
	{
		justSomeAds();
	}
}
```

* * *

#### <a name="method-auth"></a>`auth( allowedRoles, options )`

Returns a promise, which is resolved if the user has one of the `allowedRoles`. Otherwise, the promise is rejected.
 
##### Arguments

1. `allowedRoles` | *Array*  | list of acceptable roles
2. `options`      | *Object* | optional options for this function 
  * `redirectPath` | *String* | path to redirect to should the user not have one of the allowed roles

##### Returns

*Angular Promise* | will resolve if user has one of the roles in `allowedRoles`. Otherwise, will be rejected.

##### Example

```js
$routeProvider.when( "/edit-account", { templateUrl: partialPath( "edit-account.html" ),
	resolve: { 
		auth: [ "RouteAuth", function ( RouteAuth )
		{
			return RouteAuth.auth( [ "user" ], { "redirectPath": "/login" } );
		} ]
	} 
} );
```

* * *


Compatability: IE9+