angular.module('starter.controllers', [])
    .controller('LoginCtrl', function($scope, $firebaseSimpleLogin, $window, $location) {
        var dataRef = new Firebase("https://caterate.firebaseio.com");
        $scope.loginObj = $firebaseSimpleLogin(dataRef);

        $scope.facebookLogin = function () {
            $scope.loginObj.$login('facebook').then(function(user) {
                console.log('Logged in as: ', user.displayName);
            }, function(error) {
                console.error('Login failed: ', error);
            });
        }

        $scope.loginObj.$getCurrentUser().then(function(data){
            //$window.location.href = 'organizations';
            $location.path('/organizations');
        });
}).controller('OrganizationsCtrl', function ($scope, $firebase) {
    var organizationsRef = new Firebase('https://caterate.firebaseio.com/Organizations');
    $scope.organizations = $firebase(organizationsRef);
}).controller('UserPlacesCtrl', function ($scope, $firebase) {
        var userPlacesRef = new Firebase('https://caterate.firebaseio.com/Users/facebookuser');
        $scope.userPlaces = $firebase(userPlacesRef);
    })
