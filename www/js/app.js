// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

var app = angular.module('auth', ['ngRoute', 'goangular']);

app.config(['$routeProvider', '$goConnectionProvider',
    function($routeProvider, $goConnectionProvider) {
        var url = window.connectUrl || 'https://goinstant.net/2892dde7b64b/CateRate';
        var origin = window.location.origin;
        var path = window.location.pathname;
        var returnTo = origin + path;

        $goConnectionProvider.$set(url);
        $goConnectionProvider.$loginUrl(['Facebook']);

        $goConnectionProvider.$logoutUrl(returnTo);

//        $routeProvider
//            .when('/', {
//                templateUrl: 'views/home.html',
//                controller: 'homeCtrl'
//            })
//            .when('/profile', {
//                templateUrl: 'views/profile.html',
//                controller: 'profileCtrl',
//                access: 'authenticated'
//            })
//            .when('/restricted', {
//                templateUrl: 'views/restricted.html',
//                controller: 'restrictedCtrl'
//            })
//            .otherwise({
//                redirectTo: '/'
//            });
    }
]);

app.controller('homeCtrl', function($scope) {
    $scope.title = 'Home';
});

app.controller('profileCtrl', function($scope) {
    $scope.title = 'Profile';
});

app.controller('restrictedCtrl', function($scope) {
    $scope.title = 'Restricted';
});

app.factory('permissions', function ($goConnection) {
    return {
        authorized: function(accessLevel) {
            var permission;

            switch ($goConnection.isGuest) {
                case true:
                    permission = 'guest';
                    break;
                case false:
                    permission = 'authenticated';
                    break;
                default:
                    permission = null;
            }

            if (permission === accessLevel) {
                return true;
            }

            return false;
        }
    };
});

app.controller('mainCtrl',
    function($scope, $route, $location, $goConnection, $goUsers, permissions) {
        $scope.conn = $goConnection;
        $scope.users = $goUsers();
        $scope.users.$self();

        $goConnection.$ready().then(function(connection) {
            console.log(connection);
        }, function (err) {
            console.log(err)
        });
    }
);

//.config(function($stateProvider, $urlRouterProvider) {
//  $stateProvider
//
//    .state('app', {
//      url: "/app",
//      abstract: true,
//      templateUrl: "templates/menu.html",
//      controller: 'AppCtrl'
//    })
//
//    .state('app.search', {
//      url: "/search",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/search.html"
//        }
//      }
//    })
//
//    .state('app.browse', {
//      url: "/browse",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/browse.html"
//        }
//      }
//    })
//    .state('app.playlists', {
//      url: "/playlists",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/playlists.html",
//          controller: 'PlaylistsCtrl'
//        }
//      }
//    })
//
//    .state('app.single', {
//      url: "/playlists/:playlistId",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/playlist.html",
//          controller: 'PlaylistCtrl'
//        }
//      }
//    });
//  // if none of the above states are matched, use this as the fallback
//  $urlRouterProvider.otherwise('/app/playlists');
//});

