angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, loginManager, $state) {

    $scope.login = function() {
        loginManager.login().then(function() {
            $state.go('user');
        });
    };
}).controller('MainCtrl', function ($scope, loginManager, $state) {
    $scope.logout = function () {
        loginManager.logout();
        $state.go('login');
    }

    $scope.goHome = function () {
        $state.go('user');
    };
}).controller('OrganizationsCtrl', function ($scope, organizationService, $state) {
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


        $scope.user = {};
        $scope.user.id = localStorage.getItem("userId");
        $scope.user.places = userService.getPlacesByUserId($scope.user.id);

    $scope.chosen = {};

    $scope.addPlaces = function () {
        var placeIds = [];
        _.forEach($scope.chosen, function (value, key) {
            value && placeIds.push(key);
        });
        userService.addPlacesToUser(placeIds);
        $state.go('user');
    };
}).controller('UserCtrl', function ($scope, userService, $state, placesService, branchesService) {
        $scope.user = {};
        $scope.user.id = localStorage.getItem("userId");
        $scope.user.places = userService.getPlacesByUserId($scope.user.id);

        $scope.addPlaces = function () {
            $state.go('organizations');
        };
        $scope.init = function(place, placeId, branchId) {
            place.branch = placesService.getBranchByPlaceId(placeId);
            place.organization = branchesService.getOrganizationByBranchId(branchId);
        }

        $scope.chosen = {};
}).controller('PlaceCtrl', function ($scope, userService, $stateParams, placesService) {
        $scope.placeId = $stateParams.placeId;
        $scope.place = placesService.get($scope.placeId);

        $scope.chosen = {};
    }).controller('FoodCtrl', function ($scope, userService, $stateParams, placesService) {
        $scope.placeId = $stateParams.placeId;
        $scope.place = placesService.get($scope.placeId);
        $scope.foodId = $stateParams.foodId;
        $scope.place = placesService.get($scope.placeId);
        $scope.userId = localStorage.getItem("userId");



        $scope.likeFood = function(){
        //    console.log($scope.place.Foods[$scope.foodId].likers[localStorage.getItem("userId")]);
            placesService.likeFood(localStorage.getItem("userId"),
                                   $scope.placeId,
                                   $scope.foodId,
                                   true,
                                   $scope.place.Foods[$scope.foodId].likes,
                                   $scope.place.Foods[$scope.foodId].dislikes,
                $scope.place.Foods[$scope.foodId].likers[localStorage.getItem("userId")])

        };


        $scope.dislikeFood = function(){
            //    console.log($scope.place.Foods[$scope.foodId].likers[localStorage.getItem("userId")]);
            placesService.likeFood(localStorage.getItem("userId"),
                $scope.placeId,
                $scope.foodId,
                false,
                $scope.place.Foods[$scope.foodId].likes,
                $scope.place.Foods[$scope.foodId].dislikes,
                $scope.place.Foods[$scope.foodId].likers[localStorage.getItem("userId")])

        };


        $scope.chosen = {};
    });
