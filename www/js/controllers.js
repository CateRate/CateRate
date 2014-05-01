angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, loginManager, $state) {

    $scope.login = function() {
        loginManager.login().then(function() {
            $state.go('user');
        });
    };
}).controller('MainCtrl', function ($scope, loginManager, $location) {
    $scope.logout = function () {
        loginManager.logout();
        $location.path('/login');
    }
}).controller('OrganizationsCtrl', function ($scope, organizationService) {
    $scope.organizations = organizationService.index();
}).controller('OrganizationCtrl', function ($scope, organizationService, $stateParams) {
    $scope.organization = {};
    $scope.organization.id = $stateParams.organizationId;
    $scope.organization.branches = organizationService.getBranchesByOrganizationId($scope.organization.id);
}).controller('BranchCtrl', function ($scope, branchesService, $stateParams, userService, $state) {
    $scope.branch = {};
    $scope.branch.id = $stateParams.branchId;
    $scope.branch.organizationId = $stateParams.organizationId;
    $scope.branch.places = branchesService.getPlacesByBranchId($scope.branch.id);

    $scope.chosen = {};

    $scope.addPlaces = function () {
        var placeIds = [];
        _.forEach($scope.chosen, function (value, key) {
            value && placeIds.push(key);
        });
        userService.addPlacesToUser(placeIds);
        $state.go('user');
    };
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
