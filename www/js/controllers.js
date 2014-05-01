angular.module('starter.controllers', [])
    .controller('LoginCtrl', function($scope, $firebaseSimpleLogin, loginManager, $location) {
    $scope.loginData = {};

    var dataRef = new Firebase("https://caterate.firebaseio.com/");
    $scope.loginObj = $firebaseSimpleLogin(dataRef);

    $scope.login = function() {
        $scope.loginObj.$login('facebook').then(function(user) {
            // The root scope event will trigger and navigate
        }, function(error) {
            // Show a form error here
            console.error('Unable to login', error);
        });
    };
}).controller('OrganizationsCtrl', function ($scope, loginManager, $location, organizationService, userService) {
    $scope.organizations = organizationService.index();
    $scope.logout = function () {
        loginManager.logout();
            $location.path('/login');
    }

        userService.addPlacesToUser("1", [2,5]);
    console.log("org")
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
});
