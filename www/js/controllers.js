angular.module('starter.controllers', [])
    .controller('LoginCtrl', function($scope, $firebaseSimpleLogin, loginManager, $location, $state) {
    $scope.loginData = {};

    var dataRef = new Firebase("https://caterate.firebaseio.com/");
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.login = function() {
        $scope.loginObj.$login('facebook').then(function(user) {
            // The root scope event will trigger and navigate
            $state.go('user');
        }, function(error) {
            // Show a form error here
            console.error('Unable to login', error);
        });
    };
}).controller('MainCtrl', function ($scope, loginManager, $location) {
    $scope.logout = function () {
        loginManager.logout();
        $location.path('/login');
    }
}).controller('OrganizationsCtrl', function ($scope, organizationService,userService) {
    $scope.organizations = organizationService.index();

}).controller('OrganizationCtrl', function ($scope, organizationService, $stateParams) {
    $scope.organization = {};
    $scope.organization.id = $stateParams.organizationId;
    $scope.organization.branches = organizationService.getBranchesByOrganizationId($scope.organization.id);
}).controller('BranchCtrl', function ($scope, branchesService, $stateParams) {
    $scope.branch = {};
    $scope.branch.id = $stateParams.branchId;
    $scope.branch.organizationId = $stateParams.organizationId;
    $scope.branch.places = branchesService.getPlacesByBranchId($scope.branch.id);

    $scope.chosen = {};
}).controller('UserCtrl', function ($scope, userService) {
        $scope.user = {};
        $scope.user.id = 3;
        $scope.user.places = userService.getPlacesByUserId($scope.user.id);

        $scope.chosen = {};
}).controller('PlaceCtrl', function ($scope, userService, $stateParams, placesService) {
    $scope.placeId = $stateParams.placeId;
    $scope.place = placesService.get($scope.placeId);

    $scope.chosen = {};
});
