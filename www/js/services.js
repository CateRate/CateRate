angular.module('starter.services', [])
    .provider('loginManager', function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.

    this.$get = function($firebaseSimpleLogin) {
        var dataRef = new Firebase("https://caterate.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(dataRef);
        return {
            login: function () {
                return loginObj.$login('facebook').then(function () {
                    localStorage.setItem("isLoggedIn", true);
                });
            },
            logout: function () {
                loginObj.$logout('facebook');
                localStorage.removeItem("isLoggedIn");
            }
        };
    };

    this.isLoggedIn = function () {
            return !!localStorage.getItem("isLoggedIn");
    };
});

// organization service
app.factory("organizationService", function($firebase, $rootScope) {
    var baseUrl = 'https://caterate.firebaseio.com/Organizations';
    return {
        index: function() {
            return $firebase(new Firebase(baseUrl));
        },
        get: function(id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getBranchesByOrganizationId: function(id) {
            var branchesBaseUrl = 'https://caterate.firebaseio.com/Branches';
            var branches = [];
            var organization = new Firebase(baseUrl + "/" + id);
            organization.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Branches), function(branchId) {
                    new Firebase(branchesBaseUrl + "/" + branchId).on("value", function(branchesSnapshot) {
                        var branch = branchesSnapshot.val();
                        branch.id = branchId;
                        branches.push(angular.copy(branch));
                        $rootScope.$apply();
                    });
                })
            })
            return branches;
        }
    };
});

// brunches service
app.factory("branchesService", function($firebase, $rootScope) {
    var baseUrl = 'https://caterate.firebaseio.com/Branches';

    return {
        index: function() {
            return $firebase(new Firebase(baseUrl));
        },
        get: function(id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getPlacesByBranchId: function(id) {
            var placesBaseUrl = 'https://caterate.firebaseio.com/Places';
            var places = [];
            var branch = new Firebase(baseUrl + "/" + id);
            branch.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Places), function(placeId) {
                    new Firebase(placesBaseUrl + "/" + placeId).on("value", function(placesSnapshot) {
                        var place = placesSnapshot.val();
                        places.push(angular.copy(place));
                        $rootScope.$apply();
                    });
                })
            })
            return places;
        },

        getOrganizationByBranchId: function(id) {

            var orgBaseUrl = 'https://caterate.firebaseio.com/Organizations';
            var orgs = [];
            var branch = new Firebase(baseUrl + "/" + id);
            branch.on('value', function(snapshot) {
                    new Firebase(orgBaseUrl + "/" + snapshot.val().organizationId).on("value", function(orgSnapshot) {
                        var org = orgSnapshot.val();
                        orgs.push(angular.copy(org));
                        $rootScope.$apply();
                    });
                })
            return orgs;
        }
    };
});

// places service
app.factory("placesService", function($firebase, $rootScope) {
    var baseUrl = 'https://caterate.firebaseio.com/Places';

    return {
        index: function () {
            return $firebase(new Firebase(baseUrl));
        },
        get: function (id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getBranchByPlaceId: function (id) {
            var branchBaseUrl = 'https://caterate.firebaseio.com/Branches';
            var branches = [];
            var place = new Firebase(baseUrl + "/" + id);
            place.on('value', function (snapshot) {
                new Firebase(branchBaseUrl + "/" + snapshot.val().branchId).on("value", function (branchSnapshot) {
                    var branch = branchSnapshot.val();
                    branches.push(angular.copy(branch));
                    $rootScope.$apply();
                });
            })
            return branches;
        }
    };
});

// user service
app.factory("userService", function($firebase, $rootScope) {
    var baseUrl = 'https://caterate.firebaseio.com/Users';

    return {
        index: function () {
            return $firebase(new Firebase(baseUrl));
        },
        get: function (id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getPlacesByUserId: function (id) {
            var placesBaseUrl = 'https://caterate.firebaseio.com/Places';
            var places = [];
            var user = new Firebase(baseUrl + "/" + id);
            user.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Places), function(placeId) {
                    new Firebase(placesBaseUrl + "/" + placeId).on("value", function(placesSnapshot) {
                        var place = placesSnapshot.val();
                        places.push(angular.copy(place));
                        $rootScope.$apply();
                        console.log(places);
                    });
                })
            })
            return places;
        }
    };
});