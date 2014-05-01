// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
    });
})
.run(function ($firebaseSimpleLogin, $state, $rootScope) {
        var dataRef = new Firebase("https://caterate.firebaseio.com/");
        var loginObj = $firebaseSimpleLogin(dataRef);

});

app.config(function($stateProvider, $urlRouterProvider, loginManagerProvider) {
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
        }).state('organization', {
            url: "/organizations/:organizationId",
            templateUrl: "templates/_organization.html",
            controller: "OrganizationCtrl"
        }).state('branch', {
            url: "/organizations/:organizationId/branches/:branchId",
            templateUrl: "templates/_branch.html",
            controller: "BranchCtrl"
        }).state('user', {
            url: "/user",
            templateUrl: "templates/_user.html",
            controller: "UserCtrl"
        }).state('place', {
            url: "/places/:placeId",
            templateUrl: "templates/_place.html",
            controller: "PlaceCtrl"
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise(loginManagerProvider.isLoggedIn() ? "/user" : "/login");
});
