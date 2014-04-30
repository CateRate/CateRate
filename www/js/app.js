// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'ngRoute'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {templateUrl: 'CateRate/www/templates/_login.html', controller: 'LoginCtrl'})
                  .when('/organizations', {templateUrl: 'CateRate/www/templates/_organizations.html', controller: 'OrganizationsCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});

    $locationProvider.html5Mode(true);
}]);

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

