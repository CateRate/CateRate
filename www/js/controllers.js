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
}).controller('OrganizationsCtrl', function ($scope, loginManager, $location) {
    //var organizationsRef = new Firebase('https://caterate.firebaseio.com/Organizations');
    //$scope.organizations = $firebase(organizationsRef);
        $scope.organizations = [{title:"Google"}, {title:"Intel"}];
        $scope.logout = function () {
            loginManager.logout();
                $location.path('/login');
        }
        console.log("org")
}).controller('UserCtrl', function (organizationService) {

        console.log("user")
    var org = organizationService.getBranchesByOrganizationId('1');
    org.on('value', function() {
        console.log(org);
    });

});
