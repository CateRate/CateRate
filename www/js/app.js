// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

//app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//    $routeProvider.when('/login', {templateUrl: 'templates/_login.html', controller: 'LoginCtrl'})
//                  .when('/organizations', {templateUrl: 'templates/_organizations.html', controller: 'OrganizationsCtrl'});
//    $routeProvider.otherwise({redirectTo: '/login'});
//
//    $locationProvider.html5Mode(true);
//}]);

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        // setup an abstract state for the tabs directive
        .state('login', {
            url: "/login",
            templateUrl: "templates/_login.html",
            controller: "LoginCtrl"
        })
        .state('organizations', {
            url: "/organizations",
            templateUrl: "templates/_organizations.html",
            controller: "OrganizationsCtrl"
        })
        .state('branch', {
            url: "/branch",
            templateUrl: "templates/_branch.html"
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
