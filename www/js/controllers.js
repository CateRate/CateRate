angular.module('starter.controllers', [])
    .controller('LoginCtrl', function($scope, loginManager, $location) {

        $scope.login = function () {
            loginManager.login().then(function () {
                $location.path('/organizations');
            });
        }

//        $scope.loginObj.$getCurrentUser().then(function(data){
////            $location.path('/organizations');
//        });
}).controller('OrganizationsCtrl', function ($scope, loginManager, $location, organizationService) {
    //var organizationsRef = new Firebase('https://caterate.firebaseio.com/Organizations');
    //$scope.organizations = $firebase(organizationsRef);
        $scope.organizations = organizationService.index();
        $scope.logout = function () {
            loginManager.logout();
                $location.path('/login');
        }
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
});
